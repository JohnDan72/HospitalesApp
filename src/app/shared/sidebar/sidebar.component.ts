import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  @Input() usuario: Usuario;

  constructor(private sidebarSevice: SidebarService,
    private userService: UsuarioService) {

    // this.usuario = userService.usuario.imagenUsr;
    this.sidebarSevice.cargarMenu().subscribe((resp: any) => {
      this.menuItems = resp.sidebarMenu
    }, err => {
      console.log(err);
    })
  }

  ngOnInit(): void {}

}
