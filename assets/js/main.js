if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/assets/js/sw.js").then(
      registration => {
        console.log(
          `Service worker registered with scope ${registration.scope}`,
        );
      },
      err => console.log(`Service worker registration failed: ${err}`),
    );
  });
}

function scrollIt(destination, duration = 200, easing = "linear", callback) {
  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return --t * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - --t * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + --t * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    },
  };

  const start = window.pageYOffset;
  const startTime =
    "now" in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  );
  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName("body")[0].clientHeight;
  const destinationOffset =
    typeof destination === "number" ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight
      ? documentHeight - windowHeight
      : destinationOffset,
  );

  if ("requestAnimationFrame" in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now =
      "now" in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, (now - startTime) / duration);
    const timeFunction = easings[easing](time);
    window.scroll(
      0,
      Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start),
    );

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

const headerHomeButton = document.querySelector("#header-home-button");
if (headerHomeButton) {
  headerHomeButton.addEventListener("click", () => {
    const header = document.querySelector("header");
    scrollIt(header.offsetTop + header.offsetHeight, 800, "easeInOutQuad", () =>
      console.log(`Just finished scrolling to ${window.pageYOffset}px`),
    );
    // soon(TM)
    //window.scrollTo({
    //  behavior: "smooth",
    //  left: 0,
    //  top: header.offsetTop + header.offsetHeight,
    //  duration: 1000,
    //});
  });
}
const aboutNextButton = document.querySelector("#about-next-button");
if (aboutNextButton) {
  aboutNextButton.addEventListener("click", () => {
    const projectsSection = document.querySelector("#section-projects");
    scrollIt(projectsSection.offsetTop, 800, "easeInOutQuad", () => {});
  });
}
const projectsNextButton = document.querySelector("#projects-next-button");
if (projectsNextButton) {
  projectsNextButton.addEventListener("click", () => {
    const hackathonsSection = document.querySelector("#section-hackathons");
    scrollIt(hackathonsSection.offsetTop, 800, "easeInOutQuad", () => {});
  });
}

const menuActiveClass = "menu-active";
const navButton = document.querySelector("#nav-button");

document.querySelector("#nav-button").addEventListener("click", () => {
  const main = document.querySelector("#main");
  main.classList.toggle(menuActiveClass);
  navButton.classList.toggle(menuActiveClass);
});

document.querySelector("#main").addEventListener("click", function() {
  const menuOpen = this.classList.contains(menuActiveClass);
  if (menuOpen) {
    this.classList.remove(menuActiveClass);
    navButton.classList.remove(menuActiveClass);
  }
});

// $(".container").click(function() {
//   $(".menu-button").removeClass("active");
//   $("body").removeClass("active");
// });
//
// $(".modal-close").click(function() {
//   $(this)
//     .parent()
//     .fadeOut();
// });
