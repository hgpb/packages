import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import { AppComponent } from './app.component';
import {ImageRevealModule} from "projects/component-library/src/lib/image-reveal.module";
import {ImageRevealComponent} from "projects/app/src/app/components/image-reveal/image-reveal.component";
import { NavigationComponent } from './components/navigation/navigation.component';

const appRoutes: Routes = [
  { path: 'image-reveal', component: ImageRevealComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ImageRevealComponent,
    NavigationComponent
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
