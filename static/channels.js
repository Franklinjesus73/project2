document.addEventListener('DOMContentLoaded', () => {


    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    const name = localStorage.getItem('user');

    document.querySelector('#submit_channel').disabled = true;


        document.querySelector('#channel_name').onkeyup = () => {
    	if (document.querySelector('#channel_name').value.length > 2)
        	document.querySelector('#submit_channel').disabled = false;
        else
        	document.querySelector('#submit_channel').disabled = true;
        };

	            document.querySelectorAll("#show_channel").forEach(funct => {
                    funct.onclick = () => {
                        const chosen_channel = funct.dataset.channel;
                        localStorage.setItem('chosen_channel', chosen_channel);
                        document.querySelector('#messages').delete(li)
                        socket.emit('join', {'room': chosen_channel, 'name': name});
                        return false;
                    };
                });

	if (localStorage.getItem('chosen_channel'))
    		{
            const chosen_channel = localStorage.getItem('chosen_channel');
            socket.emit('join', {'room': chosen_channel, 'name': name});
		}
	else localStorage.setItem('chosen_channel', 'General');

});


//FUNCIONANDO