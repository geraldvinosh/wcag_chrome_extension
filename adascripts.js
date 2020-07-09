var elementList = [];
var nonCompliantElements = [];
var domArray = [];
var nonCompliantErrors = "";
var promiseArray = [];
var nonCompliantElementsList = [];

function CallDomAPIValidator(domWindowDocument, frameId) {
    if (frameId == null || frameId == undefined) {
        frameId = 0;
    }
    
    var domElements = DOMManipulation.GetDOMElementsList(domWindowDocument, "");
    console.log("domElements");
    console.log(domElements);
    var nonCompliantErrors = domValidation.ValidateDOM(domElements);
    for (var i = 0; i < nonCompliantErrors.length; i++) {
        nonCompliantElements.push({ frameId: frameId, ErrorDetail: nonCompliantErrors[i] });
        nonCompliantElementsList.push(nonCompliantErrors[i]);
    }

    console.log('Validation Complete');
   
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
        var liError = "<li class=\"errorlist\"><button class=\"errorButton\" onclick=\"HighlightElement(" + nonCompliantElements[i].frameId + ",'" + nonCompliantElements[i].ErrorDetail.ElementXPath + "')\">" + nonCompliantElements[i].ErrorDetail.ErrorDescription + "</button></li>";
        nonCompliantErrors = nonCompliantErrors + liError;
    }

    var outputHTML = `<div style='background-color: rgb(251,246,221); color: black; width: 300px;display:inline;position:fixed;border:solid;padding-right:10px;z-index:999999;height:auto;height:100% !important;overflow:scroll';>  \
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
            <button id ="adaReportDownloadButton" onclick="DownloadReport()"> Generate Report </button>
        </div>
           <br /> <br /> <br />
        <style>\
            li.errorlist {\
                background - color: bisque;\
                    padding: 3px;\
                    margin-bottom: 5px;\
                    border-bottom: solid 1px;\
                }\
            
            li button.errorButton{
                background-color:rgb(247,211,206);
                border:0px;
                text-align:left;
                border-radius:5px;
                text-indent:2px;
                padding:3px;
                width:100%
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
                background-color: rgb(6,123,249);
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

               var nonCompliantElementsCSV = ${JSON.stringify(nonCompliantElementsList)};
               
                function DownloadReport(){
                    let jsonColumns = Object.keys(nonCompliantElementsCSV[0]);
                    console.log(jsonColumns);
                    let csvString = "";
                    csvString = jsonColumns.join(",");
                    console.log(csvString);
                    csvString = csvString + "\\n";
                    
                    for (let i = 0; i < nonCompliantElementsCSV.length; i++) {
                        for (let j = 0; j < jsonColumns.length; j++) {
                            csvString = csvString + nonCompliantElementsCSV[i][jsonColumns[j]]+",";
                        }
                        csvString = csvString + "\\n";
                    }



                    //Download file Code --finalized

                    var blob = new Blob([csvString], { type: 'text/csv' });
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement("a");
                    a.href = url;
                    a.download = "NonComplianceReport.csv";
                    a.click();
                }


               function ModifyXpath(currentXpath) {
                
                    var elements = currentXpath.split("/");
               
                    for (var i = 0; i < elements.length; i++) {
                        //console.log(elements[i]);
                        if (elements[i].indexOf("BODY") > -1) {
                            elements.splice(i+1, 0, "DIV[2]");
                            break;
                        }
                    }

                    var newXpath = elements.join("/");
                    return newXpath;
            }

                
                function HighlightElement(frameId, elementXpath) {
                 
                    if(frameId == 0){
                         var modifiedXpath = ModifyXpath(elementXpath);
                        console.log('elementXpath');
                         console.log(elementXpath);
                         console.log('modifiedXpath');
                         console.log(modifiedXpath);
                         var result = document.evaluate(modifiedXpath, document, null, XPathResult.ANY_TYPE, null);
                         var node = result.iterateNext();
                         console.log('node');
                         console.log(node);
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
                }`

    //document.getElementsByClassName("errorButton").addEventListener("click", HighlightElemet);`;

    var scriptTag = document.createElement("script");
    headElement.appendChild(scriptTag);
    scriptTag.insertAdjacentText("afterbegin", scriptFunction);
}

function Main() {

    //Send message to content scripts and populate the domArray
    window.postMessage({ type: "FROM_EXTENSION", text: "Hello from the webpage!" }, "*");

    setTimeout(function () {
        for (var i = 0; i < domArray.length; i++) {
            CallDomAPIValidator(domArray[i].domWindowDocument, domArray[i].frameId);
        }
        ShowResults();
    }, 3000);
}

Main();