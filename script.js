document.addEventListener("DOMContentLoaded", async function () {
  await chrome.storage.local.get({ volume: 100, unmute: false }, (result) => {
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
    document.getElementById("muted").checked = result.unmute;
  });

  document.getElementById("slider").addEventListener("input", changeVolume);
  document.getElementById("muted").addEventListener("change", changeMute);
});

async function changeVolume() {
  const value = document.getElementById("slider").value;
  document.getElementById("current").innerHTML = `<b>Current: ${value}%</b>`;
  await chrome.storage.local.set({ volume: value });
}

async function changeMute() {
  const value = document.getElementById("muted").checked;
  await chrome.storage.local.set({ unmute: value });
}
