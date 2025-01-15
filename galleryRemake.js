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
		const image = new Image();
		image.classList.add('gallery-image');
		image.src = `./assets/images/gallery/skygallery-${index}.jpg`;
		overlay.classList.add('frame-overlay');
		button.classList.add('view');
		button.textContent = 'View';
		overlay.appendChild(button);
		frame.append(image, overlay);

		return frame;
	};

	const handleClick = e => {
		const imageSrc = e.currentTarget.querySelector('img').src;
		focusImage.src = imageSrc;
		boxOverlay.classList.add('open');
	};

	const closeOverlay = e => {
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
	const galleryMetaData = await fetchGalleryMetadata();

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () =>
			populateGallery(galleryMetaData)
		);
	} else {
		populateGallery(galleryMetaData);
	}
})();
