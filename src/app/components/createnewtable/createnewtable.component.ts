import { Component } from '@angular/core';

@Component({
  selector: 'app-createnewtable',
  templateUrl: './createnewtable.component.html',
  styleUrl: './createnewtable.component.css'
})
export class CreatenewtableComponent {

  tableData: (string | null)[][] = [
    ['Name', 'Number', 'Text'],
    [null, 'null', ''],
    ['', '', 'хуй']
  ];

  id: string = '';
  headerInput: string = 'Untitled';
  currentLink: string = "";


  addRow() {
    this.tableData.push(Array(this.tableData[0].length).fill(null));
    console.log(this.tableData);
  }

  addColumn() {
    this.tableData.forEach(row => row.push(null));
  }

  saveData(event: Event, rowIndex: number, colIndex: number) {
    const newValue = (event.target as HTMLDivElement).innerText;
    this.tableData[rowIndex][colIndex] = newValue;
    event.preventDefault();
    
  }


}
