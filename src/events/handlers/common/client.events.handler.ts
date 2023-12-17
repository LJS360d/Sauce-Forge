import { Logger } from '../../../lib/logger';
import { DiscordEventsHandler } from '../../../types/handlers/base.handler';
import { ClientEvent } from '../../decorators/client.event.decorator';
import { DecoratorsMetadataAccess } from '../../decorators/access';
import { SauceForgeServer } from '../../../server/sauce-forge.server';
import { env } from '../../../lib/env';

export class ClientEventsHandler extends DiscordEventsHandler {
	@ClientEvent('ready')
	async onReady() {
		// * Successful login
		Logger.info(`Logged in as ${this.client?.user?.tag}!`);

		try {
			Logger.info('Started refreshing application (/) commands.');
			await this.client?.application?.commands.set(DecoratorsMetadataAccess.commands);
			Logger.info('Successfully reloaded application (/) commands.');
			new SauceForgeServer(this.client!, env.SAUCE_WEBHOOKS).start();
		} catch (err: any) {
			Logger.error(err);
		}
	}
}
