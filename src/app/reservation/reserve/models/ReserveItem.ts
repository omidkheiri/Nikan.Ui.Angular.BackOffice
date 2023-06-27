import { Attendee } from "./Attendee";
import { Lom } from "./Lom";
import { MeetingRoom } from "./MeetingRoom";
import { Passenger } from "./Passenger";
import { Pet } from "./Pet";
import { Transfer } from "./Transfer";
import { Visa } from "./Visa";
import { Wheelchair } from "./Wheelchair";


export interface ReserveItem {
  id: string;
  lom: Lom | null;
  passenger: Passenger | null;
  visa: Visa | null;
  transfer: Transfer | null;
  attendee: Attendee | null;
  wheelchair: Wheelchair | null;
  suite: MeetingRoom | null;
  meetingRoom: MeetingRoom | null;
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
  pet: Pet | null;
}
