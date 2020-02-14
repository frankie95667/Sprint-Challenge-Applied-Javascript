/* If You've gotten this far, you're on your own! Although we will give you some hints:
    1. You will need to write a function that creates the carousel component, you will find the HTML below.
    2. You will need to grab a reference to all of the images
    3. Create a current index
    4. Those buttons are gonna need some click handlers.
    5. Think of how you would animate this component. Make the cards slide in and out, or fade. It's up to you!
    6. Have fun!
*/

/* HTML:
  <div class="carousel">
    <div class="left-button"> < </div>
    <img src="./assets/carousel/mountains.jpeg" />
    <img src="./assets/carousel/computer.jpeg" />
    <img src="./assets/carousel/trees.jpeg" />
    <img src="./assets/carousel/turntable.jpeg" />
    <div class="right-button"> > </div>
  </div>
*/

currentIndex = 0;
const t1 = gsap.timeline();
const t2 = gsap.timeline();

function Carousel(){
  // declaring and stantiating  carousel variables
  const carousel = document.createElement('div'),
        leftBtn = document.createElement('div'),
        imgs = [
          document.createElement('img'),
          document.createElement('img'),
          document.createElement('img')
        ],
        rightBtn = document.createElement('div');

  // add classes to created elements
  carousel.classList.add('carousel');
  carousel.id = 'main-carousel';
  leftBtn.classList.add('left-button', 'carousel-control-next');
  rightBtn.classList.add('right-button', 'carousel-control-prev');

  // add textContent and attributes to created elements
  leftBtn.textContent = "<";
  rightBtn.textContent = ">";
  imgs[0].src = "./assets/carousel/mountains.jpeg";
  imgs[1].src = "./assets/carousel/computer.jpeg";
  imgs[2].src = "./assets/carousel/turntable.jpeg";

  // add class and style to first slide to indicate active
  imgs[currentIndex].classList.add('active');
  imgs[currentIndex].style.opacity = 1;
 

  // append elements to parent container
  carousel.appendChild(leftBtn);
  imgs.forEach(img => {
    carousel.appendChild(img);
  })
  carousel.appendChild(rightBtn);

  //Event Listeners
  leftBtn.addEventListener('click', e => {

    t1.to(imgs[Math.abs(currentIndex)], {
      duration: 1,
      autoAlpha: 0,
      onStart: function(){
        t1.killTweensOf(this);
      },
      onComplete: function(){
        const current = imgs[Math.abs(currentIndex)];
        current.classList.remove('active');
        t1.killTweensOf(this);
        t1.set(current, {
          autoAlpha: 0
        })
      }
    })

    let nextIndex = Math.abs(currentIndex - 1) % 3;
    t2.to(imgs[nextIndex], {
      duration: 1,
      autoAlpha: 1,
      onStart: function(){
        t2.killTweensOf(this);
        imgs[nextIndex].classList.add('active');
      },
      onComplete: function(){
        const current = imgs[nextIndex]
        t2.killTweensOf(this);
        t2.set(current, {
          autoAlpha: 1
        })
        currentIndex = (currentIndex - 1) % 3;
      }
    }) 
  })

  rightBtn.addEventListener('click', e => {

    t1.to(imgs[Math.abs(currentIndex)], {
      duration: 1,
      autoAlpha: 0,
      onStart: function(){
        t1.killTweensOf(this);
      },
      onComplete: function(){
        const current = imgs[Math.abs(currentIndex)];
        current.classList.remove('active');
        t1.killTweensOf(this);
        t1.set(current, {
          autoAlpha: 0
        })
      }
    })

    let nextIndex = Math.abs(currentIndex + 1) % 3;
    t2.to(imgs[nextIndex], {
      duration: 1,
      autoAlpha: 1,
      onStart: function(){
        t2.killTweensOf(this);
        imgs[nextIndex].classList.add('active');
      },
      onComplete: function(){
        const current = imgs[nextIndex]
        t2.killTweensOf(this);
        t2.set(current, {
          autoAlpha: 1
        })
        currentIndex = (currentIndex + 1) % 3;
      }
    }) 
  })
  
  return carousel;
}

const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.appendChild(Carousel());