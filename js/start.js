var graph = window.graph || {};

var utils = {
    init: function () {
        Element.prototype.getFish = function () {
            console.log('Cam can cau di cau ca ne');
        }
    }
}

utils.init();

var helpers = {
    _hasClass: function (classes, has) {
        if (typeof  classes === 'undefined') {
            return;
        }
        var endPos = classes.length - 1;
        if (classes[endPos] === has) {
            return classes[endPos];
        }
        return undefined;
    },
    addClass: function (el, _class) {
        var classes = el.classList;
        classes.add(_class);
    },
    removeClass: function (el, _class) {
        var classes = el.classList;

        for(var i in classes) {
            if(classes[i] === _class) {
                classes.remove(classes[i]);
            }
        }
    },
    hasClass: function (classes, _class) {
        var i = 0;
        for (; i < classes.length; i++) {
            if (classes[i] === _class) {
                return true;
            }
        }
    },
    clearClass: function (el, _class) {
        var i = 0,
            classes = el.classList;

        for (; i < classes.length; i++) {
            if (classes[i] === _class) {
                classes.remove(_class);
            }
        }
    },
    clearClassAll: function (els, _class) {
        var i = 0;
        for (; i < els.length; i++) {
            helpers.clearClass(els[i], _class);
        }
    },
    removeItems: function (el, items) {
        for(var i = 0; i < items.length; i++) {
            el.removeChild(items[i]);
        }
    },
    closest: function (el, disTag) {                       //tag <= 10 node
        var result, times = 1;

        var searchDistination = function () {
            if(times <= 10) {
                try {
                    if(el.tagName.toLowerCase() === disTag) {
                        result = document.querySelector(disTag);
                        return result;
                    }
                    el = el.parentNode;
                    times++;
                    return searchDistination();
                }
                catch(e) {}
            }
        };

        return searchDistination();
    }
}

graph.popover = function () {
    var getTokenUIElem = document.querySelector(".getTokenUIElem"),
        getTokenUI = document.querySelector(".getTokenUI"),
        offsetTokenUI = getTokenUIElem.getBoundingClientRect();

    var methodElem = document.querySelector(".methodElem"),
        methodUI = document.querySelector(".methodUI"),
        offsetMethodUI = methodElem.getBoundingClientRect();

    var getTokenCode = document.querySelector(".getTokenCode"),
        getTokenCodeUI = document.querySelector(".getTokenCodeUI");

    getTokenUIElem.addEventListener("click", function (evt) {
        getTokenUI.style.top = offsetTokenUI.top + offsetTokenUI.height + 'px';
        getTokenUI.style.left = offsetTokenUI.left + 'px';
    });

    methodElem.addEventListener("click", function (evt) {
        methodUI.style.top = offsetMethodUI.top + offsetMethodUI.height + 'px';
        methodUI.style.left = offsetMethodUI.left + 'px';
    });

    getTokenCode.addEventListener("click", function (evt) {
        helpers.removeClass(getTokenCodeUI, "hidden_elem");
    });

    var lis = methodUI.querySelectorAll("li");
    lis.forEach(function (item, index) {
        item.addEventListener("click", function (evt) {
            var classes = this.classList,
                methodText = document.querySelector(".methodText"),
                isActiveClass = helpers.hasClass(classes, "_54nd"),
                text = this.querySelector(".text").innerHTML,
                addField = document.createElement("div"),
                methodSubmit = document.querySelector(".methodSubmit"),
                actionMethod = document.querySelector(".actionMethod"),
                objAddField = document.querySelector(".addField"),
                objField = document.querySelectorAll(".field");


            addField.className = "_1pvu addField";
            addField.innerHTML = '<a role="button" tabindex="0">Add a Field</a>';

            helpers.clearClassAll(lis, "_54nd");

            if (!isActiveClass) {
                helpers.addClass(this, "_54nd");
                methodText.innerHTML = text;
            }
            switch (text) {
                case 'POST':
                    methodSubmit.insertBefore(addField, actionMethod.nextSibling);
                    break;
                case 'GET':
                    if (objAddField !== null) {
                        methodSubmit.removeChild(objAddField);
                    }
                    helpers.removeItems(methodSubmit, objField);
                    break;
                case 'DELETE':
                    if (objAddField !== null) {
                        methodSubmit.removeChild(objAddField);
                    }
                    helpers.removeItems(methodSubmit, objField);
                    break;
            }

            var btnAddField = addField.querySelector('a');
            btnAddField.addEventListener("click", function (evt) {
                evt.preventDefault();
                var field = document.createElement("div"), fieldHTML;

                fieldHTML = '<label class="_1pvr _55r1 _58ak _3ct8">';
                fieldHTML += '<input type="text" class="_58al" placeholder="Name" value="">';
                fieldHTML += '</label>';
                fieldHTML += '<textarea class="_1pvs" placeholder="Value"></textarea>';
                fieldHTML += '<button class="_1pvt _50zy _50-0 _50z- _5upp _42ft removeField" type="button" title="Remove">';
                fieldHTML += '<em class="_4qba" data-intl-translation="Remove" data-intl-trid="">Remove</em>';
                fieldHTML += '</button>';

                field.className = "_1pvq field";
                field.innerHTML = fieldHTML;
                methodSubmit.insertBefore(field, this.parentNode);

                var fields = methodSubmit.querySelectorAll(".field");

                fields.forEach(function (item, index) {
                    var removeField = item.querySelector('.removeField');
                    removeField.addEventListener("click", function (evt) {
                        try {
                            methodSubmit.removeChild(item);
                        }
                        catch (e) {
                        }
                    });
                });

            });

        });
    });


    document.addEventListener("click", function (evt) {
        var el = evt.target,
            closest,
            _target;
        var elem = helpers.closest(el, "li");
        if (el.tagName.toLowerCase() === 'a') {
            _target = helpers._hasClass(el.classList, 'getTokenUIElem') || helpers._hasClass(el.classList, 'methodElem');
        }
        else {

            try {
                if (el.classList.length > 0 && el.tagName.toLowerCase() !== 'button') {
                    closest = el.parentNode.parentNode;
                    _target = helpers._hasClass(closest.classList, 'getTokenUIElem') || helpers._hasClass(el.parentNode.classList, 'methodElem') || helpers._hasClass(elem.classList, 'getTokenCode');
                }
            }
            catch(e) {}

        }

        if (_target !== "getTokenUIElem") {
            getTokenUI.style.top = "";
            getTokenUI.style.left = "";
        }
        if (_target !== "methodElem") {
            methodUI.style.top = "";
            methodUI.style.left = "";
        }
        console.log(el)
        if(_target !== "getTokenCode") {
            helpers.addClass(getTokenCodeUI, "hidden_elem");
        }
    });
}
graph.init = function () {
    graph.popover();
}
window.addEventListener("load", graph.init);