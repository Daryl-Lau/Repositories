/**
 * get style
 * ex: getStyle(box, 'width').
 * @param {object}obj
 * @param {string}name
 * @returns {string}
 */
function getStyle(obj, name) {
    if (obj.currentStyle) //IE
    {
        return obj.currentStyle[name];
    }
    else {
        return getComputedStyle(obj, null)[name];  //FF
    }
}


/**
 * used to set style animate.
 * ex: startMove(this, {'width':100, 'height':100}, function (){ alert('Move ended') }).
 * @param {object}obj
 * @param {json}json
 *  @param {number}speed
 * @param {function}endFunc
 */
function variableMove(obj, json, speed, endFunc) {
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var bResult = true;
        for (var attr in json) {
            var cur;
            if (attr === 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else if (attr === 'scrollTop') {
                cur = Math.round(parseInt(document.documentElement.scrollTop));
            }
            else {
                cur = parseInt(getStyle(obj, attr));
            }

            var step = (json[attr] - cur) / speed;
            //get the initeger
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            if (cur !== json[attr]) {
                bResult = false;
            }

            if (attr === 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + step) + ')';  //IE
                obj.style.opacity = (cur + step) / 100;
            } else if (attr === 'scrollTop') {
                obj.scrollTop = cur + step;
            }
            else {
                obj.style[attr] = cur + step + 'px';
            }
        }

        if (attr === 'scrollTop') {
            window.onscroll = function () {
                window.onmousewheel = function () {
                    clearInterval(obj.timer)
                };
            }
        }
        // //execute the end function
        // console.log(cur, json[attr], json[attr] - cur, bResult);

        if (bResult) {
            clearInterval(obj.timer);
            if (endFunc) {
                endFunc()
            }
        }
    }, 10)
}

/**
 *
 * @param {obkect}obj
 * @param {json}json
 * @param {number}speed
 * @param {function}endFunc
 */
function uniformMove(obj, json, speed, endFunc) {

    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var bResult = true;
        for (var attr in json) {
            var cur;
            if (attr === 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
                var speedOpacity = json[attr] - cur >= 0 ? speed : -speed;

            }
            else if (attr === 'scrollTop') {
                cur = Math.round(parseInt(obj.scrollTop));
                var speedScroll = json[attr] - cur >= 0 ? speed : -speed;
            }
            else {
                cur = parseInt(getStyle(obj, attr));
                var speedPx = json[attr] - cur >= 0 ? speed : -speed;
            }


            if (cur !== json[attr]) {
                bResult = false;
            }

            if (attr === 'opacity') {
                if (cur !== json[attr] * 100) {
                    if (Math.abs(json[attr] - cur) < Math.abs(speedOpacity)) {
                        speedOpacity = (json[attr] - cur);
                    }
                    obj.style.filter = 'alpha(opacity:' + (cur + speedOpacity) + ')';  //IE
                    obj.style.opacity = (cur + speedOpacity) / 100;
                }
            }
            else if (attr === 'scrollTop') {
                if (cur !== json[attr]) {
                    if (Math.abs(json[attr] - cur) < Math.abs(speedScroll)) {
                        speedScroll = json[attr] - cur
                    }
                    obj.scrollTop = cur + speedScroll;
                }
            }
            else {
                if (cur !== json[attr]) {
                    if (Math.abs(json[attr] - cur) < Math.abs(speedPx)) {
                        speedPx = json[attr] - cur
                    }
                    obj.style[attr] = cur + speedPx + 'px';
                }
            }
        }

        if (attr === 'scrollTop') {
            window.onscroll = function () {
                window.onmousewheel = function () {
                    clearInterval(obj.timer)
                };
            }
        }

        //execute the end function
        if (bResult) {
            clearInterval(obj.timer);
            if (endFunc) {
                endFunc()
            }
        }

    }, 10)
}


/**
 * Removes null values from an array
 * example: clear_arr_trim(['', 'v1', 'v2']), it will return ['v1', 'v2'].
 * @param array
 * @returns {*}
 */
function clear_arr_trim(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === "" || typeof(array[i]) === "undefined") {
            array.splice(i, 1);
            i = i - 1;
        }
    }
    return array;
}

/**
 * To determine if there are classes, you can determine if there are multiple classes at the same time
 * example: hasClass(obj, 'class1 class2')
 * @param obj
 * @param cls
 */
