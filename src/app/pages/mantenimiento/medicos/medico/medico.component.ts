import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public formSubmitted = false;
  public cargando = true;
  public medicoSeleccionado: Medico = null;
  public hospitalesOptions: Hospital[];
  public hospitalSelected: Hospital;

  constructor(private hospiService: HospitalService,
    private medService: MedicoService,
    private activetedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.cargarHospitales();
    this.cargarMedico();
  }

  // form init
  initForm() {
    this.medicoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      id_hospital: ['', [Validators.required]]
    });

    this.medicoForm.get('id_hospital').valueChanges.subscribe(id_hospital => {
      this.hospitalSelected = this.hospitalesOptions.find(h => h.id == id_hospital);
    })
  }
  // cargar hospitales for select
  cargarHospitales() {
    this.hospiService.getAllHospitales().subscribe(hospitales => {
      this.hospitalesOptions = hospitales;
      console.log("Hospitales");
      console.log(this.hospitalesOptions);
    })
  }
  // cargar médico si existe
  cargarMedico() {
    this.activetedRoute.params.subscribe(params => {
      // console.log(params);
      if (params.uid !== 'nuevo') {
        this.medService.getMedicoById(params.uid).subscribe(resp => {
          this.medicoSeleccionado = resp.medico;
          this.medicoForm.get('nombre').setValue(this.medicoSeleccionado.nombre);
          this.medicoForm.get('id_hospital').setValue(this.medicoSeleccionado.hospital.id);
          // console.log(this.medicoSeleccionado);
        }, err => {
          let errorsLabels = ``;
          err.error.errors.forEach(errObj => {
            errorsLabels += `${errObj.msg} `;
          });
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorsLabels
          });
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard/medicos');
          }, 1500);
        });
      }
    });
  }
  // validations
  campoInvalido(campo: string) {
    return this.medicoForm.get(campo).invalid && this.formSubmitted;
  }
  // send form
  guardarCambios() {

    this.formSubmitted = true;

    if (!this.medicoForm.invalid) {
      if (!this.medicoSeleccionado) { //nuevo médico, crear
        this.medService.createNewMedico(this.medicoForm.value).subscribe(resp => {
          const newId = resp.medico.id;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
          });
          Toast.fire({
            icon: 'success',
            title: `Se ha creado un nuevo médico: ${newId}`
          });
          setTimeout(() => {
            this.router.navigateByUrl(`/dashboard/medicos`);
          }, 3000);
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
      else { //actualizar médico existente
        this.medService.updateMedico(this.medicoForm.value,this.medicoSeleccionado.id).subscribe(resp => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
          Toast.fire({
            icon: 'success',
            title: `Información de ${this.medicoSeleccionado.nombre} actualizada`
          });
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
    }
  }

}
