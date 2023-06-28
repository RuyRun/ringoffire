import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, setDoc, doc, addDoc, where, collectionChanges, docData, updateDoc, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GameInterface } from '../game-interface';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  item$: Observable<any>;
  filteredGame$: Observable<DocumentData>;
  playerCount: number;
  gameOver: boolean = false;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private firestore: Firestore) {
    const itemCollection = collection(this.firestore, 'games');
    this.item$ = collectionData(itemCollection, { idField: 'id' });
  }


  ngOnInit(): void {
    this.newGame();
    this.getURLId();
    this.setGameData();



  }
  getURLId() {
    this.route.params.subscribe(params => {
      this.game.currentId = params['id'];
    });
  }

  setGameData() {
    this.filteredGame$ = this.get();
    this.filteredGame$.subscribe((e: GameInterface) => {
      this.game.currentPlayer = e.game.currentPlayer;
      this.game.playedCards = e.game.playedCards;
      this.game.players = e.game.players;
      this.game.playersImage = e.game.playersImage;
      this.game.stack = e.game.stack;
      this.game.pickCardAnimation = e.game.pickCardAnimation;
      this.game.currentCard = e.game.currentCard;
      this.playerCount = e.game.players.length;
    })
  }

  saveGame() {
    let gameDate: GameInterface = this.game.toJson();
    this.update(gameDate);
  }
  restartGame() {
    let blabla: GameInterface = this.game.resetGame();
    this.update(blabla)
    this.gameOver = false;
  }
  get() {
    const gameDocumentReference = doc(this.firestore, `games/${this.game.currentId}`);
    return docData(gameDocumentReference, { idField: 'id' });
  }

  update(game: GameInterface) {
    const gameDocumentReference = doc(
      this.firestore,
      `games/${this.game.currentId}`
    );
    return updateDoc(gameDocumentReference, { ...game });
  }


  setNewGame() {
    const itemCollection = collection(this.firestore, 'games');
    let setData = addDoc(itemCollection, { game: this.game.toJson2() });
    console.log(setData);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {});

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playersImage.push('1.webp');
        this.saveGame();
      }
    });
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 2350)
    }
  }

  newGame() {
    this.game = new Game();
  }

  updatePlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditProfileComponent, {});
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.playersImage.splice(playerId, 1);
        } else {
          this.game.playersImage[playerId] = change;
        }
        this.saveGame();
      }
    });
  }
}
