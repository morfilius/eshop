$(document).ready(function(){
	
	///toggle-lang

	var tl = $('.toggle-lang');
	tl.find('.toggle-lang__menu').hide();
	tl.on('click',function () {
		$(this).find('.toggle-lang__menu').toggle();
	})

	//search
	$('.search__x').on('click', function() {
		$(this).siblings('.search__text').val('');
	});

	//carousel-1 //index
	$('.carousel-1').owlCarousel({
		items: 1,
		loop:  true,
	});

})