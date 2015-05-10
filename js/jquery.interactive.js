/* *
 * Combo design for:
 alert, dialog, prompt, tooltip, hint, notice
 history:
 	2008-11-10 č®¸ĺĄ + blurHint options(onengage, onrealse) to blurHint
 	2008-11-20 č®¸ĺĄ + $selector.spring()
 	2008-11-24 luli č§Łĺ†łnoticeĺ’Śalertĺ…±ĺ­ćľç¤ş
 	2009-05-06 luli spriteć·»ĺŠ validtaHandler	 options.onrequirevalidate
 	2009-05-08 luli +hookć–ąćł•ă€€ç”¨äşŽĺĽąĺ±‚ćľç¤şéšč—Ź
 	2009-06-04 luli +Form protect
 	2009-8-19 č®¸ĺĄ  +overcome()
 	2009-09-14 luli +$.sprite
 	2009-09-25 luli +$.fn.notice
 	2009-11-27 luli +dialogĺ®˝ĺş¦č‡Şé€‚ĺş”
 	2009-11-27 luli +dialogĺ˘žĺŠ submitButtonçš„é…Ťç˝®
	2010-02-25 luli ĺĽ€ĺ§‹é‡Ťćž„interactive2,ĺ…Ľĺ®ąć—§çš„interactive
	2010-09-08 liuwenbo ć›´ć”ą$boxç»“ćž„ĺ’Śĺ®šä˝Ťé€»čľ‘.
 */
