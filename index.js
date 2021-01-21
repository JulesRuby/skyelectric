// const vport = document.querySelector('.vport');

// if (vport) {
// 	window.addEventListener(('resize'), () => {
// 		let output = window.innerWidth;
// 		console.log(output);
// 		console.log(vport);

// 		return vport.innerText = output;
// 	})
// } else {
// 	console.log('No .vport classed element present, uncomment it in the HTML if you want to have a live output of the window.innerWidth');
// }

// ----MOBILE MENU EXPAND
const toggleMenu = (hamburgerEl, menuEl) => {
	const hamburger = document.querySelector(hamburgerEl);
	const menu = document.querySelector(menuEl);

	if (hamburger && menu) {
		hamburger.addEventListener('click', () => {
			menu.classList.toggle('expanded');
			hamburger.classList.toggle('open');
		});
	}
};

toggleMenu('.hamburger', '.nav-menu');

// ----ACTIVE LINKS
// Let's try setting the active link on the page when you click the menu

// So that was basically only good for baby stuff, fuck off, babies. Nobody wants you.

// const menuLinks = document.querySelectorAll('.navlink');

// function handleActive() {
// 	menuLinks.forEach(link => link.classList.remove('active-link'));
// 	console.log(menuLinks)
// 	this.classList.add('active-link');

// 	const hamburger = document.querySelector('.hamburger');
// 	const menu = document.querySelector('.nav-menu');
// 	hamburger.classList.remove('open');
// 	menu.classList.remove('expanded');
// }

// menuLinks.forEach(link => link.addEventListener('click', handleActive));

//  THE REEEEALLLLL ACTIVE NAV SHIZ YEYEYEYEYEE

// trying to decide if it's better to just store the navLinks in global scope, or retrive and shed them with a nuew function execution on each load? Look more into this, or if this level of optimization even matter for my piddly code.

// const navLinks = document.querySelectorAll('.navlink');
// console.log(navLinks);
const navLinks = document.querySelectorAll('.navlink');
const chooseActive = (navLinks) => {
	// get the current url pathway
	const currentPath = document.location.pathname;
	// remove active class from all links
	navLinks.forEach((link) => {
		link.classList.remove('active-link');
		if (link.pathname === currentPath) {
			link.classList.add('active-link');
		}
	});
};

chooseActive(navLinks);

// ----MOBILE NAV ONSCROLL WITHDRAW
// Select the nav elements to shift
const topBar = document.querySelector('.top-bar');
// const mobileMenu = document.querySelector('.navbar');
// const contactBar = document.querySelector('.contact-strip');
let lastScrollPosition = window.pageYOffset;
// create window scroll event listener4
const menuHide = () => {
	window.addEventListener('scroll', () => {
		const currentScrollPosition = window.pageYOffset;
		const scrollDistance = currentScrollPosition - lastScrollPosition;
		// console.log('current: ' + currentScrollPosition);
		// console.log('last: ' + lastScrollPosition);
		// console.log('difference: ' + scrollDistance);
		// console.log('difference: ' + parseFloat(scrollDistance));
		// deal with inertia scroll
		if (
			currentScrollPosition < 0 ||
			(scrollDistance < 200 && scrollDistance > -200)
		) {
			return;
		}

		if (scrollDistance >= 200) {
			topBar.classList.add('scroll-hide');
			// mobileMenu.classList.add('scroll-hide');
			// contactBar.classList.add('scroll-hide');
			lastScrollPosition = currentScrollPosition;
		}

		if (parseFloat(scrollDistance) <= -200) {
			// console.log('WHEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
			topBar.classList.remove('scroll-hide');
			// mobileMenu.classList.remove('scroll-hide');
			// contactBar.classList.remove('scroll-hide');
			lastScrollPosition = currentScrollPosition;
		}
	});
};

menuHide();

// const setPulls = elements => {
//   const elementList = document.querySelectorAll(elements);
//   // console.log(elementList);

//   elementList.forEach(element => {
//     const button = element.querySelector('.service-expand');
//     const pullDown = element.querySelector('.pulldown');
//     const pdText = element.querySelector('.p');
//     const pdUl = element.querySelector('.ul');

//     // button.addEventListener("click", handlePullDown(button, pullDown, pdText, pdUl));
//     button.addEventListener("click", () => {
//       //  The blur just prevents the button from maintaining focus when clicked. I only want focus to remain if it's being tabbed to.
//       button.blur();
//       button.classList.toggle('pull-open');
//       pullDown.classList.toggle('pull-open');
//       pdText.classList.toggle('pull-open');
//       pdUl.classList.toggle('pull-open');
//       })
//   })
// }

// setPulls('.service-container');
