import { Component, OnInit } from '@angular/core';
import { Slider, Chart } from './model/section.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  // Loan amount declaration
  public loanAmount: number;
  public loanAmtMax: number;

  // Interest rate declaration
  public intRate: number;
  public intRateMax: number;

  // Loan duration declaration
  public loanDuration: number;
  public loanDurMax: number;

  // Result declaration
  public emi: number;
  public totalPayment: number;
  public totalInterest: number;

  public chart: any;
  public slider: any;

  constructor() {}

  ngOnInit() {
    this.loanAmtMax = 1500000;
    this.intRateMax = 100;
    this.loanDurMax = 36;
    this.reset();
    this.chart = this.setChartInitialValue();
    this.slider = this.setSliderInitialValue();
  }
  /**
    * Method to get width for the pie chart.
    * @memberof appSection component
  */
  getWidth() : any {
    return '100%';
  }
  /**
    * Method to set initial value for the chart.
    * @memberof appSection component
  */
  setChartInitialValue() {
    // Set initial value for chart
    let chart: Chart = {
      data: [],
      padding: { left: 5, top: 5, right: 5, bottom: 5 },
      titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
      source: {},
      dataAdapter: {},
      seriesGroups: [
        {
            type: 'pie',
            showLabels: true,
            series:
            [
                {
                    dataField: 'value',
                    displayText: 'name',
                    labelRadius: 120,
                    initialAngle: 15,
                    radius: 150,
                    centerOffset: 0,
                    formatSettings: { sufix: '%', decimalPlaces: 1 }
                }
            ]
        }
      ]
    };
    return chart;
  }
  /**
    * Method to set initial value for the slider.
    * @memberof appSection component
  */
  setSliderInitialValue() {
    // Set initial value for chart
    let slider: Slider = {
      disabled: false,
      invert: false,
      min: 0,
      step: 1,
      thumbLabel: true,
      vertical: false
    };
    return slider;
  }
  /**
    * Method to set reset the emi, totalpay and totalinteret.
    * @memberof appSection component
  */
  reset() {
    this.emi = 0;
    this.totalPayment = 0;
    this.totalInterest = 0;
  }
  /**
    * Method to reset the values if the validation fails.
    * @memberof appSection component
  */
  Emit(e) {
    this.intRate = e.value;
  }
  /**
    * Method to update the values in the slider.
    * @memberof appSection component
  */
  updateSliderMax(code) {
  	switch (code) {
  		case "LoanAmount":
        (this.loanAmount > this.loanAmtMax) ? this.loanAmtMax = this.loanAmount : '';
  			this.calculateEMI();
  			break;
  		case "InterestRate":
  			(this.intRate > this.intRateMax) ? this.intRateMax = this.intRate : '';
  			this.calculateEMI();
  			break;
  		case "LoanDuration":
  			(this.loanDuration > this.loanDurMax) ? this.loanDurMax = this.loanDuration : '';
  			this.calculateEMI();
  			break;
  		default:
  			// code...
  			break;
  	}
  }
  /**
    * Method to calculate the EMI.
    * @memberof appSection component
  */
  calculateEMI() {
    if(this.loanAmount && this.intRate && this.loanDuration) {
      let mir = (this.intRate / 100) / 12;
      let emi = this.loanAmount * mir * Math.pow((1 + mir), this.loanDuration) / ((Math.pow((1 + mir), this.loanDuration)) - 1);
      let totalPayment = emi * this.loanDuration;
      let totalInterest = totalPayment - this.loanAmount;

      this.emi = Math.round(emi);
      this.totalPayment = Math.round(totalPayment);
      this.totalInterest = Math.round(totalInterest);
      
      // show the pie chart
      (this.emi && this.totalInterest && this.totalPayment) ? this.showChart():'';
    } else {
      this.reset();
      this.showChart();
    }
  }
  /**
    * Method to show the pie chart.
    * @memberof appSection component
  */
  showChart() {
    let loanAmtPer = (this.loanAmount / this.totalPayment) * 100;
    let intPer = 100 - loanAmtPer;

    this.chart.data = [
      { "name": "Loan Amount", "value": loanAmtPer },
      { "name": "Interest", "value":  intPer}
    ];

    this.chart.source =
    {
       datatype: 'json',
       datafields: [
         { name: 'name', type: 'string' },
         { name: 'value', type: 'number' }
       ],
       localdata: this.chart.data,
       async: false
    };

    this.chart.dataAdapter = new jqx.dataAdapter(this.chart.source, { 
      async: false, 
      autoBind: true, 
      loadError: (xhr: any, status: any, error: any) => { 
        alert('Error loading ' + error);
      } 
    });
  }
}
