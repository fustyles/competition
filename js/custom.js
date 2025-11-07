var lang = location.search.toLowerCase();
if (lang.indexOf("lang=en")!=-1)
	lang = "en";
else if (lang.indexOf("lang=zh-hans")!=-1)
	lang = "zh-hans";
else if (lang.indexOf("lang=zh-hant")!=-1)
	lang = "zh-hant";	
else 
	lang = "zh-hant";  //en, zh-hans, zh-hant
document.write("\<script src='./msg/"+lang+".js'\>\<\/script>");

var block_script = ["competition"];
for (var i=0;i<block_script.length;i++) {
  document.write("\<script src='./customBlocks/"+block_script[i]+"/blocks.js'\>\<\/script>");
  document.write("\<script src='./customBlocks/"+block_script[i]+"/javascript.js'\>\<\/script>");
  document.write("\<script src='./customBlocks/"+block_script[i]+"/toolbox.js'\>\<\/script>");
  document.write("\<script src='./customBlocks/"+block_script[i]+"/"+lang+".js'\>\<\/script>");
}	

document.write("\<script src='./customBlocks/gemini/gemini.js'\>\<\/script>");
document.write("\<script src='./customBlocks/spreadsheetSQL/spreadsheetsql.js'\>\<\/script>");