/*
@license
Copyright 2025 Taiwan (ChungYi Fu)

@author https://www.facebook.com/francefu/
@Update 6/4/2025 00:00 (Taiwan Standard Time)
*/

var mainPath = 'https://fustyles.github.io/webduino/SpBlocklyJS/';
var showCode = false;
var myTimer;
var myTimer1;
var category;
var categoryBlocks = [];
var categoryExpand = [];

document.addEventListener('DOMContentLoaded', function() {
	
	function getScript(output) {
		if (output)
			var jsPath = mainPath;
		else
			var jsPath = '';
		
		var script = "<link rel='stylesheet' href='"+jsPath+"css/icon_custom.css' />";
		
		var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace(), true);
		xml = Blockly.Xml.domToPrettyText(xml);
		
		return script;
	}		
	
	//載入積木目錄
	category = [
		catSystem
	];
	
	//My Search
	function updateCategoryBlocks(newCategory) {
		categoryBlocks = [];
		for (var i=0;i<newCategory.length;i++){
			var categoryString = newCategory[i].replace(/(?:\r\n|\r|\n|\t)/g, "");
			var xml = new DOMParser().parseFromString(categoryString,"text/xml");
			searchCategoryBlocks(xml.firstChild.childNodes);
		}
		//console.log(categoryBlocks);
	}
	function searchCategoryBlocks(nodes) {
		if (nodes.length>0) {
			for (var j=0;j<nodes.length;j++){
				if (nodes[j].nodeName=="category")
					searchCategoryBlocks(nodes[j].childNodes);
				else if (nodes[j].nodeName=="block")
					categoryBlocks.push(new XMLSerializer().serializeToString(nodes[j]));
			}
		}
	}
	updateCategoryBlocks(category);
	
	
	setTimeout(function(){
		
		var xmlToolbox='<xml id="toolbox">';
		try {
			for (var i=0;i<category.length;i++){
				category[i] = category[i].replace(/\<category /g, "<category expanded=\"false\" ");
				//console.log(category[i]);
				var xml = new DOMParser().parseFromString(category[i],"text/xml");
				xmlToolbox+=new XMLSerializer().serializeToString(xml.firstChild).replace("<xml>","").replace("</xml>","");
			}
		} catch (error) {
			console.log(error);
		}		
		xmlToolbox+='</xml>';

		//初始化工作區	
		const workspace = Blockly.inject('root',{
				media: 'media/'
				,toolbox: xmlToolbox
				,grid:{spacing: 20,length: 3,colour: '#eee',snap: true}
				,zoom:{controls: true, wheel: false, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2}
				,trashcan: true
				,move:{
					scrollbars: {
					  horizontal: true,
					  vertical: true
					},
					drag: true,
					wheel: true
				}			
			}
		);
		
		updateMsg();
		newFile();
		
		//Double Click關閉彈出積木選單
		var blocklyWorkspace = document.getElementsByClassName("blocklyFlyout");
		for (var f=0;f<blocklyWorkspace.length;f++) {
			blocklyWorkspace[f].addEventListener('dblclick', function(){ 
				Blockly.hideChaff();
			});
		}
	
	}, 1000);	

	//新增自訂積木js檔
	function addScript(url) {
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = location.href.substr(0, location.href.lastIndexOf("/"))+"/"+url;
		$("body").append(s);
	}

	//檢查目錄是否已存在工具箱
	function checkCategoryExist(child) {
		for (var i=1;i<customCategory.length;i++) {
			if (child==customCategory[i][2])
				customCategory.splice(i, 1);
		}
	}	
	
	//程式碼區塊拖曳與調整大小功能	
	$(function() {
		$( "#javascript_content" ).draggable();
		$( "#javascript_content" ).resizable();
		$( "#run_content" ).draggable();
		$( "#run_content" ).resizable();		
	});	
	
	//新增初始化積木
	function newFile() {
		var xmlDoc = Blockly.utils.xml.textToDom('<xml></xml>');
		Blockly.getMainWorkspace().clear();
		Blockly.Xml.domToWorkspace(xmlDoc, Blockly.getMainWorkspace());
		resetOutput();
	}
	
	function resetOutput() {
		try {
			var iframe = document.getElementById("iframe_output");
			iframe.contentWindow.document.open();
			iframe.contentWindow.document.write("");
			iframe.contentWindow.document.close();
			document.getElementById("iframe_output").focus();
		} catch (e) {
			//alert(e);
		}
	}
	
	//程式碼區塊顯示
	document.getElementById('button_code').onclick = function () {
		var div = document.getElementById('javascript_content');
		if (div.style.display == "none") {
			div.style.display = "block";
			showCode = true;
		}
		else {
			div.style.display = "none";
			showCode = false;
		}
	}
	
	//重設工作區
	document.getElementById('button_reset').onclick = function () {
		var result = confirm(Blockly.Msg.BUTTON_RESET);
		if (result) {
			newFile();
			resetOutput();
		}
	}

	//匯出工作區積木與原始檔
	document.getElementById('button_save_xml').onclick = function () {
		try {
			var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
			var xmlText = Blockly.Xml.domToText(xml);

			var link = document.createElement('a');
			link.download="project.xml";
			link.href="data:application/octet-stream;utf-8," + encodeURIComponent(xmlText);
			document.body.appendChild(link);
			link.click();
			link.remove();				
		} catch (e) {
			alert(e);
		}
	}
	
	var output_result = "";
	
	var GeminiKey = 'U2FsdGVkX1/QCbfZGgM4jikc7e72LweTWjOEW4GY5ofILt6eG56zT2wo9JHmlkdrR8L7opwW5dGyvOh62E3DqA==';
	gemini_chat_initial((CryptoJS.AES.decrypt(GeminiKey, 'test').toString(CryptoJS.enc.Utf8)), "gemini-2.5-flash", 10000, 0, '你是繁體中文的程式設計助理，請回覆有關Blockly積木程式試題的問題。');

	async function gemini_chat_response(gemini_chat_data) {
		var iframeElement = document.getElementById('iframe_output');
		const iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;
		iframeDocument.body.insertAdjacentHTML("beforeend", "<br><br>Gemini：<br>"+gemini_chat_response_br(gemini_chat_data.replace(/\*\*/g,""), 'br'));
		//iframeDocument.body.scrollTop = iframeDocument.body.scrollHeight;
		//iframeDocument.documentElement.scrollTop = iframeDocument.documentElement.scrollHeight;
	}
	window.gemini_chat_response = gemini_chat_response;
	
	document.getElementById('gemini_ask').onclick = async function () {
		if (!document.getElementById("question_input").value.trim()) return;
		var iframeElement = document.getElementById('iframe_output');
		const iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;
		
		//if (output_result=="") {
		//	output_result = iframeDocument.body.innerHTML;
		//} else {
			iframeElement.contentWindow.document.open();
			iframeElement.contentWindow.document.write("");
			iframeElement.contentWindow.document.close();
			iframeElement.focus();
			iframeDocument.body.insertAdjacentHTML("beforeend", output_result);
		//}	
		
		var code = "使用者尚未作答，沒有產生程式碼！";
		if (Blockly.getMainWorkspace().getAllBlocks().length>0)
			code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
		
		var prompt = "你是一位國中三年級的資優生名字是小鳳，請以國中三年級的學生口吻來回答。請協助撰寫程式邏輯思考與流程的簡潔說明，若使用者已寫下積木程式則對可能不符合試題要求或有隱憂的部分做表面陳述，但不提程式碼細節。回覆內容不要提及JavaScript程式碼內容，因為程式碼來源為積木程式轉換而來，國中、小學生看不懂程式碼內指令或函式的名稱，禁止使用Markdown語法。\n\n積木程式試題：\n"+
		document.getElementById("question_input").value+
		"\n\n積木程式產出的程式碼：\n"+code;
		await gemini_chat_run(prompt);
	}
	
	if (!navigator.onLine) document.getElementById('gemini_ask').style.display = "none"; 	
	
	//執行程式
	function runCode() {
	  var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
	
	  var iframe_code="\<!DOCTYPE html\>\<html\>\<head\>\<meta charset='utf-8'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Headers' content='Origin, X-Requested-With, Content-Type, Accept'\>\<meta http-equiv='Access-Control-Allow-Methods' content='GET,POST,PUT,DELETE,OPTIONS'\>\<meta http-equiv='Access-Control-Allow-Origin' content='*'\>\<meta http-equiv='Access-Control-Allow-Credentials' content='true'\>\<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js'\>\<\/script\>";
	  
	  iframe_code += getScript(0);
		
	  iframe_code += "\<\/head\>\<body\>\<script\>"+js_beautify("const delay=(seconds)=>{return new Promise((resolve)=>{setTimeout(resolve,seconds*1000);});};const main=async()=>{"+code+"};main();")+"\<\/script\>\<\/body\>\<\/html\>";
	  
	  //console.log(iframe_code);
	  output_result = "";
	  
	  try {
		var iframe = document.getElementById("iframe_output");
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(iframe_code);
		iframe.contentWindow.document.close();
		iframe.focus();
	  } catch (e) {
		alert(e);
	  }
	}
	
	//停止程式
	function stopCode() {
	  document.getElementById("iframe_output").src = "about:blank";
	}		
	
	//開啟程式碼執行視窗
	document.getElementById('button_run').onclick = function () {
		document.getElementById('iframe_output').innerHTML = "";
		stopCode();
		setTimeout(function(){
			runCode();
		}, 100);	
	}	
	
	//更新首頁語系文字
	function updateMsg() {
		if (typeof msg != "undefined") {
			for (var i=0;i<msg.length;i++) {
				if (msg[i][1]=="innerHTML") {
					if (document.getElementById(msg[i][0]))
						document.getElementById(msg[i][0]).innerHTML=msg[i][2];
				}
				else if (msg[i][1]=="title") {
					if (document.getElementById(msg[i][0]))
						document.getElementById(msg[i][0]).title=msg[i][2];
				}				
			}
		}
	}		
	
	//複製程式碼到剪貼簿
	document.getElementById('button_copycode').onclick = function () {
		var iframeElement = document.getElementById('iframe_output');
		const iframeDocument = iframeElement.contentDocument || iframeElement.contentWindow.document;
		navigator.clipboard.writeText(iframeDocument.body.innerText.trim()).then(function() {
			alert(Blockly.Msg.COPY_CLIPBOARD);
		}, function(err) {
			console.error(err);
		});
	}
	
	//匯入備份積木檔
	document.getElementById('button_open_xml').onclick = function () {
		var e = document.getElementById("importBlocks");
		if (e) {
			e.parentElement.removeChild(e);
		}
		
		var input=document.createElement('input');
		input.type="file";
		input.id="importBlocks";
		input.style.display = "none";
		input.accept=".xml";
		input.onchange = function(element) {
			try {	
				var file = this.files[0];
				if (file) {
					var fr = new FileReader();           
					fr.onload = function (event) {
						Blockly.getMainWorkspace().clear();
						var blocks = Blockly.utils.xml.textToDom(event.target.result);
						Blockly.Xml.domToWorkspace(blocks, Blockly.getMainWorkspace());
						javascriptCode();
						resetOutput();
					};
					fr.readAsText(file);
				}
			} catch (e) {
				alert(e);
			}	  
		}

		document.body.appendChild(input);
		setTimeout(function(){
			input.click();
		},500);
	}	
	
	//切換語言
	document.getElementById('lang-selector').onchange = function () {
		if (this.selectedIndex>0) 
			location.href = "?lang=" + this.options[this.selectedIndex].value;
	}
});	

