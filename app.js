const Discord = require('discord.js');
const Bot = new Discord.Client();

Bot.login('NTc2MDM0NjQxOTU0NDcxOTQ4.XNQpNg.k4liTFYr4own5u238dMzGtMkKYQ');

var accepted = new Array();
var declined = new Array();

var Passo0=true;
var Passo1=false;
var Passo2=false;
var Passo3=false;
var Passo4=false;
var Passo5=false;
var Passo6=false;

const Prefix = '!';
var Title = "";
var Descrizione = "";
var Date = "";
var Time = "";
var ChannelID = "";

Bot.on('message', async message =>{
  if(message.author.bot) return;
  let msg = message.content.toUpperCase();
  let sender = message.author;
  /*if(msg === Prefix + 'NEWEVENT'){
    EventoCreato=true;
    message.channel.send('Creating event..');
    message.channel.send('Title:');
  }
  if((msg.startsWith(Prefix + 'TITLE')) && (EventoCreato)){
    TitoloInserito = true;
    Title = message.content;
    message.channel.send('Description:');
  }
  if(msg.startsWith('/DESCR') && TitoloInserito){
    DescrizioneInserita = true;
    Descrizione = message.content;
    message.channel.send("Description catched, now use /create or give me other infos");
  }*/
  if(Passo0 && msg == Prefix + "AEVENT"){
    Passo0=false;
    Passo1=true;
    message.channel.send("Insert title..");
    return;
  }
  if(Passo1){
    if(message.author.bot) return;
    Passo1=false;
    Passo2=true;
    Title = msg;
    message.channel.send("Insert description..");
    return;
  }
  if(Passo2){
    Passo2=false;
    Passo3=true;
    Descrizione = msg;
    message.channel.send("Insert date of the event..");
    return;
  }
  if(Passo3){
    Passo3=false;
    Passo4=true;
    Date = msg;
    message.channel.send("Insert time of the regroup..");
    return;
  }
  if(Passo4){
    Passo4=false;
    Passo5=true;
    Time = msg;
    message.channel.send("Insert channel ID..");
    return;
  }
  if(Passo5){
    Passo5=false;
    Passo6=true;
    ChannelID = msg;
    message.channel.send("All datas are stored.\n"+
                          "!create - Finish the process and create the event message;\n"+
                          "!reset  - Reset all datas of the new event; ");
    return;
  }
  if(msg.startsWith(Prefix + 'RESET')){
    Passo0=true;
    Passo1=false;
    Passo2=false;
    Passo3=false;
    Passo4=false;
    Passo5=false;
    Passo6=false;
    Title = "";
    Descrizione = "";
    Date = "";
    Time = "";
    ChannelID = "";
    return;
  }
  if(Passo6 && msg.startsWith(Prefix + 'CREATE')){
    accepted.push(new Array());
    declined.push(new Array());
    Passo0=true;
    Passo1=false;
    Passo2=false;
    Passo3=false;
    Passo4=false;
    Passo5=false;
    Passo6=false;
    let Channel = Bot.channels.get(ChannelID);
    let embedino = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(Title)
        .setDescription(Descrizione)
        .addField('Time',Time,true)
        .addField('Date',Date,true)
        .addBlankField(true)
        .addField('Accepted','-',true)
        .addField('Declined','-',true)
        .addBlankField(true)
        .setFooter("Event "+ accepted.length + " created by "+ sender.username+" - AEvent created by SunshinoNazionale")
        .setTimestamp()
        Channel.send({embed: embedino}).then(embedMessage => {
          embedMessage.react("✅");
          embedMessage.react("❎");
    });
    return;
  }

  if(msg === Prefix + "EMBED"){
    accepted.push(new Array());
    declined.push(new Array());
    let Channel = Bot.channels.get('576422233522700319');
    let embedino = new Discord.RichEmbed()
        //.setAuthor('Event '+ index.length +' Created by ' + sender.username)
        .setColor('#0099ff')
        .setTitle('RESET DEI TERRITORI')
        .setDescription('Sabato 18 ci sarà il reset dei territori')
        .addField('Time','23:00 UTC',true)
        .addField('Date','22:20 UTC',true)
        .addBlankField(true)
        .addField('Accepted','-',true)
        .addField('Declined','-',true)
        .addBlankField(true)
        .setFooter("Event "+ accepted.length + " created by "+ sender.username)
        //.setFooter("React with emoji for apply..")
        .setTimestamp()
        Channel.send({embed: embedino}).then(embedMessage => {
          embedMessage.react("✅");
          embedMessage.react("❎");
    });
    return;
  }
});

