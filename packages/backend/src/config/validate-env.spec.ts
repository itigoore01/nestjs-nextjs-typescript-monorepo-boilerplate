import 'reflect-metadata';
import { validateEnv } from './validate-env';

describe('Validate env', () => {
  it('should throws error', () => {
    expect(() =>
      validateEnv({
        NODE_ENV: 'abc',
        PORT: 'abc',
        COOKIE_SECURE: 'abc',
      })
    ).toThrowErrorMatchingSnapshot();
  });

  it('should not throws', () => {
    expect(() =>
      validateEnv({
        COOKIE_SECRET: 'cookie-secret',
      })
    ).not.toThrowError();
  });
});
