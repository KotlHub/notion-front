import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

interface Card {
  name: string;
  id: string;
  file: string;
}

@Component({
  selector: 'app-createnewgallery',
  templateUrl: './createnewgallery.component.html',
  styleUrl: './createnewgallery.component.css'
})
export class CreatenewgalleryComponent {
  gallery: Card[] = [];
  headerInput: string = "";

  createCard() {
    const newCard: Card = {
      name: "Card_name",
      id: Date.now().toString(),
      file: "assets/avatar.png"
    }
    this.gallery.push(newCard);
  }

  // onDrop(event: CdkDragDrop<List[]>) {
  //     moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
    
  // }


  onCardNameBlur(event: FocusEvent, card: Card) {
    const newValue = (event.target as HTMLInputElement).value;
    card.name = newValue;
  }

  onHeaderBlur() {
    console.log(this.headerInput);
  }
}