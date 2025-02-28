document.addEventListener("DOMContentLoaded", function () {
  const messagesContainer = document.getElementById("messages-container");
  const addMessageButton = document.getElementById("addMessage");

  // Load saved settings
  chrome.storage.sync.get(["targetDate", "messages", "startDate"], function (data) {
    if (data.targetDate) {
      document.getElementById("targetDate").value = data.targetDate;
    }
    if (data.startDate) {
      document.getElementById("startDate").value = data.startDate;
    }
    if (data.messages && data.messages.length > 0) {
      // Clear default message input
      messagesContainer.innerHTML = '';
      // Add each saved message
      data.messages.forEach(message => addMessageInput(message));
    }
  });

  function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  function addMessageInput(value = '') {
    const messageGroup = document.createElement('div');
    messageGroup.className = 'message-input-group';
    messageGroup.innerHTML = `
      <textarea class="message-input" placeholder="Enter your message">${value}</textarea>
      <button class="remove-message" title="Remove message">&times;</button>
    `;

    const textarea = messageGroup.querySelector('.message-input');
    textarea.addEventListener('input', () => autoResizeTextarea(textarea));
    
    messageGroup.querySelector('.remove-message').addEventListener('click', function() {
      messageGroup.remove();
    });

    messagesContainer.appendChild(messageGroup);
    autoResizeTextarea(textarea); // Initial resize
  }

  addMessageButton.addEventListener("click", function() {
    addMessageInput();
  });

  // Save settings
  document.getElementById("saveButton").addEventListener("click", function () {
    const targetDate = document.getElementById("targetDate").value;
    const startDate = document.getElementById("startDate").value;
    const messageInputs = document.querySelectorAll('.message-input');
    const messages = Array.from(messageInputs).map(input => input.value).filter(msg => msg.trim() !== '');

    chrome.storage.sync.set(
      {
        targetDate: targetDate,
        messages: messages,
        startDate: startDate,
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
