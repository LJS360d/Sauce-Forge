import { CacheType, ChatInputCommandInteraction, CommandInteraction } from 'discord.js';
import { Command } from '../../decorators/command.decorator';
import { DiscordEventsHandler } from '../base.handler';
import { InteractionsService } from './interactions.service';
import {
	getNsfwV1Choices,
	getNsfwV2Choices,
	getSfwV1Choices,
	getSfwV2Choices,
} from './command.options.choices';
import { env } from '../../../lib/env';

export class CommandInteractionsHandler extends DiscordEventsHandler {
	interactionsService: InteractionsService;
	constructor() {
		super();
		this.interactionsService = new InteractionsService();
	}
	@Command({ name: 'version', description: 'get the application version' })
	async handleVersion(interaction: CommandInteraction<CacheType>) {
		await interaction.reply(env.VERSION);
	}

	@Command({
		name: 'sfw1',
		description: 'get a sfw image or gif',
		options: [
			{
				name: 'tag',
				description: 'the image/gif tag',
				type: 3,
				required: true,
				choices: getSfwV1Choices(),
			},
		],
	})
	async handleSfwV1(interaction: ChatInputCommandInteraction) {
		await this.interactionsService.replySfwV1Image(interaction);
	}

	@Command({
		name: 'nsfw1',
		description: 'get a nsfw image/gif',
		options: [
			{
				name: 'tag',
				description: 'the image/gif tag',
				type: 3,
				required: true,
				choices: getNsfwV1Choices(),
			},
		],
	})
	async handleNsfwV1(interaction: ChatInputCommandInteraction) {
		await this.interactionsService.replyNsfwV1Image(interaction);
	}

	@Command({
		name: 'sfw2',
		description: 'get a sfw image or gif',
		options: [
			{
				name: 'tag',
				description: 'the image/gif tag',
				type: 3,
				required: true,
				choices: getSfwV2Choices(),
			},
		],
	})
	async handleSfwV2(interaction: ChatInputCommandInteraction) {
		await this.interactionsService.replySfwV2Image(interaction);
	}

	@Command({
		name: 'nsfw2',
		description: 'get a nsfw image/gif',
		options: [
			{
				name: 'tag',
				description: 'the image/gif tag',
				type: 3,
				required: true,
				choices: getNsfwV2Choices(),
			},
		],
	})
	async handleNsfwV2(interaction: ChatInputCommandInteraction) {
		await this.interactionsService.replyNsfwV2Image(interaction);
	}
}
