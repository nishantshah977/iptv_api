const express = require('express');
const axios = require('axios');
const app = express();

axios.get('https://raw.githubusercontent.com/manikiptv/freecatv.github.io/main/freecatv.m3u8').then((response) =>{
 let list = response.data;
  list = list.replace('#EXTM3U', '');
list = list.replace(/#EXTINF:-1 ,/g, '');
list = list.replace(/#EXTINF:-1 group-title="freecatv"/g, '');

const splited_list = list.split('\n');

const cleaned_list = [];

for (let i = 1; i < splited_list.length; i++) {
  cleaned_list.push({ "channel": splited_list[i], "url": splited_list[i + 1] });
  i += 1;
}

app.get('/', (req, res) => {
 res.setHeader('Content-Type', 'application/json');
  res.json(cleaned_list);
});
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
