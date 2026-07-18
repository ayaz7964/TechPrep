const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'gen-sd.js');
let src = fs.readFileSync(filePath, 'utf8');

// ============ STEP 1: Add require at top ============
src = src.replace(
  "const fs = require('fs');\n",
  "const fs = require('fs');\nconst { svgW, R, A, T, Tw } = require('../svg-helpers');\n"
);

// ============ STEP 2: Remove local function defs ============
src = src.replace(
  "function svgW(w,h,t,i) {\n  return '<svg viewBox=\"0 0 '+w+' '+h+'\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;height:auto;font-family:sans-serif\">' +\n    '<rect x=\"0\" y=\"0\" width=\"'+w+'\" height=\"'+h+'\" rx=\"8\" fill=\"#f8f9fa\" stroke=\"#de2e6\" stroke-width=\"1\"/>' +\n    '<text x=\"'+(w/2)+'\" y=\"24\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"bold\" fill=\"#333\">'+t+'</text>' + i + '</svg>';\n}\nfunction R(x,y,w,h,f,s,t1,t2,c1,c2) {\n  var b='<rect x=\"'+x+'\" y=\"'+y+'\" width=\"'+w+'\" height=\"'+h+'\" rx=\"4\" fill=\"'+f+'\" stroke=\"'+(s||f)+'\" stroke-width=\"1\"/>';\n  if(t1) b+='<text x=\"'+(x+w/2)+'\" y=\"'+(y+(t2?16:20))+'\"/text-anchor=\"middle\" font-size=\"11\" font-weight=\"bold\" fill=\"'+(c1||'#fff')+'\"/>'+t1+'</text>';\n  if(t2) b+='<text x=\"'+(x+w/2)+'\" y=\"'+(y+28)+'\"/text-anchor=\"middle\" font-size=\"9\" fill=\"'+(c2||'#ddd')+'\"/>'+t2+'</text>';\n  return b;\n}\nfunction A(x1,y1,x2,y2,c){return '<line x1=\"'+x1+'\" y1=\"'+y1+'\" x2=\"'+x2+'\" y2=\"'+y2+'\" stroke=\"'+(c||'#666')+'\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/>';}\nfunction T(x,y,t,s,c,a){return '<text x=\"'+x+'\" y=\"'+y+'\" font-size=\"'+(s||10)+'\" fill=\"'+(c||'#333')+'\" text-anchor=\"'+(a||'start')+'\"/>'+t+'</text>';}\n",
  ""
);

// ============ STEP 3: SVG height 200 -> 300 ============
src = src.replace('svgW(500,200,t,svgInner)', 'svgW(500,300,t,svgInner)');

// ============ STEP 4: Transform summary + caption together ============
// Match:  R(290,35,190,155,'color','','title','desc'),T(240,220,'caption',9,'#666','middle'),
// Replace: R(10,178,480,52,'color','','title') + Tw(250,203,'desc',9,'#666','middle',85)+T(240,255,'caption',9,'#666','middle'),
src = src.replace(
  /R\(290,35,190,155,'(#[0-9a-f]+)','','([^']+)','([^']+)'\),T\(240,220,'([^']+)',9,'#666','middle'\),/g,
  function(m, color, title, desc, caption) {
    return "R(10,178,480,52,'" + color + "','','" + title + "') + Tw(250,203,'" + desc + "',9,'#666','middle',85)+T(240,255,'" + caption + "',9,'#666','middle'),";
  }
);

