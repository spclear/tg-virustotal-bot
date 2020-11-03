const fetch = require('node-fetch');
const apikey = 'xxxxxxxxxxx'; // your virustotal API key here

function uploadFile(formData) {
  const requestParams = {
    method: "POST",
    body: formData,
    mode: 'no-cors',
    headers: {
      'x-apikey': apikey
    }
  }
  return fetch('https://www.virustotal.com/api/v3/files', requestParams)
    .then(resp => resp.json());
}

function updateResults(fileId) {
  const requestParams = {
    headers: {
      'x-apikey': apikey
    }
  };

  return fetch(`https://www.virustotal.com/api/v3/analyses/${fileId}`, requestParams)
    .then(result => result.json());
}

module.exports = { uploadFile, updateResults };