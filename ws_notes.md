1. Open WebSocket server client connection via Article component
2. Pass down WebSocket server connection as props to children (Comments/CommentForm)
3. Fetch initial comments via REST/HTTP
4. Sent messages are saved via WebSocket consumer
5. Additional messages from other clients are loaded via WebSocket connection
