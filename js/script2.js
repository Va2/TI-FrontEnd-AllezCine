$(function(){

	$('#featured .grid').isotope({
	  itemSelector: '.grid-item',
	  layoutMode: 'fitRows',
	  filter: function(){
	  	return $(this).index() < 12
	  }
	});

	$('li.filter-genre a').on('click',function(event){
		event.preventDefault();
		var target = $(this).closest('ul').data('target');
		if ($(this).data('filter')=='*') {
			filtre = '*'
		} else {
			filtre = $(this).data('filter').substring(1);
		}
		$(target).data('filter',filtre);
		filterItems(target);
	});

	$('.show-more').click(function(e){
		e.preventDefault();
		var target = $(this).data('target');
		if ($(this).data('more')) {
			$(target).data('show-nb',12);
			$(this).find('span').text('PLUS');
			$(this).data('more',0);
		} else {
			$(target).data('show-nb',24);
			$(this).find('span').text('MOINS');
			$(this).data('more',1);
		}
		filterItems(target);
	})

	function filterItems(target){
		$(target).isotope({
			filter: function(){
				console.log($(target).data('filter'));
				if ($(target).data('filter')=="*") {
					hasClass = true;
				} else {
					hasClass = $(this).hasClass($(target).data('filter'));
				}
				console.log(hasClass);
				plusQueDouze = $(this).index() < $(target).data('show-nb');
				return hasClass && plusQueDouze;
			}
		});
	}
})