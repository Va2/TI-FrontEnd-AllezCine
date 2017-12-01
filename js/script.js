$(function(){
/***********************  Soft Scroll  *********************/
	var $root = $('html, body');
	$('.soft-scroll').click(function() {
	    var href = $.attr(this, 'href');
	    $root.animate({
	        scrollTop: $(href).offset().top
	    }, 500, function () {
	        window.location.hash = href;
	    });

	    return false;
	});


/***********************  FLECHE TOP  *********************/
	var a = document.createElement("A");
	a.setAttribute("href", "#");
	a.classList.add('to-top');
	a.classList.add('soft-scroll');
	var span = document.createElement("SPAN");
	span.classList.add('glyphicon');
	span.classList.add('glyphicon-arrow-up');
	a.appendChild(span);
	a.addEventListener('click',function(e){
		e.preventDefault();
	    $root.animate({
	        scrollTop: 0,
	    }, 500, function () {
	        window.location.hash = "#top";
	    });
	});
	document.body.appendChild(a);
	$(document).scroll(function() {
	  var y = $(this).scrollTop();
	  if (y > 400) {
	    $('.to-top').fadeIn();
	  } else {
	    $('.to-top').fadeOut();
	  }
	});

/***********************************************************/
/***********************  COOKIES  *********************/
/***********************************************************/
	function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}


/*********************** ACCEPT COOKIES  *********************/
	function checkAcceptConditions() {
	    var accepted = getCookie("acceptCookies");
	    if (accepted == "") {
			$('.cookies').show();
	    } else {
			$('.cookies').hide();
	    }
	}
	checkAcceptConditions();
	$('#acceptCookies').on('click',function(e){
		e.preventDefault();
		setCookie("acceptCookies", 1, 365);
		$('.cookies').slideUp();
	})
/***********************************************************/
/***********************  AGE CHECK  *********************/
/***********************************************************/
	function checkAge() {
	    var okForPorn = getCookie("okForPorn");
	    if (okForPorn == "") {
			$('#myModal').modal();
	    }
	}
	checkAge();
	$('#okForPorn').datetimepicker({
		locale: 'fr',
		format: 'DD/MM/YYYY',
		debug: true
	});
	$('#sendPornAge').on('click',function(e){
		var m = moment( $('#okForPorn').val() , "DD/MM/YYYY" );
		var years = moment().diff(m, 'years');
		console.log(years);
		if (years >= 18) {
			setCookie("okForPorn", years, 365);
			$('#myModal').modal('hide');
		} else {
			window.location.replace("https://www.youtube.com/watch?v=2YXVbyXot9Y");
		}
	})
/***********************************************************/
/***********************  JUMBO MAMBO  *********************/
/***********************************************************/
    $("#slidey").slidey({
        interval: 6000,
        listCount: 5,
        showList: true
    });
    $(".slidey-list-description").dotdotdot({
    	tolerance: 0,
    	truncate: "word",
    	height: 50
    });


/***********************************************************/
/***********************  FEATURED (films/series)  *********************/
/***********************************************************/

/***********************  init ISOTOPES  *********************/
	$('#featured .grid, #series .grid').isotope({
	  itemSelector: '.grid-item',
	  layoutMode: 'fitRows',
	  filter: function(){
	  	return $(this).index() < 12
	  }
	});

/***********************  Fltres par genre  *********************/
	function filterItems(target){
		$(target).isotope({
			filter: function(){
				if ($(target).data('filter')=="*") {
					hasClass = true;
				} else {
					hasClass = $(this).hasClass($(target).data('filter'));
				}
				plusQueDouze = $(this).index() < $(target).data('show-nb');
				return hasClass && plusQueDouze;
			}
		});
	}
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
/********************  Show More/Less Button  *********************/
	$('.show-more').click(function(event){
		event.preventDefault();
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


/***********************************************************/
/***********************  SHOP  *********************/
/***********************************************************/
    function changeSelectedShopMovie(){
    	$('.current-title').text($('#shop-movies-list .chosen .film-title').text());
    	$('.current-plot').text($('#shop-movies-list .chosen .film-plot').text());
    	$('.current-year').text($('#shop-movies-list .chosen .film-year').text());
    	$('.current-genres').text($('#shop-movies-list .chosen .film-genres').text());
    	$('.current-price').text($('#shop-movies-list .chosen .film-price').text());
    	$('.trailer-video').html('<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/'+ $('#shop-movies-list .chosen .film-youtube').text() +'?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen class="current-trailer"></iframe>');
    }
    changeSelectedShopMovie();
    $('.next-shop').click(function(e){
    	e.preventDefault();
    	var actual = $('#shop-movies-list .chosen');
    	if (actual.next().length){
	    	actual.next().addClass('chosen');
    	} else {
    		$('#shop-movies-list').last().children().first().addClass('chosen');
    	}
    	actual.removeClass('chosen');
    	changeSelectedShopMovie();
    });
    $('.prev-shop').click(function(e){
    	e.preventDefault();
    	var actual = $('#shop-movies-list .chosen');
    	if (actual.prev().length){
	    	actual.prev().addClass('chosen');
    	} else {
    		$('#shop-movies-list').last().children().last().addClass('chosen');
    	}
	    actual.removeClass('chosen');
    	changeSelectedShopMovie();
    });
    $('#shop .choose-me').click(function(e){
		e.preventDefault();
    	$('#shop-movies-list .chosen').removeClass('chosen');
    	$(this).parent().addClass('chosen');
    	changeSelectedShopMovie();
    })


/***********************  FORMULAIRE  *********************/
    $('#fake').on('submit',function(e){
    	e.preventDefault();
    	var text = "Prénom: " + $('#f-name').val() + "\nNom: " + $('#l-name').val() + "\nPrénom: " + $('#f-name').val() + "\nEmail: " + $('#email').val() + "\nSujet: " + $('#subject').val() + "\nMessage: " + $('#message').val();
    	alert(text);
    });


/***********************************************************/
/****************  MODAL : Trailer etc  *********************/
/***********************************************************/

	$('a[data-toggle=modal]').click(function(){
    	$('.modal .current-title').text( $(this).find('.film-title').text() );
    	$('.modal .current-plot').text($(this).find('.film-plot').text());
    	$('.modal .current-year').text($(this).find('.film-year').text());
    	$('.modal .current-genres').text($(this).find('.film-genres').text());
    	$('.modal .trailer-video').html('<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/'+ $(this).find('.film-youtube').text() +'?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen class="current-trailer"></iframe>');
	})


})