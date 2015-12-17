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

		$('.tab-faq').accordion({
			header: '> div.faq-wrapper > h5',
			collapsible: true,
			heightStyle: 'content',
			icons: {
				'header': 'fa fa-chevron-down fa-lg',
				'activeHeader': 'fa fa-chevron-up fa-lg'
			}
		});
	};

	if($('.tabs').length > 0){
		$('.tabs').tabs();
	};

	var appendPre = function(event, i) {
		var article = $('#briefings article')[i];
		var date_start = event.start.dateTime;
		var time = moment(date_start).locale('es').format('h:mm A');

		$(article).find('h4').text(moment(date_start).locale('es').format('MMMM D'));
		$(article).find('.date-session').text(moment(date_start).locale('es').format('dddd, D MMMM'));
		$(article).find('span').text(time);
		$(article).find('.title-session').text(event.summary);

		$(article).find("input[name='session']").val(event.summary);
		$(article).find("input[name='date-time']").val(date_start);
	};

	var CLIENT_ID = 'masfusion.com_ofv9265ptel5qos53g94l81cc4%40group.calendar.google.com';
	var API_KEY = 'AIzaSyAMt0isNUcgJnjslrmsYRXHgdPnkHC58uA';
	var options = {
		'showDeleted': false,
		'singleEvents': true,
		'maxResults': 2,
		'orderBy': 'updated',
		'key': API_KEY
	};

	var url = 'https://www.googleapis.com/calendar/v3/calendars/'+CLIENT_ID+'/events';

	
	if($('#briefings').length > 0){
		$.get(url ,options)
			.done(function(data){
				var events = data.items;

				if (events.length > 0) {
					for (i = 0; i < events.length; i++) {
						var event = events[i];
						appendPre(event, i)
					}
				} else {
					$('.no-briefings').show();
					$('#briefings article').hide();
				}
		});
	};

	if (window.location.href.match(/asistencia.html/)) {
		var getUrlParameter = function getUrlParameter(sParam) {
			var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

			for (i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split('=');
				if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined ? true : sParameterName[1];
				}
			}
		};

		var session = $('article.session');
		var form = $('.contact-form');
		var date_start = getUrlParameter('date-time');
		var time = moment(date_start).locale('es').format('h:mm A');
		var summary = getUrlParameter('session').replace(/[+]/g, ' ');

		$('.date h4').text(moment(date_start).locale('es').format('MMMM D'));
		$(session).find('.title-session').text(summary);
		$(session).find('.date-session').text(moment(date_start).locale('es').format('dddd, D MMMM'));
		$(session).find('span').text(time);

		$(form).find("input[name='session']").val(summary);
		$(form).find("input[name='date']").val(moment(date_start).locale('es').format('LL'));
		$(form).find("input[name='time']").val(time);
	};
	

	if($('#nav-offering').length > 0){
		var links = $('#nav-offering > ul > li > a');
		$(links).removeClass('active');
		$(links).first().addClass('active');

		$.each(links, function(i, el){
			$(el).click(function(){
				$(links).removeClass('active');
				$(this).addClass('active');
			});
		});
	};
});