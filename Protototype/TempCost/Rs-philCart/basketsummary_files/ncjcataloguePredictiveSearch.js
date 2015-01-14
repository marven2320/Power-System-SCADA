var t;
var locale;
var advancedSearch;
function retrieveTfgsCheck(str,localeString,advancedSearchVal){

	locale=localeString;
	advancedSearch = advancedSearchVal;
	if  (str.length>=maxLength){		
		t=setTimeout("retrieveCatlogue()",maxDelay);
	} else {
		document.getElementById("txtHint").innerHTML="";
		document.getElementById("txtHintBox").style.display="none";			
		return	
	}
}  
function stopCount(){
	clearTimeout(t)
}
function trim(str){ //function trims the white spaces.
	if (str != null) {
		str = str.replace ( /^\s+/g, "" );// strip leading
		str = str.replace ( /\s+$/g, "" );// strip trailing		
		str = str.replace ( /\s+/g, " " );// replace multiple with single
		return str;
		}
}

var req;
function retrieveCatlogue(){
	var lastSearch = document.getElementById("lastSearch").value;
	var searchTerm = document.getElementById('searchForm:searchTerm').value;

		if (searchTerm.length==0){
			document.getElementById("txtHint").innerHTML="";
			document.getElementById("txtHintBox").style.display="none";
			return
		}
		if(searchTerm != null ){
			searchTerm = trim(searchTerm) // trim the white spaces.
		}
		if (searchTerm!=lastSearch){// compare with last successful predictive search term.
			//if (searchTerm.length>=CAT_PREDICTIVE_TRIGGER_MAX){
			// Invoke the Servlet For Predictive Search
			var url="/predictivesearch/catSearch?searchTerm="+ encodeURIComponent(searchTerm) +"&locale=" +encodeURIComponent(locale) +"&advancedPredictiveSearchEnabled=" +advancedSearch;
			//Do the Ajax call
			if (window.XMLHttpRequest) { // Non-IE browsers
			  req = new XMLHttpRequest();
			  //A call-back function is defined so the browser knows which function to call after the server gives a reponse back
			  req.onreadystatechange = populateCatalogue;
			  try {
				req.open("GET", url, true); //was get
				} catch (e) {
				 alert("Cannot connect to server");
				}
			  req.send(null);
			} else if (window.ActiveXObject) { // IE      
				  req = new ActiveXObject("Microsoft.XMLHTTP");
				  if (req) {
					req.onreadystatechange = populateCatalogue;
					req.open("GET", url, true);
					req.send();
					}
			}			
			//}
		}
		else if (searchTerm==lastSearch) {
			  populateLastresults();
		}				
}

//Callback function
function populateCatalogue(){
	var jsonData = null;
	var tfgList = "";
	var searchTerm = document.getElementById('searchForm:searchTerm').value;
	//searchTerm = searchTerm.replace(" ","%20");
	if(searchTerm != null ){
		searchTerm = trim(searchTerm);
	}	
	
	if (req.readyState == 4) {
		//TODO: What does the following line do
		var textToSplit = removeLastDelimitor(req.responseText);
		if (textToSplit.length != 0) {
			// check for the session expired.
			var checkSession = textToSplit.split("><");
			if(checkSession[0]=="<html"){		
				return;
			}
			
			//Convert the response to json Object
			jsonData = eval("("+ req.responseText +")");
			if(advancedSearch === 'false') {
				tfgList = populateSimpleCatalogue(jsonData);
			}else{
				tfgList = populateAdvancedCatalogue(jsonData,searchTerm);
			}
			 // store last predictive searchTerm in hidden input field.
			document.getElementById("lastSearch").value=searchTerm;
			
			// store tfgList in hidden field 'storedresponse' to populate for last searchTerm.
			document.getElementById('storedresponse').value = tfgList;
			 
			new AutoComplete(
				tfgList,
				document.getElementById('searchForm:searchTerm'),
				document.getElementById('txtHint'));			
		}
		else {
			document.getElementById("txtHint").innerHTML="";
			document.getElementById("txtHintBox").style.display="none";			
			return;
		}
	}
}

