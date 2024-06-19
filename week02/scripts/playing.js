const marquee = document.getElementById('marquee');
  const marqueeText = document.getElementById('marquee-text');

  let marqueeSpeed = 1;  // Adjust this value for speed
  let marqueePosition = marquee.offsetWidth;

  function scrollMarquee() {
    marqueePosition -= marqueeSpeed;
    if (marqueePosition < -marqueeText.offsetWidth) {
      marqueePosition = marquee.offsetWidth;
    }
    marqueeText.style.transform = `translateX(${marqueePosition}px)`;
    requestAnimationFrame(scrollMarquee);
  }

  scrollMarquee();