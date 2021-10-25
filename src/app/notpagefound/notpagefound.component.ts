import { Component } from '@angular/core';

@Component({
  selector: 'app-notpagefound',
  templateUrl: './notpagefound.component.html',
  styleUrls: ['./notpagefound.component.css']
})
export class NotpagefoundComponent {

  year = new Date().getFullYear();

  constructor() {
    document.querySelector('html').className = "allHeighWidth";
    document.body.className = "allHeighWidth";
  }

  ngOnDestroy() {
    document.querySelector('html').className = "";
    document.body.className = "";
  }
}
