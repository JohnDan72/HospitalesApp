import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { SidebarService } from '../services/sidebar.service';

declare function miCustomFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  usuarioSession: Usuario;
  constructor(private settingService: SettingsService,
              private userService: UsuarioService,
              private sidebarService: SidebarService) { 
                this.usuarioSession = userService.usuario;
              }

  ngOnInit(): void {
    miCustomFunction();
  }

}
