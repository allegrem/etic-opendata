$(function(){
    $("[class$=texte]").hide();
    $("[class^=texteBulle]").hide();

    $("#cycle").load('img/cycle.svg',function(response){                 
        if(!response){
            // Error loading SVG!
            // Make absolutely sure you are running this on a web server or localhost!
        }
        $("[id^=bulle]").hide();
        $("#creation").mouseenter(function(e){mouseIn('creation')});
        $("#creation").mouseleave(function(e){mouseOut('creation')});
        $("#traitement").mouseenter(function(e){mouseIn('traitement')});
        $("#traitement").mouseleave(function(e){mouseOut('traitement')});
        $("#miseDispo").mouseenter(function(e){mouseIn('miseDispo')});
        $("#miseDispo").mouseleave(function(e){mouseOut('miseDispo')});
        $("#reutil").mouseenter(function(e){mouseIn('reutil')});
        $("#reutil").mouseleave(function(e){mouseOut('reutil')});

        $("#arrow1").mouseenter(function(e){mouseInArrow('1')});
        $("#arrow1").mouseleave(function(e){mouseOutArrow('1')});



        $("#arrow2").mouseenter(function(e){mouseInArrow('2')});
        $("#arrow2").mouseleave(function(e){mouseOutArrow('2')});
        $("#arrow3").mouseenter(function(e){mouseInArrow('3')});
        $("#arrow3").mouseleave(function(e){mouseOutArrow('3')});
    });
});
function mouseIn(idTag) {
    $("#"+idTag+"_ellipse").attr("fill","#ECF0F1");
    $("#"+idTag+"_ellipse").attr("stroke-width","3");
    $("#"+idTag+"_texte").attr("fill","#24AD5F");
    $("#texteDefault").stop().fadeTo(400,0, function() {$(this).hide()});
    $("."+idTag+"-texte").stop().show().fadeTo(400,1);
}
function mouseOut(idTag) {
    $("#"+idTag+"_ellipse").attr("fill","#24AD5F");
    $("#"+idTag+"_ellipse").attr("stroke-width","0");
    $("#"+idTag+"_texte").attr("fill","#ECF0F1");
    $("."+idTag+"-texte").stop().fadeTo(400,0, function() {$(this).hide()});
    $("#texteDefault").stop().show().fadeTo(400,1);
}
function mouseInArrow(id) {
    $("#bulle"+id).stop().show().fadeTo(400,1);
    $(".texteBulle"+id).stop().show().fadeTo(400,1);
}
function mouseOutArrow(id) {
    $("#bulle"+id).stop().fadeTo(400,0, function() {$(this).hide()});
    $(".texteBulle"+id).stop().fadeTo(400,0, function() {$(this).hide()});
}