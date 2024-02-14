/*--------------------------------------------------------------
	## UI - 모듈공통
--------------------------------------------------------------*/
var ui = {
	init: function(){
		console.log('ui.init()');

		// if ($('.btn').length)				{this.waveEffect.init();}		// #Btn Effect
		if ($('.gnb-dropdown').length)		{this.gnb_dropdown.init();}		// #Gnb Dropdown
		if ($('.gnb-fulldown').length)		{this.gnb_fulldown.init();}		// #Gnb Fulldown
		if ($('.tab-nav').length)			{this.tab.init();}				// #Tab
		if ($('.accordion').length)			{this.accordion.init();}		// #Accordion
		if ($('[data-role=fold]').length)	{this.foldToggle.init();}		// #Folder (접기)
		if ($('[data-role=more]').length)	{this.moreToggle.init();}		// #FolderMore (더보기)
		if ($('.tooltip').length)			{this.tooltip.init();}			// #Tooltip
		if ($('.drop').length)				{this.drop.init();}				// #Dropdown
		if ($('.drop-select').length)		{this.dropSelect.init();}		// #Dropdown
		//HTML Property Events : onclick="ui.popup.open('id', this)"		// #Popup
		if ($('.js-sticky').length)			{this.sticky.init();}			// Sticky
		if ($('.js-spyScroll').length)		{this.spyScroll.init();}		// Spy Scroll
		if ($('.js-infinitScroll').length)	{this.infiniteScroll.init();}	// Infinit Scroll
		if ($('.js-floating').length)		{this.floating.init();}			// Floating
		if ($('.js-dimmer').length)			{this.dimmer.init();}			// Dimmer
		if ($('.js-progress').length)		{this.progress.init();}			// Progress
		if ($('.js-waypoint').length)		{this.waypoint.init();}			// Waypoint
	},

	// waveEffect : {
	// 	init : function(){
	// 		this.event();
	// 	},
	// 	event : function(){
	// 		/* Add the class effect on button */
	// 		$('.btn, .g-snb .g-depth2 .g-node2 > a').not('.not-effect').on('click', function(e) {
	// 			var self = $(this),
	// 				wave = '.effect-wave',
	// 				/* Get the width of button (if different buttons types) */
	// 				btnWidth = self.outerWidth(),
	// 				x = e.offsetX,
	// 				y = e.offsetY;
	// 			self.prepend('<span class="effect-wave"></span>');
	// 			console.log(e);
	// 			$(wave)
	// 			.css({'top': y, 'left': x})
	// 			.animate({opacity: '0', width: btnWidth * 2.2, height: btnWidth * 2.2 }, 500, function() {
	// 				self.find(wave).remove();
	// 			})
	// 		})
	// 	}
	// },

	fileAttach: function(obj, e){
		// 파일첨부 - 파일명적용
		var sel_files = [];
		var $eleFormText = $(obj).closest('.file').find('input[type=text]');
		var $eleFormImg = $(obj).closest('.file').find('.file-preview');

		var action = function(){
			//파일명 적용
			if ($eleFormText.length){
				var fileValue = $(obj).val().split("\\");
				var fileName = fileValue[fileValue.length-1];
				$eleFormText.val(fileName);
			}

			if ($eleFormImg.length){
				//이미지 사진보기
				var files = e.target.files;
				var filesArr = Array.prototype.slice.call(files);

				filesArr.forEach(function(f){
					if (!f.type.match("image.*")){
						alert('확장자는 이미지 확장자만 가능합니다.');
						return;
					}
					sel_files.push(f);

					var reader = new FileReader();
					reader.onload = function(e){
						var eleImg = '<img src="'+e.target.result+'" alt="첨부된파일">';
						$eleFormImg.html(eleImg);
					}
					reader.readAsDataURL(f);
				})
			}
		}
		action();
	},

	// 파일첨부 - 추가
	fileAttachAdd: function(obj){
		var $group = $(obj).closest('.file-group'),
			idx = $group.find('.file').length,
			id = 'sFilesAdd'+idx,
			html = '<div class="file">'+
					'	<input type="text" class="form-input" title="첨부된 파일명" readonly>'+
					'	<label class="btn style-1" role="button" tabindex="0">'+
					'		<span>파일첨부</span>'+
					'		<input type="file" name="" value="" placeholder="" title="" class="file-hide" tabindex="-1" aria-hidden="true" onchange="ui.fileAttach(this, event);">'+
					'	</label>'+
					'</div>';
			$group.append(html);
	},

	// 파일첨부 - 삭제
	fileAttachDe: function(obj){
		$(obj).closest('.file').remove();
	},

	//#Gnb Dropdown
	gnb_dropdown : {
		eleNode1_item : '.gnb-dropdown .node1-item',
		eleNode2_item : '.gnb-dropdown .node2-item',
		init: function(){
			var setTime = null;
			$(this.eleNode1_item).not('.is-entered').on('mouseenter focusin', function(){
				clearTimeout(setTime);
				$(this).addClass('is-active').find('> a').attr({'aria-expanded':'true'});
				$(this).siblings().removeClass('is-active').find('> a').attr({'aria-expanded':'false'});
			}).addClass('is-entered');
			$(this.eleNode1_item).not('.is-leaved').on('mouseleave focusout', function(){
				var $this = $(this);
				setTime = setTimeout(function(){ $this.removeClass('is-active') });
			}).addClass('is-leaved');
		},
		set : function(n1, n2){
			$(this.eleNode1_item).eq(n1).addClass('is-current').siblings().removeClass('is-current');
			$(this.eleNode2_item).eq(n2).addClass('is-current').siblings().removeClass('is-current');
		}
	},

	//#Gnb Fulldown
	gnb_fulldown : {
		eleModule : '.gnb-fulldown',
		eleNode1_item : '.gnb-fulldown .node1-item',
		eleNode2_list : '.gnb-fulldown .node2-list',
		eleNode2_item : '.gnb-fulldown .node2-item',
		init : function(){
			var _this = this, setTimeEnter1 = null; setTimeLeave1 = null; setTimeLeave2 = null;
			// 1Depth
			$(this.eleNode1_item).not('.is-entered').on('mouseenter focusin', function(){
				var $this = $(this);
				clearTimeout(setTimeLeave1); // 포커스가 있으면 타이커 초기화
				setTimeEnter1 = setTimeout(function(){
					$(_this.eleNode1_item).removeClass('is-active');
					$(_this.eleNode1_item).find('> a').attr({'aria-expanded':'true'});
					$(_this.eleModule).addClass('is-active');
					$this.addClass('is-active');
				},100);
			}).addClass('is-entered');
			$(this.eleNode1_item).not('.is-leaved').on('mouseleave focusout', function(){
				clearTimeout(setTimeEnter1);
				setTimeLeave1 = setTimeout(function(){
					$(_this.eleModule).removeClass('is-active');
					$(_this.eleNode1_item).find('> a').attr({'aria-expanded':'false'});
				},100);
			}).addClass('is-leaved');

			// 2Depth
			$(this.eleNode2_list).not('.is-entered').on('mouseenter focusin', function(){
				clearTimeout(setTimeLeave2);
				$(_this.eleNode2_list).removeClass('is-active');
				$(this).addClass('is-active');
			}).addClass('is-entered');
			$(this.eleNode2_list).not('.is-leaved').on('mouseleave focusout', function(){
				var $this = $(this);
				setTimeLeave2 = setTimeout(function(){
					$this.removeClass('is-active');
				},100);
			}).addClass('is-leaved');
		},
		set : function(n1, n2){
			$(this.eleNode1_item).eq(n1).addClass('is-current').siblings().removeClass('is-current');
			$(this.eleNode2_item).eq(n2).addClass('is-current').siblings().removeClass('is-current');
		}
	},

	/*
		기능정의: #Tab
		연결방식: aria-controls="" / id=""
		참고경로: modules/modules_tab.html
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
	*/
	tab : {
		eleButton : '.tab-nav a',
		eleContent : '.tab-content',
		clsActive : 'is-active',
		init : function(){
			var _this = this;
			$(this.eleContent+'.'+this.clsActive).each(function(){_this.action('#'+$(this).attr('id'))});
			this.event($(this.eleButton));
		},
		event : function($this){
			var _this = this;
			$this.not('.is-evented').on('click', function(){
				_this.action($(this).attr('href')); return false;
			}).attr('.is-evented');
		},
		action : function(id){
			$(this.eleButton+'[href="'+id+'"]').attr({'aria-selected':'true'}).removeAttr('aria-expanded').parent().addClass(this.clsActive).siblings().removeClass(this.clsActive).children().attr({'aria-selected':'false', 'aria-expanded':'false'});
			$(id).addClass(this.clsActive).attr('aria-hidden', 'false').siblings().removeClass(this.clsActive).attr('aria-hidden', 'true');
		},
	},
	

	/*
		기능정의: #acco
		연결방식: href="" / id=""
		참고경로: modules/modules_acco.html
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
	*/
	accordion : {
        eleModule : '.accordion',
        eleButton : '.accordion-toggle',
        eleTitle : '.accordion-title',
        eleContent : '.accordion-content',
        clsActive : 'is-active',
        duration : 300,
        init : function(){
            this.reset();
            this.disable();
            this.event($(this.eleButton));
        },
        reset : function(){
            var _this = this;
            $('.accordion-basic' ).each(function(k){
				$(this).attr({'data-sync':'true', 'data-toggle':'true' });
			})
			$('.accordion-basic2').each(function(k){
				$(this).attr({'data-sync':'true', 'data-toggle':'false'});
			})
			$('.accordion-basic3').each(function(k){
				$(this).attr({'data-sync':'true', 'data-toggle':'true'});
			})
			$('.accordion-basic5').each(function(k){
				$(this).attr({'data-sync':'true', 'data-toggle':'true'});
			})
        },
        event : function($this){
            var _this = this;
            $this.not('.is-clicked, [disabled]').on('click', function(){
                _this.action($(this).attr('href')); return false;
            }).addClass('is-clicked');
        },
        action : function(id){
            var $toggle = $(this.eleButton+'[href="'+id+'"]'),
                $title = $toggle.closest(this.eleTitle),
                $module = $toggle.closest(this.eleModule),
                $content = $(id),
                clsActive = this.clsActive;
 
            // Toggle 접기
            if ($module.attr('data-toggle') == 'true' && $content.hasClass(clsActive)){
                $title.removeClass(clsActive);
                $toggle.attr('aria-expanded','false');
                $content.stop().slideUp(this.duration, function(){$(this).removeClass(clsActive).attr('aria-hidden', 'true')});
            }
            // Syncroize 펼치기
            else if ($module.attr('data-sync') == 'true' && !$content.hasClass(clsActive)){
                $title.addClass(clsActive).find(this.eleButton).attr('aria-expanded','true');
                $title.siblings(this.eleTitle).removeClass(clsActive).find(this.eleButton).attr('aria-expanded','false');
                $content.stop().slideDown(this.duration, function(){$(this).addClass(clsActive).attr('aria-hidden', 'false')});
                $content.siblings(this.eleContent).stop().slideUp(this.duration, function(){$(this).removeClass(clsActive).attr('aria-hidden', 'true')});
            }
            // Default 펼치기
            else if ($module.attr('data-sync') == 'false' && !$content.hasClass(clsActive)){
                $title.addClass(clsActive).find(this.eleButton).attr('aria-expanded','true');
                $content.stop().slideDown(this.duration, function(){$(this).addClass(clsActive).attr('aria-hidden', 'false')});
            }
            // 토글이 아니면 생성된 aria-expanded 속성삭제
            if ($module.attr('data-toggle') == 'false' && $toggle.attr('aria-expanded') == 'true'){
                $toggle.removeAttr('aria-expanded');
            }
            this.disable();
        },
        disable : function(){
            $(this.eleButton+'[disabled]').each(function(){
                 $(this).removeAttr('aria-expanded');
                 $(this).attr('aria-disabled', 'true');
                 $(this).off('click');
            })
        }
    },

	/*
		기능정의: #Folder
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	foldToggle : {
		eleButton: '.fold-toggle[data-role=fold]',
		eleContent: '.fold-cont',
		eleFocus: '.fold-focus',
		speed: 250,
		init : function(){
			var _this = this;
			this.event();
			$(this.eleContent).each(function(){ _this.reset($(this).attr('id')) });
		},
		reset : function(id){
			var $button = $('[aria-controls='+id+']');
			if ($('#'+id).is(':visible') == true){ $button.attr({'aria-expanded':'true'}) }
			else { $button.attr({'aria-expanded':'false'}) }
		},
		event : function(){
			var _this = this;
			$(this.eleButton).not('.is-clicked').on('click', function(){
				_this.action($(this).attr('aria-controls'));
			}).addClass('is-clicked');
		},
		action : function(id){
			var _this = this;
			$('#'+ id).stop().slideToggle(_this.speed, function(){ _this.reset(id) });
		}
	},

	/*
		기능정의: #FolderMore
		연결방식: data-target="" / data-name=""
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	moreToggle : {
		eleButton:	'.fold-toggle[data-role=more]',
		eleContent: '.fold-cont',
		eleHide:	'.fold-hide',
		eleFocus:	'.fold-focus',
		speed: 250,
		init: function(){
			var _this = this;
			this.event();
			$(this.eleContent).each(function(){ _this.reset($(this).attr('id')) });
		},
		reset: function(id, obj){
			var $button = $('[aria-controls='+id+']');
			var $eleHide = $('#'+id).find(this.eleHide);
			if ($eleHide.is(':visible') == true){
				$button.attr({'aria-expanded':'true'});
				$eleHide.removeAttr('hidden');
				if (typeof(obj) == 'object'){ obj.attr({'role':'text', 'tabindex':'0'}).focus(); }
			} else {
				$button.attr({'aria-expanded':'false'});
				$eleHide.attr('hidden');
			}
		},
		event: function(){
			var _this = this;
			$(this.eleButton).not('.is-clicked').on('click', function(){
				_this.action($(this).attr('aria-controls'));
			})
		},
		action: function(id){
			$('#'+id).find(this.eleHide).toggle();
			this.reset(id, $('#'+id).find(this.eleFocus));
		}
	},

	/*
		기능정의: #Tooltip
		참고사항: 설명
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	tooltip : {
		eleWrapper : '.tooltip-wrap',
		eleOpener : '.tooltip-open',
		eleCloser : '.tooltip-close',
		eleModule : '.tooltip',
		setTime : null,
		init : function(){
			this.event();
		},
		event : function(){
			var _this = this;
			$(this.eleOpener).not('.is-clicked').on('click', function(){ _this.open($(this).attr('href')); return false });
			$(this.eleCloser).not('.is-clicked').on('click', function(){ _this.close($(this).attr('href')); return false });
			$(this.eleWrapper).not('.is-overed').on('mouseover', function(){ _this.open('#'+$(this).find(_this.eleModule).attr('id')); });
			$(this.eleWrapper).not('.is-leaved').on('mouseleave', function(){ _this.close('#'+$(this).find(_this.eleModule).attr('id')); });
		},
		open : function(id){
			var _this = this;
			$(id).attr({'data-state':'null', 'aria-hidden':'false'});
			$(id).stop().fadeIn(200, function(){$(this).attr({'data-state':'opened'}).removeAttr('hidden'); });
			$(_this.eleOpener+'[href="'+id+'"]').attr({'aria-expanded':'true'});
		},
		close : function(id){
			var _this = this;
			$(id).attr({'data-state':'null', 'aria-hidden':'true'});
			$(id).stop().fadeOut(200, function(){$(this).attr({'data-state':'closed'}).attr('hidden'); });
			$(_this.eleOpener+'[href="'+id+'"]').attr({'aria-expanded':'false'});
		},
	},

	/*
		기능정의: #Drop
		참고사항: href="" / id="" 연결
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	drop: {
		eleWrap: '.drop',
		eleButton: '.drop-toggle',
		init: function(){
			this.event();
		},
		event: function(){
			var _this = this;
			var setTime;
			//토글이벤트(기본기능) Reflow 발생하므로 토글슬라이스 사용안함
			$(this.eleButton).not('.is-toggled').on('click', function(){
				var id = $(this).attr('aria-controls');
				var isActive = $(this).closest(_this.eleWrap).hasClass('is-active');
				if (isActive){ _this.close(id) } //활성화된 경우, 닫기
				if (!isActive){ _this.open(id) } //비활성화 경우, 열기
			}).addClass('is-toggled');
			//모듈내 포커스아웃 닫기 막기
			$(this.eleWrap).not('.is-focusin').on('focusin', function(){ clearTimeout(setTime) }).addClass('is-focusin');
			//모듈 포커스아웃 닫기
			$(this.eleWrap).not('.is-focusout').on('focusout', function(){
				var id = $(this).find(_this.eleButton).attr('aria-controls');
				if ($(this).hasClass('is-active')){ setTime = setTimeout(function(){ _this.close(id) }, 10) }
			}).addClass('is-focusout');
		},
		open: function(id){
			//초기화
			var $wrapActive = $(this.eleWrap).filter('.is-active');
			var idActive = $wrapActive.find(this.eleButton).attr('aria-controls');
			this.close(idActive);

			//활성화
			var $id = $('#'+id);
			var $button = $('[aria-controls='+id+']');
			var $wrap = $('#'+id).closest(this.eleWrap);
			$id.removeAttr('hidden');
			$button.attr({'aria-expanded':'true'});
			setTimeout(function(){ $wrap.addClass('is-active') });
		},
		close: function(id){
			var $id = $('#'+id);
			var $button = $('[aria-controls='+id+']');
			var $wrap = $('#'+id).closest(this.eleWrap);
			$wrap.removeClass('is-active');
			$id.one(transitionend, function(){
				if (!$wrap.hasClass('is-active')){
					$id.attr({'hidden':'hidden'});
					$button.attr({'aria-expanded':'false'});
				}
			})
		},
	},

	
	dropSelect : {
		eleModule: '.drop-select',
		eleLabel: '.drop-label',
		eleItem: '.drop-item',
		init : function(){
			this.event();
		},
		event : function(){
			var _this = this;
			$(this.eleModule).find(this.eleItem).children().not('.is-clicked').on('click', function(e){
				_this.action($(this));
				e.preventDefault();
			}).addClass('is-clicked');
		},
		action : function($link){
			var $eleCurrent = $link.closest(this.eleItem);
			var $eleModule = $link.closest(this.eleModule);
			var $eleLabel = $eleModule.find(this.eleLabel);
			$eleCurrent.attr({'hidden':'hidden'}).siblings().removeAttr('hidden');
			$eleLabel.text($link.text());
		},
	},
	

	/*
		기능정의: #Popup
		참고사항: 설명
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	popup: {
		eleModule: '.popup-wrap',
		eleOpener: '.popup-open',
		eleCloser: '.popup-close',
		eleFocus : '.popup-focus',
		zindex   : 1000,
		open: function(id, obj){
			var _this = this;
			var $id = $('#'+id);
			$(obj).attr({'data-popup': id});
			$id.removeAttr('hidden');
			setTimeout(function(){ $id.addClass('is-active') }, 0);
			$id.one(transitionend, function(){
				if ($(this).hasClass('is-active')){
					$(this).find(_this.eleFocus).attr('tabindex','0').focus();
				}
			});
			dimmer.open($id, 'dimmer-popup');
			return 'Popup Opened';
		},
		close: function(id, callback){
			var _this = this;
			var $id = $('#'+id);
			var $opner = $('[data-popup='+id+']');
			$id.removeClass('is-active');
			$id.one(transitionend, function(){
				if (!$(this).hasClass('is-active')){
					$id.attr('hidden', 'hidden');
					$opner.focus().removeAttr('data-popup');
					if (callback){ callback }
				}
			});
			dimmer.close($id, 'dimmer-popup');
			return 'Popup Closed';
		},
	},

	/*
		## Full Popup
		기능정의: 설명
		참고사항: 설명
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	fullpopup: {
		init: function(){
			this.event();
		},
		reset: function($this){
			ut.setAnchorAttr($this);
		},
			event: function(){
			this.action();
		},
		action: function(){
			console.log('Fullpopup Action');
		},
	},

	/*
		## Sticky
		기능정의: 설명
		참고사항: 설명
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	sticky: {
		init: function(){
			this.event();
		},
		event: function(){
			this.action();
		},
		action: function(){
			console.log('Sticky Action');
		},
	},

	/*
		## Spy Scroll
		기능정의: 설명
		참고사항: 설명
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	spyScroll: {
		init: function(){
			this.event();
		},
		event: function(){
			this.action();
		},
		action: function(){
			console.log('Spy Scroll Action');
		},
	},

	/*
		## Infinit Scroll
		기능정의: 설명
		참고사항: 설명
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	infiniteScroll: {
		init: function(){
			this.event();
		},
		event: function(){
			this.action();
		},
		action: function(){
			console.log('Infinit Scroll Action');
		},
	},

	/*
		## Floating
		기능정의: 설명
		참고사항: 설명
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	floating: {
		init: function(){
			this.event();
		},
		event: function(){
			this.action();
		},
		action: function(){
			console.log('Floating Action');
		},
	},

	/*
		## Dimmer
		기능정의: 설명
		참고사항: 설명
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	dimmer: {
		init: function(){
			this.event();
		},
		event: function(){
			this.action();
		},
		action: function(){
			console.log('Dimmer Action');
		},
	},

	/*
		## Progress
		기능정의: 설명
		참고사항: 설명
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	progress: {
		init: function(){
			this.event();
		},
		event: function(){
			this.action();
		},
		action: function(){
			console.log('Progress Action');
		},
	},

	/*
		## Waypoint
		기능정의: 설명
		참고사항: 설명
		참고메뉴: 대메뉴 > 중메뉴 > 소메뉴 > 화면명
		참고경로: /html/menu1/page.html
		(공통여부와 관계없이 확인이 가능한 대표화면 적용)
	*/
	waypoint: {
		init: function(){
			this.event();
		},
		event: function(){
			this.action();
		},
		action: function(){
			console.log('Waypoint Action');
		},
	},
}


