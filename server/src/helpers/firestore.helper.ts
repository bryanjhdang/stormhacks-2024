import * as admin from "firebase-admin"
import rootPath from "get-root-path";
import { Pool } from "../models/Pool";


export class FireStoreHelper  {
    private db: admin.firestore.Firestore;
    private poolDB: admin.firestore.CollectionReference;


    constructor() {
        try {
            if (process.env.FIRESTORE_KEY) {
              var serviceAccount = rootPath + process.env.FIRESTORE_KEY || "oopsie whoopsie" as admin.ServiceAccount;
      
              admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
              });
            } else {
              admin.initializeApp();
              console.log("\x1b[34m", "Connecting to Firestore over Google Cloud, make sure you authorized the instance to connect");
            }
        

            this.db = admin.firestore();
            this.poolDB = this.db.collection("pools");

        } catch (error) {
            console.log("\x1b[31m", "ERROR: Unable to connect to Firestore Instance, did you include your Firestore key in the keys folder?");
            throw error;
        }
    }

    async createPool(pool: Pool): Promise<void> {
        this.poolDB.doc(pool.roomCode).set({...pool});
    }

    async getPool(roomCode: string): Promise<Pool> {
        let pool = await this.poolDB.doc(roomCode).get();
        if (pool.exists) {
            return pool.data() as Pool;
        }

        return Promise.reject(new Error(`Pool with roomCode ${roomCode} not found`));
    }

    async getUserPools(userId : string)  {
        let pools = await this.poolDB.where('userIds', 'array-contains', userId).get();
        return pools;
    }

    async updatePool(pool: Pool): Promise<void> {
        this.createPool(pool);
    }

    async deletePool(roomCode: string): Promise<void> {
        this.poolDB.doc(roomCode).delete();
    }

    async getAllPools(): Promise<Pool[]> {
        return (await this.poolDB.listDocuments()).map((doc : any) => {
            return doc.data() as Pool;});
    }
}

const firestoreHelper = new FireStoreHelper();

export { firestoreHelper };