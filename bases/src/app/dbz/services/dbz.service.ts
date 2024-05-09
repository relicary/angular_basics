import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class DbzService {
  public characters: Character[] = [
    {
      id: uuid(),
      name: 'Krillin',
      power: 1000,
    },
    {
      id: uuid(),
      name: 'Goku',
      power: 9500,
    },
    {
      id: uuid(),
      name: 'Vegeta',
      power: 7500,
    },
  ];

  onNewCharacter(character: Character): void {

    const newCharacter: Character = {
      id: uuid(),
      ...character
    }

    this.characters.push(newCharacter);
  }

  onDeleteCharacter(id: number): void {
    this.characters.splice(id, 1);
  }

  onDeleteCharacterById(id: string): void {
    this.characters = this.characters.filter(c => c.id !== id);
  }
}
