// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stsUrl: 'http://sts.ribbonid.com/connect/token',

    client_id: 'BankBackOffice',
    client_secret: 'BankBackOffice_',
    // baseAddress: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
    // accountAddress: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
    // flightAddress: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
    // serviceLocationAddress: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
    // serviceLineAddress: `http://localhost:5105/V1/Company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
    // ReserveAddress: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
    // FinancialAddress: `http://localhost:5105/V1/company/9cd2d2c2-8f14-4ebb-98ac-52228567e40a`,
    // PrintUrl: `http://print.ribbonid.com`,
  
  


  baseAddress: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  accountAddress: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  flightAddress: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  serviceLocationAddress: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  serviceLineAddress: `http://localhost:5105/V1/Company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  ReserveAddress: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  FinancialAddress: `http://localhost:5105/V1/company/9cd2d2c2-8f14-4ebb-98ac-52228567e40a`,
  PrintUrl: `http://localhost:3083`,
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
