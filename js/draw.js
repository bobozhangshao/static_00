
////////////////////////////////////////////////
//---------------  ECG  ----------------------//
////////////////////////////////////////////////

var ECG_xAxis_data = [];
var now = new Date();
var len = 1000; // The sample frequency is 250 Hz, so the time buffer is 4 s.
while (len--) {
	ECG_xAxis_data.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
	now = new Date(now - 4);
}			

var ECG_series_data = [];
len = 1000;
while (len--) {

	ECG_series_data.push(0);
}


var ECG_Options = {
    title: {
        text: "ECG",
    },
    tooltip: {
        show: false
    },
    legend: {
        data: []
    },
    toolbox: {
        show: false
    },
    addDataAnimation: false,
    animation : false,
    xAxis: [
        {
            type: 'category',
			name: 'Time(s)',
			nameTextStyle: {fontSize:14,fontWeight:'bold'},
			axisLine: {onZero:false,lineStyle:{width:3}},
			axisTick: {lineStyle:{width:3}},
			splitArea: { show: false },
            spiltLine: { show: false },
			data : ECG_xAxis_data,
			axisLabel : {textStyle:{fontSize:14,fontWeight:'bold'}},
			boundaryGap: false
			
        }
    ],
    yAxis: [
        {
            type: 'value',
			name: 'Amplitude(mV)',
			nameTextStyle: {fontSize:14,fontWeight:'bold'},
            axisLine: {lineStyle:{width:3}},
            axisLabel: {textStyle:{fontSize:14,fontWeight:'bold'}},
			boundryGap: [0.2, 0.2],
            splitArea: { show: false },
			spiltLine: { show: false },
			precision: 3,
			splitNumber: 5,
			scale: true
						
        }
    ],
    series: [
	    {
			name: 'ECG',
			type: 'line',
			data: ECG_series_data,
			smooth: true,
			symbol: 'none',
			showAllSymbol: true,
			lineStyle: {width:1},
			addDataAnimation: false
		}
    ]
};
	
ECG_Chart = echarts.init(document.getElementById('ECG'));
ECG_Chart.setOption(ECG_Options);

function updateECG(data,peaks){

    var len = data.length;
	var peaks_len = peaks.length;
    var now = new Date();
	var p = 0;
	for (k=0;k<len;k++){
        // && peaks_len != 0 && p<peaks_len 
		if ( k==peaks[p] && peaks_len != 0 && p<peaks_len )
        {
			ECG_series_data.push({value:data[k], symbol:'circle',symbolSize:10});
			p = p+1;
		}
		else
		{
			ECG_series_data.push(data[k]);	
		}	
		ECG_series_data.shift();
		
		ECG_xAxis_data.push(now.toLocaleTimeString().replace(/^\D*/,''));
		ECG_xAxis_data.shift();
	
		now = new Date(now +4);	
	     
	}
    ECG_Chart.setOption({
        xAxis: {
            data: ECG_xAxis_data
        },
        series: [{
            name:'ECG',
            data: ECG_series_data
        }]
    });	
			
}

////////////////////////////////////////////////
//------RR Tachogram and HR Instantaneous-----//
////////////////////////////////////////////////
		
var RR_HR_Tachogram_xAxis_data = [];
var RR_Tachogram_now = new Date();
len = 50;
while (len--) {
    RR_HR_Tachogram_xAxis_data.unshift(RR_Tachogram_now.toLocaleTimeString().replace(/^\D*/,''));
    RR_Tachogram_now = new Date(RR_Tachogram_now - 1000);
}

var RR_Tachogram_series_data = [];
var HR_Instantaneous_series_data = [];
len = 50;
while (len--) {
    RR_Tachogram_series_data.push(0);
	HR_Instantaneous_series_data.push(0);
}
           		
		
var RR_Tachogram_Options = {
    title : {
        text: 'RR Tachogram and Instantaneous Heart Rate'
    },
    tooltip : {
	    show: false,
        trigger: 'axis',
    },
    legend: {
		show: false,
        data:['RR interval','Heart rate'],
        textStyle:{fontSize:16,fontWeight:'bold'},
		x:'right'
    },
	addDataAnimation: false,
    animation : false,
    grid: {
        x: 80,
        y: 65,
        x2:80,
        y2:10
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            axisLine: {lineStyle:{width:3}},
	        axisLabel:{show:false},
            axisTick: {show:false,onGap:false,lineStyle:{width:3}},
            splitLine: {show:false},
            data : RR_HR_Tachogram_xAxis_data
        }
    ],
    yAxis : [
        {
            name : "RR interval (ms)",
            type : 'value',
            nameTextStyle: {fontSize:14,fontWeight:'bold'},
            axisLine: {lineStyle:{width:3}},
            axisLabel: {textStyle:{fontSize:14,fontWeight:'bold'}},
            scale:true,
	        //splitNumber: 6,
            boundaryGap: [0.05, 0.05],
            splitArea : {show : true}
        }
    ],
    series : [
        {
            name:'RR interval',
            type:'line',
            data:RR_Tachogram_series_data,
            markLine : {
                symbol : 'none',
                itemStyle : {
                    normal : {
                        label : {
                            show:false
                        }
                    }
                },
                data : [
                    {type : 'average', name: 'mean value'}
                ]
            }
        },
        {
            name:'Heart rate',
            type:'line',
            data:[]
        }
        
    ]
};

