/**
 * Created by thinkpad on 2016-9-5.
 */
/*顶部菜单*/
var mode1 = (function () {
    /*切换顶部菜单*/
    changeMenu();
    function changeMenu() {
        var tBar = document.getElementById('tBar');
        var oLogo = tBar.getElementsByTagName('span')[0];
        oLogo.onmouseover = function () {
            this.style.color = '#05eaaf';
        };
        oLogo.onmouseout = function () {
            this.style.color = '#08d7a2';
        };
        var tNavWrap = document.getElementById('tNavWrap');
        var aLi = tNavWrap.getElementsByTagName('a');
        for (var i = 0; i < aLi.length; i++) {
            (function (index) {
                aLi[index].onclick = function () {
                    for (var j = 0; j < aLi.length; j++) {
                        aLi[j].className = '';
                    }
                    this.className = 'current';
                }
            })(i);
        }
    }

    /*左侧菜单*/
    leftTitle();
    function leftTitle() {
        var mainNavs = document.getElementById('mainNavs');
        var aDiv = utils.getChildren(mainNavs);
        var subTab1 = document.getElementById('subTab1');
        var subTab2 = document.getElementById('subTab2');
        var subTab3 = document.getElementById('subTab3');
        var subTab4 = document.getElementById('subTab4');
        var subTab5 = document.getElementById('subTab5');
        var subTab6 = document.getElementById('subTab6');
        var subTab7 = document.getElementById('subTab7');
        //console.log(subTab1)
        for (var i = 0; i < aDiv.length; i++) {
            aDiv[i].index = i;
            aDiv[i].onmouseover = function () {
                switch (this.index) {
                    case 0:
                        subTab1.style.display = 'block';
                        break;
                    case 1:
                        subTab2.style.display = 'block';
                        break;
                    case 2:
                        subTab3.style.display = 'block';
                        break;
                    case 3:
                        subTab4.style.display = 'block';
                        break;
                    case 4:
                        subTab5.style.display = 'block';
                        break;
                    case 5:
                        subTab6.style.display = 'block';
                        break;
                    case 6:
                        subTab7.style.display = 'block';
                        break;
                }
            };
            aDiv[i].onmouseout = function () {
                switch (this.index) {
                    case 0:
                        subTab1.style.display = 'none';
                        break;
                    case 1:
                        subTab2.style.display = 'none';
                        break;
                    case 2:
                        subTab3.style.display = 'none';
                        break;
                    case 3:
                        subTab4.style.display = 'none';
                        break;
                    case 4:
                        subTab5.style.display = 'none';
                        break;
                    case 5:
                        subTab6.style.display = 'none';
                        break;
                    case 6:
                        subTab7.style.display = 'none';
                        break;
                }
            };
        }
    }

    /*右侧文字信息*/
    contextChange();
    function contextChange() {
        var tab = document.getElementById('tabs');
        var aLi = tab.getElementsByTagName('li');
        var oUl = document.getElementById('contextBox');
        var lis = oUl.getElementsByTagName('ul');

        for (var i = 0; i < aLi.length; i++) {
            aLi[i].index = i;
            aLi[i].onclick = function () {
                for (var j = 0; j < aLi.length; j++) {
                    aLi[j].className = '';
                    lis[j].style.display = 'none';
                }
                this.className = 'currentOn';
                lis[this.index].style.display = 'block';
            }
        }
    }

    /*穿墙*/
    throughWall();
    function throughWall() {
        var box1 = document.getElementById('throughWall');
        var aDiv = box1.getElementsByTagName('div');
        for (var i = 0; i < aDiv.length; i++) {
            move1({
                ele: aDiv[i]
            })
        }

        function hoverDiv(obj, e) {
            var r = obj.offsetWidth / 2;
            var x = obj.offsetLeft + r - e.clientX;
            var y = obj.offsetTop + r - e.clientY;
            return Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90) % 4;
        }

        function move1(opt) {
            var oDiv = opt.ele;
            var oSpan = oDiv.getElementsByTagName('span')[0];
            oDiv.onmouseenter = function (e) {
                e = e || window.event;
                var oTo = e.fromElement || relatedTarget;//里面的关联元素
                if (this.contains(oTo)) return;
                var n = hoverDiv(this, e);
                switch (n) {
                    case 0:
                        utils.css(oSpan, {left: 113, top: 0});
                        break;
                    case 1:
                        utils.css(oSpan, {left: 0, top: 113});
                        break;
                    case 2:
                        utils.css(oSpan, {left: -113, top: 0});
                        break;
                    case 3:
                        utils.css(oSpan, {left: 0, top: -113});
                        break;
                }
                animate(oSpan, {left: 0, top: 0}, 500)
            };
            oDiv.onmouseleave = function (e) {
                e = e || window.event;
                var oTo = e.toElement || relatedTarget;
                if (this.contains(oTo)) return;
                var n = hoverDiv(this, e);
                switch (n) {
                    case 0:
                        animate(oSpan, {left: 113, top: 0}, 500);
                        break;
                    case 1:
                        animate(oSpan, {left: 0, top: 113}, 500);
                        break;
                    case 2:
                        animate(oSpan, {left: -113, top: 0}, 500);
                        break;
                    case 3:
                        animate(oSpan, {left: 0, top: -113}, 500);
                        break;
                }

            }
        }
    }

    /*轮播图效果*/
    banner();
    function banner() {
        var box = document.getElementById('homeBanner');
        var ul = box.getElementsByTagName('ul')[0];
        var aLi = ul.getElementsByTagName('li');
        var oDiv = box.getElementsByTagName('div')[0];
        var oEm = oDiv.getElementsByTagName('em')[0];
        var aDiv = oDiv.getElementsByTagName('div');
        var step = 0;
        var timer = null;

        clearInterval(timer);
        timer = setInterval(autoMove, 1500);
        function autoMove() {
            if (step >= aLi.length - 1) {
                step = -1;
                animate(ul, {top: 0});
                //utils.css(ul, 'top', 0);
            }
            step++;
            animate(ul, {top: -step * 160});
            bannerTip();
        }

        function bannerTip() {
            var tmpStep = step >= aDiv.length ? 0 : step;
            //console.log(tmpStep);
            animate(oEm, {top: tmpStep * 55});

        }

        overOut();
        function overOut() {
            ul.onmouseover = function () {
                clearInterval(timer);
            };
            ul.onmouseout = function () {
                timer = setInterval(autoMove, 1500);
            };
        }

        handleChange();
        function handleChange() {
            for (var i = 0; i < aDiv.length; i++) {
                aDiv[i].index = i;
                aDiv[i].onmouseover = function () {
                    step = this.index;
                    animate(ul, {top: -step * 160}, 300);
                    bannerTip();
                    clearInterval(timer);
                };
                aDiv[i].onmouseout = function () {
                    timer = setInterval(autoMove, 1500);
                }
            }
        }


    }

    /*浮动相关*/
    floatBoxs();
    function floatBoxs() {
        var floatBox = document.getElementById('fixedBox');
        var toTop = document.getElementById('toTop');
        var bottomBanner = document.getElementById('bottomBanner');
        var bottomBanner1 = document.getElementById('bottomBanner1');

        window.onscroll = function (e) {
            if (utils.win("scrollTop") > utils.win("clientHeight")) {
                toTop.style.display = "block";
            } else {
                toTop.style.display = "none";
            }
            if (utils.win("scrollTop") + utils.win("clientHeight") + 80 >= bottomBanner1.offsetTop + bottomBanner1.offsetHeight) {
                bottomBanner.style.display = 'none';
                floatBox.style.bottom = '160px';
            } else {
                bottomBanner.style.display = 'block';
                floatBox.style.bottom = '80px';
            }
        };
        toTop.onclick = function () {
            var scroll = utils.win("scrollTop");
            var a = 500;
            var interval = 30;
            var step = scroll / a * interval;
            var timer = setInterval(function () {
                if (scroll <= 0) {
                    clearInterval(timer);
                }
                scroll -= step;
                utils.win("scrollTop", scroll);
            }, interval);
        }
    }

    /*页脚*/
    footerHover();
    function footerHover() {

        var app = document.getElementById('App');
        var weChat = document.getElementById('weChat');
        var appImg = app.getElementsByTagName('img')[0];
        var weChatImg = weChat.getElementsByTagName('img')[0];
        var show = document.getElementById('showMore');
        var showOther = document.getElementById('bottomMiddleCurrent');
        var height1 = document.getElementById('bottomHeight');
        var showBox = true;
        app.onmouseover = function () {
            appImg.style.display = 'block';
        };
        app.onmouseout = function () {
            appImg.style.display = 'none';
        };
        weChat.onmouseover = function () {
            weChatImg.style.display = 'block';
        };
        weChat.onmouseout = function () {
            weChatImg.style.display = 'none';
        };
        show.onclick = function () {
            if (showBox) {
                showOther.style.height = 'auto';
                height1.style.height = '77px';
                showBox = false;
                show.innerHTML = '收起';
            } else {
                showOther.style.height = '24px';
                height1.style.height = 'auto';
                show.innerHTML = '展开';
                showBox = true;
            }
        };
    }

})();
