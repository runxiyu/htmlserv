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
	socket.send("CAPAB QS EX CHW IE KNOCK SAVE EUID ENCAP");
	socket.send(`PASS ${config.send_password} TS 6 ${config.sid}`);
	socket.send(`SERVER ${config.server_name} 1 ${config.description}`)
};
const socket = new WebSocket(config.ws_url);
socket.addEventListener("open", function() {
	connect(socket, function() {
		console.log("Connected!");
	})
})
