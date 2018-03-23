$("#sub").click(function(){
	var data =$("#register:input").serializeArray();
$.post($("#register").attr("action")),data,function(info){$("#result").ejs(info);});
});
$("#register").submit(function(){
	return false''
});
