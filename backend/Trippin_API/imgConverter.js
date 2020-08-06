// Referenced from: http://www.hacksparrow.com/base64-encoding-decoding-in-node-js.html
var fs = require('fs');

// function to encode file data to base64 encoded string
const base64_encode = (file) => {
    // read binary data
    var bitmap = fs.readFileSync(file, {encoding: 'base64'});
    // convert binary data to base64 encoded string
    return bitmap;
}

// function to create file from base64 encoded string
const base64_decode = (base64str, file) => {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

  
exports.base64_decode = base64_decode;
exports.base64_encode = base64_encode;