//切換頁籤
var tabs = ['code_content','xml_content','category_content'];
function displayTab(id) {
	for (var i in tabs) {
		const tab = document.getElementById(tabs[i]);
		tab.style.display = (tabs[i]==id)?"block":"none";
		if (id=='code_content') 
			javascriptCode();
		else if (id=='xml_content') 
			xmlCode();
	}
}

//JavaScript原始碼顯示
function javascriptCode() {
	var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
	code = js_beautify("const delay=(seconds)=>{return new Promise((resolve)=>{setTimeout(resolve,seconds*1000);});};const main=async()=>{\n"+code+"};main();");
	document.getElementById('code_content').innerHTML = code.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/ /g,"&nbsp;");
}

//XML原始碼顯示
function xmlCode() {
	var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace(), true);
	var code = Blockly.Xml.domToPrettyText(xml);
	document.getElementById('xml_content').innerHTML = code.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>").replace(/ /g,"&nbsp;");
}

//視窗最上層顯示
var contents = ['javascript_content'];
function textareaFocus(id) {
	for (var i in contents) {
		const content = document.getElementById(contents[i]);
		content.style.zIndex = (contents[i]==id)?"99":"98";
	}
}

//縮放視窗
function contentZoom(content) {
	const div_title = document.getElementById(content+"_title");
	const div_content = document.getElementById(content+"_content");
	const div_code = document.getElementById(content+"_code");
	if (div_content.style.height!= "40px") {
		div_content.w = div_content.style.width;
		div_content.h = div_content.style.height;
		div_content.l = div_content.style.left;
		div_content.t = div_content.style.top;
		
		div_content.style.width = "calc(20vw)";
		div_content.style.height = "40px";
		div_code.style.display = "none";

		if (content=="javascript") {
			div_content.style.left = "calc(98% - 20vw)";
			div_content.style.top = "64px";
			showCode = false;
		}
	}
	else {
		div_content.style.width = div_content.w;
		div_content.style.height = div_content.h;
		div_code.style.display = "block";
		
		if (content=="javascript") {
			div_content.style.left = div_content.l;	
			div_content.style.top = div_content.t;
			
			var code = Blockly.JavaScript.workspaceToCode();			
			editor.setValue(code);			
			showCode = true;
		}			
	}
}

