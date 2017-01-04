(function(){(function(f){var l,g,c,k,e,b={".js":[],".json":[],".css":[],".html":[]},d="function"===typeof require?require:null;k=function(a){a=Error("Could not find module '"+a+"'");a.code="MODULE_NOT_FOUND";return a};e=function(a,d,q){var e,h;if("function"===typeof a[d+q])return d+q;for(e=0;h=b[q][e];++e)if("function"===typeof a[d+h])return d+h;return null};l=function(a,d,b,c,h,f){var m,t;b=b.split(/[\\/]/);m=b.pop();if("."===m||".."===m)b.push(m),m="";for(;null!=(t=b.shift());)if(t&&"."!==t&&(".."===
t?(a=d.pop(),f=f.slice(0,f.lastIndexOf("/"))):(d.push(a),a=a[t],f+="/"+t),!a))throw k(c);m&&"function"!==typeof a[m]&&((b=e(a,m,".js"))||(b=e(a,m,".json")),b||(b=e(a,m,".css")),b||(b=e(a,m,".html")),b?m=b:2!==h&&"object"===typeof a[m]&&(d.push(a),a=a[m],f+="/"+m,m=""));if(!m)return 1!==h&&a[":mainpath:"]?l(a,d,a[":mainpath:"],c,1,f):l(a,d,"index",c,2,f);h=a[m];if(!h)throw k(c);if(h.hasOwnProperty("module"))return h.module.exports;c={};h.module=m={exports:c,id:f+"/"+m};h.call(c,c,m,g(a,d,f));return m.exports};
c=function(a,b,q,e){var h,c=q;h=q.charAt(0);var g=0;if("/"===h){c=c.slice(1);a=f["/"];if(!a){if(d)return d(q);throw k(q);}e="/";b=[]}else if("."!==h){h=c.split("/",1)[0];a=f[h];if(!a){if(d)return d(q);throw k(q);}e=h;b=[];c=c.slice(h.length+1);c||((c=a[":mainpath:"])?g=1:(c="index",g=2))}return l(a,b,c,q,g,e)};g=function(a,b,d){return function(e){return c(a,[].concat(b),e,d)}};return g(f,[],"")})({carota:{src:{"carota.js":function(f,l,g){f=g("./node");var c=g("./editor"),k=g("./doc"),e=g("./dom"),
b=g("./runs"),d=g("./html"),a=g("./frame"),n=g("./text");g=g("./rect");g={node:f,editor:c,document:k,dom:e,runs:b,html:d,frame:a,text:n,rect:g};l.exports=g;if("undefined"!==typeof window&&window.document){if(window.carota)throw Error("Something else is called carota!");window.carota=g}},"characters.js":function(f,l,g){function c(a,b,c){return Object.create(d,{_runs:{value:a},_run:{value:b},_offset:{value:c},"char":{value:b>=a.length?null:e.getTextChar(a[b].text,c)}})}function k(a,b){for(;b<a.length;b++)if(0!=
e.getTextLength(a[b].text))return c(a,b,0);return c(a,a.length,0)}var e=g("./runs"),b=function(a,b){if(a._runs!==b._runs)throw Error("Characters for different documents");},d={equals:function(a){b(this,a);return this._run===a._run&&this._offset===a._offset},cut:function(a){b(this,a);var d=this;return function(b){for(var c=d._run;c<=a._run;c++){var h=d._runs[c];if(h){var f=c===d._run?d._offset:0,k=c===a._run?a._offset:e.getTextLength(h.text);f<k&&e.getSubText(function(a){var d=Object.create(h);d.text=
a;b(d)},h.text,f,k-f)}}}}};l.exports=function(a){return function(b){for(var d=k(a,0);!b(d)&&null!==d["char"];)d=d._offset+1<e.getTextLength(a[d._run].text)?c(a,d._run,d._offset+1):k(a,d._run+1)}}},"codes.js":function(f,l,g){var c=g("./text"),k=g("./frame"),e=g("./node"),b=g("./rect"),d=g("./util"),a=e.derive({parent:function(){return this._parent},draw:function(a){this.inline.draw(a,this.left,this.baseline,this.measured.width,this.measured.ascent,this.measured.descent,this.formatting)},position:function(a,
d,b){this.left=a;this.baseline=d;b&&(this._bounds=b)},bounds:function(){return this._bounds||b(this.left,this.baseline-this.measured.ascent,this.measured.width,this.measured.ascent+this.measured.descent)},byCoordinate:function(a,b){return a<=this.bounds().center().x?this:this.next()}}),n={number:function(a,b){var d=b+1+".";return{measure:function(a){return c.measure(d,a)},draw:function(a,b,e,q,w,p,y){c.draw(a,d,y,b,e,q,w,p)}}}};n.listNext=n.listEnd=function(a){return d.derive(a,{eof:!0,measure:function(a){return{width:18,
ascent:0,descent:0}},draw:function(a,b,d){}})};n.listStart=function(c,n,h){return d.derive(c,{block:function(d,n,f,r,w,p){var y=e.generic("list",w,d,n),x,g,z,B=function(p,b){x=e.generic("item",y);var c=h(p.marker||{$:"number"},y.children().length);if(!c.draw||!c.measure)throw Error();z=Object.create(a,{inline:{value:c},_parent:{value:x},ordinal:{value:r},length:{value:1},formatting:{value:b},measured:{value:c.measure(b)}});z.block=!0;g=k(d+50,n,f-50,r+1,x,function(a){return"listEnd"===a.$},z.measured.ascent)};
B(c,p);return function(a){g?g(function(a){r=a.ordinal+a.length;var p=a.bounds(),c=a.first(),w=d+50-10-z.measured.width,e=b(d,n,50,p.h);"baseline"in c?z.position(w,c.baseline,e):z.position(w,n+z.measured.ascent,e);n=p.t+p.h;x.children().push(z);x.children().push(a);x.finalize();y.children().push(x);x=g=z=null},a):r++;if(!g){var p=a.code();if(p){if("listEnd"==p.$)return y.finalize(),y;"listNext"==p.$&&B(p,a.codeFormatting())}}}}})};l.exports=f=function(a,b,d){var c=n[a.$];return c&&c(a,b,d)};f.editFilter=
function(a){var b=0;if(!a.words.some(function(c,e){var h=c.code();if(h)switch(h.$){case "listStart":b++;break;case "listNext":if(0===b)return a.spliceWordsWithRuns(e,1,[d.derive(c.codeFormatting(),{text:{$:"listStart",marker:h.marker}})]),!0;break;case "listEnd":0===b&&a.spliceWordsWithRuns(e,1,[]),b--}})&&0<b){for(var c=[];0<b;)b--,c.push({text:{$:"listEnd"}});a.spliceWordsWithRuns(a.words.length-1,0,c)}}},"doc.js":function(f,l,g){var c=g("per"),k=g("./characters"),e=g("./split"),b=g("./word");f=
g("./node");var d=g("./runs"),a=g("./range"),n=g("./util"),q=g("./frame"),r=g("./codes"),h=g("./rect"),v=function(a,p,b,d){var c=a.selection.start,e=a.selection.end;return function(h){a._wordOrdinals=[];var n=Array.prototype.splice.apply(a.words,[p,b].concat(d));h(v(a,p,d.length,n));a._nextSelection={start:c,end:e}}},m=function(a){var p=[],b=function(a){p.push(a);b.length=p.length};a(b);return function(a){a(m(function(a){for(;p.length;)p.pop()(a)}))}},t=function(a){if(a.isNewLine())return!0;a=a.code();
return!(!a||!a.block&&!a.eof)},u=f.derive({invalidateBounds:function(){var a=this.frame.bounds(),p=this.position;this.bounds=[p.x+a.l,p.y+a.t,p.x+this.frame.actualWidth(),p.y+a.h];this.stanza.bounds=this.bounds;Progress.call("textBoundsChanged",[this.identity,this.bounds])},load:function(a){var p=this;this.undo=[];this.redo=[];this._wordOrdinals=[];this.words=c(k(a)).per(e(p.codes)).map(function(a){return b(a,p.codes)}).all();this.words.push(b());this.layout()},layout:function(){this.frame=null;try{this.frame=
c(this.words).per(q(0,0,this._width,0,this)).first(),this.invalidateBounds()}catch(a){console.error("layout exception",a)}if(!this.frame)console.error("A bug somewhere has produced an invalid state - rolling back"),this.performUndo();else if(this._nextSelection){var b=this._nextSelection;delete this._nextSelection;this.select(b.start,b.end,!0)}},range:function(b,p){return a(this,b,p)},documentRange:function(){return this.range(0,this.frame.length-1)},selectedRange:function(){return this.range(this.selection.start,
this.selection.end)},save:function(){return this.documentRange().save()},paragraphRange:function(a,p){var b;b=this.wordContainingOrdinal(a);a=0;if(b&&!t(b.word))for(b=b.index;0<b;b--)if(t(this.words[b-1])){a=this.wordOrdinal(b);break}b=this.wordContainingOrdinal(p);p=this.frame.length-1;if(b&&!t(b.word))for(b=b.index;b<this.words.length;b++)if(t(this.words[b])){p=this.wordOrdinal(b);break}return this.range(a,p)},insert:function(a,b){this.select(this.selection.end+this.selectedRange().setText(a),null,
b)},modifyInsertFormatting:function(a,b){carota.runs.nextInsertFormatting=carota.runs.nextInsertFormatting||{};carota.runs.nextInsertFormatting[a]=b;this.notifySelectionChanged()},applyInsertFormatting:function(a){var b=carota.runs.nextInsertFormatting,d=Object.keys(b);d.length&&a.forEach(function(a){d.forEach(function(d){a[d]=b[d]})})},wordOrdinal:function(a){if(a<this.words.length){var b=this._wordOrdinals.length;if(b<a+1)for(var d=0<b?this._wordOrdinals[b-1]:0;b<=a;b++)this._wordOrdinals[b]=d,
d+=this.words[b].length;return this._wordOrdinals[a]}},wordContainingOrdinal:function(a){var b,d=0;this.words.some(function(c,e){if(a>=d&&a<d+c.length)return b={word:c,ordinal:d,index:e,offset:a-d},!0;d+=c.length});return b},runs:function(a,b){var d=this.wordContainingOrdinal(Math.max(0,b.start)),c=this.wordContainingOrdinal(Math.min(b.end,this.frame.length-1))||d;if(!d||!c)throw new Exception("range miss");if(d.index===c.index)d.word.runs(a,{start:d.offset,end:c.offset});else{d.word.runs(a,{start:d.offset});
for(d=d.index+1;d<c.index;d++)this.words[d].runs(a);c.word.runs(a,{end:c.offset})}},spliceWordsWithRuns:function(a,d,h){var n=this,q=c(k(h)).per(e(n.codes)).truthy().map(function(a){return b(a,n.codes)}).all(),f=!1;if("_filtersRunning"in n)n._filtersRunning++;else{for(h=0;h<d;h++)this.words[a+h].code()&&(f=!0);f||(f=q.some(function(a){return!!a.code()}))}this.transaction(function(b){v(n,a,d,q)(b);if(f){n._filtersRunning=0;try{for(;;){var c=n._filtersRunning;if(!n.editFilters.some(function(a){a(n);
return c!==n._filtersRunning}))break}}finally{delete n._filtersRunning}}})},splice:function(a,b,e){if("string"===typeof e){var h=Math.max(0,a-1),h=c({start:h,end:h+1}).per(this.runs,this).first();e=[h?Object.create(h,{text:{value:e}}):{text:e}]}else Array.isArray(e)||(e=[{text:e}]);this.applyInsertFormatting(e);var h=this.wordContainingOrdinal(a),n=this.wordContainingOrdinal(b);n||(n=h);a===h.ordinal?0<h.index&&!t(this.words[h.index-1])?(h.index--,a=this.words[h.index],a=c({}).per(a.runs,a).all()):
a=[]:a=c({end:h.offset}).per(h.word.runs,h.word).all();b===n.ordinal?b===this.frame.length-1||t(n.word)?(b=[],n.index--):b=c({}).per(n.word.runs,n.word).all():b=c({start:n.offset}).per(n.word.runs,n.word).all();var q=this.frame.length;this.spliceWordsWithRuns(h.index,n.index-h.index+1,c(a).concat(e).concat(b).per(d.consolidate()).all());return this.frame?this.frame.length-q:0},registerEditFilter:function(a){this.editFilters.push(a)},width:function(a){if(0===arguments.length)return this._width;this._width=
a;this.layout()},children:function(){return[this.frame]},toggleCaret:function(){var a=this.caretVisible;if(this.selection.start===this.selection.end){if(this.selectionJustChanged)return this.selectionJustChanged=!1,this.caretVisible=!0;this.caretVisible=!this.caretVisible}return this.caretVisible!==a},getCaretCoords:function(a){var b=this.byOrdinal(a);if(b)return b.block&&0<a?(b=this.byOrdinal(a-1),b.newLine?(a=b.bounds,b=b.parent().parent().bounds,a=h(b.l,b.b,1,a.h)):(a=b.bounds,a=h(a.r,a.t,1,a.h))):
(a=b.bounds(),a=a.h?h(a.l,a.t,1,a.h):h(a.l,a.t,a.w,1)),a},byCoordinate:function(a,b){for(var d=this.frame.byCoordinate(a,b).ordinal,c=this.getCaretCoords(d);c.b<=b&&d<this.frame.length-1;)d++,c=this.getCaretCoords(d);for(;c.t>=b&&0<d;)d--,c=this.getCaretCoords(d);return this.byOrdinal(d)},drawSelection:function(a,b){if(this.selection.end===this.selection.start){if(this.selectionJustChanged||this.caretVisible){var d=this.getCaretCoords(this.selection.start);d&&(a.save(),a.globalAlpha=1,a.fillStyle=
"black",d.fill(a),a.restore())}}else a.save(),a.fillStyle=b?"rgba(0, 100, 200, 0.3)":"rgba(160, 160, 160, 0.3)",this.selectedRange().parts(function(b){b.bounds(!0).fill(a)}),a.restore()},notifySelectionChanged:function(a){var b=null,d=this;this.selectionChanged.fire(function(){b||(b=d.selectedRange().getFormatting());return b},a)},select:function(a,b,d){this.frame?(this.selection.start=Math.max(0,a),this.selection.end=Math.min("number"===typeof b?b:this.selection.start,this.frame.length-1),carota.runs.nextInsertFormatting=
{},this.notifySelectionChanged(d),this.selectionJustChanged=!0):console.log("Something has gone terribly wrong - doc.transaction will rollback soon")},performUndo:function(a){var b=a?this.undo:this.redo;if(a=(a?this.redo:this.undo).pop())a(function(a){b.push(a)}),this.layout(),this.contentChanged.fire()},canUndo:function(a){return a?!!this.redo.length:!!this.undo.length},transaction:function(a){if(this._currentTransaction)a(this._currentTransaction);else{for(var b=this;50<this.undo.length;)b.undo.shift();
this.redo.length=0;var d=!1;this.undo.push(m(function(c){b._currentTransaction=c;try{a(c)}finally{d=0<c.length,b._currentTransaction=null}}));d&&(b.layout(),b.contentChanged.fire())}},type:"document"});l.exports=function(a){var b=Object.create(u);b.stanza=a;b.position={x:a.x,y:a.y};b.privacy=a.privacy;b.identity=a.identity;b.slide=Conversations.getCurrentSlideJid();b._width=0;b.selection={start:0,end:0};b.caretVisible=!0;b.customCodes=function(a,b,d){};b.codes=function(a,d){return r(a,d,b.codes)||
b.customCodes(a,d,b.codes)};b.selectionChanged=n.event();b.contentChanged=n.event();b.editFilters=[r.editFilter];b.load([]);return b}},"dom.js":function(f,l,g){f.isAttached=function(c){for(;c.parentNode;)c=c.parentNode;return!!c.body};f.clear=function(c){for(;c.firstChild;)c.removeChild(c.firstChild)};f.setText=function(c,k){f.clear(c);c.appendChild(document.createTextNode(k))};f.handleEvent=function(c,f,e){c.addEventListener(f,function(b){!1===e(b)&&b.preventDefault()})};f.handleMouseEvent=function(c,
k,e){f.handleEvent(c,k,function(b){var d=c.getBoundingClientRect();return e(b,b.clientX-d.left,b.clientY-d.top)})};f.effectiveStyle=function(c,f){return document.defaultView.getComputedStyle(c).getPropertyValue(f)}},"editor.js":function(f,l,g){g("per");var c=g("./doc"),k=g("./dom"),e=g("./rect"),b=null;Date.now();f.paint=function(d,a,c){var f=worldToScreen(a.position.x,a.position.y),k=d.width,h=d.height;d=d.getContext("2d");d.save();k=e(0,0,k,h);h=scale();d.translate(f.x,f.y);d.scale(h,h);"PRIVATE"==
a.privacy&&(d.fillStyle="red",d.globalAlpha=.1,d.fillRect(0,0,a.frame.actualWidth(),a.frame.height),d.globalAlpha=1);a.draw(d,k);a.isActive&&Modes.currentMode==Modes.text&&a.drawSelection(d,b||c);d.restore()};f.create=function(d,a,e,f){d.innerHTML='<div class="carotaTextArea" style="overflow: hidden; position: absolute; height: 0;"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="0" style="position: absolute; padding: 0px; width: 1000px; height: 1em; top: -10000px; left:-10000px; outline: none; font-size: 4px;"></textarea></div>';
a=a||d.querySelector("canvas");d.querySelector(".carotaTextArea");var g=d.querySelector("textarea"),h=c(f),v=0,m=null,t=null,u=null,l="",p=null,y=null;h.width(a.clientWidth);h.claimFocus=function(){$(g).focus()};var x={66:"bold",73:"italic",85:"underline",83:"strikeout"},A=function(a,b){var d=h.getCaretCoords(a),c;for(t=null!==m?m:d.l;!(0>b?0>=a:a>=h.frame.length-1)&&!(a+=b,c=h.getCaretCoords(a),c.b<=d.t||d.b<=c.t););for(d=c;!((0>b?0>=a:a>=h.frame.length-1)||0<b&&c.l>=t||0>b&&c.l<=t);)if(a+=b,c=h.getCaretCoords(a),
c.b<=d.t||d.b<=c.t){a-=b;break}return a},z=function(a,b){for(var d=h.getCaretCoords(a),c;!(0>b?0>=a:a>=h.frame.length-1);)if(a+=b,c=h.getCaretCoords(a),c.b<=d.t||d.b<=c.t){a-=b;break}return a},B=function(a,b,d){var c=h.selection.start,f=h.selection.end,q=h.frame.length-1,g=!1;t=null;if(!b)v=0;else if(!v)switch(a){case 37:case 38:case 36:case 33:v=-1;break;case 39:case 40:case 35:case 34:v=1}var k=1===v?f:c,r=!1;switch(a){case 37:b||c==f?0<k&&(d?(r=h.wordContainingOrdinal(k),k=r.ordinal===k?0<r.index?
h.wordOrdinal(r.index-1):0:r.ordinal):k--):k=c;r=!0;break;case 39:b||c==f?k<q&&(d?(r=h.wordContainingOrdinal(k),k=r.ordinal+r.word.length):k++):k=f;r=!0;break;case 40:k=A(k,1);r=!0;break;case 38:k=A(k,-1);r=!0;break;case 36:k=z(k,-1);r=!0;break;case 35:k=z(k,1);r=!0;break;case 33:k=0;r=!0;break;case 34:k=q;r=!0;break;case 8:c===f&&0<c&&(h.range(c-1,c).clear(),u=c-1,h.select(u,u,!0),g=!0);break;case 46:c===f&&c<q&&(h.range(c,c+1).clear(),g=!0);break;case 90:d&&(g=!0,h.performUndo());break;case 89:d&&
(g=!0,h.performUndo(!0));break;case 65:d&&(g=!0,h.select(0,q,!0));break;case 67:case 88:d&&(p=h.selectedRange().save(),y=h.selectedRange().plainText())}a=x[a];d&&a&&(d=h.selectedRange(),d.setFormatting(a,!0!==d.getFormatting()[a]),e(),g=!0);if(r){switch(v){case 0:c=f=k;break;case -1:c=k;break;case 1:f=k}c===f?v=0:c>f&&(v=-v,d=f,f=c,c=d);u=k;h.select(c,f,!0);g=!0}m=t;return g};k.handleEvent(g,"keydown",function(a){if(B(a.keyCode,a.shiftKey,a.ctrlKey))return!1});h.setVerticalAlignment=function(a){e()};
k.handleEvent(g,"input",function(){var a=g.value;l!=a&&(l="",g.value="",a===y&&(a=p),h.insert(a,!0))});var D=function(){u=null===u?h.selection.end:u;l=h.selectedRange().plainText();g.value=l;g.select();setTimeout(function(){g.focus()},10)};h.selectionChanged(function(a,b){e()});h.dblclickHandler=function(a){m=null;h.isActive=!0;(a=a.parent())&&h.select(a.ordinal,a.ordinal+(a.word?a.word.text.length:a.length));D();h.update()};h.mousedownHandler=function(a){C=0;b=a.ordinal;h.select(a.ordinal,a.ordinal,
!1);m=null};h.mousemoveHandler=function(a){null!==b&&a&&(u=a.ordinal,b>a.ordinal?h.select(a.ordinal,b,!1):h.select(b,a.ordinal,!1))};h.mouseupHandler=function(a){m=null;h.isActive=!0;D();h.update()};var C=(new Date).getTime();h.update=function(){if(Conversations.getCurrentSlideJid()==h.slide&&h.isActive){var a=(new Date).getTime();a>C&&(C=a+500,h.toggleCaret()&&e());setTimeout(h.update,500)}};h.sendKey=B;return h}},"frame.js":function(f,l,g){f=g("./node");var c=g("./wrap"),k=g("./rect"),e=f.derive({bounds:function(){var b=
this._bounds;if(!b||!_.every(["l","t","w","h"],function(a){return a in b})){var d=0,a=0,c=0,e=0;this.lines&&this.lines.length&&(a=this.lines[0].bounds(),d=a.l,a=a.t,this.lines.forEach(function(a,b){var d=a.bounds();c=Math.max(c,d.l+d.w);e=Math.max(e,d.t+d.h)}));this._bounds=k(d,a,Math.max(c-d,scaleWorldToScreen(Modes.text.minimumWidth)),Math.max(this.height?this.height:e-a,scaleWorldToScreen(Modes.text.minimumHeight())))}return this._bounds},actualWidth:function(){if(!this._actualWidth){var b=0;this.lines&&
this.lines.forEach(function(d){"number"===typeof d.actualWidth&&(b=Math.max(b,d.actualWidth))});this._actualWidth=Math.max(scaleWorldToScreen(Modes.text.minimumWidth),b)}return this._actualWidth},children:function(){return this.lines},parent:function(){return this._parent},draw:function(b,d){this.lines&&this.lines.some(function(a){a.draw(b,d)})},type:"frame"});l.exports=function(b,d,a,n,f,k,h,g){var m=[],t=Object.create(e,{lines:{value:m},_parent:{value:f},ordinal:{value:n}}),u=c(b,d,a,n,t,k,h,g),
l=0,p=0;return function(a,b){if(u(function(a){"number"===typeof a?p=a:(l=a.ordinal+a.length-n,m.push(a))},b))return Object.defineProperty(t,"length",{value:l}),Object.defineProperty(t,"height",{value:p}),a(t),!0}}},"html.js":function(f,l,g){var c=g("./runs"),k=g("per");l=function(a,b){return function(d,c){d.nodeName===a&&(c[b]=!0)}};var e=function(a,b,d,c){return function(e,h){var n=e[a]&&e[a][b];n&&(c&&(n=c(n)),h[d]=n)}};g=function(a,b,d){return e("attributes",a,b,d)};var b=function(a,b,d){return e("style",
a,b,d)},d=function(a,b,d){return function(c,e){c.style&&c.style[a]===b&&(e[d]=!0)}},a=[6,7,9,10,12,16,20,30],n={left:!0,center:!0,right:!0,justify:!0},q=function(a){return n[a]?a:"left"},r=function(a){var b=a.split(/\s*,\s*/g);if(0==b.length)return a;a=b[0];return(b=a.match(/^"(.*)"$/))?b[1].trim():(b=a.match(/^'(.*)'$/))?b[1].trim():a},h={H1:30,H2:20,H3:16,H4:14,H5:12},v=[l("B","bold"),l("STRONG","bold"),l("I","italic"),l("EM","italic"),l("U","underline"),l("S","strikeout"),l("STRIKE","strikeout"),
l("DEL","strikeout"),d("fontWeight","bold","bold"),d("fontStyle","italic","italic"),d("textDecoration","underline","underline"),d("textDecoration","line-through","strikeout"),b("color","color"),b("fontFamily","font",r),b("fontSize","size",function(a){return(a=a.match(/^([\d\.]+)pt$/))?parseFloat(a[1]):10}),b("textAlign","align",q),function(a,b){"SUB"===a.nodeName&&(b.script="sub")},function(a,b){"SUPER"===a.nodeName&&(b.script="super")},function(a,b){"CODE"===a.nodeName&&(b.font="monospace")},function(a,
b){var d=h[a.nodeName];d&&(b.size=d)},g("color","color"),g("face","font",r),g("align","align",q),g("size","size",function(b){return a[b]||10})],m={};"BR P H1 H2 H3 H4 H5".split(" ").forEach(function(a){m[a]=!0});f.parse=function(a,b){function d(a,c){if(3==a.nodeType)q(a.nodeValue,c);else if(void 0!=a){c=Object.create(c);var e=a.attributes["class"];e&&e.value.split(" ").forEach(function(a){(a=b[a])&&Object.keys(a).forEach(function(b){c[b]=a[b]})});v.forEach(function(b){b(a,c)});if(a.childNodes)for(e=
0;e<a.childNodes.length;e++)d(a.childNodes[e],c);m[a.nodeName]&&(f.submit(Object.create(c,{text:{value:"\n"}})),n=!0)}}var e=a;"string"===typeof e&&(e=document.createElement("div"),e.innerHTML=a);var h=[],n=!0,f=k(c.consolidate()).into(h),q=function(a,b){a=a.replace(/\n+\s*/g," ");var d=a.length;a=a.replace(/^\s+/,"");n?n=!1:d!==a.length&&(a=" "+a);d=a.length;a=a.replace(/\s+$/,"");d!==a.length&&(n=!0,a+=" ");f.submit(Object.create(b,{text:{value:a}}))};d(e,{});return h}},"line.js":function(f,l,g){var c=
g("./positionedword"),k=g("./rect");f=g("./node");g("./runs");var e=f.derive({bounds:function(b){if(b){b=this.first().bounds();var d=this.last().bounds();return k(b.l,this.baseline-this.ascent,d.l+d.w-b.l,this.ascent+this.descent)}return k(this.left,this.baseline-this.ascent,this.width,this.ascent+this.descent)},parent:function(){return this.doc},children:function(){return this.positionedWords},type:"line"});l.exports=function(b,d,a,n,f,k,h,g){var m=h[0].align(),l=Object.create(e,{doc:{value:b},left:{value:d},
width:{value:a},baseline:{value:n},ascent:{value:f},descent:{value:k},ordinal:{value:g},align:{value:m}}),u=0;h.forEach(function(a){u+=a.width});var u=u-h[h.length-1].space.width,w=0,p=0;if(u<a)switch(m){case "right":w=a-u;break;case "center":w=(a-u)/2;break;case "justify":1<h.length&&!h[h.length-1].isNewLine()&&(p=(a-u)/(h.length-1))}Object.defineProperty(l,"positionedWords",{value:h.map(function(a){var b=w;w+=a.width+p;var d=g;g+=a.text.length+a.space.length;return c(a,l,b,d,a.width+p)})});Object.defineProperty(l,
"actualWidth",{value:u});Object.defineProperty(l,"length",{value:g-l.ordinal});return l}},"node.js":function(f,l,g){g("per");g("./runs");var c=g("./rect"),k=g("./util");f.prototype={children:function(){return[]},parent:function(){return null},first:function(){return this.children()[0]},last:function(){return this.children()[this.children().length-1]},next:function(){for(var b=this;;){var d=b.parent();if(!d)return null;var a=d.children();if(b=a[a.indexOf(b)+1]){for(;;){d=b.first();if(!d)break;b=d}return b}b=
d}},previous:function(){var b=this.parent();if(!b)return null;var d=b.children();return(d=d[d.indexOf(this)-1])?d:(b=b.previous())?b.last():null},byOrdinal:function(b){var d=null;return this.children().some(function(a){if(b>=a.ordinal&&b<a.ordinal+a.length&&(d=a.byOrdinal(b)))return!0})?d:this},byCoordinate:function(b,d){var a;this.children().some(function(c){if(c.bounds().contains(b,d)&&(a=c.byCoordinate(b,d)))return!0});if(!a){for(a=this.last();a;){var c=a.last();if(!c)break;a=c}(c=a.next())&&c.block&&
(a=c)}return a},draw:function(b,d){this.children().forEach(function(a){a.draw(b,d)})},parentOfType:function(b){var d=this.parent();return d&&(d.type===b?d:d.parentOfType(b))},bounds:function(){var b=this._left,d=this._top,a=0,e=0,f=function(a,b){return isNaN(a)?b:Math.min(a,b)},k=function(a,b){return isNaN(a)?b:Math.max(a,b)};this.children().forEach(function(c){c=c.bounds();b=f(b,c.l);d=f(d,c.t);a=k(a,c.l+c.w);e=k(e,c.t+c.h)});return c(b,d,a-b,e-d)}};f.derive=function(b){return k.derive(f.prototype,
b)};var e=f.derive({children:function(){return this._children},parent:function(){return this._parent},finalize:function(b,d){var a=Number.MAX_VALUE,c=0;this._children.forEach(function(b){a=Math.min(a,b.ordinal);c=Math.max(c,b.ordinal+b.length)});Object.defineProperty(this,"ordinal",{value:a-(b||0)});Object.defineProperty(this,"length",{value:(d||0)+c-a})}});f.generic=function(b,d,a,c){return Object.create(e,{type:{value:b},_children:{value:[]},_parent:{value:d},_left:{value:"number"===typeof a?a:
Number.MAX_VALUE},_top:{value:"number"===typeof c?c:Number.MAX_VALUE}})}},"part.js":function(f,l,g){var c=g("./text"),k={measure:function(b){var d=d.measure("?",b);return{width:d.width+4,ascent:d.width+2,descent:d.width+2}},draw:function(b,d,a,c,e,f){b.fillStyle="silver";b.fillRect(d,a-e,c,e+f);b.strokeRect(d,a-e,c,e+f);b.fillStyle="black";b.fillText("?",d+2,a)}},e={draw:function(b,d,a){"string"===typeof this.run.text?c.draw(b,this.run.text,this.run,d,a,this.width,this.ascent,this.descent):this.code&&
this.code.draw&&(b.save(),this.code.draw(b,d,a,this.width,this.ascent,this.descent,this.run),b.restore())}};l.exports=function(b,d){var a,f,g;"string"===typeof b.text?(f=1===b.text.length&&"\n"===b.text[0],a=c.measure(f?c.nbsp:b.text,b)):(g=d(b.text)||k,a=g.measure?g.measure(b):{width:0,ascent:0,descent:0});a=Object.create(e,{run:{value:b},isNewLine:{value:f},width:{value:f?0:a.width},ascent:{value:a.ascent},descent:{value:a.descent}});g&&Object.defineProperty(a,"code",{value:g});return a}},"positionedword.js":function(f,
l,g){var c=g("./rect"),k=g("./part"),e=g("./text");f=g("./node");g("./word");var b=g("./runs"),d=f.derive({bounds:function(){var a=this.word.bounds(),b=this.word.word.isNewLine()?e.measure(e.enter,this.word.word.run).width:this.width||this.part.width;return c(a.l+this.left,a.t,b,a.h)},parent:function(){return this.word},byOrdinal:function(){return this},byCoordinate:function(a,b){return a<=this.bounds().center().x?this:this.next()},type:"character"}),a=f.derive({draw:function(a){this.word.draw(a,
this.line.left+this.left,this.line.baseline)},bounds:function(){return c(this.line.left+this.left,this.line.baseline-this.line.ascent,this.word.isNewLine()?e.measure(e.enter,this.word.run).width:this.width,this.line.ascent+this.line.descent)},parts:function(a){this.word.text.parts.some(a)||this.word.space.parts.some(a)},realiseCharacters:function(){if(!this._characters){var a=[],c=0,e=this,f=this.ordinal,g=this.parentOfType("document").codes;this.parts(function(l){b.pieceCharacters(function(b){var m=
Object.create(l.run);m.text=b;b=k(m,g);a.push(Object.create(d,{left:{value:c},part:{value:b},word:{value:e},ordinal:{value:f},length:{value:1}}));c+=b.width;f++},l.run.text)});var l=a[a.length-1];l&&(Object.defineProperty(l,"width",{value:this.width-l.left}),(this.word.isNewLine()||this.word.code()&&this.word.code().eof)&&Object.defineProperty(l,"newLine",{value:!0}));this._characters=a}},children:function(){this.realiseCharacters();return this._characters},parent:function(){return this.line},type:"word"});
l.exports=function(b,d,c,e,f){return Object.create(a,{word:{value:b},line:{value:d},left:{value:c},width:{value:f},ordinal:{value:e},length:{value:b.text.length+b.space.length}})}},"range.js":function(f,l,g){function c(b,d,a){this.doc=b;this.start=d;this.end=a;d>a&&(this.start=a,this.end=d)}var k=g("per"),e=g("./runs");c.prototype.parts=function(b,d){d=d||this.doc.children();var a=this;d.some(function(d){if(d.ordinal+d.length<=a.start)return!1;if(d.ordinal>=a.end)return!0;d.ordinal>=a.start&&d.ordinal+
d.length<=a.end?b(d):a.parts(b,d.children())})};c.prototype.clear=function(){return this.setText([])};c.prototype.setText=function(b){return this.doc.splice(this.start,this.end,b)};c.prototype.runs=function(b){this.doc.runs(b,this)};c.prototype.plainText=function(){return k(this.runs,this).map(e.getPlainText).all().join("")};c.prototype.save=function(){return k(this.runs,this).per(e.consolidate()).all()};c.prototype.getFormatting=function(){if(this.start===this.end){var b=this.start;0<b&&b--;this.start=
b;this.end=b+1}return k(this.runs,this).reduce(e.merge).last()||e.defaultFormatting};c.prototype.setFormatting=function(b,d){var a=this;"align"===b&&(a=a.doc.paragraphRange(a.start,a.end));"color"===b&&"string"==typeof d&&(d=[d,255]);if(a.start===a.end)a.doc.modifyInsertFormatting(b,d);else{var c=a.save(),f={};f[b]=d;e.format(c,f);a.setText(c)}};l.exports=function(b,d,a){return new c(b,d,a)}},"rect.js":function(f,l,g){var c={contains:function(c,b){return c>=this.l&&c<this.l+this.w&&b>=this.t&&b<this.t+
this.h},stroke:function(c){c.strokeRect(this.l,this.t,this.w,this.h)},fill:function(c){c.fillRect(this.l,this.t,this.w,this.h)},offset:function(c,b){return k(this.l+c,this.t+b,this.w,this.h)},equals:function(c){return this.l===c.l&&this.t===c.t&&this.w===c.w&&this.h===c.h},center:function(){return{x:this.l+this.w/2,y:this.t+this.h/2}}},k=l.exports=function(e,b,d,a){return Object.create(c,{l:{value:e},t:{value:b},w:{value:d},h:{value:a},r:{value:e+d},b:{value:b+a}})}},"runs.js":function(f,l,g){f.formattingKeys=
"bold italic underline strikeout color font size align script".split(" ");f.defaultFormatting={size:14,font:"sans-serif",color:["#000000",255],bold:!1,italic:!1,underline:!1,strikeout:!1,align:"left",script:"normal"};f.resolveKey=function(c,k){return k in c?c[k]:f.defaultFormatting[k]};f.sameFormatting=function(c,k){return f.formattingKeys.every(function(e){return _.isEqual(f.resolveKey(c,e),f.resolveKey(k,e))})};f.clone=function(c){var k={text:c.text};f.formattingKeys.forEach(function(e){var b=c[e];
b&&b!=f.defaultFormatting[e]&&(k[e]=b)});return k};f.multipleValues={};f.merge=function(c,k){if(1===arguments.length)return Array.isArray(c)?c.reduce(f.merge):c;if(2<arguments.length)return f.merge(Array.prototype.slice.call(arguments,0));var e={};f.formattingKeys.forEach(function(b){if(b in c||b in k)e[b]=c[b]===k[b]?c[b]:f.multipleValues});return e};f.format=function(c,k){Array.isArray(c)?c.forEach(function(c){f.format(c,k)}):Object.keys(k).forEach(function(e){k[e]!==f.multipleValues&&(c[e]=k[e])})};
f.consolidate=function(){var c;return function(k,e){c&&f.sameFormatting(c,e)&&"string"==typeof c.text&&"string"==typeof e.text?c.text+=e.text:(c=f.clone(e),k(c))}};f.getPlainText=function(c){if("string"===typeof c.text)return c.text;if(Array.isArray(c.text)){var k=[];c.text.forEach(function(c){k.push(f.getPiecePlainText(c))});return k.join("")}return"_"};f.getPieceLength=function(c){return c.length||1};f.getPiecePlainText=function(c){return c.length?c:"_"};f.getTextLength=function(c){if("string"===
typeof c)return c.length;if(Array.isArray(c)){var k=0;c.forEach(function(c){k+=f.getPieceLength(c)});return k}return 1};f.getSubText=function(c,k,e,b){if(0!==b)if("string"===typeof k)c(k.substr(e,b));else if(Array.isArray(k)){var d=0;k.some(function(a){if(0>=b)return!0;var k=f.getPieceLength(a);d+k>e&&(1===k?(c(a),--b):(a=a.substr(Math.max(0,e-d),b),c(a),b-=a.length));d+=k})}else c(k)};f.getTextChar=function(c,k){var e;f.getSubText(function(b){e=b},c,k,1);return e};f.pieceCharacters=function(c,f){if("string"===
typeof f)for(var e=0;e<f.length;e++)c(f[e]);else c(f)}},"split.js":function(f,l,g){l.exports=function(c){var f=null,e=null,b=!0;return function(d,a){var g;if(null===a["char"])g=!0;else if(b&&(g=!0,b=!1),"string"===typeof a["char"])switch(a["char"]){case " ":e||(e=a);break;case "\n":b=g=!0;break;default:e&&(g=!0)}else{var q=c(a["char"]);if(q.block||q.eof)b=g=!0}if(g){if(f&&!f.equals(a)){if(!1===d({text:f,spaces:e||a,end:a}))return!1;e=null}null===a["char"]&&d(null);f=a}}}},"text.js":function(f,l,g){var c=
g("./runs"),k=f.getFontString=function(b){var a=b&&b.size||c.defaultFormatting.size;if(b)switch(b.script){case "super":case "sub":a*=.8}return(b&&b.italic?"italic ":"")+(b&&b.bold?"bold ":"")+" "+a+"pt "+(b&&b.font||c.defaultFormatting.font)};f.applyRunStyle=function(b,a){b.fillStyle=a&&a.color&&a.color[0]||c.defaultFormatting.color[0];b.font=k(a)};f.prepareContext=function(b){b.textAlign="left";b.textBaseline="alphabetic"};f.getRunStyle=function(b){var a=["font: ",k(b),"; color: ",b&&b.color&&b.color[0]||
c.defaultFormatting.color[0]];if(b)switch(b.script){case "super":a.push("; vertical-align: super");break;case "sub":a.push("; vertical-align: sub")}return a.join("")};var e=f.nbsp=String.fromCharCode(160);f.enter=e;var b=f.measureText=function(b,a){var c,f,g;c=document.createElement("span");f=document.createElement("div");g=document.createElement("div");f.style.display="inline-block";f.style.width="1px";f.style.height="0";g.style.visibility="hidden";g.style.position="absolute";g.style.top="0";g.style.left=
"0";g.style.width="500px";g.style.height="200px";g.appendChild(c);g.appendChild(f);document.body.appendChild(g);try{c.setAttribute("style",a);c.innerHTML="";c.appendChild(document.createTextNode(b.replace(/\s/g,e)));var h={};f.style.verticalAlign="baseline";h.ascent=f.offsetTop-c.offsetTop;f.style.verticalAlign="bottom";h.height=f.offsetTop-c.offsetTop;h.descent=h.height-h.ascent;h.width=c.offsetWidth}finally{g.parentNode.removeChild(g)}return h};l=f.createCachedMeasureText=function(){var c={};return function(a,
e){var f=e+"<>!&%"+a,g=c[f];g||(c[f]=g=b(a,e));return g}};f.cachedMeasureText=l();f.measure=function(b,a){return f.cachedMeasureText(b,f.getRunStyle(a))};f.draw=function(b,a,c,e,g,h,k,l){f.prepareContext(b);f.applyRunStyle(b,c);switch(c.script){case "super":g-=1/3*k;break;case "sub":g+=l/2}b.fillText("\n"===a?f.enter:a,e,g);c.underline&&b.fillRect(e,1+g,h,1);c.strikeout&&b.fillRect(e,1+g-k/2,h,1)}},"util.js":function(f,l,g){f.event=function(){var c=[],f=function(e){c.push(e)};f.fire=function(){var e=
Array.prototype.slice.call(arguments,0);c.forEach(function(b){b.apply(null,e)})};return f};f.derive=function(c,f){var e={};Object.keys(f).forEach(function(b){e[b]={value:f[b]}});return Object.create(c,e)}},"word.js":function(f,l,g){var c=g("per"),k=g("./part"),e=g("./runs"),b={isNewLine:function(){return 1==this.text.parts.length&&this.text.parts[0].isNewLine},code:function(){return 1==this.text.parts.length&&this.text.parts[0].code},codeFormatting:function(){return 1==this.text.parts.length&&this.text.parts[0].run},
draw:function(a,b,d){c(this.text.parts).concat(this.space.parts).forEach(function(c){c.draw(a,b,d);b+=c.width})},plainText:function(){return this.text.plainText+this.space.plainText},align:function(){var a=this.text.parts[0];return a?a.run.align:"left"},runs:function(a,b){var c=b&&b.start||0,d=b&&b.end;"number"!==typeof d&&(d=Number.MAX_VALUE);[this.text,this.space].forEach(function(b){b.parts.some(function(b){if(c>=d||0>=d)return!0;var e=b.run;b=e.text;if("string"===typeof b){if(0>=c&&d>=b.length)a(e);
else if(c<b.length){var e=Object.create(e),f=Math.max(0,c);e.text=b.substr(f,Math.min(b.length,d-f));a(e)}c-=b.length;d-=b.length}else 0>=c&&1<=d&&a(e),c--,d--})})}},d=function(a,b){var d={parts:c(a).map(function(a){return k(a,b)}).all(),ascent:0,descent:0,width:0,length:0,plainText:""};d.parts.forEach(function(a){d.ascent=Math.max(d.ascent,a.ascent);d.descent=Math.max(d.descent,a.descent);d.width+=a.width;d.length+=e.getPieceLength(a.run.text);d.plainText+=e.getPiecePlainText(a.run.text)});return d};
l.exports=function(a,c){var e,f;a?(e=a.text.cut(a.spaces),f=a.spaces.cut(a.end)):(e=[{text:"\n"}],f=[]);e=d(e,c);f=d(f,c);e=Object.create(b,{text:{value:e},space:{value:f},ascent:{value:Math.max(e.ascent,f.ascent)},descent:{value:Math.max(e.descent,f.descent)},width:{value:e.width+f.width,configurable:!0},length:{value:e.length+f.length}});a||Object.defineProperty(e,"eof",{value:!0});return e}},"wrap.js":function(f,l,g){var c=g("./line");l.exports=function(f,e,b,d,a,g,l,r){var h=[],v=0,m=l||0,t=r||
0,u,w=0,p=e,y=function(a,b){h.push(a);v+=a.width;m=Math.max(m,a.ascent);t=Math.max(t,a.descent);a.isNewLine()&&(x(b),w=a.ascent+a.descent)},x=function(e){if(!u&&0!==h.length){var g=c(a,f,b,p+m,m,t,h,d);d+=g.length;u=e(g);p+=m+t;v=m=t=h.length=0}},A=null;return function(c,l){if(A){w=0;var m=A(l);m&&(A=null,d+=m.length,p+=m.bounds().h,Object.defineProperty(m,"block",{value:!0}),c(m))}else(m=l.code())&&m.block?(h.length?x(c):p+=w,A=m.block(f,p,b,d,a,l.codeFormatting()),w=0):m&&m.eof||l.eof?((!m||g&&
g(m))&&y(l,c),h.length?(x(c),c(p-e)):c(p+w-e),u=!0):(w=0,h.length&&v+l.text.width>b&&x(c),y(l,c));return u}}}}},per:{":mainpath:":"per.js","per.js":function(f,l,g){(function(c){function f(a,b){return"function"!==typeof a?Array.isArray(a)?function(b){return a.some(b)}:function(b){return b(a)}:b?function(c,d){a.call(b,c,d)}:a}function e(a,b){this.forEach=f(a,b)}function b(a,b){a(b)}function d(a,c){return 0===arguments.length?new e(b):a&&a instanceof e?a:new e(a,c)}function a(a){return"string"===typeof a?
new Function("x","return "+a):a}function g(a,b){var c=a[b];return"function"===typeof c?c:function(c){a[b]=c}}function l(){}function r(a){return!!a}function h(a,b){return Math.min(a,b)}function v(a,b){return Math.max(a,b)}function m(a,b){return a+b}function t(a,b){return!(!a||!b)}function u(a,b){return!(!a&&!b)}function w(a){return!a}e.prototype.per=function(a,b){var c=this.forEach,e=f(a&&a.forEach||a,b);return d(function(a,b){return c(function(b){return e(a,b)},b)})};e.prototype.map=function(b){b=
a(b);return this.per(function(a,c){return a(b(c))})};e.prototype.filter=function(b){b=a(b);return this.per(function(a,c){if(b(c))return a(c)})};e.prototype.concat=function(a,b){a=a instanceof e?a.forEach:f(a,b);var c=this.forEach;return d(function(b,d){c(b,d);a(b,d)})};e.prototype.skip=function(a){return this.per(function(b,c){return 0<a?(a--,!1):b(c)})};e.prototype.take=function(a){return this.per(function(b,c){if(0>=a)return!0;a--;return b(c)})};e.prototype.listen=function(a){return this.per(function(b,
c){return a(c)?!0:b(c)})};e.prototype.flatten=function(){return this.per(function(a,b){return Array.isArray(b)?b.some(function(b){return a(b)}):a(b)})};e.prototype.reduce=function(a,b){var c=b,d=2==arguments.length;return this.per(function(b,e){c=d?a(c,e):e;b(c);d=!0})};e.prototype.multicast=function(a){1!==arguments.length&&(a=Array.prototype.slice.call(arguments,0));a=a.map(function(a){return"function"===typeof a?a:a instanceof e?a.forEach:l});return this.listen(function(b){var c=!0;a.forEach(function(a){a(l,
b)||(c=!1)});return c})};e.prototype.into=function(a,b){if(!Array.isArray(a))throw Error("into expects an array");b="number"!=typeof b?Number.MAX_VALUE:b;return this.listen(function(c){if(0>=b)return!0;a.push(c);b--})};e.prototype.monitor=function(a){var b=0,c=g(a,"count"),d=g(a,"first"),e=g(a,"last"),f=a.limit;"number"!=typeof f&&(f=Number.MAX_VALUE);return 1>f?this:this.listen(function(a){0===b&&d(a);b++;c(b);e(a);if(b>=f)return!0})};e.prototype.submit=function(a){return this.forEach(l,a)};e.prototype.all=
function(){var a=[];this.into(a).submit();return a};e.prototype.first=function(){var a={limit:1};this.monitor(a).submit();return 0<a.count?a.first:void 0};e.prototype.last=function(){var a={};this.monitor(a).submit();return 0<a.count?a.last:void 0};e.prototype.truthy=function(){return this.filter(r)};e.prototype.min=function(){return this.reduce(h,Number.MAX_VALUE)};e.prototype.max=function(){return this.reduce(v,Number.MIN_VALUE)};e.prototype.sum=function(){return this.reduce(m,0)};e.prototype.and=
function(){return this.reduce(t,!0)};e.prototype.or=function(){return this.reduce(u,!1)};e.prototype.not=function(){return this.map(w)};d.pulse=function(a){var b=0;return d(function(c){function d(){!0!==c(b++)&&setTimeout(d,a)}d()})};c(d)})(function(c){"undefined"===typeof f?this.per=c:l.exports=c})}}})("carota/src/carota")})();
