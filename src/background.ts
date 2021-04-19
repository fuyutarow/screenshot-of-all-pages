import { version } from '../package.json';

console.log('Hello from background script!', version);

chrome.runtime.onInstalled.addListener(() => {

  // 親階層のメニューを生成
  const parent_menu = chrome.contextMenus.create({
    type: 'normal',
    id: 'parent',
    title: '背景色を変えるメニュー',
  });

  //子階層のメニューを親(parent_menu)に追加
  chrome.contextMenus.create({
    id: 'red',
    parentId: parent_menu,
    title: '赤色',
  });

  chrome.contextMenus.create({
    id: 'blue',
    parentId: parent_menu,
    title: '青色',
  });

  chrome.contextMenus.create({
    id: 'alert',
    parentId: parent_menu,
    title: 'alert',
  });

  chrome.contextMenus.create({
    id: 'F12',
    parentId: parent_menu,
    title: 'F12',
  });

  chrome.contextMenus.create({
    id: 'PageDown',
    parentId: parent_menu,
    title: 'PageDown',
  });

  chrome.contextMenus.create({
    id: 'ArrowDown',
    parentId: parent_menu,
    title: 'ArrowDown',
  });
});

chrome.browserAction.onClicked.addListener((tab) => {
  alert(tab);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.pressEnter) {

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      const tab = tabs[0];

      if (tab) {
        // alert('send command')
        const code = 'ArrowDown';
        console.log(code);
        chrome.debugger.attach({ tabId: tab.id }, '1.2');
        // chrome.debugger.sendCommand({ tabId: tab.id }, 'Input.dispatchKeyEvent', {
        //   type: 'keyDown',
        //   code,
        // }, (res) => {
        //   if (chrome.runtime.lastError) {
        //     console.warn('Error sending the shortcut to active tab:', chrome.runtime.lastError)
        //   }
        // })
        // chrome.debugger.sendCommand({ tabId: tab.id }, 'Input.dispatchKeyEvent', {
        //   type: 'keyUp',
        //   code,
        // }, (res) => {
        //   if (chrome.runtime.lastError) {
        //     console.warn('Error sending the shortcut to active tab:', chrome.runtime.lastError)
        //   }
        // })
        chrome.debugger.detach({ tabId: tab.id });
      }
    });
  }
});

chrome.contextMenus.onClicked.addListener((item) => {
  console.log('メニューがクリックされたよ');

  // 選ばれたメニューのidが item.menuItemId で取得できる
  if (['PageDown', 'F12', 'ArrowDown'].includes(item.menuItemId)) {
    //     const code = `
    // document.dispatchEvent(new KeyboardEvent('keydown',{'key': '${item.menuItemId}'}));
    //     `;
    //     //     const code = `
    //     // var pressEvent = document.createEvent ('KeyboardEvent');
    //     // pressEvent.initKeyEvent ('keydown', true, true, window, true, false, false, false, 34, 0);
    //     // document.dispatchEvent (pressEvent);
    //     //     `
    // alert("OK#1")
    // chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    chrome.tabs.query({ active: true }, tabs => {
      const tab = tabs[0];
      if (tab) {
        // alert("OK#2")
        // const code = 'PageDown'
        const code = 'ArrowDown';
        // chrome.debugger.attach({ tabId: tab.id }, "1.0");
        // chrome.debugger.sendCommand({ tabId: tab.id }, 'Input.dispatchKeyEvent', {
        //   type: 'keyDown', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13, macCharCode: 13
        // });
        // chrome.debugger.sendCommand({ tabId: tab.id }, 'Input.dispatchKeyEvent', {
        //   type: 'keyUp', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13, macCharCode: 13
        // });
        chrome.debugger.attach({ tabId: tab.id }, '1.2',);
        chrome.debugger.sendCommand({ tabId: tab.id }, 'Input.dispatchKeyEvent', {
          type: 'keyUp',
          code: 'PageDown',
          key: 'PageDown',
        }, (res) => {
          if (chrome.runtime.lastError) {
            console.warn('Error sending the shortcut to active tab:', chrome.runtime.lastError);
          }
          chrome.debugger.sendCommand({ tabId: tab.id }, 'Input.dispatchKeyEvent', {
            type: 'keyDown',
            code: 'PageDown',
            key: 'PageDown',
          }, (res) => {
            if (chrome.runtime.lastError) {
              console.warn('Error sending the shortcut to active tab:', chrome.runtime.lastError);
            }
          });
        });
        chrome.debugger.detach({ tabId: tab.id });
      }
    });
    // chrome.tabs.executeScript({ code });
    // console.log(code)
  } else if (['alert'].includes(item.menuItemId)) {
    const code = `
    alert("OKKO")
    `;
    chrome.tabs.executeScript({ code });
    console.log(code);
    // document.execCommand('insertText', false, 'myString')

  } else {
    const code = `document.body.style.backgroundColor = '${item.menuItemId}'`;
    chrome.tabs.executeScript({ code });
    console.log(code);
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
