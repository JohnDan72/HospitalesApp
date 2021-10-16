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
    this.menuItems = sidebarSevice.menu;
    // this.usuario = userService.usuario.imagenUsr;
  }

  ngOnInit(): void {
  }

  checarRole( titulo: string ){
    if( titulo == 'Usuarios'){
      if( this.usuario.role != 'ADMIN_ROLE')
        return false;
    }
    return true;
  }

}
