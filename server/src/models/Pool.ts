import { Game } from "./Game";
import { Guess } from "./Guess";
import { User } from "./User";

export class Pool {
    public constructor(
        public name: string,
        public roomCode : string,
        public userIds : string[],
        public games : Game[],
        public ownerId : string,
        public guesses : Guess[],
        public teams : string[],
    ) {}
}