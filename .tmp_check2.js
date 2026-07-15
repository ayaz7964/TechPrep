var fs = require('fs');
var content = fs.readFileSync('./learn/data/traffic-management/topics-data.js', 'utf8');
var TOPICS_DATA = {};
eval(content);
var d = TOPICS_DATA['traffic-management'];

// Check first topic's TLDR and layman definition to see if custom
var t = d['tm-reverse-proxy'];
console.log('=== REVERSE PROXY ===');
console.log('laymanDef:', t.laymanDefinition.substring(0, 120));
console.log('TLDR[0]:', t.tldr[0].substring(0, 120));
console.log('TLDR[1]:', t.tldr[1].substring(0, 120));

// Check a later topic
var t2 = d['tm-circuit-breaker'];
console.log('\n=== CIRCUIT BREAKER ===');
console.log('laymanDef:', t2.laymanDefinition.substring(0, 120));
console.log('TLDR[0]:', t2.tldr[0].substring(0, 120));

// Check if IQ questions are custom or from pool
console.log('\nIQ[0]:', t.interviewQuestions[0].question);
console.log('IQ[1]:', t.interviewQuestions[1].question);
