import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  public mainTheme = document.querySelector("#theme");

  constructor() { 
    const themeUrl: string = (localStorage.getItem('theme')) ? localStorage.getItem('theme') : `./assets/css/colors/default.css`;
    document.querySelector('#theme').setAttribute('href',themeUrl);
  }

  changeColor(theme: string){
    const url = `./assets/css/colors/${theme}.css`;
    this.mainTheme.setAttribute('href', url);
    localStorage.setItem('theme',url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const themes = document.querySelectorAll('.selector');
    themes.forEach( item => {
      item.classList.remove('working');
      const btnTheme = item.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.mainTheme.getAttribute('href');
      if(btnThemeUrl === currentTheme){
        item.classList.add('working');
      }
    })
  }
}
