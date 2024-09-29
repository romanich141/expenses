import { api } from "@/lib/api";
export const getUserProfile = async () => {
  try {
    const response = await api.me.$get();

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const userProfile = await response.json();
    return userProfile;
  } catch (error) {
    console.log(error);
    return null;
  }
};
