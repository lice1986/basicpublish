// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
(function ($) {
    $.setAjaxData = function (sUrl, pAsync, sParam, bSucsMsg, mDialog) {
        var jsonData = null;

        $.ajax
            ({
                type: "POST",
                url: sUrl,
                data: JSON.stringify(sParam),
                contentType: "application/json; charset=utf-8",
                async: pAsync,
                //  dataType: "json",
                success: function (data, status, xhr) {
                    if (bSucsMsg) alert("Success!");
                    jsonData = data;
                },
                error: function (xhr, status, error) {
                    jsonData = null;
                    if (xhr.readyState === 4) {
                        if (mDialog !== undefined) {
                            mDialog.html("");
                            $.fnPop_Dialog_BtnY(mDialog, true, true, 500, 300, "Process exception details", "close");
                            try {
                                //responseText = $.parseJSON(xhr.responseText); //jQuery.parseJSON(xhr.responseText);
                                //mDialog.append("<div><b>" + errorType + " " + exception + "</b></div>");
                                //mDialog.append("<div><u>Exception</u>:<br /><br />" + responseText.ExceptionType + "</div>");
                                //mDialog.append("<div><u>StackTrace</u>:<br /><br />" + responseText.StackTrace + "</div>");
                                //mDialog.append("<div><u>Message</u>:<br /><br />" + responseText.Message + "</div>");
                                mDialog.append("<div><u>Message</u>:<br /><br />" + "AJax Error : " + xhr.status + " / " + xhr.statusText + "</div>");
                            } catch (e) {
                                responseText = xhr.responseText;
                                mDialog.html(responseText);
                            }
                        }
                        else {
                            if (xhr.status === 200) {
                                //alert("Session expired. Relogin please");                             
                                alert("AJax Error : " + xhr.status + " / " + xhr.statusText);
                                location.href = '/Auth/loginRoute';
                            } else {
                                //var msg = "AJax Error : " + xhr.status + " / " + xhr.statusText;                                
                                //alert("AJax Error : " + xhr.status + " \n" + "Message : " + xhr.responseText + "\n" + "" + xhr.statusText);
                                alert("AJax Error : " + xhr.status + " / " + xhr.statusText);
                            }
                        }
                    }
                },
                complete: function () {
                    //alert("complete");
                }
            });
        return jsonData;
    };
    /*
        파일다운로드 
    */
    $.fn_getFile = function (pParam) {
        if (parseInt(pParam.FILE_ID, 10) < 1) {
            alert("Unknown file info.!");
            return;
        }
        var a = $.setAjaxData("/Base/ExistsFile", false, pParam, false);
        if (a == 1) {
            location.href = "/Base/FileDownload?" + $.param(pParam);
        } else {
            alert("File not exits!");
        }
    };
    /* JSON 데이터 널처리 DATE 처리 DATETIME 처리 */
    $.parseJsonDate = function (jsonDate) {
        //var offset = new Date().getTimezoneOffset() * 60000;
        if (jsonDate == null || jsonDate == undefined) {

            return "";
        }
        else {
            var offset = 0;
            var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);
            if (parts[2] === undefined)
                parts[2] = 0;

            if (parts[3] === undefined)
                parts[3] = 0;

            var dtRtn = new Date(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000);
            return $.datepicker.formatDate('yy-mm-dd', dtRtn);
        }
    };

    $.parseJsonDateTime = function (jsonDate) {
        var dt = new Date(+jsonDate.replace(/\/Date\((\d+)\)\//, '$1'));
        return dt.getFullYear() + "-" + ('0' + (dt.getMonth() + 1)).slice(-2) + "-" + ('0' + dt.getDate()).slice(-2) + " " + ('0' + dt.getHours()).slice(-2) + ":" + ('0' + dt.getMinutes()).slice(-2);
    };
    $.parseJsonNull = function (data) {
        if (data == null || data == "null" || data == "") {
            data = "";
        } else if (data == 0) {
            data = 0;
        }

        return data;
    }

    // 해당 GROUP_CODE에 대한 중복 COM_CODE 체크
    // gCode : GROUP_CODE
    // code    : COM_CODE
    $.fn_getDuplicateCode = function (gCode, code) {
        var _param = {};
        _param.GROUP_CODE = gCode;
        _param.COM_CODE = code;
        _param.LCID = 1042;
        _param.SOLUTION_ID = 1;
        var DuplicateCode = $.setAjaxData("/Adm/DuplicateCodeCount", false, _param, false);

        var count = "";
        $.each(DuplicateCode, function (index, value) {
            count = value.CODE_COUNT;
        });

        return count;
    }; 

    $.fn_getComCodeByType = function (i_Type, r_Type, gCode, code) {
        var _param = {};
        var r_value;
        var r_Act = 0;

        if (i_Type === "CODE") {
            if (code === null || code === "") {
                r_Act = 0;
            } else {
                _param.COM_CODE = code;
                _param.GROUP_CODE = gCode;
                r_Act = 1;
            }
        } else if (i_Type === "ID") {
            if (code === null || code === "0") {
                r_Act = 0;
            } else {
                _param.CODE_ID = code;
                r_Act = 1;
            }
        }

        if (r_Act === 0) {
            if (r_Type === "CODE") {
                r_value = "";
            } else if (r_Type === "ID") {
                r_value = 0;
            } else if (r_Type === "NAME") {
                r_value = "";
            } else {
                r_value = 0;
            }
        } else {
            var codeIDList = $.setAjaxData("/Adm/ComCodeOnlyDataList", false, _param, false);

            if (r_Type === "CODE") {
                r_value = codeIDList[0].COM_CODE;
            } else if (r_Type === "ID") {
                r_value = codeIDList[0].CODE_ID;
            } else if (r_Type === "NAME") {
                r_value = codeIDList[0].CODE_NAME;
            } else {
                r_value = 0;
            }
        }

        return r_value;
    };

    /* form submit */
    $.formSubmit = function (form, method, action) {
        form.attr("method", method);
        form.attr("action", action);
        form.submit();
    };

    $.getFormData = function (form, isJsonReturn) {
        if (!isJsonReturn) isJsonReturn = false;

        var arrForm = form.serializeArray();
        var arrModel = {};

        $.map(arrForm, function (n, i) {
            arrModel[n.name] = n.value;
        });

        return (isJsonReturn) ? JSON.stringify(arrModel) : arrModel;
    };
    //숫자만 
    $.fn_checkNumber = function (keyCode) {
        var arrKey = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 188, 190];
        if ($.inArray(keyCode, arrKey) === -1) {
            return false;
        } else {
            return true;
        }
    };
    //지수 표현
    $.expo = function(x, f) {
        return Number.parseFloat(x).toExponential(f);
    }

    //공통코드 리스트
    $.fn_getComCodeList = function (ddl, pParam) {
        ddl.empty();
        var _list = $.setAjaxData("/Adm/ComCodeOnlyDataList", false, pParam, false);
        if (_list) {
            $.each(_list, function (index, value) {
                ddl.append($('<option>', {
                    value: value.CODE_ID,
                    text: value.CODE_NAME
                }));
            });
        }
        return _list;
    };
    //공통 코드 String 반환
    $.fn_getComCodeString = function (pParam) {
        var str = "";
        var _list = $.setAjaxData("/Adm/ComCodeOnlyDataList", false, pParam, false);
        if (_list) {
            $.each(_list, function (index, value) {
                str += '<option value="' + value.CODE_ID + '">' + value.CODE_NAME + '</option>';
            });
        }
        return str;
    };

})(jQuery);

//모든 서브밋 버튼에 대해 클릭 후 3초 disabled
jQuery(function (c) {
    jQuery('input[type="submit"],button[type="submit"]').click(function (e) {
        var d = jQuery(e.currentTarget);
        setTimeout(function () { return function () { d.attr("disabled", "disabled"); }; }(), 0);
        setTimeout(function () { return function () { d.removeAttr("disabled"); }; }(), 3000);
    });
});
