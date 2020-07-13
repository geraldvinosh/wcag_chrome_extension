var domErrorElements = [];

var tabindex = 0;

function ValidateDOM(domElements) {
    domErrorElements = [];

    for (var i = 0; i < domElements.length; i++) {
        ValidateElement(domElements[i])
    }
    return domErrorElements;
}

function ValidateElement(domElement) {
    try {
        if (domElement.Element.nodeName == "#text") {
            //console.log(domElement);
            return;
        }
        //console.log(domElement);
        var node = domElement.Element;
        var elementAttributes = node.getAttributeNames();
        var tagType = node.tagName.toLowerCase();
        switch (tagType) {
            case "html":
                if (elementAttributes.indexOf("lang") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "HTML Missing language attribute", "ElementType": tagType });
                }
                break;

            case "img":
                if (elementAttributes.indexOf("alt") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "IMAGE Missing alt text", "ElementType": tagType });

                }
                break;
            case "h1":
                {
                    validateColor(node);
                }
                break;
            case "label":
                if (elementAttributes.indexOf("for") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "LABEL Missing for text", "ElementType": tagType });
                }
                break;
            case "input":
                if (elementAttributes.indexOf("name") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "INPUT Element Missing Name", "ElementType": tagType });
                }
                if (elementAttributes.indexOf("type") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "INPUT Element Missing type", "ElementType": tagType });
                }
                if (elementAttributes.indexOf("tabindex") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "INPUT Element Missing tabindex", "ElementType": tagType });
                }
                else {
                    if (tabindex + 1 == node.tabIndex) {
                        tabindex = node.tabIndex;
                    }
                    else {
                        domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": tagType + " element breaked tab index", "ElementType": tagType });
                    }
                }
                break;
            case "form":
                if (elementAttributes.indexOf("role") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "FORM Missing role attribute", "ElementType": tagType });
                }
                break;
            case "table":
                if (elementAttributes.indexOf("role") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "FORM Missing role attribute", "ElementType": tagType });
                }
                break;
            default:
                break;
        }
    } catch (e) {
        console.log('exception in Validate element')
        console.log(e);
        console.log(domElement);
    }

}

function validateColor(element) {
    console.log(window.getComputedStyle(element).color);
    console.log(window.getComputedStyle(element).backgroundColor);
    var rgb = window.getComputedStyle(element).backgroundColor.replace(/[^\d,]/g, '').split(',');
    var rgbc = window.getComputedStyle(element).color.replace(/[^\d,]/g, '').split(',');
    console.log(fullColorHex(rgb[0], rgb[1], rgb[2]));
    var L1 = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    var L2 = 0.2126 * rgbc[0] + 0.7152 * rgbc[1] + 0.0722 * rgbc[2];
    console.log((L1 + 0.05) / (L2 + 0.05));
}

var rgbToHex = function (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

var fullColorHex = function (r, g, b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red + green + blue;
};



var domValidation = {
    "ValidateDOM": ValidateDOM
}