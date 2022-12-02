// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stsUrl: 'http://sts.ribbonid.com/connect/token',
  client_id: 'basicdata',
  client_secret: 'basicdatasecret',
  baseAddress: `http://localhost:30007/GW/Report/V1/company/47922d62-5c39-41d1-867a-7ca2226b748b`,
  accountAddress: `http://localhost:30007/GW/Account/V1/company/47922d62-5c39-41d1-867a-7ca2226b748b`,
  flightAddress: `http://localhost:30007/GW/FlightNumbers/V1/Company/47922d62-5c39-41d1-867a-7ca2226b748b`,
  serviceLocationAddress: `http://localhost:30007/GW/ServiceLocation/V1/Company/47922d62-5c39-41d1-867a-7ca2226b748b`,
  serviceLineAddress: `http://localhost:30007/GW/ServiceLine/V1/Company/47922d62-5c39-41d1-867a-7ca2226b748b`,
  ReserveAddress: `http://localhost:30007/GW/Reserve/V1/company/47922d62-5c39-41d1-867a-7ca2226b748b`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
