import * as admin from "firebase-admin";
import rootPath from "get-root-path";
import { Pool } from "../models/Pool";
import dotenv from "dotenv";
import { Game } from "../models/Game";

dotenv.config();

export class FireStoreHelper {
  private db: admin.firestore.Firestore;
  private poolDB: admin.firestore.CollectionReference;

  constructor() {
    try {
      if (process.env.FIRESTORE_KEY) {
        var serviceAccount =
          rootPath + process.env.FIRESTORE_KEY || ("oopsie whoopsie" as admin.ServiceAccount);

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      } else {
        admin.initializeApp();
        console.log(
          "\x1b[34m",
          "Connecting to Firestore over Google Cloud, make sure you authorized the instance to connect"
        );
      }

      this.db = admin.firestore();
      this.poolDB = this.db.collection("pools");
    } catch (error) {
      console.log(
        "\x1b[31m",
        "ERROR: Unable to connect to Firestore Instance, did you include your Firestore key in the keys folder?"
      );
      throw error;
    }
  }

  makeSimplePool(pool: Pool): any {
    return {
      name: pool.name,
      roomCode: pool.roomCode,
      userIds: pool.userIds,
      games: pool.games.map((game) => this.makeSimpleGame(game)),
      ownerId: pool.ownerId,
      guesses: pool.guesses,
      teams: pool.teams,
      reward: pool.reward,
      punishment: pool.reward
    };
  }

  makeSimpleGame(game: Game): any {
    return {
      id: game.id,
      name: game.name,
      gameTime: game.gameTime,
      awayTeam: game.awayTeam,
      homeTeam: game.homeTeam,
      // Add other properties as needed
    };
  }

  async createPool(pool: Pool): Promise<void> {
    this.poolDB.doc(pool.roomCode).set(this.makeSimplePool(pool));
  }

  async getPool(roomCode: string): Promise<Pool> {
    let pool = await this.poolDB.doc(roomCode).get();
    if (pool.exists) {
      return pool.data() as Pool;
    }

    return Promise.reject(new Error(`Pool with roomCode ${roomCode} not found`));
  }

  async getUserPools(userId: string) {
    let poolQuery = await this.poolDB.where("userIds", "array-contains", userId).get();

    const pools: Pool[] = [];

    poolQuery.forEach((doc) => {
      pools.push(doc.data() as Pool);
    });

    return pools;
  }

  async updatePool(pool: Pool): Promise<void> {
    this.createPool(pool);
  }

  async deletePool(roomCode: string): Promise<void> {
    this.poolDB.doc(roomCode).delete();
  }

  async getAllPools(): Promise<Pool[]> {
    const pools: Pool[] = [];

    (await this.poolDB.get()).forEach((doc) => {
      pools.push(doc.data() as Pool);
    });

    return pools;
  }
}

const firestoreHelper = new FireStoreHelper();

export { firestoreHelper };
