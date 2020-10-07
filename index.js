const vport = document.querySelector('.vport');

if (vport) {
	window.addEventListener(('resize'), () => {
		let output = window.innerWidth;
		console.log(output);
		console.log(vport);
		
		return vport.innerText = output;
	})
} else {
	console.log('No .vport classed element present, uncomment it in the HTML if you want to have a live output of the window.innerWidth');
}

// ----MOBILE MENU EXPAND
const toggleMenu = (hamburgerEl, menuEl) => {
	const hamburger = document.querySelector(hamburgerEl);
	const menu = document.querySelector(menuEl);

	if (hamburger && menu) {
		hamburger.addEventListener('click', () => {
			menu.classList.toggle('expanded');
			hamburger.classList.toggle('open');
		})
	}
}

toggleMenu('.hamburger', '.nav-menu');

// ----ACTIVE LINKS
// Let's try setting the active link on the page when you click the menu

const menuLinks = document.querySelectorAll('.navlink');

function handleActive() {
	menuLinks.forEach(link => link.classList.remove('active-link'));
	console.log(menuLinks)
	this.classList.add('active-link');

	const hamburger = document.querySelector('.hamburger');
	const menu = document.querySelector('.nav-menu');
	hamburger.classList.remove('open');
	menu.classList.remove('expanded');
}

menuLinks.forEach(link => link.addEventListener('click', handleActive));