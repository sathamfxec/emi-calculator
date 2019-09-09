import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SectionComponent } from './section/section.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SectionComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    jqxChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
