/**
 * Created by thinkpad on 2016-8-22.
 */
var utils = (function () {
    var flag = 'getComputedStyle' in window;
    return {
        makeArray: function (arg) {
            var ary = [];
            try {
                ary = Array.prototype.slice.call(arg);
            } catch (e) {
                for (var i = 0; i < arg.length; i++) {
                    ary.push(arg[i]);
                }
            }
            return ary;
        },
        jsonParse: function (str) {
            return 'JSON'in window ? JSON.parse(str) : eval('(' + str + ')');
        },
        rnd: function (n, m) {
            n = Number(n);
            m = Number(m);
            if (isNaN(n) || isNaN(m)) {
                return Math.random();
            }
            if (n > m) {
                var tmp = m;
                m = n;
                n = tmp;
            }
            return Math.round(Math.random() * (m - n) + n);
        },
        getByClass: function (strClass, parent) {
            parent = parent || document;
            if (flag) {
                return this.makeArray(parent.getElementsByClassName(strClass));
            }
            var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
            var nodeList = parent.getElementsByTagName('*');
            var ary = [];
            for (var i = 0; i < nodeList.length; i++) {
                var cur = nodeList[i];
                var bOk = true;
                for (var j = 0; j < aryClass.length; j++) {
                    var reg = new RegExp('\\d' + aryClass[j] + '\\d');
                    if (!reg.test(cur.className)) {
                        bOk = false;
                        break;
                    }
                }
                if (bOk) {
                    ary.push(cur);
                }
            }
            return ary;
        },
        hasClass: function (curEle, cName) {
            var reg = new RegExp('\\d' + cName + '\\d');
            return reg.test(curEle.className);
        },
        addClass: function (curEle, strClass) {
            var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
            for (var i = 0; i < aryClass.length; i++) {
                if (!this.hasClass(curEle, aryClass[i])) {
                    curEle.className += ' ' + aryClass[i];
                }
            }
        },
        removeClass: function (curEle, strClass) {
            var aryClass = strClass.replace(/(^ +)|( +$)/g, '').split(/\s+/g);
            for (var i = 0; i < aryClass.length; i++) {
                var reg = new RegExp('\\d' + aryClass[i] + '\\d');
                if (this.hasClass(curEle, aryClass[i])) {
                    curEle.className = curEle.className.replace(reg, ' ').replace(/(^ +)|( +$)/g, '').replace(/\s+/, ' ');
                }
            }
        },
        getCss: function (curEle, attr) {
            var val = null;
            var reg = null;
            if (flag) {
                val = getComputedStyle(curEle, false)[attr];
            } else {
                if (attr === 'opacity') {
                    val = curEle.currentStyle.filter;
                    var reg = /^alpha\(opacity[=:](\d+)\)$/i;
                    return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
                }
                val = curEle.currentStyle[attr];
            }
            reg = /^[+-]?(\d|[1-9]\d+(\.\d+)?)(px|pt|em|rem)$/i;
            return reg.test(val) ? parseFloat(val) : val;
        },
        setCss: function (curEle, attr, value) {
            if (attr === 'float') {
                curEle.style.cssFloat = value;
                curEle.style.styleFloat = value;
                return;
            }
            if (attr === 'opacity') {
                curEle.style.opacity = value;
                curEle.style.filter = 'alpha(opacity=' + (value * 100) + ')';
                return;
            }
            var reg = /^(width|height|top|bottom|left|right|((margin|padding)(top|bottom|left|right)?))$/i;
            if (reg.test(attr)) {
                if (!(value === 'auto' || value.toString().indexOf('%') !== -1)) {
                    value = parseFloat(value) + 'px';
                }
            }
            curEle.style[attr] = value;
        },
        setGroupCss: function (curEle, opt) {
            for (var attr in opt) {
                this.setCss(curEle, attr, opt[attr]);
            }
        },
        css: function (curEle) {
            var arg2 = arguments[1];
            if (typeof arg2 === 'string') {
                var arg3 = arguments[2];
                if (arg3 === undefined) {
                    return this.getCss(curEle, arg2);
                } else {
                    this.setCss(curEle, arg2, arg3);
                }
            }
            if (arg2.toString() === '[object Object]') {
                this.setGroupCss(curEle, arg2);
            }
        },
        win: function (attr, value) {
            if (value === undefined) {
                return document.documentElement[attr] || document.body[attr];
            } else {
                document.documentElement[attr] = document.body[attr] = value;
            }
        },
        offset: function (curEle) {
            var l = curEle.offsetLeft;
            var t = curEle.offsetTop;
            var pre = curEle.offsetParent;
            while (pre) {
                if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                    l += pre.clientLeft;
                    t += pre.clientTop;
                }
                l += pre.offsetLeft;
                t += pre.offsetTop;
                pre = pre.offsetParent;
            }
            return {left: l, top: t}
        },
        getChildren: function (curEle, tagName) {
            var nodeList = curEle.childNodes;
            var ary = [];
            for (var i = 0; i < nodeList.length; i++) {
                var cur = nodeList[i];
                if (cur && cur.nodeType === 1) {
                    if (tagName !== undefined) {
                        if (tagName.toLowerCase() === cur.tagName.toLowerCase()) {
                            ary.push(cur);
                        }
                    } else {
                        ary.push(cur);
                    }
                }
            }
            return ary;
        },
        prev: function (curEle) {
            if (flag) {
                return curEle.previousElementSibling;
            }
            var pre = curEle.previousSibling;
            while (pre && pre.nodeType !== 1) {
                pre = pre.previousSibling;
            }
            return pre;
        },
        prevAll: function (curEle) {
            var pre = this.prev(curEle);
            var ary = [];
            while (pre) {
                ary.push(pre);
                pre = this.prev(pre);
            }
            return ary;
        },
        next: function (curEle) {
            if (flag) {
                return curEle.nextElementSibling;
            }
            var nex = curEle.nextSibling;
            while (nex && nex.nodeType !== 1) {
                nex = nex.nextSibling;
            }
            return nex;
        },
        nextAll: function (curEle) {
            var nex = this.next(curEle);
            var ary = [];
            while (nex) {
                ary.push(nex);
                nex = this.prev(nex);
            }
            return ary;
        },
        sibling: function (curEle) {
            var pre = this.prev(curEle);
            var nex = this.next(curEle);
            var ary = [];
            if (pre) {
                ary.push(pre)
            }
            if (nex) {
                ary.push(nex)
            }
            return ary;
        },
        siblings: function (curEle) {
            var ary1 = this.prevAll(curEle);
            var ary2 = this.nextAll(curEle);
            return ary1.concat(ary2);
        },
        firstChild: function (curEle) {
            var val = this.getChildren(curEle);
            return val[0];
        },
        lastChild: function (curEle) {
            var val = this.getChildren(curEle);
            return val[val.length - 1];
        },
        index: function (curEle) {
            return this.prevAll(curEle).length;
        },
        appendChild: function (curEle, parent) {
            parent.appendChild(curEle);
        },
        prependChild: function (curEle, parent) {
            var first = this.firstChild(curEle);
            if (first) {
                parent.insertBefore(curEle, first);
            } else {
                parent.appendChild(curEle);
            }
        },
        insertBefore: function (newEle, oldEle) {
            oldEle.parentNode.insertBefore(newEle, oldEle);
        },
        insertAfter: function (newEle, oldEle) {
            var nex = this.next(oldEle);
            if (nex) {
                oldEle.parentNode.insertBefore(newEle, nex);
            } else {
                oldEle.parentNode.appendChild(newEle);
            }
        }
    }

})();