const fetchGalleryMetadata = async () => {
	try {
		console.log('Fetching...');
		// const response = await fetch('./.netlify/functions/queryImages');
		const response = await fetch('/galleryMetaData.json', {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log('resolved');
		console.log(response);
		console.log(response.body);

		if (!response.ok) {
			throw new Error('Failed to fetch function');
		}

		const data = await response.json();
		console.log('data', data);

		return data;
	} catch (error) {
		console.error('Problem loading script', error);
	}
};

// const gallery = document.querySelector('.gallery');
// const boxOverlay = document.querySelector('.box-overlay');
// const focusImage = boxOverlay.querySelector('img');
// const closeButton = boxOverlay.querySelector('.close-button');

// const galleryLength = 29;

// TEST QUERY
// import handler from './netlify/functions/queryImages.js';
// const handler = async () => {
// 	const script = await fetch('./netlify/functions/queryImages.js');
// 	return script
// };
// console.log(handler());
// let script;

// (async () => {
// 	try {
// 		console.log('Fetching...');
// 		// const response = await fetch('./.netlify/functions/queryImages');
// 		const response = await fetch('/galleryMetaData.json', {
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		});

// 		console.log('resolved');
// 		console.log(response);
// 		console.log(response.body);

// 		if (!response.ok) {
// 			throw new Error('Failed to fetch function');
// 		}

// 		const imageArray = await response.json();
// 		console.log('imageArray', imageArray);

// 		script = imageArray;
// 	} catch (error) {
// 		console.error('Problem loading script', error);
// 	}
// })();
// const fetchGalleryMetadata = async () => {
// 	try {
// 		console.log('Fetching...');
// 		// const response = await fetch('./.netlify/functions/queryImages');
// 		const response = await fetch('/galleryMetaData.json', {
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		});

// 		console.log('resolved');
// 		console.log(response);
// 		console.log(response.body);

// 		if (!response.ok) {
// 			throw new Error('Failed to fetch function');
// 		}

// 		const data = await response.json();
// 		console.log('imageArray', imageArray);

// 		return data;
// 	} catch (error) {
// 		console.error('Problem loading script', error);
// 	}
// };

// async function queryImages() {
// 	const handler = await converted.handler();
// 	console.log(handler);

// 	try {
// 		const response = await handler();
// 		const images = await response.json();

// 		// if (images.length > 0) {
// 		// 	images.forEach(image => {
// 		// 		const img = document.createElement('img');
// 		// 		img.src = image.url;
// 		// 		img.alt = image.name;
// 		// 		galleryDiv.appendChild(img);
// 		// 	});
// 		// } else {
// 		// 	galleryDiv.innerHTML = '<p>No images found in the folder.</p>';
// 		// }

// 		console.log(images);
// 		console.log({ images });
// 	} catch (error) {
// 		console.error('Error fetching images:', error);
// 		// galleryDiv.innerHTML = '<p>Failed to load images.</p>';
// 	}
// }

// // Load images on page load
// queryImages();

