var $ = require('jquery');
var Slider = require('bootstrap-slider2');
const { futimesSync } = require('original-fs');
var tab_list = document.querySelector('.tab_list');
var lis = tab_list.querySelectorAll('li');
var items = document.querySelectorAll('.item');

const remote = require('@electron/remote')
let currentusr = remote.getGlobal('sharedObject').CurrentUsr
for(var i = 0;i<lis.length;i++)
{
    lis[i].setAttribute('data-index',i);
    lis[i].onclick = function(){
        for(var j = 0;j<lis.length;j++)
        {
            lis[j].className = '';
        }
        this.className = 'current';
        var index = this.getAttribute('data-index');
        for(var j= 0;j<items.length;j++)
        {
            items[j].style.display= 'none';
        }
        items[index].style.display= 'block';
    }
}

$(function(){
    $("#buttongroup button").click(function(){
        $(this).parent().siblings().children().each(function(index,domEle){
            if($(domEle).hasClass("btn-danger") == false)
            {
                $(domEle).removeClass("choosebutton");
            }
            else {
                if($(domEle).attr("data-query-num") == "1")
                {
                    $(domEle).addClass("btn-warning");
                    $(domEle).removeClass("choosebutton btn-danger");
                    $(domEle).attr("data-query-num", "0")
                }
            }
        })
        $(this).parent().parent().siblings().children().each(function(index,domEle){
            if($(domEle).children(".btn").hasClass("btn-danger") == false)
            {
                $(domEle).children(".btn").removeClass("choosebutton");
            }
            else {
                if($(domEle).children(".btn").attr("data-query-num") == "1")
                {
                    $(domEle).children(".btn").addClass("btn-warning");
                    $(domEle).children(".btn").removeClass("choosebutton btn-danger");
                    $(domEle).children(".btn").attr("data-query-num", "0")
                }
            }
        })
        $(this).addClass("choosebutton btn-danger");
        $(this).removeClass("btn-warning");
    })
    $(".Maxwellbuttonpositve").click(function(){
        $(".Maxwellbuttonnegtive").removeClass("Maxwell btn-danger");
        $(this).addClass("Maxwell btn-danger");
    })
    $(".Maxwellbuttonnegtive").click(function(){
        $(".Maxwellbuttonpositve").removeClass("Maxwell btn-danger");
        $(this).addClass("Maxwell btn-danger");
    })
})

$(function(){
    $(".increment").click(function(){
        var n = $(this).siblings(".inputwithhref").val();
        if($(this).siblings(".inputwithhref").hasClass("one"))
        {
            n++;
        }
        else if($(this).siblings(".inputwithhref").hasClass("opoint"))
        {
            n = parseFloat(n) + 0.1;
            Math.round(n*100)/100;
        }
        else if($(this).siblings(".inputwithhref").hasClass("opointo"))
        {
            n = parseFloat(n) + 0.01;
            Math.round(n*100)/100;
        }
          
        $(this).siblings(".inputwithhref").val(n);
        $(this).parent().siblings().children("#slider-vof").bootstrapSlider('setValue', n);
    })
    $(".decrement").click(function(){
        var n = $(this).siblings(".inputwithhref").val();
        if($(this).siblings(".inputwithhref").hasClass("one"))
        {
            n--;
        }
        else if($(this).siblings(".inputwithhref").hasClass("opoint"))
        {
            n = parseFloat(n) - 0.1;
            Math.round(n*100)/100;
        }
        else if($(this).siblings(".inputwithhref").hasClass("opointo"))
        {
            n = parseFloat(n) - 0.01;
            Math.round(n*100)/100;
        }
        if(n === 0)
        {
            return false;
        }
         
        $(this).siblings(".inputwithhref").val(n);
        $(this).parent().siblings().children("#slider-vof").bootstrapSlider('setValue', n);
    })
})



$("#slider-vof").bootstrapSlider();

$("#slider-vof").on('slide',
function (slideEvt) {
    $("#input-vof").val(slideEvt.value.toFixed(1));
});

$('#input-vof').on('input propertychange blur change', function () {
    console.log(111);
    if ($(this).val()) {
        // $("#slider-vof")('setValue', $("#input-vof").val());
        $("#slider-vof").bootstrapSlider('setValue', $("#input-vof").val());
    }
}
);

