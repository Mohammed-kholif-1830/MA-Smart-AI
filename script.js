const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  // أضف Loader مؤقت
  const loaderElement = addLoader();

  // استدعاء الـ backend
  const res = await fetch("backend.php", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{role: "user", content: message}]
    })
  });

  // احذف الـ Loader بعد الرد
  removeLoader(loaderElement);

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "حصل خطأ!";
  addMessage("ai", reply);
}

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  div.appendChild(bubble);
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// --------- Loader Functions ---------
function addLoader() {
  const div = document.createElement("div");
  div.className = "message ai loader-container";

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  // النقط المتحركة
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.innerHTML = "<span></span><span></span><span></span>";

  bubble.appendChild(loader);
  div.appendChild(bubble);
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;

  return div; // هنحتاجه عشان نحذفه بعدين
}

function removeLoader(loaderElement) {
  chatBox.removeChild(loaderElement);
}