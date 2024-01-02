import axios, { AxiosInstance } from 'axios';
import { ChatInputCommandInteraction } from 'discord.js';

export class InteractionsService {
	private api: AxiosInstance;

	constructor(baseUrl: string) {
		this.api = axios.create({
			baseURL: baseUrl,
		});
	}

	async replySfwV1Image(interaction: ChatInputCommandInteraction<"cached">) {
		const type = 'sfw';
		const category = interaction.options.getString('tag');
		const response = await this.api.get(`api/pics/v1?type=${type}&category=${category}`);
		const { url } = response.data;
		await interaction.reply(url);
	}

	async replyNsfwV1Image(interaction: ChatInputCommandInteraction<"cached">) {
		const type = 'nsfw';
		const category = interaction.options.getString('tag');
		const response = await this.api.get(`api/pics/v1?type=${type}&category=${category}`);
		const { url } = response.data;
		await interaction.reply(url);
	}

	async replySfwV2Image(interaction: ChatInputCommandInteraction<"cached">) {
		const tag = interaction.options.getString('tag');
		const response = await this.api.get(`api/pics/v2?tag=${tag}`);
		const { url } = response.data;
		await interaction.reply(url);
	}

	async replyNsfwV2Image(interaction: ChatInputCommandInteraction<"cached">) {
		const tag = interaction.options.getString('tag');
		const response = await this.api.get(`api/pics/v2?tag=${tag}`);
		const { url } = response.data;
		await interaction.reply(url);
	}

  async replySfwV3Image(interaction: ChatInputCommandInteraction<"cached">) {
		const tag = interaction.options.getString('tag');
		const response = await this.api.get(`api/pics/v3?tag=${tag}`);
		const { url } = response.data;
		await interaction.reply(url);
	}

  async replyNsfwV3Image(interaction: ChatInputCommandInteraction<"cached">) {
		const tag = interaction.options.getString('tag');
		const response = await this.api.get(`api/pics/v3?tag=${tag}`);
		const { url } = response.data;
		await interaction.reply(url);
	}
}
