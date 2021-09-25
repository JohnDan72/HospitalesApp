import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const mainTheme = (localStorage.getItem('theme')) ? localStorage.getItem('theme') : `./assets/css/colors/default.css`;
    document.querySelector('#theme').setAttribute('href',mainTheme);
  }

}
