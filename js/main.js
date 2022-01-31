$(document).ready(function () { 


$(function () {
  $('.navbar-toggler').click(function () {
    $('.fa-bars').toggleClass('nav-hide');
    $('.fa-times').toggleClass('nav-hide');
    $('.navbar-toggler').toggleClass('show');
    $('.blue-menu').toggleClass('blue');
    $('.navbar').toggleClass('transparent-nav');
  });
});

//navbar znika po kliknięciu poza menu 
document.addEventListener("click", function(event) {
  if (event.target.closest(".navbar") && $('.navbar-toggler').hasClass('show') ) return
  $('.fa-bars').removeClass('nav-hide');
  $('.fa-times').addClass('nav-hide');
  $('.navbar-toggler').removeClass('show');
  $('.navbar-toggler').attr('aria-expanded','false');
  $('.navbar-toggler').addClass('collapsed');
  $('.blue-menu').removeClass('blue');
  $('.navbar').removeClass('transparent-nav');
  $('.navbar-collapse').removeClass('show');
});


var today = new Date().toISOString().split('T')[0];
document.getElementsByName("setTodaysDate")[0].setAttribute('min', today);

const createAppointment = (appointment) => {

  const appointmentMessage = document.querySelector('.appointment-message');

  fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(appointment)
  })
    .then(res => res.json())
    .then(resJSON => {
      console.log(resJSON);
      appointmentMessage.classList.add('send');
      appointmentMessage.innerText = `Dziękujemy ${resJSON.appointment.name}. Zostałeś zapisany!`;
    });
}

document.getElementById('service-form').addEventListener('submit', function (e) {
  e.preventDefault();

  document.getElementById("errors").innerHTML = "";

  // let fullName = document.getElementById('name');
  // let emailAdress = document.getElementById('email');
  let selectForm = document.getElementById('select-form');
  // let phoneNum = document.getElementById('phone-number');
  // let yourNotes = document.getElementById('Textarea1');
  let error = document.getElementById('errors');


// zapomniałem, że ma być jedna widomość a nie kilka więc początkowo powsało to

  // if (fullName.value.trim() === '') {
  //   let li = document.createElement('li');
  //   li.innerText = 'Wpisz imie i nazwisko';
  //   error.appendChild(li);
  // }

  // if (emailAdress.value.trim() === '') {
  //   let li = document.createElement('li');
  //   li.innerText = 'Wpisz e-mail';
  //   error.appendChild(li);
  // }


  // if (selectForm.value === 'SELECT SERVICE') {
  //   let li = document.createElement('li');
  //   li.innerText = 'Choose Service';
  //   error.appendChild(li);
  // }

  // if (phoneNum.value.trim() === '') {
  //   let li = document.createElement('li');
  //   li.innerText = 'Podaj nr. telefonu';
  //   error.appendChild(li);
  // }

  // if (yourNotes.value.trim() === '') {
  //   let li = document.createElement('li');
  //   li.innerText = 'Enter your notes';
  //   error.appendChild(li);
  // }
///////////////////////////////////////////////////////////////////////////////////////

  let formFields = document.getElementsByClassName('inputs');
  let allFields = false;
  let appointment = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    service: document.getElementById('select-form').value,
    phone: document.getElementById('phone-number').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    message: document.getElementById('Textarea1').value
  }


  for (let i = 0; i < formFields.length; i++) {
    if (formFields[i].value === '') {
      allFields = false;
      formFields[i].classList.add('error');
    } else if (selectForm.value === 'SELECT SERVICE') {
      allFields = false;
      selectForm.classList.add('error');
    }
    else {
      allFields = true;
      formFields[i].classList.remove('error');
    }
  }

  if (allFields) {
    createAppointment(appointment);
  } else {
    let li = document.createElement('li');
    li.innerText = 'podaj wymagane pola';
    error.appendChild(li);
  }



});

});