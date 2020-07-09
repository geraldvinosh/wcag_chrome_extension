var mychrome_ext_variable = 123;
console.log("background js called");
//alert('hi');
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({backgroundColor: 'black'}, function() {
      console.log("The color is black.");
    });
    chrome.storage.sync.set({ color: 'white' });
 });