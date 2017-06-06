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

    var methodElem = document.querySelector(".methodElem"),
        methodUI = document.querySelector(".methodUI"),
        offsetMethodUI = methodElem.getBoundingClientRect();

    getTokenUIElem.addEventListener("click", function (evt) {
       getTokenUI.style.top = offsetTokenUI.top + offsetTokenUI.height + 'px';
       getTokenUI.style.left = offsetTokenUI.left + 'px';
    });

    methodElem.addEventListener("click", function (evt) {
       methodUI.style.top = offsetMethodUI.top + offsetMethodUI.height + 'px';
       methodUI.style.left = offsetMethodUI.left + 'px';
    });

    document.addEventListener("click", function (evt) {
        var el = evt.target,
            closest,
            _target;
        console.log(evt.target);
        if(el.tagName.toLowerCase() === 'a') {
            _target = helpers.hasClass(el.classList, 'getTokenUIElem') || helpers.hasClass(el.classList, 'methodElem');
        }
        else {
            closest = el.parentNode.parentNode;
            _target = helpers.hasClass(closest.classList, 'getTokenUIElem') || helpers.hasClass(el.parentNode.classList, 'methodElem');
        }

        if(_target !== "getTokenUIElem") {
            getTokenUI.style.top = "";
            getTokenUI.style.left = "";
        }
        if(_target !== "methodElem") {
            methodUI.style.top = "";
            methodUI.style.left = "";
        }
    });
}
graph.init = function () {
    graph.popover();
}
window.addEventListener("load", graph.init);