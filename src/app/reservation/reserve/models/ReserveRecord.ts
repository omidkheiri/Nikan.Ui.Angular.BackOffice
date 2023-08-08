import { ReserveItem } from "./ReserveItem";


export interface ReserveRecord {
  id: string;
  clientReserveId: string;
  locationId: string;
  reserveItems: ReserveItem[];
  reserveId: string;
  reserveNumber: string;
  discountValue: number;
  taxTotal: number;
  taxPercent: number;
  billable: number;
  paid: number;
  remaining: number;
  reserveStatusId: number;
}
