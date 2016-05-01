LegoCharts.
=============

[Demo](http://www.islamzatary.com/projects/legochart/legocharts.html).

Dependencies:

1. JQuery.
2. AngularJS.
3. D3JS.
4. NVD3.
5. [LegoStyle](http://www.legostyle.com/) CSS Framework.


You want to generate chart with very dynamic parameters?

You care about performance?

You want to manage the chart size, colors, order, type, label and others from one place?

Do you like angularjs framework?

so you'll love LegoCharts plugin, actually i created this plugin with love in Bayt(.)com and specialy in BCCs(Branded Career Channel) project to show a very dynamic charts/reports.

Smart solution by doing one directive to draw all chart types.


Chart types:
----------

1. You can support all charts in NVD3 or you can draw your owr charts by D3JS/Manual, and here is the NVD3 charts we use:
	1. Area chart (nv.models.lineChart).
	2. Donut chart (nv.models.pieChart);
	3. Vertical Barchart (nv.models.discreteBarChart);
	4. Horizontal Barchart (nv.models.multiBarHorizontalChart);
	5. Group Barchart (nv.models.multiBarChart).
	6. Stack Barchart (nv.models.multiBarChart).
2. Custom Charts:
	1. Simple LineChart customized to draw progrees bar for each data row and depend on max value, in the example we use for users login activity.
	2. Blocks chart customized for draw boxes with title and numbers and each group box appear depend on drop down select and in the example draw how much users have requests in numbers.
	3. Time Chart customized to draw activities depend on date/time and in the example we use to appear the avaerage for users to move the folder our of inbox.
	4. Profiles listing Chart to draw profiles (photo, name, title & company), in the example we use it to draw the recommended cv based on your last cv search.
	

	
How its work?
----------

check the below diagram.

[Digrame link](http://www.islamzatary.com/projects/legochart/legocharts_diagram.png)


as you see in the above diagram we have a service to fetch the JSON file and the json file contain the chart data structre with data values list after that its parse to one directive contain a switch for all charts type and each chart have a custom function to call if nvd3 will call nvd3 chart type(check Chart type above) and there is four custom charts you can check it in the point #6 below(parameters lists).

we have a JSON file contain every thing you need, here is a sample:

{
        "wg_id": "chart_id",
        "title": "Chart Title",
        "hint": "Hints text appear in the above of chart",
        "wg_size": "1",
        "wg_order": "3",
        "chart_type": "areachart",
		"widget_footer": "Text to be appear in the footer section",
        "parameters_list": "custom parameters",
        "data": [{
			 "param": "",
            "values": [{}]
		 }]
}

so here is the parameters lists:

	1. Widget ID (wg_id): the chart/widget id.
	2. Widget Title (title): Title widget appear inthe title section.
	3. Widget Hint (hint): Hint text appear in the above of daring area to introduce the chart.
	4. Widget Size (wg_size): The size of widget, and there is four size based on percentage: 
		a. wg_grid_1(One third) => 32%;
		b. wg_grid_2(two thirds) => 65%;
		c. wg_grid_3(full width) => 98%;
		d. wg_grid_4(half) => 48%;
	5. Widget Order (wg_order): The widget order appear on the screen
	6. Widget Type (chart_type): here is the list:
		1. areachart.
		2. donutchart.
		3. barchart_v.
		4. barchart_h.
		5. barchart_group.
		6. barchart_stack.
		7. linechart.
		8. blockschart.
		9. timechart.
		10. profileslisting.
	7. Widget Footer text (widget_footer): The footer text appear in the footer section.
	8. Widget Parameters (parameters_list): The Custom parameters list.
	9. Widget Data (data): Data for drawing will appear in the chart.
	
	
and what about the numeric widget in the above charts as you see in the [Demo](http://www.islamzatary.com/projects/legochart/legocharts.html), this is a cusom type of appear numbers in the top and its depend if you need it but its call in the same service but difeerent json file.

another amazing feature in the LegoCharts, you can draw chart depend on cusom value/date, if you checked the Demo you can see in te top a dropdown contain a dates so the drawing of charts will depend on change the dropdown date just you want to enable it in the service and parse in the parameter.

Its Easy Peasy.

Please not that this project is part/product of LegoStyle CSS framework, the framework still beta version but LegoChart can use it immediately with all of trust.

[LegoStyle](http://www.legostyle.com/) support ltr dierction so the chart also support.

Share your opinion with us at iz@legostyle.com
