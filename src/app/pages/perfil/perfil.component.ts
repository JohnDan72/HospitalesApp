import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario: Usuario;
  public formSubmitted = false;
  public perfilForm: FormGroup;
  public imgFile: File;
  public imgTemp: string;
  
  constructor(private userService: UsuarioService,
              private fb: FormBuilder,
              private fus: FileUploadService) {
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
      this.userService.actualizarPerfil(this.perfilForm.value, this.userService.usuario.id).subscribe( resp => {
        const { nombre , email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

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

  cambiarImg( imagen: File ){
    
    this.imgFile = imagen;

    if(!imagen) {
      this.imgTemp = null;
      return;
    };

    const reader = new FileReader();
    reader.readAsDataURL( imagen );

    reader.onloadend = () => {
      this.imgTemp = <string>reader.result;
    }
  }

  subirImg(){
    this.fus.actualizarFoto( this.imgFile , 'usuarios' , this.usuario.id )
    .then( resp => {
      console.log("Resp desde service");
      console.log(resp);
      if(resp.ok){
        this.usuario.img = resp.fileName;
        Swal.fire({
          icon: 'success',
          title: 'Foto actualizada exitósamente',
          showConfirmButton: false,
          timer: 2500
        });
      }
      else{
        let errorsLabels = ``;
        resp.errors.forEach(errObj => {
          errorsLabels += `${errObj.msg} `;
        });
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorsLabels
        })
      }
    })
  }

}
