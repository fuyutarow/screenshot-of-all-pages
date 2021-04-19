import { version } from '../package.json';
// This file is injected as a content script
console.log('Hello from content script!', version);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let selection;
  console.log(request.message); // -> 選択範囲ちょうだい が出力される

  // const event = new KeyboardEvent("keydown", { key: "PageDown" });
  // document.dispatchEvent(event);
  // console.log(event);

  chrome.runtime.sendMessage({ pressEnter: true });

  // document.dispatchEvent(new KeyboardEvent('keydown',{'key':'a'}));
  console.log('press A');

  // 画面で選択されている部分を文字列で取得する
  if ((window as any).getSelection) {
    selection = (window as any).getSelection().toString();
  } else {
    selection = '';
  }
  sendResponse(selection);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.pressEnter) {

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      const tab = tabs[0];
      alert(tab);

      if (tab) {
        const code = 'ArrowDown';
        chrome.debugger.attach({ tabId: tab.id }, '1.2');
        chrome.debugger.detach({ tabId: tab.id });
      }
    });
  }
});

// chrome.browseraction.onclicked.addlistener(function (tab) {
//   console.log('turning ' + tab.url + ' red!');
//   chrome.tabs.executescript({ code: 'document.body.style.backgroundcolor="red"' });
//   triggerkeyevent(document.body, 38);
// });
// function triggerkeyevent(element, charcode) {
//   // cannot pass object references, generate unique selector
//   var attribute = 'robw_' + date.now();
//   element.setattribute(attribute, '');
//   var selector = element.tagname + '[' + attribute + ']';
//   var s = document.createelement('script');
//   s.textcontent = '(' + function (charcode, attribute, selector) {
//     // reference element...
//     var element = document.queryselector(selector);
//     element.removeattribute(attribute);
//     // create keyboardevent instance
//     var event = document.createevent('keyboardevents');
//     event.initkeyboardevent(
// /* type         */ 'keydown',
// /* bubbles      */ true,
// /* cancelable   */ false,
// /* view         */ window,
// /* keyidentifier*/ '',
// /* keylocation  */ 0,
// /* ctrlkey      */ false,
// /* altkey       */ false,
// /* shiftkey     */ false,
// /* metakey      */ false,
// /* altgraphkey  */ false
//     );
//     // define custom values
//     // part requires script run in page's context
//     var gettercode = { get: function () { return charcode } };
//     var getterchar = { get: function () { return string.fromcharcode(charcode) } };
//     object.defineproperties(event, {
//       charcode: gettercode,
//       which: getterchar,
//       keycode: gettercode, // not correct
//       key: getterchar,     // not correct
//       char: getterchar
//     }); element.dispatchevent(event);
//   } + ')(' + charcode + ', "' + attribute + '", "' + selector + '")';
//   console.log('text content: ' + s.textcontent);
//   (document.head || doc.documentelement).appendchild(s);
//   s.parentnode.removechild(s);
// }
