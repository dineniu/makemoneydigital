$(".item-button button").on('click',function(){
  var minutos = parseInt($(this).parent().find('span').text().split(' ')[1].split(':')[0]);
  if(minutos){
    var segundos = minutos * 60;
    var constante = minutos * 60;
    var link = $(this).find("a");
    if(link.css('display') != 'none'){
	link.hide();
  	countdown(segundos,constante,$(this).parent().find('span').attr("id"), link);
    }
  }
});
function countdown(variavel, constante, span,link){
	if(variavel != 0){
		variavel--;
		var minuto = parseInt(variavel/60);
		minuto = minuto < 10 ? "0"+minuto: minuto;
		var segundo = variavel%60;
		segundo = segundo < 10 ? "0"+segundo: segundo;
		$("#"+span).html("Time: "+minuto+":"+segundo);
		setTimeout(function(){countdown(variavel, constante, span, link)}, 1000);
	}
	else{
		variavel = constante;
		$(link).show();
		$("#"+span).html("Time: "+(constante/60)+":00");
	}
}
