/*
Задание 4.
Сверстайте кнопку, по клику на которую будет отправляться запрос к Timezone API. 
В запросе нужно отправить координаты местоположения пользователя, полученные с помощью Geolocation API. 
В ответ на запрос придёт объект, из которого нужно вывести на экран следующую информацию:
временная зона, в которой находится пользователь: параметр timezone;
местные дата и время: параметр date_time_txt.
Строка запроса к API выглядит следующим образом:
https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=latitude&long=longitude.
Вместо latitude и longitude нужно подставить широту и долготу. */

const locationButton = document.getElementById('getLocationButton');
const timezoneButton = document.getElementById('getTimezoneButton');
const locationInfo = document.getElementById('locationInfo');
const timezoneInfo = document.getElementById('timezoneInfo');

function error() {
  locationInfo.textContent = 'Невозможно получить ваше местоположение';
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  locationInfo.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;

  timezoneButton.style.display = 'block';
}

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    locationInfo.textContent = 'Невозможно получить ваше местоположение';
  } else {
    locationInfo.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

timezoneButton.addEventListener('click', () => {
  const latitude = parseFloat(locationInfo.textContent.match(/Широта: ([-.\d]+) °/)[1]);
  const longitude = parseFloat(locationInfo.textContent.match(/Долгота: ([-.\d]+) °/)[1]);

  fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
    .then((response) => response.json())
    .then((data) => {
      const timezone = data.timezone;
      const localDateTime = data.date_time_txt;
      timezoneInfo.textContent = `Временная зона: ${timezone}, Местное время: ${localDateTime}`;
    })
    .catch((error) => {
      console.error('Ошибка:', error);
      timezoneInfo.textContent = 'Ошибка при получении информации о временной зоне';
    });
});