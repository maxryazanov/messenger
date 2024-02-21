function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  if (message.trim() !== "") {
    const chatMessages = document.getElementById("chat-messages");
    const newMessage = document.createElement("div");

    newMessage.textContent = message;

    // Добавляем класс "my-message" к сообщению от себя
    newMessage.classList.add("my-message");

    chatMessages.appendChild(newMessage);

    // Отправляем сообщение через вебсокет
    socket.send(message);

    // Очищаем поле ввода
    messageInput.value = "";
  }
}

// Подключение к вебсокету
const socket = new WebSocket("ws://messenger-gamma-tawny.vercel.app/");

socket.onmessage = (event) => {
  const chatMessages = document.getElementById("chat-messages");
  const newMessage = document.createElement("div");

  // Преобразуем Blob в текст
  const blob = event.data;
  const reader = new FileReader();

  reader.onload = () => {
    newMessage.textContent = reader.result;

    // Добавляем класс "other-message" к сообщению от другого клиента
    newMessage.classList.add("other-message");

    chatMessages.appendChild(newMessage);
  };

  reader.readAsText(blob);
};



