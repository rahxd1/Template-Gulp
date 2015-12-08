$(document).ready(function() {
	var getCustomSize = function(){
		var screen;
		screen = {
			width: $("body").width(),
			height: $(window).height()
		};
		return screen;
	};

	var resizeContainerVideo = function(){
		var filled = $('.filled');

		if(getCustomSize().width <= 480){
			$(filled).height((getCustomSize().height * .7));
		}else{
			$(filled).height(getCustomSize().height);
		}
		$(filled).imagefill();
	};

	$('main section:nth-child(2)').waypoint(function(direction){
		if(direction=="down"){
			$('#header').addClass('white-header');
		}else {
			$('#header').removeClass('white-header');
		}
	},{
	offset: '40px'
	});

	$(window).resize(function() {
		resizeContainerVideo();
	});

	if($('.filled').length != 0){
		resizeContainerVideo()
	};

	
	var display_menu= function(){

		var count = 1;
		var header = $('#header')
		var icon_menu = $('.icon-menu')

		var getSizeHeader = function(){
			return $(header).outerHeight();
		};

		$('.btn-menu').click(function(){
			if(count==1){
				$('.header-menu').animate({
					top: getSizeHeader()
				},500);
				count= 0;
				$(header).addClass('mobile-white-header');
				$(icon_menu).addClass('icon-close')
			}else {
				count=1
				$('.header-menu').animate({
					top: '-100%'
				},500);
				$(header).removeClass('mobile-white-header');
				$(icon_menu).removeClass('icon-close')
			}
		});
	};

	display_menu();
});