const categorySelect = document.getElementById('v1-select');
const tagSelect = document.getElementById('v2-select');
const album = document.getElementById('album');
const collection = sessionStorage.getItem('collection')
	? sessionStorage.getItem('collection').split(',')
	: [];

renderSessionAlbum(collection);
addImage(document.getElementById('main-img').getAttribute('src'));
categorySelect.onchange = async function () {
	const type = String(this.options[this.selectedIndex].parentNode.label).toLowerCase();
	const category = this.value;
	await getWaifuPic(type, category);
};

const sendFunction = async () => {
	const type = String(
		categorySelect.options[categorySelect.selectedIndex].parentNode.label
	).toLowerCase();
	const category = categorySelect.value;
	await getWaifuPic(type, category);
};
const sendFunctionv2 = async () => {
	await getWaifuPicV2(tagSelect.value);
};
tagSelect.addEventListener('change', function () {
	getWaifuPicV2(this.value);
});
document.getElementById('main').addEventListener('click', function (e) {
	const halfViewportWidth = window.innerWidth / 2;
	if (e.clientX <= halfViewportWidth) sendFunction();
	else sendFunctionv2();
});
async function getWaifuPic(type, category) {
	const response = (await fetch(`/api/pics/v1?type=${type}&category=${category}`)).json();
	response.then((res) => {
		const imageURL = res.url;
		renderImg(imageURL);
	});
}
async function getWaifuPicV2(tag) {
	const response = (await fetch(`/api/pics/v2?tag=${tag}`)).json();
	response.then((res) => {
		const imageURL = res.url;
		renderImg(imageURL);
	});
}

function renderImg(url) {
	const img = document.createElement('img');
	img.className = 'pic';
	img.loading = 'lazy';
	img.src = url;
	addImage(url);
	const main = document.getElementById('main');
	while (main.firstChild) main.removeChild(main.lastChild);
	main.appendChild(img);
}
function addImage(url) {
	if (!collection.includes(url)) {
		collection.push(url);
		const image = document.createElement('img');
		image.src = url;
		image.loading = 'lazy';
		image.className = 'album-img';
		image.onclick = function () {
			renderImg(this.src);
		};
		album.appendChild(image);
	}
}
function renderSessionAlbum(collection) {
	const album = document.getElementById('album');
	if (collection != null) {
		collection.forEach((url) => {
			addImage(url);
		});
	}
	function addImage(url) {
		const image = document.createElement('img');
		image.src = url;
		image.className = 'album-img';
		image.onclick = function () {
			renderImg(this.src);
		};
		album.appendChild(image);
	}
}
window.addEventListener('beforeunload', () => {
	sessionStorage.setItem('collection', collection);
});

const albumToggle = document.getElementById('toggle-album');
albumToggle.onclick = function () {
	console.log('palle');
	const toggle = !!album.hidden;
	album.hidden = !toggle;
};

const clearAlbumBtn = document.getElementById('clear-album');
clearAlbumBtn.onclick = function () {
	while (album.firstChild) album.removeChild(album.lastChild);
	sessionStorage.setItem('collection', []);
};
