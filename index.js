import Discord from "discord.js";
import fs from "fs";
import cytubeClient from "cytube-client";
//const Discord = require('discord.js');
const client = new Discord.Client();
const bridgeChannelId = "829604255412649994";
const secrets = JSON.parse(fs.readFileSync("secrets.json", "utf8"));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '--(ping') {
    msg.reply('pong');
  }
  if (msg.channel.id == bridgeChannelId) {
    //console.log(msg);
  }
});

client.login(secrets.token);

const webhookClient = new Discord.WebhookClient(secrets.webhook.id, secrets.webhook.token);

let cyClient = await cytubeClient.connect('consortium');
//{ username: 'enfeiowfieow', msg: 'e', meta: {}, time: 1617865724027 }
cyClient.on('chatMsg',function(msg){
    console.log(msg);
    if (msg.time <= 1617767300617) return;
    webhookClient.send(msg.msg, {username: msg.username});
});