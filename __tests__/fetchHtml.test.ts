import { fetchHtml } from "@util/fetchHtml"
import fetch from "node-fetch"

jest.mock("node-fetch", () => jest.fn())

describe("fetchHtml", () => {
    it("should fetch HTML content successfully", async () => {
        const mockHtml = "<html></html>"
        ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
            ok: true,
            text: jest.fn().mockResolvedValue(mockHtml),
        } as unknown as fetch.Response | Promise<fetch.Response>)

        const result = await fetchHtml("http://example.com")
        expect(result).toBe(mockHtml)
    })

    it("should return null and log error on HTTP error", async () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {})
        ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
            ok: false,
            status: 404,
            statusText: "Not Found",
        } as unknown as fetch.Response | Promise<fetch.Response>)

        const result = await fetchHtml("http://example.com")
        expect(result).toBeNull()
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            "Error fetching URL http://example.com: HTTP error! Status: 404",
        )
        consoleErrorSpy.mockRestore()
    })

    it("should return null and log error on fetch error", async () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {})
        ;(fetch as jest.MockedFunction<typeof fetch>).mockRejectedValue(new Error("Fetch error"))

        const result = await fetchHtml("http://example.com")
        expect(result).toBeNull()
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            "Error fetching URL http://example.com: Fetch error",
        )
        consoleErrorSpy.mockRestore()
    })
})