$("#slider-young").bootstrapSlider();

$("#slider-young").on('slide',
function (slideEvt) {
    $("#input-young").val(slideEvt.value.toFixed(1));
});

$('#input-young').bind('blur change', function () {
    if ($(this).val()) {
        // $("#slider-vof")('setValue', $("#input-vof").val());
        $("#slider-young").bootstrapSlider('setValue', $("#input-young").val());
    }
}
);

$("#slider-sheer").bootstrapSlider();

$("#slider-sheer").on('slide',
function (slideEvt) {
    $("#input-sheer").val(slideEvt.value.toFixed(1));
});

$('#input-sheer').bind('blur change', function () {
    if ($(this).val()) {
        // $("#slider-vof")('setValue', $("#input-vof").val());
        $("#slider-sheer").bootstrapSlider('setValue', $("#input-sheer").val());
    }
}
);

$("#slider-possion").bootstrapSlider();

$("#slider-possion").on('slide',
function (slideEvt) {
    $("#input-possion").val(slideEvt.value.toFixed(1));
});

$('#input-possion').bind('blur change', function () {
    if ($(this).val()) {
        // $("#slider-vof")('setValue', $("#input-vof").val());
        $("#slider-possion").bootstrapSlider('setValue', $("#input-possion").val());
    }
}
);

$("#slider-rods").bootstrapSlider();

$("#slider-rods").on('slide',
function (slideEvt) {
    $("#input-rods").val(slideEvt.value.toFixed(1));
});

$('#input-rods').bind('blur change', function () {
    if ($(this).val()) {
        // $("#slider-vof")('setValue', $("#input-vof").val());
        $("#slider-rods").bootstrapSlider('setValue', $("#input-rods").val());
    }
}
);
$(function(){
    $(".fourpropcheckbox").click(function(){
        var checkflag = true;
        var dom = document.querySelectorAll(".fourpropcheckbox");
        for(var i = 0 ; i < dom.length;i++)
        {
            if(dom[i].checked == false)
            {
                checkflag = false;
            }
        }
        $(".checkall").prop("checked",checkflag);
    })
})
$(function(){
    $(".checkrods").change(function(){
        if($(".checkrods").prop("checked") === false)
        {
            $("#input-rods").prop("disabled","disabled");
            // $("#slider-rods").bootstrapSlider('disable');
            // $("#ex12e").slider('disable');
        }else if($(".checkrods").prop("checked") === true)
        {
            $("#input-rods").prop("disabled","");
            // $("#slider-rods").bootstrapSlider('enable');
            // $("#ex12e").slider('enable');
        }     
    })
})
$(function(){
    $(".checkrodsrange").change(function(){
        if($(".checkrodsrange").prop("checked") === false)
        {
            $("#ex12e").slider('disable');
        }else if($(".checkrodsrange").prop("checked") === true)
        {
            $("#ex12e").slider('enable');
        }     
    })
})
$(function(){
    $(".checkshell").change(function(){
        if($(".checkshell").prop("checked") === false)
        {
            $("#input-shellthick").prop("disabled","disabled");
        }else if($(".checkshell").prop("checked") === true)
        {
            $("#input-shellthick").prop("disabled","");
        }     
    })
})
$(function(){
    $(".checkshellrange").change(function(){
        if($(".checkshellrange").prop("checked") === false)
        {
            $("#ex12f").slider('disable');
        }else if($(".checkshellrange").prop("checked") === true)
        {
            $("#ex12f").slider('enable');
        }     
    })
})
$(function(){
    $(".checkvof").change(function(){
        if($(".checkvof").prop("checked") === false)
        {
            $("#input-vof").prop("disabled","disabled");
        }else if($(".checkvof").prop("checked") === true)
        {
            $("#input-vof").prop("disabled","");
        }     
    })
})
$(function(){
    $(".checkvofrange").change(function(){
        if($(".checkvofrange").prop("checked") === false)
        {
            $("#ex12a").slider('disable');
        }else if($(".checkvofrange").prop("checked") === true)
        {
            $("#ex12a").slider('enable');
        }     
    })
})
$(function(){
    $(".checkyoung").change(function(){
        if($(".checkyoung").prop("checked") === false)
        {
            $("#input-young").prop("disabled","disabled");
        }else if($(".checkyoung").prop("checked") === true)
        {
            $("#input-young").prop("disabled","");
        }     
    })
})
$(function(){
    $(".checkyoungrange").change(function(){
        if($(".checkyoungrange").prop("checked") === false)
        {
            $("#ex12b").slider('disable');
        }else if($(".checkyoungrange").prop("checked") === true)
        {
            $("#ex12b").slider('enable');
        }     
    })
})

