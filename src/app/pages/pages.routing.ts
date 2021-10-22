import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { AdminRoleGuard } from '../guards/admin-role.guard';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';

const routes: Routes = [
    { 
        path: 'dashboard' , 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '' , component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'progress' , component: ProgressComponent, data: { titulo: 'Progress bar'} },
            { path: 'grafica1' , component: Grafica1Component, data: { titulo: 'Gráfica'} },
            { path: 'account-settings' , component: AccountSettingsComponent, data: { titulo: 'Account Settings'} },
            { path: 'promesas' , component: PromesasComponent, data: { titulo: 'Promesas'} },
            { path: 'rxjs' , component: RxjsComponent, data: { titulo: 'RXJS'} },
            { path: 'perfil' , component: PerfilComponent, data: { titulo: 'Perfil'} },
            // Mantenimiento
            { path: 'usuarios' , canActivate: [AdminRoleGuard] , component: UsuariosComponent, data: { titulo: 'Usuarios de App'} },
            { path: 'usuarios/:termino' , canActivate: [AdminRoleGuard] , component: UsuariosComponent, data: { titulo: 'Usuarios de App'} },
            { path: 'hospitales' , canActivate: [AdminRoleGuard] , component: HospitalesComponent, data: { titulo: 'Hospitales de App'} },
            { path: 'hospitales/:termino' , canActivate: [AdminRoleGuard] , component: HospitalesComponent, data: { titulo: 'Hospitales de App'} },
            { path: 'medicos' , canActivate: [AdminRoleGuard] , component: MedicosComponent, data: { titulo: 'Médicos de App'} },
            { path: 'medico/:uid' , canActivate: [AdminRoleGuard] , component: MedicoComponent, data: { titulo: 'Médico component'} },
            // busquedas
            { path: 'busca/:termino' , canActivate: [AdminRoleGuard] , component: BusquedasComponent, data: { titulo: 'Búsquedas'} },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
