// 모바일 헤더 gnb 스크립트


function initMobileGnb(mobileGnb) {
    let html = $('html');
    let sidebarButton = mobileGnb.find('.MobileMenuOuterBtn');
    let MobileMenuOuter = mobileGnb.find('.MobileMenu01 a');

    sidebarButton.on('click', function () {
        if (mobileGnb.hasClass('open')) {
            mobileGnbClose(mobileGnb);
        } else {
            mobileGnbOpen(mobileGnb);
        }
    });

    MobileMenuOuter.on('click', function () {
        let thisLink = $(this);
        onClickMobileMenuOuter(thisLink);
    });

    function mobileGnbOpen(gnb) {
        gnb.addClass('open');
        html.addClass('not-scroll');
    }

    function mobileGnbClose(gnb) {
        gnb.removeClass('open');
        html.removeClass('not-scroll');
    }

    function onClickMobileMenuOuter(link) {
        let target = link.parent();
        let depthTarget = link.siblings('ul');
        let otherLinks = target.siblings('li');
        let otherItems = otherLinks.find('ul');

        if (target.hasClass('current')) {
            target.removeClass('current');
            depthTarget.stop().slideUp(300);
        } else {
            otherLinks.removeClass('current');
            otherItems.stop().slideUp(300);
            target.addClass('current');
            depthTarget.stop().slideDown(300);
        }
    }
    $(".MenuArea").on("mouseover", function () {
        $('select').blur();
        $('.datepicker').hide();
    });
}

$(document).ready(function () {
    //탭메뉴
    $('.TabMenu').click(function () {
        $(this).addClass('TabActive').siblings().removeClass('TabActive');

        var index = $(this).index();
        $(this).closest('.TabContainer').find('.TabContent').hide();
        $(this).closest('.TabContainer').find('.TabContent').eq(index).show();
    });

    /* PC 메뉴 */
    /*header .MenuArea에 마우스를 올리면 on클래스*/
    $("header .MenuArea").on("mouseenter focusin", function () {
        $("header .MenuArea").removeClass("On");
        $(this).addClass("On");
        $("header .HeaderBg").slideDown(100);
    });
    $("header").on("mouseleave", function () {
        //애니메이션 이벤트가 진행 중이 아닐때만 sildeUp을 진행함
        if (!$("header .HeaderBg").is(":animated")) {
            $("header .MenuArea").removeClass("On");
            $("header .HeaderBg").slideUp(10);
        }

    });

    $(window).blur(function () {
        $("header .MenuArea").removeClass("On");
        $("header .HeaderBg").slideUp(10);
    });

    $("header .MenuArea>ul>li:last-child>ul>li:last-child>ul>li:last-child").on("focusout", function () {
        if (!$("header .HeaderBg").is(":animated")) {
            $("header .MenuArea").removeClass("On");
            $("header .HeaderBg").slideDown(100);
        }
    });
    /*header .MenuArea에 마우스를 올리면 MenuAct 클래스*/
    /*$("header .MenuArea").on("mouseenter focusin", function(){
        $("header .MenuArea").removeClass("MenuAct");
        $(this).addClass("MenuAct");
        $("header .HeaderBg").show();
    });
    $("header").on("mouseleave", function(){
        $("header .MenuArea>ul>li").removeClass("On");
        $("header .HeaderBg").hide();
    	
    });
    $("header .MenuArea>ul>li:last-child>ul>li:last-child>ul>li:last-child").on("focusout", function(){
        $("header .MenuArea>ul>li").removeClass("On");
        $("header .HeaderBg").hide();
    });*/
    /*Menu02 불릿*/
    $("header .MenuArea>ul>li>ul>li").on("mouseenter focusin", function () {
        $("header .MenuArea>ul>li>ul>li").removeClass("Act");
        $(this).parent().parent().addClass("On");
    });
    $("header .MenuArea>ul>li>ul>li").on("mouseleave", function () {
        $(this).parent().parent().removeClass("On");

    });

    let mobileGnb = $('.MobileMenuOuterArea');
    initMobileGnb(mobileGnb);

    /*클릭시 메뉴 고정*/
    /*
    $("header .MenuArea>ul>li").on("click", function(){
        $("header .MenuArea>ul>li").removeClass("FixedMenu");
        $(this).addClass("FixedMenu");
        $("header .HeaderBg").show();
    });
    $("btn").on("click", function(){
        $("header .MenuArea>ul>li").removeClass("FixedMenu");
        $("header .HeaderBg").hide();
    });
    */
    /*통합검색*/
    /*
    $("header .MenuArea>ul>li").on('click', function(){
        if($(this).hasClass("on")){
            $("header .HeaderBg").removeClass("FixedMenu");
            $("header .MenuArea>ul>li").removeClass("FixedMenu");    
        }else{
            $("header .right_menu .h_searchbar").fadeIn();
            $("header .right_menu .h_search button").addClass('on');    
        }
    });
    */

    $(document).on("change", "input[type=file]", function () {
        $(this).prev().prev().val($(this).val().split('\\')[2]);
    });


    // 환경설정
    $(".Configuration > a").on('click', function () {
        var isOpen = $(this).hasClass("On");
        $(".Configuration > a").removeClass('On'); // 모든 Configuration 메뉴의 On 클래스 제거
        $(".Configuration > ul").fadeOut(); // 모든 Configuration 메뉴의 하위 메뉴 감춤

        if (!isOpen) {
            $(this).addClass('On'); // 클릭된 Configuration 메뉴에 On 클래스 추가
            $(this).next("ul").fadeIn(); // 클릭된 Configuration 메뉴의 하위 메뉴 표시
        }
    });

    // 다국어
    $(".Language > a").on('click', function () {
        var isOpen = $(this).hasClass("On");
        $(".Language > a").removeClass('On');
        $(".Language > ul").fadeOut();

        if (!isOpen) {
            $(this).addClass('On');
            $(this).next("ul").fadeIn();
        }
    });

    // 다국어 추가
    $(".lang-select").on('click', function () {
        $(".Language > a").removeClass('On');
        $(".Language > ul").fadeOut();
    });

    // Configuration 클릭 시 언어설정 모달 닫음
    $('.Configuration').on("click", function () {
        $(".Language > a").removeClass('On');
        $(".Language > ul").fadeOut();
    });
    // Language 클릭 시 언어 환경설정 모달 닫음
    $('.Language').on("click", function () {
        $(".Configuration > a").removeClass('On');
        $(".Configuration > ul").fadeOut();
    });
});

