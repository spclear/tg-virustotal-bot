// const nvt = require('node-virustotal');
// const vtInstance = nvt.makeAPI();

// vtInstance.setKey(apikey);
// vtInstance.setDelay(1000);

// vtInstance.uploadFile(file_id, file_name, 'multipart/form-data', async (err, res) => {
//   if (err) {
//     bot.sendMessage(chatId, messageTemplates.simpleError);
//     return;
//   }

//   const result = await JSON.parse(res);
//   handleResults(result.data.id, file_name, chatId);
// })