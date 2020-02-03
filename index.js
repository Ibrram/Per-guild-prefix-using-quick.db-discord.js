const Discord = require('discord.js');
const client = new Discord.Client();
// we need to require quick.db here
const db = require('quick.db');
// after required db we need to fetch prefixes
client.on('ready', () => {
    console.log('Logged in')
})
client.on('message', async msg => {
  let prefix; // define balnk variable with any name you want
  let prefixes = await db.fetch(`prefix_${msg.guild.id}`);
  if(prefixes == null) {
    prefix = "%" // default prefix if no prefix set for this guild
  } else {
    prefix = prefixes;
  }
  // now we done prefix fetching for guilds
  if (!msg.content.startsWith(prefix) || !msg.guild) return;
  const command = msg.content.split(' ')[0].substr(prefix.length);
  const args = msg.content.split(' ').slice(1).join(' ');
  // now will do set prefix command
  if(command === 'setprefix') {
    if(!msg.member.hasPermission('MANAGE_GUILD')) return msg.reply('you don\'t have required permissios to use this command');
    if(!args[0]) return msg.reply('define new prefix');
    await db.set(`prefix_${msg.guild.id}`, args[0])
    msg.channel.send(
      new Discord.RichEmbed()
        .setDescription(`prefix for this guild has been changed to ${args[0]} succssfully :tada:`)
    )
  }
});

client.login('YOUR TOKEN HERE');