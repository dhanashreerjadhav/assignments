$(document).ready(function() {
$(function(){
  $('#showPhoneNav').click(function() {
    $("#myNav").animate('slow').slideToggle('normal',function(){ //Shows Nav area
	if ($('#myNav').is(':visible')) {
		$('#showPhoneNav').text('Hide Navigation');
	} else {
		$('#showPhoneNav').text('Show Navigation');
	} //end of if
	}); //end of slidetoggle
  }); //end of myNav
}); //end showPhoneNav
}); //end of ready