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

	var display_cities = function(element){
		var key = $(element).data('offering');

		var select_specialty = $('#select-specialty');
		var school_wrapper = $('.school-wrapper');

		select_specialty.empty();
		select_specialty.append("<option value=''>Elige la especialidad</option>");

		school_wrapper.empty();

		$('.results-schools').hide();

		$.getJSON("json/academic-offerings.json", function(data){
			var vals_cities = data[key].cities;
			var cities = Object.keys(vals_cities);

			var spans = $('.column-map a > span');
			spans.parent().hide();

			$.each(spans, function(index, span){
				
				if ($.inArray($(span).text(), cities) > -1){
					$(span).parent().show();
				};
			});

			$('#offering-type').text(data[key].name);
			$('#offering-summary').text(data[key].copy);
			$('.text-hide').hide();
		});	
	};

	var display_specialties = function(element){
		var key_city = $(element).children('span').text();
		var key_offering = $('#nav-offering > ul > li > a.active').data('offering');
		var select_specialty = $('#select-specialty');
		var school_wrapper = $('.school-wrapper');

		select_specialty.empty();
		select_specialty.append("<option value=''>Elige la especialidad</option>");

		school_wrapper.empty();

		$.getJSON("json/academic-offerings.json", function(data){	
			var val_specialties = data[key_offering].cities[key_city];
			var specialties = Object.keys(val_specialties);

			$.each(specialties, function(index, value){
				var i = value.replace(/ /g, '_');
				select_specialty.append("<option value=" + i  + ">" + value + "</option>");
			});
		});
	};

	var display_schools = function(element){
		var key_offering = $('#nav-offering > ul > li > a.active').data('offering');
		var key_city = $('.column-map a.active').children('span').text();
		var key_specialty = $(element).val().replace(/_/g, ' ');

		var school_wrapper = $('.school-wrapper');
		school_wrapper.empty();
		$('.results-schools').show();

		if(key_specialty !== '') {
			$.getJSON("json/academic-offerings.json", function(data){
				var val_schools = data[key_offering].cities[key_city][key_specialty];

				$.each(val_schools, function(index, value){
	
					var img = $('<img>', {src: value.logo})
					var p = "<p class='p-mobile'><span>" + value.name + "</span><br><span>" + value.web + "</span></p>"

					var a = $('<a>', {class: 'school', href: value.web});

					a.append(img);
					a.append(p);

					school_wrapper.append(a);
				});

				$('.text-hide').show();
				$('#offering-city').text(key_city);
				$('#offering-specialty').text(key_specialty);
			});
		};
	};


	if($('#nav-offering').length > 0){
		var nav_links = $('#nav-offering > ul > li > a');
		$(nav_links).removeClass('active');
		$(nav_links).first().addClass('active');

		$.each(nav_links, function(i, el){
			$(el).click(function(){
				$(nav_links).removeClass('active');
				$(this).addClass('active');
				display_cities(this);
			});
		});

		$(nav_links).eq(0).trigger('click');
	};

	$('#mobile-select-offering').change(function(){
		var dropdown = $(this);
		var key = dropdown.val();

		if(key !== '') {
			$.getJSON("json/academic-offerings.json", function(data){	
				var vals = data[key];
				var cities = Object.keys(vals.cities);

				var select_city = $('#mobile-select-city');
				var select_specialty = $('#mobile-select-specialty');
				var school_wrapper = $('.school-wrapper');

				select_city.empty();
				select_city.append("<option value=''>Elige la ciudad que te interesa</option>");

				select_specialty.empty();
				select_specialty.append("<option value=''>Elige la especialidad</option>");

				school_wrapper.empty();

				$('.results-schools').hide();

				$.each(cities, function(index, value){
					select_city.append("<option value=" + value + ">" + value + "</option>");
				});

				$('#mobile-offering-type').text(vals.name);
				$('#mobile-offering-summary').text(vals.copy);
				$('.mobile-text-hide').hide();
			});
		}
	});

	$('#mobile-select-city').change(function(){
		var key_offering = $('#mobile-select-offering').val();
		var dropdown_city = $(this);
		var key_city = dropdown_city.val();

		if(key_city !== '') {
			$.getJSON("json/academic-offerings.json", function(data){	
				var val_specialties = data[key_offering].cities[key_city];
				var specialties = Object.keys(val_specialties);
			
				var select_specialty = $('#mobile-select-specialty');

				select_specialty.empty();
				select_specialty.append("<option value=''>Elige la especialidad</option>");

				var school_wrapper = $('.school-wrapper');
				school_wrapper.empty();

				$('.results-schools').hide();

				$.each(specialties, function(index, value){
					var i = value.replace(/ /g, '_');
					select_specialty.append("<option value=" + i  + ">" + value + "</option>");
				});
				$('#mobile-offering-city').text(key_city);
				$('.mobile-text-hide').hide();
			});
		}
	});

	$('#mobile-select-specialty').change(function(){
		var key_offering = $('#mobile-select-offering').val();
		var key_city = $('#mobile-select-city').val();
		var dropdown_specialty = $(this);
		var key_specialty = dropdown_specialty.val().replace(/_/g, ' ');		

		if(key_specialty !== '') {
			$.getJSON("json/academic-offerings.json", function(data){
				var val_schools = data[key_offering].cities[key_city][key_specialty];

				var school_wrapper = $('.school-wrapper');
				school_wrapper.empty();
				
				$.each(val_schools, function(index, value){
	
					var img = $('<img>', {src: value.logo})
					var p = "<p class='p-mobile'><span>" + value.name + "</span><br><span>" + value.web + "</span></p>"

					var a = $('<a>', {class: 'school', href: value.web});

					a.append(img);
					a.append(p);

					school_wrapper.append(a);
				});
				$('.mobile-text-hide').show();
				$('#mobile-offering-city').text(key_city);
				$('#mobile-offering-specialty').text(key_specialty);

				$('.results-schools').show();
			});
		}
	});


	$('#select-specialty').change(function(){
		display_schools(this);
	});

	if($('.column-map a').length > 0){
		var cities_links = $('.column-map a');
		$(cities_links).removeClass('active');

		$.each(cities_links, function(i, el){
			$(el).click(function(){
				$(cities_links).removeClass('active');
				$(this).addClass('active');
				display_specialties(el);
			});
		});
	};

});