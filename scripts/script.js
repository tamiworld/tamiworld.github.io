$(document).ready(function() {

  // sticky nav
  $(function () {
    $('.site-header').data('size', 'big');
  });
      
  $(window).scroll(function () {
    var $page = $('.page-content');
    var $hdr = $('.site-header');
    var $logo = $('.logo > img');
    var $nav = $('.site-header .nav');
    var $li = $('.site-header .nav li');
    var $jump = $('.site-header').height();
    
    if ($('body').scrollTop() > 60) {
      if ($hdr.data('size') == 'big') {
        $hdr.data('size', 'small');
        $page.css({
          'margin-top':$jump
        });
        $hdr.addClass('nav--scroll');
        $nav.addClass('nav--banner');
        $logo.stop().css({
          'display': 'none'
        });
      }
    } else {
        if ($hdr.data('size') == 'small') {
          $hdr.data('size', 'big');
          $page.css({
            'margin-top':''
          });
          $hdr.removeClass('nav--scroll');
          $nav.removeClass('nav--banner');
          $logo.stop().css({
              'display': ''
          });
        }
      }
  });
  // $END site nav scroll
  
  // hash scroll helper
  $(function () {
    var target = window.location.hash;
    var $target = $(target);
    // if the link matches the page you're on, then prevent reloading
    $('a[href*="#"]').on('click', function() {
      if (target == '#top') {
  	    $('html, body').animate({ scrollTop: 0 }, 'fast');
      }
    });
    if(target !== '#top' && target) {
	    $('html, body').stop().delay(500).animate({
	      'scrollTop': $target.offset().top - 48
	    }, 500);
    }
  });
  // $END hash scroll helper
}); 
// $END document.ready

// av area toggle
$(function() { 
  
  // don't run this code if there's no right sidebar
  if (!$('.right').length > 0) { 
    return;
  } else { // sound cloud api setup
    var iframeElement   = document.querySelector('.av-area--audio iframe');
    var iframeElementID = iframeElement.id;
    var sndcld          = SC.Widget(iframeElement);
  }
  // ^end sndcld
  
  $('.video, .audio').click(function() {
    $('.av-area--arrow').css('display', 'block');
    $('html, body').animate({
      scrollTop: $('.box__media').offset().top
    }, 200);
    if ('.av-area--video iframe') {
      $('.av-area--video iframe').animate({
        opacity: 1
      }, 1000);
    }
    if ($('.av-area--audio').css('display', 'auto')) {
      $('.av-area--audio').hide();
    }
  });
  
  $('.box__media > .video').click(function() {
    $('.av-area--arrow').removeClass('av-area--arrow__r');
    $('.av-area--audio').hide();
    sndcld.pause();
    $('.av-area--video').show();
  });
  $('.box__media > .audio').click(function() {
    $('.av-area--arrow').addClass('av-area--arrow__r');
    $('.av-area--video').hide();
    sndcld.play();
    $('.av-area--audio').show();
  });
});
// $END av area toggle


// form placeholders
$(document).ready(function() {
  
  $.fn.placeReplace = function() {
    return this.each(function() { // repetitive ...
	    var $elem = $(this);
	    $elem.addClass('placeholder');
	    $elem.attr('placeholder', $elem.data('restore'));
	    $elem.data('restore', $elem.attr('placeholder'));
	  });
  };
  
  $('[placeholder]').click(function() {
    var input = $(this);
    if (input.val() == '') { // destroy
      input.removeClass('placeholder');
      input.data('restore', input.attr('placeholder'));
      input.attr('placeholder', '');
    }
  }).blur(function() { // rebuild
    var input = $(this);
    if (input.val() == '' || input.val() == input.attr('placeholder')) {
      input.placeReplace();
    }
  });
  $('[placeholder]').keyup(function() { // rebuild
    var input = $(this);
    if (input.val() == '' || input.val() == input.attr('placeholder')) {
      input.placeReplace();
      input.css({
        "overflow": "hidden"
      });
    }
  });

  $('[placeholder]').parents('form').submit(function() {
    $(this).find('[placeholder]').each(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
      }
    });
  });
});
// $END form placeholders

// form validation
$(document).ready(function() {
  // Place ID's of all required fields here.
  required = ["name", "company", "email"];
  tip = ["name", "company", "email"];
  // If using an ID other than #email or #error then replace it here
  email = $('.email');
  error = "This field is required.";
  emailerror = "Please enter a valid email.";
  emailtip = '<label class="error--tip">'+emailerror+'<span class="tip-arrow"></span></label>';
  var $emailval = email.val();
  var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // error tip display function
  jQuery.fn.tip = function() {
    return this.each(function() {
  	  var $elems = $(this);
  	  if($elems.hasClass('tip')){
  	    var $emailval = email.val();
    	  $elems.click(function() {
      	  var $elem = $(this);
      	  if ($elems.val().length > 0) {
      	    return false;
      	  } else {
        	  var position = $elem.position();
        	  $elem.prev('.error--tip').css({
        	    'top': position.top - 40,
        	    'left': position.left,
        	  });
        	  $elem.prev('.error--tip').toggle();
        	}
      	});
      	$elems.blur(function() {
      	  var $elem = $(this);
      	  $elem.prev('.error--tip').hide();
      	});
      	$elems.keydown(function() {
      	  var $elem = $(this);
      	  $elem.prev('.error--tip').hide();
      	});
      	$elems.keyup(function() {
      	  var $elem = $(this);
      	  if ($elems.val().length == 0) {
      	    $elem.prev('.error--tip').show();
      	  }        	  
      	});
    	}
  	});
  	
  	return this;
  };
  
  // email active validation on keyup and change events
  email.one('keyup', function() {
    emailchk = '<label class="emailchk"></label>';
    $(this).before(emailchk);
  });
  email.keyup(function() {
    var $emailval = email.val();
    emailTest($emailval);
  });
  
	// Validate the e-mail.
  function emailTest(emails) {
    $emailchk = $('.emailchk');
	  if(emails.length == 0){
//      email.removeClass('bad-email');
	  }
	  if (emailRegex.test(emails)) {
	    $emailchk.removeClass('bad-email');
	    $emailchk.addClass('good-email');
	    
	    return true;
	  } else if(!emailRegex.test(emails)) {
	    $emailchk.removeClass('good-email');
      $emailchk.addClass('bad-email');
	  }
	}
  
  $('.form').on('submit', function(e){	
  	//Validate required fields
  	for (i=0; i<required.length; i++) {
  		var $input = $('.'+required[i]);
  		if ($input.val() == '') {
  			$input.addClass("needs-filled");
  		} else {
  			$input.removeClass("needs-filled");
  		}
  		if ($.inArray(required, tip)) {
  		  $.each(tip, function(i, val) {
  		    $('.'+val).addClass('tip');
  		  });
  		  if (required[i] == 'email') {
  		    email.before(emailtip);
   		  } else {
  		    $('.'+required[i]).before('<label class="error--tip">'+error+'<span class="tip-arrow"></span></label>');
  		  }
  		}
  	}
  	
  	$('input').tip();
  	
		//if any inputs on the page have the class 'needs-filled' the form will not submit
		var $emailval = email.val();
		if ($(":input").hasClass("needs-filled") || !emailTest($emailval)) {
			e.preventDefault();
			return false;
		} else {
			return true;
		}
	});
	
  // Clears any fields in the form when the user clicks on them
  $(":input").focus(function() {		
     if ($(this).hasClass("needs-filled")) {
  	   $(this).removeClass("needs-filled");
     }
  });
});
// $END form validation