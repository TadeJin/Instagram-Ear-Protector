async function setVolume() {
  chrome.storage.local.get({ volume: 100, unmute: false }, (result) => {
    const data = result.volume;
    const volume = !data ? 1 : Number(data) / 100;
    const videos = document.querySelectorAll("video");

    if (videos.length > 0) {
      videos.forEach((video) => {
        video.volume = volume;
        if (result.unmute && result) {
          video.muted = false;
        }
      });
    }
  });
}

let isStarted = null;
setVolume();

if (!isStarted) {
  isStarted = setInterval(() => {
    setVolume();
  }, 500);
}
