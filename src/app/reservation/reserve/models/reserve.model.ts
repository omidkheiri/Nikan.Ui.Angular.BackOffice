export interface Reserve {
  clientReserveId: string;
  customerId: string;
  locationId: LocationId;
  contactId: string;
  contactFullName: string;
  contactPhone: string;
  flightInfo: FlightInfo;
  reserveItem: ReserveItem[];
}
export interface FlightInfo {
  id: string;
  flightName: string;
  flightDate: Date;
  airlineName: string;
  status: boolean;
  scheduled: boolean;
  flightType: number;
  flightSource: number;
  departureAirport: string;
  departureCity: string;
  arrivalAirport: string;
  arrivalCity: string;
  arrivalTime: string;
  departureTime: string;
}

export interface LocationId {
  title: string;
  address: string;
  location: string;
  account: string;
  maxAcceptDate: Date;
  status: boolean;
  id: string;
  arrivalBufferTime: number;
  departureBufferTime: number;
  transferBufferTime: number;
}
export interface Visa {
  relatedPassengerID: string;
}
export interface Wheelchair {
  relatedPassengerID: string;
}
export interface ReserveItem {
  id?: string;
  lom?: Lom;
  passenger?: Passenger;
  visa?: Visa;
  transfer?: Transfer;
  attendee?: Attendee;
  wheelchair?: Wheelchair;
  suite?: MeetingRoom;
  meetingRoom?: MeetingRoom;
  serviceLineId: string;
  serviceLineTitle: string;
  unitPrice: number;
  serviceQty: number;
  serviceTypeId: number;
  serviceTotal: number;
  discountPercent: number;
  discountValue: number;
  serviceTotalAfterDiscount: number;
  taxPercent: number;
  taxValue: number;
  serviceAdvanceTotal: number;
  serviceStatus: number;
  pet?: Pet;
}

export interface Attendee {
  id?: string;
  gender: number;
  name: string;
  lastName: string;
}

export interface Lom {}

export interface MeetingRoom {
  title: string;
}

export interface Passenger {
  id: string;
  name?: string;
  lastName?: string;
  gender?: number;
  nationalCode?: string;
  passportNumber?: string;
  passportExpireDate?: string;
  visa?: boolean;
  wheelchair?: boolean;
  birthDate?: Date;
  nationality?: number;
}

export interface Pet {
  qty: number;
}

export interface Transfer {
  id: string;
  address: string;
  time: string;
  mobileNumber: string;
  description: string;
}
export interface TransferModel {
  id: string;
  address: string;
  time: string;
  mobileNumber: string;
  description: string;
  serviceLineId: string;
}
