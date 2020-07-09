var elementList = [];
var nonCompliantElements = [];
var domArray = [];
var nonCompliantErrors = "";
var promiseArray = [];

function GetElementsList() {
    var htmlElement = document.getElementsByTagName("html");
    var bodyElement = document.getElementsByTagName("body")[0];
    var rootElement = htmlElement[0];
    GetAllElements(rootElement);

    for (let index = 0; index < elementList.length; index++) {
        //console.log(elementList[index].tagName);
        CheckADACompliance(elementList[index]);
    }

    

    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Content-Type', 'application/jsonp');
    headers.set('Accept', 'application/jsonp');
    //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    //headers.append('Origin', 'http://localhost:5000');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://localhost:5000/api/ADA");
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.send();

    //fetch('http://localhost:5000/api/ADA', {
    //    method: 'POST',
    //    headers: headers
    //})

    //fetch('http://localhost:5000/api/ADA', {
    //    method: 'GET',
    //    headers: {
    //        'Access-Control-Allow-Origin':'*',
    //        //'Content-Type': 'application/json',
    //    }
    //}).then(response => {
    //    console.log(response);
    //});

    var bodyContent = document.createElement("div");
    bodyContent.innerHTML = bodyElement.innerHTML;
    bodyContent.style = bodyElement.style;
    bodyElement.innerHTML = "";
    bodyElement.appendChild(bodyContent);

    //bodyElement.style = "";
    bodyContent.style.display = "inline";
    bodyContent.style.marginLeft = "300px";
    bodyContent.style.position = "absolute";

   

    //Create new element . Copy content of body into this
    
    
}

function GetAllElements(element) {
    elementList.push(element);
    for (let index = 0; index < element.children.length; index++) {
        GetAllElements(element.children[index])
    }
}

function CheckADACompliance(element) {
    if (element.tagName == "LABEL") {
        var forAttribute = element.getAttribute("for");
        if (forAttribute) {

        }
        else {
            element.style.backgroundColor = "red";
        }
    }
}

function CallDomAPIValidator(domHTML, frameId) {
    if (frameId == null || frameId == undefined) {
        frameId = 0;
    }
    let headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    headers.set('Accept', 'application/json');
   
    console.log('call api');
   
    var fetchPromise = fetch('http://localhost:5000/api/ADA', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(domHTML)
    }).then(response => response.json())
      .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            nonCompliantElements.push({ frameId:frameId,ErrorDetail:data[i]});
        }
    });

    return fetchPromise;
}

