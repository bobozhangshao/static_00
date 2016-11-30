
var websocket={
    
    onReady: function(){
    
        websocket.opened = false;
        websocket.local = true;   
    },
    
    create_websocket: function(host,port,openfunction){
    
        if (host == ""){
            var host = '192.168.1.101';
            websocket.local = true;
        }
                
        if (typeof MozWebSocket != "undefined"){
            websocket.ws = new MozWebSocket("ws://"+host+":"+port);
        }
        else if (window.WebSocket){
            websocket.ws = new WebSocket("ws://"+host+":"+port);
        }
        else{
            alert("This browser does not support WebSocket.");
        }
        
        websocket.ws.onopen = openfunction;
        
        websocket.ws.onmessage = function(evt) {
            var rsp = $.parseJSON(evt.data);

            var func = rsp["function"];
			if (func == "index.HRV")
			{
				var RR_Histogram = rsp["RRHist"];
				var HR_Histogram = rsp["HRHist"];
				var RR_s = rsp["RR_s"];
				var Freqs = rsp["Freqs"];
				var Pxx = rsp["Pxx"];
				var tp = rsp["tp"];
				var fp = rsp["fp"];
				eval(func + "(" + RR_Histogram + "," +HR_Histogram+ "," +RR_s+ "," +Freqs+ "," +Pxx+ "," +tp+ "," +fp+ ")");
			}
			else if(func == "index.dataECG")
			{
				var ecgdata = rsp["ecgdata"];
				var peaks = rsp["peaks"];

                $.ajax({
                    type:"POST",
                    url:"./actions/measure.php",
                    data:{username:$.cookie("workUser"),'data':ecgdata,'type':'ECG','device':$("#connlist").valueOf()},
                    success:function () {
                    }
                });

				eval(func + "(" + ecgdata + "," +peaks+ ")");
			}
		    else{
                var arg = rsp["argument"];
                eval(func + "(" +arg+")");
            }
        };
    
    
    },
    
    send_request: function(request,argument){
    
        if (websocket.opened == true){
            websocket.ws.send(request + '\t' + argument + '\n');
        }
        else{
            console.log("websocket isn't ready!");
            return;
        }
        
    },
    
    close: function(data){
        
        websocket.send_request("DISCONNECT","");
        websocket.ws.close();
    },
    
    

}


$(document).ready(websocket.onReady);
