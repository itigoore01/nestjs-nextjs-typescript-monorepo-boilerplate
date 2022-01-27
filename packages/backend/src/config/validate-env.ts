import { plainToClass } from 'class-transformer';
import { IsNumberString, IsOptional, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsNumberString()
  @IsOptional()
  PORT?: string;
}

export function validateEnv(
  config: Record<string, unknown>
): EnvironmentVariables {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
