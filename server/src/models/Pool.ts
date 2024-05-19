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
        public reward : string,
        public punishment : string
    ) {}

    public makeSimple(): any {
        return {
            name: this.name,
            roomCode: this.roomCode,
            userIds: this.userIds,
            games: this.games.map(game => game.makeSimple()),
            ownerId: this.ownerId,
            guesses: this.guesses,
            teams: this.teams,
        };
    }
}