"use client";

import React from "react";

const Page = () => {
	const port = process.env.NEXT_PUBLIC_WEBSOCKET_PORT || "9000";

	const handleBookmarkletClick = () => {
		function createToast(message: string, type: string, withSpinner = false) {
			const toast = document.createElement("div");
			toast.style.position = "fixed";
			toast.style.bottom = "20px";
			toast.style.right = "20px";
			toast.style.padding = "10px 20px";
			toast.style.backgroundColor =
				type === "success"
					? "#d4edda"
					: type === "error"
						? "#f8d7da"
						: "#d1ecf1";
			toast.style.color =
				type === "success"
					? "#155724"
					: type === "error"
						? "#721c24"
						: "#0c5460";
			toast.style.border = "1px solid";
			toast.style.borderColor =
				type === "success"
					? "#c3e6cb"
					: type === "error"
						? "#f5c6cb"
						: "#bee5eb";
			toast.style.zIndex = "9999";
			toast.style.borderRadius = "5px";
			toast.style.fontFamily = "Arial, sans-serif";
			toast.style.opacity = "0";
			toast.style.transform = "scale(0)";
			toast.style.transition = "opacity 0.5s, transform 0.5s";
			toast.innerText = message;

			if (withSpinner) {
				const spinner = document.createElement("div");
				spinner.style.border = "4px solid rgba(0, 0, 0, 0.1)";
				spinner.style.borderTop = `4px solid ${toast.style.color}`;
				spinner.style.borderRadius = "50%";
				spinner.style.width = "20px";
				spinner.style.height = "20px";
				spinner.style.animation = "spin 1s linear infinite";
				spinner.style.display = "inline-block";
				spinner.style.marginLeft = "10px";
				spinner.style.verticalAlign = "middle";
				toast.appendChild(spinner);

				const style = document.createElement("style");
				style.innerHTML = `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `;
				document.head.appendChild(style);
			}

			document.body.appendChild(toast);

			// Trigger the animation
			requestAnimationFrame(() => {
				toast.style.opacity = "1";
				toast.style.transform = "scale(1)";
			});

			return toast;
		}

		function removeToast(toast: HTMLDivElement) {
			toast.style.opacity = "0";
			toast.style.transform = "scale(0)";
			setTimeout(() => {
				document.body.removeChild(toast);
			}, 500); // Match the transition duration
		}

		const ws = new WebSocket(`ws://localhost:${port}`);
		const toast = createToast("Sending URL to server!", "info", true);

		ws.onopen = () => {
			const base64Url = btoa(window.location.href);
			ws.send(base64Url);
		};

		ws.onmessage = (_event) => {
			removeToast(toast);
			createToast("URL sent to server successfully!", "success");
		};

		ws.onerror = () => {
			removeToast(toast);
			createToast("Could not reach server", "error");
		};
	};

	const bookmarkletCode = `
javascript:(() => {
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
`;

	return (
		<div style={{ padding: "20px" }}>
			<h1>Bookmarklet Generator</h1>
			<p>
				Drag the following link to your bookmarks bar to create a bookmarklet
				that sends the current page URL to your local app:
			</p>
			<a
				href={bookmarkletCode}
				style={{
					display: "inline-block",
					padding: "10px",
					background: "#0070f3",
					color: "white",
					textDecoration: "none",
					borderRadius: "4px",
					margin: "10px 0",
				}}
				onClick={handleBookmarkletClick}
			>
				{" "}
			</a>
			<h2>Instructions</h2>
			<ol>
				<li>Drag the "Save Page URL" link to your bookmarks bar.</li>
				<li>
					When you are on a page you want to save, click the bookmarklet in your
					bookmarks bar.
				</li>
				<li>
					The current page URL will be sent to your local app running at
					ws://localhost:
					{port}.
				</li>
				<li>
					Ensure your local app (WebSocket server) is running to receive the
					URL.
				</li>
			</ol>
		</div>
	);
};

export default Page;
