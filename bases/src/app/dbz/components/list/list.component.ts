import { Component } from "@angular/core";
import { Character } from "../../interfaces/character.interface";

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent {

  public characterList: Character[] = [{
    name: 'Trunks',
    power: 10
  }];

}
