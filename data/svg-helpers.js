// Shared SVG helpers for all generators.
// Fixes: arrow markers, adequate dimensions, auto-wrapping for long caption text.

// Wrap text into lines that fit within maxChars per line
function wrapLines(text, maxChars) {
  if (!text) return [''];
  if (text.length <= maxChars) return [text];
  var lines = [];
  for (var i = 0; i < text.length; i += maxChars) {
    lines.push(text.substring(i, i + maxChars));
  }
  return lines;
}

// Single <text> element. Auto-wraps text > 50 chars for small font sizes.
function T(x, y, text, size, color, anchor) {
  if (!text) return '';
  if (text.length > 50 && (size||10) <= 10) {
    var lines = wrapLines(text, 50);
    var out = '';
    for (var i = 0; i < lines.length; i++) {
      out += '<text x="'+x+'" y="'+(y + i * ((size||10)+3))+'" font-size="'+(size||10)+'" fill="'+(color||'#333')+'" text-anchor="'+(anchor||'start')+'">'+lines[i]+'</text>';
    }
    return out;
  }
  return '<text x="'+x+'" y="'+y+'" font-size="'+(size||10)+'" fill="'+(color||'#333')+'" text-anchor="'+(anchor||'start')+'">'+text+'</text>';
}

// Multi-line <text> with explicit wrapping
function Tw(x, y, text, size, color, anchor, maxChars) {
  if (!maxChars) maxChars = 55;
  if (!text) return '';
  var lines = wrapLines(text, maxChars);
  var out = '';
  for (var i = 0; i < lines.length; i++) {
    out += '<text x="'+x+'" y="'+(y + i * ((size||10)+3))+'" font-size="'+(size||10)+'" fill="'+(color||'#333')+'" text-anchor="'+(anchor||'start')+'">'+lines[i]+'</text>';
  }
  return out;
}

// Rectangle with two-line label. t2 auto-wraps based on box width.
function R(x,y,w,h,fill,stroke,t1,t2,c1,c2) {
  var box = '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="5" fill="'+fill+'" stroke="'+(stroke||fill)+'" stroke-width="1.5"/>';
  if (t1) box += '<text x="'+(x+w/2)+'" y="'+(y+(t2?16:Math.round(h/2)+5))+'" text-anchor="middle" font-size="11" font-weight="bold" fill="'+(c1||'#fff')+'">'+t1+'</text>';
  if (t2) {
    var mc = Math.max(10, Math.floor(w / 5.5));
    var lines = wrapLines(t2, mc);
    var sy = y + h - 6 - (lines.length - 1) * 11;
    for (var i = 0; i < lines.length; i++) {
      box += '<text x="'+(x+w/2)+'" y="'+(sy + i * 11)+'" text-anchor="middle" font-size="9" fill="'+(c2||'#ddd')+'">'+lines[i]+'</text>';
    }
  }
  return box;
}

// Arrow line
function A(x1,y1,x2,y2,c) {
  return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(c||'#666')+'" stroke-width="1.5" marker-end="url(#arrow)"/>';
}

// SVG wrapper: returns complete SVG string with defs (arrow marker).
function svgW(W, H, title, inner) {
  return '<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;font-family:sans-serif">' +
    '<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10" fill="#666" opacity="0.7"/></marker></defs>' +
    '<rect x="0" y="0" width="'+W+'" height="'+H+'" rx="10" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>' +
    '<text x="'+(W/2)+'" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">'+title+'</text>' +
    inner + '</svg>';
}

module.exports = { svgW, R, A, T, Tw, wrapLines };

