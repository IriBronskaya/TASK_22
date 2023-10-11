/*
Задание 5.
Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com/
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:
Добавить в чат механизм отправки гео-локации:
При клике на кнопку «Гео-локация» необходимо отправить данные серверу
и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. 
Сообщение, которое отправит обратно эхо-сервер, не выводить. */

const wsUri = "wss://echo-ws-service.herokuapp.com/";
const output = document.getElementById("chat");
const btnSend = document.querySelector('.j-btn-send');
const btnLocation = document.querySelector('.j-btn-location');

let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.textContent = message;
  output.appendChild(pre);
}

btnSend.addEventListener('click', () => {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value;
  writeToScreen("отправлено: " + message);
  websocket.send(message);
  messageInput.value = "";
});
/////////////////////

btnLocation.addEventListener('click', () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const locationLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}`;
      const linkElement = document.createElement('a');
      linkElement.href = locationLink;
      linkElement.target = '_blank';
      linkElement.textContent = 'Гео-локация';
      writeToScreen(linkElement);
    }, function() {
      writeToScreen("Невозможно получить ваше местоположение");
    });
  } else {
    writeToScreen("Гео-локация не поддерживается в вашем браузере.");
  }
});
