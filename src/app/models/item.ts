export interface Item {
  id: number;
  title: string;
  amount: number;
  created: string;
  url?: string;
  completed: boolean;
}

export interface ItemRequest {
  title: string;
  amount: number;
  url?: string;
  completed: boolean;
}