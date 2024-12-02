export interface City {
    id: number;
    city: string;
    forecast: Forecast[];
  }

export interface Forecast {
    date: string;
    temperatureCelsius: number;
    temperatureFahrenheit: number;
    humidity: number;
  }
  
 