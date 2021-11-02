import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-central-card',
  templateUrl: './central-card.component.html',
  styleUrls: ['./central-card.component.css']
})
export class CentralCardComponent {
  @Input() title;
  @Input() subtitle;
  @Input() imgPath1;
  @Input() imgPath2;
  
  public year = new Date().getFullYear();
  constructor() {
    document.querySelector('html').className = "allHeighWidth";
    document.body.className = "allHeighWidth";
  }

  ngOnDestroy() {
    document.querySelector('html').className = "";
    document.body.className = "";
  }

}
