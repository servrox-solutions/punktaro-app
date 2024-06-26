import type { CapacitorConfig } from '@capacitor/cli';

let config: CapacitorConfig = {};

const baseConfig: CapacitorConfig = {
  appId: 'com.punktaro.app',
  appName: 'Punktaro',
  webDir: 'build'
};

switch (process.env.NODE_ENV) {
  case 'production':
    config = {
      ...baseConfig,
    };
    break;
  default:
    config = {
      ...baseConfig,     
    };
    break;
}

export default config;
