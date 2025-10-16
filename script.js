document.addEventListener("DOMContentLoaded", async function () {
  await chrome.storage.local.get({ volume: 100 }, (result) => {
    const slider = document.getElementById("slider");
    slider.addEventListener("mousedown", () => {
      slider.classList.add("dragging");
    });

    document.addEventListener("mouseup", () => {
      slider.classList.remove("dragging");
    });
    slider.value = !result ? 100 : result.volume;
    document.getElementById(
      "current"
    ).innerHTML = `<b>Current: ${result.volume}%</b>`;
  });

  document.getElementById("slider").addEventListener("input", changeVolume);
});

async function changeVolume() {
  const value = document.getElementById("slider").value;
  document.getElementById("current").innerHTML = `<b>Current: ${value}%</b>`;
  await chrome.storage.local.set({ volume: value });

  const tabs = await chrome.tabs.query({ url: "*://www.instagram.com/*" });

  if (tabs.length > 0) {
    chrome.tabs.sendMessage(tabs[0].id, {
      volume: value,
      sender: "IGEarProtector",
    });
  }
}
