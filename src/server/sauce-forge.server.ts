import axios from 'axios';
import { Client } from 'discord.js';
import express, { type Request, type Response } from 'express';
import { Fonzi2Server, Fonzi2ServerData, Logger } from 'fonzi2';
import { resolve } from 'path';
import {
  getNsfwV1Choices,
  getNsfwV2Choices,
  getNsfwV3Choices,
  getSfwV1Choices,
  getSfwV2Choices,
  getSfwV3Choices,
} from '../static/command.options.choices';

export class SauceForgeServer extends Fonzi2Server {
	constructor(
		client: Client,
		data: Fonzi2ServerData,
		private webhooks: string[]
	) {
		super(client, data);
		this.app.use(express.static(resolve('public')));
		this.app.set('views', [this.app.get('views'), resolve('views')]);
	}

	override start(): void {
		// SSR routes (ejs views)
		this.app.get('/sauce', this.saucePage.bind(this));
		// server API routes
		this.app.post('/api/webhook', this.webhookPost.bind(this));
		this.app.get('/api/pics/v1', this.picsV1.bind(this));
		this.app.get('/api/pics/v2', this.picsV2.bind(this));
		this.app.get('/api/pics/v3', this.picsV3.bind(this));
		super.start();
	}

	async saucePage(req: Request, res: Response) {
		const response = await axios.get<{ url: string }>(`https://api.waifu.pics/sfw/waifu`);
		const url = response.data.url;
		this.sendMsgToWebhook(url);
		const props = {
			sfwOptions1: getSfwV1Choices(),
			nsfwOptions1: getNsfwV1Choices(),
			sfwOptions2: getSfwV2Choices(),
			nsfwOptions2: getNsfwV2Choices(),
      sfwOptions3: getSfwV3Choices(),
			nsfwOptions3: getNsfwV3Choices(),
			inviteLink: this.data.inviteLink,
			startImgUrl: url,
		};
		res.render('sauce', props);
	}

	webhookPost(req: Request, res: Response) {
		if (!req.body?.msg) {
			res.status(400).json({ error: 'Invalid body, missing "msg" property' });
			return;
		}
		const { msg } = req.body as { msg: string };
		this.sendMsgToWebhook(msg);
		res.sendStatus(204);
	}

	async picsV1(req: Request, res: Response) {
		const { type, category } = req.query;
		if (!type || !category) {
			res.status(400).json({ error: 'Invalid query params' });
			return;
		}
		const response = await axios.get(`https://api.waifu.pics/${type}/${category}`);
		const url = response.data.url as string;
		this.sendMsgToWebhook(url);
		res.status(200).json({ url });
	}

	async picsV2(req: Request, res: Response) {
		const { tag } = req.query;
		if (!tag) {
			res.status(400).json({ error: 'Invalid query params' });
			return;
		}
		const response = await axios.get(`https://api.waifu.im/search/?included_tags=${tag}`);
		const url = response.data.images[0].url as string;
		this.sendMsgToWebhook(url);
		res.status(200).json({ url });
	}

	async picsV3(req: Request, res: Response) {
		const { tag } = req.query;
		if (!tag) {
			res.status(400).json({ error: 'Invalid query params' });
			return;
		}
		const response = await axios.get(`https://akaneko.cuteasfubuki.xyz/api/${tag}`);
    const url = response.data.url as string;
		this.sendMsgToWebhook(url);
		res.status(200).json({ url });
	}

	private async sendMsgToWebhook(msg: string) {
		if (!this.webhooks.length) return;
		this.webhooks.forEach(async (webhook) => {
			try {
				await axios.post(webhook, { content: msg });
			} catch (error: any) {
				// Ignore Rate limit (429)
				if (error.staus !== 429) {
					Logger.error(error.message);
				}
			}
		});
	}
}
