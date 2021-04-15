// Mensajes de Sockets
const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");
const bands = new Bands();
// console.log("init server");

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Heroe del Silencio"));
bands.addBand(new Band("Metallica"));
// console.log(bands);

io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente Desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje!!!", payload);
    io.emit("mensaje", { admin: "Nuevo Mensaje" });
  });

  // client.on("emitir-mensaje", (payload) => {
  //   console.log("Escuchando", payload);
  //   //io.emit("nuevo-mensaje", payload); // a todos los clientes
  //   client.broadcast.emit("nuevo-mensaje", payload); // emite a todos menos al que lo emitiio
  // });
  client.on("vote-band", (payload) => {
    console.log("vote-band");
    console.log(payload);
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (payload) => {
    console.log("add-band");
    console.log(payload);
    bands.addBand(new Band(payload.name));
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload) => {
    console.log("add-band");
    console.log(payload);
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });
});
