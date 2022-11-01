// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stsUrl: 'http://sts.ribbonid.com/connect/token',
  client_id: 'basicdata',
  client_secret: 'basicdatasecret',
  baseAddress: `http://gaitway.ribbonid.com/GW/Report/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  accountAddress: `http://gaitway.ribbonid.com/GW/Account/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  flightAddress: `http://gaitway.ribbonid.com/GW/Account/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  serviceLocationAddress: `http://gaitway.ribbonid.com/GW/ServiceLocation/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  serviceLineAddress: `http://gaitway.ribbonid.com/GW/ServiceLine/V1/Company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  ReserveAddress: `http://gaitway.ribbonid.com/GW/Reserve/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
