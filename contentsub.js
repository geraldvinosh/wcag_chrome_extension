console.log('content sub');
console.log(window.document.referrer);
console.log(window.document.documentURI);


window.addEventListener("message", function (event) {

    if (event.data.type == "FROM_EXTENSION") {
        // We only accept messages from ourselves
        console.log('Sub Event from extension : ' + event.source);
        //documenthtmlObjectArray.push(window.document.getElementsByTagName("html")[0].innerHTML);
        //console.log(frames[0].document.referrer);
        //console.log(frames[0].document.documentURI);
        //console.log(frames[0].document.getElementsByTagName("html").length);
        //test
        for (var i = 0; i < window.frames.length; i++) {
            if (domArray) {
                console.log(window.frames[i]);
                //domArray.push(window.frames[i].document.getElementsByTagName("html")[0].outerHTML);
                domArray.push({
                    frameId: i + 1,
                    domWindowDocument: window.frames[i].document,
                    //outerHTML: window.frames[i].document.getElementsByTagName("html")[0].outerHTML
                });
            }
            //console.log(frames[0].document.innerHTML);
        }
    }

    else if (event.data.type == "FROM_PAGE") {

        var frameWindowDoc = window.frames[event.data.frameId-1].document; 
        //frameWindowDoc.getElementsByTagName("body")[0].innerHTML = " <b>Some Additional Content Added </b>" + frameWindowDoc.getElementsByTagName("body")[0].innerHTML
        //console.log(domArray);
        //var frameWindow = domArray[event.data.frameId].document;        //.document is a window object
        //var frameWindowDoc = (frameWindow.contentWindow || frameWindow.contentDocument);
        //frameWindowDoc.getElementsByTagName("body")[0].innerHTML = " <b>Some Additional Content Added </b>" + frameWindowDoc.getElementsByTagName("body")[0].innerHTML

        var result = frameWindowDoc.evaluate(event.data.elementXpath, frameWindowDoc, null, XPathResult.ANY_TYPE, null);
        var node = result.iterateNext();
        console.log(result);
        console.log(node);
        var classList = node.getAttribute("class");
        classList = classList + " ada-error-blink";
        node.setAttribute("class", classList)
        node.scrollIntoView();
        node.focus();

        //add style element to the head tag
        console.log(frameWindowDoc.getElementById('ada-style-id'));
        if (frameWindowDoc.getElementById('ada-style-id') == null) {
            console.log('in here');
            var adaStyleClass = 
                `.ada-error-blink {
                    border: red dashed 5px !important;
                    animation - name: blinker;
                    animation - duration: 0.2s;
                    animation - iteration - count: infinite;
                    animation - timing - function: linear;
                }`;
            var adaErrorStyleElement = frameWindowDoc.createElement("style");
            adaErrorStyleElement.setAttribute("id", "ada-style-id");
            adaErrorStyleElement.insertAdjacentText("afterbegin", adaStyleClass);
            frameWindowDoc.getElementsByTagName("body")[0].appendChild(adaErrorStyleElement);
            //console.log(frameWindowDoc.getElementsByTagName("body")[0]);
        }

        //window.frames[event.data.frameId - 1].document = frameWindowDoc;
    }

   
    //if (event.data.type && (event.data.type == "FROM_PAGE")) {
    //    console.log("Content script received: " + event.data.text);
    //    //port.postMessage(event.data.text);
    //}


}, false);


window.addEventListener("getFrameId", function (event) {
    // We only accept messages from ourselves
    console.log('Sub Event get frame id');

}, false);