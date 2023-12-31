export class Game {
    public players: string[] = [];
    public playersImage: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public currentId: string;
    public pickCardAnimation: boolean = false;
    public currentCard: string = '';

    constructor() {
        this.setNewStack();
        
    }
    setNewStack() {
        for (let i = 1; i <= 13; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);

        }
        this.stack = shuffle(this.stack);
    }
    public toJson() {
        return {
            game: {
                players: this.players,
                playersImage: this.playersImage,
                stack: this.stack,
                playedCards: this.playedCards,
                currentPlayer: this.currentPlayer,
                pickCardAnimation: this.pickCardAnimation,
                currentCard: this.currentCard,
            }
        }
    }
    public toJson2() {
        return {
            players: this.players,
            playersImage: this.playersImage,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
        }
    }

    public resetGame() {
        this.setNewStack();
        this.playedCards = [];
         this.currentPlayer= 0;
         this.currentCard= '';
         return {
            game: {
                players: this.players,
                playersImage: this.playersImage,
                stack: this.stack,
                playedCards: this.playedCards,
                currentPlayer: this.currentPlayer,
                pickCardAnimation: this.pickCardAnimation,
                currentCard: this.currentCard,
            }
        }
    }
}

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};