;(() => {
    const ws = new WebSocket("ws://localhost:${port}")

    ws.onopen = () => {
        const base64Url = btoa(window.location.href)
        ws.send(base64Url)
    }

    ws.onmessage = (event) => {
        const msg = event.data.toString()

        if (msg === "success") {
            console.log("URL sent to server successfully!")
        } else if (msg === "parseerror") {
            console.log("Error parsing recipe!")
        } else if (msg === "error") {
            console.log("Error sending URL to server!")
        } else {
            console.log(msg)
        }
    }

    ws.onerror = (error) => {
        console.log(error)
    }
})()
