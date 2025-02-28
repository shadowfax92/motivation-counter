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
  chrome.storage.sync.get(["startDate"], function (data) {
    if (data.startDate) {
      const startDate = new Date(data.startDate);
      const today = new Date();
      
      // Calculate the time difference in milliseconds
      const difference = today - startDate;
      
      // Calculate time units
      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      // Calculate months (approximate)
      const months = Math.floor(totalDays / 30.44); // Average days per month
      const daysInCurrentMonth = Math.floor(totalDays % 30.44); // Days in current month

      // Update the company stats with a more elegant structure
      const companyStatsElement = document.querySelector('.company-stats');
      if (companyStatsElement) {
        companyStatsElement.innerHTML = `
          <div class="company-stats-container">
            <span class="prefix">Started</span>
            <div class="time-breakdown">
              <div class="stat-group">
                <span class="value">${months}</span>
                <span class="label">m</span>
              </div>
              <div class="stat-group">
                <span class="value">${daysInCurrentMonth}</span>
                <span class="label">d</span>
              </div>
              <div class="stat-group">
                <span class="value">${hours}</span>
                <span class="label">h</span>
              </div>
              <div class="stat-group">
                <span class="value">${minutes}</span>
                <span class="label">m</span>
              </div>
              <div class="stat-group">
                <span class="value">${seconds}</span>
                <span class="label">s</span>
              </div>
            </div>
            <div class="total-days-container">
              <span class="total-days-label">Total:</span>
              <span class="total-days-value">${totalDays}</span>
              <span class="total-days-unit">days</span>
            </div>
          </div>
        `;
      }
    }
  });
}

// Update countdown immediately and then every second
document.addEventListener('DOMContentLoaded', function() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// Call this function when page loads and set interval to update more frequently
updateCompanyStats();
setInterval(updateCompanyStats, 1000); // Update every second to show running time 