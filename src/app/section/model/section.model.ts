export interface Slider {
	disabled: boolean;
	invert: boolean;
	min: number;
	step: number;
	thumbLabel: boolean;
	vertical: boolean;
}
export interface Chart {
	data: any;
  	padding: any;
  	titlePadding: any;
  	source: any;
  	dataAdapter: any;
  	seriesGroups: any;
}