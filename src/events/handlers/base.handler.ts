import { Client } from 'discord.js';
import { commandObjectsKey } from '../decorators/command.decorator';
import { CommandInteractionsHandler } from './commands/commands.handler';

export abstract class DiscordEventsHandler {
	public client?: Client;

	static get commands() {
		return (
			Reflect.getOwnMetadata(commandObjectsKey, CommandInteractionsHandler.prototype) ||
			[]
		);
	}
}
