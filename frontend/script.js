const chat = document.getElementById("chat");
const input = document.getElementById("message");
const button = document.getElementById("send");

function addMessage(text, type) {

    const div = document.createElement("div");

    div.className = type;

    div.textContent = text;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

}

async function sendMessage() {

    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");

    input.value = "";

    button.disabled = true;
    button.textContent = "...";

    try {

        const response = await fetch("http://127.0.0.1:8000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        addMessage(data.reply, "bot");

    } catch (err) {

        addMessage("Zindanın duvarları cevap vermedi...", "bot");

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