document.addEventListener("DOMContentLoaded", function () {
  const messagesContainer = document.getElementById("messages-container");
  const addMessageButton = document.getElementById("addMessage");

  // Load saved settings
  chrome.storage.sync.get(["targetDate", "messages"], function (data) {
    if (data.targetDate) {
      document.getElementById("targetDate").value = data.targetDate;
    }
    if (data.messages && data.messages.length > 0) {
      // Clear default message input
      messagesContainer.innerHTML = '';
      // Add each saved message
      data.messages.forEach(message => addMessageInput(message));
    }
  });

  function addMessageInput(value = '') {
    const messageGroup = document.createElement('div');
    messageGroup.className = 'message-input-group';
    messageGroup.innerHTML = `
      <input type="text" class="message-input" placeholder="Enter your message" value="${value}" />
      <button class="remove-message" title="Remove message">&times;</button>
    `;

    messageGroup.querySelector('.remove-message').addEventListener('click', function() {
      messageGroup.remove();
    });

    messagesContainer.appendChild(messageGroup);
  }

  addMessageButton.addEventListener("click", function() {
    addMessageInput();
  });

  // Save settings
  document.getElementById("saveButton").addEventListener("click", function () {
    const targetDate = document.getElementById("targetDate").value;
    const messageInputs = document.querySelectorAll('.message-input');
    const messages = Array.from(messageInputs).map(input => input.value).filter(msg => msg.trim() !== '');

    chrome.storage.sync.set(
      {
        targetDate: targetDate,
        messages: messages,
      },
      function () {
        const button = document.getElementById("saveButton");
        button.textContent = "Saved!";
        setTimeout(() => {
          button.textContent = "Save Settings";
        }, 1000);
      }
    );
  });
});
