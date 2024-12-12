document.addEventListener("DOMContentLoaded", function () {
  // Load saved settings
  chrome.storage.sync.get(["targetDate", "message"], function (data) {
    if (data.targetDate) {
      document.getElementById("targetDate").value = data.targetDate;
    }
    if (data.message) {
      document.getElementById("message").value = data.message;
    }
  });

  // Save settings
  document.getElementById("saveButton").addEventListener("click", function () {
    const targetDate = document.getElementById("targetDate").value;
    const message = document.getElementById("message").value;

    chrome.storage.sync.set(
      {
        targetDate: targetDate,
        message: message,
      },
      function () {
        // Show brief success message
        const button = document.getElementById("saveButton");
        button.textContent = "Saved!";
        setTimeout(() => {
          button.textContent = "Save Settings";
        }, 1000);
      },
    );
  });
});
