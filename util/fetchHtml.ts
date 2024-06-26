import fetch from "node-fetch"

export async function fetchHtml(url: string): Promise<string | null> {
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return await response.text()
    } catch (error) {
        console.error(`Error fetching URL ${url}: ${(error as Error).message}`)
        return null
    }
}