if (typeof require !== "undefined") {
	var http = require('http');
	var fs = require('fs');
	var path = require('path');

	http.createServer(function (request, response) {
		//console.log('request ', request.url.split("?")[0]);

		var filePath = './package.nw' + request.url.split("?")[0];
		if (filePath == './package.nw/') {
			filePath = './package.nw/main.html'
		}

		var extname = String(path.extname(filePath)).toLowerCase();
		var mimeTypes = {
			'.html': 'text/html',
			'.js': 'text/javascript',
			'.css': 'text/css',
			'.json': 'application/json',
			'.png': 'image/png',
			'.jpg': 'image/jpg',
			'.gif': 'image/gif',
			'.svg': 'image/svg+xml',
			'.wav': 'audio/wav',
			'.mp4': 'video/mp4',
			'.woff': 'application/font-woff',
			'.ttf': 'application/font-ttf',
			'.eot': 'application/vnd.ms-fontobject',
			'.otf': 'application/font-otf',
			'.wasm': 'application/wasm'
		};

		var contentType = mimeTypes[extname] || 'application/octet-stream';

		fs.readFile(filePath, function(error, content) {
			if (error) {
				if(error.code == 'ENOENT') {
					fs.readFile('./404.html', function(error, content) {
						response.writeHead(404, { 'Content-Type': 'text/html' });
						response.end(content, 'utf-8');
					});
				}
				else {
					response.writeHead(500);
					response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
				}
			}
			else {
				response.writeHead(200, { 'Content-Type': contentType });
				response.end(content, 'utf-8');
			}
		});

	}).listen(3000);

	// Server: http://127.0.0.1:3000
}
