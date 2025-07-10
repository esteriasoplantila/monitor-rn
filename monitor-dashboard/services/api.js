import axios from 'axios';

const BASE_URL = 'http://157.66.55.118:3000';

export async function login(username, password) {
  try {
    const res = await axios.post(`${BASE_URL}/login`, { username, password });
    return res.data.token;
  } catch {
    return null;
  }
}

export async function getMonitorData(token) {
  const res = await axios.get(`${BASE_URL}/api/monitor`, {
    headers: { Authorization: token },
  });
  return res.data;
}
