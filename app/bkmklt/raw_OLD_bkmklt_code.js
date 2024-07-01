javascript: (() => {
	const ws = new WebSocket("ws://localhost:9000");
	ws.onopen = () => {
		const url = window.location.href;
		ws.send(
			JSON.stringify({
				type: "url",
				payload: url,
			}),
		);
	};
	ws.onmessage = (event) => {
		const m = event.data;
		console.log(m);
		const msg = JSON.parse(m);
		console.log(msg);

		if (msg.type === "message") {
			if (msg.payload === "URL_RECEIVED") {
				console.log("URL sent to server successfully!");
			} else {
				console.log(msg.payload);
			}
		}
	};

	ws.onclose = () => {
		console.log("Connection closed!");
	};

	ws.onerror = (error) => {
		console.log(error);
	};
})();
