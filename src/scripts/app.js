const header = document.querySelector('header');
const navLinks = document.querySelectorAll('header nav a');
const dataMobileColor = document.querySelectorAll('[data-mobile-color]');
const dataColor = document.querySelectorAll('[data-color]');
const introCard = document.querySelector('section.intro .intro-card');
const intro = document.querySelector('section.intro');
const skills = document.querySelector('section.skills');
const projects = document.querySelector('section.projects');
const siteTitle = document.querySelector('section.hero h1');
const siteSubtitle = document.querySelector('section.hero h2');
const skillsBlocks = document.querySelectorAll('.skills-grid .columns .column .skills-grid-block');
const projectsBlocks = document.querySelectorAll('.projects-grid .columns .projects-grid-block');
const details = document.querySelector('.details');
var scrolled = false;
var headerHeight = 40;

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
  return;
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
      if (
        scrollTop > topDistance &&
        scrollTop < topDistance + e.offsetHeight
      ) {
        navLinks.forEach(a => {
          a.style.color = e.getAttribute('data-color') || 'white';
        });
      }
    });
  }
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
  watchNav();
  details.height = window.innerHeight;
});

setInterval(function() {
  if(scrolled) {
    scrolled = false;
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

// var options = {
//   root: document.body,
//   rootMargin: '0px',
//   threshold: 1.0
// };

// var callback = (entries) => {
//   entries.forEach(entry => {
//     console.log(entry.isIntersecting, entry);
//     // if (entry.isIntersecting) {
//     //   let elem = entry.target;

//     //   if (entry.intersectionRatio >= 0.75) {
//     //     intersectionCounter++;
//     //   }
//     // }
//   });
// };

// var observer = new IntersectionObserver(callback);
// observer.observe(header);

const target = projects;

function buildThresholdList() {
  var thresholds = [];
  var numSteps = 20;

  for (var i=1.0; i<=numSteps; i++) {
    var ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

// const handleIntersect = entries => {
//   entries.forEach(entry => {
//     const currentY = entry.boundingClientRect.y;
//     const direction = currentY < previousY ? 'above' : 'below';
//     console.group(`INTERSECTION ${entry.target.classList}`);
//     console.log('entry', entry);
//     console.log('header getBoundingClientRect', header.getBoundingClientRect());
//     console.log('direction', direction);
//     console.groupEnd('INTERSECTION');
//     if (entry.target == intro) {
//       console.log(`Intro`, entry.isIntersecting ? 'Intersecting' : 'Not intersecting', direction);
//     } else if (entry.target == skills) {
//       console.log(`Skills`, entry.isIntersecting ? 'Intersecting' : 'Not intersecting', direction);
//     } else if (entry.target == projects) {
//       console.log(`Projects`, entry.isIntersecting ? 'Intersecting' : 'Not intersecting', direction);
//     }
//     previousY = currentY;
//   });
// };

let previousY = 1000;

const handleIntersect = entries => {
  entries.forEach(entry => {
    const currentY = window.scrollY;
    const direction = currentY < previousY ? 'up' : 'down';
    console.log('DIRECTION', direction);
    if (entry.target.classList.contains('skills')) {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = 'black';
        });
        console.log('Skills - text should be black');
      } else if (direction === 'up') {
        navLinks.forEach(a => {
          a.style.color = 'white';
        });
        console.log('Skills 2 - text should be white');
      }
    } else if (entry.target.classList.contains('intro')) {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = 'white';
        });
        console.log('Intro 1 - text should be white');
      } else if (direction === 'up') {
        navLinks.forEach(a => {
          a.style.color = 'white';
        });
        console.log('Intro 2 - text should be white');
      }
    } else if (entry.target.classList.contains('projects')) {
      if (entry.isIntersecting) {
        console.log('Projects 1 - text should be white');
        navLinks.forEach(a => {
          a.style.color = 'white';
        });
      } else if (direction === 'up') {
        console.log('Projects 2 - text should be black');
        navLinks.forEach(a => {
          a.style.color = 'black';
        });
      }
    } else if (entry.target.classList.contains('contact')) {
      if (entry.isIntersecting) {
        console.log('Contact 1 - text should be black');
        navLinks.forEach(a => {
          a.style.color = 'black';
        });
      } else if (direction === 'up') {
        console.log('Contact 2 - text should be white');
        navLinks.forEach(a => {
          a.style.color = 'white';
        });
      }
    }
    previousY = currentY;
  });
};

const observer = new IntersectionObserver(handleIntersect, {
  threshold: [0]
});

observer.observe(document.querySelector('.intersect.intro'));
observer.observe(document.querySelector('.intersect.skills'));
observer.observe(document.querySelector('.intersect.projects'));
observer.observe(document.querySelector('.intersect.contact'));

window.onload = function() {
  imagesLoaded(document.body, () => {
    document.body.classList.add('loaded');
    watchNav();
    watchIntroCard();
    watchSkillsBlocks();
  });
};
