import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  menuItems: any[];
  // public imgUrl = '';
  @Input() usuario: Usuario;

  constructor(private sidebarSevice: SidebarService, private userService: UsuarioService) { 
    this.menuItems = sidebarSevice.menu;
    // this.imgUrl = userService.usuario.imagenUsr;
  }

  ngOnInit(): void {
  }

  logOut(){
    this.userService.logOut();
  }
}
