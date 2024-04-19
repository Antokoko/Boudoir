
'use strict';



// add Event on multiple elment

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



// PRELOADING

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.remove("active");
});





/**
 * TEXT ANIMATION EFFECT FOR HERO SECTION
 */

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {

  // loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay
    let letterAnimationDelay = 1;

    // get all character from the current letter box
    const letters = letterBoxes[i].textContent.trim();
    // remove all character from the current letter box
    letterBoxes[i].textContent = "";

    // loop through all letters
    for (let j = 0; j < letters.length; j++) {

      // create a span
      const span = document.createElement("span");

      // set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;

      // set the "in" class on the span, if current letter box is active
      // otherwise class is "out"
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      // pass current letter into span
      span.textContent = letters[j];

      // add space class on span, when current letter contain space
      if (letters[j] === " ") span.classList.add("space");

      // pass the span on current letter box
      letterBoxes[i].appendChild(span);

      // skip letterAnimationDelay when loop is in the last index
      if (j >= letters.length - 1) break;
      // otherwise update
      letterAnimationDelay += 0.05;

    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    // add active class on last active letter box
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }

  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    // update activeLetterBoxIndex based on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;

    setLetterEffect();
  }, (totalLetterBoxDelay * 1000) + 3000);

}

// call the letter effect function after window loaded
window.addEventListener("load", setLetterEffect);



/**
 * BACK TO TOP BUTTON
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  // visible back top btn when scrolled 5% of the page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }

  
});




/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", scrollReveal);

scrollReveal();


/** CUSTOM CURSOR */

const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

// change cursorElement position based on cursor move
document.body.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

// add cursor hoverd class
const hoverActive = function () { cursor.classList.add("hovered"); }

// remove cursor hovered class
const hoverDeactive = function () { cursor.classList.remove("hovered"); }