Bot.on('messageReactionAdd', (reaction, user) => {
  if(!user.bot){
    if (reaction.emoji.name === "✅"){
      //reaction.message.channel.send("Reazione ricevuta da "+ user.username);
      const embed = new Discord.RichEmbed();
      reaction.message.channel.send("Embed istance created");
      const prev = reaction.message.embeds[0];
      reaction.message.channel.send("Previous message istance created");
      embed.color = prev.color;
      embed.title = prev.title;
      embed.description = prev.description
      embed.fields = [];
      //TIME
      embed.fields.push({name: prev.fields[0].name,value: prev.fields[0].value, inline: true});
      //DATE
      embed.fields.push({name: prev.fields[1].name,value: prev.fields[1].value, inline: true});
      //SPAZIO BIANCO
      embed.fields.push({name: prev.fields[2].name,value: prev.fields[2].value, inline: true});
      reaction.message.channel.send("Primi fields creati");
      let str = prev.footer.text;
        ind=6;
        num=0;
        while (str[ind]!= ' ') {
          var n = str.charCodeAt(ind) - '0'.charCodeAt(0);
          num = (num*10)+n;
          ind++;
        }
        num=num-1;
      reaction.message.channel.send("Numero evento parsed");
      accepted[num].push(user.username);
      reaction.message.channel.send("Nome aggiunto all'array");
      let continua = true;
      let indice=0;
      while (continua && indice<declined[num].length) {
        if(declined[num][indice] == user.username)
          continua=false;
        else indice++;
      }
      if(!continua)
        delete declined[num][indice];
      reaction.message.channel.send("Nome tolto dal declined");
      //ACCEPTED
      let strAccepted = "";
      for (var i = 0; i < accepted[num].length; i++) {
        if(accepted[num][i] != undefined)
        strAccepted += accepted[num][i]+'\n';
      };
      if (strAccepted == "")
        strAccepted="-";
      reaction.message.channel.send("Lista dei nomi accpted creata");
      embed.fields.push({name: prev.fields[3].name,value: strAccepted, inline: true});
      //DECLINED
      let strDeclined = "";
      for (var i = 0; i < declined[num].length; i++) {
        if(declined[num][i] != undefined)
          strDeclined += declined[num][i]+'\n';
      };
      if (strDeclined == "")
        strDeclined="-";
      reaction.message.channel.send("Lista dei nomi declined Creata");
      embed.fields.push({name: prev.fields[4].name,value: strDeclined, inline: true});
      //SPAZIO BIANCO
      embed.fields.push({name: prev.fields[5].name,value: prev.fields[5].value, inline: true});
      embed.footer = prev.footer;
      embed.timestamp = prev.timestamp;
      reaction.message.edit({embed});
      reaction.message.channel.send("Messaggio modificato,in teoria");
    }
    if (reaction.emoji.name === "❎"){
      const embed = new Discord.RichEmbed();
      const prev = reaction.message.embeds[0];
      embed.color = prev.color;
      embed.title = prev.title;
      embed.description = prev.description
      embed.fields = [];
      //TIME
      embed.fields.push({name: prev.fields[0].name,value: prev.fields[0].value, inline: true});
      //DATE
      embed.fields.push({name: prev.fields[1].name,value: prev.fields[1].value, inline: true});
      //SPAZIO BIANCO
      embed.fields.push({name: prev.fields[2].name,value: prev.fields[2].value, inline: true});
      let str = prev.footer.text;
        ind=6;
        num=0;
        while (str[ind]!= ' ') {
          var n = str.charCodeAt(ind) - '0'.charCodeAt(0);
          num = (num*10)+n;
          ind++;
        }
        num=num-1;
      declined[num].push(user.username);
      let continua = true;
      let indice=0;
      while (continua && indice<accepted[num].length) {
        if(accepted[num][indice] == user.username)
          continua=false;
        else indice++;
      }
      if(!continua)
        delete accepted[num][indice];
      //ACCEPTED
      let strAccepted = "";
      for (var i = 0; i < accepted[num].length; i++) {
        if(accepted[num][i] != undefined)
        strAccepted += accepted[num][i]+'\n';
      };
      if (strAccepted == "")
        strAccepted="-";
      embed.fields.push({name: prev.fields[3].name,value: strAccepted, inline: true});
      //DECLINED
      let strDeclined = "";
      for (var i = 0; i < declined[num].length; i++) {
        if(declined[num][i] != undefined)
          strDeclined += declined[num][i]+'\n';
      };
      if (strDeclined == "")
        strDeclined="-";
      embed.fields.push({name: prev.fields[4].name,value: strDeclined, inline: true});
      //SPAZIO BIANCO
      embed.fields.push({name: prev.fields[5].name,value: prev.fields[5].value, inline: true});
      embed.footer = prev.footer;
      embed.timestamp = prev.timestamp;
      reaction.message.edit({embed});
    }
  }
});

