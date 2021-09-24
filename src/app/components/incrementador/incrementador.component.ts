import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit{

  ngOnInit(){
    this.btnClass = `btn ${this.btnClass}`;
  }
  // @Input() progreso: number = 10;
  @Input('renombrado') progreso: number = 10;
  @Input() btnClass: string = 'btn-primary';


  @Output() valorSalida: EventEmitter<number> = new EventEmitter()

  // get getProgreso() {
  //   return `${ this.progreso }%`;
  // }

  cambiarValor( valor: number ){

    if(!(this.progreso + valor < 0) && !(this.progreso + valor > 100)){
      this.progreso = this.progreso + valor;
      this.valorSalida.emit(this.progreso);
    }
  }

  onChange( newValue: number ){
    if(newValue > 100){
      this.progreso = 100;
    }
    else if(newValue < 0 ){
      this.progreso = 0;
    }
    else{
      this.progreso = newValue
    }
    this.valorSalida.emit( this.progreso )
  }

}
