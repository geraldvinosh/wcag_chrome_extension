var port = chrome.runtime.connect();
console.log('inside content script');

//console.log(window.document.getElementsByTagName("html")[0].innerHTML);
var documenthtmlObjectArray = [];

//documenthtmlObjectArray.push(window.document.getElementsByTagName("html")[0].innerHTML);
//console.log(documenthtmlObjectArray.length);

window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    console.log('Event Source : ' + event.source);
    documenthtmlObjectArray.push(window.document.getElementsByTagName("html")[0].innerHTML);
    //if (event.source != window)
    //    return;
    //if (documenthtmlObjectArray) {
    //    documenthtmlObjectArray.push(window.document.getElementsByTagName("html")[0].innerHTML);
    //}
    //else {
    //    documenthtmlObjectArray = [];
    //    documenthtmlObjectArray.push(window.document.getElementsByTagName("html")[0].innerHTML);
    //}
    
    

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: " + event.data.text);
        port.postMessage(event.data.text);
    }

    //console.log(documenthtmlObjectArray.length);
}, false);