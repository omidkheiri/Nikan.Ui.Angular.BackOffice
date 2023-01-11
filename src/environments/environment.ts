// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stsUrl: 'http://sts.ribbonid.com/connect/token',
  client_id: 'basicdata',
  client_secret: 'basicdatasecret',
  // baseAddress: `http://localhost:5105/V1/company/9cd2d2c2-8f14-4ebb-98ac-52228567e40a`,
  // accountAddress: `http://localhost:5105/V1/company/9cd2d2c2-8f14-4ebb-98ac-52228567e40a`,
  // flightAddress: `http://localhost:5105/V1/Company/9cd2d2c2-8f14-4ebb-98ac-52228567e40a`,
  // serviceLocationAddress: `http://localhost:5105/V1/Company/9cd2d2c2-8f14-4ebb-98ac-52228567e40a`,
  // serviceLineAddress: `http://localhost:5105/V1/Company/9cd2d2c2-8f14-4ebb-98ac-52228567e40a`,
  // ReserveAddress: `http://localhost:5105/V1/company/9cd2d2c2-8f14-4ebb-98ac-52228567e40a`,
  // FinancialAddress: `http://localhost:5105/V1/company/9cd2d2c2-8f14-4ebb-98ac-52228567e40a`,
  baseAddress: `http://gaitway.ribbonid.com/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  accountAddress: `http://gaitway.ribbonid.com/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  flightAddress: `http://gaitway.ribbonid.com/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  serviceLocationAddress: `http://gaitway.ribbonid.com/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  serviceLineAddress: `http://gaitway.ribbonid.com/V1/Company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  ReserveAddress: `http://gaitway.ribbonid.com/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  FinancialAddress: `http://gaitway.ribbonid.com/V1/company/9cd2d2c2-8f14-4ebb-98ac-52228567e40a`,
  //ReserveAddress: `http://localhost:30007/GW/Reserve/V1/company/9cd2d2c2-8f14-4ebb-98ac-52228567e40a`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
