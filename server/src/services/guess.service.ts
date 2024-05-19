import { firestoreHelper } from "../helpers/firestore.helper";
import { Guess } from "../models/Guess";

export class GuessService {
    async giveGuess(userId: string, poolId: string, guesses : Guess[]) {
        let pool = await firestoreHelper.getPool(poolId);
        guesses.forEach(guess => {
            guess.userId = userId;
            pool.guesses.push(guess);
        })

        return firestoreHelper.updatePool(pool);
    }
}

const guessService = new GuessService();

export { guessService }