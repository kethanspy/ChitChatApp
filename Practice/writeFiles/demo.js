var fs = require('fs');
var data = {
    name: 'Bob'
};
fs.writeFile('data.json',JSON.stringify(data),function(err) {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('File has been saved!');
    }});