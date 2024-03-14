import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppBarComponent } from './app-bar/app-bar.component';
import { JsonPipe } from '@angular/common';
import { BigqueryMockDataService } from './service/bigquery-mock-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppBarComponent, RouterOutlet, JsonPipe],
  template: `
	<app-app-bar></app-app-bar>	
	<router-outlet></router-outlet>
	<p>Patients Mock Data ({{ patientsMockData?.length }}) resouces:</p>
	<pre>{{ patientsMockData | json }}</pre>
	<p>Conditions Mock Data ({{ conditionsMockData?.length }}) resouces:</p>
	<pre>{{ conditionsMockData | json }}</pre>	
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-admin-app';
  patientsMockData?: any[];
  conditionsMockData?: any[];

  constructor(private BigqueryMockDataService: BigqueryMockDataService) {}

  ngOnInit() {
	this.BigqueryMockDataService.getMockData('vw_fhir_patients_publish').subscribe(
		{
			next: data => this.patientsMockData = data,
    		error: error => console.error(error),
    		complete: () => console.log('PatientsMockData loaded. ' + this.patientsMockData?.length + ' resources.')
		}
	);

	this.BigqueryMockDataService.getMockData('vw_fhir_conditions_publish').subscribe(
		{
			next: data => this.conditionsMockData = data,
    		error: error => console.error(error),
    		complete: () => console.log('ConditionsMockData loaded. ' + this.conditionsMockData?.length + ' resources.')
		}
	);
  }
}
