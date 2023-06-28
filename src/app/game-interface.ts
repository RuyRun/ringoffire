export interface GameInterface {
    game: {
        players: string[];
        playersImage: string[];
        stack: string[];
        playedCards: string[];
        currentPlayer: number;
        pickCardAnimation: boolean;
        currentCard: string;
    };
}
