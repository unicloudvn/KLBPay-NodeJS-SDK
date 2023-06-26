import * as dotenv from 'dotenv';
dotenv.config();

const KlbConfig = {
  host: process.env.KLB_HOST || '',
  clientId: process.env.CLIENT_ID || '',
  encryptKey: process.env.ENCRYPT_KEY || '',
  secretKey: process.env.SECRET_KEY || '',
};

export default KlbConfig;
