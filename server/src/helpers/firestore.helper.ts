import * as admin from "firebase-admin"
import rootPath from "get-root-path";


export class FireStoreHelper  {
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
        
        } catch (error) {
            console.log("\x1b[31m", "ERROR: Unable to connect to Firestore Instance, did you include your Firestore key in the keys folder?");
            throw error;
        }
    }
}

const firestoreHelper = new FireStoreHelper();

export { firestoreHelper };