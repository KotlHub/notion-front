import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  leftMenuVisible: boolean = true;
  settingsWindowVisible: boolean = true;
  constructor() { }
}
