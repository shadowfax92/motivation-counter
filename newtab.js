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

      // Format the countdown in a cleaner way with proper structure for CSS targeting
      document.getElementById("days").innerHTML = `
        <span class="time-value">${days}</span><span class="time-label">d</span>
        <span class="time-value">${hours}</span><span class="time-label">h</span>
        <span class="time-value">${minutes}</span><span class="time-label">m</span>
        <span class="time-value">${seconds}</span><span class="time-label">s</span>
      `;
      
      // Keep the detailed text in the time-text element
      document.getElementById("time-text").textContent = 
        `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
      
      // Display all messages
      const messages = data.messages || ["Set your date and messages in popup"];
      const messagesHtml = messages.map(msg => `<div class="message">${msg}</div>`).join('');
      document.getElementById("messages-container").innerHTML = messagesHtml;
    }
  });
}

function updateCompanyStats() {
  chrome.storage.sync.get(["companyStartDate"], function (data) {
    if (data.companyStartDate) {
      const startDate = new Date(data.companyStartDate);
      const today = new Date();
      
      // Calculate days
      const days = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      
      // Calculate months (approximate)
      const months = Math.floor(days / 30.44); // Average days per month

      document.getElementById("company-days").textContent = days;
      document.getElementById("company-months").textContent = months;
    }
  });
}

// Update countdown immediately and then every second
document.addEventListener('DOMContentLoaded', function() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// Call this function when page loads and set interval to update
updateCompanyStats();
setInterval(updateCompanyStats, 1000 * 60 * 60); // Update every hour 