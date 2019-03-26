/*
 * Ghvzon
 * 共用元件v2.0
 *
 */

/*高亮目前頁面*/
$(function(){
	var $con = $("#js-this"); 
	var title = $con.attr("data-title");   	//抓名稱
	var title2 = $con.attr("data-title2"); //抓名稱
	var title3 = $con.attr("data-title3"); //抓名稱
	$('.cantantBase, .fixarea, .Fixedfooter').find("li").each(function() {
		if ( $(this).html().indexOf(title) >= 0 || $(this).html().indexOf(title2) >= 0 || $(this).html().indexOf(title3) >= 0) {
			$(this).addClass("cate-hover index");
		}
	});
});


/*版頭動畫控制
$(window).load(function(){
	//頁面讀取完成後啟動動畫
	$('.an_paused').addClass('an_running').removeClass('an_paused')
});*/


/* 回版頭*/
jQuery(function(){
	var a = $('#gotop');
	a.click(function(){
		jQuery("html,body").stop(true,false).animate({scrollTop:0}); //設定回頁面頂端
		return false;	
	});
	/*
    jQuery(window).scroll(function() {
        if ( jQuery(this).scrollTop() > 300){ //設定大於300px才顯示浮層
            a.fadeIn("fast");
        } else {
            a.stop().fadeOut("fast");
        }
    });*/
}); 


/* 滑動的GOTO javascript:goTop(''); */
function goTop(val) {
	var gotop_i = 60
	$('html,body').animate({scrollTop: jQuery(val).offset().top - gotop_i });
};


/*滑鼠移置特定高度時，黏人精顯現
jQuery(window).scroll(function() {
	if ( jQuery(this).scrollTop() > 300){ //設定大於300px才顯示浮層
		//.show('fast');
		$(".fixarea").addClass('fixarea_off');
	} else {
		//$(".fixarea").hide();
		$(".fixarea").removeClass('fixarea_off');
	}
});*/


/*Phone置底選單*/
$(function(){
	var $ff = $('.Fixedfooter');
	var li = '.Fixedfooter_box li';
	var s = '.Fixedfooter-slide';
	var b = '.Fixedfooter_bg';
	var a = '.Fixedfooter_agree';
	var cate_open = 'cate-open';
	var cate_hover = 'cate-hover';
	var c ;
	//點按鈕高亮
	$ff.delegate(li ,'click',function(){
		$(this).addClass(cate_hover).siblings(li).removeClass(cate_hover);
		var i = $(this).index();
		ffbox_bg(i);
		icon_animated(i)
	});
	//點按鈕打開浮層
	$ff.delegate( s ,'click',function(){
		var i = $(this).index(s);
		//console.log('改變前c:'+ c + ' i:' + i );
		if ( $ff.hasClass(cate_open) ){
			//有打開時判斷要打開還是關閉
			if ( i == c ){
				close(); //同一個
			} else {
				open(i); //不同
			};
		} else {
			open(i);
		};
		c = i;
		//console.log('改變後c:'+ c + ' i:' + i );
	});
	//點黑區
	$ff.delegate( b ,'touchstart click',function(e){
		close()
		e.preventDefault();
		$ff.find(li).find('i').removeClass(); //icon動動
	});
	//打開
	function open(i){
		$ff.addClass(cate_open);
		$ff.find(a).fadeOut(0);
		$ff.find(a).eq(i).fadeIn(0);
	}
	//關閉
	function close(){
		$ff.removeClass(cate_open);
		$ff.find(li).removeClass(cate_hover).each(function(i) {
			if ( $(this).hasClass('index') ) {
				$(this).addClass(cate_hover)
				ffbox_bg(i);
			}
		});
		$ff.find(a).fadeOut(0); //浮層
		$ff.find(li).find('i').removeClass(); //icon動動
	}
	//選單底圖移動
	function ffbox_bg(i){
		var l = $ff.find(li).length;
		$ff.find('.Fixedfooter_box .bg').css('transform', 'translateX(' + 100/l * i + '%)');
	}
	//目前高亮選單底圖移動
	function ffbox_bgindex(){
		var l = $ff.find(li).length;
		var i = $ff.find(li + '.index').index()
		$ff.find('.Fixedfooter_box .bg').css('transform', 'translateX(' + 100/l * i + '%)');
	};ffbox_bgindex();
	//icon動動
	function icon_animated(i){
		var c = 'animated tada';
		$ff.find(li).eq(i).find('i').addClass( c );
		$ff.find(li).eq(i).siblings(li).find('i').removeClass( c );
	}
}); 


