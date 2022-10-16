import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { UploadPictureComponent } from './components/upload-picture/upload-picture.component';
import { UploadFileService } from './services/upload-file.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    UploadPictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [UploadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
