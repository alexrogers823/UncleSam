export default interface Saving {
  id: number;
  title: string;
  priority: number;
  currentAmount: number;
  goalAmount?: number;
  goalDate: string;
  lastUpdated: string;
}