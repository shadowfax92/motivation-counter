function updateCountdown() {
  chrome.storage.sync.get(["targetDate", "messages"], function (data) {
    if (data.targetDate) {
      const targetDate = new Date(data.targetDate);
      const currentDate = new Date();
      const difference = targetDate - currentDate;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = days;
      document.getElementById("time-text").textContent = 
        `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
      
      // Display all messages
      const messages = data.messages || ["Set your date and messages in popup"];
      const messagesHtml = messages.map(msg => `<div class="message">${msg}</div>`).join('');
      document.getElementById("messages-container").innerHTML = messagesHtml;
    }
  });
}

// Update countdown immediately and then every second
document.addEventListener('DOMContentLoaded', function() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}); 