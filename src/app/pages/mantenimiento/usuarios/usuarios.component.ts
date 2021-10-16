import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public sessionData: Usuario;
  public usuarios: Usuario[] = [];
  public limit: number = 5;
  public page: number = 0;
  public maxPages: number = 0;
  public cargando = true;
  public busqueda = '';

  constructor(private userService: UsuarioService) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.cargarUsuarios()
    // },3000);
    this.sessionData = this.userService.usuario;
    this.cargarUsuarios();

  }

  cargarUsuarios() {
    this.cargando = true;
    this.userService.getUsuariosBusqueda(this.limit, this.page, this.busqueda).subscribe(resp => {
      const { total, results } = resp;
      this.totalUsuarios = total;
      this.usuarios = results;
      // se calcula número máximo de páginas
      this.maxPages = (this.totalUsuarios % this.limit == 0) ? this.totalUsuarios / this.limit - 1 : Math.trunc(this.totalUsuarios / this.limit);
      // console.log(resp);
      this.cargando = false;
    })
  }

  cambiarPagina(valor: number) {

    this.page += valor;
    if (this.page < 0) this.page = 0;
    if (this.page > this.maxPages) this.page = this.maxPages;

    this.cargarUsuarios();
  }

  buscarPorCadena(cadena: string) {
    this.busqueda = cadena;
    this.page = 0;
    this.cargarUsuarios();
  }

  cambiarRole( user: Usuario ){
    this.userService.actualizarPerfil({nombre: user.nombre , email: user.email , role: user.role}, user.id).subscribe(resp => {
      Swal.fire(
        'Changed',
        'user role was changed!',
        'success'
      )
    }, err => {
      let errorsLabels = ``;
      err.error.errors.forEach(errObj => {
        errorsLabels += `${errObj.msg} `;
      });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorsLabels
      })
    })
  }
  confirmarBorrado(user: Usuario) {
    Swal.fire({
      title: `¿Estás seguro de borrar a ${user.nombre}?`,
      text: "No podrás deshacer esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.borrarUsuario(user.id).subscribe(resp => {
          this.usuarios = this.usuarios.filter( us => us.id != user.id );
          Swal.fire(
            'Deleted!',
            'Usuario borrado!',
            'success'
          )
        }, err => {
          let errorsLabels = ``;
          err.error.errors.forEach(errObj => {
            errorsLabels += `${errObj.msg} `;
          });
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorsLabels
          })
        })

      }
    })
  }
}
