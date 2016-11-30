
var index={

    onReady: function(){
        //////
        websocket.create_websocket(window.location.hostname,
                                   "5500",
                                   function(){
                                       websocket.opened = true;
                                       websocket.send_request("CHECK_TRIAL","\t");
                                       index.message('<p class="event">WebSocket Status: ' + websocket.ws.readyState +' (open)');
                                   
                                   });
        
        $('#scanDev').click(function(){
            
            websocket.send_request("SCAN","\t");
        });

        $('#connDev').click(function(){
            
            var str = $('#devList').val();
            websocket.send_request("CONNECT",str);
        });
        
		$('#disConn').click(function(){
            
            var str = $('#connlist').val();
            websocket.send_request("DISCONNECT",str);
        });
        
		
		$("#Histogram_button").click(function(){
            $("#Poincare,#Poincare_parameters,#PSD,#PSD_parameters1,#PSD_parameters2").hide();
			$("#RR_hist,#HR_hist,#RR_hist_parameters,#HR_hist_parameters").show();
        });
		
		$("#Poincare_button").click(function(){
            $("#RR_hist,#HR_hist,#PSD,#PSD_parameters1,#PSD_parameters2,#RR_hist_parameters,#HR_hist_parameters").hide();
			$("#Poincare,#Poincare_parameters").show();
        });
		
		$("#PSD_button").click(function(){
            $("#RR_hist,#HR_hist,#RR_hist_parameters,#HR_hist_parameters,#Poincare,#Poincare_parameters").hide();
			$("#PSD,#PSD_parameters1,#PSD_parameters2").show();
        });
        
    },
    
    message: function(msg){
        $('#chatLog').append(msg+'</p>');
    },
    
    
    deviceList:function(data){
        index.message('<p class="message">Scan: ' + data["name"]);
        $('#devList').append('<option value=' + data["name"] + '>' + data["mac_address"] +'_'+ data["name"] + '</option>');
    },

    connectedDevice:function(data){
        index.message('<p class="message">Connect to : ' + data["name"] + ' successfully.');
        $('#connlist').append('<option value=' + data["name"] + '>' + data["mac_address"] +'_'+ data["name"] + '</option>');
    },

    dataECG:function(data,peaks){
        //index.message('<p class="message">Received : ' + data[0] + data[1] + data[249] + data.length + ' points.');
		//index.message('<p class="message">Received : ' + peaks + peaks.length + ' points.');
        updateECG(data,peaks);
    },
	
	realRR_HR:function(data){
        //index.message('<p class="message">Received : ' + data + ' ' +data.length + ' points.');
        updateRealRR_HR(data);
    },
	
	updateHRVParameters: function(tp,fp){
		
		
		$("#mean_rr").html(tp[0]);
		$("#min_rr").html(tp[1]);
        $("#max_rr").html(tp[2]);
		$("#sd_rr").html(tp[3]);
		$("#r_MSSD").html(tp[9]);
		$("#pNN50").html(tp[10]);
		$("#TINN").html(tp[11]);
		$("#tindex").html(tp[12]);
		
		$("#mean_hr").html(tp[4]);
		$("#mean_hr_s").html(tp[6]);
		$("#sd_hr").html(tp[5]);
		
		$("#sd1").html(tp[13]);
		$("#sd2").html(tp[14]);
		$("#sd1_sd2").html(tp[15]);
		
		$("#vlfPower").html(fp[3]);
		$("#vlfPowerPerc").html(fp[6]);
		$("#lfPower").html(fp[4]);
		$("#lfPowerPerc").html(fp[7]);
		$("#lfNorm").html(fp[9]);
		$("#hfPower").html(fp[5]);
		$("#hfPowerPerc").html(fp[8]);
		$("#hfNorm").html(fp[10]);
		$("#lf_hf").html(fp[11]);
		
		
    },
	
	HRV:function(RR_Histogram,HR_Histogram,RR_s,Freqs,Pxx){
        //index.message('<p class="message">Received : ' + RR_Histogram + ' ' +RR_Histogram.length + ' points.');
		//index.message('<p class="message">Received : ' + HR_Histogram + ' ' +HR_Histogram.length + ' points.');
		//index.message('<p class="message">Received : ' + Freqs + ' Pxx length: ' + Pxx.length + ' points.');
		//index.message('<p class="message">Received : ' + tp);
        updateHRV(RR_Histogram,HR_Histogram,RR_s,Freqs,Pxx);
		
		index.updateHRVParameters(tp,fp);
    },

	
     


};
$(document).ready(index.onReady);

//angular auto skip
var appIndex = angular.module('indexApp',['ngCookies']);
appIndex.controller('indexController',function ($scope,$cookies) {
    var loginName = $cookies.get('loginState');
    if (!loginName){
        window.location.href='login.html';
    }

    $scope.skipToUpload = function () {
        window.location.href='login.html';
    }
});