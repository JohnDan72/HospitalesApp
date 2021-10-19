import { Component, OnInit , OnDestroy } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public totalHospitales: number = 0;
  public sessionData: Usuario;
  public hospitales: Hospital[] = [];
  public limit: number = 5;
  public page: number = 0;
  public maxPages: number = 0;
  public cargando = true;
  public busqueda = '';
  public imgSubscription: Subscription;

  constructor(private userService: UsuarioService, 
              private modalImgServ: ModalImagenService,
              private hospiService: HospitalService) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.cargarHospitales()
    // },3000);
    this.sessionData = this.userService.usuario;
    this.cargarHospitales();

    this.imgSubscription = this.modalImgServ.nuevaImg.subscribe( ({ uid , img }) => {
      // se actualiza solo la img del hospital actual para no cargar de nuevo el servicio
      this.hospitales.find( hospi => {
        if(hospi.id == uid){
          hospi.img = img;
        }
      });
      
    });

  }

  ngOnDestroy(): void{
    // para evitar fuga de memoria
    this.imgSubscription.unsubscribe();
  }

  openHospiform(){
    Swal.fire({
      title: 'Nuevo hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear'
    }).then((result) => {
      if(result.isConfirmed){
        console.log("Result: ");
        console.log(result);
        this.hospiService.crearNuevoHospital(result.value).subscribe( resp => {
            console.log(resp);
            Swal.fire(
              'Creado!!',
              'Hospital nuevo creado con éxito',
              'success'
            );
            this.cargarHospitales();
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
            }
        );
      }
    })
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospiService.getHospitales(this.limit, this.page, this.busqueda).subscribe(resp => {
      const { total, results } = resp;
      this.totalHospitales = total;
      this.hospitales = results;
      // se calcula número máximo de páginas
      this.maxPages = (this.totalHospitales % this.limit == 0) ? this.totalHospitales / this.limit - 1 : Math.trunc(this.totalHospitales / this.limit);
      this.cargando = false;
      
      // console.log(resp);
    })
  }

  cambiarPagina(valor: number) {

    this.page += valor;
    if (this.page < 0) this.page = 0;
    if (this.page > this.maxPages) this.page = this.maxPages;

    this.cargarHospitales();
  }

  buscarPorCadena(cadena: string) {
    this.busqueda = cadena;
    this.page = 0;
    this.cargarHospitales();
  }

  cambiarNombre( hospi: Hospital ){
    this.hospiService.actualizarNombre( hospi.nombre, hospi.id).subscribe(resp => {
      console.log(resp);
      Swal.fire(
        'Changed',
        'Hospital name was changed!',
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

  confirmarBorrado(hospi: Hospital) {
    Swal.fire({
      title: `¿Estás seguro de borrar el hospital: ${hospi.nombre}?`,
      text: "No podrás deshacer esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospiService.borrarHospital(hospi.id).subscribe(resp => {
          this.hospitales = this.hospitales.filter( item => item.id != hospi.id );
          Swal.fire(
            'Deleted!',
            'Hospital borrado!',
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

  abrirModalImg( hospi: Hospital ){
    // console.log(hospi);
    this.modalImgServ.abrirModal( 'hospitales' , hospi.id , hospi.imagenHospi )
  }

}
