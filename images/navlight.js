$.debounce = function(func, wait, immediate) {
	var timeout
	return function() {
		var context = this, args = arguments
		later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}
$.throttle = function(func, wait) {
	var context, args, timeout, throttling, more, result
	var whenDone = $.debounce(function() {
		more = throttling = false
	}, wait)
	return function() {
		context = this, args = arguments
		var later = function() {
			timeout = null
			if (more) func.apply(context, args)
			whenDone()
		}
		if (!timeout) timeout = setTimeout(later, wait)
		
		if (throttling) {
			more = true
		} else {
			result = func.apply(context, args)
		}
		whenDone()
		throttling = true
		return result
	}
}
$.fn.topSuction = function(option) {
	option = option || {}
	var fixCls = option.fixCls || 'cate-fixed'
	var navarea = option.navarea || '.navarea'
	var navbox = option.navbox || '.navbox'
	var fixedFunc = option.fixedFunc
	var resetFunc = option.resetFunc

	var $self = this
	var $win  = $(window)
	if (!$self.length) return

	var offset = $self.offset()
	var fTop   = offset.top
	var fLeft  = offset.left

	//�麱摮�
	$self.data('def', offset)
	$win.resize(function() {
		$self.data('def', $self.offset())
	})

	$win.scroll(function() {
		var dTop = $(document).scrollTop()
		if (fTop < dTop) {
			$self.addClass(fixCls)
			var qq = $(navarea).width()
			$self.children(navbox).width( qq )
			if (fixedFunc) {
				fixedFunc.call($self, fTop)
			}
		} else {
			$self.removeClass(fixCls)
			if (resetFunc) {
				resetFunc.call($self, fTop)
			}
		}
	})
	
	//銝��脖��嘑銵�
	dTop = $(document).scrollTop()
	if (fTop < dTop) {
		$self.addClass(fixCls)
		var qq = $(navarea).width()
		$self.children(navbox).width( qq )
		if (fixedFunc) {
			fixedFunc.call($self, fTop)
		}
	} else {
		$self.removeClass(fixCls)
		if (resetFunc) {
			resetFunc.call($self, fTop)
		}
	}
	
};

/*
 * 撠舘汗/�詨鱓擃䀝漁蝯�隞�
 * option
 *   navs 	撠舘汗/�詨鱓��憛𢠃�詨�硋膥
 *   nav 		撠舘汗/�詨鱓�批捆�詨�硋膥
 *   content 	�批捆��憛𢠃�詨�硋膥
 *   diffTop 	頝嗪𣪧���函�隤文榆��
 *   diffBottom 頝嗪𣪧摨閖�函�隤文榆��
 *   lightCls 	擃䀝漁��class
 *   navopen	撠舘汗/�詨鱓撅閖�讠�class
 * 
 */
$.fn.navLight = function(option, callback) {
	option = option || {}
	var navarea = option.navarea || '.navarea'
	var navs = option.navs || '.navs'
	var nav = option.nav || '.nav'
	var content = option.content || '.content'
	var diffTop = option.diffTop || $(window).height()/4
	var diffBottom = option.diffBottom || 0
	var lightCls = option.lightCls || 'cate-hover'
	var navopen = option.navopen || 'cate-open'
	var open = option.open
	var $self = $(this)
	var $nav = $self.find(nav)
	var $content = $self.find(content)
	// 閮㗛�瘥誩�钅�詨鱓��雿滨蔭
	var navPosi = $nav.map(function(idx, elem) {
		var $cont = $(elem)
		var left = $cont.offset().left
		var width = $cont.outerWidth(true)
		return {
			left: left,
			width: width,
			jq: $cont
		}
	})
	// 閮㗛�瘥誩�见�批捆��憛羓�雿滨蔭
	var contentPosi = $content.map(function(idx, elem) {
		var $cont = $(elem)
		var top = $cont.offset().top
		var bottom = $cont.offset().top
		var height = $cont.height()
		return {
			top: top-diffTop,
			bottom: top+height+diffBottom,
			jq: $cont
		}
	})
	//console.log(contentPosi);
	console.log();
	var $win = $(window)
	var $doc = $(document)
	var handler = $.throttle(function(e) {
		var dTop = $doc.scrollTop()
		highLight(dTop)
		//console.log(dTop)
	}, 100)

	function highLight(docTop) {
		//if ( docTop < contentPosi[0].top ){
		//	$nav.removeClass(lightCls)
		//}
		contentPosi.each(function(idx, posi) {
			if ( posi.top < docTop && posi.bottom > docTop ) {
				//�詨鱓蝘餃��
				var left = navPosi[idx].left
				var center = ( $win.width() - navPosi[idx].width )/2
				$(navs).stop().animate({
					scrollLeft: left - center
				},100)
				//擃䀝漁
				$nav.removeClass(lightCls)
				$nav.eq(idx).addClass(lightCls).siblings()				
				if (callback) {
					callback($nav, $content)
				}
			}
		})
	}
	
	
	if (open) {
		$self.delegate( nav , ' click', function(e) { //銝滨鍂touchstart��隤方孛
			var $na = $(this)
			var idx = $nav.index($na)
			var $cont = $content.eq(idx)
			var top = $cont.offset().top
			var height = $nav.outerHeight(true)
			$(navarea).removeClass('cate-open')

			//璅��讐�箇蔭摨閙�,銝滨�烾�詨鱓擃睃漲
			if( $(navarea).hasClass('NavArea-fixed-bottom') == true ){
				height = 0;
			};

			//�𤔅暺𧼮�����𡁜�憛�
			var top_i = 10;
			//var top_i = $('.content_Area').prev('.mo_img').height();  //�祉���䠷�峕糓��漤𢒰�𦻖��𣇉���
			
			$('html,body').animate({
				scrollTop: top - height - top_i + 'px'
			})
			//console.log(height ,top)
			e.preventDefault()
		})
	}
	
	$win.scroll(handler)
};


/** �詨鱓憟𦯀辣 
  *  1.�㬢�𡡞�詨鱓蝵桅�
  *  2.暺鮋�賊�詨鱓,�𤔅���批捆
  *  3.�㬢�𤾸�批捆,�詨鱓擃䀝漁,擃䀝漁蝵桐葉
  *  4.暺鮋�筮tn,撅閖�钅�詨鱓

**/
$(window).load(function(){
	var $WRAPPER = $('.WRAPPER'); //��憭批�
	$WRAPPER.find('.NavArea').topSuction({
		fixCls:   'cate-fixed',		//�詨鱓頞��𡒊蔭����class
		navarea:  '.NavArea',		//撠舘汗/�詨鱓憟𦯀辣�詨�硋膥
		navbox:   '.NavArea .Nav_box',		//撠舘汗/�詨鱓��憛𢠃�詨�硋膥
	});  
	$WRAPPER.navLight({
		navarea:  '.NavArea',		//撠舘汗/�詨鱓憟𦯀辣�詨�硋膥
		navs:     '.NavArea .Nav',			//撠舘汗/�詨鱓�批捆憭批��詨�硋膥
		nav: 	  '.NavArea .Nav li',		//撠舘汗/�詨鱓�批捆�詨�硋膥
		content:  '.navlight_content',	//�批捆��憛𢠃�詨�硋膥
		lightCls: 'cate-hover',		//擃䀝漁��class
		navopen:  'cate-open',		//撠舘汗/�詨鱓撅閖�讠�class
		open: true,					//撠舘汗/�詨鱓�批捆暺墧�𠰴�笔��
	});
	
	//撅閖�钅�詨鱓
	$('.NavArea').delegate(".Btn","click",function(){
		$('.NavArea').toggleClass('cate-open');
		$('html,body').animate({
			scrollTop: $('.NavArea .Nav_box').offset().top //暺墧�匧�閖�讠蔭��
		},0)
	});
	$('.NavArea').delegate(".Nav_bg","click",function(){
		$('.NavArea').removeClass('cate-open');
	});
	
	//璅��讐�箇蔭摨閙�,�黸��讐頂蝯勗𧑐
	if( $('.NavArea').hasClass('NavArea-fixed-bottom') == true ){
		$('.footerArea').hide();
	};
	
});




