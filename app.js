async function checkCode() {
    const code = document.getElementById('codeInput').value.trim();
    const resultDiv = document.getElementById('result');
    const copyBtn = document.getElementById('copyBtn');

    // Fetch codes from GitHub JSON
    try {
        const response = await fetch('https://raw.githubusercontent.com/nawsomey/redirect/main/codes.json');
        const data = await response.json();

        if (data[code]) {
            const link = data[code];
            document.getElementById('codeInput').value = link;
            resultDiv.innerHTML = "✅ Link generated successfully!";
            copyBtn.style.display = 'inline-block';
            showNotification("✅ Valid code! Link generated.", "success");
        } else {
            resultDiv.innerHTML = "❌ Invalid code. Try again.";
            copyBtn.style.display = 'none';
            showNotification("❌ Invalid code. Please try again.", "error");
        }
    } catch (error) {
        resultDiv.innerHTML = "⚠️ Error fetching codes. Please try again later.";
        showNotification("⚠️ Error fetching codes. Try again later.", "error");
    }
}

function copyLink() {
    const link = document.getElementById('codeInput').value;
    navigator.clipboard.writeText(link).then(() => {
        showNotification("🔗 Link copied to clipboard!", "success");
    }).catch(err => {
        console.error("Error copying link:", err);
    });
}

// Show notifications
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.innerHTML = message;
    notification.className = type;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}