// add hover effect on cursor, when hover on any button or hyperlink
addEventOnElements(anchorElements, "mouseover", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mouseover", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);

// add disabled class on cursorElement, when mouse out of body
document.body.addEventListener("mouseout", function () {
  cursor.classList.add("disabled");
});

// remove diabled class on cursorElement, when mouse in the body
document.body.addEventListener("mouseover", function () {
  cursor.classList.remove("disabled");
});






/** MENU OVERLAY */


document.addEventListener("DOMContentLoaded", function(){
  const toggleButton = document.querySelector(".burguerbtn");
  const overlaynuevo = document.querySelector(".overlaynuevo");
  const overlaymenu2 = document.querySelector(".overlaymenu2");
  const menuitem1 = document.querySelectorAll(".menuitem1");

  let isOpen = false;

  gsap.set(".menuitem1 p", { y: 225 });

  const timeline = gsap.timeline({ paused: true });

  timeline.to(".overlaynuevo", {
    duration: 1.5,
    clipPath: "Polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power4.inOut"
  });

  timeline.to(".menuitem1 p", {
    duration: 1.5,
    y: 0,
    stagger: 0.2,
    ease: "power4.out"
  }, "-=1");

  timeline.to(".subnav", {
    buttom: "10%",
    opacity: 1,
    duration: 0.5,
    delay: 0.5
  }, "<");

  toggleButton.addEventListener("click", function() {
    if (isOpen) {
      timeline.reverse();
      overlaynuevo.classList.remove('active');
      overlaymenu2.classList.remove('active');
      menuitem1.forEach(item => item.classList.remove('active'));
    } else {
      timeline.play();
      overlaynuevo.classList.add('active');
      overlaymenu2.classList.add('active');
      menuitem1.forEach(item => item.classList.add('active'));
    }
    isOpen = !isOpen;
  })
});



/** PORTFOLIO PAGE FOR MOBILE CODE*/

// document.addEventListener("DOMContentLoaded", function() {
//   let target = 0;
//   let current = 0;
//   let ease = 0.075;

//   const slider = document.querySelector(".slider");
//   const sliderWrapper = document.querySelector(".slider-wrapper");
//   const slides = document.querySelectorAll(".slide");

//   let maxScroll = sliderWrapper ? sliderWrapper.offsetWidth - window.innerWidth : 0;

//   function lerp(start, end, factor) {
//       return start + (end - start) * factor;
//   }

//   function updateScaleAndPosition() {
//       slides.forEach((slide) => {
//           const rect = slide.getBoundingClientRect();
//           const centerPosition = (rect.left + rect.right) / 2;
//           const distanceFromCenter = centerPosition - window.innerWidth / 2;

//           let scale, offsetX;
//           if (distanceFromCenter > 0) {
//               scale = Math.min(1.75, 1 + distanceFromCenter / window.innerWidth);
//               offsetX = (scale - 1) * 300;
//           } else {
//               scale = Math.max(
//                   0.5,
//                   1 - Math.abs(distanceFromCenter) / window.innerWidth
//               );
//               offsetX = 0;
//           }
//           gsap.set(slide, { scale: scale, x: offsetX });
//       });
//   }

//   function update() {
//       current = lerp(current, target, ease);

//       if (sliderWrapper) {
//           gsap.set(sliderWrapper, {
//               x: -current,
//           });

//           updateScaleAndPosition();
//       }

//       requestAnimationFrame(update);
//   }

//   window.addEventListener("resize", () => {
//       maxScroll = sliderWrapper ? sliderWrapper.offsetWidth - window.innerWidth : 0;
//   });

//   window.addEventListener("wheel", (e) => {
//       // Ajustar la velocidad según la intensidad de la rueda girada
//       target += e.deltaY; // Puedes ajustar este factor según tus necesidades
//       target = Math.max(0, target);
//       target = Math.min(maxScroll, target);
//   });

//   // Controlador de eventos táctiles para dispositivos móviles
//   let touchStartX = 0;
//   let touchMoveX = 0;

//   slider.addEventListener("touchstart", (e) => {
//       touchStartX = e.touches[0].clientX;
//   });

//   slider.addEventListener("touchmove", (e) => {
//       touchMoveX = e.touches[0].clientX;
//   });

//   slider.addEventListener("touchend", () => {
//       const touchDeltaX = touchMoveX - touchStartX;
//       target += touchDeltaX * 2; // Puedes ajustar este factor según tus necesidades
//       target = Math.max(0, target);
//       target = Math.min(maxScroll, target);
//   });

//   // Controlador de eventos de rueda para escritorio
//   window.addEventListener("wheel", (e) => {
//       target += e.deltaY; // Puedes ajustar este factor según tus necesidades
//       target = Math.max(0, target);
//       target = Math.min(maxScroll, target);
//   });

//   update(); // Llama a la función update() para iniciar la animación
// });


document.addEventListener("DOMContentLoaded", function() {
  let target = 0;
  let current = 0;
  let ease = 0.075;
  const slider = document.querySelector(".slider");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  let maxScroll = sliderWrapper ? sliderWrapper.offsetHeight - window.innerHeight : 0;

  function lerp(start, end, factor) {
      return start + (end - start) * factor;
  }

  function updateScaleAndPosition() {
    slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        let centerPosition, distanceFromCenter, scale, offset;

        if (isMobileDevice()) {
            centerPosition = (rect.top + rect.bottom) / 2;
            distanceFromCenter = centerPosition - window.innerHeight / 2;
            scale = distanceFromCenter > 0 ? Math.min(1.75, 1 + distanceFromCenter / window.innerHeight) : Math.max(0.5, 1 - Math.abs(distanceFromCenter) / window.innerHeight);
            offset = (scale - 1) * 300;
            gsap.set(slide, { scale: scale, y: offset });
        } else {
            centerPosition = (rect.left + rect.right) / 2;
            distanceFromCenter = centerPosition - window.innerWidth / 2;
            scale = distanceFromCenter > 0 ? Math.min(1.75, 1 + distanceFromCenter / window.innerWidth) : Math.max(0.5, 1 - Math.abs(distanceFromCenter) / window.innerWidth);
            offset = (scale - 1) * 300;
            gsap.set(slide, { scale: scale, x: offset });
        }
    });
}

  function update() {
      current = lerp(current, target, ease);

      if (sliderWrapper) {
          gsap.set(sliderWrapper, {
              y: -current,
          });

          updateScaleAndPosition();
      }

      requestAnimationFrame(update);
  }

  window.addEventListener("resize", () => {
      maxScroll = sliderWrapper ? sliderWrapper.offsetHeight - window.innerHeight : 0;
  });

  // Controlador de eventos táctiles para dispositivos móviles
  let touchStartY = 0;
  let touchMoveY = 0;

  slider.addEventListener("touchstart", (e) => {
      touchStartY = e.touches[0].clientY;
  });

  slider.addEventListener("touchmove", (e) => {
      touchMoveY = e.touches[0].clientY;
  });

  slider.addEventListener("touchend", () => {
      const touchDeltaY = touchMoveY - touchStartY;
      target += touchDeltaY * 2;
      target = Math.max(0, target);
      target = Math.min(maxScroll, target);
  });

  // Controlador de eventos de rueda para escritorio
  window.addEventListener("wheel", (e) => {
      target += e.deltaY; // Puedes ajustar este factor según tus necesidades
      target = Math.max(0, target);
      target = Math.min(maxScroll, target);
  });

  // Función para verificar si el dispositivo es móvil
  function isMobileDevice() {
      return window.matchMedia("(max-width: 767px)").matches;
  }

  // Si es un dispositivo móvil, aplicamos los estilos verticales
  if (isMobileDevice()) {
      // Estilos para el slider y las diapositivas en dispositivos móviles
      slider.style.width = "100%";
      slider.style.height = "auto";
      slider.style.overflowY = "auto";
      slider.style.marginTop = "40px";

      sliderWrapper.style.width = "100%";
      sliderWrapper.style.height = "auto";
      sliderWrapper.style.padding = "0";
      sliderWrapper.style.display = "flex";
      sliderWrapper.style.flexDirection = "column";
      sliderWrapper.style.alignItems = "center";
      slides.forEach((slide) => {
          slide.style.width = "auto";
          slide.style.height = "auto";
          slide.style.background = "none";
          slide.style.marginBottom = "20px";
      });
  }

  update(); // Llama a la función update() para iniciar la animación
});







