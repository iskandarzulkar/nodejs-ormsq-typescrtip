import dotenv from "dotenv";

dotenv.config();

export type ConfigType = {
    APP_NAME                : string
    APP_PORT                : number
    BASE_URL                : string
    APP_MODE                : string
    DB_HOST                 : string
    DB_PORT                 : number
    DB_USER                 : string
    DB_PASS                 : string
    DB_NAME                 : string
    JWT_TOKEN               : string
    JWT_REFRESH_TOKEN       : string
    MSG_QUEUE_URL           : string
    MSG_PORT                : number
    USERNAME                : string
    PASSWORD                : string
}

function createConfig(): ConfigType{
    return{
        APP_NAME            : String(process.env.APP_NAME),
        APP_PORT            : parseInt(String(process.env.APP_PORT), 10),
        BASE_URL            : String(process.env.BASE_URL),
        APP_MODE            : String(process.env.APP_MODE),
        DB_HOST             : String(process.env.DB_HOST),
        DB_PORT             : parseInt(String(process.env.DB_PORT), 10),
        DB_USER             : String(process.env.DB_USER),
        DB_PASS             : String(process.env.DB_PASS),
        DB_NAME             : String(process.env.DB_NAME),
        JWT_TOKEN           : String(process.env.JWT_TOKEN),
        JWT_REFRESH_TOKEN   : String(process.env.JWT_REFRESH_TOKEN),
        MSG_QUEUE_URL       : String(process.env.MSG_QUEUE_URL),
        MSG_PORT            : parseInt(String(process.env.MSG_PORT), 10),
        USERNAME            : String(process.env.USERNAME),
        PASSWORD            : String(process.env.PASSWORD),
    }
}

export default createConfig;