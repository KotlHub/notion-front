import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditCardListService } from 'src/app/services/edit-card-list.service';
import { BigModalWindowService } from 'src/app/services/big-modal-window.service';
import { NewPageService } from 'src/app/services/new-page.service';
import { ActivatedRoute } from '@angular/router';

interface List {
  name: string;
  id: string;
  description?: string;
}

@Component({
  selector: 'app-createnewlist',
  templateUrl: './createnewlist.component.html',
  styleUrls: ['./createnewlist.component.css']
})
export class CreatenewlistComponent implements OnDestroy, OnInit {
  lists: List[] = [];
  newListName: string = "";
  headerInput: string = "";
  id: string = "";
  
  constructor(private editCardListService: EditCardListService, private BigModalWindowService: BigModalWindowService, 
    private newPageService: NewPageService, private route: ActivatedRoute
  ) {
    this.editCardListService.descriptionSubject.subscribe(description => {
      if (this.lists.length > 0) {
        const index = this.lists.findIndex(list => list.id === this.editCardListService.currentItemId);
        if (index !== -1) {
          this.lists[index].description = description;
        }
      }
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.id);
    this.headerInput = this.newPageService.newPageName;
    console.log(this.headerInput);
  }

  createList() {
    if (!this.newListName.trim()) {
      let counter = 1;
      let newName = `Untitled${counter}`;
  
      while (this.lists.some(list => list.name === newName)) {
        counter++;
        newName = `Untitled${counter}`;
      }
      
      this.newListName = newName;
    } else {
      const existingList = this.lists.find(list => list.name === this.newListName);
  
      if (existingList) {
        let counter = 1;
        let newName = `${this.newListName}${counter}`;
  
        while (this.lists.some(list => list.name === newName)) {
          counter++;
          newName = `${this.newListName}${counter}`;
        }
        this.newListName = newName;
      }

    }
    
    const newList: List = {
      name: this.newListName,
      id: Date.now().toString()
    };

    this.lists.push(newList);

    this.newListName = '';
    console.log('lists: ', this.lists);
  }

  onDrop(event: CdkDragDrop<List[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }

  onListNameBlur(event: FocusEvent, list: List) {
    const newValue = (event.target as HTMLInputElement).value;
    list.name = newValue;
  }

  onHeaderBlur() {
    console.log(this.headerInput);
  }

  toggleCard(list: List){
    this.editCardListService.currentItemId = list.id;
    this.editCardListService.currentItemDescription = list.description || "";
    console.log("current description", this.editCardListService.currentItemDescription);
    this.editCardListService.editCardListVisible = !this.editCardListService.editCardListVisible;
    this.BigModalWindowService.modalVisible = this.editCardListService.editCardListVisible;
  }  

  ngOnDestroy(): void {
    
  }
}
