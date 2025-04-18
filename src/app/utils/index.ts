export const calculateSummary = (data: any[], field: string): number => {
  return data.reduce((acc, val) => acc + parseFloat(val[field]), 0);
}

export const pluralize = (title: string): string => {
  return title + 's';
}

export const getRandomColor = (): number => {
  return Math.round(Math.random() * 256)
}