function hasClass(obj, cls) {
    var clsArray = clear_arr_trim(cls.split(' '));
    var classNameArray = clear_arr_trim(obj.className.split(' '));

    var i = 0;
    while (clsArray[i]) {
        var index = classNameArray.indexOf(clsArray[i]);
        if (index === -1) {
            return false;
        }
        i++;
    }
    return true;
}


/**
 * used to add class from elements
 * ex: addClass(oDiv, 'className')
 *
 * if origin class name is [class = 'class1'], then after use function addClass(oDiv, 'class2'),
 * it will be [class = 'class1 class2']
 *
 * @param {object}obj
 * @param {string}cls
 */
function addClass(obj, cls) {
    var clsArray = clear_arr_trim(cls.split(' '));
    var classNameArray = clear_arr_trim(obj.className.split(' '));

    for (var i = 0; i < clsArray.length; i++) {
        var index = classNameArray.indexOf(clsArray[i]);
        if (index === -1) {
            classNameArray.push(clsArray[i]);
        }
    }
    obj.className = classNameArray.join(' ');
}

/**
 * used to remove class from elements
 * ex: removeClass(oDiv, 'className')
 *
 * if origin class name is [class = 'class1 class2'], then after use function removeClass(oDiv, 'class2'),
 * it will be [class = 'class1']
 *
 * @param {object}obj
 * @param {string}cls
 */
function removeClass(obj, cls) {
    var clsArray = clear_arr_trim(cls.split(' '));
    var classNameArray = clear_arr_trim(obj.className.split(' '));


    for (var i = 0; i < clsArray.length; i++) {
        var index = classNameArray.indexOf(clsArray[i]);
        if (index !== -1) {
            classNameArray.removeEle(clsArray[i]);
        }
    }
    obj.className = classNameArray.join(' ');
}

Array.prototype.removeEle = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/**
 * used to toggle class from elements
 * ex: toggleClass(oDiv, 'className')
 *
 * if origin class name is [class = 'class1 class2'], then after use function toggleClass(oDiv, 'class2'),
 * it will toggle from [class = 'class1 class2'] and [class = 'class1']
 *
 * @param {object}obj
 * @param {string}cls
 */
function toggleClass(obj, cls) {
    var clsArray = clear_arr_trim(cls.split(' '));
    var classNameArray = clear_arr_trim(obj.className.split(' '));

    for (var i = 0; i < clsArray.length; i++) {
        var index = classNameArray.indexOf(clsArray[i]);
        if (index === -1) {
            classNameArray.push(clsArray[i]);
        }
        else {
            classNameArray.removeEle(clsArray[i]);
        }
    }
    obj.className = classNameArray.join(' ');
}

/**
 * used to get current browser's screen width and height.
 * ex: client().width; client().height;
 *
 */
!function () {
    if (window.innerHeight !== undefined) {
        client = function () {
            return {
                "width": window.innerWidth,
                "height": window.innerHeight
            }
        }
    } else if (document.compatMode === "CSS1Compat") {
        client = function () {
            return {
                "width": document.documentElement.clientWidth,
                "height": document.documentElement.clientHeight
            }
        }
    } else {
        client = function () {
            return {
                "width": document.body.clientWidth,
                "height": document.body.clientHeight
            }
        }
    }

    if (window.pageXOffset) {
        scroll = function () {
            return {
                "left": window.pageXOffset,
                "top": window.pageYOffset
            }
        }
    } else if (document.compatMode === "CSS1Compat") {
        scroll = function () {
            return {
                "left": document.documentElement.scrollLeft,
                "top": document.documentElement.scrollTop
            }
        }
    } else {
        scroll = function () {
            return {
                "left": document.body.scrollLeft,
                "top": document.body.scrollTop
            }
        }
    }
}();


/**
 * Deep copy
 * @param fromObj
 * @param toObj
 */
function deepCopy(fromObj, toObj) {
    for (var key in fromObj) {
        var fromValue = fromObj[key];
        if (!isObj(fromValue)) {
            toObj[key] = fromValue;
        } else {
            var tempObj = new fromValue.constructor;
            deepCopy(fromObj, tempObj);
            toObj[key] = tempObj;
        }
    }
}

/**
 * 判断是否是对象
 * @param obj
 * @returns {boolean}
 */
function isObj(obj) {
    return obj instanceof Object;
}