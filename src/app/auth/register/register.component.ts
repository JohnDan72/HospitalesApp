import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Options } from 'selenium-webdriver';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm = this.fb.group(
    {
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),]],
      email: ['', [
        Validators.required,]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)]],
      password2: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)],
        this.passwordsIguales('password', 'password2')],
        
      terminos: [true, [
        Validators.required,]]
    }
  );
  public formSubmitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  registrarUsuario(){
    this.formSubmitted = true;
    // console.log( this.registerForm.value );
    console.log( this.registerForm );

    if(this.registerForm.valid){
      console.log("Success!!");
    }
    else{
      console.log("Fail!!!");
    }
  }

  campoNoValido( campo: string ): boolean{
    if(this.registerForm.get( campo ).invalid && this.formSubmitted){
      return true;
    }
    else{
      return false;
    }
  }

  aceptaTerminos(){
    if(!this.registerForm.get('terminos').value && this.formSubmitted){
      return true;
    }
    else{
      return false;
    }
  }

  checarPasswords(){
    const pass1 = this.registerForm.get('password');
    const pass2 = this.registerForm.get('password2');

    if(pass1.value !== pass2.value){
      return true;
    }
    return false;
  }



  passwordsIguales(pass: string , pass2: string){
    return ( formGroup: FormGroup ) => {
      const passControl = formGroup.get(pass);
      const passControl2 = formGroup.get(pass2);

      if( passControl.value === passControl2.value ){
        passControl2.setErrors(null);
      }
      else{
        passControl2.setErrors({ noIgual: true })
      }
    }
  }
}
