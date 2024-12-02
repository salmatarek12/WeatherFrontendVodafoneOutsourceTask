import { Component, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../../services/WeatherService.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent {
  searchQuery: string = '';

  constructor(private weatherService: WeatherService, private router: Router, private toastr: ToastrService) {}

  handleSearch(): void {
    if(this.searchQuery != ''){
      const normalizedQuery = this.searchQuery.replace(/\s+/g, '').trim().toLowerCase();
      const matchedCity = this.weatherService.getCities().find((city) =>
        city.city.replace(/\s+/g, '').toLowerCase().startsWith(normalizedQuery)
      );
      if (matchedCity) {
        console.log("Matched city is: ",matchedCity);
        this.router.navigate(['/city', matchedCity.id], { state: { fromApp: true } });
      } else {
        console.error('City not found');
        this.toastr.error('City not found');
      }
    }
    else {
      console.error('Enter a city');
      this.toastr.warning('Enter a city');
    }
  }
}