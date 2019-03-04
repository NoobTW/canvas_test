var $ = function(selector) { return document.querySelector(selector); }

function escapeHtml(unsafe) {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

$('#canvas').width = $('#canvas').offsetWidth;
$('#canvas').height = $('#canvas').offsetHeight;
const ctx = $('#canvas').getContext('2d');
let ratio = 1;

const logger = {
	_time: function() {
		return '<div class="time">' + dayjs().format('HH:mm:ss') + '</div><div style="clear:both"></div>';
	},
	_scroll: function() {
		$('#log .content').scrollTop = $('#log .content').scrollHeight;
	},
	log: function(msg) {
		$('#log .content').innerHTML += '<div>　' + escapeHtml(msg) + logger._time() + '</div>';
		logger._scroll();
	},
	warn: function(msg) {
		$('#log .content').innerHTML += '<div style="background: lightyellow">　<span style="font-size:0.8rem">Warning:</span> ' +
			escapeHtml(msg) + logger._time() + '</div>';
		logger._scroll();
	},
	error: function(msg) {
		$('#log .content').innerHTML += '<div style="background: pink; color: red">　<span style="font-size:0.8rem">Error:</span> ' +
			escapeHtml(msg) + logger._time() + '</div>';
		logger._scroll();
	}
}

$('#load').onclick = function(){
	ctx.clearRect(0, 0, $('#canvas').width, $('#canvas').height)
	$('#img').src = $('#url').value;

	setTimeout(function(){
		const originalWidth = $('#img').naturalWidth;
		const originalHeight = $('#img').naturalHeight;

		logger.log('Loading image: ' + $('#url').value + '. OriginalSize is ' + originalWidth + '×' + originalHeight + '.');

		let width = 0;
		let height = 0;

		if (originalWidth < originalHeight) {
			width = $('#canvas').offsetWidth;
			ratio = width / originalWidth;
			height = Math.floor(width / originalWidth * originalHeight);
		} else {
			height = $('#canvas').offsetHeight;
			ratio = height / originalHeight;
			width = Math.floor(height / originalHeight * originalWidth);
		}

		logger.log('Scaling to ' + width + '×' + height +'.');

		console.log(width)
		console.log(height)

		ctx.drawImage($('#img'), 0, 0, width, height);
	}, 500);
}

$('#canvas').onmousedown = function(e) {
	const x = e.clientX - canvas.offsetLeft;
	const y = e.clientY - canvas.offsetTop;

	ctx.beginPath();
	ctx.arc(x, y, 1, 0, 2 * Math.PI, true);
	ctx.stroke();

	logger.log('Clicking on ' + x + ',' + y + ' (' + Math.floor(x/ratio) + ',' + Math.floor(y/ratio) + ').');
}
