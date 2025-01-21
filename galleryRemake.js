const fetchGalleryMetadata = async () => {
	try {
		const response = await fetch('/galleryMetaData.json', {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Failed to fetch function');
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error('Problem loading script', error);
	}
};

const createFrameFromMetadata = (data, idx) => {
	const frame = document.createElement('div');
	frame.classList.add('frame');
	// console.log({ frame });

	const image = new Image();
	image.classList.add('gallery-image');

	// TODO find a better way to go about this part, this is temporary
	image.src = `./assets/images/SkyElectric-Lazy-Placeholder.jpg`;
	image.dataset.src = `https://skyelectric.ca/.netlify/images?url=https://lh3.googleusercontent.com/d/${data.id}&w=500&h=700`;
	// if (idx > 3) {
	// 	image.src = `./assets/images/SkyElectric-Lazy-Placeholder.jpg`;
	// 	image.dataset.src = `https://skyelectric.ca/.netlify/images?url=https://lh3.googleusercontent.com/d/${data.id}&w=500&h=700`;
	// } else {
	// 	image.src = `https://skyelectric.ca/.netlify/images?url=https://lh3.googleusercontent.com/d/${data.id}&w=500&h=700`;
	// }
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

	// galleryFragment.appendChild(frame);
	return frame;
};

const handleClick = (e, focusImage, boxOverlay) => {
	const imageSrc = e.currentTarget.querySelector('img').src;
	focusImage.src = imageSrc;
	boxOverlay.classList.add('open');
};

const closeOverlay = (e, focusImage, boxOverlay) => {
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

const elementInViewport = el => {
	const elRection = el.getBoundingClientRect();
	// console.log(
	// 	`elRection.top ${elRection.top}\n
	// 	elRection.left ${elRection.left}\n
	// 	elRection.bottom ${elRection.bottom}\n
	// 	elRection.right ${elRection.right}\n
	// 	window.innerHeight ${window.innerHeight}\n
	// 	document.documentElement.clientHeight ${document.documentElement.clientHeight}\n
	// 	window.innerWidth ${window.innerWidth}\n
	// 	document.documentElement.clientWidth ${document.documentElement.clientWidth}\n\n\n
	// 	`
	// );
	console.log(
		elRection.top >= 0 &&
			elRection.left >= 0 &&
			elRection.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) &&
			elRection.right <=
				(window.innerWidth || document.documentElement.clientWidth)
	);
	return (
		elRection.top >= 0 &&
		elRection.left >= 0 &&
		elRection.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		elRection.right <=
			(window.innerWidth || document.documentElement.clientWidth)
	);
};

const populateGallery = metaData => {
	const gallery = document.querySelector('.gallery');
	const boxOverlay = document.querySelector('.box-overlay');
	const focusImage = boxOverlay.querySelector('img');
	const closeButton = boxOverlay.querySelector('.close-button');

	// const galleryLength = 29;

	focusImage.onload = () => {
		focusImage.classList.add('loaded');
	};

	// const createElementSafe = index => {
	// 	const frame = document.createElement('div');
	// 	const image = new Image();
	// 	const overlay = document.createElement('div');
	// 	const button = document.createElement('button');

	// 	frame.classList.add('frame');
	// 	image.classList.add('gallery-image');

	// 	image.dataset.src = `./assets/images/gallery/skygallery-${index}.jpg`;
	// 	image.src = `./assets/images/SkyElectric-Lazy-Placeholder.jpg`;
	// 	overlay.classList.add('frame-overlay');
	// 	button.classList.add('view');
	// 	button.textContent = 'View';
	// 	overlay.appendChild(button);
	// 	frame.append(image, overlay);

	// 	return frame;
	// };

	const galleryFragment = new DocumentFragment();

	metaData.forEach((entry, idx) => {
		const frameNode = createFrameFromMetadata(entry, idx);
		console.log(frameNode);
		elementInViewport(frameNode);

		galleryFragment.appendChild(createFrameFromMetadata(entry, idx));
	});

	const observerOptions = {
		root: null,
		rootMargin: '400px',
		threshold: 0.1,
	};

	const lazyObserver = new IntersectionObserver(entries => {
		console.log({ observerOptions });
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.firstChild.src = entry.target.firstChild.dataset.src;
				lazyObserver.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// galleryFragment.childNodes.forEach((node, idx) => {
	// 	if (idx > 3) {
	// 		lazyObserver.observe(node);
	// 	}
	// });
	// galleryFragment.childNodes.forEach(frame =>
	// 	frame.addEventListener('click', e => handleClick(e, focusImage, boxOverlay))
	// );
	console.log('gallery', gallery);

	gallery.append(galleryFragment);

	gallery.childNodes.forEach(frame => {
		console.log('node');
		frame.addEventListener('click', e =>
			handleClick(e, focusImage, boxOverlay)
		);
		elementInViewport(frame)
			? (frame.firstChild.src = frame.firstChild.dataset.src)
			: lazyObserver.observe(frame);
	});

	// const frames = document.querySelectorAll('.frame');
	// const frames = document.querySelectorAll('.frame');

	boxOverlay.addEventListener(
		'click',
		e => closeOverlay(e, focusImage, boxOverlay),
		true
	);
	closeButton.addEventListener(
		'click',
		e => closeOverlay(e, focusImage, boxOverlay),
		true
	);
};

(async () => {
	const galleryMetaData = await fetchGalleryMetadata();

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () =>
			populateGallery(galleryMetaData)
		);
	} else {
		populateGallery(galleryMetaData);
	}
})();
