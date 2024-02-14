var gRootURL = {
	root : '/',
}
var gBaseURL = {
	guide : gRootURL.root+'guide/',
	menu0 : gRootURL.root+'intro/',
	menu1 : gRootURL.root+'guide/html/rule/',
	menu2 : gRootURL.root+'guide/html/plan/',
	menu3 : gRootURL.root+'guide/html/library/',
	menu4 : gRootURL.root+'ia/',
	menu5 : gRootURL.root+'guide/html/accessibility/',
	menu6 : gRootURL.root+'prototype/',
	//target : 'target="gContentFrame"',
	target : '',
}

var include = {
	meta : function(){
		document.write('<title>MBS_퍼블리싱가이드 - Standard Guide</title>');
		document.write('<meta http-equiv="X-UA-Compatible" content="IE=edge" />');
		document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />');
	},
	head : function(){
		document.write('<!-- Front -->');
		document.write('<link href="'+gRootURL.root+'css/import.css" rel="stylesheet" />');
		document.write('<link href="'+gRootURL.root+'css/style.css" rel="stylesheet" />');
		document.write('<link href="'+gRootURL.root+'css/lib/font-awesome.min.css" rel="stylesheet" />');
		document.write('<script src="'+gRootURL.root+'js/lib/jquery-3.3.1.min.js"></script>');
		document.write('<script src="'+gRootURL.root+'js/import_g.js"></script>');
		document.write('<script src="'+gRootURL.root+'js/lib/prefixfree.min.js"></script>');

		document.write('<!-- Guide -->');
		document.write('<link href="'+gBaseURL.guide+'css/layout.css" rel="stylesheet" />');
		document.write('<link href="'+gBaseURL.guide+'css/ui.css" rel="stylesheet" />');
		document.write('<link href="'+gBaseURL.guide+'css/guide.css" rel="stylesheet" />');
		document.write('<link href="'+gBaseURL.guide+'css/setting.css" rel="stylesheet" />');
		document.write('<script src="'+gBaseURL.guide+'js/import.js"></script>');
	},
	header : function(){
		document.write('	<header id="g-header">');
		document.write('		<div class="g-header-inner">');
		document.write('			<h1 class="g-logo"><a href="'+gBaseURL.guide+'">현대해상 MBS</a></h1>');
		document.write('			<button type="button" class="g-btn-aside"><span>Menu</span></button>');
		document.write('			<nav class="g-lnb">');
		document.write('				<ul>');
		//document.write('					<li><a href="'+gBaseURL.menu0+'intro.html" data-aside="g-snbMenu0" data-url="'+gBaseURL.menu0+'">Intro</a></li>');
		document.write('					<li><a href="'+gBaseURL.menu1+'rule_intro.html" data-aside="g-snbMenu1" data-url="'+gBaseURL.menu1+'">규칙가이드</a></li>');
		document.write('					<li><a href="'+gBaseURL.menu2+'plan_codeset.html" data-aside="g-snbMenu2" data-url="'+gBaseURL.menu2+'">설계가이드</a></li>');
		document.write('					<li><a href="'+gBaseURL.menu3+'elements_color.html" data-aside="g-snbMenu3" data-url="'+gBaseURL.menu3+'">라이브러리</a></li>');
		// document.write('					<li><a href="'+gBaseURL.menu4+'ia_index.html" data-aside="g-snbMenu4" data-url="'+gBaseURL.menu4+'">메뉴현황판</a></li>');
		// document.write('					<li><a href="'+gBaseURL.menu5+'wa_index.html" data-aside="g-snbMenu5" data-url="'+gBaseURL.menu5+'">접근성점검</a></li>');
		// document.write('					<li><a href="'+gBaseURL.menu6+'prototype_conventions.html" data-aside="g-snbMenu6" data-url="'+gBaseURL.menu6+'">가이드템플릿</a></li>');
		document.write('				</ul>');
		document.write('			</nav>');
		document.write('		</div>');
		document.write('	</header>');
	},
	aside : {
		init : function(){
			this.opneHTML();
			this.menu0();
			this.menu1();
			this.menu2();
			this.menu3();
			this.menu4();
			this.menu5();
			this.menu6();
			this.closeHTML();
		},
		opneHTML : function(){
			document.write('	<aside id="g-aside">');
			document.write('		<div class="g-js-scroll g-aside-scroll">');
			document.write('			<nav class="g-snb">');
		},
		closeHTML : function(){
			document.write('			</nav>');
			document.write('		</div>');
			document.write('	</aside>');
		},

		//인트로:프로필
		menu0 : function(){
			var baseURL = gBaseURL.menu0;
			document.write('				<!-- Intro -->');
			document.write('				<ul class="g-depth1 g-snbMenu0">');
			document.write('					<li class="g-node1">');
			document.write('						<a href="javascript:;">인트로</a>');
			document.write('						<ul class="g-depth2">');
			document.write('							<li class="g-node2"><a href="'+baseURL+'intro.html">Intro</a></li>');
			document.write('						</ul>');
			document.write('					</li>');
			document.write('				</ul>');
			document.write('				<!-- //Intro -->');
		},

		//규칙가이드
		menu1 : function(){
			var baseURL = gBaseURL.menu1;
			document.write('				<!-- Convention -->');
			document.write('				<ul class="g-depth1 g-snbMenu1">');
			document.write('					<li class="g-node1">');
			document.write('						<a href="javascript:;">규칙가이드</a>');
			document.write('						<ul class="g-depth2">');
			document.write('							<li class="g-node2"><a href="'+baseURL+'rule_intro.html">기본정책</a></li>');
			document.write('							<li class="g-node2"><a href="'+baseURL+'rule_standard.html">표준규칙</a></li>');
			document.write('							<li class="g-node2"><a href="'+baseURL+'rule_code.html">코드규칙</a></li>');
			document.write('							<li class="g-node2"><a href="'+baseURL+'rule_name.html">네임규칙</a></li>');
			document.write('						</ul>');
			document.write('					</li>');
			document.write('				</ul>');
			document.write('				<!-- //Convention -->');
		},

		//설계가이드
		menu2 : function(){
			var baseURL = gBaseURL.menu2;
			document.write('				<!-- Globals -->');
			document.write('				<ul class="g-depth1 g-snbMenu2">');
			document.write('					<li class="g-node1">');
			document.write('						<a href="javascript:;">설계가이드</a>');
			document.write('						<ul class="g-depth2">');
			document.write('							<li class="g-node2"><a href="'+baseURL+'plan_codeset.html">Codeset</a></li>');
			document.write('							<li class="g-node2"><a href="'+baseURL+'plan_layout.html">Layout</a></li>');
			document.write('							<li class="g-node2"><a href="'+baseURL+'plan_nav.html">Navigation</a></li>');
			document.write('							<li class="g-node2"><a href="'+baseURL+'plan_general.html">General</a></li>');
			document.write('							<li class="g-node2"><a href="'+baseURL+'plan_wai.html">WAI-ARIA</a></li>');
			//document.write('							<li class="g-node2"><a href="'+baseURL+'plan_library.html">Library</a></li>');
			document.write('						</ul>');
			document.write('					</li>');
			document.write('				</ul>');
			document.write('				<!-- //Globals -->');
		},

		//Library
		menu3 : function(){
			var baseURL = gBaseURL.menu3;
			document.write('				<!-- library -->');
			document.write('				<ul class="g-depth1 g-snbMenu3">');
			document.write('					<li class="g-node1">');
			document.write('						<dl role="presentation" class="accordion accordion-basic">');
			document.write('							<dt class="accordion-title">');
			document.write('								<a href="#accorMenu11" class="accordion-toggle" role="button" aria-controls="accorMenu11">');
			document.write('									<span class="accordion-label">Elements <i class="arw arw-toggle"></i></span>');
			document.write('								</a>');
			document.write('							</dt>');
			document.write('							<dd id="accorMenu11" class="accordion-content" aria-hidden="false">');
			document.write('								<ul class="g-depth2">');
			document.write('									<li class="g-node2"><a href="'+baseURL+'elements_color.html">Color</a></li>');
			document.write('									<li class="g-node2"><a href="'+baseURL+'elements_typo.html">Typography</a></li>');
			document.write('									<li class="g-node2"><a href="'+baseURL+'elements_app.html">App Bar</a></li>');
			document.write('									<li class="g-node2"><a href="'+baseURL+'elements_input.html">Text Input Field</a></li>');
			document.write('								</ul>');
			document.write('							</dd>');
			document.write('							<dt class="accordion-title">');
			document.write('								<a href="#accorMenu12" class="accordion-toggle" role="button" aria-controls="accorMenu12">');
			document.write('									<span class="accordion-label">Modules <i class="arw arw-toggle"></i></span>');
			document.write('								</a>');
			document.write('							</dt>');
			document.write('							<dd id="accorMenu12" class="accordion-content" aria-hidden="true">');
			document.write('								<ul class="g-depth2">');
			document.write('									<li class="g-node2"><a href="'+baseURL+'modules_tab.html">Tab</a></li>');
			document.write('								</ul>');
			document.write('							</dd>');
			document.write('							<dt class="accordion-title">');
			document.write('								<a href="#accorMenu13" class="accordion-toggle" role="button" aria-controls="accorMenu13">');
			document.write('									<span class="accordion-label">Addons <i class="arw arw-toggle"></i></span>');
			document.write('								</a>');
			document.write('							</dt>');
			document.write('							<dd id="accorMenu13" class="accordion-content" aria-hidden="true">');
			document.write('								<ul class="g-depth2">');
			document.write('									<li class="g-node2"><a href="'+baseURL+'bx_slider.html">BX Slider</a></li>');
			document.write('								</ul>');
			document.write('							</dd>');
			document.write('						</dl>');
			document.write('					</li>');
			document.write('				</ul>');
			document.write('				<!-- //library -->');
		},

		//Status Board
		menu4 : function(){
			var baseURL = gBaseURL.menu4;
			document.write('				<!-- Status Board -->');
			document.write('				<ul class="g-depth1 g-snbMenu4">');
			document.write('					<li class="g-node1">');
			document.write('						<a href="'+baseURL+'ia_index.html">Status Board</a>');
			document.write('						<ul class="g-depth2">');
			document.write('							<li class="g-node2"><a href="'+baseURL+'ia_index.html">메뉴현황판</a></li>');
			document.write('						</ul>');
			document.write('					</li>');
			document.write('				</ul>');
			document.write('				<!-- //Status Board -->');
		},

		//Modules
		menu5 : function(){
			var baseURL = gBaseURL.menu5;
			document.write('				<!-- Checklist -->');
			document.write('				<ul class="g-depth1 g-snbMenu5">');
			document.write('					<li class="g-node1">');
			document.write('						<a href="'+baseURL+'wa_index.html">웹접근성</a>');
			document.write('						<ul class="g-depth2">');
			document.write('							<li class="g-node2"><a href="'+baseURL+'wa_index.html">웹접근성 개요</a></li>');
			document.write('							<li class="g-node2"><a href="'+baseURL+'wa_part.html">역할별 체크리스트</a></li>');
			document.write('							<li class="g-node2"><a href="'+baseURL+'wa_process.html">개선작업 프로세스</a></li>');
			document.write('							<li class="g-node2"><a href="'+baseURL+'wa_names.html">기본명칭 정의예시</a></li>');
			//document.write('							<li class="g-node2"><a href="'+baseURL+'wa_rule1.html">인식의 용이성</a></li>');
			//document.write('							<li class="g-node2"><a href="'+baseURL+'wa_rule2.html">운용의 용이성</a></li>');
			//document.write('							<li class="g-node2"><a href="'+baseURL+'wa_rule3.html">이해의 용이성</a></li>');
			//document.write('							<li class="g-node2"><a href="'+baseURL+'wa_rule4.html">견고성</a></li>');
			document.write('						</ul>');
			document.write('					</li>');
			document.write('				</ul>');
			document.write('				<!-- //Checklist -->');
		},

		//샘플메뉴
		menu6 : function(){
			var baseURL = gBaseURL.menu6;
			document.write('				<!-- Prototype -->');
			document.write('				<ul class="g-depth1 g-snbMenu6">');
			document.write('					<li class="g-node1">');
			document.write('						<a href="javascript:;">Prototype</a>');
			document.write('						<ul class="g-depth2">');
			document.write('							<li class="g-node2"><a href="'+baseURL+'prototype_conventions.html">컨텐츠 템플릿</a></li>');
			document.write('							<li class="g-node2"><a href="'+baseURL+'prototype_standard.html">표준 템플릿</a></li>');
			document.write('							<li class="g-node2"><a href="'+baseURL+'prototype_markup.html">마크업 템플릿</a></li>');
			document.write('						</ul>');
			document.write('					</li>');
			document.write('				</ul>');
			document.write('				<!-- //Prototype -->');
		},
	},
	quick : {
		init : function(){
			this.opneHTML();
			this.closeHTML();
		},
		opneHTML : function(){
			document.write('	<div id="g-quick">');
			document.write('		<div class="g-js-scroll g-quick-scroll">');
			document.write('			<nav class="g-qnb">');
		},
		closeHTML : function(){
			document.write('			</nav>');
			document.write('		</div>');
			document.write('	</div>');
		},
	},
	footer : function(){
		document.write('	<a href="#g-wrap" id="goTop" class="g-top" data-role="spy-scroll">TOP</a>');
		document.write('	<div class="g-mask"></div>');
	},
}