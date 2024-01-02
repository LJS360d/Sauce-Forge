import { ChatInputCommandInteraction } from 'discord.js';
import { Command, Handler, HandlerType } from 'fonzi2';
import { InteractionsService } from '../services/interactions.service';
import {
	getNsfwV1Choices,
	getNsfwV2Choices,
	getNsfwV3Choices,
	getSfwV1Choices,
	getSfwV2Choices,
} from '../static/command.options.choices';

export class CommandInteractionsHandler extends Handler {
	public readonly type = HandlerType.commandInteraction;
	constructor(private interactionsService: InteractionsService) {
		super();
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
	async handleSfwV1(interaction: ChatInputCommandInteraction<'cached'>) {
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
	async handleNsfwV1(interaction: ChatInputCommandInteraction<'cached'>) {
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
	async handleSfwV2(interaction: ChatInputCommandInteraction<'cached'>) {
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
	async handleNsfwV2(interaction: ChatInputCommandInteraction<'cached'>) {
		await this.interactionsService.replyNsfwV2Image(interaction);
	}

	@Command({
		name: 'nsfw3',
		description: 'get a nsfw image/gif',
		options: [
			{
				name: 'tag',
				description: 'the image/gif tag',
				type: 3,
				required: true,
				choices: getNsfwV3Choices(),
			},
		],
	})
	async handleNsfwV3(interaction: ChatInputCommandInteraction<'cached'>) {
		await this.interactionsService.replyNsfwV3Image(interaction);
	}
}
