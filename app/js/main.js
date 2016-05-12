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
		nav:   true,
		dot:   true,
		animateOut: 'fadeOut',
		navText: ["<i class='fa fa-chevron-left owl__nav-item' aria-hidden='true'></i>","<i class='fa fa-chevron-right owl__nav-item' aria-hidden='true'></i>"],
	});



	
	//new product //index

	if($('.new-products-js')) {
		products($('.new-products-js'),$('#products__nav-container-js'));
	}

	//top product //index

	if($('.new-products-js')) {
		products($('.top-products-js'),$('#products__nav-container-2-js'));
	}

	//sale product //index

	if($('.new-products-js')) {
		products($('.sale-products-js'),$('#products__nav-container-3-js'));
	}

	// функции
	

	// container    - jq обьект контейнера для итемов овл карусели
	// navContainer - jq обьект контейнера для кнопок навигации

	function products(container,navContainer) {
		var npj = container;
		var next = navContainer.find('.next-js');
		var prev = navContainer.find('.prev-js');

		npj.owlCarousel({
			items:      1,
			animateOut: 'fadeOut',
			dots:       false,
			mouseDrag:  false,
			touchDrag:  false,
		});

		prev.css({
			opacity: 0.5,
			cursor: 'default'
		});

		next.click(function() {
			npj.trigger('next.owl.carousel');
		})

		prev.click(function() {
			npj.trigger('prev.owl.carousel');
		})

		npj.on('changed.owl.carousel', function(event) {
			if(event.item.count-1 === event.item.index ) {
				remove(next,prev);
				next.css({
					opacity: 0.5,
					cursor: 'default'
				});
			}else if (event.item.index === 0) {
				remove(next,prev);
				prev.css({
					opacity: 0.5,
					cursor: 'default'
				});
			}else{
				remove(next,prev);
			}
		})
	}

	//удаление опасити из кнопок навигации

	function remove(next,prev) {
		next.removeAttr('style');
		prev.removeAttr('style');
	}



})