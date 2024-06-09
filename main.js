import config from "./config.js";

var connect = function (socket, callback) {
	var _handleMessage = (event) => {
		let msg = new String(event?.data);
		let prefix = null;
		if (msg[0] == ":") {
			let temp_array_one = msg.split(" ");
			let temp_array_two = temp_array_one.splice(0, 1);
			temp_array_two.push(temp_array_one.join(" "));
			let prefix_with_colon = temp_array_two[0];
			prefix = prefix_with_colon.slice(1, prefix_with_colon.length);
			msg = temp_array_two[1];
		}
		let msg_array = msg.split(" ");
		for (let i = 0; i < msg_array.length; i++) {
			if (msg_array[i].startsWith(":")) {
				msg_array[i] = msg_array[i].substring(1) + ' ' + msg_array.slice(i + 1).join(' ');
				msg_array.splice(i + 1);
				break;
			}
		}
		if (msg_array[0] == "PING") {
			if (msg_array.length == 2) {
				if (msg_array[1].trim() != config.sid) {
					socket.send(`:${config.sid} ERROR :Got PING intended for ${msg_array[1].trim()}`)
					return;
				}
				socket.send(`:${config.sid} PONG :${prefix}`);
				return;
			} else if (msg_array.length == 3) {
				socket.send(`:${config.sid} PONG ${msg_array[2].trim()} :${msg_array[1].trim()}`);
				return;
			} else {
				socket.send(`:${config.sid} ERROR :msg_array.length`);
				return;
			}
		}
	};
	socket.addEventListener("message", _handleMessage);
	socket.send("CAPAB START 1205");
	socket.send("CAPAB END");
	socket.send(`SERVER ${config.server_name} ${config.send_password} 0 ${config.sid} :${config.description}`)
	socket.send(`BURST ${Math.floor(Date.now()/1000)}`)
	socket.send("ENDBURST")
};
const socket = new WebSocket(config.ws_url);
socket.addEventListener("open", function() {
	connect(socket, function() {
		console.log("Connected!");
	})
})
