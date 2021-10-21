import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public menuItems: any[];
  @Input() usuario: Usuario;

  public searchForm: FormGroup = this.fb.group({
    termino: ['',Validators.required]
  });

  constructor(private sidebarSevice: SidebarService, 
              private userService: UsuarioService,
              private fb: FormBuilder,
              private router: Router) { 
    this.menuItems = sidebarSevice.menu;
  }

  ngOnInit(): void {
  }

  logOut(){
    this.userService.logOut();
  }

  buscar(){
    if(!this.searchForm.invalid){
      this.router.navigateByUrl(`/dashboard/busca/${this.searchForm.get('termino').value}`);
    }
  }
}
