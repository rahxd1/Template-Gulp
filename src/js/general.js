$(document).ready(function() {
	var getCustomSize = function(){
		var screen;
		screen = {
			width: $("body").width(),
			height: $(window).height()
		};
		return screen;
	};

	var resizeContainerVideo = function() {
		$('.filled').height(getCustomSize().height);
		$('.filled').imagefill();
	};

	$('main section:nth-child(2)').waypoint(function(direction){
		if(direction=="down"){
			$('#header').addClass('white-header');
		}else {
			$('#header').removeClass('white-header');
		}
	},{
	offset: '10px'
	});

	$(window).resize(function() {
		resizeContainerVideo();
	});

	if($('.filled').length != 0){
		resizeContainerVideo()
	};
});