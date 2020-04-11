const download = require('download');
const path = require('path');

download('https://github.com/TyrealGray/QinRenderer.js/raw/master/assets.zip', path.join(__dirname,'../'), {
    extract: true,
    headers: {accept: 'application/zip'}
}).catch(error => {
    console.error(error);
});