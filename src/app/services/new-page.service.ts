import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewPageService {
  newPageVisible: boolean = false;
  newPageName: string = '';
  justCreated: boolean = false;
  constructor() { }
}
