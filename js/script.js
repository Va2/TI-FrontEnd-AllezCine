$(function(){

	var $root = $('html, body');
	$('a[href^="#"]').click(function() {
	    var href = $.attr(this, 'href');

	    $root.animate({
	        scrollTop: $(href).offset().top
	    }, 500, function () {
	        window.location.hash = href;
	    });

	    return false;
	});




	var a = document.createElement("A");
	a.setAttribute("href", "#");
	a.classList.add('to-top');
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

	function checkAge() {
	    var okForPorn = getCookie("okForPorn");
	    if (okForPorn == "") {
			$('#myModal').modal();
	    }
	}
	checkAge();

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

	$('.initially-hidden').hide();

	$('.show-more').on('click',function(e){
		e.preventDefault();
		$($(this).data('more')).slideToggle();
		console.log($($(this).data('more')));
		if ($(this).find('span').text()=="PLUS") {
			$(this).find('span').text("MOINS");
		} else {
			$(this).find('span').text("PLUS");
		};
	});


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
    $('.choose-me').click(function(e){
		e.preventDefault();
    	$('#shop-movies-list .chosen').removeClass('chosen');
    	$(this).parent().addClass('chosen');
    	changeSelectedShopMovie();
    })
})