export enum ContractStatus {
  ACTIVE = "ACTIVE",
  TERMINATED = "TERMINATED",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
}

export interface Contract {
  id?: number;
  contractCode: string;
  clientId: number;      
  serviceId: number;     
  quantity: number;
  unitPrice: number;
  startDate: string;     
  endDate?: string | null;
  status: ContractStatus;
  observation?: string | null;
}