function message(obj){
    var el = document.createElement('p');
    if('announcement' in obj){
        el.innerHTML = '<em>' + obj.announcement + '</em>';
    }
    else if('message' in obj){
        el.innerHTML = '<b>' + obj.message[0] + '</b>' + obj.message[1];
    }
    else if('result' in obj){
        var list = '<ul>';
        for(var i in obj.result){
            list += '<li>' + obj.result[i] + '</li>';
        }
        list += '</ul>';
        el.innerHTML = list;
    }
    $('<p>').html(el).prependTo($("#chat"));
   // document.getElementById('chat').appendChild(el);
}

$(document).ready(function() {
    var socket = new io.Socket(null, {port: 8992, rememberTransport: false,
        transports: ['websocket', 'xhr-multipart', 'flashsocket']});
    socket.connect();
    socket.on('message', function(obj){
        if('buffer' in obj){
            for(var i in obj.buffer){
                message(obj.buffer[i]);
            }
        }else{
            message(obj);
        }
    });
    var emission_list = $("#emissions");
    function load_emissions(){
        $.getJSON("/stream", function(emissions){
            $.each(emissions, function(){
                socket.send({ task: [this.text]});
                $("<li>").html(this.text + " : " + this.id).prependTo(emission_list);
            });
            load_emissions();
        });
    }
    setTimeout(load_emissions, 1000);
});
