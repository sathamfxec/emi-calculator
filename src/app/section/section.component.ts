import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  public autoTicks: boolean = false;
	public disabled: boolean = false;
	public invert: boolean = false;
  public min: number = 0;
  public step: number = 1;
  public thumbLabel: boolean = true;
  public vertical: boolean = false;

  public downPmtMax: number;
	public loanAmtMax: number = 150000;
	public intRateMax: number = 100;
	public loanDurMax: number = 36;
	public showTicks: boolean = false;
  public downPayment: number = 0;
	public loanAmount: number;
	public intRate: number;
	public loanDuration: number;
	public emi: number = 0;
  public totalPayment: number = 0;
  public totalInterest: number = 0;

  public data: any;
  public padding: any;
  public titlePadding: any;
  public source: any;
  public dataAdapter: any;
  public seriesGroups: any[];

  getWidth() : any {
    return '100%';
  }

  constructor() {}

  ngOnInit() {
     // this.downPmtMax = this.loanAmtMax / 2;
     this.padding = { left: 5, top: 5, right: 5, bottom: 5 };
     this.titlePadding = { left: 0, top: 0, right: 0, bottom: 10 };
  }
  /**
    * Method to update the values in the slider.
    * @memberof appSection component
  */
  updateSliderMax(code) {
  	switch (code) {
      /*
      case "downPayment":
        (this.downPayment > this.downPmtMax) ? this.downPmtMax = this.downPayment : '';
        this.calculateEMI();
        break;
      */
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
  	this.loanAmount = this.loanAmount - this.downPayment;
  	let mir = (this.intRate / 100) / 12;
  	let emi = this.loanAmount * mir * Math.pow((1 + mir), this.loanDuration) / ((Math.pow((1 + mir), this.loanDuration)) - 1);
  	let totalPayment = emi * this.loanDuration;
  	let totalInterest = totalPayment - this.loanAmount;
  	this.emi = Math.round(emi);
    this.totalPayment = Math.round(totalPayment);
    this.totalInterest = Math.round(totalInterest);
    
    // show the pie chart
    if (this.emi && this.totalInterest && this.totalPayment) {
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

    this.data = [
      { "name": "Loan Amount", "value": loanAmtPer },
      { "name": "Interest", "value":  intPer}
    ];

    this.source =
    {
       datatype: 'json',
       datafields: [
         { name: 'name', type: 'string' },
         { name: 'value', type: 'number' }
       ],
       localdata: this.data,
       async: false
    };

    this.dataAdapter = new jqx.dataAdapter(this.source, { 
      async: false, 
      autoBind: true, 
      loadError: (xhr: any, status: any, error: any) => { 
        alert('Error loading "' + this.source.url + '" : ' + error);
      } 
    });

    this.seriesGroups =
    [
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
    ];
  }

}
