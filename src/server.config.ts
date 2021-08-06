import 'dotenv/config'

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const logDirectory = process.env.LOG_DIR;
export const corsUrl = process.env.CORS_URL;
export const keySession = process.env.KEY_SESSION as string

export const tokenInfo = {
  accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
  refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
  issuer: process.env.TOKEN_ISSUER || '',
  audience: process.env.TOKEN_AUDIENCE || '',
};

