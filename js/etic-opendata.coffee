###########################################################################################
#										NAV MENUS
###########################################################################################

# Smooth scroll
smoothScrollTo = (e, callback) -> $('html, body').stop().animate(scrollTop: $(e).offset().top, 1000, callback)
$('nav li, a.scroll-to').click (e) ->
	e.preventDefault()
	target = $(this).attr('href') ? $(this).find('a').attr('href')
	smoothScrollTo(target)

# Activate the given menu item
activateNavItem = (anchor) -> 
	$('nav li').removeClass 'selected'
	$("nav a[href=#{anchor}]").parent().addClass 'selected'



###########################################################################################
#										MAIN NAV
###########################################################################################

# Hide the main nav menu on start
mainNav = $('nav.main-nav')
mainNav.css('left', "-#{mainNav.width()+10}px").addClass('hidden')

# Show/Hide lables in the main nav menu
labelInitialWidth = Math.max.apply Math, ($(label).width() for label in mainNav.find('span')) # compute the max width of all the labels
showLabels = () -> 
	mainNav.find('span').stop()
		.css('margin-left', "7px")
		.animate(width: labelInitialWidth+7, 500)
hideLabels = () -> 
	mainNav.find('span').stop()
		.animate(width: '0px', 700, () -> $(this).css('margin-left', '0px'))
mainNav.mouseenter showLabels
mainNav.mouseleave hideLabels



###########################################################################################
#										TIMELINE
###########################################################################################

# Cache some values
tl = $('.timeline')
allDetails = tl.children('p')

# Hide and show details (take the 'p' elements !!)
hideDetails = (elements = allDetails, hide = false) -> 
	$(elements).each (i, el) ->
		e = $(el)
		if hide then e.hide() else e.stop().slideUp()
		e.prev().addClass('hidden')
showDetails = (elements = allDetails) ->
	$(elements).each (i, el) -> $(el).stop().slideDown().prev().removeClass('hidden')

# Show details on click
tl.find('h3').click (e) -> 
	unless $('.toggle').hasClass('toggle-off')
		isClosed = $(this).hasClass('hidden')
		hideDetails()
		showDetails($(this).next()) if isClosed

# Enable/Disable condensed view
$('#tlCondensed1').click () -> 
	tl.find('h3').css('cursor', 'pointer')
	smoothScrollTo($('#frame15'), hideDetails)
$('#tlCondensed2').click () -> 
	tl.find('h3').css('cursor', 'auto')
	showDetails()
		
# Show and hide the nav
tlNav = tl.find('nav')
showTlNav = () -> tlNav.stop().animate(right: '0', 700).removeClass('hidden')
hideTlNav = (hide = false) -> 
	time = if hide then 0 else 700
	tlNav.stop().animate(right: "-#{tlNav.width()+40}px", time).addClass('hidden')

# Hide the details and the nav on start
hideDetails(null, true)
hideTlNav(true)


###########################################################################################
#										ACTORS
###########################################################################################

# Cache some values
actorsDiv = $('.actors')
actorsTarget = actorsDiv.find('.row-fluid')
actors = actorsDiv.find('.actor')

# Count the number of differente values in a data attribute
listDataAttribute = (attribute, elements) ->
	attributeValues = []
	elements.each (i,e) ->
		a = $(e).data(attribute)
		attributeValues.push a  unless a in attributeValues
	attributeValues

actorsCategories = listDataAttribute 'categorie', actors
actorsPositions = listDataAttribute 'position', actors

# Show actors by categories
initAttributeView = (attributeName, attributeList) ->
	# Create columns
	attributeListLength = attributeList.length
	spanValue = Math.ceil 12 / attributeListLength
	actorsColumns = []
	for i in [0..attributeListLength-1]
		actorsTarget.append("""
			<div class='span#{spanValue}' data-#{attributeName}='#{attributeList[i]}'>
				<h2>#{attributeList[i]}</h2>
			</div>""")
		actorsColumns.push actorsTarget.find("div.span#{spanValue}:last-of-type") # A AMELIORER !!

	# Move actors to the right column
	actors.each (i,a) ->
		columnNb = null
		for i in [0..attributeListLength-1]
			if attributeList[i] == $(a).data(attributeName)
				actorsColumns[i].append a
				break

	# Hide attribute label
	actors.find(".label-#{attributeName}").hide()

# On load, hide some content and initiate categorie view
actors.find('p').hide()
initAttributeView 'categorie', actorsCategories


###########################################################################################
#										SCROLLING
###########################################################################################

$(window).scroll (e) ->
	scrollTop = $(this).scrollTop()

	# Cache some values
	offset05 = $('#frame05').offset().top - 5 # the '-5' is a security margin
	offset10 = $('#frame10').offset().top - 5
	offset15 = $('#frame15').offset().top - 5
	offset20 = $('#frame20').offset().top - 5
	offset30 = $('#frame30').offset().top - 5
	offset40 = $('#frame40').offset().top - 5

	# Update the active item in the nav menu
	if scrollTop < offset10
		activateNavItem '#frame00'
	else if scrollTop < offset20
		activateNavItem '#frame10'
	else if scrollTop < offset30
		activateNavItem '#frame20'
	else if scrollTop < offset40
		activateNavItem '#frame30'
	else
		activateNavItem '#frame40'
	
	# Once per load, show the main nav menu
	if scrollTop > offset05 and mainNav.hasClass 'hidden'
		mainNav.stop().animate(left: '0px', 1000).removeClass('hidden')
		setTimeout hideLabels, 5000

	# Show and hide the timeline menu when we are on the timeline
	if (offset15 - $(window).height() * 0.05) < scrollTop < (offset20 - $(window).height() * 0.3) and tlNav.hasClass 'hidden'
		showTlNav()
	else if (scrollTop < (offset15 - $(window).height() * 0.05) or scrollTop > (offset20 - $(window).height() * 0.3)) and !tlNav.hasClass 'hidden'
		hideTlNav()