/* =========================================================
// jquery.popcorn-1.0.js
// By Dustin Carlson: http://dustincarlson.org
// ========================================================= */


(function($) {

$.fn.popcorn = function(options) {
	
	var settings = {
		fadeSpeed: 'slow',
		fadeImageSpeed: 400,
		timeout: 2000,
		imageCount: 12,
	};
	
	if(options)
			$.extend(settings, options);
			
	var i = 0;
	settings.imageArray = new Array();
	$(this.children('div').children('ul').children('li')).each(function(key, value) {
		settings.imageArray[i] = new Array();
		settings.imageArray[i]['img'] = $(this).children('a').children('img').attr('src');
		settings.imageArray[i]['link'] = $(this).children('a').attr('href');
		i++;
	});
	
	$(this).children('div.popcornContent').empty();
	
	var images = new Array();
	var html = '<div class="popcornContent"><ul class="nolist">';
	var i = 0;
	
	for(i in settings.imageArray) {
		if(i <= settings.imageCount -1) {
			if(settings.fadeImage) {
				html += '<li id="image_'+i+'"><a href="'+settings.imageArray[i]['link']+'"><img class="fadeImage" src="'+settings.fadeImage+'"/><img class="itemImage" src="'+settings.imageArray[i]['img']+'"/></a></li>';
			} else {
				html += '<li id="image_'+i+'"><a href="'+settings.imageArray[i]['link']+'"><img class="itemImage" src="'+settings.imageArray[i]['img']+'"/></a></li>';
			}
			images[i] = '';
			images[i] = settings.imageArray[i]['img'];
		}
	}
	
	html += '</ul></div>';
	
	$(this).append(html);
	
	var elements = $(this).children().children().children('li');
	
	setTimeout(function() {
		next(elements, settings, images, 0);
	}, settings.timeout);

};

next = function(elements, settings, currentImages, last) {
	
	var newImageArray = new Array();
	var randSpot = last;
	var spotId;
	var imageUrl;
	var randImage;
	var imageLink;
	var imageIndex;
	var i = 0;
	var x = 0;
	
	for(i in settings.imageArray) {
		if(jQuery.inArray(settings.imageArray[i]['img'], currentImages) == -1) {
			newImageArray[x] = new Array();
			newImageArray[x]['img'] = settings.imageArray[i]['img'];
			newImageArray[x]['link'] = settings.imageArray[i]['link'];
			x++;
		}
	}
	
	while(randSpot == last) {
		randSpot = Math.floor(Math.random()*settings.imageCount);
	}
	
	spotId = $(elements[randSpot]).attr('id');
	imageUrl = $('#'+spotId+' > a > img').attr('src');
	
	while($('#'+spotId+' > a > img').attr('src') == imageUrl) {
		randImage = Math.floor(Math.random()*newImageArray.length);
		imageUrl = newImageArray[randImage]['img'];
		imageLink = newImageArray[randImage]['link'];
	}
	
	currentImages[randSpot] = imageUrl;
	
	if(settings.fadeImage) {
		
		$('#'+spotId+' > a > img.fadeImage').css('z-index', '101');
		
		setTimeout(function() {
		$('#'+spotId+' > a').attr('href', imageLink);
		$('#'+spotId+' > a > img.itemImage').attr('src', imageUrl);
		$('#'+spotId+' > a > img.fadeImage').fadeOut(1000, function() {
			$('#'+spotId+' > a > img.fadeImage').css('z-index', '99');
			$('#'+spotId+' > a > img.itemImage').fadeIn('slow');
			$('#'+spotId+' > a > img.fadeImage').fadeIn('slow');
		});
		}, settings.fadeImageSpeed);
		
	} else {
		$(elements[randSpot]).fadeOut(settings.fadeSpeed, function() {
			$(elements[randSpot]).html('<a href="'+imageLink+'"><img src="'+imageUrl+'"/></a>');
			$(elements[randSpot]).fadeIn(settings.fadeSpeed);
		});
	}

	setTimeout(function() {
		next(elements, settings, currentImages, randSpot);
	}, settings.timeout);
	
};

})(jQuery);