// Method to populate simple catalogue data.
function populateSimpleCatalogue(jsonData) {
	document.getElementById("txtHintBox").style.fontSize="11px";
	document.getElementById("txtHintBox").style.marginTop="-3px";
	var tfgList = "";
	var i = 0;
	for (var group in jsonData) {
		if (jsonData.hasOwnProperty(group)) {
			var items = jsonData[group];
			for (var item in items) {							                                        										
				var URL = "/web" + items[item] +"?sra=p"; //tfgId will have the separator web/c/connector. ?sra=p is for predictive search
				tfgList = tfgList +"<li class=dropDown><a id=" + i + " onmouseover='rollover(this);' href='"+URL+"'>"+ item +"</a></li>";							
				++i;
			}						
		}
	}
	return tfgList;
}

// Method to populate advanced catalogue data.
function populateAdvancedCatalogue(jsonData, searchTerm) {
	document.getElementById("txtHintBox").style.fontSize="12px";
	document.getElementById("txtHintBox").style.padding = "10px";
	document.getElementById("txtHintBox").style.marginTop="-3px";
	document.getElementById("txtInnerContainer").style.border = "solid 1px #FFFFFF";
	var tfgList = "";
	var url = "";
	var i = 0;
	for (var group in jsonData) {
		if (jsonData.hasOwnProperty(group)) {
			tfgList = tfgList +"<li class=advSecContainer><span class=sectionTitle>"+group+"</span><div class=clearBoth></div></li>";
			var items = jsonData[group];
			for (var item in items) {
				var formattedItem = item.replace(new RegExp('(' + searchTerm + ')', 'gi'), "<b>$1</b>");          
				var tempUrl = items[item];
				if(tempUrl.indexOf("?") > -1){
					url = "/web" + items[item] +"&sra=p";
				}else{
					url = "/web" + items[item] +"?sra=p"; //tfgId will have the separator web/c/connector. ?sra=p is for predictive search
				}
				tfgList = tfgList +"<li class=advItemContainer><a id=" + i + " href='"+url+"'>"+ formattedItem +"</a></li>";
				++i;
			}
			tfgList = tfgList +"<li class='separator'></li>";
		}
	}
	return trimRight(tfgList,"<li class='separator'></li>");
}

function trimRight(originalString,stringToRemove) {
  return originalString.replace(new RegExp("[" + stringToRemove + "]+$"), "");
}

