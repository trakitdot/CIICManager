import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FootbarComponent } from '../Components/footbar/footbar.component';
import { NavbarComponent } from '../Components/navbar/navbar.component';
import { MainbarComponent } from '../Components/mainbar/mainbar.component';
import { DynamicFormComponent } from '../Components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from '../Components/dynamic-form-question/dynamic-form-question.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    
  ],
  declarations: [HomePage, FootbarComponent, NavbarComponent, MainbarComponent, DynamicFormComponent, DynamicFormQuestionComponent],
  entryComponents: [FootbarComponent, NavbarComponent, MainbarComponent, DynamicFormComponent, DynamicFormQuestionComponent]
  

  
})
export class HomePageModule {}
