import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from 'src/app/services/busqueda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.css']
})
export class BusquedasComponent implements OnInit {
  public cargando = true;
  public usuarios: any[];
  public hospitales: any[];
  public medicos: any[];
  public totalUsuarios: number;
  public totalHospitales: number;
  public totalMedicos: number;
  public termino: string;
  

  constructor(private activatedRoute: ActivatedRoute,
    private buscaService: BusquedaService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      this.termino = termino;
      console.log(termino)
      this.cargarAll();
    });
  }

  cargarAll() {
    this.buscaService.busquedaGlobal(this.termino).subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
      this.totalUsuarios = resp.totalUsuarios;
      this.totalHospitales = resp.totalHospitales;
      this.totalMedicos = resp.totalMedicos;
      this.cargando = false;

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
    })
  }

}
