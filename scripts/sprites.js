function sprite(options) {
	var that = {},
	frameIndex = 0,
	tickCount = 0,
	ticksPerFrame = options.ticksPerFrame || 0,
	numberOfFrames = options.numberOfFrames || 1;

	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.image;
	that.loop = options.loop || true;
	that.stretch = options.stretch || 1;

	that.update = function() {
		tickCount += 1;
		if (tickCount > ticksPerFrame) {
			tickCount = 0;
			if (frameIndex < numberOfFrames - 1) {
				frameIndex += 1;
			} else if (that.loop){
				frameIndex = 0;
			}
		}
	}
	that.image.onload = function() {
		that.render();
	}
	that.render = function() {
		that.context.clearRect(0, 0, that.width, that.height);
		that.context.drawImage(
			that.image,
			frameIndex * that.width / numberOfFrames,
			0,
			that.width / numberOfFrames,
			that.height,
			0,
			0,
			that.width / numberOfFrames * that.stretch,
			that.height * that.stretch,
		);
	}
	return that;
}
