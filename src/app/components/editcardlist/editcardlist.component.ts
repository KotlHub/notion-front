import { Component, OnDestroy } from '@angular/core';
import { EditCardListService } from '../../services/edit-card-list.service';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { Property } from '../../services/edit-card-list.service';
@Component({
  selector: 'app-editcardlist',
  templateUrl: './editcardlist.component.html',
  styleUrls: ['./editcardlist.component.css']
})
export class EditcardlistComponent{
  
  constructor(private editCardListService: EditCardListService, private globalValuesService: GlobalValuesService) { }
  description: string = "";
  currentDescription: string = "";
  currentList: Property[] = [];
  showPropertyDropdown: boolean = false;
  propertyOptions: MenuItem[] = [
    { name: 'Date', icon: "assets/icons/edit_card_list/add.svg", id: "sortButton"},
    { name: 'Text', icon: "assets/icons/edit_card_list/adjust.svg", id: "titleOnlyButton"},
    { name: 'Number', icon: "assets/icons/edit_card_list/attach_file_add.svg", id: "createdByButton" },
    { name: 'Status', icon: "assets/icons/edit_card_list/calendar_month.svg", id: "inButton"},
    { name: 'Checkbox', icon: "assets/icons/edit_card_list/shoppingmode.svg", id: "dateButton" },
    { name: 'URL', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
    { name: 'Email', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
    { name: 'Phone', icon: "assets/icons/search_page/swap_vert.svg", id: "dateButton" },
  ];

  togglePropertyDropdown() {
    this.showPropertyDropdown = !this.showPropertyDropdown;
  }

  selectProperty(option: MenuItem) {
    // Creating a new element
    const newItem = {
      id: this.globalValuesService.generateUUID(),
      name: option.name, // Access the name property of the option
      description: "test",
      icon: option.icon
    };
  
    // Add the new element to currentpropertyList
    this.editCardListService.currentpropertyList.push(newItem);
  
    // Add the new element to currentList
    this.currentList.push(newItem);
  
    this.showPropertyDropdown = false; // Hide the dropdown list after selection
    console.log(this.currentList);
  }
  
  isCardListVisible(): boolean {
    this.currentDescription = this.editCardListService.currentItemDescription;

    if(this.editCardListService.editCardListVisible)
      {
        // console.log('open');
      }
    if(!this.editCardListService.editCardListVisible)
      {
        // console.log('close');
        this.description = "";
      }
    
    return this.editCardListService.editCardListVisible;
  }

  editCardList() {
    this.editCardListService.setDescription(this.description);
  }
}
