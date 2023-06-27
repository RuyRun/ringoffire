import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, setDoc, doc, addDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GameInterface } from '../game-interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  item$: Observable<any>;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private firestore: Firestore) {
    const itemCollection = collection(this.firestore, 'games');
    this.item$ = collectionData(itemCollection, {idField: 'id'});
   
  }


  ngOnInit(): void {
    this.newGame();    
  }

testfunctions() {
  // return this.afs.collection('games', ref => ref.where('Dokument-ID', '==', 'BuB38HH9cRf8jsbPzilv'));
  this.item$.subscribe((e) => {
    e.find((t:any, i:number) => {
      if(t.id == 'BuB38HH9cRf8jsbPzilv'){
        this.setGameData(e[i].game);
        console.log(e[i].game);
        
      }
    })
  })    
}

 setGameData(data:GameInterface) {
   this.game.currentPlayer = data.currentPlayer;
   this.game.playedCards = data.playedCards;
   this.game.players = data.players;
   this.game.stack = data.stack;   
 }

  setNewGame() {
    const itemCollection = collection(this.firestore, 'games');
    let setData =  addDoc(itemCollection, { game: this.game.toJson() });
    console.log(setData);
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {});

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name) {
        this.game.players.push(name);
      }
    });
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 2350)
    }
  }

  newGame() {
    this.game = new Game();
  }
}
