$(window).scroll(function() {
	if ($(this).scrollTop() > $('#header-content').outerHeight()){  
		$('#more-tweets').addClass("fix-nav");
		$('#tweets').addClass('top-scrolled');
	}
	else{
		$('#more-tweets').removeClass("fix-nav");
		$('#tweets').removeClass('top-scrolled');
	}
});

