import { ApiResponse, IUser } from "../types/user";

const API_URL = process.env.REACT_APP_API_URL || 'https://randomuser.me/api/?results=15';

export const fetchUsers = async (): Promise<IUser[]> => {
  const response = await fetch(API_URL);
  const data: ApiResponse = await response.json();
  return data.results;
};