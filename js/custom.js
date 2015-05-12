/*

Template Name: Framer
Template Demo: http://awerest.com/demo/framer
Purchase: http://themeforest.net/user/awerest/portfolio?ref=awerest
Author: Awerest
Author website: http://awerest.com
Tags: Responsive, Framework, Components, Mobile First, Retina, Bootstrap 3, One Page, Multi Page, Multi-Purpose, Agency, Clean, Creative, Minimal,
Photography, Portfolio, Business, Corporate, White, Modern, Blog, Fullscreen, Parallax

Version: 1.0

---------------

Table of Contents:

01) Fix for Internet Explorer 10 in Windows 8 and Windows Phone 8
02) Animated elements
03) Sliders
04) Carousels
05) Section height
06) Contact form
07) Gallery lightbox
08) Google map
09) Preloader
10) Collapse menu on click on mobile and tablet devices
11) Smooth scroll on anchors
12) Viewport animations
13) Video background
14) SVG FTW
15) Random number counter
16) Video play on hover
17) Instagram feed
18) Dribbble feed
19) Floating sidebar

---------------

*/

$(document).ready(function() {
	'use strict';

/* ==== 01) Fix for Internet Explorer 10 in Windows 8 and Windows Phone 8 ==== */

	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style")
		msViewportStyle.appendChild(
			document.createTextNode(
				"@-ms-viewport{width:auto!important}"
			)
		)
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
	}

/* ==== 02) Animated elements ==== */

	imagesLoaded(document.body, function(){
		if ($('.no-touch').length) {
			skrollr.init({
				smoothScrolling: false,
				forceHeight: false
			});
		}
	});

/* ==== 03) Sliders ==== */

		var $frame  = $('#frame');
		var $slidee = $frame.children('ul').eq(0);
		var $wrap   = $frame.parent();

		$frame.sly({
			horizontal: 1,
			itemNav: 'basic',
			smart: 1,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			activateOn: 'click',

			prevPage: $wrap.find('.left'),
			nextPage: $wrap.find('.right')
		});

		$(window).resize(function(){
			$('#frame').sly('reload')
		});

		var $frame  = $('#frame-2');
		var $slidee = $frame.children('ul').eq(0);
		var $wrap   = $frame.parent();

		$frame.sly({
			horizontal: 1,
			itemNav: 'basic',
			smart: 1,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			speed: 300,
			elasticBounds: 1,
			easing: 'easeOutExpo',
			activateOn: 'click'
		});

		$(window).resize(function(){
			$('#frame-2').sly('reload')
		});

/* ==== 04) Carousels ==== */

	$('#carousel-hero-1, #carousel-hero-2, #carousel-hero-3, #carousel-testimonials').carousel({
		interval: 4000,
		pause: "false"
	})

	$('#carousel-portfolio-single, carousel-content-1, carousel-content-1').carousel({
		interval: 0,
		pause: "false"
	})

/* ==== 05) Make intro section height of viewport / Min height is set in style.css ==== */

	$(function(){
		$('.wh').css({'height':($(window).height())+'px'});
		$(window).resize(function(){
		$('.wh').css({'height':($(window).height())+'px'});
		});
	});

	$(function(){
		$('.wh-half').css({'height':($(window).height())/2+'px'});
		$(window).resize(function(){
		$('.wh-half').css({'height':($(window).height())/2+'px'});
		});
	});

	$(function(){
		$('.wh-twothirds').css({'height':($(window).height())/3*2+'px'});
		$(window).resize(function(){
		$('.wh-twothirds').css({'height':($(window).height())/3*2+'px'});
		});
	});

	$(function(){
		$('.wh-onethird').css({'height':($(window).height())/3*1+'px'});
		$(window).resize(function(){
		$('.wh-onethird').css({'height':($(window).height())/3*1+'px'});
		});
	});

/* ==== 07) Gallery lightbox ==== */

	$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
		event.preventDefault();
		$(this).ekkoLightbox();
	});

/* ==== 09) Preloader ==== */

	$('.spinner').fadeOut('slow');
	$('.preloader').delay(350).fadeOut('slow');

});

$(window).load(function() {
	'use strict';

/* ==== 10) Collapse menu on click on mobile and tablet devices ==== */
/*
	if ($('.navbar-toggle:visible').length) {
		$('.navbar a').click(function () { $(".navbar-collapse").collapse("hide") });
	}
*/
/* ==== 11) Smooth scroll on anchors ==== */

	$('#more, .hidden-xs, .navbar, .navbar-header, footer, .list-unstyled li, .float-content, .media-body, .service p, .float-content-bottom').localScroll({
		target: 'body',
		duration: 1000,
		offset: -58,
		easing: 'easeInOutExpo'
	});

/* ==== 12) Viewport animations ==== */

	new WOW({mobile: false}).init();

/* ==== 15) Random number counter ==== */

	$.fn.waypoint.defaults = {
		context: window,
		continuous: true,
		enabled: true,
		horizontal: false,
		offset: 'bottom-in-view',
		triggerOnce: true
	}

	$('#counter-1, #counter-2, #counter-3, #counter-4').kCounter({ initial: 0, duration: 2000, easing: 'swing', width: 25 }) ;

	var $counter = $('.counter');
	if ( $counter.length){
		$('.counter').waypoint(function(direction) {
			$('#counter-1').kCounter('update', 85) ;
			$('#counter-2').kCounter('update', 10) ;
			$('#counter-3').kCounter('update', 1) ;
			$('#counter-4').kCounter('update', 1) ;
		});
	}

/* ==== 20) Href # fix for demo ==== */
/*
	$('a[href="#"]').click(function() {
		return false;
	});
*/
});

!function($,n,e){var o=$();$.fn.dropdownHover=function(e){return"ontouchstart"in document?this:(o=o.add(this.parent()),this.each(function(){function t(e){o.find(":focus").blur(),h.instantlyCloseOthers===!0&&o.removeClass("open"),n.clearTimeout(c),i.addClass("open"),r.trigger(a)}var r=$(this),i=r.parent(),d={delay:500,instantlyCloseOthers:!0},s={delay:$(this).data("delay"),instantlyCloseOthers:$(this).data("close-others")},a="show.bs.dropdown",u="hide.bs.dropdown",h=$.extend(!0,{},d,e,s),c;i.hover(function(n){return i.hasClass("open")||r.is(n.target)?void t(n):!0},function(){c=n.setTimeout(function(){i.removeClass("open"),r.trigger(u)},h.delay)}),r.hover(function(n){return i.hasClass("open")||i.is(n.target)?void t(n):!0}),i.find(".dropdown-submenu").each(function(){var e=$(this),o;e.hover(function(){n.clearTimeout(o),e.children(".dropdown-menu").show(),e.siblings().children(".dropdown-menu").hide()},function(){var t=e.children(".dropdown-menu");o=n.setTimeout(function(){t.hide()},h.delay)})})}))},$(document).ready(function(){$('[data-hover="dropdown"]').dropdownHover()})}(jQuery,this);
