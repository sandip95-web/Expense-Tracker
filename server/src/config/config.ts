import {config as cofg} from 'dotenv';
cofg();
const _config={
  port:process.env.PORT || 4444,
  mongoConnectionString:process.env.MONGO_CONNECTION_STRING
}

export const config =Object.freeze(_config);