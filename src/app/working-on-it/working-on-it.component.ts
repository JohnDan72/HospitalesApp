import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-working-on-it',
  templateUrl: './working-on-it.component.html',
  styleUrls: ['./working-on-it.component.css']
})
export class WorkingOnItComponent implements OnInit {

  year = new Date().getFullYear();

  constructor() {
    document.querySelector('html').className = "allHeighWidth";
    document.body.className = "allHeighWidth";
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    document.querySelector('html').className = "";
    document.body.className = "";
  }

}
