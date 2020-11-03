const tg = require('./bot');
const bot = tg.bot;

function messagesHandler(messageText, chatId) {
  switch (messageText) {
    case '/start':
      bot.sendMessage(chatId, 'Upload file.\n\nPlease add the caption. It will be used as file name if we can\'t detect the original name of the file.\n\nBot can process: audio, video, text documents and photos (uploaded as files)');
      break;
    default:
      break;
  }
}

module.exports = {
  messagesHandler,
}