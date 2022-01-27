import { EnvironmentVariables } from './validate-env';

export interface Configuration {
  nest: {
    port: number;
  };
}

export function configuration(): Configuration {
  const env = process.env as EnvironmentVariables;

  return {
    nest: {
      port: parseInt(env.PORT ?? '', 10) || 3001,
    },
  };
}
