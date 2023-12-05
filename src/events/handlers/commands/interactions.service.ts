import axios, { AxiosInstance } from 'axios';
import { ChatInputCommandInteraction } from 'discord.js';
import { env } from '../../../lib/env';

export class InteractionsService {
	api: AxiosInstance;

	constructor() {    
		this.api = axios.create({
			baseURL: `http://localhost:${env.PORT}`,
		});
	}

	async replySfwV1Image(interaction: ChatInputCommandInteraction) {
		const type = 'sfw';
		const category = interaction.options.getString('tag');
		const response = await this.api.get(`api/pics/v1?type=${type}&category=${category}`);
		const { url } = response.data;
		await interaction.reply(url);
	}

	async replyNsfwV1Image(interaction: ChatInputCommandInteraction) {
		const type = 'nsfw';
		const category = interaction.options.getString('tag');
		const response = await this.api.get(`api/pics/v1?type=${type}&category=${category}`);
		const { url } = response.data;
		await interaction.reply(url);
	}

	async replySfwV2Image(interaction: ChatInputCommandInteraction) {
		const tag = interaction.options.getString('tag');
		const response = await this.api.get(`api/pics/v2?tag=${tag}`);
		const { url } = response.data;
		await interaction.reply(url);
	}

	async replyNsfwV2Image(interaction: ChatInputCommandInteraction) {
		const tag = interaction.options.getString('tag');
		const response = await this.api.get(`api/pics/v2?tag=${tag}`);
		const { url } = response.data;
		await interaction.reply(url);
	}
}
