import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

interface Card {
  name: string;
  id: string;
  file: File | null; // Заменяем string на File
  imageUrl?: string;
}

@Component({
  selector: 'app-createnewgallery',
  templateUrl: './createnewgallery.component.html',
  styleUrls: ['./createnewgallery.component.css']
})
export class CreatenewgalleryComponent {
  gallery: Card[] = [];
  headerInput: string = "";

  createCard(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      const newCard: Card = {
        name: "Card_name",
        id: Date.now().toString(),
        file: file
      }
      this.gallery.push(newCard);
    }
    event.target.value = null;
  }

  onCardNameBlur(event: FocusEvent, card: Card) {
    const newValue = (event.target as HTMLInputElement).value;
    card.name = newValue;
  }

  onHeaderBlur() {
    console.log(this.headerInput);
  }


  getImageUrl(card: Card): string | null {
  if (card.file) {
    // Проверяем, был ли URL-адрес уже кэширован
    if (card.imageUrl) {
      return card.imageUrl;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        // Кэшируем URL-адрес изображения
        card.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(card.file);
    }
  }
  return card.imageUrl ?? null;
  }

}
