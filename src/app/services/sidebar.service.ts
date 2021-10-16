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
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios' , url: '/dashboard/usuarios'},
        { titulo: 'Hospitales' , url: '/dashboard/hospitales'},
        { titulo: 'Medicos' , url: '/dashboard/medicos'}
      ]
    }
  ]

  constructor() { }
}
