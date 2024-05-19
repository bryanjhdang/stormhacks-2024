import { Game, result } from "./Game";
import { User } from "./User";

export class Guess {
    public constructor(
        public user : User, 
        public game : Game, 
        public guess : result
    ) {};
}