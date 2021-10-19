import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  public totalMedicos: number = 0;
  public sessionData: Usuario;
  public medicos: Medico[] = [];
  public limit: number = 5;
  public page: number = 0;
  public maxPages: number = 0;
  public cargando = true;
  public busqueda = '';

  constructor(private userService: UsuarioService,
    private modalImgServ: ModalImagenService,
    private mediService: MedicoService,
    private hospiService: HospitalService) { }

  ngOnInit(): void {

    this.sessionData = this.userService.usuario;
    this.cargarMedicos();

    this.modalImgServ.nuevaImg.subscribe(({ uid, img }) => {
      // se actualiza solo la img del hospital actual para no cargar de nuevo el servicio
      this.medicos.find(medi => {
        if (medi.id == uid) {
          medi.img = img;
        }
      });

    });

  }

  openMedicoForm() {
    this.hospiService.getAllHospitales().subscribe(hospitales => {
      let optionsSelect = ``;
      hospitales.forEach((hospi, index) => {
        optionsSelect += `<option value="${hospi.id}">${index + 1} - ${hospi.nombre}</option>`;
      });
      console.log(hospitales);
      Swal.fire({
        title: 'Nuevo Médico',
        html: `
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label for="nombre_medico" class="form-label"></label>
                <input type="text" id="nombre_medico" class="form-control" placeholder="Nombre del médico">
              </div>
                
            </div>
            <div class="col-12 mt-3">
              <div class="form-group">
                <label for="hospital_select" class="form-label"></label>
                <select class="form-control" id="hospital_select">
                    ${optionsSelect}
                </select>
              </div>
                
            </div>
          </div>
        </div>`,
        confirmButtonText: 'Crear',
        showCancelButton: true,
        cancelButtonText: 'cancelar',
        focusConfirm: false,
        preConfirm: () => {
          const nombreMedico = (<HTMLInputElement>document.querySelector('#nombre_medico')).value
          const hospitalSelected = (<HTMLInputElement>document.querySelector('#hospital_select')).value
          if (!(nombreMedico.trim()) || !(hospitalSelected.trim())) {
            Swal.showValidationMessage(`Ingresa el nombre y elije un hospital para el médico`)
          }
          return { nombreMedico, hospitalSelected }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.crearNuevoMedico({nombre: result.value.nombreMedico , id_hospital: result.value.hospitalSelected});
        }
      });
    })

  }

  crearNuevoMedico(data: { nombre: string, id_hospital: string }) {
    this.mediService.createNewMedico(data)
      .subscribe(resp => {
        Swal.fire(
          'Creado!',
          'Médico creado exitósamente',
          'success'
        );
        this.cargarMedicos();
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

  cargarMedicos() {
    this.cargando = true;
    this.mediService.getMedicosWithBusqueda(this.limit, this.page, this.busqueda).subscribe(resp => {
      const { total, results } = resp;
      this.totalMedicos = total;
      this.medicos = results;
      // se calcula número máximo de páginas
      this.maxPages = (this.totalMedicos % this.limit == 0) ? this.totalMedicos / this.limit - 1 : Math.trunc(this.totalMedicos / this.limit);
      this.cargando = false;

      console.log(resp);
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

  cambiarPagina(valor: number) {

    this.page += valor;
    if (this.page < 0) this.page = 0;
    if (this.page > this.maxPages) this.page = this.maxPages;

    this.cargarMedicos();
  }

  buscarPorCadena(cadena: string) {
    this.busqueda = cadena;
    this.page = 0;
    this.cargarMedicos();
  }

  updateMedico(medicoToUpdate: Medico) {
    this.mediService.updateMedico({ nombre: medicoToUpdate.nombre, id_hospital: medicoToUpdate.hospital.id }, medicoToUpdate.id)
      .subscribe(resp => {
        console.log(resp);
        Swal.fire(
          'Changed',
          'Medico name was changed!',
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

  confirmarBorrado(mediToDelete: Medico) {
    Swal.fire({
      title: `¿Estás seguro de borrar a: ${mediToDelete.nombre}?`,
      text: "No podrás deshacer esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mediService.deleteMedico(mediToDelete.id).subscribe(resp => {
          this.page = 0;
          this.cargarMedicos();
          // this.medicos = this.medicos.filter(item => item.id != mediToDelete.id);
          Swal.fire(
            'Deleted!',
            'Médico borrado!',
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

  abrirModalImg(medi: Medico) {
    // console.log(hospi);
    this.modalImgServ.abrirModal('medicos', medi.id, medi.imagenMed)
  }

}
