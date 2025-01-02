# chat-room

docker build . -t chat-room

docker run -d --name chat-room-container -p 3000:3000 chat-room
