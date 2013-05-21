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

# Show/Hide labels in the main nav menu
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
	tlNav.stop().animate(right: "-#{tlNav.width()+50}px", time).addClass('hidden')

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
		attributeValues.push {code: a, name: $(e).find(".label-#{attribute}").text()}  unless a in (v.code for v in attributeValues)
	attributeValues

actorsCategories = listDataAttribute 'categorie', actors
actorsPositions = listDataAttribute 'position', actors

# Show actors by a given attribute
initAttributeView = (attributeName, attributeList, animationDuration = 2000) ->
	# Compute some values and remove previous columns
	attributeListLength = attributeList.length
	spanValue = Math.ceil 12 / attributeListLength
	actorsTarget.find("h2, div").remove()

	# Create actorsColumns
	actorsColumns = []
	for i in [0..attributeListLength-1]
		el = $("""
			<div class='span#{spanValue}' data-#{attributeName}='#{attributeList[i].code}'>
				<h2>#{attributeList[i].name}</h2>
			</div>""")
		actorsColumns.push el
		actorsTarget.append el

	# Hide attribute label
	actors.find('.label').show()
	actors.find(".label-#{attributeName}").hide()

	# Move actors to the right column
	actors.each (i,a) ->
		columnNb = null
		a = $(a)
		for i in [0..attributeListLength-1]
			if attributeList[i].code == a.data(attributeName)
				# clone the actor in a new statically positionned hidden div
				aCopy = a.clone()
				a.css position: 'absolute'
				aCopy.css(position: 'static', visibility: 'hidden')

				# append this copy at the right place
				actorsColumns[i].append aCopy
				aTop = aCopy.position().top
				aLeft = aCopy.position().left
				
				# animate the real actor to the new place
				a.stop().animate(top: aTop, left: aLeft, animationDuration, () ->
						a = aCopy.clone()
						actorsColumns[i].append a
						a.css position: 'static'
						aCopy.remove()
					)
				break

# Show details of an actor when mouse is hover
actorsDetailsTarget = actorsDiv.find('#actor-details')
actors.mouseenter () ->
	actorsDetailsTarget.html $(this).html()
	actorsDetailsTarget.find('.label, p').show()
	actorsDetailsTarget.stop().animate bottom: 0
actors.mouseleave () ->
	actorsDetailsTarget.stop().animate bottom: $(window).height() * -0.25

# Select the representation (by category or by position)
$('#actorsView1').click (e) -> initAttributeView 'categorie', actorsCategories
$('#actorsView2').click (e) -> initAttributeView 'position', actorsPositions

# Show and hide the nav
actorsNav = actorsDiv.find('nav')
showActorsNav = () -> actorsNav.stop().animate(right: '0', 700).removeClass('hidden')
hideActorsNav = (hide = false) -> 
	time = if hide then 0 else 700
	actorsNav.stop().animate(right: "-#{actorsNav.width()+50}px", time).addClass('hidden')

# Pin/Unpin column titles
pinActorsColumnTitles = () -> actorsDiv.find('h2').addClass('pin')
unpinActorsColumnTitles = () -> actorsDiv.find('h2').removeClass('pin')

# On load, hide some content and initiate categorie view
actors.find('p').hide()
initAttributeView 'categorie', actorsCategories, 0
hideActorsNav true
actorsDetailsTarget.css bottom: $(window).height() * -0.25


###########################################################################################
#										SCROLLING
###########################################################################################

$(window).scroll (e) ->
	scrollTop = $(this).scrollTop()

	# Cache some values (the '-5' is a security margin)
	offset05 = $('#frame05').offset().top - 5
	offset10 = $('#frame10').offset().top - 5
	offset15 = $('#frame15').offset().top - 5
	offset20 = $('#frame20').offset().top - 5
	offset25 = $('#frame25').offset().top - 5
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

	# Show and hide the actors menu when we are on the timeline
	if (offset25 - $(window).height() * 0.05) < scrollTop < (offset30 - $(window).height() * 0.3) and actorsNav.hasClass 'hidden'
		showActorsNav()
	else if (scrollTop < (offset25 - $(window).height() * 0.05) or scrollTop > (offset30 - $(window).height() * 0.3)) and !actorsNav.hasClass 'hidden'
		hideActorsNav()

	# Pin the actors column titles 
	firstActorTitle = actorsDiv.find('h2').first()
	if (firstActorTitle.position().top < scrollTop < offset30) and !firstActorTitle.hasClass 'pin'
		pinActorsColumnTitles()
	else if (scrollTop > offset30 or scrollTop < offset25 + 40) and firstActorTitle.hasClass 'pin'
		unpinActorsColumnTitles()