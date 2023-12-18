const server = Bun.serve({
    port: Bun.env.port || 8000,
    fetch(req) {
        return new Response('Hello world 123')
    }
})

console.log(`Listening on port ${server.port}`);