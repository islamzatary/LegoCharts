/********************
* LegoCharts V 1.0
* Product of LegoStyle - Advanced CSS Framework.
* Copyright @2015
* Developed and built by Islam AlZatary - @islamzatary.
**********************/

function draw_wgNum(data) {
	var num_data = "";
	if(data.length>0) {
		angular.forEach(data, function(dwn) {
			if (dwn.value.length) {
				num_data += "<h4>"+dwn.title+"</h4>";
				num_data += "<ul class='horizontal_list overflow-h'>";
				angular.forEach(dwn.value, function(dwnd) {
					num_data += "<li class='c'><span class='wg_statistic_txt'>"+dwnd.title+"</span><span class='wg_statistic_num'><div class='c loading_num'><img src='http://img.b8cdn.com/images/icons/loading_large_icon.gif'></div>"+dwnd.value+"</span></li>";
				});
				num_data += "</ul>";
			}
		});
	}
	return num_data
}
function toDDHH(tsec) {
	var sec_num = parseInt(tsec, 10); // don't forget the second param
	var days   = Math.floor(sec_num / 86400);
	var hours   = Math.floor(sec_num / 3600);

	if (hours   < 10) {hours   = "0"+hours;}
	var time    = days+' Days&nbsp;&nbsp;'+hours+' Hours';
	if(days<1) {
		var time = hours+' Hours';
	}
	return time;
}
function chartListData(chartType,datajs,limit,data_v) {
	var html_data = "";
	switch(chartType) {
		case "linechart" :
			var listnum = [];
			$.each(datajs, function(index, dl) {
				listnum.push(dl.value);
			});
			var maxNumL = Math.max.apply(Math, listnum);
			var NumPer = 0;
			$.each(datajs, function(index, dl) {
				var NumPer = ((Math.floor((dl.value/maxNumL)*1000)/1000)*100).toFixed(1);
				html_data += "<div class='margin_bottom_15'>";
				html_data += "	<p class='font-s margin_bottom_5'>"+dl.name+"</p>";
				html_data += "	<div class='overflow-h'>"
				html_data += "		<div class='l grid-9'>"
				html_data += "			<div class='progress b-radius'> \
											<div style='width:"+NumPer+"%;' class='fill'></div> \
										</div> \
									</div>"
				html_data += "		<div class='l grid-1 c'><span class='progress_perc'>"+dl.value+"</span></div>"
				html_data += "	</div>"
				html_data += "</div>"
				if(limit !="") {
					return index<limit;
				}
			});
			break;
		case "blockschart" :
			html_data += "	<div class='overflow-h'>";
			var data_list_count = 0;
			if(data_v.length>0){
				html_data += "<select class='margin_bottom_15 grid-9' name='BlockChatSelect' ng-model='block_chart' ng-change='block_chart_select(block_chart)'>";
				$.each(data_v, function(index, dbs) {
					html_data += "<option value='"+dbs.param_id+"'>"+dbs.param_label+"</option>";
				});
				html_data += "</select>";
				$.each(data_v, function(index1, db) {
					data_list_count += db.values.length;
					var blockHide = "";
					if (index1>0) {
						blockHide = "hide";
					}
					html_data += "	<div class='box_lists block_"+data_v[index1].param_id+" "+blockHide+"'>";
					$.each(data_v[index1].values, function(index2, dbc) {
						html_data += "		<div class='l box_item'>"
						html_data += "			<p class='bold blue_customT margin_bottom_15 font-xxl'>"+dbc.val+"</p>\
												<h4 class='margin_bottom_10 font-m'>"+dbc.key+"</h4>\
											</div>";
						if(limit !="") {
							return index2<limit;
						}
					});					
					html_data += "</div>"
				});
			}
			if (data_list_count==0) {
				html_data += "<p class='c padding-30'>No Data Available</p>";
			}
			html_data += "</div>";
			break;
		case "timechart" :
			var listtimes = [];
			$.each(datajs, function(index, dt) {
				listtimes.push(dt.value);
			});
			var maxNumL = Math.max.apply(Math, listtimes);
			var NumPer = 0;
			html_data += "";
			$.each(datajs, function(index, dt) {
				var NumPer = ((Math.floor((dt.value/maxNumL)*1000)/1000)*100).toFixed(1);
				var time_DDHH = toDDHH(dt.value);
				if(dt.value =="") {
					var time_DDHH = "";
				}
				
				html_data += "<p class='font-s margin_bottom_5 overflow-h'><span class='l'>"+dt.name+ "</span><span class='r'>" +time_DDHH+"</span></p>";
				html_data += "<div class='progress b-radius margin_bottom_15'>";
				if(dt.value =="") {
					html_data += "<p class='margin-reset padding-sep line_height_16'>"+dt.no_proccessed_apps+"</p>";
				} else {
					html_data += "<div style='width:"+NumPer+"%;' class='fill'><span class='progress_perc'></span></div>";
				}
				html_data += "</div>";
				if(limit !="") {
					return index<limit;
				}
			});
			break;
		case "tablechart" :
			html_data += "	<div class='overflow-h'>";
			if(datajs.length>0){
				html_data += "<table class='lego_table'>";
				html_data += "<tr>";
				$.each(data_v[0].table_labels, function(index1, db1) {
					html_data += "<th>"+db1.label+"</th>";
				});
				html_data += "</tr>";
				$.each(datajs, function(index2, db2) {
					if(index2<limit) {
						html_data += "<tr>";
						html_data += "<td>"+db2.param_label+"</td>";
						$.each(db2.values, function(index3, db3) {
							html_data += "<td class='c'>"+db3.val+"</td>";
						});
						html_data += "<td><a href='"+db2.param_link_url+"'>"+db2.param_link_label+"</a></td>";
						html_data += "</tr>";
					}
				});
				if(data_v[0].table_msg_all_label !=="") {
					html_data += "<tfoot>";
					html_data += "<td colspan='"+(datajs[0].values.length+2)+"'><a href='"+data_v[0].table_msg_all_url+"'>"+data_v[0].table_msg_all_label+"</a></td>";
					html_data += "</tfoot>";
				}
				html_data += "</table>";
				if(data_v[0].table_new_btn_label !=="") {
					html_data += "<p><a href='"+data_v[0].table_new_btn_url+"' class='btn large'>"+data_v[0].table_new_btn_label+"</a></td></p>";
				}
			} else {
				html_data += "<p class='c padding-30'>No Data Available</p>";
			}
			html_data += "</div>";
			break;
		case "profileslisting" :
			var html_data = "";
			if(typeof data_v !=="undefined") {
				html_data += "<p class='font-s margin_bottom_5 overflow-h'>"+data_v[0].description_html+"</p>";
			}
			html_data += "";
			$.each(datajs, function(index, dp) {
				html_data += "<div class='prf_block'>";
				html_data += "	<div class='prf_img_block'>";
				html_data += "		<a href='"+dp.link+"' target='_blank'><img src='"+dp.img+"' alt='' /></a>";
				html_data += "	</div>";
				html_data += "	<div class='prf_desc_block'>";
				html_data += "		<a href='"+dp.link+"' class='prf_name' target='_blank'>"+dp.name+"</a> \
									<span class='prf_title'>"+dp.title+"</span> \
									<span class='prf_compny'>"+dp.value+"</span>";
				html_data += "	</div>";
				html_data += "</div>";
				if(limit !="") {
					return index<limit;
				}
			});
			break;
		case "form_generator" :
			var html_data = "";
			if(datajs.length>0) {
				html_data += "<form method='"+data_v[0].form_method+"' action='"+data_v[0].form_action+"'>";
				$.each(datajs, function (entryIndex, entry) {
					if(entryIndex<limit){
						if (entry['label'] != "") {
							html_data += '<label class="bold">'+entry['label']+'</label>';
						}
						if (entry['element_type'] == "input") {
							if ( entry['ftype'] == "hidden" ) {
								html_data += '<input type="' + entry['ftype'] + '" name="' + entry['fname'] + '" />';
							} else {
								html_data += '<p class="margin_bottom_10"><input type="' + entry['ftype'] + '" name="' + entry['fname'] + '" class="' + entry['class'] + ' ' + entry['req'] + '" placeholder="' + entry['placeholder_txt'] + '" /></p>';
							}
						} else if(entry['element_type'] == "textarea") {
							html_data += '<p class="margin_bottom_10"><textarea name="'+entry['fname']+'" class="'+entry['class']+' '+entry['req']+'" placeholder="'+entry['placeholder_txt']+'"></textarea></p>';
						} else if(entry['element_type'] == "button") {
							html_data += '<p class="margin_bottom_10"><button name="'+entry['fname']+'" class="'+entry['class']+'" type="'+entry['ftype']+'">'+entry['value']+'</button></p>';
						} else if(entry['element_type'] == "select") {
							html_data += '<p class="margin_bottom_10"><select name="'+entry['fname']+'" class="'+entry['class']+'">';
							if(entry['default_value']) {
								 html_data += '<option vlaue=" ">' + entry['default_value'] + '</option>';
							}
							var selected ="";
							$.each(entry['options'], function (entryIndex2, entry2) {
								var selected = (entry2['selected'] == "1") ? 'selected' : '';
								html_data += '<option value="'+entry2['id_value']+'" class="'+entry2['class']+'" '+selected+'>'+entry2['text']+'</option>';
							});
							html_data += '</select></p>';
						} else {
							html_data += '';
						}
					}
				 });
				html_data += "<button type="+data_v[0].from_button_type+">"+data_v[0].from_button_label+"</button>";
				html_data += "</form>";
			} else {
				html_data += "<p class='c padding-30'>No Data Available</p>";
			}
			break;
		default: break; 
	}
	return html_data;
	
}