/*--------------------------------------------------------------
	## Init - 초기실행
--------------------------------------------------------------*/
$(document).ready(function(){
	dv.init();   // 유틸리티 - pub_utility.js

	
	// $(".form_wrap").click(function(){
	// 	if($(".form_wrap").hasClass("is-focused")){
	// 		$(".form_wrap").removeClass("is-focused");
	// 	} else{
	// 		$(".form_wrap").addClass("is-focused");
	// 	}
	// });

	/* input 텍스트 clear */
	$('.form_wrap').each(function(){
		$(this).find('.form-input').on('keyup focus', function(){
			$(this).siblings('.btn_clear').attr('style', 'visibility: visible');
		
			if($(this).val().length == 0){
				$(this).siblings('.btn_clear').attr('style', 'visibility: hidden');
			} else {
				$(this).siblings('.btn_clear').attr('style', 'visibility: visible');
			}
		});
	
		$(this).find('.form-input').on('blur', function(){
			$(this).siblings('.btn_clear').attr('style', 'visibility: hidden');
		});
	
		$(this).find('.btn_clear').on('click touchstart', function(){
			$(this).closest('.form_wrap').find('.form-input').val('');
			$(this).closest('.form_wrap').find('.btn_clear').attr('style', 'visibility: hidden');
			return false;
		});
	});
	// $('.form_wrap').each(function(){
	// 	$(this).find('.form-input').on('keyup focus', function(){
	// 		$(this).siblings('.btn_clear').attr('style', 'visibility: visible');
		
	// 		if($(this).val().length == 0){
	// 			$(this).siblings('.btn_clear').attr('style', 'visibility: visible');
	// 		} else {
	// 			$(this).siblings('.btn_clear').attr('style', 'visibility: visible');
	// 		}
	// 	});
	
	// 	$(this).find('.form-input').on('blur', function(){
	// 		$(this).siblings('.btn_clear').attr('style', 'visibility: visible');
	// 	});
	
	// 	$(this).find('.btn_clear').on('click touchstart', function(){
	// 		$(this).closest('.form_wrap').find('.form-input').val('');
	// 		$(this).closest('.form_wrap').find('.btn_clear').attr('style', 'visibility: visible');
	// 		return false;
	// 	});
	// });
	
	$("#datenumber").keyup(function() {
		var replace_text = $(this).val().replace(/[^-0-9]/g, '');
		$(this).val(replace_text);
	});

	// 모달외부영역 클릭시 닫히게
	// $(document).mouseup(function (e){
	// 	var LayerPopup = $(".popup-wrap");
	// 	var dimmer = $(".dimmer");
	// 	if(LayerPopup.has(e.target).length === 0){
	// 		LayerPopup.removeClass("is-active");
	// 		dimmer.removeClass("is-active");
	// 	}
	// });

	// 체크박스 전체 선택
	// $(".checkbox_group").on("click", "#check_all", function () {
	// 	$(this).parents(".checkbox_group").find('input').prop("checked", $(this).is(":checked"));
	// });
	$("#check_all").click(function () {
		if ($("#check_all").is(":checked")) $(".checkbox_group input[type=checkbox]").prop("checked", true);
		else $(".checkbox_group input[type=checkbox]").prop("checked", false);
	});
	$(".checkbox_group input[type=checkbox]").click(function () {
		var total = $(".checkbox_group input[type=checkbox]").length;
		var checked = $(".checkbox_group input[type=checkbox]:checked").length;

		if (total != checked) $("#check_all").prop("checked", false);
		else $("#check_all").prop("checked", true);

		if ( $("#check_all").prop("checked") ) {
			$('.checkbox_group .box_check').addClass("selected");
		} else {
			$('.checkbox_group .box_check').removeClass("selected");
		}
	});

	// 전체동의 체크박스 박스라인
	$(".box_check input:checkbox").click(function(){
		if ( $(this).prop('checked') ) {
			$(this).parent().addClass("selected");
			$(this).child().addClass("selected");
		} else {
			$(this).parent().removeClass("selected");
		}
	});
	
	
	// 숫자만 입력
	$("input:text[numberOnly]").on("keyup", function() {
		$(this).val($(this).val().replace(/[^0-9]/g,""));
	});
	
	// 박스라인 활성화
	$(".item_divider").click(function(){
		$(this).toggleClass("is-active");
		$(this).siblings().removeClass("is-active");
	})
	
	// 박스라인 활성화
	$(".self_write").click(function(){
		$(this).toggleClass("is-focused");
		$(this).siblings().removeClass("is-focused");
	})
	
	// txtArea 자동높이
	var txtArea = $(".list_type01");
    if (txtArea) {
        txtArea.each(function(){
            $(this).height(this.scrollHeight);
        });
    }

	//  라디오 버튼 중앙 라인
	$(".radio-wrap").click(function(){
		$(this).removeClass("bordered");
	})

	// 박스라인 활성화
	$(".over_event .card").click(function(){
		$(this).toggleClass("is-active");
		$(this).siblings().removeClass("is-active");
	})

	// 텍스트필드 포커싱시 라인적용
	$(".form_item input").focus(function(e){
		var el = $(e.target).closest('.form_item')
		el.siblings('.form_item').removeClass("is-focused");
		el.addClass("is-focused");
	});

	// 아코디언 셀렉트
	var accor_tab = $('.accor .accor_title'), accor_content = $('.accor .accor_contents');
        accor_tab.on('click', function(e){
            e.preventDefault();
			accor_tab.removeClass('active');
			accor_tab.parent().removeClass('is-focused'); // 01/17 어코디언 닫힐때 포커싱 테두리제거
			// accor_tab.child().removeClass('is-active');
			accor_content.slideUp('normal');
            if($(this).next().is(':hidden') == true) {
				$(this).addClass('active');
				$(this).parent().addClass('is-focused'); // 01/17 어코디언 열릴때 포커싱 테두리
                $(this).next().slideDown('normal');
             } 			  
     });

	 $(".scr_tab .btn_toggle").click(function () {
		$('.scr_tab .tab-nav').toggleClass("active");
		console.log($('.scr_tab .tab-nav').hasClass("active"));
	});

});

