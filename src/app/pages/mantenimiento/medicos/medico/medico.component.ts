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
      hospital: ['', [Validators.required]]
    });

    this.medicoForm.get('hospital').valueChanges.subscribe( id_hospital => {
      this.hospitalSelected = this.hospitalesOptions.find( h => h.id == id_hospital);
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
  cargarMedico(){
    this.activetedRoute.params.subscribe(params => {
      // console.log(params);
      if(params.uid !== 'nuevo'){
        this.medService.getMedicoById(params.uid).subscribe(resp => {
          this.medicoSeleccionado = resp.medico;
          this.medicoForm.get('nombre').setValue(this.medicoSeleccionado.nombre);
          this.medicoForm.get('hospital').setValue(this.medicoSeleccionado.hospital.id);
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

    if (this.medicoForm.invalid) {
      console.log("Invalid!!!!");
    }
    else {
      console.log("Success!!");
    }
  }

  updateMedico(medicoToUpdate: Medico) {
    this.medService.updateMedico({ nombre: medicoToUpdate.nombre, id_hospital: medicoToUpdate.hospital.id }, medicoToUpdate.id)
      .subscribe(resp => {
        // console.log(resp);
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

}