$(function(){
    $(".checksheer").change(function(){
        if($(".checksheer").prop("checked") === false)
        {
            $("#input-sheer").prop("disabled","disabled");
        }else if($(".checksheer").prop("checked") === true)
        {
            $("#input-sheer").prop("disabled","");
        }     
    })
})
$(function(){
    $(".checksheerrange").change(function(){
        if($(".checksheerrange").prop("checked") === false)
        {
            $("#ex12c").slider('disable');
        }else if($(".checksheerrange").prop("checked") === true)
        {
            $("#ex12c").slider('enable');
        }     
    })
})

$(function(){
    $(".checkpossion").change(function(){
        if($(".checkpossion").prop("checked") === false)
        {
            $("#input-possion").prop("disabled","disabled");
        }else if($(".checkpossion").prop("checked") === true)
        {
            $("#input-possion").prop("disabled","");
        }     
    })
})
$(function(){
    $(".checkpossionrange").change(function(){
        if($(".checkpossionrange").prop("checked") === false)
        {
            $("#ex12d").slider('disable');
        }else if($(".checkpossionrange").prop("checked") === true)
        {
            $("#ex12d").slider('enable');
        }     
    })
})

$(function(){
    $(".checkall").click(function(){
        $(".fourpropcheckbox").prop("checked",$(".checkall").prop("checked"));//注意这里用的input可能会导致bug
        if($(".checkall").prop("checked") == false)
        {
            $("#input-vof").prop("disabled","disabled");
            $("#slider-vof").bootstrapSlider('disable');
            $("#ex12a").slider('disable');
            $("#input-young").prop("disabled","disabled");
            $("#slider-young").bootstrapSlider('disable');
            $("#ex12b").slider('disable');
            $("#input-sheer").prop("disabled","disabled");
            $("#slider-sheer").bootstrapSlider('disable');
            $("#ex12c").slider('disable');
            $("#input-possion").prop("disabled","disabled");
            $("#slider-possion").bootstrapSlider('disable');
            $("#ex12d").slider('disable');
        }
        else if($(".checkall").prop("checked") == true)
        {
            $("#input-vof").prop("disabled","");
            $("#slider-vof").bootstrapSlider('enable');
            $("#ex12a").slider('enable');
            $("#input-young").prop("disabled","");
            $("#slider-young").bootstrapSlider('enable');
            $("#ex12b").slider('enable');
            $("#input-sheer").prop("disabled","");
            $("#slider-sheer").bootstrapSlider('enable');
            $("#ex12c").slider('enable');
            $("#input-possion").prop("disabled","");
            $("#slider-possion").bootstrapSlider('enable');
            $("#ex12d").slider('enable');
        }
    })
})


