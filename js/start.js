var graph = window.graph || {};

var helpers = {
    hasClass: function (classes, has) {
        if(typeof  classes === 'undefined') {
            return;
        }
        var endPos = classes.length - 1;
        if(classes[endPos] === has) {
            return classes[endPos];
        }
        return undefined;
    }
}

graph.popover = function () {
    var getTokenUIElem = document.querySelector(".getTokenUIElem"),
        getTokenUI = document.querySelector(".getTokenUI"),
        offsetTokenUI = getTokenUIElem.getBoundingClientRect();

    getTokenUIElem.addEventListener("click", function (evt) {
       getTokenUI.style.top = offsetTokenUI.top + offsetTokenUI.height + 'px';
       getTokenUI.style.left = offsetTokenUI.left + 'px';
    });
    document.addEventListener("click", function (evt) {
        var el = evt.target,
            closest,
            _target;
        if(el.tagName.toLowerCase() === 'a') {
            _target = helpers.hasClass(el.classList, 'getTokenUIElem');
        }
        else {
            closest = el.parentNode.parentNode;
            _target = helpers.hasClass(closest.classList, 'getTokenUIElem');
        }

        if(_target !== "getTokenUIElem") {
            getTokenUI.style.top = "";
            getTokenUI.style.left = "";
        }
    });
}
graph.init = function () {
    graph.popover();
}
window.addEventListener("load", graph.init);