function ShowResults() {
    var bodyElement = document.getElementsByTagName("body")[0];
    var headElement = document.getElementsByTagName("head")[0];

    var bodyContent = document.createElement("div");
    bodyContent.innerHTML = bodyElement.innerHTML;
    bodyContent.classList.add("original-body");
    bodyContent.style = bodyElement.style;
    bodyElement.innerHTML = "";
    bodyElement.appendChild(bodyContent);

    //bodyElement.style = "";
    bodyContent.style.display = "inline";
    bodyContent.style.marginLeft = "300px";
    bodyContent.style.position = "absolute";
    console.log("nonCompliantElements");
    console.log(nonCompliantElements);
    for (var i = 0; i < nonCompliantElements.length; i++) {
        var liError = "<li class=\"errorlist\"><button class=\"errorButton\" onclick=\"HighlightElement(" + nonCompliantElements[i].frameId + ",'" + nonCompliantElements[i].ErrorDetail.elementXPath + "')\">" + nonCompliantElements[i].ErrorDetail.errorDescription + "</button></li>";
        nonCompliantErrors = nonCompliantErrors + liError;
    }

    var outputHTML = `<div style='background-color: antiquewhite; color: black; width: 300px;display:inline;position:fixed;border:solid;padding-right:10px;z-index:999999;height:auto;height:95% !important;overflow:scroll';>  \
    <br />\
        <h2 style='text-align:center;margin-top:10px'> WCAG Accessibilty Test Tool Report</h2>\
        <div style='margin-left:10px'>\
            <table style='font-weight:600'>\
                <tr>\
                    <td>Total Errors:</td>\
                    <td> ${nonCompliantElements.length}\</td>\
                </tr>\
            </table>\
        </div>\
        <div style="display:block;">\
            <ul style="list-style-type:decimal">\
                ${nonCompliantErrors}\
            </ul>\
        </div>
        <div style="text-align:center">
            <button id ="adaReportDownloadButton"> Generate Report </button>
        </div>
        <style>\
            li.errorlist {\
                background - color: bisque;\
                    padding: 5px;\
                    margin-bottom: 5px;\
                    border-bottom: solid 1px;\
                }\
            
            li button.errorButton{
                background-color:rgb(248,208,212);
                border:0px;
                text-align:left;
                border-radius:7px;
                text-indent:5px;
                padding:5px;
            }
            @@keyframes blinker{
                from {
                    opacity: 1.0;
                }

                to {
                    opacity: 0.0;
                }
            }
            .ada-error-blink {
                border: red dashed 5px !important;
                animation-name:blinker;
                animation-duration: 0.2s;
                animation-iteration-count:infinite;
                animation-timing-function: linear;
            }
            #adaReportDownloadButton{
                padding-right: 20px;
                background-color: rgb(100,170,210);
                padding-left: 20px;
                border-radius: 6px;
                color: white;
                padding-top: 10px;
                padding-bottom: 10px;
            }
            .tooltip {
                position: relative;
                display: inline-block;
                border-bottom: 1px dotted black;
            }

            .tooltip .tooltiptext {
                visibility: hidden;
                width: 120px;
                background-color: #555;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 5px 0;
                position: absolute;
                z-index: 1;
                bottom: 125%;
                left: 50%;
                margin-left: -60px;
                opacity: 0;
                transition: opacity 0.3s;
            }

            .tooltip .tooltiptext::after {
                content: "";
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: #555 transparent transparent transparent;
            }

            .tooltip:hover .tooltiptext {
                visibility: visible;
                opacity: 1;
            }
            </style>\
        </div >\
       `;

    bodyElement.insertAdjacentHTML("afterbegin", outputHTML);
    
    var scriptFunction = `

               function ModifyXpath(currentXpath) {
                
                    var elements = currentXpath.split("/");
               
                    for (var i = 0; i < elements.length; i++) {
                        console.log(elements[i]);
                        if (elements[i].indexOf("body") > -1) {
                            elements.splice(i+1, 0, "div[2]");
                            break;
                        }
                    }

                    var newXpath = elements.join("/");
                    return newXpath;
            }

                
                function HighlightElement(frameId, elementXpath) {
                 
                    if(frameId == 0){
                         var modifiedXpath = ModifyXpath(elementXpath);
                         console.log(modifiedXpath);
                         var result = document.evaluate(modifiedXpath, document, null, XPathResult.ANY_TYPE, null);
                         var node = result.iterateNext();
                         
                         var classList = node.getAttribute("class");
                         classList = classList + " ada-error-blink";
                         node.setAttribute("class",classList)
                         
                         node.focus();
                        //node.scrollIntoView();
                    }
                    else{
                         
                        window.postMessage({ type: "FROM_PAGE", "frameId": frameId,"elementXpath":elementXpath }, "*");

                         //var result = document.evaluate(modifiedXpath, domArray[frameId].document, null, XPathResult.ANY_TYPE, null);
                         //var node = result.iterateNext();
                         //console.log(result);
                         //console.log(node);
                         //var classList = node.getAttribute("class");
                         //classList = classList + " ada-error-blink";
                         //node.setAttribute("class",classList)
                         //node.scrollIntoView();
                         //node.focus();
                    }
                   

                    //console.log(node.getAttribute("class"));
                    //if (node = result.iterateNext()) {
                    //    console.log(node);
                    //    node.backgroundColor = "red";
                    //    node = result.iterateNext();
                    //}
                }`

    //document.getElementsByClassName("errorButton").addEventListener("click", HighlightElemet);`;

    var scriptTag = document.createElement("script");
    headElement.appendChild(scriptTag);
    scriptTag.insertAdjacentText("afterbegin", scriptFunction);
}

function HighlightElemet(elementXpath) {
    var result = document.evaluate(elementXpath, document, null, XPathResult.ANY_TYPE, null);
    var node = null;
    console.log(result);
    while (node = result.iterateNext()) {
        console.log(node);
        node = result.iterateNext();
    }
    //return false;
}

function Main() {

    //Send message to content scripts and populate the domArray
    window.postMessage({ type: "FROM_EXTENSION", text: "Hello from the webpage!" }, "*");
   
    setTimeout(function () {
        for (var i = 0; i < domArray.length; i++) {
            promiseArray.push(CallDomAPIValidator(domArray[i].outerHTML, domArray[i].frameId));
        }
        
        Promise.all(promiseArray).then(function(){
           ShowResults();
        });

    }, 3000);

    DOMManipulation.TestAlert('hi');
}

Main();


//console.log(documenthtmlObjectArray);   
//window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");