;( function( $ ) {

	$( '.magnific-video' ).magnificPopup({
		type: 'iframe'
	});

	hljs.initHighlightingOnLoad();

	$('code').each(function(i, block) {
	  hljs.highlightBlock(block);
	});

} )( jQuery );