// 날짜 입력시 자동 yyyy.mm.dd 형식으로 만들기
function date_mask(objValue) {
	var v = objValue.replace("..", ".");

		if (v.match(/^\d{4}$/) !== null) {
			v = v + '.';
		} else if (v.match(/^\d{4}\.\d{2}$/) !== null) {
			v = v + '.';
		}

	return v;
}

// 휴대폰 뒷자리 자동하이픈
function autoHyphen(target) {
	target.value = target.value
	 .replace(/[^0-9]/g, '')
	 .replace(/^(\d{0,4})(\d{0,4})$/g, "$1-$2").replace(/(\-{1})$/g, "");
}
function phoneAutoHyphen(target) {
	target.value = target.value
	 .replace(/[^0-9]/g, '')
	 .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

// 체크시 버튼 활성화
function agreeCheck(frm) {
	if (frm.checkButton.disabled==true)
	 frm.checkButton.disabled=false
	else
	 frm.checkButton.disabled=true
}

// 초기화 버튼
function reset() {
	document.querySelectorAll("input[type=text]")[0].value="";
}


function clearInput(){
	var el = document.getElementsByClassName('input-text');
	for(var i=0; i<el.length; i++){	
		el[i].value = '';
	}
}


function fnMove(seq){
	var offset = $("#chkMove" + seq).offset();
	$('html, body').animate({scrollTop : offset.top}, 400);
}
