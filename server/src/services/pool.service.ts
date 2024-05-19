import { firestoreHelper } from "../helpers/firestore.helper";
import { hockeyHelper } from "../helpers/hockey.helper";
import { Game } from "../models/Game";
import { Pool } from "../models/Pool";
import { User } from "../models/User";

export class PoolService {
  constructor() {}

  async createPool(name: string, owner_uid: string, teams: string[]) {
    let code = await this.getPoolCode();
    let games = await hockeyHelper.getGames(teams);
    let newPool = new Pool(name, code, [owner_uid], games, owner_uid, [], teams);
    await firestoreHelper.createPool(newPool);
    return newPool;
  }

  async connectPool(userId: string, code: string) {
    let pool = await firestoreHelper.getPool(code);

    pool.userIds.push(userId);

    await firestoreHelper.updatePool(pool);
    return firestoreHelper.getUserPools(userId);
  }

  async getPools(userId: string) {
    return await firestoreHelper.getUserPools(userId);
  }

  private async getPoolCode() {
    let pools = await firestoreHelper.getAllPools();
    let newCode: string = "";
    while (newCode == "" || pools.some((pool) => pool.roomCode == newCode)) {
      newCode = Array(4)
        .fill("x")
        .join("")
        .replace(/x/g, () => {
          return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        });
    }

    return newCode;
  }
}

const poolService = new PoolService();

export { poolService };
