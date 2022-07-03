const gallery = document.querySelector('.gallery');
const boxOverlay = document.querySelector('.box-overlay');
const focusImage = boxOverlay.querySelector('img');
const closeButton = boxOverlay.querySelector('.close-button');


// Create element with image with column and row arguments, and generating a random image number
// const createElement = ([c, r]) => {
// 	return `
// 		<div class="frame c${c} r${r}">
// 			<img src="./assets/images/gallery/skygallery-${randomNum(12)}.jpg">
// 			<div class="frame-overlay">
// 				<button> View </button>
// 			</div>
// 		</div>
// 	`;
// };
const createElement = ([c, r]) => {
	return `
		<div class="frame c${c} r${r}">
			<img src="./assets/images/gallery/skygallery-${c}.jpg">
			<div class="frame-overlay">
				<button> View </button>
			</div>
		</div>
	`;
};

// const createElement = index => {
// 	return `
// 		<div class="frame">
// 			<img src="./assets/images/gallery/skygallery-${index}.jpg">
// 			<div class="frame-overlay">
// 				<button> View </button>
// 			</div>
// 		</div>
// 	`;
// };

// random number function accepting an argument to limit the max range
const randomNum = upperLimit => {
	return Math.floor(Math.random() * upperLimit) + 1;
};

// handle the click event for any of the picture frames
//allows us to set the focusImage to the src of parent image frame on click
const handleClick = e => {
	const imageSrc = e.currentTarget.querySelector('img').src;
	focusImage.src = imageSrc;
	boxOverlay.classList.add('open');
};

const closeOverlay = () => {
	console.log('butts');
	boxOverlay.classList.remove('open');
};

// create an array of 50 arrays, which have two randomly generated numbers. These represent the aspect ratios of the gallery space
// const aspectRatioArray = Array.from({ length: 29 }, () => [
// 	randomNum(2),
// 	randomNum(2),
// ]).concat([
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// 	[1, 1],
// ]);
const aspectRatioArray = Array.from({ length: 29 }, () => [
	randomNum(1),
	randomNum(1),
]);

const testingMap = aspectRatioArray.map((el, index) => {
	el, index;
});

// console.log(aspectRatioArray);
console.log({ testingMap });

const someNumber = 29;

// create a variable map each set of numbers in aspectRatioArray, passed into the createElement function as the arguments
// this creates an array of the return elements
// then .join('') it to make the whole thing s a string
// const html = aspectRatioArray.map(createElement).join('');
const html = aspectRatioArray.map(createElement).join('');
console.log(html);

let stupidThing = [];

for (let i = 1; i < someNumber; i++) {
	stupidThing = stupidThing.map(createElement(i)).join('');
}

console.log(stupidThing);

// change the HTML of the .gallery element to the html variable
// gallery.innerHTML = html;
gallery.innerHTML = stupidThing;

const frames = document.querySelectorAll('.frame');

frames.forEach(frame => frame.addEventListener('click', handleClick));

closeButton.addEventListener('click', closeOverlay);
