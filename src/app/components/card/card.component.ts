import { Component, Input, OnInit } from "@angular/core";
import { GameCardService } from "../game-card.service";
import { Game } from "../game.model";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  isTrue: boolean = true;

  @Input() data: Game;

  constructor(private gameService: GameCardService) {}

  ngOnInit() {}

  onCorrect() {
    this.isTrue = true;
  }
  onWrong() {
    this.isTrue = false;
  }

  //*************edit handler */
  onEdit(id: string) {
    this.gameService.onEdit(id);
  }

  //********************delete handler */
  onDelete(id: string) {
    this.gameService.onDelete(id);
  }
}
