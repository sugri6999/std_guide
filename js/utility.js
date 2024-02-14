/*--------------------------------------------------------------
	## Util - 유틸리티
--------------------------------------------------------------*/
var transitionend = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';

//콘솔뷰
var consoleLog = function(value){
	var delay = 3000;
	var setTime = null;
	var consoleHTML = '<div class="consoleLog"><div class="consoleLog-scroll"></div></div>';
	if ($('.consoleLog').length == 0){$('body').append(consoleHTML)}
	$('.consoleLog-scroll').append('<span class="consoleLog-item">'+value+'</span>');
	clearTimeout(setTime);
	setTime = setTimeout(function(){$('.consoleLog').fadeOut('fast', function(){$(this).remove()})}, delay);
}
// 스크립트파일 로드
var setScriptLoader = function(url, id, callback){
	if ($('#'+id).length == 0){
		$('head').append('<script src="'+url+'" id="'+id+'"></script>');
		if (callback){callback()}
	}
}
// Attribute 설정
var setAnchorAttr = function($this){
	$this.each(function(){
		if ($($(this).attr('href')).length && !$(this).is('[data-id]')){$(this).attr('data-id', $(this).attr('href'))}
		else if ($($(this).attr('data-id')).length > 0 && $(this).is('a')){$(this).attr('href', $(this).attr('data-id'))}
	})
}
// 실제값의 퍼센트 구하기 (실제값/최대값 * 100%)
var getPercent = function(val, max){
	var value = (val/max) * 100;
	return value;
}
// 퍼센트로 실제값 구하기 (퍼센트/100% * 최대값)
var getValue = function(val, max){
	var value = (val/100) * max;
	return value;
}
// 퍼센트 제외값 구하기 (최대값 - (퍼센트/100% * 최대값)
var getRemain = function(val, max){
	var value = max - ((val/100) * max);
	return value;
}
// 정규식 반환
var getRegExec = function(reg, str){
	return reg.exec(str);
}
// 정규식 확인
var getRegTest = function(reg, str){
	return regex.test(str);
}
// 숫자 반올림
var getNumRound = function(val, lens){
	return Math.round(val/lens) * lens;
}
// 숫자 올림
var getNumCeil = function(val, lens){
	return Math.ceil(val/lens) * lens;
}
// 숫자 내림
var getNumFloor = function(val, lens){
	return Math.floor(val/lens) * lens;
}
// 숫자 콤마변환
var getNumComma = function(val){
	return val.toLocaleString();
}
// 숫자 콤마삭제
var getNumCommaDel = function(val){
	var num = parseFloat(val.replace(/,/gi,""));
	if (isNaN(num)){return 0} else {return num}
}
// 소수점 변환
var getNumDecimal = function(val){
	return getRegTest('^[+-]?\d*(\.?\d*)$', val);
}
// 파라미터값 구하기
var getParamiter = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
		return null;
	} else {
		return results[1] || 0;
	}
}
// Ajax 로드
var callAjaxLoad = function(selector, frmName, callUrl, callback){
	var dataString = $("#"+frmName).serialize();
	$(selector).load(callUrl, dataString, callback);
}
// Ajax 실행
var callAjax = function(target, frmName, sendUrl, callback) {
	var dataString = $("#"+frmName).serialize();
	$.ajax({
		type:"POST",
		url:sendUrl,
		cache:false,
		async:false,
		dataType:"html",
		data:dataString,
		timeout:6000,
		success:function(data){
		// 통신이 성공적으로 이루어졌을때 이 함수를 타게 된다.
		$("#"+target).html(data);
			if (callback !==""){
				callback;
			}
		},
		/*complete:function(data){
		// 통신이 실패했어도 완료가 되었을때 이함수를 타게된다.
		// success 와 complete 둘 중 하나만 이용, 그렇지 않으면 두번실행
		},*/
		error:function(xhr, status, error){
		}
	});
}
// Document Target Length
var callThisTarget = function($this, callback){
	$(document).on('click focusin', function(e){
		if ($this.has(e.target).length == 0){
			if (callback){ callback() }
		}
	});
}
// Document Target Selector
var callChildTarget = function($this, callback){
	$(document).on('click focusin', function(e){
		if ($(e.target).is($this) == false){
			if (callback){ callback() }
		}
	})
}

