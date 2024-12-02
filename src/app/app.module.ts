import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityListComponent } from './Components/city-list/city-list.component';
import { CityDetailsComponent } from './Components/city-details/city-details.component';
import { SearchBarComponent } from './Components/search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FlyingBirdsComponent } from './Components/FlyingBirds/FlyingBirds.component';


@NgModule({
  declarations: [
    AppComponent,
    CityListComponent,
    CityDetailsComponent,
    SearchBarComponent,
    FlyingBirdsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
