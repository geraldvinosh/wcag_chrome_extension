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
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "HTML Missing language attribute", "ElementType": tagType ,"ValidationId":1});
                }
                break;
            case "img":
                if (elementAttributes.indexOf("alt") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "IMAGE Missing alt text", "ElementType": tagType,"ValidationId": 2 });

                }
                break;
            case "label":
                if (elementAttributes.indexOf("for") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "LABEL Missing for text", "ElementType": tagType, "ValidationId": 3 });
                }
                break;
            case "input":
                if (elementAttributes.indexOf("name") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "INPUT Element Missing Name", "ElementType": tagType, "ValidationId": 3});
                }
                if (elementAttributes.indexOf("type") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "INPUT Element Missing type", "ElementType": tagType, "ValidationId": 3 });
                }
                if (elementAttributes.indexOf("tabindex") > 0) {
                    if (tabindex + 1 == node.tabIndex) {
                        tabindex = node.tabIndex;
                    }
                    else {
                        domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": tagType + " element breaked tab index", "ElementType": tagType, "ValidationId": 1 });
                    }
                    //if (node.tabindex > 0) {

                    //}
                }
                break;
            case "form":
                if (elementAttributes.indexOf("role") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "FORM Missing role attribute", "ElementType": tagType, "ValidationId": 1 });
                }
                break;
            case "table":
                if (elementAttributes.indexOf("role") < 0) {
                    domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "FORM Missing role attribute", "ElementType": tagType, "ValidationId": 1 });
                }
                break;
            default:
                break;
        }

        if (tagType == "body" || tagType == "div" || tagType == "span" || tagType == "p" || tagType == "label" || tagType == "input") {
            validateColor(domElement);
        }
        

    } catch (e) {
        console.log('exception in Validate element')
        console.log(e);
        console.log(domElement);
    }
    

}

function validateColor(domElement) {
    //console.log(element);
    //console.log(window.getComputedStyle(element.Element));
    var nodeElement = domElement.Element;
    //console.log(nodeElement.parentNode);

    var rgb_background = window.getComputedStyle(nodeElement).backgroundColor.replace(/[^\d,]/g, '').split(',');

    if (rgb_background[0] == "0" && rgb_background[1] == "0" && rgb_background[2] == "0") {
        
        return;
    }
    rgb_background = window.getComputedStyle(nodeElement).backgroundColor.replace(/[^\d,]/g, '').split(',');
    var rgb_color = window.getComputedStyle(nodeElement).color.replace(/[^\d,]/g, '').split(',');
    //console.log(rgb_background);
    //console.log(rgb_color);
    //console.log(fullColorHex(rgb_background[0], rgb_background[1], rgb_background[2]));
    //console.log(fullColorHex(rgb_color[0], rgb_color[1], rgb_color[2]));
    //console.log(domElement.Element.tagName + " " +contrast(rgb_background, rgb_color));
    //var L1 = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    //var L2 = 0.2126 * rgbc[0] + 0.7152 * rgbc[1] + 0.0722 * rgbc[2];
    //console.log((L1 + 0.05) / (L2 + 0.05));

    if (contrast(rgb_background, rgb_color) < 4.5) {
        domErrorElements.push({ "ElementXPath": domElement.ElementXPath, "ErrorDescription": "Color contrast not matching the recommended standards", "ElementType": domElement.Element.tagName, "ValidationId": 4 });
    }

    
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


function luminanace(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(rgb1, rgb2) {
    var lum1 = luminanace(rgb1[0], rgb1[1], rgb1[2]);
    var lum2 = luminanace(rgb2[0], rgb2[1], rgb2[2]);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}
//contrast([255, 255, 255], [255, 255, 0]); // 1.074 for yellow
//contrast([255, 255, 255], [0, 0, 255]); // 8.592 for blue
// minimal recommended contrast ratio is 4.5, or 3 for larger font-sizes


var domValidation = {
    "ValidateDOM": ValidateDOM
}