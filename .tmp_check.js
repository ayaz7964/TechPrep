var fs = require('fs');
var content = fs.readFileSync('./learn/data/traffic-management/topics-data.js', 'utf8');
// Parse by extracting TOPICS_DATA assignments
var T = {};
// Just eval the content directly after initializing TOPICS_DATA
var TOPICS_DATA = {};
eval(content);
var d = TOPICS_DATA['traffic-management'];
var keys = Object.keys(d);
console.log('Total topics: ' + keys.length);
keys.forEach(function(id) {
  var t = d[id];
  var iqs = t.interviewQuestions.length;
  var mcqs = t.mcqQuestions.length;
  var codes = t.codeExamples.length;
  var dd = t.deepDive.length;
  var tldr = t.tldr.length;
  var hasCustom = tldr > 6 || iqs > 6;
  console.log(id + ': TLDR=' + tldr + ' DD=' + dd + ' IQ=' + iqs + ' MCQ=' + mcqs + ' Code=' + codes + (hasCustom ? ' [CUSTOM]' : ' [TEMPLATE]'));
});
