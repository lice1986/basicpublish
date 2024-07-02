
const lngs = {
    ko: { nativeName: 'KOR' },
    en: { nativeName: 'ENG' },
    ja: { nativeName: 'JP' },
    zh: { nativeName: 'CHN' }

};
i18next
    .use(i18nextXHRBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
        lng: 'ko', //기본언어
        fallbackLng: 'ko',//번역 파일에서 찾을 수 없는 경우 기본언어
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json' //언어 json 경로
        }
      
    }, function (err, t) {
        jqueryI18next.init(i18next, $);
        var lanStr = "";
        Object.keys(lngs).map((lng) => {
            const opt = new Option(lngs[lng].nativeName, lng);
            //if (lng === i18next.resolvedLanguage) {
            //    opt.setAttribute("selected", "selected");
            //}
            lanStr += `<li onclick="changeLanguage('${lngs[lng].nativeName}')"> <a href="#">${lngs[lng].nativeName}</a><input type="hidden" id="${lngs[lng].nativeName}" value="${lng}"/></li>`;
        });
        $('.lang-select').html(lanStr);
        $('.SiteWrap').localize();

        let languageChangedCounter = 0;
        //$('#languageSwitcher').change((a, b, c) => {
        //    const chosenLng = $(this).find("option:selected").attr('value');
        //    i18next.changeLanguage(chosenLng, () => {
        //        updateContent();

        //        // language changed message
        //        languageChangedCounter++;
        //        $('#languageChangedNotification').localize({ count: languageChangedCounter })
        //        if (languageChangedCounter === 1) {
        //            $('#languageChangedNotification').show();
        //        }
        //    });
        //});
        $('#languageSwitcher').change(function () {
            const chosenLng = $("#" + $('#languageSwitcher').text()).val();
            i18next.changeLanguage(chosenLng, function () {
                updateContent();
            });
        });
    });


function updateContent() {
    jqueryI18next.init(i18next, $, { useOptionsAttr: true });
    $('.SiteWrap').localize();
    //리랜더시 기본적인 세팅을 여기서 해주면 됨.
    //$('title').text($.t('menu.menu1'))
    //$('meta[name=description]').attr('content', $.t('head.description'))
}
function changeLanguage(lang) {
    //언어 변경시 서버단으로 넘어가 세션변수의 언어를 변경해줘야함.
    $("#languageSwitcher").text(lang);
    var _p = {};
    _p["LANGUAGE"] = $("#" + $('#languageSwitcher').text()).val();
    $.ajax
        ({
            type: "POST",
            url: "/Base/SetLanguage",
            data: JSON.stringify(_p),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data, status, xhr) {
            },
            error: function (xhr, status, error) {
            }
        });
    const chosenLng = $("#" + $('#languageSwitcher').text()).val();
    i18next.changeLanguage(chosenLng, function () {
        updateContent();
    });
}
i18next.on('languageChanged', () => {
    updateContent();
});
