$(function() {
	var windowHeight;
	var menuHeight;
	var menuWidth;
	var menuTop;
	var scrollPosition;
	var isSticky = false;
	var difficultyLevel = 'beginner';

	function setWindowHeight()
	{
		windowHeight = $(window).height();
	}

	function setMenuHeight()
	{
		menuHeight = $('#documentation-sidebar').height();
	}

	function setMenuWidth()
	{
		menuWidth = $('#documentation-sidebar').width();
	}

	function setMenuTop()
	{
		var _offset = $('#documentation-sidebar').offset();

		menuTop = _offset.top;
	}

	function setScrollPosition()
	{
		scrollPosition = $(window).scrollTop();
	}

	function applySticky()
	{
		isSticky = true;

		var _classes = $('#documentation-sidebar').attr('class');
		var _shim = $('<div id="documentation-sidebar-shim">').addClass(_classes);

		_shim.removeClass('sticky');

		var _position = ((menuHeight + menuTop) > windowHeight) ? -menuHeight + windowHeight : menuTop;

		$('#documentation-sidebar').addClass('sticky').css({
			width : menuWidth,
			top   : _position
		});
		$('#documentation-sidebar').before(_shim);
	}

	function removeSticky()
	{
		isSticky = false;

		$('#documentation-sidebar')
			.removeClass('sticky')
			.css({
				width: null,
				top: 'auto',
			});
		$('#documentation-sidebar-shim').remove();
	}

	function calculateSidebarState()
	{
		if ((menuHeight + menuTop) - windowHeight < scrollPosition) {
			if (!isSticky) {
				applySticky();
			}
		} else {
			if (isSticky) {
				removeSticky();
			}
		}
	}

	function setDifficultyCookie(difficulty)
	{
		$.cookie("difficulty", difficulty, { expires : 10 });
	}

	function setDifficulty(difficulty)
	{
		if (typeof difficulty == 'undefined') {
			difficulty = 'beginner';
		}

		setDifficultyCookie(difficulty);

		$('.difficulty').removeClass('btn-success');
		$('#' + difficulty + '-btn').addClass('btn-success');

		if (difficulty !== 'all') {
			$('.beginner, .advanced').css('display', 'none');
			$('.' + difficulty).css('display', 'block');
		} else {
			$('.beginner, .advanced').css('display', 'block');
		}
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
		setMenuHeight();
		setMenuWidth();
		setScrollPosition();
		setMenuTop();

		windowResizeListener();
		windowScrollListener();
		difficultyListener();

		calculateSidebarState();
		getDifficultyCookie();
	}

	init();
});