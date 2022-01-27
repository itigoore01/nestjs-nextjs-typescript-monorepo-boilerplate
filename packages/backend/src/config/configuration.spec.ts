import { Configuration, configuration } from './configuration';
import { EnvironmentVariables } from './validate-env';

describe('Configuration', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
  });

  afterEach(() => {
    // restore env
    process.env = originalEnv;
  });

  it('should returns configuration', () => {
    const env: EnvironmentVariables = {
      NODE_ENV: 'development',
      PORT: '1000',
      COOKIE_SECRET: 'cookie-secret',
      COOKIE_SECURE: 'true',
    };
    process.env = env as unknown as NodeJS.ProcessEnv;

    expect(configuration()).toEqual<Configuration>({
      env: 'development',
      nest: {
        port: 1000,
      },
      cookie: {
        secret: 'cookie-secret',
        secure: true,
      },
    });
  });

  it('should returns default configuration', () => {
    const env: EnvironmentVariables = {
      NODE_ENV: 'development',
      COOKIE_SECRET: 'cookie-secret',
    };
    process.env = env as unknown as NodeJS.ProcessEnv;

    expect(configuration()).toEqual<Configuration>({
      env: 'development',
      nest: {
        port: 3001,
      },
      cookie: {
        secret: 'cookie-secret',
        secure: false,
      },
    });
  });
});
