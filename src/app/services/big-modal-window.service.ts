import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BigModalWindowService {
  modalVisible: boolean = true;
  constructor() { }
}