var HR_Instantaneous_Options = {
    tooltip : {
	    show: false,
        trigger: 'axis',
        textStyle:{fontSize:18,fontWeight:'bold'},  
    },
    legend: {
        y : -30,
        data:['RR interval','Heart rate'],
        textStyle:{fontSize:16,fontWeight:'bold'},
    },
    addDataAnimation: false,
    animation : false,
    grid: {
        x: 80,
        y: 30,
        x2:80,
        y2:50
    },
    xAxis : [
        {
            name : "Time(s)",
            type : 'category',
            boundaryGap : false,
            nameTextStyle: {fontSize:14,fontWeight:'bold'},
            axisLine: {lineStyle:{width:3}},
            axisTick: {onGap:false,lineStyle:{width:3}},
            splitLine: {show:false},
            data : RR_HR_Tachogram_xAxis_data,
			axisLabel : {
                show: true,
                textStyle:{fontSize:14,fontWeight:'bold'},
			}
            
        }
    ],
    yAxis : [
        {
            name:'Heart rate (bpm)',
            type : 'value',
            nameTextStyle: {fontSize:14,fontWeight:'bold'},
            axisLine: {lineStyle:{width:3}},
            axisLabel: {textStyle:{fontSize:14,fontWeight:'bold'}},
            scale:true,
            //splitNumber: 6,
            boundaryGap: [0.05, 0.05],
            splitArea : {show : true}
        }
    ],
    series : [
        {
            name:'Heart rate',
            type:'line',
            data:HR_Instantaneous_series_data,
            markLine : {
                symbol : 'none',
                itemStyle : {
                    normal : {
                        color:'#1e90ff',
                        label : {
                            show:false
                        }
                    }
                },
                data : [
                    {type : 'average', name: 'mean value'}
                ]
            }
        }
    ]
};	

RR_Tachogram_Chart = echarts.init(document.getElementById('RR'));
HR_Instantaneous_Chart = echarts.init(document.getElementById('HR'));
RR_Tachogram_Chart.setOption(RR_Tachogram_Options);
HR_Instantaneous_Chart.setOption(HR_Instantaneous_Options);

function updateRealRR_HR(data){

    var len = data.length;
	var half_len = len/2;
	var now = new Date();
	for (k=0;k<half_len;k++){
		   
		   RR_HR_Tachogram_xAxis_data.push(now.toLocaleTimeString().replace(/^\D*/,''));
		   RR_HR_Tachogram_xAxis_data.shift();
		   
		   RR_Tachogram_series_data.push(data[k]);
		   RR_Tachogram_series_data.shift();
		   
		   HR_Instantaneous_series_data.push(data[k+half_len]);
		   HR_Instantaneous_series_data.shift();
		   
		   now = new Date(now + parseInt(data[k]));	
	   	   
	}
    RR_Tachogram_Chart.setOption({
        xAxis: {
            data: RR_HR_Tachogram_xAxis_data
        },
        series: [{
            name:'RR interval',
            data: RR_Tachogram_series_data
        }]
    });
	HR_Instantaneous_Chart.setOption({
        xAxis: {
            data: RR_HR_Tachogram_xAxis_data
        },
        series: [{
            name:'Heart rate',
            data: HR_Instantaneous_series_data
        }]
    });		 	
}

////////////////////////////////////////////////
//------  RR Histogram and HR Histogram  -----//
////////////////////////////////////////////////

