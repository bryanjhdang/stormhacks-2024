enum result {
    AWAY, 
    HOME
}

export class Game {
    constructor(
        public id : string,
        public name: string,
        public gameTime: Date,
        public awayTeam: string,
        public homeTeam: string,

        //TODO: figrue out later
        //winner: result  
    ) {};
}