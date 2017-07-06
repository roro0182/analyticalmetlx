var Enterprise=function(){var y=function(b){b=_.clone(b);b.timestamp=864E5*Math.floor(b.timestamp/864E5);return b},B=function(b){b=_.groupBy(b,function(b){return y(b).timestamp});for(var h=_.map(_.keys(b),function(b){return parseInt(b)}),e=_.min(h),h=_.max(h);e<h;e+=864E5)e in b||(b[e]=[]);return _.sortBy(_.toPairs(b),function(b){return b[0]})},x=function(b){function h(a){return(d3.timeSecond(a)<a?x:d3.timeMinute(a)<a?C:d3.timeHour(a)<a?D:d3.timeDay(a)<a?E:d3.timeMonth(a)<a?d3.timeWeek(a)<a?F:G:d3.timeYear(a)<
a?H:I)(a)}$("#vis").empty();var e=$("#vis").width()-35-25,c=[35,e-25],p=d3.scaleTime().range(c),f=d3.scaleTime().range(c),q=d3.scaleBand().range(c).padding(.1).align(0),l=d3.scaleLinear().range([10,275]),r=d3.scaleLinear().range([150,15]),t=d3.scaleLinear().range([150,15]),z=d3.scaleLinear().range([0,35]),c=_.groupBy(b,function(a){return parseInt(a.timestamp)>(new Date(2016,6,15)).getTime()}),u=_.keys(_.groupBy(c[!1],"parameters")).length;b=c[!0];var c=_.groupBy(b,"parameters"),c=_.flatMap(c,function(a){a=
_.map(a,y);return[{timestamp:a[0].timestamp,creation:[a[0]],update:[]}].concat(_.map(a.slice(1),function(a){return{timestamp:a.timestamp,creation:[],update:[a]}}))}),d=_.reduce(c,function(a,b){var c=b.timestamp;c in a||(a[c]={timestamp:c,creation:0,update:0});c=a[c];c.creation+=b.creation.length;c.update+=b.update.length;return a},{}),m=d3.stack().keys(["creation","update"])(_.values(d)),c=_.sortBy(_.toPairs(_.reduce(c,function(a,b){var c=b.timestamp;a.total+=b.creation.length;a[c]={timestamp:c,conversations:a.total};
return a},{total:0})),"0"),d=_.sortBy(_.map(d,"timestamp")),d=d3.extent(d);p.domain(d);f.domain(d);var k=B(b);r.domain([0,_.max(k.map(function(a){return a[1].length}))]);d=_.takeRight(c,1)[0][1];c=_.dropRight(c,1);t.domain([u,d+u]);l.domain([_.max(_.map(k,function(a){return a[1].length})),0]);d=_.map(k,function(a){return _.uniq(_.map(a[1],"author"))});d=_.map(d,"length");z.domain(d3.extent(d));b=d3.select("#ep").selectAll(".authorLine").data(_.sortBy(_.toPairs(_.groupBy(b,"author")),function(a){return a[1].length}).reverse()).enter().append("tr").attr("class",
"authorLine").attr("y",function(a,b){return 25*b});b.append("th").text(function(a){return a[0]});b.append("td").text(function(a){return a[1].length});b=b.append("td").append("svg:svg").attr("width",e+35+25).attr("height",20).append("g").attr("transform","translate(10,0)");b.selectAll(".span").data(function(a){return[_.map(a[1],function(a){return parseInt(a.timestamp)})]}).enter().append("rect").attr("class","span").attr("width",function(a){console.log(a);return f(_.max(a))-f(_.min(a))}).attr("height",
3).attr("x",function(a){return f(_.min(a))}).attr("y",8);b.selectAll(".circ").data(function(a){return a[1]}).enter().append("circle").attr("class","circ").attr("cx",function(a){return f(a.timestamp)}).attr("cy",9).attr("r",6);var x=d3.timeFormat(".%L"),C=d3.timeFormat(":%S"),D=d3.timeFormat("%I:%M"),E=d3.timeFormat("%I %p"),F=d3.timeFormat("%a %d"),G=d3.timeFormat("%b %d"),H=d3.timeFormat("%b"),I=d3.timeFormat("%Y"),A=d3.axisBottom(p).tickSize(-300,0).tickFormat(h),w=d3.axisLeft(l).tickSizeInner(-e);
b=d3.axisBottom(f).tickFormat(h);var d=d3.axisLeft(r).tickSizeInner(0),g=d3.select("#vis").append("svg").attr("width",e+35+25).attr("height",485).append("g").attr("class","context").attr("transform","translate(35,10)"),n=g.append("g"),J=d3.brushX().on("brush",function(){p.domain(d3.event.selection.map(f.invert,f));var a=p.domain();q.domain(_.filter(_.map(k,"0"),function(b){return b>=a[0]-432E5&&b<=a[1]+432E5}));n.select(".x.axis").call(A);d3.selectAll(".tick").selectAll("text").call(function(a){console.log("tick",
a)}).attr("y",9);n.selectAll("rect").attr("x",function(a){return a.data.timestamp}).attr("y",function(a){return l(a[1])+10}).attr("width",q.bandwidth())});q.domain(_.map(k,"0"));var v=d3.scaleOrdinal(d3.schemeCategory10);n.append("g").selectAll("serie").data(m).enter().append("g").attr("class","serie").attr("fill",function(a,b){return v(b)}).selectAll("rect").data(function(a){return a}).enter().append("rect").attr("x",function(a){return p(a.data.timestamp)-q.bandwidth()/2}).attr("y",function(a){return l(a[1])+
10}).attr("height",function(a){return l(a[0])-l(a[1])}).attr("width",q.bandwidth());n.append("g").attr("class","x axis").attr("transform","translate(35,295)").call(A);n.append("g").attr("class","y axis").attr("transform","translate(35,10)").call(w);m=n.append("g").attr("class","detailLegend").attr("transform","translate(50,20)").selectAll(".legendLine").data([{text:"New conversations",color:v(0)},{text:"Conversation edits",color:v(1)},{text:"Total conversations",color:v(2)},{text:"Total activity",
color:"blue"}]).enter().append("g").attr("class","legendLine").attr("transform",function(a,b){return"translate(0,"+35*b+")"});m.append("rect").attr("height",30).attr("width",30).attr("fill",function(a){return a.color});m.append("text").text(function(a){return a.text}).attr("x",35).attr("y",20);var m=d3.area().x(function(a){return f(a[0])}).y0(r(0)).y1(function(a){return r(a[1].length)}),w=d3.axisRight(t),K=d3.area().x(function(a){return f(a[0])}).y0(t(u)).y1(function(a){return t(u+a[1].conversations)}),
g=g.append("g");g.attr("transform","translate(0,300)");g.append("g").attr("transform","translate(35,150)").call(b);g.append("g").attr("class","totalsArea").append("path").attr("d",K(c));g.append("g").attr("class","masterArea").call(J).append("path").attr("d",m(k));g.append("g").attr("class","teachers").selectAll(".circ").data(k).enter().append("circle").attr("class","circ").attr("cx",function(a){return f(a[0])}).attr("cy",function(a){return r(a[1].length)}).attr("r",function(a){return z(_.uniq(_.map(a[1],
"author")).length)});g.append("g").attr("transform","translate(35,0)").call(d);g.append("g").attr("transform","translate("+(e-25)+",0)").call(w);e=g.append("g").attr("transform","translate(50,20)").selectAll(".legendLine").data([{text:"Distinct authors","class":"circ"}]).enter().append("g").attr("transform",function(a,b){return"translate(0,"+35*b+")"});e.append("circle").attr("class","circ").attr("cx",15).attr("cy",15).attr("r",15);e.append("text").text(function(a){return a.text}).attr("class","legendLine").attr("x",
35).attr("y",20)};return{prime:function(){$.get("/fullJsonHistory?source=global",function(b){b=b.commands.map(function(b){return{timestamp:b.timestamp,author:b.author,command:b.command,parameters:b.parameters}});b=_.filter(b,function(b){return"/UPDATE_CONVERSATION_DETAILS"==b.command});_.uniq(_.map(b,"author"));x(b)})}}}();$(Enterprise.prime);
