import { Fonzi2Client, Logger, getRegisteredCommands } from 'fonzi2';
import { env } from './env';
import { CommandInteractionsHandler } from './handlers/commands.handler';
import { ClientEventsHandler } from './handlers/events.handler';
import options from './options';
import { InteractionsService } from './services/interactions.service';
function main() {
	new Fonzi2Client(env.TOKEN, options, [
		new ClientEventsHandler(getRegisteredCommands()),
		new CommandInteractionsHandler(
			new InteractionsService(`http://localhost:${env.PORT}`)
		),
	]);

	process.on('uncaughtException', (err: any) => {
		if (err?.response?.status !== 429)
			Logger.error(`${err.name}: ${err.message}\n${err.stack}`);
	});

	process.on('unhandledRejection', (reason: any) => {
		if (reason?.status === 429) return;
		if (reason?.response?.status === 429) return;
	});

	['SIGINT', 'SIGTERM'].forEach((signal) => {
		process.on(signal, () => {
			Logger.warn(`Received ${signal} signal`);
			process.exit(0);
		});
	});
}

main();
