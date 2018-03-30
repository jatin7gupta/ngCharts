import {Component, OnInit} from '@angular/core';
import {WeatherService} from './weather.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chart = [];

  constructor(private _weatherService: WeatherService) {
  }

  ngOnInit() {
    this._weatherService.dailyForcast()
      .subscribe(res => {
        console.log(res);
        let temp_max = res['list'].map(response => response.main.temp_max);
        let temp_min = res['list'].map(response => response.main.temp_min);
        let allDates = res['list'].map(response => response.dt);

        let weatherDates = [];
        allDates.forEach((eachDate) => {
          let jsDate = new Date(eachDate * 1000);
          weatherDates.push(jsDate.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}));
        });
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        });
      });
  }
}
