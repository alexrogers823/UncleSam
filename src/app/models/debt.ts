export default interface Debt {
  id: number;
  title: string;
  amount: number;
  lastUpdated: string;
  dueDate?: string;
}