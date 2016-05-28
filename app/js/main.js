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

	owl = $('.carousel-1');
	owl.owlCarousel({
		items: 1,
		loop:  true,
		nav:   true,
		dot:   true,
		animateOut: 'fadeOut',
		navText: ["<i class='fa fa-chevron-left owl__nav-item' aria-hidden='true'></i>","<i class='fa fa-chevron-right owl__nav-item' aria-hidden='true'></i>"],
	});

	owl.on('refresh.owl.carousel', function(event) {
		//window.location.reload();
	})
	
	//new product //index

	if($('.new-products-js')) {
		products($('.new-products-js'),$('#products__nav-container-js'));
	}

	// reload

	if($('.sale-products-js') || $('.top-products-js')) {
		//prev();
	}

	//top product //index

	if($('.top-products-js')) {
		migration($('.top-products-js'));
		products($('.top-products-js'),$('#products__nav-container-2-js'));
	}


	//sale product //index

	if($('.sale-products-js')) {
		migration($('.sale-products-js'));
		products($('.sale-products-js'),$('#products__nav-container-3-js'));
	}

	//widget-1

	if($('.widget-1')) {
		widget1();
	}
	
	//nav-menu

	if($('.nav-menu-js')) {
		nav($('.nav-menu-js'));
	}

	//nav-menu

	// if($('.bum').length > 0) {
		bum($('.bum'));
	// }

	// функции
	

	// container    - jq обьект контейнера для итемов овл карусели
	// navContainer - jq обьект контейнера для кнопок навигации

	function widget1() {
		var items = $('.widget-1');
		items.each(function(index) {
			var ilh = $(this).find('.widget-1__item-layout').height();
			var l   = $(this).find('.widget-1__layout');
			var lh  = l.height();
			var v   = $(this).find('.widget-1__view');
			var sum = ilh-lh;
			if(sum>10) {
				v.css({
					'display': 'inline-block',
				});
				v.on('click', function() {
					var widget = $(this).parent('.widget-1');
					if (l.attr('style')) {
						l.removeAttr('style')
						return;
					}
					l.css({
						'max-height': '2500px',
					});
				});
			}else{
				v.css({
					display: 'none',
				});
			};
		});
	}


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

	//перекладываение продуктов карусельки

	function migration(obj) {
		if(!window.matchMedia('(max-width: 1199px)').matches) {
			return;
		};
		var item = obj.find('.products-item-js');
		if(item.length < 2) {
			return;
		}
		item.each(function(index, el) {
			if(index === 0) {
				var l = item.eq(index+1).find('.product-layout').eq(0);
				$(el).find('.row').append(l);
			}	
			else {
				var next    = item.eq(index+1).find('.product-layout');
				var current = item.eq(index).find('.product-layout');
				if (next.length > 1) {
					$(el).find('.row').append(next.eq(0));
					$(el).find('.row').append(next.eq(1));
				}
				if (current.length == 0) {
					$(el).remove();
				}
			}	
		});
	}

	//рефреш при ресайзе

	function prev() {
		var max = 0;
		var min = 0;
		$(window).resize(function(){
			if(window.matchMedia('(max-width: 1199px)').matches){
				++max;
				if(max===1){
					window.location.reload(true);
					min = 0;
				}
			}
			if(window.matchMedia('(min-width: 1200px)').matches){
				++min;
				if(min===1){
					window.location.reload(true);
					max = 0;
				}
			}
		});
	}

	//меню навигации

	function nav(obj) {
		var li = obj.find('li');
		li.hover(
			function(event){
				if($(this).children('ul').length > 0) {
					$(this).children('a').click(function(event) {
						event.preventDefault();
					});
				}
				$(this).children('ul').fadeToggle(200);
			});
	}

	//мобильная кнопка меню

	function bum (obj) {
		 obj.on('click',function() {
		 	$(this).siblings('.bum-slide-js').slideToggle();
		 })
	}

})