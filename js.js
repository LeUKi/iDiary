//by Lafish.
if (localStorage.diaryData == undefined || localStorage.diaryData == "[null]") {
    localStorage.diaryData = "[]"
}
var diarytitle = [];
var dAtaStr = localStorage.diaryData;
var dAtaObj = JSON.parse(dAtaStr);
var focDiary = "";

function showEdit(i) {//显示编辑
    $("#E1dit").val(dAtaObj[i].title);
    $("#E2dit").val(dAtaObj[i].diary);
    focDiary = i;
    focTime = dAtaObj[i].time;
}

function s1arch() {
    var sUlt = [];
    if ($("#s1arch").val() != "") {
        var s = new RegExp($("#s1arch").val(), "ig")
        for (var i = 0; i < dAtaObj.length; i++) {
            if (s.test(diarytitle[i])) {
                sUlt.push(i);
            }
        }
        displayD(sUlt);
    } else {
        displayD();
    }
    if (localStorage.skin == 2) {//重新渲染皮肤
        chSkin2();
    } else {
        chSkin1();
        localStorage.skin = 1;
    }
}

function finEdit() {
    if ($("#E1dit").val()) {
        var s = '{"title":"' + $("#E1dit").val() + '","diary":"' +
            $("#E2dit").val() + '","time":"' + focTime + '"}';
        s = s.replace(/[\r\n]/g, "<br>");
        var o = JSON.parse(s);
        localStorage.tips = 2;
        chDiary(focDiary, 1, o);
    } else {
        alert("没有标题的日记不作数哦！")
    }
}

function getTime() {//时间格式化
    tIme = new Date();
    var year = tIme.getFullYear();
    var mon = tIme.getMonth() + 1;
    var day = tIme.getDate();
    var hour = tIme.getHours();
    var min = tIme.getMinutes();
    var sec = tIme.getSeconds();
    return year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec;
}

function chColor(className, cOlor1) {//对象切换颜色
    var oBj = document.getElementsByClassName(className);
    for (var i = 0; i < oBj.length; i++) {
        oBj[i].style.background = cOlor1;

    }
}

function chSkin() {//切换皮肤
    if (localStorage.skin == "1") {
        chSkin2();
    } else {
        chSkin1();
    }
}

function chSkin1() {//显示皮肤1
    localStorage.skin = 1;
    document.body.style.background = "#e2e2e2";//1
    chColor("chCol", "#ffffff",);
    chColor("card", "#ffffff");
}

function chSkin2() {//显示皮肤2
    localStorage.skin = 2;
    document.body.style.background = "#494949";//2
    chColor("chCol", "#e5e5e5");
    chColor("card", "#bababa");
}

function sAve() {
    if ($("#tiTle").val()) {
        var s = '{"title":"' + $("#tiTle").val() + '","diary":"' +
            $("#coNtent").val() + '","time":"' + getTime() + '"}';
        s = s.replace(/[\r\n]/g, "<br>");
        var o = JSON.parse(s);
        localStorage.tips = 1;
        chDiary(0, 0, o);
    } else (
        alert("没有标题的日记不作数哦！")
    );
}

function unDo() {
    localStorage.diaryData = localStorage.undo;
    location.reload();
}

function chDiary(a, b, o) {
    if (o == null) {
        dAtaObj.splice(a, b);
    } else {
        dAtaObj.splice(a, b, o);
    }
    localStorage.diaryData = JSON.stringify(dAtaObj);

    location.reload();
}

function displayD(ii) {
    var disDiary = "";
    var long = dAtaObj.length;
    for (var i = 0; i < long; i++) {
        if (ii != undefined && !ii.includes(i)) {
            continue;
        }
        disDiary = disDiary +
            "<div id='D" + i +
            "' class=\"card chCol\"><div class=\"card-header\">" +
            "<button class=\"btn btn-sm btn-info\" style=\"float: right\"" +
            " data-toggle=\"modal\" onclick='showEdit(" + i + ")' data-target=\"#myModal\">编辑</button>" +
            "<h3>" + dAtaObj[i].title + "</h3></div>" +
            "<div class=\"card-body\">" + dAtaObj[i].diary +
            "</div><div class=\"card-footer\">" +
            "<button class=\"btn btn-sm btn-danger\" onclick=\'localStorage.tips =" +
            " 3;localStorage.undo=dAtaStr;chDiary(" + i + ",1,);\' style=\"float: right\">" +
            "删除</button><small>" + dAtaObj[i].time + "</small></div></div><br>";
    }
    document.getElementById("diAry").innerHTML = disDiary;
}

window.onload = function () {
    if (typeof (Storage) !== "undefined") {
        if (dAtaObj.length) {//非第一次
            for (var i = 0; i < dAtaObj.length; i++) {
                diarytitle.push(dAtaObj[i].title);
            }
            displayD();
            $("#s1arch").keyup(function () {
                s1arch();
            });
        } else {//第一次进入
            document.getElementById("diAry").innerHTML =
                "<div class=\"card chCol\"><div class=\"card-header\">" +
                "<button class=\"btn btn-sm btn-info\" style=\"float: right\" disabled>不可编辑</button>" +
                "<h3>Hello World!</h3></div>" +
                "<div class=\"card-body\">这是一篇示范日记！<br>当你第一次进入或本地没有日记时会展示这篇日记内容。" +
                "<br>现在你可以试着添加一篇日记。</div><div class=\"card-footer\">" +
                "<button class=\"btn btn-sm btn-danger\" style=\"float: right\" disabled>不可删除</button>" +
                "<small>" + getTime() + "</small></div></div><br>";
        }//进入后
        if (localStorage.skin == 2) {
            chSkin2();
        } else {
            chSkin1();
            localStorage.skin = 1;//初始化皮肤
        }
        if (localStorage.tips == 1) {
            $("#tips").html("  <div class=\"alert alert-success alert-dismissible fade show\">" +
                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
                "<strong>🎉 完成!</strong> 你的日记已保存。" +
                "</div>");
            localStorage.tips = 0;
        }
        if (localStorage.tips == 2) {
            $("#tips").html("  <div class=\"alert alert-success alert-dismissible fade show\">" +
                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
                "<strong>🎉 完成!</strong> 你的日记已重新编辑。" +
                "</div>");
            localStorage.tips = 0;
        }
        if (localStorage.tips == 3) {
            $("#tips").html("  <div class=\"alert alert-success alert-dismissible fade show\">" +
                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
                "<strong>🎉 完成!</strong> 你的日记已删除。 <strong><a href=\"#\" " +
                "onclick='unDo()' class=\"alert-link\">撤销️⁉</a>️</strong>" +
                "</div>");
            localStorage.tips = 0;
        }
    } else {//无法进入

        alert("你的浏览器不支持");
    }
};
