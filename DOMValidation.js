var domErrorElements = [];

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
        console.log(domElement);
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

var domValidation = {
    "ValidateDOM": ValidateDOM
}