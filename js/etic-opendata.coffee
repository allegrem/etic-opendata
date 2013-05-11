# Cache some values
offset05 = $('#frame05').offset().top - 5 # the '-5' is a security margin
offset10 = $('#frame10').offset().top - 5
offset20 = $('#frame20').offset().top - 5
offset30 = $('#frame30').offset().top - 5
nav = $('nav')
labelInitialWidth = Math.max.apply Math, ($(label).width() for label in nav.find('span')) # compute the max width of all the labels

# Hide the nav menu on start
nav.css('left', "-#{nav.width()+10}px").addClass('hidden')

# Smooth scroll
$('nav li').click (e) ->
	e.preventDefault()
	$('html, body').stop().animate scrollTop: $($(this).find('a').attr('href')).offset().top, 1000

# Activate the given menu item
activateNavItem = (anchor) -> 
	$('nav li').removeClass 'selected'
	$("nav a[href=#{anchor}]").parent().addClass 'selected'

# Show/Hide lables in the nav menu
showLabels = () -> 
	nav.find('span').stop()
		.css('margin-left', "7px")
		.animate(width: labelInitialWidth+7, 700)
hideLabels = () -> 
	nav.find('span').stop()
		.animate(width: '0px', 700, () -> $(this).css('margin-left', '0px'))
nav.mouseenter showLabels
nav.mouseleave hideLabels
	
# On scroll, update the active item in the nav menu and once per load show the nav menu
$(window).scroll (e) ->
	scrollTop = $(this).scrollTop()
	if scrollTop < offset10
		activateNavItem '#frame00'
	else if scrollTop < offset20
		activateNavItem '#frame10'
	else if scrollTop < offset30
		activateNavItem '#frame20'
	else
		activateNavItem '#frame30'
	
	if scrollTop > offset05 and nav.hasClass 'hidden'
		nav.stop().animate(left: '0px', 1000).removeClass('hidden')
		setTimeout hideLabels, 5000