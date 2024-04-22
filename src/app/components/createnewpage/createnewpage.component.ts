import { Component, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createnewpage',
  templateUrl: './createnewpage.component.html',
  styleUrls: ['./createnewpage.component.css']
})
export class CreatenewpageComponent implements OnDestroy {

  @ViewChild('contentEditable', { static: false }) contentEditable!: ElementRef;
  @ViewChild('buttonContainer', { static: false }) buttonContainer!: ElementRef;
  @ViewChild('linkContainer', { static: false }) linkContainer!: ElementRef;

  isLinkContainer: boolean = false;


  constructor(private UserSevice: UserService) {}

  userEmail = this.UserSevice.userEmail;
  userToken = this.UserSevice.userToken;
  makeFormat(event: MouseEvent, style: string) {
    event.stopPropagation();
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand(style, false, undefined);
    this.contentEditable.nativeElement.focus();
  }

  toggleLinkContainer() {
    this.isLinkContainer = !this.isLinkContainer;
  }

  confirmLink(event: MouseEvent) {
    let linkContainer = (event.target as HTMLElement).parentElement;
    while (linkContainer && !linkContainer.classList.contains('link-container')) {
        linkContainer = linkContainer.parentElement;
    }

    if (linkContainer) {
        const linkInput = linkContainer.querySelector('.link-input') as HTMLInputElement;
        const link = linkInput.value;
        const selection = window.getSelection();
        if (selection) {
            const range = selection.getRangeAt(0);
            const linkElement = document.createElement('a');
            linkElement.href = link;
            linkElement.textContent = range.toString();
            range.deleteContents();
            range.insertNode(linkElement);
        }
        this.toggleLinkContainer(); // Hide the link container after confirming link
    } else {
      console.error('linkContainer is undefined');
    }
  }

  cancelLink(event: MouseEvent) {
    this.toggleLinkContainer(); // Hide the link container after canceling link
  }



  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    const selection = window.getSelection();
    const target = event.target as HTMLElement;
    const buttonContainer = this.buttonContainer.nativeElement as HTMLElement;

    if (selection && selection.toString().length > 0 && !buttonContainer.contains(target)) {
      this.buttonContainer.nativeElement.style.display = 'block';
      this.buttonContainer.nativeElement.style.left = event.clientX + 'px';
      this.buttonContainer.nativeElement.style.top = event.clientY + 'px';
    } else if (selection?.toString().length === 0 && !buttonContainer.contains(target)) {
      this.buttonContainer.nativeElement.style.display = 'none';
    }
  }

  ngOnDestroy() {
    this.onClose();
  }

  onClose() {
    console.log('тут закинем старания юзера в бд'); 
  }
}