// ============ STEP 5: Box height 25 -> 32 ============
src = src.replace(/(R\(\d+,\d+,\d+),25,'(#[0-9a-f]+)/g, '$1,32,\'$2');

// ============ STEP 6: Row y-shifts ============
src = src.replace(/(R\(\d+),35,/g, '$1,45,');
src = src.replace(/(R\(\d+),70,/g, '$1,85,');
src = src.replace(/(R\(\d+),105,/g, '$1,125,');
src = src.replace(/(R\(\d+),140,/g, '$1,160,');
src = src.replace(/(R\(\d+),130,/g, '$1,150,');

// ============ STEP 7: Arrow shifts ============
// Horizontal arrow y-centers
src = src.replace(/A\((\d+),48,(\d+),48\)/g, function(m, x1, x2) { return 'A(' + x1 + ',61,' + x2 + ',61)'; });
src = src.replace(/A\((\d+),83,(\d+),83\)/g, function(m, x1, x2) { return 'A(' + x1 + ',101,' + x2 + ',101)'; });
src = src.replace(/A\((\d+),118,(\d+),118\)/g, function(m, x1, x2) { return 'A(' + x1 + ',141,' + x2 + ',141)'; });
// Extend horizontal arrows
src = src.replace(/A\(110,61,140,61\)/g, 'A(110,61,150,61)');
src = src.replace(/A\(250,61,280,61\)/g, 'A(250,61,290,61)');
src = src.replace(/A\(110,101,140,101\)/g, 'A(110,101,150,101)');
src = src.replace(/A\(250,101,280,101\)/g, 'A(250,101,290,101)');
src = src.replace(/A\(110,141,140,141\)/g, 'A(110,141,150,141)');
src = src.replace(/A\(250,141,280,141\)/g, 'A(250,141,290,141)');
// Vertical arrows
src = src.replace(/A\((\d+),60,(\d+),80\)/g, function(m, x1, x2) { return 'A(' + x1 + ',77,' + x2 + ',83)'; });
src = src.replace(/A\((\d+),90,(\d+),110\)/g, function(m, x1, x2) { return 'A(' + x1 + ',117,' + x2 + ',123)'; });
src = src.replace(/A\((\d+),120,(\d+),145\)/g, function(m, x1, x2) { return 'A(' + x1 + ',157,' + x2 + ',163)'; });
// Caption T not needed since step 4 already set y=255

// ============ STEP 8: Remove leftover summary->caption arrows ============
src = src.replace(/\+ A\(310,61,\d+,61\) \+/g, '+');
src = src.replace(/\+ A\(250,61,290,61\) \+/g, '+');
src = src.replace(/\+\s*A\(250,61,290,61\)\s*\+/g, '+');

// ============ STEP 9: Split by addTopic for topic-specific fixes ============
var blocks = src.split("addTopic('");
var result = blocks[0];

for (var i = 1; i < blocks.length; i++) {
  var block = "addTopic('" + blocks[i];

  // Topic 1 (sd-interview)
  if (i === 1) {
    block = block.replace(/A\(210,77,210,83\)/, 'A(260,77,60,83)');
  }
  // Topic 2 (scalability)
  else if (i === 2) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,190,83)');
    block = block.replace(/A\(110,101,10,125\)/, 'A(60,117,60,123)');
  }
  // Topic 4 (monolithic)
  else if (i === 4) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,60,83)');
  }
  // Topic 5 (load-balancing)
  else if (i === 5) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,140,83)');
  }
  // Topic 6 (caching)
  else if (i === 6) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,210,83)');
  }
  // Topic 7 (database sharding)
  else if (i === 7) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,140,83)');
  }
  // Topic 8 (database replication)
  else if (i === 8) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,170,83)');
  }
  // Topic 9 (CDN)
  else if (i === 9) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,60,83)');
  }
  // Topic 10 (message queues)
  else if (i === 10) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,170,83)');
  }
  // Topic 11 (event-driven)
  else if (i === 11) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,140,83)');
  }
  // Topic 13 (consistency patterns)
  else if (i === 13) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,140,83)');
  }
  // Topic 14 (bloom filters)
  else if (i === 14) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,210,83)');
  }
  // Topic 16 (rate limiting)
  else if (i === 16) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,210,83)');
  }
  // Topic 19 (distributed transactions)
  else if (i === 19) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,140,83)');
  }
  // Topic 21 (URL shortener)
  else if (i === 21) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,210,83)');
  }
  // Topic 22 (pastebin)
  else if (i === 22) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,210,83)');
  }
  // Topic 24 (twitter feed)
  else if (i === 24) {
    block = block.replace(/A\(200,77,200,83\)/, 'A(200,77,210,83)');
  }

  // Fix remaining edge-aligned vertical arrows
  // A(150,117,150,123) -> A(200,117,60,123) in topic 4
  if (i === 4) {
    block = block.replace(/A\(150,117,150,123\)/, 'A(200,117,60,123)');
  }
  // A(160,117,160,123) already centered in topic 6
  // A(40,130,40,160) -> topic 3 microservices
  if (i === 3) {
    block = block.replace(/A\(40,130,40,160\)/, 'A(60,157,40,163)');
  }
  // A(160,125,160,145) in topic 6 caching
  if (i === 6) {
    block = block.replace(/A\(160,125,160,145\)/, 'A(210,157,210,163)');
  }
  // A(10,117,10,123) in topic 21 URL shortener
  if (i === 21) {
    block = block.replace(/A\(10,117,10,123\)/, 'A(60,117,60,123)');
  }
  // A(110,83,10,105) leftover in topic 2
  if (i === 2) {
    block = block.replace(/A\(110,83,10,105\)/, '');
  }
  // A(250,101,290,101) leftovers
  block = block.replace(/\+ A\(250,101,290,101\)/g, '+');
  block = block.replace(/\+ A\(250,141,290,141\)/g, '+');
  // A(250,101,280,101) in chat system topic 23
  if (i === 23) {
    block = block.replace(/A\(250,101,280,101\)/, '');
  }

  result += block;
}

// Clean up empty + leftovers
result = result.replace(/\+\s*\+/g, '+');
result = result.replace(/\+\s*\+/g, '+');
result = result.replace(/\+\s*,/g, ',');

fs.writeFileSync(filePath, result, 'utf8');
console.log('Transformation complete.');
