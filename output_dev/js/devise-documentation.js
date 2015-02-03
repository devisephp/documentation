$(function() {
	var windowHeight;
	var navbarHeight;
	var menuHeight;
	var menuTop = 10;
	var scrollPosition;
	var difficultyLevel;

	function setWindowHeight()
	{
		windowHeight = $(window).height();
	}

	function setNavbarHeight()
	{
		navbarHeight = $('.navbar').height();
	}

	function setMenuHeight()
	{
		menuHeight = $('#documentation-sidebar').height();
	}

	function setScrollPosition()
	{
		scrollPosition = $(window).scrollTop();
	}

	function calculateSidebarState()
	{

		if (windowHeight - navbarHeight > menuHeight ) {
			$('#documentation-sidebar').css({
				top: navbarHeight
			});
		} else if((menuHeight + menuTop) - windowHeight + navbarHeight > scrollPosition) {
			$('#documentation-sidebar').css({
				top: -scrollPosition + navbarHeight
			});
		} else {
			$('#documentation-sidebar').css({
				top: -(menuHeight - windowHeight)
			});
		}
	}

	function setDifficultyCookie(difficulty)
	{
		$.cookie("difficulty", difficulty, { expires : 10 });
	}

	function setDifficultyButtons(difficulty)
	{
		$('.difficulty.btn').removeClass('btn-success');
		$('#' + difficulty + '-btn').addClass('btn-success');
	}

	function setDifficultyDocumentation(difficulty)
	{
		if (difficulty !== 'all') {
			$('.beginner, .advanced').css('display', 'none');
			$('.' + difficulty).css('display', 'block');
		} else {
			$('.beginner, .advanced').css('display', 'block');
		}
	}

	function setDifficulty(difficulty)
	{
		if (typeof difficulty === 'undefined' || difficulty === null || difficulty === '') {
			difficulty = 'all';
		}

		setDifficultyCookie(difficulty);

		setDifficultyButtons(difficulty);

		setDifficultyDocumentation(difficulty);
	}

	function getDifficultyCookie()
	{
		var _difficulty = $.cookie("difficulty");

		difficultyLevel = _difficulty;
		setDifficulty(_difficulty);
	}

	function windowResizeListener()
	{
		$( window ).resize(function() {
			setWindowHeight();
			setScrollPosition();

			calculateSidebarState();
		});
	}

	function windowScrollListener()
	{
		$(window).scroll(function (event) {
			setWindowHeight();
			setScrollPosition();

			calculateSidebarState();
		});
	}

	function difficultyListener()
	{
		$('.difficulty').click(function(){
			var _difficulty = $(this).data('difficulty');

			setDifficulty(_difficulty);
		});
	}

	function init()
	{
		setWindowHeight();
		setNavbarHeight();
		setMenuHeight();
		setScrollPosition();

		windowResizeListener();
		windowScrollListener();
		difficultyListener();

		calculateSidebarState();
		getDifficultyCookie();
	}

	init();
});