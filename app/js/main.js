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
		dots:   true,
		animateOut: 'fadeOut',
		navText: ["<i class='fa fa-chevron-left owl__nav-item' aria-hidden='true'></i>","<i class='fa fa-chevron-right owl__nav-item' aria-hidden='true'></i>"],
	});

	owl.on('refresh.owl.carousel', function(event) {
		//window.location.reload();
	})
	
	//carousel-2 //prodpage
	owl1 = $('.carousel-2');
	owl1.owlCarousel({
		mouseDrag:  false,
		touchDrag:  true,
		items: 1,
		thumbs: true,
		dots:    false,
		thumbsPrerendered: true
	});

	var lnav  = $('.carousel-2').parent().siblings('.carousel-2-controls-js').find('.controls__left');
	var rnav  = $('.carousel-2').parent().siblings('.carousel-2-controls-js').find('.controls__right');
	var items = $('.carousel-2').parent().siblings('.carousel-2-controls-js').find('.owl-thumb-item');



	lnav.click(function() {
		var active = $('.carousel-2').parent().siblings('.carousel-2-controls-js').find('.owl-thumb-item.active');
		items.eq(active.index()-1).removeAttr('style');
		owl1.trigger('prev.owl.carousel');
	});
	rnav.click(function() {
		var active = $('.carousel-2').parent().siblings('.carousel-2-controls-js').find('.owl-thumb-item.active');
		owl1.trigger('next.owl.carousel');
		if(items.eq(active.index()+1).length == 0)
			return;
		if(active.index()!==0 && active.index()!==1) {
			items.eq(active.index()-2).css({
				'margin-left': '-100px',
			});;
		}
			//items.eq($(this).index()-1).removeAttr('style');
		});


	//thumbnaill

	thumbnaill($('.owl-thumbs'));

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

	//like product //index

	if($('.like-products-js')) {
		migration($('.like-products-js'));
		products($('.like-products-js'),$('#products__nav-container-4-js'));
	}

	//like product //index

	if($('.viewed-products-js')) {
		migration($('.viewed-products-js'));
		products($('.viewed-products-js'),$('#products__nav-container-5-js'));
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

	bum($('.bum'));

	//счетчик в карточке товара

	counter($('.counter'));

	//табы

	tab($(".tabs"));

	// функции
	

	// container    - jq обьект контейнера для итемов овл карусели
	// navContainer - jq обьект контейнера для кнопок навигации

	//удлинение виджета при клике на строчку

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

	//карусель продуктов

	function products(container,navContainer) {
		var npj = container;
		var next = navContainer.find('.next-js');
		var prev = navContainer.find('.prev-js');

		npj.owlCarousel({
			items:      1,
			animateOut: 'fadeOut',
			dots:       false,
			mouseDrag:  false,
			touchDrag:  true,
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
				$(this).children('ul').fadeToggle(120);
			});
	}

	//мобильная кнопка меню

	function bum (obj) {
		obj.on('click',function() {
			$(this).siblings('.bum-slide-js').slideToggle();
		})
	}

	//тумбнаилы  кастомная карусель

	function thumbnaill(obj) {
		var items = obj.find('.owl-thumb-item');
		var step  = -100;
		items.on('click',function() {
			var index = $(this).index();
			var margin = items.eq(index-1).css('margin-left');
			var margin2 = items.eq(index-2).css('margin-left');
			if(index == 0)
				return;
			if(items.eq(index+1).length==0){
				return;
			}
			if(index !== 1 && margin2 !== step+'px') {
				items.eq(index-2).css({
					'margin-left': step+'px',
				});
			}
			if(margin !== step+'px'){
				return;
			}
			if($(this).hasClass('active') && margin !== step+'px') {
				return;
			}
			if(margin == step+'px') {
				items.eq(index-1).removeAttr('style');
				return;
			}
			items.eq(index-1).css({
				'margin-left': step+'px',
			});
		})
	}

	//счетчик товара в корзине

	function counter(obj) {
		var minus = obj.find('.counter__item-minus');
		var plus  = obj.find('.counter__item-plus');
		var value = obj.find('.counter__item-int');
		minus.on('click',function() {
			if(+value.text() == 0 || +value.text() == 1){
				return;
			}
			value.text(+value.text()-1);
		})
		plus.on('click',function() {
			value.text(+value.text()+1);
		})
	}

	//табы

	function tab(selector) {
		selector.each(function(index, el) {
			var li      = $(this).find('li');
			var article = $(this).find('article');

			li.on('click',function() {
				var tabNumber  = $(this).data('for');
				var curArticle = $(this).parents('.tabs').find("[data-item='"+tabNumber+"']");
				li.removeClass('active');
				$(this).addClass('active');
				article.removeAttr('style');
				curArticle.fadeToggle();
			})
		});
	}

})