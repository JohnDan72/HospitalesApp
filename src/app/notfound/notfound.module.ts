import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { WorkingOnItComponent } from './working-on-it/working-on-it.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    declarations: [
        NotpagefoundComponent,
        WorkingOnItComponent
    ],
    imports: [ 
        CommonModule,
        ComponentsModule
    ],
    exports: [
        NotpagefoundComponent,
        WorkingOnItComponent
    ],
})
export class NotFoundModule {}