import { Pagination } from "./pagination.interface";

export interface IQR {
  _id: string;
  id: string;
  qrId: number;
  manufacturer: string | null;
  createdAt: string;
  ipfsHash: string | null;
  status: string;
  updatedAt: string;
  ragPicker: string | null;
  recycler: string | null;
}

export interface IQRResponse {
  pagination: Pagination;
  data: { docs: IQR[] };
}
