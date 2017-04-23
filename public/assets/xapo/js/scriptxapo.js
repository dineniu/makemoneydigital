var moon = 5*60;
var map = {};
$('#btnMoonBitcoin').on('click', function(){
	//if(moon == 5*60)
	//	countdown(moon, 5*60, '#spnMoonBitcoin');
});

$(".item-button button").on('click',function(){
  var minutos = parseInt($(this).parent().find('span').text().split(' ')[1].split(':')[0]);
  if(minutos){
    var segundos = minutos * 60;
    var constante = minutos * 60;
    //minutos $(this).parent().find('span').attr("id")
    countdown(segundos,constante,$(this).parent().find('span').attr("id"));
  }
});
function countdown(variavel, constante, span){
	if(variavel != 0){
		variavel--;
		var minuto = parseInt(variavel/60);
		minuto = minuto < 10 ? "0"+minuto: minuto;
		var segundo = variavel%60;
		segundo = segundo < 10 ? "0"+segundo: segundo;
		$("#"+span).html("Time: "+minuto+":"+segundo);
		setTimeout(function(){countdown(variavel, constante, span)}, 1000);
	}
	else{
		variavel = constante;
	}
}
