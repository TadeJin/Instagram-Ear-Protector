async function setVolume() {
  await chrome.storage.local.get({ volume: 100 }, (result) => {
    const data = result.volume;
    const volume = !data ? 1 : Number(data) / 100;
    const videos = document.querySelectorAll("video");

    if (videos.length > 0) {
      videos.forEach((video) => {
        video.volume = volume;
      });
    }
  });
}

let isStarted = null;
setVolume();

if (!isStarted) {
  isStarted = setInterval(() => {
    setVolume();
  }, 3000);
}

chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {
  if (msg.sender === "IGEarProtector") {
    chrome.storage.local.set({ volume: msg.volume });
    setVolume();
  }
});
