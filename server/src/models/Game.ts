export enum result {
    AWAY, 
    HOME,
    INCOMPLETE
}

export class Game {
    constructor(
        public id : string,
        public name: string,
        public gameTime: Date,
        public awayTeam: string,
        public awayTeamScore: number,
        public homeTeam: string,
        public homeTeamScore: number,
        public winningTeam: result,
    ) {};
}