document.addEventListener("DOMContentLoaded", function() {
  let target = 0;
  let current = 0;
  let ease = 0.075;
  const slider = document.querySelector(".slider");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  let maxScroll = sliderWrapper ? sliderWrapper.offsetWidth - window.innerWidth : 0;

  function lerp(start, end, factor) {
      return start + (end - start) * factor;
  }


  function updateScaleAndPosition() {
    slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();

        let scale, offsetX, offsetY;

        if (isMobileDevice()) {
            const centerPosition = (rect.top + rect.bottom) / 2;
            const distanceFromCenter = centerPosition - window.innerHeight / 2;
            scale = distanceFromCenter > 0 ? Math.min(1.75, 1 + distanceFromCenter / window.innerHeight) : Math.max(0.5, 1 - Math.abs(distanceFromCenter) / window.innerHeight);
            offsetY = (scale - 1) * 300;
            gsap.set(slide, { scale: scale, y: offsetY });
        } else {
            const centerPosition = (rect.left + rect.right) / 2;
            const distanceFromCenter = centerPosition - window.innerWidth / 2;
            scale = distanceFromCenter > 0 ? Math.min(1.75, 1 + distanceFromCenter / window.innerWidth) : Math.max(0.5, 1 - Math.abs(distanceFromCenter) / window.innerWidth);
            offsetX = (scale - 1) * 300;
            gsap.set(slide, { scale: scale, x: offsetX });
        }
    });
}

  function update() {
      current = lerp(current, target, ease);

      if (sliderWrapper) {
          gsap.set(sliderWrapper, {
              x: -current,
          });

          updateScaleAndPosition();
      }

      requestAnimationFrame(update);
  }

  window.addEventListener("resize", () => {
      maxScroll = sliderWrapper ? sliderWrapper.offsetWidth - window.innerWidth : 0;
  });

  // Controlador de eventos de rueda para escritorio
  window.addEventListener("wheel", (e) => {
      target += e.deltaY; // Puedes ajustar este factor según tus necesidades
      target = Math.max(0, target);
      target = Math.min(maxScroll, target);
  });

  // Función para verificar si el dispositivo es móvil
  function isMobileDevice() {
      return window.matchMedia("(max-width: 767px)").matches;
  }

  // Si es un dispositivo móvil, aplicamos los estilos verticales
  if (isMobileDevice()) {
      // Estilos para el slider y las diapositivas en dispositivos móviles
      slider.style.width = "100%";
      slider.style.height = "auto";
      slider.style.overflowY = "auto";
      sliderWrapper.style.width = "100%";
      sliderWrapper.style.height = "auto";
      sliderWrapper.style.padding = "0";
      sliderWrapper.style.display = "flex";
      sliderWrapper.style.flexDirection = "column";
      sliderWrapper.style.alignItems = "center";
      slides.forEach((slide) => {
          slide.style.width = "auto";
          slide.style.height = "auto";
          slide.style.background = "none";
          slide.style.marginBottom = "20px";
      });
  }

  update(); // Llama a la función update() para iniciar la animación
});





