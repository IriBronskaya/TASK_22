/*
Задание 3.
Сверстайте кнопку, клик на которую будет выводить на экран следующие данные:
Размеры экрана пользователя (ширина и высота).
Координаты местонахождения пользователя. 
Если пользователь отказался дать доступ к местоположению 
или данная функция недоступна в бразуере, 
вывести вместо координат сообщение «Информация о местоположении недоступна». */

document.addEventListener('DOMContentLoaded', function () {
    const getSizeButton = document.getElementById('getSizeButton');
    const screenSize = document.getElementById('screenSize');
  
    // Функция для вывода размеров экрана
    function displayScreenSize() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      screenSize.textContent = `Ширина экрана: ${screenWidth}px, Высота экрана: ${screenHeight}px`;
    }
  
    // Обработчик клика на кнопку
    getSizeButton.addEventListener('click', displayScreenSize);
  });

///////////////////////////////////////////////////////////////////
const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.j-btn-test');

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
}

btn.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    status.textContent = 'Информация о местоположении недоступна';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});