//모달
$('.BtnOpen').each(function () {
    var modalID = $(this).attr('href');
    var modalBg = $('.ModalBg');

    $(this).on('click', function (e) {
        e.preventDefault();

        modalBg.fadeIn();

        $(modalID).show();

        $('html').css({
            overflow: 'hidden'
        });
    });

    $('.ModalBg, .ModalClose').on('click', function () {
        modalBg.fadeOut();
        $(modalID).hide();
        $(modalID).removeAttr('style');

        $('html').removeAttr('style');
    });

});

////첨부파일 1개저장
//$(document).on('change', ".AttHideBtnB", function () {
//    if ($(this).val() != "") {
//        var str = "";
//        var fileNM = $(this).val().replace("C:\\fakepath\\", "");
//        if ($(this).prev().prev().find(".AttItemB").length >= 1 && $(this).parent().find(".FileNameB").val() != "") {
//            str += '<li class="AttItemB">';
//            str += ' <input type="text" class="FileNameB" readonly="readonly" placeholder="첨부파일을 등록해주세요"  value="' + fileNM + '"/>';
//            str += ' <button type="button" class="AttCloseBtnB">';
//            str += '     <span class="DFlex AJCenter"><img src="../img/content/att_close.png" alt="닫기버튼" /></span>';
//            str += ' </button>';
//            str += '</li>';

//            $(this).prev().prev().html(str);
//        }
//        else if ($(this).prev().prev().find(".AttItemB").length == 1) {
//            $(this).parent().addClass("AttOn");
//            $(this).parent().find(".FileNameB").val(fileNM);
//        }
//        $(this).val('');
//    }
//})

//$(document).on('click', ".AttCloseBtnB", function () {
//    var str = "";
//    if ($(this).parent().parent().find(".AttItemB").length == 1) {
//        $(this).parent().parent().parent().removeClass("AttOn");
//        str += '<li class="AttItemB">';
//        str += ' <input type="text" class="FileNameB" readonly="readonly" placeholder="첨부파일을 등록해주세요"/>';
//        str += ' <button type="button" class="AttCloseBtnB">';
//        str += '     <span class="DFlex AJCenter"><img src="../img/content/att_close.png" alt="닫기버튼" /></span>';
//        str += ' </button>';
//        str += '</li>';
//        $(this).parent().parent().html(str);
//    }
//    else if ($(this).parent().parent().find(".AttItemB").length > 1) {
//        $(this).parent().remove();
//    }
//})


