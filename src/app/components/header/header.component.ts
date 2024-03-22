import { Component, ViewChild, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() LeftMenuToggled = new EventEmitter<boolean>(); 
  menuVisible: boolean = false;
  avatarLink: String = "assets\\avatar.png";
  constructor(private HeaderService: HeaderService) { }
  ngOnInit(): void {

  }

  settingsWindowToggle()
  {
    this.HeaderService.settingsWindowVisible = !this.HeaderService.settingsWindowVisible;

  }

  LeftMenuToggle() 
  {
    this.menuVisible = !this.menuVisible;
    this.LeftMenuToggled.emit(this.menuVisible);
    //console.log(this.menuVisible);
  }

}