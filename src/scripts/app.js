let header = document.querySelector('header');
let navLinks = document.querySelectorAll('header nav a');
let dataMobileColor = document.querySelectorAll('[data-mobile-color]');
let dataColor = document.querySelectorAll('[data-color]');
let introCard = document.querySelector('section.intro .intro-card');
let intro = document.querySelector('section.intro');
let siteTitle = document.querySelector('section.hero h1');
let siteSubtitle = document.querySelector('section.hero h2');
let skillsBlocks = document.querySelectorAll('.skills-grid .columns .column .skills-grid-block');
let projectsBlocks = document.querySelectorAll('.projects-grid .columns .projects-grid-block');
let details = document.querySelector('.details');
let scrolled = false;
let headerHeight = 40;

(function () {
    if ( typeof NodeList.prototype.forEach === "function" ) return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
})();

function isMobile() {
  return /Mobi/.test(navigator.userAgent);
};

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return { top: Math.round(top), left: Math.round(left) };
};

function watchNav() {
  var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  if (isMobile()) {
    dataMobileColor.forEach(e => {
      let topDistance = getCoords(e).top;
      let prevColor = 'transparent';
      if ( (topDistance - headerHeight) < scrollTop ) {
        header.classList.remove('transparent', 'red', 'blue');
        header.classList.add(e.getAttribute('data-mobile-color'));
      }
    });
  } else {
    header.classList.remove('transparent', 'red', 'blue');
    dataColor.forEach(e => {
      let topDistance = getCoords(e).top;
      let prevColor = '#fff';
      if ( (topDistance - headerHeight) < scrollTop ) {
          navLinks.forEach(a => {
            a.style.color = e.getAttribute('data-color');
          });
          prevColor = e.getAttribute('data-color');
      } else {
        navLinks.forEach(a => {
          a.style.color = prevColor;
        });
      }
    });
  }
};

function watchIntroCard() {
  var targetHeight = introCard.offsetHeight;
  var distanceBetween = introCard.offsetHeight - intro.offsetHeight;
  var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
  var scrollPercentReverse = (100 - (100 * scrollPercent)) / 100;
  if (scrollPercent >= 0) {
    introCard.style.transform = `translateY(-${scrollPercent * 50}px)`;
    siteTitle.style.transform = `translateY(${scrollPercentReverse * 150}%)`;
    siteSubtitle.style.transform = `translateY(${scrollPercentReverse * 100}%)`;
  }
};

function watchSkillsBlocks() {
  skillsBlocks.forEach(e => {
    if (isInViewport(e)) {
      e.classList.add('in-viewport');
    }
  });
};

function watchProjectsBlocks() {
  projectsBlocks.forEach(e => {
    if (isInViewport(e)) {
      e.classList.add('in-viewport');
    }
  });
};

function isInViewport(element, offset = 1) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  let offsetHeight = rect.height * offset;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= ((window.innerHeight || html.clientHeight) + offsetHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
};

window.addEventListener('touchmove', function() {
  scrolled = true;
  watchIntroCard();
  details.height = window.innerHeight;
});

window.addEventListener('scroll', function() {
  scrolled = true;
  watchIntroCard();
  details.height = window.innerHeight;
});

setInterval(function() {
    if(scrolled) {
      scrolled = false;
      watchNav();
      watchSkillsBlocks();
      watchProjectsBlocks();
    }
}, 50);

window.addEventListener('resize', function() {
  debounce(watchNav(), 50);
  debounce(watchIntroCard(), 50);
  debounce(watchSkillsBlocks(), 20);
  debounce(watchProjectsBlocks(), 20);
});

navLinks.forEach(e => {
  e.addEventListener('click', () => {
    let ele = document.querySelector(e.getAttribute('data-scroll'));
    ele.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
});

window.onload = function() {
  imagesLoaded(document.body, () => {
    document.body.classList.add('loaded');
    watchNav();
    watchIntroCard();
    watchSkillsBlocks();
  });
};
