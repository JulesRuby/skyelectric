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

	image.src = `./assets/images/SkyElectric-Lazy-Placeholder.jpg`;
	image.dataset.src = `https://skyelectric.ca/.netlify/images?url=https://lh3.googleusercontent.com/d/${data.id}&w=500&h=700`;

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

	focusImage.onload = () => {
		focusImage.classList.add('loaded');
	};

	const galleryFragment = new DocumentFragment();

	// metaData.forEach((entry, idx) => {
	// 	const frameNode = createFrameFromMetadata(entry, idx);
	// 	galleryFragment.appendChild(frameNode);
	// });

	metaData.forEach((entry, idx) =>
		galleryFragment.appendChild(createFrameFromMetadata(entry, idx))
	);

	const observerOptions = {
		root: null,
		rootMargin: '500px',
		threshold: 0.1,
	};

	const lazyObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.firstChild.src = entry.target.firstChild.dataset.src;
				lazyObserver.unobserve(entry.target);
			}
		});
	}, observerOptions);

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
