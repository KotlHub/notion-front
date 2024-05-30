import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsModalWindowService {
  fullWidth: boolean = true;
  font: string | null = localStorage.getItem("fontParameter");
  constructor() { }
}
