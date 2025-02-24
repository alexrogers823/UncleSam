export interface Item {
  id: number;
  title: string;
  amount: number;
  createdDate: string;
  url?: string;
  completed: boolean;
}

export interface ItemRequest {
  title: string;
  amount: number;
  url?: string;
  completed: boolean;
}