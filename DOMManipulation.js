var domElementArray = [];

function GetDOMElements(childElements, parentXpath) {
    
    let currentXpath = "";
    let elementOrder = 0;

    for (var i = 0; i < childElements.length; i++) {
        
        if (childElements[i].tagName != undefined) {
            console.log("tagname:" + childElements[i].tagName);
            var previousSiblingArray = [];
            //console.log(childElements[i].previousElementSibling);
            var previousElementSibling = childElements[i].previousElementSibling;
            while (previousElementSibling) {
                if (previousElementSibling.tagName == childElements[i].tagName) {
                    previousSiblingArray.push(previousElementSibling);
                }
                previousElementSibling = previousElementSibling.previousElementSibling;
            }

            var indexPos = 0;
            if (previousSiblingArray.length > 0) {
                indexPos = previousSiblingArray.length + 1;
            }
            else {
                indexPos = 1;
            }

            var relativeXpath = childElements[i].tagName + "[" + indexPos + "]";
            currentXpath = parentXpath + "/" + relativeXpath;
            relativeXpath = "";
            //console.log(currentXpath);
        }


        elementOrder = elementOrder + 1;
        domElementArray.push({ "Element": childElements[i], "ElementOrder": elementOrder, "ElementXPath": currentXpath });

        if (childElements[i].hasChildNodes()) {
            GetDOMElements(childElements[i].childNodes, currentXpath);
        }


    }

    return domElementArray;
}

function GetDOMElementsList(domWindowDocument) {
    domElementArray = [];
    var rootChildren = domWindowDocument.children;
    GetDOMElements(rootChildren, "");
    return domElementArray;
}

function TestAlert(msg) {
    alert(msg);
}

function ValidateDOM() {

}

var DOMManipulation = {
    "GetDOMElementsList": GetDOMElementsList,
    "TestAlert": TestAlert
}

