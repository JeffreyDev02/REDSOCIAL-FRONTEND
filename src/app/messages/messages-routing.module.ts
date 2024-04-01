import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddComponent } from './components/add/add.component';
import { MainComponent } from './components/main/main.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';

const messageRoutes: Routes = [
    {
        path: 'mensajes', component: MainComponent,
        children: [
            {path: '', redirectTo: 'recibidos/1', pathMatch: 'full'},
            {path: 'recibidos/:page', component: ReceivedComponent},
            {path: 'enviar', component: AddComponent},
            {path: 'enviados/:page', component: SendedComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(messageRoutes)],
    exports: [RouterModule]
})

export class MessagesRoutingModule {}