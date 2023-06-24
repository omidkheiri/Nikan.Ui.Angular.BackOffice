export interface Trip {
  flightInfo:      FlightInfo;
  reserveRecords:  ReserveRecord[];
  companyId:       string;
  contactId:       string;
  contactFullName: string;
  contactPhone:    string;
}

export interface FlightInfo {
  id:                  string;
  flightName:          string;
  flightDate:          Date;
  airlineName:         string;
  status:              boolean;
  scheduled:           boolean;
  flightType:          number;
  flightSource:        number;
  departureAirport:    string;
  departureCity:       string;
  arrivalAirport:      string;
  arrivalCity:         string;
  arrivalTime:         string;
  departureTime:       string;
  arrivalAirportId:    string;
  departureAirportId:  string;
  arrivalLocationId:   string;
  departureLocationId: string;
}

export interface ReserveRecord {
  id:              string;
  clientReserveId: string;
  locationId:      string;
  reserveItem:     ReserveItem[];
  reserveId:       string;
  reserveNumber:   string;
  discountValue:   number;
  taxTotal:        number;
  taxPercent:      number;
  billable:        number;
  paid:            number;
  remaining:       number;
  reserveStatusId: number;
}

export interface ReserveItem {
  id:                        string,
  lom:                       Lom|null;
  passenger:                 Passenger|null;
  visa:                      Visa|null;
  transfer:                  Transfer|null;
  attendee:                  Attendee|null;
  wheelchair:                Wheelchair|null;
  suite:                     MeetingRoom|null;
  meetingRoom:               MeetingRoom|null;
  serviceLineId:             string;
  serviceLineTitle:          string;
  unitPrice:                 number;
  serviceQty:                number;
  serviceTypeId:             number;
  serviceTotal:              number;
  discountPercent:           number;
  discountValue:             number;
  serviceTotalAfterDiscount: number;
  taxPercent:                number;
  taxValue:                  number;
  serviceAdvanceTotal:       number;
  serviceStatus:             number;
  pet:                       Pet|null;
}

export interface Attendee {
  id:       string;
  gender:   number;
  name:     string;
  lastName: string;
}

export interface Lom {
}

export interface MeetingRoom {
  title: string;
}

export interface Passenger {
  id:                 string;
  name:               string;
  lastName:           string;
  gender:             number;
  nationalCode:       string;
  passportNumber:     string;
  passportExpireDate: string;
  visa:               boolean;
  wheelchair:         boolean;
  birthDate:          Date;
  nationality:        number;
}

export interface Pet {
  qty: number;
}

export interface Transfer {
  id:           string;
  address:      string;
  time:         string;
  mobileNumber: string;
  description:  string;
}

export interface Visa {
  relatedPassengerId: string;
}
export interface Wheelchair {
  relatedPassengerId: string;
}