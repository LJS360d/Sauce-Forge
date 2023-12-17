export type BaseEnv = Readonly<{
  SAUCE_WEBHOOKS: string[];
  INVITE_LINK: string;
	TOKEN: string;
	LOG_WEBHOOK: string | undefined;
	OAUTH2_URL: string;
	OWNER_IDS: string[];
	PORT: number;
	VERSION: string;
	NODE_ENV: 'development' | 'staging' | 'test' | 'production';
}>;