Bot.on('messageReactionRemove', (reaction, user) => {
  if(!user.bot){
      if (reaction.emoji.name === "✅"){
        const embed = new Discord.RichEmbed();
        const prev = reaction.message.embeds[0];
        embed.color = prev.color;
        embed.title = prev.title;
        embed.description = prev.description
        embed.fields = [];
        //TIME
        embed.fields.push({name: prev.fields[0].name,value: prev.fields[0].value, inline: true});
        //DATE
        embed.fields.push({name: prev.fields[1].name,value: prev.fields[1].value, inline: true});
        //SPAZIO BIANCO
        embed.fields.push({name: prev.fields[2].name,value: prev.fields[2].value, inline: true});
        //ACCEPTED
        let continua = true;
        let indice=0;
        while (continua && indice<accepted[num].length) {
          if(accepted[num][indice] == user.username)
            continua=false;
          else indice++;
        }
        if(!continua)
          delete accepted[num][indice];
        let strAccepted = "";
        for (var i = 0; i < accepted[num].length; i++) {
          if(accepted[num][i] != undefined)
          strAccepted += accepted[num][i]+'\n';
        };
        if (strAccepted == "")
          strAccepted="-";
        embed.fields.push({name: prev.fields[3].name,value: strAccepted, inline: true});
        //DECLINED
        embed.fields.push({name: prev.fields[4].name,value: prev.fields[4].value, inline: true});
        //SPAZIO BIANCO
        embed.fields.push({name: prev.fields[5].name,value: prev.fields[5].value, inline: true});
        embed.footer = prev.footer;
        embed.timestamp = prev.timestamp;
        reaction.message.edit({embed});
      }
      if (reaction.emoji.name === "❎"){
        const embed = new Discord.RichEmbed();
        const prev = reaction.message.embeds[0];
        embed.color = prev.color;
        embed.title = prev.title;
        embed.description = prev.description
        embed.fields = [];
        //TIME
        embed.fields.push({name: prev.fields[0].name,value: prev.fields[0].value, inline: true});
        //DATE
        embed.fields.push({name: prev.fields[1].name,value: prev.fields[1].value, inline: true});
        //SPAZIO BIANCO
        embed.fields.push({name: prev.fields[2].name,value: prev.fields[2].value, inline: true});
        //ACCEPTED
        embed.fields.push({name: prev.fields[3].name,value: prev.fields[3].value, inline: true});
        //DECLINED
        let continua = true;
        let indice=0;
        while (continua && indice<declined[num].length) {
          if(declined[num][indice] == user.username)
            continua=false;
          else indice++;
        }
        if(!continua)
          delete declined[num][indice];
        let strDeclined = "";
        for (var i = 0; i < declined[num].length; i++) {
          if(declined[num][i] != undefined)
          strDeclined += declined[num][i]+'\n';
        };
        if (strDeclined == "")
          strDeclined="-";
        embed.fields.push({name: prev.fields[4].name,value: strDeclined, inline: true});
        //SPAZIO BIANCO
        embed.fields.push({name: prev.fields[5].name,value: prev.fields[5].value, inline: true});
        embed.footer = prev.footer;
        embed.timestamp = prev.timestamp;
        reaction.message.edit({embed});
      }
    if (reaction.emoji.name === ":eight_spoked_asterisk:"){
      const embed = new Discord.RichEmbed();
      const prev = reaction.message.embeds[0];    
      embed.color = prev.color;
      embed.title = prev.title;
      embed.description = prev.description
      reaction.message.edit({embed});
    }
  }
});

Bot.on('ready', () =>{
  console.log('Bot started');
});