/*
	기능명칭 : SET FOCUS
	기능상세 : 모달 노출시 배경포커스 잠금
*/
var setFocus = {
	eleTabIdx : 'a, button, select, input, textarea', //키보드제어 요소
	//포커스 비활성
	disable : function($module){
		var $siblings = $module.siblings();
		$siblings.not('[aria-hidden=true]').addClass('is-ariaHidden').attr({'aria-hidden':'true'});			// 자신의 아리아히든 설정
		$siblings.filter(this.eleTabIdx).not('[tabindex]').addClass('is-tabindex-none').attr({'tabindex':'-1'});	// 자신의 탭인덱스 없는요소 설정
		$siblings.filter('[tabindex=0]').addClass('is-tabindex-0').attr({'tabindex':'-1'});							// 자신의 탭인덱스 0 요소 설정
		$siblings.find(this.eleTabIdx).not('[tabindex]').addClass('is-tabindex-none').attr({'tabindex':'-1'});		// 자식의 탭인덱스 없는요소 설정
		$siblings.find('[tabindex=0]').addClass('is-tabindex-0').attr({'tabindex':'-1'});							// 자식의 탭인덱스 0 요소 설정
	},
	//포커스 활성화
	enable : function(){
		$('.is-ariaHidden').attr({'aria-hidden':'false'}).removeClass('is-ariaHidden'); // 모든 아리아히든 초기화
		$('.is-tabindex-0').attr({'tabindex':'0'}).removeClass('is-tabindex-0');		// 모든 탭인덱스 0 이었던 요소 초기화
		$('.is-tabindex-none').removeAttr('tabindex').removeClass('is-tabindex-none');								// 모든 탭인덱스 없었던 요소 초기화
	},
}

/*
	기능명칭 : SET SCROLL
	기능상세 : 모달 노출시 배경스크롤링 잠금
*/
var setScroll = {
    clsFixed : 'is-scroll-lock',
    scrTop : null,
    //스크롤 비활성
    disable : function(){
        this.scrTop = $(window).scrollTop();
        $('html, body').addClass(this.clsFixed);
        $('body').scrollTop(this.scrTop);
    },
    //스크롤 활성화
    enable : function(){
        $('html, body').removeClass(this.clsFixed);
        $(window).scrollTop(this.scrTop);
    },
}

/*
	기능명칭: Dimmer
*/

// var dimmer = {
//     eleModule : '.dimmer',
//     lens      : 0,
//     open: function($module, selector, callback){
//         var _this = this;
//         _this.lens = _this.lens + 1;
//         //딤이 없는경우 생성
//         if ($(_this.eleModule).length == 0){ $('body').append('<div class="dimmer" aria-hidden="true"></div>') };
//         setTimeout(function(){ $(_this.eleModule).addClass(_this.selector).addClass('is-active'); }); //딤활성화
//         setScroll.disable(); //스크롤비활성
//         setFocus.disable($module); //초점비활성
//         if (callback){callback} //콜백이 있는경우 실행
//     },
//     close: function($module, selector, callback){
//         var _this = this;
//         _this.lens = this.lens - 1;
//         //활성화된 딤이 없는경우 실행
//         if (_this.lens == 0){
//             setScroll.enable(); //스크롤활성화
//             setFocus.enable($module); //초점활성화
//             $(_this.eleModule).removeClass('is-active'); //딤제거
//             if (callback){callback} //콜백이 있는경우 실행
//         }
//     }
// }

var dimmer = {
    eleModule : '.dimmer',
    lens      : 0,
    open: function($module, selector, callback){
        var _this = this;
        _this.lens = _this.lens + 1;
        //딤이 없는경우 생성
        if ($(_this.eleModule).length == 0){ $('.popup-wrap').append('<div class="dimmer" aria-hidden="true"></div>') };
        setTimeout(function(){ $(_this.eleModule).addClass(_this.selector).addClass('is-active'); }); //딤활성화
        setScroll.disable(); //스크롤비활성
        setFocus.disable($module); //초점비활성
        if (callback){callback} //콜백이 있는경우 실행
    },
    close: function($module, selector, callback){
        var _this = this;
        _this.lens = this.lens - 1;
		// $(_this.eleModule).removeClass('is-active'); // 모달 선호출 상태에서 딤제거
        //활성화된 딤이 없는경우 실행
        if (_this.lens == 0){
            setScroll.enable(); //스크롤활성화
            setFocus.enable($module); //초점활성화
            $(_this.eleModule).removeClass('is-active'); //딤제거
            if (callback){callback} //콜백이 있는경우 실행
        }F
    }
}