//Using jquery to add image and then move the boxes to solve my puzzle
$(document).ready(function(){
var endsquare = 16;
var zindex = 1;
$.fn.extend({ puzzle:
function(square_size) {
	var puz_size = (square_size*4) + 'px'; //Calculating total height and width of the puzzle
	var findId = '#' + $(this).attr('id'); //finding id of the div where the puzzle will be placed.
	$(findId).html('<div id="puz_board"></div>');//Adding the div puz_board inside findId.
	$('#puz_board').css({height:puz_size,width:puz_size,border:'1px solid black',position:'absolute'}); //Adding style to puz_board
	//Adding all 16 blocks in the board.
	for( var i=0;i<16;i++)
	{
		$('#puz_board').append("<div style='left:" +((i % 4) * square_size)+"px;top:"+Math.floor(i/ 4)*square_size+"px;width:"+square_size+"px;height:"+square_size + "px; background-position: " + (-(i % 4) * square_size) + "px " + -Math.floor(i / 4) * square_size + "px '></div>");
	}
	//since one box should be empty to play puzzle,the last div box should be white
    $('#puz_board').children("div:nth-child("+endsquare+")").css("background","#fff");
	//Adding the moving functionality
      $('#puz_board').children('div').click(function() {
				Move(this, square_size);
		   });
}
});
		   function Move(clicked_but,sq_size)
		   {   var movable= false;
			   var oldx = $("#puz_board").children("div:nth-child("+endsquare+")").css('left');
			   var oldy = $("#puz_board").children("div:nth-child("+endsquare+")").css('top');
			   var newx= $(clicked_but).css('left');
			   var newy = $(clicked_but).css('top');
			   //if clicked_but is in top of whitesquare
			   if(oldx==newx && newy == (parseInt(oldy)-sq_size)+'px')
				   movable=true;
			   //if clicked_but is in left of whitesquare
			  else if(newx == (parseInt(oldx)-sq_size)+'px' && oldy == newy)
				   movable=true;
			  //if clicked_but is in bottom of the empty square
              else if (oldx == newx && newy == (parseInt(oldy)+160)+'px')
              movable=true;
		      // if clicked square is in right of the empty square
		     else if(oldy == newy && newx == (parseInt(oldx)+160)+'px')
			 movable=true;
		     if(movable)
			   {
				   $(clicked_but).css("z-index",zindex++);
				   $(clicked_but).animate({left:oldx,top:oldy},200,function(){
					  $("#puz_board").children("div:nth-child("+endsquare+")").css({left:newx,top:newy});
				   });
			   }
}
$("#main_bg").puzzle("160");
});