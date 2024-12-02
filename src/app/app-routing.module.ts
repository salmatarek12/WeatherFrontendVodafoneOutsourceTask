import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './Components/city-list/city-list.component';
import { CityDetailsComponent } from './Components/city-details/city-details.component';
import { NavigationGuard } from './guards/navigation.guard';

const routes: Routes = [
  { path: '', redirectTo: 'cities', pathMatch: 'full' },
  { path: 'cities', component: CityListComponent },
  { path: 'city/:id', component: CityDetailsComponent, canActivate: [NavigationGuard] },
  { path: '**', redirectTo: 'cities' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })], // to reload city details component every time id is changed
  exports: [RouterModule]
})
export class AppRoutingModule { }
