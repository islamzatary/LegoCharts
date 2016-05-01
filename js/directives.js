/********************
* LegoCharts V 1.0
* Product of LegoStyle - Advanced CSS Framework.
* Copyright @2015
* Developed and built by Islam AlZatary - @islamzatary.
**********************/


/*********************** Generate Charts by Directive Dynamically ********************/
ngdashbaord.directive('chartType', function($timeout, $compile){
	return {
		restrict: 'A',
		replace: true,
		scope: true,
		template: '<div class="barsChart"></div>',
		link: function (scope, element, attrs) {
			if(scope.wginitf) {
				return;
			};
			/***** CHART REFRENCES *******/
			/***** http://nvd3-community.github.io/nvd3/examples/site.html   *****/
			var attr_listData = attrs.listData;
			var data = scope[attr_listData].values;
			var data_v = scope[attr_listData+"_v"];
			var chart = $(element[0]);
			var html_data = "";
			var attrID = attrs.id;
			function stream_layers(n, m, o) {
			  if (arguments.length < 3) o = 0;
			  function bump(a) {
				var x = 1 / (.1 + Math.random()),
					y = 2 * Math.random() - .5,
					z = 10 / (.1 + Math.random());
				for (var i = 0; i < m; i++) {
				  var w = (i / m - y) * z;
				  a[i] += x * Math.exp(-w * w);
				}
			  }
			  return d3.range(n).map(function() {
				  var a = [], i;
				  for (i = 0; i < m; i++) a[i] = o + o * Math.random();
				  for (i = 0; i < 5; i++) bump(a);
				  return a.map(stream_index);
				});
			}
			
			/* Another layer generator using gamma distributions. */
			function stream_waves(n, m) {
			  return d3.range(n).map(function(i) {
				return d3.range(m).map(function(j) {
					var x = 20 * j / m - i / 3;
					return 2 * x * Math.exp(-.5 * x);
				  }).map(stream_index);
				});
			}
			
			function stream_index(d, i) {
			  return {x: i, y: Math.max(0, d)};
			}
			
			function testData() {
				return stream_layers(3,128,.1).map(function(data, i) {
					return {
						key: 'Stream' + i,
						area: i === 1,
						values: data
					};
				});
			}
			
			function donutchart(attr_id,data_donut)  {
				var height = 330;
				var width = 330;
				var chart1;
				nv.addGraph(function() {
					d3.selectAll('#'+attr_id+' svg *').remove();
					d3.select('#'+attr_id+'').append('svg');
					var chart1 = nv.models.pieChart()
						.x(function(d) { return d.key })
						.y(function(d) { return d.y })
						.donut(true)
						.valueFormat(d3.format(".0f"))
						.showLabels(true)
						.labelThreshold(.05)
						.labelType("percent")
						.width(width)
						.height(height)
						.cornerRadius(0.35)
						.id('donut1'); // allow custom CSS for this one svg
			
					chart1.title("100%");
					chart1.pie.labelsOutside(false);
			
					d3.select("#"+attr_id+" svg")
						.datum(data_donut)
						.transition().duration(1200)
						.call(chart1);	
					
					nv.utils.windowResize(chart1.update);
			
					return chart1;
				});
			}
			scope.update_chart = function(attr_id) {
				var param_scope = scope.talentval+"_v";
				var attr_id = attr_id;
				donutchart(attr_id,scope[param_scope].values);
			}
			switch(attrs.chartType) {
				case "areachart" :
					var colors = d3.scale.category20();
					var chart;
					nv.addGraph(function() {
						d3.select('#'+attrID+'').append('svg');
						chart = nv.models.lineChart();
						chart.xAxis.tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)) });
						chart.yAxis.ticks(2);
						var line_chart_conf = [
							{
								values: data[0].values,
								key: '',
						  color: '#26a9e0',
						  area: true      //filled area chart.
						}
					  ];
						d3.select('#'+attrID+' svg')
							.datum(line_chart_conf)
							.transition().duration(1000)
							.call(chart)
							.each('start', function() {
								setTimeout(function() {
									d3.selectAll('#'+attrID+' *').each(function() {
										if(this.__transition__)
											this.__transition__.duration = 1;
									})
								}, 0)
							});
						d3.selectAll('#'+attrID+' svg')
						nv.utils.windowResize(chart.update);
						return chart;
					});
					break;
				case "donutchart" :
					var html_data = "";
					var html_list = "";
					scope.talentval = data_v[0].param_id;
					if(data_v.length>1) {
						html_list += "<select name='' ng-model='talentval' class='grid-8' ng-change='update_chart(\""+attrID+"\")'>";
						angular.forEach(data_v, function(data_l) {
							var scope_d = data_l.param_id;
							var scope_name_v = data_l.param_id+"_v";
							scope[scope_name_v] = data_l;
							html_list += "<option value='"+data_l.param_id+"'>"+data_l.param_label+"</option>";
						});
						html_list += "</select>";
					}
					donutchart(attrID,data);
					html_data += html_list;
					break;
				case "barchart_v" :
					nv.addGraph(function() {
						d3.select('#'+attrID+'').append('svg');
						var barchart_v = nv.models.discreteBarChart()
						  .x(function(d) { return d.label })
						  .y(function(d) { return d.value })
						  .staggerLabels(true)
						  .showValues(true);
						  var barchart_conf = [
							{
								key: '',
								values: data[0].values
							}
                          ]

					  d3.select('#'+attrID+' svg')
						  .datum(barchart_conf)
						  .call(barchart_v);
					  nv.utils.windowResize(barchart_v.update);
					  return barchart_v;
					});
					break;
				case "barchart_h" :
					nv.addGraph(function() {
						d3.select('#'+attrID+'').append('svg');
						var barchart_h = nv.models.multiBarHorizontalChart()
						  .x(function(d) { return d.label })
						  .y(function(d) { return d.value })
						  .showValues(true)
						  .showControls(false);
						  var barchart_conf = [
							{
								key: '',
								values: data[0].values
							}
                          ]

					  d3.select('#'+attrID+' svg')
						  .datum(barchart_conf)
						  .call(barchart_h);
					  nv.utils.windowResize(barchart_h.update);
					  return barchart_h;
					});
					break;
				case "barchart_group" :
					nv.addGraph(function() {
						var max_v = [];
						for(var j=0;j<data.length;j++) {
							max_v.push(d3.max(data[j].values, function(d) { return +d.y;}));
						}
						d3.select('#'+attrID+'').append('svg');
						var chart_group = nv.models.multiBarChart();
						chart_group.yAxis.tickFormat(d3.format(".0f"));
						chart_group.forceY([0,0,d3.max(max_v)]);
						chart_group.groupSpacing(0.3);
						chart_group.reduceXTicks(false);
						chart_group.showControls(false);
						
						d3.select('#'+attrID+' svg').datum(data).transition().duration(500).call(chart_group);
						nv.utils.windowResize(chart_group.update);
						return chart_group;
					});
					break;
				case "barchart_stack" :
						nv.addGraph(function() {
							var max_v = [];
							for(var j=0;j<data.length;j++) {
								max_v.push(d3.max(data[j].values, function(d) { return +d.y;}));
							}
							d3.select('#'+attrID+'').append('svg');
							var chart_group = nv.models.multiBarChart();
							chart_group.yAxis.tickFormat(d3.format(".0f"));
							chart_group.forceY([0,0,d3.max(max_v)]);
							chart_group.groupSpacing(0.3);
							chart_group.reduceXTicks(false);
							chart_group.stacked(true);
							chart_group.showControls(false);
							
							d3.select('#'+attrID+' svg').datum(data).transition().duration(500).call(chart_group);
							nv.utils.windowResize(chart_group.update);
							return chart_group;
						});
					break;
				case "linechart" :
					html_data = chartListData("linechart",data,4);
					if(data.length>5) {						
						$timeout(function() {
							$(".wg_all_"+attrID).show();
						}, 0);
					}
					break;
				case "blockschart" :
					scope.block_chart = data_v[0].param_id;
					html_data = chartListData("blockschart",data,3,data_v);
					if(data.length>4) {						
						$timeout(function() {
							$(".wg_all_"+attrID).show();
						}, 0);
					}
					break;
				case "timechart" :
					html_data = chartListData("timechart",data,4);
					if(data.length > 5) {						
						$timeout(function() {
							$(".wg_all_"+attrID).show();
						}, 0);
					}
					break;
				case "profileslisting" :
					var profile_list_limit = data_v[0].visible_count-1;
					html_data = chartListData("profileslisting",data,profile_list_limit,data_v);
					if(data.length>5) {
						$timeout(function() {
							$(".wg_all_"+attrID).show();
						}, 0);
					}
					break;
				default: break;
			}
			return chart.html(html_data),$compile(chart.contents())(scope);
		},
		controller: function($scope){
			
		}
	}
});
/*********************** Error Server Directive ********************/
ngdashbaord.directive('error', function () {
	return {
		restrict: 'E',
		replace:true,
		template: '<div class="ng-error c padding-5"><img src="http://img.b8cdn.com/images/icons/server_sad.png" /></div>',
		link: function (scope, element, attr) {
			scope.$watch('error', function (val) {
				if (val)
					$(element).show();
				else
					$(element).hide();
			});
		}
	}
});
/*********************** Show Loading Directive ********************/
ngdashbaord.directive('loading', function () {
	return {
		restrict: 'E',
		replace:true,
		template: '<div class="ng-loading c"><img src="http://img.b8cdn.com/images/icons/loading_large_icon.gif" /></div>',
		link: function (scope, element, attr) {
			scope.$watch('loading', function (val) {
				if (val)
					$(element).show();
				else
					$(element).hide();
			});
		}
	}
});