//첨부파일 li 추가
$(document).on('change', ".AttHideBtnC", function () {
    if ($(this).val() != "") {
        var str = "";
        var fileNM = $(this).val().replace("C:\\fakepath\\", "");
        if ($(this).prev().prev().find(".AttItemC").length >= 1 && $(this).parent().find(".FileNameC").val() != "") {
            str += '<li class="AttItemC">';
            str += ' <input type="text" class="FileNameC" readonly="readonly" placeholder="첨부파일을 등록해주세요"  value="' + fileNM + '"/>';
            str += ' <button type="button" class="AttCloseBtnC">';
            str += '     <span class="DFlex AJCenter"><img src="../img/content/att_close.png" alt="닫기버튼" /></span>';
            str += ' </button>';
            str += '</li>';

            $(this).prev().prev().append(str);
        }
        else if ($(this).prev().prev().find(".AttItemC").length == 1) {
            $(this).parent().addClass("AttOn");
            $(this).parent().find(".FileNameC").val(fileNM);
        }
        $(this).val('');
    }
})
$(document).on('click', ".AttCloseBtnC", function () {
    var str = "";
    if ($(this).parent().parent().find(".AttItemC").length == 1) {
        $(this).parent().parent().parent().removeClass("AttOn");
        str += '<li class="AttItemC">';
        str += ' <input type="text" class="FileNameC" readonly="readonly" placeholder="첨부파일을 등록해주세요"/>';
        str += ' <button type="button" class="AttCloseBtnC">';
        str += '     <span class="DFlex AJCenter"><img src="../img/content/att_close.png" alt="닫기버튼" /></span>';
        str += ' </button>';
        str += '</li>';
        $(this).parent().parent().html(str);
    }
    else if ($(this).parent().parent().find(".AttItemC").length > 1) {
        $(this).parent().remove();
    }
})

// 모바일 헤더 gnb 스크립트
function initMobileGnb(mobileGnb) {
    let html = $('html');
    let sidebarButton = mobileGnb.find('.MobileMenuOuterBtn');
    let MobileMenuOuter = mobileGnb.find('.MobileMenu01 a');

    sidebarButton.on('click', function () {
        if (mobileGnb.hasClass('open')) {
            mobileGnbClose(mobileGnb);
        } else {
            mobileGnbOpen(mobileGnb);
        }
    });

    MobileMenuOuter.on('click', function () {
        let thisLink = $(this);
        onClickMobileMenuOuter(thisLink);
    });

    function mobileGnbOpen(gnb) {
        gnb.addClass('open');
        html.addClass('not-scroll');
    }

    function mobileGnbClose(gnb) {
        gnb.removeClass('open');
        html.removeClass('not-scroll');
    }

    function onClickMobileMenuOuter(link) {
        let target = link.parent();
        let depthTarget = link.siblings('ul');
        let otherLinks = target.siblings('li');
        let otherItems = otherLinks.find('ul');

        if (target.hasClass('current')) {
            target.removeClass('current');
            depthTarget.stop().slideUp(300);
        } else {
            otherLinks.removeClass('current');
            otherItems.stop().slideUp(300);
            target.addClass('current');
            depthTarget.stop().slideDown(300);
        }
    }
    $(".MenuArea").on("mouseover", function () {
        $('select').blur();
        $('.datepicker').hide();
    });
}


//아이폰 100vh 스크롤
let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
})

/*function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
}

window.addEventListener('resize', () => setScreenSize());*/



/*function Layout({ children }: Props) {
    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        if (isIOS) {
            const setProperty = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };
            setProperty();
        }
    }, []);


    return (
        <div id="app" className="app-wrap max-w-[50rem] mx-auto px-[2rem] bg-w">
            {children}
        </div>
    );
}*/

function applyEllipsis() {
    const element = $('.myClass');
    const windowWidth = $(window).width();
    const originalText = element.data('original-text');

    if (windowWidth <= 500 && originalText.length >= 8) {
        const truncatedText = originalText.substring(0, 8) + '...';
        element.text(truncatedText);
    } else {
        element.text(originalText);
    }
}

// 페이지 로드 시 초기 적용
$(document).ready(function () {
    const element = $('.myClass');
    element.data('original-text', element.text());
    applyEllipsis();
});

// 윈도우 크기가 변경될 때 다시 적용
$(window).on('resize', applyEllipsis);


document.addEventListener('DOMContentLoaded', function () {
    var themeMode = localStorage.getItem('themeMode');

    function toggleTheme(event) {
        event.preventDefault();  // 기본 동작을 막음

        // SiteWrap 요소에 DarkTheme 클래스 토글
        var siteWrap = document.querySelector('.SiteWrap');
        if (siteWrap) {
            siteWrap.classList.toggle('DarkTheme');
        }

        // 이미지 경로 변경
        var imgElement = document.querySelector('.ThemeSelect img');
        if (imgElement) {
            var newSrc = imgElement.src.includes('etc_ico05_w.png') ? '../img/common/etc_ico06_w.png' : '../img/common/etc_ico05_w.png';
            imgElement.src = newSrc + '?' + new Date().getTime(); // 이미지 URL에 timestamp 추가
        }

        // 선택한 테마 모드를 로컬 스토리지에 저장
        var themeMode = siteWrap.classList.contains('DarkTheme') ? 'dark' : 'light';
        localStorage.setItem('themeMode', themeMode);
    }

    // 이전에 선택한 테마 모드가 있을 경우 적용
    if (themeMode === 'dark') {
        // Dark 모드 설정
        document.querySelector('.SiteWrap').classList.add('DarkTheme');
    }

    // btnThemeChange 버튼에 이벤트 리스너 추가
    var btnThemeChange = document.getElementById('btnThemeChange');
    if (btnThemeChange) {
        btnThemeChange.addEventListener('click', toggleTheme);
    }
});