$(function(){//既区分精确与区间 也 区分tpms和杆状

    //这是精确选择
    $("#submmit").click(function(){
        let jsonobj = {}
        let currentsub
        if(currentusr.name === "microstructure_properties_test")
        {
            currentsub = $(".tab_list ul .current").text()
        }
        else
        {
            currentsub = "private"
        }
        
        if(currentsub == 'TPMS')
        {
            jsonobj["structure_type"] = "2";
            if($("#buttongroup").find(".choosebutton").length != 0)//此时有选择类型
            {
                var choosebuttonstr = "(";
                $(".choosebutton").each(function(index,domEle){
                    if(index == 0)
                    {
                        choosebuttonstr = choosebuttonstr + $(domEle).attr("data-index");
                    }
                    else{
                        choosebuttonstr = choosebuttonstr + ',' + $(domEle).attr("data-index");
                    }
                })
                choosebuttonstr += ')';
                jsonobj["tpmstype"] = choosebuttonstr;
                $("#buttongroup").find(".choosebutton").attr("data-query-num", "1")
            }
            else{//此时没有选择类型
                jsonobj["tpmstype"] = "-1";
            }
        }
        else if(currentsub == 'Rod')
        {
            jsonobj["structure_type"] = "1";
            if($(".Maxwellbutton button").hasClass("Maxwell"))
            {
                jsonobj["maxwell"] = $(".Maxwell").prop("id");//0表示正，1表示负
            }
            else{
                jsonobj["maxwell"] ="-1";
            }
            $(".Maxwellbuttonnegtive").removeClass("Maxwell btn-danger");
            $(".Maxwellbuttonpositve").removeClass("Maxwell btn-danger");
            if($(".checkrods").prop("checked") === false)
            {
                jsonobj["rods"] = '-1';
            }
            else{
                jsonobj["rods"] = $("#input-rods").val();
            }
        }
        else if(currentsub == 'Shell')
        {
            jsonobj["structure_type"] = "3";
            if($(".checkshell").prop("checked") === false)
            {
                jsonobj["shell_thick"] = '-1';
            }
            else{
                jsonobj["shell_thick"] = $("#input-shellthick").val();
            }
        }
        else if(currentsub == 'private')
        {
            jsonobj["structure_type"] = "4";
        }
        if($(".checkvof").prop("checked") === false)
        {
            jsonobj["volume_fraction"] = '-1';
        }
        else{
            jsonobj["volume_fraction"] = $("#input-vof").val();
        }
        if($(".checkyoung").prop("checked") === false)
        {
            jsonobj["youngs_modulus"] = '-1';
        }
        else{
            jsonobj["youngs_modulus"] = $("#input-young").val();
        }
        if($(".checksheer").prop("checked") === false)
        {
            jsonobj["shear_modulus"] = '-1';
        }
        else{
            jsonobj["shear_modulus"] = $("#input-sheer").val();
        }
        if($(".checkpossion").prop("checked") === false)
        {
            jsonobj["poisson_ration"] = '-1';
        }
        else{
            jsonobj["poisson_ration"] = $("#input-possion").val();
        }
        reply = ipcRenderer.sendSync('submmitjson', jsonobj);

        var iframe1 = document.getElementById('iframe1');
        var data = {
            message: reply
        };
        iframe1.contentWindow.postMessage(data,"*");
    })
    $("#submmit_range").click(function(){
        let jsonobj = {};
        if(currentusr.name === "microstructure_properties_test")
        {
            currentsub = $(".tab_list ul .current").text()
        }
        else
        {
            currentsub = "private"
        }
        if(currentsub == 'TPMS')
        {
            jsonobj["structure_type"] = "2";
            if($("#buttongroup").find(".choosebutton").length != 0)
            {
                var choosebuttonstr = "(";
                $(".choosebutton").each(function(index,domEle){
                    if(index == 0)
                    {
                        choosebuttonstr = choosebuttonstr + $(domEle).attr("data-index");
                    }
                    else{
                        choosebuttonstr = choosebuttonstr + ',' + $(domEle).attr("data-index");
                    }
                })
                choosebuttonstr += ')';
                jsonobj["tpmstype"] = choosebuttonstr;
                $("#buttongroup").find(".choosebutton").attr("data-query-num", "1")
            }
            else{
                jsonobj["tpmstype"] = "-1";
            }
        }
        else if(currentsub == 'Rod')
        {
            jsonobj["structure_type"] = "1";
            if($(".Maxwellbutton button").hasClass("Maxwell"))
            {
                jsonobj["maxwell"] = $(".Maxwell").prop("id");//0表示正，1表示负
            }
            else{
                jsonobj["maxwell"] ="-1";
            }
            $(".Maxwellbuttonnegtive").removeClass("Maxwell btn-danger");
            $(".Maxwellbuttonpositve").removeClass("Maxwell btn-danger");
            if($(".checkrods").prop("checked") === false && $(".checkrodsrange").prop("checked") === false)
            {
                jsonobj["rods"] = '0,9999';
            }
            else if($(".checkrodsrange").prop("checked") === true){
                jsonobj["rods"] = $("#ex12e").val();
            }
            else if($(".checkrods").prop("checked") === true){
                jsonobj["rods"] = ''+ $("#input-rods").val() + ',' + $("#input-rods").val();
            }
        }
        else if(currentsub == 'Shell')
        {
            jsonobj["structure_type"] = "3";
            if($(".checkshell").prop("checked") === false && $(".checkshellrange").prop("checked") === false)
            {
                jsonobj["shell_thick"] = '0,9999';
            }
            else if($(".checkshellrange").prop("checked") === true){
                jsonobj["shell_thick"] = $("#ex12f").val();
            }
            else if($(".checkshell").prop("checked") === true){
                jsonobj["shell_thick"] = '' + ($("#input-shellthick").val() - 0.01) + ',' + ($("#input-shellthick").val() + 0.01);
            }
        }
        else if(currentsub == 'private')
        {
            jsonobj["structure_type"] = "4";
        }
        if($(".checkvof").prop("checked") === false && $(".checkvofrange").prop("checked") === false)
        {
            jsonobj["volume_fraction"] = '0,9999';
        }else if($(".checkvofrange").prop("checked") === true){
            jsonobj["volume_fraction"] = $("#ex12a").val();//#input-vof
        }else if($(".checkvof").prop("checked") === true){
            jsonobj["volume_fraction"] = '' + ($("#input-vof").val() - 0.01) + ',' + (parseFloat($("#input-vof").val()) + 0.01);
        }
        if($(".checkyoung").prop("checked") === false && $(".checkyoungrange").prop("checked") === false)
        {
            jsonobj["youngs_modulus"] = '0,9999';
        }else if($(".checkyoungrange").prop("checked") === true){
            jsonobj["youngs_modulus"] = $("#ex12b").val();
        }else if($(".checkyoung").prop("checked") === true){//#input-young
            jsonobj["youngs_modulus"] = '' + ($("#input-young").val() - 0.01) + ',' + (parseFloat($("#input-young").val()) + 0.01);
        }
        if($(".checksheer").prop("checked") === false && $(".checksheerrange").prop("checked") === false)
        {
            jsonobj["shear_modulus"] = '0,9999';
        }
        else if($(".checksheerrange").prop("checked") === true){
            jsonobj["shear_modulus"] = $("#ex12c").val();
        }
        else if($(".checksheer").prop("checked") === true){
            jsonobj["shear_modulus"] = '' + ($("#input-sheer").val() - 0.01) + ',' + (parseFloat($("#input-sheer").val()) + 0.01);
        }
        if($(".checkpossion").prop("checked") === false && $(".checkpossionrange").prop("checked") === false) 
        {
            jsonobj["poisson_ration"] = '0,9999';
        }
        else if($(".checkpossionrange").prop("checked") === true){
            jsonobj["poisson_ration"] = $("#ex12d").val();
        }
        else if($(".checkpossion").prop("checked") === true){
            jsonobj["poisson_ration"] = '' + ($("#input-possion").val() - 0.01) + ',' + (parseFloat($("#input-possion").val()) + 0.01);
        }

        reply = ipcRenderer.sendSync('submmitjson', jsonobj);

        var iframe1 = document.getElementById('iframe1');
        var data = {
            message: reply
        };
        iframe1.contentWindow.postMessage(data,"*");
    })
})

$("#ex12a").slider({ id: "slider12c", min: 0, max: 1.0, step:0.01,range: true, value: [0.1, 0.2] });
$("#ex12b").slider({ id: "slider12c", min: 0, max: 200.0, step:0.1,range: true, value: [20, 140] });
$("#ex12c").slider({ id: "slider12c", min: 0, max: 200.0, step:0.1,range: true, value: [20, 140] });
$("#ex12d").slider({ id: "slider12c", min: 0, max: 1.0, step:0.01,range: true, value: [0.1, 0.8]  });
$("#ex12e").slider({ id: "slider12c", min: 0, max:50, step:1,range: true, value: [5, 25] });
$("#ex12f").slider({ id: "slider12c", min: 0, max: 1, step:0.01,range: true, value: [0.02, 0.1] });


