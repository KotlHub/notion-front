import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url !== '/404') {
      this.router.navigateByUrl('/404');
    }
  }
}
