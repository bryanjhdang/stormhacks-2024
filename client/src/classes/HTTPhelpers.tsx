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
  try {
    const result = await axios.post(`${API_URL}/pool/connect`, {
      uid: uid,
      code: pool_id,
    });
    return result.data;
  } catch (e) {
    alert(e);
  }
}

// Used to create a Pool
export async function postPool(name: any, uid: any, teams: any) {
  const result = await axios.post(`${API_URL}/pool/`, {
    uid: uid,
    name: name,
    teams: teams,
  });

  return result.data;
}

export async function placeBets(userId : any, poolId: any, guesses: any) {
  const result = await axios.post(`${API_URL}/guess`, {
    userId: userId,
    poolId: poolId,
    guesses : guesses
  })

  return result.data;
}