const populateGallery = metaData => {
	const gallery = document.querySelector('.gallery');
	const boxOverlay = document.querySelector('.box-overlay');
	const focusImage = boxOverlay.querySelector('img');
	const closeButton = boxOverlay.querySelector('.close-button');

	const galleryLength = 29;

	focusImage.onload = () => {
		focusImage.classList.add('loaded');
	};

	const createElementSafe = index => {
		const frame = document.createElement('div');
		frame.classList.add('frame');
		// console.log({ frame });

		const image = new Image();
		image.classList.add('gallery-image');
		image.src = `./assets/images/gallery/skygallery-${index}.jpg`;
		// console.log({ image });

		const overlay = document.createElement('div');
		overlay.classList.add('frame-overlay');
		// console.log({ overlay });

		const button = document.createElement('button');
		button.classList.add('view');
		button.textContent = 'View';
		// console.log({ button });

		overlay.appendChild(button);
		frame.append(image, overlay);

		// console.log({ frame });

		return frame;
	};

	const handleClick = e => {
		const imageSrc = e.currentTarget.querySelector('img').src;
		focusImage.src = imageSrc;
		boxOverlay.classList.add('open');
	};

	const closeOverlay = e => {
		console.log('butts');
		// const regexp = /(^[\w\s?]box-overlay[\s?\w]+$)|(^close-button+$)/g;
		const regexp =
			/(^(?:\w*?\s+?)*?box-overlay(?:\s+?\w*?)*?)$|(^(?:\w*?\s+?)*?close-button(?:\s+?\w*?)*?)$/g;

		if (!e.target.classList.value.match(regexp)) {
			e.stopPropagation();
		} else {
			boxOverlay.classList.remove('open');
			focusImage.classList.remove('loaded');
			e.stopPropagation();
		}
	};

	const galleryFragment = new DocumentFragment();

	const testImageDrive = createElementSafe('test');
	console.log({ testImageDrive });

	// testImageDrive.firstChild.src =
	// 	'https://drive.google.com/thumbnail?id=1hl5QPxaLLIqBvjd5uc6IUCHwOAuSJozH&sz=s4000';
	// testImageDrive.firstChild.src =
	// 	'https://skyelectric.ca/.netlify/images?url=https://drive.google.com/thumbnail?id=1hl5QPxaLLIqBvjd5uc6IUCHwOAuSJozH&sz=s4000&w=700&h=700';
	testImageDrive.firstChild.src =
		'https://skyelectric.ca/.netlify/images?url=https://lh3.googleusercontent.com/d/1hl5QPxaLLIqBvjd5uc6IUCHwOAuSJozH&w=500&h=700';
	// https://mysitename.netlify.app/.netlify/images?url=https://my-images.com/owl.jpeg
	// https://skyelectric.ca/.netlify/images?url=https://lh3.googleusercontent.com/d/1LUyAPKMeiPC99iNDom26zu28KAlX3_sY&w=500&h=700'
	// 1LUyAPKMeiPC99iNDom26zu28KAlX3_sY

	metaData.forEach(entry => {
		const frame = document.createElement('div');
		frame.classList.add('frame');
		// console.log({ frame });

		const image = new Image();
		image.classList.add('gallery-image');
		image.src = `https://skyelectric.ca/.netlify/images?url=https://lh3.googleusercontent.com/d/${entry.id}&w=500&h=700`;
		// console.log({ image });

		const overlay = document.createElement('div');
		overlay.classList.add('frame-overlay');
		// console.log({ overlay });

		const button = document.createElement('button');
		button.classList.add('view');
		button.textContent = 'View';
		// console.log({ button });

		overlay.appendChild(button);
		frame.append(image, overlay);

		galleryFragment.appendChild(frame);
	});

	galleryFragment.appendChild(testImageDrive);

	for (let i = 1; i <= galleryLength; i++) {
		galleryFragment.appendChild(createElementSafe(i));
	}

	console.log({ galleryFragment });

	gallery.append(galleryFragment);

	const frames = document.querySelectorAll('.frame');

	frames.forEach(frame => frame.addEventListener('click', handleClick));

	boxOverlay.addEventListener('click', closeOverlay, true);
	closeButton.addEventListener('click', closeOverlay, true);
};

(async () => {
	// .then(metaData => {
	// 	if (document.readyState === 'loading') {
	// 		document.addEventListener(
	// 			'DOMContentLoaded',
	// 			populateGallery(metaData)
	// 		);
	// 	} else {
	// 		populateGallery(metaData);
	// 	}
	// })
	// .catch(err => {
	// 	console.error('WHADDAFUK', err);
	// });

	// galleryMetaData
	// 	.then(metaData => {
	// 		if (document.readyState === 'loading') {
	// 			document.addEventListener(
	// 				'DOMContentLoaded',
	// 				populateGallery(metaData)
	// 			);
	// 		} else {
	// 			populateGallery(metaData);
	// 		}
	// 	})
	// 	.catch(err => {
	// 		console.érror('WHADDAFUK', err);
	// 	});
	// console.log(
	// 	'Promise.resolved(galleryMetaData)',
	// 	Promise.resolved(galleryMetaData)
	// );
	// console.log('await galleryMetaData', await galleryMetaData);
	const galleryMetaData = await fetchGalleryMetadata();

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () =>
			populateGallery(galleryMetaData)
		);
	} else {
		populateGallery(galleryMetaData);
	}
})();
