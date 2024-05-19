import { Game } from "../models/Game";
import { Pool } from "../models/Pool";
import { User } from "../models/User";

export class PoolService {
  public pools: Map<string, Pool>;

  constructor() {
    this.pools = new Map<string, Pool>;
  }

  createPool(owner: User, games: Game[], teams: string[]) {}

  getPoolCode() {
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
  




    return 
  }
}

const poolService = new PoolService();

export { poolService };
