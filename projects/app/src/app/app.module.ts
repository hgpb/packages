import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ImageRevealModule } from 'projects/component-library/src/lib/image-reveal/image-reveal.module';
import { ImageRevealComponent } from 'projects/app/src/app/components/image-reveal/image-reveal.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { ParallaxComponent } from './components/image-parallax/parallax.component';
import { ImageParallaxModule } from '../../../component-library/src/lib/image-parallax/image-parallax.module';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'image-reveal', component: ImageRevealComponent },
  { path: 'image-parallax', component: ParallaxComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ImageRevealComponent,
    ParallaxComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ImageRevealModule,
    ImageParallaxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
