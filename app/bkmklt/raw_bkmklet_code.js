(() => {
	function getBinaryData(url, callback) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.responseType = "arraybuffer";
		xhr.onload = () => {
			if (xhr.status === 200) {
				callback(xhr.response);
			}
		};
		xhr.send();
	}

	function extractAndSendUrlAndImages() {
		const websocket = new WebSocket("ws://localhost:9000");

		websocket.onopen = () => {
			const imagePattern = /.*\.(jpg|jpeg|png|gif|webp|avif)$/;
			const images = Array.from(document.querySelectorAll("img")).filter(
				(image) => imagePattern.test(image.src),
			);

			console.log(images);
			websocket.send(
				JSON.stringify({
					msgtype: "url",
					url: window.location.href,
				}),
			);

			for (const img of images) {
				const imgSrc = img.src;
				getBinaryData(imgSrc, (binaryData) => {
					const imagePayload = {
						msgtype: "image",
						src: imgSrc,
						binaryData: Array.from(new Uint8Array(binaryData)),
					};

					websocket.send(JSON.stringify(imagePayload));
				});
			}
		};

		websocket.onmessage = (event) => {
			const msg = event.data.toString();

			if (msg === "recipe_success") {
				console.log("Recipe sent to server successfully!");
			} else if (msg === "recipe_error") {
				console.log("Error parsing recipe...");
			} else if (msg === "image_success") {
				console.log("Image sent to server successfully!");
			} else if (msg === "image_error") {
				console.log("Error sending image to server...");
			} else {
				console.log(msg);
			}
		};

		websocket.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		websocket.onclose = () => {
			console.log("WebSocket connection closed");
		};
	}

	extractAndSendUrlAndImages();
})();
