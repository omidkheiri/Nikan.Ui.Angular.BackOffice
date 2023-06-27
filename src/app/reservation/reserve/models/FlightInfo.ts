
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
  arrivalAirportId: string;
  departureAirportId: string;
  arrivalLocationId: string;
  departureLocationId: string;
}
