import Discord from "discord.js";
import fs from "fs";
import cytubeClient from "cytube-client";
import {get, set} from "./terrible_db.js";
const client = new Discord.Client();
const bridgeChannelId = "703416093586358342";
const secrets = JSON.parse(fs.readFileSync("secrets.json", "utf8"));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '--(ping') {
    msg.reply('pong');
  }
  if (msg.channel.id == bridgeChannelId && msg.author && !msg.author.bot) {
    const message = "\u200B*" + msg.author.tag + ":* " + msg.cleanContent;
    cyClient.socket.packet({type: 2, data: ["chatMsg", {msg: message, meta: {}}]})
  }
});

client.login(secrets.token);

const webhookClient = new Discord.WebhookClient(secrets.webhook.id, secrets.webhook.token);

let cyClient = await cytubeClient.connect('consortium');
//{ username: 'enfeiowfieow', msg: 'e', meta: {}, time: 1617865724027 }
//console.log("About to bind channelOpts");
//cyClient.on('channelOpts',function(){
  //console.log("channelOpts, woo woo!!!!!!!!!!!!!!!!!!!!!!!!!!");
  cyClient.socket.once('login', function(){
    cyClient.socket.packet({type: 2, data: ["chatMsg", {msg: "CyDis Logged in", meta: {}}]})
  });
  cyClient.socket.packet({type: 2, data: ["login", {name: "cydis", pw: secrets.cytubeLogin}]});
//});
//console.log("bound channelOpts");

cyClient.on('chatMsg',function(msg){
    //console.log(msg);
    if (msg.time <= get() || msg.username == "cydis") return;
    let content = msg.msg;
    content = content.split("&gt;").join(">");
    content = content.split("&lt;").join("<");
    content = content.split("&amp;").join("&");
    webhookClient.send(msg.msg, {username: msg.username});
    set(msg.time);
});

// cyClient.socket.onpacket(function(){
//     console.log(arguments);
// });

// cyClient.on("login",function(msg){
//   console.log("YAAAYY logged in", msg);
// })

// setTimeout(_ => {
//   cyClient.socket.packet({type: 4, id:2, data: ["login", {name: "cydis2"}]});
//   cyClient.socket.packet({type: 4, id:2, data: ["reportReconnect"]});
//   cyClient.socket.packet({
//     "type": 4,
//     "nsp": "/",
//     "id": 2,
//     "data": [
//       "chatMsg",
//       {
//         "msg": "jjjj",
//         "meta": {}
//       }
//     ]
//   });
// }, 1000);