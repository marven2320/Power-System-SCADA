var Prototype={Version:"1.6.0.3",Browser:{IE:!!(window.attachEvent&&navigator.userAgent.indexOf("Opera")===-1),Opera:navigator.userAgent.indexOf("Opera")>-1,WebKit:navigator.userAgent.indexOf("AppleWebKit/")>-1,Gecko:navigator.userAgent.indexOf("Gecko")>-1&&navigator.userAgent.indexOf("KHTML")===-1,MobileSafari:!!navigator.userAgent.match(/Apple.*Mobile.*Safari/)},BrowserFeatures:{XPath:!!document.evaluate,SelectorsAPI:!!document.querySelector,ElementExtensions:!!window.HTMLElement,SpecificElementExtensions:document.createElement("div")["__proto__"]&&document.createElement("div")["__proto__"]!==document.createElement("form")["__proto__"]},ScriptFragment:"<script[^>]*>([\\S\\s]*?)<\/script>",JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,emptyFunction:function(){},K:function(A){return A
}};
if(Prototype.Browser.MobileSafari){Prototype.BrowserFeatures.SpecificElementExtensions=false
}var Class={create:function(){var E=null,D=$A(arguments);
if(Object.isFunction(D[0])){E=D.shift()
}function A(){this.initialize.apply(this,arguments)
}Object.extend(A,Class.Methods);
A.superclass=E;
A.subclasses=[];
if(E){var B=function(){};
B.prototype=E.prototype;
A.prototype=new B;
E.subclasses.push(A)
}for(var C=0;
C<D.length;
C++){A.addMethods(D[C])
}if(!A.prototype.initialize){A.prototype.initialize=Prototype.emptyFunction
}A.prototype.constructor=A;
return A
}};
Class.Methods={addMethods:function(G){var C=this.superclass&&this.superclass.prototype;
var B=Object.keys(G);
if(!Object.keys({toString:true}).length){B.push("toString","valueOf")
}for(var A=0,D=B.length;
A<D;
A++){var F=B[A],E=G[F];
if(C&&Object.isFunction(E)&&E.argumentNames().first()=="$super"){var H=E;
E=(function(I){return function(){return C[I].apply(this,arguments)
}
})(F).wrap(H);
E.valueOf=H.valueOf.bind(H);
E.toString=H.toString.bind(H)
}this.prototype[F]=E
}return this
}};
var Abstract={};
Object.extend=function(A,C){for(var B in C){A[B]=C[B]
}return A
};
Object.extend(Object,{inspect:function(A){try{if(Object.isUndefined(A)){return"undefined"
}if(A===null){return"null"
}return A.inspect?A.inspect():String(A)
}catch(B){if(B instanceof RangeError){return"..."
}throw B
}},toJSON:function(A){var C=typeof A;
switch(C){case"undefined":case"function":case"unknown":return ;
case"boolean":return A.toString()
}if(A===null){return"null"
}if(A.toJSON){return A.toJSON()
}if(Object.isElement(A)){return 
}var B=[];
for(var E in A){var D=Object.toJSON(A[E]);
if(!Object.isUndefined(D)){B.push(E.toJSON()+": "+D)
}}return"{"+B.join(", ")+"}"
},toQueryString:function(A){return $H(A).toQueryString()
},toHTML:function(A){return A&&A.toHTML?A.toHTML():String.interpret(A)
},keys:function(A){var B=[];
for(var C in A){B.push(C)
}return B
},values:function(B){var A=[];
for(var C in B){A.push(B[C])
}return A
},clone:function(A){return Object.extend({},A)
},isElement:function(A){return !!(A&&A.nodeType==1)
},isArray:function(A){return A!=null&&typeof A=="object"&&"splice" in A&&"join" in A
},isHash:function(A){return A instanceof Hash
},isFunction:function(A){return typeof A=="function"
},isString:function(A){return typeof A=="string"
},isNumber:function(A){return typeof A=="number"
},isUndefined:function(A){return typeof A=="undefined"
}});
Object.extend(Function.prototype,{argumentNames:function(){var A=this.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g,"").split(",");
return A.length==1&&!A[0]?[]:A
},bind:function(){if(arguments.length<2&&Object.isUndefined(arguments[0])){return this
}var A=this,C=$A(arguments),B=C.shift();
return function(){return A.apply(B,C.concat($A(arguments)))
}
},bindAsEventListener:function(){var A=this,C=$A(arguments),B=C.shift();
return function(D){return A.apply(B,[D||window.event].concat(C))
}
},curry:function(){if(!arguments.length){return this
}var A=this,B=$A(arguments);
return function(){return A.apply(this,B.concat($A(arguments)))
}
},delay:function(){var A=this,B=$A(arguments),C=B.shift()*1000;
return window.setTimeout(function(){return A.apply(A,B)
},C)
},defer:function(){var A=[0.01].concat($A(arguments));
return this.delay.apply(this,A)
},wrap:function(B){var A=this;
return function(){return B.apply(this,[A.bind(this)].concat($A(arguments)))
}
},methodize:function(){if(this._methodized){return this._methodized
}var A=this;
return this._methodized=function(){return A.apply(null,[this].concat($A(arguments)))
}
}});
Date.prototype.toJSON=function(){return'"'+this.getUTCFullYear()+"-"+(this.getUTCMonth()+1).toPaddedString(2)+"-"+this.getUTCDate().toPaddedString(2)+"T"+this.getUTCHours().toPaddedString(2)+":"+this.getUTCMinutes().toPaddedString(2)+":"+this.getUTCSeconds().toPaddedString(2)+'Z"'
};
var Try={these:function(){var C;
for(var B=0,D=arguments.length;
B<D;
B++){var A=arguments[B];
try{C=A();
break
}catch(E){}}return C
}};
RegExp.prototype.match=RegExp.prototype.test;
RegExp.escape=function(A){return String(A).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")
};
var PeriodicalExecuter=Class.create({initialize:function(B,A){this.callback=B;
this.frequency=A;
this.currentlyExecuting=false;
this.registerCallback()
},registerCallback:function(){this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000)
},execute:function(){this.callback(this)
},stop:function(){if(!this.timer){return 
}clearInterval(this.timer);
this.timer=null
},onTimerEvent:function(){if(!this.currentlyExecuting){try{this.currentlyExecuting=true;
this.execute()
}finally{this.currentlyExecuting=false
}}}});
Object.extend(String,{interpret:function(A){return A==null?"":String(A)
},specialChar:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\\":"\\\\"}});
Object.extend(String.prototype,{gsub:function(E,C){var A="",D=this,B;
C=arguments.callee.prepareReplacement(C);
while(D.length>0){if(B=D.match(E)){A+=D.slice(0,B.index);
A+=String.interpret(C(B));
D=D.slice(B.index+B[0].length)
}else{A+=D,D=""
}}return A
},sub:function(C,A,B){A=this.gsub.prepareReplacement(A);
B=Object.isUndefined(B)?1:B;
return this.gsub(C,function(D){if(--B<0){return D[0]
}return A(D)
})
},scan:function(B,A){this.gsub(B,A);
return String(this)
},truncate:function(B,A){B=B||30;
A=Object.isUndefined(A)?"...":A;
return this.length>B?this.slice(0,B-A.length)+A:String(this)
},strip:function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")
},stripTags:function(){return this.replace(/<\/?[^>]+>/gi,"")
},stripScripts:function(){return this.replace(new RegExp(Prototype.ScriptFragment,"img"),"")
},extractScripts:function(){var B=new RegExp(Prototype.ScriptFragment,"img");
var A=new RegExp(Prototype.ScriptFragment,"im");
return(this.match(B)||[]).map(function(D){var C=(D.match(A)||["",""])[1];
C=C.replace(/</,"&lt;").replace(/\s*&lt;!--[^\r\n]*/,"");
return C
})
},evalScripts:function(){return this.extractScripts().map(function(script){return eval(script)
})
},escapeHTML:function(){var A=arguments.callee;
A.text.data=this;
return A.div.innerHTML
},unescapeHTML:function(){var A=new Element("div");
A.innerHTML=this.stripTags();
return A.childNodes[0]?(A.childNodes.length>1?$A(A.childNodes).inject("",function(B,C){return B+C.nodeValue
}):A.childNodes[0].nodeValue):""
},toQueryParams:function(B){var A=this.strip().match(/([^?#]*)(#.*)?$/);
if(!A){return{}
}return A[1].split(B||"&").inject({},function(E,F){if((F=F.split("="))[0]){var C=decodeURIComponent(F.shift());
var D=F.length>1?F.join("="):F[0];
if(D!=undefined){D=decodeURIComponent(D)
}if(C in E){if(!Object.isArray(E[C])){E[C]=[E[C]]
}E[C].push(D)
}else{E[C]=D
}}return E
})
},toArray:function(){return this.split("")
},succ:function(){return this.slice(0,this.length-1)+String.fromCharCode(this.charCodeAt(this.length-1)+1)
},times:function(A){return A<1?"":new Array(A+1).join(this)
},camelize:function(){var D=this.split("-"),A=D.length;
if(A==1){return D[0]
}var C=this.charAt(0)=="-"?D[0].charAt(0).toUpperCase()+D[0].substring(1):D[0];
for(var B=1;
B<A;
B++){C+=D[B].charAt(0).toUpperCase()+D[B].substring(1)
}return C
},capitalize:function(){return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase()
},underscore:function(){return this.gsub(/::/,"/").gsub(/([A-Z]+)([A-Z][a-z])/,"#{1}_#{2}").gsub(/([a-z\d])([A-Z])/,"#{1}_#{2}").gsub(/-/,"_").toLowerCase()
},dasherize:function(){return this.gsub(/_/,"-")
},inspect:function(B){var A=this.gsub(/[\x00-\x1f\\]/,function(C){var D=String.specialChar[C[0]];
return D?D:"\\u00"+C[0].charCodeAt().toPaddedString(2,16)
});
if(B){return'"'+A.replace(/"/g,'\\"')+'"'
}return"'"+A.replace(/'/g,"\\'")+"'"
},toJSON:function(){return this.inspect(true)
},unfilterJSON:function(A){return this.sub(A||Prototype.JSONFilter,"#{1}")
},isJSON:function(){var A=this;
if(A.blank()){return false
}A=this.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,"");
return(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(A)
},evalJSON:function(sanitize){var json=this.unfilterJSON();
try{if(!sanitize||json.isJSON()){return eval("("+json+")")
}}catch(e){}throw new SyntaxError("Badly formed JSON string: "+this.inspect())
},include:function(A){return this.indexOf(A)>-1
},startsWith:function(A){return this.indexOf(A)===0
},endsWith:function(A){var B=this.length-A.length;
return B>=0&&this.lastIndexOf(A)===B
},empty:function(){return this==""
},blank:function(){return/^\s*$/.test(this)
},interpolate:function(A,B){return new Template(this,B).evaluate(A)
}});
if(Prototype.Browser.WebKit||Prototype.Browser.IE){Object.extend(String.prototype,{escapeHTML:function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
},unescapeHTML:function(){return this.stripTags().replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")
}})
}String.prototype.gsub.prepareReplacement=function(B){if(Object.isFunction(B)){return B
}var A=new Template(B);
return function(C){return A.evaluate(C)
}
};
String.prototype.parseQuery=String.prototype.toQueryParams;
Object.extend(String.prototype.escapeHTML,{div:document.createElement("div"),text:document.createTextNode("")});
String.prototype.escapeHTML.div.appendChild(String.prototype.escapeHTML.text);
var Template=Class.create({initialize:function(A,B){this.template=A.toString();
this.pattern=B||Template.Pattern
},evaluate:function(A){if(Object.isFunction(A.toTemplateReplacements)){A=A.toTemplateReplacements()
}return this.template.gsub(this.pattern,function(D){if(A==null){return""
}var F=D[1]||"";
if(F=="\\"){return D[2]
}var B=A,G=D[3];
var E=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
D=E.exec(G);
if(D==null){return F
}while(D!=null){var C=D[1].startsWith("[")?D[2].gsub("\\\\]","]"):D[1];
B=B[C];
if(null==B||""==D[3]){break
}G=G.substring("["==D[3]?D[1].length:D[0].length);
D=E.exec(G)
}return F+String.interpret(B)
})
}});
Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;
var $break={};
var Enumerable={each:function(C,B){var A=0;
try{this._each(function(E){C.call(B,E,A++)
})
}catch(D){if(D!=$break){throw D
}}return this
},eachSlice:function(D,C,B){var A=-D,E=[],F=this.toArray();
if(D<1){return F
}while((A+=D)<F.length){E.push(F.slice(A,A+D))
}return E.collect(C,B)
},all:function(C,B){C=C||Prototype.K;
var A=true;
this.each(function(E,D){A=A&&!!C.call(B,E,D);
if(!A){throw $break
}});
return A
},any:function(C,B){C=C||Prototype.K;
var A=false;
this.each(function(E,D){if(A=!!C.call(B,E,D)){throw $break
}});
return A
},collect:function(C,B){C=C||Prototype.K;
var A=[];
this.each(function(E,D){A.push(C.call(B,E,D))
});
return A
},detect:function(C,B){var A;
this.each(function(E,D){if(C.call(B,E,D)){A=E;
throw $break
}});
return A
},findAll:function(C,B){var A=[];
this.each(function(E,D){if(C.call(B,E,D)){A.push(E)
}});
return A
},grep:function(D,C,B){C=C||Prototype.K;
var A=[];
if(Object.isString(D)){D=new RegExp(D)
}this.each(function(F,E){if(D.match(F)){A.push(C.call(B,F,E))
}});
return A
},include:function(A){if(Object.isFunction(this.indexOf)){if(this.indexOf(A)!=-1){return true
}}var B=false;
this.each(function(C){if(C==A){B=true;
throw $break
}});
return B
},inGroupsOf:function(B,A){A=Object.isUndefined(A)?null:A;
return this.eachSlice(B,function(C){while(C.length<B){C.push(A)
}return C
})
},inject:function(A,C,B){this.each(function(E,D){A=C.call(B,A,E,D)
});
return A
},invoke:function(B){var A=$A(arguments).slice(1);
return this.map(function(C){return C[B].apply(C,A)
})
},max:function(C,B){C=C||Prototype.K;
var A;
this.each(function(E,D){E=C.call(B,E,D);
if(A==null||E>=A){A=E
}});
return A
},min:function(C,B){C=C||Prototype.K;
var A;
this.each(function(E,D){E=C.call(B,E,D);
if(A==null||E<A){A=E
}});
return A
},partition:function(D,B){D=D||Prototype.K;
var C=[],A=[];
this.each(function(F,E){(D.call(B,F,E)?C:A).push(F)
});
return[C,A]
},pluck:function(B){var A=[];
this.each(function(C){A.push(C[B])
});
return A
},reject:function(C,B){var A=[];
this.each(function(E,D){if(!C.call(B,E,D)){A.push(E)
}});
return A
},sortBy:function(B,A){return this.map(function(D,C){return{value:D,criteria:B.call(A,D,C)}
}).sort(function(F,E){var D=F.criteria,C=E.criteria;
return D<C?-1:D>C?1:0
}).pluck("value")
},toArray:function(){return this.map()
},zip:function(){var B=Prototype.K,A=$A(arguments);
if(Object.isFunction(A.last())){B=A.pop()
}var C=[this].concat(A).map($A);
return this.map(function(E,D){return B(C.pluck(D))
})
},size:function(){return this.toArray().length
},inspect:function(){return"#<Enumerable:"+this.toArray().inspect()+">"
}};
Object.extend(Enumerable,{map:Enumerable.collect,find:Enumerable.detect,select:Enumerable.findAll,filter:Enumerable.findAll,member:Enumerable.include,entries:Enumerable.toArray,every:Enumerable.all,some:Enumerable.any});
function $A(C){if(!C){return[]
}if(C.toArray){return C.toArray()
}var B=C.length||0,A=new Array(B);
while(B--){A[B]=C[B]
}return A
}if(Prototype.Browser.WebKit){$A=function(C){if(!C){return[]
}if(!(typeof C==="function"&&typeof C.length==="number"&&typeof C.item==="function")&&C.toArray){return C.toArray()
}var B=C.length||0,A=new Array(B);
while(B--){A[B]=C[B]
}return A
}
}Array.from=$A;
Object.extend(Array.prototype,Enumerable);
if(!Array.prototype._reverse){Array.prototype._reverse=Array.prototype.reverse
}Object.extend(Array.prototype,{_each:function(B){for(var A=0,C=this.length;
A<C;
A++){B(this[A])
}},clear:function(){this.length=0;
return this
},first:function(){return this[0]
},last:function(){return this[this.length-1]
},compact:function(){return this.select(function(A){return A!=null
})
},flatten:function(){return this.inject([],function(B,A){return B.concat(Object.isArray(A)?A.flatten():[A])
})
},without:function(){var A=$A(arguments);
return this.select(function(B){return !A.include(B)
})
},reverse:function(A){return(A!==false?this:this.toArray())._reverse()
},reduce:function(){return this.length>1?this:this[0]
},uniq:function(A){return this.inject([],function(D,C,B){if(0==B||(A?D.last()!=C:!D.include(C))){D.push(C)
}return D
})
},intersect:function(A){return this.uniq().findAll(function(B){return A.detect(function(C){return B===C
})
})
},clone:function(){return[].concat(this)
},size:function(){return this.length
},inspect:function(){return"["+this.map(Object.inspect).join(", ")+"]"
},toJSON:function(){var A=[];
this.each(function(B){var C=Object.toJSON(B);
if(!Object.isUndefined(C)){A.push(C)
}});
return"["+A.join(", ")+"]"
}});
if(Object.isFunction(Array.prototype.forEach)){Array.prototype._each=Array.prototype.forEach
}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(C,A){A||(A=0);
var B=this.length;
if(A<0){A=B+A
}for(;
A<B;
A++){if(this[A]===C){return A
}}return -1
}
}if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=function(B,A){A=isNaN(A)?this.length:(A<0?this.length+A:A)+1;
var C=this.slice(0,A).reverse().indexOf(B);
return(C<0)?C:A-C-1
}
}Array.prototype.toArray=Array.prototype.clone;
function $w(A){if(!Object.isString(A)){return[]
}A=A.strip();
return A?A.split(/\s+/):[]
}if(Prototype.Browser.Opera){Array.prototype.concat=function(){var E=[];
for(var B=0,C=this.length;
B<C;
B++){E.push(this[B])
}for(var B=0,C=arguments.length;
B<C;
B++){if(Object.isArray(arguments[B])){for(var A=0,D=arguments[B].length;
A<D;
A++){E.push(arguments[B][A])
}}else{E.push(arguments[B])
}}return E
}
}Object.extend(Number.prototype,{toColorPart:function(){return this.toPaddedString(2,16)
},succ:function(){return this+1
},times:function(B,A){$R(0,this,true).each(B,A);
return this
},toPaddedString:function(C,B){var A=this.toString(B||10);
return"0".times(C-A.length)+A
},toJSON:function(){return isFinite(this)?this.toString():"null"
}});
$w("abs round ceil floor").each(function(A){Number.prototype[A]=Math[A].methodize()
});
function $H(A){return new Hash(A)
}var Hash=Class.create(Enumerable,(function(){function A(B,C){if(Object.isUndefined(C)){return B
}return B+"="+encodeURIComponent(String.interpret(C))
}return{initialize:function(B){this._object=Object.isHash(B)?B.toObject():Object.clone(B)
},_each:function(C){for(var B in this._object){var D=this._object[B],E=[B,D];
E.key=B;
E.value=D;
C(E)
}},set:function(B,C){return this._object[B]=C
},get:function(B){if(this._object[B]!==Object.prototype[B]){return this._object[B]
}},unset:function(B){var C=this._object[B];
delete this._object[B];
return C
},toObject:function(){return Object.clone(this._object)
},keys:function(){return this.pluck("key")
},values:function(){return this.pluck("value")
},index:function(C){var B=this.detect(function(D){return D.value===C
});
return B&&B.key
},merge:function(B){return this.clone().update(B)
},update:function(B){return new Hash(B).inject(this,function(C,D){C.set(D.key,D.value);
return C
})
},toQueryString:function(){return this.inject([],function(D,E){var C=encodeURIComponent(E.key),B=E.value;
if(B&&typeof B=="object"){if(Object.isArray(B)){return D.concat(B.map(A.curry(C)))
}}else{D.push(A(C,B))
}return D
}).join("&")
},inspect:function(){return"#<Hash:{"+this.map(function(B){return B.map(Object.inspect).join(": ")
}).join(", ")+"}>"
},toJSON:function(){return Object.toJSON(this.toObject())
},clone:function(){return new Hash(this)
}}
})());
Hash.prototype.toTemplateReplacements=Hash.prototype.toObject;
Hash.from=$H;
var ObjectRange=Class.create(Enumerable,{initialize:function(C,A,B){this.start=C;
this.end=A;
this.exclusive=B
},_each:function(A){var B=this.start;
while(this.include(B)){A(B);
B=B.succ()
}},include:function(A){if(A<this.start){return false
}if(this.exclusive){return A<this.end
}return A<=this.end
}});
var $R=function(C,A,B){return new ObjectRange(C,A,B)
};
var Ajax={getTransport:function(){return Try.these(function(){return new XMLHttpRequest()
},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")
})||false
},activeRequestCount:0};
Ajax.Responders={responders:[],_each:function(A){this.responders._each(A)
},register:function(A){if(!this.include(A)){this.responders.push(A)
}},unregister:function(A){this.responders=this.responders.without(A)
},dispatch:function(D,B,C,A){this.each(function(E){if(Object.isFunction(E[D])){try{E[D].apply(E,[B,C,A])
}catch(F){}}})
}};
Object.extend(Ajax.Responders,Enumerable);
Ajax.Responders.register({onCreate:function(){Ajax.activeRequestCount++
},onComplete:function(){Ajax.activeRequestCount--
}});
Ajax.Base=Class.create({initialize:function(A){this.options={method:"post",asynchronous:true,contentType:"application/x-www-form-urlencoded",encoding:"UTF-8",parameters:"",evalJSON:true,evalJS:true};
Object.extend(this.options,A||{});
this.options.method=this.options.method.toLowerCase();
if(Object.isString(this.options.parameters)){this.options.parameters=this.options.parameters.toQueryParams()
}else{if(Object.isHash(this.options.parameters)){this.options.parameters=this.options.parameters.toObject()
}}}});
Ajax.Request=Class.create(Ajax.Base,{_complete:false,initialize:function($super,B,A){$super(A);
this.transport=Ajax.getTransport();
this.request(B)
},request:function(B){this.url=B;
this.method=this.options.method;
var D=Object.clone(this.options.parameters);
if(!["get","post"].include(this.method)){D["_method"]=this.method;
this.method="post"
}this.parameters=D;
if(D=Object.toQueryString(D)){if(this.method=="get"){this.url+=(this.url.include("?")?"&":"?")+D
}else{if(/Konqueror|Safari|KHTML/.test(navigator.userAgent)){D+="&_="
}}}try{var A=new Ajax.Response(this);
if(this.options.onCreate){this.options.onCreate(A)
}Ajax.Responders.dispatch("onCreate",this,A);
this.transport.open(this.method.toUpperCase(),this.url,this.options.asynchronous);
if(this.options.asynchronous){this.respondToReadyState.bind(this).defer(1)
}this.transport.onreadystatechange=this.onStateChange.bind(this);
this.setRequestHeaders();
this.body=this.method=="post"?(this.options.postBody||D):null;
this.transport.send(this.body);
if(!this.options.asynchronous&&this.transport.overrideMimeType){this.onStateChange()
}}catch(C){this.dispatchException(C)
}},onStateChange:function(){var A=this.transport.readyState;
if(A>1&&!((A==4)&&this._complete)){this.respondToReadyState(this.transport.readyState)
}},setRequestHeaders:function(){var E={"X-Requested-With":"XMLHttpRequest","X-Prototype-Version":Prototype.Version,"Accept":"text/javascript, text/html, application/xml, text/xml, */*"};
if(this.method=="post"){E["Content-type"]=this.options.contentType+(this.options.encoding?"; charset="+this.options.encoding:"");
if(this.transport.overrideMimeType&&(navigator.userAgent.match(/Gecko\/(\d{4})/)||[0,2005])[1]<2005){E["Connection"]="close"
}}if(typeof this.options.requestHeaders=="object"){var C=this.options.requestHeaders;
if(Object.isFunction(C.push)){for(var B=0,D=C.length;
B<D;
B+=2){E[C[B]]=C[B+1]
}}else{$H(C).each(function(F){E[F.key]=F.value
})
}}for(var A in E){this.transport.setRequestHeader(A,E[A])
}},success:function(){var A=this.getStatus();
return !A||(A>=200&&A<300)
},getStatus:function(){try{return this.transport.status||0
}catch(A){return 0
}},respondToReadyState:function(A){var C=Ajax.Request.Events[A],B=new Ajax.Response(this);
if(C=="Complete"){try{this._complete=true;
(this.options["on"+B.status]||this.options["on"+(this.success()?"Success":"Failure")]||Prototype.emptyFunction)(B,B.headerJSON)
}catch(D){this.dispatchException(D)
}var E=B.getHeader("Content-type");
if(this.options.evalJS=="force"||(this.options.evalJS&&this.isSameOrigin()&&E&&E.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i))){this.evalResponse()
}}try{(this.options["on"+C]||Prototype.emptyFunction)(B,B.headerJSON);
Ajax.Responders.dispatch("on"+C,this,B,B.headerJSON)
}catch(D){this.dispatchException(D)
}if(C=="Complete"){this.transport.onreadystatechange=Prototype.emptyFunction
}},isSameOrigin:function(){var A=this.url.match(/^\s*https?:\/\/[^\/]*/);
return !A||(A[0]=="#{protocol}//#{domain}#{port}".interpolate({protocol:location.protocol,domain:document.domain,port:location.port?":"+location.port:""}))
},getHeader:function(A){try{return this.transport.getResponseHeader(A)||null
}catch(B){return null
}},evalResponse:function(){try{return eval((this.transport.responseText||"").unfilterJSON())
}catch(e){this.dispatchException(e)
}},dispatchException:function(A){(this.options.onException||Prototype.emptyFunction)(this,A);
Ajax.Responders.dispatch("onException",this,A)
}});
Ajax.Request.Events=["Uninitialized","Loading","Loaded","Interactive","Complete"];
Ajax.Response=Class.create({initialize:function(C){this.request=C;
var D=this.transport=C.transport,A=this.readyState=D.readyState;
if((A>2&&!Prototype.Browser.IE)||A==4){this.status=this.getStatus();
this.statusText=this.getStatusText();
this.responseText=String.interpret(D.responseText);
this.headerJSON=this._getHeaderJSON()
}if(A==4){var B=D.responseXML;
this.responseXML=Object.isUndefined(B)?null:B;
this.responseJSON=this._getResponseJSON()
}},status:0,statusText:"",getStatus:Ajax.Request.prototype.getStatus,getStatusText:function(){try{return this.transport.statusText||""
}catch(A){return""
}},getHeader:Ajax.Request.prototype.getHeader,getAllHeaders:function(){try{return this.getAllResponseHeaders()
}catch(A){return null
}},getResponseHeader:function(A){return this.transport.getResponseHeader(A)
},getAllResponseHeaders:function(){return this.transport.getAllResponseHeaders()
},_getHeaderJSON:function(){var A=this.getHeader("X-JSON");
if(!A){return null
}A=decodeURIComponent(escape(A));
try{return A.evalJSON(this.request.options.sanitizeJSON||!this.request.isSameOrigin())
}catch(B){this.request.dispatchException(B)
}},_getResponseJSON:function(){var A=this.request.options;
if(!A.evalJSON||(A.evalJSON!="force"&&!(this.getHeader("Content-type")||"").include("application/json"))||this.responseText.blank()){return null
}try{return this.responseText.evalJSON(A.sanitizeJSON||!this.request.isSameOrigin())
}catch(B){this.request.dispatchException(B)
}}});
Ajax.Updater=Class.create(Ajax.Request,{initialize:function($super,A,C,B){this.container={success:(A.success||A),failure:(A.failure||(A.success?null:A))};
B=Object.clone(B);
var D=B.onComplete;
B.onComplete=(function(E,F){this.updateContent(E.responseText);
if(Object.isFunction(D)){D(E,F)
}}).bind(this);
$super(C,B)
},updateContent:function(D){var C=this.container[this.success()?"success":"failure"],A=this.options;
if(!A.evalScripts){D=D.stripScripts()
}if(C=$(C)){if(A.insertion){if(Object.isString(A.insertion)){var B={};
B[A.insertion]=D;
C.insert(B)
}else{A.insertion(C,D)
}}else{C.update(D)
}}}});
Ajax.PeriodicalUpdater=Class.create(Ajax.Base,{initialize:function($super,A,C,B){$super(B);
this.onComplete=this.options.onComplete;
this.frequency=(this.options.frequency||2);
this.decay=(this.options.decay||1);
this.updater={};
this.container=A;
this.url=C;
this.start()
},start:function(){this.options.onComplete=this.updateComplete.bind(this);
this.onTimerEvent()
},stop:function(){this.updater.options.onComplete=undefined;
clearTimeout(this.timer);
(this.onComplete||Prototype.emptyFunction).apply(this,arguments)
},updateComplete:function(A){if(this.options.decay){this.decay=(A.responseText==this.lastText?this.decay*this.options.decay:1);
this.lastText=A.responseText
}this.timer=this.onTimerEvent.bind(this).delay(this.decay*this.frequency)
},onTimerEvent:function(){this.updater=new Ajax.Updater(this.container,this.url,this.options)
}});
function $(B){if(arguments.length>1){for(var A=0,D=[],C=arguments.length;
A<C;
A++){D.push($(arguments[A]))
}return D
}if(Object.isString(B)){B=document.getElementById(B)
}return Element.extend(B)
}if(Prototype.BrowserFeatures.XPath){document._getElementsByXPath=function(F,A){var C=[];
var E=document.evaluate(F,$(A)||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for(var B=0,D=E.snapshotLength;
B<D;
B++){C.push(Element.extend(E.snapshotItem(B)))
}return C
}
}if(!window.Node){var Node={}
}if(!Node.ELEMENT_NODE){Object.extend(Node,{ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12})
}(function(){var A=this.Element;
this.Element=function(D,C){C=C||{};
D=D.toLowerCase();
var B=Element.cache;
if(Prototype.Browser.IE&&C.name){D="<"+D+' name="'+C.name+'">';
delete C.name;
return Element.writeAttribute(document.createElement(D),C)
}if(!B[D]){B[D]=Element.extend(document.createElement(D))
}return Element.writeAttribute(B[D].cloneNode(false),C)
};
Object.extend(this.Element,A||{});
if(A){this.Element.prototype=A.prototype
}}).call(window);
Element.cache={};
Element.Methods={visible:function(A){return $(A).style.display!="none"
},toggle:function(A){A=$(A);
Element[Element.visible(A)?"hide":"show"](A);
return A
},hide:function(A){A=$(A);
A.style.display="none";
return A
},show:function(A){A=$(A);
A.style.display="";
return A
},remove:function(A){A=$(A);
A.parentNode.removeChild(A);
return A
},update:function(A,B){A=$(A);
if(B&&B.toElement){B=B.toElement()
}if(Object.isElement(B)){return A.update().insert(B)
}B=Object.toHTML(B);
A.innerHTML=B.stripScripts();
B.evalScripts.bind(B).defer();
return A
},replace:function(B,C){B=$(B);
if(C&&C.toElement){C=C.toElement()
}else{if(!Object.isElement(C)){C=Object.toHTML(C);
var A=B.ownerDocument.createRange();
A.selectNode(B);
C.evalScripts.bind(C).defer();
C=A.createContextualFragment(C.stripScripts())
}}B.parentNode.replaceChild(C,B);
return B
},insert:function(C,E){C=$(C);
if(Object.isString(E)||Object.isNumber(E)||Object.isElement(E)||(E&&(E.toElement||E.toHTML))){E={bottom:E}
}var D,F,B,G;
for(var A in E){D=E[A];
A=A.toLowerCase();
F=Element._insertionTranslations[A];
if(D&&D.toElement){D=D.toElement()
}if(Object.isElement(D)){F(C,D);
continue
}D=Object.toHTML(D);
B=((A=="before"||A=="after")?C.parentNode:C).tagName.toUpperCase();
G=Element._getContentFromAnonymousElement(B,D.stripScripts());
if(A=="top"||A=="after"){G.reverse()
}G.each(F.curry(C));
D.evalScripts.bind(D).defer()
}return C
},wrap:function(B,C,A){B=$(B);
if(Object.isElement(C)){$(C).writeAttribute(A||{})
}else{if(Object.isString(C)){C=new Element(C,A)
}else{C=new Element("div",C)
}}if(B.parentNode){B.parentNode.replaceChild(C,B)
}C.appendChild(B);
return C
},inspect:function(B){B=$(B);
var A="<"+B.tagName.toLowerCase();
$H({"id":"id","className":"class"}).each(function(F){var E=F.first(),C=F.last();
var D=(B[E]||"").toString();
if(D){A+=" "+C+"="+D.inspect(true)
}});
return A+">"
},recursivelyCollect:function(A,C){A=$(A);
var B=[];
while(A=A[C]){if(A.nodeType==1){B.push(Element.extend(A))
}}return B
},ancestors:function(A){return $(A).recursivelyCollect("parentNode")
},descendants:function(A){return $(A).select("*")
},firstDescendant:function(A){A=$(A).firstChild;
while(A&&A.nodeType!=1){A=A.nextSibling
}return $(A)
},immediateDescendants:function(A){if(!(A=$(A).firstChild)){return[]
}while(A&&A.nodeType!=1){A=A.nextSibling
}if(A){return[A].concat($(A).nextSiblings())
}return[]
},previousSiblings:function(A){return $(A).recursivelyCollect("previousSibling")
},nextSiblings:function(A){return $(A).recursivelyCollect("nextSibling")
},siblings:function(A){A=$(A);
return A.previousSiblings().reverse().concat(A.nextSiblings())
},match:function(B,A){if(Object.isString(A)){A=new Selector(A)
}return A.match($(B))
},up:function(B,D,A){B=$(B);
if(arguments.length==1){return $(B.parentNode)
}var C=B.ancestors();
return Object.isNumber(D)?C[D]:Selector.findElement(C,D,A)
},down:function(B,C,A){B=$(B);
if(arguments.length==1){return B.firstDescendant()
}return Object.isNumber(C)?B.descendants()[C]:Element.select(B,C)[A||0]
},previous:function(B,D,A){B=$(B);
if(arguments.length==1){return $(Selector.handlers.previousElementSibling(B))
}var C=B.previousSiblings();
return Object.isNumber(D)?C[D]:Selector.findElement(C,D,A)
},next:function(C,D,B){C=$(C);
if(arguments.length==1){return $(Selector.handlers.nextElementSibling(C))
}var A=C.nextSiblings();
return Object.isNumber(D)?A[D]:Selector.findElement(A,D,B)
},select:function(){var A=$A(arguments),B=$(A.shift());
return Selector.findChildElements(B,A)
},adjacent:function(){var A=$A(arguments),B=$(A.shift());
return Selector.findChildElements(B.parentNode,A).without(B)
},identify:function(B){B=$(B);
var C=B.readAttribute("id"),A=arguments.callee;
if(C){return C
}do{C="anonymous_element_"+A.counter++
}while($(C));
B.writeAttribute("id",C);
return C
},readAttribute:function(C,A){C=$(C);
if(Prototype.Browser.IE){var B=Element._attributeTranslations.read;
if(B.values[A]){return B.values[A](C,A)
}if(B.names[A]){A=B.names[A]
}if(A.include(":")){return(!C.attributes||!C.attributes[A])?null:C.attributes[A].value
}}return C.getAttribute(A)
},writeAttribute:function(E,C,F){E=$(E);
var B={},D=Element._attributeTranslations.write;
if(typeof C=="object"){B=C
}else{B[C]=Object.isUndefined(F)?true:F
}for(var A in B){C=D.names[A]||A;
F=B[A];
if(D.values[A]){C=D.values[A](E,F)
}if(F===false||F===null){E.removeAttribute(C)
}else{if(F===true){E.setAttribute(C,C)
}else{E.setAttribute(C,F)
}}}return E
},getHeight:function(A){return $(A).getDimensions().height
},getWidth:function(A){return $(A).getDimensions().width
},classNames:function(A){return new Element.ClassNames(A)
},hasClassName:function(A,B){if(!(A=$(A))){return 
}var C=A.className;
return(C.length>0&&(C==B||new RegExp("(^|\\s)"+B+"(\\s|$)").test(C)))
},addClassName:function(A,B){if(!(A=$(A))){return 
}if(!A.hasClassName(B)){A.className+=(A.className?" ":"")+B
}return A
},removeClassName:function(A,B){if(!(A=$(A))){return 
}A.className=A.className.replace(new RegExp("(^|\\s+)"+B+"(\\s+|$)")," ").strip();
return A
},toggleClassName:function(A,B){if(!(A=$(A))){return 
}return A[A.hasClassName(B)?"removeClassName":"addClassName"](B)
},cleanWhitespace:function(B){B=$(B);
var C=B.firstChild;
while(C){var A=C.nextSibling;
if(C.nodeType==3&&!/\S/.test(C.nodeValue)){B.removeChild(C)
}C=A
}return B
},empty:function(A){return $(A).innerHTML.blank()
},descendantOf:function(B,A){B=$(B),A=$(A);
if(B.compareDocumentPosition){return(B.compareDocumentPosition(A)&8)===8
}if(A.contains){return A.contains(B)&&A!==B
}while(B=B.parentNode){if(B==A){return true
}}return false
},scrollTo:function(A){A=$(A);
var B=A.cumulativeOffset();
window.scrollTo(B[0],B[1]);
return A
},getStyle:function(B,C){B=$(B);
C=C=="float"?"cssFloat":C.camelize();
var D=B.style[C];
if(!D||D=="auto"){var A=document.defaultView.getComputedStyle(B,null);
D=A?A[C]:null
}if(C=="opacity"){return D?parseFloat(D):1
}return D=="auto"?null:D
},getOpacity:function(A){return $(A).getStyle("opacity")
},setStyle:function(B,C){B=$(B);
var E=B.style,A;
if(Object.isString(C)){B.style.cssText+=";"+C;
return C.include("opacity")?B.setOpacity(C.match(/opacity:\s*(\d?\.?\d*)/)[1]):B
}for(var D in C){if(D=="opacity"){B.setOpacity(C[D])
}else{E[(D=="float"||D=="cssFloat")?(Object.isUndefined(E.styleFloat)?"cssFloat":"styleFloat"):D]=C[D]
}}return B
},setOpacity:function(A,B){A=$(A);
A.style.opacity=(B==1||B==="")?"":(B<0.00001)?0:B;
return A
},getDimensions:function(C){C=$(C);
var G=C.getStyle("display");
if(G!="none"&&G!=null){return{width:C.offsetWidth,height:C.offsetHeight}
}var B=C.style;
var F=B.visibility;
var D=B.position;
var A=B.display;
B.visibility="hidden";
B.position="absolute";
B.display="block";
var H=C.clientWidth;
var E=C.clientHeight;
B.display=A;
B.position=D;
B.visibility=F;
return{width:H,height:E}
},makePositioned:function(A){A=$(A);
var B=Element.getStyle(A,"position");
if(B=="static"||!B){A._madePositioned=true;
A.style.position="relative";
if(Prototype.Browser.Opera){A.style.top=0;
A.style.left=0
}}return A
},undoPositioned:function(A){A=$(A);
if(A._madePositioned){A._madePositioned=undefined;
A.style.position=A.style.top=A.style.left=A.style.bottom=A.style.right=""
}return A
},makeClipping:function(A){A=$(A);
if(A._overflow){return A
}A._overflow=Element.getStyle(A,"overflow")||"auto";
if(A._overflow!=="hidden"){A.style.overflow="hidden"
}return A
},undoClipping:function(A){A=$(A);
if(!A._overflow){return A
}A.style.overflow=A._overflow=="auto"?"":A._overflow;
A._overflow=null;
return A
},cumulativeOffset:function(B){var A=0,D=0;
do{if($(B).getStyle("position")=="fixed"){var C=document.viewport.getScrollOffsets();
A+=C[1]+B.offsetTop;
D+=C[0]+B.offsetLeft;
break
}else{A+=B.offsetTop||0;
D+=B.offsetLeft||0;
B=B.offsetParent
}}while(B);
return Element._returnOffset(D,A)
},positionedOffset:function(B){var A=0,D=0;
do{A+=B.offsetTop||0;
D+=B.offsetLeft||0;
B=B.offsetParent;
if(B){if(B.tagName.toUpperCase()=="BODY"){break
}var C=Element.getStyle(B,"position");
if(C!=="static"){break
}}}while(B);
return Element._returnOffset(D,A)
},absolutize:function(B){B=$(B);
if(B.getStyle("position")=="absolute"){return B
}var D=B.positionedOffset();
var F=D[1];
var E=D[0];
var C=B.clientWidth;
var A=B.clientHeight;
B._originalLeft=E-parseFloat(B.style.left||0);
B._originalTop=F-parseFloat(B.style.top||0);
B._originalWidth=B.style.width;
B._originalHeight=B.style.height;
B.style.position="absolute";
B.style.top=F+"px";
B.style.left=E+"px";
B.style.width=C+"px";
B.style.height=A+"px";
return B
},relativize:function(A){A=$(A);
if(A.getStyle("position")=="relative"){return A
}A.style.position="relative";
var C=parseFloat(A.style.top||0)-(A._originalTop||0);
var B=parseFloat(A.style.left||0)-(A._originalLeft||0);
A.style.top=C+"px";
A.style.left=B+"px";
A.style.height=A._originalHeight;
A.style.width=A._originalWidth;
return A
},cumulativeScrollOffset:function(B){var A=0,C=0;
do{A+=B.scrollTop||0;
C+=B.scrollLeft||0;
B=B.parentNode
}while(B);
return Element._returnOffset(C,A)
},getOffsetParent:function(A){if(A.offsetParent){return $(A.offsetParent)
}if(A==document.body){return $(A)
}while((A=A.parentNode)&&A!=document.body&&Object.isElement(A)){if(Element.getStyle(A,"position")!="static"){return $(A)
}}return $(document.body)
},viewportOffset:function(D){var A=0,C=0;
var B=D;
do{A+=B.offsetTop||0;
C+=B.offsetLeft||0;
if(B.offsetParent==document.body&&Element.getStyle(B,"position")=="absolute"){break
}}while(B=B.offsetParent);
B=D;
do{if(!Prototype.Browser.Opera||(B.tagName&&(B.tagName.toUpperCase()=="BODY"))){A-=B.scrollTop||0;
C-=B.scrollLeft||0;
if(!Prototype.Browser.WebKit&&Element.getStyle(B,"position")=="fixed"){break
}}}while((B=B.parentNode)&&B.tagName);
return Element._returnOffset(C,A)
},clonePosition:function(B,D){var A=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},arguments[2]||{});
D=$(D);
var E=D.viewportOffset();
B=$(B);
var F=[0,0];
var C=null;
if(Element.getStyle(B,"position")=="absolute"){C=B.getOffsetParent();
F=C.viewportOffset()
}if(C==document.body){F[0]-=document.body.offsetLeft;
F[1]-=document.body.offsetTop
}if(A.setLeft){B.style.left=(E[0]-F[0]+A.offsetLeft)+"px"
}if(A.setTop){B.style.top=(E[1]-F[1]+A.offsetTop)+"px"
}if(A.setWidth){B.style.width=D.offsetWidth+"px"
}if(A.setHeight){B.style.height=D.offsetHeight+"px"
}return B
}};
Element.Methods.identify.counter=1;
Object.extend(Element.Methods,{getElementsBySelector:Element.Methods.select,childElements:Element.Methods.immediateDescendants});
Element._attributeTranslations={write:{names:{className:"class",htmlFor:"for"},values:{}}};
if(Prototype.Browser.Opera){Element.Methods.getStyle=Element.Methods.getStyle.wrap(function(D,B,C){switch(C){case"left":case"top":case"right":case"bottom":if(D(B,"position")==="static"){return null
}case"height":case"width":if(!Element.visible(B)){return null
}var E=parseInt(D(B,C),10);
if(E!==B["offset"+C.capitalize()]){return E+"px"
}var A;
if(C==="height"){A=["border-top-width","padding-top","padding-bottom","border-bottom-width"]
}else{A=["border-left-width","padding-left","padding-right","border-right-width"]
}return A.inject(E,function(F,G){var H=D(B,G);
return H===null?F:F-parseInt(H,10)
})+"px";
default:return D(B,C)
}});
Element.Methods.readAttribute=Element.Methods.readAttribute.wrap(function(C,A,B){if(B==="title"){return A.title
}return C(A,B)
})
}else{if(Prototype.Browser.IE){Element.Methods.getOffsetParent=Element.Methods.getOffsetParent.wrap(function(C,B){B=$(B);
try{B.offsetParent
}catch(E){return $(document.body)
}var A=B.getStyle("position");
if(A!=="static"){return C(B)
}B.setStyle({position:"relative"});
var D=C(B);
B.setStyle({position:A});
return D
});
$w("positionedOffset viewportOffset").each(function(A){Element.Methods[A]=Element.Methods[A].wrap(function(E,C){C=$(C);
try{C.offsetParent
}catch(G){return Element._returnOffset(0,0)
}var B=C.getStyle("position");
if(B!=="static"){return E(C)
}var D=C.getOffsetParent();
if(D&&D.getStyle("position")==="fixed"){D.setStyle({zoom:1})
}C.setStyle({position:"relative"});
var F=E(C);
C.setStyle({position:B});
return F
})
});
Element.Methods.cumulativeOffset=Element.Methods.cumulativeOffset.wrap(function(B,A){try{A.offsetParent
}catch(C){return Element._returnOffset(0,0)
}return B(A)
});
Element.Methods.getStyle=function(A,B){A=$(A);
B=(B=="float"||B=="cssFloat")?"styleFloat":B.camelize();
var C=A.style[B];
if(!C&&A.currentStyle){C=A.currentStyle[B]
}if(B=="opacity"){if(C=(A.getStyle("filter")||"").match(/alpha\(opacity=(.*)\)/)){if(C[1]){return parseFloat(C[1])/100
}}return 1
}if(C=="auto"){if((B=="width"||B=="height")&&(A.getStyle("display")!="none")){return A["offset"+B.capitalize()]+"px"
}return null
}return C
};
Element.Methods.setOpacity=function(B,E){function F(G){return G.replace(/alpha\([^\)]*\)/gi,"")
}B=$(B);
var A=B.currentStyle;
if((A&&!A.hasLayout)||(!A&&B.style.zoom=="normal")){B.style.zoom=1
}var D=B.getStyle("filter"),C=B.style;
if(E==1||E===""){(D=F(D))?C.filter=D:C.removeAttribute("filter");
return B
}else{if(E<0.00001){E=0
}}C.filter=F(D)+"alpha(opacity="+(E*100)+")";
return B
};
Element._attributeTranslations={read:{names:{"class":"className","for":"htmlFor"},values:{_getAttr:function(A,B){return A.getAttribute(B,2)
},_getAttrNode:function(A,C){var B=A.getAttributeNode(C);
return B?B.value:""
},_getEv:function(A,B){B=A.getAttribute(B);
return B?B.toString().slice(23,-2):null
},_flag:function(A,B){return $(A).hasAttribute(B)?B:null
},style:function(A){return A.style.cssText.toLowerCase()
},title:function(A){return A.title
}}}};
Element._attributeTranslations.write={names:Object.extend({cellpadding:"cellPadding",cellspacing:"cellSpacing"},Element._attributeTranslations.read.names),values:{checked:function(A,B){A.checked=!!B
},style:function(A,B){A.style.cssText=B?B:""
}}};
Element._attributeTranslations.has={};
$w("colSpan rowSpan vAlign dateTime accessKey tabIndex encType maxLength readOnly longDesc frameBorder").each(function(A){Element._attributeTranslations.write.names[A.toLowerCase()]=A;
Element._attributeTranslations.has[A.toLowerCase()]=A
});
(function(A){Object.extend(A,{href:A._getAttr,src:A._getAttr,type:A._getAttr,action:A._getAttrNode,disabled:A._flag,checked:A._flag,readonly:A._flag,multiple:A._flag,onload:A._getEv,onunload:A._getEv,onclick:A._getEv,ondblclick:A._getEv,onmousedown:A._getEv,onmouseup:A._getEv,onmouseover:A._getEv,onmousemove:A._getEv,onmouseout:A._getEv,onfocus:A._getEv,onblur:A._getEv,onkeypress:A._getEv,onkeydown:A._getEv,onkeyup:A._getEv,onsubmit:A._getEv,onreset:A._getEv,onselect:A._getEv,onchange:A._getEv})
})(Element._attributeTranslations.read.values)
}else{if(Prototype.Browser.Gecko&&/rv:1\.8\.0/.test(navigator.userAgent)){Element.Methods.setOpacity=function(A,B){A=$(A);
A.style.opacity=(B==1)?0.999999:(B==="")?"":(B<0.00001)?0:B;
return A
}
}else{if(Prototype.Browser.WebKit){Element.Methods.setOpacity=function(A,B){A=$(A);
A.style.opacity=(B==1||B==="")?"":(B<0.00001)?0:B;
if(B==1){if(A.tagName.toUpperCase()=="IMG"&&A.width){A.width++;
A.width--
}else{try{var D=document.createTextNode(" ");
A.appendChild(D);
A.removeChild(D)
}catch(C){}}}return A
};
Element.Methods.cumulativeOffset=function(B){var A=0,C=0;
do{A+=B.offsetTop||0;
C+=B.offsetLeft||0;
if(B.offsetParent==document.body){if(Element.getStyle(B,"position")=="absolute"){break
}}B=B.offsetParent
}while(B);
return Element._returnOffset(C,A)
}
}}}}if(Prototype.Browser.IE||Prototype.Browser.Opera){Element.Methods.update=function(B,C){B=$(B);
if(C&&C.toElement){C=C.toElement()
}if(Object.isElement(C)){return B.update().insert(C)
}C=Object.toHTML(C);
var A=B.tagName.toUpperCase();
if(A in Element._insertionTranslations.tags){$A(B.childNodes).each(function(D){B.removeChild(D)
});
Element._getContentFromAnonymousElement(A,C.stripScripts()).each(function(D){B.appendChild(D)
})
}else{B.innerHTML=C.stripScripts()
}C.evalScripts.bind(C).defer();
return B
}
}if("outerHTML" in document.createElement("div")){Element.Methods.replace=function(C,E){C=$(C);
if(E&&E.toElement){E=E.toElement()
}if(Object.isElement(E)){C.parentNode.replaceChild(E,C);
return C
}E=Object.toHTML(E);
var D=C.parentNode,B=D.tagName.toUpperCase();
if(Element._insertionTranslations.tags[B]){var F=C.next();
var A=Element._getContentFromAnonymousElement(B,E.stripScripts());
D.removeChild(C);
if(F){A.each(function(G){D.insertBefore(G,F)
})
}else{A.each(function(G){D.appendChild(G)
})
}}else{C.outerHTML=E.stripScripts()
}E.evalScripts.bind(E).defer();
return C
}
}Element._returnOffset=function(B,C){var A=[B,C];
A.left=B;
A.top=C;
return A
};
Element._getContentFromAnonymousElement=function(C,B){var D=new Element("div"),A=Element._insertionTranslations.tags[C];
if(A){D.innerHTML=A[0]+B+A[1];
A[2].times(function(){D=D.firstChild
})
}else{D.innerHTML=B
}return $A(D.childNodes)
};
Element._insertionTranslations={before:function(A,B){A.parentNode.insertBefore(B,A)
},top:function(A,B){A.insertBefore(B,A.firstChild)
},bottom:function(A,B){A.appendChild(B)
},after:function(A,B){A.parentNode.insertBefore(B,A.nextSibling)
},tags:{TABLE:["<table>","</table>",1],TBODY:["<table><tbody>","</tbody></table>",2],TR:["<table><tbody><tr>","</tr></tbody></table>",3],TD:["<table><tbody><tr><td>","</td></tr></tbody></table>",4],SELECT:["<select>","</select>",1]}};
(function(){Object.extend(this.tags,{THEAD:this.tags.TBODY,TFOOT:this.tags.TBODY,TH:this.tags.TD})
}).call(Element._insertionTranslations);
Element.Methods.Simulated={hasAttribute:function(A,C){C=Element._attributeTranslations.has[C]||C;
var B=$(A).getAttributeNode(C);
return !!(B&&B.specified)
}};
Element.Methods.ByTag={};
Object.extend(Element,Element.Methods);
if(!Prototype.BrowserFeatures.ElementExtensions&&document.createElement("div")["__proto__"]){window.HTMLElement={};
window.HTMLElement.prototype=document.createElement("div")["__proto__"];
Prototype.BrowserFeatures.ElementExtensions=true
}Element.extend=(function(){if(Prototype.BrowserFeatures.SpecificElementExtensions){return Prototype.K
}var A={},B=Element.Methods.ByTag;
var C=Object.extend(function(F){if(!F||F._extendedByPrototype||F.nodeType!=1||F==window){return F
}var D=Object.clone(A),E=F.tagName.toUpperCase(),H,G;
if(B[E]){Object.extend(D,B[E])
}for(H in D){G=D[H];
if(Object.isFunction(G)&&!(H in F)){F[H]=G.methodize()
}}F._extendedByPrototype=Prototype.emptyFunction;
return F
},{refresh:function(){if(!Prototype.BrowserFeatures.ElementExtensions){Object.extend(A,Element.Methods);
Object.extend(A,Element.Methods.Simulated)
}}});
C.refresh();
return C
})();
Element.hasAttribute=function(A,B){if(A.hasAttribute){return A.hasAttribute(B)
}return Element.Methods.Simulated.hasAttribute(A,B)
};
Element.addMethods=function(C){var I=Prototype.BrowserFeatures,D=Element.Methods.ByTag;
if(!C){Object.extend(Form,Form.Methods);
Object.extend(Form.Element,Form.Element.Methods);
Object.extend(Element.Methods.ByTag,{"FORM":Object.clone(Form.Methods),"INPUT":Object.clone(Form.Element.Methods),"SELECT":Object.clone(Form.Element.Methods),"TEXTAREA":Object.clone(Form.Element.Methods)})
}if(arguments.length==2){var B=C;
C=arguments[1]
}if(!B){Object.extend(Element.Methods,C||{})
}else{if(Object.isArray(B)){B.each(H)
}else{H(B)
}}function H(F){F=F.toUpperCase();
if(!Element.Methods.ByTag[F]){Element.Methods.ByTag[F]={}
}Object.extend(Element.Methods.ByTag[F],C)
}function A(L,K,F){F=F||false;
for(var N in L){var M=L[N];
if(!Object.isFunction(M)){continue
}if(!F||!(N in K)){K[N]=M.methodize()
}}}function E(L){var F;
var K={"OPTGROUP":"OptGroup","TEXTAREA":"TextArea","P":"Paragraph","FIELDSET":"FieldSet","UL":"UList","OL":"OList","DL":"DList","DIR":"Directory","H1":"Heading","H2":"Heading","H3":"Heading","H4":"Heading","H5":"Heading","H6":"Heading","Q":"Quote","INS":"Mod","DEL":"Mod","A":"Anchor","IMG":"Image","CAPTION":"TableCaption","COL":"TableCol","COLGROUP":"TableCol","THEAD":"TableSection","TFOOT":"TableSection","TBODY":"TableSection","TR":"TableRow","TH":"TableCell","TD":"TableCell","FRAMESET":"FrameSet","IFRAME":"IFrame"};
if(K[L]){F="HTML"+K[L]+"Element"
}if(window[F]){return window[F]
}F="HTML"+L+"Element";
if(window[F]){return window[F]
}F="HTML"+L.capitalize()+"Element";
if(window[F]){return window[F]
}window[F]={};
window[F].prototype=document.createElement(L)["__proto__"];
return window[F]
}if(I.ElementExtensions){A(Element.Methods,HTMLElement.prototype);
A(Element.Methods.Simulated,HTMLElement.prototype,true)
}if(I.SpecificElementExtensions){for(var J in Element.Methods.ByTag){var G=E(J);
if(Object.isUndefined(G)){continue
}A(D[J],G.prototype)
}}Object.extend(Element,Element.Methods);
delete Element.ByTag;
if(Element.extend.refresh){Element.extend.refresh()
}Element.cache={}
};
document.viewport={getDimensions:function(){var A={},C=Prototype.Browser;
$w("width height").each(function(E){var B=E.capitalize();
if(C.WebKit&&!document.evaluate){A[E]=self["inner"+B]
}else{if(C.Opera&&parseFloat(window.opera.version())<9.5){A[E]=document.body["client"+B]
}else{A[E]=document.documentElement["client"+B]
}}});
return A
},getWidth:function(){return this.getDimensions().width
},getHeight:function(){return this.getDimensions().height
},getScrollOffsets:function(){return Element._returnOffset(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)
}};
var Selector=Class.create({initialize:function(A){this.expression=A.strip();
if(this.shouldUseSelectorsAPI()){this.mode="selectorsAPI"
}else{if(this.shouldUseXPath()){this.mode="xpath";
this.compileXPathMatcher()
}else{this.mode="normal";
this.compileMatcher()
}}},shouldUseXPath:function(){if(!Prototype.BrowserFeatures.XPath){return false
}var A=this.expression;
if(Prototype.Browser.WebKit&&(A.include("-of-type")||A.include(":empty"))){return false
}if((/(\[[\w-]*?:|:checked)/).test(A)){return false
}return true
},shouldUseSelectorsAPI:function(){if(!Prototype.BrowserFeatures.SelectorsAPI){return false
}if(!Selector._div){Selector._div=new Element("div")
}try{Selector._div.querySelector(this.expression)
}catch(A){return false
}return true
},compileMatcher:function(){var e=this.expression,ps=Selector.patterns,h=Selector.handlers,c=Selector.criteria,le,p,m;
if(Selector._cache[e]){this.matcher=Selector._cache[e];
return 
}this.matcher=["this.matcher = function(root) {","var r = root, h = Selector.handlers, c = false, n;"];
while(e&&le!=e&&(/\S/).test(e)){le=e;
for(var i in ps){p=ps[i];
if(m=e.match(p)){this.matcher.push(Object.isFunction(c[i])?c[i](m):new Template(c[i]).evaluate(m));
e=e.replace(m[0],"");
break
}}}this.matcher.push("return h.unique(n);\n}");
eval(this.matcher.join("\n"));
Selector._cache[this.expression]=this.matcher
},compileXPathMatcher:function(){var E=this.expression,F=Selector.patterns,B=Selector.xpath,D,A;
if(Selector._cache[E]){this.xpath=Selector._cache[E];
return 
}this.matcher=[".//*"];
while(E&&D!=E&&(/\S/).test(E)){D=E;
for(var C in F){if(A=E.match(F[C])){this.matcher.push(Object.isFunction(B[C])?B[C](A):new Template(B[C]).evaluate(A));
E=E.replace(A[0],"");
break
}}}this.xpath=this.matcher.join("");
Selector._cache[this.expression]=this.xpath
},findElements:function(A){A=A||document;
var C=this.expression,B;
switch(this.mode){case"selectorsAPI":if(A!==document){var D=A.id,E=$(A).identify();
C="#"+E.replace(/:/g,"\\:")+" "+C
}B=$A(A.querySelectorAll(C)).map(Element.extend);
A.id=D;
return B;
case"xpath":return document._getElementsByXPath(this.xpath,A);
default:return this.matcher(A)
}},match:function(H){this.tokens=[];
var L=this.expression,A=Selector.patterns,E=Selector.assertions;
var B,D,F;
while(L&&B!==L&&(/\S/).test(L)){B=L;
for(var I in A){D=A[I];
if(F=L.match(D)){if(E[I]){this.tokens.push([I,Object.clone(F)]);
L=L.replace(F[0],"")
}else{return this.findElements(document).include(H)
}}}}var K=true,C,J;
for(var I=0,G;
G=this.tokens[I];
I++){C=G[0],J=G[1];
if(!Selector.assertions[C](H,J)){K=false;
break
}}return K
},toString:function(){return this.expression
},inspect:function(){return"#<Selector:"+this.expression.inspect()+">"
}});
Object.extend(Selector,{_cache:{},xpath:{descendant:"//*",child:"/*",adjacent:"/following-sibling::*[1]",laterSibling:"/following-sibling::*",tagName:function(A){if(A[1]=="*"){return""
}return"[local-name()='"+A[1].toLowerCase()+"' or local-name()='"+A[1].toUpperCase()+"']"
},className:"[contains(concat(' ', @class, ' '), ' #{1} ')]",id:"[@id='#{1}']",attrPresence:function(A){A[1]=A[1].toLowerCase();
return new Template("[@#{1}]").evaluate(A)
},attr:function(A){A[1]=A[1].toLowerCase();
A[3]=A[5]||A[6];
return new Template(Selector.xpath.operators[A[2]]).evaluate(A)
},pseudo:function(A){var B=Selector.xpath.pseudos[A[1]];
if(!B){return""
}if(Object.isFunction(B)){return B(A)
}return new Template(Selector.xpath.pseudos[A[1]]).evaluate(A)
},operators:{"=":"[@#{1}='#{3}']","!=":"[@#{1}!='#{3}']","^=":"[starts-with(@#{1}, '#{3}')]","$=":"[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']","*=":"[contains(@#{1}, '#{3}')]","~=":"[contains(concat(' ', @#{1}, ' '), ' #{3} ')]","|=":"[contains(concat('-', @#{1}, '-'), '-#{3}-')]"},pseudos:{"first-child":"[not(preceding-sibling::*)]","last-child":"[not(following-sibling::*)]","only-child":"[not(preceding-sibling::* or following-sibling::*)]","empty":"[count(*) = 0 and (count(text()) = 0)]","checked":"[@checked]","disabled":"[(@disabled) and (@type!='hidden')]","enabled":"[not(@disabled) and (@type!='hidden')]","not":function(B){var H=B[6],G=Selector.patterns,A=Selector.xpath,E,C;
var F=[];
while(H&&E!=H&&(/\S/).test(H)){E=H;
for(var D in G){if(B=H.match(G[D])){C=Object.isFunction(A[D])?A[D](B):new Template(A[D]).evaluate(B);
F.push("("+C.substring(1,C.length-1)+")");
H=H.replace(B[0],"");
break
}}}return"[not("+F.join(" and ")+")]"
},"nth-child":function(A){return Selector.xpath.pseudos.nth("(count(./preceding-sibling::*) + 1) ",A)
},"nth-last-child":function(A){return Selector.xpath.pseudos.nth("(count(./following-sibling::*) + 1) ",A)
},"nth-of-type":function(A){return Selector.xpath.pseudos.nth("position() ",A)
},"nth-last-of-type":function(A){return Selector.xpath.pseudos.nth("(last() + 1 - position()) ",A)
},"first-of-type":function(A){A[6]="1";
return Selector.xpath.pseudos["nth-of-type"](A)
},"last-of-type":function(A){A[6]="1";
return Selector.xpath.pseudos["nth-last-of-type"](A)
},"only-of-type":function(A){var B=Selector.xpath.pseudos;
return B["first-of-type"](A)+B["last-of-type"](A)
},nth:function(E,C){var F,G=C[6],B;
if(G=="even"){G="2n+0"
}if(G=="odd"){G="2n+1"
}if(F=G.match(/^(\d+)$/)){return"["+E+"= "+F[1]+"]"
}if(F=G.match(/^(-?\d*)?n(([+-])(\d+))?/)){if(F[1]=="-"){F[1]=-1
}var D=F[1]?Number(F[1]):1;
var A=F[2]?Number(F[2]):0;
B="[((#{fragment} - #{b}) mod #{a} = 0) and ((#{fragment} - #{b}) div #{a} >= 0)]";
return new Template(B).evaluate({fragment:E,a:D,b:A})
}}}},criteria:{tagName:'n = h.tagName(n, r, "#{1}", c);      c = false;',className:'n = h.className(n, r, "#{1}", c);    c = false;',id:'n = h.id(n, r, "#{1}", c);           c = false;',attrPresence:'n = h.attrPresence(n, r, "#{1}", c); c = false;',attr:function(A){A[3]=(A[5]||A[6]);
return new Template('n = h.attr(n, r, "#{1}", "#{3}", "#{2}", c); c = false;').evaluate(A)
},pseudo:function(A){if(A[6]){A[6]=A[6].replace(/"/g,'\\"')
}return new Template('n = h.pseudo(n, "#{1}", "#{6}", r, c); c = false;').evaluate(A)
},descendant:'c = "descendant";',child:'c = "child";',adjacent:'c = "adjacent";',laterSibling:'c = "laterSibling";'},patterns:{laterSibling:/^\s*~\s*/,child:/^\s*>\s*/,adjacent:/^\s*\+\s*/,descendant:/^\s/,tagName:/^\s*(\*|[\w\-]+)(\b|$)?/,id:/^#([\w\-\*]+)(\b|$)/,className:/^\.([\w\-\*]+)(\b|$)/,pseudo:/^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|(?=\s|[:+~>]))/,attrPresence:/^\[((?:[\w]+:)?[\w]+)\]/,attr:/\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/},assertions:{tagName:function(A,B){return B[1].toUpperCase()==A.tagName.toUpperCase()
},className:function(A,B){return Element.hasClassName(A,B[1])
},id:function(A,B){return A.id===B[1]
},attrPresence:function(A,B){return Element.hasAttribute(A,B[1])
},attr:function(B,C){var A=Element.readAttribute(B,C[1]);
return A&&Selector.operators[C[2]](A,C[5]||C[6])
}},handlers:{concat:function(B,A){for(var C=0,D;
D=A[C];
C++){B.push(D)
}return B
},mark:function(A){var D=Prototype.emptyFunction;
for(var B=0,C;
C=A[B];
B++){C._countedByPrototype=D
}return A
},unmark:function(A){for(var B=0,C;
C=A[B];
B++){C._countedByPrototype=undefined
}return A
},index:function(A,D,G){A._countedByPrototype=Prototype.emptyFunction;
if(D){for(var B=A.childNodes,E=B.length-1,C=1;
E>=0;
E--){var F=B[E];
if(F.nodeType==1&&(!G||F._countedByPrototype)){F.nodeIndex=C++
}}}else{for(var E=0,C=1,B=A.childNodes;
F=B[E];
E++){if(F.nodeType==1&&(!G||F._countedByPrototype)){F.nodeIndex=C++
}}}},unique:function(B){if(B.length==0){return B
}var D=[],E;
for(var C=0,A=B.length;
C<A;
C++){if(!(E=B[C])._countedByPrototype){E._countedByPrototype=Prototype.emptyFunction;
D.push(Element.extend(E))
}}return Selector.handlers.unmark(D)
},descendant:function(A){var D=Selector.handlers;
for(var C=0,B=[],E;
E=A[C];
C++){D.concat(B,E.getElementsByTagName("*"))
}return B
},child:function(A){var E=Selector.handlers;
for(var D=0,C=[],F;
F=A[D];
D++){for(var B=0,G;
G=F.childNodes[B];
B++){if(G.nodeType==1&&G.tagName!="!"){C.push(G)
}}}return C
},adjacent:function(A){for(var C=0,B=[],E;
E=A[C];
C++){var D=this.nextElementSibling(E);
if(D){B.push(D)
}}return B
},laterSibling:function(A){var D=Selector.handlers;
for(var C=0,B=[],E;
E=A[C];
C++){D.concat(B,Element.nextSiblings(E))
}return B
},nextElementSibling:function(A){while(A=A.nextSibling){if(A.nodeType==1){return A
}}return null
},previousElementSibling:function(A){while(A=A.previousSibling){if(A.nodeType==1){return A
}}return null
},tagName:function(A,H,C,B){var I=C.toUpperCase();
var E=[],G=Selector.handlers;
if(A){if(B){if(B=="descendant"){for(var F=0,D;
D=A[F];
F++){G.concat(E,D.getElementsByTagName(C))
}return E
}else{A=this[B](A)
}if(C=="*"){return A
}}for(var F=0,D;
D=A[F];
F++){if(D.tagName.toUpperCase()===I){E.push(D)
}}return E
}else{return H.getElementsByTagName(C)
}},id:function(B,A,H,F){var G=$(H),D=Selector.handlers;
if(!G){return[]
}if(!B&&A==document){return[G]
}if(B){if(F){if(F=="child"){for(var C=0,E;
E=B[C];
C++){if(G.parentNode==E){return[G]
}}}else{if(F=="descendant"){for(var C=0,E;
E=B[C];
C++){if(Element.descendantOf(G,E)){return[G]
}}}else{if(F=="adjacent"){for(var C=0,E;
E=B[C];
C++){if(Selector.handlers.previousElementSibling(G)==E){return[G]
}}}else{B=D[F](B)
}}}}for(var C=0,E;
E=B[C];
C++){if(E==G){return[G]
}}return[]
}return(G&&Element.descendantOf(G,A))?[G]:[]
},className:function(B,A,C,D){if(B&&D){B=this[D](B)
}return Selector.handlers.byClassName(B,A,C)
},byClassName:function(C,B,F){if(!C){C=Selector.handlers.descendant([B])
}var H=" "+F+" ";
for(var E=0,D=[],G,A;
G=C[E];
E++){A=G.className;
if(A.length==0){continue
}if(A==F||(" "+A+" ").include(H)){D.push(G)
}}return D
},attrPresence:function(C,B,A,G){if(!C){C=B.getElementsByTagName("*")
}if(C&&G){C=this[G](C)
}var E=[];
for(var D=0,F;
F=C[D];
D++){if(Element.hasAttribute(F,A)){E.push(F)
}}return E
},attr:function(A,I,H,J,C,B){if(!A){A=I.getElementsByTagName("*")
}if(A&&B){A=this[B](A)
}var K=Selector.operators[C],F=[];
for(var E=0,D;
D=A[E];
E++){var G=Element.readAttribute(D,H);
if(G===null){continue
}if(K(G,J)){F.push(D)
}}return F
},pseudo:function(B,C,E,A,D){if(B&&D){B=this[D](B)
}if(!B){B=A.getElementsByTagName("*")
}return Selector.pseudos[C](B,E,A)
}},pseudos:{"first-child":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(Selector.handlers.previousElementSibling(E)){continue
}C.push(E)
}return C
},"last-child":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(Selector.handlers.nextElementSibling(E)){continue
}C.push(E)
}return C
},"only-child":function(B,G,A){var E=Selector.handlers;
for(var D=0,C=[],F;
F=B[D];
D++){if(!E.previousElementSibling(F)&&!E.nextElementSibling(F)){C.push(F)
}}return C
},"nth-child":function(B,C,A){return Selector.pseudos.nth(B,C,A)
},"nth-last-child":function(B,C,A){return Selector.pseudos.nth(B,C,A,true)
},"nth-of-type":function(B,C,A){return Selector.pseudos.nth(B,C,A,false,true)
},"nth-last-of-type":function(B,C,A){return Selector.pseudos.nth(B,C,A,true,true)
},"first-of-type":function(B,C,A){return Selector.pseudos.nth(B,"1",A,false,true)
},"last-of-type":function(B,C,A){return Selector.pseudos.nth(B,"1",A,true,true)
},"only-of-type":function(B,D,A){var C=Selector.pseudos;
return C["last-of-type"](C["first-of-type"](B,D,A),D,A)
},getIndices:function(B,A,C){if(B==0){return A>0?[A]:[]
}return $R(1,C).inject([],function(D,E){if(0==(E-A)%B&&(E-A)/B>=0){D.push(E)
}return D
})
},nth:function(A,L,N,K,C){if(A.length==0){return[]
}if(L=="even"){L="2n+0"
}if(L=="odd"){L="2n+1"
}var J=Selector.handlers,I=[],B=[],E;
J.mark(A);
for(var H=0,D;
D=A[H];
H++){if(!D.parentNode._countedByPrototype){J.index(D.parentNode,K,C);
B.push(D.parentNode)
}}if(L.match(/^\d+$/)){L=Number(L);
for(var H=0,D;
D=A[H];
H++){if(D.nodeIndex==L){I.push(D)
}}}else{if(E=L.match(/^(-?\d*)?n(([+-])(\d+))?/)){if(E[1]=="-"){E[1]=-1
}var O=E[1]?Number(E[1]):1;
var M=E[2]?Number(E[2]):0;
var P=Selector.pseudos.getIndices(O,M,A.length);
for(var H=0,D,F=P.length;
D=A[H];
H++){for(var G=0;
G<F;
G++){if(D.nodeIndex==P[G]){I.push(D)
}}}}}J.unmark(A);
J.unmark(B);
return I
},"empty":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(E.tagName=="!"||E.firstChild){continue
}C.push(E)
}return C
},"not":function(A,D,I){var G=Selector.handlers,J,C;
var H=new Selector(D).findElements(I);
G.mark(H);
for(var F=0,E=[],B;
B=A[F];
F++){if(!B._countedByPrototype){E.push(B)
}}G.unmark(H);
return E
},"enabled":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(!E.disabled&&(!E.type||E.type!=="hidden")){C.push(E)
}}return C
},"disabled":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(E.disabled){C.push(E)
}}return C
},"checked":function(B,F,A){for(var D=0,C=[],E;
E=B[D];
D++){if(E.checked){C.push(E)
}}return C
}},operators:{"=":function(B,A){return B==A
},"!=":function(B,A){return B!=A
},"^=":function(B,A){return B==A||B&&B.startsWith(A)
},"$=":function(B,A){return B==A||B&&B.endsWith(A)
},"*=":function(B,A){return B==A||B&&B.include(A)
},"$=":function(B,A){return B.endsWith(A)
},"*=":function(B,A){return B.include(A)
},"~=":function(B,A){return(" "+B+" ").include(" "+A+" ")
},"|=":function(B,A){return("-"+(B||"").toUpperCase()+"-").include("-"+(A||"").toUpperCase()+"-")
}},split:function(B){var A=[];
B.scan(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/,function(C){A.push(C[1].strip())
});
return A
},matchElements:function(F,G){var E=$$(G),D=Selector.handlers;
D.mark(E);
for(var C=0,B=[],A;
A=F[C];
C++){if(A._countedByPrototype){B.push(A)
}}D.unmark(E);
return B
},findElement:function(B,C,A){if(Object.isNumber(C)){A=C;
C=false
}return Selector.matchElements(B,C||"*")[A||0]
},findChildElements:function(E,G){G=Selector.split(G.join(","));
var D=[],F=Selector.handlers;
for(var C=0,B=G.length,A;
C<B;
C++){A=new Selector(G[C].strip());
F.concat(D,A.findElements(E))
}return(B>1)?F.unique(D):D
}});
if(Prototype.Browser.IE){Object.extend(Selector.handlers,{concat:function(B,A){for(var C=0,D;
D=A[C];
C++){if(D.tagName!=="!"){B.push(D)
}}return B
},unmark:function(A){for(var B=0,C;
C=A[B];
B++){C.removeAttribute("_countedByPrototype")
}return A
}})
}function $$(){return Selector.findChildElements(document,$A(arguments))
}var Form={reset:function(A){$(A).reset();
return A
},serializeElements:function(G,B){if(typeof B!="object"){B={hash:!!B}
}else{if(Object.isUndefined(B.hash)){B.hash=true
}}var C,F,A=false,E=B.submit;
var D=G.inject({},function(H,I){if(!I.disabled&&I.name){C=I.name;
F=$(I).getValue();
if(F!=null&&I.type!="file"&&(I.type!="submit"||(!A&&E!==false&&(!E||C==E)&&(A=true)))){if(C in H){if(!Object.isArray(H[C])){H[C]=[H[C]]
}H[C].push(F)
}else{H[C]=F
}}}return H
});
return B.hash?D:Object.toQueryString(D)
}};
Form.Methods={serialize:function(B,A){return Form.serializeElements(Form.getElements(B),A)
},getElements:function(A){return $A($(A).getElementsByTagName("*")).inject([],function(B,C){if(Form.Element.Serializers[C.tagName.toLowerCase()]){B.push(Element.extend(C))
}return B
})
},getInputs:function(G,C,D){G=$(G);
var A=G.getElementsByTagName("input");
if(!C&&!D){return $A(A).map(Element.extend)
}for(var E=0,H=[],F=A.length;
E<F;
E++){var B=A[E];
if((C&&B.type!=C)||(D&&B.name!=D)){continue
}H.push(Element.extend(B))
}return H
},disable:function(A){A=$(A);
Form.getElements(A).invoke("disable");
return A
},enable:function(A){A=$(A);
Form.getElements(A).invoke("enable");
return A
},findFirstElement:function(B){var C=$(B).getElements().findAll(function(D){return"hidden"!=D.type&&!D.disabled
});
var A=C.findAll(function(D){return D.hasAttribute("tabIndex")&&D.tabIndex>=0
}).sortBy(function(D){return D.tabIndex
}).first();
return A?A:C.find(function(D){return["input","select","textarea"].include(D.tagName.toLowerCase())
})
},focusFirstElement:function(A){A=$(A);
A.findFirstElement().activate();
return A
},request:function(B,A){B=$(B),A=Object.clone(A||{});
var D=A.parameters,C=B.readAttribute("action")||"";
if(C.blank()){C=window.location.href
}A.parameters=B.serialize(true);
if(D){if(Object.isString(D)){D=D.toQueryParams()
}Object.extend(A.parameters,D)
}if(B.hasAttribute("method")&&!A.method){A.method=B.method
}return new Ajax.Request(C,A)
}};
Form.Element={focus:function(A){$(A).focus();
return A
},select:function(A){$(A).select();
return A
}};
Form.Element.Methods={serialize:function(A){A=$(A);
if(!A.disabled&&A.name){var B=A.getValue();
if(B!=undefined){var C={};
C[A.name]=B;
return Object.toQueryString(C)
}}return""
},getValue:function(A){A=$(A);
var B=A.tagName.toLowerCase();
return Form.Element.Serializers[B](A)
},setValue:function(A,B){A=$(A);
var C=A.tagName.toLowerCase();
Form.Element.Serializers[C](A,B);
return A
},clear:function(A){$(A).value="";
return A
},present:function(A){return $(A).value!=""
},activate:function(A){A=$(A);
try{A.focus();
if(A.select&&(A.tagName.toLowerCase()!="input"||!["button","reset","submit"].include(A.type))){A.select()
}}catch(B){}return A
},disable:function(A){A=$(A);
A.disabled=true;
return A
},enable:function(A){A=$(A);
A.disabled=false;
return A
}};
var Field=Form.Element;
var $F=Form.Element.Methods.getValue;
Form.Element.Serializers={input:function(A,B){switch(A.type.toLowerCase()){case"checkbox":case"radio":return Form.Element.Serializers.inputSelector(A,B);
default:return Form.Element.Serializers.textarea(A,B)
}},inputSelector:function(A,B){if(Object.isUndefined(B)){return A.checked?A.value:null
}else{A.checked=!!B
}},textarea:function(A,B){if(Object.isUndefined(B)){return A.value
}else{A.value=B
}},select:function(C,F){if(Object.isUndefined(F)){return this[C.type=="select-one"?"selectOne":"selectMany"](C)
}else{var B,D,G=!Object.isArray(F);
for(var A=0,E=C.length;
A<E;
A++){B=C.options[A];
D=this.optionValue(B);
if(G){if(D==F){B.selected=true;
return 
}}else{B.selected=F.include(D)
}}}},selectOne:function(B){var A=B.selectedIndex;
return A>=0?this.optionValue(B.options[A]):null
},selectMany:function(D){var A,E=D.length;
if(!E){return null
}for(var C=0,A=[];
C<E;
C++){var B=D.options[C];
if(B.selected){A.push(this.optionValue(B))
}}return A
},optionValue:function(A){return Element.extend(A).hasAttribute("value")?A.value:A.text
}};
Abstract.TimedObserver=Class.create(PeriodicalExecuter,{initialize:function($super,A,B,C){$super(C,B);
this.element=$(A);
this.lastValue=this.getValue()
},execute:function(){var A=this.getValue();
if(Object.isString(this.lastValue)&&Object.isString(A)?this.lastValue!=A:String(this.lastValue)!=String(A)){this.callback(this.element,A);
this.lastValue=A
}}});
Form.Element.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.Element.getValue(this.element)
}});
Form.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.serialize(this.element)
}});
Abstract.EventObserver=Class.create({initialize:function(A,B){this.element=$(A);
this.callback=B;
this.lastValue=this.getValue();
if(this.element.tagName.toLowerCase()=="form"){this.registerFormCallbacks()
}else{this.registerCallback(this.element)
}},onElementEvent:function(){var A=this.getValue();
if(this.lastValue!=A){this.callback(this.element,A);
this.lastValue=A
}},registerFormCallbacks:function(){Form.getElements(this.element).each(this.registerCallback,this)
},registerCallback:function(A){if(A.type){switch(A.type.toLowerCase()){case"checkbox":case"radio":Event.observe(A,"click",this.onElementEvent.bind(this));
break;
default:Event.observe(A,"change",this.onElementEvent.bind(this));
break
}}}});
Form.Element.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.Element.getValue(this.element)
}});
Form.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.serialize(this.element)
}});
if(!window.Event){var Event={}
}Object.extend(Event,{KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,cache:{},relatedTarget:function(B){var A;
switch(B.type){case"mouseover":A=B.fromElement;
break;
case"mouseout":A=B.toElement;
break;
default:return null
}return Element.extend(A)
}});
Event.Methods=(function(){var A;
if(Prototype.Browser.IE){var B={0:1,1:4,2:2};
A=function(D,C){return D.button==B[C]
}
}else{if(Prototype.Browser.WebKit){A=function(D,C){switch(C){case 0:return D.which==1&&!D.metaKey;
case 1:return D.which==1&&D.metaKey;
default:return false
}}
}else{A=function(D,C){return D.which?(D.which===C+1):(D.button===C)
}
}}return{isLeftClick:function(C){return A(C,0)
},isMiddleClick:function(C){return A(C,1)
},isRightClick:function(C){return A(C,2)
},element:function(E){E=Event.extend(E);
var D=E.target,C=E.type,F=E.currentTarget;
if(F&&F.tagName){if(C==="load"||C==="error"||(C==="click"&&F.tagName.toLowerCase()==="input"&&F.type==="radio")){D=F
}}if(D.nodeType==Node.TEXT_NODE){D=D.parentNode
}return Element.extend(D)
},findElement:function(D,F){var C=Event.element(D);
if(!F){return C
}var E=[C].concat(C.ancestors());
return Selector.findElement(E,F,0)
},pointer:function(E){var D=document.documentElement,C=document.body||{scrollLeft:0,scrollTop:0};
return{x:E.pageX||(E.clientX+(D.scrollLeft||C.scrollLeft)-(D.clientLeft||0)),y:E.pageY||(E.clientY+(D.scrollTop||C.scrollTop)-(D.clientTop||0))}
},pointerX:function(C){return Event.pointer(C).x
},pointerY:function(C){return Event.pointer(C).y
},stop:function(C){Event.extend(C);
C.preventDefault();
C.stopPropagation();
C.stopped=true
}}
})();
Event.extend=(function(){var A=Object.keys(Event.Methods).inject({},function(B,C){B[C]=Event.Methods[C].methodize();
return B
});
if(Prototype.Browser.IE){Object.extend(A,{stopPropagation:function(){this.cancelBubble=true;
if(this._stopPropagation){this._stopPropagation()
}},preventDefault:function(){this.returnValue=false;
if(this._preventDefault){this._preventDefault()
}},inspect:function(){return"[object Event]"
}});
return function(B){if(!B){return false
}if(B._extendedByPrototype){return B
}B._extendedByPrototype=Prototype.emptyFunction;
var C=Event.pointer(B);
Object.extend(B,{target:B.srcElement,relatedTarget:Event.relatedTarget(B),pageX:C.x,pageY:C.y});
B._stopPropagation=B.stopPropagation;
B._preventDefault=B.preventDefault;
return Object.extend(B,A)
}
}else{Event.prototype=Event.prototype||document.createEvent("HTMLEvents")["__proto__"];
Object.extend(Event.prototype,A);
return Prototype.K
}})();
Object.extend(Event,(function(){var D=Event.cache;
function E(I){if(I._prototypeEventID){return I._prototypeEventID[0]
}arguments.callee.id=arguments.callee.id||1;
return I._prototypeEventID=[++arguments.callee.id]
}function B(I){if(I&&I.include(":")){return"dataavailable"
}return I
}function F(I){return D[I]=D[I]||{}
}function G(K,I){var J=F(K);
return J[I]=J[I]||[]
}function A(J,I,K){var N=E(J);
var M=G(N,I);
if(M.pluck("handler").include(K)){return false
}var L=function(O){if(!Event||!Event.extend||(O.eventName&&O.eventName!=I)){return false
}Event.extend(O);
K.call(J,O)
};
L.handler=K;
M.push(L);
return L
}function C(L,I,J){var K=G(L,I);
return K.find(function(M){return M.handler==J
})
}function H(L,I,J){var K=F(L);
if(!K[I]){return false
}K[I]=K[I].without(C(L,I,J))
}if(Prototype.Browser.WebKit){window.addEventListener("unload",Prototype.emptyFunction,false)
}return{getDOMEventName:B,observe:function(K,I,L){K=$(K);
var J=B(I);
var M=A(K,I,L);
if(!M){return K
}if(K.addEventListener){K.addEventListener(J,M,false)
}else{K.attachEvent("on"+J,M)
}return K
},stopObserving:function(K,I,L){K=$(K);
var N=E(K),J=B(I);
if(!L&&I){G(N,I).each(function(O){K.stopObserving(I,O.handler)
});
return K
}else{if(!I){Object.keys(F(N)).each(function(O){K.stopObserving(O)
});
return K
}}var M=C(N,I,L);
if(!M){return K
}if(K.removeEventListener){K.removeEventListener(J,M,false)
}else{K.detachEvent("on"+J,M)
}H(N,I,L);
return K
},fire:function(K,J,I){K=$(K);
if(K==document&&document.createEvent&&!K.dispatchEvent){K=document.documentElement
}var L;
if(document.createEvent){L=document.createEvent("HTMLEvents");
L.initEvent("dataavailable",true,true)
}else{L=document.createEventObject();
L.eventType="ondataavailable"
}L.eventName=J;
L.memo=I||{};
if(document.createEvent){K.dispatchEvent(L)
}else{K.fireEvent(L.eventType,L)
}return Event.extend(L)
}}
})());
Object.extend(Event,Event.Methods);
Element.addMethods({fire:Event.fire,observe:Event.observe,stopObserving:Event.stopObserving});
Object.extend(document,{fire:Element.Methods.fire.methodize(),observe:Element.Methods.observe.methodize(),stopObserving:Element.Methods.stopObserving.methodize(),loaded:false});
(function(){var C;
function B(){if(document.loaded){return 
}if(C){window.clearInterval(C)
}document.fire("dom:loaded");
document.loaded=true
}if(document.addEventListener){if(Prototype.Browser.WebKit){C=window.setInterval(function(){if(/loaded|complete/.test(document.readyState)){B()
}},0);
Event.observe(window,"load",B)
}else{document.addEventListener("DOMContentLoaded",B,false)
}}else{if(document.loaded){return 
}if(document.readyState!="complete"){document.write("<script id=__onDOMContentLoaded defer src=//:><\/script>");
var A=$("__onDOMContentLoaded");
if(A){A.onreadystatechange=function(){if(this.readyState=="complete"){this.onreadystatechange=null;
B()
}}
}}}})();
Hash.toQueryString=Object.toQueryString;
var Toggle={display:Element.toggle};
Element.Methods.childOf=Element.Methods.descendantOf;
var Insertion={Before:function(A,B){return Element.insert(A,{before:B})
},Top:function(A,B){return Element.insert(A,{top:B})
},Bottom:function(A,B){return Element.insert(A,{bottom:B})
},After:function(A,B){return Element.insert(A,{after:B})
}};
var $continue=new Error('"throw $continue" is deprecated, use "return" instead');
var Position={includeScrollOffsets:false,prepare:function(){this.deltaX=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;
this.deltaY=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
},within:function(B,A,C){if(this.includeScrollOffsets){return this.withinIncludingScrolloffsets(B,A,C)
}this.xcomp=A;
this.ycomp=C;
this.offset=Element.cumulativeOffset(B);
return(C>=this.offset[1]&&C<this.offset[1]+B.offsetHeight&&A>=this.offset[0]&&A<this.offset[0]+B.offsetWidth)
},withinIncludingScrolloffsets:function(B,A,D){var C=Element.cumulativeScrollOffset(B);
this.xcomp=A+C[0]-this.deltaX;
this.ycomp=D+C[1]-this.deltaY;
this.offset=Element.cumulativeOffset(B);
return(this.ycomp>=this.offset[1]&&this.ycomp<this.offset[1]+B.offsetHeight&&this.xcomp>=this.offset[0]&&this.xcomp<this.offset[0]+B.offsetWidth)
},overlap:function(B,A){if(!B){return 0
}if(B=="vertical"){return((this.offset[1]+A.offsetHeight)-this.ycomp)/A.offsetHeight
}if(B=="horizontal"){return((this.offset[0]+A.offsetWidth)-this.xcomp)/A.offsetWidth
}},cumulativeOffset:Element.Methods.cumulativeOffset,positionedOffset:Element.Methods.positionedOffset,absolutize:function(A){Position.prepare();
return Element.absolutize(A)
},relativize:function(A){Position.prepare();
return Element.relativize(A)
},realOffset:Element.Methods.cumulativeScrollOffset,offsetParent:Element.Methods.getOffsetParent,page:Element.Methods.viewportOffset,clone:function(B,C,A){A=A||{};
return Element.clonePosition(C,B,A)
}};
if(!document.getElementsByClassName){document.getElementsByClassName=function(B){function A(C){return C.blank()?null:"[contains(concat(' ', @class, ' '), ' "+C+" ')]"
}B.getElementsByClassName=Prototype.BrowserFeatures.XPath?function(C,E){E=E.toString().strip();
var D=/\s/.test(E)?$w(E).map(A).join(""):A(E);
return D?document._getElementsByXPath(".//*"+D,C):[]
}:function(E,F){F=F.toString().strip();
var G=[],H=(/\s/.test(F)?$w(F):null);
if(!H&&!F){return G
}var C=$(E).getElementsByTagName("*");
F=" "+F+" ";
for(var D=0,J,I;
J=C[D];
D++){if(J.className&&(I=" "+J.className+" ")&&(I.include(F)||(H&&H.all(function(K){return !K.toString().blank()&&I.include(" "+K+" ")
})))){G.push(Element.extend(J))
}}return G
};
return function(D,C){return $(C||document.body).getElementsByClassName(D)
}
}(Element.Methods)
}Element.ClassNames=Class.create();
Element.ClassNames.prototype={initialize:function(A){this.element=$(A)
},_each:function(A){this.element.className.split(/\s+/).select(function(B){return B.length>0
})._each(A)
},set:function(A){this.element.className=A
},add:function(A){if(this.include(A)){return 
}this.set($A(this).concat(A).join(" "))
},remove:function(A){if(!this.include(A)){return 
}this.set($A(this).without(A).join(" "))
},toString:function(){return $A(this).join(" ")
}};
Object.extend(Element.ClassNames.prototype,Enumerable);
Element.addMethods();
if(!window.RichFaces){window.RichFaces={}
}if(!window.RichFaces.Memory){window.RichFaces.Memory={nodeCleaners:{},componentCleaners:{},addCleaner:function(A,B){this.nodeCleaners[A]=B
},addComponentCleaner:function(B,C,A){this.componentCleaners[B]={cleaner:C,checker:A}
},applyCleaners:function(B,C,D){for(var A in this.nodeCleaners){this.nodeCleaners[A](B,C)
}for(var A in this.componentCleaners){if(this.componentCleaners[A].checker(B,C)){D.push(B)
}}},_clean:function(F,E,G){if(F){this.applyCleaners(F,E,G);
var B=F.all;
if(B){var A=0;
var D=B.length;
for(var A=0;
A<D;
A++){this.applyCleaners(B[A],E,G)
}}else{var C=F.firstChild;
while(C){this._clean(C,E,G);
C=C.nextSibling
}}}},_cleanComponentNodes:function(E,D){for(var B=0;
B<E.length;
B++){var C=E[B];
for(var A in this.componentCleaners){this.componentCleaners[A].cleaner(C,D)
}}},clean:function(B,A){var C=[];
this._clean(B,A,C);
this._cleanComponentNodes(C,A);
C=null
}};
window.RichFaces.Memory.addComponentCleaner("richfaces",function(D,E){var B=D.component;
if(B){var C=B["rich:destructor"];
if(C){var A=B[C];
if(A){A.call(B,E)
}}}},function(A,B){return(A.component&&A.component["rich:destructor"])
});
if(window.attachEvent){window.attachEvent("onunload",function(){var A=window.RichFaces.Memory;
A.clean(document);
A.clean(window)
})
}}Function.prototype.indexOf=function(){return -1
};
Element.clearChildren=function(A){A=$(A);
while(A.firstChild){A.removeChild(A.firstChild)
}return A
};
Element.isChildOf=function(B,A){while(B&&A!=B){B=B.parentNode
}return A==B
};
if(typeof Node=="undefined"){Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12}
}Element.isUninitialized=function(A){if(A){if(A.nodeType==Node.ELEMENT_NODE){if(!A.parentNode||A.document&&A.document.readyState=="uninitialized"){return true
}else{return !Element.descendantOf(A,document.documentElement)
}return false
}}};
if(window.RichFaces&&window.RichFaces.Memory){window.RichFaces.Memory.addCleaner("prototype",function(E,G){var D=E._prototypeEventID?E._prototypeEventID[0]:undefined;
if(D){var B=Event.cache[D];
for(var A in B){var F=B[A];
var C=Event.getDOMEventName(A);
F.each(function(H){if(E.removeEventListener){E.removeEventListener(C,H,false)
}else{E.detachEvent("on"+C,H)
}});
B[A]=null
}delete Event.cache[D]
}})
}
if(!window.A4J){window.A4J={}
}function Sarissa(){}Sarissa.VERSION="0.9.9.3";
Sarissa.PARSED_OK="Document contains no parsing errors";
Sarissa.PARSED_EMPTY="Document is empty";
Sarissa.PARSED_UNKNOWN_ERROR="Not well-formed or other error";
Sarissa.IS_ENABLED_TRANSFORM_NODE=false;
Sarissa.REMOTE_CALL_FLAG="gr.abiss.sarissa.REMOTE_CALL_FLAG";
Sarissa._sarissa_iNsCounter=0;
Sarissa._SARISSA_IEPREFIX4XSLPARAM="";
Sarissa._SARISSA_HAS_DOM_IMPLEMENTATION=document.implementation&&true;
Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT=Sarissa._SARISSA_HAS_DOM_IMPLEMENTATION&&document.implementation.createDocument;
Sarissa._SARISSA_HAS_DOM_FEATURE=Sarissa._SARISSA_HAS_DOM_IMPLEMENTATION&&document.implementation.hasFeature;
Sarissa._SARISSA_IS_MOZ=Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT&&Sarissa._SARISSA_HAS_DOM_FEATURE;
Sarissa._SARISSA_IS_SAFARI=navigator.userAgent.toLowerCase().indexOf("safari")!=-1||navigator.userAgent.toLowerCase().indexOf("konqueror")!=-1;
Sarissa._SARISSA_IS_SAFARI_OLD=Sarissa._SARISSA_IS_SAFARI&&(parseInt((navigator.userAgent.match(/AppleWebKit\/(\d+)/)||{})[1],10)<420);
Sarissa._SARISSA_IS_IE=document.all&&window.ActiveXObject&&navigator.userAgent.toLowerCase().indexOf("msie")>-1&&navigator.userAgent.toLowerCase().indexOf("opera")==-1;
Sarissa._SARISSA_IS_OPERA=navigator.userAgent.toLowerCase().indexOf("opera")!=-1;
if(!window.Node||!Node.ELEMENT_NODE){Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12}
}if(Sarissa._SARISSA_IS_SAFARI_OLD){HTMLHtmlElement=document.createElement("html").constructor;
Node=HTMLElement={};
HTMLElement.prototype=HTMLHtmlElement.__proto__.__proto__;
HTMLDocument=Document=document.constructor;
var x=new DOMParser();
XMLDocument=x.constructor;
Element=x.parseFromString("<Single />","text/xml").documentElement.constructor;
x=null
}if(typeof XMLDocument=="undefined"&&typeof Document!="undefined"){XMLDocument=Document
}if(Sarissa._SARISSA_IS_IE){Sarissa._SARISSA_IEPREFIX4XSLPARAM="xsl:";
var _SARISSA_DOM_PROGID="";
var _SARISSA_XMLHTTP_PROGID="";
var _SARISSA_DOM_XMLWRITER="";
Sarissa.pickRecentProgID=function(E){var D=false,G;
var F;
for(var B=0;
B<E.length&&!D;
B++){try{var A=new ActiveXObject(E[B]);
F=E[B];
D=true
}catch(C){G=C
}}if(!D){throw"Could not retrieve a valid progID of Class: "+E[E.length-1]+". (original exception: "+G+")"
}E=null;
return F
};
_SARISSA_DOM_PROGID=null;
_SARISSA_THREADEDDOM_PROGID=null;
_SARISSA_XSLTEMPLATE_PROGID=null;
_SARISSA_XMLHTTP_PROGID=null;
Sarissa.originalXMLHttpRequest=window.XMLHttpRequest;
XMLHttpRequest=function(){if(!_SARISSA_XMLHTTP_PROGID){_SARISSA_XMLHTTP_PROGID=Sarissa.pickRecentProgID(["Msxml2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"])
}return new ActiveXObject(_SARISSA_XMLHTTP_PROGID)
};
Sarissa.getDomDocument=function(D,C){if(!_SARISSA_DOM_PROGID){_SARISSA_DOM_PROGID=Sarissa.pickRecentProgID(["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.3.0","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XMLDOM"])
}var A=new ActiveXObject(_SARISSA_DOM_PROGID);
if(C){var B="";
if(D){if(C.indexOf(":")>1){B=C.substring(0,C.indexOf(":"));
C=C.substring(C.indexOf(":")+1)
}else{B="a"+(Sarissa._sarissa_iNsCounter++)
}}if(D){A.loadXML("<"+B+":"+C+" xmlns:"+B+'="'+D+'" />')
}else{A.loadXML("<"+C+" />")
}}return A
};
Sarissa.getParseErrorText=function(A){var C=Sarissa.PARSED_OK;
if(A&&A.parseError&&A.parseError.errorCode&&A.parseError.errorCode!=0){C="XML Parsing Error: "+A.parseError.reason+"\nLocation: "+A.parseError.url+"\nLine Number "+A.parseError.line+", Column "+A.parseError.linepos+":\n"+A.parseError.srcText+"\n";
for(var B=0;
B<A.parseError.linepos;
B++){C+="-"
}C+="^\n"
}else{if(A.documentElement===null){C=Sarissa.PARSED_EMPTY
}}return C
};
Sarissa.setXpathNamespaces=function(A,B){A.setProperty("SelectionLanguage","XPath");
A.setProperty("SelectionNamespaces",B)
};
XSLTProcessor=function(){if(!_SARISSA_XSLTEMPLATE_PROGID){_SARISSA_XSLTEMPLATE_PROGID=Sarissa.pickRecentProgID(["Msxml2.XSLTemplate.6.0","MSXML2.XSLTemplate.3.0"])
}this.template=new ActiveXObject(_SARISSA_XSLTEMPLATE_PROGID);
this.processor=null
};
XSLTProcessor.prototype.importStylesheet=function(D){if(!_SARISSA_THREADEDDOM_PROGID){_SARISSA_THREADEDDOM_PROGID=Sarissa.pickRecentProgID(["MSXML2.FreeThreadedDOMDocument.6.0","MSXML2.FreeThreadedDOMDocument.3.0"])
}D.setProperty("SelectionLanguage","XPath");
D.setProperty("SelectionNamespaces","xmlns:xsl='http://www.w3.org/1999/XSL/Transform'");
var C=new ActiveXObject(_SARISSA_THREADEDDOM_PROGID);
try{C.resolveExternals=true;
C.setProperty("AllowDocumentFunction",true)
}catch(B){}if(D.url&&D.selectSingleNode("//xsl:*[local-name() = 'import' or local-name() = 'include']")!=null){C.async=false;
C.load(D.url)
}else{C.loadXML(D.xml)
}C.setProperty("SelectionNamespaces","xmlns:xsl='http://www.w3.org/1999/XSL/Transform'");
var A=C.selectSingleNode("//xsl:output");
if(A){this.outputMethod=A.getAttribute("method")
}else{delete this.outputMethod
}this.template.stylesheet=C;
this.processor=this.template.createProcessor();
this.paramsSet=[]
};
XSLTProcessor.prototype.transformToDocument=function(C){var B;
if(_SARISSA_THREADEDDOM_PROGID){this.processor.input=C;
B=new ActiveXObject(_SARISSA_DOM_PROGID);
this.processor.output=B;
this.processor.transform();
return B
}else{if(!_SARISSA_DOM_XMLWRITER){_SARISSA_DOM_XMLWRITER=Sarissa.pickRecentProgID(["Msxml2.MXXMLWriter.6.0","Msxml2.MXXMLWriter.3.0","MSXML2.MXXMLWriter","MSXML.MXXMLWriter","Microsoft.XMLDOM"])
}this.processor.input=C;
B=new ActiveXObject(_SARISSA_DOM_XMLWRITER);
this.processor.output=B;
this.processor.transform();
var A=new ActiveXObject(_SARISSA_DOM_PROGID);
A.loadXML(B.output+"");
return A
}};
XSLTProcessor.prototype.transformToFragment=function(G,D){this.processor.input=G;
this.processor.transform();
var E=this.processor.output;
var F=D.createDocumentFragment();
var B;
if(this.outputMethod=="text"){F.appendChild(D.createTextNode(E))
}else{if(D.body&&D.body.innerHTML){B=D.createElement("div");
B.innerHTML=E;
while(B.hasChildNodes()){F.appendChild(B.firstChild)
}}else{var A=new ActiveXObject(_SARISSA_DOM_PROGID);
if(E.substring(0,5)=="<?xml"){E=E.substring(E.indexOf("?>")+2)
}var C="".concat("<my>",E,"</my>");
A.loadXML(C);
B=A.documentElement;
while(B.hasChildNodes()){F.appendChild(B.firstChild)
}}}return F
};
XSLTProcessor.prototype.setParameter=function(C,A,B){B=B?B:"";
if(C){this.processor.addParameter(A,B,C)
}else{this.processor.addParameter(A,B)
}C=""+(C||"");
if(!this.paramsSet[C]){this.paramsSet[C]=[]
}this.paramsSet[C][A]=B
};
XSLTProcessor.prototype.getParameter=function(B,A){B=""+(B||"");
if(this.paramsSet[B]&&this.paramsSet[B][A]){return this.paramsSet[B][A]
}else{return null
}};
XSLTProcessor.prototype.clearParameters=function(){for(var B in this.paramsSet){for(var A in this.paramsSet[B]){if(B!=""){this.processor.addParameter(A,"",B)
}else{this.processor.addParameter(A,"")
}}}this.paramsSet=[]
}
}else{if(Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT){Sarissa.__handleLoad__=function(A){Sarissa.__setReadyState__(A,4)
};
_sarissa_XMLDocument_onload=function(){Sarissa.__handleLoad__(this)
};
Sarissa.__setReadyState__=function(A,B){A.readyState=B;
A.readystate=B;
if(A.onreadystatechange!=null&&typeof A.onreadystatechange=="function"){A.onreadystatechange()
}};
Sarissa.getDomDocument=function(C,B){var A=document.implementation.createDocument(C?C:null,B?B:null,null);
if(!A.onreadystatechange){A.onreadystatechange=null
}if(!A.readyState){A.readyState=0
}A.addEventListener("load",_sarissa_XMLDocument_onload,false);
return A
};
if(window.XMLDocument){}else{if(Sarissa._SARISSA_HAS_DOM_FEATURE&&window.Document&&!Document.prototype.load&&document.implementation.hasFeature("LS","3.0")){Sarissa.getDomDocument=function(C,B){var A=document.implementation.createDocument(C?C:null,B?B:null,null);
return A
}
}else{Sarissa.getDomDocument=function(C,B){var A=document.implementation.createDocument(C?C:null,B?B:null,null);
if(A&&(C||B)&&!A.documentElement){A.appendChild(A.createElementNS(C,B))
}return A
}
}}}}if(!window.DOMParser){if(Sarissa._SARISSA_IS_SAFARI){DOMParser=function(){};
DOMParser.prototype.parseFromString=function(B,C){var A=new XMLHttpRequest();
A.open("GET","data:text/xml;charset=utf-8,"+encodeURIComponent(B),false);
A.send(null);
return A.responseXML
}
}else{if(Sarissa.getDomDocument&&Sarissa.getDomDocument()&&Sarissa.getDomDocument(null,"bar").xml){DOMParser=function(){};
DOMParser.prototype.parseFromString=function(A,C){var B=Sarissa.getDomDocument();
B.loadXML(A);
return B
}
}}}if((typeof (document.importNode)=="undefined")&&Sarissa._SARISSA_IS_IE){try{var importTable={TBODY:["<table>","</table>"],THEAD:["<table>","</table>"],TFOOT:["<table>","</table>"],TR:["<table><tbody>","</tbody></table>"],TH:["<table><thead><tr>","</tr></thead></table>"],TD:["<table><tbody><tr>","</tr></tbody></table>"],OPTION:["<select>","</select>"]};
document.importNode=function(K,G){var H;
if(K.nodeName=="#text"){return document.createTextNode(K.data)
}else{var D=K.nodeName.toUpperCase();
var B=importTable[D];
var C;
if(G){C=K.xml?K.xml:K.outerHTML
}else{C=K.xml?K.cloneNode(false).xml:K.cloneNode(false).outerHTML
}var I=document.createElement("div");
if(B){C=B[0]+C+B[1]
}I.innerHTML=C;
var J=new Array(I.firstChild);
var L;
while(!L){var A=new Array();
for(var F=0;
F<J.length&&!L;
F++){var E=J[F];
while(E){if(E.tagName&&E.tagName.toUpperCase()==D){L=E;
break
}else{if(E.firstChild){A.push(E.firstChild)
}E=E.nextSibling
}}}J=A
}return L
}}
}catch(e){}}if(!Sarissa.getParseErrorText){Sarissa.getParseErrorText=function(A){var C=Sarissa.PARSED_OK;
if(!A.documentElement){C=Sarissa.PARSED_EMPTY
}else{if(A.documentElement.tagName=="parsererror"){C=A.documentElement.firstChild.data;
C+="\n"+A.documentElement.firstChild.nextSibling.firstChild.data
}else{if(A.getElementsByTagName("parsererror").length>0){var B=A.getElementsByTagName("parsererror")[0];
C=Sarissa.getText(B,true)+"\n"
}else{if(A.parseError&&A.parseError.errorCode!=0){C=Sarissa.PARSED_UNKNOWN_ERROR
}}}}return C
}
}Sarissa.getText=function(G,B){var E="";
var C=G.childNodes;
for(var D=0;
D<C.length;
D++){var F=C[D];
var A=F.nodeType;
if(A==Node.TEXT_NODE||A==Node.CDATA_SECTION_NODE){E+=F.data
}else{if(B===true&&(A==Node.ELEMENT_NODE||A==Node.DOCUMENT_NODE||A==Node.DOCUMENT_FRAGMENT_NODE)){E+=Sarissa.getText(F,true)
}}}return E
};
if(!window.XMLSerializer&&Sarissa.getDomDocument&&Sarissa.getDomDocument("","foo",null).xml){XMLSerializer=function(){};
XMLSerializer.prototype.serializeToString=function(A){return A.xml
}
}Sarissa.stripTags=function(A){return A?A.replace(/<[^>]+>/g,""):A
};
Sarissa.clearChildNodes=function(A){while(A.firstChild){A.removeChild(A.firstChild)
}};
Sarissa.copyChildNodes=function(D,E,F){if(Sarissa._SARISSA_IS_SAFARI&&E.nodeType==Node.DOCUMENT_NODE){E=E.documentElement
}if((!D)||(!E)){throw"Both source and destination nodes must be provided"
}if(!F){Sarissa.clearChildNodes(E)
}var B=E.nodeType==Node.DOCUMENT_NODE?E:E.ownerDocument;
var A=D.childNodes;
var C;
if(typeof (B.importNode)!="undefined"){for(C=0;
C<A.length;
C++){E.appendChild(B.importNode(A[C],true))
}}else{for(C=0;
C<A.length;
C++){E.appendChild(A[C].cloneNode(true))
}}};
Sarissa.moveChildNodes=function(D,E,F){if((!D)||(!E)){throw"Both source and destination nodes must be provided"
}if(!F){Sarissa.clearChildNodes(E)
}var A=D.childNodes;
if(D.ownerDocument==E.ownerDocument){while(D.firstChild){E.appendChild(D.firstChild)
}}else{var B=E.nodeType==Node.DOCUMENT_NODE?E:E.ownerDocument;
var C;
if(typeof (B.importNode)!="undefined"){for(C=0;
C<A.length;
C++){E.appendChild(B.importNode(A[C],true))
}}else{for(C=0;
C<A.length;
C++){E.appendChild(A[C].cloneNode(true))
}}Sarissa.clearChildNodes(D)
}};
Sarissa.xmlize=function(E,G,D){D=D?D:"";
var F=D+"<"+G+">";
var B=false;
if(!(E instanceof Object)||E instanceof Number||E instanceof String||E instanceof Boolean||E instanceof Date){F+=Sarissa.escape(""+E);
B=true
}else{F+="\n";
var A=E instanceof Array;
for(var C in E){F+=Sarissa.xmlize(E[C],(A?'array-item key="'+C+'"':C),D+"   ")
}F+=D
}return(F+=(G.indexOf(" ")!=-1?"</array-item>\n":"</"+G+">\n"))
};
Sarissa.escape=function(A){return A.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")
};
Sarissa.unescape=function(A){return A.replace(/&apos;/g,"'").replace(/&quot;/g,'"').replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&")
};
Sarissa.updateCursor=function(B,A){if(B&&B.style&&B.style.cursor!=undefined){B.style.cursor=A
}};
Sarissa.updateContentFromURI=function(C,H,A,G,E){try{Sarissa.updateCursor(H,"wait");
var B=new XMLHttpRequest();
B.open("GET",C,true);
B.onreadystatechange=function(){if(B.readyState==4){try{var I=B.responseXML;
if(I&&Sarissa.getParseErrorText(I)==Sarissa.PARSED_OK){Sarissa.updateContentFromNode(B.responseXML,H,A);
G(C,H)
}else{throw Sarissa.getParseErrorText(I)
}}catch(J){if(G){G(C,H,J)
}else{throw J
}}}};
if(E){var F="Sat, 1 Jan 2000 00:00:00 GMT";
B.setRequestHeader("If-Modified-Since",F)
}B.send("")
}catch(D){Sarissa.updateCursor(H,"auto");
if(G){G(C,H,D)
}else{throw D
}}};
Sarissa.updateContentFromNode=function(E,F,A){try{Sarissa.updateCursor(F,"wait");
Sarissa.clearChildNodes(F);
var B=E.nodeType==Node.DOCUMENT_NODE?E:E.ownerDocument;
if(B.parseError&&B.parseError.errorCode!=0){var D=document.createElement("pre");
D.appendChild(document.createTextNode(Sarissa.getParseErrorText(B)));
F.appendChild(D)
}else{if(A){E=A.transformToDocument(E)
}if(F.tagName.toLowerCase()=="textarea"||F.tagName.toLowerCase()=="input"){F.value=new XMLSerializer().serializeToString(E)
}else{if(E.nodeType==Node.DOCUMENT_NODE||E.ownerDocument.documentElement==E){F.innerHTML=new XMLSerializer().serializeToString(E)
}else{F.appendChild(F.ownerDocument.importNode(E,true))
}}}}catch(C){throw C
}finally{Sarissa.updateCursor(F,"auto")
}};
Sarissa.formToQueryString=function(G){var A="";
for(var F=0;
F<G.elements.length;
F++){var E=G.elements[F];
var D=E.getAttribute("name")?E.getAttribute("name"):E.getAttribute("id");
if(D&&((!E.disabled)||E.type=="hidden")){switch(E.type){case"hidden":case"text":case"textarea":case"password":A+=D+"="+encodeURIComponent(E.value)+"&";
break;
case"select-one":A+=D+"="+encodeURIComponent(E.options[E.selectedIndex].value)+"&";
break;
case"select-multiple":for(var C=0;
C<E.length;
C++){var B=E.options[C];
if(B.selected===true){A+=D+"[]="+encodeURIComponent(B.value)+"&"
}}break;
case"checkbox":case"radio":if(E.checked){A+=D+"="+encodeURIComponent(E.value)+"&"
}break
}}}return A.substr(0,A.length-1)
};
Sarissa.updateContentFromForm=function(F,H,A,G){try{Sarissa.updateCursor(H,"wait");
var E=Sarissa.formToQueryString(F)+"&"+Sarissa.REMOTE_CALL_FLAG+"=true";
var B=new XMLHttpRequest();
var C=F.getAttribute("method")&&F.getAttribute("method").toLowerCase()=="get";
if(C){B.open("GET",F.getAttribute("action")+"?"+E,true)
}else{B.open("POST",F.getAttribute("action"),true);
B.setRequestHeader("Content-type","application/x-www-form-urlencoded");
B.setRequestHeader("Content-length",E.length);
B.setRequestHeader("Connection","close")
}B.onreadystatechange=function(){try{if(B.readyState==4){var I=B.responseXML;
if(I&&Sarissa.getParseErrorText(I)==Sarissa.PARSED_OK){Sarissa.updateContentFromNode(B.responseXML,H,A);
G(F,H)
}else{throw Sarissa.getParseErrorText(I)
}}}catch(J){if(G){G(F,H,J)
}else{throw J
}}};
B.send(C?"":E)
}catch(D){Sarissa.updateCursor(H,"auto");
if(G){G(F,H,D)
}else{throw D
}}return false
};
A4J.AJAX={};
A4J.AJAX.Stub=function(){};
A4J.AJAX.XMLHttpRequest=function(A){this._query=A;
this._documentElement=window.document.documentElement
};
A4J.AJAX.XMLHttpRequest.prototype={_query:null,_timeout:0,_timeoutID:null,onready:null,_parsingStatus:Sarissa.PARSED_EMPTY,_errorMessage:"XML Response object not set",_contentType:null,_onerror:function(C,A,B){if(A!=599&&C.getResponseText()){A4J.AJAX.replacePage(C)
}},onfinish:null,options:{},domEvt:null,form:null,_request:null,_aborted:false,_documentElement:null,setRequestTimeout:function(A){this._timeout=A
},send:function(){this._request=new XMLHttpRequest();
var C=this;
this._request.onreadystatechange=function(){if(window.document.documentElement!=C._documentElement){LOG.warn("Page for current request have been unloaded - abort processing");
if(!C._status_stopped){A4J.AJAX.status(C.containerId,C.options.status,false);
C._status_stopped=true
}C.abort();
return 
}LOG.debug("Reqest state : "+C._request.readyState);
if(C._request.readyState==4){if(C._aborted){A4J.AJAX.status(C.containerId,C.options.status,false);
A4J.AJAX.popQueue(C);
return 
}LOG.debug("Reqest end with state 4");
if(C._timeoutID){window.clearTimeout(C._timeoutID)
}var F;
var D;
try{F=C._request.status;
D=C._request.statusText
}catch(E){LOG.error("request don't have status code - network problem, "+E.message);
F=599;
D="Network error"
}if(F==200){try{LOG.debug("Response  with content-type: "+C.getResponseHeader("Content-Type"));
LOG.debug("Full response content: ",C.getResponseText())
}catch(E){}if(C._request.responseXML){C._parsingStatus=Sarissa.getParseErrorText(C._request.responseXML);
if(C._parsingStatus==Sarissa.PARSED_OK&&Sarissa.setXpathNamespaces){Sarissa.setXpathNamespaces(C._request.responseXML,"xmlns='http://www.w3.org/1999/xhtml'")
}}if(C.onready){C.onready(C)
}}else{C._errorMessage="Reqest error, status : "+F+" "+D;
LOG.error(C._errorMessage);
if(typeof (C._onerror)=="function"){C._onerror(C,F,C._errorMessage)
}if(C.onfinish){C.onfinish(C)
}}C=undefined
}};
try{LOG.debug("Start XmlHttpRequest");
this._request.open("POST",this._query.getActionUrl(""),true);
var B="application/x-www-form-urlencoded; charset=UTF-8";
this._request.setRequestHeader("Content-Type",B)
}catch(A){LOG.debug("XmlHttpRequest not support setRequestHeader - use GET instead of POST");
this._request.open("GET",this._query.getActionUrl("")+"?"+this._query.getQueryString(),true)
}this._request.send(this._query.getQueryString());
if(this._timeout>0){this._timeoutID=window.setTimeout(function(){LOG.warn("request stopped due to timeout");
if(!C._aborted){if(typeof (A4J.AJAX.onAbort)=="function"){A4J.AJAX.onAbort(C)
}}C._aborted=true;
C._request.onreadystatechange=A4J.AJAX.Stub;
C._request.abort();
if(C._onerror){C._errorMessage="Request timeout";
C._onerror(C,500,C._errorMessage)
}if(C.onfinish){C.onfinish(C)
}C._request=undefined;
C=undefined
},this._timeout)
}},abort:function(){this._oncomplete_aborted=true;
if(!this._aborted){if(typeof (A4J.AJAX.onAbort)=="function"){A4J.AJAX.onAbort(this)
}}this._aborted=true
},getResponseText:function(){try{return this._request.responseText
}catch(A){return null
}},getError:function(){return this._errorMessage
},getParserStatus:function(){return this._parsingStatus
},getContentType:function(){if(!this._contentType){var B=this.getResponseHeader("Content-Type");
if(B){var A=B.indexOf(";");
if(A>=0){this._contentType=B.substring(0,A)
}else{this._contentType=B
}}else{this._contentType="text/html"
}}return this._contentType
},getResponseHeader:function(B){var A;
try{A=this._request.getResponseHeader(B);
if(A===""){A=undefined
}}catch(E){}if(!A){LOG.debug("Header "+B+" not found, search in <meta>");
if(this._parsingStatus==Sarissa.PARSED_OK){var F=this.getElementsByTagName("meta");
for(var C=0;
C<F.length;
C++){var D=F[C];
LOG.debug("Find <meta name='"+D.getAttribute("name")+"' content='"+D.getAttribute("content")+"'>");
if(D.getAttribute("name")==B){A=D.getAttribute("content");
break
}}}}return A
},getElementsByTagName:function(A,C){if(!C){C=this._request.responseXML
}LOG.debug("search for elements by name '"+A+"'  in element "+C.nodeName);
var E;
try{E=C.selectNodes('.//*[local-name()="'+A+'"]')
}catch(B){try{E=C.getElementsByTagName(A)
}catch(D){LOG.debug("getElementsByTagName found no elements, "+D.Message)
}}return E
},getElementById:function(B){var A=this._request.responseXML;
if(A){if(typeof (A.getElementById)!="undefined"){LOG.debug("call getElementById for id= "+B);
return A.getElementById(B)
}else{if(typeof (A.selectSingleNode)!="undefined"){LOG.debug("call selectSingleNode for id= "+B);
return A.selectSingleNode("//*[@id='"+B+"']")
}else{if(typeof (A.nodeFromID)!="undefined"){LOG.debug("call nodeFromID for id= "+B);
return A.nodeFromID(B)
}}}LOG.error("No functions for getElementById found ")
}else{LOG.debug("No parsed XML document in response")
}return null
},getJSON:function(id){var data;
var dataElement=this.getElementById(id);
if(dataElement){try{data=Sarissa.getText(dataElement,true);
data=window.eval("("+data+")")
}catch(e){LOG.error("Error on parsing JSON data "+e.message,data)
}}return data
},_evaluateScript:function(node){var includeComments=!A4J.AJAX.isXhtmlScriptMode();
var newscript=A4J.AJAX.getText(node,includeComments);
try{LOG.debug("Evaluate script replaced area in document: ",newscript);
if(window.execScript){window.execScript(newscript)
}else{window.eval(newscript)
}LOG.debug("Script evaluation succeeded")
}catch(e){LOG.error("ERROR Evaluate script:  Error name: "+e.name+e.message?". Error message: "+e.message:"")
}},evaluateQueueScript:function(){var A=this.getElementById("org.ajax4jsf.queue_script");
if(A){this._evaluateScript(A)
}},evalScripts:function(A,B){var D=this.getElementsByTagName("script",A);
LOG.debug("Scripts in updated part count : "+D.length);
if(D.length>0){var C=this;
window.setTimeout(function(){for(var E=0;
E<D.length;
E++){C._evaluateScript(D[E])
}D=null;
if(B){C.doFinish()
}C=undefined
},0)
}else{if(B){this.doFinish()
}}},updatePagePart:function(H,D){var C=this.getElementById(H);
if(!C){LOG.error("New node for ID "+H+" is not present in response");
if(D){this.doFinish()
}return 
}var A=window.document.getElementById(H);
if(A){if(window.RichFaces&&window.RichFaces.Memory){window.RichFaces.Memory.clean(A,true)
}var B=A.parentNode;
if(!window.opera&&!A4J.AJAX.isWebkitBreakingAmps()&&A.outerHTML&&!A.tagName.match(/(tbody|thead|tfoot|tr|th|td)/i)){LOG.debug("Replace content of node by outerHTML()");
if(!Sarissa._SARISSA_IS_IE||A.tagName.toLowerCase()!="table"){try{A.innerHTML=""
}catch(F){LOG.error("Error to clear node content by innerHTML "+F.message);
Sarissa.clearChildNodes(A)
}}A.outerHTML=new XMLSerializer().serializeToString(C)
}else{Sarissa.clearChildNodes(A);
var E=window.document.importNode(C,true);
LOG.debug("Replace content of node by replaceChild()");
var G=null;
A4J.AJAX.TestReplacedGetElementByIdVisibility();
if(!A4J.AJAX._testReplacedGetElementByIdVisibility){LOG.debug("Temporarily substituting document.getElementById() to work around WebKit issue");
G=document.getElementById;
document.getElementById=function(L){var J=G.apply(document,arguments);
if(!J){var L=arguments[0];
LOG.debug("Element [@id='"+L+"'] was not found in document, trying to locate XPath match");
try{var I=E.ownerDocument.evaluate("//*[@id='"+L+"']",E,null,XPathResult.ANY_UNORDERED_NODE_TYPE);
if(I){J=I.singleNodeValue
}LOG.debug("XPath located: "+J)
}catch(K){LOG.error("Error locating [@id='"+L+"'] element: "+K.message)
}}return J
}
}try{B.replaceChild(E,A)
}finally{if(G){LOG.debug("Restoring document.getElementById()");
document.getElementById=G
}}}if(!A4J.AJAX._scriptEvaluated){this.evalScripts(C,D)
}LOG.debug("Update part of page for Id: "+H+" successful")
}else{LOG.warn("Node for replace by response with id "+H+" not found in document");
if(!A4J.AJAX._scriptEvaluated&&D){this.doFinish()
}}if(A4J.AJAX._scriptEvaluated&&D){this.doFinish()
}},doFinish:function(){if(this.onfinish){this.onfinish(this)
}},appendNewHeadElements:function(F){var C=this._appendNewElements("script","src",null,null,["type","language","charset"]);
var E=this;
C.concat(this._appendNewElements("link","href","class",["component","user"],["type","rev","media"],{"class":"className"},function(H,G){E._copyAttribute(H,G,"rel")
}));
if(C.length==0){F();
return 
}A4J.AJAX.headElementsCounter=C.length;
var A=function(){if(this.readyState=="loaded"||this.readyState=="complete"){this.onreadystatechange=null;
this.onload=null;
F()
}};
var D=function(){this.onreadystatechange=null;
this.onload=null;
F()
};
for(var B=0;
B<C.length;
B++){C[B].onreadystatechange=A;
C[B].onload=D
}},_appendNewElements:function(W,Q,X,N,J,B,D){var E=document.getElementsByTagName("head")[0]||document.documentElement;
var C=this.getElementsByTagName(W);
var L=document.getElementsByTagName(W);
var F=(B&&B[X])||X;
var M=[];
var R={};
if(N){var P=0;
for(var O=0;
O<L.length;
O++){var G=L[O];
var S=G[F];
for(;
P<N.length&&N[P]!=S;
P++){R[N[P]]=G
}if(P==N.length){break
}}}for(var P=0;
P<C.length;
P++){var A=C[P];
var H=A.getAttribute(Q);
var K;
if(N){K=A.getAttribute(X)
}if(H){var U=false;
LOG.debug("<"+W+"> in response with src="+H);
for(var O=0;
O<L.length;
O++){if(this._noSessionHref(H)==this._noSessionHref(L[O].getAttribute(Q))){LOG.debug("Such element exist in document");
if(X){var V=L[O][F];
if((!K^!V)||(K&&V&&K!=V)){LOG.warn("Roles are different")
}}U=true;
break
}}if(!U){var T=document.createElement(W);
T.setAttribute(Q,H);
for(var O=0;
O<J.length;
O++){this._copyAttribute(A,T,J[O])
}if(K){T[F]=K
}LOG.debug("append element to document");
for(var O=0;
O<A4J.AJAX._headTransformers.length;
O++){A4J.AJAX._headTransformers[O](T)
}var I=R[K];
if(I&&I.parentNode){I.parentNode.insertBefore(T,I)
}else{E.appendChild(T)
}if(D){D(A,T)
}if(W!="link"||T.type.toLowerCase()=="text/javascript"){M.push(T)
}}}}return M
},_noSessionHref:function(A){var B=A;
if(A){var C=A.lastIndexOf(";jsessionid=");
if(C>0){B=A.substring(0,C);
var D=A.lastIndexOf("?");
if(D>C){B=B+A.substring(D)
}}}return B
},_copyAttribute:function(C,D,A){var B=C.getAttribute(A);
if(B){D.setAttribute(A,B)
}}};
A4J.AJAX.Listener=function(A){this.onafterajax=A
};
A4J.AJAX.AjaxListener=function(A,B){this[A]=B
};
A4J.AJAX._listeners=[];
A4J.AJAX.AddListener=function(A){A4J.AJAX._listeners.push(A)
};
A4J.AJAX.removeListeners=function(A){A4J.AJAX._listeners=[]
};
A4J.AJAX.removeListener=function(B){for(var A=A4J.AJAX._listeners.length-1;
A>=0;
A--){if(A4J.AJAX._listeners[A]==B){A4J.AJAX._listeners.splice(A,1)
}}};
A4J.AJAX.HeadElementTransformer=function(A){this.elt=A
};
A4J.AJAX._headTransformers=[];
A4J.AJAX.AddHeadElementTransformer=function(A){A4J.AJAX._headTransformers.push(A)
};
A4J.AJAX.SetZeroRequestDelay=function(A){if(typeof A.requestDelay=="undefined"){A.requestDelay=0
}};
A4J.AJAX._pollers={};
A4J.AJAX.Poll=function(A,C,B){A4J.AJAX.StopPoll(B.pollId);
if(!B.onerror){B.onerror=function(F,D,E){if(typeof (A4J.AJAX.onError)=="function"){A4J.AJAX.onError(F,D,E)
}A4J.AJAX.Poll(A,C,B)
}
}if(!B.onqueuerequestdrop){B.onqueuerequestdrop=function(){A4J.AJAX.Poll(A,C,B)
}
}A4J.AJAX.SetZeroRequestDelay(B);
A4J.AJAX._pollers[B.pollId]=window.setTimeout(function(){A4J.AJAX._pollers[B.pollId]=undefined;
if((typeof (B.onsubmit)=="function")&&(B.onsubmit()==false)){A4J.AJAX.Poll(A,C,B)
}else{A4J.AJAX.Submit(A,C,null,B)
}},B.pollinterval)
};
A4J.AJAX.StopPoll=function(A){if(A4J.AJAX._pollers[A]){window.clearTimeout(A4J.AJAX._pollers[A]);
A4J.AJAX._pollers[A]=undefined
}};
A4J.AJAX.Push=function(A,C,B){A4J.AJAX.StopPush(B.pushId);
B.onerror=function(){A4J.AJAX.Push(A,C,B)
};
B.onqueuerequestdrop=function(){LOG.debug("Push main request dropped from queue")
};
A4J.AJAX._pollers[B.pushId]=window.setTimeout(function(){var D=new XMLHttpRequest();
D.onreadystatechange=function(){if(D.readyState==4){try{if(D.status==200){if(D.getResponseHeader("Ajax-Push-Status")=="READY"){A4J.AJAX.SetZeroRequestDelay(B);
A4J.AJAX.Submit(A,C||B.dummyForm,null,B)
}}}catch(E){}D=null;
A4J.AJAX._pollers[B.pushId]=null;
A4J.AJAX.Push(A,C,B)
}};
A4J.AJAX.SendPush(D,B)
},B.pushinterval)
};
A4J.AJAX.SendPush=function(C,B){var A=B.pushUrl||B.actionUrl;
C.open("HEAD",A,true);
C.setRequestHeader("Ajax-Push-Key",B.pushId);
if(B.timeout){C.setRequestHeader("Timeout",B.timeout)
}C.send(null)
};
A4J.AJAX.StopPush=function(A){if(A4J.AJAX._pollers[A]){window.clearTimeout(A4J.AJAX._pollers[A]);
A4J.AJAX._pollers[A]=null
}};
A4J.AJAX.CloneObject=function(C,B){var A={};
for(var D in C){if(B&&typeof (evt[prop])=="function"){continue
}A[D]=C[D]
}return A
};
A4J.AJAX.SubmitForm=function(A,D,B){var C=A4J.AJAX.CloneObject(B);
if(A4J._formInput){LOG.debug("Form submitted by button "+A4J._formInput.id);
C.control=A4J._formInput;
A4J._formInput=null;
C.submitByForm=true
}A4J.AJAX.Submit(A,D,null,C)
};
A4J.AJAX.SubmiteventsQueue=function(A){A.submit()
};
A4J.AJAX.CloneEvent=function(A){var B;
A=A||window.event||null;
if(A){try{B=A4J.AJAX.CloneObject(A,false)
}catch(C){LOG.warn("Exception on clone event "+C.name+":"+C.message)
}LOG.debug("Have Event "+B+" with properties: target: "+B.target+", srcElement: "+B.srcElement+", type: "+B.type)
}return B
};
A4J.AJAX.PrepareQuery=function(E,G,D,I){for(var H=0;
H<A4J.AJAX._listeners.length;
H++){var B=A4J.AJAX._listeners[H];
if(B.onbeforeajax){B.onbeforeajax(G,D,I)
}}LOG.debug("Query preparation for form '"+G+"' requested");
var A=window.document.getElementById(G);
if((!A||A.nodeName.toUpperCase()!="FORM")&&D){var F=D.target||D.srcElement||null;
if(F){A=A4J.AJAX.locateForm(F)
}}if(!I.submitByForm&&A&&A.onsubmit){LOG.debug("Form have onsubmit function, call it");
if(A.onsubmit()==false){return false
}}var C=new A4J.Query(E,A);
C.appendFormControls(I.single,I.control);
if(I.parameters){C.appendParameters(I.parameters)
}if(I.actionUrl){C.setActionUrl(I.actionUrl)
}return C
};
A4J.AJAX.SubmitQuery=function(G,B,F){var E=new A4J.AJAX.XMLHttpRequest(G);
var D=G._form;
var A=G._containerId;
E.options=B;
E.containerId=A;
E.domEvt=F;
E.form=D;
if(B.timeout){E.setRequestTimeout(B.timeout)
}E.onready=A4J.AJAX.processResponse;
if(B.onerror){E._onerror=B.onerror
}else{if(typeof (A4J.AJAX.onError)=="function"){E._onerror=A4J.AJAX.onError
}}var C=B.queueonerror;
if(C){var H=E._onerror;
if(H){E._onerror=function(){C.apply(this,arguments);
H.apply(this,arguments)
}
}else{E._onerror=C
}}E.onfinish=A4J.AJAX.finishRequest;
LOG.debug("NEW AJAX REQUEST !!! with form: "+(D.id||D.name||D));
A4J.AJAX.status(A,B.status,true);
E.send();
return E
};
A4J.AJAX.Submit=function(B,G,D,C){var F=A4J.AJAX.CloneEvent(D);
var E=A4J.AJAX.PrepareQuery(B,G,F,C);
if(E){var A=A4J.AJAX.EventQueue.getOrCreateQueue(C,G);
if(A){A.push(E,C,F)
}else{A4J.AJAX.SubmitQuery(E,C,F)
}}return false
};
A4J.AJAX.SubmitRequest=function(A,F,C,B){var E=A4J.AJAX.CloneEvent(C);
var D=A4J.AJAX.PrepareQuery(A,F,E,B);
if(D){A4J.AJAX.SubmitQuery(D,B,E)
}return false
};
A4J.AJAX.processResponseAfterUpdateHeadElements=function(C,B){C.evaluateQueueScript();
for(var A=0;
A<B.length;
A++){var D=B[A];
LOG.debug("Update page part from call parameter for ID "+D);
C.updatePagePart(D,A==B.length-1)
}};
A4J.AJAX.headElementsCounter=0;
A4J.AJAX.processResponse=function(A){A4J.AJAX.TestScriptEvaluation();
var E=A.options;
var T=A.getResponseHeader("Ajax-Response");
var R=A.getResponseHeader("Ajax-Expired");
if(R&&typeof (A4J.AJAX.onExpired)=="function"){var I=A4J.AJAX.onExpired(window.location,R);
if(I){window.location=I;
return 
}}if(T!="true"){LOG.warn("No ajax response header ");
var I=A.getResponseHeader("Location");
try{if(T=="redirect"&&I){window.location=I
}else{if(T=="reload"){window.location.reload(true)
}else{A4J.AJAX.replacePage(A)
}}}catch(O){LOG.error("Error redirect to new location ")
}}else{if(A.getParserStatus()==Sarissa.PARSED_OK){if(E.onbeforedomupdate||E.queueonbeforedomupdate){var M=A.domEvt;
var S=A.getJSON("_ajax:data");
LOG.debug("Call local onbeforedomupdate function before replacing elemements");
if(E.onbeforedomupdate){E.onbeforedomupdate(A,M,S)
}if(E.queueonbeforedomupdate){E.queueonbeforedomupdate(A,M,S)
}}var B=A.getResponseHeader("Ajax-Update-Ids");
var L;
var G=function(){if(A4J.AJAX.headElementsCounter!=0){LOG.debug("Script "+A4J.AJAX.headElementsCounter+" was loaded");
--A4J.AJAX.headElementsCounter
}if(A4J.AJAX.headElementsCounter==0){A4J.AJAX.processResponseAfterUpdateHeadElements(A,L)
}};
if(E.affected){L=E.affected;
A.appendNewHeadElements(G)
}else{if(B&&B!=""){LOG.debug("Update page by list of rendered areas from response "+B);
L=B.split(",");
A.appendNewHeadElements(G)
}else{LOG.warn("No information in response about elements to replace");
A.doFinish()
}}var Q=A.getElementById("ajax-view-state");
LOG.debug("Hidden JSF state fields: "+Q);
if(Q!=null){var J=E.parameters["org.ajax4jsf.portlet.NAMESPACE"];
LOG.debug("Namespace for hidden view-state input fields is "+J);
var H=J?window.document.getElementById(J):window.document;
var C=H.getElementsByTagName("input");
try{var N=A.getElementsByTagName("input",Q);
A4J.AJAX.replaceViewState(C,N)
}catch(O){LOG.warn("No elements 'input' in response")
}try{var N=A.getElementsByTagName("INPUT",Q);
A4J.AJAX.replaceViewState(C,N)
}catch(O){LOG.warn("No elements 'INPUT' in response")
}}for(var K=0;
K<A4J.AJAX._listeners.length;
K++){var F=A4J.AJAX._listeners[K];
if(F.onafterajax){var S=A.getJSON("_ajax:data");
F.onafterajax(A,A.domEvt,S)
}}var P=A.getJSON("_A4J.AJAX.focus");
if(P){LOG.debug("focus must be set to control "+P);
var D=false;
if(A.form){D=A.form.elements[P]
}if(!D){LOG.debug("No control element "+P+" in submitted form");
D=document.getElementById(P)
}if(D){LOG.debug("Set focus to control ");
D.focus();
if(D.select){D.select()
}}else{LOG.warn("Element for set focus not found")
}}else{LOG.debug("No focus information in response")
}}else{LOG.error("Error parsing XML");
LOG.error("Parse Error: "+A.getParserStatus())
}}};
A4J.AJAX.replacePage=function(B){if(!B.getResponseText()){LOG.warn("No content in response for replace current page");
return 
}LOG.debug("replace all page content with response");
var A=Sarissa._SARISSA_IS_IE;
var C=window.document.open;
if(A){LOG.debug("setup custom document.open method");
window.document.open=function(E,G,D,F){C(E,G,D,F)
}
}window.setTimeout(function(){var E=false;
try{var K=B.getContentType();
var I=A?B.getResponseText().replace(/(<script(?!\s+src=))/igm,"$1 defer "):B.getResponseText();
window.document.open(K,"replace");
if(window.LOG){LOG.debug("window.document has opened for writing")
}E=true;
window.document.write(I);
if(window.LOG){LOG.debug("window.document has been writed")
}window.document.close();
if(window.LOG){LOG.debug("window.document has been closed for writing")
}if(A){window.location.reload(false)
}}catch(J){if(window.LOG){LOG.debug("exception during write page content "+J.Message)
}if(E){window.document.close()
}var H=(new DOMParser()).parseFromString(B.getResponseText(),"text/xml");
if(Sarissa.getParseErrorText(H)==Sarissa.PARSED_OK){if(window.LOG){LOG.debug("response has parsed as DOM documnet.")
}Sarissa.clearChildNodes(window.document.documentElement);
var D=H.documentElement.childNodes;
for(var F=0;
F<D.length;
F++){if(D[F].nodeType==1){if(window.LOG){LOG.debug("append new node in document")
}var G=window.document.importNode(D[F],true);
window.document.documentElement.appendChild(G)
}}}else{if(window.LOG){LOG.error("Error parsing response",Sarissa.getParseErrorText(H))
}}}finally{window.document.open=C
}if(window.LOG){LOG.debug("page content has been replaced")
}},0)
};
A4J.AJAX.replaceViewState=function(A,E){LOG.debug("Replace value for inputs: "+A.length+" by new values: "+E.length);
if((E.length>0)&&(A.length>0)){for(var D=0;
D<E.length;
D++){var F=E[D];
LOG.debug("Input in response: "+F.getAttribute("name"));
for(var C=0;
C<A.length;
C++){var B=A[C];
B.setAttribute("autocomplete","off");
if(B.name==F.getAttribute("name")){LOG.debug("Found same input on page with type: "+B.type);
B.value=F.getAttribute("value")
}}}}};
A4J.AJAX.finishRequest=function(C){var B=C.options;
if(!C._oncomplete_aborted){var A;
try{A=C.getElementById("org.ajax4jsf.oncomplete")
}catch(D){LOG.warn("Error reading oncomplete from request "+D.message)
}if(A){LOG.debug("Call request oncomplete function after processing updates");
window.setTimeout(function(){var G=C.domEvt;
var H;
try{H=C.getJSON("_ajax:data")
}catch(J){LOG.warn("Error reading data from request "+J.message)
}try{var I=null;
if(G){I=G.target?G.target:G.srcElement
}var F=Sarissa.getText(A,true);
var E=new Function("request","event","data",F);
E.call(I,C,G,H);
if(B.queueoncomplete){B.queueoncomplete.call(I,C,G,H)
}}catch(J){LOG.error("Error evaluate oncomplete function "+J.Message)
}A4J.AJAX.status(C.containerId,B.status,false)
},0)
}else{if(B.oncomplete||B.queueoncomplete){LOG.debug("Call local oncomplete function after processing updates");
window.setTimeout(function(){var E=C.domEvt;
var F;
try{F=C.getJSON("_ajax:data")
}catch(G){LOG.warn("Error reading data from request "+G.message)
}if(B.oncomplete){B.oncomplete(C,E,F)
}if(B.queueoncomplete){B.queueoncomplete(C,E,F)
}A4J.AJAX.status(C.containerId,B.status,false)
},0)
}else{LOG.debug("Processing updates finished, no oncomplete function to call");
setTimeout(function(){A4J.AJAX.status(C.containerId,B.status,false)
},0)
}}}else{LOG.debug("Aborted request, won't call oncomplete at all");
setTimeout(function(){A4J.AJAX.status(C.containerId,B.status,false)
},0)
}A4J.AJAX.popQueue(C)
};
A4J.AJAX.popQueue=function(A){if(A.shouldNotifyQueue&&A.queue){A.queue.pop()
}};
A4J.AJAX.getCursorPos=function(D){if(D.selectionEnd!=null){return D.selectionEnd
}var C=document.selection.createRange();
var B=C.compareEndPoints("StartToEnd",C)==0;
if(!B){C.collapse(false)
}var A=C.getBookmark();
return A.charCodeAt(2)-2
};
A4J.AJAX.locateForm=function(B){var A=B;
while(A&&A.nodeName.toLowerCase()!="form"){A=A.parentNode
}return A
};
A4J.AJAX.getElementById=function(E,B){var D=B["org.ajax4jsf.portlet.NAMESPACE"];
var A=D?window.document.getElementById(D):window.document;
var C;
if(A){C=A.getElementById(E)
}else{LOG.error("No root element for portlet namespace "+D+" on page")
}return C
};
A4J.AJAX._requestsCounts={};
A4J.AJAX.status=function(E,A,F){try{A=A||E+":status";
A4J.AJAX._requestsCounts[A]=(A4J.AJAX._requestsCounts[A]||0)+(F?1:-1);
var C=document.getElementById(A+".start");
var B=document.getElementById(A+".stop");
if(A4J.AJAX._requestsCounts[A]>0){if(B){B.style.display="none"
}if(C){C.style.display=""
}}else{if(C){C.style.display="none"
}if(B){B.style.display=""
}}if(F){if(C&&(typeof (C.onstart)=="function")){C.onstart()
}}else{if(B&&(typeof (B.onstop)=="function")){B.onstop()
}}}catch(D){LOG.error("Exception on status change: ")
}};
A4J.Query=function(A,B){this._query={AJAXREQUEST:A};
this._oldSubmit=null;
this._form=B;
this._containerId=A;
this._actionUrl=(this._form.action)?this._form.action:this._form
};
A4J.Query.prototype={_form:null,_actionUrl:null,_ext:"",_query:{},_oldSubmit:null,_pageBase:window.location.protocol+"//"+window.location.host,hidden:function(A){this._value_query(A);
if((A.name.length>4)&&(A.name.lastIndexOf("_idcl")==(A.name.length-5))){A.value=""
}else{if((A.name.length>12)&&(A.name.lastIndexOf("_link_hidden_")==(A.name.length-13))){A.value=""
}}},text:function(A){this._value_query(A)
},textarea:function(A){this._value_query(A)
},"select-one":function(A){if(A.selectedIndex!=-1){this._value_query(A)
}},password:function(A){this._value_query(A)
},file:function(A){this._value_query(A)
},radio:function(A){this._radio_query(A)
},checkbox:function(A){this._check_query(A)
},"select-multiple":function(E){var B=E.name;
var A=E.options;
for(var C=0;
C<E.length;
C++){var D=A[C];
this._addOption(B,D)
}},_addOption:function(A,B){if(B.selected){if(!this._query[A]){this._query[A]=[]
}this._query[A][this._query[A].length]=B.value
}},image:function(B,A){if(A){this._value_query(B)
}},button:function(B,A){if(A){this._value_query(B)
}},submit:function(B,A){if(A){this._value_query(B)
}},link:function(B,A){if(A){this._value_query(B);
if(B.parameters){this.appendParameters(B.parameters)
}}},input:function(B,A){if(A){this.link(B,A);
if(B.control){this.appendControl(B.control,A)
}}},appendControl:function(B,A){if(this[B.type]){this[B.type](B,A)
}else{this._appendById(B.id||B)
}},appendFormControls:function(F,D){try{var C=this._form.elements;
if(C){var B=0;
for(B=0;
B<C.length;
B++){var E=C[B];
if(E==D){continue
}try{if(!F||E.type=="hidden"){this.appendControl(E,false)
}}catch(A){LOG.error("exception in building query ( append form control ) "+A)
}}}}catch(G){LOG.warn("Error with append form controls to query "+G)
}if(D){this.appendControl(D,true)
}},appendParameters:function(A){for(k in A){if(typeof Object.prototype[k]=="undefined"){LOG.debug("parameter "+k+" with value "+A[k]);
this.appendParameter(k,A[k])
}}},setActionUrl:function(A){this._actionUrl=A
},getActionUrl:function(A){var B=this._actionUrl;
var C=B.indexOf("?");
if(B.substring(0,1)=="/"){B=this._pageBase+B
}if(!A){A=this._ext
}if(C>=0){return B.substring(0,C)+A+B.substring(C)
}else{return B+A
}},getQueryString:function(){var A="";
var D;
var F=[];
var E;
for(var C in this._query){if(typeof Object.prototype[C]=="undefined"){D=this._query[C];
E=this._encode(C);
if(D instanceof Object){for(var B=0;
B<D.length;
B++){F.push(E);
F.push("=");
F.push(this._encode(D[B]));
F.push("&")
}}else{F.push(E);
F.push("=");
F.push(this._encode(D));
F.push("&")
}}}A=F.join("");
LOG.debug("QueryString: "+A);
return A
},_appendById:function(A){this.appendParameter(this._form.id+"_link_hidden_",A)
},_value_query:function(A){if(A.name){LOG.debug("Append "+A.type+" control "+A.name+" with value ["+A.value+"] and value attribute ["+A.getAttribute("value")+"]");
if(null!=A.value){this.appendParameter(A.name,A.value)
}}else{LOG.debug("Ignored "+A.type+" no-name control with value ["+A.value+"] and value attribute ["+A.getAttribute("value")+"]")
}},_check_query:function(A){if(A.checked){this.appendParameter(A.name,A.value?A.value:"on")
}},_radio_query:function(A){if(A.checked){this.appendParameter(A.name,A.value?A.value:"")
}},appendParameter:function(A,B){if(!this._query[A]){this._query[A]=B;
return 
}else{if(!(this._query[A] instanceof Object)){this._query[A]=[this._query[A]]
}}this._query[A][this._query[A].length]=B
},_encode:function(A){try{return encodeURIComponent(A)
}catch(B){var C=escape(A);
return C.split("+").join("%2B")
}}};
A4J.AJAX.getText=function(G,C){var E="";
var B=G.childNodes;
for(var D=0;
D<B.length;
D++){var F=B[D];
var A=F.nodeType;
if(A==Node.TEXT_NODE||A==Node.CDATA_SECTION_NODE||(C&&A==Node.COMMENT_NODE)){E+=F.data
}else{if(A==Node.ELEMENT_NODE||A==Node.DOCUMENT_NODE||A==Node.DOCUMENT_FRAGMENT_NODE){E+=arguments.callee(F,C)
}}}return E
};
A4J.AJAX.isWebkitBreakingAmps=function(){if(!this._webkitBreakingAmps){var A=document.createElement("div");
A.innerHTML="<a href='#a=a&#38;b=b'>link</a>";
var B=A.firstChild;
if(B&&B.getAttribute&&/&#38;b=b$/.test(B.getAttribute("href"))){this._webkitBreakingAmps=2
}else{this._webkitBreakingAmps=1
}}return this._webkitBreakingAmps>1
};
A4J.AJAX.isXhtmlScriptMode=function(){if(!this._xhtmlScriptMode){var A=document.createElement("div");
A.innerHTML="<script type='text/javascript'><!--\r\n/**/\r\n//--><\/script>";
var C=false;
var B=A.firstChild;
while(B){if(B.nodeType==Node.ELEMENT_NODE){var D=B.firstChild;
while(D){if(D.nodeType==Node.COMMENT_NODE){C=true;
break
}D=D.nextSibling
}break
}B=B.nextSibling
}if(C){this._xhtmlScriptMode=2
}else{this._xhtmlScriptMode=1
}}return this._xhtmlScriptMode>1
};
A4J.AJAX._scriptEvaluated=false;
A4J.AJAX.TestScriptEvaluation=function(){if((!document.all||window.opera)&&!A4J.AJAX._scriptTested){try{var C=Sarissa.getDomDocument();
var A=document.createElement("span");
document.body.appendChild(A);
var F="<html xmlns='http://www.w3.org/1999/xhtml'><script>A4J.AJAX._scriptEvaluated=true;<\/script></html>";
C=(new DOMParser()).parseFromString(F,"text/xml");
var B=C.getElementsByTagName("script")[0];
if(!window.opera&&!A4J.AJAX.isWebkitBreakingAmps()&&A.outerHTML){A.outerHTML=new XMLSerializer().serializeToString(B)
}else{var E;
E=window.document.importNode(B,true);
document.body.replaceChild(E,A)
}}catch(D){}}A4J.AJAX._scriptTested=true
};
A4J.AJAX.TestReplacedGetElementByIdVisibility=function(){if(!A4J.AJAX._replacedGetElementByIdVisibilityTested){A4J.AJAX._replacedGetElementByIdVisibilityTested=true;
A4J.AJAX.TestScriptEvaluation();
if(A4J.AJAX._scriptEvaluated){try{A4J.AJAX._testReplacedGetElementByIdVisibility=true;
var B=document.createElement("span");
document.body.appendChild(B);
var E="<html xmlns='http://www.w3.org/1999/xhtml'><span id='_A4J_AJAX_TestReplacedGetElementByIdVisibility'><script>A4J.AJAX._testReplacedGetElementByIdVisibility = !!(document.getElementById('_A4J_AJAX_TestReplacedGetElementByIdVisibility'));<\/script></span></html>";
oDomDoc=(new DOMParser()).parseFromString(E,"text/xml");
var A=oDomDoc.getElementsByTagName("span")[0];
var D;
D=window.document.importNode(A,true);
document.body.replaceChild(D,B);
document.body.removeChild(D)
}catch(C){LOG.error("Error testing replaced elements getElementById() visibility: "+C.message)
}}}};
A4J.AJAX._eventQueues={};
A4J.AJAX.EventQueue=function(){var E="dropNew";
var H="dropNext";
var B="fireNew";
var F="fireNext";
var G=function(K,J){for(var I in J){K[I]=J[I]
}};
var A=function(J){var K={};
for(var I in J){K[I]=J[I]
}for(var I in this.requestOptions){if(typeof K[I]=="undefined"){K[I]=this.requestOptions[I]
}}return K
};
var C=function(){var I=function(J,M,K,L){this.queue=J;
this.query=M;
this.options=K;
this.event=L;
this.similarityGroupingId=this.options.similarityGroupingId;
this.eventsCount=1
};
G(I.prototype,{isIgnoreDupResponses:function(){return this.options.ignoreDupResponses
},getSimilarityGroupingId:function(){return this.similarityGroupingId
},setSimilarityGroupingId:function(J){this.similarityGroupingId=J
},submit:function(){this.query.appendParameter("AJAX:EVENTS_COUNT",this.eventsCount);
this.request=A4J.AJAX.SubmitQuery(this.query,this.options,this.event);
var J=this.queue;
this.request.queue=J;
return this.request
},abort:function(){if(this.request&&!this.aborted){this.aborted=true;
this.request.abort()
}},ondrop:function(){var J=this.options.onqueuerequestdrop;
if(J){J.call(this.queue,this.query,this.options,this.event)
}},onRequestDelayPassed:function(){this.readyToSubmit=true;
this.queue.submitFirst()
},startTimer:function(){var J=this.options.requestDelay;
LOG.debug("Queue will wait "+(J||0)+"ms before submit");
if(J){var K=this;
this.timer=setTimeout(function(){try{K.onRequestDelayPassed()
}finally{K.timer=undefined;
K=undefined
}},J)
}else{this.onRequestDelayPassed()
}},stopTimer:function(){if(this.timer){clearTimeout(this.timer);
this.timer=undefined
}},clearEntry:function(){this.stopTimer();
if(this.request){this.request.shouldNotifyQueue=false;
this.request=undefined
}},getEventsCount:function(){return this.eventsCount
},setEventsCount:function(J){this.eventsCount=J
},getEventArguments:function(){return[this.query,this.options,this.event]
}});
return I
}();
var D=function(J,K,I){this.items=new Array();
this.name=J;
this.queueOptions=K||{};
this.requestOptions=I||{}
};
G(D.prototype,{submitFirst:function(){var J=this.items[0];
if(J){if(!J.request){if(J.readyToSubmit){LOG.debug("Queue '"+this.name+"' will submit request NOW");
var I=J.submit();
I.shouldNotifyQueue=true;
if(this.requestOptions.queueonsubmit){this.requestOptions.queueonsubmit.call(this,I)
}}else{LOG.debug("First item is not ready to be submitted yet")
}}}else{LOG.debug("Queue is empty now")
}},getSize:function(){return this.items.length
},getMaximumSize:function(){return this.queueOptions.size
},isFull:function(){return this.getSize()==this.getMaximumSize()
},getSizeExceededBehavior:function(){var I=this.queueOptions.sizeExceededBehavior;
if(!I){I=H
}return I
},queue:function(I){this.items.push(I);
if(this.queueOptions.onrequestqueue){LOG.debug("Call onrequestqueue handler");
this.queueOptions.onrequestqueue.apply(this,I.getEventArguments())
}},dequeue:function(){var I=this.items.shift();
if(this.queueOptions.onrequestdequeue){LOG.debug("Call onrequestdequeue handler");
this.queueOptions.onrequestdequeue.apply(this,I.getEventArguments())
}},push:function(M,I,J){var T=A.call(this,I);
var R=new C(this,M,T,J);
var L=R.getSimilarityGroupingId();
var Q=this.items.length-1;
var S=this.items[Q];
var K=false;
if(S){if(S.getSimilarityGroupingId()==L){LOG.debug("Similar request currently in queue '"+this.name+"'");
if(S.request){LOG.debug("Request has already beeen sent to server");
if(R.isIgnoreDupResponses()){LOG.debug("Duplicate responses ignore requested");
if(!this.isFull()){S.abort();
LOG.debug("Response for the current request will be ignored")
}else{LOG.debug("Queue is full, cannot set to ignore response for the current request")
}}}else{LOG.debug("Combine similar requests and reset timer");
K=true;
S.stopTimer();
R.setEventsCount(S.getEventsCount()+1);
this.items[Q]=R;
R.startTimer()
}}else{LOG.debug("Last queue entry is not the last anymore. Stopping requestDelay timer and marking entry as ready for submission");
S.stopTimer();
S.setSimilarityGroupingId(undefined);
S.readyToSubmit=true
}}if(!K){if(this.isFull()){LOG.debug("Queue '"+this.name+"' is currently full");
var P=this.getSizeExceededBehavior();
var O=0;
while(this.items[O]&&this.items[O].request){O++
}if(this.queueOptions.onsizeexceeded){this.queueOptions.onsizeexceeded.apply(this,R.getEventArguments())
}if(P==E){LOG.debug("Queue '"+this.name+"' is going to drop new item");
R.ondrop();
K=true
}else{if(P==H){LOG.debug("Queue '"+this.name+"' is going to drop ["+O+"] item that is the next one");
var N=this.items.splice(O,1)[0];
if(N){LOG.debug("Item dropped from queue");
N.stopTimer();
N.ondrop()
}else{LOG.debug("There's no such item, will handle new request instead");
R.ondrop();
K=true
}}else{if(P==B){LOG.debug("Queue '"+this.name+"' will submit new request");
R.submit();
K=true
}else{if(P==F){LOG.debug("Queue '"+this.name+"' is going to drop and fire immediately ["+O+"] item that is the next one");
var N=this.items.splice(O,1)[0];
if(N){LOG.debug("Item dropped from queue");
N.stopTimer();
N.submit()
}else{LOG.debug("There's no such item, will handle new request instead");
R.submit();
K=true
}}}}}}this.submitFirst()
}if(!K){this.queue(R);
LOG.debug("New request added to queue '"+this.name+"'. Queue similarityGroupingId changed to "+L);
R.startTimer()
}},pop:function(){LOG.debug("After request: queue '"+this.name+"'");
this.dequeue();
LOG.debug("There are "+this.items.length+" requests more in this queue");
this.submitFirst()
},clear:function(){var J=this.items.length;
for(var I=0;
I<this.items.length;
I++){this.items[I].clearEntry()
}this.items.splice(0,J)
}});
return D
}();
A4J.AJAX.EventQueue.DEFAULT_QUEUE_NAME="org.richfaces.queue.global";
A4J.AJAX.EventQueue.getQueue=function(A){return A4J.AJAX._eventQueues[A]
};
A4J.AJAX.EventQueue.getQueues=function(){return A4J.AJAX._eventQueues
};
A4J.AJAX.EventQueue.addQueue=function(A){var B=A.name;
if(A4J.AJAX._eventQueues[B]){throw"Queue already registered"
}else{LOG.debug("Adding queue '"+B+"' to queues registry");
A4J.AJAX._eventQueues[B]=A
}};
A4J.AJAX.EventQueue.removeQueue=function(B){var A=A4J.AJAX._eventQueues[B];
if(A){A.clear()
}delete A4J.AJAX._eventQueues[B]
};
A4J.AJAX.EventQueue.getOrCreateQueue=function(){var A=function(C,D){if(D){return D+":"+C
}else{return C
}};
var B=function(C,D){if(D){return D+C
}else{return C
}};
return function(E,J){var H=E.eventsQueue;
var G=E.namespace;
var D;
var F;
var I;
if(H){LOG.debug("Look up queue with name '"+H+"'");
D=A(H,J);
F=B(H,G);
I=F
}else{LOG.debug("Look up queue with default name");
D=J;
F=B(A4J.AJAX.EventQueue.DEFAULT_QUEUE_NAME,G);
I=E.implicitEventsQueue
}var C=A4J.AJAX._eventQueues[D];
if(!C){C=A4J.AJAX._eventQueues[F];
if(!C){if(I){C=A4J.AJAX._eventQueues[I];
if(!C){LOG.debug("Creating new transient queue '"+I+"' with default settings");
C=new A4J.AJAX.EventQueue(I);
C._transient=true;
A4J.AJAX.EventQueue.addQueue(C)
}else{LOG.debug("Found transient queue '"+I+"'")
}}}else{LOG.debug("Found view queue '"+F+"'")
}}else{LOG.debug("Found form queue '"+D+"'")
}return C
}
}();
(function(){var A=function(){var C=A4J.AJAX.EventQueue.getQueues();
for(var D in C){var B=C[D];
B.clear()
}};
if(window.addEventListener){window.addEventListener("unload",A,false)
}else{window.attachEvent("onunload",A)
}})();
if(!window.LOG){window.LOG={}
}LOG.Level=function(B,C,A){this.name=B;
this.priority=C;
if(A){this.color=A
}};
LOG.OFF=new LOG.Level("off",1000);
LOG.FATAL=new LOG.Level("fatal",900,"red");
LOG.ERROR=new LOG.Level("error",800,"red");
LOG.WARN=new LOG.Level("warn",500,"yellow");
LOG.INFO=new LOG.Level("info",400,"blue");
LOG.DEBUG=new LOG.Level("debug",300,"darkblue");
LOG.ALL=new LOG.Level("all",100);
LOG.A4J_DEBUG=new LOG.Level("a4j_debug",0,"green");
LOG.LEVEL=LOG.OFF;
LOG._window=null;
LOG.transmitToServer=true;
LOG.consoleDivId="logConsole";
LOG.styles={a4j_debug:"green",debug:"darkblue",info:"blue",warn:"yellow",error:"red",fatal:"red"};
LOG.a4j_debug=function(B,A){LOG._log(B,LOG.A4J_DEBUG,A)
};
LOG.debug=function(B,A){LOG._log(B,LOG.DEBUG,A)
};
LOG.info=function(B,A){LOG._log(B,LOG.INFO,A)
};
LOG.warn=function(B,A){LOG._log(B,LOG.WARN,A)
};
LOG.error=function(B,A){LOG._log(B,LOG.ERROR,A)
};
LOG.fatal=function(B,A){LOG._log(B,LOG.FATAL,A)
};
LOG.registerPopup=function(B,C,E,A,F){if(!LOG._onkeydown){LOG._onkeydown=document.onkeydown
}var D=B.toUpperCase();
document.onkeydown=function(G){if(window.event){G=window.event
}if(String.fromCharCode(G.keyCode)==D&G.shiftKey&G.ctrlKey){LOG.LEVEL=F;
LOG.openWindow(C,"width="+E+",height="+A+",toolbar=no,scrollbars=yes,location=no,statusbar=no,menubar=no,resizable=yes,left = "+((screen.width-E)/2)+",top ="+((screen.height-A)/2))
}else{if(LOG._onkeydown){LOG._onkeydown(G)
}}}
};
LOG.clear=function(){if(LOG._window&&LOG._window.document){consoleDiv=LOG._window.document.body
}else{consoleDiv=window.document.getElementById(LOG.consoleDivId)
}consoleDiv.innerHTML='<button onclick="LOG.clear()">Clear</button><br />'
};
LOG.openWindow=function(B,C){if(LOG._window){LOG._window.focus()
}else{LOG._window=window.open("",B,C);
LOG._window.LOG=LOG;
LOG.clear();
var A=LOG;
LOG._window.onunload=function(){A._window.LOG=null;
A._window=null;
A.LEVEL=A.OFF;
A=undefined
}
}};
LOG._log=function(C,A,B){if(A.priority>=LOG.LEVEL.priority){LOG._logToConsole(C,A,B);
if(LOG.transmitToServer){LOG._logToServer(C,A)
}}};
LOG._time=function(){var D=new Date();
var A=D.getHours();
var C=D.getMinutes();
if(C<10){C="0"+C
}var E=D.getSeconds();
if(E<10){E="0"+E
}var B=D.getTime()%1000;
if(B<100){B="0"+B
}if(B<10){B="0"+B
}return A+":"+C+":"+E+","+B
};
LOG._logToConsole=function(C,B,E){var F;
var G;
if(LOG._window&&LOG._window.document){G=LOG._window.document;
F=LOG._window.document.body
}else{G=window.document;
F=window.document.getElementById(LOG.consoleDivId)
}if(F){var H=G.createElement("span");
H.style.color=B.color;
H.appendChild(G.createTextNode(B.name+"["+LOG._time()+"]: "));
var A=G.createElement("div");
var I=G.createTextNode(C);
A.appendChild(H);
A.appendChild(I);
if(E){var D=G.createElement("span");
I=G.createTextNode(E);
D.appendChild(I);
A.appendChild(D)
}F.appendChild(A)
}else{}};
LOG._logToServer=function(C,A){var B=A.name.substring(0,1)+C
};
LOG._requestCallBack=function(){};
if(!window.RichFaces){window.RichFaces={}
}if(!window.RichFaces.Memory){window.RichFaces.Memory={nodeCleaners:{},componentCleaners:{},addCleaner:function(A,B){this.nodeCleaners[A]=B
},addComponentCleaner:function(B,C,A){this.componentCleaners[B]={cleaner:C,checker:A}
},applyCleaners:function(B,C,D){for(var A in this.nodeCleaners){this.nodeCleaners[A](B,C)
}for(var A in this.componentCleaners){if(this.componentCleaners[A].checker(B,C)){D.push(B)
}}},_clean:function(F,E,G){if(F){this.applyCleaners(F,E,G);
var B=F.all;
if(B){var A=0;
var D=B.length;
for(var A=0;
A<D;
A++){this.applyCleaners(B[A],E,G)
}}else{var C=F.firstChild;
while(C){this._clean(C,E,G);
C=C.nextSibling
}}}},_cleanComponentNodes:function(E,D){for(var B=0;
B<E.length;
B++){var C=E[B];
for(var A in this.componentCleaners){this.componentCleaners[A].cleaner(C,D)
}}},clean:function(B,A){var C=[];
this._clean(B,A,C);
this._cleanComponentNodes(C,A);
C=null
}};
window.RichFaces.Memory.addComponentCleaner("richfaces",function(D,E){var B=D.component;
if(B){var C=B["rich:destructor"];
if(C){var A=B[C];
if(A){A.call(B,E)
}}}},function(A,B){return(A.component&&A.component["rich:destructor"])
});
if(window.attachEvent){window.attachEvent("onunload",function(){var A=window.RichFaces.Memory;
A.clean(document);
A.clean(window)
})
}}
var Builder={NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(A){A=A.toUpperCase();
var F=this.NODEMAP[A]||"div";
var B=document.createElement(F);
try{B.innerHTML="<"+A+"></"+A+">"
}catch(E){}var D=B.firstChild||null;
if(D&&(D.tagName.toUpperCase()!=A)){D=D.getElementsByTagName(A)[0]
}if(!D){D=document.createElement(A)
}if(!D){return 
}if(arguments[1]){if(this._isStringOrNumber(arguments[1])||(arguments[1] instanceof Array)||arguments[1].tagName){this._children(D,arguments[1])
}else{var C=this._attributes(arguments[1]);
if(C.length){try{B.innerHTML="<"+A+" "+C+"></"+A+">"
}catch(E){}D=B.firstChild||null;
if(!D){D=document.createElement(A);
for(attr in arguments[1]){D[attr=="class"?"className":attr]=arguments[1][attr]
}}if(D.tagName.toUpperCase()!=A){D=B.getElementsByTagName(A)[0]
}}}}if(arguments[2]){this._children(D,arguments[2])
}return $(D)
},_text:function(A){return document.createTextNode(A)
},ATTR_MAP:{"className":"class","htmlFor":"for"},_attributes:function(A){var B=[];
for(attribute in A){B.push((attribute in this.ATTR_MAP?this.ATTR_MAP[attribute]:attribute)+'="'+A[attribute].toString().escapeHTML().gsub(/"/,"&quot;")+'"')
}return B.join(" ")
},_children:function(B,A){if(A.tagName){B.appendChild(A);
return 
}if(typeof A=="object"){A.flatten().each(function(C){if(typeof C=="object"){B.appendChild(C)
}else{if(Builder._isStringOrNumber(C)){B.appendChild(Builder._text(C))
}}})
}else{if(Builder._isStringOrNumber(A)){B.appendChild(Builder._text(A))
}}},_isStringOrNumber:function(A){return(typeof A=="string"||typeof A=="number")
},build:function(B){var A=this.node("div");
$(A).update(B.strip());
return A.down()
},dump:function(B){if(typeof B!="object"&&typeof B!="function"){B=window
}var A=("A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR").split(/\s+/);
A.each(function(C){B[C]=function(){return Builder.node.apply(Builder,[C].concat($A(arguments)))
}
})
}};
String.prototype.parseColor=function(){var A="#";
if(this.slice(0,4)=="rgb("){var C=this.slice(4,this.length-1).split(",");
var B=0;
do{A+=parseInt(C[B]).toColorPart()
}while(++B<3)
}else{if(this.slice(0,1)=="#"){if(this.length==4){for(var B=1;
B<4;
B++){A+=(this.charAt(B)+this.charAt(B)).toLowerCase()
}}if(this.length==7){A=this.toLowerCase()
}}}return(A.length==7?A:(arguments[0]||this))
};
Element.collectTextNodes=function(A){return $A($(A).childNodes).collect(function(B){return(B.nodeType==3?B.nodeValue:(B.hasChildNodes()?Element.collectTextNodes(B):""))
}).flatten().join("")
};
Element.collectTextNodesIgnoreClass=function(A,B){return $A($(A).childNodes).collect(function(C){return(C.nodeType==3?C.nodeValue:((C.hasChildNodes()&&!Element.hasClassName(C,B))?Element.collectTextNodesIgnoreClass(C,B):""))
}).flatten().join("")
};
Element.setContentZoom=function(A,B){A=$(A);
A.setStyle({fontSize:(B/100)+"em"});
if(Prototype.Browser.WebKit){window.scrollBy(0,0)
}return A
};
Element.getInlineOpacity=function(A){return $(A).style.opacity||""
};
Element.forceRerendering=function(A){try{A=$(A);
var C=document.createTextNode(" ");
A.appendChild(C);
A.removeChild(C)
}catch(B){}};
var Effect={_elementDoesNotExistError:{name:"ElementDoesNotExistError",message:"The specified DOM element does not exist, but is required for this effect to operate"},Transitions:{linear:Prototype.K,sinoidal:function(A){return(-Math.cos(A*Math.PI)/2)+0.5
},reverse:function(A){return 1-A
},flicker:function(A){var A=((-Math.cos(A*Math.PI)/4)+0.75)+Math.random()/4;
return A>1?1:A
},wobble:function(A){return(-Math.cos(A*Math.PI*(9*A))/2)+0.5
},pulse:function(B,A){return(-Math.cos((B*((A||5)-0.5)*2)*Math.PI)/2)+0.5
},spring:function(A){return 1-(Math.cos(A*4.5*Math.PI)*Math.exp(-A*6))
},none:function(A){return 0
},full:function(A){return 1
}},DefaultOptions:{duration:1,fps:100,sync:false,from:0,to:1,delay:0,queue:"parallel"},tagifyText:function(A){var B="position:relative";
if(Prototype.Browser.IE){B+=";zoom:1"
}A=$(A);
$A(A.childNodes).each(function(C){if(C.nodeType==3){C.nodeValue.toArray().each(function(D){A.insertBefore(new Element("span",{style:B}).update(D==" "?String.fromCharCode(160):D),C)
});
Element.remove(C)
}})
},multiple:function(B,C){var E;
if(((typeof B=="object")||Object.isFunction(B))&&(B.length)){E=B
}else{E=$(B).childNodes
}var A=Object.extend({speed:0.1,delay:0},arguments[2]||{});
var D=A.delay;
$A(E).each(function(G,F){new C(G,Object.extend(A,{delay:F*A.speed+D}))
})
},PAIRS:{"slide":["SlideDown","SlideUp"],"blind":["BlindDown","BlindUp"],"appear":["Appear","Fade"]},toggle:function(B,C){B=$(B);
C=(C||"appear").toLowerCase();
var A=Object.extend({queue:{position:"end",scope:(B.id||"global"),limit:1}},arguments[2]||{});
Effect[B.visible()?Effect.PAIRS[C][1]:Effect.PAIRS[C][0]](B,A)
}};
Effect.DefaultOptions.transition=Effect.Transitions.sinoidal;
Effect.ScopedQueue=Class.create(Enumerable,{initialize:function(){this.effects=[];
this.interval=null
},_each:function(A){this.effects._each(A)
},add:function(B){var C=new Date().getTime();
var A=Object.isString(B.options.queue)?B.options.queue:B.options.queue.position;
switch(A){case"front":this.effects.findAll(function(D){return D.state=="idle"
}).each(function(D){D.startOn+=B.finishOn;
D.finishOn+=B.finishOn
});
break;
case"with-last":C=this.effects.pluck("startOn").max()||C;
break;
case"end":C=this.effects.pluck("finishOn").max()||C;
break
}B.startOn+=C;
B.finishOn+=C;
if(!B.options.queue.limit||(this.effects.length<B.options.queue.limit)){this.effects.push(B)
}if(!this.interval){this.interval=setInterval(this.loop.bind(this),15)
}},remove:function(A){this.effects=this.effects.reject(function(B){return B==A
});
if(this.effects.length==0){clearInterval(this.interval);
this.interval=null
}},loop:function(){var C=new Date().getTime();
for(var B=0,A=this.effects.length;
B<A;
B++){this.effects[B]&&this.effects[B].loop(C)
}}});
Effect.Queues={instances:$H(),get:function(A){if(!Object.isString(A)){return A
}return this.instances.get(A)||this.instances.set(A,new Effect.ScopedQueue())
}};
Effect.Queue=Effect.Queues.get("global");
Effect.Base=Class.create({position:null,start:function(A){function B(D,C){return((D[C+"Internal"]?"this.options."+C+"Internal(this);":"")+(D[C]?"this.options."+C+"(this);":""))
}if(A&&A.transition===false){A.transition=Effect.Transitions.linear
}this.options=Object.extend(Object.extend({},Effect.DefaultOptions),A||{});
this.currentFrame=0;
this.state="idle";
this.startOn=this.options.delay*1000;
this.finishOn=this.startOn+(this.options.duration*1000);
this.fromToDelta=this.options.to-this.options.from;
this.totalTime=this.finishOn-this.startOn;
this.totalFrames=this.options.fps*this.options.duration;
this.render=(function(){function C(E,D){if(E.options[D+"Internal"]){E.options[D+"Internal"](E)
}if(E.options[D]){E.options[D](E)
}}return function(D){if(this.state==="idle"){this.state="running";
C(this,"beforeSetup");
if(this.setup){this.setup()
}C(this,"afterSetup")
}if(this.state==="running"){D=(this.options.transition(D)*this.fromToDelta)+this.options.from;
this.position=D;
C(this,"beforeUpdate");
if(this.update){this.update(D)
}C(this,"afterUpdate")
}}
})();
this.event("beforeStart");
if(!this.options.sync){Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).add(this)
}},loop:function(C){if(C>=this.startOn){if(C>=this.finishOn){this.render(1);
this.cancel();
this.event("beforeFinish");
if(this.finish){this.finish()
}this.event("afterFinish");
return 
}var B=(C-this.startOn)/this.totalTime,A=(B*this.totalFrames).round();
if(A>this.currentFrame){this.render(B);
this.currentFrame=A
}}},cancel:function(){if(!this.options.sync){Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).remove(this)
}this.state="finished"
},event:function(A){if(this.options[A+"Internal"]){this.options[A+"Internal"](this)
}if(this.options[A]){this.options[A](this)
}},inspect:function(){var A=$H();
for(property in this){if(!Object.isFunction(this[property])){A.set(property,this[property])
}}return"#<Effect:"+A.inspect()+",options:"+$H(this.options).inspect()+">"
}});
Effect.Parallel=Class.create(Effect.Base,{initialize:function(A){this.effects=A||[];
this.start(arguments[1])
},update:function(A){this.effects.invoke("render",A)
},finish:function(A){this.effects.each(function(B){B.render(1);
B.cancel();
B.event("beforeFinish");
if(B.finish){B.finish(A)
}B.event("afterFinish")
})
}});
Effect.Tween=Class.create(Effect.Base,{initialize:function(C,F,E){C=Object.isString(C)?$(C):C;
var B=$A(arguments),D=B.last(),A=B.length==5?B[3]:null;
this.method=Object.isFunction(D)?D.bind(C):Object.isFunction(C[D])?C[D].bind(C):function(G){C[D]=G
};
this.start(Object.extend({from:F,to:E},A||{}))
},update:function(A){this.method(A)
}});
Effect.Event=Class.create(Effect.Base,{initialize:function(){this.start(Object.extend({duration:0},arguments[0]||{}))
},update:Prototype.emptyFunction});
Effect.Opacity=Class.create(Effect.Base,{initialize:function(B){this.element=$(B);
if(!this.element){throw (Effect._elementDoesNotExistError)
}if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout)){this.element.setStyle({zoom:1})
}var A=Object.extend({from:this.element.getOpacity()||0,to:1},arguments[1]||{});
this.start(A)
},update:function(A){this.element.setOpacity(A)
}});
Effect.Move=Class.create(Effect.Base,{initialize:function(B){this.element=$(B);
if(!this.element){throw (Effect._elementDoesNotExistError)
}var A=Object.extend({x:0,y:0,mode:"relative"},arguments[1]||{});
this.start(A)
},setup:function(){this.element.makePositioned();
this.originalLeft=parseFloat(this.element.getStyle("left")||"0");
this.originalTop=parseFloat(this.element.getStyle("top")||"0");
if(this.options.mode=="absolute"){this.options.x=this.options.x-this.originalLeft;
this.options.y=this.options.y-this.originalTop
}},update:function(A){this.element.setStyle({left:(this.options.x*A+this.originalLeft).round()+"px",top:(this.options.y*A+this.originalTop).round()+"px"})
}});
Effect.MoveBy=function(B,A,C){return new Effect.Move(B,Object.extend({x:C,y:A},arguments[3]||{}))
};
Effect.Scale=Class.create(Effect.Base,{initialize:function(B,C){this.element=$(B);
if(!this.element){throw (Effect._elementDoesNotExistError)
}var A=Object.extend({scaleX:true,scaleY:true,scaleContent:true,scaleFromCenter:false,scaleMode:"box",scaleFrom:100,scaleTo:C},arguments[2]||{});
this.start(A)
},setup:function(){this.restoreAfterFinish=this.options.restoreAfterFinish||false;
this.elementPositioning=this.element.getStyle("position");
this.originalStyle={};
["top","left","width","height","fontSize"].each(function(B){this.originalStyle[B]=this.element.style[B]
}.bind(this));
this.originalTop=this.element.offsetTop;
this.originalLeft=this.element.offsetLeft;
var A=this.element.getStyle("font-size")||"100%";
["em","px","%","pt"].each(function(B){if(A.indexOf(B)>0){this.fontSize=parseFloat(A);
this.fontSizeType=B
}}.bind(this));
this.factor=(this.options.scaleTo-this.options.scaleFrom)/100;
this.dims=null;
if(this.options.scaleMode=="box"){this.dims=[this.element.offsetHeight,this.element.offsetWidth]
}if(/^content/.test(this.options.scaleMode)){this.dims=[this.element.scrollHeight,this.element.scrollWidth]
}if(!this.dims){this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth]
}},update:function(A){var B=(this.options.scaleFrom/100)+(this.factor*A);
if(this.options.scaleContent&&this.fontSize){this.element.setStyle({fontSize:this.fontSize*B+this.fontSizeType})
}this.setDimensions(this.dims[0]*B,this.dims[1]*B)
},finish:function(A){if(this.restoreAfterFinish){this.element.setStyle(this.originalStyle)
}},setDimensions:function(A,D){var E={};
if(this.options.scaleX){E.width=D.round()+"px"
}if(this.options.scaleY){E.height=A.round()+"px"
}if(this.options.scaleFromCenter){var C=(A-this.dims[0])/2;
var B=(D-this.dims[1])/2;
if(this.elementPositioning=="absolute"){if(this.options.scaleY){E.top=this.originalTop-C+"px"
}if(this.options.scaleX){E.left=this.originalLeft-B+"px"
}}else{if(this.options.scaleY){E.top=-C+"px"
}if(this.options.scaleX){E.left=-B+"px"
}}}this.element.setStyle(E)
}});
Effect.Highlight=Class.create(Effect.Base,{initialize:function(B){this.element=$(B);
if(!this.element){throw (Effect._elementDoesNotExistError)
}var A=Object.extend({startcolor:"#ffff99"},arguments[1]||{});
this.start(A)
},setup:function(){if(this.element.getStyle("display")=="none"){this.cancel();
return 
}this.oldStyle={};
if(!this.options.keepBackgroundImage){this.oldStyle.backgroundImage=this.element.getStyle("background-image");
this.element.setStyle({backgroundImage:"none"})
}if(!this.options.endcolor){this.options.endcolor=this.element.getStyle("background-color").parseColor("#ffffff")
}if(!this.options.restorecolor){this.options.restorecolor=this.element.getStyle("background-color")
}this._base=$R(0,2).map(function(A){return parseInt(this.options.startcolor.slice(A*2+1,A*2+3),16)
}.bind(this));
this._delta=$R(0,2).map(function(A){return parseInt(this.options.endcolor.slice(A*2+1,A*2+3),16)-this._base[A]
}.bind(this))
},update:function(A){this.element.setStyle({backgroundColor:$R(0,2).inject("#",function(B,C,D){return B+((this._base[D]+(this._delta[D]*A)).round().toColorPart())
}.bind(this))})
},finish:function(){this.element.setStyle(Object.extend(this.oldStyle,{backgroundColor:this.options.restorecolor}))
}});
Effect.ScrollTo=function(C){var B=arguments[1]||{},A=document.viewport.getScrollOffsets(),D=$(C).cumulativeOffset();
if(B.offset){D[1]+=B.offset
}return new Effect.Tween(null,A.top,D[1],B,function(E){scrollTo(A.left,E.round())
})
};
Effect.Fade=function(C){C=$(C);
var A=C.getInlineOpacity();
var B=Object.extend({from:C.getOpacity()||1,to:0,afterFinishInternal:function(D){if(D.options.to!=0){return 
}D.element.hide().setStyle({opacity:A})
}},arguments[1]||{});
return new Effect.Opacity(C,B)
};
Effect.Appear=function(B){B=$(B);
var A=Object.extend({from:(B.getStyle("display")=="none"?0:B.getOpacity()||0),to:1,afterFinishInternal:function(C){C.element.forceRerendering()
},beforeSetup:function(C){C.element.setOpacity(C.options.from).show()
}},arguments[1]||{});
return new Effect.Opacity(B,A)
};
Effect.Puff=function(B){B=$(B);
var A={opacity:B.getInlineOpacity(),position:B.getStyle("position"),top:B.style.top,left:B.style.left,width:B.style.width,height:B.style.height};
return new Effect.Parallel([new Effect.Scale(B,200,{sync:true,scaleFromCenter:true,scaleContent:true,restoreAfterFinish:true}),new Effect.Opacity(B,{sync:true,to:0})],Object.extend({duration:1,beforeSetupInternal:function(C){Position.absolutize(C.effects[0].element)
},afterFinishInternal:function(C){C.effects[0].element.hide().setStyle(A)
}},arguments[1]||{}))
};
Effect.BlindUp=function(A){A=$(A);
A.makeClipping();
return new Effect.Scale(A,0,Object.extend({scaleContent:false,scaleX:false,restoreAfterFinish:true,afterFinishInternal:function(B){B.element.hide().undoClipping()
}},arguments[1]||{}))
};
Effect.BlindDown=function(B){B=$(B);
var A=B.getDimensions();
return new Effect.Scale(B,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:A.height,originalWidth:A.width},restoreAfterFinish:true,afterSetup:function(C){C.element.makeClipping().setStyle({height:"0px"}).show()
},afterFinishInternal:function(C){C.element.undoClipping()
}},arguments[1]||{}))
};
Effect.SwitchOff=function(B){B=$(B);
var A=B.getInlineOpacity();
return new Effect.Appear(B,Object.extend({duration:0.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function(C){new Effect.Scale(C.element,1,{duration:0.3,scaleFromCenter:true,scaleX:false,scaleContent:false,restoreAfterFinish:true,beforeSetup:function(D){D.element.makePositioned().makeClipping()
},afterFinishInternal:function(D){D.element.hide().undoClipping().undoPositioned().setStyle({opacity:A})
}})
}},arguments[1]||{}))
};
Effect.DropOut=function(B){B=$(B);
var A={top:B.getStyle("top"),left:B.getStyle("left"),opacity:B.getInlineOpacity()};
return new Effect.Parallel([new Effect.Move(B,{x:0,y:100,sync:true}),new Effect.Opacity(B,{sync:true,to:0})],Object.extend({duration:0.5,beforeSetup:function(C){C.effects[0].element.makePositioned()
},afterFinishInternal:function(C){C.effects[0].element.hide().undoPositioned().setStyle(A)
}},arguments[1]||{}))
};
Effect.Shake=function(D){D=$(D);
var B=Object.extend({distance:20,duration:0.5},arguments[1]||{});
var E=parseFloat(B.distance);
var C=parseFloat(B.duration)/10;
var A={top:D.getStyle("top"),left:D.getStyle("left")};
return new Effect.Move(D,{x:E,y:0,duration:C,afterFinishInternal:function(F){new Effect.Move(F.element,{x:-E*2,y:0,duration:C*2,afterFinishInternal:function(G){new Effect.Move(G.element,{x:E*2,y:0,duration:C*2,afterFinishInternal:function(H){new Effect.Move(H.element,{x:-E*2,y:0,duration:C*2,afterFinishInternal:function(I){new Effect.Move(I.element,{x:E*2,y:0,duration:C*2,afterFinishInternal:function(J){new Effect.Move(J.element,{x:-E,y:0,duration:C,afterFinishInternal:function(K){K.element.undoPositioned().setStyle(A)
}})
}})
}})
}})
}})
}})
};
Effect.SlideDown=function(C){C=$(C).cleanWhitespace();
var A=C.down().getStyle("bottom");
var B=C.getDimensions();
return new Effect.Scale(C,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:window.opera?0:1,scaleMode:{originalHeight:B.height,originalWidth:B.width},restoreAfterFinish:true,afterSetup:function(D){D.element.makePositioned();
D.element.down().makePositioned();
if(window.opera){D.element.setStyle({top:""})
}D.element.makeClipping().setStyle({height:"0px"}).show()
},afterUpdateInternal:function(D){D.element.down().setStyle({bottom:(D.dims[0]-D.element.clientHeight)+"px"})
},afterFinishInternal:function(D){D.element.undoClipping().undoPositioned();
D.element.down().undoPositioned().setStyle({bottom:A})
}},arguments[1]||{}))
};
Effect.SlideUp=function(C){C=$(C).cleanWhitespace();
var A=C.down().getStyle("bottom");
var B=C.getDimensions();
return new Effect.Scale(C,window.opera?0:1,Object.extend({scaleContent:false,scaleX:false,scaleMode:"box",scaleFrom:100,scaleMode:{originalHeight:B.height,originalWidth:B.width},restoreAfterFinish:true,afterSetup:function(D){D.element.makePositioned();
D.element.down().makePositioned();
if(window.opera){D.element.setStyle({top:""})
}D.element.makeClipping().show()
},afterUpdateInternal:function(D){D.element.down().setStyle({bottom:(D.dims[0]-D.element.clientHeight)+"px"})
},afterFinishInternal:function(D){D.element.hide().undoClipping().undoPositioned();
D.element.down().undoPositioned().setStyle({bottom:A})
}},arguments[1]||{}))
};
Effect.Squish=function(A){return new Effect.Scale(A,window.opera?1:0,{restoreAfterFinish:true,beforeSetup:function(B){B.element.makeClipping()
},afterFinishInternal:function(B){B.element.hide().undoClipping()
}})
};
Effect.Grow=function(C){C=$(C);
var B=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full},arguments[1]||{});
var A={top:C.style.top,left:C.style.left,height:C.style.height,width:C.style.width,opacity:C.getInlineOpacity()};
var G=C.getDimensions();
var H,F;
var E,D;
switch(B.direction){case"top-left":H=F=E=D=0;
break;
case"top-right":H=G.width;
F=D=0;
E=-G.width;
break;
case"bottom-left":H=E=0;
F=G.height;
D=-G.height;
break;
case"bottom-right":H=G.width;
F=G.height;
E=-G.width;
D=-G.height;
break;
case"center":H=G.width/2;
F=G.height/2;
E=-G.width/2;
D=-G.height/2;
break
}return new Effect.Move(C,{x:H,y:F,duration:0.01,beforeSetup:function(I){I.element.hide().makeClipping().makePositioned()
},afterFinishInternal:function(I){new Effect.Parallel([new Effect.Opacity(I.element,{sync:true,to:1,from:0,transition:B.opacityTransition}),new Effect.Move(I.element,{x:E,y:D,sync:true,transition:B.moveTransition}),new Effect.Scale(I.element,100,{scaleMode:{originalHeight:G.height,originalWidth:G.width},sync:true,scaleFrom:window.opera?1:0,transition:B.scaleTransition,restoreAfterFinish:true})],Object.extend({beforeSetup:function(J){J.effects[0].element.setStyle({height:"0px"}).show()
},afterFinishInternal:function(J){J.effects[0].element.undoClipping().undoPositioned().setStyle(A)
}},B))
}})
};
Effect.Shrink=function(C){C=$(C);
var B=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none},arguments[1]||{});
var A={top:C.style.top,left:C.style.left,height:C.style.height,width:C.style.width,opacity:C.getInlineOpacity()};
var F=C.getDimensions();
var E,D;
switch(B.direction){case"top-left":E=D=0;
break;
case"top-right":E=F.width;
D=0;
break;
case"bottom-left":E=0;
D=F.height;
break;
case"bottom-right":E=F.width;
D=F.height;
break;
case"center":E=F.width/2;
D=F.height/2;
break
}return new Effect.Parallel([new Effect.Opacity(C,{sync:true,to:0,from:1,transition:B.opacityTransition}),new Effect.Scale(C,window.opera?1:0,{sync:true,transition:B.scaleTransition,restoreAfterFinish:true}),new Effect.Move(C,{x:E,y:D,sync:true,transition:B.moveTransition})],Object.extend({beforeStartInternal:function(G){G.effects[0].element.makePositioned().makeClipping()
},afterFinishInternal:function(G){G.effects[0].element.hide().undoClipping().undoPositioned().setStyle(A)
}},B))
};
Effect.Pulsate=function(C){C=$(C);
var B=arguments[1]||{},A=C.getInlineOpacity(),E=B.transition||Effect.Transitions.linear,D=function(F){return 1-E((-Math.cos((F*(B.pulses||5)*2)*Math.PI)/2)+0.5)
};
return new Effect.Opacity(C,Object.extend(Object.extend({duration:2,from:0,afterFinishInternal:function(F){F.element.setStyle({opacity:A})
}},B),{transition:D}))
};
Effect.Fold=function(B){B=$(B);
var A={top:B.style.top,left:B.style.left,width:B.style.width,height:B.style.height};
B.makeClipping();
return new Effect.Scale(B,5,Object.extend({scaleContent:false,scaleX:false,afterFinishInternal:function(C){new Effect.Scale(B,1,{scaleContent:false,scaleY:false,afterFinishInternal:function(D){D.element.hide().undoClipping().setStyle(A)
}})
}},arguments[1]||{}))
};
Effect.Morph=Class.create(Effect.Base,{initialize:function(C){this.element=$(C);
if(!this.element){throw (Effect._elementDoesNotExistError)
}var A=Object.extend({style:{}},arguments[1]||{});
if(!Object.isString(A.style)){this.style=$H(A.style)
}else{if(A.style.include(":")){this.style=A.style.parseStyle()
}else{this.element.addClassName(A.style);
this.style=$H(this.element.getStyles());
this.element.removeClassName(A.style);
var B=this.element.getStyles();
this.style=this.style.reject(function(D){return D.value==B[D.key]
});
A.afterFinishInternal=function(D){D.element.addClassName(D.options.style);
D.transforms.each(function(E){D.element.style[E.style]=""
})
}
}}this.start(A)
},setup:function(){function A(B){if(!B||["rgba(0, 0, 0, 0)","transparent"].include(B)){B="#ffffff"
}B=B.parseColor();
return $R(0,2).map(function(C){return parseInt(B.slice(C*2+1,C*2+3),16)
})
}this.transforms=this.style.map(function(G){var F=G[0],E=G[1],D=null;
if(E.parseColor("#zzzzzz")!="#zzzzzz"){E=E.parseColor();
D="color"
}else{if(F=="opacity"){E=parseFloat(E);
if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout)){this.element.setStyle({zoom:1})
}}else{if(Element.CSS_LENGTH.test(E)){var C=E.match(/^([\+\-]?[0-9\.]+)(.*)$/);
E=parseFloat(C[1]);
D=(C.length==3)?C[2]:null
}}}var B=this.element.getStyle(F);
return{style:F.camelize(),originalValue:D=="color"?A(B):parseFloat(B||0),targetValue:D=="color"?A(E):E,unit:D}
}.bind(this)).reject(function(B){return((B.originalValue==B.targetValue)||(B.unit!="color"&&(isNaN(B.originalValue)||isNaN(B.targetValue))))
})
},update:function(A){var D={},B,C=this.transforms.length;
while(C--){D[(B=this.transforms[C]).style]=B.unit=="color"?"#"+(Math.round(B.originalValue[0]+(B.targetValue[0]-B.originalValue[0])*A)).toColorPart()+(Math.round(B.originalValue[1]+(B.targetValue[1]-B.originalValue[1])*A)).toColorPart()+(Math.round(B.originalValue[2]+(B.targetValue[2]-B.originalValue[2])*A)).toColorPart():(B.originalValue+(B.targetValue-B.originalValue)*A).toFixed(3)+(B.unit===null?"":B.unit)
}this.element.setStyle(D,true)
}});
Effect.Transform=Class.create({initialize:function(A){this.tracks=[];
this.options=arguments[1]||{};
this.addTracks(A)
},addTracks:function(A){A.each(function(B){B=$H(B);
var C=B.values().first();
this.tracks.push($H({ids:B.keys().first(),effect:Effect.Morph,options:{style:C}}))
}.bind(this));
return this
},play:function(){return new Effect.Parallel(this.tracks.map(function(A){var D=A.get("ids"),C=A.get("effect"),B=A.get("options");
var E=[$(D)||$$(D)].flatten();
return E.map(function(F){return new C(F,Object.extend({sync:true},B))
})
}).flatten(),this.options)
}});
Element.CSS_PROPERTIES=$w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderSpacing borderTopColor borderTopStyle borderTopWidth bottom clip color fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop markerOffset maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex");
Element.CSS_LENGTH=/^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;
String.__parseStyleElement=document.createElement("div");
String.prototype.parseStyle=function(){var B,A=$H();
if(Prototype.Browser.WebKit){B=new Element("div",{style:this}).style
}else{String.__parseStyleElement.innerHTML='<div style="'+this+'"></div>';
B=String.__parseStyleElement.childNodes[0].style
}Element.CSS_PROPERTIES.each(function(C){if(B[C]){A.set(C,B[C])
}});
if(Prototype.Browser.IE&&this.include("opacity")){A.set("opacity",this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1])
}return A
};
if(document.defaultView&&document.defaultView.getComputedStyle){Element.getStyles=function(B){var A=document.defaultView.getComputedStyle($(B),null);
return Element.CSS_PROPERTIES.inject({},function(C,D){C[D]=A[D];
return C
})
}
}else{Element.getStyles=function(B){B=$(B);
var A=B.currentStyle,C;
C=Element.CSS_PROPERTIES.inject({},function(D,E){D[E]=A[E];
return D
});
if(!C.opacity){C.opacity=B.getOpacity()
}return C
}
}Effect.Methods={morph:function(A,B){A=$(A);
new Effect.Morph(A,Object.extend({style:B},arguments[2]||{}));
return A
},visualEffect:function(C,E,B){C=$(C);
var D=E.dasherize().camelize(),A=D.charAt(0).toUpperCase()+D.substring(1);
new Effect[A](C,B);
return C
},highlight:function(B,A){B=$(B);
new Effect.Highlight(B,A);
return B
}};
$w("fade appear grow shrink fold blindUp blindDown slideUp slideDown pulsate shake puff squish switchOff dropOut").each(function(A){Effect.Methods[A]=function(C,B){C=$(C);
Effect[A.charAt(0).toUpperCase()+A.substring(1)](C,B);
return C
}
});
$w("getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles").each(function(A){Effect.Methods[A]=Element[A]
});
Element.addMethods(Effect.Methods);
if(Object.isUndefined(Effect)){throw ("dragdrop.js requires including script.aculo.us' effects.js library")
}var Droppables={drops:[],remove:function(A){this.drops=this.drops.reject(function(B){return B.element==$(A)
})
},add:function(B){B=$(B);
var A=Object.extend({greedy:true,hoverclass:null,tree:false},arguments[1]||{});
if(A.containment){A._containers=[];
var C=A.containment;
if(Object.isArray(C)){C.each(function(D){A._containers.push($(D))
})
}else{A._containers.push($(C))
}}if(A.accept){A.accept=[A.accept].flatten()
}Element.makePositioned(B);
A.element=B;
this.drops.push(A)
},findDeepestChild:function(A){deepest=A[0];
for(i=1;
i<A.length;
++i){if(Element.isParent(A[i].element,deepest.element)){deepest=A[i]
}}return deepest
},isContained:function(B,A){var C;
if(A.tree){C=B.treeNode
}else{C=B.parentNode
}return A._containers.detect(function(D){return C==D
})
},isAffected:function(A,C,B){return((B.element!=C)&&((!B._containers)||this.isContained(C,B))&&((!B.accept)||(Element.classNames(C).detect(function(D){return B.accept.include(D)
})))&&Position.within(B.element,A[0],A[1]))
},deactivate:function(A){if(A.hoverclass){Element.removeClassName(A.element,A.hoverclass)
}this.last_active=null
},activate:function(A){if(A.hoverclass){Element.addClassName(A.element,A.hoverclass)
}this.last_active=A
},show:function(A,C){if(!this.drops.length){return 
}var B,D=[];
this.drops.each(function(E){if(Droppables.isAffected(A,C,E)){D.push(E)
}});
if(D.length>0){B=Droppables.findDeepestChild(D)
}if(this.last_active&&this.last_active!=B){this.deactivate(this.last_active)
}if(B){Position.within(B.element,A[0],A[1]);
if(B.onHover){B.onHover(C,B.element,Position.overlap(B.overlap,B.element))
}if(B!=this.last_active){Droppables.activate(B)
}}},fire:function(B,A){if(!this.last_active){return 
}Position.prepare();
if(this.isAffected([Event.pointerX(B),Event.pointerY(B)],A,this.last_active)){if(this.last_active.onDrop){this.last_active.onDrop(A,this.last_active.element,B);
return true
}}},reset:function(){if(this.last_active){this.deactivate(this.last_active)
}}};
var Draggables={drags:[],observers:[],register:function(A){if(this.drags.length==0){this.eventMouseUp=this.endDrag.bindAsEventListener(this);
this.eventMouseMove=this.updateDrag.bindAsEventListener(this);
this.eventKeypress=this.keyPress.bindAsEventListener(this);
Event.observe(document,"mouseup",this.eventMouseUp);
Event.observe(document,"mousemove",this.eventMouseMove);
Event.observe(document,"keypress",this.eventKeypress)
}this.drags.push(A)
},unregister:function(A){this.drags=this.drags.reject(function(B){return B==A
});
if(this.drags.length==0){Event.stopObserving(document,"mouseup",this.eventMouseUp);
Event.stopObserving(document,"mousemove",this.eventMouseMove);
Event.stopObserving(document,"keypress",this.eventKeypress)
}},activate:function(A){if(A.options.delay){this._timeout=setTimeout(function(){Draggables._timeout=null;
window.focus();
Draggables.activeDraggable=A
}.bind(this),A.options.delay)
}else{window.focus();
this.activeDraggable=A
}},deactivate:function(){this.activeDraggable=null
},updateDrag:function(A){if(!this.activeDraggable){return 
}var B=[Event.pointerX(A),Event.pointerY(A)];
if(this._lastPointer&&(this._lastPointer.inspect()==B.inspect())){return 
}this._lastPointer=B;
this.activeDraggable.updateDrag(A,B)
},endDrag:function(A){if(this._timeout){clearTimeout(this._timeout);
this._timeout=null
}if(!this.activeDraggable){return 
}this._lastPointer=null;
this.activeDraggable.endDrag(A);
this.activeDraggable=null
},keyPress:function(A){if(this.activeDraggable){this.activeDraggable.keyPress(A)
}},addObserver:function(A){this.observers.push(A);
this._cacheObserverCallbacks()
},removeObserver:function(A){this.observers=this.observers.reject(function(B){return B.element==A
});
this._cacheObserverCallbacks()
},notify:function(B,A,C){if(this[B+"Count"]>0){this.observers.each(function(D){if(D[B]){D[B](B,A,C)
}})
}if(A.options[B]){A.options[B](A,C)
}},_cacheObserverCallbacks:function(){["onStart","onEnd","onDrag"].each(function(A){Draggables[A+"Count"]=Draggables.observers.select(function(B){return B[A]
}).length
})
}};
var Draggable=Class.create({initialize:function(B){var C={handle:false,reverteffect:function(F,E,D){var G=Math.sqrt(Math.abs(E^2)+Math.abs(D^2))*0.02;
new Effect.Move(F,{x:-D,y:-E,duration:G,queue:{scope:"_draggable",position:"end"}})
},endeffect:function(E){var D=Object.isNumber(E._opacity)?E._opacity:1;
new Effect.Opacity(E,{duration:0.2,from:0.7,to:D,queue:{scope:"_draggable",position:"end"},afterFinish:function(){Draggable._dragging[E]=false
}})
},zindex:1000,revert:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,snap:false,delay:0};
if(!arguments[1]||Object.isUndefined(arguments[1].endeffect)){Object.extend(C,{starteffect:function(D){D._opacity=Element.getOpacity(D);
Draggable._dragging[D]=true;
new Effect.Opacity(D,{duration:0.2,from:D._opacity,to:0.7})
}})
}var A=Object.extend(C,arguments[1]||{});
this.element=$(B);
if(A.handle&&Object.isString(A.handle)){this.handle=this.element.down("."+A.handle,0)
}if(!this.handle){this.handle=$(A.handle)
}if(!this.handle){this.handle=this.element
}if(A.scroll&&!A.scroll.scrollTo&&!A.scroll.outerHTML){A.scroll=$(A.scroll);
this._isScrollChild=Element.childOf(this.element,A.scroll)
}Element.makePositioned(this.element);
this.options=A;
this.dragging=false;
this.eventMouseDown=this.initDrag.bindAsEventListener(this);
Event.observe(this.handle,"mousedown",this.eventMouseDown);
Draggables.register(this)
},destroy:function(){Event.stopObserving(this.handle,"mousedown",this.eventMouseDown);
Draggables.unregister(this)
},currentDelta:function(){return([parseInt(Element.getStyle(this.element,"left")||"0"),parseInt(Element.getStyle(this.element,"top")||"0")])
},initDrag:function(A){if(!Object.isUndefined(Draggable._dragging[this.element])&&Draggable._dragging[this.element]){return 
}if(Event.isLeftClick(A)){var C=Event.element(A);
if((tag_name=C.tagName.toUpperCase())&&(tag_name=="INPUT"||tag_name=="SELECT"||tag_name=="OPTION"||tag_name=="BUTTON"||tag_name=="TEXTAREA")){return 
}var B=[Event.pointerX(A),Event.pointerY(A)];
var D=Position.cumulativeOffset(this.element);
this.offset=[0,1].map(function(E){return(B[E]-D[E])
});
Draggables.activate(this);
Event.stop(A)
}},startDrag:function(B){this.dragging=true;
if(!this.delta){this.delta=this.currentDelta()
}if(this.options.zindex){this.originalZ=parseInt(Element.getStyle(this.element,"z-index")||0);
this.element.style.zIndex=this.options.zindex
}if(this.options.ghosting){this._clone=this.element.cloneNode(true);
this._originallyAbsolute=(this.element.getStyle("position")=="absolute");
if(!this._originallyAbsolute){Position.absolutize(this.element)
}this.element.parentNode.insertBefore(this._clone,this.element)
}if(this.options.scroll){if(this.options.scroll==window){var A=this._getWindowScroll(this.options.scroll);
this.originalScrollLeft=A.left;
this.originalScrollTop=A.top
}else{this.originalScrollLeft=this.options.scroll.scrollLeft;
this.originalScrollTop=this.options.scroll.scrollTop
}}Draggables.notify("onStart",this,B);
if(this.options.starteffect){this.options.starteffect(this.element)
}},updateDrag:function(event,pointer){if(!this.dragging){this.startDrag(event)
}if(!this.options.quiet){Position.prepare();
Droppables.show(pointer,this.element)
}Draggables.notify("onDrag",this,event);
this.draw(pointer);
if(this.options.change){this.options.change(this)
}if(this.options.scroll){this.stopScrolling();
var p;
if(this.options.scroll==window){with(this._getWindowScroll(this.options.scroll)){p=[left,top,left+width,top+height]
}}else{p=Position.page(this.options.scroll);
p[0]+=this.options.scroll.scrollLeft+Position.deltaX;
p[1]+=this.options.scroll.scrollTop+Position.deltaY;
p.push(p[0]+this.options.scroll.offsetWidth);
p.push(p[1]+this.options.scroll.offsetHeight)
}var speed=[0,0];
if(pointer[0]<(p[0]+this.options.scrollSensitivity)){speed[0]=pointer[0]-(p[0]+this.options.scrollSensitivity)
}if(pointer[1]<(p[1]+this.options.scrollSensitivity)){speed[1]=pointer[1]-(p[1]+this.options.scrollSensitivity)
}if(pointer[0]>(p[2]-this.options.scrollSensitivity)){speed[0]=pointer[0]-(p[2]-this.options.scrollSensitivity)
}if(pointer[1]>(p[3]-this.options.scrollSensitivity)){speed[1]=pointer[1]-(p[3]-this.options.scrollSensitivity)
}this.startScrolling(speed)
}if(Prototype.Browser.WebKit){window.scrollBy(0,0)
}Event.stop(event)
},finishDrag:function(B,E){this.dragging=false;
if(this.options.quiet){Position.prepare();
var D=[Event.pointerX(B),Event.pointerY(B)];
Droppables.show(D,this.element)
}if(this.options.ghosting){if(!this._originallyAbsolute){Position.relativize(this.element)
}delete this._originallyAbsolute;
Element.remove(this._clone);
this._clone=null
}var F=false;
if(E){F=Droppables.fire(B,this.element);
if(!F){F=false
}}if(F&&this.options.onDropped){this.options.onDropped(this.element)
}Draggables.notify("onEnd",this,B);
var A=this.options.revert;
if(A&&Object.isFunction(A)){A=A(this.element)
}var C=this.currentDelta();
if(A&&this.options.reverteffect){if(F==0||A!="failure"){this.options.reverteffect(this.element,C[1]-this.delta[1],C[0]-this.delta[0])
}}else{this.delta=C
}if(this.options.zindex){this.element.style.zIndex=this.originalZ
}if(this.options.endeffect){this.options.endeffect(this.element)
}Draggables.deactivate(this);
Droppables.reset()
},keyPress:function(A){if(A.keyCode!=Event.KEY_ESC){return 
}this.finishDrag(A,false);
Event.stop(A)
},endDrag:function(A){if(!this.dragging){return 
}this.stopScrolling();
this.finishDrag(A,true);
Event.stop(A)
},draw:function(A){var F=Position.cumulativeOffset(this.element);
if(this.options.ghosting){var C=Position.realOffset(this.element);
F[0]+=C[0]-Position.deltaX;
F[1]+=C[1]-Position.deltaY
}var E=this.currentDelta();
F[0]-=E[0];
F[1]-=E[1];
if(this.options.scroll&&(this.options.scroll!=window&&this._isScrollChild)){F[0]-=this.options.scroll.scrollLeft-this.originalScrollLeft;
F[1]-=this.options.scroll.scrollTop-this.originalScrollTop
}var D=[0,1].map(function(G){return(A[G]-F[G]-this.offset[G])
}.bind(this));
if(this.options.snap){if(Object.isFunction(this.options.snap)){D=this.options.snap(D[0],D[1],this)
}else{if(Object.isArray(this.options.snap)){D=D.map(function(G,H){return(G/this.options.snap[H]).round()*this.options.snap[H]
}.bind(this))
}else{D=D.map(function(G){return(G/this.options.snap).round()*this.options.snap
}.bind(this))
}}}var B=this.element.style;
if((!this.options.constraint)||(this.options.constraint=="horizontal")){B.left=D[0]+"px"
}if((!this.options.constraint)||(this.options.constraint=="vertical")){B.top=D[1]+"px"
}if(B.visibility=="hidden"){B.visibility=""
}},stopScrolling:function(){if(this.scrollInterval){clearInterval(this.scrollInterval);
this.scrollInterval=null;
Draggables._lastScrollPointer=null
}},startScrolling:function(A){if(!(A[0]||A[1])){return 
}this.scrollSpeed=[A[0]*this.options.scrollSpeed,A[1]*this.options.scrollSpeed];
this.lastScrolled=new Date();
this.scrollInterval=setInterval(this.scroll.bind(this),10)
},scroll:function(){var current=new Date();
var delta=current-this.lastScrolled;
this.lastScrolled=current;
if(this.options.scroll==window){with(this._getWindowScroll(this.options.scroll)){if(this.scrollSpeed[0]||this.scrollSpeed[1]){var d=delta/1000;
this.options.scroll.scrollTo(left+d*this.scrollSpeed[0],top+d*this.scrollSpeed[1])
}}}else{this.options.scroll.scrollLeft+=this.scrollSpeed[0]*delta/1000;
this.options.scroll.scrollTop+=this.scrollSpeed[1]*delta/1000
}Position.prepare();
Droppables.show(Draggables._lastPointer,this.element);
Draggables.notify("onDrag",this);
if(this._isScrollChild){Draggables._lastScrollPointer=Draggables._lastScrollPointer||$A(Draggables._lastPointer);
Draggables._lastScrollPointer[0]+=this.scrollSpeed[0]*delta/1000;
Draggables._lastScrollPointer[1]+=this.scrollSpeed[1]*delta/1000;
if(Draggables._lastScrollPointer[0]<0){Draggables._lastScrollPointer[0]=0
}if(Draggables._lastScrollPointer[1]<0){Draggables._lastScrollPointer[1]=0
}this.draw(Draggables._lastScrollPointer)
}if(this.options.change){this.options.change(this)
}},_getWindowScroll:function(w){var T,L,W,H;
with(w.document){if(w.document.documentElement&&documentElement.scrollTop){T=documentElement.scrollTop;
L=documentElement.scrollLeft
}else{if(w.document.body){T=body.scrollTop;
L=body.scrollLeft
}}if(w.innerWidth){W=w.innerWidth;
H=w.innerHeight
}else{if(w.document.documentElement&&documentElement.clientWidth){W=documentElement.clientWidth;
H=documentElement.clientHeight
}else{W=body.offsetWidth;
H=body.offsetHeight
}}}return{top:T,left:L,width:W,height:H}
}});
Draggable._dragging={};
var SortableObserver=Class.create({initialize:function(B,A){this.element=$(B);
this.observer=A;
this.lastValue=Sortable.serialize(this.element)
},onStart:function(){this.lastValue=Sortable.serialize(this.element)
},onEnd:function(){Sortable.unmark();
if(this.lastValue!=Sortable.serialize(this.element)){this.observer(this.element)
}}});
var Sortable={SERIALIZE_RULE:/^[^_\-](?:[A-Za-z0-9\-\_]*)[_](.*)$/,sortables:{},_findRootElement:function(A){while(A.tagName.toUpperCase()!="BODY"){if(A.id&&Sortable.sortables[A.id]){return A
}A=A.parentNode
}},options:function(A){A=Sortable._findRootElement($(A));
if(!A){return 
}return Sortable.sortables[A.id]
},destroy:function(A){A=$(A);
var B=Sortable.sortables[A.id];
if(B){Draggables.removeObserver(B.element);
B.droppables.each(function(C){Droppables.remove(C)
});
B.draggables.invoke("destroy");
delete Sortable.sortables[B.element.id]
}},create:function(C){C=$(C);
var B=Object.extend({element:C,tag:"li",dropOnEmpty:false,tree:false,treeTag:"ul",overlap:"vertical",constraint:"vertical",containment:C,handle:false,only:false,delay:0,hoverclass:null,ghosting:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,format:this.SERIALIZE_RULE,elements:false,handles:false,onChange:Prototype.emptyFunction,onUpdate:Prototype.emptyFunction},arguments[1]||{});
this.destroy(C);
var A={revert:true,quiet:B.quiet,scroll:B.scroll,scrollSpeed:B.scrollSpeed,scrollSensitivity:B.scrollSensitivity,delay:B.delay,ghosting:B.ghosting,constraint:B.constraint,handle:B.handle};
if(B.starteffect){A.starteffect=B.starteffect
}if(B.reverteffect){A.reverteffect=B.reverteffect
}else{if(B.ghosting){A.reverteffect=function(F){F.style.top=0;
F.style.left=0
}
}}if(B.endeffect){A.endeffect=B.endeffect
}if(B.zindex){A.zindex=B.zindex
}var D={overlap:B.overlap,containment:B.containment,tree:B.tree,hoverclass:B.hoverclass,onHover:Sortable.onHover};
var E={onHover:Sortable.onEmptyHover,overlap:B.overlap,containment:B.containment,hoverclass:B.hoverclass};
Element.cleanWhitespace(C);
B.draggables=[];
B.droppables=[];
if(B.dropOnEmpty||B.tree){Droppables.add(C,E);
B.droppables.push(C)
}(B.elements||this.findElements(C,B)||[]).each(function(H,F){var G=B.handles?$(B.handles[F]):(B.handle?$(H).select("."+B.handle)[0]:H);
B.draggables.push(new Draggable(H,Object.extend(A,{handle:G})));
Droppables.add(H,D);
if(B.tree){H.treeNode=C
}B.droppables.push(H)
});
if(B.tree){(Sortable.findTreeElements(C,B)||[]).each(function(F){Droppables.add(F,E);
F.treeNode=C;
B.droppables.push(F)
})
}this.sortables[C.id]=B;
Draggables.addObserver(new SortableObserver(C,B.onUpdate))
},findElements:function(B,A){return Element.findChildren(B,A.only,A.tree?true:false,A.tag)
},findTreeElements:function(B,A){return Element.findChildren(B,A.only,A.tree?true:false,A.treeTag)
},onHover:function(E,D,A){if(Element.isParent(D,E)){return 
}if(A>0.33&&A<0.66&&Sortable.options(D).tree){return 
}else{if(A>0.5){Sortable.mark(D,"before");
if(D.previousSibling!=E){var B=E.parentNode;
E.style.visibility="hidden";
D.parentNode.insertBefore(E,D);
if(D.parentNode!=B){Sortable.options(B).onChange(E)
}Sortable.options(D.parentNode).onChange(E)
}}else{Sortable.mark(D,"after");
var C=D.nextSibling||null;
if(C!=E){var B=E.parentNode;
E.style.visibility="hidden";
D.parentNode.insertBefore(E,C);
if(D.parentNode!=B){Sortable.options(B).onChange(E)
}Sortable.options(D.parentNode).onChange(E)
}}}},onEmptyHover:function(E,G,H){var I=E.parentNode;
var A=Sortable.options(G);
if(!Element.isParent(G,E)){var F;
var C=Sortable.findElements(G,{tag:A.tag,only:A.only});
var B=null;
if(C){var D=Element.offsetSize(G,A.overlap)*(1-H);
for(F=0;
F<C.length;
F+=1){if(D-Element.offsetSize(C[F],A.overlap)>=0){D-=Element.offsetSize(C[F],A.overlap)
}else{if(D-(Element.offsetSize(C[F],A.overlap)/2)>=0){B=F+1<C.length?C[F+1]:null;
break
}else{B=C[F];
break
}}}}G.insertBefore(E,B);
Sortable.options(I).onChange(E);
A.onChange(E)
}},unmark:function(){if(Sortable._marker){Sortable._marker.hide()
}},mark:function(B,A){var D=Sortable.options(B.parentNode);
if(D&&!D.ghosting){return 
}if(!Sortable._marker){Sortable._marker=($("dropmarker")||Element.extend(document.createElement("DIV"))).hide().addClassName("dropmarker").setStyle({position:"absolute"});
document.getElementsByTagName("body").item(0).appendChild(Sortable._marker)
}var C=Position.cumulativeOffset(B);
Sortable._marker.setStyle({left:C[0]+"px",top:C[1]+"px"});
if(A=="after"){if(D.overlap=="horizontal"){Sortable._marker.setStyle({left:(C[0]+B.clientWidth)+"px"})
}else{Sortable._marker.setStyle({top:(C[1]+B.clientHeight)+"px"})
}}Sortable._marker.show()
},_tree:function(E,B,F){var D=Sortable.findElements(E,B)||[];
for(var C=0;
C<D.length;
++C){var A=D[C].id.match(B.format);
if(!A){continue
}var G={id:encodeURIComponent(A?A[1]:null),element:E,parent:F,children:[],position:F.children.length,container:$(D[C]).down(B.treeTag)};
if(G.container){this._tree(G.container,B,G)
}F.children.push(G)
}return F
},tree:function(D){D=$(D);
var C=this.options(D);
var B=Object.extend({tag:C.tag,treeTag:C.treeTag,only:C.only,name:D.id,format:C.format},arguments[1]||{});
var A={id:null,parent:null,children:[],container:D,position:0};
return Sortable._tree(D,B,A)
},_constructIndex:function(B){var A="";
do{if(B.id){A="["+B.position+"]"+A
}}while((B=B.parent)!=null);
return A
},sequence:function(B){B=$(B);
var A=Object.extend(this.options(B),arguments[1]||{});
return $(this.findElements(B,A)||[]).map(function(C){return C.id.match(A.format)?C.id.match(A.format)[1]:""
})
},setSequence:function(B,C){B=$(B);
var A=Object.extend(this.options(B),arguments[2]||{});
var D={};
this.findElements(B,A).each(function(E){if(E.id.match(A.format)){D[E.id.match(A.format)[1]]=[E,E.parentNode]
}E.parentNode.removeChild(E)
});
C.each(function(E){var F=D[E];
if(F){F[1].appendChild(F[0]);
delete D[E]
}})
},serialize:function(C){C=$(C);
var B=Object.extend(Sortable.options(C),arguments[1]||{});
var A=encodeURIComponent((arguments[1]&&arguments[1].name)?arguments[1].name:C.id);
if(B.tree){return Sortable.tree(C,arguments[1]).children.map(function(D){return[A+Sortable._constructIndex(D)+"[id]="+encodeURIComponent(D.id)].concat(D.children.map(arguments.callee))
}).flatten().join("&")
}else{return Sortable.sequence(C,arguments[1]).map(function(D){return A+"[]="+encodeURIComponent(D)
}).join("&")
}}};
Element.isParent=function(B,A){if(!B.parentNode||B==A){return false
}if(B.parentNode==A){return true
}return Element.isParent(B.parentNode,A)
};
Element.findChildren=function(D,B,A,C){if(!D.hasChildNodes()){return null
}C=C.toUpperCase();
if(B){B=[B].flatten()
}var E=[];
$A(D.childNodes).each(function(G){if(G.tagName&&G.tagName.toUpperCase()==C&&(!B||(Element.classNames(G).detect(function(H){return B.include(H)
})))){E.push(G)
}if(A){var F=Element.findChildren(G,B,A,C);
if(F){E.push(F)
}}});
return(E.length>0?E.flatten():[])
};
Element.offsetSize=function(A,B){return A["offset"+((B=="vertical"||B=="height")?"Height":"Width")]
};
if(typeof Effect=="undefined"){throw ("controls.js requires including script.aculo.us' effects.js library")
}var Autocompleter={};
Autocompleter.Base=Class.create({baseInitialize:function(B,C,A){B=$(B);
this.element=B;
this.update=$(C);
this.hasFocus=false;
this.changed=false;
this.active=false;
this.index=0;
this.entryCount=0;
this.oldElementValue=this.element.value;
if(this.setOptions){this.setOptions(A)
}else{this.options=A||{}
}this.options.paramName=this.options.paramName||this.element.name;
this.options.tokens=this.options.tokens||[];
this.options.frequency=this.options.frequency||0.4;
this.options.minChars=this.options.minChars||1;
this.options.onShow=this.options.onShow||function(D,E){if(!E.style.position||E.style.position=="absolute"){E.style.position="absolute";
Position.clone(D,E,{setHeight:false,offsetTop:D.offsetHeight})
}Effect.Appear(E,{duration:0.15})
};
this.options.onHide=this.options.onHide||function(D,E){new Effect.Fade(E,{duration:0.15})
};
if(typeof (this.options.tokens)=="string"){this.options.tokens=new Array(this.options.tokens)
}if(!this.options.tokens.include("\n")){this.options.tokens.push("\n")
}this.observer=null;
this.element.setAttribute("autocomplete","off");
Element.hide(this.update);
Event.observe(this.element,"blur",this.onBlur.bindAsEventListener(this));
Event.observe(this.element,"keydown",this.onKeyPress.bindAsEventListener(this))
},show:function(){if(Element.getStyle(this.update,"display")=="none"){this.options.onShow(this.element,this.update)
}if(!this.iefix&&(Prototype.Browser.IE)&&(Element.getStyle(this.update,"position")=="absolute")){new Insertion.After(this.update,'<iframe id="'+this.update.id+'_iefix" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" src="javascript:false;" frameborder="0" scrolling="no"></iframe>');
this.iefix=$(this.update.id+"_iefix")
}if(this.iefix){setTimeout(this.fixIEOverlapping.bind(this),50)
}},fixIEOverlapping:function(){Position.clone(this.update,this.iefix,{setTop:(!this.update.style.height)});
this.iefix.style.zIndex=1;
this.update.style.zIndex=2;
Element.show(this.iefix)
},hide:function(){this.stopIndicator();
if(Element.getStyle(this.update,"display")!="none"){this.options.onHide(this.element,this.update)
}if(this.iefix){Element.hide(this.iefix)
}},startIndicator:function(){if(this.options.indicator){Element.show(this.options.indicator)
}},stopIndicator:function(){if(this.options.indicator){Element.hide(this.options.indicator)
}},onKeyPress:function(A){if(this.active){switch(A.keyCode){case Event.KEY_TAB:case Event.KEY_RETURN:this.selectEntry();
Event.stop(A);
case Event.KEY_ESC:this.hide();
this.active=false;
Event.stop(A);
return ;
case Event.KEY_LEFT:case Event.KEY_RIGHT:return ;
case Event.KEY_UP:this.markPrevious();
this.render();
Event.stop(A);
return ;
case Event.KEY_DOWN:this.markNext();
this.render();
Event.stop(A);
return 
}}else{if(A.keyCode==Event.KEY_TAB||A.keyCode==Event.KEY_RETURN||(Prototype.Browser.WebKit>0&&A.keyCode==0)){return 
}}this.changed=true;
this.hasFocus=true;
if(this.observer){clearTimeout(this.observer)
}this.observer=setTimeout(this.onObserverEvent.bind(this),this.options.frequency*1000)
},activate:function(){this.changed=false;
this.hasFocus=true;
this.getUpdatedChoices()
},onHover:function(B){var A=Event.findElement(B,"LI");
if(this.index!=A.autocompleteIndex){this.index=A.autocompleteIndex;
this.render()
}Event.stop(B)
},onClick:function(B){var A=Event.findElement(B,"LI");
this.index=A.autocompleteIndex;
this.selectEntry();
this.hide()
},onBlur:function(A){setTimeout(this.hide.bind(this),250);
this.hasFocus=false;
this.active=false
},render:function(){if(this.entryCount>0){for(var A=0;
A<this.entryCount;
A++){this.index==A?Element.addClassName(this.getEntry(A),"selected"):Element.removeClassName(this.getEntry(A),"selected")
}if(this.hasFocus){this.show();
this.active=true
}}else{this.active=false;
this.hide()
}},markPrevious:function(){if(this.index>0){this.index--
}else{this.index=this.entryCount-1
}this.getEntry(this.index).scrollIntoView(true)
},markNext:function(){if(this.index<this.entryCount-1){this.index++
}else{this.index=0
}this.getEntry(this.index).scrollIntoView(false)
},getEntry:function(A){return this.update.firstChild.childNodes[A]
},getCurrentEntry:function(){return this.getEntry(this.index)
},selectEntry:function(){this.active=false;
this.updateElement(this.getCurrentEntry())
},updateElement:function(F){if(this.options.updateElement){this.options.updateElement(F);
return 
}var D="";
if(this.options.select){var A=$(F).select("."+this.options.select)||[];
if(A.length>0){D=Element.collectTextNodes(A[0],this.options.select)
}}else{D=Element.collectTextNodesIgnoreClass(F,"informal")
}var C=this.getTokenBounds();
if(C[0]!=-1){var E=this.element.value.substr(0,C[0]);
var B=this.element.value.substr(C[0]).match(/^\s+/);
if(B){E+=B[0]
}this.element.value=E+D+this.element.value.substr(C[1])
}else{this.element.value=D
}this.oldElementValue=this.element.value;
this.element.focus();
if(this.options.afterUpdateElement){this.options.afterUpdateElement(this.element,F)
}},updateChoices:function(C){if(!this.changed&&this.hasFocus){this.update.innerHTML=C;
Element.cleanWhitespace(this.update);
Element.cleanWhitespace(this.update.down());
if(this.update.firstChild&&this.update.down().childNodes){this.entryCount=this.update.down().childNodes.length;
for(var A=0;
A<this.entryCount;
A++){var B=this.getEntry(A);
B.autocompleteIndex=A;
this.addObservers(B)
}}else{this.entryCount=0
}this.stopIndicator();
this.index=0;
if(this.entryCount==1&&this.options.autoSelect){this.selectEntry();
this.hide()
}else{this.render()
}}},addObservers:function(A){Event.observe(A,"mouseover",this.onHover.bindAsEventListener(this));
Event.observe(A,"click",this.onClick.bindAsEventListener(this))
},onObserverEvent:function(){this.changed=false;
this.tokenBounds=null;
if(this.getToken().length>=this.options.minChars){this.getUpdatedChoices()
}else{this.active=false;
this.hide()
}this.oldElementValue=this.element.value
},getToken:function(){var A=this.getTokenBounds();
return this.element.value.substring(A[0],A[1]).strip()
},getTokenBounds:function(){if(null!=this.tokenBounds){return this.tokenBounds
}var E=this.element.value;
if(E.strip().empty()){return[-1,0]
}var F=arguments.callee.getFirstDifferencePos(E,this.oldElementValue);
var H=(F==this.oldElementValue.length?1:0);
var D=-1,C=E.length;
var G;
for(var B=0,A=this.options.tokens.length;
B<A;
++B){G=E.lastIndexOf(this.options.tokens[B],F+H-1);
if(G>D){D=G
}G=E.indexOf(this.options.tokens[B],F+H);
if(-1!=G&&G<C){C=G
}}return(this.tokenBounds=[D+1,C])
}});
Autocompleter.Base.prototype.getTokenBounds.getFirstDifferencePos=function(C,A){var D=Math.min(C.length,A.length);
for(var B=0;
B<D;
++B){if(C[B]!=A[B]){return B
}}return D
};
Ajax.Autocompleter=Class.create(Autocompleter.Base,{initialize:function(C,D,B,A){this.baseInitialize(C,D,A);
this.options.asynchronous=true;
this.options.onComplete=this.onComplete.bind(this);
this.options.defaultParams=this.options.parameters||null;
this.url=B
},getUpdatedChoices:function(){this.startIndicator();
var A=encodeURIComponent(this.options.paramName)+"="+encodeURIComponent(this.getToken());
this.options.parameters=this.options.callback?this.options.callback(this.element,A):A;
if(this.options.defaultParams){this.options.parameters+="&"+this.options.defaultParams
}new Ajax.Request(this.url,this.options)
},onComplete:function(A){this.updateChoices(A.responseText)
}});
Autocompleter.Local=Class.create(Autocompleter.Base,{initialize:function(B,D,C,A){this.baseInitialize(B,D,A);
this.options.array=C
},getUpdatedChoices:function(){this.updateChoices(this.options.selector(this))
},setOptions:function(A){this.options=Object.extend({choices:10,partialSearch:true,partialChars:2,ignoreCase:true,fullSearch:false,selector:function(B){var D=[];
var C=[];
var H=B.getToken();
var G=0;
for(var E=0;
E<B.options.array.length&&D.length<B.options.choices;
E++){var F=B.options.array[E];
var I=B.options.ignoreCase?F.toLowerCase().indexOf(H.toLowerCase()):F.indexOf(H);
while(I!=-1){if(I==0&&F.length!=H.length){D.push("<li><strong>"+F.substr(0,H.length)+"</strong>"+F.substr(H.length)+"</li>");
break
}else{if(H.length>=B.options.partialChars&&B.options.partialSearch&&I!=-1){if(B.options.fullSearch||/\s/.test(F.substr(I-1,1))){C.push("<li>"+F.substr(0,I)+"<strong>"+F.substr(I,H.length)+"</strong>"+F.substr(I+H.length)+"</li>");
break
}}}I=B.options.ignoreCase?F.toLowerCase().indexOf(H.toLowerCase(),I+1):F.indexOf(H,I+1)
}}if(C.length){D=D.concat(C.slice(0,B.options.choices-D.length))
}return"<ul>"+D.join("")+"</ul>"
}},A||{})
}});
Field.scrollFreeActivate=function(A){setTimeout(function(){Field.activate(A)
},1)
};
Ajax.InPlaceEditor=Class.create({initialize:function(C,B,A){this.url=B;
this.element=C=$(C);
this.prepareOptions();
this._controls={};
arguments.callee.dealWithDeprecatedOptions(A);
Object.extend(this.options,A||{});
if(!this.options.formId&&this.element.id){this.options.formId=this.element.id+"-inplaceeditor";
if($(this.options.formId)){this.options.formId=""
}}if(this.options.externalControl){this.options.externalControl=$(this.options.externalControl)
}if(!this.options.externalControl){this.options.externalControlOnly=false
}this._originalBackground=this.element.getStyle("background-color")||"transparent";
this.element.title=this.options.clickToEditText;
this._boundCancelHandler=this.handleFormCancellation.bind(this);
this._boundComplete=(this.options.onComplete||Prototype.emptyFunction).bind(this);
this._boundFailureHandler=this.handleAJAXFailure.bind(this);
this._boundSubmitHandler=this.handleFormSubmission.bind(this);
this._boundWrapperHandler=this.wrapUp.bind(this);
this.registerListeners()
},checkForEscapeOrReturn:function(A){if(!this._editing||A.ctrlKey||A.altKey||A.shiftKey){return 
}if(Event.KEY_ESC==A.keyCode){this.handleFormCancellation(A)
}else{if(Event.KEY_RETURN==A.keyCode){this.handleFormSubmission(A)
}}},createControl:function(G,C,B){var E=this.options[G+"Control"];
var F=this.options[G+"Text"];
if("button"==E){var A=document.createElement("input");
A.type="submit";
A.value=F;
A.className="editor_"+G+"_button";
if("cancel"==G){A.onclick=this._boundCancelHandler
}this._form.appendChild(A);
this._controls[G]=A
}else{if("link"==E){var D=document.createElement("a");
D.href="#";
D.appendChild(document.createTextNode(F));
D.onclick="cancel"==G?this._boundCancelHandler:this._boundSubmitHandler;
D.className="editor_"+G+"_link";
if(B){D.className+=" "+B
}this._form.appendChild(D);
this._controls[G]=D
}}},createEditField:function(){var C=(this.options.loadTextURL?this.options.loadingText:this.getText());
var B;
if(1>=this.options.rows&&!/\r|\n/.test(this.getText())){B=document.createElement("input");
B.type="text";
var A=this.options.size||this.options.cols||0;
if(0<A){B.size=A
}}else{B=document.createElement("textarea");
B.rows=(1>=this.options.rows?this.options.autoRows:this.options.rows);
B.cols=this.options.cols||40
}B.name=this.options.paramName;
B.value=C;
B.className="editor_field";
if(this.options.submitOnBlur){B.onblur=this._boundSubmitHandler
}this._controls.editor=B;
if(this.options.loadTextURL){this.loadExternalText()
}this._form.appendChild(this._controls.editor)
},createForm:function(){var B=this;
function A(D,E){var C=B.options["text"+D+"Controls"];
if(!C||E===false){return 
}B._form.appendChild(document.createTextNode(C))
}this._form=$(document.createElement("form"));
this._form.id=this.options.formId;
this._form.addClassName(this.options.formClassName);
this._form.onsubmit=this._boundSubmitHandler;
this.createEditField();
if("textarea"==this._controls.editor.tagName.toLowerCase()){this._form.appendChild(document.createElement("br"))
}if(this.options.onFormCustomization){this.options.onFormCustomization(this,this._form)
}A("Before",this.options.okControl||this.options.cancelControl);
this.createControl("ok",this._boundSubmitHandler);
A("Between",this.options.okControl&&this.options.cancelControl);
this.createControl("cancel",this._boundCancelHandler,"editor_cancel");
A("After",this.options.okControl||this.options.cancelControl)
},destroy:function(){if(this._oldInnerHTML){this.element.innerHTML=this._oldInnerHTML
}this.leaveEditMode();
this.unregisterListeners()
},enterEditMode:function(A){if(this._saving||this._editing){return 
}this._editing=true;
this.triggerCallback("onEnterEditMode");
if(this.options.externalControl){this.options.externalControl.hide()
}this.element.hide();
this.createForm();
this.element.parentNode.insertBefore(this._form,this.element);
if(!this.options.loadTextURL){this.postProcessEditField()
}if(A){Event.stop(A)
}},enterHover:function(A){if(this.options.hoverClassName){this.element.addClassName(this.options.hoverClassName)
}if(this._saving){return 
}this.triggerCallback("onEnterHover")
},getText:function(){return this.element.innerHTML.unescapeHTML()
},handleAJAXFailure:function(A){this.triggerCallback("onFailure",A);
if(this._oldInnerHTML){this.element.innerHTML=this._oldInnerHTML;
this._oldInnerHTML=null
}},handleFormCancellation:function(A){this.wrapUp();
if(A){Event.stop(A)
}},handleFormSubmission:function(D){var B=this._form;
var C=$F(this._controls.editor);
this.prepareSubmission();
var E=this.options.callback(B,C)||"";
if(Object.isString(E)){E=E.toQueryParams()
}E.editorId=this.element.id;
if(this.options.htmlResponse){var A=Object.extend({evalScripts:true},this.options.ajaxOptions);
Object.extend(A,{parameters:E,onComplete:this._boundWrapperHandler,onFailure:this._boundFailureHandler});
new Ajax.Updater({success:this.element},this.url,A)
}else{var A=Object.extend({method:"get"},this.options.ajaxOptions);
Object.extend(A,{parameters:E,onComplete:this._boundWrapperHandler,onFailure:this._boundFailureHandler});
new Ajax.Request(this.url,A)
}if(D){Event.stop(D)
}},leaveEditMode:function(){this.element.removeClassName(this.options.savingClassName);
this.removeForm();
this.leaveHover();
this.element.style.backgroundColor=this._originalBackground;
this.element.show();
if(this.options.externalControl){this.options.externalControl.show()
}this._saving=false;
this._editing=false;
this._oldInnerHTML=null;
this.triggerCallback("onLeaveEditMode")
},leaveHover:function(A){if(this.options.hoverClassName){this.element.removeClassName(this.options.hoverClassName)
}if(this._saving){return 
}this.triggerCallback("onLeaveHover")
},loadExternalText:function(){this._form.addClassName(this.options.loadingClassName);
this._controls.editor.disabled=true;
var A=Object.extend({method:"get"},this.options.ajaxOptions);
Object.extend(A,{parameters:"editorId="+encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(C){this._form.removeClassName(this.options.loadingClassName);
var B=C.responseText;
if(this.options.stripLoadedTextTags){B=B.stripTags()
}this._controls.editor.value=B;
this._controls.editor.disabled=false;
this.postProcessEditField()
}.bind(this),onFailure:this._boundFailureHandler});
new Ajax.Request(this.options.loadTextURL,A)
},postProcessEditField:function(){var A=this.options.fieldPostCreation;
if(A){$(this._controls.editor)["focus"==A?"focus":"activate"]()
}},prepareOptions:function(){this.options=Object.clone(Ajax.InPlaceEditor.DefaultOptions);
Object.extend(this.options,Ajax.InPlaceEditor.DefaultCallbacks);
[this._extraDefaultOptions].flatten().compact().each(function(A){Object.extend(this.options,A)
}.bind(this))
},prepareSubmission:function(){this._saving=true;
this.removeForm();
this.leaveHover();
this.showSaving()
},registerListeners:function(){this._listeners={};
var A;
$H(Ajax.InPlaceEditor.Listeners).each(function(B){A=this[B.value].bind(this);
this._listeners[B.key]=A;
if(!this.options.externalControlOnly){this.element.observe(B.key,A)
}if(this.options.externalControl){this.options.externalControl.observe(B.key,A)
}}.bind(this))
},removeForm:function(){if(!this._form){return 
}this._form.remove();
this._form=null;
this._controls={}
},showSaving:function(){this._oldInnerHTML=this.element.innerHTML;
this.element.innerHTML=this.options.savingText;
this.element.addClassName(this.options.savingClassName);
this.element.style.backgroundColor=this._originalBackground;
this.element.show()
},triggerCallback:function(B,A){if("function"==typeof this.options[B]){this.options[B](this,A)
}},unregisterListeners:function(){$H(this._listeners).each(function(A){if(!this.options.externalControlOnly){this.element.stopObserving(A.key,A.value)
}if(this.options.externalControl){this.options.externalControl.stopObserving(A.key,A.value)
}}.bind(this))
},wrapUp:function(A){this.leaveEditMode();
this._boundComplete(A,this.element)
}});
Object.extend(Ajax.InPlaceEditor.prototype,{dispose:Ajax.InPlaceEditor.prototype.destroy});
Ajax.InPlaceCollectionEditor=Class.create(Ajax.InPlaceEditor,{initialize:function($super,C,B,A){this._extraDefaultOptions=Ajax.InPlaceCollectionEditor.DefaultOptions;
$super(C,B,A)
},createEditField:function(){var A=document.createElement("select");
A.name=this.options.paramName;
A.size=1;
this._controls.editor=A;
this._collection=this.options.collection||[];
if(this.options.loadCollectionURL){this.loadCollection()
}else{this.checkForExternalText()
}this._form.appendChild(this._controls.editor)
},loadCollection:function(){this._form.addClassName(this.options.loadingClassName);
this.showLoadingText(this.options.loadingCollectionText);
var options=Object.extend({method:"get"},this.options.ajaxOptions);
Object.extend(options,{parameters:"editorId="+encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(transport){var js=transport.responseText.strip();
if(!/^\[.*\]$/.test(js)){throw ("Server returned an invalid collection representation.")
}this._collection=eval(js);
this.checkForExternalText()
}.bind(this),onFailure:this.onFailure});
new Ajax.Request(this.options.loadCollectionURL,options)
},showLoadingText:function(B){this._controls.editor.disabled=true;
var A=this._controls.editor.firstChild;
if(!A){A=document.createElement("option");
A.value="";
this._controls.editor.appendChild(A);
A.selected=true
}A.update((B||"").stripScripts().stripTags())
},checkForExternalText:function(){this._text=this.getText();
if(this.options.loadTextURL){this.loadExternalText()
}else{this.buildOptionList()
}},loadExternalText:function(){this.showLoadingText(this.options.loadingText);
var A=Object.extend({method:"get"},this.options.ajaxOptions);
Object.extend(A,{parameters:"editorId="+encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(B){this._text=B.responseText.strip();
this.buildOptionList()
}.bind(this),onFailure:this.onFailure});
new Ajax.Request(this.options.loadTextURL,A)
},buildOptionList:function(){this._form.removeClassName(this.options.loadingClassName);
this._collection=this._collection.map(function(D){return 2===D.length?D:[D,D].flatten()
});
var B=("value" in this.options)?this.options.value:this._text;
var A=this._collection.any(function(D){return D[0]==B
}.bind(this));
this._controls.editor.update("");
var C;
this._collection.each(function(E,D){C=document.createElement("option");
C.value=E[0];
C.selected=A?E[0]==B:0==D;
C.appendChild(document.createTextNode(E[1]));
this._controls.editor.appendChild(C)
}.bind(this));
this._controls.editor.disabled=false;
Field.scrollFreeActivate(this._controls.editor)
}});
Ajax.InPlaceEditor.prototype.initialize.dealWithDeprecatedOptions=function(A){if(!A){return 
}function B(C,D){if(C in A||D===undefined){return 
}A[C]=D
}B("cancelControl",(A.cancelLink?"link":(A.cancelButton?"button":A.cancelLink==A.cancelButton==false?false:undefined)));
B("okControl",(A.okLink?"link":(A.okButton?"button":A.okLink==A.okButton==false?false:undefined)));
B("highlightColor",A.highlightcolor);
B("highlightEndColor",A.highlightendcolor)
};
Object.extend(Ajax.InPlaceEditor,{DefaultOptions:{ajaxOptions:{},autoRows:3,cancelControl:"link",cancelText:"cancel",clickToEditText:"Click to edit",externalControl:null,externalControlOnly:false,fieldPostCreation:"activate",formClassName:"inplaceeditor-form",formId:null,highlightColor:"#ffff99",highlightEndColor:"#ffffff",hoverClassName:"",htmlResponse:true,loadingClassName:"inplaceeditor-loading",loadingText:"Loading...",okControl:"button",okText:"ok",paramName:"value",rows:1,savingClassName:"inplaceeditor-saving",savingText:"Saving...",size:0,stripLoadedTextTags:false,submitOnBlur:false,textAfterControls:"",textBeforeControls:"",textBetweenControls:""},DefaultCallbacks:{callback:function(A){return Form.serialize(A)
},onComplete:function(B,A){new Effect.Highlight(A,{startcolor:this.options.highlightColor,keepBackgroundImage:true})
},onEnterEditMode:null,onEnterHover:function(A){A.element.style.backgroundColor=A.options.highlightColor;
if(A._effect){A._effect.cancel()
}},onFailure:function(B,A){alert("Error communication with the server: "+B.responseText.stripTags())
},onFormCustomization:null,onLeaveEditMode:null,onLeaveHover:function(A){A._effect=new Effect.Highlight(A.element,{startcolor:A.options.highlightColor,endcolor:A.options.highlightEndColor,restorecolor:A._originalBackground,keepBackgroundImage:true})
}},Listeners:{click:"enterEditMode",keydown:"checkForEscapeOrReturn",mouseover:"enterHover",mouseout:"leaveHover"}});
Ajax.InPlaceCollectionEditor.DefaultOptions={loadingCollectionText:"Loading options..."};
Form.Element.DelayedObserver=Class.create({initialize:function(B,A,C){this.delay=A||0.5;
this.element=$(B);
this.callback=C;
this.timer=null;
this.lastValue=$F(this.element);
Event.observe(this.element,"keyup",this.delayedListener.bindAsEventListener(this))
},delayedListener:function(A){if(this.lastValue==$F(this.element)){return 
}if(this.timer){clearTimeout(this.timer)
}this.timer=setTimeout(this.onTimerEvent.bind(this),this.delay*1000);
this.lastValue=$F(this.element)
},onTimerEvent:function(){this.timer=null;
this.callback(this.element,$F(this.element))
}});
if(!Control){var Control={}
}Control.Slider=Class.create({initialize:function(D,A,B){var C=this;
if(Object.isArray(D)){this.handles=D.collect(function(E){return $(E)
})
}else{this.handles=[$(D)]
}this.track=$(A);
this.options=B||{};
this.axis=this.options.axis||"horizontal";
this.increment=this.options.increment||1;
this.step=parseInt(this.options.step||"1");
this.range=this.options.range||$R(0,1);
this.value=0;
this.values=this.handles.map(function(){return 0
});
this.spans=this.options.spans?this.options.spans.map(function(E){return $(E)
}):false;
this.options.startSpan=$(this.options.startSpan||null);
this.options.endSpan=$(this.options.endSpan||null);
this.restricted=this.options.restricted||false;
this.maximum=this.options.maximum||this.range.end;
this.minimum=this.options.minimum||this.range.start;
this.alignX=parseInt(this.options.alignX||"0");
this.alignY=parseInt(this.options.alignY||"0");
this.trackLength=this.maximumOffset()-this.minimumOffset();
this.handleLength=this.isVertical()?(this.handles[0].offsetHeight!=0?this.handles[0].offsetHeight:this.handles[0].style.height.replace(/px$/,"")):(this.handles[0].offsetWidth!=0?this.handles[0].offsetWidth:this.handles[0].style.width.replace(/px$/,""));
this.active=false;
this.dragging=false;
this.disabled=false;
if(this.options.disabled){this.setDisabled()
}this.allowedValues=this.options.values?this.options.values.sortBy(Prototype.K):false;
if(this.allowedValues){this.minimum=this.allowedValues.min();
this.maximum=this.allowedValues.max()
}this.eventMouseDown=this.startDrag.bindAsEventListener(this);
this.eventMouseUp=this.endDrag.bindAsEventListener(this);
this.eventMouseMove=this.update.bindAsEventListener(this);
this.handles.each(function(F,E){E=C.handles.length-1-E;
C.setValue(parseFloat((Object.isArray(C.options.sliderValue)?C.options.sliderValue[E]:C.options.sliderValue)||C.range.start),E);
F.makePositioned().observe("mousedown",C.eventMouseDown)
});
this.track.observe("mousedown",this.eventMouseDown);
document.observe("mouseup",this.eventMouseUp);
document.observe("mousemove",this.eventMouseMove);
this.initialized=true
},dispose:function(){var A=this;
Event.stopObserving(this.track,"mousedown",this.eventMouseDown);
Event.stopObserving(document,"mouseup",this.eventMouseUp);
Event.stopObserving(document,"mousemove",this.eventMouseMove);
this.handles.each(function(B){Event.stopObserving(B,"mousedown",A.eventMouseDown)
})
},setDisabled:function(){this.disabled=true
},setEnabled:function(){this.disabled=false
},getNearestValue:function(A){if(this.allowedValues){if(A>=this.allowedValues.max()){return(this.allowedValues.max())
}if(A<=this.allowedValues.min()){return(this.allowedValues.min())
}var C=Math.abs(this.allowedValues[0]-A);
var B=this.allowedValues[0];
this.allowedValues.each(function(D){var E=Math.abs(D-A);
if(E<=C){B=D;
C=E
}});
return B
}if(A>this.range.end){return this.range.end
}if(A<this.range.start){return this.range.start
}return A
},setValue:function(B,A){if(!this.active){this.activeHandleIdx=A||0;
this.activeHandle=this.handles[this.activeHandleIdx];
this.updateStyles()
}A=A||this.activeHandleIdx||0;
if(this.initialized&&this.restricted){if((A>0)&&(B<this.values[A-1])){B=this.values[A-1]
}if((A<(this.handles.length-1))&&(B>this.values[A+1])){B=this.values[A+1]
}}B=this.getNearestValue(B);
this.values[A]=B;
this.value=this.values[0];
this.handles[A].style[this.isVertical()?"top":"left"]=this.translateToPx(B);
this.drawSpans();
if(!this.dragging||!this.event){this.updateFinished()
}},setValueBy:function(B,A){this.setValue(this.values[A||this.activeHandleIdx||0]+B,A||this.activeHandleIdx||0)
},translateToPx:function(A){return Math.round(((this.trackLength-this.handleLength)/(this.range.end-this.range.start))*(A-this.range.start))+"px"
},translateToValue:function(A){return((A/(this.trackLength-this.handleLength)*(this.range.end-this.range.start))+this.range.start)
},getRange:function(B){var A=this.values.sortBy(Prototype.K);
B=B||0;
return $R(A[B],A[B+1])
},minimumOffset:function(){return(this.isVertical()?this.alignY:this.alignX)
},maximumOffset:function(){return(this.isVertical()?(this.track.offsetHeight!=0?this.track.offsetHeight:this.track.style.height.replace(/px$/,""))-this.alignY:(this.track.offsetWidth!=0?this.track.offsetWidth:this.track.style.width.replace(/px$/,""))-this.alignX)
},isVertical:function(){return(this.axis=="vertical")
},drawSpans:function(){var A=this;
if(this.spans){$R(0,this.spans.length-1).each(function(B){A.setSpan(A.spans[B],A.getRange(B))
})
}if(this.options.startSpan){this.setSpan(this.options.startSpan,$R(0,this.values.length>1?this.getRange(0).min():this.value))
}if(this.options.endSpan){this.setSpan(this.options.endSpan,$R(this.values.length>1?this.getRange(this.spans.length-1).max():this.value,this.maximum))
}},setSpan:function(B,A){if(this.isVertical()){B.style.top=this.translateToPx(A.start);
B.style.height=this.translateToPx(A.end-A.start+this.range.start)
}else{B.style.left=this.translateToPx(A.start);
B.style.width=this.translateToPx(A.end-A.start+this.range.start)
}},updateStyles:function(){this.handles.each(function(A){Element.removeClassName(A,"selected")
});
Element.addClassName(this.activeHandle,"selected")
},startDrag:function(C){if(Event.isLeftClick(C)){if(!this.disabled){this.active=true;
var D=Event.element(C);
var E=[Event.pointerX(C),Event.pointerY(C)];
var A=D;
if(A==this.track){var B=Position.cumulativeOffset(this.track);
this.event=C;
this.setValue(this.translateToValue((this.isVertical()?E[1]-B[1]:E[0]-B[0])-(this.handleLength/2)));
var B=Position.cumulativeOffset(this.activeHandle);
this.offsetX=(E[0]-B[0]);
this.offsetY=(E[1]-B[1])
}else{while((this.handles.indexOf(D)==-1)&&D.parentNode){D=D.parentNode
}if(this.handles.indexOf(D)!=-1){this.activeHandle=D;
this.activeHandleIdx=this.handles.indexOf(this.activeHandle);
this.updateStyles();
var B=Position.cumulativeOffset(this.activeHandle);
this.offsetX=(E[0]-B[0]);
this.offsetY=(E[1]-B[1])
}}}Event.stop(C)
}},update:function(A){if(this.active){if(!this.dragging){this.dragging=true
}this.draw(A);
if(Prototype.Browser.WebKit){window.scrollBy(0,0)
}Event.stop(A)
}},draw:function(B){var C=[Event.pointerX(B),Event.pointerY(B)];
var A=Position.cumulativeOffset(this.track);
C[0]-=this.offsetX+A[0];
C[1]-=this.offsetY+A[1];
this.event=B;
this.setValue(this.translateToValue(this.isVertical()?C[1]:C[0]));
if(this.initialized&&this.options.onSlide){this.options.onSlide(this.values.length>1?this.values:this.value,this)
}},endDrag:function(A){if(this.active&&this.dragging){this.finishDrag(A,true);
Event.stop(A)
}this.active=false;
this.dragging=false
},finishDrag:function(A,B){this.active=false;
this.dragging=false;
this.updateFinished()
},updateFinished:function(){if(this.initialized&&this.options.onChange){this.options.onChange(this.values.length>1?this.values:this.value,this)
}this.event=null
}});
Sound={tracks:{},_enabled:true,template:new Template('<embed style="height:0" id="sound_#{track}_#{id}" src="#{url}" loop="false" autostart="true" hidden="true"/>'),enable:function(){Sound._enabled=true
},disable:function(){Sound._enabled=false
},play:function(B){if(!Sound._enabled){return 
}var A=Object.extend({track:"global",url:B,replace:false},arguments[1]||{});
if(A.replace&&this.tracks[A.track]){$R(0,this.tracks[A.track].id).each(function(D){var C=$("sound_"+A.track+"_"+D);
C.Stop&&C.Stop();
C.remove()
});
this.tracks[A.track]=null
}if(!this.tracks[A.track]){this.tracks[A.track]={id:0}
}else{this.tracks[A.track].id++
}A.id=this.tracks[A.track].id;
$$("body")[0].insert(Prototype.Browser.IE?new Element("bgsound",{id:"sound_"+A.track+"_"+A.id,src:A.url,loop:1,autostart:true}):Sound.template.evaluate(A))
}};
if(Prototype.Browser.Gecko&&navigator.userAgent.indexOf("Win")>0){if(navigator.plugins&&$A(navigator.plugins).detect(function(A){return A.name.indexOf("QuickTime")!=-1
})){Sound.template=new Template('<object id="sound_#{track}_#{id}" width="0" height="0" type="audio/mpeg" data="#{url}"/>')
}else{Sound.play=function(){}
}}
(function(){var L=this,G,Y=L.jQuery,P=L.$,O=L.jQuery=L.j$=function(e,f){if(arguments[0]==arguments.callee){return arguments.callee
}return new O.fn.init(e,f)
},d=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,F=/^.[^:#\[\.,]*$/;
O.fn=O.prototype={init:function(e,h){e=e||document;
if(e.nodeType){this[0]=e;
this.length=1;
this.context=e;
return this
}if(typeof e==="string"){var g=d.exec(e);
if(g&&(g[1]||!h)){if(g[1]){e=O.clean([g[1]],h)
}else{var i=document.getElementById(g[3]);
if(i&&i.id!=g[3]){return O().find(e)
}var f=O(i||[]);
f.context=document;
f.selector=e;
return f
}}else{return O(h).find(e)
}}else{if(O.isFunction(e)){return O(document).ready(e)
}}if(e.selector&&e.context){this.selector=e.selector;
this.context=e.context
}return this.setArray(O.isArray(e)?e:O.makeArray(e))
},selector:"",jquery:"1.3.2",size:function(){return this.length
},get:function(e){return e===G?Array.prototype.slice.call(this):this[e]
},pushStack:function(f,h,e){var g=O(f);
g.prevObject=this;
g.context=this.context;
if(h==="find"){g.selector=this.selector+(this.selector?" ":"")+e
}else{if(h){g.selector=this.selector+"."+h+"("+e+")"
}}return g
},setArray:function(e){this.length=0;
Array.prototype.push.apply(this,e);
return this
},each:function(f,e){return O.each(this,f,e)
},index:function(e){return O.inArray(e&&e.jquery?e[0]:e,this)
},attr:function(f,h,g){var e=f;
if(typeof f==="string"){if(h===G){return this[0]&&O[g||"attr"](this[0],f)
}else{e={};
e[f]=h
}}return this.each(function(j){for(f in e){O.attr(g?this.style:this,f,O.prop(this,e[f],g,j,f))
}})
},css:function(e,f){if((e=="width"||e=="height")&&parseFloat(f)<0){f=G
}return this.attr(e,f,"curCSS")
},text:function(f){if(typeof f!=="object"&&f!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(f))
}var e="";
O.each(f||this,function(){O.each(this.childNodes,function(){if(this.nodeType!=8){e+=this.nodeType!=1?this.nodeValue:O.fn.text([this])
}})
});
return e
},wrapAll:function(e){if(this[0]){var f=O(e,this[0].ownerDocument).clone();
if(this[0].parentNode){f.insertBefore(this[0])
}f.map(function(){var g=this;
while(g.firstChild){g=g.firstChild
}return g
}).append(this)
}return this
},wrapInner:function(e){return this.each(function(){O(this).contents().wrapAll(e)
})
},wrap:function(e){return this.each(function(){O(this).wrapAll(e)
})
},append:function(){return this.domManip(arguments,true,function(e){if(this.nodeType==1){this.appendChild(e)
}})
},prepend:function(){return this.domManip(arguments,true,function(e){if(this.nodeType==1){this.insertBefore(e,this.firstChild)
}})
},before:function(){return this.domManip(arguments,false,function(e){this.parentNode.insertBefore(e,this)
})
},after:function(){return this.domManip(arguments,false,function(e){this.parentNode.insertBefore(e,this.nextSibling)
})
},end:function(){return this.prevObject||O([])
},push:[].push,sort:[].sort,splice:[].splice,find:function(e){if(this.length===1){var f=this.pushStack([],"find",e);
f.length=0;
O.find(e,this[0],f);
return f
}else{return this.pushStack(O.unique(O.map(this,function(g){return O.find(e,g)
})),"find",e)
}},clone:function(g){var e=this.map(function(){if(!O.support.noCloneEvent&&!O.isXMLDoc(this)){var i=this.outerHTML;
if(!i){var j=this.ownerDocument.createElement("div");
j.appendChild(this.cloneNode(true));
i=j.innerHTML
}return O.clean([i.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]
}else{return this.cloneNode(true)
}});
if(g===true){var h=this.find("*").andSelf(),f=0;
e.find("*").andSelf().each(function(){if(this.nodeName!==h[f].nodeName){return 
}var i=O.data(h[f],"events");
for(var k in i){for(var j in i[k]){O.event.add(this,k,i[k][j],i[k][j].data)
}}f++
})
}return e
},filter:function(e){return this.pushStack(O.isFunction(e)&&O.grep(this,function(g,f){return e.call(g,f)
})||O.multiFilter(e,O.grep(this,function(f){return f.nodeType===1
})),"filter",e)
},closest:function(e){var g=O.expr.match.POS.test(e)?O(e):null,f=0;
return this.map(function(){var h=this;
while(h&&h.ownerDocument){if(g?g.index(h)>-1:O(h).is(e)){O.data(h,"closest",f);
return h
}h=h.parentNode;
f++
}})
},not:function(e){if(typeof e==="string"){if(F.test(e)){return this.pushStack(O.multiFilter(e,this,true),"not",e)
}else{e=O.multiFilter(e,this)
}}var f=e.length&&e[e.length-1]!==G&&!e.nodeType;
return this.filter(function(){return f?O.inArray(this,e)<0:this!=e
})
},add:function(e){return this.pushStack(O.unique(O.merge(this.get(),typeof e==="string"?O(e):O.makeArray(e))))
},is:function(e){return !!e&&O.multiFilter(e,this).length>0
},hasClass:function(e){return !!e&&this.is("."+e)
},val:function(l){if(l===G){var e=this[0];
if(e){if(O.nodeName(e,"option")){return(e.attributes.value||{}).specified?e.value:e.text
}if(O.nodeName(e,"select")){var j=e.selectedIndex,m=[],n=e.options,h=e.type=="select-one";
if(j<0){return null
}for(var f=h?j:0,k=h?j+1:n.length;
f<k;
f++){var g=n[f];
if(g.selected){l=O(g).val();
if(h){return l
}m.push(l)
}}return m
}return(e.value||"").replace(/\r/g,"")
}return G
}if(typeof l==="number"){l+=""
}return this.each(function(){if(this.nodeType!=1){return 
}if(O.isArray(l)&&/radio|checkbox/.test(this.type)){this.checked=(O.inArray(this.value,l)>=0||O.inArray(this.name,l)>=0)
}else{if(O.nodeName(this,"select")){var i=O.makeArray(l);
O("option",this).each(function(){this.selected=(O.inArray(this.value,i)>=0||O.inArray(this.text,i)>=0)
});
if(!i.length){this.selectedIndex=-1
}}else{this.value=l
}}})
},html:function(e){return e===G?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(e)
},replaceWith:function(e){return this.after(e).remove()
},eq:function(e){return this.slice(e,+e+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))
},map:function(e){return this.pushStack(O.map(this,function(g,f){return e.call(g,f,g)
}))
},andSelf:function(){return this.add(this.prevObject)
},domManip:function(k,o,n){if(this[0]){var j=(this[0].ownerDocument||this[0]).createDocumentFragment(),f=O.clean(k,(this[0].ownerDocument||this[0]),j),h=j.firstChild;
if(h){for(var g=0,e=this.length;
g<e;
g++){n.call(m(this[g],h),this.length>1||g>0?j.cloneNode(true):j)
}}if(f){O.each(f,Z)
}}return this;
function m(i,l){return o&&O.nodeName(i,"table")&&O.nodeName(l,"tr")?(i.getElementsByTagName("tbody")[0]||i.appendChild(i.ownerDocument.createElement("tbody"))):i
}}};
O.fn.init.prototype=O.fn;
function Z(e,f){if(f.src){O.ajax({url:f.src,async:false,dataType:"script"})
}else{O.globalEval(f.text||f.textContent||f.innerHTML||"")
}if(f.parentNode){f.parentNode.removeChild(f)
}}function E(){return +new Date
}O.extend=O.fn.extend=function(){var k=arguments[0]||{},h=1,j=arguments.length,e=false,g;
if(typeof k==="boolean"){e=k;
k=arguments[1]||{};
h=2
}if(typeof k!=="object"&&!O.isFunction(k)){k={}
}if(j==h){k=this;
--h
}for(;
h<j;
h++){if((g=arguments[h])!=null){for(var f in g){var l=k[f],m=g[f];
if(k===m){continue
}if(e&&m&&typeof m==="object"&&!m.nodeType){k[f]=O.extend(e,l||(m.length!=null?[]:{}),m)
}else{if(m!==G){k[f]=m
}}}}}return k
};
var B=/z-?index|font-?weight|opacity|zoom|line-?height/i,Q=document.defaultView||{},S=Object.prototype.toString;
O.extend({noConflict:function(e){L.$=P;
if(e){L.jQuery=Y
}return O
},isFunction:function(e){return S.call(e)==="[object Function]"
},isArray:function(e){return S.call(e)==="[object Array]"
},isXMLDoc:function(e){return e.nodeType===9&&e.documentElement.nodeName!=="HTML"||!!e.ownerDocument&&O.isXMLDoc(e.ownerDocument)
},globalEval:function(g){if(g&&/\S/.test(g)){var f=document.getElementsByTagName("head")[0]||document.documentElement,e=document.createElement("script");
e.type="text/javascript";
if(O.support.scriptEval){e.appendChild(document.createTextNode(g))
}else{e.text=g
}f.insertBefore(e,f.firstChild);
f.removeChild(e)
}},nodeName:function(f,e){return f.nodeName&&f.nodeName.toUpperCase()==e.toUpperCase()
},each:function(g,l,f){var e,h=0,j=g.length;
if(f){if(j===G){for(e in g){if(l.apply(g[e],f)===false){break
}}}else{for(;
h<j;
){if(l.apply(g[h++],f)===false){break
}}}}else{if(j===G){for(e in g){if(l.call(g[e],e,g[e])===false){break
}}}else{for(var k=g[0];
h<j&&l.call(k,h,k)!==false;
k=g[++h]){}}}return g
},prop:function(h,j,g,f,e){if(O.isFunction(j)){j=j.call(h,f)
}return typeof j==="number"&&g=="curCSS"&&!B.test(e)?j+"px":j
},className:{add:function(e,f){O.each((f||"").split(/\s+/),function(g,h){if(e.nodeType==1&&!O.className.has(e.className,h)){e.className+=(e.className?" ":"")+h
}})
},remove:function(e,f){if(e.nodeType==1){e.className=f!==G?O.grep(e.className.split(/\s+/),function(g){return !O.className.has(f,g)
}).join(" "):""
}},has:function(f,e){return f&&O.inArray(e,(f.className||f).toString().split(/\s+/))>-1
}},swap:function(h,g,i){var e={};
for(var f in g){e[f]=h.style[f];
h.style[f]=g[f]
}i.call(h);
for(var f in g){h.style[f]=e[f]
}},css:function(h,f,j,e){if(f=="width"||f=="height"){var l,g={position:"absolute",visibility:"hidden",display:"block"},k=f=="width"?["Left","Right"]:["Top","Bottom"];
function i(){l=f=="width"?h.offsetWidth:h.offsetHeight;
if(e==="border"){return 
}O.each(k,function(){if(!e){l-=parseFloat(O.curCSS(h,"padding"+this,true))||0
}if(e==="margin"){l+=parseFloat(O.curCSS(h,"margin"+this,true))||0
}else{l-=parseFloat(O.curCSS(h,"border"+this+"Width",true))||0
}})
}if(h.offsetWidth!==0){i()
}else{O.swap(h,g,i)
}return Math.max(0,Math.round(l))
}return O.curCSS(h,f,j)
},curCSS:function(i,f,g){var l,e=i.style;
if(f=="opacity"&&!O.support.opacity){l=O.attr(e,"opacity");
return l==""?"1":l
}if(f.match(/float/i)){f=W
}if(!g&&e&&e[f]){l=e[f]
}else{if(Q.getComputedStyle){if(f.match(/float/i)){f="float"
}f=f.replace(/([A-Z])/g,"-$1").toLowerCase();
var m=Q.getComputedStyle(i,null);
if(m){l=m.getPropertyValue(f)
}if(f=="opacity"&&l==""){l="1"
}}else{if(i.currentStyle){var j=f.replace(/\-(\w)/g,function(n,o){return o.toUpperCase()
});
l=i.currentStyle[f]||i.currentStyle[j];
if(!/^\d+(px)?$/i.test(l)&&/^\d/.test(l)){var h=e.left,k=i.runtimeStyle.left;
i.runtimeStyle.left=i.currentStyle.left;
e.left=l||0;
l=e.pixelLeft+"px";
e.left=h;
i.runtimeStyle.left=k
}}}}return l
},clean:function(f,l,j){l=l||document;
if(typeof l.createElement==="undefined"){l=l.ownerDocument||l[0]&&l[0].ownerDocument||document
}if(!j&&f.length===1&&typeof f[0]==="string"){var h=/^<(\w+)\s*\/?>$/.exec(f[0]);
if(h){return[l.createElement(h[1])]
}}var g=[],e=[],m=l.createElement("div");
O.each(f,function(q,t){if(typeof t==="number"){t+=""
}if(!t){return 
}if(typeof t==="string"){t=t.replace(/(<(\w+)[^>]*?)\/>/g,function(u,v,i){return i.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?u:v+"></"+i+">"
});
var p=t.replace(/^\s+/,"").substring(0,10).toLowerCase();
var r=!p.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!p.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||p.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!p.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!p.indexOf("<td")||!p.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!p.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!O.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];
m.innerHTML=r[1]+t+r[2];
while(r[0]--){m=m.lastChild
}if(!O.support.tbody){var s=/<tbody/i.test(t),o=!p.indexOf("<table")&&!s?m.firstChild&&m.firstChild.childNodes:r[1]=="<table>"&&!s?m.childNodes:[];
for(var n=o.length-1;
n>=0;
--n){if(O.nodeName(o[n],"tbody")&&!o[n].childNodes.length){o[n].parentNode.removeChild(o[n])
}}}if(!O.support.leadingWhitespace&&/^\s/.test(t)){m.insertBefore(l.createTextNode(t.match(/^\s*/)[0]),m.firstChild)
}t=O.makeArray(m.childNodes)
}if(t.nodeType){g.push(t)
}else{g=O.merge(g,t)
}});
if(j){for(var k=0;
g[k];
k++){if(O.nodeName(g[k],"script")&&(!g[k].type||g[k].type.toLowerCase()==="text/javascript")){e.push(g[k].parentNode?g[k].parentNode.removeChild(g[k]):g[k])
}else{if(g[k].nodeType===1){g.splice.apply(g,[k+1,0].concat(O.makeArray(g[k].getElementsByTagName("script"))))
}j.appendChild(g[k])
}}return e
}return g
},attr:function(j,g,k){if(!j||j.nodeType==3||j.nodeType==8){return G
}var h=!O.isXMLDoc(j),l=k!==G;
g=h&&O.props[g]||g;
if(j.tagName){var f=/href|src|style/.test(g);
if(g=="selected"&&j.parentNode){j.parentNode.selectedIndex
}if(g in j&&h&&!f){if(l){if(g=="type"&&O.nodeName(j,"input")&&j.parentNode){throw"type property can't be changed"
}j[g]=k
}if(O.nodeName(j,"form")&&j.getAttributeNode(g)){return j.getAttributeNode(g).nodeValue
}if(g=="tabIndex"){var i=j.getAttributeNode("tabIndex");
return i&&i.specified?i.value:j.nodeName.match(/(button|input|object|select|textarea)/i)?0:j.nodeName.match(/^(a|area)$/i)&&j.href?0:G
}return j[g]
}if(!O.support.style&&h&&g=="style"){return O.attr(j.style,"cssText",k)
}if(l){j.setAttribute(g,""+k)
}var e=!O.support.hrefNormalized&&h&&f?j.getAttribute(g,2):j.getAttribute(g);
return e===null?G:e
}if(!O.support.opacity&&g=="opacity"){if(l){j.zoom=1;
j.filter=(j.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(k)+""=="NaN"?"":"alpha(opacity="+k*100+")")
}return j.filter&&j.filter.indexOf("opacity=")>=0?(parseFloat(j.filter.match(/opacity=([^)]*)/)[1])/100)+"":""
}g=g.replace(/-([a-z])/ig,function(m,n){return n.toUpperCase()
});
if(l){j[g]=k
}return j[g]
},trim:function(e){return(e||"").replace(/^\s+|\s+$/g,"")
},makeArray:function(g){var e=[];
if(g!=null){var f=g.length;
if(f==null||typeof g==="string"||O.isFunction(g)||g.setInterval){e[0]=g
}else{while(f){e[--f]=g[f]
}}}return e
},inArray:function(g,h){for(var e=0,f=h.length;
e<f;
e++){if(h[e]===g){return e
}}return -1
},merge:function(h,e){var f=0,g,j=h.length;
if(!O.support.getAll){while((g=e[f++])!=null){if(g.nodeType!=8){h[j++]=g
}}}else{while((g=e[f++])!=null){h[j++]=g
}}return h
},unique:function(m){var g=[],f={};
try{for(var h=0,j=m.length;
h<j;
h++){var l=O.data(m[h]);
if(!f[l]){f[l]=true;
g.push(m[h])
}}}catch(k){g=m
}return g
},grep:function(f,k,e){var g=[];
for(var h=0,j=f.length;
h<j;
h++){if(!e!=!k(f[h],h)){g.push(f[h])
}}return g
},map:function(e,k){var f=[];
for(var g=0,h=e.length;
g<h;
g++){var j=k(e[g],g);
if(j!=null){f[f.length]=j
}}return f.concat.apply([],f)
}});
var c=navigator.userAgent.toLowerCase();
O.browser={version:(c.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(c),opera:/opera/.test(c),msie:/msie/.test(c)&&!/opera/.test(c),mozilla:/mozilla/.test(c)&&!/(compatible|webkit)/.test(c)};
O.each({parent:function(e){return e.parentNode
},parents:function(e){return O.dir(e,"parentNode")
},next:function(e){return O.nth(e,2,"nextSibling")
},prev:function(e){return O.nth(e,2,"previousSibling")
},nextAll:function(e){return O.dir(e,"nextSibling")
},prevAll:function(e){return O.dir(e,"previousSibling")
},siblings:function(e){return O.sibling(e.parentNode.firstChild,e)
},children:function(e){return O.sibling(e.firstChild)
},contents:function(e){return O.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:O.makeArray(e.childNodes)
}},function(e,f){O.fn[e]=function(g){var h=O.map(this,f);
if(g&&typeof g=="string"){h=O.multiFilter(g,h)
}return this.pushStack(O.unique(h),e,g)
}
});
O.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,f){O.fn[e]=function(g){var k=[],n=O(g);
for(var m=0,h=n.length;
m<h;
m++){var j=(m>0?this.clone(true):this).get();
O.fn[f].apply(O(n[m]),j);
k=k.concat(j)
}return this.pushStack(k,e,g)
}
});
O.each({removeAttr:function(e){O.attr(this,e,"");
if(this.nodeType==1){this.removeAttribute(e)
}},addClass:function(e){O.className.add(this,e)
},removeClass:function(e){O.className.remove(this,e)
},toggleClass:function(f,e){if(typeof e!=="boolean"){e=!O.className.has(this,f)
}O.className[e?"add":"remove"](this,f)
},remove:function(e){if(!e||O.filter(e,[this]).length){O("*",this).add([this]).each(function(){O.event.remove(this);
O.removeData(this)
});
if(this.parentNode){this.parentNode.removeChild(this)
}}},empty:function(){O(this).children().remove();
while(this.firstChild){this.removeChild(this.firstChild)
}}},function(e,f){O.fn[e]=function(){return this.each(f,arguments)
}
});
function J(e,f){return e[0]&&parseInt(O.curCSS(e[0],f,true),10)||0
}var H=O.expando="jQuery"+E(),V=0,a={};
O.extend({cache:{},data:function(f,e,g){f=f==L?a:f;
var h=f[H];
if(!h){h=f[H]=++V
}if(e&&!O.cache[h]){O.cache[h]={}
}if(g!==G){O.cache[h][e]=g
}return e?O.cache[h][e]:h
},removeData:function(g,f){g=g==L?a:g;
var i=g[H];
if(f){if(O.cache[i]){delete O.cache[i][f];
f="";
for(f in O.cache[i]){break
}if(!f){O.removeData(g)
}}}else{try{delete g[H]
}catch(h){if(g.removeAttribute){g.removeAttribute(H)
}}delete O.cache[i]
}},queue:function(f,e,h){if(f){e=(e||"fx")+"queue";
var g=O.data(f,e);
if(!g||O.isArray(h)){g=O.data(f,e,O.makeArray(h))
}else{if(h){g.push(h)
}}}return g
},dequeue:function(h,g){var e=O.queue(h,g),f=e.shift();
if(!g||g==="fx"){f=e[0]
}if(f!==G){f.call(h)
}}});
O.fn.extend({data:function(e,g){var h=e.split(".");
h[1]=h[1]?"."+h[1]:"";
if(g===G){var f=this.triggerHandler("getData"+h[1]+"!",[h[0]]);
if(f===G&&this.length){f=O.data(this[0],e)
}return f===G&&h[1]?this.data(h[0]):f
}else{return this.trigger("setData"+h[1]+"!",[h[0],g]).each(function(){O.data(this,e,g)
})
}},removeData:function(e){return this.each(function(){O.removeData(this,e)
})
},queue:function(e,f){if(typeof e!=="string"){f=e;
e="fx"
}if(f===G){return O.queue(this[0],e)
}return this.each(function(){var g=O.queue(this,e,f);
if(e=="fx"&&g.length==1){g[0].call(this)
}})
},dequeue:function(e){return this.each(function(){O.dequeue(this,e)
})
}});
(function(){var s=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,m=0,i=Object.prototype.toString;
var g=function(y,u,AB,AC){AB=AB||[];
u=u||document;
if(u.nodeType!==1&&u.nodeType!==9){return[]
}if(!y||typeof y!=="string"){return AB
}var z=[],w,AF,AI,e,AD,v,x=true;
s.lastIndex=0;
while((w=s.exec(y))!==null){z.push(w[1]);
if(w[2]){v=RegExp.rightContext;
break
}}if(z.length>1&&n.exec(y)){if(z.length===2&&j.relative[z[0]]){AF=k(z[0]+z[1],u)
}else{AF=j.relative[z[0]]?[u]:g(z.shift(),u);
while(z.length){y=z.shift();
if(j.relative[y]){y+=z.shift()
}AF=k(y,AF)
}}}else{var AE=AC?{expr:z.pop(),set:f(AC)}:g.find(z.pop(),z.length===1&&u.parentNode?u.parentNode:u,r(u));
AF=g.filter(AE.expr,AE.set);
if(z.length>0){AI=f(AF)
}else{x=false
}while(z.length){var AH=z.pop(),AG=AH;
if(!j.relative[AH]){AH=""
}else{AG=z.pop()
}if(AG==null){AG=u
}j.relative[AH](AI,AG,r(u))
}}if(!AI){AI=AF
}if(!AI){throw"Syntax error, unrecognized expression: "+(AH||y)
}if(i.call(AI)==="[object Array]"){if(!x){AB.push.apply(AB,AI)
}else{if(u.nodeType===1){for(var AA=0;
AI[AA]!=null;
AA++){if(AI[AA]&&(AI[AA]===true||AI[AA].nodeType===1&&l(u,AI[AA]))){AB.push(AF[AA])
}}}else{for(var AA=0;
AI[AA]!=null;
AA++){if(AI[AA]&&AI[AA].nodeType===1){AB.push(AF[AA])
}}}}}else{f(AI,AB)
}if(v){g(v,u,AB,AC);
if(h){hasDuplicate=false;
AB.sort(h);
if(hasDuplicate){for(var AA=1;
AA<AB.length;
AA++){if(AB[AA]===AB[AA-1]){AB.splice(AA--,1)
}}}}}return AB
};
g.matches=function(e,u){return g(e,null,null,u)
};
g.find=function(AA,e,AB){var z,x;
if(!AA){return[]
}for(var w=0,v=j.order.length;
w<v;
w++){var y=j.order[w],x;
if((x=j.match[y].exec(AA))){var u=RegExp.leftContext;
if(u.substr(u.length-1)!=="\\"){x[1]=(x[1]||"").replace(/\\/g,"");
z=j.find[y](x,e,AB);
if(z!=null){AA=AA.replace(j.match[y],"");
break
}}}}if(!z){z=e.getElementsByTagName("*")
}return{set:z,expr:AA}
};
g.filter=function(AD,AC,AG,w){var v=AD,AI=[],AA=AC,y,e,z=AC&&AC[0]&&r(AC[0]);
while(AD&&AC.length){for(var AB in j.filter){if((y=j.match[AB].exec(AD))!=null){var u=j.filter[AB],AH,AF;
e=false;
if(AA==AI){AI=[]
}if(j.preFilter[AB]){y=j.preFilter[AB](y,AA,AG,AI,w,z);
if(!y){e=AH=true
}else{if(y===true){continue
}}}if(y){for(var x=0;
(AF=AA[x])!=null;
x++){if(AF){AH=u(AF,y,x,AA);
var AE=w^!!AH;
if(AG&&AH!=null){if(AE){e=true
}else{AA[x]=false
}}else{if(AE){AI.push(AF);
e=true
}}}}}if(AH!==G){if(!AG){AA=AI
}AD=AD.replace(j.match[AB],"");
if(!e){return[]
}break
}}}if(AD==v){if(e==null){throw"Syntax error, unrecognized expression: "+AD
}else{break
}}v=AD
}return AA
};
var j=g.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(e){return e.getAttribute("href")
}},relative:{"+":function(AA,e,z){var x=typeof e==="string",AB=x&&!/\W/.test(e),y=x&&!AB;
if(AB&&!z){e=e.toUpperCase()
}for(var w=0,v=AA.length,u;
w<v;
w++){if((u=AA[w])){while((u=u.previousSibling)&&u.nodeType!==1){}AA[w]=y||u&&u.nodeName===e?u||false:u===e
}}if(y){g.filter(e,AA,true)
}},">":function(z,u,AA){var x=typeof u==="string";
if(x&&!/\W/.test(u)){u=AA?u:u.toUpperCase();
for(var v=0,e=z.length;
v<e;
v++){var y=z[v];
if(y){var w=y.parentNode;
z[v]=w.nodeName===u?w:false
}}}else{for(var v=0,e=z.length;
v<e;
v++){var y=z[v];
if(y){z[v]=x?y.parentNode:y.parentNode===u
}}if(x){g.filter(u,z,true)
}}},"":function(w,u,y){var v=m++,e=t;
if(!u.match(/\W/)){var x=u=y?u:u.toUpperCase();
e=q
}e("parentNode",u,v,w,x,y)
},"~":function(w,u,y){var v=m++,e=t;
if(typeof u==="string"&&!u.match(/\W/)){var x=u=y?u:u.toUpperCase();
e=q
}e("previousSibling",u,v,w,x,y)
}},find:{ID:function(u,v,w){if(typeof v.getElementById!=="undefined"&&!w){var e=v.getElementById(u[1]);
return e?[e]:[]
}},NAME:function(v,y,z){if(typeof y.getElementsByName!=="undefined"){var u=[],x=y.getElementsByName(v[1]);
for(var w=0,e=x.length;
w<e;
w++){if(x[w].getAttribute("name")===v[1]){u.push(x[w])
}}return u.length===0?null:u
}},TAG:function(e,u){return u.getElementsByTagName(e[1])
}},preFilter:{CLASS:function(w,u,v,e,z,AA){w=" "+w[1].replace(/\\/g,"")+" ";
if(AA){return w
}for(var x=0,y;
(y=u[x])!=null;
x++){if(y){if(z^(y.className&&(" "+y.className+" ").indexOf(w)>=0)){if(!v){e.push(y)
}}else{if(v){u[x]=false
}}}}return false
},ID:function(e){return e[1].replace(/\\/g,"")
},TAG:function(u,e){for(var v=0;
e[v]===false;
v++){}return e[v]&&r(e[v])?u[1]:u[1].toUpperCase()
},CHILD:function(e){if(e[1]=="nth"){var u=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2]=="even"&&"2n"||e[2]=="odd"&&"2n+1"||!/\D/.test(e[2])&&"0n+"+e[2]||e[2]);
e[2]=(u[1]+(u[2]||1))-0;
e[3]=u[3]-0
}e[0]=m++;
return e
},ATTR:function(x,u,v,e,y,z){var w=x[1].replace(/\\/g,"");
if(!z&&j.attrMap[w]){x[1]=j.attrMap[w]
}if(x[2]==="~="){x[4]=" "+x[4]+" "
}return x
},PSEUDO:function(x,u,v,e,y){if(x[1]==="not"){if(x[3].match(s).length>1||/^\w/.test(x[3])){x[3]=g(x[3],null,null,u)
}else{var w=g.filter(x[3],u,v,true^y);
if(!v){e.push.apply(e,w)
}return false
}}else{if(j.match.POS.test(x[0])||j.match.CHILD.test(x[0])){return true
}}return x
},POS:function(e){e.unshift(true);
return e
}},filters:{enabled:function(e){return e.disabled===false&&e.type!=="hidden"
},disabled:function(e){return e.disabled===true
},checked:function(e){return e.checked===true
},selected:function(e){e.parentNode.selectedIndex;
return e.selected===true
},parent:function(e){return !!e.firstChild
},empty:function(e){return !e.firstChild
},has:function(v,u,e){return !!g(e[3],v).length
},header:function(e){return/h\d/i.test(e.nodeName)
},text:function(e){return"text"===e.type
},radio:function(e){return"radio"===e.type
},checkbox:function(e){return"checkbox"===e.type
},file:function(e){return"file"===e.type
},password:function(e){return"password"===e.type
},submit:function(e){return"submit"===e.type
},image:function(e){return"image"===e.type
},reset:function(e){return"reset"===e.type
},button:function(e){return"button"===e.type||e.nodeName.toUpperCase()==="BUTTON"
},input:function(e){return/input|select|textarea|button/i.test(e.nodeName)
}},setFilters:{first:function(u,e){return e===0
},last:function(v,u,e,w){return u===w.length-1
},even:function(u,e){return e%2===0
},odd:function(u,e){return e%2===1
},lt:function(v,u,e){return u<e[3]-0
},gt:function(v,u,e){return u>e[3]-0
},nth:function(v,u,e){return e[3]-0==u
},eq:function(v,u,e){return e[3]-0==u
}},filter:{PSEUDO:function(z,v,w,AA){var u=v[1],x=j.filters[u];
if(x){return x(z,w,v,AA)
}else{if(u==="contains"){return(z.textContent||z.innerText||"").indexOf(v[3])>=0
}else{if(u==="not"){var y=v[3];
for(var w=0,e=y.length;
w<e;
w++){if(y[w]===z){return false
}}return true
}}}},CHILD:function(e,w){var z=w[1],u=e;
switch(z){case"only":case"first":while(u=u.previousSibling){if(u.nodeType===1){return false
}}if(z=="first"){return true
}u=e;
case"last":while(u=u.nextSibling){if(u.nodeType===1){return false
}}return true;
case"nth":var v=w[2],AC=w[3];
if(v==1&&AC==0){return true
}var y=w[0],AB=e.parentNode;
if(AB&&(AB.sizcache!==y||!e.nodeIndex)){var x=0;
for(u=AB.firstChild;
u;
u=u.nextSibling){if(u.nodeType===1){u.nodeIndex=++x
}}AB.sizcache=y
}var AA=e.nodeIndex-AC;
if(v==0){return AA==0
}else{return(AA%v==0&&AA/v>=0)
}}},ID:function(u,e){return u.nodeType===1&&u.getAttribute("id")===e
},TAG:function(u,e){return(e==="*"&&u.nodeType===1)||u.nodeName===e
},CLASS:function(u,e){return(" "+(u.className||u.getAttribute("class"))+" ").indexOf(e)>-1
},ATTR:function(y,w){var v=w[1],e=j.attrHandle[v]?j.attrHandle[v](y):y[v]!=null?y[v]:y.getAttribute(v),z=e+"",x=w[2],u=w[4];
return e==null?x==="!=":x==="="?z===u:x==="*="?z.indexOf(u)>=0:x==="~="?(" "+z+" ").indexOf(u)>=0:!u?z&&e!==false:x==="!="?z!=u:x==="^="?z.indexOf(u)===0:x==="$="?z.substr(z.length-u.length)===u:x==="|="?z===u||z.substr(0,u.length+1)===u+"-":false
},POS:function(x,u,v,y){var e=u[2],w=j.setFilters[e];
if(w){return w(x,v,u,y)
}}}};
var n=j.match.POS;
for(var p in j.match){j.match[p]=RegExp(j.match[p].source+/(?![^\[]*\])(?![^\(]*\))/.source)
}var f=function(u,e){u=Array.prototype.slice.call(u);
if(e){e.push.apply(e,u);
return e
}return u
};
try{Array.prototype.slice.call(document.documentElement.childNodes)
}catch(o){f=function(x,w){var u=w||[];
if(i.call(x)==="[object Array]"){Array.prototype.push.apply(u,x)
}else{if(typeof x.length==="number"){for(var v=0,e=x.length;
v<e;
v++){u.push(x[v])
}}else{for(var v=0;
x[v];
v++){u.push(x[v])
}}}return u
}
}var h;
if(document.documentElement.compareDocumentPosition){h=function(u,e){var v=u.compareDocumentPosition(e)&4?-1:u===e?0:1;
if(v===0){hasDuplicate=true
}return v
}
}else{if("sourceIndex" in document.documentElement){h=function(u,e){var v=u.sourceIndex-e.sourceIndex;
if(v===0){hasDuplicate=true
}return v
}
}else{if(document.createRange){h=function(w,u){var v=w.ownerDocument.createRange(),e=u.ownerDocument.createRange();
v.selectNode(w);
v.collapse(true);
e.selectNode(u);
e.collapse(true);
var x=v.compareBoundaryPoints(Range.START_TO_END,e);
if(x===0){hasDuplicate=true
}return x
}
}}}(function(){var u=document.createElement("form"),v="script"+(new Date).getTime();
u.innerHTML="<input name='"+v+"'/>";
var e=document.documentElement;
e.insertBefore(u,e.firstChild);
if(!!document.getElementById(v)){j.find.ID=function(x,y,z){if(typeof y.getElementById!=="undefined"&&!z){var w=y.getElementById(x[1]);
return w?w.id===x[1]||typeof w.getAttributeNode!=="undefined"&&w.getAttributeNode("id").nodeValue===x[1]?[w]:G:[]
}};
j.filter.ID=function(y,w){var x=typeof y.getAttributeNode!=="undefined"&&y.getAttributeNode("id");
return y.nodeType===1&&x&&x.nodeValue===w
}
}e.removeChild(u)
})();
(function(){var e=document.createElement("div");
e.appendChild(document.createComment(""));
if(e.getElementsByTagName("*").length>0){j.find.TAG=function(u,y){var x=y.getElementsByTagName(u[1]);
if(u[1]==="*"){var w=[];
for(var v=0;
x[v];
v++){if(x[v].nodeType===1){w.push(x[v])
}}x=w
}return x
}
}e.innerHTML="<a href='#'></a>";
if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#"){j.attrHandle.href=function(u){return u.getAttribute("href",2)
}
}})();
if(document.querySelectorAll){(function(){var e=g,u=document.createElement("div");
u.innerHTML="<p class='TEST'></p>";
if(u.querySelectorAll&&u.querySelectorAll(".TEST").length===0){return 
}g=function(y,x,v,w){x=x||document;
if(!w&&x.nodeType===9&&!r(x)){try{return f(x.querySelectorAll(y),v)
}catch(z){}}return e(y,x,v,w)
};
g.find=e.find;
g.filter=e.filter;
g.selectors=e.selectors;
g.matches=e.matches
})()
}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var e=document.createElement("div");
e.innerHTML="<div class='test e'></div><div class='test'></div>";
if(e.getElementsByClassName("e").length===0){return 
}e.lastChild.className="e";
if(e.getElementsByClassName("e").length===1){return 
}j.order.splice(1,0,"CLASS");
j.find.CLASS=function(u,v,w){if(typeof v.getElementsByClassName!=="undefined"&&!w){return v.getElementsByClassName(u[1])
}}
})()
}function q(u,z,y,AD,AA,AC){var AB=u=="previousSibling"&&!AC;
for(var w=0,v=AD.length;
w<v;
w++){var e=AD[w];
if(e){if(AB&&e.nodeType===1){e.sizcache=y;
e.sizset=w
}e=e[u];
var x=false;
while(e){if(e.sizcache===y){x=AD[e.sizset];
break
}if(e.nodeType===1&&!AC){e.sizcache=y;
e.sizset=w
}if(e.nodeName===z){x=e;
break
}e=e[u]
}AD[w]=x
}}}function t(u,z,y,AD,AA,AC){var AB=u=="previousSibling"&&!AC;
for(var w=0,v=AD.length;
w<v;
w++){var e=AD[w];
if(e){if(AB&&e.nodeType===1){e.sizcache=y;
e.sizset=w
}e=e[u];
var x=false;
while(e){if(e.sizcache===y){x=AD[e.sizset];
break
}if(e.nodeType===1){if(!AC){e.sizcache=y;
e.sizset=w
}if(typeof z!=="string"){if(e===z){x=true;
break
}}else{if(g.filter(z,[e]).length>0){x=e;
break
}}}e=e[u]
}AD[w]=x
}}}var l=document.compareDocumentPosition?function(u,e){return u.compareDocumentPosition(e)&16
}:function(u,e){return u!==e&&(u.contains?u.contains(e):true)
};
var r=function(e){return e.nodeType===9&&e.documentElement.nodeName!=="HTML"||!!e.ownerDocument&&r(e.ownerDocument)
};
var k=function(e,AA){var w=[],x="",y,v=AA.nodeType?[AA]:AA;
while((y=j.match.PSEUDO.exec(e))){x+=y[0];
e=e.replace(j.match.PSEUDO,"")
}e=j.relative[e]?e+"*":e;
for(var z=0,u=v.length;
z<u;
z++){g(e,v[z],w)
}return g.filter(x,w)
};
O.find=g;
O.filter=g.filter;
O.expr=g.selectors;
O.expr[":"]=O.expr.filters;
g.selectors.filters.hidden=function(e){return e.offsetWidth===0||e.offsetHeight===0
};
g.selectors.filters.visible=function(e){return e.offsetWidth>0||e.offsetHeight>0
};
g.selectors.filters.animated=function(e){return O.grep(O.timers,function(u){return e===u.elem
}).length
};
O.multiFilter=function(v,e,u){if(u){v=":not("+v+")"
}return g.matches(v,e)
};
O.dir=function(v,u){var e=[],w=v[u];
while(w&&w!=document){if(w.nodeType==1){e.push(w)
}w=w[u]
}return e
};
O.nth=function(x,e,v,w){e=e||1;
var u=0;
for(;
x;
x=x[v]){if(x.nodeType==1&&++u==e){break
}}return x
};
O.sibling=function(v,u){var e=[];
for(;
v;
v=v.nextSibling){if(v.nodeType==1&&v!=u){e.push(v)
}}return e
};
return ;
L.Sizzle=g
})();
O.event={add:function(i,f,h,k){if(i.nodeType==3||i.nodeType==8){return 
}if(i.setInterval&&i!=L){i=L
}if(!h.guid){h.guid=this.guid++
}if(k!==G){var g=h;
h=this.proxy(g);
h.data=k
}var e=O.data(i,"events")||O.data(i,"events",{}),j=O.data(i,"handle")||O.data(i,"handle",function(){return typeof O!=="undefined"&&!O.event.triggered?O.event.handle.apply(arguments.callee.elem,arguments):G
});
j.elem=i;
O.each(f.split(/\s+/),function(m,n){var o=n.split(".");
n=o.shift();
h.type=o.slice().sort().join(".");
var l=e[n];
if(O.event.specialAll[n]){O.event.specialAll[n].setup.call(i,k,o)
}if(!l){l=e[n]={};
if(!O.event.special[n]||O.event.special[n].setup.call(i,k,o)===false){if(i.addEventListener){i.addEventListener(n,j,false)
}else{if(i.attachEvent){i.attachEvent("on"+n,j)
}}}}l[h.guid]=h;
O.event.global[n]=true
});
i=null
},guid:1,global:{},remove:function(k,h,j){if(k.nodeType==3||k.nodeType==8){return 
}var g=O.data(k,"events"),f,e;
if(g){if(h===G||(typeof h==="string"&&h.charAt(0)==".")){for(var i in g){this.remove(k,i+(h||""))
}}else{if(h.type){j=h.handler;
h=h.type
}O.each(h.split(/\s+/),function(m,o){var q=o.split(".");
o=q.shift();
var n=RegExp("(^|\\.)"+q.slice().sort().join(".*\\.")+"(\\.|$)");
if(g[o]){if(j){delete g[o][j.guid]
}else{for(var p in g[o]){if(n.test(g[o][p].type)){delete g[o][p]
}}}if(O.event.specialAll[o]){O.event.specialAll[o].teardown.call(k,q)
}for(f in g[o]){break
}if(!f){if(!O.event.special[o]||O.event.special[o].teardown.call(k,q)===false){if(k.removeEventListener){k.removeEventListener(o,O.data(k,"handle"),false)
}else{if(k.detachEvent){k.detachEvent("on"+o,O.data(k,"handle"))
}}}f=null;
delete g[o]
}}})
}for(f in g){break
}if(!f){var l=O.data(k,"handle");
if(l){l.elem=null
}O.removeData(k,"events");
O.removeData(k,"handle")
}}},trigger:function(j,l,i,f){var h=j.type||j;
if(!f){j=typeof j==="object"?j[H]?j:O.extend(O.Event(h),j):O.Event(h);
if(h.indexOf("!")>=0){j.type=h=h.slice(0,-1);
j.exclusive=true
}if(!i){j.stopPropagation();
if(this.global[h]){O.each(O.cache,function(){if(this.events&&this.events[h]){O.event.trigger(j,l,this.handle.elem)
}})
}}if(!i||i.nodeType==3||i.nodeType==8){return G
}j.result=G;
j.target=i;
l=O.makeArray(l);
l.unshift(j)
}j.currentTarget=i;
var k=O.data(i,"handle");
if(k){k.apply(i,l)
}if((!i[h]||(O.nodeName(i,"a")&&h=="click"))&&i["on"+h]&&i["on"+h].apply(i,l)===false){j.result=false
}if(!f&&i[h]&&!j.isDefaultPrevented()&&!(O.nodeName(i,"a")&&h=="click")){this.triggered=true;
try{i[h]()
}catch(m){}}this.triggered=false;
if(!j.isPropagationStopped()){var g=i.parentNode||i.ownerDocument;
if(g){O.event.trigger(j,l,g,true)
}}},handle:function(l){var k,e;
l=arguments[0]=O.event.fix(l||L.event);
l.currentTarget=this;
var m=l.type.split(".");
l.type=m.shift();
k=!m.length&&!l.exclusive;
var i=RegExp("(^|\\.)"+m.slice().sort().join(".*\\.")+"(\\.|$)");
e=(O.data(this,"events")||{})[l.type];
for(var g in e){var h=e[g];
if(k||i.test(h.type)){l.handler=h;
l.data=h.data;
var f=h.apply(this,arguments);
if(f!==G){l.result=f;
if(f===false){l.preventDefault();
l.stopPropagation()
}}if(l.isImmediatePropagationStopped()){break
}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(h){if(h[H]){return h
}var f=h;
h=O.Event(f);
for(var g=this.props.length,k;
g;
){k=this.props[--g];
h[k]=f[k]
}if(!h.target){h.target=h.srcElement||document
}if(h.target.nodeType==3){h.target=h.target.parentNode
}if(!h.relatedTarget&&h.fromElement){h.relatedTarget=h.fromElement==h.target?h.toElement:h.fromElement
}if(h.pageX==null&&h.clientX!=null){var j=document.documentElement,e=document.body;
h.pageX=h.clientX+(j&&j.scrollLeft||e&&e.scrollLeft||0)-(j.clientLeft||0);
h.pageY=h.clientY+(j&&j.scrollTop||e&&e.scrollTop||0)-(j.clientTop||0)
}if(!h.which&&((h.charCode||h.charCode===0)?h.charCode:h.keyCode)){h.which=h.charCode||h.keyCode
}if(!h.metaKey&&h.ctrlKey){h.metaKey=h.ctrlKey
}if(!h.which&&h.button){h.which=(h.button&1?1:(h.button&2?3:(h.button&4?2:0)))
}return h
},proxy:function(f,e){e=e||function(){return f.apply(this,arguments)
};
e.guid=f.guid=f.guid||e.guid||this.guid++;
return e
},special:{ready:{setup:b,teardown:function(){}}},specialAll:{live:{setup:function(e,f){O.event.add(this,f[0],C)
},teardown:function(g){if(g.length){var e=0,f=RegExp("(^|\\.)"+g[0]+"(\\.|$)");
O.each((O.data(this,"events").live||{}),function(){if(f.test(this.type)){e++
}});
if(e<1){O.event.remove(this,g[0],C)
}}}}}};
O.Event=function(e){if(!this.preventDefault){return new O.Event(e)
}if(e&&e.type){this.originalEvent=e;
this.type=e.type
}else{this.type=e
}this.timeStamp=E();
this[H]=true
};
function K(){return false
}function U(){return true
}O.Event.prototype={preventDefault:function(){this.isDefaultPrevented=U;
var f=this.originalEvent;
if(!f){return 
}if(f.preventDefault){f.preventDefault()
}f.returnValue=false
},stopPropagation:function(){this.isPropagationStopped=U;
var f=this.originalEvent;
if(!f){return 
}if(f.stopPropagation){f.stopPropagation()
}f.cancelBubble=true
},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U;
this.stopPropagation()
},isDefaultPrevented:K,isPropagationStopped:K,isImmediatePropagationStopped:K};
var A=function(g){var f=g.relatedTarget;
while(f&&f!=this){try{f=f.parentNode
}catch(h){f=this
}}if(f!=this){g.type=g.data;
O.event.handle.apply(this,arguments)
}};
O.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(f,e){O.event.special[e]={setup:function(){O.event.add(this,f,A,e)
},teardown:function(){O.event.remove(this,f,A)
}}
});
O.fn.extend({bind:function(f,g,e){return f=="unload"?this.one(f,g,e):this.each(function(){O.event.add(this,f,e||g,e&&g)
})
},one:function(g,h,f){var e=O.event.proxy(f||h,function(i){O(this).unbind(i,e);
return(f||h).apply(this,arguments)
});
return this.each(function(){O.event.add(this,g,e,f&&h)
})
},unbind:function(f,e){return this.each(function(){O.event.remove(this,f,e)
})
},trigger:function(e,f){return this.each(function(){O.event.trigger(e,f,this)
})
},triggerHandler:function(e,g){if(this[0]){var f=O.Event(e);
f.preventDefault();
f.stopPropagation();
O.event.trigger(f,g,this[0]);
return f.result
}},toggle:function(g){var e=arguments,f=1;
while(f<e.length){O.event.proxy(g,e[f++])
}return this.click(O.event.proxy(g,function(h){this.lastToggle=(this.lastToggle||0)%f;
h.preventDefault();
return e[this.lastToggle++].apply(this,arguments)||false
}))
},hover:function(e,f){return this.mouseenter(e).mouseleave(f)
},ready:function(e){b();
if(O.isReady){e.call(document,O)
}else{O.readyList.push(e)
}return this
},live:function(g,f){var e=O.event.proxy(f);
e.guid+=this.selector+g;
O(document).bind(I(g,this.selector),this.selector,e);
return this
},die:function(f,e){O(document).unbind(I(f,this.selector),e?{guid:e.guid+this.selector+f}:null);
return this
}});
function C(h){var e=RegExp("(^|\\.)"+h.type+"(\\.|$)"),g=true,f=[];
O.each(O.data(this,"events").live||[],function(j,k){if(e.test(k.type)){var l=O(h.target).closest(k.data)[0];
if(l){f.push({elem:l,fn:k})
}}});
f.sort(function(j,i){return O.data(j.elem,"closest")-O.data(i.elem,"closest")
});
O.each(f,function(){if(this.fn.call(this.elem,h,this.fn.data)===false){return(g=false)
}});
return g
}function I(f,e){return["live",f,e.replace(/\./g,"`").replace(/ /g,"|")].join(".")
}O.extend({isReady:false,readyList:[],ready:function(){if(!O.isReady){O.isReady=true;
if(O.readyList){O.each(O.readyList,function(){this.call(document,O)
});
O.readyList=null
}O(document).triggerHandler("ready")
}}});
var X=false;
function b(){if(X){return 
}X=true;
if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);
O.ready()
},false)
}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);
O.ready()
}});
if(document.documentElement.doScroll&&L==L.top){(function(){if(O.isReady){return 
}try{document.documentElement.doScroll("left")
}catch(e){setTimeout(arguments.callee,0);
return 
}O.ready()
})()
}}}O.event.add(L,"load",O.ready)
}O.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(f,e){O.fn[e]=function(g){return g?this.bind(e,g):this.trigger(e)
}
});
O(L).bind("unload",function(){for(var e in O.cache){if(e!=1&&O.cache[e].handle){O.event.remove(O.cache[e].handle.elem)
}}});
(function(){O.support={};
var g=document.documentElement,h=document.createElement("script"),l=document.createElement("div"),k="script"+(new Date).getTime();
l.style.display="none";
l.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
var i=l.getElementsByTagName("*"),f=l.getElementsByTagName("a")[0];
if(!i||!i.length||!f){return 
}O.support={leadingWhitespace:l.firstChild.nodeType==3,tbody:!l.getElementsByTagName("tbody").length,objectAll:!!l.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!l.getElementsByTagName("link").length,style:/red/.test(f.getAttribute("style")),hrefNormalized:f.getAttribute("href")==="/a",opacity:f.style.opacity==="0.5",cssFloat:!!f.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};
h.type="text/javascript";
try{h.appendChild(document.createTextNode("window."+k+"=1;"))
}catch(j){}g.insertBefore(h,g.firstChild);
if(L[k]){O.support.scriptEval=true;
delete L[k]
}g.removeChild(h);
if(l.attachEvent&&l.fireEvent){l.attachEvent("onclick",function(){O.support.noCloneEvent=false;
l.detachEvent("onclick",arguments.callee)
});
l.cloneNode(true).fireEvent("onclick")
}O(function(){var e=document.createElement("div");
e.style.width=e.style.paddingLeft="1px";
document.body.appendChild(e);
O.boxModel=O.support.boxModel=e.offsetWidth===2;
document.body.removeChild(e).style.display="none"
})
})();
var W=O.support.cssFloat?"cssFloat":"styleFloat";
O.props={"for":"htmlFor","class":"className","float":W,cssFloat:W,styleFloat:W,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};
O.fn.extend({_load:O.fn.load,load:function(g,j,k){if(typeof g!=="string"){return this._load(g)
}var i=g.indexOf(" ");
if(i>=0){var e=g.slice(i,g.length);
g=g.slice(0,i)
}var h="GET";
if(j){if(O.isFunction(j)){k=j;
j=null
}else{if(typeof j==="object"){j=O.param(j);
h="POST"
}}}var f=this;
O.ajax({url:g,type:h,dataType:"html",data:j,complete:function(m,l){if(l=="success"||l=="notmodified"){f.html(e?O("<div/>").append(m.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(e):m.responseText)
}if(k){f.each(k,[m.responseText,l,m])
}}});
return this
},serialize:function(){return O.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return this.elements?O.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))
}).map(function(e,f){var g=O(this).val();
return g==null?null:O.isArray(g)?O.map(g,function(j,h){return{name:f.name,value:j}
}):{name:f.name,value:g}
}).get()
}});
O.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(e,f){O.fn[f]=function(g){return this.bind(f,g)
}
});
var R=E();
O.extend({get:function(e,g,h,f){if(O.isFunction(g)){h=g;
g=null
}return O.ajax({type:"GET",url:e,data:g,success:h,dataType:f})
},getScript:function(e,f){return O.get(e,null,f,"script")
},getJSON:function(e,f,g){return O.get(e,f,g,"json")
},post:function(e,g,h,f){if(O.isFunction(g)){h=g;
g={}
}return O.ajax({type:"POST",url:e,data:g,success:h,dataType:f})
},ajaxSetup:function(e){O.extend(O.ajaxSettings,e)
},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return L.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()
},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(n){n=O.extend(true,n,O.extend(true,{},O.ajaxSettings,n));
var y,g=/=\?(&|$)/g,t,x,h=n.type.toUpperCase();
if(n.data&&n.processData&&typeof n.data!=="string"){n.data=O.param(n.data)
}if(n.dataType=="jsonp"){if(h=="GET"){if(!n.url.match(g)){n.url+=(n.url.match(/\?/)?"&":"?")+(n.jsonp||"callback")+"=?"
}}else{if(!n.data||!n.data.match(g)){n.data=(n.data?n.data+"&":"")+(n.jsonp||"callback")+"=?"
}}n.dataType="json"
}if(n.dataType=="json"&&(n.data&&n.data.match(g)||n.url.match(g))){y="jsonp"+R++;
if(n.data){n.data=(n.data+"").replace(g,"="+y+"$1")
}n.url=n.url.replace(g,"="+y+"$1");
n.dataType="script";
L[y]=function(s){x=s;
j();
m();
L[y]=G;
try{delete L[y]
}catch(z){}if(i){i.removeChild(v)
}}
}if(n.dataType=="script"&&n.cache==null){n.cache=false
}if(n.cache===false&&h=="GET"){var f=E();
var w=n.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+f+"$2");
n.url=w+((w==n.url)?(n.url.match(/\?/)?"&":"?")+"_="+f:"")
}if(n.data&&h=="GET"){n.url+=(n.url.match(/\?/)?"&":"?")+n.data;
n.data=null
}if(n.global&&!O.active++){O.event.trigger("ajaxStart")
}var r=/^(\w+:)?\/\/([^\/?#]+)/.exec(n.url);
if(n.dataType=="script"&&h=="GET"&&r&&(r[1]&&r[1]!=location.protocol||r[2]!=location.host)){var i=document.getElementsByTagName("head")[0];
var v=document.createElement("script");
v.src=n.url;
if(n.scriptCharset){v.charset=n.scriptCharset
}if(!y){var p=false;
v.onload=v.onreadystatechange=function(){if(!p&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){p=true;
j();
m();
v.onload=v.onreadystatechange=null;
i.removeChild(v)
}}
}i.appendChild(v);
return G
}var l=false;
var k=n.xhr();
if(n.username){k.open(h,n.url,n.async,n.username,n.password)
}else{k.open(h,n.url,n.async)
}try{if(n.data){k.setRequestHeader("Content-Type",n.contentType)
}if(n.ifModified){k.setRequestHeader("If-Modified-Since",O.lastModified[n.url]||"Thu, 01 Jan 1970 00:00:00 GMT")
}k.setRequestHeader("X-Requested-With","XMLHttpRequest");
k.setRequestHeader("Accept",n.dataType&&n.accepts[n.dataType]?n.accepts[n.dataType]+", */*":n.accepts._default)
}catch(u){}if(n.beforeSend&&n.beforeSend(k,n)===false){if(n.global&&!--O.active){O.event.trigger("ajaxStop")
}k.abort();
return false
}if(n.global){O.event.trigger("ajaxSend",[k,n])
}var o=function(s){if(k.readyState==0){if(q){clearInterval(q);
q=null;
if(n.global&&!--O.active){O.event.trigger("ajaxStop")
}}}else{if(!l&&k&&(k.readyState==4||s=="timeout")){l=true;
if(q){clearInterval(q);
q=null
}t=s=="timeout"?"timeout":!O.httpSuccess(k)?"error":n.ifModified&&O.httpNotModified(k,n.url)?"notmodified":"success";
if(t=="success"){try{x=O.httpData(k,n.dataType,n)
}catch(AA){t="parsererror"
}}if(t=="success"){var z;
try{z=k.getResponseHeader("Last-Modified")
}catch(AA){}if(n.ifModified&&z){O.lastModified[n.url]=z
}if(!y){j()
}}else{O.handleError(n,k,t)
}m();
if(s){k.abort()
}if(n.async){k=null
}}}};
if(n.async){var q=setInterval(o,13);
if(n.timeout>0){setTimeout(function(){if(k&&!l){o("timeout")
}},n.timeout)
}}try{k.send(n.data)
}catch(u){O.handleError(n,k,null,u)
}if(!n.async){o()
}function j(){if(n.success){n.success(x,t)
}if(n.global){O.event.trigger("ajaxSuccess",[k,n])
}}function m(){if(n.complete){n.complete(k,t)
}if(n.global){O.event.trigger("ajaxComplete",[k,n])
}if(n.global&&!--O.active){O.event.trigger("ajaxStop")
}}return k
},handleError:function(g,i,f,h){if(g.error){g.error(i,f,h)
}if(g.global){O.event.trigger("ajaxError",[i,g,h])
}},active:0,httpSuccess:function(g){try{return !g.status&&location.protocol=="file:"||(g.status>=200&&g.status<300)||g.status==304||g.status==1223
}catch(f){}return false
},httpNotModified:function(h,f){try{var i=h.getResponseHeader("Last-Modified");
return h.status==304||i==O.lastModified[f]
}catch(g){}return false
},httpData:function(j,h,g){var f=j.getResponseHeader("content-type"),e=h=="xml"||!h&&f&&f.indexOf("xml")>=0,i=e?j.responseXML:j.responseText;
if(e&&i.documentElement.tagName=="parsererror"){throw"parsererror"
}if(g&&g.dataFilter){i=g.dataFilter(i,h)
}if(typeof i==="string"){if(h=="script"){O.globalEval(i)
}if(h=="json"){i=L["eval"]("("+i+")")
}}return i
},param:function(e){var g=[];
function h(i,j){g[g.length]=encodeURIComponent(i)+"="+encodeURIComponent(j)
}if(O.isArray(e)||e.jquery){O.each(e,function(){h(this.name,this.value)
})
}else{for(var f in e){if(O.isArray(e[f])){O.each(e[f],function(){h(f,this)
})
}else{h(f,O.isFunction(e[f])?e[f]():e[f])
}}}return g.join("&").replace(/%20/g,"+")
}});
var M={},N,D=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];
function T(f,e){var g={};
O.each(D.concat.apply([],D.slice(0,e)),function(){g[this]=f
});
return g
}O.fn.extend({show:function(k,n){if(k){return this.animate(T("show",3),k,n)
}else{for(var h=0,f=this.length;
h<f;
h++){var e=O.data(this[h],"olddisplay");
this[h].style.display=e||"";
if(O.css(this[h],"display")==="none"){var g=this[h].tagName,m;
if(M[g]){m=M[g]
}else{var j=O("<"+g+" />").appendTo("body");
m=j.css("display");
if(m==="none"){m="block"
}j.remove();
M[g]=m
}O.data(this[h],"olddisplay",m)
}}for(var h=0,f=this.length;
h<f;
h++){this[h].style.display=O.data(this[h],"olddisplay")||""
}return this
}},hide:function(h,j){if(h){return this.animate(T("hide",3),h,j)
}else{for(var g=0,f=this.length;
g<f;
g++){var e=O.data(this[g],"olddisplay");
if(!e&&e!=="none"){O.data(this[g],"olddisplay",O.css(this[g],"display"))
}}for(var g=0,f=this.length;
g<f;
g++){this[g].style.display="none"
}return this
}},_toggle:O.fn.toggle,toggle:function(g,f){var e=typeof g==="boolean";
return O.isFunction(g)&&O.isFunction(f)?this._toggle.apply(this,arguments):g==null||e?this.each(function(){var h=e?g:O(this).is(":hidden");
O(this)[h?"show":"hide"]()
}):this.animate(T("toggle",3),g,f)
},fadeTo:function(e,g,f){return this.animate({opacity:g},e,f)
},animate:function(i,f,h,g){var e=O.speed(f,h,g);
return this[e.queue===false?"each":"queue"](function(){var k=O.extend({},e),m,l=this.nodeType==1&&O(this).is(":hidden"),j=this;
for(m in i){if(i[m]=="hide"&&l||i[m]=="show"&&!l){return k.complete.call(this)
}if((m=="height"||m=="width")&&this.style){k.display=O.css(this,"display");
k.overflow=this.style.overflow
}}if(k.overflow!=null){this.style.overflow="hidden"
}k.curAnim=O.extend({},i);
O.each(i,function(o,s){var r=new O.fx(j,k,o);
if(/toggle|show|hide/.test(s)){r[s=="toggle"?l?"show":"hide":s](i)
}else{var q=s.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),t=r.cur(true)||0;
if(q){var n=parseFloat(q[2]),p=q[3]||"px";
if(p!="px"){j.style[o]=(n||1)+p;
t=((n||1)/r.cur(true))*t;
j.style[o]=t+p
}if(q[1]){n=((q[1]=="-="?-1:1)*n)+t
}r.custom(t,n,p)
}else{r.custom(t,s,"")
}}});
return true
})
},stop:function(f,e){var g=O.timers;
if(f){this.queue([])
}this.each(function(){for(var h=g.length-1;
h>=0;
h--){if(g[h].elem==this){if(e){g[h](true)
}g.splice(h,1)
}}});
if(!e){this.dequeue()
}return this
}});
O.each({slideDown:T("show",1),slideUp:T("hide",1),slideToggle:T("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(e,f){O.fn[e]=function(g,h){return this.animate(f,g,h)
}
});
O.extend({speed:function(g,h,f){var e=typeof g==="object"?g:{complete:f||!f&&h||O.isFunction(g)&&g,duration:g,easing:f&&h||h&&!O.isFunction(h)&&h};
e.duration=O.fx.off?0:typeof e.duration==="number"?e.duration:O.fx.speeds[e.duration]||O.fx.speeds._default;
e.old=e.complete;
e.complete=function(){if(e.queue!==false){O(this).dequeue()
}if(O.isFunction(e.old)){e.old.call(this)
}};
return e
},easing:{linear:function(g,h,e,f){return e+f*g
},swing:function(g,h,e,f){return((-Math.cos(g*Math.PI)/2)+0.5)*f+e
}},timers:[],fx:function(f,e,g){this.options=e;
this.elem=f;
this.prop=g;
if(!e.orig){e.orig={}
}}});
O.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)
}(O.fx.step[this.prop]||O.fx.step._default)(this);
if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"
}},cur:function(f){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]
}var e=parseFloat(O.css(this.elem,this.prop,f));
return e&&e>-10000?e:parseFloat(O.curCSS(this.elem,this.prop))||0
},custom:function(i,h,g){this.startTime=E();
this.start=i;
this.end=h;
this.unit=g||this.unit||"px";
this.now=this.start;
this.pos=this.state=0;
var e=this;
function f(j){return e.step(j)
}f.elem=this.elem;
if(f()&&O.timers.push(f)&&!N){N=setInterval(function(){var k=O.timers;
for(var j=0;
j<k.length;
j++){if(!k[j]()){k.splice(j--,1)
}}if(!k.length){clearInterval(N);
N=G
}},13)
}},show:function(){this.options.orig[this.prop]=O.attr(this.elem.style,this.prop);
this.options.show=true;
this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());
O(this.elem).show()
},hide:function(){this.options.orig[this.prop]=O.attr(this.elem.style,this.prop);
this.options.hide=true;
this.custom(this.cur(),0)
},step:function(h){var g=E();
if(h||g>=this.options.duration+this.startTime){this.now=this.end;
this.pos=this.state=1;
this.update();
this.options.curAnim[this.prop]=true;
var e=true;
for(var f in this.options.curAnim){if(this.options.curAnim[f]!==true){e=false
}}if(e){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;
this.elem.style.display=this.options.display;
if(O.css(this.elem,"display")=="none"){this.elem.style.display="block"
}}if(this.options.hide){O(this.elem).hide()
}if(this.options.hide||this.options.show){for(var j in this.options.curAnim){O.attr(this.elem.style,j,this.options.orig[j])
}}this.options.complete.call(this.elem)
}return false
}else{var k=g-this.startTime;
this.state=k/this.options.duration;
this.pos=O.easing[this.options.easing||(O.easing.swing?"swing":"linear")](this.state,k,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);
this.update()
}return true
}};
O.extend(O.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(e){O.attr(e.elem.style,"opacity",e.now)
},_default:function(e){if(e.elem.style&&e.elem.style[e.prop]!=null){e.elem.style[e.prop]=e.now+e.unit
}else{e.elem[e.prop]=e.now
}}}});
if(document.documentElement["getBoundingClientRect"]){O.fn.offset=function(){if(!this[0]){return{top:0,left:0}
}if(this[0]===this[0].ownerDocument.body){return O.offset.bodyOffset(this[0])
}var g=this[0].getBoundingClientRect(),j=this[0].ownerDocument,f=j.body,e=j.documentElement,l=e.clientTop||f.clientTop||0,k=e.clientLeft||f.clientLeft||0,i=g.top+(self.pageYOffset||O.boxModel&&e.scrollTop||f.scrollTop)-l,h=g.left+(self.pageXOffset||O.boxModel&&e.scrollLeft||f.scrollLeft)-k;
return{top:i,left:h}
}
}else{O.fn.offset=function(){if(!this[0]){return{top:0,left:0}
}if(this[0]===this[0].ownerDocument.body){return O.offset.bodyOffset(this[0])
}O.offset.initialized||O.offset.initialize();
var j=this[0],g=j.offsetParent,f=j,p=j.ownerDocument,n,h=p.documentElement,k=p.body,m=p.defaultView,e=m.getComputedStyle(j,null),o=j.offsetTop,i=j.offsetLeft,l=e.position==="absolute";
while((j=j.parentNode)&&j!==k&&j!==h&&e.position!=="fixed"){n=m.getComputedStyle(j,null);
if((!l&&e.position==="static")||e.position==="relative"||j===g){o-=j.scrollTop,i-=j.scrollLeft;
l=e.position==="absolute"
}if(j===g){o+=j.offsetTop,i+=j.offsetLeft;
if(O.offset.doesNotAddBorder&&!(O.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(j.tagName))){o+=parseInt(n.borderTopWidth,10)||0,i+=parseInt(n.borderLeftWidth,10)||0
}f=g,g=j.offsetParent
}if(O.offset.subtractsBorderForOverflowNotVisible&&n.overflow!=="visible"){o+=parseInt(n.borderTopWidth,10)||0,i+=parseInt(n.borderLeftWidth,10)||0
}e=n
}if(e.position==="relative"||e.position==="static"){o+=k.offsetTop,i+=k.offsetLeft
}if(e.position==="fixed"){o+=Math.max(h.scrollTop,k.scrollTop),i+=Math.max(h.scrollLeft,k.scrollLeft)
}return{top:o,left:i}
}
}O.offset={initialize:function(){if(this.initialized){return 
}var l=document.body,f=document.createElement("div"),h,g,n,i,m,e,j=l.style.marginTop,k='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
m={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};
for(e in m){f.style[e]=m[e]
}f.innerHTML=k;
l.insertBefore(f,l.firstChild);
h=f.firstChild,g=h.firstChild,i=h.nextSibling.firstChild.firstChild;
this.doesNotAddBorder=(g.offsetTop!==5);
this.doesAddBorderForTableAndCells=(i.offsetTop===5);
h.style.overflow="hidden",h.style.position="relative";
this.subtractsBorderForOverflowNotVisible=(g.offsetTop===-5);
l.style.marginTop="1px";
this.doesNotIncludeMarginInBodyOffset=(l.offsetTop===0);
l.style.marginTop=j;
l.removeChild(f);
this.initialized=true
},bodyOffset:function(e){O.offset.initialized||O.offset.initialize();
var g=e.offsetTop,f=e.offsetLeft;
if(O.offset.doesNotIncludeMarginInBodyOffset){g+=parseInt(O.curCSS(e,"marginTop",true),10)||0,f+=parseInt(O.curCSS(e,"marginLeft",true),10)||0
}return{top:g,left:f}
}};
O.fn.extend({position:function(){var i=0,h=0,f;
if(this[0]){var g=this.offsetParent(),j=this.offset(),e=/^body|html$/i.test(g[0].tagName)?{top:0,left:0}:g.offset();
j.top-=J(this,"marginTop");
j.left-=J(this,"marginLeft");
e.top+=J(g,"borderTopWidth");
e.left+=J(g,"borderLeftWidth");
f={top:j.top-e.top,left:j.left-e.left}
}return f
},offsetParent:function(){var e=this[0].offsetParent||document.body;
while(e&&(!/^body|html$/i.test(e.tagName)&&O.css(e,"position")=="static")){e=e.offsetParent
}return O(e)
}});
O.each(["Left","Top"],function(f,e){var g="scroll"+e;
O.fn[g]=function(h){if(!this[0]){return null
}return h!==G?this.each(function(){this==L||this==document?L.scrollTo(!f?h:O(L).scrollLeft(),f?h:O(L).scrollTop()):this[g]=h
}):this[0]==L||this[0]==document?self[f?"pageYOffset":"pageXOffset"]||O.boxModel&&document.documentElement[g]||document.body[g]:this[0][g]
}
});
(function(){var f;
var e=function(){var h=document.compatMode;
if(!h&&O.browser.safari){if(!f){var g=O(document.createElement("div")).attr("style","position:absolute;width:0;height:0;width:1").css("width");
f=h=(g=="1px"?"BackCompat":"CSS1Compat")
}else{h=f
}}return h
};
O.each(["Height","Width"],function(l,j){var g=l?"Left":"Top",k=l?"Right":"Bottom",h=j.toLowerCase();
O.fn["inner"+j]=function(){return this[0]?O.css(this[0],h,false,"padding"):null
};
O.fn["outer"+j]=function(i){return this[0]?O.css(this[0],h,false,i?"margin":"border"):null
};
var m=j.toLowerCase();
O.fn[m]=function(i){return this[0]==L?e()=="CSS1Compat"&&document.documentElement["client"+j]||document.body["client"+j]:this[0]==document?Math.max(document.documentElement["client"+j],document.body["scroll"+j],document.documentElement["scroll"+j],document.body["offset"+j],document.documentElement["offset"+j]):i===G?(this.length?O.css(this[0],m):null):this.css(m,typeof i==="string"?i:i+"px")
}
})
}())
})();
if(!window.RichFaces){window.RichFaces={}
}if(!window.RichFaces.Memory){window.RichFaces.Memory={nodeCleaners:{},componentCleaners:{},addCleaner:function(A,B){this.nodeCleaners[A]=B
},addComponentCleaner:function(B,C,A){this.componentCleaners[B]={cleaner:C,checker:A}
},applyCleaners:function(B,C,D){for(var A in this.nodeCleaners){this.nodeCleaners[A](B,C)
}for(var A in this.componentCleaners){if(this.componentCleaners[A].checker(B,C)){D.push(B)
}}},_clean:function(F,E,G){if(F){this.applyCleaners(F,E,G);
var B=F.all;
if(B){var A=0;
var D=B.length;
for(var A=0;
A<D;
A++){this.applyCleaners(B[A],E,G)
}}else{var C=F.firstChild;
while(C){this._clean(C,E,G);
C=C.nextSibling
}}}},_cleanComponentNodes:function(E,D){for(var B=0;
B<E.length;
B++){var C=E[B];
for(var A in this.componentCleaners){this.componentCleaners[A].cleaner(C,D)
}}},clean:function(B,A){var C=[];
this._clean(B,A,C);
this._cleanComponentNodes(C,A);
C=null
}};
window.RichFaces.Memory.addComponentCleaner("richfaces",function(D,E){var B=D.component;
if(B){var C=B["rich:destructor"];
if(C){var A=B[C];
if(A){A.call(B,E)
}}}},function(A,B){return(A.component&&A.component["rich:destructor"])
});
if(window.attachEvent){window.attachEvent("onunload",function(){var A=window.RichFaces.Memory;
A.clean(document);
A.clean(window)
})
}}if(!window.RichFaces){window.RichFaces={}
}if(!window.RichFaces.isJQueryWrapped){var oldJQuery=jQuery;
if(window.RichFaces&&window.RichFaces.Memory){window.RichFaces.Memory.addCleaner("jquery",function(A,B){if(A&&A[oldJQuery.expando]){oldJQuery.event.remove(A);
oldJQuery.removeData(A)
}})
}window.RichFaces.isJQueryWrapped=true
}
if(!window.Richfaces){window.Richfaces={}
}Richfaces.jQuery={};
(function(C,B){var D=/^\s*[^\s]*px\s*$/;
var A=function(E){if(E){if(D.test(E)){try{return parseInt(E.replace(D,""),10)
}catch(F){}}}return NaN
};
C.position=function(P,L){var J=B(L);
var F=J.width();
var S=J.height();
var H=A(J.css("left"));
if(isNaN(H)){H=0;
J.css("left","0px")
}var O=A(J.css("top"));
if(isNaN(O)){O=0;
J.css("top","0px")
}var E=J.offset();
var M=B(window);
var G=M.width();
var Q=M.scrollLeft();
var I=M.height();
var K=M.scrollTop();
var R;
if(P.left+F>Q+G&&P.left+P.width-F>=Q){R=P.left+P.width-F
}else{R=P.left
}var N;
if(P.top+P.height+S>K+I&&P.top-S>=K){N=P.top-S
}else{N=P.top+P.height
}H+=R-E.left;
O+=N-E.top;
J.css("left",(H+"px")).css("top",(O+"px"))
};
C.getPointerRectangle=function(E){var F=B.event.fix(E);
return{width:0,height:0,left:F.pageX,top:F.pageY}
};
C.getElementRectangle=function(E){var F=B(E);
var G=F.offset();
return{width:F.width(),height:F.height(),left:G.left,top:G.top}
}
}(Richfaces.jQuery,jQuery))

var DnD={CODE_ACCEPT:"accept",CODE_DEFAULT:"default",CODE_REJECT:"reject",startDrag:function(A){if(!window.drag){this.init();
window.drag=A;
Event.observe(document,"mousemove",this.mousemove);
Event.observe(document,"mouseup",this.mouseup)
}else{alert("drag in progress")
}},endDrag:function(C){Event.stopObserving(document,"mousemove",this.mousemove);
Event.stopObserving(document,"mouseup",this.mouseup);
var B=window.drag;
if(B){window.drag=null;
var A=B.dropzone;
B.source.endDrag(C,B);
if(A){A.onbeforedrag(C,B);
if(A.accept(B)){A.drop(C,B)
}A.onafterdrag(C)
}}},updateDrag:function(C){var B=window.drag;
if(!B.source.onupdatedrag||(B.source.onupdatedrag(C)!=false)){var A=Event.pointerX(C);
var D=Event.pointerY(C);
B.indicator.position(A+5,D+14);
Event.stop(C)
}},initialized:false,init:function(){if(!this.initialized){this.mousemove=this.updateDrag.bindAsEventListener(this);
this.mouseup=this.endDrag.bindAsEventListener(this);
this.initialized=true
}}};
DnD.Drag=Class.create();
DnD.Drag.prototype={initialize:function(C,A,B){this.source=C;
this.indicator=A;
this.type=B;
this.params={}
},dragged:false,dropzone:null,getParameters:function(){var A={};
Object.extend(A,this.params);
return A
}}

A4J_Command=Class.create();
A4J_Command.prototype={initialize:function(B,C,A){this.form=Event.findElement(B,"form");
this.target=A;
this.objectsCreated=new Array();
this.oldValuesOfExistingInputs={};
this.appendParameters(C);
this.processClick();
this.cleanUp()
},processClick:function(){var B=this.form;
var A=B.target;
$A(this.objectsCreated).each(function(C){B.appendChild(C)
});
if(this.target){B.target=this.target
}B.submit();
B.target=A
},appendParameters:function(B){var A=this;
$H(B).each(function(C){A.createOrInitHiddenInput(C.key,C.value)
})
},cleanUp:function(){var A=this.form;
$H(this.oldValuesOfExistingInputs).each(function(B){($(B.key)||A[B.key]).value=B.value
});
$A(this.objectsCreated).each(function(B){A.removeChild(B)
});
delete (this.objectsCreated)
},createOrInitHiddenInput:function(B,C){var A=$(B)||this.form[B];
if(!A){A=document.createElement("input");
A.setAttribute("type","hidden");
A.setAttribute("name",B);
A.setAttribute("id",B);
this.objectsCreated.push(A)
}else{this.oldValuesOfExistingInputs[B]=A.value
}A.value=C
}}

if(!window.Richfaces){window.Richfaces={}
}if(!Richfaces.SmartPosition){Richfaces.SmartPosition={options:$H({"positionX":["right","left","center"],"positionY":["bottom","top"],positionFloat:true}),getBase:function(){return(document.compatMode&&document.compatMode.toLowerCase()=="css1compat"&&!/Netscape|Opera/.test(navigator.userAgent))?document.documentElement:(document.body||null)
},screenOffset:function(G,A){G=$(G);
var B=this.getBase();
var C=/Opera/.test(navigator.userAgent);
var D=0,H=0;
var I="";
var E=G;
do{I+="element: "+E.tagName+", offsetTop = "+E.offsetTop+", offsetLeft = "+E.offsetLeft+"\n";
D+=E.offsetTop||0;
H+=E.offsetLeft||0;
I+="valueT = "+D+", valueL = "+H+"\n";
if(E.offsetParent==B&&Element.getStyle(E,"position")=="absolute"){break
}}while(E=E.offsetParent);
I+="\n\n";
E=G;
do{I+="element: "+E.tagName+", scrollTop = "+E.scrollTop+", scrollLeft = "+E.scrollLeft+"\n";
if(!C||(E.tagName!=undefined&&(E.tagName.toLowerCase()!="tr"&&E!=G&&E!=G.parentNode))){D-=E.scrollTop||0;
H-=E.scrollLeft||0
}I+="valueT = "+D+", valueL = "+H+"\n";
if(E==B){break
}}while(E=E.parentNode);
var F=[H,D];
if(arguments.length>1&&A){alert(I+"\n\noffset = "+F)
}G=$(G);
if(!C&&G.tagName.toLowerCase()=="input"){F[0]+=G.scrollLeft
}return F
},getVSpaces:function(B){var D=this.getBase();
if(this.isElement(B)){var F=this.screenOffset(B);
var C=Element.getDimensions(B);
var E=F[1];
var A=D.clientHeight-F[1]-C.height
}else{var E=B[1]-D.scrollTop;
var A=D.clientHeight-(B[1]-D.scrollTop)
}return{top:E,bottom:A}
},getHSpaces:function(B){var D=this.getBase();
if(this.isElement(B)){var F=this.screenOffset(B);
var C=Element.getDimensions(B);
var E=F[0]+C.width;
var A=D.clientWidth-F[0]
}else{var E=B[0]-D.scrollLeft;
var A=D.clientWidth-(B[0]-D.scrollLeft)
}return{left:E,right:A}
},getPosition:function(D,A,J){var B=this.getBase();
var F=[$(A).offsetWidth,$(A).offsetHeight];
var C=this.getHSpaces(D);
var G=this.getVSpaces(D);
if(this.isElement(D)){var E=this.screenOffset(D);
var I={width:$(D).offsetWidth,height:$(D).offsetHeight};
var H=[E[0],E[1]+I.height]
}else{var H=[D[0],D[1]]
}if(C.right<F[0]&&C.left>=F[0]){if(this.isElement(D)){H[0]=E[0]+I.width-F[0]
}else{H[0]=D[0]-F[0]
}}if(this.isElement(D)){H[0]+=B.scrollLeft
}if(G.bottom<F[1]&&G.top>=F[1]){if(this.isElement(D)){H[1]=E[1]-F[1]
}else{H[1]=H[1]-F[1]
}}if(this.isElement(D)){H[1]+=B.scrollTop
}return H
},getOption:function(A){if(A){return $H(A)
}else{return this.options
}},calcSizes:function(A){if(A.tagName.toLowerCase()=="table"){A.style.width="0px";
A.style.height="0px";
return{width:A.offsetWidth,height:A.offsetHeight}
}},isElement:function(A){return(A.length==undefined)
}}
}
if(!window.A4J){window.A4J={}
}if(!A4J.findForm){function _JSFFormSubmit(I,K,F,J){var C=(typeof K=="string"?document.getElementById(K):K);
if(C){var B=[];
var G=C.target;
if(F){C.target=F
}if(J){for(var D in J){B.push(D);
if(C.elements[D]){C.elements[D].value=J[D]
}else{var H=document.createElement("input");
H.type="hidden";
H.id=D;
H.name=D;
H.value=J[D];
if(D==="javax.faces.portletbridge.STATE_ID"&&C.firstChild){C.insertBefore(H,C.firstChild)
}else{C.appendChild(H)
}}}}var E;
if(C.fireEvent){E=C.fireEvent("onsubmit")
}else{var A=document.createEvent("HTMLEvents");
A.initEvent("submit",true,true);
E=C.dispatchEvent(A)
}if(E){C.submit()
}_clearJSFFormParameters(K,G,B)
}else{alert("Form "+K+" not found in document")
}return false
}function _clearJSFFormParameters(D,G,A){var E=(typeof D=="string"?document.getElementById(D):D);
if(E){if(G){E.target=G
}else{E.target=""
}if(A){for(var C=0;
C<A.length;
C++){var F=E.elements[A[C]];
if(F){var B=F.parentNode;
if(B){B.removeChild(F)
}}}}}}function clearFormHiddenParams(B,C,A){_clearJSFFormParameters(B,C,A)
}A4J.findForm=function(A){var B=A;
do{B=B.parentNode
}while(B&&B.nodeName.toLowerCase()!="form");
if(!B){B={reset:function(){},submit:function(){}}
}return B
};
A4J._formInput=null;
A4J.setupForm=function(C){var B=(typeof C=="string"?window.document.getElementById(C):C);
var A="click";
if(B.addEventListener){B.addEventListener(A,A4J._observer,false)
}else{if(B.attachEvent){B.attachEvent("on"+A,A4J._observer)
}}};
A4J._observer=function(A){var B=A.target||A.srcElement;
if(B&&B.nodeName.toUpperCase()=="INPUT"&&B.type.toUpperCase()=="SUBMIT"){A4J._formInput=B
}else{A4J._formInput=null
}}
}
if(!window.Richfaces){window.Richfaces={}
}Richfaces.setImages=function(B,A){B=$(B);
if(!B){return 
}for(imageSrc in A){if(typeof imageSrc!="function"){B[imageSrc]=new Image();
B[imageSrc].src=A[imageSrc]
}}}

if(!String.prototype.parseJSON){String.prototype.parseJSON=function(hook){try{if(!/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(this.replace(/("(\\.|[^"\\])*")|('(\\.|[^'\\])*')/g,""))){var j=eval("("+this+")");
if(typeof hook==="function"){function walk(v){if(v&&typeof v==="object"){for(var i in v){if(v.hasOwnProperty(i)){v[i]=walk(v[i])
}}}return hook(v)
}return walk(j)
}return j
}}catch(e){}throw new SyntaxError("parseJSON")
}
}EventHandlersWalk=function(v){if(v&&typeof v=="object"){var names=new Array();
for(var i in v){if(v.hasOwnProperty(i)){if(i.length>2&&i.substring(0,2)=="on"){names.push(i)
}}}for(var i=0;
i<names.length;
i++){var name=names[i];
var value=v[name];
if(value&&typeof value!="function"){var f=eval("(["+v[name]+"])")[0];
if(typeof f=="function"){v[name]=f
}}}}return v
}

JSNode=function(){};
JSNode.prototype={tag:null,attrs:{},childs:[],value:"",_symbols:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","\u00A0":"&nbsp;"},getInnerHTML:function(F){var B=[];
for(var A=0;
A<this.childs.length;
A++){B.push(this.childs[A].getContent(F))
}return B.join("")
},xmlEscape:function(A){var B=A?A.toString():"";
return B.escapeHTML()
}};
E=function(F,A,B){this.tag=F;
if(A){this.attrs=A
}if(B){this.childs=B
}};
E.prototype=new JSNode();
E.prototype.getContent=function(G){var F="<"+this.tag;
var A=this.getInnerHTML(G);
if(A==""){this.isEmpty=true
}else{this.isEmpty=false
}for(var B in this.attrs){if(!this.attrs.hasOwnProperty(B)){continue
}var H=this.attrs[B];
if(typeof H=="function"){H=H.call(this,G)
}if(H){F+=" "+(B=="className"?"class":B)+'="'+this.xmlEscape(H)+'"'
}}F+=">"+A+"</"+this.tag+">";
return F
};
ET=function(A){this.value=A
};
ET.prototype.getContent=function(A){var B=this.value;
if(typeof B=="function"){B=B(A)
}if(B&&B.getContent){B=B.getContent(A)
}if(B){return B
}return""
};
T=function(A){this.value=A
};
T.prototype=new JSNode();
T.prototype.getContent=function(A){var B=this.value;
if(typeof B=="function"){B=B(A)
}if(B){return this.xmlEscape(B)
}return""
};
C=function(A){this.value=A
};
C.prototype.getContent=function(A){return"<!--"+this.value+"-->"
};
D=function(A){this.value=A
};
D.prototype.getContent=function(A){return"<![CDATA["+this.value+"]]>"
}

if(!document.observe){throw"prototype.js is required!"
}if(!A4J||!A4J.AJAX||!A4J.AJAX.AddListener){throw"AJAX script is required!"
}if(!window.Richfaces){window.Richfaces={}
}Object.extend(Richfaces,function(){var D=0;
var B={};
var G=false;
var J=null;
var F=function(L,N){if(N instanceof Array){for(var M=0;
M<N.length;
M++){N[M](L)
}}else{N(L)
}};
var H=function(){if(G){Event.stopObserving(document,"mouseover",K,true);
Event.stopObserving(document,"focus",K,true);
Event.stopObserving(document,"focusin",K,true);
G=false;
J=null
}};
var K=function(N){var L=Event.element(N);
while(L){var P=L.id;
if(P){if(!J){J=P
}else{if(J==P){break
}}var M=B[P];
if(M){try{F(L,M)
}catch(O){A();
throw O
}delete B[P];
if(--D==0){H();
break
}}}L=L.parentNode
}};
var C=function(){if(!G){Event.observe(document,"mousemove",K,true);
Event.observe(document,"focus",K,true);
Event.observe(document,"focusin",K,true);
G=true
}};
var A=function(){try{H();
D=0;
B={}
}catch(L){LOG.error("Error occured during cleanup: "+L)
}};
var I=function(){try{for(var M in B){var L=$(M);
if(L){F(L,B[M])
}else{LOG.error("Element with id = "+M+" hasn't been found!")
}}}finally{A()
}};
var E=function(O,P){var N=$(O);
if(N){P(N)
}else{var L=B[O];
if(!L){B[O]=P;
J=null;
D++;
C()
}else{if(L instanceof Array){L.push(P)
}else{var M=new Array();
M.push(L);
M.push(P);
B[O]=M
}}}};
A4J.AJAX.AddListener(I);
document.observe("dom:loaded",I);
return{onAvailable:E}
}())

jQuery.ui||(function(C){var I=C.fn.remove,D=C.browser.mozilla&&(parseFloat(C.browser.version)<1.9);
C.ui={version:"1.7.1",plugin:{add:function(K,L,N){var M=C.ui[K].prototype;
for(var J in N){M.plugins[J]=M.plugins[J]||[];
M.plugins[J].push([L,N[J]])
}},call:function(J,L,K){var N=J.plugins[L];
if(!N||!J.element[0].parentNode){return 
}for(var M=0;
M<N.length;
M++){if(J.options[N[M][0]]){N[M][1].apply(J.element,K)
}}}},contains:function(K,J){return document.compareDocumentPosition?K.compareDocumentPosition(J)&16:K!==J&&K.contains(J)
},hasScroll:function(M,K){if(C(M).css("overflow")=="hidden"){return false
}var J=(K&&K=="left")?"scrollLeft":"scrollTop",L=false;
if(M[J]>0){return true
}M[J]=1;
L=(M[J]>0);
M[J]=0;
return L
},isOverAxis:function(K,J,L){return(K>J)&&(K<(J+L))
},isOver:function(O,K,N,M,J,L){return C.ui.isOverAxis(O,N,J)&&C.ui.isOverAxis(K,M,L)
},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};
if(D){var F=C.attr,E=C.fn.removeAttr,H="http://www.w3.org/2005/07/aaa",A=/^aria-/,B=/^wairole:/;
C.attr=function(K,J,L){var M=L!==undefined;
return(J=="role"?(M?F.call(this,K,J,"wairole:"+L):(F.apply(this,arguments)||"").replace(B,"")):(A.test(J)?(M?K.setAttributeNS(H,J.replace(A,"aaa:"),L):F.call(this,K,J.replace(A,"aaa:"))):F.apply(this,arguments)))
};
C.fn.removeAttr=function(J){return(A.test(J)?this.each(function(){this.removeAttributeNS(H,J.replace(A,""))
}):E.call(this,J))
}
}C.fn.extend({remove:function(){C("*",this).add(this).each(function(){C(this).triggerHandler("remove")
});
return I.apply(this,arguments)
},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")
},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false
})
},scrollParent:function(){var J;
if((C.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){J=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(C.curCSS(this,"position",1))&&(/(auto|scroll)/).test(C.curCSS(this,"overflow",1)+C.curCSS(this,"overflow-y",1)+C.curCSS(this,"overflow-x",1))
}).eq(0)
}else{J=this.parents().filter(function(){return(/(auto|scroll)/).test(C.curCSS(this,"overflow",1)+C.curCSS(this,"overflow-y",1)+C.curCSS(this,"overflow-x",1))
}).eq(0)
}return(/fixed/).test(this.css("position"))||!J.length?C(document):J
}});
C.extend(C.expr[":"],{data:function(L,K,J){return !!C.data(L,J[3])
},focusable:function(K){var L=K.nodeName.toLowerCase(),J=C.attr(K,"tabindex");
return(/input|select|textarea|button|object/.test(L)?!K.disabled:"a"==L||"area"==L?K.href||!isNaN(J):!isNaN(J))&&!C(K)["area"==L?"parents":"closest"](":hidden").length
},tabbable:function(K){var J=C.attr(K,"tabindex");
return(isNaN(J)||J>=0)&&C(K).is(":focusable")
}});
function G(M,N,O,L){function K(Q){var P=C[M][N][Q]||[];
return(typeof P=="string"?P.split(/,?\s+/):P)
}var J=K("getter");
if(L.length==1&&typeof L[0]=="string"){J=J.concat(K("getterSetter"))
}return(C.inArray(O,J)!=-1)
}C.widget=function(K,J){var L=K.split(".")[0];
K=K.split(".")[1];
C.fn[K]=function(P){var N=(typeof P=="string"),O=Array.prototype.slice.call(arguments,1);
if(N&&P.substring(0,1)=="_"){return this
}if(N&&G(L,K,P,O)){var M=C.data(this[0],K);
return(M?M[P].apply(M,O):undefined)
}return this.each(function(){var Q=C.data(this,K);
(!Q&&!N&&C.data(this,K,new C[L][K](this,P))._init());
(Q&&N&&C.isFunction(Q[P])&&Q[P].apply(Q,O))
})
};
C[L]=C[L]||{};
C[L][K]=function(O,N){var M=this;
this.namespace=L;
this.widgetName=K;
this.widgetEventPrefix=C[L][K].eventPrefix||K;
this.widgetBaseClass=L+"-"+K;
this.options=C.extend({},C.widget.defaults,C[L][K].defaults,C.metadata&&C.metadata.get(O)[K],N);
this.element=C(O).bind("setData."+K,function(Q,P,R){if(Q.target==O){return M._setData(P,R)
}}).bind("getData."+K,function(Q,P){if(Q.target==O){return M._getData(P)
}}).bind("remove",function(){return M.destroy()
})
};
C[L][K].prototype=C.extend({},C.widget.prototype,J);
C[L][K].getterSetter="option"
};
C.widget.prototype={_init:function(){},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").removeAttr("aria-disabled")
},option:function(L,M){var K=L,J=this;
if(typeof L=="string"){if(M===undefined){return this._getData(L)
}K={};
K[L]=M
}C.each(K,function(N,O){J._setData(N,O)
})
},_getData:function(J){return this.options[J]
},_setData:function(J,K){this.options[J]=K;
if(J=="disabled"){this.element[K?"addClass":"removeClass"](this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").attr("aria-disabled",K)
}},enable:function(){this._setData("disabled",false)
},disable:function(){this._setData("disabled",true)
},_trigger:function(L,M,N){var P=this.options[L],J=(L==this.widgetEventPrefix?L:this.widgetEventPrefix+L);
M=C.Event(M);
M.type=J;
if(M.originalEvent){for(var K=C.event.props.length,O;
K;
){O=C.event.props[--K];
M[O]=M.originalEvent[O]
}}this.element.trigger(M,N);
return !(C.isFunction(P)&&P.call(this.element[0],M,N)===false||M.isDefaultPrevented())
}};
C.widget.defaults={disabled:false};
C.ui.mouse={_mouseInit:function(){var J=this;
this.element.bind("mousedown."+this.widgetName,function(K){return J._mouseDown(K)
}).bind("click."+this.widgetName,function(K){if(J._preventClickEvent){J._preventClickEvent=false;
K.stopImmediatePropagation();
return false
}});
if(C.browser.msie){this._mouseUnselectable=this.element.attr("unselectable");
this.element.attr("unselectable","on")
}this.started=false
},_mouseDestroy:function(){this.element.unbind("."+this.widgetName);
(C.browser.msie&&this.element.attr("unselectable",this._mouseUnselectable))
},_mouseDown:function(L){L.originalEvent=L.originalEvent||{};
if(L.originalEvent.mouseHandled){return 
}(this._mouseStarted&&this._mouseUp(L));
this._mouseDownEvent=L;
var K=this,M=(L.which==1),J=(typeof this.options.cancel=="string"?C(L.target).parents().add(L.target).filter(this.options.cancel).length:false);
if(!M||J||!this._mouseCapture(L)){return true
}this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){K.mouseDelayMet=true
},this.options.delay)
}if(this._mouseDistanceMet(L)&&this._mouseDelayMet(L)){this._mouseStarted=(this._mouseStart(L)!==false);
if(!this._mouseStarted){L.preventDefault();
return true
}}this._mouseMoveDelegate=function(N){return K._mouseMove(N)
};
this._mouseUpDelegate=function(N){return K._mouseUp(N)
};
C(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
(C.browser.safari||L.preventDefault());
L.originalEvent.mouseHandled=true;
return true
},_mouseMove:function(J){if(C.browser.msie&&!J.button){return this._mouseUp(J)
}if(this._mouseStarted){this._mouseDrag(J);
return J.preventDefault()
}if(this._mouseDistanceMet(J)&&this._mouseDelayMet(J)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,J)!==false);
(this._mouseStarted?this._mouseDrag(J):this._mouseUp(J))
}return !this._mouseStarted
},_mouseUp:function(J){C(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;
this._preventClickEvent=(J.target==this._mouseDownEvent.target);
this._mouseStop(J)
}return false
},_mouseDistanceMet:function(J){return(Math.max(Math.abs(this._mouseDownEvent.pageX-J.pageX),Math.abs(this._mouseDownEvent.pageY-J.pageY))>=this.options.distance)
},_mouseDelayMet:function(J){return this.mouseDelayMet
},_mouseStart:function(J){},_mouseDrag:function(J){},_mouseStop:function(J){},_mouseCapture:function(J){return true
}};
C.ui.mouse.defaults={cancel:null,distance:1,delay:0}
})(jQuery)

DnD.getDnDDefaultParams=function(B){var A=Richfaces.getNSAttribute("defaultdndparams",B);
if(A){var C=A.parseJSON(EventHandlersWalk);
if(C){return C
}}return{}
};
DnD.getDnDMergedParams=function(C,B){var E=DnD.getDnDDefaultParams(C);
var A=Richfaces.getNSAttribute(B,C);
if(A){var D=A.parseJSON(EventHandlersWalk);
if(E){if(D){Object.extend(E,D)
}}else{E=D
}}return E
};
DnD.getDnDDragParams=function(A){return DnD.getDnDMergedParams(A,"dragdndparams")
};
DnD.getDnDDropParams=function(A){return DnD.getDnDMergedParams(A,"dropdndparams")
};
DnD.setDefaultDnDParams=function(B){if(B){if(drag&&drag.source&&drag.source.getDraggableItems&&drag.source.getDraggableItems()>1){var A=drag.source.getDraggableItems();
B["count"]=A;
if(!B["label"]){B["label"]=B["count"]+" "+(B["units"]?B["units"]:"items")
}}}}

DnD.Draggable=function(){};
DnD.ieReleaseCapture=function(){if(document.releaseCapture){document.releaseCapture()
}};
DnD.DragEndListener=Class.create();
DnD.DragEndListener.prototype={initialize:function(A){this.callback=A;
this.onmoveBound=this.onmove.bindAsEventListener(this);
this.onupBound=this.onup.bindAsEventListener(this)
},activate:function(A){Event.observe(document,"mousemove",this.onmoveBound);
Event.observe(document,"mouseup",this.onupBound);
if(A.type=="mousemove"){this.onmoveBound(A)
}this.onSelectStartHandler=document.onselectstart;
this.onDragStartHandler=document.ondragstart;
document.onselectstart=function(){return false
};
document.ondragstart=function(){DnD.ieReleaseCapture();
return false
};
if(document.releaseCapture){Event.observe(document,"mousemove",DnD.ieReleaseCapture)
}},onmove:function(A){if("mousemove"==A.type){if(!this.mouseMoveProvidesButtonChecked){this.mouseMoveProvidesButtonChecked=true;
if(!this.mouseMoveProvidesButton){this.mouseMoveProvidesButton=A.button!=0
}}if(this.mouseMoveProvidesButton&&!Event.isLeftClick(A)&&RichFaces.getIEVersion()!=6){this.endDrag(A)
}}},onup:function(A){this.endDrag(A)
},endDrag:function(A){this.deactivate();
this.callback(A)
},deactivate:function(){Event.stopObserving(document,"mousemove",this.onmoveBound);
Event.stopObserving(document,"mouseup",this.onupBound);
document.onselectstart=this.onSelectStartHandler;
document.ondragstart=this.onDragStartHandler;
if(document.releaseCapture){Event.stopObserving(document,"mousemove",DnD.ieReleaseCapture)
}}};
DnD.Cursor=Class.create();
DnD.Cursor.prototype={initialize:function(A,B){this.element=A;
this.cursor=B;
this.visible=false;
if(this.element.style.cursor&&this.element.style.cursor!=""){this.oldcursor=this.element.style.cursor
}},showCursor:function(){var A=this.element;
this.element.style.cursor=this.cursor;
this.visible=true
},hideCursor:function(){var A=this.element;
A.style.cursor="";
this.visible=false;
if(this.oldcursor){this.element.style.cursor=this.oldcursor
}}};
DnD.Draggable.prototype={getElement:function(){return $(this.id)
},getDraggableOptions:function(){return null
},getDnDDefaultParams:function(){return DnD.getDnDDefaultParams(this.getElement())
},getDnDDragParams:function(){return DnD.getDnDDragParams(this.getElement())
},getContentType:function(){return null
},getIndicator:function(){return null
},getOrCreateDefaultIndicator:function(){var A=$("_rfDefaultDragIndicator");
if(!A){A=document.createElement("div");
A.id="_rfDefaultDragIndicatorLeft";
Element.setStyle(A,{"fontSize":"0px","lineHeight":"0px","zIndex":1000});
document.body.appendChild(A);
A=document.createElement("div");
A.id="_rfDefaultDragIndicatorRight";
Element.setStyle(A,{"fontSize":"0px","lineHeight":"0px","zIndex":1000});
document.body.appendChild(A);
A=document.createElement("div");
A.id="_rfDefaultDragIndicatorBottom";
Element.setStyle(A,{"fontSize":"0px","lineHeight":"0px","zIndex":1000});
document.body.appendChild(A);
A=document.createElement("div");
A.id="_rfDefaultDragIndicator";
Element.setStyle(A,{"fontSize":"0px","lineHeight":"0px","zIndex":1000});
Object.extend(A,DefaultDragIndicator);
document.body.appendChild(A)
}DefaultDragIndicator.changeIndicatorColor(A,"black");
return A
},setIndicator:function(C){var A=this.getIndicator();
if(A){var B=this.getDnDDragParams();
DnD.setDefaultDnDParams(B);
if(this.getDraggableItems&&this.getDraggableItems()>1){A.setContent("default",false,B)
}else{A.setContent("default",true,B)
}}},moveDrag:function(B){var A=Event.pointerX(B);
var C=Event.pointerY(B);
if(!window.drag&&(Math.abs(this.lastDragX-A)+Math.abs(this.lastDragY-C))>2){this.updateDrag(B)
}},isDragEnabled:function(){return !!this.getContentType()
},startDrag:function(A){if(this.isDragEnabled()){if(this.grabbingCursor){if(this.grabCursor&&this.grabCursor.visible){this.grabCursor.hideCursor()
}this.grabbingCursor.showCursor()
}if(!this.endDragListener){this.dragTrigger=this.moveDrag.bindAsEventListener(this);
this.endDragListener=new DnD.DragEndListener(function(B){Event.stopObserving(document,"mousemove",this.dragTrigger);
DnD.endDrag(B,window.drag)
}.bind(this))
}this.endDragListener.activate(A);
Event.observe(document,"mousemove",this.dragTrigger);
this.lastDragX=Event.pointerX(A);
this.lastDragY=Event.pointerY(A)
}},updateDrag:function(F){var E=this.getContentType();
var A=this.getIndicator();
var D=new DnD.Drag(this,A,E);
if(A.id.indexOf("_rfDefaultDragIndicator")!=-1){var G=D.source.getElement();
var C=Position.cumulativeOffset(G);
A.indicatorWidth=Element.getWidth(G);
A.indicatorHeight=Element.getHeight(G);
A.position(C[0],C[1]);
A.removalX=Event.pointerX(F)-C[0];
A.removalY=Event.pointerY(F)-C[1]
}DnD.startDrag(D);
DnD.updateDrag(F);
this.ondragstart(F,D);
if(A){A.show()
}var B=this.getDraggableOptions();
if(B&&B.ondragstart){B.ondragstart(F)
}},endDrag:function(E,D){DnD.endDrag(E);
this.lastDragX=undefined;
this.lastDragY=undefined;
if(this.endDragListener){this.endDragListener.deactivate()
}if(D){var A=D.indicator;
if(A){A.hide()
}this.ondragend(E,D)
}var C=this.getCurrentGrabbingCursor();
if(C){if(C.visible){C.hideCursor()
}}var B=this.getDraggableOptions();
if(B&&B.ondragend){B.ondragend(E)
}},attachCursor:function(){this.cursor=new DnD.Cursor()
},ondragstart:function(B,A){},ondragend:function(B,A){},ondragover:function(B){var A=this.getCurrentGrabCursor();
if(!document.body.style.cursor){if(A){if(!A.visible){A.showCursor()
}}}},ondragout:function(B){var A=this.getCurrentGrabCursor();
if(A){if(A.visible){A.hideCursor()
}}},getCurrentGrabbingCursor:function(){var B=window.drag;
var A=this.grabbingCursor;
if(B){A=B.source.grabbingCursor
}return A
},getCurrentGrabCursor:function(){var B=window.drag;
var A=this.grabCursor;
if(B){A=B.source.grabCursor
}return A
},onmouseup:function(C){var B=this.getCurrentGrabbingCursor();
var A=this.grabCursor;
if(B&&B.visible){B.hideCursor()
}if(A){A.showCursor()
}},ondropover:function(C,B){var A=this.getDraggableOptions();
if(A&&A.ondropover){C.drag=B;
A.ondropover(C)
}},ondropout:function(C,B){var A=this.getDraggableOptions();
if(A&&A.ondropout){C.drag=B;
A.ondropout(C)
}},enableDraggableCursors:function(A,B){var C=this.getElement();
if(A){this.dragOutBound=this.ondragout.bindAsEventListener(this);
this.dragOverBound=this.ondragover.bindAsEventListener(this);
this.dragUpBound=this.onmouseup.bindAsEventListener(this);
Event.observe(C,"mouseout",this.dragOutBound);
Event.observe(C,"mouseover",this.dragOverBound);
Event.observe(C,"mouseup",this.dragUpBound);
this.grabCursor=new DnD.Cursor(C,A)
}if(B){this.grabbingCursor=new DnD.Cursor(document.body,B)
}},disableDraggableCursors:function(){var A=this.getElement();
if(this.dragOutBound&&this.dragOverBound){Event.stopObserving(A,"mouseover",this.dragOutBound);
Event.stopObserving(A,"mouseout",this.dragOverBound)
}else{return false
}return true
},isDraggableCursorsEnabled:function(){if(this.isCursorsEnabled){this.isCursorsEnabled=true
}else{this.isCursorsEnabled=false
}return this.isCursorsEnabled
}};
DefaultDragIndicator={setContent:function(A,C,B){},show:function(){if(window.drag&&window.drag.source){var B=window.drag.source.getElement();
Element.setStyle(this,{"width":Element.getWidth(B)+"px","height":"1px"});
Element.show(this);
this.style.position="absolute";
var A=$("_rfDefaultDragIndicatorLeft");
if(A){Element.setStyle(A,{"width":"1px","height":Element.getHeight(B)+"px"});
Element.show(A);
A.style.position="absolute"
}A=$("_rfDefaultDragIndicatorRight");
if(A){Element.setStyle(A,{"width":"1px","height":Element.getHeight(B)+"px"});
Element.show(A);
A.style.position="absolute"
}A=$("_rfDefaultDragIndicatorBottom");
if(A){Element.setStyle(A,{"width":Element.getWidth(B)+"px","height":"1px"});
Element.show(A);
A.style.position="absolute"
}}},hide:function(){Element.hide(this);
this.style.position="";
var A=$("_rfDefaultDragIndicatorLeft");
if(A){Element.hide(A);
A.style.position=""
}A=$("_rfDefaultDragIndicatorRight");
if(A){Element.hide(A);
A.style.position=""
}A=$("_rfDefaultDragIndicatorBottom");
if(A){Element.hide(A);
A.style.position=""
}},position:function(A,C){if(this.removalX&&this.removalY){A-=(this.removalX+5);
C-=(this.removalY+14)
}Element.setStyle(this,{"left":A+"px","top":C+"px"});
var B=$("_rfDefaultDragIndicatorLeft");
if(B){Element.setStyle(B,{"left":A+"px","top":C+"px"})
}A+=this.indicatorWidth;
B=$("_rfDefaultDragIndicatorRight");
if(B){Element.setStyle(B,{"left":A+"px","top":C+"px"})
}A-=this.indicatorWidth;
C+=this.indicatorHeight;
B=$("_rfDefaultDragIndicatorBottom");
if(B){Element.setStyle(B,{"left":A+"px","top":C+"px"})
}},accept:function(){this.changeIndicatorColor(this,"green")
},reject:function(){this.changeIndicatorColor(this,"red")
},leave:function(){this.changeIndicatorColor(this,"black")
},changeIndicatorColor:function(A,B){Element.setStyle(A,{"borderTop":"1px dashed "+B});
var C=$("_rfDefaultDragIndicatorLeft");
if(C){Element.setStyle(C,{"borderLeft":"1px dashed "+B})
}C=$("_rfDefaultDragIndicatorRight");
if(C){Element.setStyle(C,{"borderRight":"1px dashed "+B})
}C=$("_rfDefaultDragIndicatorBottom");
if(C){Element.setStyle(C,{"borderBottom":"1px dashed "+B})
}}}

DnD.Dropzone=function(){};
DnD.Dropzone.DROP_TARGET_ID="dropTargetId";
DnD.Dropzone.prototype={getElement:function(){return $(this.id)
},getDropzoneOptions:function(){return null
},getDnDDefaultParams:function(){return DnD.getDnDDefaultParams(this.getElement())
},getDnDDropParams:function(){return DnD.getDnDDropParams(this.getElement())
},accept:function(A){return DnD.CLIENT_VALIDATION_OFF||this.getAcceptedTypes().indexOf(A.type)>-1
},getAcceptedTypes:function(){return[]
},getTypeMapping:function(){return{}
},getCursorTypeMapping:function(){return{}
},drop:function(B,A){},getIconCodeForType:function(B){var A=this.getTypeMapping();
if(B&&A){return A[B]
}return null
},getCursorForType:function(B){var A=this.getCursorTypeMapping();
if(B&&A){return A[B]
}},dragEnter:function(C){var F=window.drag;
F.dropzone=this;
F.source.ondropover(C,F);
var H=F.indicator;
var B=this.accept(F);
if(B){var I=this.getCursorForType(F.type);
if(I){this.acceptMappingCursor=new DnD.Cursor(this.getElement(),I);
this.acceptMappingCursor.showCursor()
}else{if(this.acceptCursor){this.acceptCursor.showCursor()
}}}else{if(this.rejectCursor){this.rejectCursor.showCursor()
}}if(H){var G=this.getIconCodeForType(F.type);
var D=F.source.getDnDDragParams();
if(D){Object.extend(D,this.getDnDDropParams())
}else{D=this.getDnDDropParams()
}if(D){if(G){D["marker"]=D[G]
}else{D["marker"]=null
}}var E=B?"accept":"reject";
DnD.setDefaultDnDParams(D);
if(F.source.getDraggableItems&&F.source.getDraggableItems()>1){H.setContent(E,false,D)
}else{H.setContent(E,true,D)
}if(B){H.accept()
}else{H.reject()
}}var A=this.getDropzoneOptions();
if(A&&A.ondragenter){A.ondragenter.call(C)
}},dragLeave:function(D){var B=window.drag;
B.dropzone=null;
B.source.ondropout(D,B);
B.source.setIndicator(D);
var A=B.indicator;
if(A){A.leave()
}var C=this.getDropzoneOptions();
if(C&&C.ondragexit){C.ondragexit(D)
}if(this.acceptCursor){if(this.acceptCursor.visible){this.acceptCursor.hideCursor()
}}if(this.rejectCursor){if(this.rejectCursor.visible){this.rejectCursor.hideCursor()
}}if(this.acceptMappingCursor){if(this.acceptMappingCursor.visible){this.acceptMappingCursor.hideCursor()
}}},dragUp:function(B){this.ondropend(B);
if(this.acceptCursor){if(this.acceptCursor.visible){this.acceptCursor.hideCursor()
}}if(this.rejectCursor){if(this.rejectCursor.visible){this.rejectCursor.hideCursor()
}}if(this.acceptMappingCursor){if(this.acceptMappingCursor.visible){this.acceptMappingCursor.hideCursor()
}}var A=this.getDropzoneOptions();
if(A&&A.ondropend){A.ondropend()
}},enableDropzoneCursors:function(B,A){if(B){this.acceptCursor=new DnD.Cursor(this.getElement(),B)
}if(A){this.rejectCursor=new DnD.Cursor(this.getElement(),A)
}},ondropend:function(A){},onafterdrag:function(A){},onbeforedrag:function(B,A){},ondragenter:function(A){},ondragexit:function(A){}}

var mediaName="rich-extended-skinning";
var userAgent=navigator.userAgent;
var skipNavigator=window.opera||(userAgent.indexOf("AppleWebKit/")>-1&&userAgent.indexOf("Chrome/")==-1);
if(!skipNavigator){var resetMedia=function(A){var B=A.getAttribute("media");
if(mediaName==B){A.removeAttribute("media")
}};
if(!window._RICH_FACES_SKINNING_ADDED_TO_BODY){var getElementByTagName=function(B,A){var E;
try{E=B.selectNodes('.//*[local-name()="'+A+'"]')
}catch(C){try{E=B.getElementsByTagName(A)
}catch(D){}}return E
};
var f=function(){if(window.RICH_FACES_EXTENDED_SKINNING_ON){var D=getElementByTagName(document,"link");
if(D){var A=D.length;
for(var C=0;
C<A;
C++){var B=D[C];
resetMedia(B)
}}}};
if(window.addEventListener){window.addEventListener("load",f,false)
}else{window.attachEvent("onload",f)
}window._RICH_FACES_SKINNING_ADDED_TO_BODY=true
}if(!window._RICH_FACES_SKINNING_ADDED_TO_AJAX&&typeof A4J!="undefined"&&A4J.AJAX){A4J.AJAX.AddHeadElementTransformer(function(A){if(window.RICH_FACES_EXTENDED_SKINNING_ON){if(A.tagName&&A.tagName.toLowerCase()=="link"){resetMedia(A)
}}});
window._RICH_FACES_SKINNING_ADDED_TO_AJAX=true
}}
if(!window.Richfaces){window.Richfaces={}
}Richfaces.SYNTHETIC_EVENT="Richfaces.SYNTHETIC_EVENT";
Richfaces.createEvent=function(F,D,C,E){var G;
if(document.createEventObject){if(C){G=document.createEventObject(C)
}else{G=document.createEventObject()
}}else{var B=C&&C.bubbles||false;
var A=C&&C.cancelable||true;
switch(F){case"abort":case"blur":case"change":case"error":case"focus":case"load":case"reset":case"resize":case"scroll":case"select":case"submit":case"unload":G=document.createEvent("HTMLEvents");
G.initEvent(F,B,A);
break;
case"DOMActivate":case"DOMFocusIn":case"DOMFocusOut":case"keydown":case"keypress":case"keyup":G=document.createEvent("UIEvents");
if(C){G.initUIEvent(F,B,A,C.windowObject,C.detail)
}else{G.initEvent(F,B,A)
}break;
case"click":case"mousedown":case"mousemove":case"mouseout":case"mouseover":case"mouseup":G=document.createEvent("MouseEvents");
if(C){G.initMouseEvent(F,B,A,C.windowObject,C.detail,C.screenX,C.screenY,C.clientX,C.clientY,C.ctrlKey,C.altKey,C.shiftKey,C.metaKey,C.button,C.relatedTarget)
}else{G.initEvent(F,B,A)
}break;
case"DOMAttrModified":case"DOMNodeInserted":case"DOMNodeRemoved":case"DOMCharacterDataModified":case"DOMNodeInsertedIntoDocument":case"DOMNodeRemovedFromDocument":case"DOMSubtreeModified":G=document.createEvent("MutationEvents");
if(C){G.initMutationEvent(F,B,A,C.relatedNode,C.prevValue,C.newValue,C.attrName,C.attrChange)
}else{G.initEvent(F,B,A)
}break;
default:G=document.createEvent("Events");
G.initEvent(F,B,A)
}}if(E){Object.extend(G,E)
}G[Richfaces.SYNTHETIC_EVENT]=true;
return{event:G,fire:function(){if(D.fireEvent){D.fireEvent("on"+F,this.event)
}else{D.dispatchEvent(this.event)
}},destroy:function(){if(E){for(var H in E){this.event[H]=undefined
}}}}
};
Richfaces.eventIsSynthetic=function(A){if(A){return new Boolean(A[Richfaces.SYNTHETIC_EVENT]).valueOf()
}return false
}

if(!window.Richfaces){window.Richfaces={}
}Richfaces.mergeStyles=function(B,C){var A;
for(A in B){if(typeof B[A]=="object"){this.mergeStyles(B[A],C[A])
}else{C[A]+=" "+B[A]
}}return C
};
Richfaces.getComputedStyle=function(D,A){var B=$(D);
if(B.nodeType!=Node.ELEMENT_NODE){return""
}if(B.currentStyle){return B.currentStyle[A]
}if(document.defaultView&&document.defaultView.getComputedStyle){var C=document.defaultView.getComputedStyle(B,null);
if(C){return C.getPropertyValue(A)
}}return""
};
Richfaces.getComputedStyleSize=function(B,A){var C=Richfaces.getComputedStyle(B,A);
if(C){C=C.strip();
C=C.replace(/px$/,"");
return parseFloat(C)
}return 0
};
Richfaces.getWindowSize=function(){var B=0,A=0;
if(typeof (window.innerWidth)=="number"){B=window.innerWidth;
A=window.innerHeight
}else{if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){B=document.documentElement.clientWidth;
A=document.documentElement.clientHeight
}else{if(document.body&&(document.body.clientWidth||document.body.clientHeight)){B=document.body.clientWidth;
A=document.body.clientHeight
}}}return{"width":B,"height":A}
};
Richfaces.removePX=function(B){var A=B.indexOf("px");
if(A==-1){return B
}return B.substr(0,A)
};
Richfaces.visitTree=function(A,D){var B=A;
if(!B){B=document
}D.call(this,B);
var C=B.firstChild;
while(C){Richfaces.visitTree(C,D);
C=C.nextSibling
}};
Richfaces.getNSAttribute=function(C,E){if(E.getAttributeNS){var A=E.getAttributeNS("http://richfaces.ajax4jsf.org/rich",C);
if(A){return A
}}var B=E.attributes;
var D="rich:"+C;
var A=B[D];
if(A){return A.nodeValue
}return null
};
Richfaces.VARIABLE_NAME_PATTERN=/^\s*[_,A-Z,a-z][\w,_\.]*\s*$/;
Richfaces.getObjectValue=function(D,B){var A=D.split(".");
var C=B[A[0]];
var E=1;
while(C&&E<A.length){C=C[A[E++]]
}return(C?C:"")
};
Richfaces.evalMacro=function(template,object){var _value_="";
if(Richfaces.VARIABLE_NAME_PATTERN.test(template)){if(template.indexOf(".")==-1){_value_=object[template];
if(!_value_){_value_=window[template]
}}else{_value_=Richfaces.getObjectValue(template,object);
if(!_value_){_value_=Richfaces.getObjectValue(template,window)
}}if(_value_&&typeof _value_=="function"){_value_=_value_(object)
}if(!_value_){_value_=""
}}else{try{if(Richfaces.browser.isObjectEval){_value_=object.eval(template)
}else{with(object){_value_=eval(template)
}}if(typeof _value_=="function"){_value_=_value_(object)
}}catch(e){LOG.warn("Exception: "+e.Message+"\n["+template+"]")
}}return _value_
};
Richfaces.evalSimpleMacro=function(B,A){var C=A[B];
if(!C){C=window[B];
if(!C){C=""
}}return C
};
Richfaces.getComponent=function(A,B){var D="richfacesComponent";
var C="richfaces:"+A;
while(B.parentNode){if(B[D]&&B[D]==C){return B.component
}else{B=B.parentNode
}}};
Richfaces.browser={isIE:(!window.opera&&/MSIE/.test(navigator.userAgent)),isIE6:(!window.opera&&/MSIE\s*[6][\d,\.]+;/.test(navigator.userAgent)),isSafari:/Safari/.test(navigator.userAgent),isOpera:!!window.opera,isObjectEval:(Richfaces.eval!=undefined),isFF2:(!window.opera&&/Firefox\s*[\/]2[\.]/.test(navigator.userAgent)),isFF3:(!window.opera&&/Firefox\s*[\/]3[\.]/.test(navigator.userAgent))};
Richfaces.eval=function(template,object){var value="";
try{with(object){value=eval(template)
}}catch(e){LOG.warn("Exception: "+e.message+"\n["+template+"]")
}return value
};
Richfaces.interpolate=function(A,D){for(var C in D){var B=D[C];
var E=new RegExp("\\{"+C+"\\}","g");
A=A.replace(E,B)
}return A
};
if(!Richfaces.position){Richfaces.Position={}
}Richfaces.Position.setElementPosition=function(D,M,H,K,C){var P=Richfaces.Position.getOffsetDimensions(D);
var L=Richfaces.Position.getOffsetDimensions(M);
var F=Richfaces.Position.getWindowViewport();
var N=Position.cumulativeOffset(M);
var B=N[0];
var A=N[1];
var O=/^(top|bottom)-(left|right)$/;
var E;
if(typeof H=="object"){B=H.x;
A=H.y
}else{if(H&&(E=H.toLowerCase().match(O))!=null){if(E[2]=="right"){B+=L.width
}if(E[1]=="bottom"){A+=L.height
}}else{}}if(K&&(E=K.toLowerCase().match(O))!=null){var G=K.toLowerCase().split("-");
if(E[2]=="left"){B-=P.width+C.x
}else{B+=C.x
}if(E[1]=="top"){A-=P.height+C.y
}else{A+=C.y
}}else{var J={square:0};
var I={right:N[0]+L.width,top:N[1]+L.height};
I.left=I.right-P.width;
I.bottom=I.top+P.height;
B=I.left;
A=I.top;
var Q=Richfaces.Position.checkCollision(I,F);
if(Q!=0){if(B>=0&&A>=0&&J.square<Q){J={x:B,y:A,square:Q}
}I={right:N[0]+L.width,bottom:N[1]};
I.left=I.right-P.width;
I.top=I.bottom-P.height;
B=I.left;
A=I.top;
Q=Richfaces.Position.checkCollision(I,F);
if(Q!=0){if(B>=0&&A>=0&&J.square<Q){J={x:B,y:A,square:Q}
}I={left:N[0],top:N[1]+L.height};
I.right=I.left+P.width;
I.bottom=I.top+P.height;
B=I.left;
A=I.top;
Q=Richfaces.Position.checkCollision(I,F);
if(Q!=0){if(B>=0&&A>=0&&J.square<Q){J={x:B,y:A,square:Q}
}I={left:N[0],bottom:N[1]};
I.right=I.left+P.width;
I.top=I.bottom-P.height;
B=I.left;
A=I.top;
Q=Richfaces.Position.checkCollision(I,F);
if(Q!=0){if(B<0||A<0||J.square>Q){B=J.x;
A=J.y
}}}}}}D.style.left=B+"px";
D.style.top=A+"px"
};
Richfaces.Position.getOffsetDimensions=function(C){C=$(C);
var G=$(C).getStyle("display");
if(G!="none"&&G!=null){return{width:C.offsetWidth,height:C.offsetHeight}
}var B=C.style;
var F=B.visibility;
var D=B.position;
var A=B.display;
B.visibility="hidden";
B.position="absolute";
B.display="block";
var H=C.offsetWidth;
var E=C.offsetHeight;
B.display=A;
B.position=D;
B.visibility=F;
return{width:H,height:E}
};
Richfaces.Position.checkCollision=function(A,B,D){if(A.left>=B.left&&A.top>=B.top&&A.right<=B.right&&A.bottom<=B.bottom){return 0
}var C={left:(A.left>B.left?A.left:B.left),top:(A.top>B.top?A.top:B.top),right:(A.right<B.right?A.right:B.right),bottom:(A.bottom<B.bottom?A.bottom:B.bottom)};
return(C.right-C.left)*(C.bottom-C.top)
};
Richfaces.Position.getWindowDimensions=function(){var A=self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;
var B=self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0;
return{width:A,height:B}
};
Richfaces.Position.getWindowScrollOffset=function(){var B=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;
var A=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
return{left:B,top:A}
};
Richfaces.Position.getWindowViewport=function(){var B=Richfaces.Position.getWindowDimensions();
var A=Richfaces.Position.getWindowScrollOffset();
return{left:A.left,top:A.top,right:B.width+A.left,bottom:B.height+A.top}
};
Richfaces.firstDescendant=function(A){var B=A.firstChild;
while(B&&B.nodeType!=1){B=B.nextSibling
}return B
};
Richfaces.lastDescendant=function(A){var B=A.lastChild;
while(B&&B.nodeType!=1){B=B.previousSibling
}return B
};
Richfaces.next=function(A){var B=A;
do{B=B.nextSibling
}while(B&&B.nodeType!=1);
return B
};
Richfaces.previous=function(A){var B=A;
do{B=B.previousSibling
}while(B&&B.nodeType!=1);
return B
};
Richfaces.removeNode=function(B){if(B){var A=B.parentNode;
if(A){A.removeChild(B)
}}};
Richfaces.readAttribute=function(C,B){var A=null;
var D=C.getAttributeNode(B);
if(D){A=D.nodeValue
}return A
};
Richfaces.writeAttribute=function(B,A,D){var C=B.getAttributeNode(A);
if(D!==null){if(C){C.nodeValue=D
}else{C=document.createAttribute(A);
C.nodeValue=D;
B.setAttributeNode(C)
}}else{if(C){B.removeAttributeNode(C)
}}};
Richfaces.mergeObjects=function(){var D=arguments[0];
if(D){for(var B=1;
B<arguments.length;
B++){var C=arguments[B];
if(C){for(var A in C){if(!D[A]){D[A]=C[A]
}}}}}};
Richfaces.invokeEvent=function(E,D,C,B){var A;
if(E){D=$(D);
if(D==document&&document.createEvent&&!D.dispatchEvent){D=document.documentElement
}var F;
if(document.createEvent){F=document.createEvent("HTMLEvents");
F.initEvent("dataavailable",true,true)
}else{F=document.createEventObject();
F.eventType="ondataavailable"
}F.eventName=C;
F.rich={component:this};
F.memo=B||{};
try{A=E.call(D,F)
}catch(G){LOG.warn("Exception: "+G.Message+"\n[on"+C+"]")
}}if(A!=false){A=true
}return A
};
Richfaces.setupScrollEventHandlers=function(A,B){var C=[];
A=A.parentNode;
while(A&&A!=window.document.body){if(A.offsetWidth!=A.scrollWidth||A.offsetHeight!=A.scrollHeight){C.push(A);
Event.observe(A,"scroll",B,false)
}A=A.parentNode
}return C
};
Richfaces.removeScrollEventHandlers=function(C,B){if(C){for(var A=0;
A<C.length;
A++){Event.stopObserving(C[A],"scroll",B,false)
}C=null
}}

if(!window.RichFaces){window.RichFaces={}
}RichFaces.MSIE=0;
RichFaces.FF=1;
RichFaces.OPERA=2;
RichFaces.NETSCAPE=3;
RichFaces.SAFARI=4;
RichFaces.KONQ=5;
RichFaces.navigatorType=function(){var A=navigator.userAgent.toLowerCase();
if(A.indexOf("msie")>=0||A.indexOf("explorer")>=0){return RichFaces.MSIE
}if(A.indexOf("firefox")>=0||A.indexOf("iceweasel")>=0){return RichFaces.FF
}if(A.indexOf("opera")>=0){return RichFaces.OPERA
}if(A.indexOf("netscape")>=0){return RichFaces.NETSCAPE
}if(A.indexOf("safari")>=0){return RichFaces.SAFARI
}if(A.indexOf("konqueror")>=0){return RichFaces.KONQ
}return"OTHER"
};
RichFaces.getOperaVersion=function(){var B=navigator.userAgent.toLowerCase();
var A=B.indexOf("opera");
if(A==-1){return 
}return parseFloat(B.substring(A+6))
};
RichFaces.getIEVersion=function(){var C="msie";
var D=navigator.userAgent.toLowerCase();
var A=D.indexOf(C);
if(A!=-1){var E=D.indexOf(";",A);
var B;
if(E!=-1){B=D.substring(A+C.length,E)
}else{B=D.substring(A+C.length)
}return parseFloat(B)
}else{return undefined
}}

if(!window.Richfaces){window.Richfaces={}
}Richfaces.jsFormSubmit=function(F,B,D,E){var C=document.getElementById(B);
if(C){var A=C.target;
var H=new Array();
if(E){for(var G in E){H.push(G)
}}_JSFFormSubmit(F,B,D,E);
_clearJSFFormParameters(B,A,H)
}}


