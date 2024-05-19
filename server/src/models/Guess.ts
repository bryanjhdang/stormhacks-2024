import { Game, result } from "./Game";
import { User } from "./User";

export class Guess {
    public constructor(
        public userId : string, 
        public gameId : string, 
        public guess : result
    ) {};
}