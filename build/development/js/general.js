$(document).ready(function(){var e=function(){var e;return e={width:$("body").width(),height:$(window).height()}},t=function(){var t=$(".filled");e().width<=480?$(t).height(.7*e().height):$(t).height(e().height),$(t).imagefill()};2*$(".secondarycontainer").css("top",$("#header").outerHeight()),$(".secondarycontainer").waypoint(function(e){"down"==e?$("#header").addClass("white-header"):$("#header").removeClass("white-header")},{offset:0}),$(window).resize(function(){t()}),$(".filled").length>0&&t();var a=$(".fullsize-video");if(a.length>0&&$("html.video").length>0&&$("html.no-touchevents").length>0){var n=$(a).find("video");n.length>0&&n.get(0).canPlayType&&(playVideo=function(){n.get(0).play(),$(".fullsize-image").hide()},n.get(0).readyState>=n.get(0).HAVE_FUTURE_DATA?playVideo():n.get(0).addEventListener("canplay",function(){return playVideo()},!1))}var o=function(){var e=1,t=$("#header"),i=$(".icon-menu"),a=function(){return $(t).outerHeight()};$(".btn-menu").click(function(){1==e?($(".header-menu").animate({top:a()},500),e=0,$(t).addClass("mobile-white-header"),$(i).addClass("icon-close")):(e=1,$(".header-menu").animate({top:"-200%"},500),$(t).removeClass("mobile-white-header"),$(i).removeClass("icon-close"))});var n=function(a){0==e&&(e=1,$(".header-menu").animate({top:"-200%"},500),$(t).removeClass("mobile-white-header"),$(i).removeClass("icon-close"))};$("main.content").on("click",function(e){n(e)}),$(".header-menu a").on("click",function(e){n(e)})};$(".fancybox-video").fancybox({maxWidth:856,maxHeight:480,helpers:{overlay:{css:{background:"rgba(#000, 0.75)"}}},tpl:{closeBtn:'<a class="fancybox-item fancybox-close" href="javascript:;"><span>CERRAR</span></a>'}});var s=function(e){var t=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return t.test(e)};$("#email").focusout(function(){s($(this).val())||($(this).addClass("error"),$(this).siblings("span.error").show(),$(this).val(""))}),$("form.contact-form").bind("submit",function(e){var t=$(e.target).closest("form"),i=["input[type=email]","input[type=text]"].join(", "),a=t.find(".required").find(i);$(".form-control").removeClass("error"),a.each(function(t,i){var a=$(i);""===a.val()?(a.addClass("error"),a.siblings("span.error").show(),e.preventDefault()):a.siblings("span.error").hide()})});var l=["input[type=email]","input[type=text]","textarea"].join(", ");$("form.contact-form").find(l).each(function(e,t){var i=$(t);i.focus(function(){$(this).siblings("label.label").addClass("active")}),i.blur(function(){$(this).val()<=0&&$(this).siblings("label.label").removeClass("active")})}),$("form.contact-form").on("submit",function(){if(0!==$(".form-control.error").length)return!1}),o(),$(".semi-filled").length>0&&$(".semi-filled").imagefill(),$(".tab-faq").length>0&&$(".tab-faq").accordion({header:"> div.faq-wrapper > h5",collapsible:!0,heightStyle:"content",icons:{header:"fa fa-chevron-down fa-lg",activeHeader:"fa fa-chevron-up fa-lg"}}),$(".tabs").length>0&&$(".tabs").tabs();var c=function(e,t){var i=$("#briefings article")[t],a=e.start.dateTime,n=moment(a).locale("es").format("h:mm A");$(i).find("h4").text(moment(a).locale("es").format("MMMM D")),$(i).find(".date-session").text(moment(a).locale("es").format("dddd, D MMMM")),$(i).find("span").text(n),$(i).find(".title-session").text(e.summary),$(i).find("input[name='session']").val(e.summary),$(i).find("input[name='date-time']").val(a)},r="6oq4se0o1t0v3fph89eniep6ls@group.calendar.google.com",f="AIzaSyAFuVaP5Q0xOYSSc2FWsVlYhwIk7mss5m8",h={showDeleted:!1,singleEvents:!0,maxResults:2,orderBy:"startTime",timeMin:moment($.now()).toISOString(),key:f},p="https://www.googleapis.com/calendar/v3/calendars/"+r+"/events";if($("#briefings").length>0&&$.get(p,h).done(function(e){var t=e.items;if(t.length>0)for(i=0;i<t.length;i++){var a=t[i];c(a,i)}else $(".no-briefings").show(),$("#briefings article").hide()}),window.location.href.match(/asistencia.html/)){var m=function(e){var t,i,a=decodeURIComponent(window.location.search.substring(1)),n=a.split("&");for(i=0;i<n.length;i++)if(t=n[i].split("="),t[0]===e)return void 0===t[1]||t[1]},d=$("article.session"),u=$(".contact-form"),g=m("date-time"),v=moment(g).locale("es").format("h:mm A"),b=m("session").replace(/[+]/g," ");$(".date h4").text(moment(g).locale("es").format("MMMM D")),$(d).find(".title-session").text(b),$(d).find(".date-session").text(moment(g).locale("es").format("dddd, D MMMM")),$(d).find("span").text(v),$(u).find("input[name='session']").val(b),$(u).find("input[name='date']").val(moment(g).locale("es").format("LL")),$(u).find("input[name='time']").val(v)}var y=function(e){var t=$(e).data("offering"),i=$("#select-specialty"),a=$(".school-wrapper");i.empty(),i.append("<option value=''>Elige la especialidad</option>"),a.empty(),$(".results-schools").hide(),$.getJSON("json/academic-offerings.json",function(e){var i=e[t].cities,a=Object.keys(i),n=$(".column-map a > span");n.parent().hide(),n.parent().removeClass("active"),$.each(n,function(e,t){$.inArray($(t).text(),a)>-1&&$(t).parent().show()}),$("#offering-type").text(e[t].name),$("#offering-summary").text(e[t].copy),$(".text-hide").hide()})},w=function(e){var t=$(e).children("span").text(),i=$("#nav-offering > ul > li > a.active").data("offering"),a=$("#select-specialty"),n=$(".school-wrapper");a.empty(),a.append("<option value=''>Elige la especialidad en "+t+"</option>"),n.empty(),$.getJSON("json/academic-offerings.json",function(e){var n=e[i].cities[t],o=Object.keys(n);$.each(o,function(e,t){var i=t.replace(/ /g,"_");a.append("<option value="+i+">"+t+"</option>")})})},x=function(e){var t=$("#nav-offering > ul > li > a.active").data("offering"),i=$(".column-map a.active").children("span").text(),a=$(e).val().replace(/_/g," "),n=$(".school-wrapper");n.empty(),$(".results-schools").show(),""!==a&&$.getJSON("json/academic-offerings.json",function(e){var o=e[t].cities[i][a];$.each(o,function(e,t){var i=$("<img>",{src:t.logo}),a="<p class='p-mobile'><span>"+t.name+"</span><br><span>"+t.web+"</span></p>",o=$("<a>",{"class":"school",href:"http://"+t.web,target:"_blank"});o.append(i),o.append(a),n.append(o)}),$(".text-hide").show(),$("#offering-city").text(i),$("#offering-specialty").text(a)})};if($("#nav-offering").length>0){var C=$("#nav-offering > ul > li > a");$(C).removeClass("active"),$(C).first().addClass("active"),$.each(C,function(e,t){$(t).click(function(){$(C).removeClass("active"),$(this).addClass("active"),y(this)})}),$(C).eq(0).trigger("click")}if($("#mobile-select-offering").change(function(){var e=$(this),t=e.val();""!==t&&$.getJSON("json/academic-offerings.json",function(e){var i=e[t],a=Object.keys(i.cities),n=$("#mobile-select-city"),o=$("#mobile-select-specialty"),s=$(".school-wrapper");n.empty(),n.append("<option value=''>Elige la ciudad que te interesa</option>"),o.empty(),o.append("<option value=''>Elige la especialidad</option>"),s.empty(),$(".results-schools").hide(),$.each(a,function(e,t){n.append("<option value="+t+">"+t+"</option>")}),$("#mobile-offering-type").text(i.name),$("#mobile-offering-summary").text(i.copy),$(".mobile-text-hide").hide()})}),$("#mobile-select-city").change(function(){var e=$("#mobile-select-offering").val(),t=$(this),i=t.val();""!==i&&$.getJSON("json/academic-offerings.json",function(t){var a=t[e].cities[i],n=Object.keys(a),o=$("#mobile-select-specialty");o.empty(),o.append("<option value=''>Elige la especialidad</option>");var s=$(".school-wrapper");s.empty(),$(".results-schools").hide(),$.each(n,function(e,t){var i=t.replace(/ /g,"_");o.append("<option value="+i+">"+t+"</option>")}),$("#mobile-offering-city").text(i),$(".mobile-text-hide").hide()})}),$("#mobile-select-specialty").change(function(){var e=$("#mobile-select-offering").val(),t=$("#mobile-select-city").val(),i=$(this),a=i.val().replace(/_/g," ");""!==a&&$.getJSON("json/academic-offerings.json",function(i){var n=i[e].cities[t][a],o=$(".school-wrapper");o.empty(),$.each(n,function(e,t){var i=$("<img>",{src:t.logo}),a="<p class='p-mobile'><span>"+t.name+"</span><br><span>"+t.web+"</span></p>",n=$("<a>",{"class":"school",href:"http://"+t.web,target:"_blank"});n.append(i),n.append(a),o.append(n)}),$(".mobile-text-hide").show(),$("#mobile-offering-city").text(t),$("#mobile-offering-specialty").text(a),$(".results-schools").show()})}),$("#select-specialty").change(function(){x(this)}),$(".column-map a").length>0){var k=$(".column-map a");$(k).removeClass("active"),$.each(k,function(e,t){$(t).click(function(){$(k).removeClass("active"),$(this).addClass("active"),w(t),$(".text-hide").hide(),$("#offering-specialty").text(""),$(".results-schools").hide()})})}$(function(){$("a[href*=#]:not([href=#])").click(function(e){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=$(this.hash);if(t=t.length?t:$("[name="+this.hash.slice(1)+"]"),t.length)return $("html,body").animate({scrollTop:t.offset().top-$("#header").outerHeight()},1e3),!1}}),window.location.href.match(/preguntas.html/)&&window.setTimeout(function(){$(window).scrollTop(0)},0),$("#slider").owlCarousel({center:!0,loop:!0,autoplay:!0,responsiveRefreshRate:100,responsiveClass:!0,responsive:{960:{items:3},640:{items:2},0:{items:1}}}),$("#session-interested").click(function(e){$(".contact-form #session-name").val("Interesado en sesion")})}),$("a.redirect").click(function(e){$.fancybox.close(),e.preventDefault(),parent.document.location.href="macewan.html"}),$(".lights").fancybox({maxWidth:800,maxHeight:600,fitToView:!1,width:"70%",height:"460px",autoSize:!1,closeClick:!1,openEffect:"none",closeEffect:"none"}).trigger("click")});