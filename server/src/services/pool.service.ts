import { firestoreHelper } from "../helpers/firestore.helper";
import { hockeyHelper } from "../helpers/hockey.helper";
import { Game } from "../models/Game";
import { Pool } from "../models/Pool";
import { User } from "../models/User";

export class PoolService {
  public pools: Map<string, Pool>;

  constructor() {
    this.pools = new Map<string, Pool>;
  }

  async createPool(name: string, owner: User, teams : string[], begin: Date, end: Date) {
    let code = await this.getPoolCode();
    let games = await hockeyHelper.getGames(teams);
    let newPool = new Pool(name, code, [], games, owner, [], teams);

    this.pools.set(code, newPool);

    return newPool;
  }

  async connectPool(user : User, code : string) {
    if (this.pools.has(code)) {
        this.pools.get(code)?.users.push()
    }
  }

  async getPoolCode() {
    let pools = await firestoreHelper.getAllPools();
    let newCode = undefined;
    while (newCode == undefined || this.pools.has(newCode)) {
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
