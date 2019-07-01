const scrollMonitor = require('scrollmonitor');
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('header nav a');
const dataMobileColor = document.querySelectorAll('[data-mobile-color]');
const dataColor = document.querySelectorAll('[data-color]');
const introCard = document.querySelector('section.intro .intro-card');
const topScreen = document.querySelector('.top-screen');
const intro = document.querySelector('section.intro');
const skills = document.querySelector('section.skills');
const projects = document.querySelector('section.projects');
const contact = document.querySelector('section.contact');
const hero = document.querySelector('section.hero');
const siteTitle = document.querySelector('section.hero h1');
const siteSubtitle = document.querySelector('section.hero h2');
const skillsBlocks = document.querySelectorAll('.skills-grid .columns .column .skills-grid-block');
const projectsBlocks = document.querySelectorAll('.projects-grid .columns .projects-grid-block');
const details = document.querySelector('.details');
var scrolled = false;

const skillsWatcher = scrollMonitor.create(skills);
const projectsWatcher = scrollMonitor.create(projects, {top: 70, bottom: 50});
const introWatcher = scrollMonitor.create(intro, isMobile() ? {top: 40} : {top: 0, bottom: 500});
const contactWatcher = scrollMonitor.create(contact);

introWatcher.stateChange((e, f) => {
  if (
    (f.isInViewport && f.isAboveViewport && !f.isFullyInViewport) ||
    (f.isInViewport && f.isFullyInViewport)
  ) {
    if (isMobile()) {
      header.classList.remove('transparent', 'red', 'blue');
      header.classList.add('red');
    } else {
      header.classList.remove('transparent', 'red', 'blue');
      navLinks.forEach(a => {
        a.style.color = 'black';
      });
    }
  } else if (f.isBelowViewport && f.isInViewport && !f.isFullyInViewport) {
    if (isMobile()) {
      header.classList.remove('transparent', 'red', 'blue');
      header.classList.add('transparent');
    } else {
      header.classList.remove('transparent', 'red', 'blue');
      navLinks.forEach(a => {
        a.style.color = 'white';
      });
    }
  }
});

skillsWatcher.stateChange((e, f) => {
  if (
    (f.isInViewport && f.isAboveViewport && !f.isFullyInViewport) ||
    (f.isInViewport && f.isFullyInViewport)
  ) {
    if (isMobile()) {
      header.classList.remove('transparent', 'red', 'blue');
      header.classList.add('red');
    } else {
      header.classList.remove('transparent', 'red', 'blue');
      navLinks.forEach(a => {
        a.style.color = 'black';
      });
    }
  }
});

projectsWatcher.stateChange((e, f) => {
  if (
    (f.isInViewport && f.isAboveViewport && !f.isFullyInViewport) ||
    (f.isInViewport && f.isFullyInViewport)
  ) {
    if (isMobile()) {
      header.classList.remove('transparent', 'red', 'blue');
      header.classList.add('blue');
    } else {
      header.classList.remove('transparent', 'red', 'blue');
      navLinks.forEach(a => {
        a.style.color = 'white';
      });
    }
  } else if (f.isBelowViewport && f.isInViewport && !f.isFullyInViewport) {
    if (isMobile()) {
      header.classList.remove('transparent', 'red', 'blue');
      header.classList.add('red');
    } else {
      header.classList.remove('transparent', 'red', 'blue');
      navLinks.forEach(a => {
        a.style.color = 'black';
      });
    }
  }
});

contactWatcher.stateChange((e, f) => {
  if (
    (f.isInViewport && f.isAboveViewport && !f.isFullyInViewport) ||
    (f.isInViewport && f.isFullyInViewport)
  ) {
    if (isMobile()) {
      header.classList.remove('transparent', 'red', 'blue');
      header.classList.add('blue');
    } else {
      header.classList.remove('transparent', 'red', 'blue');
      navLinks.forEach(a => {
        a.style.color = 'black';
      });
    }
  } else if (f.isBelowViewport && f.isInViewport && !f.isFullyInViewport) {
    if (isMobile()) {
      header.classList.remove('transparent', 'red', 'blue');
      header.classList.add('blue');
    } else {
      header.classList.remove('transparent', 'red', 'blue');
      navLinks.forEach(a => {
        a.style.color = 'white';
      });
    }
  }
});


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

function watchIntroCard() {
  var targetHeight = introCard.offsetHeight;
  var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
  var scrollPercentReverse = (100 - (100 * scrollPercent)) / 100;
  if (scrollPercent >= 0) {
    introCard.style.transform = `translateY(-${scrollPercent * 50}px)`;
    siteTitle.style.transform = `translateY(${scrollPercentReverse * 150}%)`;
    siteSubtitle.style.transform = `translateY(${scrollPercentReverse * 100}%)`;
  }
};

function applyHeroParallax() {
  const targetHeight = hero.offsetHeight;
  const scrollPercent = (targetHeight - window.scrollY) / targetHeight;
  const scrollPercentReverse = (100 - (100 * scrollPercent)) / 100;
  hero.style.backgroundPosition = `0% ${scrollPercentReverse * 50}%`;
}

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

// window.addEventListener('scroll', function() {
//   scrolled = true;
//   watchIntroCard();
//   applyHeroParallax();
//   details.height = window.innerHeight;
// });

window.addEventListener('scroll', debounce(function() {
  scrolled = true;
  watchIntroCard();
  applyHeroParallax();
  details.height = window.innerHeight;
}), 50);


setInterval(function() {
  if (scrolled) {
    scrolled = false;
    watchSkillsBlocks();
    watchProjectsBlocks();
  }
}, 50);

window.addEventListener('resize', function() {
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
    if (/Mobi/.test(navigator.userAgent)) {
      hero.classList.add('mobile');
    }
    watchIntroCard();
    watchSkillsBlocks();
  });
};
