var fs = require('fs')


// to access file system

var data = require('./data.json')
console.log(data.name);


fs.readFile('./data.json', 'utf-8',(err,data) => {
    var data = JSON.parse(data);
    console.log(data);

} )


//to access directories
fs.readdir('c:/', (err,data) => {
    console.log(data.desktop  
    );
})


