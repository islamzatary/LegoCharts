/********************
* LegoCharts V 1.0
* Product of LegoStyle - Advanced CSS Framework.
* Copyright @2015
* Developed and built by Islam AlZatary - @islamzatary.
**********************/


/********************* Numeric Widget Controller ************************/
ngdashbaord.controller('wgListNumeric', function ($rootScope, $scope, $http, SharedDateScopes) {
	$scope.loading = true;
	$scope.error = false;
	$scope.WgNumInit = function() {
		$rootScope.wgNumLists = [{"title":"Open Positions","value":"","wg_order":"1"},{"title":"Avg Applicants for Open Positions","value":"","wg_order":"2"},{"title":"Offers Sent","value":"","wg_order":"3"},{"title":"Job Seeker Registrations","value":"","wg_order":"4"},{"title":"CVs Created","value":"","wg_order":"5"},{"title":"Job Applications","value":"","wg_order":"6"}];
	};
	SharedDateScopes.getWidgetNumeric().then(function(data_promised) {
		$rootScope.wgNumLists = data_promised;
		$scope.loading = false;
	});
});
/********************* Mix Widget Controller ************************/
ngdashbaord.controller('WgListMixed', function ($rootScope, $scope, $http, $sce, $compile, SharedDateScopes) {
	$scope.loading = true;
	$scope.error = false;
	$scope.wginitf = 1;
	$scope.WgMixInit = function() {
		$rootScope.wgMixLists = [{"global_config":[{"counter":"71","counter_label":"Talents"}]},{"widgets":[{"wg_id":"hires","title":"Hires Over Time","hint":"","wg_size":"2","wg_order":"1","chart_type":"areachart","parameters_list":"","data":[  ]},{"wg_id":"recommended_cvs","title":"Recommended Profiles","hint":"Based on Your Last CV Search","wg_size":"1","wg_order":"2","chart_type":"profileslisting","parameters_list":"","data":[  ]},{"wg_id":"time_to_process","title":"Time To Process","hint":"Average time to move applicant out of inbox","wg_size":"1","wg_order":"3","chart_type":"timechart","parameters_list":"","data":[  ]},{"wg_id":"talent_breakdown","title":"Talent Breakdown","hint":"","wg_size":"1","wg_order":"4","chart_type":"donutchart","parameters_list":"gender age_group marital_status nationality last_career_level last_edu_level residence_location","data":[  ]},{"wg_id":"login_activity","title":"Login Activity","hint":"","wg_size":"1","wg_order":"5","chart_type":"linechart","parameters_list":"","data":[  ]}]}];
		$scope.widgetLists = $rootScope.wgMixLists[1].widgets;
		angular.forEach($scope.widgetLists, function(wd) {
			var scope_name = wd.wg_id;
			var scope_name_v = wd.wg_id+"_v";
			$rootScope[scope_name] = wd.data[0];
			$rootScope[scope_name_v] = wd.data;
		});
	};
	SharedDateScopes.getWidgetMixed(2).then(function(data_promised) {
		$rootScope.wgMixLists = data_promised[1].widgets;
		angular.forEach($rootScope.wgMixLists, function(widget) {
			var scope_name = widget.wg_id;
			var scope_name_v = widget.wg_id+"_v";
			$rootScope[scope_name] = widget.data[0];
			$rootScope[scope_name_v] = widget.data;
		});
		$scope.loading = false;
		$scope.wginitf = 0;
	});
	$scope.show_all_data_link = function(mtitle,data_id,chartType) {
		var html_data_modal = chartListData(chartType,$rootScope[data_id].values,"");
		//Modal('','',false);
		//Modal(mtitle, html_data_modal, true);
	}
	$scope.block_chart_select = function(selectModel) {
		$(".box_lists").hide();
		$(".block_"+selectModel).show();
		//var html_data_modal = chartListData(chartType,$rootScope[data_id].values,"");
		//Modal('','',false);
		//Modal(mtitle, html_data_modal, true);
	}
});
/********************* Date Range Widget Controller ************************/
ngdashbaord.controller('chartUpdate', function ($rootScope, $scope, $http, SharedDateScopes) {
	$scope.dateRangeDate = [{'value': 1,'text' : 'This Week'},{'value':2,'text':'This Month'},{'value':3,'text':'This Year'}];
	$scope.dateRange = 2;
	$scope.update_all_charts= function(){
		$(".wg_statistic_num, .barsChart").html("");
		$(".ng-loading").show();
		SharedDateScopes.getWidgetNumeric($scope.dateRange).then(function(dn) {
			$rootScope.wgNumLists = dn;
			$(".loading_num").hide();
		});
		SharedDateScopes.getWidgetMixed($scope.dateRange).then(function(dm){
			$rootScope.wgMixLists = dm;
			$scope.widgetLists = $rootScope.wgMixLists[1].widgets;
			angular.forEach($rootScope.widgetLists, function(widget) {
				var scope_name = widget.wg_id;
				var scope_name_v = widget.wg_id+"_v";
				$rootScope[scope_name] = widget.data[0];
				$rootScope[scope_name_v] = widget.data;
			});
		});
	}
});