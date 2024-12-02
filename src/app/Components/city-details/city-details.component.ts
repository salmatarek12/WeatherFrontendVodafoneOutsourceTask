import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../services/WeatherService.service';
import { City, Forecast } from '../../models/city.model';
@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent implements OnInit{

  city: City | undefined;
  displayUnit: 'C' | 'F' = 'C';

  constructor(private route: ActivatedRoute, private router: Router, private weatherService: WeatherService) {}

  ngOnInit(): void {
    // Check if navigation is valid
    const navigationState = history.state;
    if (!navigationState.fromApp) {
      // If not navigated from within the app, redirect to cities list
      this.router.navigate(['/cities']);
      return;
    }
    this.route.params.subscribe((params) => {
      const cityId = params['id'];
      if (cityId) {
        this.weatherService.getCityForecast(+cityId).subscribe(
          (data) => {
            this.city = data;
          },
          (error) => {
            alert('City not found!');
          }
        );
      }
    });
  }

  toggleTemperatureUnit(): void {
    this.displayUnit = this.displayUnit === 'C' ? 'F' : 'C';
  }

  NavigateToCountries(){
    this.router.navigate(['/cities'], { state: { fromApp: false } });
  }
  
}