;(function($){

	var __removeBoxtimeoutId = null;
	var __removeErrortimeoutId = null;

    var __box = function(options){
		__remove(options.type);
		options=$.extend({
			title:'',				//ćˇ†ä˝“çš„ć ‡é˘
			direction:'down',		//ćˇ†ä˝“çš„ĺĽąĺ‡şć–ąĺ‘:up|right|down|left ĺŚć—¶äąźĺ†łĺ®šäş†ç®­ĺ¤´ć–ąĺ‘(ĺ˝“ç„¶äĽšĺ’ŚçŞ—ä˝“ĺĽąĺ‡şć–ąĺ‘ç›¸ĺŹŤäş†).
			target:undefined, 		//č§¦ĺŹ‘ĺĽąćˇ†çš„ĺ…ç´ ,ç®­ĺ¤´ĺŻąé˝çš„ç›®ć ‡
			align:'center',			//ćˇ†ä˝“ĺŻąé˝ć–ąĺĽŹ:top|right|bottom|left|middle|center
			alignTarget:undefined,	//ćˇ†ä˝“ĺŻąé˝ç›®ć ‡,ćśŞĺ®šäą‰ć—¶ĺŻąé˝ĺ°target
			noArrow:false,			//ä¸Ťćľç¤şç®­ĺ¤´ true|false
			noCloser:true,			//ä¸Ťćľç¤şĺ…łé—­
			arrowSize:{a:4,b:11},	//a:ç®­ĺ¤´ĺ°–ĺ°ćˇ†ä˝“çš„č·ťç¦»,b:ç®­ĺ¤´ä¸Žćˇ†ä˝“ĺąłčˇŚéť˘çš„é•żĺş¦
			outerFix:{t:0,r:0,b:0,l:0},	//ćˇ†ä˝“outerSizeĺ’ŚSizeçš„ĺ·®ĺ«.ćś¬ćśźĺšçš„ćˇ†ä˝“ćś‰4pxçš„border.ć‰€ä»Ąé˝ćŻ4. TODO:č‡ŞĺŠ¨čŽ·ĺŹ–.
			preButtons : false,			//ćľç¤şçˇ®ĺ®šĺŹ–ć¶ćŚ‰é’®
			roundCorner : true			//ć·»ĺŠ ĺŤŠé€Źĺś†č§’table
		},options);
		if(options.noArrow){
			options.arrowSize={a:0,b:0}
		}
		if(isIE6()){options.roundCorner=false;options.outerFix={t:4,r:4,b:4,l:4}}
		//ć‘ä»¬ćťĄĺ®šäą‰čż™ä¸ŞĺĽąćˇ†ĺ§
        var $box = $('<div></div>').attr('id','jquery-interactive-'+options.type).appendTo(document.getElementById('content')||document.body),
			tmpHTML=(options.noArrow?'':'<em class="interactive-arrow interactive-arrow-'+options.direction+'">^</em>')
					+'<div class="interactive-main">'
					+'<div class="interactive-title">'
					+(options.title?'<h2>' + options.title + '</h2>':'')
					+'<span class="interactive-closed"><a class="interactive-x close_gray" href="javascript:void(0);">ĺ…łé—­</a></span></div>'
					+'<div class="interactive-error"><a href="javascript:void(0);" class="close_gray">ĺ…łé—­</a><div></div></div><div class="interactive-success"><div></div></div><div class="interactive-content">&nbsp;</div>'
					+'<div class="interactive-bottom"><span class="interactive-loading">loadingâ€¦â€¦</span><button class="b-default" type="submit"><span><b>çˇ®ĺ®š</b></span></button>'
					+(options.noCloser?'<button class="b-gray" type="reset"><span><b>ĺŹ–ć¶</b></span></button>':'')+'</div></div>'
					;

        $box.attr('class', 'arrowbox').html((options.roundCorner?'<table class="jquery-interactive-wrapper"><colgroup><col width="4px"/><col width="4px"/><col width="4px"/></colgroup><tr><td class="wrapperTL"></td><td class="wrapperTC"></td><td class="wrapperTR"></td></tr><tr><td class="wrapperML"></td><td class="wrapperMC">':'')+'<div class="interactive-wrapper"></div>'+(options.roundCorner?'</td><td class="wrapperMR"></td></tr><tr><td class="wrapperBL"></td><td class="wrapperBC"></td><td class="wrapperBR"></td></tr></table>':''))
		.show()
		.css({
			'zIndex' : 99999
		})
		.find('.interactive-wrapper').html(tmpHTML);
		if(options.noCloser){
			$('a.interactive-x', $box).remove()
		}else{
			$('a.interactive-x', $box).click(function(){
				__remove(options.type);
				return false;
			});
		}
		$('#jquery-interactive-box2 div.interactive-error a').click(function(){
			$(this).parent().hide();
		});
		if(options.mask) $.mask();
		//ĺ¦‚ćžśćŚ‡ĺ®šäş†top leftďĽŚé‚Łäąç»™boxĺšć ‡č®°ďĽŚ__resetPosä¸Ťĺ†Ťé‡Ťç˝®ä˝Ťç˝®
		if(options.left||options.top)	$box.data('customPosition',true);
		$box.data('options', options);
		__setPos($box);
		//fix IE6 slecte z-index bug
		if(isIE6()){
			$box.wrapInner('<div style="position:relative;"></div');
			var _h = $box.outerHeight();
			$('<iframe id="jquery-interactive-iframe"></iframe>')
			.prependTo($box)
			.height(_h)
			.attr('src','about:blank')
			.css({
				'left': -8,
				'opacity': 0,
				'position': 'absolute',
				'top': -8,
				'width': '100%',
				'zIndex': '-1'
			});
			//fix end
		}
		$box.extend({
			destory:function(){
				__remove(options.type);
			},
			showLoading:__showloading,
			hideLoading:__hideloading,
			showError:__showError,
			cleanError:__cleanError,
			showSuccess:function(msg,callback){
				__showSuccess(msg,callback,$box);
			},
			enableSubmit:__enableSubmit,
			disableSubmit:__disableSubmit
		});

		return $box;
    };

	//destory Box
	var __remove = function(type){
		//type: mask || box
		//ĺ…Ľĺ®ą$.alert $.spriteçš„$.UI.hide();
		if(!type) $('#jquery-interactive-box2, #jquery-interactive-alert, #jquery-interactive-box, #jquery-interactive-notice, #jquery-interactive-alert, #jquery-interactive-errormsg, #jquery-interactive-successmsg').remove();
		else $('#jquery-interactive-errormsg, #jquery-interactive-successmsg, #jquery-interactive-'+type).remove();
		$('#jquery-interactive-mask').remove();
		if($.errormsg.timeoutId)clearTimeout($.errormsg.timeoutId);
		if(__removeBoxtimeoutId) {
			clearTimeout(__removeBoxtimeoutId);
			__removeBoxtimeoutId = null;
		}
	}

	//set Pos
	var __setPos = function(box){
		var _box = box || $('#jquery-interactive-box2');
		var _pos = getMidOfClient(_box),
			_arrowpos={x:undefined,y:undefined},
			options= _box.data('options');
		var $alignTarget=$(options.alignTarget||options.target||'body'),
			atOffset=$alignTarget.offset(),
			$target=$(options.target),
			tOffset=$target.offset();

		switch(options.align){
			//ĺž‚ç›´ĺŻąé˝,ĺŻąĺş”direction:left|right
			case 'top':
				_pos.y=atOffset.top;
				_arrowpos.y=tOffset.top-_pos.y+($target.outerHeight()-options.arrowSize.b)/2-options.outerFix.t;
				break;
			case 'bottom':
				_pos.y=atOffset.top+$alignTarget.outerHeight()-_box.outerHeight();
				_arrowpos.y=tOffset.top-_pos.y+($target.outerHeight()-options.arrowSize.b)/2-options.outerFix.t;
				break;
			case 'middle':
				_pos.y=atOffset.top-(_box.outerHeight()-$alignTarget.outerHeight())/2;
				_arrowpos.y=tOffset.top-_pos.y+($target.outerHeight()-options.arrowSize.b)/2-options.outerFix.t;
				break;
			//ć°´ĺąłĺŻąé˝,ĺŻąĺş”direction:up|down
			case 'right':
				_pos.x=atOffset.left+$alignTarget.outerWidth()-_box.outerWidth();
				_arrowpos.x=tOffset.left-_pos.x+($target.outerWidth()-options.arrowSize.b)/2-options.outerFix.r;
				break;
			case 'left':
				_pos.x=atOffset.left;
				_arrowpos.x=tOffset.left-_pos.x+($target.outerWidth()-options.arrowSize.b)/2-options.outerFix.l;
				break;
			case 'center':
				_pos.x=atOffset.left-(_box.outerWidth()-$alignTarget.outerWidth())/2;
				_arrowpos.x=tOffset.left-_pos.x+($target.outerWidth()-options.arrowSize.b)/2-options.outerFix.l;
				break;
		}
		switch(options.direction){
			case 'left':
				_pos.x=tOffset.left-(_box.outerWidth()+options.arrowSize.a);
				break;
			case 'right':
				_pos.x=tOffset.left+($target.outerWidth()+options.arrowSize.a);
				break;

			case 'up':
				_pos.y=tOffset.top-(_box.outerHeight()+options.arrowSize.a);
				break;
			case 'down':
				_pos.y=tOffset.top+($target.outerHeight()+options.arrowSize.a);
				break;
		}

		_box.css({
			left : options.left || _pos.x,
			top : options.top || _pos.y
		});
		$('.interactive-arrow',_box).css({
			left : _arrowpos.x,
			top : _arrowpos.y
		});
	}

	//reset Pos
	var __resetPos = function(box){
		var _box = box || $('#jquery-interactive-box2');
		$('#jquery-interactive-iframe', _box)
		.height(_box.outerHeight())
		.width(_box.outerWidth());
		/*$('.jquery-interactive-wrapper', _box)
		.height(_box.outerHeight())
		.width(_box.outerWidth()+8);*/
		if(_box.data('customPosition'))	return;
		__setPos(_box);
	}

	//loading
	function __showloading(){
		__cleanError();
		$('#jquery-interactive-box2 .interactive-loading').css('visibility', 'visible');
	}

	//loaded
	function __hideloading(){
		$('#jquery-interactive-box2 .interactive-loading').css('visibility', 'hidden');
	}
	//disableSubmit
	function __disableSubmit(){
		var $box = $('#jquery-interactive-box2');
		$('button[type=submit]',$box).attr('disabled',true).addClass('disabled');
	}
	//enableSubmit
	function __enableSubmit(){
		var $box = $('#jquery-interactive-box2');
		$('button[type=submit]',$box).attr('disabled',false).removeClass('disabled');
	}
	//showError
	//ĺś¨ĺĽąĺ±‚ä¸­ćľç¤şé”™čŻŻćŹç¤ş
	function __showError(msg){
		__hideloading();
		var $error = $('.interactive-main div.interactive-error');
		var $main = $('.interactive-main div.interactive-main');
		$error.width($main.width() - 10).show().find('div').html(msg);
	}

	//ĺŻąäşŽć— ćł•ĺś¨ĺĽąĺ±‚ä¸­ćŹç¤şé”™čŻŻçš„ďĽŚä˝żç”¨$.alertćľç¤şä¸Ąé‡Ťé”™čŻŻ
	function __showGlobalError(msg){
		__remove();
		$.alert(msg, {title : 'é”™čŻŻ'})
	}

	//cleanError
	function __cleanError(){
		$('.interactive-main div.interactive-error').hide().find('div').html('');
	}

	//showSuccess
	var __showSuccess = function(msg,callback,$box){
		msg=msg||'ć“Ťä˝śćĺŠź';
		__hideloading();
		var $success = $('.interactive-main div.interactive-success');
		var $main = $('div.interactive-main');
		$success.width($main.width() - 20).show().find('div').html('<span class="icon_success">'+msg+'</span>');
		$success.show().appendTo($('.interactive-main div.interactive-content').empty());

		if(callback&&callback.constructor == Function){
			__removeBoxtimeoutId=setTimeout((function(){callback.apply($box, arguments);__remove();}),3000);
		}
	}

	//ćŁ€ćźĄsćŻĺ¦ä¸şä¸€ć®µćśŞč˘«htmlć ‡ç­ľĺŚ…čŁąçš„string.
	var __notHtmlWraped=function(s){
		return (/^[^<]+(<([a-z]+)>[^<]*<\/\2>[^<]*)*$|^<([a-z]+)>[^<]*<\/\3>[^<]+$/i).exec(s.toString()||s)
	}

    var __globalOptions = {
		width:'auto',
		maxWidth:20, //in em
		minWidth:12, //in em
        height: 200,
        title: '',
		mask: false,
		liveTime: null,
        selector: null,
        onComplete: null,
        onabort: null,
        ondone: null,
        onerror: null,
        ontimeout: null,
		animate: 'show',
		type: 'box2'
    };

    $.extend({
		/**
		 * Alert
		 * @param {Object} message
		 * @param {Object} options
		 */
        alert: function(message, options){
			var message = message || '';
			var _baseOption = {
				type : 'alert',
				liveTime : '3000',
				preButtons : false,
				direction:null,
				align:null,
				mask:true,
				noArrow:true,
				noCloser:false
			};
			//Merge options
			options = $.extend({}, __globalOptions, _baseOption, options);


			if($.alert.timeoutId)	clearTimeout($.alert.timeoutId);
			//init UI
			var $box = __box(options);
			//ĺś¨ĺĽąĺ±‚ä¸­alertçš„ĺ±‚çş§ćś€é«
			$box.width(options.width).css('zIndex', 212121888);
			var $content = $box.find('div.interactive-content');
			$content.html(message);
			//ĺ¦‚ćžśćŹç¤şćŻä¸€čˇŚć–‡ĺ­—ďĽŚé‚Łäąç®—ĺ‡şĺ®˝ĺş¦,ĺŹłčľąç•™ĺ‡şç‚ąä˝Ťç˝®ç»™ĺ…łé—­ćŚ‰é’®
			if($.browser.msie&&__notHtmlWraped(message)){
				var tmpWidth=message.replace(/<\/?\w+>/ig,'').length;
				if(options.preButtons)tmpWidth=tmpWidth<options.minWidth?options.minWidth:tmpWidth;
				$content.width(tmpWidth>options.maxWidth?options.maxWidth+'em':tmpWidth+'em');
				if(!options.noCloser){
					$('div.interactive-main', $box).css('padding-right', '44px');
				}
			}
			if(options.preButtons == false){
				$('div.interactive-bottom', $box).remove();
				if(options.liveTime){
					$.alert.timeoutId = setTimeout(function(){
						__remove(options.type);
						if(options.onClose) options.onClose.call($box);
					}, options.liveTime);
				}
			}
			__resetPos($box);
			$('div.interactive-bottom button[type=submit]',$box).focus();
			//bindEvent
			$('div.interactive-bottom button', $box).add($('a.interactive-x',$box).unbind('click')).unbind('click').click(function(){
				__remove(options.type);
				if(options.onClose) options.onClose.call($box);
				return false;
			});
			return $box;
        },

		notice: function(message, options){
			var message = message || '';
			var _baseOption = {
				type : 'notice',
				liveTime : '3000',
				preButtons : false,
				direction:'right',
				align:'middle',
				mask:false,
				target:undefined //ĺż…é€‰
			};
			//Merge options
			options = $.extend({}, __globalOptions, _baseOption, options);


			if($.notice.timeoutId)	clearTimeout($.notice.timeoutId);
			//init UI
			var $box = __box(options);
			//ĺś¨ĺĽąĺ±‚ä¸­alertçš„ĺ±‚çş§ćś€é«
			$box.width(options.width)
				.css('zIndex', 212121888);
			var $content = $box.find('div.interactive-content');
			$content.html(message);
			//ĺ¦‚ćžśćŹç¤şćŻä¸€čˇŚć–‡ĺ­—ďĽŚé‚Łäąç®—ĺ‡şĺ®˝ĺş¦,ĺŹłčľąç•™ĺ‡şç‚ąä˝Ťç˝®ç»™ĺ…łé—­ćŚ‰é’®
			if($.browser.msie&&__notHtmlWraped(message)){
				var tmpWidth=message.replace(/<\/?\w+>/ig,'').length;
				if(options.preButtons)tmpWidth=tmpWidth<options.minWidth?options.minWidth:tmpWidth;
				$content.width(tmpWidth>options.maxWidth?options.maxWidth+'em':tmpWidth+'em');
				if(!options.noCloser){
					$('div.interactive-main', $box).css('padding-right', '44px');
				}
			}
			if(options.preButtons == false){
				$('div.interactive-bottom', $box).remove();
				if(options.liveTime){
					$.notice.timeoutId = setTimeout(function(){
						__remove(options.type);
						if(options.onClose) options.onClose.call($box);
					}, options.liveTime);
				}
			}
			__resetPos($box);
			$('div.interactive-bottom button[type=submit]',$box).focus();
			//bindEvent
			$('div.interactive-bottom button', $box).add($('a.interactive-x',$box).unbind('click')).unbind('click').click(function(){
				__remove(options.type);
				if(options.onClose) options.onClose.call($box);
				return false;
			});
			return $box;
        },
		errormsg: function(message, options){
			var message = message || '';
			var _baseOption = {
				type : 'errormsg',
				liveTime : '5000',
				preButtons : false,
				direction:'right',
				align:'middle',
				mask:false,
				noArrow:false,
				noCloser:true,
				target:undefined, //ĺż…é€‰
				arrowSize:{a:6,b:6},
				outerFix:{t:0,r:0,b:0,l:0}
			};
			//Merge options
			options = $.extend({}, __globalOptions, _baseOption, options);

			if($.errormsg.timeoutId)clearTimeout($.errormsg.timeoutId);
			//init UI
			var $box = __box(options);
			//ĺś¨ĺĽąĺ±‚ä¸­alertçš„ĺ±‚çş§ćś€é«
			$box.width(options.width)
				.css('zIndex', 212121888);
			var $content = $box.find('div.interactive-content');
			$content.html(message);
			//ĺ¦‚ćžśćŹç¤şćŻä¸€čˇŚć–‡ĺ­—ďĽŚé‚Łäąç®—ĺ‡şĺ®˝ĺş¦,ĺŹłčľąç•™ĺ‡şç‚ąä˝Ťç˝®ç»™ĺ…łé—­ćŚ‰é’®
			if($.browser.msie&&__notHtmlWraped(message)){
				var tmpWidth=message.replace(/<\/?\w+>/ig,'').length;
				if(options.preButtons)tmpWidth=tmpWidth<options.minWidth?options.minWidth:tmpWidth;
				$content.width(tmpWidth>options.maxWidth?options.maxWidth+'em':tmpWidth+'em');
				if(!options.noCloser){
					$('div.interactive-main', $box).css('padding-right', '44px');
				}
			}
			if(options.preButtons == false){
				$('div.interactive-bottom', $box).remove();
				if(options.liveTime){
					$.errormsg.timeoutId = setTimeout(function(){
						__remove(options.type);
						if(options.onClose) options.onClose.call($box);
					}, options.liveTime);
				}
			}
			__resetPos($box);
			$('div.interactive-bottom button[type=submit]',$box).focus();
			//bindEvent
			$('div.interactive-bottom button', $box).add($('a.interactive-x',$box).unbind('click')).unbind('click').click(function(){
				__remove(options.type);
				if(options.onClose) options.onClose.call($box);
				return false;
			});
			return $box;
        },
		successmsg: function(message, options){
			var message = message || '';
			var _baseOption = {
				type : 'successmsg',
				liveTime : '5000',
				preButtons : false,
				direction:'right',
				align:'middle',
				mask:false,
				noArrow:false,
				noCloser:true,
				target:undefined, //ĺż…é€‰
				arrowSize:{a:6,b:6},
				outerFix:{t:0,r:0,b:0,l:0}
			};
			//Merge options
			options = $.extend({}, __globalOptions, _baseOption, options);

			if($.errormsg.timeoutId)clearTimeout($.errormsg.timeoutId);
			//init UI
			var $box = __box(options);
			//ĺś¨ĺĽąĺ±‚ä¸­alertçš„ĺ±‚çş§ćś€é«
			$box.width(options.width)
				.css('zIndex', 212121888);
			var $content = $box.find('div.interactive-content');
			$content.html(message);
			//ĺ¦‚ćžśćŹç¤şćŻä¸€čˇŚć–‡ĺ­—ďĽŚé‚Łäąç®—ĺ‡şĺ®˝ĺş¦,ĺŹłčľąç•™ĺ‡şç‚ąä˝Ťç˝®ç»™ĺ…łé—­ćŚ‰é’®
			if($.browser.msie&&__notHtmlWraped(message)){
				var tmpWidth=message.replace(/<\/?\w+>/ig,'').length;
				if(options.preButtons)tmpWidth=tmpWidth<options.minWidth?4:tmpWidth;
				$content.width(tmpWidth>options.maxWidth?options.maxWidth+'em':tmpWidth+'em');
				if(!options.noCloser){
					$('div.interactive-main', $box).css('padding-right', '44px');
				}
			}
			if(options.preButtons == false){
				$('div.interactive-bottom', $box).remove();
				if(options.liveTime){
					$.errormsg.timeoutId = setTimeout(function(){
						__remove(options.type);
						if(options.onClose) options.onClose.call($box);
					}, options.liveTime);
				}
			}
			__resetPos($box);
			$('div.interactive-bottom button[type=submit]',$box).focus();
			//bindEvent
			$('div.interactive-bottom button', $box).add($('a.interactive-x',$box).unbind('click')).unbind('click').click(function(){
				__remove(options.type);
				if(options.onClose) options.onClose.call($box);
				return false;
			});
			return $box;
        },

        dialog: function(message, options){
			var message = message || '';
			var _baseOption = {
				title : '',
				type : 'box2',
				liveTime : '3000',
				preButtons : false
			};
			//Merge options
			options = $.extend({}, __globalOptions, _baseOption, options);

			//init UI
			var $box = __box(options);
			var $content = $box.find('div.interactive-content');

			if (message.constructor == String){
				$content.html(message);
				//ĺ¦‚ćžśćŹç¤şćŻä¸€čˇŚć–‡ĺ­—ďĽŚé‚Łäąmainçš„ä¸Šä¸‹čľąč·ťä¸ş50px
				if($content.height() < 20){
					$('div.interactive-main', $box).css('padding', '50px 25px');
				};
			}else{
				var _cacheDom = $(message);
				if (!_cacheDom.length) return false;
				$content.html('').append(_cacheDom.children().clone(true));
			}
			if(options.preButtons == false) $('div.interactive-bottom', $box).remove();

			__resetPos($box);
			if(isIE6()){setTimeout((function(){__resetPos($box);}),200)}
			$('div.interactive-bottom button[type=submit]',$box).focus();
			//bindEvent
			$('div.interactive-bottom button',$box).add($('a.interactive-x',$box).unbind('click')).unbind('click').click(function(){
				__remove(options.type);
				if(options.onClose) options.onClose.call($box);
				return false;
			});
			$('div.interactive-main', $box).find(':text:first').focus();
			return $box;
        },


        confirm: function(message, options){
            var message = message || 'çˇ®ĺ®šč¦čż›čˇŚčŻĄć“Ťä˝śĺ—ďĽź';
			var _baseOption ={
				noCloser:true,
				type : 'confirm',
				liveTime : '3000',
				preButtons : true,
				direction:null,
				align:null,
				mask:true,
				noArrow:true
			};
			//Merge options
			options = $.extend({}, __globalOptions, _baseOption, options);
			//init UI
			var $box = __box(options);
			$box.width(options.width);
			var $content = $box.find('div.interactive-content');
			$content.html(message);
			//if only some littersďĽŚreset width
			if($.browser.msie&&__notHtmlWraped(message)){
				var tmpWidth=message.replace(/<\/?\w+>/ig,'').length;
				if(options.preButtons)tmpWidth=tmpWidth<options.minWidth?options.minWidth:tmpWidth;
				$box.find('div.interactive-content').css('width',tmpWidth>options.maxWidth?options.maxWidth+'em':tmpWidth+'em');
				if(!options.noCloser){
					$('div.interactive-main', $box).css('padding-right', '44px');
				}
			}
			__resetPos($box);
			if(isIE6()){setTimeout((function(){__resetPos($box);}),200)}
			$('div.interactive-bottom button[type=submit]',$box).focus();
			//bindEvent
			function closeBox(){
				__remove(options.type);
				if(options.onClose) options.onClose.call($box);
			}
			$('div.interactive-bottom button[type=submit]',$box).click(function(){
				if (options.onAccept) options.onAccept($box);
				closeBox();
			});
			$('div.interactive-bottom button[type=reset]',$box).click(function(){
				if (options.onCancel) options.onCancel($box);
				closeBox();
			});
			$('a.interactive-x',$box).unbind('click').click(function(){
				if (options.onCancel) options.onCancel($box);
				closeBox();
				return false
			});
			return $box;
        },

		sprite: function(url, options){
			var url  = $.trim(url);
			var _baseOption =  {
				title : '',
				noArrow:false,			//ä¸Ťćľç¤şç®­ĺ¤´ true|false
				mask:true,
				direction:null,
				align:null,
				dontBind:false			//ä¸Ťč¦ç»‘ĺ®šformć“Ťä˝ś
			};
			//Merge options
			options = $.extend({}, __globalOptions, _baseOption, options);
			//init UI
			var $box = __box(options);
			var $content = $('div.interactive-content', $box);
			var $submit = $('div.interactive-bottom', $box);
			$content.html('<p style="width:'+options.minWidth+'em">č˝˝ĺ…Ąä¸­ďĽŚčŻ·ç¨Ťĺ€™...</p>');
			$submit.hide();
			__showloading();
			__resetPos($box);
			//is it a remote request?
			var requestMethod = 'ajax';
			var rhost = (/^(\w+:)?\/\/([^\/?#]+)/.exec(url));
			if(rhost){
				rhost = rhost[0];
				var shost = location.protocol + '//' + location.host;
				if(rhost !== shost)	requestMethod = 'swfajax';
			}
			/*é˛ć­˘flashć˛ˇćś‰č˝˝ĺ…Ąĺ®ŚćŻ•çš„ć—¶ĺ€™č°ç”¨,jsĺ‡şçŽ°ćŠĄé”™*/
			($[requestMethod]||$.ajax)({
				url : url + '&' + +new Date,
				success : function(r){
					if(r.code){
						//onClose Handler
						if(options.onClose) options.onClose.call($box);
						$.UI.hide();
						$.alert(r.msg);
						return false;
					}

					$content.html(r.msg);
					if(options.preButtons == false){
						$submit.remove();
					}
					else{
						$submit.show();
					}
					__resetPos($box);

					$('div.interactive-main', $box).find(':text:first').focus();
					//onload Handler
					if(options.onLoad) options.onLoad.call(options.link, $box);
					$('a.interactive-x',$box).unbind('click').click(function(){
						if (options.onCancel) options.onCancel($box);
						__remove(options.type);
						//onClose Handler
						if(options.onClose) options.onClose.call($box);
					});
					__hideloading();
					__resetPos($box);
					if(options.dontBind)return;
					var $form = $('form', $box);
					//ç”±äşŽĺĽąĺ±‚çš„çˇ®ĺ®šćŚ‰é’®ćŻç»źä¸€çš„ďĽŚä¸Ťĺś¨formä¸­ĺ®šäą‰ďĽŚć‰€ä»Ąéś€č¦č§¦ĺŹ‘formSubmit
					$('button[type=submit]',$box).click(function(){
						if (options.onAccept) options.onAccept($box);
						//ĺ¦‚ćžśç”¨ć·č®ľç˝®option.preButtons ä¸şfalse
						//č‡Şĺ·±ĺś¨formä¸­ä˝żç”¨submitćŚ‰é’®ćŹäş¤ďĽŚé‚Łäąspriteä¸Ťéś€č¦ĺšé˘ťĺ¤–ĺ¤„ç†
						if(!$(this).parents('form').length) $form.submit();
					});
					//ĺ¦‚ćžśformä¸­ĺ­ĺś¨resetćŚ‰é’®ďĽŚé‚Łäąç»‘ĺ®šĺ…łé—­ĺĽąĺ±‚ĺŠźč˝
					$('button[type=reset]', $box).click(function(){
						if (options.onCancel) options.onCancel($box);
						__remove(options.type);
						//onClose Handler
						if(options.onClose) options.onClose.call($box);
					});
					if($form.attr('action') === '') $form.attr('action', url);
					$form.ajaxForm({
						type : 'POST',
						dataType : 'json',
						beforeSubmit: function(){
							if(options.onBeforeSubmit){
								var result = options.onBeforeSubmit.call(options.link, $box);
								if(!result)	return false;
							}
							__disableSubmit();
							__showloading();
						},
						success : function(r){
							var _code = r.code;
							if(_code == 0){
								__remove(options.type);
								if(options.onComplete)	options.onComplete.call(options.link, $box, r);
								//onClose Handler
								if(options.onClose) options.onClose.call(options.link, $box);
							}
							else{
								__showError(r.msg);
							}
							__enableSubmit();
							__hideloading();
						},
						error : function(){
							__showError('ä¸ŽćśŤĺŠˇĺ™¨é€šč®Żć—¶ĺ‡şé”™, čŻ·é‡ŤčŻ•');
							__enableSubmit();
							__hideloading();
						},
						timeout : function(){
							__showError('ä¸ŽćśŤĺŠˇĺ™¨çš„é€šč®Żč¶…ć—¶, čŻ·é‡ŤčŻ•');
							__enableSubmit();
							__hideloading();
						}
					});
				}
			});
			return false;
		},

        mask: function(options){
			var options = $.extend({
				opacity : .2,
				animate : 'show',
				color: '#000000'
			},options);
			//initUI
			__remove('mask');
            var $box = $('<div id="jquery-interactive-mask" style="filter:alpha(opacity='+100*options.opacity+');"></div>').appendTo(document.body);
            $box.addClass('masking')[options.animate]();
			$box.css({
				width : $(window).width(),
				height : $(document).height(),
				opacity : options.opacity,
				backgroundColor : options.color,
				zIndex : 99990
			});
        } // mask
    });

	$.fn.extend({
		dialog : function(options){
			var _baseOption =  {
				title : ''
			};
			var $box;
			//Merge options
			options = $.extend(_baseOption, options);

			$(this).each(function(){
				//when this is a link.
				if (this.tagName.toUpperCase() == 'A') {
					$(this).click(function(){
						$box = $.dialog($(this).attr('srv')||this.href, options);
						return false;
					});
				}
				else{
					//when this is the pre-display container
					$box = $.dialog(this, options);
				}
			});
			return $box;
		},

		confirm : function(msg, options){
			var _baseOption ={
				direction:'down',
				align:'right',
				mask:false,
				noArrow:false
			};
			var $box;
			//Merge options
			options = $.extend(_baseOption, options);

			return this.each(function(){
				options.target=this;
				$box = $.confirm(msg, options);
			})
		},

		sprite : function(url,options){
			var _baseOption ={
				direction:'down',
				align:'right',
				mask:false,
				noArrow:false
			};
			var $box;
			//Merge options
			options = $.extend(_baseOption, options);

			return this.each(function(){
				options.target=this;
				options.link = $(this);
				$.sprite(url, options);
				return false;
			}); // live
		},

		notice : function(msg,options){
			var _baseOption =  {
				liveTime:3000
			};
			var $box;
			//Merge options
			options = $.extend(_baseOption, options);

			return this.each(function(){
				options.target=this;
				$box = $.notice(msg, options);
			})
		},

		errormsg : function(msg,options){
			var $box;
			//Merge options
			options = $.extend({roundCorner:false}, options);

			return this.each(function(){
				options.target=this;
				$box = $.errormsg(msg, options);
			})
		},
		successmsg : function(msg,options){
			var $box;
			//Merge options
			options = $.extend({roundCorner:false}, options);

			return this.each(function(){
				options.target=this;
				$box = $.successmsg(msg, options);
			})
		}
	});

    //hide
    $['UI'] = $['UI'] || {};
    $['UI']['hide'] = $['UI']['hide'] || __remove;
})(jQuery);

var _debug_=true;
//global Function
function getMidOfClient(el){
	var $el = $(el);
	if (!$el.length) return;
	var _client = $(window);
	var _page = $(document);
	var _pos = {};
	_pos.x = ((_client.width() - $el.outerWidth())/2 + _page.scrollLeft()) >> 0;
	_pos.y = ((_client.height() - $el.outerHeight())/2 + _page.scrollTop()) >> 0;
	return _pos;
}

function isIE6(){
	return ($.browser.version == '6.0') && $.browser.msie;
}
