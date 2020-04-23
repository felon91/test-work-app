import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { PostPageComponent } from './post-page/post-page.component';
import {FormsModule} from '@angular/forms';
import {SearchPipe} from './shared/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PostPageComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
