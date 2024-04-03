const fs = require('fs');
const packageJson = require('../package.json');
fs.readFile('./src/index.ts', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    const result = data.replace(/version: string = '(.*?)'/, `version: string = '${packageJson.version}'`);
    
    fs.writeFile('./src/index.ts', result, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    });
});