type CommandOptionChoice = { name: string; value: string };

export function getSfwV1Choices(): CommandOptionChoice[] {
	return [
		{ value: 'waifu', name: 'Waifu' },
		{ value: 'neko', name: 'Neko' },
		{ value: 'bully', name: 'Bully' },
		{ value: 'cuddle', name: 'Cuddle' },
		{ value: 'cry', name: 'Cry' },
		{ value: 'hug', name: 'Hug' },
		{ value: 'awoo', name: 'Awoo' },
		{ value: 'kiss', name: 'Kiss' },
		{ value: 'lick', name: 'Lick' },
		{ value: 'pat', name: 'Pat' },
		{ value: 'smug', name: 'Smug' },
		{ value: 'bonk', name: 'Bonk' },
		{ value: 'yeet', name: 'Yeet' },
		{ value: 'blush', name: 'Blush' },
		{ value: 'smile', name: 'Smile' },
		{ value: 'wave', name: 'Wave' },
		{ value: 'highfive', name: 'Highfive' },
		{ value: 'nom', name: 'Nom' },
		{ value: 'kick', name: 'Kick' },
		{ value: 'happy', name: 'Happy' },
		{ value: 'wink', name: 'Wink' },
		{ value: 'dance', name: 'Dance' },
		{ value: 'cringe', name: 'Cringe' },
		{ value: 'shinobu', name: 'Shinobu' },
		{ value: 'megumin', name: 'Megumin' },
	];
}

export function getSfwV2Choices(): CommandOptionChoice[] {
	return [
		{ value: 'waifu', name: 'Waifu' },
		{ value: 'maid', name: 'Maid' },
		{ value: 'oppai', name: 'Oppai' },
		{ value: 'uniform', name: 'Uniform' },
		{ value: 'selfies', name: 'Selfies' },
		{ value: 'marin-kitagawa', name: 'Marin Kitagawa' },
		{ value: 'mori-calliope', name: 'Mori Calliope' },
		{ value: 'raiden-shogun', name: 'Raiden Shogun' },
	];
}

export function getNsfwV1Choices(): CommandOptionChoice[] {
	return [
		{ value: 'waifu', name: 'Waifu' },
		{ value: 'neko', name: 'Neko' },
		{ value: 'trap', name: 'Trap' },
		{ value: 'blowjob', name: 'Blowjob' },
	];
}

export function getNsfwV2Choices(): CommandOptionChoice[] {
	return [
		{ value: 'hentai', name: 'Hentai' },
		{ value: 'milf', name: 'Milf' },
		{ value: 'ass', name: 'Ass' },
		{ value: 'paizuri', name: 'Paizuri' },
		{ value: 'oral', name: 'Oral' },
		{ value: 'ecchi', name: 'Ecchi' },
		{ value: 'ero', name: 'Ero' },
	];
}
