const http = require('http');
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const server = http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Works');
})
  
server.listen(port, host);

const handlers = require('./common/handlers');
const test = require('./modules/testfile/testfile');
const tg = require('./common/bot');
const messageTemplates = require('./common/messageTemplates');

const bot = tg.bot;

bot.on('message', async (message, match) => {
  const { chat, caption } = message;
  const type = match.type;

  switch (type) {
    case 'text':
      handlers.messagesHandler(message.text, chat.id);
      break;
    case 'audio':
    case 'document':
    case 'animation':
    case 'video':
    case 'game':
      bot.sendMessage(chat.id, messageTemplates.processing);
      test.testFile(chat.id, message[type], caption, bot);
      break;
    case 'photo':
      bot.sendMessage(chat.id, messageTemplates.photoType);
      break;
    default:
      bot.sendMessage(chat.id, messageTemplates.invalidTypeError);
      break;
  }
})

bot.on('polling_error', err => console.log(err));