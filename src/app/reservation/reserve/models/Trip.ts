import { FlightInfo } from "./FlightInfo";
import { ReserveRecord } from "./ReserveRecord";

export interface Trip {
  flightInfo:      FlightInfo;
  reserveRecords:  ReserveRecord[];
  companyId:       string;
  contactId:       string;
  contactFullName: string;
  contactPhone:    string;
  id:              string;
}


