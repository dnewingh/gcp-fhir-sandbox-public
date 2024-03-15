import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { BigqueryMockDataService } from '../services/bigquery-mock-data.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FhirstoreDataService } from '../services/fhirstore-data.service';

interface Country {
	name: string;
	flag: string;
	area: number;
	population: number;
}

const COUNTRIES: Country[] = [
	{
		name: 'Russia',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: 17075200,
		population: 146989754,
	},
	{
		name: 'Canada',
		flag: 'c/cf/Flag_of_Canada.svg',
		area: 9976140,
		population: 36624199,
	},
	{
		name: 'United States',
		flag: 'a/a4/Flag_of_the_United_States.svg',
		area: 9629091,
		population: 324459463,
	},
	{
		name: 'China',
		flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
		area: 9596960,
		population: 1409517397,
	},
];

@Component({
  selector: 'app-home-mock-data-table',
  standalone: true,
  imports: [JsonPipe, NgbAccordionModule],
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Resource</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (conditionMockData of conditionsMockData; track conditionMockData.id; let i = $index) {
          <tr>
            <td class="w-75">
              <div ngbAccordion>
                <div ngbAccordionItem>
                  <h2 ngbAccordionHeader>
                    <button ngbAccordionButton>{{ conditionMockData.id }}</button>
                  </h2>
                  <div ngbAccordionCollapse>
                    <div ngbAccordionBody>
                      <ng-template><pre style="white-space: pre-wrap">{{ conditionMockData | json }}</pre></ng-template>
                    </div>
                  </div>
                </div>
              </div>  
            </td>
            <td>
              <button type="button" class="btn btn-primary" (click)="postMockData('Condition', conditionMockData)">Post</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
    <pre>{{fhirstoreConditionData | json}}</pre>
  `,
  styleUrl: './home-mock-data-table.component.scss'
})
export class HomeMockDataTableComponent {
  countries = COUNTRIES;
  patientsMockData?: any[];
  conditionsMockData?: any[];
  fhirstoreConditionData?: any[];

  constructor(private BigqueryMockDataService: BigqueryMockDataService, private FhirstoreDataService: FhirstoreDataService) {}

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

  this.FhirstoreDataService.getResource('Condition').subscribe(
		{
			next: data => this.fhirstoreConditionData = data,
      error: error => console.error(error),
      complete: () => console.log('fhirstoreConditionData loaded. ' + this.fhirstoreConditionData?.length + ' resources.')
		}
  );
  
  }

  postMockData(resourceType: string, resourcePayload: object) {
    this.FhirstoreDataService.postResource(resourceType, resourcePayload).subscribe(
      {
        next: data => console.log(data),
        error: error => console.error(error),
        complete: () => console.log('resource posed.')
      }
    )    
  }


}
