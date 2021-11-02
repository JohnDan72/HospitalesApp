import { Component } from '@angular/core';

@Component({
  selector: 'app-notpagefound',
  templateUrl: './notpagefound.component.html',
  styleUrls: ['./notpagefound.component.css']
})
export class NotpagefoundComponent {
  public title = 'Page Not Found';
  public subtitle = 'Ups! Parece que no se encuentra el recurso que buscas, puedes regresar de vuelta al inicio.';
  public imgPath1 = './assets/images/error-404.png';
  public imgPath2 = './assets/images/medicalwrapper1.png';
  constructor() {}

}
