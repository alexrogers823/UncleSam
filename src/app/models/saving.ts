export interface Saving {
  id: number;
  title: string;
  priority: number;
  currentAmount: number;
  goalAmount?: number;
  goalDate?: string;
  lastUpdated: string;
}

export interface SavingRequest {
  title: string;
  priority?: number;
  currentAmount: number;
  goalAmount?: number;
  goalDate?: string;
}