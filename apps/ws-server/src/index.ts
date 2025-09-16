import {WebSocketServer} from 'ws'
import {client} from '@repo/prisma-db/client'

const server = new WebSocketServer({
    port: 3001
})

server.on("connection", async (socket) => {
    // to check db is working fine with ws server
    await client.user.create({
        data:{
            username: Math.random().toString(),
            password: Math.random().toString()
        }
    })
    socket.send("Hay you got conected to the server")
})