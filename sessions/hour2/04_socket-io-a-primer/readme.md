Bi-Directional Communication with Socket.io
===========================================

In the last lesson we hammered on the point that Node.JS enables concurrency in
your application.

One of the most awesome utilities to take advantage of concurrency is socket.io.
Before we get into what socket.io is and how to use it, a brief history on how
users and websites have traditionally interacted.

### A Brief History

Up until a few years ago, the web was primarily concerned with one metric:
getting webpages to visitors as quickly as possible.

User sends request -> Server
Server sends data back -> Client
Connection terminated.

Note, however, that this does not allow the server to send data back to the
client as updates on the server occur. For many websites, this is still the
model; you have to refresh the page to see updates.

### Today

Nowadays, the metric is centered on providing a more engaging user experience.
One of the most powerful realizations of this potential is on Facebook: the news
ticker, notifications and chat are pillars of the experience and it works to
keep users engaged.

The technological approach Facebook uses to drive this experience is
bi-directional communication. What is bi-directional communication? It means
on top of the established client-request/server-respond model, the server can
send messages to the client without the client specifically requesting them.

### The Socket.io Way

The way socket.io works is its server component "tricks" the client into staying
connected to the server until the connection times out. When that connection
times out, the client connects again. And again, on and on - forever. Why? When
the server has something meaningful to say to the client - for example, that a
new chat message has come in - the server sends a message to the client and
closes out the connection. Then the client connects again, and the process
continues. In this way the client is always "primed" to receive messages from
the server.

Socket.io wasn't the first to pioneer this technique, but it has become the de
facto standard for bi-directional communication in Node.JS apps.

Of course, this description has cut a lot of corners for brevity, but you can
learn more about socket.io's approach and internals at [LearnBoost's socket.io
page on GitHub](https://github.com/LearnBoost/socket.io).

### Implementing Socket.io

