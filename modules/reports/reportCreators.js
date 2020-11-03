const fs = require('fs');
const tg = require('../../common/bot');

const bot = tg.bot;

// report = direct message with main info; full report = text file with full information about analysis
function createReport(data, filename) {
  const unsupported = [];
  const undetected = [];

  let otherResults = '';

  for (let key in data) {
    switch (data[key].category) {
      case 'type-unsupported':
        unsupported.push(key);
        break;
      case 'undetected':
        undetected.push(key);
        break;
      default:
        otherResults += ` ${key}: ${data[key].category}.\n`;
    }
  }

  return `<b>Done! Your results:</b>\n\n<b>File name (or your custom title):</b>\n<i>${filename}</i>\n\n<b>Antiviruses that didn't detect any malwares:</b>\n${undetected.join(', ') || 'No results.'}.\n\n<b>Next antiviruses do not support this type of files:</b>\n${unsupported.join(', ') || 'No results.'}.\n\n<b>Other results:</b>\n${otherResults || 'No results.'}`
}

function createFullReport(data) {
  let result = '';

  for (let key in data) {
    result += key + ':\r\n';

    for (let param in data[key]) {
      result += `\t${param}: ${data[key][param]};\r\n`;
    }
  }

  return result;
}

function sendReport(info, chatId, filename) {
  bot.sendMessage(chatId, createReport(info, filename), {
    parse_mode: 'HTML'
  });
}

function sendFullReport(data, chatId) {
  const fullReport = createFullReport(data);
  const filepath = './report.txt';

  fs.writeFile(filepath, fullReport, async function (err) {
    if (err) {
      console.log(err);
      return;
    };

    await bot.sendDocument(chatId, filepath, {
      caption: 'Full report'
    });
    fs.unlinkSync(filepath);
  });
};

module.exports = { sendReport, sendFullReport };