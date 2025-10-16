document.addEventListener("DOMContentLoaded", async function () {
  await chrome.storage.local.get({ volume: 100 }, (result) => {
    document.getElementById("slider").value = !result ? 100 : result.volume;
  });

  document.getElementById("slider").addEventListener("change", changeVolume);
});

async function changeVolume() {
  const value = document.getElementById("slider").value;
  await chrome.storage.local.set({ volume: value });

  const tabs = await chrome.tabs.query({ url: "*://www.instagram.com/*" });

  if (tabs.length > 0) {
    chrome.tabs.sendMessage(tabs[0].id, {
      volume: value,
      sender: "IGEarProtector",
    });
  }
}
