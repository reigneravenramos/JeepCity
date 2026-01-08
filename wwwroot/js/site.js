// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

/*Cursor*/
let script = document.currentScript;

window.addEventListener("DOMContentLoaded", () => {
  let iDiv = document.createElement("div");
  iDiv.id = "cursor";
  if (script.getAttribute("difference") == "disable") {
    iDiv.className = "mscursor-cursor";
  } else {
    iDiv.className = "mscursor-cursor mscursor-difference";
  }
  document.getElementsByTagName("body")[0].appendChild(iDiv);
  iDiv.style.opacity = "0"; // Initialize hidden to prevent 0,0 snap

  let pauseAnimation = script.getAttribute("pause-animation");

  let innerDiv = document.createElement("div");

  if (script.getAttribute("color") !== null) {
    iDiv.style.backgroundColor = script.getAttribute("color");
  } else {
    if (script.getAttribute("difference") == "disable") {
      iDiv.style.backgroundColor = "black";
    } else {
      iDiv.style.backgroundColor = "white";
    }
  }

  if (pauseAnimation !== null && pauseAnimation == "disable") {
    if (script.getAttribute("circle-outline") == "disable") {
      innerDiv.className = "mscursor-circle";
    } else {
      innerDiv.className = "mscursor-circle new";
    }
  } else {
    if (script.getAttribute("circle-outline") == "disable") {
      innerDiv.className = "mscursor-circle mscursor-border-transform";
    } else {
      innerDiv.className = "mscursor-circle new mscursor-border-transform";
    }
  }

  iDiv.appendChild(innerDiv);

  let size = Number(script.getAttribute("size")) || 30;

  for (let i = 0; i < size; i++) {
    let innerDiv = document.createElement("div");
    if (pauseAnimation !== null && pauseAnimation == "disable") {
      innerDiv.className = "mscursor-circle";
    } else {
      innerDiv.className = "mscursor-circle mscursor-border-transform";
    }

    if (script.getAttribute("color") !== null) {
      innerDiv.style.backgroundColor = script.getAttribute("color");
    } else {
      if (script.getAttribute("difference") == "disable") {
        innerDiv.style.backgroundColor = "black";
      } else {
        innerDiv.style.backgroundColor = "white";
      }
    }
    iDiv.appendChild(innerDiv);
  }

  const coords = { x: 0, y: 0 };
  let timeout;
  const circles = document.querySelectorAll(".mscursor-circle");

  const cursor = document.querySelector(".mscursor-cursor");

  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    if (script.getAttribute("gradient") !== null) {
      let colors = script.getAttribute("gradient").split(",");
      circle.style.backgroundColor =
        colors[Math.floor((index * colors.length) / circles.length)];

      document.querySelector("div.new").border = `0.5px solid ${colors[0]}`;
    }
  });

  const addclass = (e) => {
    if (script.getAttribute("pause-animation") !== "disable") {
      document.body.classList.remove("mscursor-nocursor");
      if (script.getAttribute("circle-outline") !== "disable") {
        document
          .querySelector("div.new")
          .classList.remove("mscursor-scale-outline");
        document.querySelector("div.new").style.border = "";
      }
      document.querySelectorAll("div.mscursor-circle").forEach((element) => {
        element.classList.remove("mscursor-scale");
      });
    }
    coords.x = e.clientX;
    coords.y = e.clientY;
    iDiv.style.opacity = "1"; // Reveal on first move
  };

  window.addEventListener("mousemove", (e) => addclass(e));
  window.addEventListener("touchmove", (e) => addclass(e.touches[0]));

  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
      circle.style.left = x - 12 + "px";
      circle.style.top = y - 12 + "px";

      circle.style.scale = (circles.length - index) / circles.length;

      circle.x = x;
      circle.y = y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
  }

  animateCircles();

  if (script.getAttribute("cursor") == "disable") {
    document.body.classList.add("mscursor-nocursor");
  }

  // Hide custom cursor when leaving the window
  document.addEventListener("mouseenter", () => {
    iDiv.style.opacity = "1";
  });
  document.addEventListener("mouseleave", () => {
    iDiv.style.opacity = "0";
  });
});
