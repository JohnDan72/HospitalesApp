import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup = this.fb.group(
    {
      nombre: ['asd', [
        Validators.required,
        Validators.minLength(3),]],
      email: ['asd@gmail.com', [
        Validators.required,]],
      password: ['asdasd', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)]],
      password2: ['asdasd', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)],
      ],

      terminos: [true, [
        Validators.required,
        this.checkTerms]]
    }, {
    validator: this.passwordsIguales('password', 'password2')
  }
  );
  public formSubmitted: boolean = false;

  constructor(private fb: FormBuilder, 
              private userService: UsuarioService,
              private _router: Router) { 
    
  }

  registrarUsuario() {
    this.formSubmitted = true;
    // console.log( this.registerForm.value );
    console.log(this.registerForm);

    if (this.registerForm.invalid) {
      console.log("Fail!!");
      return;
    }
    // guardar form llamando al nuestro servicio de usuario
    this.userService.crearUsuario(this.registerForm.value).subscribe(
      resp => {
        console.log("usuario creado!!!");
        console.log(resp);
        
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado exitósamente',
          showConfirmButton: false,
          timer: 2500
        });

        setTimeout(() => {
          this._router.navigate(['/login'])
        },2500)
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
        console.log(err)
      }
    );
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }

  aceptaTerminos() {
    if (!this.registerForm.get('terminos').value && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }
  checkTerms(termControl: FormControl) {
    return (termControl.value) ? null: { termsAceptted : false };
  }

  checarPasswords() {
    const pass1 = this.registerForm.get('password');
    const pass2 = this.registerForm.get('password2');

    if (pass1.value !== pass2.value && this.formSubmitted) {
      return true;
    }
    return false;
  }



  passwordsIguales(campo1: string, campo2: string) {

    return (control: AbstractControl): ValidationErrors | null => {
      const pass1 = control.get(campo1);
      const pass2 = control.get(campo2);

      if (pass1.value !== pass2.value) {
        return { noIguales: true };
      }
      return null;
    }



  }
}
