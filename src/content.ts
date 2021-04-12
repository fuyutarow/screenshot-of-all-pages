import { version } from '../package.json';
// This file is injected as a content script
console.log("Hello from content script!", version)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let selection;
  console.log(request.message); // -> 選択範囲ちょうだい が出力される

  const event = new KeyboardEvent("keydown", { key: "PageDown" });
  document.dispatchEvent(event);
  console.log(event);
  // document.dispatchEvent(new KeyboardEvent('keydown',{'key':'a'}));
  console.log('press A')

  // 画面で選択されている部分を文字列で取得する
  if ((window as any).getSelection) {
    selection = (window as any).getSelection().toString();
  } else {
    selection = '';
  }
  sendResponse(selection);
});
