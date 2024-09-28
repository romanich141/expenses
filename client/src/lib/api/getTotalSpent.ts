import { api } from '@/lib/api';
export const getTotalSpent = async () => {
    try {
      const response = await api.expenses.total.$get();
  
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
  
      const { totalExpenses } = await response.json();
      return totalExpenses;
    } catch (error) {
      console.log(error);
    }
  };
  