import { Component } from '@angular/core';

@Component({
  selector: 'app-working-on-it',
  templateUrl: './working-on-it.component.html',
  styleUrls: ['./working-on-it.component.css']
})
export class WorkingOnItComponent {
  public title = 'Working on it';
  public subtitle = 'Actualmente estamos trabajando en este modulo para que este listo lo antes posible. Disculpe las molestias';
  public imgPath1 = './assets/images/working2.png';
  public imgPath2 = './assets/images/medical_9.png';
  constructor() {}

}
