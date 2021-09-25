import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  
  public mainTheme = document.querySelector("#theme");
  
  constructor() { }

  ngOnInit(): void {
  }

  changeColor(theme){
    const url = `./assets/css/colors/${theme}.css`;
    this.mainTheme.setAttribute('href', url);
    localStorage.setItem('theme',url);
  }

}
