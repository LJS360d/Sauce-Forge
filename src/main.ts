import Fonzi2Client from './client/client';
import { options } from './client/options';
import { env } from './lib/env';
import { CommandInteractionsHandler } from './events/handlers/commands/commands.handler';
import { ClientEventsHandler } from './events/handlers/common/client.events.handler';
import { Logger } from './lib/logger';

const client = new Fonzi2Client(
	options,
	new ClientEventsHandler(),
	new CommandInteractionsHandler()
);
client.login(env.TOKEN);

process.on('uncaughtException', (err) => {
	Logger.error(`${err.name}: ${err.message}\n${err}`);
});

['SIGINT', 'SIGTERM'].forEach((signal) => {
	process.on(signal, () => {
		Logger.warn(`Received ${signal} signal`);
		process.exit(0);
	});
});
