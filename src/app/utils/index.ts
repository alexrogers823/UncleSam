export const calculateSummary = (data: any[], field: string): number => {
  return data.reduce((acc, val) => acc + parseFloat(val[field]), 0);
}