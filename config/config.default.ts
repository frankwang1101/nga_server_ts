import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532938776405_9738';

  // add your config here
  config.middleware = [
    'cors',
  ];

  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'nga_my',
      password: 'root',
      database: 'nga',
    },
    app: true,
    agent: false,
  };

  return config;
};
