	//http://demo.solemone.de/overflow-image-with-vertical-centering-for-responsive-web-design/
	$(document).ready(function() {
 
    var imageHeight, wrapperHeight, overlap, container = $('.image-wrap');  
 
    function centerImage() {
        imageHeight = container.find('img').height();
        wrapperHeight = container.height();
        overlap = (wrapperHeight - imageHeight) / 2;
        container.find('img').css('margin-top', overlap);
    }
     
    $(window).on("load resize", centerImage);
 
});