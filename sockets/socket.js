// Mensajes de Sockets
const { io } = require("../index");
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.on("disconnect", () => {
    console.log("Cliente Desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje!!!", payload);
    io.emit("mensaje", { admin: "Nuevo Mensaje" });
  });

  client.on("emitir-mensaje", (payload) => {
    //io.emit("nuevo-mensaje", payload); // a todos los clientes
    client.broadcast.emit("nuevo-mensaje", payload); // emite a todos menos al que lo emitiio
  });
});
