$(function(){
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



})