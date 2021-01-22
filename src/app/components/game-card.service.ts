import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { remove } from "lodash";

import { Game } from "./game.model";

@Injectable({
  providedIn: "root",
})
export class GameCardService {
  gameData: Game[] = [];
  id: string;
  item: Game[] = [];

  private dataUpdated = new Subject<{ gameData: Game[] }>();
  private editUpdated = new Subject<{ gameData: Game[] }>();
  constructor() {}

  addData(data: Game) {
    this.gameData.unshift(data);
    this.dataUpdated.next({
      gameData: [...this.gameData],
    });
  }

  getAllData() {
    this.dataUpdated.next({
      gameData: [...this.gameData],
    });
  }

  getUpdatedListner() {
    return this.dataUpdated.asObservable();
  }

  //********************edit handler */

  onEdit(id: string) {
    this.item = this.gameData.filter((item) => item.id === id);
    this.editUpdated.next({
      gameData: this.gameData,
    });
  }

  getItem() {
    return this.editUpdated.asObservable();
  }

  //**********getId */
  getId() {
    return this.id;
  }

  //*************delete handler */
  onDelete(id: string) {
    const removeItem = remove(this.gameData, (item) => {
      return item.id === id;
    });
    console.log(removeItem);
    this.dataUpdated.next({
      gameData: [...this.gameData],
    });
  }
}
