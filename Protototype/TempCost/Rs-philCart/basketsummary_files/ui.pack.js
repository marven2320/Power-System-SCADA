DragIndicator={init:function(A){var B=RichFaces.getIEVersion();
DragIndicator.isIE6=(B&&B<7);
this.realParent=this.parentNode;
this._nextSibling=this.nextSibling
},setContent:function(A,F,D){Element.clearChildren(this);
var C=DnD.getDnDDefaultParams(this);
if(!C){C={}
}if(D){Object.extend(C,D)
}if(!C["marker"]){if(C[A]){C["marker"]=C[A]
}else{C["marker"]=this.markers[A]
}}var B;
if(F){B=this.indicatorTemplates["single"]
}else{B=this.indicatorTemplates["multi"]
}new Insertion.Top(this,B.invoke("getContent",C).join(""));
this.adjustIFrame()
},show:function(){if(!this.floatedToBody){if(!this.realParent){this.realParent=this.parentNode;
this._nextSibling=this.nextSibling
}this.realParent.removeChild(this);
document.body.appendChild(this);
this.floatedToBody=true
}Element.show(this);
this.style.position="absolute";
this.adjustIFrame(true);
if(this.iframe){this.realParent.removeChild(this.iframe);
document.body.appendChild(this.iframe);
Element.show(this.iframe)
}},hide:function(){Element.hide(this);
this.style.position="";
this.offsets=undefined;
this.leave();
if(this.floatedToBody&&this.realParent){document.body.removeChild(this);
if(this._nextSibling){this.realParent.insertBefore(this,this._nextSibling)
}else{this.realParent.appendChild(this)
}this.floatedToBody=false
}this.adjustIFrame(false);
if(this.iframe){Element.hide(this.iframe);
document.body.removeChild(this.iframe);
this.realParent.appendChild(this.iframe)
}},position:function(A,B){if(!this.offsets){Element.show(this);
this.style.position="absolute"
}Element.setStyle(this,{"left":A+"px","top":B+"px"});
this.moveIFrame(A,B)
},accept:function(){Element.removeClassName(this,"drgind_default");
Element.removeClassName(this,"drgind_reject");
Element.addClassName(this,"drgind_accept");
var A=this.getAcceptClass();
if(A){Element.addClassName(this,A)
}},reject:function(){Element.removeClassName(this,"drgind_default");
Element.removeClassName(this,"drgind_accept");
Element.addClassName(this,"drgind_reject");
var A=this.getRejectClass();
if(A){Element.addClassName(this,A)
}},leave:function(){Element.removeClassName(this,"drgind_accept");
Element.removeClassName(this,"drgind_reject");
Element.addClassName(this,"drgind_default");
var B=this.getAcceptClass();
var A=this.getRejectClass();
if(B){Element.removeClassName(this,B)
}if(A){Element.removeClassName(this,A)
}},getAcceptClass:function(){return this.ils_acceptClass
},getRejectClass:function(){return this.ils_rejectClass
},initIFrame:function(){if(DragIndicator.isIE6&&!this.iframe){var A=$(document.createElement("div"));
A.innerHTML='<iframe class="rich-dragindicator-iframe" src="" scrolling="no" frameborder="0" style="filter:Alpha(opacity=0);position:absolute;top:0px;left:0px;display:block"></iframe>';
this.iframe=$(A.getElementsByTagName("iframe")[0]);
A.removeChild(this.iframe);
this.realParent.appendChild(this.iframe)
}},moveIFrame:function(A,B){this.initIFrame();
if(this.iframe){Element.setStyle(this.iframe,{"left":A,"top":B})
}},adjustIFrame:function(C){this.initIFrame();
if(this.iframe){if(Element.visible(this)){var B=this.offsetWidth+"px";
var D=this.offsetHeight+"px";
var A=this.offsetLeft+"px";
var F=this.offsetTop+"px";
Element.setStyle(this.iframe,{"left":A,"top":F});
Element.setStyle(this.iframe,{"width":B,"height":D})
}if(arguments.length>0){if(C){this.iframe.style.display=""
}else{this.iframe.style.display="none"
}}}}};
function createDragIndicator(B,C,A){Object.extend(B,DragIndicator);
B.init();
B.ils_acceptClass=C;
B.ils_rejectClass=A
}DefaultDragIndicatorView=[new E("table",{"style":"height : 100%; z-index: 2;","className":"drgind_internal","cellspacing":"0","cellpadding":"3","border":"0"},[new E("tbody",{},[new E("tr",{},[new E("td",{"className":"drgind_marker"},[new ET(function(context){return Richfaces.eval("marker",context)
})]),new E("td",{"className":"drgind_text"},[new E("div",{"className":"drgind_wordcut drgind_text_content"},[new ET(function(context){return Richfaces.eval("label",context)
})])])])])])]
;
DnD.SimpleDraggable=Class.create();
Object.extend(DnD.SimpleDraggable.prototype,DnD.Draggable.prototype);
Object.extend(DnD.SimpleDraggable.prototype,{initialize:function(B,A){this.id=$(B);
if(!this.id){alert("drag: Element with ["+B+"] ID was not found in the DOM tree. Probably element has no client ID or client ID hasn't been written. DnD's disabled. Check please!");
return 
}this.options=A;
this.dragIndicatorId=this.options.dragIndicator;
this.eventMouseDown=this.initDrag.bindAsEventListener(this);
Event.observe(this.id,"mousedown",this.eventMouseDown);
this.form=this.id;
while(this.form&&!/^form$/i.test(this.form.tagName)){this.form=this.form.parentNode
}this.enableDraggableCursors(this.options.grab,this.options.grabbing)
},getDnDDragParams:function(){if(this.options.dndParams){return this.options.dndParams.parseJSON(EventHandlersWalk)
}return null
},getIndicator:function(){var A=$(this.dragIndicatorId);
if(!A){A=this.getOrCreateDefaultIndicator()
}return A
},ondragstart:function(B,A){A.params=this.options.parameters;
A.params[this.id]=this.id;
this.setIndicator(B);
if(this.form){A.params[this.form.id]=this.form.id
}},getContentType:function(){return this.options.dragType
},getDraggableOptions:function(){return this.options
},initDrag:function(A){if(Event.isLeftClick(A)){var B=Event.element(A);
if(B.tagName&&/^INPUT|SELECT|OPTION|BUTTON|TEXTAREA$/i.test(B.tagName)){return 
}Event.stop(A);
this.startDrag(A)
}}})
;
DnD.SimpleDropZone=Class.create();
Object.extend(DnD.SimpleDropZone.prototype,DnD.Dropzone.prototype);
Object.extend(DnD.SimpleDropZone.prototype,{initialize:function(C,A){this.id=C;
var B=$(C);
if(!B){alert("drop: Element with ["+C+"] ID was not found in the DOM tree. Probably element has no client ID or client ID hasn't been written. DnD's disabled. Check please!");
return 
}this.element=B;
if(A.acceptedTypes){this.acceptedTypes=A.acceptedTypes
}else{this.acceptedTypes=[]
}if(A.typeMapping){this.typeMapping=A.typeMapping
}else{this.typeMapping={}
}if(A.cursorTypeMapping){this.cursorTypeMapping=A.cursorTypeMapping
}else{this.cursorTypeMapping={}
}this.mouseoverBound=this.mouseover.bindAsEventListener(this);
this.mouseoutBound=this.mouseout.bindAsEventListener(this);
this.mouseupBound=this.mouseup.bindAsEventListener(this);
Event.observe(B,"mouseover",this.mouseoverBound);
Event.observe(B,"mouseout",this.mouseoutBound);
Event.observe(B,"mouseup",this.mouseupBound);
this.options=A||{};
this.enableDropzoneCursors(A.acceptCursor,A.rejectCursor)
},getDropzoneOptions:function(){return this.options
},getDnDDropParams:function(){if(this.options.dndParams){return this.options.dndParams.parseJSON(EventHandlersWalk)
}return null
},mouseover:function(A){if(window.drag){this.dragEnter(A)
}},mouseup:function(A){this.dragUp(A)
},mouseout:function(A){if(window.drag){this.dragLeave(A)
}},getAcceptedTypes:function(){return this.acceptedTypes
},getTypeMapping:function(){return this.typeMapping
},getCursorTypeMapping:function(){return this.cursorTypeMapping
},drop:function(B,A){alert("I drop")
},onafterdrag:function(A){if(this.options.onafterdrag){this.options.onafterdrag.call(this,A)
}}})
;
Richfaces.TreeSelectEvent="Richfaces.TreeSelectEvent";
Richfaces.TreeExpandEvent="Richfaces.TreeExpandEvent";
Richfaces.TreeCollapseEvent="Richfaces.TreeCollapseEvent";
Richfaces.TreeComposite=Class.create({parent:null,initialize:function(){this.childs=[]
},removeChild:function(D){if(this.childs.length){var A=this.childs.indexOf(D);
if(A!=-1){var B=this.childs.splice(A,1);
if(B){for(var C=0;
C<B.length;
C++){B[C].parent=undefined
}}}}},addChild:function(C,A){var B;
if(typeof A!="undefined"){B=A
}else{B=this.childs.length
}this.childs.splice(B,0,C);
C.parent=this
},clearChildren:function(){for(var A=0;
A<this.childs.length;
A++){this.childs[A].parent=undefined
}this.childs=[]
}});
Tree=Class.create(Richfaces.TreeComposite);
Tree.ID_DEVIDER=":";
Tree.ID_CONTENT="content";
Tree.ID_CHILDS_ROW="childs";
Tree.ID_CHILDS_TD="td";
Tree.ID_HANDLES="handles";
Tree.ID_HANDLE="handle";
Tree.ID_HANDLE_IMG_EXPANDED="img:expanded";
Tree.ID_HANDLE_IMG_COLLAPSED="img:collapsed";
Tree.ID_ICON="icon";
Tree.ID_TEXT="text";
Tree.ID_MAIN_ROW="mainRow";
Tree.CLASS_ITEM_SELECTED="dr-tree-i-sel";
Tree.CLASS_ITEM_EXPANDED="dr-tree-h-ic-line-exp";
Tree.CLASS_ITEM_COLLAPSED="dr-tree-h-ic-line-clp";
Tree.CLASS_AJAX_SELECTED_LISTENER_FLAG="ajax_selected_listener_flag";
Tree.addMethods({initialize:function($super,F,A,E,D,C,B){$super();
this.childs=[];
this.elements={};
this.id=F;
this.switchType=E;
this.onselect=new Function("event",(D.onselect?D.onselect:"")+"; return true;");
this.onexpand=new Function("event",(D.onexpand?D.onexpand:"")+"; return true;");
this.oncollapse=new Function("event",(D.oncollapse?D.oncollapse:"")+"; return true;");
this.oncontextmenu=new Function("event",(D.oncontextmenu?D.oncontextmenu:"")+"; return true;");
this.onAjaxSelect=C;
this.element=$(F);
this.element.component=this;
this.inputId=A;
this.input=$(this.inputId);
this.toggleOnClick=B.toggleOnClick;
this.showConnectingLines=B.showConnectingLines;
this.disableKeyboardNavigation=B.disableKeyboardNavigation;
this.rightClickSelection=B.rightClickSelection;
var B=Object.extend({columnCount:0},arguments[1]||{});
this.options=B;
this.getElements();
this.selectionManager=new Tree.SelectionManager(this);
this.selectionManager.restoreSelection();
this["rich:destructor"]="destroy";
Event.observe(this.element,"click",function(K){if(Richfaces.eventIsSynthetic(K)){var L=K["treeItem"];
if(K[Richfaces.TreeSelectEvent]){Event.stop(K);
var I=L.getRichAttribute("onselected");
I=new Function("event",(I?I:"")+"; return true;");
var M=this.selectionManager.activeItem;
L.toggleSelection(K);
var J=I(K);
if(!J){K["cancelSelection"]=true;
K["treeItem"]=M;
if(M){M.toggleSelection(K)
}else{L.toggleSelection(K)
}return 
}J=this.onselect(K);
if(!J){K["cancelSelection"]=true;
K["treeItem"]=M;
if(M){M.toggleSelection(K)
}else{L.toggleSelection(K)
}return 
}var G=Richfaces.getNSAttribute("ajaxselectedlistener",$(K.selectedNode+Tree.ID_DEVIDER+Tree.ID_ICON));
if(G){this.onAjaxSelect(K)
}}else{if(K[Richfaces.TreeExpandEvent]){Event.stop(K);
var H=L.getRichAttribute("onexpand");
if(H){new Function("event",H).call(Event.element(K),K)
}this.onexpand(K)
}else{if(K[Richfaces.TreeCollapseEvent]){Event.stop(K);
var H=L.getRichAttribute("oncollapse");
if(H){new Function("event",H).call(Event.element(K),K)
}this.oncollapse(K)
}}}}}.bindAsEventListener(this));
Event.observe(this.element,"contextmenu",function(G){if(this.oncontextmenu(G)===false){Event.stop(G)
}}.bindAsEventListener(this))
},destroy:function(){this.selectionManager.destroy();
this.element.component=null
},getElements:function(B){this.elements.contentTd=$(this.id+Tree.ID_DEVIDER+Tree.ID_CHILDS_ROW);
if(this.elements.contentTd){for(var A=this.elements.contentTd.firstChild;
A!=null;
A=A.nextSibling){if(A.nodeType==1&&A.tagName.toLowerCase()=="table"){this.addChild(new Tree.Item(A,this,B))
}}}},refreshAfterAjax:function(A,B){this.getNodeElements(A);
this.updateSelection(B)
},getNodeElements:function(B){if(B){for(var A=0;
A<B.length;
A++){var C=B[A];
if(C==this.id){this.clearChildren();
this.getElements(true)
}else{Tree.Item.createItemForNode(C,this)
}}}},updateSelection:function(A){this.input.value=A;
this.selectionManager.restoreSelection()
},showNode:function(F){var D=F;
var C=0;
while(D&&Element.isChildOf(D,this.element)){C+=D.offsetTop;
D=D.offsetParent
}D=F;
var E=C+D.offsetHeight;
var A=this.element.scrollTop;
var B=A+this.element.clientHeight;
if(C<A){this.element.scrollTop=C
}else{if(E>B){this.element.scrollTop=E-this.element.clientHeight
}}},getElement:function(){return $(this.id)
}})
;
Tree.SelectionManager=Class.create();
Tree.SelectionManager.prototype={initialize:function(A){this.tree=A;
if(!this.tree.disableKeyboardNavigation){this.eventKeyDown=this.processKeyDown.bindAsEventListener(this);
Event.observe(document,"keydown",this.eventKeyDown)
}this.eventLostFocus=this.processLostFocus.bindAsEventListener(this);
Event.observe(document,"click",this.eventLostFocus);
this.eventPreventLostFocus=this.processPreventLostFocus.bindAsEventListener(this);
Event.observe(this.tree.element,"click",this.eventPreventLostFocus)
},destroy:function(){this.activeItem=null;
this.tree=null;
if(this.eventKeyDown){Event.stopObserving(document,"keydown",this.eventKeyDown)
}Event.stopObserving(document,"click",this.eventLostFocus)
},restoreSelection:function(){if(this.tree.input.value){var A=$(this.tree.input.value);
if(A){this.inFocus=true;
this.setSelection(A.object)
}}},processPreventLostFocus:function(A){if(Richfaces.eventIsSynthetic(A)){return 
}this.inFocus=true;
this.preventLostFocus=true
},processLostFocus:function(A){if(Richfaces.eventIsSynthetic(A)){return 
}if(!this.preventLostFocus){this.lostFocus()
}else{this.preventLostFocus=false
}},lostFocus:function(){this.inFocus=false
},setSelection:function(A){A.toggleSelection();
this.activeItem=A
},processKeyDown:function(E){if(!this.activeItem){return 
}if(!($(this.activeItem.id))){this.activeItem=null;
this.tree.input.value="";
return 
}var C=false;
var B=E.keyCode||E.charCode;
switch(B){case Event.KEY_UP:if(this.inFocus){if(!E.ctrlKey&&!E.shiftKey&&!E.altKey){var D=this.activeItem;
do{var A=this.getPreviousItemForSelection(D);
if(A&&A!=D){D=A;
if(D.toggleSelection(E)){this.activeItem=D;
D=null
}}else{D=null
}}while(D)
}C=true
}break;
case Event.KEY_DOWN:if(this.inFocus){if(!E.ctrlKey&&!E.shiftKey&&!E.altKey){var D=this.activeItem;
do{var A=this.getNextItemForSelection(D);
if(A&&A!=D){D=A;
if(D.toggleSelection(E)){this.activeItem=D;
D=null
}}else{D=null
}}while(D)
}C=true
}break;
case Event.KEY_LEFT:if(this.inFocus){if(!E.ctrlKey&&!E.shiftKey&&!E.altKey&&!this.activeItem.isLeaf()){this.activeItem.collapse()
}C=true
}break;
case Event.KEY_RIGHT:if(this.inFocus){if(!E.ctrlKey&&!E.shiftKey&&!E.altKey&&!this.activeItem.isLeaf()){this.activeItem.expand()
}C=true
}break;
case Event.KEY_TAB:this.lostFocus()
}if(C){if(E.preventBubble){E.preventBubble()
}Event.stop(E)
}},getNextItemForSelection:function(C){if(!C.isCollapsed()&&C.hasChilds()){return C.childs.first()
}else{var B=C.next();
if(B!=C){return B
}else{var A=C.parent;
while(A&&A!=this.tree){var B=A.next();
if(B!=A){return B
}else{A=A.parent
}}return C
}}},getPreviousItemForSelection:function(B){var A=B.previous();
if(A==B){if(B.parent!=this.tree&&B.parent){A=B.parent
}}else{if(!A.isCollapsed()&&A.hasChilds()){A=A.childs.last();
while(!A.isCollapsed()&&A.hasChilds()){A=A.childs.last()
}}}return A
}}
;
Tree.Item=Class.create(Richfaces.TreeComposite);
Tree.Item.findComponent=function(B,C){var A;
while(B&&!((A=B.object) instanceof Tree.Item)){if(C){B=C(B)
}else{B=B.parentNode
}}return A
};
Tree.Item.createItemForNode=function(){var A=function(D){var C=0;
var E=D;
while(E){if(E.object instanceof Tree.Item){C++
}E=E.previousSibling
}return C
};
var B=function(C){var D=C.parentNode;
if(D){D=Richfaces.previous(D)
}if(D){return D.object
}};
return function(G,D){var H=$(G);
var E=B(H)||D;
var C=A(H);
var F=new Tree.Item(H,D,true);
E.addChild(F,C);
return F
}
}();
Tree.Item.addMethods({initialize:function($super,P,N,I){$super();
this.tree=N;
this.elements={};
this["rich:destructor"]="destroy";
var G;
if(typeof P=="string"){G=$(P);
this.id=P
}else{G=P;
this.id=G.id
}G.component=this;
G.object=this;
var M=G.rows;
this.elements.itemElement=G;
this.elements.mainRow=M[0];
var T=G.nextSibling;
var B=this.id+Tree.ID_DEVIDER+Tree.ID_CHILDS_ROW;
while(T&&T.id!=B){T=T.nextSibling
}this.elements.childrenRow=T;
var O=this.id+Tree.ID_DEVIDER+Tree.ID_HANDLES;
var C=this.id+Tree.ID_DEVIDER+Tree.ID_ICON;
var L=this.id+Tree.ID_DEVIDER+Tree.ID_TEXT;
var K=Richfaces.next(G);
this.createSubNodes(K);
if(I&&this.tree.showConnectingLines){var F=G.rows[0].cells[0];
try{if(F.style&&F.style.removeExpression){F.style.backgroundImage=F.currentStyle.backgroundImage;
F.style.removeExpression("backgroundImage")
}if(K){if(K.style&&K.style.removeExpression){K.style.backgroundImage=K.currentStyle.backgroundImage;
K.style.removeExpression("backgroundImage")
}}}catch(U){}}var D=null;
var J=this.elements.mainRow.cells;
if("NETSCAPE"==RichFaces.navigatorType()){for(var S=0;
S<J.length;
S++){if(J[S].id==C){this.elements.iconElement=J[S]
}else{if(J[S].id==L){this.elements.textElement=J[S]
}else{if(J[S].id==O){D=J[S]
}}}if(this.elements.iconElement&&this.elements.textElement&&D){break
}}}else{this.elements.iconElement=J[C];
this.elements.textElement=J[L];
D=J[O]
}var A=this.id+Tree.ID_DEVIDER+Tree.ID_HANDLE;
var H=A+Tree.ID_DEVIDER+Tree.ID_HANDLE_IMG_EXPANDED;
var Q=A+Tree.ID_DEVIDER+Tree.ID_HANDLE_IMG_COLLAPSED;
this.elements.handle=Richfaces.firstDescendant(Richfaces.firstDescendant(D));
if(this.elements.handle.id==A){this.elements.handleImgCollapsed=Richfaces.firstDescendant(this.elements.handle);
this.elements.handleImgExpanded=Richfaces.next(this.elements.handleImgCollapsed);
if(this.elements.handleImgExpanded.id!=H||this.elements.handleImgCollapsed.id!=Q){throw"Script inconsistency detected! Please inform developers..."
}}else{this.elements.handle=null
}this.eventSelectionClick=this.toggleSelection.bindAsEventListener(this);
this.eventMouseOut=this.processMouseOut.bindAsEventListener(this);
this.eventMouseOver=this.processMouseOver.bindAsEventListener(this);
var R=this._getDraggableOptions();
if(R){this.enableDraggableCursors(R.grab,R.grabbing)
}var E=this.getDropzoneOptions();
if(E){this.enableDropzoneCursors(E.acceptCursor,E.rejectCursor)
}this.observeEvents();
this.previousTextClassNames=null;
this.highlightedTextClassNames=null;
this.selectedTextClassNames=null
},destroy:function(){if(this.parent){this.parent.removeChild(this)
}if(this.elements){this.elements.itemElement=undefined
}this.clearChildren();
if(this==this.tree.selectionManager.activeItem){this.tree.selectionManager.activeItem=null
}},observeEvents:function(){if(this.elements.iconElement){var A=Richfaces.getNSAttribute("oncontextmenu",this.elements.iconElement);
if(A&&A.length>0){this.onContextMenu=new Function("event",A+"; return true;").bindAsEventListener(this)
}Event.observe(this.elements.iconElement,"mousedown",this.eventSelectionClick);
Event.observe(this.elements.iconElement,"mouseout",this.eventMouseOut);
Event.observe(this.elements.iconElement,"mouseover",this.eventMouseOver);
if(this.onContextMenu){Event.observe(this.elements.iconElement,"contextmenu",this.onContextMenu)
}}if(this.elements.textElement){Event.observe(this.elements.textElement,"mousedown",this.eventSelectionClick);
Event.observe(this.elements.textElement,"mouseout",this.eventMouseOut);
Event.observe(this.elements.textElement,"mouseover",this.eventMouseOver);
if(this.onContextMenu){Event.observe(this.elements.textElement,"contextmenu",this.onContextMenu)
}}if(this.tree.switchType=="client"&&this.hasChilds()){this.eventCollapsionClick=this.toggleCollapsion.bindAsEventListener(this);
var B=this.tree.toggleOnClick?this.elements.mainRow:this.elements.handle;
Event.observe(B,"click",this.eventCollapsionClick)
}},createSubNodes:function(B){if(B){var C=B.firstChild;
while(C!=null){if(C.nodeType==1&&C.tagName.toLowerCase()=="table"){if(C.object instanceof Tree.Item){var A=C.object;
this.addChild(A)
}else{this.addChild(new Tree.Item(C,this.tree))
}}C=C.nextSibling
}}},fireExpansionEvent:function(){var A=new Object();
A[Richfaces.TreeExpandEvent]=true;
A["expandedNode"]=this.id;
A["treeItem"]=this;
var B=Richfaces.createEvent("click",this.tree.element,null,A);
try{B.fire()
}finally{B.destroy()
}},fireCollapsionEvent:function(){var A=new Object();
A[Richfaces.TreeCollapseEvent]=true;
A["collapsedNode"]=this.id;
A["treeItem"]=this;
var B=Richfaces.createEvent("click",this.tree.element,null,A);
try{B.fire()
}finally{B.destroy()
}},toggleCollapsion:function(){var D=this.id+Tree.ID_DEVIDER+Tree.ID_CHILDS_ROW;
if(this.hasChilds()){Element.toggle(D)
}var C=this.elements.mainRow;
if(C){Element.hide(C);
Element.show(C)
}var B=$(this.id+"NodeExpanded");
var A=this.elements.iconElement;
if(this.isCollapsed()){Element.hide(this.elements.handleImgExpanded);
Element.show(this.elements.handleImgCollapsed);
if(A&&Element.hasClassName(A,Tree.CLASS_ITEM_EXPANDED)){Element.removeClassName(A,Tree.CLASS_ITEM_EXPANDED);
Element.addClassName(A,Tree.CLASS_ITEM_COLLAPSED)
}if(B){B.value="false"
}this.fireCollapsionEvent()
}else{Element.show(this.elements.handleImgExpanded);
Element.hide(this.elements.handleImgCollapsed);
if(A&&Element.hasClassName(A,Tree.CLASS_ITEM_COLLAPSED)){Element.removeClassName(A,Tree.CLASS_ITEM_COLLAPSED);
Element.addClassName(A,Tree.CLASS_ITEM_EXPANDED)
}if(B){B.value="true"
}this.fireExpansionEvent()
}},getRichAttribute:function(A){return Richfaces.getNSAttribute(A,this.elements.iconElement)
},collapse:function(){if(!this.isCollapsed()&&this.tree.switchType!="client"){var C=$(this.tree.toggleOnClick?this.elements.mainRow:this.elements.handle);
if(C){C.onclick()
}}else{if(this.hasChilds()&&!this.isCollapsed()){Element.hide(this.elements.childrenRow);
Element.hide(this.elements.handleImgExpanded);
Element.show(this.elements.handleImgCollapsed);
var A=this.elements.iconElement;
if(A&&Element.hasClassName(A,Tree.CLASS_ITEM_EXPANDED)){Element.removeClassName(A,Tree.CLASS_ITEM_EXPANDED);
Element.addClassName(A,Tree.CLASS_ITEM_COLLAPSED)
}var B=$(this.id+"NodeExpanded");
if(B){B.value="false"
}this.fireCollapsionEvent()
}}},expand:function(){if(this.isCollapsed()&&this.tree.switchType!="client"){var C=$(this.tree.toggleOnClick?this.elements.mainRow:this.elements.handle);
if(C){C.onclick()
}}else{if(this.hasChilds()&&this.isCollapsed()){Element.show(this.elements.childrenRow);
Element.show(this.elements.handleImgExpanded);
Element.hide(this.elements.handleImgCollapsed);
var A=this.elements.iconElement;
if(A&&Element.hasClassName(A,Tree.CLASS_ITEM_COLLAPSED)){Element.removeClassName(A,Tree.CLASS_ITEM_COLLAPSED);
Element.addClassName(A,Tree.CLASS_ITEM_EXPANDED)
}var B=$(this.id+"NodeExpanded");
if(B){B.value="true"
}this.fireExpansionEvent()
}}},isCollapsed:function(){var A=this.elements.childrenRow;
if(A){return A.style.display=="none"
}else{return true
}},processMouseOut:function(B){if(this.isMouseIn){this.isMouseIn=false;
var A=this.elements.textElement;
A.className=this.previousTextClassNames;
this.previousTextClassNames=null;
if(window.drag){this.dragLeave(B)
}}},processMouseOver:function(B){if(!this.isMouseIn){this.isMouseIn=true;
var A=this.elements.textElement;
this.previousTextClassNames=A.className;
if(!this.highlightedTextClassNames){this.highlightedTextClassNames=Richfaces.getNSAttribute("highlightedclass",A)
}if(this.highlightedTextClassNames){A.className+=" "+this.highlightedTextClassNames
}if(window.drag){this.dragEnter(B)
}}},toggleSelection:function(E){if(E&&!E[Richfaces.TreeSelectEvent]&&!Richfaces.eventIsSynthetic(E)){if(E&&E.type=="mousedown"){if((this.tree.rightClickSelection&&Event.isRightClick(E))||Event.isLeftClick(E)){var H=Event.element(E);
if(H.tagName&&/^(input|select|option|button|textarea)$/i.test(H.tagName)){return 
}if(this.isDragEnabled()){Event.stop(E)
}}else{return 
}}var C=new Object();
C[Richfaces.TreeSelectEvent]=true;
C["originatingEventType"]=E.type;
C["treeItem"]=this;
C["selectedNode"]=this.id;
var A=Richfaces.createEvent("click",this.tree.element,null,C);
try{A.fire()
}finally{A.destroy()
}return !A.event["cancelSelection"]
}else{var G=this.tree.selectionManager.activeItem;
if(G){G.deselect()
}if(!E||E["treeItem"]){var D=this.elements.textElement;
if(!this.selectedTextClassNames){this.selectedTextClassNames=Richfaces.getNSAttribute("selectedclass",D)
}if(this.selectedTextClassNames){var F=this.selectedTextClassNames.split(" ");
for(var B=0;
B<F.length;
B++){Element.addClassName(D,F[B])
}if(this.previousTextClassNames&&this.previousTextClassNames.indexOf(this.selectedTextClassNames)==-1){this.previousTextClassNames+=" "+this.selectedTextClassNames
}this.tree.input.value=this.id;
this.tree.selectionManager.activeItem=this;
if(this.tree.options.onSelection){this.tree.options.onSelection(this.id)
}this.tree.showNode(D.parentNode)
}}else{this.tree.input.value="";
this.tree.selectionManager.activeItem=null
}if(E&&E["originatingEventType"]=="mousedown"){this.startDrag(E)
}return true
}},isSelected:function(){return Element.hasClassName(this.elements.textElement,Tree.CLASS_ITEM_SELECTED)
},deselect:function(){var D=this.elements.textElement;
if(this.selectedTextClassNames){var A=this.previousTextClassNames?this.previousTextClassNames.split(" "):undefined;
var E=this.selectedTextClassNames.split(" ");
for(var B=0;
B<E.length;
B++){var C=E[B];
Element.removeClassName(D,C);
if(A){A=A.without(C)
}}if(A){this.previousTextClassNames=A.join(" ")
}}},_nextForAxis:function(A){var B;
if(this.elements&&this.elements.itemElement){B=Tree.Item.findComponent(A(this.elements.itemElement),A)
}return B||this
},next:function(){return this._nextForAxis(Richfaces.next)
},previous:function(){return this._nextForAxis(Richfaces.previous)
},hasChilds:function(){return this.childs&&this.childs.length>0
},getElement:function(){return $(this.id)
},isLeaf:function(){return !this.elements.handle
}})
;
Object.extend(Tree.Item.prototype,DnD.Dropzone.prototype);
Object.extend(Tree.Item.prototype,DnD.Draggable.prototype);
Object.extend(Tree.Item.prototype,{getAcceptedTypes:function(){var B=this.getDropzoneOptions();
if(B){var A=B["acceptedTypes"];
if(A){return A
}}return[]
},mergeParams:function(C){var A=C(this.tree.getElement());
var B=C(this.getElement());
if(A){if(B){Object.extend(A,B)
}return A
}else{return B
}},getDnDDefaultParams:function(){return this.mergeParams(DnD.getDnDDefaultParams)
},getDnDDragParams:function(){return this.mergeParams(DnD.getDnDDragParams)
},getDnDDropParams:function(){return this.mergeParams(DnD.getDnDDropParams)
},getDropzoneOptions:function(){var A=Richfaces.getNSAttribute("dropzoneoptions",this.elements.iconElement);
if(A){return A.parseJSON(EventHandlersWalk)
}return null
},drop:function(D,B){B.params[DnD.Dropzone.DROP_TARGET_ID]=this.id;
var C=this.getDropzoneOptions();
if(C&&C.parameters){Object.extend(B.params,C.parameters)
}this.tree.drop.call(this,D,B);
var A=this.getDropzoneOptions();
if(A&&A.ondropend){A.ondropend()
}},getIndicator:function(){var C=this.getDraggableOptions();
var B=C?C.dragIndicator:null;
var A=$(B);
if(!A){A=this.getOrCreateDefaultIndicator()
}return A
},ondragstart:function(C,A){A.params[this.id]=this.id;
var B=this.getDraggableOptions();
if(B&&B.parameters){Object.extend(A.params,B.parameters)
}this.dragEnter(C)
},ondragend:function(B,A){this.dragStarted=false
},getDraggableOptions:function(){var A=window.drag;
if(A&&A.treeDraggableOptions){return A.treeDraggableOptions
}else{var B=this._getDraggableOptions();
if(A){A.treeDraggableOptions=B
}return B
}},_getDraggableOptions:function(){var A=Richfaces.getNSAttribute("draggableoptions",this.elements.iconElement);
if(A){return A.parseJSON(EventHandlersWalk)
}return null
},getContentType:function(){var A=this.getDraggableOptions();
if(A){return A["dragType"]
}return""
},getElement:function(){return this.elements.textElement.parentNode
}})
;
if(!window.DW){window.DW={}
}if(!window.Richfaces){window.Richfaces={}
}function discardElement(A){var B=document.getElementById("IELeakGarbageBin");
if(!B){B=document.createElement("DIV");
B.id="IELeakGarbageBin";
B.style.display="none";
document.body.appendChild(B)
}window.RichFaces.Memory.clean(A);
B.appendChild(A);
B.innerHTML=""
}Selection={};
Selection.eventHandler=function(A){Event.stop(A)
};
Selection.eventHandler=Selection.eventHandler.bindAsEventListener(Selection);
Selection.disableSelection=function(A){if(typeof A.onselectstart!="undefined"){Event.observe(A,"selectstart",this.eventHandler)
}else{if(typeof A.style.MozUserSelect!="undefined"){A.style.MozUserSelect="none"
}else{Event.observe(A,"mousedown",this.eventHandler)
}}};
Selection.enableSelection=function(A){if(typeof A.onselectstart!="undefined"){Event.stopObserving(A,"selectstart",this.eventHandler)
}else{if(typeof A.style.MozUserSelect!="undefined"){A.style.MozUserSelect=""
}else{Event.stopObserving(A,"mousedown",this.eventHandler)
}}};
ModalPanel=Class.create();
var ieVersion=RichFaces.getIEVersion();
if(ieVersion&&ieVersion<7){ModalPanel.disableSelects=true
}ModalPanel.panels=new Array();
ModalPanel.activePanels=new Array();
function getSizeElement(){var A;
var A;
if(RichFaces.navigatorType()!=RichFaces.OPERA&&document.compatMode=="CSS1Compat"){A=document.documentElement
}else{A=document.body
}return A
}ModalPanel.getMinimumSize=function(A){return Math.max(A,2*ModalPanel.Sizer.INITIAL_MIN+2)
};
ModalPanel.prototype={initialize:function(E,B){this["rich:destructor"]="destroy";
this.markerId=$(E);
this.id=$(E+"Container");
this.options=B;
this.baseZIndex=this.options.zindex?this.options.zindex:100;
this.minWidth=ModalPanel.getMinimumSize(this.options.minWidth);
this.minHeight=ModalPanel.getMinimumSize(this.options.minHeight);
this.div=E+"Div";
this.cursorDiv=E+"CursorDiv";
this.cdiv=E+"CDiv";
this.contentDiv=E+"ContentDiv";
this.contentTable=E+"ContentTable";
this.shadowDiv=E+"ShadowDiv";
this.borders=new Array();
if(this.options.resizeable){this.borders.push(new ModalPanel.Border(E+"ResizerN",this,"N-resize",ModalPanel.Sizer.N));
this.borders.push(new ModalPanel.Border(E+"ResizerE",this,"E-resize",ModalPanel.Sizer.E));
this.borders.push(new ModalPanel.Border(E+"ResizerS",this,"S-resize",ModalPanel.Sizer.S));
this.borders.push(new ModalPanel.Border(E+"ResizerW",this,"W-resize",ModalPanel.Sizer.W));
this.borders.push(new ModalPanel.Border(E+"ResizerNWU",this,"NW-resize",ModalPanel.Sizer.NWU));
this.borders.push(new ModalPanel.Border(E+"ResizerNEU",this,"NE-resize",ModalPanel.Sizer.NEU));
this.borders.push(new ModalPanel.Border(E+"ResizerNEL",this,"NE-resize",ModalPanel.Sizer.NEL));
this.borders.push(new ModalPanel.Border(E+"ResizerSEU",this,"SE-resize",ModalPanel.Sizer.SEU));
this.borders.push(new ModalPanel.Border(E+"ResizerSEL",this,"SE-resize",ModalPanel.Sizer.SEL));
this.borders.push(new ModalPanel.Border(E+"ResizerSWL",this,"SW-resize",ModalPanel.Sizer.SWL));
this.borders.push(new ModalPanel.Border(E+"ResizerSWU",this,"SW-resize",ModalPanel.Sizer.SWU));
this.borders.push(new ModalPanel.Border(E+"ResizerNWL",this,"NW-resize",ModalPanel.Sizer.NWL))
}if(this.options.moveable&&$(E+"Header")){this.header=new ModalPanel.Border(E+"Header",this,"move",ModalPanel.Header)
}this.markerId.component=this;
var A=$(this.div);
if(A.style.setExpression){if(ModalPanel.disableSelects||Richfaces.getComputedStyle(A,"position")!="fixed"){A.style.position="absolute";
var C=$(this.cursorDiv);
C.style.position="absolute";
A.style.zoom="1";
C.style.zoom="1";
var D=$(this.cdiv);
D.style.position="absolute";
D.parentNode.style.position="absolute";
D.mpUseExpr=true
}}ModalPanel.panels.push(this);
this.eventFirstOnfocus=this.firstOnfocus.bindAsEventListener(this);
this.eventLastOnfocus=this.lastOnfocus.bindAsEventListener(this);
this.firstHref=E+"FirstHref";
this.lastHref=E+"LastHref";
this.selectBehavior=B.selectBehavior
},_saveInputValues:function(D){if(Prototype.Browser.IE){var A=D.getElementsByTagName("input");
if(A){for(var C=0;
C<A.length;
C++){var B=A[C];
if(B.type=="checkbox"||B.type=="radio"){B.defaultChecked=B.checked
}}}}},width:function(){return this.getSizedElement().clientWidth
},height:function(){return this.getSizedElement().clientHeight
},getSizedElement:function(){if(!this._sizedElement){this._sizedElement=$(this.cdiv)
}return this._sizedElement
},getContentElement:function(){if(!this._contentElement){this._contentElement=this.options.autosized?$(this.contentTable):$(this.contentDiv)
}return this._contentElement
},destroy:function(){if(this.observerSize){window.clearInterval(this.observerSize);
this.observerSize=null
}this._contentElement=null;
this._sizedElement=null;
ModalPanel.panels=ModalPanel.panels.without(this);
this.enableSelects();
ModalPanel.activePanels=ModalPanel.activePanels.without(this);
this.parent=null;
this.firstOutside=null;
this.lastOutside=null;
if(this.header){this.header.destroy();
this.header=null
}for(var A=0;
A<this.borders.length;
A++){this.borders[A].destroy()
}this.borders=null;
setTimeout(function(){if(this.domReattached){var B=this.id;
var C=B.parentNode;
if(C){C.removeChild(B);
discardElement(B)
}}}.bind(this),0);
this.markerId.component=null;
this.markerId=null
},initIframe:function(){if(this.contentWindow){Element.setStyle(this.contentWindow.document.body,{"margin":"0px 0px 0px 0px"})
}else{}if("transparent"==Element.getStyle(document.body,"background-color")){this.style.filter="alpha(opacity=0)";
this.style.opacity="0"
}},enableSelect:function(A){if(A._mdwProcessed){A._mdwProcessed=undefined;
if(A._mdwDisabled){A.disabled=false;
A._mdwDisabled=undefined
}if(typeof A._mdwHidden!="undefined"){A.style.visibility=A._mdwHidden;
A._mdwHidden=undefined
}}},disableSelect:function(A){if(!A._mdwProcessed){A._mdwProcessed=true;
if("hide"==this.selectBehavior){if(A.style.visibility!="hidden"){A._mdwHidden=A.style.visibility;
A.style.visibility="hidden"
}}else{if(!A.disabled){A.disabled=true;
A._mdwDisabled=true
}}}},enableInnerSelects:function(){if(ModalPanel.disableSelects){var B=this.id.getElementsByTagName("SELECT");
for(var A=0;
A<B.length;
A++){this.enableSelect(B[A])
}}},disableInnerSelects:function(){if(ModalPanel.disableSelects){var B=this.id.getElementsByTagName("SELECT");
for(var A=0;
A<B.length;
A++){this.disableSelect(B[A])
}}},enableSelects:function(){if(!ModalPanel.disableSelects){return 
}var F=ModalPanel.activePanels[ModalPanel.activePanels.length-1];
var E=ModalPanel.activePanels[ModalPanel.activePanels.length-2];
if(E){if(F==this){E.enableInnerSelects()
}}else{var D=document.body.getElementsByTagName("SELECT");
for(var A=0;
A<D.length;
A++){this.enableSelect(D[A]);
}}},disableOuterSelects:function(){if(!ModalPanel.disableSelects){return 
}var lastPanel=ModalPanel.activePanels.last();
if(lastPanel){lastPanel.disableInnerSelects();
this.enableInnerSelects();
}else{var selects=document.body.getElementsByTagName("SELECT");
var innerSelects = this.id.getElementsByTagName("SELECT");
var firstInnerSelect = innerSelects[0];
var lastInnerSelect = innerSelects[innerSelects.length - 1];
var selectsAreInner = false;
for (var i=0; i<selects.length;i++){
var select = selects[i];
if (select == firstInnerSelect){selectsAreInner = true;}
if(!selectsAreInner){this.disableSelect(select);
}if (select == lastInnerSelect){selectsAreInner = false;
}}}},setLeft:function(B){var A=$(this.cdiv);
if(A.mpUseExpr){A.mpLeft=B
}else{A.style.left=B+"px"
}},setTop:function(B){var A=$(this.cdiv);
if(A.mpUseExpr){A.mpTop=B
}else{A.style.top=B+"px"
}},firstOnfocus:function(A){var B=$(this.firstHref);
if(B&&(ModalPanel.activePanels.last()==this)){B.focus()
}},lastOnfocus:function(A){var B=$(this.lastHref);
if(B&&(ModalPanel.activePanels.last()==this)){B.focus()
}},formElements:"|a|input|select|button|textarea|",processAllFocusElements:function(B,E){var A=-1;
var C;
if(B.focus&&B.nodeType==1&&(C=B.tagName)&&(A=this.formElements.indexOf(C.toLowerCase()))!=-1&&this.formElements.charAt(A-1)==="|"&&this.formElements.charAt(A+C.length)==="|"&&!B.disabled&&B.type!="hidden"){E.call(this,B)
}else{if(B!=this.id){var D=B.firstChild;
while(D){if(!D.style||D.style.display!="none"){this.processAllFocusElements(D,E)
}D=D.nextSibling
}}}},processTabindexes:function(A){if(!this.firstOutside&&!(A.tagName.toLowerCase()=="select"&&ModalPanel.disableSelects)){this.firstOutside=A
}this.lastOutside=A;
if(A.tabIndex&&!A.prevTabIndex){A.prevTabIndex=A.tabIndex
}A.tabIndex=undefined;
if(A.accesskey&&!A.prevAccesskey){A.prevAccesskey=A.accesskey
}A.accesskey=undefined
},restoreTabindexes:function(A){if(A.prevTabIndex){A.tabIndex=A.prevTabIndex;
A.prevTabIndex=undefined
}if(A.prevAccesskey){A.accesskey=A.prevAccesskey;
A.prevAccesskey=undefined
}},preventFocus:function(){this.processAllFocusElements(document,this.processTabindexes);
if(this.firstOutside){Event.observe(this.firstOutside,"focus",this.eventFirstOnfocus)
}if(this.lastOutside&&this.lastOutside!=this.firstOutside){Event.observe(this.lastOutside,"focus",this.eventLastOnfocus)
}},restoreFocus:function(){this.processAllFocusElements(document,this.restoreTabindexes);
if(this.firstOutside){Event.stopObserving(this.firstOutside,"focus",this.eventFirstOnfocus);
this.firstOutside=null
}if(this.lastOutside){Event.stopObserving(this.lastOutside,"focus",this.eventLastOnfocus);
this.lastOutside=null
}},show:function(T,N){if(!this.shown&&this.invokeEvent("beforeshow",T,null,A)){var A=this.id;
this.preventFocus();
if(!this.domReattached){this.parent=A.parentNode;
var P;
if(N){P=N.domElementAttachment
}if(!P){P=this.options.domElementAttachment
}var L;
if("parent"==P){L=this.parent
}else{if("form"==P){L=this._findForm(A)||document.body
}else{L=document.body
}}if(L!=this.parent){this._saveInputValues(A);
L.insertBefore(A,null);
this.domReattached=true
}else{Element.show(this.parent)
}}var W=$(this.cdiv);
var E=W.getElementsByTagName("form");
if(this.options.keepVisualState&&E){this.formOnsubmit=this.setStateInput.bindAsEventListener(this);
for(var U=0;
U<E.length;
U++){Event.observe(E[U],"submit",this.formOnsubmit)
}}var H;
if((ModalPanel.disableSelects||this.options.overlapEmbedObjects)&&!this.iframe){this.iframe=this.id.id+"IFrame";
new Insertion.Top(W,'<iframe src="javascript:\'\'" frameborder="0" scrolling="no" id="'+this.iframe+'" class="dr-mpnl-iframe" style="width: 1px; height: 1px;"></iframe>');
H=$(this.iframe);
Event.observe(H,"load",this.initIframe.bindAsEventListener(H))
}var D={};
this.userOptions={};
if(!W.mpSet){Object.extend(D,this.options)
}if(N){Object.extend(D,N);
Object.extend(this.userOptions,N)
}this.currentMinHeight=ModalPanel.getMinimumSize((D.minHeight||D.minHeight==0)?D.minHeight:this.minHeight);
this.currentMinWidth=ModalPanel.getMinimumSize((D.minWidth||D.minWidth==0)?D.minWidth:this.minWidth);
var C=this.getContentElement();
if(!this.options.autosized){if(D.width&&D.width==-1){D.width=300
}if(D.height&&D.height==-1){D.height=200
}}if(D.width&&D.width!=-1){if(this.currentMinWidth>D.width){D.width=this.currentMinWidth
}C.style.width=D.width+(/px/.test(D.width)?"":"px")
}if(D.height&&D.height!=-1){if(this.currentMinHeight>D.height){D.height=this.currentMinHeight
}C.style.height=D.height+(/px/.test(D.height)?"":"px")
}W.mpSet=true;
this.disableOuterSelects();
ModalPanel.activePanels=ModalPanel.activePanels.without(this);
ModalPanel.activePanels.push(this);
var X=$(this.div);
if(X.style.position=="absolute"){var K='getSizeElement().clientWidth + "px"';
var G='getSizeElement().clientHeight + "px"';
X.style.setExpression("width",K);
X.style.setExpression("height",G);
var M=$(this.cursorDiv);
M.style.setExpression("width",K);
M.style.setExpression("height",G);
var Q='-Position.cumulativeOffset(this.parentNode)[0] + getSizeElement().scrollLeft + "px"';
var J='-Position.cumulativeOffset(this.parentNode)[1] + getSizeElement().scrollTop + "px"';
X.style.setExpression("left",Q);
X.style.setExpression("top",J);
M.style.setExpression("left",Q);
M.style.setExpression("top",J);
var I='(this.mpLeft || 0) + -Position.cumulativeOffset(this.parentNode)[0] + getSizeElement().scrollLeft + "px"';
var O='(this.mpTop || 0) + -Position.cumulativeOffset(this.parentNode)[1] + getSizeElement().scrollTop + "px"';
W.style.setExpression("left",I);
W.style.setExpression("top",O)
}A.style.visibility="hidden";
Element.show(A);
this.correctShadowSize();
if(D.left){var V;
if(D.left!="auto"){V=parseInt(D.left,10)
}else{var B=getSizeElement().clientWidth;
var F=this.width();
if(B>=F){V=(B-F)/2
}else{V=0
}}this.setLeft(Math.round(V))
}if(D.top){var S;
if(D.top!="auto"){S=parseInt(D.top,10)
}else{var B=getSizeElement().clientHeight;
var Y=this.height();
if(B>=Y){S=(B-Y)/2
}else{S=0
}}this.setTop(Math.round(S))
}if(this.options.autosized){this.observerSize=window.setInterval(this.correctShadowSize.bindAsEventListener(this),500)
}this.doResizeOrMove(ModalPanel.Sizer.Diff.EMPTY);
for(var R=0;
R<this.borders.length;
R++){this.borders[R].doPosition()
}if(this.header){this.header.doPosition()
}Element.hide(W);
A.style.visibility="";
this.lastOnfocus();
Element.show(W);
var T={};
T.parameters=N||{};
this.shown=true;
this.invokeEvent("show",T,null,A)
}},startDrag:function(B){for(var A=0;
A<this.borders.length;
A++){this.borders[A].hide()
}Selection.disableSelection(document.body)
},endDrag:function(B){for(var A=0;
A<this.borders.length;
A++){this.borders[A].show();
this.borders[A].doPosition()
}Selection.enableSelection(document.body)
},hide:function(G,F){if(this.shown&&this.invokeEvent("beforehide",G,null,D)){this.currentMinHeight=undefined;
this.currentMinWidth=undefined;
this.restoreFocus();
this.enableSelects();
ModalPanel.activePanels=ModalPanel.activePanels.without(this);
var A=$(this.div);
var H=$(this.cdiv);
if(A.style.position=="absolute"){A.style.removeExpression("width");
A.style.removeExpression("height");
A.style.removeExpression("left");
A.style.removeExpression("top");
var E=$(this.cursorDiv);
E.style.removeExpression("width");
E.style.removeExpression("height");
E.style.removeExpression("left");
E.style.removeExpression("top");
H.style.removeExpression("left");
H.style.removeExpression("top")
}var D=$(this.id);
Element.hide(D);
if(this.parent){if(this.domReattached){this._saveInputValues(D);
this.parent.appendChild(D);
this.domReattached=false
}else{Element.hide(this.parent)
}}var G={};
G.parameters=F||{};
if(this.options&&this.options.onhide){this.options.onhide(G)
}var B=H.getElementsByTagName("form");
if(this.options.keepVisualState&&B){for(var C=0;
C<B.length;
C++){Event.stopObserving(B[C],"submit",this.formOnsubmit)
}}this.shown=false;
if(this.observerSize){window.clearInterval(this.observerSize);
this.observerSize=null
}if(ModalPanel.activePanels.length>0){ModalPanel.activePanels.last().preventFocus()
}}},_getStyle:function(B,A){return parseInt(B.style[A].replace("px",""),10)
},doResizeOrMove:function(L){var B={};
var H={};
var C={};
var F=false;
var E;
var K=this.getContentElement();
E=this._getStyle(K,"width");
var A=E;
E+=L.deltaWidth||0;
if(E>=this.currentMinWidth||this.options.autosized){if(L.deltaWidth){C.width=E+"px"
}}else{if(L.deltaWidth){C.width=this.currentMinWidth+"px";
B.vx=A-this.currentMinWidth
}B.x=true
}if(B.vx&&L.deltaX){L.deltaX=-B.vx
}var J=$(this.cdiv);
if(L.deltaX&&(B.vx||!B.x)){if(B.vx){L.deltaX=B.vx
}var G;
G=this._getStyle(J,"left");
G+=L.deltaX;
H.left=G+"px"
}E=this._getStyle(K,"height");
var A=E;
E+=L.deltaHeight||0;
if(E>=this.currentMinHeight||this.options.autosized){if(L.deltaHeight){C.height=E+"px"
}}else{if(L.deltaHeight){C.height=this.currentMinHeight+"px";
B.vy=A-this.currentMinHeight
}B.y=true
}if(B.vy&&L.deltaY){L.deltaY=-B.vy
}if(L.deltaY&&(B.vy||!B.y)){if(B.vy){L.deltaY=B.vy
}var G;
if(J.mpUseExpr){G=J.mpTop||0;
G+=L.deltaY;
J.mpTop=G;
H.top=G+"px"
}else{G=this._getStyle(J,"top");
G+=L.deltaY;
H.top=G+"px"
}}Element.setStyle(K,C);
Element.setStyle(J,H);
this.correctShadowSize();
Object.extend(this.userOptions,H);
Object.extend(this.userOptions,C);
var I=this.width();
var D=this.height();
this.reductionData=null;
if(I<=2*ModalPanel.Sizer.INITIAL_MAX){this.reductionData={};
this.reductionData.w=I
}if(D<=2*ModalPanel.Sizer.INITIAL_MAX){if(!this.reductionData){this.reductionData={}
}this.reductionData.h=D
}if(this.header){this.header.doPosition()
}return B
},_findForm:function(A){var B=A;
while(B){if(!B.tagName||B.tagName.toLowerCase()!="form"){B=B.parentNode
}else{break
}}return B
},setStateInput:function(E){var D=Event.element(E);
if(E&&D){D=this._findForm(D);
var A=document.createElement("input");
A.type="hidden";
A.id=this.markerId.id+"OpenedState";
A.name=this.markerId.id+"OpenedState";
A.value=this.shown?"true":"false";
D.appendChild(A);
var C=$H(this.userOptions).keys();
if(C){for(var B=0;
B<C.length;
B++){A=document.createElement("input");
A.type="hidden";
A.id=this.id.id+"StateOption_"+C[B];
A.name=this.id.id+"StateOption_"+C[B];
A.value=this.userOptions[C[B]];
D.appendChild(A)
}}return true
}},correctShadowSize:function(){var E=$(this.shadowDiv);
if(!E){return 
}var D=$(this.iframe);
var C=0;
var B=0;
if(!Richfaces.browser.isIE){C=E.offsetWidth-E.clientWidth;
B=E.offsetHeight-E.clientHeight
}var A=this.width();
var F=this.height();
E.style.width=(A-C)+"px";
E.style.height=(F-B)+"px";
if(D){D.style.width=A+"px";
D.style.height=F+"px"
}},invokeEvent:function(B,E,G,C){var D=this.options["on"+B];
var A;
if(D){var F;
if(E){F=E
}else{if(document.createEventObject){F=document.createEventObject()
}else{if(document.createEvent){F=document.createEvent("Events");
F.initEvent(B,true,false)
}}}F.rich={component:this};
F.rich.value=G;
try{A=D.call(C,F)
}catch(H){LOG.warn("Exception: "+H.Message+"\n[on"+B+"]")
}}if(A!=false){A=true
}return A
}};
Richfaces.findModalPanel=function(F){if(F){var D=(F.charAt(0)==":"?F:":"+F);
for(var B=0;
B<ModalPanel.panels.length;
B++){var A=ModalPanel.panels[B];
if(A&&A.markerId){var E=A.markerId.id;
if(E){if(E.length>=D.length){var C=E.substring(E.length-D.length,E.length);
if(C==D){return A.markerId
}}}}}}};
Richfaces.showModalPanel=function(E,D,C){var B=(Richfaces.browser.isIE||Richfaces.browser.isSafari)?function(H){if(document.readyState!="complete"){var G=arguments;
var F=this;
window.setTimeout(function(){G.callee.apply(F,G)
},50)
}else{H()
}}:function(F){F()
};
var A=$(E);
if(!A){A=Richfaces.findModalPanel(E)
}B(function(){A.component.show(C,D)
})
};
Richfaces.hideModalPanel=function(D,C,B){var A=$(D);
if(!A){A=Richfaces.findModalPanel(D)
}A.component.hide(B,C)
};
Richfaces.hideTopModalPanel=function(C,B){var A=ModalPanel.activePanels.last();
if(A){A.hide(C,B)
}}
;
ModalPanel.Border=Class.create();
ModalPanel.Border.prototype={initialize:function(E,C,D,B){this.id=E;
var A=$(E);
A.style.cursor=D;
this.boundStartDrag=this.startDrag.bindAsEventListener(this,new Date());
Event.observe(this.id,"mousedown",this.boundStartDrag);
this.modalPanel=C;
this.sizer=B;
this.boundDoDrag=this.doDrag.bindAsEventListener(this);
this.boundEndDrag=this.endDrag.bindAsEventListener(this)
},destroy:function(){if(this.doingDrag){Event.stopObserving(document,"mousemove",this.boundDoDrag);
Event.stopObserving(document,"mouseup",this.boundEndDrag)
}Event.stopObserving(this.id,"mousedown",this.boundStartDrag);
this.modalPanel=null
},show:function(){Element.show(this.id)
},hide:function(){Element.hide(this.id)
},startDrag:function(B){this.doingDrag=true;
this.dragX=B.clientX;
this.dragY=B.clientY;
Event.observe(document,"mousemove",this.boundDoDrag);
Event.observe(document,"mouseup",this.boundEndDrag);
var A=$(this.modalPanel.cursorDiv);
A.style.cursor=$(this.id).style.cursor;
A.style.zIndex=10;
this.modalPanel.startDrag(this);
this.onselectStartHandler=document.onselectstart;
document.onselectstart=function(){return false
}
},doDrag:function(A){if(!this.doingDrag){return 
}var E=A.clientX;
var B=A.clientY;
var G=Richfaces.getWindowSize();
if(E<0){E=0
}else{if(E>=G.width){E=G.width-1
}}if(B<0){B=0
}else{if(B>=G.height){B=G.height-1
}}var K=E-this.dragX;
var J=B-this.dragY;
if(K!=0||J!=0){var D=this.id;
var I=this.sizer.doDiff(K,J);
var H;
var F=$(this.modalPanel.cdiv);
if(I.deltaWidth||I.deltaHeight){H=this.modalPanel.invokeEvent("resize",A,null,F)
}else{if(I.deltaX||I.deltaY){H=this.modalPanel.invokeEvent("move",A,null,F)
}}var C;
if(H){C=this.modalPanel.doResizeOrMove(I)
}if(C){if(!C.x){this.dragX=E
}else{if(!I.deltaX){this.dragX-=C.vx||0
}else{this.dragX+=C.vx||0
}}if(!C.y){this.dragY=B
}else{if(!I.deltaY){this.dragY-=C.vy||0
}else{this.dragY+=C.vy||0
}}}}},endDrag:function(A){this.doingDrag=undefined;
Event.stopObserving(document,"mousemove",this.boundDoDrag);
Event.stopObserving(document,"mouseup",this.boundEndDrag);
this.modalPanel.endDrag(this);
this.modalPanel.doResizeOrMove(ModalPanel.Sizer.Diff.EMPTY);
$(this.modalPanel.cursorDiv).style.zIndex=-200;
document.onselectstart=this.onselectStartHandler;
this.onselectStartHandler=null;
var B=this.id
},doPosition:function(){this.sizer.doPosition(this.modalPanel,$(this.id))
}};
ModalPanel.Sizer=Class.create();
ModalPanel.Sizer.INITIAL_MIN=4;
ModalPanel.Sizer.INITIAL_MAX=40;
ModalPanel.Sizer.Diff=Class.create();
ModalPanel.Sizer.Diff.prototype={initialize:function(C,A,B,D){this.deltaX=C;
this.deltaY=A;
this.deltaWidth=B;
this.deltaHeight=D
}};
ModalPanel.Sizer.Diff.EMPTY=new ModalPanel.Sizer.Diff(0,0,0,0);
ModalPanel.Sizer.prototype={initialize:function(){},doSetupSize:function(E,B){var C=0;
var A=0;
var D=E.reductionData;
if(D){if(D.w){C=D.w/2
}if(D.h){A=D.h/2
}}if(C>0){if(B.clientWidth>C){if(!B.reducedWidth){B.reducedWidth=B.style.width
}B.style.width=C+"px"
}else{if(C<ModalPanel.Sizer.INITIAL_MAX&&B.reducedWidth==ModalPanel.Sizer.INITIAL_MAX+"px"){B.style.width=C+"px"
}}}else{if(B.reducedWidth){B.style.width=B.reducedWidth;
B.reducedWidth=undefined
}}if(A>0){if(B.clientHeight>A){if(!B.reducedHeight){B.reducedHeight=B.style.height
}B.style.height=A+"px"
}else{if(A<ModalPanel.Sizer.INITIAL_MAX&&B.reducedHeight==ModalPanel.Sizer.INITIAL_MAX+"px"){B.style.height=A+"px"
}}}else{if(B.reducedHeight){B.style.height=B.reducedHeight;
B.reducedHeight=undefined
}}},doSetupPosition:function(D,A,C,B){A.style.left=C+"px";
A.style.top=B+"px"
},doPosition:function(B,A){},doDiff:function(B,A){}};
ModalPanel.Sizer.NWU=Object.extend(new ModalPanel.Sizer(),{doPosition:function(B,A){this.doSetupSize(B,A);
this.doSetupPosition(B,A,0,0)
},doDiff:function(B,A){return new ModalPanel.Sizer.Diff(B,A,-B,-A)
}});
ModalPanel.Sizer.N=new ModalPanel.Sizer();
ModalPanel.Sizer.N.doPosition=function(B,A){A.style.width=B.width()+"px";
this.doSetupPosition(B,A,0,0)
};
ModalPanel.Sizer.N.doDiff=function(B,A){return new ModalPanel.Sizer.Diff(0,A,0,-A)
};
ModalPanel.Sizer.NEU=new ModalPanel.Sizer();
ModalPanel.Sizer.NEU.doPosition=function(B,A){this.doSetupSize(B,A);
this.doSetupPosition(B,A,B.width()-A.clientWidth,0)
};
ModalPanel.Sizer.NEU.doDiff=function(B,A){return new ModalPanel.Sizer.Diff(0,A,B,-A)
};
ModalPanel.Sizer.NEL=new ModalPanel.Sizer();
ModalPanel.Sizer.NEL.doPosition=function(B,A){this.doSetupSize(B,A);
this.doSetupPosition(B,A,B.width()-A.clientWidth,0)
};
ModalPanel.Sizer.NEL.doDiff=function(B,A){return new ModalPanel.Sizer.Diff(0,A,B,-A)
};
ModalPanel.Sizer.E=new ModalPanel.Sizer();
ModalPanel.Sizer.E.doPosition=function(B,A){A.style.height=B.height()+"px";
this.doSetupPosition(B,A,B.width()-A.clientWidth,0)
};
ModalPanel.Sizer.E.doDiff=function(B,A){return new ModalPanel.Sizer.Diff(0,0,B,0)
};
ModalPanel.Sizer.SEU=new ModalPanel.Sizer();
ModalPanel.Sizer.SEU.doPosition=function(B,A){this.doSetupSize(B,A);
this.doSetupPosition(B,A,B.width()-A.clientWidth,B.height()-A.clientHeight)
};
ModalPanel.Sizer.SEU.doDiff=function(B,A){return new ModalPanel.Sizer.Diff(0,0,B,A)
};
ModalPanel.Sizer.SEL=new ModalPanel.Sizer();
ModalPanel.Sizer.SEL.doPosition=function(B,A){this.doSetupSize(B,A);
this.doSetupPosition(B,A,B.width()-A.clientWidth,B.height()-A.clientHeight)
};
ModalPanel.Sizer.SEL.doDiff=function(B,A){return new ModalPanel.Sizer.Diff(0,0,B,A)
};
ModalPanel.Sizer.S=new ModalPanel.Sizer();
ModalPanel.Sizer.S.doPosition=function(B,A){A.style.width=B.width()+"px";
this.doSetupPosition(B,A,0,B.height()-A.clientHeight)
};
ModalPanel.Sizer.S.doDiff=function(B,A){return new ModalPanel.Sizer.Diff(0,0,0,A)
};
ModalPanel.Sizer.SWL=new ModalPanel.Sizer();
ModalPanel.Sizer.SWL.doPosition=function(B,A){this.doSetupSize(B,A);
this.doSetupPosition(B,A,0,B.height()-A.clientHeight)
};
ModalPanel.Sizer.SWL.doDiff=function(B,A){return new ModalPanel.Sizer.Diff(B,0,-B,A)
};
ModalPanel.Sizer.SWU=new ModalPanel.Sizer();
ModalPanel.Sizer.SWU.doPosition=function(B,A){this.doSetupSize(B,A);
this.doSetupPosition(B,A,0,B.height()-A.clientHeight)
};
ModalPanel.Sizer.SWU.doDiff=function(B,A){return new ModalPanel.Sizer.Diff(B,0,-B,A)
};
ModalPanel.Sizer.W=new ModalPanel.Sizer();
ModalPanel.Sizer.W.doPosition=function(B,A){A.style.height=B.height()+"px";
this.doSetupPosition(B,A,0,0)
};
ModalPanel.Sizer.W.doDiff=function(B,A){return new ModalPanel.Sizer.Diff(B,0,-B,0)
};
ModalPanel.Sizer.NWL=new ModalPanel.Sizer();
ModalPanel.Sizer.NWL.doPosition=function(B,A){this.doSetupSize(B,A);
this.doSetupPosition(B,A,0,0)
};
ModalPanel.Sizer.NWL.doDiff=function(B,A){return new ModalPanel.Sizer.Diff(B,A,-B,-A)
};
ModalPanel.Header=new ModalPanel.Sizer();
ModalPanel.Header.doPosition=function(B,A){};
ModalPanel.Header.doDiff=function(B,A){return new ModalPanel.Sizer.Diff(B,A,0,0)
}
;
if(!window.RichShuttleUtils){window.RichShuttleUtils={}
}RichShuttleUtils.execOnLoad=function(A,C,B){if(C()){A()
}else{window.setTimeout(function(){RichShuttleUtils.execOnLoad(A,C,B)
},B)
}};
RichShuttleUtils.Condition={ElementPresent:function(A){return function(){return A&&A.offsetHeight>0
}
}};
Array.prototype.remove=function(B){var A=this.indexOf(B,0,this.length);
if(A==-1){return 
}if(A==0){this.shift()
}else{this.splice(A,1)
}}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.getExternalClass=function(C,B){if(C){var A=C.length;
while(B>=A){B-=A
}return(C[B])?C[B]:""
}return""
};
Richfaces.SelectItem=Class.create();
Richfaces.SelectItem.findElement=function(B,D){var C=B;
if(C){if(C.id==D){return C
}C=C.firstChild;
while(C){var A=arguments.callee(C,D);
if(A){return A
}C=C.nextSibling
}}return null
};
Richfaces.SelectItem.prototype={initialize:function(A,C,B){this._label=A;
this._node=B;
this._node.item=this;
this._id=C;
this.input=Richfaces.SelectItem.findElement(B,B.id+"StateInput");
this.selected=/^s/.test(this.input.value);
this.active=/^s?a/.test(this.input.value)
},destroy:function(){this._node.item=null
},doActive:function(E,C){var B=this.CLASSES;
var F=this._node;
var A=B.ROW.ACTIVE;
var D=B.CELL.ACTIVE;
if(this.isSelected()){A=B.ROW.SELECTED+" "+B.ROW.ACTIVE;
D=B.CELL.SELECTED+" "+B.CELL.ACTIVE
}this.changeClass(F,A,D,E,C);
this.active=true;
this.saveState()
},doSelect:function(C,B){var D=this._node;
var A=this.CLASSES;
this.changeClass(D,A.ROW.SELECTED,A.CELL.SELECTED,C,B);
this.selected=true;
this.saveState()
},doNormal:function(C,B){var D=this._node;
var A=this.CLASSES;
this.changeClass(D,A.ROW.NORMAL,A.CELL.NORMAL,C,B);
this.active=false;
this.selected=false;
this.saveState()
},isSelected:function(){return this.selected
},isActive:function(){return this.active
},changeClass:function(H,G,E,F,D){H.className=F+" "+G;
var B=H.cells;
for(var C=0;
C<B.length;
C++){var A=B[C];
A.className=Richfaces.getExternalClass(D,A.cellIndex)+" "+E
}},saveState:function(){var A=/^s?a?/;
if(this.selected&&this.active){this.input.value=this.input.value.replace(A,"sa")
}else{if(this.selected){this.input.value=this.input.value.replace(A,"s")
}else{if(this.active){this.input.value=this.input.value.replace(A,"a")
}else{this.input.value=this.input.value.replace(A,"")
}}}}}
;
LayoutManager=function(A,B){this.headerTable=$(A);
this.contentTable=$(B);
this.headerDiv=(this.headerTable)?this.headerTable.parentNode:null;
this.contentDiv=this.contentTable.parentNode;
Event.observe(this.contentDiv,"scroll",this.scrollHandler.bindAsEventListener(this))
};
LayoutManager.SCROLL_WIDTH=17;
LayoutManager.STYLE_CONTENTTD_BORDER=1;
LayoutManager.STYLE_CONTENTTD_PADDING=4;
LayoutManager.prototype.widthSynchronization=function(){if(Prototype.Browser.IE&&this.contentDiv&&this.contentTable&&this.getScrollWidth()){if(this.contentTable.offsetWidth&&((this.contentTable.offsetWidth<=this.contentDiv.clientWidth))){this.contentTable.style.width=this.contentDiv.clientWidth+"px";
if(this.headerTable){this.headerTable.style.width=this.contentDiv.offsetWidth+"px"
}this.contentDiv.style.overflowX="hidden"
}}else{this.contentTable.style.width="100%"
}var E=this.contentTable.tBodies[0].rows;
if(E&&E[0]){var G=E[0].cells;
if(!this.headerTable||!this.headerTable.tHead){return 
}var B=this.headerTable.tHead.rows[0].cells;
var D;
for(var C=0;
C<G.length;
C++){var F=G[C];
var A=B[C];
D=LayoutManager.calculateWidth(F,A).colWidth;
if(C==G.length-1){D=D+this.getScrollWidth()
}A.firstChild.style.width=D+"px";
A.style.width=D+"px"
}}else{if(this.headerTable&&this.headerTable.tHead){this.headerTable.style.width="100%"
}}};
LayoutManager.prototype.getScrollWidth=function(){if(this.contentDiv.clientWidth!=0){return this.contentDiv.offsetWidth-this.contentDiv.clientWidth
}return 0
};
LayoutManager.prototype.scrollHandler=function(){if(this.headerDiv){this.headerDiv.scrollLeft=this.contentDiv.scrollLeft
}};
LayoutManager.getHeaderWidth=function(A,B){return B.offsetWidth+(A.offsetWidth-A.clientWidth)
};
LayoutManager.isIE=function(){return(/MSIE/.test(navigator.userAgent)&&!window.opera)
};
LayoutManager.getElemXY=function(C){var A=C.offsetLeft;
var D=C.offsetTop;
for(var B=C.offsetParent;
B;
B=B.offsetParent){A+=B.offsetLeft;
D+=B.offsetTop
}return{left:A,top:D}
};
LayoutManager.calculateWidth=function(G,B){var H=LayoutManager.getBorderWidth(G,"lr");
var J=LayoutManager.getPaddingWidth(G,"lr");
var E=LayoutManager.getMarginWidth(G,"lr");
var C=LayoutManager.getBorderWidth(B,"lr");
var I=LayoutManager.getPaddingWidth(B,"lr");
var A=LayoutManager.getMarginWidth(B,"lr");
var D=G.offsetWidth-H-J-E;
var F=D+(H-C)+(J-I)+(E-A);
F=(F>0)?F:0;
return{srcWidth:D,colWidth:F}
};
LayoutManager.getBorderWidth=function(B,A){return LayoutManager.getStyles(B,A,LayoutManager.borders)
};
LayoutManager.getPaddingWidth=function(B,A){return LayoutManager.getStyles(B,A,LayoutManager.paddings)
};
LayoutManager.getMarginWidth=function(B,A){return LayoutManager.getStyles(B,A,LayoutManager.margins)
};
LayoutManager.getStyles=function(D,F,E){var G=0;
for(var C=0,A=F.length;
C<A;
C++){var B=parseInt(Element.getStyle(D,E[F.charAt(C)]),10);
if(!isNaN(B)){G+=B
}}return G
};
LayoutManager.borders={l:"border-left-width",r:"border-right-width",t:"border-top-width",b:"border-bottom-width"},LayoutManager.paddings={l:"padding-left",r:"padding-right",t:"padding-top",b:"padding-bottom"},LayoutManager.margins={l:"margin-left",r:"margin-right",t:"margin-top",b:"margin-bottom"}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.Control=Class.create();
Richfaces.Control.eventStub=function(){return false
};
Richfaces.Control.onfocus=function(A){A.hasFocus=true
};
Richfaces.Control.onblur=function(A){A.hasFocus=undefined
};
Richfaces.Control.prototype.initialize=function(A,E,D,B,C){this.disabledNode=E;
this.disabledNode.onselectstart=Richfaces.Control.eventStub;
this.enabledNode=A;
this.enabledNode.onselectstart=Richfaces.Control.eventStub;
this.isShown=D;
this.isEnabled=B;
this.action=C
};
Richfaces.Control.prototype.doShow=function(){this.isShown=true;
if(this.isEnabled){this.doHideNode(this.disabledNode);
this.doShowNode(this.enabledNode)
}else{this.doHideNode(this.enabledNode);
this.doShowNode(this.disabledNode)
}};
Richfaces.Control.prototype.doHide=function(){this.isShown=false;
this.doHideNode(this.disabledNode);
this.doHideNode(this.enabledNode)
};
Richfaces.Control.prototype.doEnable=function(){this.isEnabled=true;
this.doHideNode(this.disabledNode);
this.doShowNode(this.enabledNode)
};
Richfaces.Control.prototype.doDisable=function(){this.isEnabled=false;
var B=this.enabledNode.select("a[id='"+this.enabledNode.id+"link']");
var C=undefined;
if(B&&B[0]){var D=B[0];
if(D.hasFocus){var A=this.disabledNode.select("a[id='"+this.disabledNode.id+"link']");
if(A&&A[0]){C=A[0]
}}}this.doHideNode(this.enabledNode);
this.doShowNode(this.disabledNode);
if(C&&C.focus){C.disabled=false;
C.focus();
C.disabled=true
}};
Richfaces.Control.prototype.doHideNode=function(A){A.hide()
};
Richfaces.Control.prototype.doShowNode=function(A){A.show()
}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.disableSelectionText=function(B){B=window.event||B;
if(B.srcElement){if(B.srcElement.tagName){var A=B.srcElement.tagName.toUpperCase();
if(A!="INPUT"&&A!="TEXTAREA"){return false
}}}};
Richfaces.ListBase=Class.create();
Richfaces.ListBase.compare=function(B,A){return((B==A)?0:((B<A)?-1:1))
};
Richfaces.ListBase.ORDERING_LIST_CLASSES={normal:"rich-ordering-list-items",disabled:"rich-ordering-list-disabled",active:"rich-ordering-list-active"};
Richfaces.ListBase.ASC="acs";
Richfaces.ListBase.DESC="desc";
Richfaces.ListBase.CONTROL_SET=["A","INPUT","TEXTAREA","SELECT","OPTION","BUTTON"];
Richfaces.ListBase.prototype={initialize:function(F,H,C,G,D,J,A,B){this["rich:destructor"]="destroy";
this.selectedItems=new Array();
this.container=$(F);
this.shuttleTable=$(H);
this.shuttleTable.onselectstart=Richfaces.disableSelectionText;
this.focusKeeper=$(G);
this.focusKeeper.focused=false;
this.focusKeeper.observe("keydown",(function(K){this.onkeydownHandler(window.event||K)
}).bindAsEventListener(this));
this.focusKeeper.observe("blur",function(K){this.focusListener(K)
}.bindAsEventListener(this));
this.focusKeeper.observe("focus",function(K){this.onfocusHandler(K)
}.bindAsEventListener(this));
this.shuttleTbody=this.shuttleTable.tBodies[0];
this.activeItem=null;
this.pseudoActiveItem=null;
this.items=null;
this.rowClasses=B;
this.columnsClasses=A;
this.controlClass=J;
this.retrieveShuttleItems(F,J);
this.counter;
this.shuttle=null;
this.sortOrder=Richfaces.ListBase.ASC;
this.clckHandler=function(K){this.onclickHandler(window.event||K)
}.bindAsEventListener(this);
this.shuttleTable.observe("click",this.clckHandler);
this.layoutManager=new LayoutManager(C,H);
this.tableElement=document.getElementById(H);
var I=this.tableElement.tBodies[0].rows;
if(I&&I[0]){this.firstTrElement=I[0];
if(this.firstTrElement.addEventListener&&(Richfaces.browser.isFF3||Richfaces.browser.isSafari)){this.imagesOnLoad=this.imageLoadListener.bind(this);
this.firstTrElement.addEventListener("load",this.imagesOnLoad,true)
}}var E=function(){this.layoutManager.widthSynchronization()
}.bindAsEventListener(this);
RichShuttleUtils.execOnLoad(E,RichShuttleUtils.Condition.ElementPresent(this.container),100)
},imageLoadListener:function(A){this.layoutManager.widthSynchronization();
if(this.firstTrElement.removeEventListener&&(Richfaces.browser.isFF3||Richfaces.browser.isSafari)){this.firstTrElement.removeEventListener("load",this.imagesOnLoad,true)
}},destroy:function(){this.shuttleTable.onselectstart=null;
var A=this.shuttleItems;
for(var B=0;
B<A.length;
B++){A[B].destroy()
}},setActiveItem:function(A){this.pseudoActiveItem=A;
this.activeItem=A
},retrieveShuttleItems:function(A,F){var D=this.shuttleTbody.rows;
this.shuttleItems=new Array();
var G;
for(var B=0;
B<D.length;
B++){var E=D[B];
G=E.id.split(A+":")[1];
var C=new F(null,(G||B),E);
if(C.isSelected()){this.selectedItems.push(E)
}if(C.isActive()){this.setActiveItem(E)
}this.shuttleItems[B]=C
}},getExtremeItem:function(A){var D=this.selectedItems[0];
var C;
for(var B=1;
B<this.selectedItems.length;
B++){C=this.selectedItems[B];
if(A=="first"){if(C.rowIndex<D.rowIndex){D=C
}}else{if(C.rowIndex>D.rowIndex){D=C
}}}return D
},getEventTargetRow:function(A){var B;
if(A.target){B=A.target
}else{B=A.srcElement
}if(B==null){return 
}if(B.tagName&&Richfaces.ListBase.CONTROL_SET.indexOf(B.tagName.toUpperCase())!=-1){return 
}while(B.tagName.toLowerCase()!="tr"){B=B.parentNode;
if(!B.tagName){return 
}}return B
},onfocusHandler:function(A){if(!this.activeItem&&this.shuttleItems.length!=0){this.setActiveItem(this.shuttleItems[0]._node)
}if(this.activeItem){this.activeItem.item.doActive(this.getExtRowClass(this.activeItem.rowIndex),this.columnsClasses)
}},onclickHandler:function(A){if(A.srcElement&&(A.srcElement.tagName.toLowerCase()=="tbody")){return 
}var B=this.getEventTargetRow(A);
if(B!=null){if(A.ctrlKey){this.addSelectedItem(B);
this.setActiveItem(B)
}else{if(A.shiftKey){if(!this.pseudoActiveItem){this.selectionItem(B);
this.setActiveItem(B)
}else{this.selectItemGroup(B);
this.activeItem=B
}}else{this.selectionItem(B);
this.setActiveItem(B)
}}this.setFocus()
}},onkeydownHandler:function(A){var B=null;
switch(A.keyCode){case 38:B="up";
this.moveActiveItem(B,A);
Event.stop(A);
break;
case 40:B="down";
this.moveActiveItem(B,A);
Event.stop(A);
break;
case 65:if(A.ctrlKey){this.selectAll()
}this.activeItem.item.doActive(this.getExtRowClass(this.activeItem.rowIndex),this.columnsClasses);
Event.stop(A);
break
}},moveActiveItem:function(D,B){var A=this.activeItem;
var C=this.shuttleTbody.rows;
if((D=="up")&&(A.rowIndex>0)){this.changeActiveItems(C[A.rowIndex-1],A)
}else{if((D=="down")&&(A.rowIndex<this.shuttleItems.length-1)){this.changeActiveItems(C[A.rowIndex+1],A)
}}this.autoScrolling(D,B)
},changeActiveItems:function(A,B){B.item.doNormal();
this.resetMarked();
A.item.doSelect(this.getExtRowClass(A.rowIndex),this.columnsClasses);
A.item.doActive(this.getExtRowClass(A.rowIndex),this.columnsClasses);
this.setActiveItem(A);
this.selectedItems.push(A)
},selectAll:function(){this.resetMarked();
var B=0;
var A=this.shuttleItems.length-1;
this.selectItemRange(B,A)
},selectionItem:function(B){var A=B;
this.resetMarked();
if(B.item.isSelected()){B.item.doNormal(this.getExtRowClass(B.rowIndex),this.columnsClasses)
}else{B.item.doSelect(this.getExtRowClass(B.rowIndex),this.columnsClasses);
this.selectedItems[0]=A
}},addSelectedItem:function(B){var A=B;
if(B.item.isSelected()){this.selectedItems.remove(A);
B.item.doNormal(this.getExtRowClass(B.rowIndex),this.columnsClasses)
}else{B.item.doSelect(this.getExtRowClass(B.rowIndex),this.columnsClasses);
this.selectedItems.push(A)
}if((this.activeItem!=null)&&(this.activeItem.rowIndex!=B.rowIndex)){if(this.activeItem.item.isSelected()){this.activeItem.item.doSelect(this.getExtRowClass(this.activeItem.rowIndex),this.columnsClasses)
}else{this.activeItem.item.doNormal(this.getExtRowClass(this.activeItem.rowIndex),this.columnsClasses)
}}},selectItemGroup:function(B){var A=this.pseudoActiveItem.rowIndex;
var D;
var C;
if(B.rowIndex>A){D=A;
C=B.rowIndex
}else{D=B.rowIndex;
C=A
}this.resetMarked();
this.selectItemRange(D,C)
},selectItemRange:function(D,C){var B=this.shuttleTbody.rows;
for(var A=D;
A<=C;
A++){B[A].item.doSelect(this.getExtRowClass(B[A].rowIndex),this.columnsClasses);
this.selectedItems.push(B[A])
}},resetMarked:function(){var C=this.selectedItems;
var B=C.length;
for(var A=0;
A<B;
A++){var D=C[A];
D.item.doNormal(this.getExtRowClass(D.rowIndex),this.columnsClasses)
}this.selectedItems.length=0
},getSelectItemByNode:function(C){for(var A=0;
A<this.shuttleItems.length;
A++){var B=this.shuttleItems[A];
if(C.rowIndex==B._node.rowIndex){return B
}}return null
},autoScrolling:function(G,F){this.selectedItems.sort(this.compareByRowIndex);
var A;
var H=this.shuttleTable.parentNode.scrollTop;
var B=LayoutManager.getElemXY(this.shuttleTable.parentNode).top;
if(G=="up"||G=="first"){var C=LayoutManager.getElemXY(this.selectedItems[0]).top;
A=(C-H)-B;
if(A<0){this.shuttleTable.parentNode.scrollTop+=A
}}else{if(G=="down"||G=="last"){var E=this.selectedItems[this.selectedItems.length-1];
var D=LayoutManager.getElemXY(this.selectedItems[this.selectedItems.length-1]).top+E.offsetHeight;
var A=(D-H)-(B+this.shuttleTable.parentNode.clientHeight);
if(A>0){this.shuttleTable.parentNode.scrollTop+=A
}}}if(F){Event.stop(F)
}},setFocus:function(){this.focusKeeper.focus();
this.focusKeeper.focused=true
},focusListener:function(A){A=A||window.event;
this.focusKeeper.focused=false;
if(this.activeItem){if(this.activeItem.item.isSelected()){this.activeItem.item.doSelect(this.getExtRowClass(this.activeItem.rowIndex),this.columnsClasses)
}else{this.activeItem.item.doNormal(this.getExtRowClass(this.activeItem.rowIndex),this.columnsClasses)
}}},compareByLabel:function(B,A){B=B._label;
A=A._label;
return Richfaces.ListBase.compare(B,A)
},compareByRowIndex:function(B,A){B=B.rowIndex;
A=A.rowIndex;
return Richfaces.ListBase.compare(B,A)
},isListActive:function(){if((this.activeItem!=null||this.selectedItems.length!=0)&&this.focusKeeper.focused){return true
}return false
},getExtRowClass:function(A){return Richfaces.getExternalClass(this.rowClasses,A)
},getSelection:function(){var A=[];
for(var B=0;
B<this.selectedItems.length;
B++){A[B]=this.selectedItems[B].item
}return A
},getItems:function(){return this.shuttleTbody.rows
}}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.OrderingListSelectItem=Class.create(Richfaces.SelectItem);
Richfaces.OrderingListSelectItem.prototype.CLASSES={ROW:{ACTIVE:"rich-ordering-list-row-active",SELECTED:"rich-ordering-list-row-selected",DISABLED:"rich-ordering-list-row-disabled",NORMAL:"rich-ordering-list-row"},CELL:{ACTIVE:"rich-ordering-list-cell-active",SELECTED:"rich-ordering-list-cell-selected",DISABLED:"rich-ordering-list-cell-disabled",NORMAL:"rich-ordering-list-cell",BEGIN:" rich-ordering-list-cell-first",END:" rich-ordering-list-cell-last"}},Richfaces.OrderingList=Class.create(Richfaces.ListBase,{initialize:function($super,F,I,D,H,A,E,J,K,B,C){$super(F,I,D,H,E,K,B,C);
this.container.component=this;
this.events=J;
this.controlList=new Array();
this.initControlList(F,A);
for(var G in this.events){if(G&&this.events[G]){this.container.observe("rich:"+G.toString(),this.events[G])
}}},destroy:function($super){$super();
this.container.component=null
},initControlList:function(A,D){for(var C=0;
C<D.length;
C++){var F=D[C];
var E=$(A+F[0]);
var B=$(A+F[1]);
if(E&&B){E.observe("click",Richfaces.OrderingList.HANDLERS[F[0]].bindAsEventListener(this));
this.controlList[C]=new Richfaces.Control(E,B,false,false,F[0])
}}},controlListManager:function(){this.selectedItems.sort(this.compareByRowIndex);
var A;
this.controlsProcessing(["first","last","down","up"],"enable");
if((this.shuttleItems.length==0)||(this.selectedItems.length==0)){this.controlsProcessing(["first","last","down","up"],"disable")
}else{if(this.selectedItems[0].rowIndex==0){this.controlsProcessing(["first","up"],"disable")
}if(this.selectedItems[this.selectedItems.length-1].rowIndex==(this.shuttleItems.length-1)){this.controlsProcessing(["down","last"],"disable")
}}},controlsProcessing:function(C,B){for(var A=0;
A<this.controlList.length;
A++){control=this.controlList[A];
if(control!=null){if(C!=null&&C.indexOf(control.action)!=-1){if(B=="disable"){control.doDisable()
}else{control.doEnable()
}}}}},onclickHandler:function($super,A){$super(A);
this.controlListManager()
},moveActiveItem:function($super,B,A){$super(B,A);
this.controlListManager()
},moveSelectedItems:function(F,D){if(this.selectedItems.length>0){if(Richfaces.invokeEvent(this.events.onorderchange,this.container,"rich:onorderchange",{items:this.shuttleItems})){D=window.event||D;
var E=this.shuttleTbody.rows;
var C;
this.selectedItems.sort(this.compareByRowIndex);
if((F=="up")&&this.getExtremeItem("first").previousSibling){for(var A=0;
A<this.selectedItems.length;
A++){C=this.selectedItems[A];
C.parentNode.insertBefore(C,C.previousSibling)
}}else{if((F=="down")&&this.getExtremeItem("last").nextSibling){for(var A=this.selectedItems.length-1;
A>-1;
A--){C=this.selectedItems[A];
C.parentNode.insertBefore(C.nextSibling,C)
}}else{if(F=="first"){var G=this.selectedItems[0].rowIndex;
for(var A=0;
A<this.selectedItems.length;
A++){C=this.selectedItems[A];
C.parentNode.insertBefore(C,E[C.rowIndex-G])
}}else{if(F=="last"){var B=this.shuttleItems.length;
var G=B-this.selectedItems[this.selectedItems.length-1].rowIndex;
for(var A=this.selectedItems.length-1;
A>-1;
A--){C=this.selectedItems[A];
if(C.rowIndex+G>B-1){C.parentNode.insertBefore(C,null)
}else{C.parentNode.insertBefore(C,E[C.rowIndex+G])
}}}}}}this.shuttleItems=new Array();
for(var A=0;
A<E.length;
A++){this.shuttleItems.push(E[A].item)
}if(F!=null){this.autoScrolling(F,D)
}this.container.fire("rich:onorderchanged",{items:this.shuttleItems});
this.controlListManager()
}}},onkeydownHandler:function(A){var B=null;
switch(A.keyCode){case 34:B="last";
this.moveSelectedItems(B,A);
Event.stop(A);
break;
case 33:B="first";
this.moveSelectedItems(B,A);
Event.stop(A);
break;
case 38:B="up";
if(A.ctrlKey){this.moveSelectedItems(B,A)
}else{this.moveActiveItem(B,A)
}Event.stop(A);
break;
case 40:B="down";
if(A.ctrlKey){this.moveSelectedItems(B,A)
}else{this.moveActiveItem(B,A)
}Event.stop(A);
break;
case 65:if(A.ctrlKey){this.selectAll()
}this.activeItem.item.doActive(this.getExtRowClass(this.activeItem.rowIndex),this.columnsClasses);
this.controlListManager();
Event.stop(A);
break
}},top:function(A){this.container.fire("rich:ontopclick",{items:this.shuttleItems,selection:this.getSelection()});
this.moveSelectedItems("first",A)
},bottom:function(A){this.container.fire("rich:onbottomclick",{items:this.shuttleItems,selection:this.getSelection()});
this.moveSelectedItems("last",A)
},up:function(A){this.container.fire("rich:onupclick",{items:this.shuttleItems,selection:this.getSelection()});
this.moveSelectedItems("up",A)
},down:function(A){this.container.fire("rich:ondownclick",{items:this.shuttleItems,selection:this.getSelection()});
this.moveSelectedItems("down",A)
}});
Richfaces.OrderingList.ACTIVITY_MARKER="a";
Richfaces.OrderingList.SELECTION_MARKER="s";
Richfaces.OrderingList.ITEM_SEPARATOR=",";
Richfaces.OrderingList.HANDLERS={first:function(A){this.top(A);
return false
},last:function(A){this.bottom(A);
return false
},up:function(A){this.up(A);
return false
},down:function(A){this.down(A);
return false
}}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.ListShuttle=Class.create();
Richfaces.ListShuttle.Source=Class.create(Richfaces.ListBase);
Richfaces.ListShuttle.Target=Class.create(Richfaces.OrderingList);
Richfaces.ListShuttle.Source.SelectItem=Class.create(Richfaces.SelectItem);
Richfaces.ListShuttle.Source.SelectItem.prototype.CLASSES={ROW:{ACTIVE:"rich-shuttle-source-row-active",SELECTED:"rich-shuttle-source-row-selected",DISABLED:"rich-shuttle-source-row-disabled",NORMAL:"rich-shuttle-source-row"},CELL:{ACTIVE:"rich-shuttle-source-cell-active",SELECTED:"rich-shuttle-source-cell-selected",DISABLED:"rich-shuttle-source-cell-disabled",NORMAL:"rich-shuttle-source-cell",BEGIN:" rich-shuttle-source-cell-first",END:" rich-shuttle-source-cell-last"}};
Richfaces.ListShuttle.Target.SelectItem=Class.create(Richfaces.SelectItem);
Richfaces.ListShuttle.Target.SelectItem.prototype.CLASSES={ROW:{ACTIVE:"rich-shuttle-target-row-active",SELECTED:"rich-shuttle-target-row-selected",DISABLED:"rich-shuttle-target-row-disabled",NORMAL:"rich-shuttle-target-row"},CELL:{ACTIVE:"rich-shuttle-target-cell-active",SELECTED:"rich-shuttle-target-cell-selected",DISABLED:"rich-shuttle-target-cell-disabled",NORMAL:"rich-shuttle-target-cell",BEGIN:" rich-shuttle-target-cell-first",END:" rich-shuttle-target-cell-last"}};
Richfaces.ListShuttle.prototype={initialize:function(H,E,A,D,G,B,C){this.containerId=A;
this["rich:destructor"]="destroy";
this.container=$(this.containerId);
this.container.component=this;
this.targetList=H;
this.sourceList=E;
this.events=C;
this.isFocused=false;
this.wasMouseDown=false;
this.skipBlurEvent=false;
this.targetLayoutManager=H.layoutManager;
this.sourceLayoutManager=E.layoutManager;
this.container.observe("focus",function(I){this.focusOrBlurHandlerLS(I)
}.bindAsEventListener(this));
this.container.observe("keypress",function(I){this.focusOrBlurHandlerLS(I)
}.bindAsEventListener(this));
this.container.observe("keydown",function(I){this.focusOrBlurHandlerLS(I)
}.bindAsEventListener(this));
this.container.observe("mousedown",function(I){this.focusOrBlurHandlerLS(I)
}.bindAsEventListener(this));
this.container.observe("click",function(I){this.focusOrBlurHandlerLS(I)
}.bindAsEventListener(this));
this.container.observe("blur",function(I){this.focusOrBlurHandlerLS(I)
}.bindAsEventListener(this));
if(G=="true"){this.targetList.shuttleTable.observe("click",function(I){this.moveItemByClick(window.event||I,this.targetList,this.sourceList)
}.bindAsEventListener(this));
this.sourceList.shuttleTable.observe("click",function(I){this.moveItemByClick(window.event||I,this.sourceList,this.targetList)
}.bindAsEventListener(this));
Event.stopObserving(this.sourceList.shuttleTable,"click",this.sourceList.clckHandler);
Event.stopObserving(this.targetList.shuttleTable,"click",this.targetList.clckHandler)
}else{if(B=="true"){this.targetList.shuttleTable.observe("dblclick",function(I){this.moveItemByClick(window.event||I,this.targetList,this.sourceList)
}.bindAsEventListener(this));
this.sourceList.shuttleTable.observe("dblclick",function(I){this.moveItemByClick(window.event||I,this.sourceList,this.targetList)
}.bindAsEventListener(this))
}E._onclickHandler=E.onclickHandler;
E.onclickHandler=function(I){this.onclickHandler(I,E)
}.bindAsEventListener(this);
H._onclickHandler=H.onclickHandler;
H.onclickHandler=function(I){this.onclickHandler(I,H)
}.bindAsEventListener(this)
}E._onkeydownHandler=E.onkeydownHandler;
E.onkeydownHandler=function(I){this.onkeydownHandler(I,E)
}.bindAsEventListener(this);
H._onkeydownHandler=H.onkeydownHandler;
H.onkeydownHandler=function(I){this.onkeydownHandler(I,H)
}.bindAsEventListener(this);
this.controlList=new Array();
this.initControlList(A,D);
for(var F in this.events){if(F&&this.events[F]){this.container.observe("rich:"+F.toString(),this.events[F])
}}},destroy:function(){this.container.component=null;
this.targetList.destroy();
this.sourceList.destroy()
},initControlList:function(A,D){for(var C=0;
C<D.length;
C++){var F=D[C];
var E=$(A+F[0]);
var B=$(A+F[1]);
if(E&&B){E.observe("click",Richfaces.ListShuttle.HANDLERS[F[0]].bindAsEventListener(this));
this.controlList[C]=new Richfaces.Control(E,B,false,false,F[0])
}}},controlListManager:function(){this.controlsProcessing(["copy","copyAll","removeAll","remove"],"enable");
if(this.sourceList.shuttleItems.length<1){this.controlsProcessing(["copy","copyAll"],"disable")
}if(this.sourceList.selectedItems.length<1){this.controlsProcessing(["copy"],"disable")
}if(this.targetList.shuttleItems.length<1){this.controlsProcessing(["removeAll","remove"],"disable")
}if(this.targetList.selectedItems.length<1){this.controlsProcessing(["remove"],"disable")
}},onclickHandler:function(B,A){A._onclickHandler(B);
this.controlListManager()
},onkeydownHandler:function(B,A){A._onkeydownHandler(B);
this.controlListManager()
},controlsProcessing:function(C,B){for(var A=0;
A<this.controlList.length;
A++){control=this.controlList[A];
if(control!=null){if(C!=null&&C.indexOf(control.action)!=-1){if(B=="disable"){control.doDisable()
}else{control.doEnable()
}}}}},moveItems:function(E,F,A){if(Richfaces.invokeEvent(this.events.onlistchange,this.container,"rich:onlistchange",{sourceItems:E.shuttleItems,targetItems:F.shuttleItems})){if(A.length>0){var D=A.length;
for(var B=0;
A.length>0;
){var C=A[B];
this.moveItem(E,F,C)
}this.controlListManager();
if(this.targetList.controlListManager){this.targetList.controlListManager()
}this.targetLayoutManager.widthSynchronization();
this.sourceLayoutManager.widthSynchronization();
this.container.fire("rich:onlistchanged",{sourceItems:E.shuttleItems,targetItems:F.shuttleItems})
}}},moveItem:function(B,C,A){if(!A){return 
}if(!(A instanceof Richfaces.SelectItem)){A=B.getSelectItemByNode(A)
}if(Richfaces.browser.isFF2&&(C.shuttleTbody.rows.length==0)){this.tableUpdate(C);
this.addItem(C,A);
this.removeItem(B,A);
B.shuttleTable.deleteRow(A._node.rowIndex)
}else{this.addItem(C,A);
this.removeItem(B,A)
}},removeItem:function(B,C){var A=B.shuttleItems;
B.selectedItems.remove(C._node);
A.remove(C);
if(C==B.activeItem){B.activeItem==null
}},addItem:function(A,B){B.doNormal(Richfaces.getExternalClass(B.rowIndex),A.columnsClasses);
A.shuttleTbody.insertBefore(B._node,null);
A.shuttleItems.push(B)
},tableUpdate:function(B){var D=B.shuttleTable;
var A=D.tBodies[0];
var C=A.cloneNode(false);
D.removeChild(A);
D.appendChild(C);
B.shuttleTbody=D.tBodies[0]
},moveItemByClick:function(D,C,E,A){if(Richfaces.invokeEvent(this.events.onlistchange,this.container,"rich:onlistchange",{sourceItems:C.shuttleItems,targetItems:E.shuttleItems})){var B=this.sourceList.getEventTargetRow(D);
this.moveItem(C,E,B);
this.controlListManager();
if(this.targetList.controlListManager){this.targetList.controlListManager()
}this.targetLayoutManager.widthSynchronization();
this.sourceLayoutManager.widthSynchronization();
this.container.fire("rich:onlistchanged",{sourceItems:C.shuttleItems,targetItems:E.shuttleItems})
}},copyAll:function(){this.container.fire("rich:oncopyallclick",{sourceItems:this.sourceList.shuttleItems,targetItems:this.targetList.shuttleItems,selection:this.sourceList.getSelection()});
this.moveItems(this.sourceList,this.targetList,this.sourceList.shuttleItems)
},copy:function(){this.container.fire("rich:oncopyclick",{sourceItems:this.sourceList.shuttleItems,targetItems:this.targetList.shuttleItems,selection:this.sourceList.getSelection()});
this.moveItems(this.sourceList,this.targetList,this.sourceList.selectedItems)
},removeAll:function(){this.container.fire("rich:onremoveallclick",{sourceItems:this.sourceList.shuttleItems,targetItems:this.targetList.shuttleItems,selection:this.targetList.getSelection()});
this.moveItems(this.targetList,this.sourceList,this.targetList.shuttleItems)
},remove:function(){this.container.fire("rich:onremoveclick",{sourceItems:this.sourceList.shuttleItems,targetItems:this.targetList.shuttleItems,selection:this.targetList.getSelection()});
this.moveItems(this.targetList,this.sourceList,this.targetList.selectedItems)
},up:function(){this.targetList.up()
},down:function(){this.targetList.down()
},top:function(){this.targetList.top()
},bottom:function(){this.targetList.bottom()
},focusOrBlurHandlerLS:function(C){var A=C.target.id;
if(C.type=="keydown"){var B=C.which;
this.skipBlurEvent=false;
this.wasKeyDown=true;
if(Event.KEY_TAB==B){if(C.shiftKey){if((A==this.sourceList.focusKeeper.id)&&this.isFocused){this.fireOnblurEvent()
}else{this.skipBlurEvent=true
}}else{if((A==this.targetList.focusKeeper.id)&&this.isFocused){this.fireOnblurEvent()
}else{this.skipBlurEvent=true
}}}}else{if(C.type=="mousedown"){this.skipBlurEvent=false;
this.wasMouseDown=true;
if(!this.isFocused){this.fireOnfocusEvent()
}}else{if(C.type=="click"){this.wasMouseDown=false
}else{if(C.type=="keypress"){this.wasKeyDown=false
}else{if(C.type=="focus"){if(A==this.sourceList.focusKeeper.id&&!this.wasMouseDown&&!this.isFocused){this.fireOnfocusEvent()
}else{if(A==this.targetList.focusKeeper.id&&!this.wasMouseDown&&!this.isFocused){this.fireOnfocusEvent()
}}}else{if(C.type=="blur"){if(!this.wasMouseDown&&!this.wasKeyDown&&this.isFocused&&!this.skipBlurEvent){this.fireOnblurEvent()
}}}}}}}},fireOnfocusEvent:function(){this.isFocused=true;
this.container.fire("rich:onfocus",{})
},fireOnblurEvent:function(){this.isFocused=false;
this.container.fire("rich:onblur",{})
}};
Richfaces.ListShuttle.HANDLERS={copy:function(A){this.copy();
return false
},copyAll:function(A){this.copyAll();
return false
},remove:function(A){this.remove();
return false
},removeAll:function(A){this.removeAll();
return false
}}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.PickListSI=Class.create(Richfaces.SelectItem,{initialize:function($super,A,C,B){$super(A,C,B);
this.selected=false;
this.active=false
},saveState:function(){}})
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.PickList=Class.create(Richfaces.ListShuttle,{initialize:function($super,G,E,B,D,C,A,H,F){$super(G,E,B,D,C,A,H);
this.valueKeeper=$(F)
},moveItems:function($super,B,C,A){this.saveState(A,this.isAdd(B));
$super(B,C,A)
},moveItemByClick:function($super,C,B,D,A){this.saveState([this.sourceList.getEventTargetRow(C)],this.isAdd(B));
$super(C,B,D,A)
},saveState:function(B,C){var B=this.getSIAsLabels(B);
if(C){var E=this.valueKeeper.value;
if(E.length!=0){E+=","
}this.valueKeeper.value=E+B.join(",")
}else{var A=this.valueKeeper.value.split(",");
for(var D=0;
D<B.length;
D++){A.remove(B[D])
}A.without(B);
this.valueKeeper.value=A.join(",")
}},isAdd:function(A){if(this.targetList.shuttleTable.id==A.shuttleTable.id){return false
}return true
},getSIAsLabels:function(B){if((B==null)||(B.length==0)){return 
}var A=new Array();
for(var C=0;
C<B.length;
C++){var D=B[C];
if(!D.input){D=D.item
}A[C]=D.input.value
}return A
}});
Richfaces.PickList.Source=Class.create(Richfaces.ListBase);
Richfaces.PickList.Target=Class.create(Richfaces.ListBase);
Richfaces.PickList.Source.SelectItem=Class.create(Richfaces.PickListSI);
Richfaces.PickList.Source.SelectItem.prototype.CLASSES={ROW:{ACTIVE:"rich-picklist-source-row-active",SELECTED:"rich-picklist-source-row-selected",DISABLED:"rich-picklist-source-row-disabled",NORMAL:"rich-picklist-source-row"},CELL:{ACTIVE:"rich-picklist-source-cell-active",SELECTED:"rich-picklist-source-cell-selected",DISABLED:"rich-picklist-source-cell-disabled",NORMAL:"rich-picklist-source-cell",BEGIN:" rich-picklist-source-cell-first",END:" rich-picklist-source-cell-last"}};
Richfaces.PickList.Target.SelectItem=Class.create(Richfaces.PickListSI);
Richfaces.PickList.Target.SelectItem.prototype.CLASSES={ROW:{ACTIVE:"rich-picklist-target-row-active",SELECTED:"rich-picklist-target-row-selected",DISABLED:"rich-picklist-target-row-disabled",NORMAL:"rich-picklist-target-row"},CELL:{ACTIVE:"rich-picklist-target-cell-active",SELECTED:"rich-picklist-target-cell-selected",DISABLED:"rich-picklist-target-cell-disabled",NORMAL:"rich-picklist-target-cell",BEGIN:" rich-picklist-target-cell-first",END:" rich-picklist-target-cell-last"}};
Richfaces.PickList.HANDLERS={copy:function(A){this.moveItems(this.sourceList,this.targetList,this.sourceList.selectedItems);
return false
},copyAll:function(A){this.moveItems(this.sourceList,this.targetList,this.sourceList.shuttleItems);
return false
},remove:function(A){this.moveItems(this.targetList,this.sourceList,this.targetList.selectedItems);
return false
},removeAll:function(A){this.moveItems(this.targetList,this.sourceList,this.targetList.shuttleItems);
return false
}}
;
if(!window.Richfaces){window.Richfaces={}
}if(!window.RichComboUtils){window.RichComboUtils={}
}Richfaces.defined=function(A){return(typeof (A)!="undefined")
};
RichComboUtils.execOnLoad=function(A,C,B){if(C()){A()
}else{window.setTimeout(function(){RichComboUtils.execOnLoad(A,C,B)
},B)
}};
RichComboUtils.Condition={ElementPresent:function(A){return function(){var B=document.getElementById(A);
return B&&B.offsetHeight>0
}
}};
Richfaces.getBody=function(){if(document.body){return document.body
}if(document.getElementsByTagName){var A=document.getElementsByTagName("BODY");
if(A!=null&&A.length>0){return A[0]
}}return null
};
Richfaces.zero=function(A){return(!Richfaces.defined(A)||isNaN(A))?0:A
};
Richfaces.getDocumentHeight=function(){var B=0;
var A=jQuery(window);
B=A.height()+A.scrollTop();
return B
};
Richfaces.getScrollWidth=function(A){if(A.clientWidth!=0){return A.offsetWidth-A.clientWidth
}return 0
};
Richfaces.getBorderWidth=function(B,A){return Richfaces.getStyles(B,A,Richfaces.borders)
};
Richfaces.getPaddingWidth=function(B,A){return Richfaces.getStyles(B,A,Richfaces.paddings)
};
Richfaces.getMarginWidth=function(B,A){return Richfaces.getStyles(B,A,Richfaces.margins)
};
Richfaces.getStyles=function(D,F,E){var G=0;
for(var C=0,A=F.length;
C<A;
C++){var B=parseInt(Element.getStyle(D,E[F.charAt(C)]),10);
if(!isNaN(B)){G+=B
}}return G
};
Richfaces.borders={l:"border-left-width",r:"border-right-width",t:"border-top-width",b:"border-bottom-width"},Richfaces.paddings={l:"padding-left",r:"padding-right",t:"padding-top",b:"padding-bottom"},Richfaces.margins={l:"margin-left",r:"margin-right",t:"margin-top",b:"margin-bottom"}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.ComboBoxList=Class.create();
Richfaces.ComboBoxList.prototype={initialize:function(H,B,G,D,F,C,M,E,L,O,I,N,K,A,J){this.list=document.getElementById(H);
this.listParent=$(B);
this.listParentContainer=this.listParent.parentNode;
this.iframe=null;
this.fieldElem=document.getElementById(I);
this.itemsText=E;
this.shadowElem=document.getElementById(N);
this.onlistcall=L;
this.onlistclose=O;
if(this.onlistcall){this.listParent.observe("rich:onlistcall",this.onlistcall)
}if(this.onlistclose){this.listParent.observe("rich:onlistclose",this.onlistclose)
}this.selectFirstOnUpdate=G;
this.filterNewValues=D;
this.isList=false;
this.defaultRowsAmount=15;
this.selectedItem=null;
this.activeItem=null;
this.showDelay=A;
this.hideDelay=J;
this.classes=F;
this.width=C;
this.height=M;
this.initDimensions();
this.scrollElements=null;
this.eventOnScroll=this.eventOnScroll.bindAsEventListener(this)
},initDimensions:function(){this.listParent.style.visibility="hidden";
this.listParent.style.display="";
var A=this.listParent.childNodes[1].firstChild;
this.LAYOUT_BORDER_V=Richfaces.getBorderWidth(A,"tb");
this.LAYOUT_BORDER_H=Richfaces.getBorderWidth(A,"lr");
this.LAYOUT_PADDING_V=Richfaces.getPaddingWidth(A,"tb");
this.LAYOUT_PADDING_H=Richfaces.getPaddingWidth(A,"lr");
this.listParent.style.display="none";
this.listParent.style.visibility="visible"
},createDefaultList:function(){var A=new Array();
for(var B=0;
B<this.itemsText.length;
B++){A.push(this.createItem(this.itemsText[B],this.classes.item.normal))
}this.createNewList(A)
},getItems:function(){return this.list.childNodes
},showWithDelay:function(){this.show()
},show:function(){var B=Position.cumulativeOffset(this.fieldElem);
this.fieldDimensions={};
this.fieldDimensions.left=B[0];
this.fieldDimensions.top=B[1];
this.fieldDimensions.height=this.fieldElem.parentNode.offsetHeight;
this.listParent.style.visibility="hidden";
this.listParent.style.display="";
this.setSize();
this.listParent.style.display="none";
this.listParent.style.visibility="visible";
this.injectListToBody(this.listParent);
this.setPosition(this.fieldDimensions.top,this.fieldDimensions.left,this.fieldDimensions.height);
if(this.selectedItem){this.doSelectItem(this.findItemByDOMNode(this.selectedItem))
}var A=this.getItems();
if(A.length!=0){if(this.iframe){Element.show(this.iframe)
}this.listParent.style.display="";
if(this.selectFirstOnUpdate){if(this.selectedItem){this.doActiveItem(this.selectedItem)
}else{this.doActiveItem(A[0])
}}}this.listParent.fire("rich:onlistcall",{});
Richfaces.removeScrollEventHandlers(this.scrollElements,this.eventOnScroll);
this.scrollElements=Richfaces.setupScrollEventHandlers(this.listParentContainer.parentNode,this.eventOnScroll)
},injectListToBody:function(B){if(!this.listInjected){var A=B.parentNode;
var C=document.body.insertBefore(A.removeChild(B),null);
if(Richfaces.browser.isIE6&&this.iframe){document.body.insertBefore(A.removeChild(this.iframe),C)
}this.listInjected=true
}},outjectListFromBody:function(A,B){if(this.listInjected){var C=A.appendChild(document.body.removeChild(B));
if(Richfaces.browser.isIE6&&this.iframe){A.insertBefore(document.body.removeChild(this.iframe),C)
}this.listInjected=false
}},hideWithDelay:function(){this.hide();
this.listParent.fire("rich:onlistclose",{})
},hide:function(){Richfaces.removeScrollEventHandlers(this.scrollElements,this.eventOnScroll);
this.outjectListFromBody(this.listParentContainer,this.listParent);
this.resetState();
if(this.iframe){Element.hide(this.iframe)
}var A=this.listParent.parentNode;
A.style.position="static";
A.style.zIndex=0;
Element.hide(this.listParent)
},eventOnScroll:function(A){this.hideWithDelay()
},visible:function(){return this.listParent.visible()
},setSize:function(){var A=this.height;
var B;
var D;
var E=this.getItems()[0];
var C=0;
if(E){var F=E.offsetHeight;
D=this.getItems().length;
B=F*D;
if(this.height){if(parseInt(this.height)>B){A=B
}}else{if(D<this.defaultRowsAmount){A=B
}else{A=F*this.defaultRowsAmount
}}if(Prototype.Browser.IE){A=parseInt(A)+this.LAYOUT_BORDER_V+this.LAYOUT_PADDING_V
}A=parseInt(A)+"px";
this.list.style.height=A;
if(this.shadowElem){if(!Richfaces.browser.isIE6){this.shadowElem.style.width=(parseInt(this.width)+7)+"px";
this.shadowElem.style.height=(parseInt(A)+9)+"px"
}else{this.shadowElem.style.visibility="hidden"
}}if(this.iframe){this.iframe.style.height=A
}this.setWidth(this.width)
}},setWidth:function(D){var A=this.listParent.childNodes[1];
var C=this.listParent.parentNode;
var B=parseInt(D)-Richfaces.getBorderWidth(A.firstChild,"lr")-Richfaces.getPaddingWidth(A.firstChild,"lr")+"px";
this.list.style.width=B;
if(this.iframe){this.iframe.style.width=B
}},setPosition:function(H,A,C){var F=this.listParent.parentNode;
F.style.zIndex=2;
var I=Richfaces.getDocumentHeight();
var B=H+C;
var D=parseInt(this.list.style.height);
if(this.list.parentNode){D+=Richfaces.getBorderWidth(this.list.parentNode,"tb")
}var G=B;
var E=C;
if(parseInt(D)>(I-B)){if(G>(I-B)){E=-parseInt(D)
}}this.clonePosition(this.listParent,this.fieldElem,E);
if(this.iframe){this.clonePosition(this.iframe,this.fieldElem,E)
}},scrolling:function(D){var A;
var E=this.list;
var G=Richfaces.ComboBoxList.getElemXY(E).top;
var F=E.scrollTop;
var C=Richfaces.ComboBoxList.getElemXY(this.activeItem).top;
if((D.keyCode==Event.KEY_UP)||(D.keyCode==33)){A=(C-F)-G;
if(A<0){E.scrollTop+=A
}}else{if((D.keyCode==Event.KEY_DOWN)||(D.keyCode==34)){var B=C+this.activeItem.offsetHeight;
var A=(B-F)-(G+E.clientHeight);
if(A>0){E.scrollTop+=A
}}}Event.stop(D)
},scrollingUpToItem:function(B){var C=this.list;
var A=(Richfaces.ComboBoxList.getElemXY(B).top-C.scrollTop)-Richfaces.ComboBoxList.getElemXY(C).top;
C.scrollTop+=A
},doActiveItem:function(A){if(this.activeItem){this.doNormalItem(this.activeItem)
}this.activeItem=A;
this.changeItem(A,this.classes.item.selected)
},doNormalItem:function(A){this.activeItem=null;
this.changeItem(A,this.classes.item.normal)
},doSelectItem:function(A){this.selectedItem=A
},changeItem:function(B,A){B.className=A
},moveActiveItem:function(E){var D=this.activeItem;
if(E.keyCode==Event.KEY_UP){if(!this.activeItem){if(!this.selectFirstOnUpdate){var C=this.getItems();
if(C!=null&&C.length!=0){this.doActiveItem(C[C.length-1]);
this.scrollingUpToItem(C[C.length-1])
}}return 
}var B=D.previousSibling;
if(B){this.itemsRearrangement(D,B)
}}else{if(E.keyCode==Event.KEY_DOWN){if(!this.activeItem){if(!this.selectFirstOnUpdate){var C=this.getItems();
if(C!=null&&C.length!=0){this.doActiveItem(C[0]);
this.scrollingUpToItem(C[0])
}}return 
}var A=D.nextSibling;
if(A){this.itemsRearrangement(D,A)
}}}this.scrolling(E)
},itemsRearrangement:function(B,A){this.doActiveItem(A)
},resetState:function(){if(this.filterNewValues){var A=this.list.cloneNode(false);
this.listParent.childNodes[1].firstChild.replaceChild(A,this.list);
this.list=$(A.id)
}else{if(this.activeItem){this.doNormalItem(this.activeItem)
}}this.activeItem=null;
this.isList=false
},dataFilter:function(A){this.createNewList(this.getFilteredItems(A))
},getFilteredItems:function(D){var A=new Array();
for(var B=0;
B<this.itemsText.length;
B++){var C=this.itemsText[B];
if(C.substr(0,D.length).toLowerCase()==D.toLowerCase()){A.push(this.createItem(C,this.classes.item.normal))
}}return A
},findItemByDOMNode:function(A){var B=A.innerHTML.unescapeHTML();
return this.findItemBySubstr(B)
},findItemBySubstr:function(E){var A=this.getItems();
for(var B=0;
B<A.length;
B++){var D=A[B];
var C=D.innerHTML.unescapeHTML();
if(C.substr(0,E.length).toLowerCase()==E.toLowerCase()){return D
}}},createNewList:function(A){if(this.selectedItem){var C=this.selectedItem
}this.list.innerHTML=A.join("");
if(this.selectedItem){var B=this.findItemByDOMNode(C);
if(B){this.doSelectItem(B)
}}},createItem:function(C,A){var B=C.escapeHTML();
return'<span class="'+A+'">'+B+"</span>"
},createIframe:function(A,D,E,B){var C=document.createElement("iframe");
C.id="iframe"+E;
C.style.display="none";
C.style.position="absolute";
C.frameBorder="0";
C.scrolling="no";
C.src="javascript:''";
C.style.width=D;
C.className=B;
A.insertBefore(C,A.firstChild);
this.iframe=document.getElementById(C.id)
},PX_REGEX:/px$/,parseToPx:function(B){var A=B.strip();
if(this.PX_REGEX.test(A)){try{return parseFloat(A.replace(this.PX_REGEX,""))
}catch(C){}}return NaN
},clonePosition:function(F,A,D){var H=jQuery(F);
var J=jQuery(A);
var B=J.offset();
var E=(H.css("display")=="none");
var G;
if(E){G=H.css("visibility");
H.css("visibility","hidden").css("display","")
}var C=this.parseToPx(H.css("left"));
if(isNaN(C)){C=0;
H.css("left","0px")
}var I=this.parseToPx(H.css("top"));
if(isNaN(I)){I=0;
H.css("top","0px")
}var K=H.offset();
if(E){H.css("display","none").css("visibility",G)
}H.css({left:(B.left-K.left+C)+"px",top:(B.top-K.top+I+D)+"px"})
}};
Richfaces.ComboBoxList.getElemXY=function(C){var A=C.offsetLeft;
var D=C.offsetTop;
for(var B=C.offsetParent;
B;
B=B.offsetParent){A+=B.offsetLeft;
D+=B.offsetTop
}return{left:A,top:D}
}
;
if(!window.LOG){window.LOG={warn:function(){}}
}if(!window.Richfaces){window.Richfaces={}
}Richfaces.InplaceInput=Class.create();
Richfaces.InplaceInput.prototype={initialize:function(A,B,I,H,D,G,F,E,C){this.inplaceInput=$(A);
this.inplaceInput.component=this;
this.tempValueKeeper=$(B);
this.valueKeeper=$(I);
this.attributes=D;
this.events=G;
this.currentText=this.getCurrentText();
this.value=this.valueKeeper.value;
this.currentState=Richfaces.InplaceInput.STATES[0];
this.prevState=Richfaces.InplaceInput.STATES[0];
if(this.attributes.showControls){this.bar=new Richfaces.InplaceInputBar(C[0],C[1],C[2],C[3],C[4],this.attributes.verticalPosition,this.attributes.horizontalPosition)
}this.editEvent=this.attributes.editEvent.substring(2,this.attributes.editEvent.length);
this.tempValueKeeper.style.top=Richfaces.getBorderWidth(this.tempValueKeeper,"t")+"px";
this.initHandlers();
this.initEvents();
this.classes=Richfaces.mergeStyles(F,E.getCommonStyles());
this["rich:destructor"]="destroy";
this.skipSwitching=false
},destroy:function(){this.inplaceInput.component=null
},initHandlers:function(){this.inplaceInput.observe(this.editEvent,this.switchingStatesHandler.bindAsEventListener(this));
this.inplaceInput.observe("mouseout",this.inplaceMouseOutHandler.bindAsEventListener(this));
this.inplaceInput.observe("mouseover",this.inplaceMouseOverHandler.bindAsEventListener(this));
this.tempValueKeeper.observe("focus",function(A){this.switchingStatesHandler(A)
}.bindAsEventListener(this));
this.tempValueKeeper.observe("blur",function(A){this.tmpValueBlurHandler(A)
}.bindAsEventListener(this));
this.tempValueKeeper.observe("keydown",function(A){this.tmpValueKeyDownHandler(A)
}.bindAsEventListener(this));
if(this.bar){if(this.bar.ok){this.bar.ok.observe("mousedown",function(A){this.okHandler(A)
}.bindAsEventListener(this));
if(Richfaces.browser.isOpera){this.bar.ok.observe("click",Event.stop)
}}if(this.bar.cancel){this.bar.cancel.observe("mousedown",function(A){this.cancelHandler(A)
}.bindAsEventListener(this));
if(Richfaces.browser.isOpera){this.bar.cancel.observe("click",Event.stop)
}}}},initEvents:function(){for(var A in this.events){if(A){this.inplaceInput.observe("rich:"+A,this.events[A])
}}},inplaceMouseOverHandler:function(B){var A=this.inplaceInput.className;
if(this.currentState==Richfaces.InplaceInput.STATES[0]){if(A.indexOf(this.classes.component.view.hovered)==-1){A+=" "+this.classes.component.view.hovered
}}else{if(this.currentState==Richfaces.InplaceInput.STATES[2]){if(A.indexOf(this.classes.component.changed.hovered)==-1){A+=" "+this.classes.component.changed.hovered
}}}this.inplaceInput.className=A
},inplaceMouseOutHandler:function(A){if(this.currentState==Richfaces.InplaceInput.STATES[0]){this.inplaceInput.className=this.classes.component.view.normal
}else{if(this.currentState==Richfaces.InplaceInput.STATES[2]){this.inplaceInput.className=this.classes.component.changed.normal
}}},switchingStatesHandler:function(B){if(this.skipSwitching){this.skipSwitching=false;
return 
}var A=(B.srcElement)?B.srcElement:B.target;
if(this.currentState!=Richfaces.InplaceInput.STATES[1]){this.edit()
}if(A.id==this.inplaceInput.id){this.skipSwitching=true;
this.tempValueKeeper.focus()
}},edit:function(){if(Richfaces.invokeEvent(this.events.oneditactivation,this.inplaceInput,"rich:oneditactivation",{oldValue:this.valueKeeper.value,value:this.tempValueKeeper.value})){this.startEditableState();
if(this.events.oneditactivated){this.inplaceInput.fire("rich:oneditactivated",{oldValue:this.valueKeeper.value,value:this.tempValueKeeper.value})
}}},tmpValueBlurHandler:function(A){if(this.skipBlur){this.skipBlur=false;
return 
}if(this.clickOnBar){this.clickOnBar=false;
return 
}if(!this.attributes.showControls){this.save(A)
}},tmpValueKeyDownHandler:function(A){switch(A.keyCode){case Event.KEY_ESC:this.cancel(A);
if(!this.attributes.showControls){this.skipBlur=true;
this.tempValueKeeper.blur()
}Event.stop(A);
break;
case Event.KEY_RETURN:if(this.attributes.showControls){this.okHandler(A)
}else{Event.stop(A);
this.tempValueKeeper.blur()
}break;
case Event.KEY_TAB:if(this.attributes.showControls){this.save(A)
}break
}},okHandler:function(A){this.save(A);
Event.stop(A)
},cancelHandler:function(A){this.cancel(A);
Event.stop(A)
},endEditableState:function(){if(this.bar){this.bar.hide()
}this.tempValueKeeper.style.clip="rect(0px 0px 0px 0px)";
this.tempValueKeeper.blur()
},startEditableState:function(){if(this.currentState==Richfaces.InplaceInput.STATES[1]){return 
}this.changeState(Richfaces.InplaceInput.STATES[1]);
var B=this.inplaceInput.offsetWidth;
var A=this.setInputWidth(B);
this.tempValueKeeper.style.clip="rect(auto auto auto auto)";
this.inplaceInput.className=this.classes.component.editable;
if(this.bar){this.bar.show(A,this.tempValueKeeper.offsetHeight)
}if(this.attributes.selectOnEdit){Richfaces.InplaceInput.textboxSelect(this.tempValueKeeper,0,this.tempValueKeeper.value.length)
}},startViewState:function(){this.deleteViewArtifacts();
this.changeState(Richfaces.InplaceInput.STATES[0]);
this.createNewText(this.currentText);
this.inplaceInput.className=this.classes.component.view.normal;
this.inplaceInput.observe("mouseover",function(A){this.inplaceMouseOverHandler(A)
}.bindAsEventListener(this))
},startChangedState:function(){this.deleteViewArtifacts();
this.changeState(Richfaces.InplaceInput.STATES[2]);
this.createNewText(this.currentText);
this.inplaceInput.className=this.classes.component.changed.normal
},setInputWidth:function(D){if(this.currentState!=1){return 
}var C=parseInt(this.attributes.inputWidth);
if(!C){var A=parseInt(this.attributes.maxInputWidth);
var B=parseInt(this.attributes.minInputWidth);
if(D>A){C=A
}else{if(D<B){C=B
}else{C=D
}}}this.tempValueKeeper.style.width=C+"px";
return C
},changeState:function(A){this.prevState=this.currentState;
this.currentState=A
},cancel:function(B,A){if(Richfaces.invokeEvent(this.events.onviewactivation,this.inplaceInput,"rich:onviewactivation",{oldValue:this.valueKeeper.value,value:this.tempValueKeeper.value})){this.endEditableState();
if(!A){A=this.valueKeeper.value
}this.tempValueKeeper.value=A;
this.currentText=A;
if(this.tempValueKeeper.value==""){this.setDefaultText()
}switch(this.prevState){case Richfaces.InplaceInput.STATES[0]:this.startViewState();
break;
case Richfaces.InplaceInput.STATES[2]:this.startChangedState();
break
}if(this.events.onviewactivated){this.inplaceInput.fire("rich:onviewactivated",{oldValue:this.valueKeeper.value,value:this.tempValueKeeper.value})
}}},save:function(A){if(Richfaces.invokeEvent(this.events.onviewactivation,this.inplaceInput,"rich:onviewactivation",{oldValue:this.valueKeeper.value,value:this.tempValueKeeper.value})){var B=this.tempValueKeeper.value;
this.setValue(B);
if(this.events.onviewactivated){this.inplaceInput.fire("rich:onviewactivated",{oldValue:this.valueKeeper.value,value:this.tempValueKeeper.value})
}}},getParameters:function(A,C,B){if(!C){C=A
}if(C&&C[B]){return C[B]
}return C
},setValue:function(C,E){var B=this.valueKeeper.value;
var D=this.getParameters(C,E,"value");
var A=true;
if(B!=D){A=Richfaces.invokeEvent(this.events.onchange,this.inplaceInput,"onchange",D)
}if(A){this.tempValueKeeper.value=D;
this.endEditableState();
if(D.blank()){this.setDefaultText();
this.valueKeeper.value=""
}else{this.currentText=D;
this.valueKeeper.value=D
}if(D!=this.value){this.startChangedState()
}else{this.startViewState()
}}else{this.cancel()
}},getValue:function(){return this.valueKeeper.value
},setDefaultText:function(){this.currentText=this.attributes.defaultLabel
},deleteViewArtifacts:function(){var A=this.inplaceInput.childNodes[3];
if(A){this.inplaceInput.removeChild(A)
}},getCurrentText:function(){return this.inplaceInput.childNodes[3]
},createNewText:function(A){if(!this.getCurrentText()){this.inplaceInput.appendChild(document.createTextNode(A.nodeValue||A))
}}};
Richfaces.InplaceInputBar=Class.create();
Richfaces.InplaceInputBar.prototype={initialize:function(E,G,F,D,B,A,C){this.bar=$(E);
this.ok=$(G);
this.cancel=$(F);
this.bsPanel=$(D);
this.buttonsShadow=$(B);
this.verticalPosition=A;
this.horizontalPosition=C;
this.initDimensions()
},initDimensions:function(){this.BAR_WIDTH=26;
this.BAR_HEIGHT=12
},show:function(B,A){this.positioning(B,A);
if(Richfaces.browser.isIE6&&this.buttonsShadow){this.buttonsShadow.style.visibility="hidden"
}this.bar.show()
},hide:function(){this.bar.hide()
},positioning:function(C,B){if(this.bsPanel){this.bsPanel.style.height=B+"px"
}this.bar.style.position="absolute";
var A=this.bar.style;
if(this.verticalPosition=="top"||this.verticalPosition=="bottom"){switch(this.horizontalPosition){case"left":A.left="0px";
break;
case"right":A.left=C+"px";
break;
case"center":A.left=parseInt(C/2-this.BAR_WIDTH/2)+"px";
break
}if(this.verticalPosition=="top"){A.top=-this.BAR_HEIGHT+"px"
}else{A.top=B+"px"
}}else{if(this.verticalPosition=="center"){A.top="0px";
switch(this.horizontalPosition){case"left":A.left=-this.BAR_WIDTH+"px";
break;
case"right":A.left=C+"px";
break;
case"center":A.left=C+"px";
break
}}}}};
Richfaces.InplaceInput.STATES=[0,1,2];
Richfaces.InplaceInput.textboxSelect=function(C,B,A){if(Prototype.Browser.IE){var D=C.createTextRange();
D.moveStart("character",B);
D.moveEnd("character",-C.value.length+A);
D.select()
}else{if(Prototype.Browser.Gecko){C.setSelectionRange(B,A)
}else{C.setSelectionRange(B,A)
}}}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.InplaceSelectList=Class.create(Richfaces.ComboBoxList,{initialize:function($super,F,B,E,J,G,C,M,D,L,H,N,A,I,K){this.classes=Richfaces.mergeStyles(J,G);
$super(F,B,E,null,this.classes,C,M,D,L,null,H,N,A,I);
this.wrappingItems(K);
this.isListOpened=false
},setPosition:function($super,C,B,A){var D=this.fieldElem;
D.show();
if(Richfaces.browser.isIE6&&!this.iframe){this.createIframe(this.listParent.parentNode,this.width,this.list.id,"")
}$super(C,B,D.offsetHeight)
},show:function($super){if(!this.listInjected){this.isListOpened=true;
$super()
}},resetState:function(){this.activeItem=null
},getEventItem:function(A){return Event.findElement(A,"span")
},setWidth:function(C){var A=this.listParent.childNodes[1];
var B=parseInt(C)-Richfaces.getBorderWidth(A.firstChild,"lr")-Richfaces.getPaddingWidth(A.firstChild,"lr")+"px";
this.list.style.width=B;
if(this.iframe){this.iframe.style.width=B
}},hide:function(){if(this.isListOpened){this.isListOpened=false;
this.listParent.hide();
this.outjectListFromBody(this.listParentContainer,this.listParent);
this.resetState();
if(this.iframe){Element.hide(this.iframe)
}var A=this.listParent.parentNode;
A.style.zIndex=0
}},outjectListFromBody:function(A,B){if(this.listInjected){var C=A.insertBefore(document.body.removeChild(B),A.childNodes[3]);
if(Richfaces.browser.isIE6&&this.iframe){A.insertBefore(document.body.removeChild(this.iframe),C)
}this.listInjected=false
}},wrappingItems:function(D){var A=this.getItems().length;
for(var B=0;
B<A;
B++){var C=this.getItems()[B];
C.value=this.itemsText[B][1];
if(C.value==D){this.doSelectItem(C)
}}},resetSelection:function(){if(this.activeItem){this.doNormalItem(this.activeItem)
}if(this.selectedItem){this.doNormalItem(this.selectedItem)
}},doActiveItem:function($super,A){this.listParent.show();
$super(A);
var B=this.list.scrollWidth;
if(B==this.list.offsetWidth){B=B-Richfaces.getScrollWidth(this.list)
}B=B-(Richfaces.getBorderWidth(A,"lr")+Richfaces.getPaddingWidth(A,"lr")+Richfaces.getMarginWidth(A,"lr"));
A.style.width=B+"px"
},doNormalItem:function($super,A){$super(A);
A.style.width=""
},findItemByDOMNode:function($super,D){var E=D.value;
var A=this.getItems();
for(var B=0;
B<A.length;
B++){var C=A[B];
var F=C.value;
if(E==F){return C
}}}})
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.InplaceSelect=Class.create(Richfaces.InplaceInput,{initialize:function($super,B,A,C,K,J,E,I,H,F,D,G){this.button=$(G);
this.comboList=B;
this.showValueInView=E.showValueInView;
$super(A,C,K,J,E,I,H,F,D);
this.clickOnBar=false;
this.inplaceSelect=$(A);
this.inplaceSelect.component=this;
this.currentItemValue=this.value;
this.button.style.top=Richfaces.getBorderWidth(this.tempValueKeeper,"tb")+"px";
this["rich:destructor"]="destroy"
},destroy:function(){this.inplaceSelect.component=null
},initHandlers:function($super){$super();
this.tempValueKeeper.observe("click",function(A){this.tempKeeperClickHandler(A)
}.bindAsEventListener(this));
this.button.observe("click",function(A){this.tempKeeperClickHandler(A)
}.bindAsEventListener(this));
this.button.observe("blur",function(A){this.tmpValueBlurHandler(A)
}.bindAsEventListener(this));
this.comboList.listParent.observe("mousedown",function(A){this.listMousedownHandler(A)
}.bindAsEventListener(this));
this.comboList.listParent.observe("mousemove",function(A){this.listMouseMoveHandler(A)
}.bindAsEventListener(this));
this.comboList.listParent.observe("click",function(A){this.listClickHandler(A)
}.bindAsEventListener(this));
this.comboList.listParent.observe("mouseup",function(A){this.listMouseUpHandler(A)
}.bindAsEventListener(this))
},setInputWidth:function($super,B){$super(B);
this.button.show();
var A=parseInt(this.tempValueKeeper.style.width);
this.button.style.left=(A-this.button.offsetWidth)+"px";
return A
},startEditableState:function($super){$super();
this.button.show();
if(this.attributes.openOnEdit){this.comboList.showWithDelay()
}},endEditableState:function($super){$super();
this.button.hide()
},tempKeeperClickHandler:function(){this.comboList.isList=false;
this.comboList.showWithDelay()
},buttonClickHandler:function(A){this.button.isClicked=true;
this.tempKeeperClickHandler();
Event.stop(A)
},tmpValueBlurHandler:function($super,A){if(this.clickOnBar||(Richfaces.browser.isIE&&this.button.isClicked)){this.clickOnBar=false;
this.button.isClicked=false;
return 
}if(!this.comboList.isList){if(this.comboList.activeItem){this.comboList.doNormalItem(this.comboList.activeItem)
}this.comboList.hideWithDelay()
}if(this.clickOnScroll){this.clickOnScroll=false;
this.tempValueKeeper.focus();
this.comboList.isList=false;
return 
}if(!this.attributes.showControls){this.save(A)
}else{this.applyTmpValue()
}this.comboList.isList=false
},listClickHandler:function(A){this.comboList.hideWithDelay()
},listMouseMoveHandler:function(B){var A=this.comboList.getEventItem(B);
if(A){this.comboList.doActiveItem(this.comboList.getEventItem(B))
}},listMousedownHandler:function(A){if(Prototype.Browser.Gecko){if(this.comboList.getEventItem(A)){this.comboList.isList=true
}}else{if(!this.comboList.getEventItem(A)){this.clickOnScroll=true
}this.comboList.isList=true
}},listMouseUpHandler:function(A){if(window.getSelection){if(window.getSelection().getRangeAt(0).toString()!=""){this.tempValueKeeper.focus();
this.comboList.isList=false
}}},tmpValueKeyDownHandler:function(A){switch(A.keyCode){case Event.KEY_RETURN:this.comboList.isList=false;
this.save(A);
if(!this.attributes.showControls){this.tempValueKeeper.blur()
}Event.stop(A);
break;
case Event.KEY_DOWN:this.comboList.moveActiveItem(A);
Event.stop(A);
break;
case Event.KEY_UP:this.comboList.moveActiveItem(A);
Event.stop(A);
break;
case Event.KEY_ESC:this.comboList.resetSelection();
this.comboList.hideWithDelay();
this.cancel(A);
if(!this.attributes.showControls){this.tempValueKeeper.blur()
}break;
case Event.KEY_TAB:break
}},save:function($super,B){this.applyTmpValue();
this.comboList.hide();
if(((this.attributes.closeOnSelect&&!this.attributes.showControls)&&this.comboList.isList)||(this.clickOnBar||!this.comboList.isList)){var A=this.currentItemValue;
this.setValue(A)
}},findLabel:function(A,D){var B=A;
for(var C=0;
C<B.length;
C++){if(B[C][1]==D){return B[C][0]
}}},setValue:function(D,E){var B={};
B.itemValue=this.getParameters(D,E,"value");
if(this.showValueInView){B.itemLabel=B.itemValue
}else{B.itemLabel=this.findLabel(this.comboList.itemsText,B.itemValue)
}if(!B.itemLabel){B.itemValue=this.currentItemValue;
B.itemLabel=this.tempValueKeeper.value
}var C=this.valueKeeper.value;
if(Richfaces.invokeEvent(this.events.onviewactivation,this.inplaceInput,"rich:onviewactivation",{oldValue:this.valueKeeper.value,value:B.itemValue})){var A=true;
if(B.itemLabel&&C!=B.itemValue){A=Richfaces.invokeEvent(this.events.onchange,this.inplaceSelect,"onchange",B.itemValue)
}if(A){this.endEditableState();
if(!B.itemValue||B.itemValue.blank()){B.itemValue=""
}if(!B.itemLabel||B.itemLabel.blank()){B.itemLabel=this.attributes.defaultLabel
}this.valueKeeper.value=B.itemValue;
this.currentText=B.itemLabel;
this.tempValueKeeper.value=B.itemLabel;
if(B.itemValue!=this.value){this.startChangedState()
}else{this.startViewState()
}if(this.events.onviewactivated){this.inplaceInput.fire("rich:onviewactivated",{oldValue:C,value:this.valueKeeper.value})
}}else{this.cancel()
}}},applyTmpValue:function(){if(this.comboList.activeItem){var A=this.comboList.activeItem.innerHTML.unescapeHTML();
this.currentItemValue=this.comboList.activeItem.value;
if(this.showValueInView){A=this.currentItemValue
}this.tempValueKeeper.value=A;
this.comboList.selectedItem=this.comboList.activeItem
}},deleteViewArtifacts:function(){var A;
if(this.comboList.iframe){A=this.inplaceInput.childNodes[6]
}else{A=this.inplaceInput.childNodes[5]
}if(A){this.inplaceInput.removeChild(A)
}},getCurrentText:function(){var A;
if(this.comboList.iframe){A=this.inplaceInput.childNodes[6]
}else{A=this.inplaceInput.childNodes[5]
}return A
},getLabelItem:function(D){var C=this.comboList.getItems().length;
for(var A=0;
A<C;
A++){var B=this.comboList.getItems()[A];
if(B.value==D){return B
}}},cancel:function($super,C){var A=this.getLabelItem(this.valueKeeper.value);
this.comboList.resetSelection();
this.comboList.hide();
if(A){this.comboList.doSelectItem(A);
var B=this.showValueInView?this.valueKeeper.value:A.innerHTML.unescapeHTML();
$super(C,B)
}else{$super(C,"")
}}})
;
if(!ClientUILib){var ClientUILib={Version:"1.0.0",Name:"ClientUILib",LibraryPath:"./",packages:[],load:function(A){if((typeof Prototype=="undefined")||(typeof Element=="undefined")||(typeof Element.Methods=="undefined")||parseFloat(Prototype.Version.split(".")[0]+"."+Prototype.Version.split(".")[1])<1.5){throw ("ClientUILib requires the Prototype JavaScript framework >= 1.5.0")
}$A(document.getElementsByTagName("script")).findAll(function(B){return(B.src&&B.src.match(/ClientUILib\.js(\?.*)?$/))
}).each(function(B){LibraryPath=B.src.replace(/ClientUILib\.js(\?.*)?$/,"")
});
if(A){ClientUILogger.create("ClientUILogger");
this.startTime=(new Date()).getTime()
}this.initBrowser()
},include:function(C){if(!this.packages){this.packages=[]
}if(!this.packages[C]){this.packages[C]=true;
var A=/\./g;
var B=LibraryPath+C.replace(A,"/");
document.write('<script type="text/javascript" src="'+B+'.js"><\/script>')
}},include2:function(D){if(!this.packages){this.packages=[]
}if(!this.packages[D]){this.packages[D]=true;
var A=/\./g;
var B=LibraryPath+D.replace(A,"/");
var C=document.createElement("script");
C.src=B+".js";
C.type="text/javascript";
document.getElementsByTagName("head")[0].appendChild(C)
}},requireClass:function(A){if(!this.packages[A]){ClientUILib.log(ClientUILogger.ERROR,"Library '"+A+"' required!!!");
throw ("Package '"+A+"' is required!")
}},declarePackage:function(libName){var pckg=null;
var packages=$A(libName.split("."));
packages.each(function(s){if(pckg==null){pckg=eval(s)
}else{if(!pckg[s]){pckg[s]={}
}pckg=pckg[s]
}});
this.packages[libName]=true
},log:function(B,A){if(ClientUILogger.isCreated){ClientUILogger.log(B,A)
}else{switch(B){case ClientUILogger.INFO:LOG.info(A);
break;
case ClientUILogger.ERROR:LOG.error(A);
break;
case ClientUILogger.WARNING:LOG.warn(A);
break;
default:LOG.a4jDebug(A)
}}},initBrowser:function(){var A=navigator.userAgent.toLowerCase();
this.isOpera=(A.indexOf("opera")>-1);
this.isSafari=(A.indexOf("webkit")>-1);
this.isIE=(window.ActiveXObject);
this.isIE7=(A.indexOf("msie 7")>-1);
this.isIE8=(A.indexOf("msie 8")>-1);
this.isGecko=!this.isSafari&&(A.indexOf("gecko")>-1);
if(A.indexOf("windows")!=-1||A.indexOf("win32")!=-1){this.isWindows=true
}else{if(A.indexOf("macintosh")!=-1){this.isMac=true
}}if(this.isIE&&!this.isIE7){try{document.execCommand("BackgroundImageCache",false,true)
}catch(B){}}}};
var ClientUILogger={INFO:1,WARNING:2,ERROR:3,EVENT:4,ALERT:5,hEnabledLevels:{1:true,2:true,3:true,4:true,5:false},isCreated:false,width:460,height:600,top:0,left:750,bLoggingEnabled:true,create:function(){this.mainDiv=$(document.createElement("div"));
this.mainDiv.setStyle({border:"1px black solid",position:"absolute",padding:"1px"});
this.logElement=$(document.createElement("div"));
this.logElement.setStyle({overflow:"auto",whiteSpace:"nowrap"});
this.buttonsContainer=$(document.createElement("div"));
var C=this.buttonClear=$(document.createElement("div"));
C.setStyle({width:120+"px",height:25+"px",border:"1px black solid"});
C.innerHTML="Clear";
var B=this.buttonToggleLogging=$(document.createElement("div"));
B.setStyle({width:120+"px",height:25+"px",border:"1px black solid",position:"relative",top:"-27px",left:"122px"});
B.innerHTML="Logging "+this.isLoggingEnabled();
var A=this.buttonToggleAlert=$(document.createElement("div"));
A.setStyle({width:120+"px",height:25+"px",border:"1px black solid",position:"relative",top:"-54px",left:"244px"});
A.innerHTML="Alert "+this.isLevelEnabled(ClientUILogger.ALERT);
this.buttonsContainer.appendChild(C);
this.buttonsContainer.appendChild(B);
this.buttonsContainer.appendChild(A);
this.mainDiv.appendChild(this.logElement);
this.mainDiv.appendChild(this.buttonsContainer);
this.eventClearClicked=this.onClearClick.bindAsEventListener(this);
this.eventToggleLoggingClicked=this.onToggleLoggingClick.bindAsEventListener(this);
this.eventToggleAlertClicked=this.onToggleAlertClick.bindAsEventListener(this);
Event.observe(B,"click",ClientUILogger.eventToggleLoggingClicked);
Event.observe(A,"click",ClientUILogger.eventToggleAlertClicked);
Event.observe(C,"click",ClientUILogger.eventClearClicked);
Event.observe(window,"load",ClientUILogger.init);
Event.observe(window,"resize",ClientUILogger.resizeWindow);
this.isCreated=true
},onToggleAlertClick:function(){this.toggleLevel(ClientUILogger.ALERT);
this.buttonToggleAlert.innerHTML="Alert "+this.isLevelEnabled(ClientUILogger.ALERT)
},onToggleLoggingClick:function(A){this.toggleLogging();
this.buttonToggleLogging.innerHTML="Logging "+this.isLoggingEnabled()
},onClearClick:function(A){Event.stop(A);
this.logElement.innerHTML=""
},init:function(){if(ClientUILogger.mainDiv){document.body.appendChild(ClientUILogger.mainDiv)
}ClientUILogger.show()
},resizeWindow:function(){ClientUILogger.show()
},show:function(){if(this.logElement){Element.show(this.mainDiv);
this.mainDiv.setStyle({width:this.width+"px",height:this.height+"px",top:this.top+"px",left:this.left+"px",zIndex:"1000"});
this.logElement.setStyle({width:"100%",height:"90%"});
this.buttonsContainer.setStyle({width:"100%",height:"10%"})
}},isLevelEnabled:function(A){return this.hEnabledLevels[A]
},isLoggingEnabled:function(){return this.bLoggingEnabled
},toggleLogging:function(){this.bLoggingEnabled=!this.bLoggingEnabled
},toggleLevel:function(A){this.hEnabledLevels[A]=!this.hEnabledLevels[A]
},log:function(F,D){var B=!this.isLoggingEnabled()||!this.isLevelEnabled(F);
if(B){return 
}if(F==ClientUILogger.ALERT){alert(D)
}else{var E=$(document.createElement("div"));
this.logElement.appendChild(E);
E.setStyle({width:"100%"});
var A="bold normal bold 10pt Arial";
var C="red";
switch(F){case ClientUILogger.INFO:C="black";
A="normal normal normal 10pt Arial";
break;
case ClientUILogger.WARNING:C="blue";
A="italic normal normal 10pt Arial";
break;
case ClientUILogger.ERROR:C="red";
A="normal normal bold 10pt Arial";
break;
case ClientUILogger.EVENT:C="green";
A="normal normal bold 10pt Arial";
break;
default:D="UNRESOLVED: level="+F+", msg="+D
}E.setStyle({font:A});
E.setStyle({color:C});
E.appendChild(document.createTextNode("> "+D));
this.logElement.scrollTop=this.logElement.scrollHeight
}},getWindowWidth:function(){var A;
if(navigator.appVersion.indexOf("MSIE")>0){A=document.body.clientWidth
}else{A=window.innerWidth
}return A
},getWindowHeight:function(){var A;
if(navigator.appVersion.indexOf("MSIE")>0){A=document.body.clientHeight
}else{A=window.innerHeight
}return A
}};
ClientUILib.load(false);
var ClientUI={controls:{},layouts:{}};
if(!ClientUILib.isIE){HTMLElement.prototype.click=function(){var A=this.ownerDocument.createEvent("MouseEvents");
A.initMouseEvent("click",true,true,this.ownerDocument.defaultView,1,0,0,0,0,false,false,false,false,0,null);
this.dispatchEvent(A)
}
}Object.extend(Event,{_domReady:function(){if(arguments.callee.done){return 
}arguments.callee.done=true;
if(Event._timer){clearInterval(Event._timer)
}Event._readyCallbacks.each(function(A){A()
});
Event._readyCallbacks=null
},onReady:function(B){if(!this._readyCallbacks){var A=this._domReady;
if(A.done){return B()
}if(document.addEventListener){document.addEventListener("DOMContentLoaded",A,false)
}if(/WebKit/i.test(navigator.userAgent)){this._timer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){A()
}},10)
}Event.observe(window,"load",A);
Event._readyCallbacks=[]
}Event._readyCallbacks.push(B)
}})
}var Utils={DOM:{copyAttributes:function(F,A,B){var K=A.attributes;
var H=(B&&B.exclude)?B.exclude:[];
for(var D=0;
D<K.length;
D++){var J=K[D];
var I=J.nodeName;
var E=J.nodeValue;
var G=E&&E.length>0&&H.indexOf(I)<0;
if(ClientUILib.isIE){G&=J.specified
}if(G){var C=document.createAttribute(I);
C.nodeValue=J.nodeValue;
F.setAttributeNode(C)
}}},replaceNode:function(D,E){var G=document.getElementById(D);
var B=E.getElementById(D);
if(G&&B){var J=G.cells;
for(var F=0;
F<J.length;
F++){Utils.DOM.Event.removeListeners(J[F])
}if(ClientUILib.isIE){var K=String();
var C="<table><tbody>"+B.xml+"</tbody></table>";
var H=document.createElement("DIV");
H.innerHTML=C;
var I=H.firstChild.firstChild.firstChild;
G.parentNode.replaceChild(I,G);
return I
}else{if(ClientUILib.isGecko){var A=document;
Utils.DOM._clearAttributes(G);
Utils.DOM.copyAttributes(G,B);
G.innerHTML=B.innerHTML;
return G
}else{B=document.importNode(B,true);
G.parentNode.replaceChild(B,G);
return B
}}}else{if(!G){ClientUILib.log(ClientUILogger.ERROR,"DOM Element with id "+D+" not found for update.")
}if(!B){ClientUILib.log(ClientUILogger.ERROR,"RESPONSE Element with id "+D+" not found for update.");
if(G){for(var F=0;
F<G.cells.length;
F++){G.cells[F].innerHTML=""
}}}}},_clearAttributes:function(B){var A=B.attributes;
if(B.clearAttributes){B.clearAttributes()
}else{while(B.attributes.length>0){B.removeAttributeNode(B.attributes[0])
}}},_formatNode:function(C){var D=new StringBuilder();
D.append("<").append(C.nodeName);
for(var B=0;
B<C.attributes.length;
B++){var A=C.attributes[B];
if(A.specified){D.append(" ").append(A.nodeName).append('="').append(A.nodeValue).append('" ')
}}D.append("/>");
return D.toString()
},Event:{observe:function(B,D,C,A){if(true){if(!B._listeners){B._listeners=[]
}B._listeners[B._listeners.length]={event:D,handler:C,useCapture:A}
}Event.observe(B,D,C,A)
},stopObserving:function(B,D,C,A){if(B._listeners){B._listeners=B._listeners.reject(function(E){return E.event==D&&E.handler==C&&E.useCapture==A
})
}Event.stopObserving(B,D,C,A)
},removeListeners:function(C){if(C._listeners){var A=C._listeners.length;
for(var B=0;
B<A;
B++){var D=C._listeners[B];
Event.stopObserving(C,D.event,D.handler,D.useCapture)
}C._listeners=null
}}}},AJAX:{updateRows:function(F,H,B,O,R,Q){var I=F;
var L=B.getBody().templNormal.getElement().rows.length;
var A=I.startRow;
var J=I.count;
var G,N,D;
var P=B.dataModel;
var K=O;
var M=[":n:"];
if(($(K+":f")).rows.length){M=[":f:",":n:"]
}var C=0;
var E=[];
for(N=0;
N<J;
N++){G=A+N;
if(G>=L){G-=L
}M.unbreakableEach(function(S){var U=[K,S,G].join("");
var T=Utils.DOM.replaceNode(U,H);
if(R){if(!E[N]){E[N]={}
}E[N][S]={index:G,row:T};
C++
}})
}if(ClientUILib.isIE7||ClientUILib.isIE8){setTimeout(function(){var T=B.getBody().scrollBox.getElement();
var S=T.scrollTop;
if(S){T.scrollTop++
}else{T.scrollTop--
}T.scrollTop=S
},50)
}if(R&&C>0){setTimeout(function(){for(var S=0;
S<J;
S++){R.unbreakableEach(function(T){if(E[S]){M.unbreakableEach(function(U){if(E[S][U].row){T.call(B,E[S][U])
}})
}})
}if(Q){Q.unbreakableEach(function(T){T.call(B)
})
}},100)
}B.getBody()._onDataReady(I)
}}};
Utils.execOnLoad=function(A,C,B){if(C()){A()
}else{window.setTimeout(function(){Utils.execOnLoad(A,C,B)
},B)
}};
Utils.Condition={ElementPresent:function(A){return function(){var B=$(A);
return B&&B.offsetHeight>0
}
}};
Utils.trace=function(A){LOG.info(A+": "+(new Date().getTime()-this._d)+"    ");
this._d=new Date().getTime()
};
Utils.getRule=function(C){var F=null;
var E=document.styleSheets;
var D=C.toLowerCase();
for(var A=0;
!F&&A<E.length;
A++){var G=E[A].cssRules?E[A].cssRules:E[A].rules;
for(var B=0;
!F&&B<G.length;
B++){if(G[B].selectorText&&G[B].selectorText.toLowerCase()==D){F=G[B]
}}}return F
};
Array.prototype.unbreakableEach=function(B){for(var A=0;
A<this.length;
A++){B(this[A],A)
}};
ClientUILib.declarePackage("ClientUI.common.utils.StringBuilder");
StringBuilder=Class.create({initialize:function(A){this._string=null;
this._current=0;
this._parts=[];
this.length=0;
if(A!=null){this.append(A)
}},append:function(A){this._parts.push(String(A));
this._string=null;
return this
},toString:function(){if(this._string!=null){return this._string
}var A=this._parts.join("");
this._parts=[A];
this._current=1;
this.length=A.length;
return this._string=A
},clean:function(A){this.initialize()
}});
Object.extend(StringBuilder.prototype,{length:0,_current:0,_parts:[],_string:null});
var Validators={isIEObject:function(A){return this.isObject(A)&&typeof A.constructor!="function"
},isArray:function(A){return this.isObject(A)&&A.constructor==Array
},isBoolean:function(A){return typeof A=="boolean"
},getBoolean:function(B,A){if(this.isBoolean(B)){return B
}if(B=="true"){return true
}else{if(B=="false"){return false
}}return A
},isEmpty:function(B){if(this.isObject(B)){for(var A in B){return false
}}else{if(this.isString(B)&&B.length>0){return false
}}return !this.IsNumber(B)
},isFunction:function(A){return typeof A=="function"
},isNull:function(A){return typeof A=="object"&&!A
},IsNumber:function(B){if(typeof B=="number"&&isFinite(B)){return true
}var A=/(^-?[1-9](\d{1,2}(\,\d{3})*|\d*)|^0{1})$/;
if(A.test(B)){return true
}return false
},IsFormattedNumber:function(B){var A=/^-?(\d{1,3}|\d{1,3}(\,\d{3})*|\d*)$/g;
if(!A.test(B)){return false
}return true
},isObject:function(A){return(typeof A=="object"&&!!A)||this.isFunction(A)
},isString:function(A){return typeof A=="string"
},isUndefined:function(A){return typeof A=="undefined"
}};
ClientUILib.declarePackage("ClientUI.common.box.Box");
ClientUI.common.box.Box=Class.create({initialize:function(C,B,A){this.element=$(C);
if(!this.element){this.element=$(document.createElement("div"));
if($(B)){$(B).appendChild(this.element)
}else{document.body.appendChild(this.element)
}}if(!this.element.parentNode&&$(B)){$(B).appendChild(this.element)
}if(!this.element.id){this.element.id="ClientUI_Box"+ClientUI_common_box_Box_idGenerator++
}if(!A){this.element.setStyle({overflow:"hidden"});
this.element.setStyle({whiteSpace:"nowrap"})
}},setParent:function(A){if(this.element.parentNode){this.element.parentNode.removeChild(this.element)
}if(A){if(A.getElement){A=A.getElement()
}$(A).appendChild(this.element)
}return this
},getElement:function(){return this.element
},getHeight:function(){var B=this.getElement();
if(B.tagName.toLowerCase()!="body"){var A=B.offsetHeight;
return A>0?A:(this.element.boxHeight?parseInt(this.element.boxHeight):0)
}if(self.innerHeight){return self.innerHeight
}else{if(document.documentElement&&document.documentElement.clientHeight){return document.documentElement.clientHeight
}else{if(document.body){return document.body.clientHeight
}}}},isModified:false,setHeight:function(A){this.element.boxHeight=A;
if(Validators.IsNumber(A)){if(A<0){A=0
}A+="px"
}this.element.setStyle({height:A});
isModified=true;
return this
},getWidth:function(){var B=this.getElement();
if(B.tagName.toLowerCase()!="body"){var A=B.offsetWidth;
return A>0?A:(this.element.boxWidth?parseInt(this.element.boxWidth):0)
}if(self.innerHeight){return self.innerWidth
}else{if(document.documentElement&&document.documentElement.clientHeight){return document.documentElement.clientWidth
}else{if(document.body){return document.body.clientWidth
}}}},setWidth:function(A){this.element.boxWidth=A;
if(Validators.IsNumber(A)){if(A<0){A=0
}A+="px"
}this.element.setStyle({width:A});
isModified=true;
return this
},moveToX:function(A){if(Validators.IsNumber(A)){A+="px"
}this.getElement().setStyle({left:A});
isModified=true;
return this
},moveToY:function(A){if(Validators.IsNumber(A)){A+="px"
}this.getElement().setStyle({top:A});
isModified=true;
return this
},moveTo:function(A,B){this.moveToX(A);
this.moveToY(B);
return this
},hide:function(){Element.hide(this.element);
isModified=true;
return this
},show:function(){Element.show(this.element);
isModified=true;
return this
},updateLayout:function(){isModified=false;
return this
},getViewportWidth:function(){if(this.getElement().tagName.toLowerCase()!="body"){var A=0;
if(this.getElement().clientWidth){A=this.getElement().clientWidth
}else{if(this.getElement().innerWidth){A=this.getElement().innerWidth-getScrollerWidth()
}}if(ClientUILib.isGecko){A-=this.getPadding("lr")
}return A
}return this.getWidth()
},getViewportHeight:function(){if(this.getElement().tagName.toLowerCase()!="body"){var A=0;
if(this.getElement().clientHeight){A=this.getElement().clientHeight
}else{if(this.getElement().innerHeight){A=this.getElement().innerHeight-getScrollerWidth()
}}if(ClientUILib.isGecko){A-=this.getPadding("tb")
}return A
}return this.getHeight()
},getBorderWidth:function(A){return this.getStyles(A,this.borders)
},getPadding:function(A){return this.getStyles(A,this.paddings)
},getStyles:function(E,D){var F=0;
for(var C=0,A=E.length;
C<A;
C++){var B=parseInt(this.getElement().getStyle(D[E.charAt(C)]),10);
if(!isNaN(B)){F+=B
}}return F
},makeAbsolute:function(A){if(A){Position.absolutize(this.getElement())
}else{this.getElement().setStyle({position:"absolute"})
}return this
},getX:function(){return this.getElement().offsetLeft
},getY:function(){return this.getElement().offsetTop
},setStyle:function(A){this.getElement().setStyle(A);
return this
},borders:{l:"border-left-width",r:"border-right-width",t:"border-top-width",b:"border-bottom-width"},paddings:{l:"padding-left",r:"padding-right",t:"padding-top",b:"padding-bottom"},margins:{l:"margin-left",r:"margin-right",t:"margin-top",b:"margin-bottom"}});
if(!ClientUI_common_box_Box_idGenerator){var ClientUI_common_box_Box_idGenerator=0
}ClientUILib.declarePackage("ClientUI.common.box.InlineBox");
ClientUILib.requireClass("ClientUI.common.box.Box");
ClientUI.common.box.InlineBox=Class.create(ClientUI.common.box.Box,{initialize:function($super,C,B,A){if(!C){C=$(document.createElement("span"));
if($(B)){$(B).appendChild(C)
}else{document.body.appendChild(C)
}}if(!C.id){C.id="ClientUI_InlineBox"+ClientUI_common_box_InlineBox_idGenerator++
}$super(C,B,A);
if(!A){this.element.setStyle({display:"block"})
}}});
if(!ClientUI_common_box_InlineBox_idGenerator){var ClientUI_common_box_InlineBox_idGenerator=0
}ClientUILib.declarePackage("ClientUI.common.box.ScrollableBox");
ClientUILib.requireClass("ClientUI.common.box.Box");
ClientUI.common.box.ScrollableBox=Class.create(ClientUI.common.box.Box,{initialize:function($super,B,A){$super(B,A);
this.element.setStyle({overflow:"auto"});
this.eventOnScroll=this.scrollContent.bindAsEventListener(this);
Event.observe(this.element,"scroll",this.eventOnScroll)
},scrollContent:function(A){this.updateScrollPos()
},updateScrollPos:function(){this.timer=null;
if(this.scrollLeft!==this.getViewportScrollX()){this.scrollLeft=this.getViewportScrollX();
this.element.fire("grid:onhcroll",{pos:this.getViewportScrollX()})
}if(this.scrollTop!==this.getViewportScrollY()){this.scrollTop=this.getViewportScrollY();
this.element.fire("grid:onvcroll",{pos:this.getViewportScrollY()})
}},updateLayout:function($super){$super()
},getViewportScrollX:function(){var A=0;
if(this.getElement().scrollLeft){A=this.getElement().scrollLeft
}else{if(this.getElement().pageXOffset){A=this.getElement().pageXOffset
}else{if(this.getElement().scrollX){A=this.getElement().scrollX
}}}return A
},getViewportScrollY:function(){var A=0;
if(this.getElement().scrollTop){A=this.getElement().scrollTop
}else{if(this.getElement().pageYOffset){A=this.getElement().pageYOffset
}else{if(this.getElement().scrollY){A=this.getElement().scrollY
}}}return A
},getScrollerWidth:function(){if(this.scrollerWidth&&this.scrollerWidth>0){return this.scrollerWidth
}var D=null;
var C=null;
var A=0;
var B=0;
D=document.createElement("div");
D.style.position="absolute";
D.style.top="-1000px";
D.style.left="-1000px";
D.style.width="100px";
D.style.height="50px";
D.style.overflow="hidden";
C=document.createElement("div");
C.style.width="100%";
C.style.height="200px";
D.appendChild(C);
document.body.appendChild(D);
A=C.offsetWidth;
D.style.overflow="auto";
B=C.offsetWidth;
document.body.removeChild(document.body.lastChild);
this.scrollerWidth=(A-B);
return this.scrollerWidth||0
}});
ClientUILib.declarePackage("ClientUI.common.box.Substrate");
ClientUILib.requireClass("ClientUI.common.box.Box");
ClientUI.common.box.Substrate=Class.create(ClientUI.common.box.Box,{initialize:function($super,D,C,B){if(!D){var A=$(document.createElement("div"));
A.innerHTML='<iframe id="ClientUI_Substrate'+(ClientUI_common_box_Substrate_idGenerator++)+'" src="javascript:\'\'" scrolling="no" frameborder="0" style="filter:Alpha(opacity=0);position:absolute;top:0px;left:0px;display:block"></iframe>';
D=$(A.getElementsByTagName("iframe")[0]);
A.removeChild(D)
}$super(D,C,B);
if(!B){}}});
if(!ClientUI_common_box_Substrate_idGenerator){var ClientUI_common_box_Substrate_idGenerator=0
};
if(!window.Richfaces){window.Richfaces={}
}Richfaces.Editor={};
Richfaces.Editor.REGEXP_CSS=/(\/tiny_mce\/(?:themes|plugins)\/[\w\.\\\/]*[\w\.]+\.)(c|C)[sS]{2}$/;
RichEditor=Class.create();
Object.extend(RichEditor.prototype,{initialize:function(D,C,A){this.id=D;
this.editorTextAreaId=this.id+"TextArea";
this.params=C;
this.tinyparams=A;
var B=$(this.id);
B.component=this;
B.richfacesComponent="richfaces:editor";
this["rich:destructor"]="destruct";
Richfaces.Editor.extScriptSuffix=C.extScriptSuffix;
Richfaces.Editor.extCssSuffix=C.extCssSuffix;
this.synchronizeConfiguration();
this.setDialogType();
this.redefineCallbacks();
this.tinyMCE_editor=null;
this.tinyparams.mode="exact";
this.tinyparams.elements=this.editorTextAreaId;
this.tinyparams.editor_selector=null;
this.tinyparams.editor_deselector=null;
tinyMCE.init(this.tinyparams);
this.onBeforeAjaxListener=new A4J.AJAX.AjaxListener("onbeforeajax",this.onBeforeAjax.bind(this));
A4J.AJAX.AddListener(this.onBeforeAjaxListener)
},destruct:function(A){A4J.AJAX.removeListener(this.onBeforeAjaxListener);
if(A&&this.tinyMCE_editor){this.tinyMCE_editor.remove()
}this.onInitInstanceCallbackFunction=null;
this.onInitCallbackFunction=null;
this.onChangeCallbackFunction=null;
this.onSaveCallbackFunction=null;
this.onSetupCallbackFunction=null;
this.tinyMCE_editor=null
},redefineCallbacks:function(){this.onInitInstanceCallbackFunction=this.tinyparams.init_instance_callback;
this.tinyparams.init_instance_callback=this.onInitInstanceCallback.bind(this);
if(this.tinyparams.onchange_callback&&typeof this.tinyparams.onchange_callback!="string"){this.onChangeCallbackFunction=this.tinyparams.onchange_callback;
this.tinyparams.onchange_callback=this.onChangeCallback.bind(this)
}if(this.tinyparams.onchange_callback&&typeof this.tinyparams.oninit!="string"){this.onInitCallbackFunction=this.tinyparams.oninit;
this.tinyparams.oninit=this.onInitCallback.bind(this)
}if(this.tinyparams.onchange_callback&&typeof this.tinyparams.save_callback!="string"){this.onSaveCallbackFunction=this.tinyparams.save_callback;
this.tinyparams.save_callback=this.onSaveCallback.bind(this)
}if(this.tinyparams.onchange_callback&&typeof this.tinyparams.setup!="string"){this.onSetupCallbackFunction=this.tinyparams.setup;
this.tinyparams.setup=this.onSetupCallback.bind(this)
}},onBeforeAjax:function(){if(this.tinyMCE_editor){this.tinyMCE_editor.save()
}},onInitInstanceCallback:function(A){this.tinyMCE_editor=tinyMCE.get(this.editorTextAreaId);
if(this.onInitInstanceCallbackFunction){this.onInitInstanceCallbackFunction.call(this,A)
}},onChangeCallback:function(A){this.invokeEvent("Change",$A(arguments))
},onInitCallback:function(){this.invokeEvent("Init",$A(arguments))
},onSaveCallback:function(B,C,A){if(this.onSaveCallbackFunction){return this.invokeEvent("Save",$A(arguments))
}else{return C
}},onSetupCallback:function(A){this.invokeEvent("Setup",$A(arguments))
},synchronizeConfiguration:function(){if(this.params.useSeamText){this.tinyparams.convert_fonts_to_spans=false;
this.tinyparams.inline_styles=false;
this.tinyparams.verify_html=false
}},invokeEvent:function(B,C){callback=this["on"+B+"CallbackFunction"];
if(!callback){return 
}var D;
var A;
if(document.createEventObject){D=document.createEventObject()
}else{if(document.createEvent){D=document.createEvent("Events");
D.initEvent(B,true,false)
}}D.rich={component:this,tinyMceInstance:this.tinyMCE_editor};
C.unshift(D);
try{A=callback.apply(this,C)
}catch(E){LOG.warn("Exception: "+E.Message+"\n[on "+B+" ]")
}return A
},setDialogType:function(){var B=this.tinyparams.plugins;
if(this.tinyparams.dialog_type&&this.tinyparams.dialog_type=="modal"){if(B&&B.length>0){if(B.indexOf("inlinepopups")==-1){B+=",inlinepopups"
}}else{B="inlinepopups"
}}else{if(this.tinyparams.dialog_type&&this.tinyparams.dialog_type=="window"){if(B&&B.length>0&&B.indexOf("inlinepopups")!=-1){if(B.indexOf("inlinepopups")!=-1){var A=B.indexOf("inlinepopups");
var D=-1;
var C=-1;
if(A>0){D=B.lastIndexOf(",",A)
}if(A<B.length-1){C=B.indexOf(",",A)
}if(D!=-1&&C!=-1){B=B.replace(B.substring(D,C+1),",")
}else{if(D!=-1){B=B.replace(B.substring(D,A+"inlinepopups".length),"")
}else{if(C!=-1){B=B.replace(B.substring(A,C+1),"")
}}}}}}}this.tinyparams.plugins=B
}})
;
(function(A){jQuery.fn.pngFix=function(D){D=jQuery.extend({blankgif:"blank.gif"},D);
var C=(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)==4&&navigator.appVersion.indexOf("MSIE 5.5")!=-1);
var B=(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)==4&&navigator.appVersion.indexOf("MSIE 6.0")!=-1);
if(jQuery.browser.msie&&(C||B)){jQuery(this).find("img[@src$=.png]").each(function(){jQuery(this).attr("width",jQuery(this).width());
jQuery(this).attr("height",jQuery(this).height());
var L="";
var G="";
var F=(jQuery(this).attr("id"))?'id="'+jQuery(this).attr("id")+'" ':"";
var M=(jQuery(this).attr("class"))?'class="'+jQuery(this).attr("class")+'" ':"";
var I=(jQuery(this).attr("title"))?'title="'+jQuery(this).attr("title")+'" ':"";
var J=(jQuery(this).attr("alt"))?'alt="'+jQuery(this).attr("alt")+'" ':"";
var H=(jQuery(this).attr("align"))?"float:"+jQuery(this).attr("align")+";":"";
var E=(jQuery(this).parent().attr("href"))?"cursor:hand;":"";
if(this.style.border){L+="border:"+this.style.border+";";
this.style.border=""
}if(this.style.padding){L+="padding:"+this.style.padding+";";
this.style.padding=""
}if(this.style.margin){L+="margin:"+this.style.margin+";";
this.style.margin=""
}var K=(this.style.cssText);
G+="<span "+F+M+I+J;
G+='style="position:relative;white-space:pre-line;display:inline-block;background:transparent;'+H+E;
G+="width:"+jQuery(this).width()+"px;height:"+jQuery(this).height()+"px;";
G+="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+jQuery(this).attr("src")+"', sizingMethod='scale');";
G+=K+'"></span>';
if(L!=""){G='<span style="position:relative;display:inline-block;'+L+E+"width:"+jQuery(this).width()+"px;height:"+jQuery(this).height()+'px;">'+G+"</span>"
}jQuery(this).hide();
jQuery(this).after(G)
});
jQuery(this).find("*").each(function(){var F=jQuery(this).css("background-image");
if(F.indexOf(".png")!=-1){var E=F.split('url("')[1].split('")')[0];
jQuery(this).css("background-image","none");
jQuery(this).get(0).runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+E+"',sizingMethod='scale')"
}});
jQuery(this).find("input[@src$=.png]").each(function(){var E=jQuery(this).attr("src");
jQuery(this).get(0).runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+E+"', sizingMethod='scale');";
jQuery(this).attr("src",D.blankgif)
})
}else{return false
}return jQuery
}
})(jQuery)
;
if(!window.Richfaces){window.Richfaces={}
}(function(C){var A=function(D){this.r=Math.min(255,Math.max(0,D[0]));
this.g=Math.min(255,Math.max(0,D[1]));
this.b=Math.min(255,Math.max(0,D[2]))
};
A.prototype.toHSB=function(){if(!this.hsb){var G=this.r,F=this.g,E=this.b;
var D=Math.min(G,Math.min(F,E));
var H=Math.max(G,Math.max(F,E));
this.hsb={b:H*100/255};
var I=H-D;
if(I){this.hsb.s=Math.round(100*(I/H));
if(G==H){this.hsb.h=Math.round(((F-E)/I)*60)
}else{if(F==H){this.hsb.h=Math.round((2+(E-G)/I)*60)
}else{this.hsb.h=Math.round((4+(G-F)/I)*60)
}}if(this.hsb.h>360){this.hsb.h-=360
}else{if(this.hsb.h<0){this.hsb.h+=360
}}}else{this.hsb.h=this.hsb.s=0
}this.hsb.b=Math.round(this.hsb.b)
}return this.hsb
};
A.prototype.toRGB=function(){return this
};
var B=function(D){this.h=Math.min(360,Math.max(0,D[0]));
this.s=Math.min(100,Math.max(0,D[1]));
this.b=Math.min(100,Math.max(0,D[2]))
};
B.prototype.toHSB=function(){return this
};
B.prototype.toRGB=function(){if(!this.rgb){this.rgb={};
var H=Math.round(this.h);
var G=Math.round(this.s*255/100);
var D=Math.round(this.b*255/100);
if(G==0){this.rgb.r=this.rgb.g=this.rgb.b=D
}else{var I=D;
var F=(255-G)*D/255;
var E=(I-F)*(H%60)/60;
if(H==360){H=0
}if(H<60){this.rgb.r=I;
this.rgb.b=F;
this.rgb.g=F+E
}else{if(H<120){this.rgb.g=I;
this.rgb.b=F;
this.rgb.r=I-E
}else{if(H<180){this.rgb.g=I;
this.rgb.r=F;
this.rgb.b=F+E
}else{if(H<240){this.rgb.b=I;
this.rgb.r=F;
this.rgb.g=I-E
}else{if(H<300){this.rgb.b=I;
this.rgb.g=F;
this.rgb.r=F+E
}else{if(H<360){this.rgb.r=I;
this.rgb.g=F;
this.rgb.b=I-E
}else{this.rgb.r=0;
this.rgb.g=0;
this.rgb.b=0
}}}}}}}this.rgb.r=Math.round(this.rgb.r);
this.rgb.g=Math.round(this.rgb.g);
this.rgb.b=Math.round(this.rgb.b)
}return this.rgb
};
C.widget("ui.colorPicker",{_fixColors:function(E,H){E=E.toLowerCase();
var G=/[0-9]+/g;
var D=E.match(G);
if(H=="hsb"){return new B(D)
}else{if(H=="rgb"){return new A(D)
}else{if(H=="hex"){var F=parseInt(((E.indexOf("#")>-1)?E.substring(1):E),16);
return new A([F>>16,(F&65280)>>8,(F&255)])
}}}},_init:function(){this.patternHex=new RegExp();
this.patternDec=new RegExp();
this.patternHex.compile("[^0-9A-Fa-f]+");
this.patternDec.compile("[^0-9]+");
this.charMin=65;
var F=this.options,D=this,E=C(" + .rich-color-picker-wrapper",this.element);
if(F.color.indexOf("hsb")>-1){this.color=this._fixColors(F.color,"hsb")
}else{if(F.color.indexOf("rgb")>-1){this.color=this._fixColors(F.color,"rgb")
}else{if(F.color.indexOf("#")>-1){this.color=this._fixColors(F.color,"hex")
}else{return this
}}}this.showEvent=F.showEvent;
this.picker=C(E);
this.picker[0].component=this;
this.fields=this.picker.find("input").bind("keydown",function(G){return D._keyDown.call(D,G)
}).bind("change",function(G){return D._select.call(D,G)
}).bind("blur",function(G){return D._blur.call(D,G)
}).bind("focus",function(G){return D._focus.call(D,G)
});
this.selector=this.picker.find(".rich-color-picker-color").bind("mousedown",function(G){return D._downSelector.call(D,G)
});
this.selectorIndic=this.selector.find("* *");
this.hue=this.picker.find(".rich-color-picker-rainbow > *:not(:first)");
this.picker.find(".rich-color-picker-rainbow").bind("mousedown",function(G){return D._downHue.call(D,G)
});
this.newColor=this.picker.find(".rich-color-picker-new-color");
this.currentColor=this.picker.find(".rich-color-picker-current-color");
this.iconColor=C(".rich-color-picker-icon",this.element);
this.picker.find(".rich-color-picker-submit").bind("mouseenter",function(G){return D._enterSubmit.call(D,G)
}).bind("mouseleave",function(G){return D._leaveSubmit.call(D,G)
}).bind("click",function(G){return D._clickSubmit.call(D,G)
});
this.picker.find(".rich-color-picker-cancel").bind("mouseenter",function(G){return D._enterCancel.call(D,G)
}).bind("mouseleave",function(G){return D._leaveCancel.call(D,G)
}).bind("click",function(G){return D._clickCancel.call(D,G)
});
this._fillRGBFields(this.color);
this._fillHSBFields(this.color);
this._fillHexFields(this.color);
this._setHue(this.color);
this._setSelector(this.color);
this._setCurrentColor(this.color);
this._setIconColor(this.color);
this._setNewColor(this.color);
if(F.flat){this.picker.css({position:"absolute"});
C(this.element).bind(this.showEvent+".colorPicker",function(G){return D._show.call(D,G)
});
D._show()
}else{C(this.element).bind(this.showEvent+".colorPicker",function(G){return D._show.call(D,G)
})
}},destroy:function(){this.picker.remove();
this.picker[0].component=undefined;
this.element.removeData("colorPicker").unbind(".colorPicker")
},_fillRGBFields:function(D){var E=D.toRGB();
this.fields.eq(1).val(E.r).end().eq(2).val(E.g).end().eq(3).val(E.b).end()
},_fillHSBFields:function(E){var D=E.toHSB();
this.fields.eq(4).val(D.h).end().eq(5).val(D.s).end().eq(6).val(D.b).end()
},_fillHexFields:function(D){var E=D.toRGB();
this.fields.eq(0).val(this._RGBToHex(E)).end()
},_setSelector:function(E){var D=E.toHSB();
this.selector.css("backgroundColor","#"+this._RGBToHex(new B([D.h,100,100]).toRGB()));
this.selectorIndic.css({left:parseInt(150*D.s/100,10),top:parseInt(150*(100-D.b)/100,10)})
},_setHue:function(E){var D=E.toHSB();
this.hue.css("top",parseInt(150-150*D.h/360,10))
},_setCurrentColor:function(D){this.currentColor.css("backgroundColor","#"+this._RGBToHex(D.toRGB()))
},_setIconColor:function(D){this.iconColor.css("backgroundColor","#"+this._RGBToHex(D.toRGB()))
},_setNewColor:function(D){this.newColor.css("backgroundColor","#"+this._RGBToHex(D.toRGB()))
},_keyDown:function(D){var E=D.charCode||D.keyCode||-1;
if((E>this.charMin&&E<=90)||E==32){return false
}},_createEventArgument:function(D){return{options:this.options,hsb:D.toHSB(),hex:this._RGBToHex(D.toRGB()),rgb:D.toRGB()}
},_select:function(F,E){var D;
E=E||F.target;
for(i=0;
i<=this.fields.length;
i++){if(this.fields.eq(i).val()==""||this.fields.eq(i).val()==null){this.fields.eq(i).val(0)
}}if(E.parentNode.className.indexOf("-hex")>0){if(this.patternHex.test(E.value)){E.value=0
}}else{if(this.patternDec.test(E.value)){E.value=0
}}if(E.parentNode.className.indexOf("-hex")>0){this.color=D=this._fixColors(this.fields.eq(0).val(),"hex");
this._fillHexFields(D);
this._fillRGBFields(D);
this._fillHSBFields(D)
}else{if(E.parentNode.className.indexOf("-hsb")>0){this.color=D=new B([parseInt(this.fields.eq(4).val(),10),parseInt(this.fields.eq(5).val(),10),parseInt(this.fields.eq(6).val(),10)]);
this._fillHSBFields(D);
this._fillRGBFields(D);
this._fillHexFields(D)
}else{this.color=D=new A([parseInt(this.fields.eq(1).val(),10),parseInt(this.fields.eq(2).val(),10),parseInt(this.fields.eq(3).val(),10)]);
this._fillRGBFields(D);
this._fillHexFields(D);
this._fillHSBFields(D)
}}this._setSelector(D);
this._setHue(D);
this._setNewColor(D);
this._trigger("select",F,this._createEventArgument(D))
},_blur:function(D){this.fields.parent().removeClass("rich-color-picker-focus")
},_focus:function(D){this.charMin=D.target.parentNode.className.indexOf("-hex")>0?70:65;
this.fields.parent().removeClass("rich-color-picker-focus");
C(D.target.parentNode).addClass("rich-color-picker-focus")
},_downHue:function(E){this.currentHue={y:this.picker.find(".rich-color-picker-rainbow").offset().top};
this._select.apply(this,[E,this.fields.eq(4).val(parseInt(360*(150-Math.max(0,Math.min(150,(E.pageY-this.currentHue.y))))/150,10)).get(0)]);
var D=this;
C(document).bind("mouseup.cpSlider",function(F){return D._upHue.call(D,F)
});
C(document).bind("mousemove.cpSlider",function(F){return D._moveHue.call(D,F)
});
return false
},_moveHue:function(D){this._select.apply(this,[D,this.fields.eq(4).val(parseInt(360*(150-Math.max(0,Math.min(150,(D.pageY-this.currentHue.y))))/150,10)).get(0)]);
return false
},_upHue:function(D){C(document).unbind("mouseup.cpSlider");
C(document).unbind("mousemove.cpSlider");
return false
},_downSelector:function(E){var D=this;
this.currentSelector={pos:this.picker.find(".rich-color-picker-color").offset()};
this._select.apply(this,[E,this.fields.eq(6).val(parseInt(100*(150-Math.max(0,Math.min(150,(E.pageY-this.currentSelector.pos.top))))/150,10)).end().eq(5).val(parseInt(100*(Math.max(0,Math.min(150,(E.pageX-this.currentSelector.pos.left))))/150,10)).get(0)]);
C(document).bind("mouseup.cpSlider",function(F){return D._upSelector.call(D,F)
});
C(document).bind("mousemove.cpSlider",function(F){return D._moveSelector.call(D,F)
});
return false
},_moveSelector:function(D){this._select.apply(this,[D,this.fields.eq(6).val(parseInt(100*(150-Math.max(0,Math.min(150,(D.pageY-this.currentSelector.pos.top))))/150,10)).end().eq(5).val(parseInt(100*(Math.max(0,Math.min(150,(D.pageX-this.currentSelector.pos.left))))/150,10)).get(0)]);
return false
},_upSelector:function(D){C(document).unbind("mouseup.cpSlider");
C(document).unbind("mousemove.cpSlider");
return false
},_enterSubmit:function(D){this.picker.find(".rich-color-picker-submit").addClass("rich-color-picker-focus")
},_leaveSubmit:function(D){this.picker.find(".rich-color-picker-submit").removeClass("rich-color-picker-focus")
},_enterCancel:function(D){this.picker.find(".rich-color-picker-cancel").addClass("rich-color-picker-focus")
},_leaveCancel:function(D){this.picker.find(".rich-color-picker-cancel").removeClass("rich-color-picker-focus")
},_clickSubmit:function(H){var F=this.color;
this._setCurrentColor(F);
this._setIconColor(F);
var E=F.toRGB();
var G;
if(this.options.rgbColorMode){G="rgb("+E.r+", "+E.g+", "+E.b+")"
}else{G="#"+this._RGBToHex(E)
}var D=C("input",this.element);
if(G!==D.val()){D.val(G);
this._trigger("change",H,this._createEventArgument(F))
}this.picker.hide();
C(document).unbind("mousedown.colorPicker");
return false
},_clickCancel:function(D){this.picker.hide();
C(document).unbind("mousedown.colorPicker");
return false
},_show:function(I){if(this._trigger("beforeshow",I,this._createEventArgument(this.color))!=false){var H=0;
var G=0;
this.picker.css("visibility","hidden").css("display","block");
var E=C("input",this.element);
var J=E.offset();
var F={left:J.left,top:J.top,width:this.element.width(),height:E.outerHeight()};
Richfaces.jQuery.position(F,this.picker);
this.picker.css("visibility","visible");
this._trigger("show",I,this._createEventArgument(this.color));
this.picker.show();
var D=this;
C(document).bind("mousedown.colorPicker",function(K){return D._hide.call(D,K)
})
}return false
},_hide:function(D){if(!this._isChildOf(this.picker[0],D.target,this.picker[0])){if(this._trigger("hide",D,this._createEventArgument(this.color))!=false){this.picker.hide()
}C(document).unbind("mousedown.colorPicker")
}},_isChildOf:function(F,E,D){if(F==E){return true
}if(F.contains){return F.contains(E)
}if(F.compareDocumentPosition){return !!(F.compareDocumentPosition(E)&16)
}var G=E.parentNode;
while(G&&G!=D){if(G==F){return true
}G=G.parentNode
}return false
},_RGBToHex:function(D){var E=[D.r.toString(16),D.g.toString(16),D.b.toString(16)];
C.each(E,function(F,G){if(G.length==1){E[F]="0"+G
}});
return E.join("")
},setColor:function(D){if(typeof D=="string"){D=this._fixColors(D,"hex")
}else{if(D.r!=undefined&&D.g!=undefined&&D.b!=undefined){D=new A([D.r,D.g,D.b])
}else{if(D.h!=undefined&&D.s!=undefined&&D.b!=undefined){D=new B([D.h,D.s,D.b])
}else{return this
}}}this.color=D;
this._fillRGBFields(D);
this._fillHSBFields(D);
this._fillHexFields(D);
this._setHue(D);
this._setSelector(D);
this._setCurrentColor(D);
this._setIconColor(D);
this._setNewColor(D)
}})
})(jQuery)
;
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.InplaceInputStyles=Class.create();
Richfaces.InplaceInputStyles.prototype={initialize:function(){this.commonStyles={component:{view:{normal:"rich-inplace rich-inplace-input rich-inplace-view",hovered:"rich-inplace-input-view-hover"},changed:{normal:"rich-inplace rich-inplace-input rich-inplace-changed",hovered:"rich-inplace-input-changed-hover"},editable:"rich-inplace rich-inplace-input rich-inplace-edit"}}
},getCommonStyles:function(){return this.commonStyles
}}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.ComboBoxStyles=Class.create();
Richfaces.ComboBoxStyles.prototype={initialize:function(){this.commonStyles={button:{classes:{normal:"rich-combobox-font-inactive rich-combobox-button-icon-inactive rich-combobox-button-inactive",active:"rich-combobox-font rich-combobox-button-icon rich-combobox-button",disabled:"rich-combobox-font-disabled rich-combobox-button-icon-disabled rich-combobox-button-disabled",hovered:"rich-combobox-button-hovered"},style:{normal:"",active:"",disabled:""}},buttonbg:{classes:{normal:"rich-combobox-font-inactive rich-combobox-button-background-inactive rich-combobox-button-inactive",active:"rich-combobox-font rich-combobox-button-background rich-combobox-button",disabled:"rich-combobox-font-disabled rich-combobox-button-background-disabled rich-combobox-button-disabled"}},buttonicon:{style:{normal:"",active:"",disabled:""}},field:{classes:{normal:"rich-combobox-font-inactive rich-combobox-input-inactive",active:"rich-combobox-font rich-combobox-input",disabled:"rich-combobox-font-disabled rich-combobox-input-disabled"},style:{normal:"",active:"",disabled:""}},combolist:{list:{classes:{active:"rich-combobox-list-cord rich-combobox-list-scroll rich-combobox-list-decoration rich-combobox-list-position"},style:{active:""}},item:{normal:"rich-combobox-item",selected:"rich-combobox-item rich-combobox-item-selected"}}}
},getCommonStyles:function(){return this.commonStyles
}}
;
var hack;
(function(A){this.version="(beta)(0.0.3)";
this.all={};
this.special_keys={27:"esc",9:"tab",32:"space",13:"return",8:"backspace",145:"scroll",20:"capslock",144:"numlock",19:"pause",45:"insert",36:"home",46:"del",35:"end",33:"pageup",34:"pagedown",37:"left",38:"up",39:"right",40:"down",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12"};
this.shift_nums={"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"};
this._uniqueIDIndex=1;
this._uniqueIDExpando="_jQuery_hotKeys";
this._uniqueID=function(B){var C=B[this._uniqueIDExpando];
if(!C){C=B[this._uniqueIDExpando]=this._uniqueIDIndex++
}return C
};
this._checkUniqueID=function(B){return B[this._uniqueIDExpando]
};
this.buttonInputTypes=/^(submit|button|reset)$/i;
this.add=function(C,B,I){if(A.isFunction(B)){I=B;
B={}
}var D={},F={type:"keydown",propagate:false,disableInInput:false,disableInInputTypes:"all",target:A("html")[0],checkParent:true},E=this;
D=A.extend(D,F,B||{});
C=C.toLowerCase();
var H=function(K){K=A.event.fix(K);
var P=K.target;
P=(P.nodeType==3)?P.parentNode:P;
if(D["disableInInput"]){var U=A(P);
var T=D["disableInInputTypes"];
if(U.is("input")){if("all"==T){return 
}else{if(E.buttonInputTypes.test(U.attr("type"))){if("buttons"==T){return 
}}else{if("texts"==T){return 
}}}}else{if(U.is("textarea")){if("texts"==T||"all"==T){return 
}}else{if(U.is("button")){if("buttons"==T||"all"==T){return 
}}}}}var M=K.which,W=K.type,S=String.fromCharCode(M).toLowerCase(),V=E.special_keys[M],N=K.shiftKey,J=K.ctrlKey,Q=K.altKey,R=true,L=null;
var O=function(Z,a,Y,d,c){if(!N&&!J&&!Q){var e=c[Y]||c[d]
}else{var b="";
if(Q){b+="alt+"
}if(J){b+="ctrl+"
}if(N){b+="shift+"
}var e=c[b+Y]||c[b+d]||c[b+E.shift_nums[d]]
}return e
};
if(E.all[E._checkUniqueID(P)]){var X=E.all[E._checkUniqueID(P)].events[W].callbackMap;
L=O(P,W,V,S,X)
}if(A.browser.opera||A.browser.safari||D.checkParent){while((P&&P.parentNode&&!E.all[E._checkUniqueID(P)])||(!L&&P.parentNode)){P=P.parentNode;
if(E.all[E._checkUniqueID(P)]){var X=E.all[E._checkUniqueID(P)].events[W].callbackMap;
L=O(P,W,V,S,X)
}}}if(L){L.cb(K);
if(!L.propagate){K.stopPropagation();
K.preventDefault();
return false
}}};
var G=this._uniqueID(D.target);
if(!this.all[G]){this.all[G]={events:{}}
}if(!this.all[G].events[D.type]){this.all[G].events[D.type]={callbackMap:{}};
A.event.add(D.target,D.type,H)
}this.all[G].events[D.type].callbackMap[C]={cb:I,propagate:D.propagate};
return A
};
this._deleteEmptyProperty=function(C,E){var D=C[E];
var B="";
for(B in D){break
}if(!B){delete C[E]
}};
this.remove=function(G,E){E=E||{};
target=E.target||A("html")[0];
type=E.type||"keydown";
G=G.toLowerCase();
var H=this._checkUniqueID(target);
if(H){var D=this.all[H];
if(D){var C=D["events"];
if(C){var F=C[type];
var B=F["callbackMap"];
delete B[G];
this._deleteEmptyProperty(F,"callbackMap");
this._deleteEmptyProperty(C,type);
this._deleteEmptyProperty(D,"events")
}this._deleteEmptyProperty(this.all,H)
}}return A
};
A.hotkeys=this;
return A
})(jQuery)
;
ExtDragIndicator={init:function(A){var B=RichFaces.getIEVersion();
ExtDragIndicator.isIE6=(B&&B<7)
},setContent:function(A,E,D){Element.clearChildren(this);
var C=DnD.getDnDDefaultParams(this);
if(!C){C={}
}if(D){Object.extend(C,D)
}if(!C["marker"]){if(C[A]){C["marker"]=C[A]
}else{C["marker"]=this.markers[A]
}}var B;
if(E){B=this.indicatorTemplates["single"]
}else{B=this.indicatorTemplates["multi"]
}new Insertion.Top(this,B.invoke("getContent",C).join(""));
if(ExtDragIndicator.isIE6){this.initIFrame()
}},show:function(){if(!this.floatedToBody){if(!this.realParent){this.realParent=this.parentNode;
this._nextSibling=this.nextSibling
}this.realParent.removeChild(this);
document.body.appendChild(this);
this.floatedToBody=true
}Element.show(this);
this.style.position="absolute"
},hide:function(){Element.hide(this);
this.style.position="";
this.offsets=undefined;
this.leave();
if(this.floatedToBody&&this.realParent){document.body.removeChild(this);
if(this._nextSibling){this.realParent.insertBefore(this,this._nextSibling)
}else{this.realParent.appendChild(this)
}this.floatedToBody=false
}},position:function(A,B){if(!this.offsets){Element.show(this);
this.style.position="absolute"
}Element.setStyle(this,{"left":A+"px","top":B+"px"})
},accept:function(){Element.removeClassName(this,"drgind_default");
Element.removeClassName(this,"drgind_reject");
Element.addClassName(this,"drgind_accept");
var A=this.getAcceptClass();
if(A){Element.addClassName(this,A)
}},reject:function(){Element.removeClassName(this,"drgind_default");
Element.removeClassName(this,"drgind_accept");
Element.addClassName(this,"drgind_reject");
var A=this.getRejectClass();
if(A){Element.addClassName(this,A)
}},leave:function(){Element.removeClassName(this,"drgind_accept");
Element.removeClassName(this,"drgind_default");
Element.addClassName(this,"drgind_reject");
var B=this.getAcceptClass();
var A=this.getRejectClass();
if(B){Element.removeClassName(this,B)
}if(A){Element.removeClassName(this,A)
}},getAcceptClass:function(){return this.ils_acceptClass
},getRejectClass:function(){return this.ils_rejectClass
},initIFrame:function(){var A=document.createElement("iframe");
Element.addClassName(A,"rich-dragindicator-iframe");
this.insertBefore(A,this.firstChild);
var B=A.nextSibling;
A.style.width=B.offsetWidth+"px";
A.style.height=B.offsetHeight+"px"
}};
function createExtDragIndicator(B,C,A){Object.extend(B,ExtDragIndicator);
B.init();
B.ils_acceptClass=C;
B.ils_rejectClass=A
};
if(!window.Richfaces){window.Richfaces={}
}Richfaces.ToolTip={};
ToolTip=Class.create();
ToolTip.prototype={initialize:function(K,F,A,G,H,D,J,C,I,M,L,B){this["rich:destructor"]="destroy";
this.showEvent=K.showEvent;
this.hideEvent=K.hideEvent!=""?K.hideEvent:null;
this.onshow=F.onshow;
this.oncomplete=F.oncomplete;
this.onhide=F.onhide;
this.delay=K.delay;
this.hideDelay=K.hideDelay;
this.id=A;
this.parentId=G;
this.parent=$(this.parentId);
this.mode=H;
this.direction=J;
this.disabled=D;
this.followMouse=C;
this.horizontalOffset=I;
this.verticalOffset=M;
if(L){this.ajaxExecuteFunction=(L)?L:function(){}
}this.ajaxOptions=B;
this.clientAjaxParams={};
this.toolTip=$(A);
this.toolTip.component=this;
this.toolTipContent=$(A+"content");
this.toolTipDefaultContent=$(A+"defaultContent");
this.toolTip.style.visibility="hidden";
this.toolTip.style.display="block";
this.toolTipOffsetW=this.toolTip.offsetWidth;
this.toolTipOffsetH=this.toolTip.offsetHeight;
this.toolTipW=this.toolTip.getWidth();
this.toolTipH=this.toolTip.getHeight();
this.toolTipBorderHeight=(this.toolTipOffsetH-this.toolTipH)/2;
this.toolTipBorderWidth=(this.toolTipOffsetW-this.toolTipW)/2;
this.toolTip.style.visibility="visible";
this.toolTip.style.display="none";
this.parentAttached=false;
this.hintParentElement=null;
this.isMouseOvered=false;
if(Richfaces.browser.isIE6){var E=parseInt(this.toolTip.style.zIndex);
new Insertion.Before(this.toolTip,'<iframe src="javascript:\'\'" frameborder="0" scrolling="no" id="'+this.id+'iframe"style="position: absolute; width: '+this.toolTipOffsetW+"px; height: "+this.toolTipOffsetH+"px; display: none;background-color:black; z-index: "+(E-1)+';"></iframe>');
this.iframe=$(this.id+"iframe")
}this.attachOnLoadEventsListner=this.attachOnLoadEvents.bindAsEventListener(this);
this.setToolTipPositionListner=this.setToolTipPosition.bindAsEventListener(this);
this.leaveToolTipListner=this.leaveToolTip.bindAsEventListener(this);
if(!this.disabled){Event.observe(document,"mousemove",this.attachOnLoadEventsListner,true)
}},destroy:function(){if(!this.parentAttached&&!this.disabled){Event.stopObserving(document,"mousemove",this.attachOnLoadEventsListner,true)
}if(this.toolTip){this.toolTip.component=null
}this.doDisable();
this.hintParentElement=null;
this.parent=null;
this.toolTip=null;
this.toolTipContent=null;
this.toolTipDefaultContent=null;
this.iframe=null;
this.eventCopy=null;
this.showEvent=null;
this.hideEvent=null
},attachOnLoadEvents:function(){if(!this.parentAttached){if(!this.parent){this.parent=$(this.parentId)
}if(this.parent!=null&&!this.disabled){this.attachParentEvents();
this.parentAttached=true
}Event.stopObserving(document,"mousemove",this.attachOnLoadEventsListner,true)
}},attachParentEvents:function(){if(this.followMouse){Event.observe(this.parent,"mousemove",this.setToolTipPositionListner,false)
}this.doShowListner=this.doShow.bindAsEventListener(this);
this.doHideListner=this.doHide.bindAsEventListener(this);
Event.observe(this.parent,this.showEvent,this.doShowListner,false);
if(this.showEvent!="focus"){if(this.hideEvent!=null){Event.observe(this.parent,this.hideEvent,this.doHideListner,false);
Event.observe(this.toolTip,this.hideEvent,this.leaveToolTipListner,false)
}else{Event.observe(this.parent,"mouseout",this.doHideListner,false);
Event.observe(this.toolTip,"mouseout",this.leaveToolTipListner,false)
}}else{if(this.hideEvent!=null){Event.observe(this.parent,this.hideEvent,this.doHideListner,false)
}else{Event.observe(this.parent,"blur",this.doHideListner,false)
}}},detectAncestorNode:function(A,B){var C=A;
while(C!=null&&C!=B){C=C.parentNode
}return(C!=null)
},ffcheck:function(B){var A=this.parent.tagName.toLowerCase();
if((A=="input"||A=="textarea")&&B){var C;
try{C=B.className;
if(C=="anonymous-div"){return true
}}catch(D){return true
}if(B==this.parent){return true
}}else{while(B){if(B==this.parent){return true
}B=B.parentNode
}}return false
},leaveToolTip:function(D){var B=false;
var A=D.relatedTarget||D.toElement;
var C;
if(A){try{C=A.className;
if(C!="anonymous-div"){}B=this.detectAncestorNode(A,this.hintParentElement)
}catch(D){}}if(!B){this.doHide(D);
this.isMouseOvered=false
}},doShow:function(F){if(this.disabled){return 
}if(this.activationTimerHandle){return 
}var E;
if(!F){var F=window.event
}var B=F.relatedTarget||F.fromElement;
if(this.ffcheck(B)){return 
}var C;
if(B){try{C=B.className;
if(C!="anonymous-div"){}if(this.detectAncestorNode(B,this.toolTip)){return 
}}catch(F){}}this.isMouseOvered=true;
if(F.target){this.hintParentElement=F.target
}if(F.srcElement){this.hintParentElement=F.srcElement
}if(this.hidingTimerHandle){window.clearTimeout(this.hidingTimerHandle);
this.hidingTimerHandle=undefined
}if(this.mode=="ajax"){if(this.toolTipDefaultContent){this.toolTipContent.innerHTML=this.toolTipDefaultContent.innerHTML;
this.toolTip.style.visibility="hidden";
this.toolTip.style.display="block";
this.setToolTipPosition(F)
}else{this.toolTipContent.innerHTML=""
}var D=A4J.AJAX.CloneObject(F,false);
var A=this.ajaxOptions;
if(this.clientAjaxParams){if(F.clientX){this.clientAjaxParams["clientX"]=F.clientX;
this.clientAjaxParams["clientY"]=F.clientY
}else{this.clientAjaxParams["event.pageX"]=F.pageX;
this.clientAjaxParams["event.pageY"]=F.pageY
}Object.extend(A["parameters"],this.clientAjaxParams)
}if(this.delay>0){this.setToolTipPosition(F);
this.activationTimerHandle=window.setTimeout(function(){if(this.toolTipDefaultContent){this.setToolTipVisible(false)
}this.ajaxExecuteFunction(D,A)
}.bind(this),this.delay)
}else{this.setToolTipVisible(false);
this.ajaxExecuteFunction(D,A)
}}else{this.setToolTipPosition(F);
if(this.delay>0){this.activationTimerHandle=window.setTimeout(function(){this.displayDiv()
}.bind(this),this.delay)
}else{this.displayDiv()
}}},hideDiv:function(A){this.isMouseOvered=false;
this.toolTip.style.visibility="hidden";
this.toolTip.style.display="none";
if(this.iframe){this.iframe.style.display="none"
}this.hintParentElement=null;
this.isMouseOvered=false;
if(this.onhide!=null){this.onhide(A)
}},doHide:function(D){if(this.hidingTimerHandle){return 
}this.eventCopy=null;
if(!D){var D=window.event
}var A=D.relatedTarget||D.toElement;
if(this.ffcheck(A)){return 
}var B;
if(A){try{B=A.className;
if(B!="anonymous-div"){}if(this.detectAncestorNode(A,this.toolTip)){return 
}}catch(D){}}if(this.activationTimerHandle){window.clearTimeout(this.activationTimerHandle);
this.activationTimerHandle=undefined
}if(this.hideDelay>0){var C=A4J.AJAX.CloneObject(D,false);
this.hidingTimerHandle=window.setTimeout(function(){this.hideDiv(C);
if(this.hidingTimerHandle){window.clearTimeout(this.hidingTimerHandle);
this.hidingTimerHandle=undefined
}}.bindAsEventListener(this),this.hideDelay)
}else{this.hideDiv()
}},doEnable:function(){if(!this.parentAttached){Event.observe(document,"mousemove",this.attachOnLoadEventsListner,true)
}this.disabled=false
},doDisable:function(){if(!this.parentAttached){if(!this.disabled){Event.stopObserving(document,"mousemove",this.attachOnLoadEventsListner,true)
}}else{if(this.followMouse){Event.stopObserving(this.parent,"mousemove",this.setToolTipPositionListner,false)
}Event.stopObserving(this.parent,this.event,this.doShowListner,false);
if(this.showEvent!="focus"){if(this.hideEvent!=null){Event.stopObserving(this.parent,this.hideEvent,this.doHideListner,false);
Event.stopObserving(this.toolTip,this.hideEvent,this.leaveToolTipListner,false)
}else{Event.stopObserving(this.parent,"mouseout",this.doHideListner,false);
Event.stopObserving(this.toolTip,"mouseout",this.leaveToolTipListner,false)
}}else{if(this.hideEvent!=null){Event.stopObserving(this.parent,this.hideEvent,this.doHideListner,false)
}else{Event.stopObserving(this.parent,"blur",this.doHideListner,false)
}}this.parentAttached=false
}this.disabled=true
},show:function(A){this.doShow(A)
},hide:function(A){this.doHide(A)
},enable:function(A){this.doEnable(A)
},disable:function(A){this.doDisable(A)
},PX_REGEX:/px$/,parseToPx:function(B){if(B){var A=B.strip();
if(this.PX_REGEX.test(A)){try{return parseInt(A.replace(this.PX_REGEX,""),10)
}catch(C){}}}return NaN
},setToolTipPosition:function(Q){var C=Richfaces.Position.getOffsetDimensions(this.toolTip);
var R=this.toolTip.style;
var D=R.display;
var B=R.visibility;
R.visibility="hidden";
R.display="block";
var F=this.parseToPx(R.left);
if(isNaN(F)){F=0;
R.left="0px"
}var A=this.parseToPx(R.top);
if(isNaN(A)){A=0;
R.top="0px"
}var O=jQuery.event.fix(Q);
var M=this.toolTip.offsetWidth;
var E=this.toolTip.offsetHeight;
var J=/^(top|bottom)-(left|right)$/;
var I=this.direction.match(J);
var G=I[2];
var N=I[1];
var P=this.fitToolTip(Q.clientX,Q.clientY,C,G,N,{"x":this.horizontalOffset,"y":this.verticalOffset});
var H=jQuery(this.toolTip).offset();
var L=P.x-H.left+(O.pageX-O.clientX)+F;
var K=P.y-H.top+(O.pageY-O.clientY)+A;
Element.setStyle(this.toolTip,{"left":L+"px","top":K+"px"});
if(this.iframe){this.iframe.style.top=(K-this.toolTipBorderHeight)+"px";
this.iframe.style.left=(L-this.toolTipBorderWidth)+"px";
this.iframe.style.width=M+"px";
this.iframe.style.height=E+"px"
}R.visibility=B;
R.display=D;
this.eventCopy=A4J.AJAX.CloneObject(Q,false)
},prePosition:function(C,H,E,G,B,F){var D,A;
D=G=="left"?C-E.width-F.x:C+F.x;
A=B=="top"?H-E.height-F.y:H+F.y;
return{"x":D,"y":A}
},fitToolTip:function(C,B,O,P,L,G){var E=Richfaces.Position.getWindowDimensions();
var J=C-G.x-O.width;
var K=E.width-(C+G.x+O.width);
var F=B-G.y-O.height;
var A=E.height-(B+G.y+O.height);
if(J<0){var I=E.width-(C+G.x+O.width);
if(I>0){P="right"
}else{if(I>J){P="right"
}}}else{if(K<0){var H=C-G.x-O.width;
if(H>0){P="left"
}else{if(H>K){P="left"
}}}}if(F<0){var M=E.height-(B+G.y+O.height);
if(M>0){L="bottom"
}else{if(M>F){L="bottom"
}}}else{if(A<0){var D=B-G.y-O.height;
if(D>0){L="top"
}else{if(D>A){L="top"
}}}}var N=this.prePosition(C,B,O,P,L,G);
return N
},displayDiv:function(){if(this.isMouseOvered){if(this.mode=="ajax"){this.toolTip.style.display="none";
if(this.clientAjaxParams){var B;
if(this.clientAjaxParams.clientX){B="clientX"
}else{B="pageX"
}var A;
if(this.clientAjaxParams.clientY){A="clientY"
}else{A="pageY"
}var C={};
C[B]=this.clientAjaxParams[B];
C[A]=this.clientAjaxParams[A];
this.toolTip.style.visibility="hidden";
this.toolTip.style.display="block";
this.setToolTipPosition((this.eventCopy?this.eventCopy:C))
}}if(this.onshow!=null){this.onshow(this.eventCopy)
}this.setToolTipVisible(true)
}},setToolTipVisible:function(A){this.activationTimerHandle=undefined;
this.toolTip.style.display="block";
this.toolTip.style.visibility="visible";
if(this.iframe){this.iframe.style.display="block"
}if(A){if(this.oncomplete!=null){this.oncomplete(window.event)
}}}}
;
if(!window.ExtendedDataTable){window.ExtendedDataTable={}
}ExtendedDataTable.DataTable=Class.create({initialize:function(C,A){this.id=C;
$(this.id).component=this;
this["rich:destructor"]="destroy";
this.groups=[];
this.ratios=[];
this.options=A;
this.selectionManager=new ExtendedDataTable.SelectionManager(A,this);
if(this.options.sortFunction){this.sortFct=this.options.sortFunction
}if(this.options.groupFunction){this.groupFct=this.options.groupFunction
}this.onGroupToggleFct=this.options.onGroupToggleFunction;
if(this.options.onColumnResize!=null){this.onColumnResize=this.options.onColumnResize;
this.columnWidths=""
}this.eventContainerResize=this.OnWindowResize.bindAsEventListener(this);
this.eventGroupRowClicked=this.OnGroupRowMouseClicked.bindAsEventListener(this);
Event.observe(window,"resize",this.eventContainerResize);
this.minColumnWidth=this.options.minColumnWidth;
var B=this;
Utils.execOnLoad(function(){B.update(true)
},Utils.Condition.ElementPresent(C+":od"),100)
},destroy:function(){this.selectionManager.removeListeners();
if(this.header){this.header.removeListeners()
}if(this.groupRows){var A=this.groupRows.length;
for(var B=0;
B<A;
B++){Utils.DOM.Event.removeListeners(this.groupRows[B])
}}delete this.selectionManager;
delete this.header;
delete this.footer;
$(this.id).component=null;
this.table=null;
this.splashScreen=null;
this.mainDiv=null;
this.outerDiv=null;
this.tableB=null;
this.fakeIeRow=null;
this.fakeIeBodyRow=null;
this.cols=null;
this.scrollingDiv=null;
this.groupRows=null;
this.groups=null;
Event.stopObserving(window,"resize",this.eventContainerResize)
},showRow:function(G){var F=$(this.id+":n:"+G);
var A=this.tableB.offsetTop+F.offsetTop;
var E=this.scrollingDiv.getElement().scrollTop;
var D=A-E;
if(D<0){this.scrollingDiv.getElement().scrollTop=E+D
}else{var C=this.scrollingDiv.getHeight();
var B=F.getHeight();
D=D+B-C;
if(D>0){this.scrollingDiv.getElement().scrollTop=E+D
}}},setColumnWidth:function(A,B){if(A>=this.getColumnsNumber){return false
}else{this.getColumns()[A].width=B
}},_findParentElement:function(D,B){var C=null;
if(ClientUILib.isSafari){var A=D.currentTarget;
if(A&&A.tagName.toLowerCase()==B){C=A
}else{var E=(D.target||D.srcElement);
while((E!=null)&&(E.tagName.toLowerCase()!=B)&&(E!=document)){E=E.parentNode
}if((E)&&(E.tagName.toLowerCase()==B)){C=E
}}}else{C=Event.findElement(D,B)
}return C
},preSendAjaxRequest:function(){Event.stopObserving(window,"resize",this.eventContainerResize);
this.showSplashScreen()
},showSplashScreen:function(){var A=this.splashScreen;
A.className="extdt-ss-vsbl"
},hideSplashScreen:function(){this.splashScreen.className="extdt-ss-hdn"
},sortBy:function(C,A,B){if(this.sortFct){this.preSendAjaxRequest();
if(!C){C=""
}else{if(C.indexOf(":")==-1){C=this.id+":"+C
}}this.sortFct(B,C,A)
}},groupBy:function(B,A){if(this.groupFct){this.preSendAjaxRequest();
if(!B){B=""
}else{if(B.indexOf(":")==-1){B=this.id+":"+B
}}this.groupFct(A,B)
}},OnWindowResize:function(A){if(this.table){this.calculateWidthsFromRatios();
this.updateLayout()
}},getColumnsNumber:function(){return this.columnsNumber
},getColWidth:function(A){},getColumns:function(){return this.cols
},OnGroupRowMouseClicked:function(C){var E=this._findParentElement(C,"tr");
var B=!(E.getAttribute("expanded")=="true");
var A=B?"true":"false";
var D=parseInt(E.getAttribute("groupindex"));
if(this.onGroupToggleFct){this.onGroupToggleFct(C,D)
}E.setAttribute("expanded",A);
var F=E.firstChild.firstChild.firstChild;
this.toggleImageSource(F);
this.setGroupExpanded(D,B);
Event.stop(C)
},toggleImageSource:function(C){var B=C.getAttribute("src");
var A=C.getAttribute("alternatesrc");
C.setAttribute("src",A);
C.setAttribute("alternatesrc",B)
},getColumnWidth:function(B){if((B<this.getColumnsNumber())&&(B>=0)){var A=this.getColumns()[B];
if(A.offsetWidth!=null){if(ClientUILib.isOpera){return parseInt(A.width)
}else{return A.offsetWidth
}}else{return parseInt(A.width)
}}else{return null
}},setGroupExpanded:function(B,F){var G=this.groups[B];
var I;
var H;
var A;
if(F){I="";
sBorderStyle=""
}else{I="none";
sBorderStyle="none"
}var K=G.size();
for(var E=0;
E<K;
E++){G[E].style.display=I;
if(ClientUILib.isIE){var J=G[E].childNodes;
var C=J.length;
for(var D=0;
D<C;
D++){J[D].style.borderStyle=sBorderStyle
}}}},createControls:function(){var F=this.id;
this.table=new ClientUI.common.box.Box(this.id+":tu",null,true);
var C=this.table;
this.splashScreen=$(this.id+":splashscreen");
this.mainDiv=new ClientUI.common.box.Box(this.id,null,true);
this.outerDiv=new ClientUI.common.box.Box(this.id+":od",null,true);
this.tableB=$(this.id+":n");
this.fakeIeRow=$(this.id+":fakeIeRow");
this.fakeIeBodyRow=$(this.id+":body:fakeIeRow");
this.header=new ExtendedDataTable.DataTable.header(this.id+":header",this);
this.header.minColumnWidth=this.minColumnWidth;
this.header.addListeners();
var A=$(this.id+":colgroup:body");
this.cols=A.getElementsByTagName("col");
this.columnsNumber=this.cols.length;
this.scrollingDiv=new ClientUI.common.box.Box(this.id+":sd",null,true);
this.groupRows=[];
var E=C.getElement().getElementsByTagName("tfoot");
this.footer=$(this.id+":footer");
if(ClientUILib.isOpera){this.scrollingDiv.setStyle({overflow:"scroll",width:this.mainDiv.getWidth()});
this.table.setStyle({width:this.mainDiv.getWidth()})
}var B=0;
var D=$(F+":group-row:"+B);
while(D!=null){this.groupRows[B]=D;
Utils.DOM.Event.removeListeners(D);
Utils.DOM.Event.observe(D,"click",this.eventGroupRowClicked);
B++;
D=$(F+":group-row:"+B)
}this.saveRatios()
},getScrollbarWidth:function(){var A=this.scrollingDiv.getElement();
LOG.debug("Scrolling Div offsetWidth: "+A.offsetWidth);
LOG.debug("Scrolling Div clientWidth: "+A.clientWidth);
return A.offsetWidth-A.clientWidth
},validateColumnsWidth:function(D,B){LOG.debug("firing validateColumnsWidth");
var C=0;
var G=D.length-1;
while((C<G)&&(B>0)){if(ClientUILib.isIE){var E=parseInt(this.getColumns()[C].width)-1
}else{var E=this.header.getColumnWidth(C)
}var F=E-this.minColumnWidth;
var A;
if(F>=B){A=B
}else{A=F
}this.setColumnWidth(C,E-A);
this.header.setColumnWidth(C,E-A);
B-=A;
C++
}},getFooterHeight:function(){if(this.footer){return this.footer.getHeight()
}else{return 0
}},updateLayout:function(){ClientUILib.log(ClientUILogger.INFO,"updateLayout");
var Q=this.table.getElement();
var P=this.outerDiv.getElement();
var L=this.getColumns();
var G=this.header;
var M=this.scrollingDiv;
var E=this.mainDiv.getHeight();
var N=this.mainDiv.getWidth();
var C=G.getColumnCells();
var K=Q.getElementsByTagName("tfoot");
var O=this.getFooterHeight();
var D=this.getColumnsNumber();
var I=this.header.getVisibleWidth();
var H=this.getScrollbarWidth();
var J=N-H;
for(var F=0;
F<D-1;
F++){if(this.header.isColumnWidthPercentage(F)){var B=this._percentsToPixels(this.header.getColumn(F).width,J);
this.header.setColumnWidth(F,B);
this.setColumnWidth(F,B)
}}L[D-1].width=null;
L[L.length-1].width=null;
var A=E-G.getHeight()-O-2;
A-=this.header.getCaptionHeight();
M.setStyle("height:"+A+"px;");
this._redrawTable(Q);
G.adjustSeparators();
this._redrawTable(this.tableB);
this.saveRatios();
this.hideSplashScreen()
},saveRatios:function(){LOG.debug("saveRatios");
var E=this.getColumns();
var D;
if(!this._scrollbarWidth){D=this.getScrollbarWidth();
LOG.debug("Scrollbar: "+D)
}else{D=this._scrollbarWidth;
LOG.debug("Scrollbar (cache): "+this._scrollbarWidth)
}var B=this.mainDiv.getWidth();
LOG.debug("Main DIV: "+B);
var C=B-D;
LOG.debug("Width to spread: "+C);
for(i=0;
i<E.length-1;
i++){var A=E[i].width;
if(this.header.isColumnWidthPercentage(i)){A=this._percentsToPixels(A,C)
}this.ratios[i]=A/C;
LOG.debug("Column["+i+"] ratio: "+this.ratios[i])
}},calculateWidthsFromRatios:function(){LOG.debug("firing calculateWidthsFromRatios");
var F=this.getColumns();
var E=this.getScrollbarWidth();
this._scrollbarWidth=E;
LOG.debug("Scrollbar: "+E);
var C=this.mainDiv.getWidth();
LOG.debug("Main DIV: "+C);
var D=C-E;
LOG.debug("Width to spread: "+D);
var A=0;
for(i=0;
i<F.length-1;
i++){LOG.debug("Column["+i+"] ratio: "+this.ratios[i]);
var B=Math.round(this.ratios[i]*D);
if(B<parseInt(this.minColumnWidth)){B=parseInt(this.minColumnWidth)
}LOG.debug("setting column "+i+" to width: "+B);
this.setColumnWidth(i,B);
this.header.setColumnWidth(i,B);
A+=B
}if(A>D){F[F.length-2].width-=(A-D)
}},update:function(A){this.createControls();
if(!ClientUILib.isIE){if(this.fakeIeRow){this.table.getElement().deleteRow(this.fakeIeRow.rowIndex);
this.fakeIeRow=null
}if(this.fakeIeBodyRow){this.tableB.deleteRow(this.fakeIeBodyRow.rowIndex);
this.fakeIeBodyRow=null
}}this.selectionManager.refreshEvents();
this.updateLayout();
this.selectionManager.restoreState()
},_percentsToPixels:function(A,B){var C=(A.substr(0,A.length-1)*1)/100;
return B*C
},_redrawTable:function(A){A.hide();
if(ClientUILib.isSafari){var B=A.insertRow(0);
var C=B.insertCell(0);
C.setAttribute("colspan",5);
C.innerHTML="safari-must-have-something-inserted-to-redraw-table";
A.deleteRow(B.rowIndex)
}A.show()
}});
ExtendedDataTable.DataTable.header=Class.create(ClientUI.common.box.Box,{initialize:function($super,A,C){this.extDt=C;
this.extDtId=this.extDt.id;
this.enableContextMenu=this.extDt.options.enableContextMenu;
$super(A,C,true);
this.eventSepClick=this.OnSepClick.bindAsEventListener(this);
this.eventSepMouseDown=this.OnSepMouseDown.bindAsEventListener(this);
this.eventSepMouseMove=this.OnSepMouseMove.bindAsEventListener(this);
this.eventSepMouseUp=this.OnSepMouseUp.bindAsEventListener(this);
this.eventHeaderCellMouseOver=this.OnHeaderCellMouseOver.bindAsEventListener(this);
this.eventHeaderCellMouseOut=this.OnHeaderCellMouseOut.bindAsEventListener(this);
if(this.enableContextMenu){var B=this.extDt.options.showMenuFunction;
if(B){this.showMenuFct=B;
this.menuImageMouseDown=this.OnMenuImageMouseDown.bindAsEventListener(this)
}}if(this.extDt.sortFct){this.eventHeaderCellClicked=this.OnHeaderCellMouseClicked.bindAsEventListener(this)
}this.createControl(A)
},OnHeaderCellMouseOver:function(B){if(this.enableContextMenu){var A=this.extDt._findParentElement(B,"th");
var C=$(A.id+"header:menuDiv");
C.className="extdt-menu-div-on"
}},OnHeaderCellMouseOut:function(B){if(this.enableContextMenu){var A=this.extDt._findParentElement(B,"th");
var C=$(A.id+"header:menuDiv");
C.className="extdt-menu-div-out"
}},OnHeaderCellMouseClicked:function(B){var A=this.extDt._findParentElement(B,"th");
var C=(A)?A.id:null;
if(C&&(C!="")){this.extDt.sortBy(C,null,B)
}Event.stop(B)
},getCaption:function(){return this.caption
},getCaptionHeight:function(){var A=this.getCaption();
if(A){return A.getHeight()
}else{return 0
}},addListeners:function(){var I=this.getColumnCells();
var C=I.length;
for(var D=0;
D<C-1;
D++){var H=I[D];
Utils.DOM.Event.removeListeners(H);
Utils.DOM.Event.observe(H,"mouseover",this.eventHeaderCellMouseOver);
Utils.DOM.Event.observe(H,"mouseout",this.eventHeaderCellMouseOut);
var A=H.getAttribute("sortable");
if((A)&&(A.indexOf("true")==0)){var E=$(H.id+":sortDiv");
if(E){Utils.DOM.Event.observe(E,"click",this.eventHeaderCellClicked)
}}var B=H.childElements();
if(B==null||B.size()==0){continue
}if(this.enableContextMenu){var G=B[7];
Utils.DOM.Event.removeListeners(G);
Utils.DOM.Event.observe(G,"click",this.menuImageMouseDown)
}var F=B[2];
Utils.DOM.Event.removeListeners(F);
Utils.DOM.Event.observe(F,"click",this.eventSepClick);
Utils.DOM.Event.observe(F,"mousedown",this.eventSepMouseDown);
Utils.DOM.Event.observe(F,"mousemove",this.eventSepMouseMove);
Utils.DOM.Event.observe(F,"mouseup",this.eventSepMouseUp)
}},removeListeners:function(){var D=this.getColumnCells();
var A=D.length;
for(var C=0;
C<A-1;
C++){var F=D[C];
Utils.DOM.Event.removeListeners(F);
var G=$(F.id+":sortDiv");
if(G){Utils.DOM.Event.stopObserving(G,"click")
}var B=F.childElements();
if(B==null||B.size()==0){continue
}if(this.enableContextMenu){var H=B[7];
Utils.DOM.Event.removeListeners(H)
}var E=B[2];
Utils.DOM.Event.removeListeners(E)
}},getVisibleWidth:function(){var C=0;
var A=this.getColumnsNumber();
for(var B=0;
B<A-1;
B++){C+=this.getColumnWidth(B)
}return C
},createControl:function(A){if(!A){errMsg="Invalid id specified for ExtendedDataTableGridHeader.";
throw (errMsg)
}if(!this.parseTemplate(A)){errMsg="TODO insert commnet about header structure here";
throw (errMsg)
}},parseTemplate:function(B){if(!B){return false
}this.headerRow=new ClientUI.common.box.Box(this.extDtId+":headerRow",this.getElement(),true);
this.filterRow=new ClientUI.common.box.Box(this.extDtId+":filterRow",this.getElement(),true);
this.caption=new ClientUI.common.box.Box(this.extDtId+":caption",this.getElement(),true);
var A=$(this.extDtId+":colgroup:header");
this.cols=A.getElementsByTagName("col");
this.columnsNumber=this.cols.length;
this.columnCells=this.headerRow.getElement().childElements();
return true
},getColumns:function(){return this.cols
},getColumn:function(A){if(this.isValidColumnNumber(A)){return this.cols[A]
}else{return null
}},getColumnCells:function(){return this.columnCells
},getColumnsNumber:function(){return this.columnsNumber
},setColumnWidth:function(A,B){if(A>=this.getColumnsNumber()){return false
}else{if(!B){B=null
}this.getColumns()[A].width=B
}},isValidColumnNumber:function(A){return((A<this.getColumnsNumber())&&(A>=0))
},getColumnWidth:function(B){if(this.isValidColumnNumber(B)){var A=this.getColumnCells()[B];
if(A.offsetWidth!=null){return A.offsetWidth
}else{A=this.getColumns()[B];
return parseInt(A.width)
}}else{return null
}},isColumnWidthPercentage:function(B){if(this.isValidColumnNumber(B)){var A=this.getColumns()[B];
var C=A.width;
if((!Object.isNumber(C))&&(C.indexOf("%")!=-1)){return true
}else{return false
}}else{return null
}},getHeightWithoutFacets:function(){return this.headerRow.getHeight()+this.filterRow.getHeight()
},getTotalHeight:function(){var A=this.headerRow.getHeight()+this.filterRow.getHeight();
if(this.caption){A+=this.caption.getHeight()
}return A
},OnMenuImageMouseDown:function(B){var A=this.extDt._findParentElement(B,"th");
var C=(A)?A.id:null;
if(C&&(C!="")){var D="#"+C+"menu";
D=D.replace(/:/g,"\\:");
this.showMenuFct(B,C,D)
}Event.stop(B)
},adjustSeparators:function(){var O=this.getColumnCells();
var D=O.length;
for(var E=0;
E<D-1;
E++){var N=O[E];
var B=O[E+1];
var C=N.childElements();
if(C==null||C.size()==0){continue
}var I=C[2];
var A=this.headerRow.getHeight();
var H=this.headerRow.getY();
I.columnIndex=E;
var G=I.getWidth()/2+1;
var F=C[3];
var M=C[5];
var J=C[7];
var K=B.offsetLeft-G;
I.setStyle({height:A+"px",top:H+"px",left:K+"px"});
J.setStyle({top:H+"px",left:(B.offsetLeft-J.offsetWidth-1)+"px"});
var L=parseInt(N.getWidth()/2);
F.setStyle({top:H+"px",left:(N.offsetLeft)+"px",height:A+"px",width:L+"px"});
M.setStyle({top:H+"px",left:(N.offsetLeft+L)+"px",height:A+"px",width:L+"px"})
}this.lastColWidth=this.extDt.getColumnWidth(this.getColumnsNumber()-1);
if(ClientUILib.isIE){this.lastColWidth-=15
}},OnSepClick:function(A){Event.stop(A);
this.dragColumnInfo.mouseDown=false
},OnSepMouseDown:function(B){Event.stop(B);
this.dragColumnInfo={srcElement:Event.element(B),dragStarted:false,mouseDown:true,startX:Event.pointerX(B),originalX:0};
var A=this.dragColumnInfo.srcElement;
this.maxDelta=this.getColumnWidth(this.getColumnsNumber()-1);
this.maxDelta-=this.extDt.getScrollbarWidth();
if(ClientUILib.isOpera){this.maxDelta-=1
}this.minDelta=this.minColumnWidth-this.getColumnWidth(A.columnIndex);
Event.observe(document,"mousemove",this.eventSepMouseMove,true);
Event.observe(document,"mouseup",this.eventSepMouseUp,true)
},_showSplitter:function(A){if(!this.columnSplitter){this._createSplitter()
}var B=this.dragColumnInfo.srcElement.offsetLeft;
B+=6;
this.dragColumnInfo.originalX=B;
this.columnSplitter.show();
this.columnSplitter.setHeight(this.extDt.scrollingDiv.getHeight()+this.getHeightWithoutFacets());
this.columnSplitter.moveTo(B,this.headerRow.getY())
},_hideSplitter:function(){if(this.columnSplitter){this.columnSplitter.hide()
}},_createSplitter:function(){this.columnSplitter=new ClientUI.common.box.Box(this.extDtId+":cs",this.extDt.grid);
this.columnSplitter.makeAbsolute();
this.columnSplitter.setWidth(this.minColumnWidth)
},OnSepMouseUp:function(C){Event.stop(C);
Event.stopObserving(document,"mousemove",this.eventSepMouseMove);
Event.stopObserving(document,"mouseup",this.eventSepMouseUp);
if(this.dragColumnInfo&&this.dragColumnInfo.dragStarted){this.dragColumnInfo.dragStarted=false;
this.dragColumnInfo.mouseDown=false;
var D=Event.pointerX(C)-this.dragColumnInfo.startX;
if(D<this.minDelta){D=this.minDelta
}if(D>this.maxDelta){D=this.maxDelta
}var A=this.dragColumnInfo.srcElement.columnIndex;
var B=this.getColumnWidth(A)+D;
this.extDt.setColumnWidth(A,B);
this.setColumnWidth(A,B);
this.extDt.updateLayout();
if(this.extDt.onColumnResize){this.extDt.columnWidths="";
for(i=0;
i<this.columnsNumber;
i++){this.extDt.columnWidths+=""+this.getColumnWidth(i)+";"
}this.extDt.onColumnResize(C,this.extDt.columnWidths)
}}this._hideSplitter()
},OnSepMouseMove:function(C){if(this.dragColumnInfo&&this.dragColumnInfo.mouseDown){if(!this.dragColumnInfo.dragStarted){this.dragColumnInfo.dragStarted=true;
this._showSplitter(this.dragColumnInfo.srcElement.columnIndex)
}var D=Event.pointerX(C)-this.dragColumnInfo.startX;
if(D<this.minDelta){D=this.minDelta
}if(D>this.maxDelta){D=this.maxDelta
}var A=this.dragColumnInfo.originalX+D;
var B=A-this.minColumnWidth-6;
this.columnSplitter.moveToX(B);
Event.stop(C)
}}});
ExtendedDataTable.Selection=Class.create({initialize:function(){this.ranges=[]
},addId:function(B){B=parseInt(B);
if(this.isSelectedId(B)){return 
}var A=0;
while(A<this.ranges.length&&B>=this.ranges[A++].indexes[1]){}A--;
if(this.ranges[A-1]&&B==(this.ranges[A-1].indexes[1]+1)){if(B==(this.ranges[A].indexes[0]-1)){this.ranges[A-1].indexes[1]=this.ranges[A].indexes[1];
this.removeRange(A)
}else{this.ranges[A-1].indexes[1]++
}}else{if(this.ranges[A]){if(this.ranges[A]&&B==(this.ranges[A].indexes[0]-1)){this.ranges[A].indexes[0]--
}else{if(B==(this.ranges[A].indexes[1]+1)){this.ranges[A].indexes[1]++
}else{if(B<this.ranges[A].indexes[1]){this.addRange(A,new ExtendedDataTable.Range(B,B))
}else{this.addRange(A+1,new ExtendedDataTable.Range(B,B))
}}}}else{this.addRange(A,new ExtendedDataTable.Range(B,B))
}}},addRange:function(B,A){var C=this.ranges.push(A)-2;
if(B>=0){while(C>=B){this.ranges[C+1]=this.ranges[C--]
}this.ranges[C+1]=A
}},removeRange:function(A){var B=A+1;
while(B!=this.ranges.length){this.ranges[B-1]=this.ranges[B++]
}this.ranges.pop()
},isSelectedId:function(B){var A=0;
while(A<this.ranges.length&&B>=this.ranges[A].indexes[0]){if(B>=this.ranges[A].indexes[0]&&B<=this.ranges[A].indexes[1]){return true
}else{A++
}}return false
},getSelectedIdsQuantity:function(){var C=0;
var A=this.ranges.length;
for(var B=0;
B<A;
B++){C+=this.ranges[B].size()
}return C
},size:function(){return this.getSelectedIdsQuantity()
},removeId:function(B){B=parseInt(B);
if(!this.isSelectedId(B)){return 
}var A=0;
while(A<this.ranges.length&&B>this.ranges[A++].indexes[1]){}A--;
if(this.ranges[A]){if(B==(this.ranges[A].indexes[1])){if(B==(this.ranges[A].indexes[0])){this.removeRange(A)
}else{this.ranges[A].indexes[1]--
}}else{if(B==(this.ranges[A].indexes[0])){this.ranges[A].indexes[0]++
}else{this.addRange(A+1,new ExtendedDataTable.Range(B+1,this.ranges[A].indexes[1]));
this.ranges[A].indexes[1]=B-1
}}}},getState:function(){var A=this.clone();
return{size:function(){return A.size()
},each:function(B){A.each(B)
},isSelected:function(B){return A.isSelectedId(B)
},equals:function(C){var B=A.size()==C.size();
if(B){A.each(function(D){if(B){B=C.isSelected(D)
}})
}return B
}}
},clone:function(){var B=Object.extend(new Object(),this);
var A=B.ranges.length;
B.ranges=new Array(A);
for(var C=0;
C<A;
C++){B.ranges[C]=this.ranges[C].clone()
}return B
},each:function(C){var A=this.ranges.length;
for(var B=0;
B<A;
B++){this.ranges[B].each(C)
}},getRanges:function(){return this.ranges
},setRanges:function(A){this.ranges=A
},initRanges:function(D){if(D.length==0){this.ranges=[];
return 
}this.ranges=new Array(D.length);
var A;
var B=this.ranges.length;
for(var C=0;
C<B;
C++){A=D[C].split(",");
this.ranges[C]=new ExtendedDataTable.Range(parseInt(A[0]),parseInt(A[1]))
}},inspectRanges:function(){var A=this.getRanges();
var B="";
A.each(function(C){B+=C.inspect()
});
return B
},isChanged:function(B,A){return !B.equals(A)
},isInRange:function(A,B){return B>=A[0]&&B<=A[1]
}});
ExtendedDataTable.Range=Class.create({initialize:function(B,A){this.indexes=[B,A]
},inspect:function(){return this.indexes[0]+","+this.indexes[1]+";"
},toString:function(){return this.inspect()
},size:function(){return this.indexes[1]-this.indexes[0]+1
},each:function(B){var A=this.indexes[0];
while(A<=this.indexes[1]){B(A++)
}},clone:function(){var A=Object.extend(new Object(),this);
A.indexes=this.indexes.clone();
return A
}});
ExtendedDataTable.SelectionManager=Class.create({initialize:function(B,A){this.dataTable=A;
this.options=B;
this.selectionFlag;
this.firstIndex;
this.activeRow=-1;
var C=B.gridId;
this.gridElement=document.getElementById(C+":n");
this.prefix=B.gridId;
this.selection=new ExtendedDataTable.Selection();
this.inputElement=B.selectionInput;
this.onselectionchange=B.onselectionchange;
this.selectedClass=B.selectedClass;
this.activeClass=B.activeClass
},refreshEvents:function(){this.setListeners();
if(this.options.selectionMode!="none"){this.eventKeyPress=this.processKeyDown.bindAsEventListener(this);
Event.observe(document,"keydown",this.eventKeyPress)
}A4J.AJAX.AddListener({onafterajax:function(B,A,C){if(!$(this.prefix+":n")){Event.stopObserving(document,"keydown",this.eventKeyPress)
}}.bind(this)});
if(document.selection){this.eventResetSelection=this.resetSelection.bindAsEventListener(this);
Event.observe(this.gridElement,"click",this.eventResetSelection)
}this.eventLostFocus=this.processLostFocus.bindAsEventListener(this);
Event.observe(document,"click",this.eventLostFocus);
this.eventPreventLostFocus=this.processPreventLostFocus.bindAsEventListener(this);
Event.observe(this.gridElement,"click",this.eventPreventLostFocus)
},restoreState:function(){this.selectionFlag=null;
var E=$(this.inputElement).value.split(";");
var D=NaN;
while(E.length!=0&&E[E.length-1].indexOf(",")==-1&&isNaN(D=Number(E.pop()))){}if(!isNaN(D)){this.setActiveRow(D)
}this.selection.initRanges(E);
var C=0;
var A;
while(C<this.selection.ranges.length){A=this.selection.ranges[C].indexes[0];
while(A<=this.selection.ranges[C].indexes[1]){var B=$(this.prefix+":n:"+A);
Element.addClassName(B,"extdt-row-selected");
Element.addClassName(B,"rich-sdt-row-selected");
Element.addClassName(B,this.selectedClass);
A++
}C++
}this.oldState=this.selection.getState()
},setListeners:function(){var H=$(this.prefix+":n").rows;
this.rowCount=H.length;
var L;
var B=$(this.prefix+":group-row:0")!=null;
if(!B){if(this.options.selectionMode!="none"){for(var Q=0;
Q<this.rowCount;
Q++){var A=H[Q].id.split(":");
L=Number(A[A.length-1]);
this.addListener(H[Q],L)
}}}else{var F;
var E=0;
var C=true;
var M=false;
if(ClientUILib.isIE){M=true
}var J;
var K=[];
var I=0;
var S=[];
var T=this.dataTable.groupRows;
for(var Q=0;
Q<this.rowCount;
Q++){tempo=H[Q].id.split(this.prefix)[1];
var D=tempo.split(":");
F=D[1]=="group-row";
J=Number(D[2]);
if(F){S[E]=K;
C=(T[J].getAttribute("expanded")=="true");
var P=T[E].lastChild.lastChild;
var R=document.createTextNode("("+K.size()+")");
if(P.lastChild){P.replaceChild(R,P.lastChild)
}else{P.appendChild(R)
}I=0;
K=[];
E=J
}else{if(this.options.selectionMode!="none"){var A=H[Q].id.split(":");
L=Number(A[A.length-1]);
this.addListener(H[Q],L)
}K[I++]=H[Q];
if((Q==0)&&(M)){}if(!C){H[Q].style.display="none";
if((ClientUILib.isIE)&&(Q!=0)){var G=H[Q].childNodes;
var N=G.length;
for(var O=0;
O<N;
O++){G[O].style.borderStyle="none"
}}}}}S[E]=K;
var P=T[E].lastChild.lastChild;
var R=document.createTextNode("("+K.size()+")");
if(P.lastChild){P.replaceChild(R,P.lastChild)
}else{P.appendChild(R)
}this.dataTable.groups=S
}},addListener:function(B,C){if(B){var A=this.processClick.bindAsEventListener(this,C);
Utils.DOM.Event.removeListeners(B);
Utils.DOM.Event.observe(B,"click",A)
}},removeListeners:function(){Event.stopObserving(document,"keydown",this.eventKeyPress);
if(document.selection){Event.stopObserving(this.gridElement,"click",this.eventResetSelection)
}Event.stopObserving(document,"click",this.eventLostFocus);
Event.stopObserving(this.gridElement,"click",this.eventPreventLostFocus);
if(this.options.selectionMode!="none"){var C=$(this.prefix+":n").rows;
var A=C.length;
for(var B=0;
B<this.rowCount;
B++){Utils.DOM.Event.removeListeners(C[B])
}}},processPreventLostFocus:function(){this.inFocus=true;
this.preventLostFocus=true
},processLostFocus:function(){if(!this.preventLostFocus){this.lostFocus()
}else{this.preventLostFocus=false
}},lostFocus:function(){this.inFocus=false
},processKeyDown:function(F){if($(this.prefix+":n").rows.length>0){if(!F.shiftKey){this.shiftRow=null
}var B,G;
var E=this.activeRow;
var D=false;
var A=$(this.prefix+":n").rows[0].id.split(":");
this.firstIndex=Number(A[A.length-1]);
switch(F.keyCode||F.charCode){case Event.KEY_UP:if(this.inFocus&&E!=null){if(this.firstIndex!=E){G=(this.rowCount+E-1)%this.rowCount;
if(!F.ctrlKey&&!F.shiftKey){this.selectionFlag="x";
B=[G,G];
this.setSelection(B)
}else{if(!F.ctrlKey&&F.shiftKey&&this.options.selectionMode=="multi"){if(!this.shiftRow){this.shiftRow=this.activeRow
}if(this.shiftRow>=this.activeRow){this.addRowToSelection(G)
}else{this.removeRowFromSelection(E)
}}}D=true;
this.setActiveRow(G)
}else{}}break;
case Event.KEY_DOWN:if(this.inFocus&&E!=null){G=(E+1)%this.rowCount;
if(this.firstIndex!=G){if(!F.ctrlKey&&!F.shiftKey){this.selectionFlag="x";
B=[G,G];
this.setSelection(B)
}else{if(!F.ctrlKey&&F.shiftKey&&this.options.selectionMode=="multi"){if(!this.shiftRow){this.shiftRow=this.activeRow
}if(this.shiftRow<=this.activeRow){this.addRowToSelection(G)
}else{this.removeRowFromSelection(E)
}}}D=true;
this.setActiveRow(G)
}else{}}break;
case 65:case 97:if(this.inFocus&&F.ctrlKey&&!F.altKey){this.selectionFlag="a";
for(var C=0;
C<this.rowCount;
C++){this.addRowToSelection(C)
}D=true
}break;
case Event.KEY_TAB:this.lostFocus()
}if(D){this.dataTable.showRow(this.activeRow);
this.selectionChanged(F);
if(F.preventBubble){F.preventBubble()
}Event.stop(F)
}}},processClick:function(E,F){if(this.options.selectionMode=="none"){return 
}var D=this.options.selectionMode=="single";
if(!E.shiftKey){this.shiftRow=null
}var B;
if(E.shiftKey&&!E.ctrlKey&&!D&&!E.altKey){var A=$(this.prefix+":n").rows[0].id.split(":");
this.firstIndex=Number(A[A.length-1]);
this.selectionFlag="x";
if(!this.shiftRow){this.shiftRow=this.activeRow
}this.startRow=this.shiftRow;
if(((this.startRow<=F)&&(this.firstIndex<=this.startRow||F<this.firstIndex))||(this.startRow>F&&this.firstIndex<this.startRow&&F<=this.firstIndex)){this.endRow=F
}else{this.endRow=this.startRow;
this.startRow=F
}if(this.startRow>this.endRow){var C=this.startRow;
this.startRow=this.endRow;
this.endRow=C
}B=[this.startRow,this.endRow];
this.setSelection(B)
}else{if(!E.shiftKey&&E.ctrlKey&&!E.altKey){if(this.selection.isSelectedId(F)){this.removeRowFromSelection(F)
}else{if(!D||this.selection.size()==0){this.addRowToSelection(F)
}}}else{if(!E.shiftKey&&!E.ctrlKey&&!E.altKey){this.selectionFlag="x";
B=[F,F];
this.setSelection(B)
}}}this.setActiveRow(F);
if(E.shiftKey){if(window.getSelection){window.getSelection().removeAllRanges()
}else{if(document.selection){document.selection.empty()
}}}this.selectionChanged(E)
},selectionChanged:function(A){$(this.inputElement).value=this.selection.inspectRanges()+this.activeRow+";"+(this.selectionFlag?this.selectionFlag:"");
var B=this.selection.getState();
A.oldSelection=this.oldState;
A.newSelection=B;
if(this.onselectionchange&&this.selection.isChanged(this.oldState,B)){this.onselectionchange(A)
}this.oldState=B
},setShiftRow:function(A){if(A.shiftKey){if(!this.shiftRow){this.shiftRow=this.activeRow
}}else{this.shiftRow=null
}},setSelection:function(B){var A=this.selection.ranges.length;
for(var D=A-1;
D>=0;
D--){var E=this.selection.ranges[D].indexes;
if(E==B){continue
}var C=E[0];
for(C;
C<=E[1];
C++){this.removeRowFromSelection(C)
}}if(B[0]==B[1]){this.addRowToSelection(B[0]);
return 
}var D=B[0];
B[1]=(B[1]+1)%this.rowCount;
while(D!=B[1]){this.addRowToSelection(D);
D=(D+1)%this.rowCount
}},resetSelection:function(A){if(A.shiftKey){document.selection.empty()
}},addRowToSelection:function(B){this.selection.addId(B);
var A=$(this.prefix+":n:"+B);
Element.addClassName(A,"extdt-row-selected");
Element.addClassName(A,"rich-sdt-row-selected");
Element.addClassName(A,this.selectedClass)
},removeRowFromSelection:function(B){this.selection.removeId(B);
var A=$(this.prefix+":n:"+B);
Element.removeClassName(A,"extdt-row-selected");
Element.removeClassName(A,"rich-sdt-row-selected");
Element.removeClassName(A,this.selectedClass)
},setActiveRow:function(C){var B,A;
if(this.activeRow!=null){A=$(this.prefix+":n:"+this.activeRow);
Element.removeClassName(A,"extdt-row-active");
Element.removeClassName(A,"rich-sdt-row-active");
Element.removeClassName(A,this.activeClass)
}A=$(this.prefix+":n:"+C);
Element.addClassName(A,"extdt-row-active");
Element.addClassName(A,"rich-sdt-row-active");
Element.addClassName(A,this.activeClass);
this.activeRow=C
}})
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.PanelBar=Class.create();
Richfaces.PanelBar.prototype={initialize:function(B,A){this.panel=$(B);
if(!this.panel){return 
}this.panel.component=this;
this["rich:destructor"]="destroy";
this.hclient=0;
this.COUNT=0;
this.STEP=0;
this.slides=new Array();
this.ch=this.panel.clientHeight;
this.options=A;
this.onitemchange=A.onitemchange;
this.onclick=A.onclick;
this.items=A.items;
this._attachBehaviors();
this.input=$(B+"_panelBarInput");
this.defaultIndex=this.findPanelById($F(B+"_panelBarInput"));
this.handleOnLoadBound=this.handleOnLoad.bind(this);
if(!A.ajax){Event.observe(window,"load",this.handleOnLoadBound)
}else{this.handleOnLoad()
}this.mouseover=A.mouseover;
this.mouseout=A.mouseout;
this.mousemove=A.mousemove;
if(this.mouseover&&this.mouseover!=""){Event.observe(this.panel,"mouseover",new Function("event",this.mouseover))
}if(this.mouseout&&this.mouseout!=""){Event.observe(this.panel,"mouseout",new Function("event",this.mouseout))
}if(this.mousemove&&this.mousemove!=""){Event.observe(this.panel,"mousemove",new Function("event",this.mousemove))
}this.showSlide(this.slides[this.defaultIndex]);
this.contentHight=-1
},destroy:function(){Event.stopObserving(window,"load",this.handleOnLoadBound);
if(this.panel){this.panel.component=undefined
}if(this.timer){clearTimeout(this.timer);
this.timer=undefined
}},handleOnLoad:function(){Event.stopObserving(window,"load",this.handleOnLoadBound);
if(this.timer){clearTimeout(this.timer)
}if(this.panel.clientHeight<=0){this.contentHight=-1;
this.timer=setTimeout(this.handleOnLoadBound,100)
}this.showSlide(this.slides[this.defaultIndex])
},getContentHeight:function(){if(this.contentHight){}else{this.contentHight=-1
}if(this.contentHight<=-1){var B=0;
this.hclient=0;
for(var A=0;
A<this.slides.length;
A++){B+=this.slides[A].item.offsetHeight
}this.hclient=B;
this.contentHight=this.panel.clientHeight-B
}return this.contentHight
},showSlide:function(A){if(this.current){this.current.hideContent()
}var B=this.getContentHeight();
if(this.current){this.current.hideHeader()
}A.content.style.height=(B>0?B:0)+"px";
if(B<=1&&(this.panel.style.height==""||this.panel.style.height.indexOf("%")!=-1)){this.panel.style.height="";
A.content.style.height="100%"
}A.showContent();
this.current=A;
this.input.value=this.current.item.id;
this.firstLoad=false
},_attachBehaviors:function(){var C=this._getItems(this.panel);
for(var B=0;
B<C.length;
B++){var A=this._getDirectChildrenByTag(C[B],"DIV");
this.slides.push(new Richfaces.PanelBar.Slide(this,C[B],A[0],A[1],A[2],B,this.onclick))
}},_getItems:function(D){var B=new Array();
var C=Richfaces.firstDescendant(D);
var A=0;
var E=this.items[A].id;
do{if(C.id==E){B.push(C);
A++;
if(A<this.items.length){E=this.items[A].id
}else{break
}}}while(C=C.nextSibling);
return B
},_getDirectChildrenByTag:function(F,D){var B=new Array();
var A=F.childNodes;
for(var C=0;
C<A.length;
C++){var E=A[C];
if(E&&E.tagName&&E.tagName.toUpperCase()==D.toUpperCase()){B.push(E)
}}return B
},findPanelById:function(B){for(var A=0;
A<this.slides.length;
A++){if(this.slides[A].item.id==B){return A
}}return 0
},invokeEvent:function(F,A,I,C,E,B,D){var J;
if(B){var H;
if(A){H=A
}else{if(document.createEventObject){H=document.createEventObject()
}else{if(document.createEvent){H=document.createEvent("Events");
H.initEvent(F,true,false)
}}}H.rich={component:this};
H.rich.enterElement=I;
H.rich.leaveElement=C;
try{J=B.call(E,H)
}catch(G){LOG.warn("Exception: "+G.Message+"\n[on"+F+"]")
}}if(J!=false){J=true
}return J
}};
Richfaces.PanelBar.Slide=Class.create();
Richfaces.PanelBar.Slide.prototype={initialize:function(F,E,G,A,D,C,B){this.index=C;
this.slidePanel=F;
this.item=E;
this.header=G;
this.header_act=A;
this.content=D;
this.onclick=B;
Event.observe(this.header,"click",this.headerOnClick.bindAsEventListener(this));
Event.observe(this.header,"selectstart",this.headerOnSelectStart.bindAsEventListener(this));
Event.observe(this.header_act,"click",this.headerOnClick.bindAsEventListener(this));
Event.observe(this.header_act,"selectstart",this.headerOnSelectStart.bindAsEventListener(this));
this.content.style.display="none";
this.content.style.overflow="auto";
this.content.style.height="0px";
this.hightFirefoxDelta=0;
if(this.onclick&&this.onclick!=""){this.onclickFunction=new Function("event",this.onclick)
}},showContent:function(){this.content.style.display="block";
Richfaces.firstDescendant(this.content).style.height="";
this.header.style.display="none";
this.header_act.style.display=""
},hideContent:function(){this.content.style.display="none";
Richfaces.firstDescendant(this.content).style.height="100%"
},hideHeader:function(){this.header_act.style.display="none";
this.header.style.display=""
},headerOnClick:function(H){if(this.onclickFunction){var A=this.onclickFunction(H);
if(A==false){return false
}}if(this.content.style.display=="block"){return 
}var G=this.item;
var E=this.slidePanel.current.item;
var C=this.slidePanel.items[this.index];
var F;
var B=this.slidePanel.items;
for(var D=0;
D<B.length;
D++){if(this.slidePanel.items[D].id==E.id){F=this.slidePanel.items[D]
}}if(!this.slidePanel.invokeEvent("onenter",H,E,G,G,C.onenter)){return false
}if(!this.slidePanel.invokeEvent("onleave",H,E,G,E,F.onleave)){return false
}if(!this.slidePanel.invokeEvent("onchangeitem",H,E,G,this.slidePanel.panel,this.slidePanel.onitemchange)){return false
}this.slidePanel.showSlide(this);
this.slidePanel.panel.style.maxHeight="";
this.slidePanel.panel.style.minHeight=""
},headerOnSelectStart:function(){return false
}}
;
ClientUILib.declarePackage("ClientUI.controls.grid.DataModel");
ClientUI.controls.grid.DataModel=Class.create({initialize:function(){},getRow:function(A){return[]
},getCount:function(){return 0
},loadRows:function(A){this.eventDataReady.fire(A)
},getRequestDelay:function(){return 1000
}});
ClientUILib.declarePackage("ClientUI.controls.grid.ArrayDataModel");
ClientUILib.requireClass("ClientUI.controls.grid.DataModel");
ClientUI.controls.grid.ArrayDataModel=Class.create(ClientUI.controls.grid.DataModel,{initialize:function($super,A){$super();
this.data=$A(A||[])
},getRow:function(A){return this.data[A]
},getCount:function(){return this.data.length
},getRequestDelay:function(){return 50
}});
ClientUILib.declarePackage("ClientUI.controls.grid.FakeArrayDataModel ");
ClientUI.controls.grid.FakeArrayDataModel=Class.create(ClientUI.controls.grid.DataModel,{initialize:function($super,A,B,C){$super();
this.data=[];
this.count=A;
this.columns=B;
this.gridId=C;
this.curr_options
},getRow:function(A){if(!this.data[A]){this.data[A]=[];
for(var B=0;
B<7;
B++){this.data[A][B]=B+" : "+A
}this.data[A][6]=A%2?"value 1":"value 2"
}return this.data[A]
},getCount:function(){return this.count
},getRequestDelay:function(){return 150
},getCurrentOptions:function(){if(!this.curr_options){this.curr_options={count:grid.getBody().templFrozen.getElement().rows.length,index:0,startRow:0}
}return this.curr_options
},loadRows:function(B){window.loadingStartTime=(new Date()).getTime();
var C=B;
var A=$(this.gridId+"_state_input");
var D=$(this.gridId+"_submit_input");
var E=C.count+","+C.index+","+C.startRow;
A.value=E;
this.curr_options=B;
D.click()
}});
ClientUILib.declarePackage("ClientUI.layouts.LayoutManager");
ClientUI.layouts.LayoutManager=Class.create(ClientUI.common.box.Box,{initialize:function($super,B,A){$super(B,A);
this.container=A;
if(this.container){this.container=new ClientUI.common.box.Box($(this.container))
}this.eventContainerResize=this.containerResize.bindAsEventListener(this);
this.registerEvents()
},registerEvents:function(){Event.observe(window,"resize",this.eventContainerResize)
},destroy:function(){Event.stopObserving(window,"resize",this.eventContainerResize)
},containerResize:function(A){this.updateLayout()
},updateLayout:function($super){if(this.container){var A=this.container.getWidth();
var B=this.container.element.offsetHeight;
if(ClientUILib.isGecko){A-=this.container.getBorderWidth("lr")+this.container.getPadding("lr");
B-=this.container.getBorderWidth("tb")+this.container.getPadding("tb")
}this.setWidth(A);
this.setHeight(B)
}$super()
},getContainer:function(){return this.container
}});
ClientUILib.declarePackage("ClientUI.layouts.VLayoutManager");
ClientUILib.requireClass("ClientUI.common.box.Box");
ClientUILib.requireClass("ClientUI.layouts.LayoutManager");
var GridLayout_Enum={HEADER:1,BODY:2,FOOTER:3};
ClientUI.layouts.VLayoutManager=Class.create(ClientUI.layouts.LayoutManager,{initialize:function($super,C,A,B){$super(C,A);
this.registerEvents()
},registerEvents:function($super){$super()
},destroy:function($super){$super()
},addPane:function(B,A){if(!this.panels){this.panels=[]
}this.panels[B]=A;
this.panels[B].makeAbsolute()
},getPane:function(A){return this.panels[A]
},updateLayout:function($super){$super();
var F=this.getContainer();
if(!F){F=this
}var B=F.element.offsetHeight;
var E=F.getViewportWidth();
if(ClientUILib.isGecko){E-=F.getBorderWidth("lr")+F.getPadding("lr");
B-=F.getBorderWidth("tb")+F.getPadding("tb")
}if(this.panels){var C=0;
var D=0;
if(this.panels[GridLayout_Enum.HEADER]){C=this.panels[GridLayout_Enum.HEADER].element.offsetHeight;
this.panels[GridLayout_Enum.HEADER].moveTo(0,0);
this.panels[GridLayout_Enum.HEADER].setWidth(E);
this.panels[GridLayout_Enum.HEADER].updateLayout()
}if(this.panels[GridLayout_Enum.FOOTER]){D=this.panels[GridLayout_Enum.FOOTER].element.offsetHeight;
this.panels[GridLayout_Enum.FOOTER].moveTo(0,B-D);
this.panels[GridLayout_Enum.FOOTER].setWidth(E);
this.panels[GridLayout_Enum.FOOTER].updateLayout()
}if(this.panels[GridLayout_Enum.BODY]){var A=this.panels[GridLayout_Enum.BODY];
A.setWidth(E);
var G=B-(C+D);
A.setHeight(G);
A.moveTo(0,C);
A.updateLayout()
}}}});
if(!ClientUI_layouts_VLayoutManager_idGenerator){var ClientUI_layouts_VLayoutManager_idGenerator=0
}ClientUILib.declarePackage("ClientUI.layouts.GridLayoutManager");
ClientUILib.requireClass("ClientUI.common.box.Box");
ClientUILib.requireClass("ClientUI.layouts.VLayoutManager");
ClientUILib.requireClass("ClientUI.layouts.LayoutManager");
var GridLayout_Enum={HEADER:1,BODY:2,FOOTER:3};
ClientUI.layouts.GridLayoutManager=Class.create(ClientUI.layouts.VLayoutManager,{initialize:function($super,C,A,B){$super(C,A)
},updateLayout:function(){ClientUI.layouts.LayoutManager.prototype.updateLayout.call(this);
var G=this.getContainer();
if(G==null){G=this
}var C=G.element.offsetHeight;
var F=G.getViewportWidth();
if(this.panels){var D=0;
var E=0;
var B=0;
if(this.panels[GridLayout_Enum.HEADER]){D=this.panels[GridLayout_Enum.HEADER].element.offsetHeight;
this.panels[GridLayout_Enum.HEADER].moveTo(0,0);
this.panels[GridLayout_Enum.HEADER].setWidth(F);
this.panels[GridLayout_Enum.HEADER].updateLayout()
}if(this.panels[GridLayout_Enum.BODY]){var A=this.panels[GridLayout_Enum.BODY];
A.setWidth(F);
var H=C-D;
A.setHeight(H);
A.moveTo(0,D);
A.updateLayout();
B=A.getY()+A.contentBox.getY()+A.scrollBox.getViewportHeight()
}if(this.panels[GridLayout_Enum.FOOTER]){E=this.panels[GridLayout_Enum.FOOTER].element.offsetHeight;
this.panels[GridLayout_Enum.FOOTER].moveTo(0,B-E);
this.panels[GridLayout_Enum.FOOTER].setWidth(F);
this.panels[GridLayout_Enum.FOOTER].updateLayout()
}}}});
ClientUILib.declarePackage("ClientUI.controls.grid.GridHeader");
ClientUILib.requireClass("ClientUI.common.box.Box");
ClientUILib.requireClass("ClientUI.common.box.InlineBox");
ClientUI.controls.grid.GridHeader=Class.create(ClientUI.common.box.Box,{initialize:function($super,B,A){this.grid=A;
this.gridId=this.grid.getElement().id;
this.normalizedId=this.grid.options.normalizedId;
$super(B);
this.eventSepClick=this.OnSepClick.bindAsEventListener(this);
this.eventSepMouseDown=this.OnSepMouseDown.bindAsEventListener(this);
this.eventSepMouseUp=this.OnSepMouseUp.bindAsEventListener(this);
this.eventSepMouseMove=this.OnSepMouseMove.bindAsEventListener(this);
this.eventCellMouseDown=this.OnCellMouseDown.bindAsEventListener(this);
Event.observe(document,"mousemove",this.eventSepMouseMove,true);
Event.observe(document,"mouseup",this.eventSepMouseUp,true);
this.createControl(B)
},createControl:function(A){var B="";
if(!A){B="Invalid template specified for GridHeader.";
ClientUILib.log(ClientUILogger.ERROR,B);
throw (B)
}if(!this.parseTemplate(A)){B="Unable to parse template. GridHeader requires template specified over table element with one row.";
ClientUILib.log(ClientUILogger.ERROR,B);
throw (B)
}this.controlCreated=true;
this.agjustSeparators()
},parseTemplate:function(N){if(!N){return false
}var L=N.childNodes;
for(var H=0;
H<L.length;
H++){if(L[H].tagName&&L[H].tagName.toLowerCase()=="div"){this.container=$(L[H]);
this.container.setStyle({"z-index":100});
break
}}var K=null,C=null;
var L=this.container.childNodes;
for(var H=0;
H<L.length;
H++){if(L[H].id&&L[H].id.indexOf("FrozenBox")>=0){C=L[H]
}else{if(L[H].id&&L[H].id.indexOf("NormalBox")>=0){K=L[H]
}}}if(!K||!C){errMsg="Unable to parse template for GridHeader. Unable to find FrozenBox or NormalBox.";
ClientUILib.log(ClientUILogger.ERROR,errMsg);
throw (errMsg)
}this.contentBox=new ClientUI.common.box.Box(K);
this.frozenContentBox=new ClientUI.common.box.Box(C);
var D=this.contentBox.getElement().firstChild;
while(D){if(D.tagName&&D.tagName.toLowerCase()=="table"){this.headerRow=new ClientUI.common.box.Box($(D),null,true);

break
}D=D.nextSibling
}D=this.frozenContentBox.getElement().firstChild;
while(D){if(D.tagName&&D.tagName.toLowerCase()=="table"){this.headerFrozenRow=new ClientUI.common.box.Box($(D),null,true);
break
}D=D.nextSibling
}this.helpObj=new ClientUI.common.box.Box(this.frozenContentBox.getElement(),null,true);
var P=this.headerFrozenRow.getElement().rows;
var O=(P.length&&P[0].cells.length&&P[0].cells[0].innerHTML)?P[0].cells.length:0;
var F=this.headerRow.getElement().rows[0].cells.length;
var E=new Array(O+F);
var I=this.eventCellMouseDown.bind(this);
var H=0,G=0,M;
this.frozenCells=O?this.headerFrozenRow.getElement().rows[0].cells:[];
var B=this.grid.options.ids;
var J=this.frozenCells.length;
for(H=0;
H<J;
H++){M=this.frozenCells[H];
E[G]={columnId:B[H],styleClass:M.className,id:M.id,align:M.align,valign:M.vAlign,title:M.title,minWidth:10,frozen:true,fixedWidth:Validators.getBoolean(M.getAttribute("fixedWidth"),false),sortable:Validators.getBoolean(M.getAttribute("sortable"),false),sorted:Validators.getBoolean(M.getAttribute("sorted"),"desc"),style:Utils.getRule("#"+this.normalizedId+" .dr-sdt-c-"+G).style};
if(E[G].sortable){Event.observe(M,"click",I)
}E[G].object=new ClientUI.common.box.InlineBox(M,null,true);
var A=this._getCellElements(G);
E[G].sep=new ClientUI.common.box.InlineBox(A[0],null,true);
E[G].sep.getElement().columnIndex=G;
if(!E[G].fixedWidth){Event.observe(E[G].sep.getElement(),"click",this.eventSepClick);
Event.observe(E[G].sep.getElement(),"mousedown",this.eventSepMouseDown)
}else{sep.setStyle({cursor:"auto"})
}G++
}this.cells=this.headerRow.getElement().rows[0].cells;
J=this.cells.length;
for(H=0;
H<J;
H++){M=this.cells[H];
E[G]={columnId:B[H],styleClass:M.className,id:M.id,align:M.align,valign:M.vAlign,title:M.title,minWidth:10,frozen:false,fixedWidth:Validators.getBoolean(M.getAttribute("fixedWidth"),false),sortable:Validators.getBoolean(M.getAttribute("sortable"),false),sorted:null,style:Utils.getRule("#"+this.normalizedId+" .dr-sdt-c-"+((H<J-1)?G:"f")).style};
if(E[G].sortable){Event.observe(M,"click",I)
}E[G].object=new ClientUI.common.box.InlineBox(M,null,true);
var A=this._getCellElements(G);
if(A[0]){E[G].sep=new ClientUI.common.box.InlineBox(A[0],null,true);
E[G].sep.getElement().columnIndex=G;
if(!E[G].fixedWidth){Event.observe(E[G].sep.getElement(),"click",this.eventSepClick);
Event.observe(E[G].sep.getElement(),"mousedown",this.eventSepMouseDown)
}else{sep.setStyle({cursor:"auto"})
}}G++
}this._columns=E;
this.frozenSubstrate=new ClientUI.common.box.Box(this.gridId+":hs",this.getElement());
this.frozenSubstrate.getElement().name=this.getElement().id+"HRFrm";
this.frozenSubstrate.setHeight(this.headerRow.element.offsetHeight);
return true
},_getCellElements:function(C){var B=new Array(3);
var A=this.grid.getElement().id;
B[0]=$(A+":hsep_"+C);
B[1]=$(A+":hs_"+C);
return B
},agjustSeparators:function(){var B=0;
var C=this.frozenCells.length;
var D=4;
if(this.cells[0].offsetWidth==this.cells[0].clientWidth){D--
}for(var A=0;
A<C;
B++,A++){this._columns[B].sep.moveToX(this.frozenCells[A].offsetLeft+this.frozenCells[A].offsetWidth-D)
}var C=this.cells.length-1;
for(var A=0;
A<C;
B++,A++){this._columns[B].sep.moveToX(this.cells[A].offsetLeft+this.cells[A].offsetWidth-D)
}},updateSize:function(){this.setHeight(this.headerRow.element.offsetHeight);
this.agjustSeparators();
this.updateHeaders()
},updateLayout:function($super){if(!this.controlCreated||!this.grid.controlCreated){return 
}$super();
var A=this.element.offsetHeight;
var B=this.frozenContentBox.getElement().offsetWidth;
this.contentBox.setHeight(A);
this.contentBox.moveTo(B-this.grid.getScrollOffset(),0);
this.headerRow.setHeight(A);
this.frozenContentBox.setHeight(A);
this.frozenContentBox.moveTo(0,0);
this.headerFrozenRow.setHeight(A);
this.frozenSubstrate.setWidth(B);
this.updateHeaders()
},getColumns:function(){return this._columns
},OnSepMouseDown:function(A){this.dragColumnInfo={srcElement:Event.element(A),dragStarted:false,mouseDown:true,startX:Event.pointerX(A),originalX:0};
this.dragColumnInfo.object=this.getColumns()[this.dragColumnInfo.srcElement.columnIndex].object;
this.dragColumnInfo.sep=this.getColumns()[this.dragColumnInfo.srcElement.columnIndex].sep;
this.dragColumnInfo.minWidth=this.getColumns()[this.dragColumnInfo.srcElement.columnIndex].minWidth;
Event.stop(A)
},OnSepMouseUp:function(B){if(this.dragColumnInfo&&this.dragColumnInfo.dragStarted){this.dragColumnInfo.dragStarted=false;
this.dragColumnInfo.mouseDown=false;
var C=Event.pointerX(B)-this.dragColumnInfo.startX;
var A=this.dragColumnInfo.object.getWidth()+C;
if(A<this.dragColumnInfo.minWidth){A=this.dragColumnInfo.minWidth
}setTimeout(function(){this.grid.adjustColumnWidth(this.dragColumnInfo.srcElement.columnIndex,A)
}.bind(this),10)
}this._hideSplitter()
},OnSepMouseMove:function(B){if(this.dragColumnInfo&&this.dragColumnInfo.mouseDown){if(!this.dragColumnInfo.dragStarted){this.dragColumnInfo.dragStarted=true;
this._showSplitter(this.dragColumnInfo.srcElement.columnIndex)
}else{var D=Event.pointerX(B)-this.dragColumnInfo.startX;
var C=this.dragColumnInfo.object.getWidth()-this.dragColumnInfo.minWidth;
if(D>=-C){var A=this.dragColumnInfo.originalX+D;
this.columnSplitter.moveToX(A-6)
}}Event.stop(B)
}},OnSepClick:function(A){Event.stop(A)
},_showSplitter:function(A){if(!this.columnSplitter){this._createSplitter()
}var B=this.dragColumnInfo.sep.getX();
if(!this.getColumns()[A].frozen){B+=this.frozenContentBox.getElement().offsetWidth-this.grid.getScrollOffset()
}this.dragColumnInfo.originalX=B;
this.columnSplitter.show();
this.columnSplitter.setHeight(this.headerRow.element.offsetHeight+this.grid.getBody().contentBox.element.offsetHeight);
this.columnSplitter.moveTo(B,0)
},_hideSplitter:function(){if(this.columnSplitter){this.columnSplitter.hide()
}},_createSplitter:function(){this.columnSplitter=new ClientUI.common.box.Box(this.gridId+":cs",this.grid.getElement());
this.columnSplitter.makeAbsolute();
this.columnSplitter.setWidth(10)
},adjustScrollPosition:function(A){this.contentBox.moveToX(this.frozenContentBox.getElement().offsetWidth-A)
},OnCellMouseDown:function(C){var B=Event.element(C);
while(B&&!Element.hasClassName(B,"dr-sdt-hc")){B=B.parentNode
}if(B){var E=B.getAttribute("columnid");
if(E){var D=this.grid.getBody().templNormal.getElement().rows;
var A=D&&D.length>0?this.grid.getBody()._getRowIndex(D[0].id):0;
this.grid.element.fire("grid:onsort",{column:E,startRow:A,index:this.grid.getBody().currRange.start});
Event.stop(C)
}}},updateHeaders:function(){var B=this.frozenCells.length;
var C=0;
for(var A=0;
A<B;
A++){C=this.updateHeader(C,this.frozenCells[A])
}B=this.cells.length-1;
C=0;
for(var A=0;
A<B;
A++){C=this.updateHeader(C,this.cells[A])
}},updateHeader:function(E,B){var A=$(this.gridId+":hs_"+B.id.split("_").last());
E+=B.offsetWidth;
if(A){var D=E-A.getWidth();
var C=(B.clientHeight-A.offsetHeight)/2;
D=Math.floor(D);
C=Math.floor(C);
A.setStyle({left:D+"px",top:C+"px",visibility:"inherit"})
}return E
},adjustColumnWidth:function(B,A){this._columns[B].style.width=A+"px";
if(A<=0){this.getColumns()[B].sep.hide()
}},resetFakeColumnWidth:function(){this._columns.last().style.width="0px"
},setFakeColumnWidth:function(){var A=this.grid.getBody().container.element.clientWidth-this.headerFrozenRow.getElement().offsetWidth-this.headerRow.getElement().offsetWidth;
if(A<0){A=0
}this._columns.last().style.width=A+"px"
},hideColumn:function(B,F){var D=this._columns.splice(B,1)[0];
var A=$(this.grid.getElement().id+"_hc");
A.value=A.value+D.columnId+",";
D.col.parentNode.removeChild(D.col);
D.bodyCol.parentNode.removeChild(D.bodyCol);
D.footerCol.parentNode.removeChild(D.footerCol);
var E;
if(F){E=this.headerFrozenRow.getElement().rows
}else{E=this.headerRow.getElement().rows
}for(var C=0;
C<E.length;
C++){E[C].removeChild(E[C].cells[B])
}}});
Object.extend(ClientUI.controls.grid.GridHeader.prototype,{sepStyleClass:"dr-sdt-hsep",_columns:[]});
ClientUILib.declarePackage("ClientUI.controls.grid.DataCash");
ClientUI.controls.grid.DataCash=Class.create({initialize:function(A){var C=parseInt(A/this.PKG_SIZE+1);
this.cash=new Array(C);
for(var B=0;
B<C;
B++){this.cash[B]=new Array(this.PKG_SIZE)
}},getRow:function(B){var C=parseInt(B/this.PKG_SIZE),A=B%this.PKG_SIZE;
return this.cash[C][A]
},setRow:function(B,D){var C=parseInt(B/this.PKG_SIZE),A=B%this.PKG_SIZE;
this.cash[C][A]=D
}});
Object.extend(ClientUI.controls.grid.DataCash.prototype,{PKG_SIZE:20});
ClientUILib.declarePackage("ClientUI.controls.grid.GridBody");
ClientUILib.requireClass("ClientUI.common.box.Box");
ClientUI.controls.grid.GridBody=Class.create(ClientUI.common.box.Box,{initialize:function($super,B,A){this.grid=A;
this.gridId=A.getElement().id;
$super(B);
this._eventOnHScroll=this._onContentHScroll.bindAsEventListener(this);
this._eventOnVScroll=this._onContentVScroll.bindAsEventListener(this);
this.createControl(B);
this.registerEvents()
},registerEvents:function(){Event.observe(this.scrollBox.element,"grid:onhcroll",this._eventOnHScroll);
Event.observe(this.scrollBox.element,"grid:onvcroll",this._eventOnVScroll)
},destroy:function(){Event.stopObserving(this.scrollBox.element,"grid:onhcroll",this._eventOnHScroll);
Event.stopObserving(this.scrollBox.element,"grid:onvcroll",this._eventOnVScroll)
},_onContentHScroll:function(A){this.grid.adjustScrollPosition(A.memo.pos)
},_onDataReady:function(A){window.loadingUpdateTime=(new Date()).getTime();
this.invalidate(A);
window.loadingInvalidateTime=(new Date()).getTime()
},_onContentVScroll:function(A){this.helpObject1.moveToY(this.sizeBox.element.offsetHeight+this.defaultRowHeight+5);
this.helpObject2.moveToY(this.sizeBox.element.offsetHeight+this.defaultRowHeight+5);
this.setScrollPos(A.memo.pos);
this.adjustDataPosition(A.memo.pos)
},createControl:function(D){this.scrollInput=$(this.gridId+":si");
var E=D.childNodes;
for(var B=0;
B<E.length;
B++){if(E[B].id==this.gridId+":bc"){this.container=new ClientUI.common.box.Box(E[B],null,true);
this.container.makeAbsolute();
this.container.setStyle({"z-index":20});
if(!ClientUILib.isIE){this.container.setStyle({overflow:"hidden"})
}break
}}Event.observe(this.container.getElement(),"keypress",this.synchronizeScroll.bindAsEventListener(this));
this.scrollBox=new ClientUI.common.box.ScrollableBox(this.gridId+":scb",this.getElement());
this.sizeBox=new ClientUI.common.box.Box(this.gridId+":sb",this.scrollBox.getElement());
var G=null,F=null;
var E=this.container.getElement().childNodes;
for(var B=0;
B<E.length;
B++){if(E[B].id&&E[B].id.indexOf("FrozenBox")>=0){F=E[B]
}else{if(E[B].id&&E[B].id.indexOf("NormalBox")>=0){G=E[B]
}}}if(!G||!F){errMsg="Unable to parse template for GridBody. Unable to find FrozenBox or NormalBox.";
ClientUILib.log(ClientUILogger.ERROR,errMsg);
throw (errMsg)
}this.contentBox=new ClientUI.common.box.Box(G);
Event.observe(this.contentBox.getElement(),"keypress",this.synchronizeScroll.bindAsEventListener(this));
this.frozenContentBox=new ClientUI.common.box.Box(F);
this.helpObject1=new ClientUI.common.box.Box(this.gridId+":nho",this.contentBox.getElement());
this.helpObject2=new ClientUI.common.box.Box(this.gridId+":fho",this.frozenContentBox.getElement());
var C=this.frozenContentBox.getElement().firstChild;
while(C){if(C.tagName&&C.tagName.toLowerCase()=="table"){this.templFrozen=new ClientUI.common.box.Box($(C),null,true);
this.templFrozen.makeAbsolute();
break
}C=C.nextSibling
}C=this.contentBox.getElement().firstChild;
while(C){if(C.tagName&&C.tagName.toLowerCase()=="table"){this.templNormal=new ClientUI.common.box.Box($(C),null,true);
this.templNormal.makeAbsolute();
break
}C=C.nextSibling
}this.parseTemplate(this.templFrozen.getElement(),this.templNormal.getElement());
var A=this.grid.getElement().id;
this.fTable=$(A+":f");
this.nTable=$(A+":n");
this.controlCreated=true;
this.sizeBox.setHeight(this.templNormal.getElement().offsetHeight)
},parseTemplate:function(C,B){var A=false;
if(B&&B.rows&&B.rows.length!=0){this.rowsCount=Math.min(B.rows.length,this.grid.dataModel.getCount());
this.helpObj=new ClientUI.common.box.Box(C,null,true);
this.countToLoad=0;
this.startRow=0;
this.startIndex=0;
A=true
}this.currRange=$R(0,this.rowsCount);
return A
},setScrollPos:function(A){this.contentBox.getElement().scrollTop=A;
this.frozenContentBox.getElement().scrollTop=A;
if(ClientUILib.isIE&&!ClientUILib.isIE7){this.contentBox.getElement().scrollTop=A;
this.frozenContentBox.getElement().scrollTop=A
}},updateSize:function(){var B=this.templNormal.getElement().rows[0];
if(B){this.defaultRowHeight=B.cells[0].offsetHeight
}else{var A=this._calcDefaultRowHeight();
if(isFinite(A)){this.defaultRowHeight=A
}}},updateLayout:function($super){if(!this.controlCreated||!this.grid.controlCreated){return 
}$super();
if(!this.scrollBox||!this.contentBox||!this.sizeBox){return 
}var H=this.fTable.offsetWidth;
var G=H+this.nTable.offsetWidth;
this.scrollBox.moveTo(0,0);
var I=this.element.offsetHeight;
var A=this.element.offsetWidth;
this.scrollBox.setWidth(A);
this.scrollBox.setHeight(I);
var D=this.grid.getScrollOffset();
var E=this.grid.getFooter()?this.grid.getFooter().element.offsetHeight:0;
if(E>I){E=0
}this.frozenContentBox.moveTo(0,0);
this.contentBox.moveTo(H,0);
this.sizeBox.moveTo(0,0);
this.sizeBox.setWidth(G);
this.scrollBox.setWidth(A);
this.scrollBox.setHeight(I);
this.defaultRowHeight=this._calcDefaultRowHeight();
this.sizeBox.setHeight(this.defaultRowHeight*this.grid.dataModel.getCount()+E);
I=this.scrollBox.getElement().clientHeight;
this.contentBox.setHeight(I-E);
this.frozenContentBox.setWidth(H);
this.frozenContentBox.setHeight(I-E);
this.container.setHeight(I-E);
var C=this.scrollBox.element.scrollTop;
this.scrollBox.hide();
this.helpObject1.moveToY(this.sizeBox.element.offsetHeight+this.defaultRowHeight+5);
this.helpObject2.moveToY(this.sizeBox.element.offsetHeight+this.defaultRowHeight+5);
this.dataVisible=parseInt(this.contentBox.element.offsetHeight/this.defaultRowHeight,10)+1;
this.dataVisible=Math.min(this.dataVisible,this.rowsCount);
if(I>0){this.adjustDataPosition(this.currentPos)
}this.scrollBox.show();
this.scrollBox.element.scrollTop=C;
var F=this.scrollBox.getViewportWidth();
this.container.setWidth(F);
if(ClientUILib.isIE){this.contentBox.setWidth(F-H)
}else{this.contentBox.setWidth(Math.max(this.getWidth(),G))
}var B=Math.min(G-F,D);
this.grid.adjustScrollPosition(B)
},adjustScrollPosition:function(A){this.templNormal.moveToX(-A)
},getScrollYPosition:function(){return this.contentBox.getElement().scrollTop
},adjustDataPosition:function(G){if(this.currentPos==G){return 
}this.processedPos=G;
var C=(this.currentPos<=G)?true:false;
var D=parseInt(G/this.defaultRowHeight)-1;
if(D<0){D=0
}var F=Math.max(D-(C?1:(this.rowsCount-this.dataVisible-1)),0);
var E=Math.min(D+(C?this.rowsCount-1:this.dataVisible+1),this.grid.dataModel.getCount());
if(F==0){E=this.rowsCount
}else{if(E==this.grid.dataModel.getCount()){F=E-this.rowsCount;
if(F<0){F=0
}}}var B=$R(F,E);
if(this.currRange.start==F&&this.currRange.end==E){return 
}if(F>=E){ClientUILib.log(ClientUILogger.WARNING,"!!! GridBody: adjustDataPosition. Pos: "+G+", From:"+F+", To:"+E);
return 
}var A=this._getPendingTask();
if(E-F>0){A.timer=null;
A.from=F;
A.to=E;
A.first=D;
A.pos=G;
this._setPendingTask(A)
}},_getPendingTask:function(){if(!this.pendingTask){this.pendingTask={timer:null,rowsToLoad:[],rowsToLoadIdx:[],from:0,to:0,first:0,pos:0}
}return this.pendingTask
},_setPendingTask:function(A){clearTimeout(this.pendingTask.timer);
this.pendingTask.timer=null;
this.pendingTask=A;
A.timer=setTimeout(function(){this.startLoadData()
}.bind(this),this.grid.dataModel.getRequestDelay())
},startLoadData:function(){if(this.updateStarted){this._setPendingTask(this._getPendingTask());
return 
}this.updateStarted=true;
var D=this._getPendingTask();
var G=$R(D.from,D.to);
var A=5;
var L=0;
var J=0;
var I=0;
var B=this._getRowIndex(this.templNormal.getElement().rows[0].id);
this.scrollInput.value=D.pos+","+this.currRange.start+","+this.currRange.end+","+B;
if(this.currRange.end<G.start||this.currRange.start>G.end){A=0
}if(A===0){J=B;
L=G.start;
I=G.end-G.start
}else{var E,O,K,F;
I=0;
var M=this.templNormal.getElement();
if(G.start>this.currRange.start&&G.start<this.currRange.end){A=1;
I=G.start-this.currRange.start;
if(I>0){J=B;
L=this.currRange.end
}}else{if(G.start==this.currRange.start){A=3;
I=G.end-this.currRange.end;
if(I>0){L=this.currRange.end;
var H=this.rowsCount-I;
J=this._getRowIndex(M.rows[H].id)
}}else{A=2;
I=this.currRange.start-G.start;
if(I>0){L=G.start;
var H=this.rowsCount-I;
J=this._getRowIndex(M.rows[H].id)
}}}}var C=true;
if(L>(D.first+this.dataVisible)||(L+I)<D.first){C=false
}if(I>0&&C){this.updateStarted=true;
ClientUILib.log(ClientUILogger.WARNING,"Start loading: index: "+L+", and startRow: "+J+", and count: "+I);
this.scrollInput.value=D.pos+","+G.start+","+G.end+","+B+","+this.currRange.start;
this.currRange=G;
this.currentPos=D.pos;
if(this.grid.options.hideWhenScrolling){this.container.hide()
}var N={index:L,count:I,startRow:J,switchType:A};
setTimeout(function(){this.updateInterval=screen.updateInterval;
screen.updateInterval=1000;
this.grid.dataModel.loadRows(N)
}.bind(this),10)
}else{this.updateStarted=false
}},forceReRender:function(){if(ClientUILib.isIE&&!ClientUILib.isIE7){var C=this.templFrozen.getElement();
var B=this.templNormal.getElement();
var A=C.insertRow();
C.deleteRow(A.rowIndex);
A=B.insertRow();
B.deleteRow(A.rowIndex)
}},rearrangeRows:function(B,M,H){var L=this.templFrozen.getElement();
var Q=this.templNormal.getElement();
if(B.switchType===0){var O=this.defaultRowHeight*B.index;
var T=this.contentBox.getElement().scrollTop;
if(H){this._showContainer()
}this.templFrozen.moveToY(O);
this.templNormal.moveToY(O);
this.forceReRender()
}else{if(B.switchType===1||B.switchType===2){var S=Q.rows.length;
var R=L.rows.length;
var I=new Array(R),F=new Array(S);
var N=0,P;
var D=B.index;
var E=B.count;
if(B.switchType===2){E=this.rowsCount-E
}for(P=E;
P<this.rowsCount;
P++){if(R){I[N]=L.rows[P]
}F[N]=Q.rows[P];
N++
}for(P=0;
P<E;
P++){if(R){I[N]=L.rows[P]
}F[N]=Q.rows[P];
N++
}var A=navigator.product=="Gecko";
var J=L.tBodies[0];
var G=Q.tBodies[0];
var K=J.nextSibling;
var C=G.nextSibling;
if(A){fp=J.parentNode;
fp.removeChild(J);
np=G.parentNode;
np.removeChild(G)
}for(P=0;
P<S;
P++){if(R){J.appendChild(I[P])
}G.appendChild(F[P])
}if(A){fp.insertBefore(J,K);
np.insertBefore(G,C)
}var O=(B.switchType==1)?this.currRange.start*this.defaultRowHeight:B.index*this.defaultRowHeight;
if(H){this._showContainer()
}this.templFrozen.moveToY(O);
this.templNormal.moveToY(O)
}else{var O=this.currRange.start*this.defaultRowHeight;
if(H){this._showContainer()
}this.templFrozen.moveToY(O);
this.templNormal.moveToY(O)
}}},_showContainer:function(){this.container.show();
if(ClientUILib.isIE){this.setScrollPos(this.currentPos)
}},invalidate:function(A){screen.updateInterval=this.updateInterval;
this.rearrangeRows(A,true,true);
this.container.show();
this.updateStarted=false
},processCashedValues:function(I){return I;
var B={switchType:I.switchType};
var G=this.getCash();
var E=I.count;
var F=I.index;
var H=I.startRow;
var D=0;
var A;
while(D<E&&(A=G.getRow(F+D))!=null){D++
}if(D>0){B.count=D;
B.index=F;
B.startRow=H;
this._restoreFromCash(B);
I.count-=D;
I.index=F+D;
I.startRow=H+D;
if(I.startRow>=this.rowsCount){I.startRow-=this.rowsCount
}}var C=0;
while(D<E&&!(A=G.getRow(F+D))){D++;
C++
}if(D<E){B.count=I.count-C;
B.index=F+D;
B.startRow=H+D;
if(B.startRow>=this.rowsCount){B.startRow-=this.rowsCount
}this._restoreFromCash(B);
I.count=C;
I.index=F+(D-C);
I.startRow=H+(D-C);
if(I.startRow>=this.rowsCount){I.startRow-=this.rowsCount
}}return I
},ensureVisible:function(A){if(A>=0&&A<this.grid.dataModel.getCount()){var B=parseInt(this.contentBox.element.offsetHeight/this.defaultRowHeight,10)+1;
if(this.grid.dataModel.getCount()>B){var C=A*this.defaultRowHeight;
this.scrollBox.getElement().scrollTop=C;
this.currentPos=0;
this._onContentVScroll({memo:{pos:C}})
}}},reloadData:function(){this.currentPos=-(this.rowsCount*this.defaultRowHeight);
this.scrollBox.getElement().scrollTop=0;
this.currRange.start=-this.rowsCount;
this.currRange.end=-1;
this._onContentVScroll({memo:{pos:0}})
},_getRowIndex:function(A){return Number(A.split(this.grid.getElement().id)[1].split(":")[2])
},hideColumn:function(A,D){var C;
if(D){C=this.templFrozen.getElement().rows
}else{C=this.templNormal.getElement().rows
}for(var B=0;
B<C.length;
B++){C[B].removeChild(C[B].cells[A])
}},showRow:function(C){if(C=="up"){this.scrollBox.getElement().scrollTop=this.scrollBox.getElement().scrollTop-this.nTable.rows[1].offsetTop
}else{if(C=="down"){this.scrollBox.getElement().scrollTop=this.scrollBox.getElement().scrollTop+this.nTable.rows[1].offsetTop
}else{var B=$(this.gridId+":n:"+C);
var A=this.nTable.offsetTop+B.offsetTop;
if(this.contentBox.getElement().scrollTop>A){this.scrollBox.getElement().scrollTop=A
}else{A+=B.offsetHeight;
A-=this.contentBox.getElement().clientHeight;
if(this.contentBox.getElement().scrollTop<A){this.scrollBox.getElement().scrollTop=A
}}}}this.scrollBox.updateScrollPos()
},_calcDefaultRowHeight:function(){var A=this.templNormal.getElement();
var B=A.rows.length;
if(B){return Math.ceil(A.offsetHeight/B)
}else{return 16
}},updateScrollState:function(){this.scrollInput=$(this.gridId+":si");
var A=this.scrollInput.value;
if(A!=""&&this.sizeBox.getHeight()<Number(A.split(",")[0])){this.restoreScrollState()
}this.scrollInput.value=this.currentPos+","+this.currRange.start+","+this.currRange.end+","+this._getRowIndex(this.templNormal.getElement().rows[0].id)
},restoreScrollState:function(){var C=this.scrollInput.value;
if(C!=""){var A=C.split(",");
this.currentPos=A[0];
this.currRange.start=A[1];
this.currRange.end=A[2];
this.scrollBox.getElement().scrollTop=A[0];
var B=this.currRange.start*this.defaultRowHeight;
this._showContainer();
this.templFrozen.moveToY(B);
this.templNormal.moveToY(B)
}},synchronizeScroll:function(A){if(Event.KEY_TAB==A.keyCode||Event.KEY_TAB==A.charCode){Event.stop(A)
}}});
Object.extend(ClientUI.controls.grid.GridBody.prototype,{dataVisible:50,dataDelta:5,currentPos:0});
ClientUILib.declarePackage("ClientUI.controls.grid.GridFooter");
ClientUILib.requireClass("ClientUI.common.box.Box");
ClientUI.controls.grid.GridFooter=Class.create(ClientUI.common.box.Box,{initialize:function($super,B,A){this.grid=A;
$super(B);
this.createControl(B)
},createControl:function(A){var B="";
if(!A){B="Invalid template specified for GridFooter.";
ClientUILib.log(ClientUILogger.ERROR,B);
throw (B)
}if(!this.parseTemplate(A)){B="Unable to parse template. GridFooter requires template specified over table element with one row.";
ClientUILib.log(ClientUILogger.ERROR,B);
throw (B)
}this.controlCreated=true
},parseTemplate:function(C){if(!C){return false
}var D=C.childNodes;
for(var A=0;
A<D.length;
A++){if(D[A].tagName&&D[A].tagName.toLowerCase()=="div"){this.container=new ClientUI.common.box.Box(D[A],null,true);
this.container.setStyle({"z-index":100});
break
}}var F=null,E=null;
var D=this.container.getElement().childNodes;
for(var A=0;
A<D.length;
A++){if(D[A].id&&D[A].id.indexOf("FrozenBox")>=0){E=D[A]
}else{if(D[A].id&&D[A].id.indexOf("NormalBox")>=0){F=D[A]
}}}if(!F||!E){errMsg="Unable to parse template for GridFooter. Unable to find FrozenBox or NormalBox.";
ClientUILib.log(ClientUILogger.ERROR,errMsg);
throw (errMsg)
}this.contentBox=new ClientUI.common.box.Box(F);
this.frozenContentBox=new ClientUI.common.box.Box(E);
var B=this.contentBox.getElement().firstChild;
while(B){if(B.tagName&&B.tagName.toLowerCase()=="table"){this.headerRow=new ClientUI.common.box.Box($(B),null,true);
break
}B=B.nextSibling
}B=this.frozenContentBox.getElement().firstChild;
while(B){if(B.tagName&&B.tagName.toLowerCase()=="table"){this.headerFrozenRow=new ClientUI.common.box.Box($(B),null,true);
break
}B=B.nextSibling
}this.helpObj=new ClientUI.common.box.Box(this.frozenContentBox.getElement(),null,true);
this.frozenSubstrate=new ClientUI.common.box.Box(this.grid.getElement().id+":fs",this.getElement());
this.frozenSubstrate.getElement().name=this.getElement().id+"FRFrm";
this.frozenSubstrate.setHeight(this.headerRow.element.offsetHeight);
return true
},updateSize:function(){this.setHeight(this.headerRow.element.offsetHeight)
},updateLayout:function($super){if(!this.controlCreated||!this.grid.controlCreated){return 
}$super();
var A=this.element.offsetHeight;
var B=this.frozenContentBox.getElement().offsetWidth;
this.contentBox.setHeight(A);
this.contentBox.moveTo(B-this.grid.getScrollOffset(),0);
this.frozenContentBox.setHeight(A);
this.frozenContentBox.moveTo(0,0);
var C=this.grid.getBody().scrollBox.getViewportWidth();
this.container.setWidth(C);
this.setWidth(C);
this.frozenSubstrate.setWidth(B)
},adjustScrollPosition:function(A){this.contentBox.moveToX(this.frozenContentBox.getElement().offsetWidth-A)
},hideColumn:function(A,D){var C;
if(D){C=this.headerFrozenRow.getElement().rows
}else{C=this.headerRow.getElement().rows
}for(var B=0;
B<C.length;
B++){C[B].removeChild(C[B].cells[A])
}}});
ClientUILib.declarePackage("ClientUI.controls.grid.Grid");
ClientUILib.requireClass("ClientUI.common.box.Box");
ClientUILib.requireClass("ClientUI.controls.grid.GridHeader");
ClientUILib.requireClass("ClientUI.controls.grid.GridBody");
ClientUILib.requireClass("ClientUI.controls.grid.GridFooter");
ClientUI.controls.grid.Grid=Class.create(ClientUI.common.box.Box,{initialize:function($super,C,B,A){$super(C);
this.dataModel=B;
this.templates=$A(A);
this.createControl()
},createControl:function(){var C=this;
this.layout=new ClientUI.layouts.GridLayoutManager(this.getElement().id+":c",null);
var A,D;
for(var B=0;
B<this.templates.length;
B++){D=this.templates[B];
switch(D.pane){case GridLayout_Enum.HEADER:A=new ClientUI.controls.grid.GridHeader($(D.ref),C);
this.layout.addPane(GridLayout_Enum.HEADER,A);
break;
case GridLayout_Enum.BODY:A=new ClientUI.controls.grid.GridBody($(D.ref),C);
this.layout.addPane(GridLayout_Enum.BODY,A);
break;
case GridLayout_Enum.FOOTER:A=new ClientUI.controls.grid.GridFooter($(D.ref),C);
this.layout.addPane(GridLayout_Enum.FOOTER,A);
break
}}this.currentScrollPos=0;
this.controlCreated=true;
var C=this;
Utils.execOnLoad(function(){C.getHeader().updateSize();
C.getBody().updateSize();
if(C.getFooter()){C.getFooter().updateSize()
}C.updateLayout();
C.getBody().restoreScrollState()
},Utils.Condition.ElementPresent(($(this.getElement().id+":c")).parentNode),100)
},updateLayout:function($super){$super();
var B=$(this.getElement().id+":c");
var A=B.parentNode.offsetHeight;
if(B.offsetHeight!=A){B.setStyle({height:A+"px"})
}this.getHeader().resetFakeColumnWidth();
if(this.layout){this.layout.updateLayout()
}this.getHeader().setFakeColumnWidth();
if(B.offsetHeight!=A){B.setStyle({height:A+"px"})
}},getHeader:function(){return this.layout.getPane(GridLayout_Enum.HEADER)
},getFooter:function(){return this.layout.getPane(GridLayout_Enum.FOOTER)
},getBody:function(){return this.layout.getPane(GridLayout_Enum.BODY)
},adjustColumnWidth:function(A,B){this.getHeader().adjustColumnWidth(A,B);
this.updateLayout();
this.getHeader().agjustSeparators();
this.element.fire("grid:onresizecolumn",{index:A,width:B})
},adjustScrollPosition:function(A){if(A<0){A=0
}this.currentScrollPos=A;
this.getHeader().adjustScrollPosition(A);
this.getBody().adjustScrollPosition(A);
if(this.getFooter()){this.getFooter().adjustScrollPosition(A)
}},getScrollOffset:function(){return this.currentScrollPos?this.currentScrollPos:0
},setColumnMinWidth:function(A,B){if(A<0||A>=this.getHeader().getColumns().length){return false
}this.getHeader().getColumns()[A].minWidth=B;
return true
},invalidate:function(A){this.getBody().invalidate(A)
},adjustColumnsWidth:function(){var B=this.getHeader().getColumns();
for(var A=0;
A<B.length;
A++){this.adjustColumnWidth(A,B[A].width)
}},ensureVisible:function(A){this.getBody().ensureVisible(A)
},getDataIndex:function(B){var A=this.getBody();
return A.currRange.start+B
},getRowIndex:function(B){var A=this.getBody();
return(B>=A.currRange.start&&B<A.currRange.start+A.rowsCount)?B-A.currRange.start:-1
},hideColumn:function(A){this.adjustColumnWidth(A,0)
},reloadData:function(){this.getBody().reloadData()
},updateRowCount:function(B){var A=parseInt(B);
if(A>=0){this.dataModel.count=A;
this.updateLayout()
}}});
ClientUI.controls.grid.Selection=Class.create({initialize:function(){this.ranges=[]
},addId:function(B){B=parseInt(B);
if(this.isSelectedId(B)){return 
}var A=0;
while(A<this.ranges.length&&B>=this.ranges[A++].indexes[1]){}A--;
if(this.ranges[A-1]&&B==(this.ranges[A-1].indexes[1]+1)){if(B==(this.ranges[A].indexes[0]-1)){this.ranges[A-1].indexes[1]=this.ranges[A].indexes[1];
this.removeRange(A)
}else{this.ranges[A-1].indexes[1]++
}}else{if(this.ranges[A]){if(this.ranges[A]&&B==(this.ranges[A].indexes[0]-1)){this.ranges[A].indexes[0]--
}else{if(B==(this.ranges[A].indexes[1]+1)){this.ranges[A].indexes[1]++
}else{if(B<this.ranges[A].indexes[1]){this.addRange(A,new ClientUI.controls.grid.Range(B,B))
}else{this.addRange(A+1,new ClientUI.controls.grid.Range(B,B))
}}}}else{this.addRange(A,new ClientUI.controls.grid.Range(B,B))
}}},addRange:function(B,A){var C=this.ranges.push(A)-2;
if(B>=0){while(C>=B){this.ranges[C+1]=this.ranges[C--]
}this.ranges[C+1]=A
}},removeRange:function(A){var B=A+1;
while(B!=this.ranges.length){this.ranges[B-1]=this.ranges[B++]
}this.ranges.pop()
},isSelectedId:function(B){var A=0;
while(A<this.ranges.length&&B>=this.ranges[A].indexes[0]){if(B>=this.ranges[A].indexes[0]&&B<=this.ranges[A].indexes[1]){return true
}else{A++
}}return false
},getSelectedIdsQuantity:function(){var B=0;
for(var A=0;
A<this.ranges.length;
A++){B+=this.ranges[A].size()
}return B
},size:function(){return this.getSelectedIdsQuantity()
},removeId:function(B){B=parseInt(B);
if(!this.isSelectedId(B)){return 
}var A=0;
while(A<this.ranges.length&&B>this.ranges[A++].indexes[1]){}A--;
if(this.ranges[A]){if(B==(this.ranges[A].indexes[1])){if(B==(this.ranges[A].indexes[0])){this.removeRange(A)
}else{this.ranges[A].indexes[1]--
}}else{if(B==(this.ranges[A].indexes[0])){this.ranges[A].indexes[0]++
}else{this.addRange(A+1,new ClientUI.controls.grid.Range(B+1,this.ranges[A].indexes[1]));
this.ranges[A].indexes[1]=B-1
}}}},getState:function(){var A=this.clone();
return{size:function(){return A.size()
},each:function(B){A.each(B)
},isSelected:function(B){return A.isSelectedId(B)
}}
},clone:function(){var A=Object.extend(new Object(),this);
A.ranges=new Array(A.ranges.length);
for(var B=0;
B<A.ranges.length;
B++){A.ranges[B]=this.ranges[B].clone()
}return A
},each:function(B){for(var A=0;
A<this.ranges.length;
A++){this.ranges[A].each(B)
}},getRanges:function(){return this.ranges
},setRanges:function(A){this.ranges=A
},initRanges:function(C){if(C.length==0){this.ranges=[];
return 
}this.ranges=new Array(C.length);
var A;
for(var B=0;
B<this.ranges.length;
B++){A=C[B].split(",");
this.ranges[B]=new ClientUI.controls.grid.Range(parseInt(A[0]),parseInt(A[1]))
}},inspectRanges:function(){var A=this.getRanges();
var B="";
A.each(function(C){B+=C.inspect()
});
return B
}});
ClientUI.controls.grid.Range=Class.create({initialize:function(B,A){this.indexes=[B,A]
},inspect:function(){return this.indexes[0]+","+this.indexes[1]+";"
},toString:function(){return this.inspect()
},size:function(){return this.indexes[1]-this.indexes[0]+1
},each:function(B){var A=this.indexes[0];
while(A<=this.indexes[1]){B(A++)
}},clone:function(){var A=Object.extend(new Object(),this);
A.indexes=this.indexes.clone();
return A
}});
ClientUI.controls.grid.SelectionManager=Class.create({initialize:function(A){this.grid=A;
this.selectionFlag;
this.firstIndex;
this.activeRow=-1;
var B=A.getElement();
this.prefix=B.id;
this.selection=new ClientUI.controls.grid.Selection();
this.inputElement=A.options.selectionInput;
this.isSingleMode="single"==A.options.selectionMode;
this.onselectionchange=A.options.onselectionchange;
this.selectedClass=A.options.selectedClass;
this.activeClass=A.options.activeClass;
this.restoreState();
this.setListeners();
this.eventKeyPress=this.processKeyDown.bindAsEventListener(this);
Event.observe(document,"keydown",this.eventKeyPress);
A4J.AJAX.AddListener({onafterajax:function(D,C,E){if(!$(this.prefix+":n")){Event.stopObserving(document,"keydown",this.eventKeyPress)
}}.bind(this)});
if(document.selection){Event.observe(B,"click",this.resetSelection.bindAsEventListener(this))
}this.eventLostFocus=this.processLostFocus.bindAsEventListener(this);
Event.observe(document,"click",this.eventLostFocus);
this.eventPreventLostFocus=this.processPreventLostFocus.bindAsEventListener(this);
Event.observe(B,"click",this.eventPreventLostFocus)
},restoreState:function(){this.selectionFlag=null;
var I=$(this.inputElement).value.split(";");
var E="";
while(I.length!=0&&(E=I.pop()).indexOf("|")==-1){}var J=E.split("|");
if(J.length==2){var H=Number(J[0]);
if(!isNaN(H)){this.setActiveRow(H)
}var F=J[1];
var G=Number(F);
if(!isNaN(G)){this.shiftRow=G
}else{if("+-".indexOf(F)!=-1){this.shiftRow=F
}}}this.selection.initRanges(I);
var C=0;
var B;
while(C<this.selection.ranges.length){B=this.selection.ranges[C].indexes[0];
while(B<=this.selection.ranges[C].indexes[1]){var D=$(this.prefix+":f:"+B);
var A=$(this.prefix+":n:"+B);
Element.addClassName(D,"dr-sdt-row-selected");
Element.addClassName(A,"dr-sdt-row-selected");
Element.addClassName(D,"rich-sdt-row-selected");
Element.addClassName(A,"rich-sdt-row-selected");
Element.addClassName(D,this.selectedClass);
Element.addClassName(A,this.selectedClass);
B++
}C++
}this.oldState=this.selection.getState()
},setListeners:function(){var A=$(this.prefix+":f").rows;
var C=$(this.prefix+":n").rows;
this.rowCount=C.length;
var D;
for(var B=0;
B<this.rowCount;
B++){D=Number(C[B].id.split(this.prefix)[1].split(":")[2]);
this.addListener(A[B],D);
this.addListener(C[B],D)
}},addListener:function(D,E){if(D){var C=this.processClick.bindAsEventListener(this,E);
var A=D.cells;
for(var B=0;
B<A.length;
B++){Utils.DOM.Event.observe(A[B],"click",C)
}}},processPreventLostFocus:function(){this.inFocus=true;
this.preventLostFocus=true
},processLostFocus:function(){if(!this.preventLostFocus){this.lostFocus()
}else{this.preventLostFocus=false
}},lostFocus:function(){this.inFocus=false
},processKeyDown:function(E){if($(this.prefix+":n").rows.length>0){if(!E.shiftKey&&(E.keyCode||E.charCode)!=16){this.shiftRow=null
}var A,F;
var D=this.activeRow;
var C=false;
this.firstIndex=Number($(this.prefix+":n").rows[0].id.split(this.prefix)[1].split(":")[2]);
switch(E.keyCode||E.charCode){case Event.KEY_UP:if(this.inFocus&&D!=null){if(this.firstIndex!=D){F=(this.rowCount+D-1)%this.rowCount;
if(this.isSingleMode||(!E.ctrlKey&&!E.shiftKey)){this.selectionFlag="x";
A=[F,F];
this.setSelection(A)
}else{if(!E.ctrlKey&&E.shiftKey){if(!this.shiftRow){this.shiftRow=this.activeRow
}if(this.shiftRow>=this.activeRow){this.addRowToSelection(F)
}else{this.removeRowFromSelection(D)
}}}C=true;
this.setActiveRow(F)
}else{this.grid.getBody().showRow("up")
}}break;
case Event.KEY_DOWN:if(this.inFocus&&D!=null){F=(D+1)%this.rowCount;
if(this.firstIndex!=F){if(this.isSingleMode||(!E.ctrlKey&&!E.shiftKey)){this.selectionFlag="x";
A=[F,F];
this.setSelection(A)
}else{if(!E.ctrlKey&&E.shiftKey){if(!this.shiftRow){this.shiftRow=this.activeRow
}if(this.shiftRow<=this.activeRow){this.addRowToSelection(F)
}else{this.removeRowFromSelection(D)
}}}C=true;
this.setActiveRow(F)
}else{this.grid.getBody().showRow("down")
}}break;
case 65:case 97:if(this.inFocus&&E.ctrlKey&&!this.isSingleMode){this.selectionFlag="a";
for(var B=0;
B<this.rowCount;
B++){this.addRowToSelection(B)
}C=true
}break;
case Event.KEY_TAB:this.lostFocus()
}if(C){this.grid.getBody().showRow(this.activeRow);
this.selectionChanged(E);
if(E.preventBubble){E.preventBubble()
}Event.stop(E)
}}},processClick:function(B,C){if(!B.shiftKey){this.shiftRow=null
}var A;
if(B.shiftKey&&!B.ctrlKey&&!B.altKey&&!this.isSingleMode){this.firstIndex=Number($(this.prefix+":n").rows[0].id.split(this.prefix)[1].split(":")[2]);
if(!this.shiftRow){if(this.activeRow==-1){this.shiftRow=C
}else{this.shiftRow=this.activeRow
}}if(this.shiftRow=="-"){this.selectionFlag="u";
this.startRow=this.firstIndex
}else{if(this.shiftRow=="+"){this.selectionFlag="d";
this.startRow=this.firstIndex?this.firstIndex-1:this.rowCount-1
}else{this.selectionFlag="x";
this.startRow=this.shiftRow
}}if(((this.startRow<=C)&&(this.firstIndex<=this.startRow||C<this.firstIndex))||(this.startRow>C&&this.firstIndex<=this.startRow&&C<this.firstIndex)){this.endRow=C
}else{this.endRow=this.startRow;
this.startRow=C
}A=[this.startRow,this.endRow];
this.setSelection(A)
}else{if(!B.shiftKey&&B.ctrlKey&&!B.altKey&&!this.isSingleMode){if(this.selection.isSelectedId(C)){this.removeRowFromSelection(C)
}else{this.addRowToSelection(C)
}}else{if(this.isSingleMode||(!B.shiftKey&&!B.ctrlKey&&!B.altKey)){this.selectionFlag="x";
A=[C,C];
this.setSelection(A)
}}}this.setActiveRow(C);
if(B.shiftKey&&!this.isSingleMode){if(window.getSelection){window.getSelection().removeAllRanges()
}else{if(document.selection){document.selection.empty()
}}}this.selectionChanged(B)
},selectionChanged:function(A){$(this.inputElement).value=this.selection.inspectRanges()+this.activeRow+"|"+(this.shiftRow?this.shiftRow:this.activeRow)+";"+(this.selectionFlag?this.selectionFlag:"");
var B=this.selection.getState();
A.oldSelection=this.oldState;
A.newSelection=B;
if(this.onselectionchange){this.onselectionchange(A)
}this.oldState=B
},setShiftRow:function(A){if(A.shiftKey){if(!this.shiftRow){this.shiftRow=this.activeRow
}}else{this.shiftRow=null
}},setSelection:function(A){var B=A[0];
A[1]=(A[1]+1)%this.rowCount;
do{this.addRowToSelection(B);
B=(B+1)%this.rowCount
}while(B!=A[1]);
while(B!=A[0]){this.removeRowFromSelection(B);
B=(B+1)%this.rowCount
}},resetSelection:function(A){if(A.shiftKey){document.selection.empty()
}},addRowToSelection:function(C){this.selection.addId(C);
var B=$(this.prefix+":f:"+C);
var A=$(this.prefix+":n:"+C);
Element.addClassName(B,"dr-sdt-row-selected");
Element.addClassName(A,"dr-sdt-row-selected");
Element.addClassName(B,"rich-sdt-row-selected");
Element.addClassName(A,"rich-sdt-row-selected");
Element.addClassName(B,this.selectedClass);
Element.addClassName(A,this.selectedClass)
},removeRowFromSelection:function(C){this.selection.removeId(C);
var B=$(this.prefix+":f:"+C);
var A=$(this.prefix+":n:"+C);
Element.removeClassName(B,"dr-sdt-row-selected");
Element.removeClassName(A,"dr-sdt-row-selected");
Element.removeClassName(B,"rich-sdt-row-selected");
Element.removeClassName(A,"rich-sdt-row-selected");
Element.removeClassName(B,this.selectedClass);
Element.removeClassName(A,this.selectedClass)
},setActiveRow:function(C){var B,A;
if(this.activeRow!=null){B=$(this.prefix+":f:"+this.activeRow);
A=$(this.prefix+":n:"+this.activeRow);
Element.removeClassName(B,"dr-sdt-row-active");
Element.removeClassName(A,"dr-sdt-row-active");
Element.removeClassName(B,"rich-sdt-row-active");
Element.removeClassName(A,"rich-sdt-row-active");
Element.removeClassName(B,this.activeClass);
Element.removeClassName(A,this.activeClass)
}B=$(this.prefix+":f:"+C);
A=$(this.prefix+":n:"+C);
Element.addClassName(B,"dr-sdt-row-active");
Element.addClassName(A,"dr-sdt-row-active");
Element.addClassName(B,"rich-sdt-row-active");
Element.addClassName(A,"rich-sdt-row-active");
Element.addClassName(B,this.activeClass);
Element.addClassName(A,this.activeClass);
this.activeRow=C
}});
ClientUILib.declarePackage("ClientUI.controls.grid.ScrollableGrid");
ClientUI.controls.grid.ScrollableGrid=Class.create(ClientUI.controls.grid.Grid,{initialize:function($super,A){this.startInitTime=(new Date()).getTime();
this.options=A;
this.client_id=this.options.client_id;
this.rows_count=$(this.client_id+"_rows_input").value;
this.columns_count=this.options.columnsCount;
this.splash_id=this.options.splash_id;
this.dataModel=new ClientUI.controls.grid.FakeArrayDataModel(this.rows_count,this.columns_count,this.client_id);
this.templates=[{pane:GridLayout_Enum.HEADER,ref:this.client_id+"_GridHeaderTemplate"},{pane:GridLayout_Enum.BODY,ref:this.client_id+"_GridBodyTemplate"},{pane:GridLayout_Enum.FOOTER,ref:this.client_id+"_GridFooterTemplate"}];
this.startCreateTime=(new Date()).getTime();
$super(this.client_id,this.dataModel,this.templates);
this.endCreateTime=(new Date()).getTime();
Event.observe(this.element,"grid:onsort",this.onSorted.bindAsEventListener(this));
if(this.options.selectionInput){this.selectionManager=new ClientUI.controls.grid.SelectionManager(this)
}this.endInitTime=(new Date()).getTime();
this.rowCallbacks=[]
},onSortComplete:function(C,B,D){this.dataModel.count=$(this.client_id+"_rows_input").value;
var A=C.getJSON("options");
Utils.AJAX.updateRows(A,C,this,this.client_id,[this.updateSelectionCallBack],[function(){this.selectionManager.restoreState();
this.element.fire("grid:onpostsort",{column:A.column,order:A.order})
}]);
this.updateLayout();
this.getBody().restoreScrollState()
},onScrollComplete:function(C,B,D){this.dataModel.count=$(this.client_id+"_rows_input").value;
var A=this.dataModel.getCurrentOptions();
window.loadingServerTime=(new Date()).getTime();
Utils.AJAX.updateRows(A,C,this,this.client_id,[this.updateSelectionCallBack],[function(){this.selectionManager.restoreState();
this.element.fire("grid:onpostscroll",{start:this.getBody().currRange.start})
}]);
this.updateLayout();
this.getBody().updateScrollState();
window.loadingEndTime=(new Date()).getTime();
ClientUILib.log(ClientUILogger.ERROR,"Total time of data loading of "+A.count+" rows is: "+(window.loadingEndTime-window.loadingStartTime)+" miliseconds.");
ClientUILib.log(ClientUILogger.WARNING,"...Server load time: "+(window.loadingServerTime-window.loadingStartTime));
ClientUILib.log(ClientUILogger.WARNING,"...DOM updated time: "+(window.loadingUpdateTime-window.loadingServerTime));
ClientUILib.log(ClientUILogger.WARNING,"...Grid invalidation time: "+(window.loadingInvalidateTime-window.loadingUpdateTime));
ClientUILib.log(ClientUILogger.WARNING,"...Selection mng time: "+(window.loadingEndTime-window.loadingInvalidateTime))
},onSorted:function(A){this.options.onSortAjaxUpdate(A.memo)
},updateSelectionCallBack:function(A){if(this.selectionManager){this.selectionManager.addListener(A.row,A.index)
}},setSizes:function(C,A){var B=this.element.style;
B.width=C+"px";
B.height=A+"px";
this.updateLayout()
},doCollapse:function(A){var E=this.getHeader();
var D=E.headerFrozenRow.getElement().rows[0].cells.length;
var C=E.headerRow.getElement().rows[0].cells.length;
if(A<D+C-1){var B=true;
if(A>=D){A-=D;
B=false
}this.hideColumn(A,B)
}},collapse:function(A){this.doCollapse(A)
},hideColumn:function(A,B){this.getHeader().hideColumn(A,B);
this.getBody().hideColumn(A,B);
if(this.getFooter()){this.getFooter().hideColumn(A,B)
}this.updateLayout()
}})
;
TogglePanel=Class.create();
TogglePanel.prototype={initialize:function(A,B,C){this.panelId=A;
this.divs=B;
this.currentId=C
},toggleToState:function(B){Element.hide(this.panelId+"_"+this.currentId);
var A;
if(B!=null){A=this.divs.indexOf(B);
this.currentId=this.divs[A]
}else{A=this.divs.indexOf(this.currentId);
if(this.divs.length==(A+1)){this.currentId=this.divs[0]
}else{this.currentId=this.divs[A+1]
}}Element.show(this.panelId+"_"+this.currentId);
$(this.panelId+"_input").value=this.currentId
}};
TogglePanelManager=Class.create();
TogglePanelManager.panels=$H($A({}));
TogglePanelManager.add=function(B){var A=new Object();
A[B.panelId]=B;
this.panels=this.panels.merge(A)
};
TogglePanelManager.toggleOnServer=function(D,B,E){var A=document.getElementById(D);
if(A==null){return 
}var C={};
C[B]=E;
_JSFFormSubmit(null,A,null,C);
return false
};
TogglePanelManager.toggleOnClient=function(A,B){this.panels.get(A).toggleToState(B);
return false
}
;
SimpleTogglePanel=Class.create();
SimpleTogglePanel.prototype={initialize:function(C,A,B){this.panelId=C;
this.panelId_head=C+"_header";
this.options=B;
this.status=A;
if(!this.status){this.status="true"
}},toggleToState:function(D){var A=$(this.panelId+"_body");
var C=$(this.panelId+"_switch_on");
var B=$(this.panelId+"_switch_off");
if(this.status=="false"){if(this.invokeEvent("expand",D,"false",A)){Element.show(A);
this.status="true";
B.style.display="none";
C.style.display=""
}}else{if(this.invokeEvent("collapse",D,"true",A)){Element.hide(A);
this.status="false";
C.style.display="none";
B.style.display=""
}}if(RichFaces.navigatorType()==RichFaces.MSIE){}$(this.panelId+"_input").value=this.status
},invokeEvent:function(B,E,G,C){var D=this.options["on"+B];
var A;
if(D){var F;
if(E){F=E
}else{if(document.createEventObject){F=document.createEventObject()
}else{if(document.createEvent){F=document.createEvent("Events");
F.initEvent(B,true,false)
}}}F.rich={component:this};
F.rich.value=G;
try{A=D.call(C,F)
}catch(H){LOG.warn("Exception: "+H.Message+"\n[on"+B+"]")
}}if(A!=false){A=true
}return A
}};
SimpleTogglePanelManager=Class.create();
SimpleTogglePanelManager.panels=$H($A({}));
SimpleTogglePanelManager.add=function(B){var A=new Object();
A[B.panelId]=B;
this.panels=this.panels.merge(A)
};
SimpleTogglePanelManager.toggleOnServer=function(E,B){var A=A4J.findForm($(B+"_header"));
if(!A||!A.appendChild){return 
}var D=this.panels.get(B);
var C=$(B);
if(D.status=="true"){if(D.invokeEvent("collapse",E,"true",C)){D.status="false"
}}else{if(D.invokeEvent("expand",E,"false",C)){D.status="true"
}}var F={};
F[B]=D.status;
_JSFFormSubmit(null,A,null,F);
return false
};
SimpleTogglePanelManager.toggleOnClient=function(B,A){this.panels.get(A).toggleToState(B);
return false
};
SimpleTogglePanelManager.toggleOnAjax=function(D,C){var B=$(C);
var A=this.panels.get(C);
if(A.status=="true"){return A.invokeEvent("collapse",D,"true",B)
}else{return A.invokeEvent("expand",D,"false",B)
}}
;
if(!window.LOG){window.LOG={warn:function(){}}
}if(!window.Richfaces){window.Richfaces={}
}Richfaces.Calendar={};
Richfaces.Calendar.setElementPosition=function(F,A,L,Y,M){if(!M){M={dx:0,dy:0}
}var I=Richfaces.Calendar.getOffsetDimensions(F);
var G;
var V;
if(A.left!=undefined){G={width:A.width,height:A.height};
V=[A.left,A.top]
}else{G=Richfaces.Calendar.getOffsetDimensions(A);
V=Position.cumulativeOffset(A)
}var B=Richfaces.Calendar.getWindowViewport();
var K=V[0];
var J=V[1];
var S=/^(top|bottom)-(left|right)$/;
var P;
if(typeof L=="object"){K=L.x;
J=L.y
}else{if(L&&(P=L.toLowerCase().match(S))!=null){if(P[2]=="right"){K+=G.width
}if(P[1]=="bottom"){J+=G.height
}}else{}}if(Y&&(P=Y.toLowerCase().match(S))!=null){var W=Y.toLowerCase().split("-");
if(P[2]=="left"){K-=I.width+M.dx
}else{if(P[2]=="right"){K+=M.dx
}}if(P[1]=="top"){J-=I.height+M.dy
}else{if(P[1]=="bottom"){J+=M.dy
}}}else{var Z={square:0};
var O=V[0]-M.dx;
var N=V[1]+M.dy;
var D={right:O+G.width,top:N+G.height};
D.left=D.right-I.width;
D.bottom=D.top+I.height;
K=D.left;
J=D.top;
var Q=Richfaces.Calendar.checkCollision(D,B);
if(Q!=0){if(K>=0&&J>=0&&Z.square<Q){Z={x:K,y:J,square:Q}
}O=V[0]-M.dx;
N=V[1]-M.dy;
D={right:O+G.width,bottom:N};
D.left=D.right-I.width;
D.top=D.bottom-I.height;
K=D.left;
J=D.top;
Q=Richfaces.Calendar.checkCollision(D,B);
if(Q!=0){if(K>=0&&J>=0&&Z.square<Q){Z={x:K,y:J,square:Q}
}O=V[0]+M.dx;
N=V[1]+M.dy;
D={left:O,top:N+G.height};
D.right=D.left+I.width;
D.bottom=D.top+I.height;
K=D.left;
J=D.top;
Q=Richfaces.Calendar.checkCollision(D,B);
if(Q!=0){if(K>=0&&J>=0&&Z.square<Q){Z={x:K,y:J,square:Q}
}O=V[0]+M.dx;
N=V[1]-M.dy;
D={left:O,bottom:N};
D.right=D.left+I.width;
D.top=D.bottom-I.height;
K=D.left;
J=D.top;
Q=Richfaces.Calendar.checkCollision(D,B);
if(Q!=0){if(K<0||J<0||Z.square>Q){K=Z.x;
J=Z.y
}}}}}}var H=F.style;
var C=H.visibility;
var X=H.position;
var R=H.display;
H.visibility="hidden";
H.position="absolute";
H.display="";
if(!window.opera){var U=F.getOffsetParent().viewportOffset();
K-=U[0];
J-=U[1]
}else{if(F.offsetParent){if(F.offsetParent!=document.body){var U=Position.cumulativeOffset(F.offsetParent);
K-=U[0];
J-=U[1];
K+=F.offsetParent.scrollLeft;
J+=F.offsetParent.scrollTop
}else{var U=Richfaces.Calendar.cumulativeScrollOffset(F);
K+=U[0];
J+=U[1]
}}}H.display=R;
H.position=X;
H.visibility=C;
F.style.left=K+"px";
F.style.top=J+"px"
};
Richfaces.Calendar.cumulativeScrollOffset=function(B){var A=0,C=0;
do{A+=B.scrollTop||0;
C+=B.scrollLeft||0;
B=B.parentNode
}while(B&&B!=document.body);
return Element._returnOffset(C,A)
};
Richfaces.Calendar.getOffsetDimensions=function(C){C=$(C);
var H=$(C).getStyle("display");
if(H!="none"&&H!=null){return{width:C.offsetWidth,height:C.offsetHeight}
}var B=C.style;
var G=B.visibility;
var D=B.position;
var A=B.display;
B.visibility="hidden";
B.position="absolute";
B.display="block";
var I=C.offsetWidth;
var F=C.offsetHeight;
B.display=A;
B.position=D;
B.visibility=G;
return{width:I,height:F}
};
Richfaces.Calendar.checkCollision=function(A,B,D){if(A.left>=B.left&&A.top>=B.top&&A.right<=B.right&&A.bottom<=B.bottom){return 0
}var C={left:(A.left>B.left?A.left:B.left),top:(A.top>B.top?A.top:B.top),right:(A.right<B.right?A.right:B.right),bottom:(A.bottom<B.bottom?A.bottom:B.bottom)};
return(C.right-C.left)*(C.bottom-C.top)
};
Richfaces.Calendar.getWindowDimensions=function(){var A=self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;
var B=self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0;
return{width:A,height:B}
};
Richfaces.Calendar.getWindowScrollOffset=function(){var B=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;
var A=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
return{left:B,top:A}
};
Richfaces.Calendar.getWindowViewport=function(){var B=Richfaces.Calendar.getWindowDimensions();
var A=Richfaces.Calendar.getWindowScrollOffset();
return{left:A.left,top:A.top,right:B.width+A.left,bottom:B.height+A.top}
};
Richfaces.Calendar.clonePosition=function(D,C){if(!D.length){D=[D]
}var F=Position.cumulativeOffset(C);
F={left:F[0],top:F[1]};
var A;
if(C.style.position!="absolute"){A=Position.realOffset(C);
F.left-=A.left;
F.top-=A.top;
A=Richfaces.Calendar.getWindowScrollOffset();
F.left+=A.left;
F.top+=A.top
}for(var B=0;
B<D.length;
B++){A=Richfaces.Calendar.getParentOffset(D[B]);
D[B].style.left=(F.left-A.left)+"px";
D[B].style.top=(F.top-A.top)+"px"
}return F
};
Richfaces.Calendar.getParentOffset=function(C){var G={left:0,top:0};
var B=C.style;
if(B.display!="none"){if(C.offsetParent&&C.offsetParent!=document.body){G=Position.cumulativeOffset(C.offsetParent)
}}else{var F=B.visibility;
var D=B.position;
var A=B.display;
B.visibility="hidden";
B.position="absolute";
B.display="";
if(C.offsetParent&&C.offsetParent!=document.body){G=Position.cumulativeOffset(C.offsetParent)
}B.display=A;
B.position=D;
B.visibility=F
}return G
};
Richfaces.Calendar.joinArray=function(F,B,A,D){var C="";
if(F.length!=0){C=B+F.pop()+A
}while(F.length){C=B+F.pop()+A+D+C
}return C
};
Richfaces.Calendar.getMonthByLabel=function(C,A){var B=0;
while(B<A.length){if(A[B]==C){return B
}else{B++
}}};
Object.extend(Event,{findElementByAttr:function(F,C,D,G,A){var B=Event.findElement(F,C);
while(!B[D]||(A?B[D].indexOf(G)!=0:B[D]!=G)){B=B.parentNode
}return B
}});
Object.extend(Element,{replaceClassName:function(B,A,D){if(!(B=$(B))){return 
}var C=Element.classNames(B);
C.remove(A);
C.add(D);
return B
}});
Richfaces.Calendar.getDefaultMonthNames=function(A){return(A?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]:["January","February","March","April","May","June","July","August","September","October","November","December"])
};
Richfaces.Calendar.parseDate=function(U,Q,I,A){var L=/([.*+?^<>=!:${}()[\]\/\\])/g;
var J;
var C;
if(!I){I=Richfaces.Calendar.getDefaultMonthNames();
J=I.join("|")
}else{J=I.join("|").replace(L,"\\$1")
}if(!A){A=Richfaces.Calendar.getDefaultMonthNames(true);
C=A.join("|")
}else{C=A.join("|").replace(L,"\\$1")
}var H=1;
var G,M,R;
var W,P,N;
var B=false;
Q=Q.replace(/([.*+?^<>=!:${}()|[\]\/\\])/g,"\\$1");
Q=Q.replace(/(y+|M+|d+|a|H{1,2}|h{1,2}|m{2})/g,function(Y){switch(Y){case"y":case"yy":G=H;
H++;
return"(\\d{2})";
case"MM":M=H;
H++;
return"(\\d{2})";
case"M":M=H;
H++;
return"(\\d{1,2})";
case"d":R=H;
H++;
return"(\\d{1,2})";
case"MMM":M=H;
H++;
B=true;
return"("+C+")";
case"a":W=H;
H++;
return"(AM|am|PM|pm)?";
case"HH":case"hh":P=H;
H++;
return"(\\d{2})?";
case"H":case"h":P=H;
H++;
return"(\\d{1,2})?";
case"mm":N=H;
H++;
return"(\\d{2})?"
}var Z=Y.charAt(0);
if(Z=="y"){G=H;
H++;
return"(\\d{3,4})"
}if(Z=="M"){M=H;
H++;
return"("+J+")"
}if(Z=="d"){R=H;
H++;
return"(\\d{2})"
}});
var L=new RegExp(Q,"i");
var F=U.match(L);
if(F!=null){var K=parseInt(F[G],10);
if(isNaN(K)){return null
}else{if(K<70){K+=2000
}else{if(K<100){K+=1900
}}}var O=parseInt(F[M],10);
if(isNaN(O)){O=Richfaces.Calendar.getMonthByLabel(F[M],B?A:I)
}else{if(--O<0||O>11){return null
}}var S=parseInt(F[R],10);
if(isNaN(S)||S<1||S>daysInMonth(K,O)){return null
}if(N!=undefined&&P!=undefined){var D,V,X;
V=parseInt(F[N],10);
if(isNaN(V)||V<0||V>59){return null
}D=parseInt(F[P],10);
if(isNaN(D)){return null
}if(W!=undefined){X=F[W];
if(!X){return null
}X=X.toLowerCase();
if((X!="am"&&X!="pm")||D<1||D>12){return null
}if(X=="pm"){if(D!=12){D+=12
}}else{if(D==12){D=0
}}}else{if(D<0||D>23){return null
}}return new Date(K,O,S,D,V,0)
}return new Date(K,O,S)
}return null
};
Richfaces.Calendar.formatDate=function(A,G,F,H){if(!F){F=Richfaces.Calendar.getDefaultMonthNames()
}if(!H){H=Richfaces.Calendar.getDefaultMonthNames(true)
}var C;
var I;
var B;
var D;
var J=G.replace(/(\\\\|\\[yMdaHhm])|(y+|M+|d+|a|H{1,2}|h{1,2}|m{2})/g,function(K,N,M){if(N){return N.charAt(1)
}switch(M){case"y":case"yy":return A.getYear().toString().slice(-2);
case"M":return(A.getMonth()+1);
case"MM":return((C=A.getMonth()+1)<10?"0"+C:C);
case"MMM":return H[A.getMonth()];
case"d":return A.getDate();
case"a":return(A.getHours()<12?"AM":"PM");
case"HH":return((B=A.getHours())<10?"0"+B:B);
case"H":return A.getHours();
case"hh":return((B=A.getHours())==0?"12":(B<10?"0"+B:(B>21?B-12:(B>12)?"0"+(B-12):B)));
case"h":return((B=A.getHours())==0?"12":(B>12?B-12:B));
case"mm":return((D=A.getMinutes())<10?"0"+D:D)
}var L=M.charAt(0);
if(L=="y"){return A.getFullYear()
}if(L=="M"){return F[A.getMonth()]
}if(L=="d"){return((I=A.getDate())<10?"0"+I:I)
}});
return J
};
Richfaces.Calendar.escape=function(A){return A.replace(/([yMdaHhm\\])/g,"\\$1")
};
Richfaces.Calendar.unescape=function(A){return A.replace(/\\([yMdaHhm\\])/g,"$1")
};
function isLeapYear(A){return new Date(A,1,29).getDate()==29
}function daysInMonth(A,B){return 32-new Date(A,B,32).getDate()
}function daysInMonthByDate(A){return 32-new Date(A.getFullYear(),A.getMonth(),32).getDate()
}function getDay(A,B){var C=A.getDay()-B;
if(C<0){C=7+C
}return C
}function getFirstWeek(D,G,B){var C=new Date(D,0,1);
var F=getDay(C,B);
var A=(7-F<G)?0:1;
return{date:C,firstDay:F,weekNumber:A,mdifw:G,fdow:B}
}function getLastWeekOfPrevYear(D){var A=D.date.getFullYear()-1;
var F=(isLeapYear(A)?366:365);
var C=getFirstWeek(A,D.mdifw,D.fdow);
F=(F-7+D.firstDay);
var B=Math.floor(F/7)+1;
return B+C.weekNumber
}function weekNumber(C,F,D,A){var H=getFirstWeek(C,D,A);
if(F==0){if(H.weekNumber==1){return 1
}return getLastWeekOfPrevYear(H)
}var B=604800000;
var G=new Date(C,F,1);
G.setDate(1+H.firstDay+(getDay(G,A)==0?1:0));
weeknumber=H.weekNumber+Math.floor((G.getTime()-H.date.getTime())/B);
return weeknumber
}Calendar=Class.create();
Object.extend(Calendar.prototype,{initialize:function(U,L){this.id=U;
this.params=L;
this.showApplyButton=(!this.params.popup)?false:this.params.showApplyButton;
if(this.params.showWeekDaysBar==undefined){this.params.showWeekDaysBar=true
}if(this.params.showWeeksBar==undefined){this.params.showWeeksBar=true
}if(!this.params.datePattern){this.params.datePattern="MMM d, y"
}this.setTimeProperties();
if(!this.params.dayListMarkup){this.params.dayListMarkup=CalendarView.dayList;
this.customDayListMarkup=false
}else{this.customDayListMarkup=true
}if(!this.params.weekNumberMarkup){this.params.weekNumberMarkup=CalendarView.weekNumber
}if(!this.params.weekDayMarkup){this.params.weekDayMarkup=CalendarView.weekDay
}if(!this.params.headerMarkup){this.params.headerMarkup=CalendarView.header
}if(!this.params.footerMarkup){this.params.footerMarkup=CalendarView.footer
}this.popupOffset={dx:(isNaN(this.params.horizontalOffset)?0:parseInt(this.params.horizontalOffset,10)),dy:(isNaN(this.params.verticalOffset)?0:parseInt(this.params.verticalOffset,10))};
this.currentDate=this.params.currentDate?this.params.currentDate:(this.params.selectedDate?this.params.selectedDate:new Date());
this.currentDate.setDate(1);
this.selectedDate=this.params.selectedDate;
if(typeof this.params.boundaryDatesMode=="string"){this.params.boundaryDatesMode=this.params.boundaryDatesMode.toLowerCase()
}if(typeof this.params.todayControlMode=="string"){this.todayControlMode=this.params.todayControlMode.toLowerCase()
}if(typeof this.params.isDayEnabled!="function"){this.params.isDayEnabled=function(d){return true
}
}if(typeof this.params.dayStyleClass!="function"){this.params.dayStyleClass=function(d){return""
}
}this.todayDate=new Date();
this.firstWeekendDayNumber=6-this.params.firstWeekDay;
this.secondWeekendDayNumber=(this.params.firstWeekDay>0?7-this.params.firstWeekDay:0);
this.calendarContext=new CalendarContext(this);
this.DATE_ELEMENT_ID=this.params.dayListTableId+"Cell";
this.WEEKNUMBER_ELEMENT_ID=this.params.weekNumberBarId+"Cell";
this.WEEKDAY_ELEMENT_ID=this.params.weekDayBarId+"Cell";
this.POPUP_ID=this.id+"Popup";
this.POPUP_BUTTON_ID=this.id+"PopupButton";
this.INPUT_DATE_ID=this.id+"InputDate";
this.IFRAME_ID=this.id+"IFrame";
this.EDITOR_ID=this.id+"Editor";
this.EDITOR_SHADOW_ID=this.id+"EditorShadow";
this.TIME_EDITOR_LAYOUT_ID=this.id+"TimeEditorLayout";
this.DATE_EDITOR_LAYOUT_ID=this.id+"DateEditorLayout";
this.EDITOR_LAYOUT_SHADOW_ID=this.id+"EditorLayoutShadow";
this.TIME_EDITOR_BUTTON_OK=this.id+"TimeEditorButtonOk";
this.TIME_EDITOR_BUTTON_CANCEL=this.id+"TimeEditorButtonCancel";
this.DATE_EDITOR_BUTTON_OK=this.id+"DateEditorButtonOk";
this.DATE_EDITOR_BUTTON_CANCEL=this.id+"DateEditorButtonCancel";
this.firstDateIndex=0;
this.daysData={startDate:null,days:[]};
this.days=[];
this.todayCellId=null;
this.todayCellColor="";
this.selectedDateCellId=null;
this.selectedDateCellColor="";
var K="";
this.isVisible=true;
if(this.params.popup==true){K="display:none; position:absolute;";
this.isVisible=false
}var X="$('"+this.id+"').component.";
var M='<table id="'+this.id+'" border="0" cellpadding="0" cellspacing="0" class="rich-calendar-exterior rich-calendar-popup'+(this.params.className?" "+this.params.className:"")+'" style="'+K+this.params.style+'" onclick="'+X+'skipEventOnCollapse=true;"><tbody>';
var D=(this.params.showWeeksBar?"8":"7");
var J=(this.params.optionalHeaderMarkup)?'<tr><td class="rich-calendar-header-optional" colspan="'+D+'" id="'+this.id+'HeaderOptional"></td></tr>':"";
var Y=(this.params.optionalFooterMarkup)?'<tr><td class="rich-calendar-footer-optional" colspan="'+D+'" id="'+this.id+'FooterOptional"></td></tr>':"";
var a=(this.params.showHeader?'<tr><td class="rich-calendar-header" colspan="'+D+'" id="'+this.id+'Header"></td></tr>':"");
var V=(this.params.showFooter?'<tr><td class="rich-calendar-footer" colspan="'+D+'" id="'+this.id+'Footer"></td></tr>':"");
var G="</tbody></table>";
var H='<iframe src="javascript:\'\'" frameborder="0" scrolling="no" id="'+this.IFRAME_ID+'" style="display:none; position: absolute; width: 1px; height: 1px; background-color:white;"></iframe>';
var P;
var A;
var N=[];
var F;
var C=this.params.disabled||this.params.readonly?"":'onclick="'+X+'eventCellOnClick(event, this);" onmouseover="'+X+'eventCellOnMouseOver(event, this);" onmouseout="'+X+'eventCellOnMouseOut(event, this);"';
if(this.params.showWeekDaysBar){N.push('<tr id="'+this.params.weekDayBarId+'">');
if(this.params.showWeeksBar){N.push('<td class="rich-calendar-days"><br/></td>')
}var c=this.params.firstWeekDay;
for(var W=0;
W<7;
W++){F={weekDayLabel:this.params.weekDayLabels[c],weekDayLabelShort:this.params.weekDayLabelsShort[c],weekDayNumber:c,isWeekend:this.isWeekend(W),elementId:this.WEEKDAY_ELEMENT_ID+W,component:this};
var b=this.evaluateMarkup(this.params.weekDayMarkup,F);
if(c==6){c=0
}else{c++
}P="rich-calendar-days";
if(F.isWeekend){P+=" rich-calendar-weekends"
}if(W==6){P+=" rich-right-cell"
}N.push('<td class="'+P+'" id="'+F.elementId+'">'+b+"</td>")
}N.push("</tr>\n")
}var Z=[];
var S=0;
this.dayCellClassName=[];
for(k=1;
k<7;
k++){A=(k==6?"rich-bottom-cell ":"");
Z.push('<tr id="'+this.params.weekNumberBarId+k+'">');
if(this.params.showWeeksBar){F={weekNumber:k,elementId:this.WEEKNUMBER_ELEMENT_ID+k,component:this};
var I=this.evaluateMarkup(this.params.weekNumberMarkup,F);
Z.push('<td class="rich-calendar-week '+A+'" id="'+F.elementId+'">'+I+"</td>")
}for(var W=0;
W<7;
W++){P=A+(!this.params.dayCellClass?"rich-calendar-cell-size":(!this.customDayListMarkup?this.params.dayCellClass:""))+" rich-calendar-cell";
if(W==this.firstWeekendDayNumber||W==this.secondWeekendDayNumber){P+=" rich-calendar-holly"
}if(W==6){P+=" rich-right-cell"
}this.dayCellClassName.push(P);
Z.push('<td class="'+P+'" id="'+this.DATE_ELEMENT_ID+S+'" '+C+">"+(this.customDayListMarkup?'<div class="rich-calendar-cell-div'+(this.params.dayCellClass?" "+this.params.dayCellClass:"")+'"></div>':"")+"</td>");
S++
}Z.push("</tr>")
}var Q=$(this.POPUP_ID).nextSibling;
if(this.params.popup&&Richfaces.browser.isIE6){do{if(Q.id==this.IFRAME_ID){var O=Q;
Q=Q.nextSibling;
Element.replace(O,H);
break
}}while(Q=Q.nextSibling)
}do{if(Q.id==U){var R=Q;
Q=Q.previousSibling;
Element.replace(R,M+J+a+N.join("")+Z.join("")+V+Y+G);
break
}}while(Q=Q.nextSibling);
Q=Q.nextSibling;
Q.component=this;
Q.richfacesComponent="richfaces:calendar";
this["rich:destructor"]="destructor";
Q=null;
if(this.params.submitFunction){this.submitFunction=this.params.submitFunction.bind(this)
}this.prepareEvents();
if(this.params.popup&&!this.params.disabled){var B=new Function("event","$('"+this.id+"').component.doSwitch();").bindAsEventListener();
Event.observe(this.POPUP_BUTTON_ID,"click",B,false);
if(!this.params.enableManualInput){Event.observe(this.INPUT_DATE_ID,"click",B,false)
}}this.scrollElements=null
},destructor:function(){if(this.params.popup&&this.isVisible){Richfaces.removeScrollEventHandlers(this.scrollElements,this.eventOnScroll);
Event.stopObserving(window.document,"click",this.eventOnCollapse,false)
}},dateEditorSelectYear:function(A){if(this.dateEditorYearID){Element.removeClassName(this.dateEditorYearID,"rich-calendar-editor-btn-selected")
}this.dateEditorYear=this.dateEditorStartYear+A;
this.dateEditorYearID=this.DATE_EDITOR_LAYOUT_ID+"Y"+A;
Element.addClassName(this.dateEditorYearID,"rich-calendar-editor-btn-selected")
},dateEditorSelectMonth:function(A){this.dateEditorMonth=A;
Element.removeClassName(this.dateEditorMonthID,"rich-calendar-editor-btn-selected");
this.dateEditorMonthID=this.DATE_EDITOR_LAYOUT_ID+"M"+A;
Element.addClassName(this.dateEditorMonthID,"rich-calendar-editor-btn-selected")
},scrollEditorYear:function(D){var B=$(this.DATE_EDITOR_LAYOUT_ID+"TR");
if(this.dateEditorYearID){Element.removeClassName(this.dateEditorYearID,"rich-calendar-editor-btn-selected");
this.dateEditorYearID=""
}if(!D){if(this.dateEditorMonth!=this.getCurrentMonth()){this.dateEditorMonth=this.getCurrentMonth();
Element.removeClassName(this.dateEditorMonthID,"rich-calendar-editor-btn-selected");
this.dateEditorMonthID=this.DATE_EDITOR_LAYOUT_ID+"M"+this.dateEditorMonth;
Element.addClassName(this.dateEditorMonthID,"rich-calendar-editor-btn-selected")
}}if(B){var F;
var C=this.dateEditorStartYear=this.dateEditorStartYear+D*10;
for(var A=0;
A<5;
A++){B=B.nextSibling;
F=B.firstChild.nextSibling.nextSibling;
F.firstChild.innerHTML=C;
if(C==this.dateEditorYear){Element.addClassName(F.firstChild,"rich-calendar-editor-btn-selected");
this.dateEditorYearID=F.firstChild.id
}F=F.nextSibling;
F.firstChild.innerHTML=C+5;
if(C+5==this.dateEditorYear){Element.addClassName(F.firstChild,"rich-calendar-editor-btn-selected");
this.dateEditorYearID=F.firstChild.id
}C++
}}},updateDateEditor:function(){this.dateEditorYear=this.getCurrentYear();
this.dateEditorStartYear=this.getCurrentYear()-4;
this.scrollEditorYear(0)
},updateTimeEditor:function(){var G=$(this.id+"TimeHours");
var F=$(this.id+"TimeSign");
var C=$(this.id+"TimeMinutes");
var D=this.selectedDate.getHours();
var A=this.selectedDate.getMinutes();
if(this.timeType==2){var B=(D<12?"AM":"PM");
F.value=B;
D=(D==0?"12":(D>12?D-12:D))
}G.value=(this.timeHoursDigits==2&&D<10?"0"+D:D);
C.value=(A<10?"0"+A:A)
},createEditor:function(){var F=$(this.id);
var A='<div id="'+this.EDITOR_SHADOW_ID+'" class="rich-calendar-editor-shadow" style="position:absolute; display:none;"></div><table border="0" cellpadding="0" cellspacing="0" id="'+this.EDITOR_ID+'" style="position:absolute; display:none;" onclick="$(\''+this.id+'\').component.skipEventOnCollapse=true;"><tbody><tr><td class="rich-calendar-editor-container" align="center"><div style="position:relative; width:100%">';
var H='<div id="'+this.EDITOR_LAYOUT_SHADOW_ID+'" class="rich-calendar-editor-layout-shadow"></div>';
var C="</div></td></tr></tbody></table>";
new Insertion.After(F,A+H+C);
var B=$(this.EDITOR_SHADOW_ID);
var G=$(this.EDITOR_ID);
var D=F.getStyle("z-index");
B.style.zIndex=D;
G.style.zIndex=parseInt(D,10)+1;
this.isEditorCreated=true;
return G
},createTimeEditorLayout:function(B){Element.insert(this.EDITOR_LAYOUT_SHADOW_ID,{after:this.evaluateMarkup(this.calendarContext.timeEditorLayout,this.calendarContext)});
var D=$(this.id+"TimeHours");
var C;
var A=$(this.id+"TimeMinutes");
if(this.timeType==1){sbjQuery(D).SpinButton({digits:this.timeHoursDigits,min:0,max:23})
}else{sbjQuery(D).SpinButton({digits:this.timeHoursDigits,min:1,max:12});
C=$(this.id+"TimeSign");
sbjQuery(C).SpinButton({})
}sbjQuery(A).SpinButton({digits:2,min:0,max:59});
this.correctEditorButtons(B,this.TIME_EDITOR_BUTTON_OK,this.TIME_EDITOR_BUTTON_CANCEL);
this.isTimeEditorLayoutCreated=true
},correctEditorButtons:function(G,C,B){var I=$(C);
var F=$(B);
G.style.visibility="hidden";
G.style.display="";
var H=Richfaces.Calendar.getOffsetDimensions(I.firstChild).width;
var D=Richfaces.Calendar.getOffsetDimensions(F.firstChild).width;
G.style.display="none";
G.style.visibility="";
var A=Richfaces.getComputedStyleSize(I,"width");
if(H>A||D>A){I.style.width=F.style.width=(H>D?H:D)+"px"
}},createDECell:function(G,D,A,F,C){if(A==0){return'<div id="'+G+'" class="rich-calendar-editor-btn'+(C?" "+C:"")+'" onmouseover="this.className=\'rich-calendar-editor-btn rich-calendar-editor-tool-over\';" onmouseout="this.className=\'rich-calendar-editor-btn\';" onmousedown="this.className=\'rich-calendar-editor-btn rich-calendar-editor-tool-press\';" onmouseup="this.className=\'rich-calendar-editor-btn rich-calendar-editor-tool-over\';" onclick="$(\''+this.id+"').component.scrollEditorYear("+F+');">'+D+"</div>"
}else{var B=(A==1?"$('"+this.id+"').component.dateEditorSelectMonth("+F+");":"$('"+this.id+"').component.dateEditorSelectYear("+F+");");
return'<div id="'+G+'" class="rich-calendar-editor-btn'+(C?" "+C:"")+'" onmouseover="Element.addClassName(this, \'rich-calendar-editor-btn-over\');" onmouseout="Element.removeClassName(this,\'rich-calendar-editor-btn-over\');" onclick="'+B+'">'+D+"</div>"
}},createDateEditorLayout:function(F){var A='<table id="'+this.DATE_EDITOR_LAYOUT_ID+'" class="rich-calendar-date-layout" border="0" cellpadding="0" cellspacing="0"><tbody><tr id="'+this.DATE_EDITOR_LAYOUT_ID+'TR">';
var B="</tr></tbody></table>";
var G=0;
this.dateEditorYear=this.getCurrentYear();
var D=this.dateEditorStartYear=this.dateEditorYear-4;
var H='<td align="center">'+this.createDECell(this.DATE_EDITOR_LAYOUT_ID+"M"+G,this.params.monthLabelsShort[G],1,G)+'</td><td align="center" class="rich-calendar-date-layout-split">'+this.createDECell(this.DATE_EDITOR_LAYOUT_ID+"M"+(G+6),this.params.monthLabelsShort[G+6],1,G+6)+'</td><td align="center">'+this.createDECell("","&lt;",0,-1)+'</td><td align="center">'+this.createDECell("","&gt;",0,1)+"</td>";
G++;
for(var C=0;
C<5;
C++){H+='</tr><tr><td align="center">'+this.createDECell(this.DATE_EDITOR_LAYOUT_ID+"M"+G,this.params.monthLabelsShort[G],1,G)+'</td><td align="center" class="rich-calendar-date-layout-split">'+this.createDECell(this.DATE_EDITOR_LAYOUT_ID+"M"+(G+6),this.params.monthLabelsShort[G+6],1,G+6)+'</td><td align="center">'+this.createDECell(this.DATE_EDITOR_LAYOUT_ID+"Y"+C,D,2,C,(C==4?"rich-calendar-editor-btn-selected":""))+'</td><td align="center">'+this.createDECell(this.DATE_EDITOR_LAYOUT_ID+"Y"+(C+5),D+5,2,C+5)+"</td>";
G++;
D++
}this.dateEditorYearID=this.DATE_EDITOR_LAYOUT_ID+"Y4";
this.dateEditorMonth=this.getCurrentMonth();
this.dateEditorMonthID=this.DATE_EDITOR_LAYOUT_ID+"M"+this.dateEditorMonth;
H+='</tr><tr><td colspan="2" class="rich-calendar-date-layout-ok"><div id="'+this.DATE_EDITOR_BUTTON_OK+'" class="rich-calendar-time-btn" style="float:right;" onmousedown="Element.addClassName(this, \'rich-calendar-time-btn-press\');" onmouseout="Element.removeClassName(this, \'rich-calendar-time-btn-press\');" onmouseup="Element.removeClassName(this, \'rich-calendar-time-btn-press\');" onclick="$(\''+this.id+"').component.hideDateEditor(true);\"><span>"+this.params.labels.ok+'</span></div></td><td colspan="2" class="rich-calendar-date-layout-cancel"><div id="'+this.DATE_EDITOR_BUTTON_CANCEL+'" class="rich-calendar-time-btn" style="float:left;" onmousedown="Element.addClassName(this, \'rich-calendar-time-btn-press\');" onmouseout="Element.removeClassName(this, \'rich-calendar-time-btn-press\');" onmouseup="Element.removeClassName(this, \'rich-calendar-time-btn-press\');" onclick="$(\''+this.id+"').component.hideDateEditor(false);\"><span>"+this.params.labels.cancel+"</span></div></td>";
Element.insert(this.EDITOR_LAYOUT_SHADOW_ID,{after:A+H+B});
Element.addClassName(this.dateEditorMonthID,"rich-calendar-editor-btn-selected");
this.correctEditorButtons(F,this.DATE_EDITOR_BUTTON_OK,this.DATE_EDITOR_BUTTON_CANCEL);
this.isDateEditorLayoutCreated=true
},createSpinnerTable:function(A){return'<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="rich-calendar-spinner-input-container"><input id="'+A+'" name="'+A+'" class="rich-calendar-spinner-input" type="text" /></td><td class="rich-calendar-spinner-buttons"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div id="'+A+'BtnUp" class="rich-calendar-spinner-up" onmousedown="this.className=\'rich-calendar-spinner-up rich-calendar-spinner-pressed\'" onmouseup="this.className=\'rich-calendar-spinner-up\'" onmouseout="this.className=\'rich-calendar-spinner-up\'"><span></span></div></td></tr><tr><td><div id="'+A+'BtnDown" class="rich-calendar-spinner-down" onmousedown="this.className=\'rich-calendar-spinner-down rich-calendar-spinner-pressed\'" onmouseup="this.className=\'rich-calendar-spinner-down\'" onmouseout="this.className=\'rich-calendar-spinner-down\'"><span></span></div></td></tr></tbody></table></td></tr></tbody></table>'
},setTimeProperties:function(){this.timeType=0;
var Q=this.params.datePattern;
var N=[];
var P=/(\\\\|\\[yMdaHhm])|(y+|M+|d+|a|H{1,2}|h{1,2}|m{2})/g;
var B;
while(B=P.exec(Q)){if(!B[1]){N.push({str:B[0],marker:B[2],idx:B.index})
}}var F="";
var R="";
var G,M,I,H,O;
var D=this.id;
var C=function(S){return(S.length==0?K.marker:Q.substring(N[L-1].str.length+N[L-1].idx,K.idx+K.str.length))
};
for(var L=0;
L<N.length;
L++){var K=N[L];
var A=K.marker.charAt(0);
if(A=="y"||A=="M"||A=="d"){F+=C(F)
}else{if(A=="a"){O=true;
R+=C(R)
}else{if(A=="H"){M=true;
G=K.marker.length;
R+=C(R)
}else{if(A=="h"){I=true;
G=K.marker.length;
R+=C(R)
}else{if(A=="m"){H=true;
R+=C(R)
}}}}}}this.datePattern=F;
this.timePattern=R;
var J=this;
this.timePatternHtml=R.replace(/(\\\\|\\[yMdaHhm])|(H{1,2}|h{1,2}|m{2}|a)/g,function(S,V,U){if(V){return V.charAt(1)
}switch(U){case"a":return"</td><td>"+J.createSpinnerTable(D+"TimeSign")+"</td><td>";
case"H":case"HH":case"h":case"hh":return"</td><td>"+J.createSpinnerTable(D+"TimeHours")+"</td><td>";
case"mm":return"</td><td>"+J.createSpinnerTable(D+"TimeMinutes")+"</td><td>"
}});
this.timePatternHtml='<table border="0" cellpadding="0"><tbody><tr><td>'+this.timePatternHtml+"</td></tr></tbody></table>";
if(H&&M){this.timeType=1
}else{if(H&&I&&O){this.timeType=2
}}this.timeHoursDigits=G
},eventOnScroll:function(A){this.doCollapse()
},doCollapse:function(){if(!this.params.popup||!this.isVisible){return 
}if(this.isEditorVisible){this.hideEditor()
}var A=$(this.id);
if(this.invokeEvent("collapse",A)){Richfaces.removeScrollEventHandlers(this.scrollElements,this.eventOnScroll);
Event.stopObserving(window.document,"click",this.eventOnCollapse,false);
var B=null;
if(Richfaces.browser.isIE6){B=$(this.IFRAME_ID)
}if(B){Element.hide(B)
}Element.hide(A);
this.isVisible=false
}},collapse:function(){this.doCollapse()
},doExpand:function(J){if(!this.isRendered){this.isRendered=true;
this.render()
}this.skipEventOnCollapse=false;
if(J&&J.type=="click"){this.skipEventOnCollapse=true
}if(!this.params.popup||this.isVisible){return 
}var H=$(this.id);
if(this.invokeEvent("expand",H,J)){var F=null;
if(Richfaces.browser.isIE6){F=$(this.IFRAME_ID)
}var B=$(this.POPUP_ID);
var N=B.firstChild;
var O=N.nextSibling;
if(N&&N.value!=undefined){this.selectDate(N.value,false,{event:J,element:H})
}var C=Position.cumulativeOffset(O);
if(this.params.showInput){var G=Position.cumulativeOffset(N);
C=[C[0]<G[0]?C[0]:G[0],C[1]<G[1]?C[1]:G[1]];
var M=Richfaces.Calendar.getOffsetDimensions(N)
}var K=Richfaces.Calendar.getOffsetDimensions(B);
var I=Richfaces.Calendar.getOffsetDimensions(O);
var L=(window.opera?[0,0]:Position.realOffset(O));
var D={left:C[0]-L[0],top:C[1]-L[1],width:K.width,height:(M&&M.height>I.height?M.height:I.height)};
Richfaces.Calendar.setElementPosition(H,D,this.params.jointPoint,this.params.direction,this.popupOffset);
if(F){F.style.left=H.style.left;
F.style.top=H.style.top;
var A=Richfaces.Calendar.getOffsetDimensions(H);
F.style.width=A.width+"px";
F.style.height=A.height+"px";
Element.show(F)
}Element.show(H);
this.isVisible=true;
Event.observe(window.document,"click",this.eventOnCollapse,false);
Richfaces.removeScrollEventHandlers(this.scrollElements,this.eventOnScroll);
if(this.params.hidePopupOnScroll){this.scrollElements=Richfaces.setupScrollEventHandlers(H,this.eventOnScroll)
}}},expand:function(A){this.doExpand(A)
},doSwitch:function(A){this.isVisible?this.doCollapse():this.doExpand(A)
},switchState:function(A){this.doSwitch(A)
},eventOnCollapse:function(A){if(this.skipEventOnCollapse){this.skipEventOnCollapse=false;
return true
}if(Event.element(A).id==this.POPUP_BUTTON_ID||(!this.params.enableManualInput&&Event.element(A).id==this.INPUT_DATE_ID)){return true
}if(Position.within($(this.id),Event.pointerX(A),Event.pointerY(A))){return true
}this.doCollapse();
return true
},setInputField:function(A,B){var C=$(this.INPUT_DATE_ID);
if(C.value!=A){C.value=A;
this.invokeEvent("changed",C,B,this.selectedDate)
}},getCurrentDate:function(){return this.currentDate
},getSelectedDate:function(){if(!this.selectedDate){return null
}else{return this.selectedDate
}},getSelectedDateString:function(A){if(!this.selectedDate){return""
}if(!A){A=this.params.datePattern
}return Richfaces.Calendar.formatDate(this.selectedDate,A,this.params.monthLabels,this.params.monthLabelsShort)
},getPrevYear:function(){var A=this.currentDate.getFullYear()-1;
if(A<0){A=0
}return A
},getPrevMonth:function(A){var B=this.currentDate.getMonth()-1;
if(B<0){B=11
}if(A){return this.params.monthLabels[B]
}else{return B
}},getCurrentYear:function(){return this.currentDate.getFullYear()
},getCurrentMonth:function(A){var B=this.currentDate.getMonth();
if(A){return this.params.monthLabels[B]
}else{return B
}},getNextYear:function(){return this.currentDate.getFullYear()+1
},getNextMonth:function(A){var B=this.currentDate.getMonth()+1;
if(B>11){B=0
}if(A){return this.params.monthLabels[B]
}else{return B
}},isWeekend:function(A){return(A==this.firstWeekendDayNumber||A==this.secondWeekendDayNumber)
},prepareEvents:function(){this.eventOnCollapse=this.eventOnCollapse.bindAsEventListener(this);
this.eventOnScroll=this.eventOnScroll.bindAsEventListener(this)
},invokeEvent:function(B,D,G,C){var F=this.params["on"+B];
var A;
if(F){var H;
if(G){H=G
}else{if(document.createEventObject){H=document.createEventObject()
}else{if(document.createEvent){H=document.createEvent("Events");
H.initEvent(B,true,false)
}}}H.rich={component:this};
H.rich.date=C;
try{A=F.call(D,H)
}catch(I){LOG.warn("Exception: "+I.Message+"\n[on"+B+"]")
}}if(A!=false){A=true
}return A
},setupTimeForDate:function(A){if(this.selectedDate&&(!this.params.resetTimeOnDateSelect||(this.selectedDate.getFullYear()==A.getFullYear()&&this.selectedDate.getMonth()==A.getMonth()&&this.selectedDate.getDate()==A.getDate()))){A.setHours(this.selectedDate.getHours());
A.setMinutes(this.selectedDate.getMinutes())
}else{A.setHours(this.params.defaultTime.hours);
A.setMinutes(this.params.defaultTime.minutes)
}},eventCellOnClick:function(D,C){var B=this.days[parseInt(C.id.substr(this.DATE_ELEMENT_ID.length),10)];
if(B.enabled&&B._month==0){var A=new Date(this.currentDate);
A.setDate(B.day);
if(this.timeType){this.setupTimeForDate(A)
}if(this.selectDate(A,true,{event:D,element:C})&&!this.showApplyButton){this.doCollapse()
}}else{if(B._month!=0){if(this.params.boundaryDatesMode=="scroll"){if(B._month==-1){this.prevMonth()
}else{this.nextMonth()
}}else{if(this.params.boundaryDatesMode=="select"){var A=new Date(B.date);
if(this.timeType){this.setupTimeForDate(A)
}if(this.selectDate(A,false,{event:D,element:C})&&!this.showApplyButton){this.doCollapse()
}}}}}},eventCellOnMouseOver:function(C,B){var A=this.days[parseInt(B.id.substr(this.DATE_ELEMENT_ID.length),10)];
if(this.invokeEvent("datemouseover",B,C,A.date)&&A.enabled){if(A._month==0&&B.id!=this.selectedDateCellId&&B.id!=this.todayCellId){Element.addClassName(B,"rich-calendar-hover")
}}},eventCellOnMouseOut:function(C,B){var A=this.days[parseInt(B.id.substr(this.DATE_ELEMENT_ID.length),10)];
if(this.invokeEvent("datemouseout",B,C,A.date)&&A.enabled){if(A._month==0&&B.id!=this.selectedDateCellId&&B.id!=this.todayCellId){Element.removeClassName(B,"rich-calendar-hover")
}}},load:function(B,A){if(B){this.daysData=this.indexData(B,A)
}else{this.daysData=null
}this.isRendered=false;
if(this.isVisible){this.render()
}if(typeof this.afterLoad=="function"){this.afterLoad();
this.afterLoad=null
}},indexData:function(F,B){var C=F.startDate.getFullYear();
var D=F.startDate.getMonth();
F.index=[];
F.index[C+"-"+D]=0;
if(B){this.currentDate=F.startDate;
this.currentDate.setDate(1);
return F
}var A=daysInMonthByDate(F.startDate)-F.startDate.getDate()+1;
while(F.days[A]){if(D==11){C++;
D=0
}else{D++
}F.index[C+"-"+D]=A;
A+=(32-new Date(C,D,32).getDate())
}return F
},getCellBackgroundColor:function(D){var A;
if(Richfaces.browser.isSafari&&this.params.popup&&!this.isVisible){var C=$(this.id).style;
var F=C.visibility;
var B=C.display;
C.visibility="hidden";
C.display="";
A=Element.getStyle(D,"background-color").parseColor();
C.display=B;
C.visibility=F
}else{A=Element.getStyle(D,"background-color").parseColor()
}return A
},clearEffect:function(A,C,B,F){if(C){C.cancel();
C=null
}if(A){var D=$(A);
D.style["backgroundColor"]="";
if(B){Element.removeClassName(D,B)
}if(F){Element.addClassName(D,F)
}}return null
},render:function(){this.isRendered=true;
this.todayDate=new Date();
var d=this.getCurrentYear();
var R=this.getCurrentMonth();
var L=(d==this.todayDate.getFullYear()&&R==this.todayDate.getMonth());
var Q=this.todayDate.getDate();
var S=this.selectedDate&&(d==this.selectedDate.getFullYear()&&R==this.selectedDate.getMonth());
var X=this.selectedDate&&this.selectedDate.getDate();
var H=getDay(this.currentDate,this.params.firstWeekDay);
var G=daysInMonthByDate(this.currentDate);
var A=daysInMonth(d,R-1);
var P=0;
var c=-1;
this.days=[];
var K=A-H+1;
if(H>0){while(K<=A){this.days.push({day:K,isWeekend:this.isWeekend(P),_month:c});
K++;
P++
}}K=1;
c=0;
this.firstDateIndex=P;
if(this.daysData&&this.daysData.index[d+"-"+R]!=undefined){var O=this.daysData.index[d+"-"+R];
if(this.daysData.startDate.getFullYear()==d&&this.daysData.startDate.getMonth()==R){var J=J=(this.daysData.days[O].day?this.daysData.days[O].day:this.daysData.startDate.getDate());
while(K<J){this.days.push({day:K,isWeekend:this.isWeekend(P%7),_month:c});
K++;
P++
}}var W=this.daysData.days.length;
var M;
var V;
while(O<W&&K<=G){V=this.isWeekend(P%7);
M=this.daysData.days[O];
M.day=K;
M.isWeekend=V;
M._month=c;
this.days.push(M);
O++;
K++;
P++
}}while(P<42){if(K>G){K=1;
c=1
}this.days.push({day:K,isWeekend:this.isWeekend(P%7),_month:c});
K++;
P++
}this.renderHF();
P=0;
var B;
var I;
var D;
if(this.params.showWeeksBar){D=weekNumber(d,R,this.params.minDaysInFirstWeek,this.params.firstWeekDay)
}this.selectedDayElement=null;
var N=true;
var Y;
var a=(this.params.boundaryDatesMode=="scroll"||this.params.boundaryDatesMode=="select");
this.todayCellId=this.clearEffect(this.todayCellId,this.highlightEffect);
this.selectedDateCellId=this.clearEffect(this.selectedDateCellId,this.highlightEffect2);
var M=$(this.params.weekNumberBarId+"1");
for(var U=1;
U<7;
U++){I=this.days[P];
B=M.firstChild;
var Z;
if(this.params.showWeeksBar){if(N&&R==11&&(U==5||U==6)&&(I._month==1||(G-I.day+1)<this.params.minDaysInFirstWeek)){D=1;
N=false
}Z=D;
B.innerHTML=this.evaluateMarkup(this.params.weekNumberMarkup,{weekNumber:D++,elementId:B.id,component:this});
if(U==1&&D>52){D=1
}B=B.nextSibling
}var f=this.params.firstWeekDay;
var F=null;
while(B){I.elementId=B.id;
I.date=new Date(d,R+I._month,I.day);
I.weekNumber=Z;
I.component=this;
I.isCurrentMonth=(I._month==0);
I.weekDayNumber=f;
if(I.enabled!=false){I.enabled=this.params.isDayEnabled(I)
}if(!I.styleClass){I.customStyleClass=this.params.dayStyleClass(I)
}else{var C=this.params.dayStyleClass(I);
I.customStyleClass=I.styleClass;
if(C){I.customStyleClass+=" "+C
}}F=(this.customDayListMarkup?B.firstChild:B);
F.innerHTML=this.evaluateMarkup(this.params.dayListMarkup,I);
if(f==6){f=0
}else{f++
}var b=this.dayCellClassName[P];
if(I._month!=0){b+=" rich-calendar-boundary-dates";
if(!this.params.disabled&&!this.params.readonly&&a){b+=" rich-calendar-btn"
}}else{if(L&&I.day==Q){this.todayCellId=B.id;
this.todayCellColor=this.getCellBackgroundColor(B);
b+=" rich-calendar-today"
}if(S&&I.day==X){this.selectedDateCellId=B.id;
this.selectedDateCellColor=this.getCellBackgroundColor(B);
b+=" rich-calendar-select"
}else{if(!this.params.disabled&&!this.params.readonly&&I.enabled){b+=" rich-calendar-btn"
}}if(I.customStyleClass){b+=" "+I.customStyleClass
}}B.className=b;
P++;
I=this.days[P];
B=B.nextSibling
}M=M.nextSibling
}},renderHF:function(){if(this.params.showHeader){this.renderMarkup(this.params.headerMarkup,this.id+"Header",this.calendarContext)
}if(this.params.showFooter){this.renderMarkup(this.params.footerMarkup,this.id+"Footer",this.calendarContext)
}this.renderHeaderOptional();
this.renderFooterOptional()
},renderHeaderOptional:function(){this.renderMarkup(this.params.optionalHeaderMarkup,this.id+"HeaderOptional",this.calendarContext)
},renderFooterOptional:function(){this.renderMarkup(this.params.optionalFooterMarkup,this.id+"FooterOptional",this.calendarContext)
},renderMarkup:function(B,A,C){if(!B){return 
}var D=$(A);
if(!D){return 
}D.innerHTML=B.invoke("getContent",C).join("")
},evaluateMarkup:function(A,B){if(!A){return""
}return A.invoke("getContent",B).join("")
},onUpdate:function(){var A=Richfaces.Calendar.formatDate(this.getCurrentDate(),"MM/yyyy");
$(this.id+"InputCurrentDate").value=A;
if(this.submitFunction){this.submitFunction(A)
}else{this.render()
}},nextMonth:function(){this.changeCurrentDateOffset(0,1)
},prevMonth:function(){this.changeCurrentDateOffset(0,-1)
},nextYear:function(){this.changeCurrentDateOffset(1,0)
},prevYear:function(){this.changeCurrentDateOffset(-1,0)
},changeCurrentDate:function(B,D,C){if(this.getCurrentMonth()!=D||this.getCurrentYear()!=B){var A=new Date(B,D,1);
if(this.invokeEvent("currentdateselect",$(this.id),null,A)){this.currentDate=A;
if(C){this.render()
}else{this.onUpdate()
}this.invokeEvent("currentdateselected",$(this.id),null,A);
return true
}}return false
},changeCurrentDateOffset:function(B,C){var A=new Date(this.currentDate.getFullYear()+B,this.currentDate.getMonth()+C,1);
if(this.invokeEvent("currentdateselect",$(this.id),null,A)){this.currentDate=A;
this.onUpdate();
this.invokeEvent("currentdateselected",$(this.id),null,A)
}},today:function(D,G){var B=new Date();
var F=B.getFullYear();
var H=B.getMonth();
var C=B.getDate();
var A=false;
if(C!=this.todayDate.getDate()){A=true;
this.todayDate=B
}if(F!=this.currentDate.getFullYear()||H!=this.currentDate.getMonth()){A=true;
this.currentDate=new Date(F,H,1)
}if(this.todayControlMode=="select"){G=true
}if(A){if(D){this.render()
}else{this.onUpdate()
}}else{if(this.isVisible&&this.todayCellId&&!G){this.clearEffect(this.todayCellId,this.highlightEffect);
if(this.todayCellColor!="transparent"){this.highlightEffect=new Effect.Highlight($(this.todayCellId),{startcolor:this.todayCellColor,duration:0.3,transition:Effect.Transitions.sinoidal,afterFinish:this.onHighlightFinish})
}}}if(this.todayControlMode=="select"&&!this.params.disabled&&!this.params.readonly){if(A&&!D&&this.submitFunction){this.afterLoad=this.selectToday
}else{this.selectToday()
}}},selectToday:function(){if(this.todayCellId){var C=this.days[parseInt($(this.todayCellId).id.substr(this.DATE_ELEMENT_ID.length),10)];
var A=new Date();
var B=new Date(A.getFullYear(),A.getMonth(),A.getDate());
if(this.timeType){this.setupTimeForDate(B)
}if(C.enabled&&this.selectDate(B,true)&&!this.showApplyButton){this.doCollapse()
}}},onHighlightFinish:function(A){A.element.style["backgroundColor"]=""
},selectDate:function(C,B,I){if(!I){I={event:null,element:null}
}var A=this.selectedDate;
var J;
if(C){if(typeof C=="string"){C=Richfaces.Calendar.parseDate(C,this.params.datePattern,this.params.monthLabels,this.params.monthLabelsShort)
}J=C
}else{J=null
}var F=true;
var G=false;
if((A-J)&&(A!=null||J!=null)){G=true;
F=this.invokeEvent("dateselect",I.element,I.event,C)
}if(F){if(J!=null){if(J.getMonth()==this.currentDate.getMonth()&&J.getFullYear()==this.currentDate.getFullYear()){this.selectedDate=J;
if(!A||(A-this.selectedDate)){var D=$(this.DATE_ELEMENT_ID+(this.firstDateIndex+this.selectedDate.getDate()-1));
this.clearEffect(this.selectedDateCellId,this.highlightEffect2,"rich-calendar-select",(this.params.disabled||this.params.readonly?null:"rich-calendar-btn"));
this.selectedDateCellId=D.id;
this.selectedDateCellColor=this.getCellBackgroundColor(D);
Element.removeClassName(D,"rich-calendar-btn");
Element.removeClassName(D,"rich-calendar-hover");
Element.addClassName(D,"rich-calendar-select");
this.renderHF()
}else{if(this.timeType!=0){this.renderHF()
}}}else{this.selectedDate=J;
if(this.changeCurrentDate(J.getFullYear(),J.getMonth(),B)){}else{this.selectedDate=A;
G=false
}}}else{this.selectedDate=null;
this.clearEffect(this.selectedDateCellId,this.highlightEffect2,"rich-calendar-select",(this.params.disabled||this.params.readonly?null:"rich-calendar-btn"));
if(this.selectedDateCellId){this.selectedDateCellId=null;
this.renderHF()
}var C=new Date();
if(this.currentDate.getMonth()==C.getMonth()&&this.currentDate.getFullYear()==C.getFullYear()){this.renderHF()
}var H=this.todayControlMode;
this.todayControlMode="";
this.today(B,true);
this.todayControlMode=H
}if(G){this.invokeEvent("dateselected",I.element,I.event,this.selectedDate);
if(!this.showApplyButton){this.setInputField(this.selectedDate!=null?this.getSelectedDateString(this.params.datePattern):"",I.event)
}}}return G
},resetSelectedDate:function(){if(!this.selectedDate){return 
}if(this.invokeEvent("dateselect",null,null,null)){this.selectedDate=null;
this.invokeEvent("dateselected",null,null,null);
this.selectedDateCellId=this.clearEffect(this.selectedDateCellId,this.highlightEffect2,"rich-calendar-select",(this.params.disabled||this.params.readonly?null:"rich-calendar-btn"));
this.renderHF();
if(!this.showApplyButton){this.setInputField("",null);
this.doCollapse()
}}},showSelectedDate:function(){if(!this.selectedDate){return 
}if(this.currentDate.getMonth()!=this.selectedDate.getMonth()||this.currentDate.getFullYear()!=this.selectedDate.getFullYear()){this.currentDate=new Date(this.selectedDate);
this.currentDate.setDate(1);
this.onUpdate()
}else{if(this.isVisible&&this.selectedDateCellId){this.clearEffect(this.selectedDateCellId,this.highlightEffect2);
if(this.selectedDateCellColor!="transparent"){this.highlightEffect2=new Effect.Highlight($(this.selectedDateCellId),{startcolor:this.selectedDateCellColor,duration:0.3,transition:Effect.Transitions.sinoidal,afterFinish:this.onHighlightFinish})
}}}},close:function(A){if(A){this.setInputField(this.getSelectedDateString(this.params.datePattern),null)
}this.doCollapse()
},setEditorPosition:function(A,B,D){A;
var C=Richfaces.Calendar.getOffsetDimensions(A);
B.style.width=D.style.width=C.width+"px";
B.style.height=D.style.height=C.height+"px";
Richfaces.Calendar.clonePosition([B,D],A)
},showTimeEditor:function(){var B;
if(this.timeType==0){return 
}if(!this.isEditorCreated){B=this.createEditor()
}else{B=$(this.EDITOR_ID)
}if(!this.isTimeEditorLayoutCreated){this.createTimeEditorLayout(B)
}$(this.TIME_EDITOR_LAYOUT_ID).show();
var A=$(this.EDITOR_SHADOW_ID);
this.setEditorPosition($(this.id),B,A);
this.updateTimeEditor();
A.show();
B.show();
Element.clonePosition(this.EDITOR_LAYOUT_SHADOW_ID,this.TIME_EDITOR_LAYOUT_ID,{offsetLeft:3,offsetTop:3});
this.isEditorVisible=true
},hideEditor:function(){if(this.isTimeEditorLayoutCreated){$(this.TIME_EDITOR_LAYOUT_ID).hide()
}if(this.isDateEditorLayoutCreated){$(this.DATE_EDITOR_LAYOUT_ID).hide()
}$(this.EDITOR_ID).hide();
$(this.EDITOR_SHADOW_ID).hide();
this.isEditorVisible=false
},hideTimeEditor:function(C){this.hideEditor();
if(C&&this.selectedDate){var A=parseInt($(this.id+"TimeMinutes").value,10);
var D=parseInt($(this.id+"TimeHours").value,10);
if(this.timeType==2){if($(this.id+"TimeSign").value.toLowerCase()=="am"){if(D==12){D=0
}}else{if(D!=12){D+=12
}}}var B=new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth(),this.selectedDate.getDate(),D,A,0);
if(B-this.selectedDate&&this.invokeEvent("timeselect",null,null,B)){this.selectedDate=B;
this.renderHF();
if(!this.params.popup||!this.showApplyButton){this.setInputField(this.getSelectedDateString(this.params.datePattern),null)
}this.invokeEvent("timeselected",null,null,this.selectedDate)
}}if(this.params.popup&&!this.showApplyButton){this.close(false)
}},showDateEditor:function(){var B;
if(!this.isEditorCreated){B=this.createEditor()
}else{B=$(this.EDITOR_ID)
}if(!this.isDateEditorLayoutCreated){this.createDateEditorLayout(B)
}else{this.updateDateEditor()
}$(this.DATE_EDITOR_LAYOUT_ID).show();
var A=$(this.EDITOR_SHADOW_ID);
this.setEditorPosition($(this.id),B,A);
A.show();
B.show();
Element.clonePosition(this.EDITOR_LAYOUT_SHADOW_ID,this.DATE_EDITOR_LAYOUT_ID,{offsetLeft:3,offsetTop:3});
this.isEditorVisible=true
},hideDateEditor:function(A){this.hideEditor();
if(A){this.changeCurrentDate(this.dateEditorYear,this.dateEditorMonth)
}}});
CalendarView={};
CalendarView.getControl=function(F,B,C,D){var A=Object.extend({onclick:(C?"Richfaces.getComponent('calendar',this)."+C+"("+(D?D:"")+");":"")+"return true;"},B);
return new E("div",A,[new T(F)])
};
CalendarView.getSelectedDateControl=function(C){if(!C.selectedDate||C.showApplyButton){return""
}var D=Richfaces.Calendar.formatDate(C.selectedDate,(C.timeType?C.datePattern:C.params.datePattern),C.params.monthLabels,C.params.monthLabelsShort);
var B="Richfaces.getComponent('calendar',this).showSelectedDate(); return true;";
var A=(C.params.disabled?new E("div",{"class":"rich-calendar-tool-btn-disabled"},[new ET(D)]):new E("div",{"class":"rich-calendar-tool-btn","onclick":B},[new ET(D)]));
return A
};
CalendarView.getTimeControl=function(D){if(!D.selectedDate||!D.timeType){return""
}var G=Richfaces.Calendar.formatDate(D.selectedDate,D.timePattern,D.params.monthLabels,D.params.monthLabelsShort);
var F="Element.removeClassName(this, 'rich-calendar-tool-btn-press');";
var C="Element.addClassName(this, 'rich-calendar-tool-btn-press');";
var B="Richfaces.getComponent('calendar',this).showTimeEditor();return true;";
var A=D.params.disabled||D.params.readonly?new E("div",{"class":"rich-calendar-tool-btn-disabled"},[new ET(G)]):new E("div",{"class":"rich-calendar-tool-btn rich-calendar-tool-btn-hover rich-calendar-tool-btn-press","onclick":B,"onmouseover":+F,"onmouseout":+C},[new ET(G)]);
return A
};
CalendarView.toolButtonAttributes={className:"rich-calendar-tool-btn",onmouseover:"this.className='rich-calendar-tool-btn rich-calendar-tool-btn-hover'",onmouseout:"this.className='rich-calendar-tool-btn'",onmousedown:"this.className='rich-calendar-tool-btn rich-calendar-tool-btn-hover rich-calendar-tool-btn-press'",onmouseup:"this.className='rich-calendar-tool-btn rich-calendar-tool-btn-hover'"};
CalendarView.nextYearControl=function(A){return(!A.calendar.params.disabled?CalendarView.getControl(">>",CalendarView.toolButtonAttributes,"nextYear"):"")
};
CalendarView.previousYearControl=function(A){return(!A.calendar.params.disabled?CalendarView.getControl("<<",CalendarView.toolButtonAttributes,"prevYear"):"")
};
CalendarView.nextMonthControl=function(A){return(!A.calendar.params.disabled?CalendarView.getControl(">",CalendarView.toolButtonAttributes,"nextMonth"):"")
};
CalendarView.previousMonthControl=function(A){return(!A.calendar.params.disabled?CalendarView.getControl("<",CalendarView.toolButtonAttributes,"prevMonth"):"")
};
CalendarView.currentMonthControl=function(B){var C=Richfaces.Calendar.formatDate(B.calendar.getCurrentDate(),"MMMM, yyyy",B.monthLabels,B.monthLabelsShort);
var A=B.calendar.params.disabled?new E("div",{className:"rich-calendar-tool-btn-disabled"},[new T(C)]):CalendarView.getControl(C,CalendarView.toolButtonAttributes,"showDateEditor");
return A
};
CalendarView.todayControl=function(A){return(!A.calendar.params.disabled&&A.calendar.todayControlMode!="hidden"?CalendarView.getControl(A.controlLabels.today,CalendarView.toolButtonAttributes,"today"):"")
};
CalendarView.closeControl=function(A){return(A.calendar.params.popup?CalendarView.getControl(A.controlLabels.close,CalendarView.toolButtonAttributes,"close","false"):"")
};
CalendarView.applyControl=function(A){return(!A.calendar.params.disabled&&!A.calendar.params.readonly&&A.calendar.showApplyButton?CalendarView.getControl(A.controlLabels.apply,CalendarView.toolButtonAttributes,"close","true"):"")
};
CalendarView.cleanControl=function(A){return(!A.calendar.params.disabled&&!A.calendar.params.readonly&&A.calendar.selectedDate?CalendarView.getControl(A.controlLabels.clean,CalendarView.toolButtonAttributes,"resetSelectedDate"):"")
};
CalendarView.selectedDateControl=function(A){return CalendarView.getSelectedDateControl(A.calendar)
};
CalendarView.timeControl=function(A){return CalendarView.getTimeControl(A.calendar)
};
CalendarView.timeEditorFields=function(A){return A.calendar.timePatternHtml
};
CalendarView.header=[new E("table",{"border":"0","cellpadding":"0","cellspacing":"0","width":"100%"},[new E("tbody",{},[new E("tr",{},[new E("td",{"class":"rich-calendar-tool"},[new ET(function(A){return Richfaces.evalMacro("previousYearControl",A)
})]),new E("td",{"class":"rich-calendar-tool"},[new ET(function(A){return Richfaces.evalMacro("previousMonthControl",A)
})]),new E("td",{"class":"rich-calendar-month"},[new ET(function(A){return Richfaces.evalMacro("currentMonthControl",A)
})]),new E("td",{"class":"rich-calendar-tool"},[new ET(function(A){return Richfaces.evalMacro("nextMonthControl",A)
})]),new E("td",{"class":"rich-calendar-tool"},[new ET(function(A){return Richfaces.evalMacro("nextYearControl",A)
})]),new E("td",{"class":"rich-calendar-tool rich-calendar-tool-close","style":function(A){return(this.isEmpty?"display:none;":"")
}},[new ET(function(A){return Richfaces.evalMacro("closeControl",A)
})])])])])];
CalendarView.footer=[new E("table",{"border":"0","cellpadding":"0","cellspacing":"0","width":"100%"},[new E("tbody",{},[new E("tr",{},[new E("td",{"class":"rich-calendar-toolfooter","style":function(A){return(this.isEmpty?"display:none;":"")
}},[new ET(function(A){return Richfaces.evalMacro("selectedDateControl",A)
})]),new E("td",{"class":"rich-calendar-toolfooter","style":function(A){return(this.isEmpty?"display:none;":"")
}},[new ET(function(A){return Richfaces.evalMacro("cleanControl",A)
})]),new E("td",{"class":"rich-calendar-toolfooter","style":function(A){return(this.isEmpty?"display:none;":"")
}},[new ET(function(A){return Richfaces.evalMacro("timeControl",A)
})]),new E("td",{"class":"rich-calendar-toolfooter","style":"background-image:none;","width":"100%"},[]),new E("td",{"class":"rich-calendar-toolfooter","style":function(A){return(this.isEmpty?"display:none;":"")+(A.calendar.params.disabled||A.calendar.params.readonly||!A.calendar.showApplyButton?"background-image:none;":"")
}},[new ET(function(A){return Richfaces.evalMacro("todayControl",A)
})]),new E("td",{"class":"rich-calendar-toolfooter","style":function(A){return(this.isEmpty?"display:none;":"")+"background-image:none;"
}},[new ET(function(A){return Richfaces.evalMacro("applyControl",A)
})])])])])];
CalendarView.timeEditorLayout=[new E("table",{"id":function(A){return A.calendar.TIME_EDITOR_LAYOUT_ID
},"border":"0","cellpadding":"0","cellspacing":"0","class":"rich-calendar-time-layout"},[new E("tbody",{},[new E("tr",{},[new E("td",{"class":"rich-calendar-time-layout-fields","colspan":"2","align":"center"},[new ET(function(A){return Richfaces.evalMacro("timeEditorFields",A)
})])]),new E("tr",{},[new E("td",{"class":"rich-calendar-time-layout-ok"},[new E("div",{"id":function(A){return A.calendar.TIME_EDITOR_BUTTON_OK
},"class":"rich-calendar-time-btn","style":"float:right;","onmousedown":"Element.addClassName(this, 'rich-calendar-time-btn-press');","onmouseout":"Element.removeClassName(this, 'rich-calendar-time-btn-press');","onmouseup":"Element.removeClassName(this, 'rich-calendar-time-btn-press');","onclick":function(A){return"$('"+A.calendar.id+"').component.hideTimeEditor(true)"
}},[new E("span",{},[new ET(function(A){return A.controlLabels.ok
})])])]),new E("td",{"class":"rich-calendar-time-layout-cancel"},[new E("div",{"id":function(A){return A.calendar.TIME_EDITOR_BUTTON_CANCEL
},"class":"rich-calendar-time-btn","style":"float:left;","onmousedown":"Element.addClassName(this, 'rich-calendar-time-btn-press');","onmouseout":"Element.removeClassName(this, 'rich-calendar-time-btn-press');","onmouseup":"Element.removeClassName(this, 'rich-calendar-time-btn-press');","onclick":function(A){return"$('"+A.calendar.id+"').component.hideTimeEditor(false)"
}},[new E("span",{},[new ET(function(A){return A.controlLabels.cancel
})])])])])])])];
CalendarView.dayList=[new ET(function(A){return A.day
})];
CalendarView.weekNumber=[new ET(function(A){return A.weekNumber
})];
CalendarView.weekDay=[new ET(function(A){return A.weekDayLabelShort
})];
CalendarContext=Class.create();
Object.extend(CalendarContext.prototype,{initialize:function(A){this.calendar=A;
this.monthLabels=A.params.monthLabels;
this.monthLabelsShort=A.params.monthLabelsShort;
this.weekDayLabels=A.params.weekDayLabels;
this.weekDayLabelsShort=A.params.weekDayLabelsShort;
this.controlLabels=A.params.labels
},nextYearControl:CalendarView.nextYearControl,previousYearControl:CalendarView.previousYearControl,nextMonthControl:CalendarView.nextMonthControl,previousMonthControl:CalendarView.previousMonthControl,currentMonthControl:CalendarView.currentMonthControl,selectedDateControl:CalendarView.selectedDateControl,cleanControl:CalendarView.cleanControl,timeControl:CalendarView.timeControl,todayControl:CalendarView.todayControl,closeControl:CalendarView.closeControl,applyControl:CalendarView.applyControl,timeEditorFields:CalendarView.timeEditorFields,timeEditorLayout:CalendarView.timeEditorLayout})
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.InplaceSelectStyles=Class.create();
Richfaces.InplaceSelectStyles.prototype={initialize:function(){this.commonStyles={combolist:{list:{classes:{active:"rich-inplace-select-list-scroll rich-inplace-select-list-decoration rich-inplace-select-list-position"}},item:{normal:"rich-inplace-select-item rich-inplace-select-font",selected:"rich-inplace-select-item rich-inplace-select-font rich-inplace-select-selected-item"}},component:{changed:{normal:"rich-inplace-select rich-inplace-select-view rich-inplace-select-changed",hovered:"rich-inplace-select-changed-hover"},view:{normal:"rich-inplace-select rich-inplace-select-view",hovered:"rich-inplace-select-view-hover"},editable:"rich-inplace-select rich-inplace-select-view rich-inplace-select-edit"}}
},getCommonStyles:function(){return this.commonStyles
}}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.ContextMenu=Class.create();
Richfaces.ContextMenu.prototype={initialize:function(D,B,C,A){this.options=A||{};
this.id=D;
this.element=$(D);
this.menuContent=null;
this.evaluator=C;
this.element.component=this;
this["rich:destructor"]="destroy";
this.doShow=this.show;
this.doHide=this.hide;
this.delay=B
},destroy:function(){this.enableDefaultContextMenu();
this.element.component=null;
this.element=null;
this.menuContent=null
},disableDefaultContextMenu:function(B,D,C,A){if(C=="oncontextmenu"){this.attachedToElementId=D;
this.attachedToParent=A;
this.eventName="contextmenu";
Event.observe(B,this.eventName,Event.stop)
}},enableDefaultContextMenu:function(){if(this.eventName=="contextmenu"&&this.attachedToElementId){var A=$(this.attachedToElementId);
if(!A&&this.attachedToParent){A=this.element;
if(A){A=A.parentNode
}}Event.stopObserving(A,this.eventName,Event.stop)
}},attachToElementById:function(D,C,B){var A=$(D);
this.disableDefaultContextMenu(A,D,C,false);
this.attachToElement(A,C,B)
},attachToParent:function(D,C,B){var A=$(D);
if(!A){A=this.element;
if(A){A=A.parentNode
}}this.disableDefaultContextMenu(A,D,C,true);
this.attachToElement(A,C,B)
},attachToElement:function(B,D,A){if(B){this.applyDecoration(B);
var C=D.substr(2);
if(C=="contextmenu"){Richfaces.enableDefaultHandler("click")
}var E=this.show.bindAsEventListener(this,A);
Event.observe(B,C,E)
}},hide:function(){RichFaces.Menu.Layers.shutdown()
},show:function(B,A){this.construct(A);
B.parameters=A;
var C=new RichFaces.Menu.DelayedContextMenu(this.id+"_menu",B);
window.setTimeout(C.show,this.delay)
},construct:function(B){if(this.isNewContext(B)){this.destroyMenu()
}var C=document.createElement("div");
C.id=this.id+":_auto_created";
C.style.zoom="1";
this.element.appendChild(C);
var A=this.evaluator.invoke("getContent",B||{}).join("");
new Insertion.Top(C,A);
this.menuContent=C
},destroyMenu:function(){if(this.menuContent){window.RichFaces.Memory.clean(this.menuContent);
this.menuContent.parentNode.removeChild(this.menuContent);
this.menuContent=null
}},isNewContext:function(A){return true
},applyDecoration:function(A){$(A).addClassName("rich-cm-attached")
}};
Richfaces.disableDefaultHandler=function(A){if(A.startsWith("on")){A=A.substr(2)
}Event.observe(document,A,Event.stop)
};
Richfaces.enableDefaultHandler=function(A){if(A.startsWith("on")){A=A.substr(2)
}Event.stopObserving(document,A,Event.stop)
}
;
if(!window.RichFaces){window.RichFaces={}
}var RichFaces_FF_Loaded=(RichFaces.navigatorType()==RichFaces.FF);
RichFaces.panelTabs={};
RichFaces.tabPanel={};
RichFaces.createImage=function(B){var A=new Image();
A.src=B;
return A
};
RichFaces.setLabelImages=function(A,B,C){A=$(A);
if(A){A._image=this.createImage(B);
A._mouseoverimage=this.createImage(C)
}};
RichFaces.isTabActive=function(A){var B=$(A);
if(B){return Element.hasClassName(B,"rich-tab-active")
}return false
};
RichFaces.switchTab=function(L,C,O){var A="_lbl";
var K="_cell";
var J="_shifted";
var F="";
var T=RichFaces.panelTabs[L];
var E;
var H=RichFaces_FF_Loaded;
if(T){for(var Q=0;
Q<T.length;
Q++){var B=T[Q];
var V=B.id;
var P=$(V+F);
var U=V+A;
var G=$(U);
var S=V+K;
var D=$(S);
var W=$(V+J);
if(V==C){if(P){Element.show(P)
}E=B;
if(!H){if(G){G.className=B.activeClass
}if(D){D.className=B.cellActiveClass
}}}else{if(P){Element.hide(P)
}if(G){G.className=B.inactiveClass
}if(D){D.className=B.cellInactiveClass
}if(W){W.style.top="0px"
}}}}if(H&&E){var R=$(E.id+A);
var D=$(E.id+K);
if(!R||!G||!D){return 
}var N=RichFaces.findNestingTable(R);
var I=N.parentNode;
var M=N.nextSibling;
I.removeChild(N);
R.className=E.activeClass;
I.insertBefore(N,M);
N=RichFaces.findNestingTable(D);
I=N.parentNode;
M=N.nextSibling;
I.removeChild(N);
D.className=E.cellActiveClass;
I.insertBefore(N,M)
}$(C+"_shifted").style.top="1px";
$(L+"_input").value=O
};
RichFaces.findNestingTable=function(B){var A=B.parentNode;
while(A&&A.nodeName.toLowerCase()!="table"){A=A.parentNode
}return A
};
RichFaces.overTab=function(A){if(RichFaces._shouldHoverTab(A)){Element.addClassName(A,"dr-tbpnl-tb-sel")
}};
RichFaces.outTab=function(A){if(RichFaces._shouldHoverTab(A)){Element.removeClassName(A,"dr-tbpnl-tb-sel")
}};
RichFaces._shouldHoverTab=function(A){return(A.className.indexOf("dr-tbpnl-tb-act")<0)
};
RichFaces.onTabChange=function(A,C,D){var J="_lbl";
var K=RichFaces.panelTabs[C];
var M,F;
if(K){for(var G=0;
G<K.length;
G++){if(M&&F){break
}var B=K[G].id;
if(B==D){F=K[G]
}if(RichFaces.isTabActive(B+J)){M=K[G]
}}}if(M&&F){if(A){A.leftTabName=M.name;
A.enteredTabName=F.name
}if(M.ontableave&&M.ontableave!=""){var E=new Function("event",M.ontableave);
var L=E(A);
if(typeof (L)=="boolean"&&!L){return false
}}if(F.ontabenter&&F.ontabenter!=""){var E=new Function("event",F.ontabenter);
var L=E(A);
if(typeof (L)=="boolean"&&!L){return false
}}try{var I=RichFaces.tabPanel[C];
if(I.ontabchange&&I.ontabchange!=""){var E=new Function("event",I.ontabchange);
var L=E(A);
if(typeof (L)=="boolean"&&!L){return false
}}}catch(H){}}return true
}
;
if(!window.DW){window.DW={}
}if(!window.Richfaces){window.Richfaces={}
}var PanelMenuStorage=new Object();
PanelMenu=Class.create();
PanelMenu.prototype={initialize:function(A,C,B){this.myId=A;
this.childObj=new Array();
this.expandSingle=C;
this.lastExpanded=null;
this.selectedChild=B;
this.defaultSelectedClass="dr-pmenu-selected-item";
this.userDefinedSelectedClass="rich-pmenu-selected-element";
this.is="panelMenu";
this.selectedNameInput=$(A+"selectedItemName");
PanelMenuStorage[A]=this
},_getIds:function(D,A){var B=Richfaces.firstDescendant(D);
while(B){if(B.id){A[B.id]=B;
if(B.tagName){var C=B.tagName.toLowerCase();
if(C=="div"){this._getIds(B,A)
}else{if(B.rows){var I=B.rows;
for(var F=0;
F<I.length;
F++){var H=I[F].cells;
for(var E=0;
E<H.length;
E++){var G=H[E];
if(/^icon/.test(G.id)){A[G.id]=G
}}}}}}}B=Richfaces.next(B)
}},getIds:function(){var A=$(this.myId);
var B={};
B[A.id]=A;
this._getIds(A,B);
return B
}};
PanelMenuItem=Class.create();
PanelMenuItem.prototype={initialize:function(T,R,K,E,C,J,B,P,L,Q,N,S,H,F,O,G){if(!K.parentId){return 
}this.type=E.type;
this.onopen=E.onopen;
this.itemId=K.myId;
this.onclose=E.onclose;
this.event=E.event;
this.disabled=E.disabled;
this.name=E.name;
this.params=R;
this.myId=K.myId;
this.mode=E.mode;
if(!this.mode){this.mode=("node"==this.type)?"none":"server"
}this.ajaxSubmit=N;
this.onItemHover=S;
this.target=E.target;
this.hoveredStyles=C;
this.hoveredClasses=J;
this.tdhider=Element.extend(T[K.myId]);
if(!this.tdhider){this.tdhider=$(K.myId)
}this.tablehider=Richfaces.firstDescendant(this.tdhider);
this.haveDynamicIcon=P;
if(this.haveDynamicIcon==true){var D="icon"+K.myId;
this.iconswitcher=Element.extend(T[D]);
if(!this.iconswitcher){this.iconswitcher=$(D)
}}this.childObj=new Array();
this.parentObj=PanelMenuStorage[K.parentId];
this.parentObj.childObj.push(this);
var I=this.parentObj;
while(I){if(I.is&&"panelMenu"==I.is){this.expandSingle=I.expandSingle;
break
}I=I.parentObj
}this.rootMenu=I;
if(this.rootMenu.selectedChild==this.name){this.selected=true
}else{this.selected=false
}this.clientId=K.myId;
this.mainRow=this.tablehider.rows[0];
Element.extend(this.mainRow);
var A=this.mainRow.cells;
this.leftIcon=Richfaces.lastDescendant(A[0]);
this.labelArea=A[1];
this.rightIcon=Richfaces.firstDescendant(A[2]);
this.content=this.tdhider.select(".dr-pmenu-group-self-label")[0];
this.iconAlign=H;
this.iconCollapsed=O;
this.iconExpanded=F;
this.iconSpacer=G;
if(L){this.action=L
}PanelMenuStorage[K.myId]=this;
this.initialStyles=null;
this.hasInitialSylesChecked=false;
this._attachBehaviors();
this.inputs=this._getDirectChildrenByTag(this.content,"INPUT");
for(var M=0;
M<this.inputs.length;
M++){if(this.inputs[M].name.indexOf("panelMenuState")!=-1){this.inputState=this.inputs[M]
}else{if(this.inputs[M].name.indexOf("panelMenuAction")!=-1){this.inputAction=this.inputs[M]
}}}if(Q){this.parentObj.lastExpanded=this;
this.expand()
}else{this.expanded=false
}if(this.parentObj.type=="node"&&this.parentObj.expanded){if(this.type=="node"){this.tdhider.style.display=""
}}this.tdhider.component=this
},collapse:function(){if(!this.disabled){if(this.expanded){if(this._getDirectChildrenByTag(this.content,"INPUT")[0]!=null){this._getDirectChildrenByTag(this.content,"INPUT")[0].value="closed"
}for(var B=0;
B<this.childObj.length;
B++){if(this.childObj[B]._getDirectChildrenByTag(this.childObj[B].content,"INPUT")[0]!=null){this.childObj[B]._getDirectChildrenByTag(this.childObj[B].content,"INPUT")[0].value=""
}if(this.haveDynamicIcon){var A=null;
if(this.iconAlign=="right"){A=this.rightIcon
}else{A=this.leftIcon
}if(A!=null){if(this.iconCollapsed!="none"){if(this.iconCollapsed!=null){if(this.iconCollapsed.length!=0){Element.show(A);
A.src=this.iconCollapsed
}else{Element.hide(A);
A.src=this.iconSpacer
}}else{Element.show(A);
A.src=this.iconSpacer
}}}}this.childObj[B].collapse();
this.childObj[B].hide()
}}this.expanded=false
}},hide:function(){this.tdhider.style.display="none"
},expand:function(){if(!this.disabled){var C=this.parentObj;
while(C){if(C.type&&"node"==C.type){C.expand()
}C=C.parentObj
}if(!this.expanded){if(this._getDirectChildrenByTag(this.content,"INPUT")[0]!=null){this.inputState.value="opened"
}if(this.haveDynamicIcon){var A=null;
if(this.iconAlign=="right"){A=this.rightIcon
}else{A=this.leftIcon
}if(A!=null){if(this.iconExpanded!="none"){if(this.iconExpanded!=null){if(this.iconExpanded.length!=0){Element.show(A);
A.src=this.iconExpanded
}else{Element.hide(A);
A.src=this.iconSpacer
}}else{Element.show(A);
A.src=this.iconSpacer
}}}}for(var B=0;
B<this.childObj.length;
B++){this.childObj[B].show()
}}this.expanded=true
}},show:function(){this.tdhider.style.display="";
this.tablehider.style.display="";
this.tdhider.style.display=""
},preTrigger:function(A){this.inputAction.setAttribute("value",this.clientId)
},postTrigger:function(A){this.inputAction.setAttribute("value","")
},trigger:function(e){if("none"==this.mode){return 
}this.preTrigger(e);
var form=Event.findElement(e,"form");
if("server"==this.mode){Richfaces.jsFormSubmit(this.myId,form.id,this.target,this.params)
}else{if("ajax"==this.mode){var event=e;
eval(this.ajaxSubmit)
}}this.postTrigger(e)
},itemClicked:function(A){this.globalClearSelection();
this.setSelectedClass();
this.rootMenu.selectedNameInput.value=this.name;
if(this.action){if(this.action=="panelMenuNodeAction"){if(this.expanded){if("node"==this.type){if(new Function(this.onclose+";return true;")()){this.collapse()
}}this.trigger(A)
}else{if(this.parentObj.expandSingle){if(this.parentObj.lastExpanded!=null){this.parentObj.lastExpanded.collapse()
}if("node"==this.type){if(new Function(this.onopen+";return true;")()){this.expand()
}}this.trigger(A);
this.parentObj.lastExpanded=this
}else{if("node"==this.type){if(new Function(this.onopen+";return true;")()){this.expand()
}}this.trigger(A)
}}}else{this.trigger(A)
}}else{if(this.expanded){if("node"==this.type){if(new Function(this.onclose+";return true;")()){this.collapse()
}}this.trigger(A)
}else{if(this.parentObj.expandSingle){if(this.parentObj.lastExpanded!=null){this.parentObj.lastExpanded.collapse()
}if("node"==this.type){if(new Function(this.onopen+";return true;")()){this.expand()
}}this.trigger(A);
this.parentObj.lastExpanded=this
}else{if("node"==this.type){if(new Function(this.onopen+";return true;")()){this.expand()
}}this.trigger(A)
}}}},globalClearSelection:function(B){for(var A in PanelMenuStorage){if(PanelMenuStorage.hasOwnProperty(A)){if(PanelMenuStorage[A].type=="node"||PanelMenuStorage[A].type=="item"){PanelMenuStorage[A].removeSelectedClass()
}}}},setSelectedClass:function(A){this.mainRow.addClassName(this.rootMenu.defaultSelectedClass);
this.mainRow.addClassName(this.rootMenu.userDefinedSelectedClass)
},removeSelectedClass:function(A){this.mainRow.removeClassName(this.rootMenu.defaultSelectedClass);
this.mainRow.removeClassName(this.rootMenu.userDefinedSelectedClass)
},addHoverStyles:function(A){if(!this.selected){if(!this.hasInitialSylesChecked){this.initialStyles=this.tablehider.style.cssText;
this.hasInitialSylesChecked=true
}if(this.hoveredStyles){Element.setStyle(this.tablehider,this.hoveredStyles)
}if(this.hoveredClasses){for(i=0;
i<this.hoveredClasses.length;
i++){this.tablehider.addClassName(this.hoveredClasses[i])
}}}},removeHoverStyles:function(B){if(!this.selected){if(this.hoveredStyles&&this.hasInitialSylesChecked){this.tablehider.style.cssText=this.initialStyles
}if(this.hoveredClasses){for(var A=0;
A<this.hoveredClasses.length;
A++){this.tablehider.removeClassName(this.hoveredClasses[A])
}}}},_getDirectChildrenByTag:function(E,D){var A=E.childNodes;
var B=new Array();
D=D.toLowerCase();
for(var C=0;
C<A.length;
C++){if(A[C]&&A[C].tagName&&A[C].tagName.toLowerCase()==D){B.push(A[C])
}}return B
},_fireEditEvent:function(B){if(document.createEvent){var A=document.createEvent("HTMLEvents");
A.initEvent(B,true,false);
this.edit.dispatchEvent(A)
}else{if(document.createEventObject){this.edit.fireEvent("on"+B)
}}},hoverItem:function(e){if(this.onItemHover!=""){eval(this.onItemHover)
}},_attachBehaviors:function(){if(!this.disabled){if(this.event){Event.observe(this.tablehider,this.event,this.itemClicked.bindAsEventListener(this),false)
}else{Event.observe(this.tablehider,"click",this.itemClicked.bindAsEventListener(this),false)
}Event.observe(this.tdhider,"mouseover",this.hoverItem.bindAsEventListener(this),false);
Event.observe(this.tablehider,"mouseover",this.addHoverStyles.bindAsEventListener(this),false);
Event.observe(this.tablehider,"mouseout",this.removeHoverStyles.bindAsEventListener(this),false)
}},doCollapse:function(A){this.collapse()
},doExpand:function(A){this.expand()
}};
PanelMenu.doExpand=function(D){var C=PanelMenuStorage[D];
if(C&&C.type&&"node"==C.type){var B=C.parentObj;
if(B.expandSingle){if(C.parentObj.lastExpanded!=null){C.parentObj.lastExpanded.collapse()
}}if(!C.expanded&&new Function(C.onopen+";return true;")()){C.expand()
}}else{if(C.childObj&&C.childObj.length>0){for(var A=0;
A<C.childObj.length;
A++){PanelMenu.doExpand(C.childObj[A].clientId)
}}}};
PanelMenu.doCollapse=function(C){var B=PanelMenuStorage[C];
if(B&&B.type&&"node"==B.type){if(B.expanded&&new Function(B.onclose+";return true;")()){B.collapse()
}}else{if(B.childObj&&B.childObj.length>0){for(var A=0;
A<B.childObj.length;
A++){PanelMenu.doCollapse(B.childObj[A].clientId)
}}}}
;
DnD.ExtSimpleDropZone=Class.create();
Object.extend(DnD.ExtSimpleDropZone.prototype,DnD.Dropzone.prototype);
Object.extend(DnD.ExtSimpleDropZone.prototype,{initialize:function(C,A){this.id=C;
var B=$(C);
if(!B){alert("drop: Element with ["+C+"] ID was not found in the DOM tree. Probably element has no client ID or client ID hasn't been written. DnD's disabled. Check please!");
return 
}this.element=B;
if(A.acceptedTypes){this.acceptedTypes=A.acceptedTypes
}else{this.acceptedTypes=[]
}if(A.typeMapping){this.typeMapping=A.typeMapping
}else{this.typeMapping={}
}if(A.cursorTypeMapping){this.cursorTypeMapping=A.cursorTypeMapping
}else{this.cursorTypeMapping={}
}this.mouseoverBound=this.mouseover.bindAsEventListener(this);
this.mouseoutBound=this.mouseout.bindAsEventListener(this);
this.mouseupBound=this.mouseup.bindAsEventListener(this);
Event.observe(B,"mouseover",this.mouseoverBound);
Event.observe(B,"mouseout",this.mouseoutBound);
Event.observe(B,"mouseup",this.mouseupBound);
this.options=A||{};
this.enableDropzoneCursors(A.acceptCursor,A.rejectCursor)
},getDropzoneOptions:function(){return this.options
},getDnDDropParams:function(){if(this.options.dndParams){return this.options.dndParams.parseJSON(EventHandlersWalk)
}return null
},mouseover:function(A){if(window.drag){this.dragEnter(A);
this.element.childNodes[0].style.visibility="visible";
this.element.childNodes[1].style.visibility="visible"
}},mouseup:function(A){this.dragUp(A)
},mouseout:function(A){if(window.drag){this.dragLeave(A);
this.element.childNodes[0].style.visibility="hidden";
this.element.childNodes[1].style.visibility="hidden"
}},getAcceptedTypes:function(){return this.acceptedTypes
},getTypeMapping:function(){return this.typeMapping
},getCursorTypeMapping:function(){return this.cursorTypeMapping
},drop:function(B,A){alert("I drop")
},onafterdrag:function(A){if(this.options.onafterdrag){this.options.onafterdrag.call(this,A)
}}})
;
DnD.ExtSimpleDraggable=Class.create();
Object.extend(DnD.ExtSimpleDraggable.prototype,DnD.Draggable.prototype);
Object.extend(DnD.ExtSimpleDraggable.prototype,{initialize:function(B,A){this.id=$(B);
if(!this.id){alert("drag: Element with ["+B+"] ID was not found in the DOM tree. Probably element has no client ID or client ID hasn't been written. DnD's disabled. Check please!");
return 
}this.options=A;
this.dragIndicatorId=this.options.dragIndicator;
this.eventMouseDown=this.initDrag.bindAsEventListener(this);
Event.observe(this.id,"mousedown",this.eventMouseDown);
this.form=this.id;
while(this.form&&!/^form$/i.test(this.form.tagName)){this.form=this.form.parentNode
}this.enableDraggableCursors(this.options.grab,this.options.grabbing)
},getDnDDragParams:function(){if(this.options.dndParams){return this.options.dndParams.parseJSON(EventHandlersWalk)
}return null
},getIndicator:function(){var A=$(this.dragIndicatorId);
if(!A){A=this.getOrCreateDefaultIndicator()
}return A
},ondragstart:function(B,A){this.showDropTargets();
A.params=this.options.parameters;
A.params[this.id]=this.id;
this.setIndicator(B);
this.getIndicator().leave();
if(this.form){A.params[this.form.id]=this.form.id
}},ondragend:function(B,A){this.hideDropTargets()
},getContentType:function(){return this.options.dragType
},getDraggableOptions:function(){return this.options
},initDrag:function(A){if(Event.isLeftClick(A)){var B=Event.element(A);
if(B.tagName&&/^INPUT|SELECT|OPTION|BUTTON|TEXTAREA$/i.test(B.tagName)){return 
}Event.stop(A);
this.startDrag(A)
}},showDropTargets:function(){var C=this.id.id;
var E=C.lastIndexOf("_");
var D=C.substring(0,E).replace("hdrag","hdrop");
var A=document.getElementsByTagName("span");
for(i=0;
i<A.length;
i++){var B=A[i];
if(B.id.indexOf(D)==0){B.style.visibility="visible";
B.childNodes[0].style.visibility="hidden";
B.childNodes[1].style.visibility="hidden"
}}},hideDropTargets:function(){var C=this.id.id;
var E=C.lastIndexOf("_");
var D=C.substring(0,E).replace("hdrag","hdrop");
var A=document.getElementsByTagName("span");
for(i=0;
i<A.length;
i++){var B=A[i];
if(B.id.indexOf(D)==0){B.style.visibility="hidden";
B.childNodes[0].style.visibility="hidden";
B.childNodes[1].style.visibility="hidden"
}}}})
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.ComboBox=Class.create();
Richfaces.ComboBox.prototype={initialize:function(P,A,O,S,V,G,D,X,K,C,Q,R,J,Z,U,F,B,N,I,E,M,T,H,L,W){this.directInputSuggestions=Z;
this.filterNewValue=U;
this.combobox=$(P);
this.comboValue=document.getElementById(S);
this.field=document.getElementById(V);
this.tempItem;
this.BUTTON_WIDTH=17;
this.classes=Richfaces.mergeStyles(C,K.getCommonStyles());
this.button=document.getElementById(G);
this.buttonBG=document.getElementById(D);
this.setInputWidth();
Q=(!Q)?this.getCurrentWidth():Q;
this.comboList=new Richfaces.ComboBoxList(A,O,F,U,this.classes.combolist,Q,R,J,B,N,V,X,H,L);
this.defaultMessage=E;
if(T){var Y=this.comboList.findItemBySubstr(T);
if(Y){this.comboList.doSelectItem(Y)
}this.comboValue.value=T
}else{if(this.defaultMessage){this.applyDefaultText()
}}this.onselected=I;
this.isSelection=true;
this.isDisabled=M;
if(this.onselected){this.combobox.observe("rich:onselect",this.onselected)
}this.onchange=W;
if(this.isDisabled){this.disable()
}if(Richfaces.browser.isIE6){this.comboList.createIframe(this.comboList.listParent.parentNode,Q,this.combobox.id,"rich-combobox-list-width rich-combobox-list-scroll rich-combobox-list-position")
}this.combobox.component=this;
this.initHandlers();
this["rich:destructor"]="destroy"
},destroy:function(){Event.stopObserving(this.combobox,"rich:onselect");
Event.stopObserving(this.button,"click");
Event.stopObserving(this.button,"mouseup");
Event.stopObserving(this.button,"mousedown");
Event.stopObserving(this.button,"mouseover");
Event.stopObserving(this.button,"mouseout");
Event.stopObserving(this.field,"keydown");
Event.stopObserving(this.field,"blur");
Event.stopObserving(this.field,"focus");
Event.stopObserving(this.field,"keyup");
Event.stopObserving(this.comboList.listParent,"mousedown");
Event.stopObserving(this.comboList.listParent,"mouseup");
Event.stopObserving(this.comboList.listParent,"mousemove");
Event.stopObserving(this.comboList.listParent,"click");
this.comboValue=null;
this.button=null;
this.buttonBG=null;
this.field=null;
this.classes=null;
delete this.comboList;
this.combobox.component=null;
this.combobox=null
},initHandlers:function(){Event.observe(this.button,"click",this.buttonClickHandler.bindAsEventListener(this));
Event.observe(this.button,"mouseup",this.buttonMouseUpHandler.bindAsEventListener(this));
Event.observe(this.button,"mousedown",this.buttonMousedownHandler.bindAsEventListener(this));
Event.observe(this.button,"mouseover",this.buttonMouseOverHandler.bindAsEventListener(this));
Event.observe(this.button,"mouseout",this.buttonMouseOutHandler.bindAsEventListener(this));
Event.observe(this.field,"keydown",this.fieldKeyDownHandler.bindAsEventListener(this));
Event.observe(this.field,"blur",this.fieldBlurHandler.bindAsEventListener(this));
Event.observe(this.field,"focus",this.fieldFocusHandler.bindAsEventListener(this));
Event.observe(this.field,"keyup",this.dataUpdating.bindAsEventListener(this));
Event.observe(this.comboList.listParent,"mousedown",this.listMousedownHandler.bindAsEventListener(this));
Event.observe(this.comboList.listParent,"mouseup",this.listMouseUpHandler.bindAsEventListener(this));
Event.observe(this.comboList.listParent,"mousemove",this.listMouseMoveHandler.bindAsEventListener(this));
Event.observe(this.comboList.listParent,"click",this.listClickHandler.bindAsEventListener(this))
},setInputWidth:function(){var A=(parseInt(this.field.parentNode.style.width)-this.BUTTON_WIDTH)-Richfaces.getBorderWidth(this.field,"lr")-Richfaces.getBorderWidth(this.button,"lr")-Richfaces.getPaddingWidth(this.field,"lr");
this.field.style.width=A+"px"
},buttonClickHandler:function(A){if(this.comboList.visible()){this.comboList.hideWithDelay()
}else{this.comboList.createDefaultList();
this.comboList.showWithDelay();
if(this.comboList.selectedItem){this.comboList.scrollingUpToItem(this.comboList.selectedItem)
}this.comboList.isList=false
}},buttonMouseUpHandler:function(B){this.buttonBG.className="rich-combobox-font rich-combobox-button-background rich-combobox-button";
this.button.className=this.classes.button.classes.active+" rich-combobox-button-hovered";
var A=this.classes.button.style;
if(A&&!A.active.blank()){Element.setStyle(this.button,A.active)
}this.field.focus()
},buttonMousedownHandler:function(B){this.buttonBG.className="rich-combobox-font rich-combobox-button-pressed-background rich-combobox-button";
this.button.className=this.classes.button.classes.active+" rich-combobox-button-hovered";
var A=this.classes.button.style;
if(A&&!A.active.blank()){Element.setStyle(this.button,A.active)
}this.comboList.isList=true
},buttonMouseOverHandler:function(D){var A=this.classes.button.classes;
var C=this.classes.buttonicon.style;
var B=this.classes.button.style;
if(this.isActive()){this.button.className=A.active+" "+A.hovered;
if(B&&!B.active.blank()){Element.setStyle(this.button,B.active)
}if(C&&!C.active.blank()){Element.setStyle(this.button,{backgroundImage:C.active})
}}else{this.button.className=A.normal+" "+A.hovered;
if(B&&!B.normal.blank()){Element.setStyle(this.button,B.normal)
}if(C&&!C.normal.blank()){Element.setStyle(this.button,{backgroundImage:C.normal})
}}},buttonMouseOutHandler:function(D){var A=this.classes.button.classes;
var B=this.classes.button.style;
var C=this.classes.buttonicon.style;
if(this.isActive()){this.button.className=A.active;
if(B&&!B.active.blank()){Element.setStyle(this.button,B.active)
}if(C&&!C.active.blank()){Element.setStyle(this.button,{backgroundImage:C.active})
}}else{this.button.className=A.normal;
if(B&&!B.normal.blank()){Element.setStyle(this.button,B.normal)
}if(C&&!C.normal.blank()){Element.setStyle(this.button,{backgroundImage:C.normal})
}}},listMouseMoveHandler:function(B){var A=B.target;
if(Element.match(A,"span")){if(A&&this.tempItem!=A){this.comboList.doActiveItem(A)
}this.tempItem=A
}},listMousedownHandler:function(A){if(!Prototype.Browser.Firefox){if(!Element.match(A.target,"span")){this.clickOnScroll=true
}}this.comboList.isList=true
},listMouseUpHandler:function(A){this.field.focus();
this.comboList.isList=false
},listClickHandler:function(A){this.isSelection=false;
this.setValue(true);
this.comboList.hideWithDelay()
},fieldKeyDownHandler:function(A){switch(A.keyCode){case Event.KEY_RETURN:this.setValue(true);
this.comboList.hideWithDelay();
Event.stop(A);
break;
case Event.KEY_DOWN:this.comboList.moveActiveItem(A);
break;
case Event.KEY_UP:this.comboList.moveActiveItem(A);
break;
case Event.KEY_ESC:this.field.value=this.field.value;
this.comboList.hideWithDelay();
break
}},fieldFocusHandler:function(){this.doActive();
if((this.field.value==this.defaultMessage)&&(this.comboValue.value=="")){this.field.value=""
}else{if(this.isSelection){Richfaces.ComboBox.textboxSelect(this.field,0,this.field.value.length)
}this.isSelection=true
}},fieldBlurHandler:function(B){if(!this.comboList.isList){this.enable();
var C=this.field.value;
if(C.length==0){this.applyDefaultText()
}else{var A=this.comboList.findItemBySubstr(C);
if(A){this.comboList.doSelectItem(A)
}}this.comboList.hideWithDelay();
this.setValue(false)
}else{this.doActive()
}if(this.clickOnScroll){this.field.focus();
this.comboList.isList=false;
this.clickOnScroll=false
}},dataUpdating:function(C){if(Richfaces.ComboBox.SPECIAL_KEYS.indexOf(C.keyCode)==-1){if(this.filterNewValue){this.comboList.hideWithDelay();
this.comboList.dataFilter(this.field.value);
if(this.comboList.getItems()&&this.comboList.getItems().length!=0){var A=true;
this.comboList.showWithDelay()
}}else{if(!this.comboList.visible()){this.comboList.showWithDelay()
}var B=this.comboList.findItemBySubstr(this.field.value);
if(B){this.comboList.doActiveItem(B);
this.comboList.scrollingUpToItem(this.comboList.activeItem);
A=true
}}if(this.isValueSet(C)&&A){var D=this.getActiveItemValue();
if(D&&this.directInputSuggestions){this.doDirectSuggestion(D)
}}this.comboValue.value=this.field.value
}},getActiveItemValue:function(){var A;
if(this.comboList.activeItem){A=jQuery(this.comboList.activeItem).text();
A=A.replace(/\xA0/g," ").strip()
}return A
},doDirectSuggestion:function(C){var B=this.field.value.length;
var A=C.length;
this.field.value=C;
Richfaces.ComboBox.textboxSelect(this.field,B,A)
},wasTextDeleted:function(A){if((A.keyCode==Event.KEY_BACKSPACE)||(A.keyCode==Event.KEY_DELETE)||(A.ctrlKey&&(A.keyCode==88))){return true
}return false
},isValueSet:function(A){if(this.wasTextDeleted(A)||(A.keyCode==17)||A.altKey||A.ctrlKey||A.shiftKey){return false
}return true
},setValue:function(C){var B=this.getActiveItemValue();
if(B&&C){this.comboValue.value=B;
this.comboList.doSelectItem(this.comboList.activeItem);
this.combobox.fire("rich:onselect",{})
}var D=this.comboValue.value;
var A=this.field.prevValue;
if(D&&(D!=A)){this.field.prevValue=D;
this.field.value=D;
Richfaces.invokeEvent(this.onchange,this.combobox,"onchange",{value:D})
}},applyDefaultText:function(){this.field.className=this.classes.field.classes.disabled;
this.field.value=this.defaultMessage;
this.comboValue.value=""
},isActive:function(){return(this.field.className==this.classes.field.classes.active)
},doActive:function(){if(this.button.className.indexOf(this.classes.button.classes.hovered)!=-1){this.button.className=this.classes.button.classes.active+" "+this.classes.button.classes.hovered
}else{this.button.className=this.classes.button.classes.active
}var A=this.classes.buttonicon.style;
if(!A.active.blank()){Element.setStyle(this.button,{backgroundImage:A.active})
}this.field.className=this.classes.field.classes.active;
Element.setStyle(this.field,this.classes.field.style.active);
this.isDisabled=false
},disable:function(){this.button.className=this.classes.button.classes.disabled;
this.buttonBG.className=this.classes.buttonbg.classes.disabled;
this.field.className=this.classes.field.classes.disabled;
Element.setStyle(this.field,this.classes.field.style.disabled);
var A=this.classes.button.style;
if(A&&!A.disabled.blank()){Element.setStyle(this.button,A.disabled)
}var B=this.classes.buttonicon.style;
if(B&&!B.disabled.blank()){Element.setStyle(this.button,{backgroundImage:B.disabled})
}this.button.disabled=true;
this.field.disabled=true;
this.isDisabled=true
},enable:function(){this.button.className=this.classes.button.classes.normal;
this.buttonBG.className=this.classes.buttonbg.classes.normal;
this.field.className=this.classes.field.classes.normal;
var C=this.classes.field.style.normal;
Element.setStyle(this.field,C);
var B=this.classes.buttonicon.style;
if(!B.normal.blank()){Element.setStyle(this.button,{backgroundImage:B.normal})
}var A=this.classes.button.style;
if(A&&!A.normal.blank()){Element.setStyle(this.button,A.normal)
}this.button.disabled=false;
this.field.disabled=false;
this.isDisabled=false
},doDisable:function(){this.disable()
},doNormal:function(){this.enable()
},getCurrentWidth:function(){return this.combobox.firstChild.offsetWidth
},showList:function(){if(this.isDisabled){return 
}this.field.focus();
this.buttonClickHandler()
},hideList:function(){this.comboList.hideWithDelay()
}};
Richfaces.ComboBox.textboxSelect=function(C,B,A){if(Prototype.Browser.IE){var D=C.createTextRange();
D.moveStart("character",B);
D.moveEnd("character",-C.value.length+A);
D.select()
}else{if(Prototype.Browser.Gecko){C.setSelectionRange(B,A)
}else{C.setSelectionRange(B,A)
}}};
Richfaces.ComboBox.getSelectedText=function(A){if(window.getSelection){return window.getSelection().text
}else{if(document.selection){return document.selection.createRange()
}else{}}};
Richfaces.ComboBox.SPECIAL_KEYS=[Event.KEY_RETURN,Event.KEY_UP,Event.KEY_DOWN,Event.KEY_RIGHT,Event.KEY_LEFT,Event.KEY_ESC,Event.KEY_TAB,16]
;
if(!window.RichFaces){window.RichFaces={}
}if(!RichFaces.Menu){RichFaces.Menu={}
}RichFaces.Menu.fitLayerToContent=function(A){if(!RichFaces.Menu.Layers.IE){return 
}var C=A.childNodes[0];
if(C){if(A.style.width.indexOf("px")!=-1){var B=parseFloat(A.style.width.substring(0,A.style.width.indexOf("px")));
var D=Element.getDimensions(C);
if(D.width>B){A.style.width=D.width+"px"
}}}};
RichFaces.Menu.removePx=function(A){if((A+"").indexOf("px")!=-1){return(A+"").substring(0,A.length-2)
}else{return A
}};
RichFaces.Menu.Layers={listl:new Array(),father:{},lwidthDetected:false,lwidth:{},back:new Array(),horizontals:{},layers:{},levels:["","","","","","","","","","",""],detectWidth:function(){this.IE=(navigator.userAgent.indexOf("MSIE")>-1)&&(navigator.userAgent.indexOf("Opera")<0);
if(this.IE){var A=/MSIE\s+(\d+(?:\.\d+)?)/.exec(navigator.userAgent);
if(A){this.IE_VERSION=parseFloat(A[1])
}}this.NS=(navigator.userAgent.indexOf("Netscape")>-1)
},menuTopShift:-11,menuRightShift:11,menuLeftShift:0,shadowWidth:0,thresholdY:0,abscissaStep:180,CornerRadius:0,toBeHidden:new Array(),toBeHiddenLeft:new Array(),toBeHiddenTop:new Array(),layersMoved:0,layerPoppedUp:"",layerTop:new Array(),layerLeft:new Array(),timeoutFlag:0,useTimeouts:1,timeoutLength:500,showTimeOutFlag:0,showTimeoutLength:0,queuedId:"",destroy:function(){this.listl=null;
this.father=null;
var B;
for(var A in this.layers){B=this.layers[A];
B.layer=null;
B.items=null;
$A(B.bindings).each(function(C){C.remove()
})
}this.layers=null
},LMPopUp:function(B,A,C){if(!this.loaded||(this.isVisible(B)&&!A)){return 
}if(B==this.father[this.layerPoppedUp]){this.LMPopUpL(this.layerPoppedUp,false,C)
}else{if(this.father[B]==this.layerPoppedUp){this.LMPopUpL(B,true,C)
}else{var D=B;
do{this.LMPopUpL(D,true,C);
D=this.father[D]
}while(D)
}}this.layerPoppedUp=B
},isVisible:function(A){return($(A).style.display!="none")
},LMPopUpL:function(B,C,E){if(!this.loaded){return 
}this.detectWidth();
var G=$(B);
var A=true;
RichFaces.Menu.fitLayerToContent(G);
var F=this.isVisible(B);
var D=this.layers[G.id];
if(F&&!C){if(D){if(D.eventOnClose){D.eventOnClose(E)
}if(D.eventOnCollapse){A=D.eventOnCollapse(E)
}if(D.refItem){D.refItem.highLightGroup(false)
}}}else{if(!F&&C){if(D){if(D.eventOnOpen){D.eventOnOpen(E)
}if(D.eventOnExpand){A=D.eventOnExpand(E)
}if(D.level>0){do{D=this.layers[(this.father[D.id])]
}while(D.level>0);
if(D&&D.eventOnGroupActivate){D.eventOnGroupActivate(E)
}}}}}if(A!=false){this.setVisibility(B,C);
this.ieSelectWorkAround(B,C)
}},initIFrame:function(A){var C=$(A);
var B=new Insertion.Before(C,'<iframe src="javascript:\'\'" id="'+C.id+'_iframe" style=" position: absolute; z-index: 1;" frameborder="0" scrolling="no" class="underneath_iframe"></iframe>');
return B
},ieSelectWorkAround:function(B,A){if((this.IE&&this.IE_VERSION<7)||this.NS){var E=$(B);
B=E.id;
var C=$(B+"_iframe");
if(!C&&A){this.initIFrame(E);
C=$(B+"_iframe")
}var D=(this.NS?7:0);
if(A){C.style.top=E.style.top;
C.style.left=E.style.left;
C.style.width=E.offsetWidth+"px";
C.style.height=E.offsetHeight+"px";
C.style.visibility="visible"
}else{if(C){C.style.visibility="hidden"
}}}},shutdown:function(){var C=false;
for(var B=0;
B<this.listl.length;
B++){var A=this.listl[B];
if($(A)){this.LMPopUpL(A,false)
}else{C=true
}}if(C){this.resetLayers()
}this.layerPoppedUp="";
if(this.Konqueror||this.IE5){this.seeThroughElements(true)
}},resetLayers:function(){var B=new Array();
for(i=0;
i<this.listl.length;
i++){var A=this.listl[i];
if($(A)){B.push(A)
}}this.listl=B
},setVisibility:function(B,C){var D=$(B);
if(C){D.style.display=""
}else{if(D.getElementsByTagName){var A=D.getElementsByTagName("INPUT");
if(A){$A(A).each(function(E){E.blur()
})
}}D.style.display="none"
}},clearLMTO:function(){if(this.useTimeouts){clearTimeout(this.timeoutFlag)
}},setLMTO:function(A){if(!A){A=this.timeoutLength
}if(this.useTimeouts){clearTimeout(this.timeoutFlag);
this.timeoutFlag=setTimeout("RichFaces.Menu.Layers.shutdown()",A)
}},loaded:1,clearPopUpTO:function(){clearTimeout(this.showTimeOutFlag);
this.iframe=null
},showMenuLayer:function(A,C,B){this.clearPopUpTO();
this.showTimeOutFlag=setTimeout(new RichFaces.Menu.DelayedPopUp(A,C,function(){this.layerId=null
}.bind(this)).show,B);
this.layerId=A
},showDropDownLayer:function(A,E,C,B){this.clearPopUpTO();
var D=new RichFaces.Menu.DelayedDropDown(A,E,C);
if(D.show){this.showTimeOutFlag=setTimeout(D.show,B)
}},showPopUpLayer:function(A,B){this.shutdown();
this.detectWidth();
this.LMPopUp(menuName,false);
this.setLMTO(4)
}};
if(window.attachEvent){window.attachEvent("onunload",function(){var A=RichFaces.Menu.Layers;
A.destroy()
})
}RichFaces.Menu.getWindowElement=function(){return(document.documentElement||document.body)
};
RichFaces.Menu.getWindowDimensions=function(){var A,B;
if(self.innerHeight){A=self.innerWidth;
B=self.innerHeight
}else{if(document.documentElement&&document.documentElement.clientHeight){A=document.documentElement.clientWidth;
B=document.documentElement.clientHeight
}else{if(document.body){A=document.body.clientWidth;
B=document.body.clientHeight
}}}return{width:A,height:B}
};
RichFaces.Menu.getWindowScrollOffset=function(){var A,B;
if(typeof pageYOffset!="undefined"){A=window.pageXOffset;
B=window.pageYOffset
}else{if(document.documentElement&&document.documentElement.scrollTop){A=document.documentElement.scrollLeft;
B=document.documentElement.scrollTop
}else{if(document.body){A=document.body.scrollLeft;
B=document.body.scrollTop
}}}return{top:B,left:A}
};
RichFaces.Menu.getPageDimensions=function(){var A,D;
var C=document.body.scrollHeight;
var B=document.body.offsetHeight;
if(C>B){A=document.body.scrollWidth;
D=document.body.scrollHeight
}else{A=document.body.offsetWidth;
D=document.body.offsetHeight
}return{width:A,height:D}
};
RichFaces.Menu.DelayedContextMenu=function(A,B){if(!B){B=window.event
}this.event=Object.clone(B);
this.element=Event.element(B);
this.layer=$(A);
this.show=function(){RichFaces.Menu.Layers.shutdown();
var D=this.layer.style.display;
if(D=="none"){this.layer.style.visibility="hidden";
this.layer.style.display=""
}var C=Richfaces.jQuery.getPointerRectangle(this.event);
Richfaces.jQuery.position(C,this.layer);
this.layer.style.display=D;
this.layer.style.visibility="";
RichFaces.Menu.Layers.LMPopUp(this.layer.id,false,B);
RichFaces.Menu.Layers.clearLMTO()
}.bind(this)
};
RichFaces.Menu.DelayedDropDown=function(B,A,E){if(!E){E=window.event
}var D=(E.target||E.srcElement);
var C=false;
while(D&&D.id!=A.id){if(D.className=="dr-label-text-decor rich-label-text-decor"){C=true
}D=D.parentNode
}if(!C){return 
}this.event=E;
this.element=$(A)||Event.element(E);
this.layer=$(B);
Event.stop(E);
this.listPositions=function(F,G){var I=new Array(new Array(2,1,4),new Array(1,2,3),new Array(4,3,2),new Array(3,4,1));
var J=new Array();
if(F>0&&G>0){J.push({jointPoint:F,direction:G})
}else{if(F>0&&G==0){for(var H=0;
H<3;
H++){J.push({jointPoint:F,direction:I[F-1][H]})
}}else{if(F==0&&G>0){for(var H=0;
H<3;
H++){J.push({jointPoint:I[G-1][H],direction:G})
}}else{if(F==0&&G==0){J.push({jointPoint:4,direction:3});
J.push({jointPoint:1,direction:2});
J.push({jointPoint:3,direction:4});
J.push({jointPoint:2,direction:1})
}}}}return J
}.bind(this);
this.calcPosition=function(F,G){var H;
var I;
switch(F){case 1:H=this.left;
I=this.top;
break;
case 2:H=this.right;
I=this.top;
break;
case 3:H=this.right;
I=this.bottom;
break;
case 4:H=this.left;
I=this.bottom;
break
}switch(G){case 1:H-=this.layerdim.width;
I-=this.layerdim.height;
break;
case 2:I-=this.layerdim.height;
break;
case 4:H-=this.layerdim.width
}return{left:H,top:I}
}.bind(this);
this.show=function(){RichFaces.Menu.Layers.shutdown();
var U=this.layer.style.display;
if(U=="none"){this.layer.style.visibility="hidden";
this.layer.style.display=""
}var T=RichFaces.Menu.getWindowScrollOffset();
var K=RichFaces.Menu.getWindowDimensions();
var Y=RichFaces.Menu.getPageDimensions();
var O=K.height;
var a=K.width;
var P=Position.positionedOffset(this.element);
var Z=this.element.lastChild;
var R=Element.getDimensions(this.element);
var H=Position.cumulativeOffset(this.element);
var G=Position.cumulativeOffset(Z);
var X=G[0]-H[0];
var W=G[1]-H[1];
this.top=P[1];
this.left=P[0];
this.bottom=this.top+R.height;
this.right=this.left+R.width;
this.layerdim=Element.getDimensions(this.layer);
var J=RichFaces.Menu.Layers.layers[this.layer.id].options;
var L=0;
if(J.jointPoint){var M=J.jointPoint.toUpperCase();
L=M.indexOf("TL")!=-1?1:L;
L=M.indexOf("TR")!=-1?2:L;
L=M.indexOf("BR")!=-1?3:L;
L=M.indexOf("BL")!=-1?4:L
}var V=0;
if(J.direction){var F=J.direction.toUpperCase();
V=F.indexOf("TOP-LEFT")!=-1?1:V;
V=F.indexOf("TOP-RIGHT")!=-1?2:V;
V=F.indexOf("BOTTOM-RIGHT")!=-1?3:V;
V=F.indexOf("BOTTOM-LEFT")!=-1?4:V
}var b=J.horizontalOffset;
var Q=J.verticalOffset;
var I=this.listPositions(L,V);
var N;
var c=false;
for(var S=0;
S<I.length;
S++){N=this.calcPosition(I[S].jointPoint,I[S].direction);
if((N.left+b>=T.left)&&(N.left+b+this.layerdim.width-T.left<=a)&&(N.top+Q>=T.top)&&(N.top+Q+this.layerdim.height-T.top<=O)){c=true;
break
}}if(!c){N=this.calcPosition(I[0].jointPoint,I[0].direction)
}this.layer.style.left=N.left+b-X-this.left+"px";
this.layer.style.top=N.top+Q-W-this.top+"px";
this.layer.style.width=this.layer.clientWidth+"px";
this.layer.style.display=U;
this.layer.style.visibility="";
RichFaces.Menu.Layers.LMPopUp(this.layer.id,false);
RichFaces.Menu.Layers.clearLMTO()
}.bind(this)
};
RichFaces.Menu.DelayedPopUp=function(B,C){if(!C){C=window.event
}this.event=C;
var A=Event.element(C);
while(A&&(!A.tagName||A.tagName.toLowerCase()!="div")){A=A.parentNode
}this.element=A;
if(this.element.id.indexOf(":folder")==(this.element.id.length-7)){this.element=this.element.parentNode
}this.layer=$(B);
this.show=function(){if(!RichFaces.Menu.Layers.isVisible(this.layer)&&RichFaces.Menu.Layers.isVisible(RichFaces.Menu.Layers.father[this.layer.id])){var D=this.layer.style.display;
if(D=="none"){this.layer.style.visibility="hidden";
this.layer.style.display=""
}this.reposition();
this.layer.style.display=D;
this.layer.style.visibility="";
RichFaces.Menu.Layers.LMPopUp(this.layer,false)
}}.bind(this)
};
RichFaces.Menu.DelayedPopUp.prototype.reposition=function(){var A=RichFaces.Menu.getWindowScrollOffset();
var K=RichFaces.Menu.getWindowDimensions();
var I=K.height;
var Z=K.width;
var C={top:0,left:0};
var M=Position.positionedOffset(this.element);
var P=RichFaces.Menu.removePx(this.element.parentNode.parentNode.style.left);
var V=RichFaces.Menu.removePx(this.element.parentNode.parentNode.style.top);
M[0]+=Number(P);
M[1]+=Number(V);
var Y=Position.cumulativeOffset(this.element);
var W=[Y[0]-M[0],Y[1]-M[1]];
var U=Element.getDimensions(this.element);
var N=M[1]+C.top;
var G=N+U.height;
var F=M[0]+C.left;
var X=F+U.width;
var Q=Element.getDimensions(this.layer);
var E=RichFaces.Menu.Layers.layers[this.layer.id].options;
var S=0;
var L=0;
if(E.direction){strDirection=E.direction.toUpperCase();
S=strDirection.indexOf("LEFT")!=-1?1:S;
S=strDirection.indexOf("RIGHT")!=-1?2:S;
if(S>0){if(strDirection.indexOf("LEFT-UP")!=-1||strDirection.indexOf("RIGHT-UP")!=-1){L=1
}if(strDirection.indexOf("LEFT-DOWN")!=-1||strDirection.indexOf("RIGHT-DOWN")!=-1){L=2
}}}var D=X;
var T=N-this.layer.firstChild.firstChild.offsetTop;
if(S==0){if(D+Q.width+W[0]-A.left>=Z){var R=D+Q.width+W[0]-A.left-Z;
D=F-Q.width
}if(D+W[0]<0){if(Math.abs(D+W[0])>R){D=X
}}}else{if(S==1){D=F-Q.width
}}if(L!=2){if(T+Q.height+W[1]-A.top>=I||L==1){var B=T+Q.height+W[1]-A.top-I;
var O=this.layer.firstChild.childNodes;
if(O.length>1){var J=O[O.length-2];
var H=Position.positionedOffset(J);
T=N-H[1];
if(L==0){if(T<0){if(Math.abs(T)>B){T=N
}}}}}}this.layer.style.left=D+"px";
this.layer.style.top=T+"px";
this.layer.style.width=this.layer.clientWidth+"px"
};
RichFaces.Menu.selectOpen=false;
RichFaces.Menu.MouseIn=false;
RichFaces.Menu.Layer=Class.create();
RichFaces.Menu.Layer.prototype={initialize:function(B,F,G,A){RichFaces.Menu.Layers.listl.push(B);
this.id=B;
this.layer=$(B);
this.level=0;
this.delay=F;
if(G){this.hideDelay=G
}else{this.hideDelay=G
}RichFaces.Menu.fitLayerToContent(this.layer);
this.items=new Array();
RichFaces.Menu.Layers.layers[B]=this;
this.bindings=new Array();
this.highlightParent=true;
this.mouseover=function(L){RichFaces.Menu.MouseIn=true;
RichFaces.Menu.Layers.clearLMTO();
if(this.shouldHighlightParent()&&!this.isWithin(L)){this.highlightLabel()
}Event.stop(L)
}.bindAsEventListener(this);
this.mouseout=function(L){RichFaces.Menu.MouseIn=false;
if(!RichFaces.Menu.selectOpen){RichFaces.Menu.Layers.setLMTO(this.hideDelay)
}if(this.shouldHighlightParent()&&!this.isWithin(L)){this.unHighlightLabel()
}Event.stop(L)
}.bindAsEventListener(this);
var I=new RichFaces.Menu.Layer.Binding(this.id,"mouseover",this.mouseover);
this.bindings.push(I);
I.refresh();
I=new RichFaces.Menu.Layer.Binding(this.id,"mouseout",this.mouseout);
this.bindings.push(I);
I.refresh();
var C=$A(this.layer.getElementsByTagName("select"));
for(i=0;
i<C.length;
i++){var K=this.openSelect.bindAsEventListener(this);
var J=this.closeSelect.bindAsEventListener(this);
Event.observe(C[i],"focus",K);
Event.observe(C[i],"blur",J);
var E=this.MouseoverInInput.bindAsEventListener(this);
var H=this.MouseoutInInput.bindAsEventListener(this);
Event.observe(C[i],"mouseover",E);
Event.observe(C[i],"mouseout",H);
var D=this.OnKeyPress.bindAsEventListener(this);
Event.observe(C[i],"keypress",D)
}C=$A(this.layer.getElementsByTagName("input"));
for(i=0;
i<C.length;
i++){var K=this.openSelect.bindAsEventListener(this);
var J=this.closeSelect.bindAsEventListener(this);
Event.observe(C[i],"focus",K);
Event.observe(C[i],"blur",J);
var E=this.MouseoverInInput.bindAsEventListener(this);
var H=this.MouseoutInInput.bindAsEventListener(this);
Event.observe(C[i],"mouseover",E);
Event.observe(C[i],"mouseout",H);
var D=this.OnKeyPress.bindAsEventListener(this);
Event.observe(C[i],"keypress",D)
}C=$A(this.layer.getElementsByTagName("textarea"));
for(i=0;
i<C.length;
i++){var K=this.openSelect.bindAsEventListener(this);
var J=this.closeSelect.bindAsEventListener(this);
Event.observe(C[i],"focus",K);
Event.observe(C[i],"blur",J);
var E=this.MouseoverInInput.bindAsEventListener(this);
var H=this.MouseoutInInput.bindAsEventListener(this);
Event.observe(C[i],"mouseover",E);
Event.observe(C[i],"mouseout",H)
}if(A){this.selectedClass=A
}},getLabel:function(){return RichFaces.Menu.Layers.layers[this.layer.id].layer.parentNode.parentNode
},highlightLabel:function(){var A=$(this.getLabel());
RichFaces.Menu.Items.replaceClasses(A,["dr-menu-label-unselect","rich-ddmenu-label-unselect"],["dr-menu-label-select","rich-ddmenu-label-select"]);
if(this.selectedClass){Element.addClassName(A,this.selectedClass)
}},unHighlightLabel:function(){var A=$(this.getLabel());
RichFaces.Menu.Items.replaceClasses(A,["dr-menu-label-select","rich-ddmenu-label-select"],["dr-menu-label-unselect","rich-ddmenu-label-unselect"]);
if(this.selectedClass){Element.removeClassName(A,this.selectedClass)
}},shouldHighlightParent:function(){var A=this.highlightParent;
var B=null;
if(A&&(B=this.getParentLayer())){A&=B.shouldHighlightParent()
}return A
},getParentLayer:function(){return this.level>0?RichFaces.Menu.Layers.layers[(RichFaces.Menu.Layers.father[this.id])]:null
},isWithin:function(E){E=Event.extend(E);
var B=true;
var C=E.relatedTarget;
try{if(C&&C.className=="anonymous-div"){return false
}}catch(F){return false
}while(C&&C.nodeType!=1){C=C.parentNode
}var A=E.target;
var D=$(this.id);
if(C){B=$(C).descendantOf(D)
}B&=$(A).descendantOf(D);
return B
},openSelect:function(B){RichFaces.Menu.selectOpen=true;
var A=this.ClickInput.bindAsEventListener(this);
Event.observe(Event.element(B),"click",this.ClickInput)
},closeSelect:function(B){RichFaces.Menu.selectOpen=false;
var A=this.ClickInput.bindAsEventListener(this);
Event.stopObserving(Event.element(B),"click",this.ClickInput);
if(RichFaces.Menu.MouseIn==false){RichFaces.Menu.Layers.setLMTO(this.hideDelay)
}},OnKeyPress:function(A){if(A.keyCode==13){RichFaces.Menu.Layers.setLMTO(this.hideDelay)
}},MouseoverInInput:function(B){var A=this.ClickInput.bindAsEventListener(this);
Event.observe(Event.element(B),"click",this.ClickInput)
},ClickInput:function(A){Event.stop(A||window.event);
return false
},MouseoutInInput:function(B){var A=this.ClickInput.bindAsEventListener(this);
Event.stopObserving(Event.element(B),"click",this.ClickInput)
},rebind:function(){$A(this.bindings).each(function(A){A.refresh()
})
},showMe:function(A){this.closeSiblings(A);
RichFaces.Menu.Layers.showMenuLayer(this.id,A,this.delay);
RichFaces.Menu.Layers.levels[this.level]=this
},closeSiblings:function(B){if(RichFaces.Menu.Layers.levels[this.level]&&RichFaces.Menu.Layers.levels[this.level].id!=this.id){for(var A=this.level;
A<RichFaces.Menu.Layers.levels.length;
A++){if(RichFaces.Menu.Layers.levels[A]){RichFaces.Menu.Layers.levels[A].hideMe()
}}}},closeMinors:function(C){var B=this.items[C];
for(var A=this.level+(!B.childMenu?1:2);
A<RichFaces.Menu.Layers.levels.length;
A++){if(RichFaces.Menu.Layers.levels[A]){RichFaces.Menu.Layers.levels[A].hideMe()
}}if(B.menu.refItem){B.menu.refItem.highLightGroup(true)
}},addItem:function(D,B){var A=this;
var C=new RichFaces.Menu.Item(D,this,B||{});
this.items[D]=C;
return this
},hideMe:function(A){RichFaces.Menu.Layers.clearPopUpTO();
RichFaces.Menu.Layers.levels[this.level]=null;
RichFaces.Menu.Layers.LMPopUpL(this.id,false,A)
},asDropDown:function(H,C,G,E,J){this.options=J||{};
if(this.options.ongroupactivate){this.eventOnGroupActivate=this.options.ongroupactivate.bindAsEventListener(this)
}if(this.options.onitemselect){this.eventOnItemSelect=this.options.onitemselect.bindAsEventListener(this)
}if(this.options.oncollapse){this.eventOnCollapse=this.options.oncollapse.bindAsEventListener(this)
}if(this.options.onexpand){this.eventOnExpand=this.options.onexpand.bindAsEventListener(this)
}var A=function(K){RichFaces.Menu.Layers.showDropDownLayer(this.id,H,K,this.delay)
};
var I=function(K){if(!J.disabled&&!RichFaces.Menu.isWithin(K,$(H))){this.highlightLabel()
}};
var B=function(K){RichFaces.Menu.Layers.setLMTO(this.hideDelay);
RichFaces.Menu.Layers.clearPopUpTO()
};
var D=function(K){if(!J.disabled&&!RichFaces.Menu.isWithin(K,$(H))){this.unHighlightLabel()
}};
if(!G){G="onmouseover"
}G=this.eventJsToPrototype(G);
if(!E){E="onmouseout"
}E=this.eventJsToPrototype(E);
var F=function(L,K,M){var N=new RichFaces.Menu.Layer.Binding(L,K,M);
this.bindings.push(N);
N.refresh()
}.bind(this);
F(H,G,function(K){A.call(this,K);
I.call(this,K)
}.bindAsEventListener(this));
if(E=="mouseout"){F(H,E,function(K){B.call(this,K);
D.call(this,K)
}.bindAsEventListener(this))
}else{F(C,E,B.bindAsEventListener(this));
F(H,"mouseout",D.bindAsEventListener(this))
}RichFaces.Menu.Layers.horizontals[this.id]=H;
return this
},asSubMenu:function(A,B,E,C){this.options=C||{};
if(this.options.onclose){this.eventOnClose=this.options.onclose.bindAsEventListener(this)
}if(this.options.onopen){this.eventOnOpen=this.options.onopen.bindAsEventListener(this)
}if(!E){E="onmouseover"
}E=this.eventJsToPrototype(E);
this.level=RichFaces.Menu.Layers.layers[A].level+1;
RichFaces.Menu.Layers.father[this.id]=A;
if(!B){B=A
}var G=$(B);
this.refItem=RichFaces.Menu.Layers.layers[A].items[B];
this.refItem.childMenu=this;
var F=new RichFaces.Menu.Layer.Binding(B,E,this.showMe.bindAsEventListener(this));
this.bindings.push(F);
F.refresh();
var D=this;
while(D.level>0){D=RichFaces.Menu.Layers.layers[(RichFaces.Menu.Layers.father[D.id])]
}if(D&&D.hideDelay){this.hideDelay=D.hideDelay
}return this
},asContextMenu:function(A){this.highlightParent=false;
this.options=A||{};
if(this.options.ongroupactivate){this.eventOnGroupActivate=this.options.ongroupactivate.bindAsEventListener(this)
}if(this.options.onitemselect){this.eventOnItemSelect=this.options.onitemselect.bindAsEventListener(this)
}if(this.options.oncollapse){this.eventOnCollapse=this.options.oncollapse.bindAsEventListener(this,"collapse")
}if(this.options.onexpand){this.eventOnExpand=this.invokeEvent.bindAsEventListener(this,"expand")
}return this
},invokeEvent:function(D,B){var C=this.options["on"+B];
var A;
if(C){var E;
if(D){E=D
}else{if(document.createEventObject){E=document.createEventObject()
}else{if(document.createEvent){E=document.createEvent("Events");
E.initEvent(B,true,false)
}}}A=C.call(this,E)
}if(A!=false){A=true
}return A
},eventJsToPrototype:function(B){var A=B.indexOf("on");
if(A>=0){B=B.substr(A+2)
}return B
}};
RichFaces.Menu.Layer.Binding=Class.create();
RichFaces.Menu.Layer.Binding.prototype={initialize:function(A,C,B){this.objectId=A;
this.eventname=C;
this.handler=B
},refresh:function(){var A=$(this.objectId);
if(A){Event.stopObserving(A,this.eventname,this.handler);
Event.observe(A,this.eventname,this.handler);
return true
}return false
},remove:function(){var A=$(this.objectId);
if(A){Event.stopObserving(A,this.eventname,this.handler);
this.handler=null
}}};
RichFaces.Menu.Items={itemClassNames:["rich-menu-item-enabled"],groupClassNames:["rich-menu-group-enabled"],itemHoverClassNames:["rich-menu-item-hover"],groupHoverClassNames:["rich-menu-group-hover"],iconClassNames:[],hoverIconClassNames:["dr-menu-icon-selected","rich-menu-item-icon-selected"],labelClassNames:[],hoverLabelClassNames:["rich-menu-item-label-selected"],replaceClasses:function(B,C,A){var D=$(B);
$A(C).each(function(E){D.removeClassName(E)
});
$A(A).each(function(E){D.addClassName(E)
})
},getHoverClassNames:function(A){if(A.options.flagGroup==1){return this.groupHoverClassNames
}else{return this.itemHoverClassNames
}},getClassNames:function(A){if(A.options.flagGroup==1){return this.groupClassNames
}else{return this.itemClassNames
}},onmouseover:function(I){var F=I.getElement();
var H=I.getIcon();
var A=I.getLabel();
var G=I.getHoverClasses();
var D=I.getIconHoverClasses();
var E=I.getLabelHoverClasses();
var B=I.getInlineStyle();
var C=I.getHoverStyle();
F.style.cssText=B.concat(C);
this.replaceClasses(F,this.getClassNames(I),this.getHoverClassNames(I).concat(G));
this.replaceClasses(H,this.iconClassNames,this.hoverIconClassNames.concat(D));
this.replaceClasses(A,this.labelClassNames,this.hoverLabelClassNames.concat(E))
},onmouseout:function(F){var D=F.getElement();
var E=F.getIcon();
var A=F.getLabel();
var G=F.getHoverClasses();
var B=F.getIconHoverClasses();
var C=F.getLabelHoverClasses();
var H=F.getInlineStyle();
D.style.cssText=H;
this.replaceClasses(D,this.getHoverClassNames(F).concat(G),this.getClassNames(F));
this.replaceClasses(E,this.hoverIconClassNames.concat(B),this.iconClassNames);
this.replaceClasses(A,this.hoverLabelClassNames.concat(C),this.labelClassNames)
}};
RichFaces.Menu.isWithin=function(D,C){var A=false;
Event.extend(D);
var B=D.relatedTarget;
try{if(B&&B.className=="anonymous-div"){return false
}}catch(E){return false
}while(B&&B.nodeType!=1){B=B.parentNode
}if(B){A=B==C||$(B).descendantOf(C)
}return A
};
RichFaces.Menu.Item=Class.create({initialize:function(D,C,A){this.options=A;
this.id=D;
this.menu=C;
this.mouseOver=false;
var B;
B=new RichFaces.Menu.Layer.Binding(D,"mouseover",this.onmouseover.bindAsEventListener(this));
C.bindings.push(B);
B.refresh();
B=new RichFaces.Menu.Layer.Binding(D,"mouseout",this.onmouseout.bindAsEventListener(this));
C.bindings.push(B);
B.refresh();
B=new RichFaces.Menu.Layer.Binding(D,"click",this.onclick.bindAsEventListener(this));
C.bindings.push(B);
B.refresh()
},onclick:function(B){if(this.options.closeOnClick){var A=this.menu;
while(A.level>0){A=RichFaces.Menu.Layers.layers[(RichFaces.Menu.Layers.father[A.id])]
}if(A&&A.eventOnItemSelect){A.eventOnItemSelect()
}RichFaces.Menu.Layers.shutdown()
}if(!this.options.disabled){RichFaces.Menu.Items.onmouseout(this)
}},getElement:function(){return $(this.id)
},getIcon:function(){return $(this.id+":icon")
},getLabel:function(){return $(this.id+":anchor")
},getInlineStyle:function(){return this.options.style||""
},getHoverStyle:function(){return this.options.selectStyle||""
},getHoverClasses:function(){return $A(this.options.selectClass).compact()
},getIconHoverClasses:function(){return $A(this.options.iconHoverClass).compact()
},getLabelHoverClasses:function(){return $A(this.options.labelHoverClass).compact()
},isDisabled:function(){return this.options.disabled||false
},onmouseover:function(B){var A=this.getElement();
if(this.options.onmouseover&&!this.options.disabled){if(this.options.onmouseover.call(A,B)==false){Event.stop(B);
return 
}}if(RichFaces.Menu.isWithin(B,A)){return 
}this.menu.closeMinors(this.id);
if(this.isDisabled()){return 
}if(this.options.flagGroup==1){this.mouseOver=true;
this.highLightGroup(true)
}RichFaces.Menu.Items.onmouseover(this)
},onmouseout:function(B){Event.extend(B);
if(this.options.onmouseout&&!this.options.disabled){if(this.options.onmouseout.call(A,B)==false){Event.stop(B);
return 
}}var A=this.getElement();
if(RichFaces.Menu.isWithin(B,A)){return 
}if(this.isDisabled()){return 
}if(this.options.flagGroup==1){this.mouseOver=false;
this.highLightGroup(false)
}RichFaces.Menu.Items.onmouseout(this)
},highLightGroup:function(A){if(A){Element.removeClassName(this.id,"rich-menu-group-enabled");
Element.addClassName(this.id,"rich-menu-group-hover");
if(this.options.selectClass){Element.addClassName(this.id,this.options.selectClass)
}Element.addClassName(this.id+":icon","rich-menu-item-icon-selected");
Element.addClassName(this.id+":anchor","rich-menu-item-label-selected");
Element.addClassName(this.id+":icon","rich-menu-group-icon-selected");
Element.addClassName(this.id+":anchor","rich-menu-group-label-selected")
}else{if(!this.mouseOver){Element.removeClassName(this.id,"rich-menu-group-hover");
Element.addClassName(this.id,"rich-menu-group-enabled");
if(this.options.selectClass){Element.removeClassName(this.id,this.options.selectClass)
}Element.removeClassName(this.id+":icon","rich-menu-item-icon-selected");
Element.removeClassName(this.id+":anchor","rich-menu-item-label-selected");
Element.removeClassName(this.id+":icon","rich-menu-group-icon-selected");
Element.removeClassName(this.id+":anchor","rich-menu-group-label-selected")
}}}});
RichFaces.Menu.findMenuItem=function(C){var A;
var B=null;
for(var D in RichFaces.Menu.Layers.layers){A=RichFaces.Menu.Layers.layers[D];
B=A.items[C];
if(B){break
}}return B
};
RichFaces.Menu.updateItem=function(E,C,A){var D=RichFaces.Menu.findMenuItem(C.id);
var B="rich-menu-item rich-menu-item-enabled";
if(D){if(D.options.styleClass){B=+" "+D.options.styleClass
}C.className=B;
if(D.options.onselect){D.options.onselect(E)
}}else{if(A){if(A.styleClass){B+=" "+A.styleClass
}C.className=B;
if(A.onselect){A.onselect(E)
}}}};
RichFaces.Menu.submitForm=function(D,B,F,E,A){RichFaces.Menu.updateItem(D,B,A);
var C=A4J.findForm(B);
if(!F){F={}
}if(!E){E=""
}F[B.id+":hidden"]=B.id;
Richfaces.jsFormSubmit(B.id,C.id,E,F);
return false
};
RichFaces.Menu.groupMouseOut=function(D,C,B,A){if(RichFaces.Menu.isWithin(D,C)){return 
}C.className="rich-menu-group rich-menu-group-enabled "+(B?B:"");
C.style.cssText=A
};
RichFaces.Menu.itemMouseOut=function(E,D,C,B,A){if(RichFaces.Menu.isWithin(E,D)){return 
}D.className="rich-menu-item rich-menu-item-enabled "+(C?C:"");
D.style.cssText=B;
$(D.id+":icon").className="dr-menu-icon rich-menu-item-icon "+(A?A:"");
Element.removeClassName($(D.id+":anchor"),"rich-menu-item-label-selected")
};
RichFaces.Menu.groupMouseOver=function(C,B,D,A){if(RichFaces.Menu.isWithin(C,B)){return 
}B.className="rich-menu-group rich-menu-group-enabled "+(D?D:"");
B.style.cssText=A
};
RichFaces.Menu.itemMouseOver=function(E,C,D,B,A){if(RichFaces.Menu.isWithin(E,C)){return 
}C.className="rich-menu-item rich-menu-item-hover "+(D?D:"");
C.style.cssText=B;
$(C.id+":icon").className="dr-menu-icon dr-menu-icon-selected rich-menu-item-icon rich-menu-item-icon-selected "+(A?A:"");
Element.addClassName($(C.id+":anchor"),"rich-menu-item-label-selected")
}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.DFSControl={};
Richfaces.DFSControl.Slider=Class.create();
Richfaces.DFSControl.execOnLoad=function(A,C,B){if(C()){A()
}else{window.setTimeout(function(){Richfaces.DFSControl.execOnLoad(A,C,B)
},B)
}};
Richfaces.DFSControl.Slider.prototype={initialize:function(D,A,B){var C=this;
if(D instanceof Array){this.handles=D.collect(function(E){return $(E)
})
}else{this.handles=[$(D)]
}this.track=$(A);
this.options=B||{};
this.flag=false;
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
this.sliderInput=$(this.options.sliderInputId);
this.restricted=this.options.restricted||false;
this.maximum=this.options.maximum||this.range.end;
this.minimum=this.options.minimum||this.range.start;
this.alignX=parseInt(this.options.alignX||"0");
this.alignY=parseInt(this.options.alignY||"0");
this.trackLength=this.maximumOffset()-this.minimumOffset();
this.active=false;
this.dragging=false;
this.disabled=false;
if(this.options.disabled){this.setDisabled()
}this.allowedValues=this.options.values?this.options.values.sortBy(Prototype.K):false;
if(this.allowedValues&&this.allowedValues.length>0){this.minimum=this.allowedValues.min();
this.maximum=this.allowedValues.max()
}this.eventMouseDown=this.startDrag.bindAsEventListener(this);
this.eventMouseUp=this.endDrag.bindAsEventListener(this);
this.eventMouseMove=this.update.bindAsEventListener(this);
this.loadEventHandler=this.initHandles.bindAsEventListener(this);
Event.observe(this.track,"mousedown",this.eventMouseDown);
Event.observe(document,"mouseup",this.eventMouseUp);
Event.observe(document,"mousemove",this.eventMouseMove);
this.handles[0].style.visibility="hidden";
if(this.options.isAjax){Richfaces.DFSControl.execOnLoad(function(){this.initHandles()
}.bind(this),function(){return this.handles&&this.handles.length>0&&this.handles[0].offsetHeight>0
}.bind(this),100)
}else{Event.observe(window,"load",this.loadEventHandler)
}this.initialized=true
},initHandles:function(){this.handleLength=this.isVertical()?(this.handles[0].offsetHeight!=0?this.handles[0].offsetHeight:this.handles[0].style.height.replace(/px$/,"")):(this.handles[0].offsetWidth!=0?this.handles[0].offsetWidth:this.handles[0].style.width.replace(/px$/,""));
var A=this;
this.handles.each(function(C,B){B=A.handles.length-1-B;
A.setValue(parseFloat((A.options.sliderValue instanceof Array?A.options.sliderValue[B]:A.options.sliderValue)||A.range.start),B);
Element.makePositioned(C);
Event.observe(C,"mousedown",A.eventMouseDown)
});
this.handles[0].style.visibility=""
},dispose:function(){var A=this;
Event.stopObserving(this.track,"mousedown",this.eventMouseDown);
Event.stopObserving(document,"mouseup",this.eventMouseUp);
Event.stopObserving(document,"mousemove",this.eventMouseMove);
Event.stopObserving(window,"load",this.loadEventHandler);
this.handles.each(function(B){Event.stopObserving(B,"mousedown",A.eventMouseDown)
})
},setDisabled:function(){this.disabled=true
},setEnabled:function(){this.disabled=false
},getNearestValue:function(A){if(this.allowedValues&&this.allowedValues.length>0){if(A>=this.allowedValues.max()){return(this.allowedValues.max())
}if(A<=this.allowedValues.min()){return(this.allowedValues.min())
}var C=Math.abs(this.allowedValues[0]-A);
var B=this.allowedValues[0];
this.allowedValues.each(function(D){var E=Math.abs(D-A);
if(E<=C){B=D;
C=E
}});
return B
}if(A>this.range.end){return this.range.end
}else{if(A<this.range.start){return this.range.start
}else{return parseInt(A)
}}},setValue:function(B,A){if(!this.active){this.activeHandleIdx=A||0;
this.activeHandle=this.handles[this.activeHandleIdx];
this.updateStyles()
}A=A||this.activeHandleIdx||0;
if(this.initialized&&this.restricted){if((A>0)&&(B<this.values[A-1])){B=this.values[A-1]
}if((A<(this.handles.length-1))&&(B>this.values[A+1])){B=this.values[A+1]
}}B=this.getNearestValue(B);
this.values[A]=B;
this.value=this.values[0];
if(!isNaN(B)){this.handles[A].style[this.isVertical()?"top":"left"]=this.translateToPx(B)
}this.drawSpans();
if((!this.dragging||!this.event)&&this.flag){this.updateFinished()
}this.flag=true
},setValueBy:function(B,A){this.setValue(this.values[A||this.activeHandleIdx||0]+B,A||this.activeHandleIdx||0)
},translateToPx:function(A){return Math.round(((this.trackLength-this.handleLength)/(this.range.end-this.range.start))*(A-this.range.start))+"px"
},translateToValue:function(A){return((A/(this.trackLength-this.handleLength)*(this.range.end-this.range.start))+this.range.start)
},getRange:function(B){var A=this.values.sortBy(Prototype.K);
B=B||0;
return $R(A[B],A[B+1])
},minimumOffset:function(){return(this.isVertical()?this.alignY:this.alignX)
},maximumOffset:function(){return(this.isVertical()?(this.track.offsetHeight!=0?this.track.offsetHeight:this.track.style.height.replace(/px$/,""))-this.alignY:(this.track.offsetWidth!=0?this.track.offsetWidth:this.track.style.width.replace(/px$/,""))-this.alignY)
},isVertical:function(){return(this.axis=="vertical")
},drawSpans:function(){var A=this;
if(this.spans){$R(0,this.spans.length-1).each(function(B){A.setSpan(A.spans[B],A.getRange(B))
})
}if(this.options.startSpan){this.setSpan(this.options.startSpan,$R(0,this.values.length>1?this.getRange(0).min():this.value))
}if(this.options.endSpan){this.setSpan(this.options.endSpan,$R(this.values.length>1?this.getRange(this.spans.length-1).max():this.value,this.maximum))
}},setSpan:function(B,A){if(this.isVertical()){B.style.top=this.translateToPx(A.start);
B.style.height=this.translateToPx(A.end-A.start+this.range.start)
}else{B.style.left=this.translateToPx(A.start);
this.handles.each(function(C){var D=$(C.id).offsetLeft;
if(D>=0){B.style.width=D+"px"
}})
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
if(navigator.appVersion.indexOf("AppleWebKit")>0){window.scrollBy(0,0)
}Event.stop(A)
}},draw:function(B){var D=[Event.pointerX(B),Event.pointerY(B)];
var A=Position.cumulativeOffset(this.track);
D[0]-=this.offsetX+A[0];
D[1]-=this.offsetY+A[1];
this.event=B;
var C=this.translateToValue(this.isVertical()?D[1]:D[0]);
if(this.invokeEvent("slide",B,C,this.sliderInput)){this.setValue(C)
}if(this.initialized){if(this.options.onSlideSubmit){this.options.onSlideSubmit(B,this.values.length>1?this.values:this.values[0],this)
}}},endDrag:function(A){if(this.active&&this.dragging){this.finishDrag(A,true);
Event.stop(A)
}this.active=false;
this.dragging=false
},finishDrag:function(A,B){this.active=false;
this.dragging=false;
this.updateFinished(A)
},updateFinished:function(A){if(this.initialized){var B=this.values.length>1?this.values:this.values[0];
if(this.options.onSlideSubmit){this.options.onSlideSubmit(A,B,this)
}}this.event=null
},valueChanged:function(A,B){if(!isNaN(Number(B))){if(this.invokeEvent("change",A,B,this.sliderInput)){this.setValue(B)
}}else{this.sliderInput.value=this.value
}},invokeEvent:function(B,E,G,C){var D=this.options["on"+B];
var A;
if(D){var F;
if(E){F=E
}else{if(document.createEventObject){F=document.createEventObject()
}else{if(document.createEvent){F=document.createEvent("Events");
F.initEvent(B,true,false)
}}}F.rich={component:this};
F.rich.value=G;
try{A=D.call(C,F)
}catch(H){LOG.warn("Exception: "+H.Message+"\n[on"+B+"]")
}}if(A!=false){A=true
}return A
}}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.DatascrollerScrollEvent="rich:datascroller:onscroll";
Richfaces.Datascroller=Class.create({initialize:function(A,B){this.element=$(A);
this.element.component=this;
this["rich:destructor"]="destroy";
Event.observe(this.element,Richfaces.DatascrollerScrollEvent,B)
},destroy:function(){this.element.component=undefined;
this.element=undefined
},switchToPage:function(A){if(typeof A!="undefined"&&A!=null){Event.fire(this.element,Richfaces.DatascrollerScrollEvent,{"page":A})
}},next:function(){this.switchToPage("next")
},previous:function(){this.switchToPage("previous")
},first:function(){this.switchToPage("first")
},last:function(){this.switchToPage("last")
},fastForward:function(){this.switchToPage("fastforward")
},fastRewind:function(){this.switchToPage("fastrewind")
}})
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.hotKey=function(){this.initialize.apply(this,arguments)
};
Richfaces.hotKey.resolveHandler=function(A){if(A){if(typeof A=="function"){return A
}else{return new Function("event",A)
}}};
jQuery.extend(Richfaces.hotKey.prototype,{initialize:function(F,C,A,B,D){this.id=F;
this.selector=A;
this.key=C;
this.baseOptions=B;
this.handler=D;
this["rich:destructor"]="destroy";
this.element=document.getElementById(F);
this.element.component=this;
if("immediate"==B.timing){this.enable()
}else{if("onload"==B.timing){var E=this;
jQuery(document).ready(function(){E.enable()
})
}}},destroy:function(){this.disable();
this.element.component=null;
this.element=null
},buildOptions:function(C,B){var I=new Array();
var F;
if(typeof C=="string"){F=jQuery(C)
}else{if(C.constructor==Array){F=new Array();
for(var E=0;
E<C.length;
E++){var H=C[E];
if(!H.nodeType){var A=jQuery(H);
for(var D=0;
D<A.length;
D++){F.push(A[D])
}}else{F.push(H)
}}}else{F=[C]
}}for(var E=0;
E<F.length;
E++){var G=jQuery.extend({},this.baseOptions,B);
G.target=F[E];
I.push(G)
}return I
},_getComponentControlParameters:function(A){return A.length<=1?A[0]:A[1]
},_generalAdd:function(D,B,E){var A=function(){if(E.apply(this,arguments)===false){var F=arguments[0];
F.stopPropagation();
F.preventDefault()
}};
for(var C=0;
C<B.length;
C++){jQuery.hotkeys.add(D,B[C],A)
}},_generalRemove:function(C,A){for(var B=0;
B<A.length;
B++){jQuery.hotkeys.remove(C,A[B])
}},enable:function(){if(!this.options){this.options=this.buildOptions(this.selector)
}this._generalAdd(this.key,this.options,this.handler)
},add:function(){var E=this._getComponentControlParameters(arguments);
var A=E.selector||this.selector;
var C=E.key||this.key;
var D=E.handler||this.handler;
var B=this.buildOptions(A,E);
this._generalAdd(C,B,this.constructor.resolveHandler(D))
},disable:function(){if(!this.options){this.options=this.buildOptions(this.selector)
}this._generalRemove(this.key,this.options)
},remove:function(){var D=this._getComponentControlParameters(arguments);
var A=D.selector||this.selector;
var C=D.key||this.key;
var B=this.buildOptions(A,D);
this._generalRemove(C,B)
}})
;
var sbjQuery=oldJQuery;
sbjQuery.fn.SpinButton=function(A){return this.each(function(){this.spinCfg={min:A&&!isNaN(parseFloat(A.min))?Number(A.min):null,max:A&&!isNaN(parseFloat(A.max))?Number(A.max):null,step:A&&A.step?Number(A.step):1,page:A&&A.page?Number(A.page):10,upClass:A&&A.upClass?A.upClass:"up",downClass:A&&A.downClass?A.downClass:"down",reset:A&&A.reset?A.reset:this.value,delay:A&&A.delay?Number(A.delay):500,interval:A&&A.interval?Number(A.interval):100,_btn_width:20,_btn_height:12,_direction:null,_delay:null,_repeat:null,digits:A&&A.digits?Number(A.digits):1};
this.adjustValue=function(G){var F=this.value.toLowerCase();
if(F=="am"){this.value="PM";
return 
}else{if(F=="pm"){this.value="AM";
return 
}}F=(isNaN(this.value)?this.spinCfg.reset:Number(this.value))+Number(G);
if(this.spinCfg.min!==null){F=(F<this.spinCfg.min?(this.spinCfg.max!=null?this.spinCfg.max:this.spinCfg.min):F)
}if(this.spinCfg.max!==null){F=(F>this.spinCfg.max?(this.spinCfg.min!=null?this.spinCfg.min:this.spinCfg.max):F)
}var H=String(F);
while(H.length<this.spinCfg.digits){H="0"+H
}this.value=H
};
sbjQuery(this).keydown(function(F){switch(F.keyCode){case 38:this.adjustValue(this.spinCfg.step);
break;
case 40:this.adjustValue(-this.spinCfg.step);
break;
case 33:this.adjustValue(this.spinCfg.page);
break;
case 34:this.adjustValue(-this.spinCfg.page);
break
}}).bind("mousewheel",function(F){if(F.wheelDelta>=120){this.adjustValue(this.spinCfg.step)
}else{if(F.wheelDelta<=-120){this.adjustValue(-this.spinCfg.step)
}}F.preventDefault()
}).change(function(F){this.adjustValue(0)
});
var D=this;
var C=$(this.id+"BtnUp");
sbjQuery(C).mousedown(function(G){var F=function(){D.adjustValue(D.spinCfg.step)
};
F();
D.spinCfg._delay=window.setTimeout(function(){F();
D.spinCfg._repeat=window.setInterval(F,D.spinCfg.interval)
},D.spinCfg.delay);
D.spinCfg._repeater=true;
return false
}).mouseup(function(F){D.spinCfg._repeater=false;
window.clearInterval(D.spinCfg._repeat);
window.clearTimeout(D.spinCfg._delay)
}).dblclick(function(F){if(sbjQuery.browser.msie){D.adjustValue(D.spinCfg.step)
}}).mouseout(function(F){if(D.spinCfg._repeater){D.spinCfg._repeater=false;
window.clearInterval(D.spinCfg._repeat);
window.clearTimeout(D.spinCfg._delay)
}});
var E=$(this.id+"BtnDown");
sbjQuery(E).mousedown(function(G){var F=function(){D.adjustValue(-D.spinCfg.step)
};
F();
D.spinCfg._delay=window.setTimeout(function(){F();
D.spinCfg._repeat=window.setInterval(F,D.spinCfg.interval)
},D.spinCfg.delay);
D.spinCfg._repeater=true;
return false
}).mouseup(function(F){D.spinCfg._repeater=false;
window.clearInterval(D.spinCfg._repeat);
window.clearTimeout(D.spinCfg._delay)
}).dblclick(function(F){if(sbjQuery.browser.msie){D.adjustValue(-D.spinCfg.step)
}}).mouseout(function(F){if(D.spinCfg._repeater){D.spinCfg._repeater=false;
window.clearInterval(D.spinCfg._repeat);
window.clearTimeout(D.spinCfg._delay)
}});
if(this.addEventListener){this.addEventListener("DOMMouseScroll",function(F){if(F.detail>0){this.adjustValue(-this.spinCfg.step)
}else{if(F.detail<0){this.adjustValue(this.spinCfg.step)
}}F.preventDefault()
},false)
}});
function B(D,F){var E=D[F],C=document.body;
while((D=D.offsetParent)&&(D!=C)){if(!sbjQuery.browser.msie||(D.currentStyle.position!="relative")){E+=D[F]
}}return E
}}
;
if(!window.Richfaces){window.Richfaces={}
}if(!Richfaces.Selection){Richfaces.Selection={}
}Richfaces.Selection.getStart=function(A){if(A.setSelectionRange){return A.selectionStart
}else{if(document.selection&&document.selection.createRange){var B=document.selection.createRange().duplicate();
B.moveEnd("character",A.value.length);
if(B.text==""){return A.value.length
}return A.value.lastIndexOf(B.text)
}}};
Richfaces.Selection.getEnd=function(A){if(A.setSelectionRange){return A.selectionEnd
}else{if(document.selection&&document.selection.createRange){var B=document.selection.createRange().duplicate();
B.moveStart("character",-A.value.length);
return B.text.length
}}};
Richfaces.Selection.setCaretTo=function(B,C){if(B.setSelectionRange){B.focus();
B.setSelectionRange(C,C)
}else{if(B.createTextRange){var A=B.createTextRange();
A.collapse(true);
A.moveEnd("character",C);
A.moveStart("character",C);
A.select()
}}};
var Suggestion={};
Suggestion.Base=function(){};
Suggestion.Base.prototype={baseInitialize:function(D,G,A){this.isOpera=(RichFaces.navigatorType()==RichFaces.OPERA?true:false);
this.element=$(D);
this.update=$(G);
this.hasFocus=false;
this.changed=false;
this.active=false;
this.index=0;
this.prevIndex=-1;
this.entryCount=0;
this.keyEvent=false;
this.oldValue=this.element.value;
this.skipHover=false;
this.selectedItems=[];
this.selectedItemsCache={};
A.selection=G+"_selection";
var F=(RichFaces.navigatorType()==RichFaces.MSIE);
if(F){A.iframeId=G+"_iframe"
}if(this.setOptions){this.setOptions(A)
}else{this.options=A||{}
}this.options.param=this.options.param||this.element.name;
this.options.selectedClasses=(this.options.selectedClass||"dr-sb-int-sel rich-sb-int-sel").split(" ");
this.options.selectValueClass=this.options.selectValueClass||" ";
this.options.tokens=$A(A.tokens)||[];
this.options.frequency=this.options.frequency||0.4;
this.options.minChars=isNaN(this.options.minChars)?1:parseInt(this.options.minChars);
this.options.onShow=this.options.onShow||function(I,J,H){if(!J.style.position||J.style.position=="absolute"){J.style.position="absolute";
RichFaces.Position.smartClone(I,J,H)
}if(!window.opera){Effect.Appear(J,{duration:0.15});
if(H.iframeId){Effect.Appear($(H.iframeId),{duration:0.15,to:0.01})
}}else{Effect.Appear(J,{duration:0.15,to:0.999999})
}};
this.options.onHide=this.options.onHide||function(I,J,H){if(H.iframeId){new Effect.Fade($(H.iframeId),{duration:0.15})
}new Effect.Fade(J,{duration:0.15})
};
this.options.width=this.options.width||"auto";
if(typeof (this.options.tokens)=="string"){this.options.tokens=new Array(this.options.tokens)
}for(var C=0;
C<this.options.tokens.length;
C++){var B=this.options.tokens[C];
if(B.charAt[0]=="'"&&B.charAt[B.length-1]=="'"){this.options.tokens[C]=B.substring(1,-1)
}}this.observerHandle=null;
this.element.setAttribute("autocomplete","off");
Element.hide(this.update);
this.onBlurListener=this.onBlur.bindAsEventListener(this);
Event.observe(this.element,"blur",this.onBlurListener);
if(RichFaces.navigatorType()==RichFaces.MSIE){Event.observe(this.element,"focusout",function(I){var H=I.toElement;
while(H){if(H==this.update){this.element.keepFocus=true;
H=undefined
}else{H=H.parentNode
}}}.bindAsEventListener(this))
}this.onKeyDownListener=this.onKeyDown.bindAsEventListener(this);
Event.observe(this.element,"keydown",this.onKeyDownListener);
if(this.isOpera){this.onKeyPressListener=this.onKeyPress.bindAsEventListener(this);
Event.observe(this.element,"keypress",this.onKeyPressListener);
this.onKeyUpListener=this.onKeyUp.bindAsEventListener(this);
Event.observe(this.element,"keyup",this.onKeyUpListener);
this.upDown=0
}this.onScrollListener=this.onScroll.bindAsEventListener(this);
if(A.popupClass){var E=Element.select(this.update,".dr-sb-ext-decor-3");
Element.addClassName(E[0],A.popupClass)
}this.onNothingLabelClick=this.hideNLabel.bindAsEventListener(this);
this.scrollElements=null;
this.eventOnScroll=this.eventOnScroll.bindAsEventListener(this)
},cancelSubmit:function(A){Event.stop(A)
},disableSubmit:function(){if(this.isOpera){var A=this.element;
while(A.parentNode&&(!A.tagName||(A.tagName.toUpperCase()!="FORM"))){A=A.parentNode
}if(A.tagName&&(A.tagName.toUpperCase()=="FORM")){this.parentForm=A;
this.onSubmitListener=this.cancelSubmit.bindAsEventListener(this);
Event.observe(A,"submit",this.onSubmitListener)
}}},enableSubmit:function(){if(this.isOpera){if(this.parentForm){Event.stopObserving(this.parentForm,"submit",this.onSubmitListener)
}}},onKeyPress:function(A){if(this.upDown!=0){if(this.upDownMark){this.upDownMark=false
}else{if(this.upDown==1){this.keyEvent=true;
this.markPrevious();
this.render()
}else{if(this.upDown==2){this.keyEvent=true;
this.markNext();
this.render()
}else{if(this.upDown==3){this.keyEvent=true;
this.markPreviousPage();
this.render()
}else{if(this.upDown==4){this.keyEvent=true;
this.markNextPage();
this.render()
}}}}}}},onKeyUp:function(A){this.upDownMark=false;
this.upDown=0
},show:function(){if(RichFaces.SAFARI==RichFaces.navigatorType()){this.wasScroll=false;
this.wasBlur=false;
if(!this.overflow){var A=Element.select(this.update,".dr-sb-overflow");
this.overflow=A[0]
}Event.observe(this.overflow,"scroll",this.onScrollListener)
}if(Element.getStyle(this.update,"display")=="none"){this.options.onShow(this.element,this.update,this.options)
}this.disableSubmit();
Richfaces.removeScrollEventHandlers(this.scrollElements,this.eventOnScroll);
this.scrollElements=Richfaces.setupScrollEventHandlers($(this.options.selection),this.eventOnScroll)
},hide:function(){Richfaces.removeScrollEventHandlers(this.scrollElements,this.eventOnScroll);
if(RichFaces.SAFARI==RichFaces.navigatorType()){if(this.wasScroll){this.wasScroll=false;
return 
}Event.stopObserving(this.overflow,"scroll",this.onScrollListener)
}this.stopIndicator();
if(Element.getStyle(this.update,"display")!="none"){this.options.onHide(this.element,this.update,this.options)
}this.enableSubmit();
this.hasFocus=false;
this.active=false
},eventOnScroll:function(A){this.hide()
},hideNLabel:function(B){var A=$(this.update.id+"NothingLabel");
if(A){Element.hide(A);
Event.stopObserving(A,"click",this.onNothingLabelClick);
Event.stopObserving(this.element,"blur",this.onNothingLabelClick);
this.hide()
}},startIndicator:function(){if(this.options.indicator){Element.show(this.options.indicator)
}},stopIndicator:function(){if(this.options.indicator){Element.hide(this.options.indicator)
}},isUnloaded:function(){if(this.element.parentNode&&this.update.parentNode){return false
}LOG.info("Element unloaded from DOM");
if(this.element){Event.stopObserving(this.element,"blur",this.onBlurListener);
Event.stopObserving(this.element,"keydown",this.onKeyDownListener);
if(this.onKeyPressListener){Event.stopObserving(this.element,"keypress",this.onKeyPressListener);
this.onKeyPressListener=undefined
}if(this.onKeyUpListener){Event.stopObserving(this.element,"keyup",this.onKeyUpListener);
this.onKeyUpListener=undefined
}}return true
},onKeyDown:function(A){if(this.isUnloaded()){return 
}if(!this.initialized){if(this.options.iframeId){var C=$(this.options.iframeId);
var B=C.cloneNode(true);
C.parentNode.removeChild(C);
document.body.insertBefore(B,document.body.firstChild)
}var J=this.update.cloneNode(true);
this.update.parentNode.removeChild(this.update);
this.update=J;
this.update.component=this;
this["rich:destructor"]="destroy";
var E=J.getElementsByTagName("script");
for(var F=0;
F<E.length;
F++){var I=E[F];
if(I.parentNode){I.parentNode.removeChild(I)
}}document.body.insertBefore(this.update,document.body.firstChild);
this.initialized=true
}this.wasBlur=false;
if(this.active){this.wasScroll=false;
var D=(A.rich&&A.rich.isCallSuggestion);
switch(A.keyCode){case Event.KEY_TAB:case Event.KEY_RETURN:this.selectEntry(A);
Event.stop(A);
case Event.KEY_ESC:this.hide();
this.active=false;
Event.stop(A);
if(this.isOpera){this.element.focus()
}return ;
case Event.KEY_LEFT:case Event.KEY_RIGHT:return ;
case Event.KEY_UP:this.keyEvent=true;
this.markPrevious();
this.render();
if(navigator.appVersion.indexOf("AppleWebKit")>0){Event.stop(A)
}if(this.isOpera&&!D){this.upDown=1;
this.upDownMark=true
}return ;
case Event.KEY_DOWN:this.keyEvent=true;
this.markNext();
this.render();
if(navigator.appVersion.indexOf("AppleWebKit")>0){Event.stop(A)
}if(this.isOpera&&!D){this.upDown=2;
this.upDownMark=true
}return ;
case 33:this.keyEvent=true;
this.markPreviousPage();
this.render();
if(navigator.appVersion.indexOf("AppleWebKit")>0){Event.stop(A)
}if(this.isOpera&&!D){this.upDown=3;
this.upDownMark=true
}return ;
case 34:this.keyEvent=true;
this.markNextPage();
this.render();
if(navigator.appVersion.indexOf("AppleWebKit")>0){Event.stop(A)
}if(this.isOpera&&!D){this.upDown=4;
this.upDownMark=true
}return 
}}else{if(A.keyCode==Event.KEY_TAB||A.keyCode==Event.KEY_RETURN||A.keyCode==Event.KEY_ESC){return 
}}this.changed=true;
this.hasFocus=true;
if(this.observerHandle){LOG.debug("clear existing observer");
window.clearTimeout(this.observerHandle)
}LOG.debug("set timeout for request suggestion");
var G={};
try{G.target=A.target;
G.srcElement=A.srcElement;
G.type=A.type;
G.altKey=A.altKey;
G.button=A.button;
G.clientX=A.clientX;
G.clientY=A.clientY;
G.ctrlKey=A.ctrlKey;
G.keyCode=A.keyCode;
G.modifiers=A.modifiers;
G.pageX=A.pageX;
G.pageY=A.pageY;
G.screenX=A.screenX;
G.screenY=A.screenY;
G.shiftKey=A.shiftKey;
G.which=A.which;
G.rich=A.rich
}catch(H){LOG.warn("Exception on clone event")
}this.observerHandle=window.setTimeout(this.onObserverEvent.bind(this,G),this.options.frequency*1000)
},_findTr:function(B){var A=Event.element(B);
while(A&&(!A.tagName||A.tagName.toUpperCase()!="TR")){A=A.parentNode
}return A
},onHover:function(B){var A=this._findTr(B);
if(!this.skipHover){if(this.index!=A.autocompleteIndex){this.index=A.autocompleteIndex;
this.render()
}if(B.type=="mousemove"){Event.stopObserving(A,"mousemove",this.onHover)
}}else{this.skipHover=false;
Event.observe(A,"mousemove",this.onHover.bindAsEventListener(this))
}Event.stop(B)
},onClick:function(B){if(this.active){this.wasScroll=false;
this.wasBlur=false;
var A=this._findTr(B);
this.index=A.autocompleteIndex;
this.selectEntry(B);
this.hide()
}},onMouseOut:function(B){var A=this._findTr(B);
Event.stopObserving(A,"mousemove",this.onHover)
},onBlur:function(A){if(this.isUnloaded()){return 
}this.wasBlur=true;
if(!this.active){return 
}if(this.element.keepFocus){this.element.keepFocus=false;
this.element.focus()
}else{setTimeout(this.hide.bind(this),250)
}},onScroll:function(A){if(RichFaces.SAFARI==RichFaces.navigatorType()&&this.wasBlur){if(this.element){this.element.focus();
this.wasScroll=true;
this.wasBlur=false
}}},calcEntryPosition:function(F,A){var E=F;
var B=0;
while(E&&(E!=A)){if(RichFaces.SAFARI==RichFaces.navigatorType()&&"TR"==E.tagName.toUpperCase()){B+=E.select(".dr-sb-cell-padding")[0].offsetTop
}else{B+=E.offsetTop
}if(E.parentNode==A){break
}E=E.offsetParent
}var D;
if(RichFaces.SAFARI==RichFaces.navigatorType()){var C=E.select(".dr-sb-cell-padding")[0];
D=C.offsetTop+C.offsetHeight
}else{D=F.offsetHeight
}return{realOffset:B,entryOffsetHeight:D}
},countVisibleEntries:function(){var E=this.getEntry(this.index);
var D=Element.select(this.update,"._suggestion_size_");
var B=D[0]||this.update;
var A=this.calcEntryPosition(E,B);
var C=Math.round(B.clientHeight/A.entryOffsetHeight);
var F=Math.round((A.realOffset-B.scrollTop)/A.entryOffsetHeight);
return{current:F,all:C}
},render:function(){if(this.entryCount>0){LOG.debug("render for index "+this.index+" and old index "+this.prevIndex);
if(this.prevIndex!=this.index){var G=this.getEntry(this.index);
for(var C=0;
C<this.options.selectedClasses.length;
C++){Element.addClassName(G,this.options.selectedClasses[C])
}var I=G.select(".dr-sb-cell-padding");
for(var C=0;
C<I.length;
C++){Element.addClassName(I[C],this.options.selectValueClass)
}if(this.keyEvent){var A=Element.select(this.update,"._suggestion_size_");
var F=A[0]||this.update;
var J=this.calcEntryPosition(G,F);
var B=F.scrollTop;
if(J.realOffset>F.scrollTop+F.clientHeight-J.entryOffsetHeight){F.scrollTop=J.realOffset-F.clientHeight+J.entryOffsetHeight
}else{if(J.realOffset<F.scrollTop){F.scrollTop=J.realOffset
}}if(B!=F.scrollTop){this.skipHover=true
}this.keyEvent=false
}if(this.prevIndex>=0){var D=this.getEntry(this.prevIndex);
if(D){var E=D.select(".dr-sb-cell-padding");
for(var C=0;
C<E.length;
C++){Element.removeClassName(E[C],this.options.selectValueClass)
}for(var C=0;
C<this.options.selectedClasses.length;
C++){Element.removeClassName(D,this.options.selectedClasses[C])
}}}}this.prevIndex=this.index;
if(this.hasFocus&&!this.wasBlur){this.show();
this.active=true
}}else{var H=$(this.update.id+"NothingLabel");
if(!H||"none"==H.style.display){this.active=false;
this.hide()
}}},markPrevious:function(){if(this.index>0){this.index--
}},markNext:function(){if(this.index<this.entryCount-1){this.index++
}},markPreviousPage:function(){var A=this.countVisibleEntries();
if(this.index>0){if(A.current>0){this.index=this.index-Math.min(A.current,A.all)
}else{this.index=this.index-A.all
}if(this.index<0){this.index=0
}}},markNextPage:function(){var A=this.countVisibleEntries();
if(this.index<this.entryCount-1){if((A.current<A.all-1)&&A.current>=0){this.index=this.index+(A.all-A.current-1)
}else{this.index=this.index+A.all
}if(this.index>this.entryCount-1){this.index=this.entryCount-1
}}},getEntry:function(A){var B=$(this.contentTable).firstChild;
while(!B.tagName||B.tagName.toLowerCase()!="tbody"){B=B.nextSibling
}return $(B.childNodes[A])
},getCurrentEntry:function(){return this.getEntry(this.index)
},selectEntry:function(B){this.active=false;
var A=$(this.options.selection);
A.value=this.index;
var C="";
this.updateElement(this.getCurrentEntry(),B);
if(this.options.onselect){this.options.onselect(this,B)
}if(this.update.onselect){this.update.onselect(this,B)
}A.value=""
},updateElement:function(D,A){if(this.options.updateElement){this.options.updateElement(D);
return 
}var B="";
var C=D.firstChild;
while(!C.tagName||C.tagName.toLowerCase()!="td"){C=C.nextSibling
}B=Element.collectTextNodes(C);
this.insertValue(B,A);
this.oldValue=this.element.value;
this.element.focus();
if(this.options.afterUpdateElement){this.options.afterUpdateElement(this.element,D)
}},updateChoices:function(G){if(!this.changed&&this.hasFocus){if(G){this.update.firstChild.replaceChild(G,this.update.firstChild.firstChild)
}var C=[];
if(this.options.entryClass){var E=Element.select(this.update,"."+this.options.entryClass);
C=E||[]
}else{if(this.update.firstChild&&this.update.firstChild.firstChild&&this.update.firstChild.firstChild.childNodes){Element.cleanWhitespace(this.update);
Element.cleanWhitespace(this.update.firstChild);
Element.cleanWhitespace(this.update.firstChild.firstChild);
C=this.update.firstChild.firstChild.childNodes
}}this.entryCount=C.length;
for(var D=0;
D<this.entryCount;
D++){var F=C[D];
F.autocompleteIndex=D;
this.addObservers(F)
}this.stopIndicator();
var E=Element.select(this.update,"._suggestion_size_");
var A=E[0]||this.update;
A.scrollTop=-1;
A.scrollLeft=-1;
this.index=0;
this.prevIndex=-1;
var B=$(this.update.id+"NothingLabel");
if(B&&this.hasFocus&&!this.wasBlur){if(this.entryCount<1){Element.show(B);
Event.observe(B,"click",this.onNothingLabelClick);
Event.observe(this.element,"blur",this.onNothingLabelClick);
this.show()
}}this.render()
}},addObservers:function(A){Event.observe(A,"mouseover",this.onHover.bindAsEventListener(this));
Event.observe(A,"click",this.onClick.bindAsEventListener(this));
Event.observe(A,"mouseout",this.onMouseOut.bindAsEventListener(this))
},onObserverEvent:function(B){LOG.debug("Observer event occurs");
this.changed=false;
var A=this.element.value;
if((B.rich&&B.rich.isCallSuggestion)||this.oldValue!=A){this.startPosition=0;
this.endPosition=A.length;
if(this.options.tokens.length!=0){var C=this.options.tokens.join("");
this.startPosition=this.endPosition=Richfaces.Selection.getStart(this.element);
while(this.endPosition<A.length&&C.indexOf(A.charAt(this.endPosition))==-1){this.endPosition++
}while(this.startPosition>0&&C.indexOf(A.charAt(this.startPosition-1))==-1){this.startPosition--
}}if(this.options.usingSuggestObjects){this.updateItems(A)
}}if((B.rich&&B.rich.ignoreMinChars)||this.getToken().length>=this.options.minChars){LOG.debug("Call data for update choices");
if(B.keyCode==Event.KEY_DOWN||this.oldValue!=A){this.startIndicator();
this.getUpdatedChoices(B)
}}else{this.active=false;
this.hide()
}this.oldValue=A;
this.observerHandle=null
},callSuggestion:function(A){if(this.active){return 
}if(!this.hasFocus){this.element.focus();
Richfaces.Selection.setCaretTo(this.element,this.element.value.length)
}var B={};
B.target=this.element;
B.type="keydown";
B.altKey=false;
B.clientX=0;
B.clientY=0;
B.ctrlKey=false;
B.keyCode=40;
B.pageX=0;
B.pageY=0;
B.screenX=0;
B.screenY=0;
B.shiftKey=false;
B.which=40;
B.rich={"isCallSuggestion":true,"ignoreMinChars":A};
this.onKeyDownListener(B)
},getSelectedItems:function(){var A=new Array();
if(this.options.usingSuggestObjects){for(var B=0;
B<this.selectedItems.length;
B++){if(this.selectedItems[B].object){A.push(this.selectedItems[B].object)
}}}return A
},updateItems:function(F){this.isSelectedItemsUpdated=false;
var G=this.selectedItems;
var E=F.replace(/^\s+/,"").replace(/\s+$/,"");
var H="";
this.selectedItems=[];
var B={};
if(this.options.tokens.length!=0){var D=new RegExp("\\s*[\\"+this.options.tokens.join("|\\")+"]\\s*");
var A=E.split(D);
for(var C=0;
C<A.length;
C++){H=this.selectedItemsCache[A[C]];
if(!H){H={text:A[C],object:null}
}this.selectedItems.push(H);
B[H.text]=H
}}else{H=this.selectedItemsCache[E];
if(!H){H={text:E,object:null}
}this.selectedItems.push(H);
B[H.text]=H
}this.selectedItemsCache=B;
if(this.selectedItems.length!=G.length){this.isSelectedItemsUpdated=true
}else{for(var C=0;
C<this.selectedItems.length;
C++){if(this.selectedItems[0].text!=G.text||this.selectedItems[0].object!=G.object){this.isSelectedItemsUpdated=true;
break
}}}},updateSelectedItems:function(A){for(var B=0;
B<this.selectedItems.length;
B++){if(!this.selectedItems[B].object){var C=A[this.selectedItems[B].text];
if(C){this.selectedItems[B].object=C;
this.isSelectedItemsUpdated=true
}}}},getItemListForUpdate:function(){var C=[];
var A="";
if(this.options.tokens.length!=0){for(var B=0;
B<this.selectedItems.length;
B++){if(!this.selectedItems[B].object&&this.selectedItems[B].text.length==0){C.push(this.selectedItems[B].text)
}}A=C.join(this.options.tokens[0])
}else{if(this.selectedItems.length!=0&&!this.selectedItems[0].object){A=this.selectedItems[0].object
}}return A
},insertValue:function(K,A){var F=this.element.value.substr(0,this.startPosition);
var C=this.element.value.substr(this.endPosition);
var H=this.element.value.substring(this.startPosition,this.endPosition);
var B=H.match(/^\s+/);
if(B){F+=B[0]
}B=H.match(/\s+$/);
if(B){C=B[0]+C
}this.element.value=F+K+C;
Richfaces.Selection.setCaretTo(this.element,(F+K).length);
this.endPosition=this.startPosition+K.length;
if(this.options.usingSuggestObjects){var E=0;
if(this.options.tokens.length!=0){var I=this.options.tokens.join("");
var D=0;
while(D<this.startPosition){if(I.indexOf(this.element.value.charAt(D))!=-1){E++
}D++
}}var J={text:K,object:this.fetchValues[this.index]};
var G=(!this.selectedItems[E]||this.selectedItems[E].text!=K||this.selectedItems[E].object==null?true:false);
this.selectedItemsCache[K]=J;
if(!this.selectedItems[E]){this.selectedItems.push(J)
}else{this.selectedItems[E]=J
}if(G){this.callOnObjectChangeListener(A)
}}},getToken:function(){var A=this.element.value.substring(this.startPosition,this.endPosition).replace(/^\s+/,"").replace(/\s+$/,"");
return/\n/.test(A)?"":A
},callOnObjectChangeListener:function(A){if(this.options.onobjectchange){this.options.onobjectchange(this,A)
}}};
RichFaces.Suggestion=Class.create();
Object.extend(Object.extend(RichFaces.Suggestion.prototype,Suggestion.Base.prototype),{initialize:function(A,F,D,E,B,C){var G=C.popup||"ac1update";
if(!$(G)){this.create(D,G,E,C)
}this.baseInitialize(D,G,C);
this.options.asynchronous=true;
this.options.onajaxcomplete=C.oncomplete;
this.options.oncomplete=this.onComplete.bind(this);
this.options.defaultParams=this.options.parameters||null;
this.content=E;
this.contentTable=E+":suggest";
this.containerId=A;
this.actionUrl=F;
if(B&&B!="null"){this.onsubmitFunction=new Function(B+";return true;").bind(this.element)
}this.update.component=this;
this["rich:destructor"]="destroy";
return this
},destroy:function(){this.update.component=null
},getUpdatedChoices:function(A){this.options.parameters[this.options.param]=this.getToken();
if(this.options.usingSuggestObjects){this.options.parameters[this.options.param+"request"]=this.getItemListForUpdate()
}if(this.onsubmitFunction&&!this.onsubmitFunction()){return 
}A4J.AJAX.Submit(this.containerId,this.actionUrl,A,this.options)
},onComplete:function(B,A,C){LOG.debug("AJAX response  complete - updateChoices");
if(!this.update.style.position||this.update.style.position=="absolute"){this.update.style.position="absolute";
RichFaces.Position.smartClone(this.element,this.update,this.options)
}this.updateChoices();
if(this.options.usingSuggestObjects&&C){this.fetchValues=C.suggestionObjects;
this.updateSelectedItems(C.requestedObjects);
if(this.isSelectedItemsUpdated){this.isSelectedItemsUpdated=false;
this.callOnObjectChangeListener(A)
}LOG.debug("Choices updated")
}if(this.options.onajaxcomplete){this.options.onajaxcomplete(B,A)
}},create:function(D,B,F,C){if(!$(D)){return 
}var E="display:none;"+(C.popupStyle||"border:1px solid black;position:absolute; background-color:white;");
var A=C.popupClass?' class="'+C.popupClass+'" ':"";
new Insertion.Top($(D).ownerDocument.body,'<div id="'+B+'"'+A+' style="'+E+'"><table id="'+F+'" cellspacing="0" cellpadding="0"><tbody></tbody></table></div>')
}});
RichFaces.Position={source:null,target:null,smartClone:function(E,F,A){this.options=Object.extend({width:"auto"},A||{});
this.source=$(E);
this.target=$(F);
this.clonePosition(this.target,this.source,this.source.offsetHeight);
if(A.iframeId){var D=$(A.iframeId);
if(jQuery.browser.msie){var G=D.offsetParent;
if(G&&G.nodeType==Node.ELEMENT_NODE){var B=jQuery(G);
if(B.css("position")=="static"){B.css("position","relative").css("position","static")
}}}D.style.left=this.target.style.left;
D.style.top=this.target.style.top;
D.style.width=this.target.style.width;
D.style.height=this.target.style.height;
var C=A.zindex?A.zindex:200;
Element.setStyle(this.target,{zIndex:C+1});
Element.setStyle(D,{zIndex:C})
}},PX_REGEX:/px$/,parseToPx:function(B){var A=B.strip();
if(this.PX_REGEX.test(A)){try{return parseFloat(A.replace(this.PX_REGEX,""))
}catch(C){}}return NaN
},clonePosition:function(F,A,D){var H=jQuery(F);
var J=jQuery(A);
var B=J.offset();
var E=(H.css("display")=="none");
var G;
if(E){G=H.css("visibility");
H.css("visibility","hidden").css("display","")
}var C=this.parseToPx(H.css("left"));
if(isNaN(C)){C=0;
H.css("left","0px")
}var I=this.parseToPx(H.css("top"));
if(isNaN(I)){I=0;
H.css("top","0px")
}var K=H.offset();
if(E){H.css("display","none").css("visibility",G)
}H.css({left:(B.left-K.left+C)+"px",top:(B.top-K.top+I+D)+"px"})
},getBody:function(){return this.source.ownerDocument.body
}}
;
var swfobject=function(){var b="undefined",Q="object",n="Shockwave Flash",p="ShockwaveFlash.ShockwaveFlash",P="application/x-shockwave-flash",m="SWFObjectExprInst",j=window,K=document,T=navigator,o=[],N=[],i=[],d=[],J,Z=null,M=null,l=null,e=false,A=false;
var h=function(){var v=typeof K.getElementById!=b&&typeof K.getElementsByTagName!=b&&typeof K.createElement!=b,AC=[0,0,0],x=null;
if(typeof T.plugins!=b&&typeof T.plugins[n]==Q){x=T.plugins[n].description;
if(x&&!(typeof T.mimeTypes!=b&&T.mimeTypes[P]&&!T.mimeTypes[P].enabledPlugin)){x=x.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
AC[0]=parseInt(x.replace(/^(.*)\..*$/,"$1"),10);
AC[1]=parseInt(x.replace(/^.*\.(.*)\s.*$/,"$1"),10);
AC[2]=/r/.test(x)?parseInt(x.replace(/^.*r(.*)$/,"$1"),10):0
}}else{if(typeof j.ActiveXObject!=b){var y=null,AB=false;
try{y=new ActiveXObject(p+".7")
}catch(t){try{y=new ActiveXObject(p+".6");
AC=[6,0,21];
y.AllowScriptAccess="always"
}catch(t){if(AC[0]==6){AB=true
}}if(!AB){try{y=new ActiveXObject(p)
}catch(t){}}}if(!AB&&y){try{x=y.GetVariable("$version");
if(x){x=x.split(" ")[1].split(",");
AC=[parseInt(x[0],10),parseInt(x[1],10),parseInt(x[2],10)]
}}catch(t){}}}}var AD=T.userAgent.toLowerCase(),r=T.platform.toLowerCase(),AA=/webkit/.test(AD)?parseFloat(AD.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,q=false,z=r?/win/.test(r):/win/.test(AD),w=r?/mac/.test(r):/mac/.test(AD);
/*@cc_on q=true;@if(@_win32)z=true;@elif(@_mac)w=true;@end@*/return{w3cdom:v,pv:AC,webkit:AA,ie:q,win:z,mac:w}
}();
var L=function(){if(!h.w3cdom){return 
}f(H);
if(h.ie&&h.win){try{K.write("<script id=__ie_ondomload defer=true src=//:><\/script>");
J=C("__ie_ondomload");
if(J){I(J,"onreadystatechange",S)
}}catch(q){}}if(h.webkit&&typeof K.readyState!=b){Z=setInterval(function(){if(/loaded|complete/.test(K.readyState)){E()
}},10)
}if(typeof K.addEventListener!=b){K.addEventListener("DOMContentLoaded",E,null)
}R(E)
}();
function S(){if(J.readyState=="complete"){J.parentNode.removeChild(J);
E()
}}function E(){if(e){return 
}if(h.ie&&h.win){var v=a("span");
try{var u=K.getElementsByTagName("body")[0].appendChild(v);
u.parentNode.removeChild(u)
}catch(w){return 
}}e=true;
if(Z){clearInterval(Z);
Z=null
}var q=o.length;
for(var r=0;
r<q;
r++){o[r]()
}}function f(q){if(e){q()
}else{o[o.length]=q
}}function R(r){if(typeof j.addEventListener!=b){j.addEventListener("load",r,false)
}else{if(typeof K.addEventListener!=b){K.addEventListener("load",r,false)
}else{if(typeof j.attachEvent!=b){I(j,"onload",r)
}else{if(typeof j.onload=="function"){var q=j.onload;
j.onload=function(){q();
r()
}
}else{j.onload=r
}}}}}function H(){var t=N.length;
for(var q=0;
q<t;
q++){var u=N[q].id;
if(h.pv[0]>0){var r=C(u);
if(r){N[q].width=r.getAttribute("width")?r.getAttribute("width"):"0";
N[q].height=r.getAttribute("height")?r.getAttribute("height"):"0";
if(c(N[q].swfVersion)){if(h.webkit&&h.webkit<312){Y(r)
}W(u,true)
}else{if(N[q].expressInstall&&!A&&c("6.0.65")&&(h.win||h.mac)){k(N[q])
}else{O(r)
}}}}else{W(u,true)
}}}function Y(t){var q=t.getElementsByTagName(Q)[0];
if(q){var w=a("embed"),y=q.attributes;
if(y){var v=y.length;
for(var u=0;
u<v;
u++){if(y[u].nodeName=="DATA"){w.setAttribute("src",y[u].nodeValue)
}else{w.setAttribute(y[u].nodeName,y[u].nodeValue)
}}}var x=q.childNodes;
if(x){var z=x.length;
for(var r=0;
r<z;
r++){if(x[r].nodeType==1&&x[r].nodeName=="PARAM"){w.setAttribute(x[r].getAttribute("name"),x[r].getAttribute("value"))
}}}t.parentNode.replaceChild(w,t)
}}function k(w){A=true;
var u=C(w.id);
if(u){if(w.altContentId){var y=C(w.altContentId);
if(y){M=y;
l=w.altContentId
}}else{M=G(u)
}if(!(/%$/.test(w.width))&&parseInt(w.width,10)<310){w.width="310"
}if(!(/%$/.test(w.height))&&parseInt(w.height,10)<137){w.height="137"
}K.title=K.title.slice(0,47)+" - Flash Player Installation";
var z=h.ie&&h.win?"ActiveX":"PlugIn",q=K.title,r="MMredirectURL="+j.location+"&MMplayerType="+z+"&MMdoctitle="+q,x=w.id;
if(h.ie&&h.win&&u.readyState!=4){var t=a("div");
x+="SWFObjectNew";
t.setAttribute("id",x);
u.parentNode.insertBefore(t,u);
u.style.display="none";
var v=function(){u.parentNode.removeChild(u)
};
I(j,"onload",v)
}U({data:w.expressInstall,id:m,width:w.width,height:w.height},{flashvars:r},x)
}}function O(t){if(h.ie&&h.win&&t.readyState!=4){var r=a("div");
t.parentNode.insertBefore(r,t);
r.parentNode.replaceChild(G(t),r);
t.style.display="none";
var q=function(){t.parentNode.removeChild(t)
};
I(j,"onload",q)
}else{t.parentNode.replaceChild(G(t),t)
}}function G(v){var u=a("div");
if(h.win&&h.ie){u.innerHTML=v.innerHTML
}else{var r=v.getElementsByTagName(Q)[0];
if(r){var w=r.childNodes;
if(w){var q=w.length;
for(var t=0;
t<q;
t++){if(!(w[t].nodeType==1&&w[t].nodeName=="PARAM")&&!(w[t].nodeType==8)){u.appendChild(w[t].cloneNode(true))
}}}}}return u
}function U(AG,AE,t){var q,v=C(t);
if(v){if(typeof AG.id==b){AG.id=t
}if(h.ie&&h.win){var AF="";
for(var AB in AG){if(AG[AB]!=Object.prototype[AB]){if(AB.toLowerCase()=="data"){AE.movie=AG[AB]
}else{if(AB.toLowerCase()=="styleclass"){AF+=' class="'+AG[AB]+'"'
}else{if(AB.toLowerCase()!="classid"){AF+=" "+AB+'="'+AG[AB]+'"'
}}}}}var AD="";
for(var AA in AE){if(AE[AA]!=Object.prototype[AA]){AD+='<param name="'+AA+'" value="'+AE[AA]+'" />'
}}v.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AF+">"+AD+"</object>";
i[i.length]=AG.id;
q=C(AG.id)
}else{if(h.webkit&&h.webkit<312){var AC=a("embed");
AC.setAttribute("type",P);
for(var z in AG){if(AG[z]!=Object.prototype[z]){if(z.toLowerCase()=="data"){AC.setAttribute("src",AG[z])
}else{if(z.toLowerCase()=="styleclass"){AC.setAttribute("class",AG[z])
}else{if(z.toLowerCase()!="classid"){AC.setAttribute(z,AG[z])
}}}}}for(var y in AE){if(AE[y]!=Object.prototype[y]){if(y.toLowerCase()!="movie"){AC.setAttribute(y,AE[y])
}}}v.parentNode.replaceChild(AC,v);
q=AC
}else{var u=a(Q);
u.setAttribute("type",P);
for(var x in AG){if(AG[x]!=Object.prototype[x]){if(x.toLowerCase()=="styleclass"){u.setAttribute("class",AG[x])
}else{if(x.toLowerCase()!="classid"){u.setAttribute(x,AG[x])
}}}}for(var w in AE){if(AE[w]!=Object.prototype[w]&&w.toLowerCase()!="movie"){F(u,w,AE[w])
}}v.parentNode.replaceChild(u,v);
q=u
}}}return q
}function F(t,q,r){var u=a("param");
u.setAttribute("name",q);
u.setAttribute("value",r);
t.appendChild(u)
}function X(r){var q=C(r);
if(q&&(q.nodeName=="OBJECT"||q.nodeName=="EMBED")){if(h.ie&&h.win){if(q.readyState==4){B(r)
}else{j.attachEvent("onload",function(){B(r)
})
}}else{q.parentNode.removeChild(q)
}}}function B(t){var r=C(t);
if(r){for(var q in r){if(typeof r[q]=="function"){r[q]=null
}}r.parentNode.removeChild(r)
}}function C(t){var q=null;
try{q=K.getElementById(t)
}catch(r){}return q
}function a(q){return K.createElement(q)
}function I(t,q,r){t.attachEvent(q,r);
d[d.length]=[t,q,r]
}function c(t){var r=h.pv,q=t.split(".");
q[0]=parseInt(q[0],10);
q[1]=parseInt(q[1],10)||0;
q[2]=parseInt(q[2],10)||0;
return(r[0]>q[0]||(r[0]==q[0]&&r[1]>q[1])||(r[0]==q[0]&&r[1]==q[1]&&r[2]>=q[2]))?true:false
}function V(v,r){if(h.ie&&h.mac){return 
}var u=K.getElementsByTagName("head")[0],t=a("style");
t.setAttribute("type","text/css");
t.setAttribute("media","screen");
if(!(h.ie&&h.win)&&typeof K.createTextNode!=b){t.appendChild(K.createTextNode(v+" {"+r+"}"))
}u.appendChild(t);
if(h.ie&&h.win&&typeof K.styleSheets!=b&&K.styleSheets.length>0){var q=K.styleSheets[K.styleSheets.length-1];
if(typeof q.addRule==Q){try{q.addRule(v,r)
}catch(e){}}}}function W(t,q){var r=q?"visible":"hidden";
if(e&&C(t)){C(t).style.visibility=r
}else{V("#"+t,"visibility:"+r)
}}function g(s){var r=/[\\\"<>\.;]/;
var q=r.exec(s)!=null;
return q?encodeURIComponent(s):s
}var D=function(){if(h.ie&&h.win){window.attachEvent("onunload",function(){var w=d.length;
for(var v=0;
v<w;
v++){d[v][0].detachEvent(d[v][1],d[v][2])
}var t=i.length;
for(var u=0;
u<t;
u++){X(i[u])
}for(var r in h){h[r]=null
}h=null;
for(var q in swfobject){swfobject[q]=null
}swfobject=null
})
}}();
return{registerObject:function(u,q,t){if(!h.w3cdom||!u||!q){return 
}var r={};
r.id=u;
r.swfVersion=q;
r.expressInstall=t?t:false;
N[N.length]=r;
W(u,false)
},getObjectById:function(v){var q=null;
if(h.w3cdom){var t=C(v);
if(t){var u=t.getElementsByTagName(Q)[0];
if(!u||(u&&typeof t.SetVariable!=b)){q=t
}else{if(typeof u.SetVariable!=b){q=u
}}}}return q
},embedSWF:function(x,AE,AB,AD,q,w,r,z,AC){if(!h.w3cdom||!x||!AE||!AB||!AD||!q){return 
}AB+="";
AD+="";
if(c(q)){W(AE,false);
var AA={};
if(AC&&typeof AC===Q){for(var v in AC){if(AC[v]!=Object.prototype[v]){AA[v]=AC[v]
}}}AA.data=x;
AA.width=AB;
AA.height=AD;
var y={};
if(z&&typeof z===Q){for(var u in z){if(z[u]!=Object.prototype[u]){y[u]=z[u]
}}}if(r&&typeof r===Q){for(var t in r){if(r[t]!=Object.prototype[t]){if(typeof y.flashvars!=b){y.flashvars+="&"+t+"="+r[t]
}else{y.flashvars=t+"="+r[t]
}}}}f(function(){U(AA,y,AE);
if(AA.id==AE){W(AE,true)
}})
}else{if(w&&!A&&c("6.0.65")&&(h.win||h.mac)){A=true;
W(AE,false);
f(function(){var AF={};
AF.id=AF.altContentId=AE;
AF.width=AB;
AF.height=AD;
AF.expressInstall=w;
k(AF)
})
}}},getFlashPlayerVersion:function(){return{major:h.pv[0],minor:h.pv[1],release:h.pv[2]}
},hasFlashPlayerVersion:c,createSWF:function(t,r,q){if(h.w3cdom){return U(t,r,q)
}else{return undefined
}},removeSWF:function(q){if(h.w3cdom){X(q)
}},createCSS:function(r,q){if(h.w3cdom){V(r,q)
}},addDomLoadEvent:f,addLoadEvent:R,getQueryParamValue:function(v){var u=K.location.search||K.location.hash;
if(v==null){return g(u)
}if(u){var t=u.substring(1).split("&");
for(var r=0;
r<t.length;
r++){if(t[r].substring(0,t[r].indexOf("="))==v){return g(t[r].substring((t[r].indexOf("=")+1)))
}}}return""
},expressInstallCallback:function(){if(A&&M){var q=C(m);
if(q){q.parentNode.replaceChild(M,q);
if(l){W(l,true);
if(h.ie&&h.win){M.style.display="block"
}}M=null;
l=null;
A=false
}}}}
}()
;
ProgressBar={};
ProgressBar=Class.create();
Object.extend(ProgressBar.prototype,{initialize:function(B,E,K,D,H,G,C,L,M,J,A,I){this.id=B;
this.containerId=E;
if(K!=""){this.formId=K
}else{var F=this.getForm();
this.formId=(F)?F.id:null
}this.mode=D;
this.state=A;
this.minValue=H;
this.maxValue=G;
this.value=I;
this.disabled=false;
this.context=C;
this.markup=L;
this.options=M||{};
this.onbeforedomupdate=this.options.onbeforedomupdate;
this.options.onbeforedomupdate=function(O,N,P){if(this.onbeforedomupdate){this.onbeforedomupdate(O,N,P)
}this.onComplete(P)
}.bind(this);
this.progressVar=J;
$(this.id).component=this
},getForm:function(){var A=$(this.id);
while(A.tagName&&A.tagName.toLowerCase()!="form"){A=A.parentNode
}return A
},getValue:function(){return this.value
},getParameter:function(A,C,B){if(!C){C=A
}if(C&&C[B]){return C[B]
}return C
},onComplete:function(A){if(!$(this.id)||this.disabled){return 
}if(A){this.value=A["value"];
if(this.state=="progressState"){if(this.value>this.getMaxValue()){this.forceState("complete",null);
return 
}this.updateComponent(A);
this.renderLabel(A["markup"],A["context"])
}else{if(this.state=="initialState"&&this.value>this.getMinValue()){this.state="progressState";
this.forceState("progressState",function(){$(this.id).component.enable()
}.bind(this));
return 
}}this.poll()
}},poll:function(){A4J.AJAX.Poll(this.containerId,this.formId,this.options)
},interpolate:function(A){for(var C in this.context){var B=this.context[C];
var D=new RegExp("\\{"+C+"\\}","g");
A=A.replace(D,B)
}return A
},updateComponent:function(A){this.updateStyle(A["style"]);
this.setValue(this.value);
if(!A["enabled"]){this.disable()
}this.updateClassName($(this.id+":complete"),A["completeClass"]);
this.updateClassName($(this.id+":remain"),A["remainClass"]);
this.updateClassName($(this.id),A["styleClass"]);
if(this.options.pollinterval!=A["interval"]){this.options.pollinterval=A["interval"]
}},updateStyle:function(A){if(!A){return 
}var B=$(this.id);
if(B.style){if(B.style.cssText!=A){B.style.cssText=A;
B=$(this.id+":remain");
if(B){B.style.cssText=A
}B=$(this.id+":complete");
if(B){B.style.cssText=A
}B=$(this.id+":upload");
if(B){B.style.cssText=A
}}}},updateClassName:function(B,A){if(!A){return 
}if(B&&B.className){if(B.className.indexOf(A)<0){B.className=B.className+" "+A
}}},getContext:function(){var A=this.context;
if(!A){A={}
}A["minValue"]=(this.minValue==0?"0":this.minValue);
A["maxValue"]=(this.maxValue==0?"0":this.maxValue);
A["value"]=(this.value==0?"0":this.value);
if(this.progressVar){A[this.progressVar]=A["value"]
}return A
},renderLabel:function(A,C){if(!A||this.state!="progressState"){return 
}if(!C){C=this.getContext()
}var B=A.invoke("getContent",C).join("");
$(this.id+":remain").innerHTML=$(this.id+":complete").innerHTML=B
},interpolate:function(A,D){for(var C in D){var B=D[C];
var E=new RegExp("\\{"+C+"\\}","g");
A=A.replace(E,B)
}return A
},setLabel:function(A,D){D=this.getParameter(A,D,"label");
if(this.state!="progressState"){return 
}var C=$(this.id+":remain");
if(!C){return 
}var B=this.interpolate(D+"",this.getContext());
if(B){C.innerHTML=$(this.id+":complete").innerHTML=B
}this.markup=null
},getMode:function(){return this.mode
},getMaxValue:function(){return this.maxValue
},getMinValue:function(){return this.minValue
},isAjaxMode:function(){return(this.getMode()=="ajax")
},calculatePercent:function(B){var C=parseFloat(this.getMinValue());
var A=parseFloat(this.getMaxValue());
var D=parseFloat(B);
if(D>C&&D<A){return(100*(D-C))/(A-C)
}else{if(D<=C){return 0
}else{if(D>=A){return 100
}}}},setValue:function(A,D){D=this.getParameter(A,D,"value");
this.value=D;
if(!this.isAjaxMode()){if(parseFloat(D)<=parseFloat(this.getMinValue())){this.switchState("initialState")
}else{if(parseFloat(D)>parseFloat(this.getMaxValue())){this.switchState("completeState")
}else{this.switchState("progressState")
}}}if(!this.isAjaxMode()&&this.state!="progressState"){return 
}if(this.markup){this.renderLabel(this.markup,this.getContext())
}else{}var B=this.calculatePercent(D);
var C=$(this.id+":upload");
if(C!=null){C.style.width=(B+"%")
}},enable:function(A){if(!this.isAjaxMode()){this.switchState("progressState");
this.setValue(this.getMinValue()+1)
}else{if(!(this.value>this.getMaxValue())){this.disable();
this.poll()
}}this.disabled=false
},disable:function(){this.disabled=true;
A4J.AJAX.StopPoll(this.id)
},finish:function(){if(!this.isAjaxMode()){this.switchState("completeState")
}else{this.disable();
this.forceState("complete")
}},hideAll:function(){Element.hide($(this.id+":progressState"));
Element.hide($(this.id+":completeState"));
Element.hide($(this.id+":initialState"))
},switchState:function(A){this.state=A;
this.hideAll();
Element.show($(this.id+":"+A))
},renderState:function(A){this.state=A;
this.hideAll();
Element.show($(this.id+":"+A))
},forceState:function(C,B){var A={};
A["parameters"]={};
A["parameters"][this.id]=this.id;
A["parameters"]["forcePercent"]=C;
A["parameters"]["ajaxSingle"]=this.id;
A["actionUrl"]=this.options.actionUrl;
if(B){A["oncomplete"]=B
}A4J.AJAX.SubmitRequest(this.containerId,this.formId,null,A)
}})
;
FileUploadEntry={};
FileUploadEntry=Class.create();
FileUploadEntry.INITIALIZED="initialized";
FileUploadEntry.READY="ready";
FileUploadEntry.UPLOAD_IN_PROGRESS="progress";
FileUploadEntry.UPLOAD_CANCELED="canceled";
FileUploadEntry.UPLOAD_SUCCESS="done";
FileUploadEntry.UPLOAD_TRANSFER_ERROR="transfer_error";
FileUploadEntry.UPLOAD_SERVER_ERROR="server_error";
FileUploadEntry.UPLOAD_SIZE_ERROR="size_error";
FileUploadEntry.UPLOAD_FORBIDDEN="forbidden";
FileUploadEntry.LABELS={};
FileUploadEntry.LABELS[FileUploadEntry.INITIALIZED]="";
FileUploadEntry.LABELS[FileUploadEntry.READY]="";
FileUploadEntry.LABELS[FileUploadEntry.UPLOAD_IN_PROGRESS]="";
FileUploadEntry.LABELS[FileUploadEntry.UPLOAD_CANCELED]="";
FileUploadEntry.LABELS[FileUploadEntry.UPLOAD_FORBIDDEN]="Uploading forbidden";
FileUploadEntry.clearControlTemplate=[new E("a",{"style":"","onclick":function(A){return"var entry = FileUploadEntry.getComponent(this); entry.uploadObject.clear(entry); return false;"
},"className":function(A){return"rich-fileupload-anc "+Richfaces.evalMacro("className",A)
},"href":"#"},[new T(function(A){return Richfaces.evalMacro("controlLink",A)
})])];
FileUploadEntry.stopControlTemplate=[new E("a",{"style":"","onclick":function(A){return"FileUploadEntry.getComponent(this).uploadObject.stop(); return false;"
},"className":function(A){return"rich-fileupload-anc "+Richfaces.evalMacro("className",A)
},"href":"#"},[new T(function(A){return Richfaces.evalMacro("controlLink",A)
})])];
FileUploadEntry.cancelControlTemplate=[new E("a",{"style":"","onclick":function(A){return"var entry = FileUploadEntry.getComponent(this); entry.uploadObject.clear(entry, true); return false;"
},"className":function(A){return"rich-fileupload-anc "+Richfaces.evalMacro("className",A)
},"href":"#"},[new T(function(A){return Richfaces.evalMacro("controlLink",A)
})])];
FileUploadEntry.template=[new E("table",{"cellspacing":"0","cellpadding":"0","border":"0","style":"width:100%"},[new E("tbody",{},[new E("tr",{},[new E("td",{"className":function(A){return"rich-fileupload-font rich-fileupload-name rich-fileupload-table-td "+Richfaces.evalMacro("className",A)
}},[new E("div",{"className":"rich-fileupload-name-padding","style":function(A){return"overflow : hidden; width:"+Richfaces.evalMacro("fileEntryWidth",A)
}},[new ET(function(A){return Richfaces.evalMacro("fileName",A)
})]),new E("div",{}),new E("div",{"className":"rich-fileupload-name-padding","style":function(A){return"overflow : hidden; width:"+Richfaces.evalMacro("fileEntryWidth",A)
}},[new ET(function(A){return Richfaces.evalMacro("label",A)
})])]),new E("td",{"style":"vertical-align: center;","className":"rich-fileupload-table-td"},[new E("div",{"className":"rich-fileupload-font rich-fileupload-del"},[])]),new E("td",{"className":"rich-fileupload-table-td"},[new E("div",{"className":"rich-fileupload-font rich-fileupload-scroll"},[new T("\u00A0")])])])])])];
FileUploadEntry.getComponent=function(B){while(B){var A=B.component;
if(A){return A
}else{B=B.parentNode
}}};
Object.extend(FileUploadEntry.prototype,{fileInput:null,fileName:null,uploadObject:null,state:FileUploadEntry.INITIALIZED,initialize:function(F,A,J,I,B,G,C){this.fileInput=F;
this.uploadObject=A;
this.size=J;
this.type=I;
this.creator=B;
this.creationDate=G;
this.modificationDate=C;
var D=JSNode.prototype.xmlEscape($F(this.fileInput));
this.fileName=D;
var H=FileUploadEntry.template.invoke("getContent",{fileName:D,fileEntryWidth:A.getFileEntryWidth(),className:this.uploadObject.classes.FILE_ENTRY.ENABLED}).join("");
Element.insert(this.uploadObject.items,H);
this.entryElement=this.uploadObject.items.childNodes[this.uploadObject.items.childNodes.length-1];
this.entryElement.component=this;
this.statusLabel=this.entryElement.rows[0].cells[0].lastChild;
this.controlArea=this.entryElement.rows[0].cells[1].firstChild;
this.progressArea=this.entryElement.rows[0].cells[0].childNodes[1]
},upload:function(){this.setState(FileUploadEntry.UPLOAD_IN_PROGRESS);
this.setupProgressBar();
if(this.uploadObject.isFlash){this.uploadObject._flashSubmitForm(this)
}else{this.uploadObject.createFrame();
setTimeout(function(){this.uploadObject.submitForm(this)
}.bind(this),0)
}},setupProgressBar:function(){this.progressArea.appendChild(this.uploadObject._progressBar);
this.uploadObject.prepareProgressBar()
},setupLabelUpdate:function(){this.updateLabel();
this.labelUpdateInterval=setInterval(function(){this.updateLabel()
}.bind(this),this.uploadObject.progressBar.options["pollinterval"])
},updateLabel:function(){if(this.state!=FileUploadEntry.UPLOAD_IN_PROGRESS){clearInterval(this.labelUpdateInterval)
}else{var B=this.uploadObject.progressBar.getValue();
if(B){var A=this.uploadObject.labelMarkup.invoke("getContent",this.uploadObject.progressData.getContext(B)).join("");
this.statusLabel.innerHTML=A
}}},finishProgressBar:function(){this.uploadObject.finishProgressBar()
},stop:function(){this.uploadObject.stopScript(this.uid,this.uploadObject.formId)
},_clearInput:function(){Richfaces.removeNode(this.fileInput);
this.fileInput=null
},_clearEntry:function(){Richfaces.removeNode(this.entryElement);
this.entryElement=null
},clear:function(){this._clearInput();
this._clearEntry()
},setState:function(B){var A=this.state;
this.state=B;
Element.clearChildren(this.statusLabel);
Element.clearChildren(this.controlArea);
Element.insert(this.statusLabel,FileUploadEntry.LABELS[B]);
if(B==FileUploadEntry.UPLOAD_IN_PROGRESS){Element.update(this.controlArea,FileUploadEntry.stopControlTemplate.invoke("getContent",{"controlLink":FileUploadEntry.LABELS["entry_stop"],"className":this.uploadObject.classes.FILE_ENTRY_CONTROL.ENABLED}).join(""))
}else{if(B==FileUploadEntry.UPLOAD_SUCCESS){Element.update(this.controlArea,FileUploadEntry.clearControlTemplate.invoke("getContent",{"controlLink":FileUploadEntry.LABELS["entry_clear"],"className":this.uploadObject.classes.FILE_ENTRY_CONTROL.ENABLED}).join(""))
}else{Element.update(this.controlArea,FileUploadEntry.cancelControlTemplate.invoke("getContent",{"controlLink":FileUploadEntry.LABELS["entry_cancel"],"className":this.uploadObject.classes.FILE_ENTRY_CONTROL.ENABLED}).join(""))
}}if(B==FileUploadEntry.UPLOAD_SUCCESS){this._clearInput()
}this.uploadObject.notifyStateChange(this,A)
}});
ProgressData=Class.create();
Object.extend(ProgressData.prototype,{size:null,startTime:null,initialize:function(A){this.size=A;
this.startTime=parseInt((new Date().getTime())/1000)
},ss:function(){return parseInt((this.time-this.startTime)%60)+""
},mm:function(){return parseInt((this.time-this.startTime)/60)+""
},hh:function(){return parseInt((this.time-this.startTime)/3600)+""
},B:function(){return this.size
},KB:function(){return parseInt(this.size/1024)
},MB:function(){return parseInt(this.size/(1024*1024))
},getContext:function(C){var A={};
this.time=parseInt((new Date().getTime())/1000);
A["B"]=this.B();
A["KB"]=this.KB();
A["MB"]=this.MB();
A["ss"]=this.ss();
A["mm"]=this.mm();
A["hh"]=this.hh();
var B=this.size;
this.size=(this.size*C)/100;
A["_B"]=this.B();
A["_KB"]=this.KB();
A["_MB"]=this.MB();
this.size=B;
return A
}});
LoadWatcher=Class.create();
Object.extend(LoadWatcher.prototype,{initialize:function(A,C,B){this.iframe=A;
this.callback=C;
this.viewStateUpdater=B;
this.loadObserver=function(){if(!this.stopped){this.stop();
this.onload()
}return false
}.bind(this);
Event.observe(this.iframe,"load",this.loadObserver);
this.isError=function(){try{if(this.iframe.contentWindow&&this.iframe.contentWindow.document){this.iframe.contentWindow.document.readyState
}}catch(D){return true
}return false
}.bind(this);
this.interval=window.setInterval(function(){if(!this.stopped){var F=false;
var D=null;
try{if(!Prototype.Browser.Opera&&!Prototype.Browser.WebKit&&this.iframe.contentWindow&&this.iframe.contentWindow.document){F=/complete/.test(this.iframe.contentWindow.document.readyState)
}}catch(G){D=G
}if(D){this.stop();
this.onerror()
}}return false
}.bind(this),200)
},oncancel:function(){if(!this.stopped){this.stop();
this.callback(FileUploadEntry.UPLOAD_CANCELED)
}},onerror:function(){this.callback(FileUploadEntry.UPLOAD_TRANSFER_ERROR)
},onload:function(){if(this.isError()){this.callback(FileUploadEntry.UPLOAD_TRANSFER_ERROR);
return 
}var F=this.iframe.contentWindow.document;
var A=F.getElementById("_richfaces_file_upload_stopped");
var B=F.getElementById("_richfaces_file_upload_size_restricted");
var C=F.getElementById("_richfaces_file_upload_forbidden");
var D=this.findViewState(F);
if(A){this.callback(FileUploadEntry.UPLOAD_CANCELED)
}else{if(B){this.callback(FileUploadEntry.UPLOAD_SIZE_ERROR)
}else{if(C){this.callback(FileUploadEntry.UPLOAD_SIZE_ERROR)
}else{if(D){this.viewStateUpdater(D.value);
this.callback(FileUploadEntry.UPLOAD_SUCCESS)
}else{this.callback(FileUploadEntry.UPLOAD_TRANSFER_ERROR)
}}}}},findViewState:function(D){var C="javax.faces.ViewState";
var A=D.getElementsByTagName("input");
for(var B in A){if(A[B].name==C){return A[B]
}}return D.getElementById(C)
},stop:function(){this.stopped=true;
if(this.interval){window.clearInterval(this.interval);
this.interval=null
}if(this.loadObserver){Event.stopObserving(this.iframe,"load",this.loadObserver);
this.loadObserver=null
}}});
FileUpload={};
FileUpload=Class.create();
Object.extend(FileUpload.prototype,{idCounter:0,progressBar:null,iframe:null,element:null,entries:new Array(),activeEntry:null,options:null,runUpload:false,classes:null,events:null,maxFileBatchSize:null,uploadedCount:0,initialize:function(A,O,B,C,D,L,F,M,N,Q,G,K,R,I,P,H){this.id=A;
this.element=$(this.id);
if(O!=""){this.formId=O;
this.form=$(O)
}else{var J=this._getForm();
this.formId=(J)?J.id:null;
this.form=J
}this._progressBar=$(L);
this.progressBar=this._progressBar.component;
this.entries=new Array();
this.labelMarkup=M;
this.disabled=G;
this.element.component=this;
this.acceptedTypes=K;
this.stopScript=C;
this.getFileSizeScript=D;
this.items=$(this.id+":fileItems");
this.classes=F;
this.events=Q;
this.parameters=P;
this.sessionId=H;
this.maxFileBatchSize=N;
this.currentInput=$(this.id+":file");
this.actionUrl=B;
this.options=R||{};
this.initFlashModule();
this.initEvents();
this.setupAutoUpload();
this.checkFrame();
this.initLabels(I);
this.processButtons();
this.initFileInput()
},cancelUpload:function(A){if(this.activeEntry&&this.activeEntry.uid==A){if(this.watcher){this.watcher.oncancel()
}if(this.iframe){try{this.iframe.contentWindow.location.href="javascript:''";
this.iframe.contentWindow.stop()
}catch(B){}}}},initLabels:function(B){if(B){for(var A in B){FileUploadEntry.LABELS[A]=B[A]
}}},initFileInput:function(){var C=this.currentInput;
var B=C.parentNode.parentNode;
B=$(B);
if(B.getWidth()!=0){var A=C.parentNode.style;
A.width=B.getWidth()+"px";
A.height=B.getHeight()+"px";
Event.stopObserving(B,"mouseover",this.inputHandler);
if(Richfaces.browser.isIE&&this.flashComponent){this.flashComponent.style.width=A.width;
this.flashComponent.style.height=A.height
}}else{this.inputHandler=this.initFileInput.bindAsEventListener(this);
Event.observe(B,"mouseover",this.inputHandler)
}},getFileEntryWidth:function(){if(this.fileEntryWidth){return this.fileEntryWidth
}var A;
A=this.element.offsetWidth-122;
if(A<0){A=0
}this.fileEntryWidth=A;
var B=this._progressBar.style.width;
if(B==""){B=200
}if(B>this.fileEntryWidth){A=(A-2);
if(A<0){A=0
}A+="px";
this._progressBar.style.width=A;
var C=$(this._progressBar.id+":remain");
if(C){C.style.width=A;
$(this._progressBar.id+":complete").style.width=A
}}this.fileEntryWidth=this.fileEntryWidth+"px";
return this.fileEntryWidth
},createFrame:function(){if(this.iframe){return 
}var B=document.createElement("div");
B.style.display="none";
var A="<iframe name='"+this.id+"_iframe' id='"+this.id+"_iframe'"+(!Richfaces.browser.isOpera?" src=\"javascript:''\"":"")+"></iframe>";
B.innerHTML=A;
document.body.appendChild(B);
this.iframe=$(this.id+"_iframe")
},checkFrame:function(){this.iframe=$(this.id+"_iframe");
if(this.iframe){this.deleteFrame()
}},deleteFrame:function(){this.resetFrame();
if(this.iframe){document.body.removeChild(this.iframe.parentNode)
}this.iframe=null
},resetFrame:function(){if(window.opera&&this.iframe&&this.iframe.contentWindow.document&&this.iframe.contentWindow.document.body){this.iframe.contentWindow.document.body.innerHTML=""
}else{this.iframe.src="javascript:''"
}},initEvents:function(){for(var A in this.events){if(A&&this.events[A]){if(A=="onupload"){this.element.observe("rich:onupload",function(B){if(this.events["onupload"](B)!==false){B.memo.entry.upload()
}}.bindAsEventListener(this))
}else{this.element.observe("rich:"+A,this.events[A])
}}}},getFileSize:function(B){if(B){if(!this.isFlash){this.progressBar.enable()
}if(this.labelMarkup){var A=new ProgressData(B);
this.progressData=A;
if(this.activeEntry){this.activeEntry.setupLabelUpdate()
}}}else{if(this.activeEntry){this._fileSizeScriptTimeoutId=setTimeout(function(){this._fileSizeScriptTimeoutId=undefined;
this.getFileSizeScript(this.activeEntry.uid,this.formId)
}.bind(this),this.progressBar.options["pollinterval"]||500)
}}},prepareProgressBar:function(){this.progressBar.setValue(0);
Element.show(this._progressBar);
this.progressBar.options.onerror=function(A){this.errorHandler(A)
}.bind(this)
},errorHandler:function(A){if(this.watcher){this.watcher.stop();
this.watcher.onerror();
this.watcher=null
}},finishProgressBar:function(){if(this._fileSizeScriptTimeoutId){clearTimeout(this._fileSizeScriptTimeoutId);
this._fileSizeScriptTimeoutId=undefined
}this.progressBar.disable();
this.progressBar.setValue(100);
Element.hide(this._progressBar)
},setupAutoUpload:function(){this.runUpload=this.options.autoUpload
},checkFileType:function(B){if(!this.acceptedTypes||this.acceptedTypes["*"]){return true
}if(/(?:\S+)\.(\S+)$/.test(B)){var A=RegExp.$1;
A=A.toLowerCase();
if(this.acceptedTypes[A]){return true
}}return false
},checkDuplicated:function(A){if(!this.options.noDuplicate){return true
}var C=A.value;
for(var B=0;
B<this.entries.length;
B++){if(C==this.entries[B].fileName){return false
}}return true
},add:function(A){if(this.disabled){return 
}if(!A.value){return 
}if(!this.checkFileType(A.value)||!this.checkDuplicated(A)){var F=A.value;
var B=A.cloneNode(true);
B.value="";
A.parentNode.replaceChild(B,A);
this.currentInput=B;
if(this.events.ontyperejected){this.element.fire("rich:ontyperejected",{fileName:F})
}return 
}var D=new FileUploadEntry(A,this);
this.entries.push(D);
if(this.runUpload){D.setState(FileUploadEntry.READY)
}else{D.setState(FileUploadEntry.INITIALIZED)
}var B=A.cloneNode(true);
A.onchange=null;
A.style.cssText="position: absolute; right: 0px; top: 0px; display: none; visibility: hidden;";
B.id=this.id+":file"+(this.idCounter++);
B.value="";
this.currentInput=B;
A.parentNode.appendChild(B);
if(this.events.onadd){var C=[];
C.push(D);
this.element.fire("rich:onadd",{entries:C})
}if(this.runUpload){this.upload()
}},remove:function(A){A.clear();
if(this.isFlash){this._flashRemoveFile(this.entries.indexOf(A))
}this.entries=this.entries.without(A)
},_selectEntryForUpload:function(){this.uploadIndex=-1;
var A=this.entries.length;
for(var B=0;
B<A;
B++){var C=this.entries[B];
if(C.state==FileUploadEntry.READY||C.state==FileUploadEntry.INITIALIZED||C.state==FileUploadEntry.UPLOAD_CANCELED){this.uploadIndex=B;
return C
}}return null
},upload:function(){if(this.disabled){return 
}this.runUpload=true;
if(!this.activeEntry){var A=this._selectEntryForUpload();
if(A){if(this.events.onupload){this.element.fire("rich:onupload",{entry:A})
}else{A.upload()
}}}return false
},stop:function(){if(this.disabled){return 
}this.runUpload=false;
if(this.activeEntry){if(!this.isFlash){this.activeEntry.stop()
}else{this._flashStop()
}}return false
},clear:function(B,C){if(this.disabled){return 
}if(B){if(C||B.state==FileUploadEntry.UPLOAD_SUCCESS||B.state==FileUploadEntry.INITIALIZED){this.remove(B);
if(this.events.onclear){this.element.fire("rich:onclear",{entry:B})
}}}else{var A=0;
while(A<this.entries.length){var B=this.entries[A];
if(B.state==FileUploadEntry.UPLOAD_SUCCESS){this.remove(B)
}else{A++
}}if(this.events.onclear){this.element.fire("rich:onclear",{})
}}if(this.entries.length==0){this.setupAutoUpload()
}this.processButtons();
return false
},processButtons:function(){this.disableAddButton();
this.disableCleanButton();
this.disableUploadButton()
},cleanAllDisabled:function(){if(this.options["autoclear"]){return true
}var A=this.getFileEntriesSumByState(FileUploadEntry.UPLOAD_SUCCESS);
return(A==0)
},uploadAllDisabled:function(){if(this.runUpload&&this.activeEntry){return false
}else{var A=this.getFileEntriesSumByState(FileUploadEntry.READY,FileUploadEntry.INITIALIZED,FileUploadEntry.UPLOAD_CANCELED);
return(A==0)
}},getFileEntriesSumByState:function(){var C={};
var B=0;
for(var A=0;
A<arguments.length;
A++){C[arguments[A]]=true
}for(var A=0;
A<this.entries.length;
A++){if(C[this.entries[A].state]){B++
}}return B
},disableCleanButton:function(){var A=this.cleanAllDisabled();
var C=$(this.id+":clean1");
var B=$(this.id+":clean2");
if(A){Element.hide(C.parentNode);
return 
}else{Element.show(C.parentNode)
}if(this.disabled){C.onclick=function(){return false
}
}else{C.onclick=function(){return this.clear()
}.bind(this)
}this._updateClassNames(C,B,this.classes.CLEAN,this.classes.CLEAN_CONTENT)
},disableAddButton:function(){var A=((this.getFileEntriesSumByState(FileUploadEntry.READY,FileUploadEntry.INITIALIZED,FileUploadEntry.UPLOAD_CANCELED)+this.uploadedCount+this.getFileEntriesSumByState(FileUploadEntry.UPLOAD_IN_PROGRESS))>=this.maxFileBatchSize);
this.currentInput.disabled=A||this.disabled;
var C=this.disabled;
var D=$(this.id+":add1");
var B=$(this.id+":add2");
if(A){this.disabled=true
}this._updateClassNames(D,B,this.classes.ADD,this.classes.ADD_CONTENT);
this.disabled=C;
this._flashDisableAdd(A||this.disabled)
},disableUploadButton:function(){var A=this.uploadAllDisabled();
var C=$(this.id+":upload1");
var B=$(this.id+":upload2");
if(A){Element.hide(C.parentNode)
}else{Element.show(C.parentNode)
}if(this.disabled){C.onclick=function(){return false
}
}else{if(!this.runUpload){C.onclick=function(){return this.upload()
}.bind(this);
B.innerHTML=FileUploadEntry.LABELS["upload"]
}else{C.onclick=function(){return this.stop()
}.bind(this);
B.innerHTML=FileUploadEntry.LABELS["stop"]
}}this._updateClassNames(C,B,(this.runUpload)?this.classes.STOP:this.classes.UPDATE,(this.runUpload)?this.classes.STOP_CONTENT:this.classes.UPDATE_CONTENT)
},_updateClassNames:function(D,C,A,B){if(this.disabled){D.className=A.DISABLED;
C.className=B.DISABLED;
D.onmouseover=D.onmouseout=D.onmousedown=D.onmouseup=null
}else{D.className=A.ENABLED;
C.className=B.ENABLED;
D.onmouseover=function(){this.className="rich-fileupload-button-light rich-fileupload-font"
};
D.onmouseout=function(){this.className="rich-fileupload-button rich-fileupload-font"
};
D.onmousedown=function(){this.className="rich-fileupload-button-press rich-fileupload-font"
};
D.onmouseup=function(){this.className="rich-fileupload-button rich-fileupload-font"
}
}},disable:function(){this.disabled=true;
this.items.className="rich-fileupload-list-overflow "+this.classes.UPLOAD_LIST.DISABLED;
for(var A=0;
A<this.entries.length;
A++){var B=this.entries[A];
B.entryElement.rows[0].cells[0].className="rich-fileupload-font rich-fileupload-name rich-fileupload-table-td "+this.classes.FILE_ENTRY.DISABLED;
B.controlArea.firstChild.className="rich-fileupload-anc "+this.classes.FILE_ENTRY_CONTROL.DISABLED
}this.processButtons()
},enable:function(){this.disabled=false;
this.items.className="rich-fileupload-list-overflow "+this.classes.UPLOAD_LIST.ENABLED;
for(var A=0;
A<this.entries.length;
A++){var B=this.entries[A];
B.entryElement.rows[0].cells[0].className="rich-fileupload-font rich-fileupload-name rich-fileupload-table-td "+this.classes.FILE_ENTRY.ENABLED;
B.controlArea.firstChild.className="rich-fileupload-anc "+this.classes.FILE_ENTRY_CONTROL.ENABLED
}this.processButtons()
},_endUpload:function(){if(this.options["autoclear"]){this.clear(this.activeEntry)
}this.activeEntry=null
},updateViewState:function(C){if(!C){return 
}var A=this.getForm();
var B=A["javax.faces.ViewState"];
if(B){B.value=C
}},_updateEntriesState:function(){var A=this.entries.length;
var B;
var F;
if(this.runUpload){B=FileUploadEntry.INITIALIZED;
F=FileUploadEntry.READY
}else{B=FileUploadEntry.READY;
F=FileUploadEntry.INITIALIZED
}for(var C=0;
C<A;
C++){var D=this.entries[C];
if(D.state==B){D.setState(F)
}}},notifyStateChange:function(B,A){var C=B.state;
if(C==FileUploadEntry.UPLOAD_SUCCESS||C==FileUploadEntry.UPLOAD_SIZE_ERROR){if(C==FileUploadEntry.UPLOAD_SIZE_ERROR){if(this.events.onsizerejected){this.element.fire("rich:onsizerejected",{entry:B})
}}if(C==FileUploadEntry.UPLOAD_SUCCESS){this.uploadedCount++
}this._endUpload();
var B=this._selectEntryForUpload();
if(B){if(this.runUpload){B.upload()
}}else{this.setupAutoUpload();
if(this.events.onuploadcomplete){this.element.fire("rich:onuploadcomplete",{})
}this.resetFrame()
}this._updateEntriesState()
}else{if(C==FileUploadEntry.UPLOAD_CANCELED||C==FileUploadEntry.UPLOAD_TRANSFER_ERROR||C==FileUploadEntry.UPLOAD_SERVER_ERROR){this._endUpload();
this.runUpload=false;
this._updateEntriesState();
if(C==FileUploadEntry.UPLOAD_CANCELED){if(this.events.onuploadcanceled){this.element.fire("rich:onuploadcanceled",{entry:B})
}}else{if(this.events.onerror){this.element.fire("rich:onerror",{entry:B})
}}}else{if(C==FileUploadEntry.UPLOAD_IN_PROGRESS){this.activeEntry=B;
this._updateEntriesState()
}}}this.processButtons()
},getForm:function(){return this.form
},_getForm:function(){var A=this.element;
while(A.tagName&&A.tagName.toLowerCase()!="form"){A=A.firstChild
}return A
},submitForm:function(L){var C=this.getForm();
if(!C){throw"No parent form found!"
}var I=!(L&&L instanceof FileUploadEntry);
var H=Richfaces.readAttribute(C,"target");
var J=Richfaces.readAttribute(C,"enctype");
var F=Richfaces.readAttribute(C,"encoding");
var B=Richfaces.readAttribute(C,"action");
try{if(!I){L.uid=Math.random().toString();
Richfaces.writeAttribute(C,"encoding","multipart/form-data");
Richfaces.writeAttribute(C,"enctype","multipart/form-data");
Richfaces.writeAttribute(C,"action",this.actionUrl+(/\?/.test(this.actionUrl)?"&_richfaces_upload_uid":"?_richfaces_upload_uid")+"="+encodeURI(L.uid)+"&"+this.id+"="+this.id+"&_richfaces_upload_file_indicator=true&AJAXREQUEST="+this.progressBar.containerId);
Richfaces.writeAttribute(C,"target",this.id+"_iframe");
var G=C.elements;
var M=L.fileInput;
M.name=this.id+":file";
M.disabled=false;
var A=G.length;
for(var D=0;
D<A;
D++){var K=G[D];
if(K!=M){if("file"==K.type){K._disabled=K.disabled;
K.disabled=true
}}}}else{this.beforeSubmit()
}if(!C.onsubmit||C.onsubmit()){if(!I){this.watcher=new LoadWatcher(this.iframe,function(N){this.finishProgressBar();
this.setState(N);
if(this.uploadObject.events.onfileuploadcomplete){this.uploadObject.element.fire("rich:onfileuploadcomplete",{state:N})
}}.bind(L),function(N){this.updateViewState(N)
}.bind(this))
}_JSFFormSubmit(null,C.id,null,this.parameters)
}if(!I){for(var D=0;
D<A;
D++){var K=G[D];
if("file"==K.type){K.disabled=K._disabled;
K._disabled=undefined
}}}else{this._enableEntries(true)
}}finally{Richfaces.writeAttribute(C,"action",B);
Richfaces.writeAttribute(C,"encoding",F);
Richfaces.writeAttribute(C,"enctype",J);
if(I){this.currentInput.disabled=true
}else{Richfaces.writeAttribute(C,"target",H);
this.getFileSizeScript(L.uid,this.formId)
}}},_enableEntries:function(A){for(var B=0;
B<this.entries.length;
B++){var C=this.entries[B];
C.fileInput.name=(!A)?(this.id+":file"+B):"";
C.fileInput.disabled=A
}},beforeSubmit:function(){var A=this.getForm();
if(!A){throw"No parent form found!"
}Richfaces.writeAttribute(A,"encoding","multipart/form-data");
Richfaces.writeAttribute(A,"enctype","multipart/form-data");
Richfaces.writeAttribute(A,"action",this.actionUrl+(/\?/.test(this.actionUrl)?"&_richfaces_upload_uid":"?_richfaces_upload_uid")+"=_richfaces_form_upload&"+this.id+"="+this.id+"&_richfaces_upload_file_indicator=true");
this.currentInput.disabled=true;
this._enableEntries(false);
return true
},initFlashModule:function(){var G=this.options.allowFlash;
this.oldDisabled=this.disabled;
if(G=="auto"||G=="true"){var C=window.location.href.substr(0,5).toLowerCase()=="https"?"s":"";
var I=document.createElement("div");
I.innerHTML='<a href="http'+C+'://www.adobe.com/go/getflashplayer"><img style="border:0px; margin:2px" src="http'+C+'://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a>';
var F=this.id+":flashContainer";
var D=document.getElementById(F);
this.isFlash=swfobject.hasFlashPlayerVersion("9.0.28");
if(this.isFlash){this.disable();
var A={fileUploadId:this.id};
var H={allowscriptaccess:true,menu:"false",wmode:"transparent",salign:"TL",scale:"noscale"};
var B={style:"position:absolute; top:0px; left:0px;"};
swfobject.embedSWF(this.options.flashComponentUrl,F,"100%","100%","9.0.28",false,A,H,B);
this.currentInput.parentNode.innerHTML='<input type="text" style="cursor: pointer; right: 0px; top: 0px; font-size: 10em; position: absolute; padding: 0px" class="rich-fileupload-hidden" id="'+this.id+':file" name="'+this.id+':file"></input>';
this.currentInput=$(this.id+":file");
this.currentInput.style.display="none";
this.currentInput.onmousedown=(function(){this.createFrame()
}).bind(this)
}else{if(G=="true"){this.items.appendChild(I);
this.disable()
}}}},_flashClearFocus:function(){},_flashSetComponent:function(){var A=this.id+":flashContainer";
this.flashComponent=(document[A])?document[A]:(window[A]?window[A]:$(A));
this.flashComponent.setProperties({acceptedTypes:this.acceptedTypes,noDuplicate:this.options.noDuplicate,maxFiles:this.maxFileBatchSize});
if(Richfaces.browser.isIE){this.flashComponent.style.width=this.currentInput.parentNode.style.width;
this.flashComponent.style.height=this.currentInput.parentNode.style.height
}if(!this.oldDisabled){this.enable()
}},_flashDisableAdd:function(A){if(this.flashComponent){this.flashComponent.disableAdd(A)
}},_flashAdd:function(F){if(this.disabled){return 
}var D=[];
for(var C=this.entries.length;
C<F.length;
C++){var B=F[C];
this.currentInput.value=F[C].name;
this.createFrame();
var G=new FileUploadEntry(this.currentInput,this,B.size,B.type,B.creator,B.creationDate,B.modificationDate);
this.entries.push(G);
D.push(G);
if(this.runUpload){G.setState(FileUploadEntry.READY)
}else{G.setState(FileUploadEntry.INITIALIZED)
}var A=this.currentInput.cloneNode(true);
this.currentInput.style.cssText="position: absolute; right: 0px; top: 0px; display: none; visibility: hidden;";
A.id=this.id+":file"+(this.idCounter++);
A.value="";
this.currentInput.parentNode.appendChild(A);
this.currentInput=A
}if(this.events.onadd){this.element.fire("rich:onadd",{entries:D})
}if(this.runUpload){this.upload()
}},_flashRemoveFile:function(A){this.uploadIndex=this.flashComponent.removeFile(A)
},_flashFireEvent:function(A,B){if(this.events[A]){this.element.fire("rich:"+A,B)
}},_flashGetActionUrl:function(A,C){var D="_richfaces_upload_uid="+encodeURI(C.uid)+"&"+this.id+"="+this.id+"&_richfaces_upload_file_indicator=true&_richfaces_size="+C.size+"&_richfaces_send_http_error=true";
if(/\?/.test(A)){var B=A.indexOf("?");
A=A.substring(0,B)+";jsessionid="+this.sessionId+A.substring(B)+"&"+D
}else{A=A+";jsessionid="+this.sessionId+"?"+D
}return A
},_flashGetPostParams:function(){var B=new A4J.Query(this.progressBar.containerId,this.form);
if(B){B.appendFormControls();
var A=B.getQueryString();
if(this.parameters){A=(/&$/.test(A))?A:A+"&";
for(var C in this.parameters){A=A+C+"="+this.parameters[C]+"&"
}}return A
}return""
},_flashSubmitForm:function(B){B.uid=encodeURIComponent(Math.random().toString());
var C=this._flashGetActionUrl(this.actionUrl,B);
var A=this.flashComponent.uploadFile(this.uploadIndex,C,this._flashGetPostParams());
if(this.labelMarkup){this.progressData=new ProgressData(A)
}},_flashStop:function(){if(this.uploadIndex>=0){this.flashComponent.cancelUploadFile(this.uploadIndex);
this._flashError(FileUploadEntry.UPLOAD_CANCELED)
}},_flashOnProgress:function(D,C){var B=this.entries[this.uploadIndex];
if(B){var F=D*100/C;
this.progressBar.setValue(F);
if(B.state==FileUploadEntry.UPLOAD_IN_PROGRESS){var A=this.labelMarkup.invoke("getContent",this.progressData.getContext(F)).join("");
B.statusLabel.innerHTML=A
}}},_flashOnComplete:function(){this.finishProgressBar();
this._flashSetEntryState(this.uploadIndex,(this.upload_stopped?FileUploadEntry.UPLOAD_CANCELED:FileUploadEntry.UPLOAD_SUCCESS));
this.upload_stopped=false
},_flashHTTPError:function(A){if(A==413){this._flashError(FileUploadEntry.UPLOAD_SIZE_ERROR)
}else{this._flashError()
}},_flashIOError:function(){this._flashError()
},_flashOnSecurityError:function(A){this._flashError()
},_flashError:function(A){this.finishProgressBar();
this._flashSetEntryState(this.uploadIndex,(A==undefined?FileUploadEntry.UPLOAD_TRANSFER_ERROR:A))
},_flashSetEntryState:function(A,C){var B=this.entries[A];
if(B){B.setState(C);
if(this.events.onfileuploadcomplete){this.element.fire("rich:onfileuploadcomplete",{state:C})
}}}});
FlashFileUpload={getComponent:function(A){return $(A).component
},ASTrace:function(A){console.log(A)
},ASAlert:function(A){alert(A)
}}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.Slider=Class.create();
Richfaces.Slider.prototype={initialize:function(E,C,H,I,J,A,D,K){var B=this;
this.handle=$(E);
this.tip=$(H);
this.track=$(C);
this.mainTable=$(I);
this.input=$(K.inputId)||document.getElementsByName(K.inputId)[0];
if(K.showArrows){this.arrowInc=$(K.arrowInc)||document.getElementsByName(K.arrowInc)[0];
this.arrowDec=$(K.arrowDec)||document.getElementsByName(K.arrowDec)[0];
this.tipArrowInc=$(K.tipArrowInc)||document.getElementsByName(K.tipArrowInc)[0];
this.tipArrowDec=$(K.tipArrowDec)||document.getElementsByName(K.tipArrowDec)[0]
}this.options=K||{};
this.orientation=this.options.orientation;
this.classes={};
this.classes.arrow="dr-insldr-handler rich-inslider-handler";
this.classes.arrowSelected="dr-insldr-handler-sel rich-inslider-handler-selected";
this.classes.temp=this.handle.className;
this.classes.base=" "+this.trim(this.classes.temp.replace("dr-insldr-handler rich-inslider-handler",""));
if(this.orientation=="vertical"){this.classes.arrow="dr-insldr-handler-vertical rich-inslider-handler-vertical";
this.classes.arrowSelected="dr-insldr-handler-sel-vertical rich-inslider-handler-selected-vertical";
this.classes.base=" "+this.trim(this.classes.temp.replace("dr-insldr-handler-vertical rich-inslider-handler-vertical",""))
}this.classes.handleSelected=" "+J;
this.table=this.findTableForTrack(this.track);
this.input.value=this.options.sliderValue;
this.prevInputValue=this.input.value;
this.graggedImageOn=false;
this.range=this.options.range||$R(0,1);
this.value=0;
this.minimum=this.options.minimum||this.range.start;
this.maximum=this.options.maximum||this.range.end;
this.digCount=0;
this.delay=this.options.delay;
if(""==this.input.value){this.input.value=this.options.minimum
}this.step=this.options.step;
if((this.step+"").indexOf(".")!=-1){var G=(this.step+"");
this.digCount=(G.substring(G.indexOf(".")+1,G.length)).length
}this.availableValues=this.calculateAvailableValues();
this.tip.maxlength=(this.maximum+"").length+(this.digCount!=0?this.digCount+1:0);
if(this.options.showArrows){this.tipArrowInc.maxlength=this.tip.maxlength;
this.tipArrowDec.maxlength=this.tip.maxlength
}this.handleLength=9;
this.active=false;
this.dragging=false;
this.editInFocus=false;
this.disabled=this.options.disabled?true:false;
var F=this.track.childNodes[0];
this.prevMouseUp=window.document.onmouseup;
this.prevMouseMove=window.document.onmousemove;
this.documentBodyOload=this.load.bindAsEventListener(this);
Event.observe(window,"load",this.documentBodyOload);
this.eventWindowResized=this.windowResized.bindAsEventListener(this);
Event.observe(window,"resize",this.eventWindowResized);
this.period="";
if(!this.options.disabled){this.eventMouseUp=this.processMouseUp.bindAsEventListener(this);
this.eventMouseMove=this.update.bindAsEventListener(this);
this.eventMouseDown=this.startDrag.bindAsEventListener(this);
this.eventEditFocus=this.editFocus.bindAsEventListener(this);
this.eventEditBlur=this.editBlur.bindAsEventListener(this);
this.eventEditChange=this.editChange.bindAsEventListener(this);
this.eventEditValidate=this.inputValidate.bindAsEventListener(this);
this.eventInputChange=this.inputChange.bindAsEventListener(this);
this.eventWindowMouseOut=this.windowMouseOut.bindAsEventListener(this);
this.eventIncrease=this.increase.bindAsEventListener(this);
this.eventDecrease=this.decrease.bindAsEventListener(this);
this.eventIncreaseDown=this.increaseDown.bindAsEventListener(this);
this.eventDecreaseDown=this.decreaseDown.bindAsEventListener(this);
this.eventIncreaseUp=this.increaseUp.bindAsEventListener(this);
this.eventDecreaseUp=this.decreaseUp.bindAsEventListener(this);
if(this.options.onerr){this.eventError=new Function("event","clientErrorMessage",this.options.onerr)
}if(this.options.onchange!=""){this.eventChanged=new Function("event",this.options.onchange).bindAsEventListener(this)
}Event.observe(this.track,"mousedown",this.eventMouseDown);
Event.observe(F,"mousedown",this.eventMouseDown);
Event.observe(this.input,"keydown",this.eventEditValidate);
Event.observe(this.input,"keyup",this.eventEditChange);
Event.observe(this.input,"focus",this.eventEditFocus);
Event.observe(this.input,"blur",this.eventEditBlur);
if(this.input.onchange){this.eventInputOnChange=this.input.onchange.bindAsEventListener(this.input);
this.input.onchange=null
}Event.observe(this.input,"change",this.eventInputChange);
if(this.options.showArrows){Event.observe(this.arrowInc,"mousedown",this.eventIncreaseDown);
Event.observe(this.arrowDec,"mousedown",this.eventDecreaseDown);
Event.observe(this.arrowInc,"mouseup",this.eventIncreaseUp);
Event.observe(this.arrowDec,"mouseup",this.eventDecreaseUp)
}}this.initialized=true;
this.setInitialValue();
this.required=K.required;
this.mainTable.component=this;
this["rich:destructor"]="destroy"
},destroy:function(){this.handle=null;
this.tip=null;
this.tipArrowInc=null;
this.tipArrowDec=null;
this.arrowInc=null;
this.arrowDec=null;
this.track=null;
this.mainTable.component=null;
this.mainTable=null;
this.input=null;
this.table=null;
window.document.onmouseup=this.prevMouseUp;
window.document.onmousemove=this.prevMouseMove;
this.prevMouseUp=null;
this.prevMouseMove=null;
Event.stopObserving(window,"load",this.documentBodyOload);
Event.stopObserving(window,"resize",this.eventWindowResized)
},setInitialValue:function(){this.setValue(parseFloat(this.options.sliderValue||this.range.start));
this.handle.style.visibility="visible";
this.prevValue=this.value;
this.valueChanged=false;
if(this.options.showArrows){if(this.orientation=="vertical"){this.tipArrowInc.style.left=(this.arrowInc.offsetWidth)+"px";
this.tipArrowDec.style.left=(this.arrowDec.offsetWidth)+"px"
}else{this.tipArrowInc.style.top="-"+(this.arrowInc.offsetHeight+3)+"px";
this.tipArrowDec.style.top="-"+(this.arrowDec.offsetHeight+3)+"px"
}}},calculateAvailableValues:function(){var A=new Array();
var C=this.roundFloat(this.minimum);
var B=0;
while(C<this.maximum){A[B]=C;
C=this.roundFloat(C+parseFloat(this.step));
B++
}A[B]=this.roundFloat(this.maximum);
return A
},roundFloat:function(A){if(!this.digCount){return Math.round(A)
}return parseFloat(Number(A).toFixed(this.digCount))
},windowMouseOut:function(A){var B=null;
if(A.srcElement){B=A.toElement
}else{B=A.relatedTarget
}if(B==null){this.endDrag(A)
}},windowResized:function(A){this.setValue(this.value)
},findTableForTrack:function(B){var A=B.parentElement||B.parentNode;
if(A.tagName.toUpperCase()=="TABLE"){return A
}else{return this.findTableForTrack(A)
}},getNearestValue:function(B){var C;
C=this.binsearch(this.availableValues,B);
if(C>0){var A=C-1;
if(Math.abs(B-this.availableValues[A])<Math.abs(this.availableValues[C]-B)){C=A
}}return this.roundFloat(this.availableValues[C])
},binsearch:function(B,E){var D=0;
var C=B.length-1;
var A;
while(D<C){A=Math.round((D+C)/2+0.5)-1;
if(E<=B[A]){C=A
}else{D=A+1
}}return D
},setValue:function(B){if(isNaN(B)){B=0
}var A=this.getNearestValue(B);
this.value=A;
if((!this.editInFocus||A==B)&&(this.required||""!=this.input.value||this.updating)){this.input.value=this.value;
if(this.options.orientation=="vertical"){this.handle.style.top=this.translateToPx(this.value)
}else{this.handle.style.left=this.translateToPx(this.value)
}}else{if(this.options.orientation=="vertical"){this.handle.style.top="-9px"
}else{this.handle.style.left="0px"
}}if(!this.tip.firstChild){this.tip.appendChild(window.document.createTextNode(this.value))
}if(this.options.showArrows){if(!this.tipArrowInc.firstChild){this.tipArrowInc.appendChild(window.document.createTextNode(this.value))
}if(!this.tipArrowDec.firstChild){this.tipArrowDec.appendChild(window.document.createTextNode(this.value))
}this.tipArrowInc.firstChild.nodeValue=this.value;
this.tipArrowDec.firstChild.nodeValue=this.value
}this.tip.firstChild.nodeValue=this.value;
if(this.options.orientation=="vertical"){this.tip.style.top=(this.handle.offsetTop)+"px"
}else{this.tip.style.left=this.handle.offsetLeft+"px"
}},translateToPx:function(A){if(this.options.orientation=="vertical"){return Math.round(((this.maximumOffset()-this.handleLength)/(this.range.end-this.range.start))*(this.range.end-A)-this.maximumOffset())+"px"
}return Math.round(((this.maximumOffset()-this.handleLength)/(this.range.end-this.range.start))*(A-this.range.start))+"px"
},translateToValue:function(A){if(this.options.orientation=="vertical"){return(this.range.end-((A/(this.maximumOffset()-this.handleLength)*(this.range.end-this.range.start))))
}return((A/(this.maximumOffset()-this.handleLength)*(this.range.end-this.range.start))+this.range.start)
},maximumOffset:function(){if(this.options.orientation=="vertical"){return this.removePx(this.track.style.height||this.track.offsetHeight||this.options.height)
}return this.removePx(this.track.style.width||this.track.offsetWidth||this.options.width)
},removePx:function(A){if((A+"").indexOf("px")!=-1){return(A+"").substring(0,A.length-2)
}else{return A
}},startDrag:function(B){if(this.editInFocus){this.input.blur()
}window.document.onmouseup=this.eventMouseUp.bindAsEventListener(this);
window.document.onmousemove=this.eventMouseMove.bindAsEventListener(this);
Event.observe(document,"mouseout",this.eventWindowMouseOut);
this.editBlur();
this.prevMouseDownEvent=B;
if(Event.isLeftClick(B)){if(!this.disabled){this.handle.className=this.classes.arrowSelected+this.classes.base+this.classes.handleSelected;
if(this.options.currValue){Element.show(this.tip);
Element.setStyle(this.tip,{top:"-"+(this.tip.offsetHeight+2)+"px"})
}Richfaces.createEvent("mousedown",this.mainTable,null,null).fire();
this.active=true;
var D=Event.element(B);
var E;
if(this.orientation=="vertical"){E=Event.pointerY(B)
}else{E=Event.pointerX(B)
}var A=Position.cumulativeOffset(this.track);
this.updating=true;
var C;
if(this.orientation=="vertical"){C=this.translateToValue((E-A[1])-(this.handleLength/2))
}else{C=this.translateToValue((E-A[0])-(this.handleLength/2))
}if(this.invokeEvent("slide",B,this.getNearestValue(C),this.input)){this.setValue(C)
}this.updating=false;
var A=Position.cumulativeOffset(this.handle);
if(this.orientation=="vertical"){this.offsetX=E-A[1]
}else{this.offsetX=E-A[0]
}}Event.stop(B)
}},update:function(A){this.updating=true;
if(this.active){if(!this.dragging){this.dragging=true
}this.draw(A);
Event.stop(A)
}this.updating=false
},draw:function(B){if(this.orientation=="vertical"){var C=Event.pointerY(B);
var A=Position.cumulativeOffset(this.track);
C-=this.offsetX+A[1];
this.setValue(this.translateToValue(C))
}else{var C=Event.pointerX(B);
var A=Position.cumulativeOffset(this.track);
C-=this.offsetX+A[0];
this.setValue(this.translateToValue(C))
}},processMouseUp:function(A){this.endDrag(A);
this.fireClickIfNeeded(A)
},endDrag:function(A){window.document.onmouseup=this.prevMouseUp;
window.document.onmousemove=this.prevMouseMove;
Event.stopObserving(document,"mouseout",this.eventWindowMouseOut,false);
if(this.options.currValue){Element.hide(this.tip)
}if(this.eventChanged&&this.isValueChanged()){this.eventChanged(A)
}this.handle.className=this.classes.arrow+this.classes.base;
if(this.active&&this.dragging){this.active=false;
this.dragging=false;
Richfaces.createEvent("mouseup",this.mainTable,null,null).fire();
Event.stop(A)
}if(RichFaces.navigatorType()!=RichFaces.MSIE){Richfaces.createEvent("change",this.input,null,null).fire()
}},fireClickIfNeeded:function(A){if((this.prevMouseDownEvent.target!=A.target&&RichFaces.navigatorType()==RichFaces.FF)||(RichFaces.getOperaVersion()&&RichFaces.getOperaVersion()<9&&A.target.tagName.toLowerCase()!="div")){Richfaces.createEvent("click",this.mainTable,null,null).fire()
}},isValueChanged:function(){var A=this.prevValue!=this.value;
this.prevValue=this.value;
return A
},increase:function(B){var A=parseFloat(this.value)+parseFloat(this.step);
this.setValue(Number(A<this.maximum?A:this.maximum));
this.input.value=this.value;
if(this.eventChanged&&this.isValueChanged()){this.eventChanged(B)
}},decrease:function(B){var A=parseFloat(this.value)-parseFloat(this.step);
this.setValue(Number(A>this.minimum?A:this.minimum));
this.input.value=this.value;
if(this.eventChanged&&this.isValueChanged()){this.eventChanged(B)
}},increaseDown:function(A){this.arrowButton=$(A.target);
this.arrowButton.className=this.arrowButton.className.replace("Class","SelectedClass").replace("al","al-sel");
window.document.onmouseup=this.eventIncreaseUp.bindAsEventListener(this);
if(!this.disabled){if(this.options.currValue){Element.show(this.tipArrowInc)
}}this.eventIncrease(A);
this._periodicalExecuter=new PeriodicalExecuter(this.eventIncrease,this.delay/1000)
},decreaseDown:function(A){this.arrowButton=$(A.target);
this.arrowButton.className=this.arrowButton.className.replace("Class","SelectedClass").replace("al","al-sel");
window.document.onmouseup=this.eventDecreaseUp.bindAsEventListener(this);
if(!this.disabled){if(this.options.currValue){Element.show(this.tipArrowDec)
}}this.eventDecrease(A);
this._periodicalExecuter=new PeriodicalExecuter(this.eventDecrease,this.delay/1000)
},increaseUp:function(A){this._periodicalExecuter.stop();
if(this.options.currValue){Element.hide(this.tipArrowInc)
}this.arrowButton.className=this.arrowButton.className.replace("SelectedClass","Class").replace("al-sel","al");
window.document.onmouseup=this.prevMouseUp
},decreaseUp:function(A){this._periodicalExecuter.stop();
if(this.options.currValue){Element.hide(this.tipArrowDec)
}this.arrowButton.className=this.arrowButton.className.replace("SelectedClass","Class").replace("al-sel","al");
window.document.onmouseup=this.prevMouseUp
},inputChange:function(A){this.editInFocus=false;
if(isNaN(Number(this.input.value))){this.setValue(this.value)
}else{if(this.outOfRange){if(this.eventError){this.eventError(A,this.options.clientErrorMessage)
}}this.setValue(Number(this.input.value))
}this.value=this.input.value?this.input.value:this.value;
if(this.eventInputOnChange){this.eventInputOnChange()
}if(this.eventChanged&&this.isValueChanged()){this.eventChanged(A)
}},inputValidate:function(A){if(A.keyCode==13){if(isNaN(Number(this.input.value))){this.input.value=this.value;
this.editBlur();
this.setValue(this.value)
}}},editChange:function(A){if(this.input.value=="-"){return 
}if(isNaN(Number(this.input.value))){this.setValue(Number(this.value));
this.input.value=this.value;
if(this.eventError){this.eventError(A,this.options.clientErrorMsg)
}}else{if(!(A.keyCode>=37&&A.keyCode<=40)){this.setValue(Number(this.input.value))
}}if(A.keyCode==13){if(this.required||""!=this.input.value){this.setValue(Number(this.value));
this.input.value=this.value
}if(this.input.form){this.input.form.submit()
}}if(this.eventChanged&&this.isValueChanged()){this.eventChanged(A)
}},editFocus:function(){this.editInFocus=true
},editBlur:function(){this.editInFocus=false;
if((this.input.value+"").indexOf(this.value)!=0){this.setValue(this.input.value);
this.eventInputChange()
}else{this.setValue(this.input.value)
}},load:function(){if(this.input.value){this.options.sliderValue=this.input.value
}this.setInitialValue()
},trim:function(A){return A.replace(/^\s+|\s+$/,"")
},invokeEvent:function(B,E,G,C){var D=this.options["on"+B];
var A;
if(D){var F;
if(E){F=E
}else{if(document.createEventObject){F=document.createEventObject()
}else{if(document.createEvent){F=document.createEvent("Events");
F.initEvent(B,true,false)
}}}F.rich={component:this};
F.rich.value=G;
try{A=D.call(C,F)
}catch(H){LOG.warn("Exception: "+H.Message+"\n[on"+B+"]")
}}if(A!=false){A=true
}return A
}}
;
if(!window.Richfaces){window.Richfaces={}
}Richfaces.processEffect=function(A){new Effect[A.type]($(A.targetId),A)
};
Richfaces.effectEventOnOut=function(A){return A.substr(0,2)=="on"?A.substr(2):A
}
;
function __addLoadEvent(A){Event.observe(window,"load",A)
}function __addUnLoadEvent(A){Event.observe(window,"unload",A)
}function __initGmapdiv(C,D,A){var B=document.getElementById(D);
if(GBrowserIsCompatible()){window[C]=new GMap2(B);
B.map=window[C]
}else{B.innerHTML=A
}}function __applyGmapparam(H,F,G,J,A,D,K,C,E,L,B,I){if(GBrowserIsCompatible()){window[H].setCenter(new GLatLng(F,G),J,A);
if(D){window[H].enableDragging()
}else{window[H].disableDragging()
}if(K){window[H].enableInfoWindow()
}else{window[H].disableInfoWindow()
}if(C){window[H].enableDoubleClickZoom()
}else{window[H].disableDoubleClickZoom()
}if(E){window[H].enableContinuousZoom()
}else{window[H].disableContinuousZoom()
}if(L){window[H].addControl(new GMapTypeControl())
}if(B){window[H].addControl(new GScaleControl())
}if(I){window[H].addControl(new GLargeMapControl())
}}};
if(!window.Richfaces){window.Richfaces={}
}Richfaces.Spinner=Class.create();
Richfaces.Spinner.prototype={initialize:function(F,B,E,C,A){this.content=$(F.edit);
this.controls=$(F.buttons);
this.fie=$(F.forIE);
this.ch=B.chameleon;
this.items=new Array();
this.table=$(F.buttons.substr(F.buttons.indexOf("buttons")+7));
if(RichFaces.navigatorType()==RichFaces.FF||RichFaces.navigatorType()==RichFaces.NETSCAPE){if(!this.fie){this.table.style.display="-moz-inline-box"
}}this.options=B;
if(!B.disabled){this.buttonUp=null;
this.buttonDown=null
}this.cycled=B.cycled;
this.edited=B.edited;
var D=this._getDirectChildrenByTag(this.content,"INPUT")[0];
this.upClick=new Function(C.onup+";return true;").bindAsEventListener(D);
this.downClick=new Function(C.ondown+";return true;").bindAsEventListener(D);
this.error=new Function("event","clientErrorMessage",C.onerr+";return true;").bind(D);
this.data=E;
this.max=null;
this.min=null;
this.delta=null;
this.required=B.required;
this._attachBehaviors();
this._load()
},switchItems:function(B){var A=this.controls.edit.value;
if(B=="up"){if(""==A){this.controls.edit.value=this.min
}else{A-=this.delta*-1;
A=this.roundFloat(A);
if(A<=this.max&&A>=this.min){this.controls.edit.value=A
}else{if(this.cycled){if(this.delta>0){this.controls.edit.value=this.min
}else{this.controls.edit.value=this.max
}}else{this.error(B,this.options.clientErrorMsg);
this.controls.fireEditEvent("error");
this.controls.edit.value=this.max;
return true
}}}}else{if(""==A){this.controls.edit.value=this.max
}else{A-=this.delta;
A=this.roundFloat(A);
if(A>=this.min&&A<=this.max){this.controls.edit.value=A
}else{if(this.cycled){if(this.delta<0){this.controls.edit.value=this.min
}else{this.controls.edit.value=this.max
}}else{this.error(B,this.options.clientErrorMsg);
this.controls.fireEditEvent("error");
this.controls.edit.value=this.min;
return true
}}}}return false
},roundFloat:function(A){var D=this.delta.toString();
var C=0;
if(!/\./.test(D)){if(this.delta>=1){return A
}if(/e/.test(D)){C=D.split("-")[1]
}}else{C=D.length-D.indexOf(".")-1
}var B=A.toFixed(C);
return B
},_load:function(){this.controls.edit.readOnly=this.edited?"":"readOnly";
if(this.options.disabled){this.controls.edit.readOnly="readOnly";
Element.setStyle(this.controls.edit,{color:"gray"})
}else{Element.setStyle(this.controls.edit,{color:""})
}},_attachBehaviors:function(){this.max=this.data.max;
this.min=this.data.min;
this.delta=this.data.delta;
var C=this._getDirectChildrenByTag(this.controls,"TBODY")[0];
var B=this._getDirectChildrenByTag(C,"TR");
var F=this._getDirectChildrenByTag(B[0],"TD")[0];
var G=this._getDirectChildrenByTag(B[1],"TD")[0];
var E=this._getDirectChildrenByTag(this.content,"INPUT")[0];
if(this.ch=="false"){this.buttonUp=this._getDirectChildrenByTag(F,"INPUT")[0];
this.buttonDown=this._getDirectChildrenByTag(G,"INPUT")[0];
var A=null;
var D=null
}else{var A=this._getDirectChildrenByTag(F,"INPUT")[0];
var D=this._getDirectChildrenByTag(G,"INPUT")[0]
}this.controls=new Richfaces.Spinner.Controls(this,{button:F,img:A},{button:G,img:D},E)
},_getDirectChildrenByTag:function(E,D){var B=new Array();
var A=E.childNodes;
for(var C=0;
C<A.length;
C++){if(A[C]&&A[C].tagName&&A[C].tagName.toUpperCase()==D.toUpperCase()){B.push(A[C])
}}return B
},_removePx:function(A){return A.substring(0,A.indexOf("px"))
}};
Richfaces.Spinner.Controls=Class.create();
Richfaces.Spinner.Controls.prototype={initialize:function(C,A,D,B){this.spinner=C;
this.up=$(A.button);
this.upimg=$(A.img);
this.down=$(D.button);
this.downimg=$(D.img);
this.mousedown=false;
this.onUpButton=false;
this.onDownButton=false;
this.fie=this.spinner.fie;
this.edit=$(B);
this.originalColor=B.style.color;
this.prevEditValue=(this.edit.value||!this.spinner.required)?this.edit.value:this.spinner.min;
this.edit.value=this.prevEditValue;
this.previousMU=window.document.onmouseup;
this.previousMM=window.document.onmousemove;
if(!C.options.disabled){this._attachBehaviors();
this.edit.style.color=this.originalColor
}else{if(!this.fie){this.edit.style.color="gray"
}}},upClick:function(B){if(B.preventDefault){B.preventDefault()
}var A=this.spinner.switchItems("up");
this.spinner.upClick();
if(!A){window.document.onmouseup=this.mouseUp.bindAsEventListener(this);
this.mousedown=true;
this.timer=setTimeout(this.continueUpClick.bind(this),750)
}},downClick:function(B){if(B.preventDefault){B.preventDefault()
}var A=this.spinner.switchItems("down");
this.spinner.downClick();
if(!A){window.document.onmouseup=this.mouseUp.bindAsEventListener(this);
this.mousedown=true;
this.timer=setTimeout(this.continueDownClick.bind(this),750)
}},continueUpClick:function(){if(!this.mousedown){return 
}window.document.onmousemove=this.mouseMoveUp.bindAsEventListener(this);
this.spinner.switchItems("up");
if(this.timer){clearTimeout(this.timer)
}this.timer=setTimeout(this.continueUpClick.bind(this),100)
},continueDownClick:function(){if(!this.mousedown){return 
}window.document.onmousemove=this.mouseMoveDown.bindAsEventListener(this);
this.spinner.switchItems("down");
if(this.timer){clearTimeout(this.timer)
}this.timer=setTimeout(this.continueDownClick.bind(this),100)
},mouseUp:function(A){clearTimeout(this.timer);
if(this.spinner.ch=="true"){if(!this.onUpButton){this.upUp()
}if(!this.onDownButton){this.downUp()
}}if(this.mousedown){this.mousedown=false;
this.fireEditEvent("change")
}},mouseMoveDown:function(A){if(A.preventDefault){A.preventDefault()
}if((this.downimg!=Event.element(A))){window.document.onmousemove=this.previousMM;
clearTimeout(this.timer);
this.mousedown=false;
if(this.spinner.ch=="true"){if(!this.onUpButton){this.upUp()
}if(!this.onDownButton){this.downUp()
}}this.fireEditEvent("change")
}},mouseMoveUp:function(A){if(A.preventDefault){A.preventDefault()
}if(this.upimg!=Event.element(A)){window.document.onmousemove=this.previousMM;
clearTimeout(this.timer);
this.mousedown=false;
if(this.spinner.ch=="true"){if(!this.onUpButton){this.upUp()
}if(!this.onDownButton){this.downUp()
}}this.fireEditEvent("change")
}},inputChange:function(A){if((this.edit.value==""&&this.spinner.required)||isNaN(Number(this.edit.value))){this.edit.value=this.prevEditValue
}else{if(""!=this.edit.value){if(this.edit.value>this.spinner.max){this.edit.value=this.spinner.max
}else{if(this.edit.value<this.spinner.min){this.edit.value=this.spinner.min
}}}}if(""!=this.edit.value){this.prevEditValue=this.edit.value
}if(this.eventEditOnChange){this.eventEditOnChange()
}},editChange:function(A){if((this.edit.value<this.spinner.max)&&(this.edit.value>this.spinner.min)&&!isNaN(Number(this.edit.value))&&this.edit.value!=""){this.prevEditValue=this.edit.value
}if(A.keyCode==13){if(this.spinner.required||""!=this.edit.value){this.edit.value=this.getValidValue(this.edit.value)
}if(this.edit.form){this.edit.form.submit()
}}},getValidValue:function(A){if(isNaN(A)||A==""){return this.prevEditValue
}if(A>this.spinner.max){return this.spinner.max
}if(A<this.spinner.min){return this.spinner.min
}return A
},drag:function(){return false
},_attachBehaviors:function(){this.up.onmousedown=this.upClick.bindAsEventListener(this);
this.down.onmousedown=this.downClick.bindAsEventListener(this);
this.up.onmouseup=this.mouseUp.bindAsEventListener(this);
this.down.onmouseup=this.mouseUp.bindAsEventListener(this);
this.edit.onkeydown=this.editChange.bindAsEventListener(this);
this.eventInputChange=this.inputChange.bindAsEventListener(this);
if(this.edit.onchange){this.eventEditOnChange=this.edit.onchange
}this.edit.onchange=this.eventInputChange.bindAsEventListener(this.edit)
},fireEditEvent:function(B){if(document.createEvent){var A=document.createEvent("HTMLEvents");
A.initEvent(B,true,false);
this.edit.dispatchEvent(A)
}else{if(document.createEventObject){this.edit.fireEvent("on"+B)
}}}}
;
function __addLoadEvent(A){Event.observe(window,"load",A)
}function __initVirtualEarthdiv(A,B){window[A]=new VEMap(B)
}function __applyVirtualEarthparam(E,H,G,B,D,A,C){var F=window[E];
F.SetDashboardSize(C);
F.onLoadMap=H;
F.LoadMap();
F.SetCenterAndZoom(new VELatLong(G,B),D);
F.SetMapStyle(A)
};
if(!window.Richfaces){window.Richfaces={}
}if(!Richfaces.componentControl){Richfaces.componentControl={}
}Richfaces.componentControl.eachComponent=function(A,B){jQuery(A).each(function(){if(this.component){B(this.component)
}})
};
Richfaces.componentControl.applyDecorations=function(B,A,C){if(C){C(B)
}Richfaces.componentControl.eachComponent(A,function(D){if(D.applyDecoration){D.applyDecoration(B)
}})
};
Richfaces.componentControl.attachEvent=function(C,F,B,A,E,D){jQuery(C).bind(Richfaces.effectEventOnOut(F),function(G){Richfaces.componentControl.performOperation(G,B,A,E,D)
}).each(function(){Richfaces.componentControl.applyDecorations(this,B,function(G){})
})
};
Richfaces.componentControl.performOperation=function(E,B,A,F,D){if(D){var C=jQuery.event.fix(E);
C.stopPropagation();
C.preventDefault()
}Richfaces.componentControl.eachComponent(B,function(G){var H=F;
if(typeof F=="function"){H=F()
}G[A](E,H)
})
};
Richfaces.effectEventOnOut=function(A){return A.substr(0,2)=="on"?A.substr(2):A
}
;

