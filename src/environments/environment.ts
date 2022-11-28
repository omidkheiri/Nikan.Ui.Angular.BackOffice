// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stsUrl: 'http://sts.ribbonid.com/connect/token',
  client_id: 'basicdata',
  client_secret: 'basicdatasecret',
  baseAddress: `http://localhost:30007/GW/Report/V1/company/44359985-cc6f-47f3-96be-63fd5553466d`,
  accountAddress: `http://localhost:30007/GW/Account/V1/company/44359985-cc6f-47f3-96be-63fd5553466d`,
  flightAddress: `http://localhost:30007/GW/Account/V1/company/44359985-cc6f-47f3-96be-63fd5553466d`,
  serviceLocationAddress: `http://localhost:30007/GW/ServiceLocation/V1/Company/44359985-cc6f-47f3-96be-63fd5553466d`,
  serviceLineAddress: `http://localhost:30007/GW/ServiceLine/V1/Company/44359985-cc6f-47f3-96be-63fd5553466d`,
  ReserveAddress: `http://localhost:30007/GW/Reserve/V1/company/44359985-cc6f-47f3-96be-63fd5553466d`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
