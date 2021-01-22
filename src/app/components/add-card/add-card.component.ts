import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Game } from "../game.model";
import { v4 as uuidv4 } from "uuid";
import { GameCardService } from "../game-card.service";

@Component({
  selector: "app-add-card",
  templateUrl: "./add-card.component.html",
  styleUrls: ["./add-card.component.css"],
})
export class AddCardComponent implements OnInit {
  addForm: FormGroup;
  id: string;
  data: Game[] = [];

  constructor(private gameService: GameCardService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.id = this.gameService.getId();
    if (this.id) {
      this.gameService.getItem().subscribe((data) => {
        console.log(data);
      });
      console.log(this.data);
      this.addForm.patchValue({
        question: this.data[0].question,
        answer: this.data[0].answer,
      });
    }
  }

  initForm() {
    this.addForm = this.fb.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]],
    });
  }

  onSubmit() {
    const id = uuidv4();
    const data = {
      id: id,
      question: this.addForm.value.question,
      answer: this.addForm.value.answer,
    };

    this.gameService.addData(data);
  }

  onCancel() {
    this.addForm.reset();
  }
}
