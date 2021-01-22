import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { GameCardService } from "../game-card.service";
import { Game } from "../game.model";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit, OnDestroy {
  gameData: Game[] = [];
  gameSubscription: Subscription;

  constructor(private gameService: GameCardService) {}

  ngOnInit() {
    this.gameService.getAllData();
    this.gameSubscription = this.gameService
      .getUpdatedListner()
      .subscribe((data: { gameData: Game[] }) => {
        this.gameData = data.gameData;
      });
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
  }
}
