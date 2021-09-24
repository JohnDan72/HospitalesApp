import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent {
  progreso1: number = 20;
  progreso2: number = 45;

  getProgreso(caso = 1){
    console.log("Callo en getProgreso ",caso)
    if(caso == 1){
      return this.progreso1+'%';  
    }
    return this.progreso2+'%';
  }
  
}
