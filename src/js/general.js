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

	var validateEmail = function(email) {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	};

	
	$('#email').focusout(function(){
		if (!validateEmail($(this).val())){
			$(this).addClass('error');
      		$(this).siblings('span.error').show()
			$(this).val('');
		}
	});

	$('form.contact-form').bind('submit', function(e){
		var form = $(e.target).closest('form'),
			inputSelector = ['input[type=email]', 'input[type=text]',].join(', '),
			inputs = form.find('.required').find(inputSelector);

		$('.form-control').removeClass('error');

		inputs.each(function(i, el) {
    		var input = $(el);
    		if (input.val() === '') {
      			input.addClass('error');
      			input.siblings('span.error').show()
      			e.preventDefault(); 
    		}else {
    			input.siblings('span.error').hide()
    		}
  		});
	});

	var inputSelector = ['input[type=email]', 'input[type=text]', 'textarea'].join(', ');

	$('form.contact-form').find(inputSelector).each(function(i, el){
		var input = $(el);

		input.focus(function(){
			$(this).siblings('label.label').addClass('active');
		});

		input.blur(function(){
			if ($(this).val() <= 0){
				$(this).siblings('label.label').removeClass('active');
			}	
		});
	});

	$('form.contact-form').on('submit', function(){
		if($('.form-control.error').length !== 0){
			return false;
		}
	});

	display_menu();

	if($('.semi-filled').length > 0){
		$('.semi-filled').imagefill();
	};

	if($('.tab-faq').length > 0){
		/*$('.tab-faq').each(function(i, el) {
			$(el).accordion({
				header: '> div.faq-wrapper > h4',
				collapsible: true,
				//heightStyle: 'fill',
				activate: function(event, ui){
					console.log(event);
					console.log(ui);
				}
			});
		});*/
		$('.tab-faq').accordion({
			header: '> div.faq-wrapper > h5',
			collapsible: true,
			icons: {
				'header': 'fa fa-chevron-down fa-lg',
				'activeHeader': 'fa fa-chevron-up fa-lg'
			}
		});
	};

	if($('.tabs').length > 0){
		$('.tabs').tabs();
	};

	/*if($('.tabs a').length > 0){
		var links = $('.tabs a');
		var tabs = $('.tabs .tab-faq');

		$(tabs).hide();

		$.each(links, function(i, el){
			$(el).click(function(){
				$(tabs).hide();
				$(tabs[i]).show();
				console.log(i);
			});
		});
	};*/
});