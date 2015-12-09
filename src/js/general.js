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

	if($('.filled').length > 0){
		resizeContainerVideo()
	};

	var fullsize_video = $('.fullsize-video');

	if(fullsize_video.length > 0 && $('html.video').length > 0){
		var video = $(fullsize_video).find('video')

		if(video.length > 0){
			if(video.get(0).canPlayType){
				playVideo = function(){
					video.get(0).play();
					$('.fullsize-image').hide();
				};

				if(video.get(0).readyState >= video.get(0).HAVE_FUTURE_DATA){
					playVideo();
				}else{
					video.get(0).addEventListener('canplay', function(){
						return playVideo();
					}, false);
				};
			};
		};

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
					top: '-200%'
				},500);
				$(header).removeClass('mobile-white-header');
				$(icon_menu).removeClass('icon-close')
			}
		});
	};

	$('.fancybox-video').fancybox({
		maxWidth	: 856,
		maxHeight	: 480,
		helpers		:  {
        	//overlay : null
    	}
		//fitToView	: false,
		//autoSize	: false,
		//closeClick	: false,
		//openEffect	: 'none',
		//closeEffect	: 'none'
	});


	display_menu();
});