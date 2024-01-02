import { ClientEvent, Handler, HandlerType, Logger, getRegisteredCommands } from 'fonzi2';
import { env } from '../env';
import { SauceForgeServer } from '../server/sauce-forge.server';
import { ApplicationCommandData } from 'discord.js';

export class ClientEventsHandler extends Handler {
	public readonly type = HandlerType.clientEvent;
	constructor(private commands: ApplicationCommandData[]) {
		super();
	}
	@ClientEvent('ready')
	async onReady() {
		// * Successful login
		Logger.info(`Logged in as ${this.client?.user?.tag}!`);
		const load = Logger.loading('Started refreshing application (/) commands.');
		try {
			await this.client?.application?.commands.set(this.commands);
			load.success('Reloaded application (/) commands.');
			new SauceForgeServer(
				this.client!,
				{
					inviteLink: env.INVITE_LINK,
					oauth2url: env.OAUTH2_URL,
					ownerIds: env.OWNER_IDS,
					version: env.VERSION,
					port: env.PORT,
				},
				env.SAUCE_WEBHOOKS
			).start();
		} catch (err: any) {
			load.fail('Failed to refresh application (/) commands.');
			Logger.error(err);
		}
	}
}
