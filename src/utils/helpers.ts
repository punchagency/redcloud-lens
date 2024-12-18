//format money 
export const formatMoney = (number: number) => {
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'NGN',
  });
};