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
	socket.send(`SERVER ${config.serverName} 1 ${config.description}`)
};
const config={
	sid: "1F7",
	send_password: "websocket_server",
	accept_password: "websocket_server",
	wsUrl: "wss://solanum3.9pfs.repl.co/",
	serverName: "websocket-server.solanum3.repl",
	description: "WebSocket IRC Server"
};
const socket=new WebSocket(config.wsUrl);
socket.addEventListener("open", function() {
	connect(socket, function() {
		console.log("Connected!");
	})
})