function convert(str)
{
  return str.replace(/&/g, "&#38;").replace(/>/g, "&#62;").replace(/</g, "&#60;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/,/g, "&#44;").replace(/-/g, "&#45;");
}
function populateLastresults(){// Populate the last saved tfgList from populateCatalogue() for successful ajax call.
	var tfgList = document.getElementById('storedresponse').value; // retrieve the stored tfgList.
	new AutoComplete(tfgList,
					document.getElementById('searchForm:searchTerm'),
					document.getElementById('txtHint'));		
}
function stopCount(){
	clearTimeout(t)
}
var autoCompleteItemSelected = false;
var navigatingList = false;

var childLink;
function AutoComplete(aStr, oText, oDiv) {
	if (aStr.length != 0){
		this.oText = oText;
		this.oDiv = oDiv;
		document.getElementById("txtHintBox").style.display="block";
		document.getElementById("txtHint").innerHTML=aStr;	
		oText.AutoComplete = this;
		oDiv.AutoComplete = this;
		oText.onkeyup = AutoComplete.prototype.onTextChange;
		//oText.onblur = AutoComplete.prototype.onTextBlur;
		if(advancedSearch === 'false'){
			oDiv.onmouseover = AutoComplete.prototype.onDivMouseOver;
		}
	}
}
AutoComplete.prototype.onTextChange = function() {
    var e = arguments[0] || window.event;
    var kc = e.which || e.keyCode;
    var ac = this.AutoComplete;
    if (typeof ac.whichSelected == undefined) ac.whichSelected = -1;
    var ws = ac.whichSelected;
    var opts =  jQuery(ac.oDiv).find('li a').parent();
    var sel = false;
	childLink = "";
    switch (kc) {
        case 38:
            ac.whichSelected = ws > 0 ? ws - 1 : opts.length;
            sel = true;
            break;
        case 40:
            ac.whichSelected = ws > -1 && ws < opts.length? ws + 1 : 0;
            sel = true;
            break;
		case 27: // check esc keypressed to hide the drop down.
			document.getElementById("txtHintBox").style.display="none";			
			sel = true;
			break;
		case 13:
			if (document.getElementById("txtHintBox").style.display == "block"){
				document.getElementById("txtHintBox").style.display = "none";
				sel = true;
				}
			else{
			sel = false;
			}			
			break;
	     default:
            ac.whichSelected = -1;
            this.AutoComplete.onchange();
            autoCompleteItemSelected = false;
			break;
    }	
    if (sel) {
        navigatingList = true;
        for (var i = 0; i < opts.length; i++) {
            if(opts[i].className != 'separator') {
				if (i == ac.whichSelected) {
					if(advancedSearch === 'false'){
						opts[i].className = "AutoCompleteHighlight"; // highlight the search child node.
					} else {
						opts[i].className = "advancedAutoCompHighlight";
					}
					childLink = document.getElementById(i);
					document.onkeyup = keyHandler; // check for the key pressed for enter key.
					var autoc = document.getElementById('autoc');
					autoc.value = 'true';
				} else {
					opts[i].className = "AutoCompleteBackground";
				}
				if(opts[i].className === 'advancedAutoCompHighlight') {
					jQuery(opts[i]).find('a').addClass('advancedHighlight');
				} else {
					jQuery(opts[i]).find('a').removeClass('advancedHighlight');
				}
			}			
        }
		sel = false;
    } else {		
		navigatingList = false;
    }
}
function keyHandler(e){
	if (navigator.appName == "Microsoft Internet Explorer"){
		var newEvent = event;}
	else {	 
		var newEvent = e;
	}
	if (newEvent.keyCode == 13){
		if(childLink != ""){			
				document.location.href = childLink;
				return false;
			}
			else {
			
			return;
			}	
	 }
	 else{
		return;
	}
}
AutoComplete.prototype.onDivMouseDown = function() {
    this.AutoComplete.oText.value = this.innerHTML;
    autoCompleteItemSelected = true;
}
var liValueglobal = "";
function rollover(liValue) {
	liValueglobal = liValue.innerHTML;
}
AutoComplete.prototype.onDivMouseOver = function() {
	var rgs = /^.*\"\>/;
	var rge = /\<.*$/;	
    var ac = this.AutoComplete;
	var oDiv = document.getElementById("txtHint");
    var opts = oDiv.childNodes;
	
    for (var i = 0; i < opts.length; i++) {
	var option = opts[i].innerHTML.replace(rgs, "");
	option = option.replace(rge, "");
		if (option == liValueglobal) {
		    ac.whichSelected = i;
            opts[i].className = "AutoCompleteHighlight";
        }
        else {
            opts[i].className = "AutoCompleteBackground";
        }
    }	
}
AutoComplete.prototype.onDivMouseOut = function() {
    this.className = "AutoCompleteBackground";
}
AutoComplete.prototype.onchange = function() {
    var txt = this.oText.value;
	retrieveTfgsCheck(txt,locale,advancedSearch);
}

//---------Additions to javascript found in cataloguePredictiveSearch.js -------------

function removeDefaultText(objField, defaultText){
	if (objField != null){
		var text = objField.value;
		if (text == defaultText){
			objField.value = "";
			objField.style.color = "#000000";
			objField.focus();
		}
	}
}

function addDefaultText(objField, defaultText){
	var searchTerm = document.getElementById('searchForm:searchTerm').value;
	if (objField != null){
		var text = objField.value
		if (trim(text) == ""){
			objField.value = defaultText;
			objField.style.color = "#c8c8c8";
		}
		if ((searchTerm) && (searchTerm != defaultText) && (objSearchTerm.value == searchTerm)){
			objField.value = searchTerm;			
			objField.style.color = "#000";
		}	
	}
}
function removeLastDelimitor(str){
	if (str != null) {
		str = str.replace ( /\|\|$/g, "" );// strip trailing ||		
		return str;
		}
}