/* 詳情浮層區*/
function agree(val) {
	$(val).fadeIn();
	var winST =  jQuery(window).scrollTop(); //目前位置
	var winH =  jQuery(window).height(); //裝置高度
	//浮層高度
	$(val).find('.agreeArea .txtArea').css('height', winH * 60 / 100 );
	var this_agreeH = $(val).find('.agreeArea').height();
	//浮層top定位
	$('.agreeArea').css('top', winST + winH/2 - this_agreeH/2 );
}
$(function(){
	var blackBox = $(".blackBox");
	var blackBox_close = $(".blackBox .close , .blackBox .but-close");
	var blackBox_BOXclose = ".Boxclose , .fixedfooterArea_B ";
	//點按鈕關閉
	blackBox_close.delegate( "a" ,"touchstart click",function(e){
		$(blackBox).fadeOut();
		e.preventDefault();
	});
	//點黑區關閉
	blackBox.delegate( blackBox_BOXclose ,"touchstart click",function(e){
		$(blackBox).fadeOut();
		e.preventDefault();
	});
});
 

/*TimeSwitch指定時間開關物件
  -----------------------------------------------
  啟動器: style="display:none;" data-TimeSwitch_start="2019/2/12 00:00:00" data-TimeSwitch_end="2019/2/20 23:59:59" data-TimeSwitch_Myswitch="1"
  說明:
  data-TimeSwitch_start		開始時間
  data-TimeSwitch_end		結束時間
  data-TimeSwitch_Myswitch	動作 0刪除、1打開
  -----------------------------------------------*/
//$(function() {
$(window).load(function(){
	$("[data-TimeSwitch_start]").each(function() {
		var TimeSwitch = new Date();
		var TimeSwitchmonth  = TimeSwitch.getMonth()+1; //月
		var TimeSwitchday    = TimeSwitch.getDate(); //日
		var TimeSwitchhour   = TimeSwitch.getHours();  //時
		var TimeSwitchminute = TimeSwitch.getMinutes();  //分
		var TimeSwitchsecond = TimeSwitch.getSeconds();  //秒
		var TimeSwitchweek   = TimeSwitch.getDay(); //星期0~6 
		if( TimeSwitchmonth < 10 ){TimeSwitchmonth = '0' + TimeSwitchmonth;}  
		if( TimeSwitchday   < 10 ){TimeSwitchday   = '0' + TimeSwitchday;}  
		//範圍時間
		var Mydate_start = new Date( $(this).attr('data-TimeSwitch_start') );
		var Mydate_end   = new Date( $(this).attr('data-TimeSwitch_end') );
		var Myswitch     = $(this).attr('data-TimeSwitch_Myswitch') ;
		//Myswitch = 0 隱藏
		if ( Myswitch == 0){
				if ( Mydate_start <= TimeSwitch && TimeSwitch <= Mydate_end ) {
						$(this).remove();  //Myswitch:0, 時間內,刪除
				} else {
						$(this).show();  //Myswitch:0, 時間外,打開
				}
		}
		//Myswitch = 1 打開
		if ( Myswitch == 1){
				if ( Mydate_start <= TimeSwitch && TimeSwitch <= Mydate_end ) {
						$(this).show();   //Myswitch:1, 時間內,打開
				} else {
						$(this).remove();   //Myswitch:1, 時間外,刪除
				}
		}
	});
});


