const chat = document.getElementById("chat");
const input = document.getElementById("message");
const button = document.getElementById("send");

// ✅ Canlı backend adresin
const API_URL = "https://meseleney.onrender.com";

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = type;
    div.textContent = text;

    chat.appendChild(div);
    setTimeout(() => {
    chat.scrollTop = chat.scrollHeight;
}, 50);
}

async function sendMessage() {

    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");

    input.value = "";

    button.disabled = true;
    button.textContent = "...";

    try {

        const response = await fetch(`${API_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        if (!response.ok) {
            throw new Error("Sunucu hatası");
        }

        const data = await response.json();

        addMessage(data.reply, "bot");

    } catch (error) {

        console.error(error);

        addMessage(
            "Meseleney şu anda cevap veremiyor. Lütfen biraz sonra tekrar dene.",
            "bot"
        );
    }

    button.disabled = false;
    button.textContent = "Gönder";
    input.focus();
}

button.addEventListener("click", sendMessage);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

window.onload = () => {

    addMessage(
        "Hoş geldin. Ben Meseleney. Şimdilik bu zindanda yalnızca ikimiz varız.",
        "bot"
    );

    input.focus();
};