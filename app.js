const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.login('DISCORD_TOKEN');



client.on('ready', () => {
  console.log(`Discord Bot ${client.user.tag}がログインしました!`);
});

 client.on("guildCreate", guild => {
  console.info(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
 });
  
client.on("guildDelete", guild => {
 console.info(`I have been removed from: ${guild.name} (id: ${guild.id})`);
 client.user.setGame(`on ${client.guilds.size} servers`);
 });


 
 var is_talking_channel_flags = {};
 
 client.on("message",  message => {
   if(message.author.bot) return;
   if(message.content.indexOf(config.prefix) !== 0) return;
   const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
   const command = args.shift().toLowerCase();
 
   if (command === 'kalistachan') {
     console.log('/kalistachan');
 
     if (message.member.voiceChannel) {
       var channel = message.member.voiceChannel;
       var channel_id = channel.id;
 
       if(is_talking_channel_flags[channel_id]) { return; }
       is_talking_channel_flags[channel_id] = true;
 
       message.member.voiceChannel.join()
         .then(connection => {
            const random_id = Math.floor(Math.random() * 10)+1;
            const random_voice_path = './audio/' + random_id + '.mp3';
            const dispatcher = connection.playFile(random_voice_path);
           dispatcher.setVolume(0.3);
           message.delete().catch(O_o=>{});
 
           dispatcher.on('end', () => {
             console.log('ひゃはははは');
             channel.leave();
             is_talking_channel_flags[channel_id] = false;
           });
         })
         .catch(O_o => {
           is_talking_channel_flags[channel_id] = false;
         });
 
     } else {
       message.delete().catch(O_o=>{});
       var messages = [
         "おあいできて光栄ですわ！",
         "チューリップのめをみちゃだめよ。",
         "どこかで会ったかしら？",
         "はわわ・・・めがまわる・・・",
         "あ、ちょうちょ！",
         "だいへんしーん！",
         "あわわわわ！",
         "ひらめいた！"
       ];
       message.channel.send(messages[ Math.floor( Math.random() * messages.length ) ]);
     }
   }
 
   if(command === "kalista") {
     console.log('/kalista');
     const summonerName = args.join(" ");
     if (summonerName) {
       checkSummonerStatus(message);
     } else {
       message.channel.send("カリスタは見ているよ！");
     }
   }
 
   if(command === "kalistasay") {
     console.log('/kalista');
     const sayMessage = args.join(" ");
     message.delete().catch(O_o=>{});
     message.channel.send(sayMessage);
   }
 });


 
