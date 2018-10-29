import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {
    listen: {
      port: 7002,
      hostname: '0.0.0.0'
    }
  };
  return config;
};
