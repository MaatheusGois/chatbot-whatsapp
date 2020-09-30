// const fs = require("fs");
// const { Client } = require("whatsapp-web.js");
// const qrcode = require("qrcode-terminal");
// const express = require("express");
// const app = express();
// const port = 3000;

// // Path where the session data will be stored
// const SESSION_FILE_PATH = "./session.json";

// // Load the session data if it has been previously saved
// let sessionData;
// if (fs.existsSync(SESSION_FILE_PATH)) {
//   sessionData = require(SESSION_FILE_PATH);
// }

// // Use the saved values
// const client = new Client({
//   session: sessionData,
// });


// // Save session values to the file upon successful auth
// client.on("authenticated", (session) => {
//   sessionData = session;
//   fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
//     if (err) {
//       console.error(err);
//     }
//   });
// });

// client.on("qr", (qr) => {
//   // Generate and scan this code with your phone
//   qrcode.generate(qr, { small: true });
// });

// client.on("ready", () => {
//   console.log("Client is ready!");
// });

// client.on("message", (msg) => {
//   if (msg.body == "ping") {
//     msg.reply("pong");
//   }
// });

// app.get("/init", (req, res) => {
//   client.initialize();
//   res.send('initializing...');
// });

// app.get("/status", async (req, res) => {
//   const result = await client.getState()
//   res.json(result);
// });

// app.get("/send/:number/:message", async (req, res) => {
//   const result = await client.getState();
//   res.json(result); //@c.us
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
