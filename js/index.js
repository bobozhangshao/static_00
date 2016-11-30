
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
            $("#Poincare,#PSD").hide();
			$("#RR_hist,#HR_hist").show();
        });
		
		$("#Poincare_button").click(function(){
            $("#RR_hist,#HR_hist,#PSD").hide();
			$("#Poincare").show();
        });
		
		$("#PSD_button").click(function(){
            $("#RR_hist,#HR_hist,#Poincare").hide();
			$("#PSD").show();
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
	
	HRV:function(RR_Histogram,HR_Histogram,RR_s,Freqs,Pxx){
        //index.message('<p class="message">Received : ' + RR_Histogram + ' ' +RR_Histogram.length + ' points.');
		//index.message('<p class="message">Received : ' + HR_Histogram + ' ' +HR_Histogram.length + ' points.');
		//index.message('<p class="message">Received : ' + Freqs + ' Pxx length: ' + Pxx.length + ' points.');
        updateHRV(RR_Histogram,HR_Histogram,RR_s,Freqs,Pxx);
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