// Locomotive Scroll  MAIN STUDIO 
function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    smoothMobile: true
  });


  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
        

    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();

  // Observa los cambios de tamaño en el contenedor específico
  new ResizeObserver(() => locoScroll.update()).observe(document.querySelector("#main"));

  // Scroll reveal integrado con Locomotive Scroll
  locoScroll.on("scroll", () => {
    scrollReveal();
  });
}

locomotiveAnimation();

function videoconAnimation() {
  var videocon = document.querySelector("#video-container");
  var playbtn = document.querySelector("#play");
  videocon.addEventListener("mouseenter", function () {
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
    });
  });
  videocon.addEventListener("mouseleave", function () {
    gsap.to(playbtn, {
      scale: 0,
      opacity: 0,
    });
  });
  document.addEventListener("mousemove", function (dets) {
    gsap.to(playbtn, {
      left: dets.x - 70,
      top: dets.y - 80,
    });
  });
}
videoconAnimation();

function loadinganimation() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    stagger: 0.3,
  });
  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.3,
    duration: 0.5,
  });
}
loadinganimation();


// let locoScroll;
// locoScroll = new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
//   smooth: true,
// });
// new ResizeObserver(() => locoScroll.update()).observe(
//   document.querySelector("[data-scroll-container]")
// );



// CONTACT FORM
var formContainer = $('#form-container');
 
bindFormClick();
//Opening the form
function bindFormClick(){
  $(formContainer).on('click', function(e) {
    e.preventDefault();
    toggleForm();
    //Ensure container doesn't togleForm when open
    $(this).off();
  });
}
 
//Closing the form
$('#form-close, .form-overlay').click(function(e) {
  e.stopPropagation();
  e.preventDefault();
  toggleForm();
  bindFormClick();
});
 
function toggleForm(){
  $(formContainer).toggleClass('expand');
  $(formContainer).children().toggleClass('expand');
  $('body').toggleClass('show-form-overlay');
  $('.form-submitted').removeClass('form-submitted');
}
 
//Form validation
$('form').submit(function() {
  var form = $(this);
  form.find('.form-error').removeClass('form-error');
  var formError = false;
  
  form.find('.input').each(function() {
    if ($(this).val() == '') {
      $(this).addClass('form-error');
      $(this).select();
      formError = true;
      return false;
    }
    else if ($(this).hasClass('email') && !isValidEmail($(this).val())) {
      $(this).addClass('form-error');
      $(this).select();
      formError = true;
      return false;
    }
  });
  
  if (!formError) {
    $('body').addClass('form-submitted');
    $('#form-head').addClass('form-submitted'); 
    setTimeout(function(){
      $(form).trigger("reset");
    }, 1000);
  }
  return false;
});
 
function isValidEmail(email) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(email);
};



function sendMail() {
  let params = {
    name: document.querySelector(".name").value,
    email: document.querySelector(".email").value,
    subject: document.querySelector(".select").value,
    message: document.querySelector(".message").value,
  };

  emailjs.send("service_ak1cx16", "template_07h3h1q", params)
    .then(function(response) {
      console.log("Correo enviado con éxito:", response);
      
    }, function(error) {
      console.log("Error al enviar el correo:", error);
      alert("¡Hubo un error al enviar el correo!");
    });
}
