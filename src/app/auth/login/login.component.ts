import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;

  public loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '',[Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    password: ['',[Validators.required]],
    rememberMe: [false,[Validators.required]]
  });

  constructor(private fb: FormBuilder, 
              private _router: Router, 
              private userService: UsuarioService,
              private ngZone: NgZone) { }

  ngOnInit(): void { 
    this.renderButton();
  }

  login(){
    // console.log(this.loginForm);
    this.formSubmitted = true;

    if(this.loginForm.invalid){
      // console.log("Fail!!!!!!!");
    }
    else{
      // console.log("Success...");
      this.userService.loginUser( this.loginForm.value ).subscribe( resp => {
        if( this.loginForm.get('rememberMe').value ){
          localStorage.setItem('email',this.loginForm.get('email').value);
        }
        else{
          localStorage.removeItem('email');
        }
        // Redirigir al Dashboard
        this._router.navigateByUrl('/');
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
    // this._router.navigateByUrl('/');
  }

  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }
  async startApp(){
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }
  attachSignin(element) {
    // console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token);
          this.userService.loginGoogle(id_token).subscribe( resp => {
            this.ngZone.run( () => {
              // redirigir al dashboard
              this._router.navigateByUrl('/');
            })
          });

        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
