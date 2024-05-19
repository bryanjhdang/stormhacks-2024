import { Game } from "./Game";
import { Guess } from "./Guess";
import { User } from "./User";

export class Pool {
    public constructor(
        public name: string,
        public roomCode : string,
        public users : User[],
        public games : Game[],
        public owner : User,
        public guesses : Guess[],
        public teams : string[],
        public id : string = ""
    ) {}
}