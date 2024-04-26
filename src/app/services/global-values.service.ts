import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalValuesService {
  api: string = 'https://26.5.203.178:5001/api/';
  constructor() { }
}
