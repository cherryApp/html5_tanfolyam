function afterNative(prevElem, elem) {

    // DOM elemmé alakítás.
    var parent = document.createElement('div');
    parent.innerHTML = elem;
    elem = parent.firstChild;
    console.log(elem);

    // A szülőn belül hányadik az az elem, ami elé be kell szúrni az új elemet.
    var parent = prevElem.parentNode;
    var parentChilds = parent.children;
    var index = 0;
    for (var i = 0; i < parentChilds.length; i++) {
        if (parentChilds[i] === prevElem)
            index = i;
    }

    // A kiválasztott elem utolsó-e az elemek listájában.
    if (index + 1 === parentChilds.length) {
        parent.appendChild(elem);
    } else {
        parent.insertBefore(elem, parent.children[index + 1]);
    }

}