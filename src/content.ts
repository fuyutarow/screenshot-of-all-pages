// This file is injected as a content script
console.log("Hello from content script!")

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('OIOKKO');
  let selection;
  console.log(request.message); // -> 選択範囲ちょうだい が出力される

  // 画面で選択されている部分を文字列で取得する
  if ((window as any).getSelection) {
    selection = (window as any).getSelection().toString();
  } else {
    selection = '';
  }
  sendResponse(selection);
});
