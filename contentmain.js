console.log('content main');
//console.log(mychrome_ext_variable);
console.log(window.document.referrer);
console.log(window.document.documentURI);
//var port = chrome.runtime.connect();
//console.log(window.document.referrer);
//var domArray = [];
//window.localStorage.clear();

//var domArraySize = 0;
//if (window.localStorage.getItem("domArraySize")) {
//    domArraySize = parseInt(window.localStorage.getItem("domArraySize"));
//}
//domArraySize = domArraySize + 1;
//window.localStorage.setItem("domArraySize", domArraySize.toString());
//var domIdentifier = "dom" + domArraySize;
//window.localStorage.setItem(domIdentifier, window.document.getElementsByTagName("html")[0].innerHTML);





//domArray.push(window.document.getElementsByTagName("html")[0]);
//window.localStorage.setItem("domArray", JSON.stringify(domArray));
//console.log(window.document.getElementsByTagName("html")[0].innerHTML);

window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (event.data.type == "FROM_EXTENSION") {
        console.log('Main Event Source : ' + event.source);
        
        if (domArray) {
            
            domArray.push({
                windowId: 1,
                domWindowDocument: window.document,
                //outerHTML: window.document.getElementsByTagName("html")[0].outerHTML
            });
        }
    }
    
   


    //if (event.data.type && (event.data.type == "FROM_PAGE")) {
    //    console.log("Content script received: " + event.data.text);
    //    port.postMessage(event.data.text);
    //}

    
}, false);