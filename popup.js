// Initialize button with user's preferred color

// let changeColor = document.getElementById("changeColor");
let changeWord = document.getElementById('changeWord');

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});
// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: setPageBackgroundColor,
//     });
//   });

  changeWord.addEventListener("click", async() => {
    let searchWord = document.getElementById('searchWord').value
    let replacementWord = document.getElementById('replacementWord').value

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: replaceWord,
      args: [searchWord, replacementWord],
    });
});
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
      console.log(color)
    });
  }

  function replaceWord(searchWord, replacementWord){
      // document.body.innerText = document.body.innerHTML.replace(new RegExp(searchWord, 'gi'), replacementWord);
      let allElements = document.body.querySelectorAll('span, p, h1, h2')
      for(let i = 0; i< allElements.length; i++){
          let currentElement = allElements[i]
          if(currentElement.innerHTML.indexOf(searchWord) !== -1) {
            currentElement.innerText = currentElement.innerText.replace(searchWord, replacementWord)
          }
          // if (currentElement.childElementCount == 0 && currentElement.innerText.length > 0){
          //   console.log(currentElement)
          //     currentElement.innerText = currentElement.innerText.replace(searchWord, replacementWord)
          // }
      }
  }