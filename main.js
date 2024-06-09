import config from "./config.js";

var connect = function (socket, callback) {
	var _handleMessage = (event) => {
		let messageText = new String(event?.data);
		if (messageText.startsWith("PING")) {
			socket.send(messageText.replace("PING", "PONG"));
			// Pings are not propagated.
			console.log(`PING message recieved. Raw message: ${messageText}`);
			return;
		}
	};
	socket.addEventListener("message", _handleMessage);
	socket.send("CAPAB START 1205");
	socket.send("CAPAB END");
	socket.send(`SERVER ${config.server_name} ${config.send_password} 0 ${config.sid} :${config.description}`)
	socket.send(`:${config.sid} BURST ${Math.floor(Date.now()/1000)}`)
};
const socket = new WebSocket(config.ws_url);
socket.addEventListener("open", function() {
	connect(socket, function() {
		console.log("Connected!");
	})
})
