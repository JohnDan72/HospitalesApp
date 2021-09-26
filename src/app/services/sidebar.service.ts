import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      titulo: 'Dashboard!!',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main' , url: '/'},
        { titulo: 'Progress' , url: '/dashboard/progress'},
        { titulo: 'Gráfica' , url: '/dashboard/grafica1'},
        { titulo: 'Promesas' , url: '/dashboard/promesas'},
        { titulo: 'RXJS' , url: '/dashboard/rxjs'}
      ]
    }
  ]

  constructor() { }
}
