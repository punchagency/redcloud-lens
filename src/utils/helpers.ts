//format money 
export const formatMoney = (number: number = 0): string => {
  return number
    ? number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'NGN',
      })
    : '';
};