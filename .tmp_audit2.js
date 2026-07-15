var fs = require('fs');
var cats = ['cdn','traffic-management','api-gateway','monitoring','logging','mern','system-design','devops','git','dsa','oop'];
cats.forEach(function(c) {
  var f = './learn/data/' + c + '/topics-data.js';
  try {
    var content = fs.readFileSync(f, 'utf8');
    var TOPICS_DATA = {};
    eval(content);
    var d = TOPICS_DATA[c];
    var keys = Object.keys(d);
    // Check first topic's laymanDefinition for template indicators
    var t = d[keys[0]];
    var isTemplate = t.laymanDefinition.indexOf('like having a specialized service') >= 0;
    var isCustom = t.laymanDefinition.indexOf('like') >= 0 && !isTemplate;
    var avgTLDR = 0;
    var avgDD = 0;
    var avgIQ = 0;
    var avgMCQ = 0;
    keys.forEach(function(k) {
      var x = d[k];
      avgTLDR += x.tldr.length;
      avgDD += x.deepDive.length;
      avgIQ += x.interviewQuestions.length;
      avgMCQ += x.mcqQuestions.length;
    });
    avgTLDR = (avgTLDR / keys.length).toFixed(1);
    avgDD = (avgDD / keys.length).toFixed(1);
    avgIQ = (avgIQ / keys.length).toFixed(1);
    avgMCQ = (avgMCQ / keys.length).toFixed(1);
    var status = isCustom ? 'CUSTOM' : (isTemplate ? 'TEMPLATE' : 'MIXED');
    console.log(c + ': ' + keys.length + ' topics [' + status + '] avg: TLDR=' + avgTLDR + ' DD=' + avgDD + ' IQ=' + avgIQ + ' MCQ=' + avgMCQ);
  } catch(e) {
    console.log(c + ': ERROR - ' + e.message);
  }
});
