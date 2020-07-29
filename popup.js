let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('backgroundColor', function(data) {
  changeColor.style.backgroundColor = data.backgroundColor;
  changeColor.setAttribute('value', data.backgroundColor);
});

chrome.storage.sync.get('color', function(data) {
  changeColor.style.color = data.color;
  changeColor.setAttribute('value', data.color);
});

//changeColor.onclick = function (element) {
//    let color = element.target.value;
//    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//        chrome.tabs.executeScript(tabs[0].id, { file: 'DOMManipulation.js' }).then(function () {
//            chrome.tabs.executeScript(tabs[0].id, { file: 'DOMValudation.js' }).then(function () {
//                chrome.tabs.executeScript(tabs[0].id, { file: 'adascriptsnew.js' })
//            })
//        })
//    });
//}

changeColor.onclick = function (element) {
    let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { file: 'validationdoc.js' });
        chrome.tabs.executeScript(tabs[0].id, { file: 'DOMManipulation.js' });
        chrome.tabs.executeScript(tabs[0].id, { file: 'DOMValidation.js' });
        chrome.tabs.executeScript(tabs[0].id, { file: 'adascripts.js' });
    });
};

