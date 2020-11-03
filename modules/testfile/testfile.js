const FormData = require('form-data');
const rep = require('../reports/reportCreators');
const fet = require('../fetch/fetchRequests');
const tg = require('../../common/bot');
const messageTemplates = require('../../common/messageTemplates');

const bot = tg.bot;

async function testFile(chatId, fileDescr, caption) {
  const {
    file_id,
    file_name = caption,
    file_size,
  } = fileDescr;

  if (file_size >= 32000000) {
    bot.sendMessage(chatId, messageTemplates.maxSizeError);
    return;
  }

  const formData = new FormData();
  formData.append('file', file_id, file_name);
  
  fet.uploadFile(formData).then(result => {
    checkResults(result.data.id, file_name, chatId);
  });
}

function checkResults(fileId, filename, chatId) {
  const interval = setInterval(() => {
    fet.updateResults(fileId)
      .then(result => {
        const info = result.data.attributes.results;
        handleResponse(info, chatId, filename, interval)
      })
  }, 30000);
}

function handleResponse(info, chatId, filename, interval) {
  if (Object.entries(info).length !== 0) {
    clearInterval(interval);  

    rep.sendReport(info, chatId, filename);
    rep.sendFullReport(info, chatId);
  }
}

module.exports = { testFile };