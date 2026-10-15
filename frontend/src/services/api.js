const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8004';

const buildUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

const request = async (endpoint, options = {}) => {
  const response = await fetch(buildUrl(endpoint), {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || 'Something went wrong';
    throw new Error(message);
  }

  return data;
};

export const registerCustomer = async (payload) =>
  request('/customers/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const loginCustomer = async (payload) =>
  request('/customers/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const getCurrentCustomer = async () => request('/customers/me');

export const logoutCustomer = async () =>
  request('/customers/logout', {
    method: 'POST',
  });
