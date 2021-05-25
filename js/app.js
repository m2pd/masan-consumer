$(document).ready(function () {
  // Create variables for our primary and secondary navigations
  const navPrimary = document.querySelector(".nav--primary");
  const navSecondary = document.querySelector(".nav--secondary");
  const stickyWrap = document.querySelector(".sticky-wrap");
  const contentWrap = document.querySelector('.content-wrap');


  // Get the size and position relative to the viewport of the primary nav
  let navPrimaryHeight = navPrimary.getBoundingClientRect().height;

  // Get the height of the secondary nav items
  let navSecondaryHeight = navSecondary.getBoundingClientRect().height;

  // Get the top position of the secondary nav items 
  let navSecondaryTop = navSecondary.getBoundingClientRect().top;

  // Get the whole hero section (.sticky-wrap) that wraps top nav, hero content and bottom nav, get it's bottom position and then take away the height of the secondary nav and add the number of pixels the doc has currently scrolled
  let navSecondaryOrigPos = stickyWrap.getBoundingClientRect().bottom - navSecondaryHeight + window.pageYOffset;

  // The function that ensures the nav shows if the user refreshes the page, scrolled past the hero section
  function stickyNavInit() {
    navSecondaryTop = navSecondary.getBoundingClientRect().top;

    // If the top position of the secondary navigation items are less than or equal to the primary navigation's height

    if (navSecondaryTop <= navPrimaryHeight) {
      // add the fixed class to the secondary nav
      navSecondary.classList.add("nav-fixed--secondary");

      // add the height to the secondary nav as top
      navSecondary.style.top = navPrimaryHeight + "px";


      //add padding top to the web body to prevent jumping
      // contentWrap.style.paddingTop = (navSecondaryTop + navPrimaryHeight) + "px";
      contentWrap.style.paddingTop = 50 + "px";

    }

    // If the window's scroll Y position and the height of the primary navigation are less than the whole hero section's bottom position

    if (window.scrollY + navPrimaryHeight < navSecondaryOrigPos) {

      // then remove the sticky class from secondary nav
      navSecondary.classList.remove("nav-fixed--secondary");


      // and remove the height of the navigation from the top
      navSecondary.removeAttribute("style");


      contentWrap.removeAttribute("style");

    }
  }


  // function that throttles the event listener (or any function you add)
  function throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
  }

  // On scroll, fire the function
  throttled(200, window.addEventListener("scroll", stickyNavInit));
});

