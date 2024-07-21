;(() => {
    function createToast(message, type, withSpinner = false) {
        const toast = document.createElement("div")
        toast.style.position = "fixed"
        toast.style.bottom = "20px"
        toast.style.right = "20px"
        toast.style.padding = "10px 20px"
        toast.style.backgroundColor =
            type === "success" ? "#d4edda" : type === "error" ? "#f8d7da" : "#d1ecf1"
        toast.style.color =
            type === "success" ? "#155724" : type === "error" ? "#721c24" : "#0c5460"
        toast.style.border = "1px solid"
        toast.style.borderColor =
            type === "success" ? "#c3e6cb" : type === "error" ? "#f5c6cb" : "#bee5eb"
        toast.style.zIndex = "9999"
        toast.style.borderRadius = "5px"
        toast.style.fontFamily = "Arial, sans-serif"
        toast.style.opacity = "0"
        toast.style.transform = "scale(0)"
        toast.style.transition = "opacity 0.5s, transform 0.5s"
        toast.innerText = message

        if (withSpinner) {
            const spinner = document.createElement("div")
            spinner.style.border = "4px solid rgba(0, 0, 0, 0.1)"
            spinner.style.borderTop = `4px solid ${toast.style.color}`
            spinner.style.borderRadius = "50%"
            spinner.style.width = "20px"
            spinner.style.height = "20px"
            spinner.style.animation = "spin 1s linear infinite"
            spinner.style.display = "inline-block"
            spinner.style.marginLeft = "10px"
            spinner.style.verticalAlign = "middle"
            toast.appendChild(spinner)

            const style = document.createElement("style")
            style.innerHTML = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `
            document.head.appendChild(style)
        }

        document.body.appendChild(toast)

        // Trigger the animation
        requestAnimationFrame(() => {
            toast.style.opacity = "1"
            toast.style.transform = "scale(1)"
        })

        return toast
    }

    function removeToast(toast) {
        toast.style.opacity = "0"
        toast.style.transform = "scale(0)"
        setTimeout(() => {
            document.body.removeChild(toast)
        }, 500) // Match the transition duration
    }

    const ws = new WebSocket("ws://localhost:${port}")
    const toast = createToast("Sending URL to server!", "info", true)

    ws.onopen = () => {
        const base64Url = btoa(window.location.href)
        ws.send(base64Url)
    }

    ws.onmessage = (event) => {
        removeToast(toast)
        createToast("URL sent to server successfully!", "success")
    }

    ws.onerror = () => {
        removeToast(toast)
        createToast("Could not reach server", "error")
    }
})()
