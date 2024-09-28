import { api } from '@/lib/api';
export const createExpense = async ({params, onSuccessCallback}:{params: Parameters<typeof api.expenses.$post>[0], onSuccessCallback: (...args: unknown[]) => void}) => {
    try {
      const response = await api.expenses.$post(params);
  
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      onSuccessCallback();
      const expenses = await response.json();
      return expenses;
    } catch (error) {
      console.log(error);
    }
  };
  