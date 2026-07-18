var fs = require('fs');
var target = __dirname + '/gen-devops.js';
var chunkFile = process.argv[2];
var content = fs.readFileSync(target, 'utf8');
var chunk = fs.readFileSync(chunkFile, 'utf8');
content = content.replace('// END', chunk + '\n// END');
fs.writeFileSync(target, content, 'utf8');
console.log('Inserted chunk: ' + chunkFile);
