const TelegramBot = require('node-telegram-bot-api');
const token = 'xxxxxxxxxxxxxxxx'; // your Telegram bot token here
const bot = new TelegramBot(token, { polling: true });

module.exports = { bot };