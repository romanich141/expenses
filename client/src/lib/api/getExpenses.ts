import { api } from '@/lib/api';
export const getExpenses = async () => {
    try {
      const response = await api.expenses.$get();
  
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
  
      const expenses = await response.json();
      return expenses;
    } catch (error) {
      console.log(error);
    }
  };
  