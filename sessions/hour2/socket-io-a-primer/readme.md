Bi-Directional Communication and Socket.io: A Primer
====================================================

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
client as updates on the server occur. For many websites, this is still the model;
you have to refresh the page to see updates.

### Today

Nowadays, the metric is centered on providing a more engaging user experience.
One of the most popular websites to realize this potential is Facebook: the news
ticker, notifications and chat are pillars of the experience on Facebook and it
works to keep users engaged.

The technological approach Facebook uses to drive this experience is 
bi-directional communication. What is bi-directional communication? It means
the server sends updates to the client as they occur. Of course that superficial
statement doesn't drive at the heart of the tech used to achieve the effect, but
for now we can concentrate on the _what_, not the _how_.

### The Socket.io Way

Socket.io wasn't the first to pioneer this technique, but it has become the de
facto standard for bi-directional communication in Node.JS apps.

For more complete articles on socket.io's internals, see [LearnBoost's
socket.io page on GitHub](https://github.com/LearnBoost/socket.io).