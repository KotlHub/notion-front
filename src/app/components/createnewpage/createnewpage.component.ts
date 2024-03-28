import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-createnewpage',
  templateUrl: './createnewpage.component.html',
  styleUrls: ['./createnewpage.component.css']
})
export class CreatenewpageComponent {

  @ViewChild('contentEditable', { static: false }) contentEditable!: ElementRef;

  constructor() { }

  makeBold() {
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('bold', false, undefined);
    this.contentEditable.nativeElement.focus();
  }

  makeItalic() {
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('italic', false, undefined);
    this.contentEditable.nativeElement.focus();
  }
}
