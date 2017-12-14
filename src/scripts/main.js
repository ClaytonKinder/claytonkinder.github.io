/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
    class Details {
        constructor() {
            this.DOM = {};

            const detailsTmpl = `
            <div class="details-bg details-bg-up"></div>
            <div class="details-bg details-bg-down"></div>
            <img class="details-img" src="" alt="img 01"/>
            <h2 class="details-title"></h2>
            <h3 class="details-links"></h3>
            <div class="details-techs"></div>
            <p class="details-description"></p>
            <button class="details-close"><i class="fas fa-times"></i></button>
            <button class="details-magnifier"><i class="fas fa-search-plus"></i></button>
            `;

            this.DOM.details = document.createElement('div');
            this.DOM.details.className = 'details';
            this.DOM.details.innerHTML = detailsTmpl;
            DOM.content.appendChild(this.DOM.details);
            this.init();
        }
        init() {
            this.DOM.magnifier = this.DOM.details.querySelector('.details-magnifier');
            this.DOM.bgUp = this.DOM.details.querySelector('.details-bg-up');
            this.DOM.bgDown = this.DOM.details.querySelector('.details-bg-down');
            this.DOM.img = this.DOM.details.querySelector('.details-img');
            this.DOM.title = this.DOM.details.querySelector('.details-title');
            this.DOM.links = this.DOM.details.querySelector('.details-links');
            this.DOM.techs = this.DOM.details.querySelector('.details-techs');
            this.DOM.description = this.DOM.details.querySelector('.details-description');
            this.DOM.close = this.DOM.details.querySelector('.details-close');

            this.initEvents();
        }
        initEvents() {
            this.DOM.close.addEventListener('click', () => this.isZoomed ? this.zoomOut() : this.close());
            this.DOM.magnifier.addEventListener('click', () => this.zoomIn());
        }
        fill(info) {
            this.DOM.img.src = info.img;
            this.DOM.title.innerHTML = info.title;
            this.DOM.links.innerHTML = info.links;
            this.DOM.techs.innerHTML = info.techs;
            this.DOM.description.innerHTML = info.description;
        }
        getProductDetailsRect() {
            return {
                productBgRect: this.DOM.projectBg.getBoundingClientRect(),
                detailsBgRect: this.DOM.bgDown.getBoundingClientRect(),
                productImgRect: this.DOM.projectImg.getBoundingClientRect(),
                detailsImgRect: this.DOM.img.getBoundingClientRect()
            };
        }
        open(data) {
            if ( this.isAnimating ) return false;
            this.isAnimating = true;

            this.DOM.details.classList.add('details-open');

            this.DOM.projectBg = data.productBg;
            this.DOM.projectImg = data.productImg;

            this.DOM.projectBg.style.opacity = 0;
            this.DOM.projectImg.style.opacity = 0;

            const rect = this.getProductDetailsRect();

            this.DOM.bgDown.style.transform = `translateX(${rect.productBgRect.left-rect.detailsBgRect.left}px) translateY(${rect.productBgRect.top-rect.detailsBgRect.top}px) scaleX(${rect.productBgRect.width/rect.detailsBgRect.width}) scaleY(${rect.productBgRect.height/rect.detailsBgRect.height})`;
            this.DOM.bgDown.style.opacity = 1;
            this.DOM.bgDown.style.background = '#F44336';

            this.DOM.img.style.transform = `translateX(${rect.productImgRect.left-rect.detailsImgRect.left}px) translateY(${rect.productImgRect.top-rect.detailsImgRect.top}px) scaleX(${rect.productImgRect.width/rect.detailsImgRect.width}) scaleY(${rect.productImgRect.height/rect.detailsImgRect.height})`;
            this.DOM.img.style.opacity = 1;

            anime({
                targets: [this.DOM.bgDown,this.DOM.img],
                duration: (target, index) => index ? 800 : 250,
                easing: (target, index) => index ? 'easeOutElastic' : 'easeOutSine',
                elasticity: 250,
                translateX: 0,
                translateY: 0,
                scaleX: 1,
                scaleY: 1,
                complete: () => this.isAnimating = false
            });

            anime({
                targets: [this.DOM.bgDown, this.DOM.img],
                duration: (target, index) => index ? 800 : 250,
                easing: (target, index) => index ? 'easeOutElastic' : 'easeOutSine',
                elasticity: 250,
                translateX: 0,
                translateY: 0,
                scaleX: 1,
                scaleY: 1,
                background: '#F44336',
                complete: () => this.isAnimating = false
            });

            anime({
                targets: [this.DOM.title, this.DOM.links, this.DOM.techs, this.DOM.description, this.DOM.magnifier],
                duration: 600,
                easing: 'easeOutExpo',
                delay: (target, index) => {
                    return index*60;
                },
                translateY: (target, index, total) => {
                    return index !== total - 1 ? [50,0] : 0;
                },
                scale:  (target, index, total) => {
                    return index === total - 1 ? [0,1] : 1;
                },
                opacity: 1
            });

            anime({
                targets: this.DOM.bgUp,
                duration: 100,
                easing: 'linear',
                opacity: 1
            });

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeOutSine',
                translateY: ['100%',0],
                opacity: 1
            });

            anime({
                targets: DOM.hamburger,
                duration: 250,
                easing: 'easeOutSine',
                translateY: [0,'-100%']
            });
        }
        close() {
            if ( this.isAnimating ) return false;
            this.isAnimating = true;
            document.body.classList.remove('details-open');
            this.DOM.details.classList.remove('details-open');

            anime({
                targets: DOM.hamburger,
                duration: 250,
                easing: 'easeOutSine',
                translateY: 0
            });

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeOutSine',
                translateY: '100%',
                opacity: 0
            });

            anime({
                targets: this.DOM.bgUp,
                duration: 100,
                easing: 'linear',
                opacity: 0
            });

            anime({
                targets: [this.DOM.title, this.DOM.links, this.DOM.techs, this.DOM.description],
                duration: 20,
                easing: 'linear',
                opacity: 0
            });

            const rect = this.getProductDetailsRect();
            anime({
                targets: [this.DOM.bgDown,this.DOM.img],
                duration: 250,
                easing: 'easeOutSine',
                translateX: (target, index) => {
                    return index ? rect.productImgRect.left-rect.detailsImgRect.left : rect.productBgRect.left-rect.detailsBgRect.left;
                },
                translateY: (target, index) => {
                    return index ? rect.productImgRect.top-rect.detailsImgRect.top : rect.productBgRect.top-rect.detailsBgRect.top;
                },
                scaleX: (target, index) => {
                    return index ? rect.productImgRect.width/rect.detailsImgRect.width : rect.productBgRect.width/rect.detailsBgRect.width;
                },
                scaleY: (target, index) => {
                    return index ? rect.productImgRect.height/rect.detailsImgRect.height : rect.productBgRect.height/rect.detailsBgRect.height;
                },
                background: '#2196F3',
                complete: () => {
                    this.DOM.bgDown.style.opacity = 0;
                    this.DOM.img.style.opacity = 0;
                    this.DOM.bgDown.style.transform = 'none';
                    this.DOM.img.style.transform = 'none';
                    this.DOM.projectBg.style.opacity = 1;
                    this.DOM.projectImg.style.opacity = 1;
                    this.isAnimating = false;
                }
            });
        }
        zoomIn() {
            this.isZoomed = true;

            anime({
                targets: [this.DOM.title, this.DOM.links, this.DOM.techs, this.DOM.description, this.DOM.magnifier],
                duration: 100,
                easing: 'easeOutSine',
                translateY: (target, index, total) => {
                    return index !== total - 1 ? [0, index === 0 || index === 1 ? -50 : 50] : 0;
                },
                scale:  (target, index, total) => {
                    return index === total - 1 ? [1,0] : 1;
                },
                opacity: 0
            });
            this.DOM.img.classList.add('zoomed');
            const imgrect = this.DOM.img.getBoundingClientRect();
            const win = {w: window.innerWidth, h: window.innerHeight};

            const imgAnimeOpts = {
                targets: this.DOM.img,
                duration: 250,
                easing: 'easeOutCubic',
                translateX: win.w/2 - (imgrect.left+imgrect.width/2),
                translateY: win.h/2 - (imgrect.top+imgrect.height/2)
            };
            anime(imgAnimeOpts);

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeInOutCubic',
                scale: 1.8,
                rotate: 180
            });
        }
        zoomOut() {
            this.isZoomed = false;

            anime({
                targets: [this.DOM.title, this.DOM.links,, this.DOM.techs, this.DOM.description, this.DOM.magnifier],
                duration: 250,
                easing: 'easeOutCubic',
                translateY: 0,
                scale: 1,
                opacity: 1
            });

            anime({
                targets: this.DOM.img,
                duration: 250,
                easing: 'easeOutCubic',
                translateX: 0,
                translateY: 0,
                scaleX: 1,
                scaleY: 1,
                rotate: 0,
                complete: () => this.DOM.img.style.transformOrigin = '0 0'
            });

            this.DOM.img.classList.remove('zoomed');

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeInOutCubic',
                scale: 1,
                rotate: 0
            });
        }
    };

    class Item {
		constructor(el) {
			this.DOM = {};
            this.DOM.el = el;
            this.DOM.project = this.DOM.el.querySelector('.project');
            this.DOM.projectBg = this.DOM.project.querySelector('.project-bg');
            this.DOM.projectImg = this.DOM.project.querySelector('.project-img');

            this.info = {
                img: this.DOM.projectImg.src,
                title: this.DOM.project.querySelector('.project-title').innerHTML,
                links: this.DOM.project.querySelector('.project-links').innerHTML,
                description: this.DOM.project.querySelector('.project-description').innerHTML,
                techs: this.DOM.project.querySelector('.project-techs').innerHTML
            };

			this.initEvents();
		}
        initEvents() {
            this.DOM.projectImg.addEventListener('click', () => {
              this.open();
            });
        }
        open() {
            document.body.classList.add('details-open');
            DOM.details.fill(this.info);
            DOM.details.open({
                productBg: this.DOM.projectBg,
                productImg: this.DOM.projectImg
            });
        }
    };

    const DOM = {};
    DOM.grid = document.querySelector('.projects-columns');
    DOM.content = DOM.grid.parentNode;
    DOM.gridItems = Array.from(DOM.grid.querySelectorAll('.projects-grid-block'));
    let items = [];
    DOM.gridItems.forEach(item => items.push(new Item(item)));
    DOM.details = new Details();
};
