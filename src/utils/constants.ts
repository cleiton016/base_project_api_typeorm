require('dotenv').config()

export const constants = {
    prod: true,
    bcrypt: {
        saltOrRounds: 10
    },
    database : {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    },

    jwt: {
        access_token_exp_in_sec: process.env.JWT_ACCESS_TOKEN_EXP_IN_SEC,
        refresh_token_exp_in_sec: process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC,
        public_key: process.env.JWT_PUBLIC_KEY_BASE64,
        private_key: process.env.JWT_PRIVATE_KEY_BASE64,
    }
    
}