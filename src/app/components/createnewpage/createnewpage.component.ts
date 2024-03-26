import { Component } from '@angular/core';

@Component({
  selector: 'app-createnewpage',
  templateUrl: './createnewpage.component.html',
  styleUrls: ['./createnewpage.component.css']
})
export class CreatenewpageComponent {

  inputText: string = '';

  constructor() { }

  resizeTextarea(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto'; // reset to auto height
    textarea.style.height = textarea.scrollHeight + 'px'; // set the height to the scrollHeight
  }

}