var RR_Histogram_Options = {
    title : {
        text: 'RR interval Histogram',
    },
    tooltip : {
	    show: false,
        trigger: 'axis',
        textStyle:{fontSize:18,fontWeight:'bold'}
        
    },
    legend: {
		show: false,
        data:['times'],
        textStyle:{fontSize:16,fontWeight:'bold'},
    },
	addDataAnimation: false,
    animation : false,
    grid: {
        x: 80,
        y: 60,
        x2:80,
        y2:30
    },
    xAxis : [
        {
            name : "RR (s)",
            type : 'category',
            boundaryGap : true,
            nameTextStyle: {fontSize:14,fontWeight:'bold'},
            axisLine: {lineStyle:{width:3}},
            axisTick: {onGap:false,lineStyle:{width:3}},
            splitLine: {show:false},
            data : (function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(0.6 + (10-len)*0.05);
                }
                return res;
            })(),
			axisLabel : {
                          show: true,
                          textStyle:{fontSize:14,fontWeight:'bold'},
						  formatter: function (value){
                                 return value.toFixed(3) + 's';
						  }
			} 
            
        }
    ],
    yAxis : [
        {
            name:'times',
            type : 'value',
            nameTextStyle: {fontSize:14,fontWeight:'bold'},
            axisLine: {lineStyle:{width:3}},
            axisLabel: {textStyle:{fontSize:14,fontWeight:'bold'}},
 
        }
    ],
    series : [
        {
            name:'times',
            type:'bar',
            data:(function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(0);
                }
                return res;
            })(),
            
        }
    ]
};

var HR_Histogram_Options = {
    title : {
        text: 'Heart Rate Histogram',
    },
    tooltip : {
	    show: false,
        trigger: 'axis',
        textStyle:{fontSize:18,fontWeight:'bold'}
        
    },
    legend: {
		show: false,
        data:['times'],
        textStyle:{fontSize:16,fontWeight:'bold'},
    },
	addDataAnimation: false,
    animation : false,
    grid: {
        x: 80,
        y: 60,
        x2:80,
        y2:30
    },
    xAxis : [
        {
            name : "HR (bpm)",
            type : 'category',
            boundaryGap : true,
            nameTextStyle: {fontSize:14,fontWeight:'bold'},
            axisLine: {lineStyle:{width:3}},
            axisTick: {onGap:false,lineStyle:{width:3}},
            splitLine: {show:false},
            data : (function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(65 + (10-len)*2);
                }
                return res;
            })(),
			axisLabel : {
                          show: true,
                          textStyle:{fontSize:14,fontWeight:'bold'},
						  formatter: function (value){
                                 return value.toFixed(1);
						  }
			} 
            
        }
    ],
    yAxis : [
        {
            name:'times',
            type : 'value',
            nameTextStyle: {fontSize:14,fontWeight:'bold'},
            axisLine: {lineStyle:{width:3}},
            axisLabel: {textStyle:{fontSize:14,fontWeight:'bold'}},
 
        }
    ],
    series : [
        {
            name:'times',
            type:'bar',
            data:(function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(0);
                }
                return res;
            })(),
            
        }
    ]
};

RR_Histogram_Chart = echarts.init(document.getElementById('RR_hist'));
RR_Histogram_Chart.setOption(RR_Histogram_Options);
HR_Histogram_Chart = echarts.init(document.getElementById('HR_hist'));
HR_Histogram_Chart.setOption(HR_Histogram_Options);

//----update RR and HR Histogram , Poincare , PSD ----//
function updateHRV(RR_Histogram,HR_Histogram,RR_s,Freqs,Pxx){

        //---RR Histogram---//
        var RR_len_half = RR_Histogram.length/2;
	    var HR_len_half = HR_Histogram.length/2;
        var RR_counts_points=RR_Histogram.slice(0,RR_len_half);
		var RR_limits_points=RR_Histogram.slice(RR_len_half);
		var HR_counts_points=HR_Histogram.slice(0,HR_len_half);
		var HR_limits_points=HR_Histogram.slice(HR_len_half);
	    	
	    RR_Histogram_Options["xAxis"][0]["data"] = RR_limits_points;
	    RR_Histogram_Options["series"][0]["data"] = RR_counts_points;
	    RR_Histogram_Chart.setOption(RR_Histogram_Options,true);
		
		HR_Histogram_Options["xAxis"][0]["data"] = HR_limits_points;
	    HR_Histogram_Options["series"][0]["data"] = HR_counts_points;
	    HR_Histogram_Chart.setOption(HR_Histogram_Options,true);
		
		//---Poincare Plot---//
		var rr_s_x = RR_s.slice(0,-1);
        var rr_s_y = RR_s.slice(1);
		var len_rr_sx = rr_s_x.length;
		var rr_ms_xy = [];
		for(var i=0;i<len_rr_sx;i++){
            rr_ms_xy.push([rr_s_x[i]*1000,rr_s_y[i]*1000])
        }
		
		Poincare_Options["series"][0]["data"] = rr_ms_xy;
	    Poincare_Chart.setOption(Poincare_Options,true);
		
		//---Power Spectral Density--///
		var freqs = [];
        var step = Freqs[1]/(Freqs[2]-1);
        for(var i=0;i<Freqs[2];i++){
                freqs[i] = step*i;
        }
		
		var freqs_pxx = [];
		var len;
        if (freqs.length == Pxx.length){
            len = freqs.length;            
        }
              
        for(var i=0;i<len;i++){
            freqs_pxx.push([freqs[i],Pxx[i]])
        }
		
		for(var i=0;i<len;i++){
            if (freqs[i]>0.04){
                ulf_lfSeg = i;
                break;
            }
        }
        for(var i=0;i<len;i++){
            if (freqs[i]>0.15){
                lf_hfSeg = i;
                break;
            }
        }
		
		PSD_Options["series"][0]["data"] = freqs_pxx.slice(0,ulf_lfSeg+1);
	    PSD_Options["series"][1]["data"] = freqs_pxx.slice(ulf_lfSeg,lf_hfSeg+1);
	    PSD_Options["series"][2]["data"] = freqs_pxx.slice(lf_hfSeg);
	    PSD_Chart.setOption(PSD_Options,true);
            
		
}

