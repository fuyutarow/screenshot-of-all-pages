import { version } from '../package.json';

console.log("Hello from background script!", version)


chrome.runtime.onInstalled.addListener(() => {

  // 親階層のメニューを生成
  const parent_menu = chrome.contextMenus.create({
    type: "normal",
    id: "parent",
    title: "背景色を変えるメニュー"
  });

  //子階層のメニューを親(parent_menu)に追加
  chrome.contextMenus.create({
    id: "red",
    parentId: parent_menu,
    title: "赤色"
  });

  chrome.contextMenus.create({
    id: "blue",
    parentId: parent_menu,
    title: "青色"
  });

  chrome.contextMenus.create({
    id: "alert",
    parentId: parent_menu,
    title: "alert"
  });
  chrome.contextMenus.create({
    id: "PageDown",
    parentId: parent_menu,
    title: "PageDown"
  });

  chrome.contextMenus.create({
    id: "ArrowDown",
    parentId: parent_menu,
    title: "ArrowDown"
  });
});


chrome.contextMenus.onClicked.addListener((item) => {
  console.log("メニューがクリックされたよ");

  // 選ばれたメニューのidが item.menuItemId で取得できる
  if (['PageDown', 'a', 'ArrowDown'].includes(item.menuItemId)) {
    const code = `
document.dispatchEvent(new KeyboardEvent('keydown',{'key': '${item.menuItemId}'}));
    `;
    chrome.tabs.executeScript({ code });
    console.log(code)
  } else if (['alert'].includes(item.menuItemId)) {
    const code = `
    alert("OKKO")
    `;
    chrome.tabs.executeScript({ code });
    console.log(code)
    // document.execCommand('insertText', false, 'myString')

  } else {
    const code = `document.body.style.backgroundColor = '${item.menuItemId}'`
    chrome.tabs.executeScript({ code });
    console.log(code)
  }
});

// let id = 100;

// chrome.contextMenus.onClicked.addListener((item) => {

//   chrome.tabs.captureVisibleTab((screenshotUrl) => {
//     const viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)
//     let targetId: any = null;

//     chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
//       // We are waiting for the tab we opened to finish loading.
//       // Check that the tab's id matches the tab we opened,
//       // and that the tab is done loading.
//       if (tabId != targetId || changedProps.status != "complete") {
//         return;
//       }
//       // As we cleared the check above, There is nothing we need to do for
//       // future onUpdated events, so we use removeListner to stop getting called
//       // when onUpdated events fire.
//       chrome.tabs.onUpdated.removeListener(listener);

//       // We fetch all the views opened by our extension using getViews method and
//       // it returns an array of the JavaScript 'window' objects for each of the pages
//       // running inside the current extension. Inside the loop, we match each and
//       // every entry's URL to the unique URL we created at the top and if we get a match,
//       // we call a function on that view which will be called on the page that has been opened
//       // by our extension and we pass our image URL to the page so that it can display it to the user.
//       var views = chrome.extension.getViews();
//       for (var i = 0; i < views.length; i++) {
//         var view = views[i];
//         if (view.location.href == viewTabUrl) {
//           (view as any).setScreenshotUrl(screenshotUrl);
//           break;
//         }
//       }
//     });

//     //We open the tab URL by using the chrome tabs create method and passing it the
//     // URL that we just created and we save the tab id that we get from this method
//     // after the tab is created in the targetId variable.
//     chrome.tabs.create({ url: viewTabUrl }, (tab) => {
//       targetId = tab.id;
//     });
//   });
// });
