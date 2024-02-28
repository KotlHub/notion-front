import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor(private LeftMenuService: LeftMenuService, private HeaderService: HeaderService) { }
  leftMenuVisible: boolean = false;

  toggleMenu()
  {
    this.leftMenuVisible = !this.leftMenuVisible;
    this.HeaderService.leftMenuVisible = !this.HeaderService.leftMenuVisible;
  }
}