////////////////////////////////////////////////
//----------      Poincare Plot      ---------//
////////////////////////////////////////////////
var Poincare_Options = {
    title : {
        text: 'Poincare Plot',
    },
    tooltip : {
	    show: false,
        trigger: 'item',
        textStyle:{fontSize:18,fontWeight:'bold'}
        
    },
    legend: {
		show: false,
        data:['RR interval'],
        textStyle:{fontSize:16,fontWeight:'bold'},
    },
	addDataAnimation: false,
    animation : false,
    grid: {
        x: 80,
        y: 65,
        x2:80,
        y2:30
    },
    xAxis : [
        {
            name : "RR i (ms)",
            type : 'value',
            nameTextStyle: {fontSize:14,fontWeight:'bold'},
            axisLine: {lineStyle:{width:3}},
			axisLabel : {textStyle:{fontSize:14,fontWeight:'bold'}},
            scale:true			
            
        }
    ],
    yAxis : [
        {
            name:'RR i+1 (ms)',
            type : 'value',
            nameTextStyle: {fontSize:14,fontWeight:'bold'},
            axisLine: {lineStyle:{width:3}},
            axisLabel: {textStyle:{fontSize:14,fontWeight:'bold'}},
            scale:true
        }
    ],
    series : [
        {
            name:'RR interval',
            type:'scatter',
			symbolSize:6,
            data:(function (){
                var res = [];
                var len = 20;
                while (len--) {
                    res.push([0,0]);
                }
                return res;
            })(),
            
        }
    ]
};


Poincare_Chart = echarts.init(document.getElementById('Poincare'));
Poincare_Chart.setOption(Poincare_Options);

////////////////////////////////////////////////
//--------    Power Spectral Density   -------//
////////////////////////////////////////////////
var PSD_Options = {
    title : {
        text: 'Power Spectral Density',
    },
    tooltip : {
	    show: false,
        trigger: 'item',
        textStyle:{fontSize:18,fontWeight:'bold'}
        
    },
    legend: {
	    show: false,
        data:['PSD'],
        textStyle:{fontSize:16,fontWeight:'bold'},
    },
	addDataAnimation: false,
    animation : false,
    grid: {
        x: 80,
        y: 65,
        x2:80,
        y2:30
    },
    xAxis : [
        {
            name : "Freq (Hz)",
            type : 'value',
            nameTextStyle: {fontSize:14,fontWeight:'bold'},
            axisLine: {lineStyle:{width:3}},
			axisLabel : {textStyle:{fontSize:14,fontWeight:'bold'}},
            splitLine : {show:false}			
            
        }
    ],
    yAxis : [
        {
            name:'PSD ((s^2)/Hz)',
            type : 'value',
            nameTextStyle: {fontSize:14,fontWeight:'bold'},
            axisLine: {lineStyle:{width:3}},
            axisLabel: {textStyle:{fontSize:14,fontWeight:'bold'}},
            //scale:true
        }
    ],
    series : [
        {
            name:'PSD',
            type:'line',
			smooth:true,
			symbol:'none',
			itemStyle:{normal:{lineStyle: {color: '#0000ff'},areaStyle:{color:'#0000ff',type:'default'}}},
            data:(function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push([0.18-len*0.02,0]);
                }
                return res;
            })(),
            
        },
		{
            name:'PSD',
            type:'line',
			smooth:true,
			symbol:'none',
			itemStyle:{normal:{lineStyle: {color: '#00ff00'},areaStyle:{color:'#00ff00',type:'default'}}},
            data:(function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push([0.36-len*0.02,0]);
                }
                return res;
            })(),
            
        },
		{
            name:'PSD',
            type:'line',
			smooth:true,
			symbol:'none',
			itemStyle:{normal:{lineStyle: {color: '#ff0000'},areaStyle:{color:'#ff0000',type:'default'}}},
            data:(function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push([0.54-len*0.02,0]);
                }
                return res;
            })(),
            
        },
		
        
    ]
};	

PSD_Chart = echarts.init(document.getElementById('PSD'));
PSD_Chart.setOption(PSD_Options);
