import process from 'node:process';
export const enviroment = {
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
    port: process.env.PORT,
    mongoConnectionString: process.env.MONGO_CONNECT ?? ''
};
