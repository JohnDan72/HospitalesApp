import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  formSubmitted = false;
  perfilForm: FormGroup;
  
  constructor(private userService: UsuarioService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.usuario = this.userService.usuario;
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [ Validators.required,
                                      Validators.minLength(3), 
                                      Validators.maxLength(25)]],
      email: [this.usuario.email, [   Validators.required ]]
    })
  }

  campoInvalido( campo: string ){
    return this.perfilForm.get(campo).invalid && this.formSubmitted;
  }

  guardarCambios(){
    this.formSubmitted = true;
    if(this.perfilForm.invalid){
      console.log("Invalid!!!");
    }
    else{
      console.log("Success!!");
      this.userService.actualizarPerfil(this.perfilForm.value).subscribe( resp => {
        console.log( resp );
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado exitósamente',
          showConfirmButton: false,
          timer: 2500
        });
      },err => {
        let errorsLabels = ``;
        err.error.errors.forEach(errObj => {
          errorsLabels += `${errObj.msg} `;
        });
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorsLabels
        })
        console.log(err)
      }
      )
    }
  }

}
