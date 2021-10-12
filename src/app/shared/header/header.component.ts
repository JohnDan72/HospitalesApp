import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  menuItems: any[];

  constructor(private sidebarSevice: SidebarService, private userService: UsuarioService) { 
    this.menuItems = sidebarSevice.menu;
    // console.log(this.menuItems)
  }

  ngOnInit(): void {
  }

  logOut(){
    this.userService.logOut();
  }
}
