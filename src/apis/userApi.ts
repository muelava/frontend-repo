import { User } from './user';

const BASE_URL = 'http://localhost:5000/api';

export const fetchUserData = async (token: string): Promise<User> => {
  const res = await fetch(`${BASE_URL}/fetch-user-data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch user data');
  return res.json();
};

export const updateUserData = async (token: string, data: Partial<User>) => {
  const res = await fetch(`${BASE_URL}/update-user-data`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
};
