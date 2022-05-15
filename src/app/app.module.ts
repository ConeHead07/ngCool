import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FridgeComponent } from './components/fridge/fridge.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemCreateComponent } from './components/item-create/item-create.component';

import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor} from "./authentication.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from "@angular/router";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";

@NgModule({
  declarations: [
    AppComponent,
    FridgeComponent,
    ItemFormComponent,
    ItemCreateComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    HttpClientModule, HttpClientJsonpModule, BrowserAnimationsModule,
    MatToolbarModule, MatIconModule, MatButtonModule,
    MatExpansionModule, MatFormFieldModule, MatInputModule, MatSnackBarModule,
    MatBottomSheetModule,
    AppRoutingModule, RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
