import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import { AppComponent } from './app.component';
import {ImageRevealModule} from "projects/component-library/src/lib/components/image-reveal/image-reveal.module";
import {ImageRevealComponent} from "projects/app/src/app/components/image-reveal/image-reveal.component";
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'image-reveal', component: ImageRevealComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    ImageRevealComponent,
    NavigationComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ImageRevealModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
