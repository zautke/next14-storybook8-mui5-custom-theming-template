import { Server } from "node:http"
import type { AddressInfo } from "node:net"
import WebSocket from "ws"
import { WebSocketServer } from "ws"

let server: Server
let wss: WebSocketServer
let port: number

beforeAll((done) => {
    server = new Server()
    wss = new WebSocketServer({ server })

    wss.on("connection", (ws: WebSocket) => {
        ws.on("message", (message: string) => {
            ws.send("success")
        })
    })

    server.listen(() => {
        port = (server.address() as AddressInfo).port
        console.log(`Test WebSocket server running on ws://localhost:${port}`)
        done()
    })
})

afterAll((done) => {
    wss.close(() => {
        server.close(done)
    })
})

test("WebSocket server should receive and respond to messages", (done) => {
    const ws: WebSocket = new WebSocket(`ws://localhost:${port}`)

    ws.on("open", () => {
        ws.send("http://example.com")
    })

    ws.on("message", (message: string) => {
        expect(message.toString()).toBe("success")
        ws.close()
        done()
    })

    ws.on("error", (error: Error) => {
        console.error("WebSocket error:", error)
    })
})
