import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios()
    .then( usuarios => {
      console.log(usuarios);
    });
  }

  getUsuarios() {
    const promesa = new Promise((resolve, reject) => {
      fetch(`https://reqres.in/api/users?page=2`)
        .then(response => response.json())
        .then(myJson => {
          resolve(myJson.data);
        })
    });

    return promesa;

  }

}
