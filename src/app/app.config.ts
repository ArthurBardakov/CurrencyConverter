import { InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";

export let APP_CONFIG = new InjectionToken<string>('app.config');
const fixerCurrencyAPI = 'https://fixer-fixer-currency-v1.p.rapidapi.com/';

export interface IAppConfig {
   fixerApiEndpoint: string;
}

export const AppConfig: IAppConfig = {
   fixerApiEndpoint: fixerCurrencyAPI
};
