import { Component, OnDestroy } from '@angular/core';
import { EditCardListService, Property } from '../../services/edit-card-list.service';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { MenuItem } from 'src/app/interfaces/menu-item';

@Component({
  selector: 'app-editcardlist',
  templateUrl: './editcardlist.component.html',
  styleUrls: ['./editcardlist.component.css']
})
export class EditcardlistComponent implements OnDestroy {
  description: string = "";
  currentDescription: string = "";
  showPropertyDropdown: boolean = false;
  propertyOptions: MenuItem[] = [
    { name: 'Date', icon: "assets/icons/edit_card_list/add.svg", id: "sortButton" },
    { name: 'Text', icon: "assets/icons/edit_card_list/adjust.svg", id: "titleOnlyButton" },
    { name: 'Number', icon: "assets/icons/edit_card_list/attach_file_add.svg", id: "createdByButton" },
    { name: 'Status', icon: "assets/icons/edit_card_list/calendar_month.svg", id: "inButton" },
    { name: 'Checkbox', icon: "assets/icons/edit_card_list/shoppingmode.svg", id: "dateButton" },
    { name: 'URL', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
    { name: 'Email', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
    { name: 'Phone', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
  ];

  currentList: Property[] = []; // Текущий список свойств

  constructor(private editCardListService: EditCardListService, private globalValuesService: GlobalValuesService) {}

  togglePropertyDropdown() {
    this.showPropertyDropdown = !this.showPropertyDropdown;
  }

  selectProperty(option: MenuItem) {
    // Создание нового элемента
    const newItem: Property = {
      name: option.name,
      description: "test",
      icon: option.icon
    };
  
    // Добавление нового элемента в текущий список
    this.currentList.push(newItem);
  
    // Закрытие выпадающего списка после выбора
    this.showPropertyDropdown = false;
  
    console.log(this.currentList);
  }
  

  // isCardListVisible(): boolean {
  //   this.currentDescription = this.editCardListService.currentItemDescription;

  //   if (this.editCardListService.editCardListVisible) {
  //     // console.log('open');
  //   }
  //   if (!this.editCardListService.editCardListVisible) {
  //     // console.log('close');
  //     this.description = "";
  //   }

  //   return this.editCardListService.editCardListVisible;
  // }

  // editCardList() {
  //   this.editCardListService.setDescription(this.description);
  // }

  ngOnDestroy(): void {
    // Добавьте необходимый код здесь, если требуется выполнить очистку или отписку.
  }
}
