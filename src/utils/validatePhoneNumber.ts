import { configFactory } from "../commonModules/appConfig/configFactory";
import { AppConfigKey } from './../commonModules/appConfig/appConfig.const';

export function ValidatePhoneNumber(phoneNumber:string){
    const config = configFactory();
    if(config.get(AppConfigKey.NODE_ENV) == "development"){
        return /^(999662)+([0-9]{4})\b/.test(phoneNumber);
    }
    return /(\+84[3|5|7|8|9])+([0-9]{8})\b/.test(phoneNumber);
}