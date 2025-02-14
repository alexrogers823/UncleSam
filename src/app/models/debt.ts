export interface Debt {
  id: number;
  title: string;
  amount: number;
  lastUpdated: string;
  dueDate?: string;
}

export interface DebtRequest {
  title: string;
  amount: number;
  dueDate?: string;
}