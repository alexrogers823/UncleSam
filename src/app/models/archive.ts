export interface Archive {
  type: string;
  amount: number;
  title: string;
  updatedDate: string;
}

export interface ArchiveRequest {
  type: string;
  amount: number;
  title: string;
}