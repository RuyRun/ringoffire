import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
constructor(private router:Router, private firestore: Firestore) {

}

  newGame() {
    //Start game
    const game = new Game()
    const itemCollection = collection(this.firestore, 'games');
    addDoc(itemCollection, { game: game.toJson2() }).then((gameInfo)=> {
      this.router.navigateByUrl('/game/'+ gameInfo.id);
    });
  }
}
