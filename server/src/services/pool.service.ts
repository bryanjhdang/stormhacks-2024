import { firestoreHelper } from "../helpers/firestore.helper";
import { hockeyHelper } from "../helpers/hockey.helper";
import { Game } from "../models/Game";
import { Pool } from "../models/Pool";
import { User } from "../models/User";

export class PoolService {
  constructor() {
  }

  async createPool(name: string, owner: User, teams : string[], begin: Date, end: Date) {
    let code = await this.getPoolCode();
    let games = await hockeyHelper.getGames(teams);
    let newPool = new Pool(name, code, [], games, owner.id, [], teams);
    firestoreHelper.createPool(newPool);
    return newPool;
  }

  async connectPool(user : User, code : string) {
    let pool = await firestoreHelper.getPool(code);

    pool.userIds.push(user.id);

    await firestoreHelper.updatePool(pool);
    return firestoreHelper.getUserPools(user.id);
  }

  async getPools(user : User) {
    firestoreHelper.getUserPools(user.id);
  }

  private async getPoolCode() {
    let pools = await firestoreHelper.getAllPools();
    let newCode : string = "";
    while (newCode == "" || pools.some(pool => pool.roomCode == newCode)) {
        newCode =
        Array(4)
        .fill("x")
        .join("")
        .replace(/x/g, () => {
          return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        })
    }

    return newCode; 
  }
}

const poolService = new PoolService();

export { poolService };
