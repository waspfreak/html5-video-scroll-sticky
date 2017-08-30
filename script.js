
const scroll = document.getElementById('video');
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


//build out functions
function togglePlay(){
	const method = video[video.paused ? 'play' : 'pause']();
	// if (video.paused) {
	// 	video.play();
	// }else{
	// 	video.pause();
	// }
}

function updateButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	//console.log('update button');
	toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
 //console.log(this.dataset.skip);
}

function handleRangeUpdate(){
	video[this.name] = this.value;
	//console.log(this.value);
	//console.log(this.name);
}

function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
//scrub in the progress bar front or back
const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
video.currentTime = scrubTime;
//console.log(e)	
}

function scrollPage(){
	let SuperScroll = window.pageYOffset;
	//console.log(SuperScroll);
	if (SuperScroll > 500) {
		//console.log('+++++++WORKS+++++++');
		scroll.classList.add('is-scroll');
	}
	if (SuperScroll < 500) {
		//console.log('+++++++WORKS+++++++');
		scroll.classList.remove('is-scroll');
	}
	

	
}
//hook up the event listeners;
window.addEventListener('scroll', scrollPage );

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedow', () => mousedow = true);
progress.addEventListener('mouseup', () => mousedow = false);