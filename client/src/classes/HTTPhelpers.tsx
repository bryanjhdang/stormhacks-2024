const API_URL = "http://localhost:3003";
import axios from "axios";

// To be used in the dashboard, gets a list of all
// the pools that the user is in
export async function getAllEnteredPools(uid: any) {
  const result = await axios.get(`${API_URL}/pool/${uid}`);
  return result.data;
}

// Retrieves a Pool from a code
export async function getPoolByCode(uid: any, pool_id: any) {
  const result = await axios.post(`${API_URL}/connect`, {
    params: {
      uid,
      code: pool_id,
    },
  });

  return result.data;
}

// Used to create a Pool
export function postPool() {}
