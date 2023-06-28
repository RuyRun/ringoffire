export interface GameInterface {
    game: {
        players: string[];
        stack: string[];
        playedCards: string[];
        currentPlayer: number;
        pickCardAnimation: boolean;
        currentCard: string;
    };
}
