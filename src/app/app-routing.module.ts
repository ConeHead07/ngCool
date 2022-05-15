import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FridgeComponent } from "./components/fridge/fridge.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'fridge', component: FridgeComponent },
  {path: '', redirectTo: 'fridge', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
