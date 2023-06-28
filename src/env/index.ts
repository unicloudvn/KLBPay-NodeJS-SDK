import * as dotenv from 'dotenv';
dotenv.config();

const KlbConfig = {
  host: process.env.KLB_HOST || 'https://api-staging.kienlongbank.co/pay',
  clientId: process.env.CLIENT_ID || '',
  encryptKey: process.env.ENCRYPT_KEY || '',
  secretKey: process.env.SECRET_KEY || '',
};

export default KlbConfig;
