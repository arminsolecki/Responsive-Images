/**
 * jQuery Responsive Images
 * @author Armin Solecki
 * Responsive image technique that can be easily implemented into any back-end image processors like "Umbraco ImageGen", "ImageMagik" etc.
 **/
(function($){
    $.responsiveImages = function(el, options){
        var self = this;
        
        // Access to jQuery and DOM versions of element
        self.$el = $(el);
        self.el = el;
        
        // Add a reverse reference to the DOM object
        self.$el.data("responsiveImages", self);
        
        self.init = function () {
            self.options = $.extend({}, $.responsiveImages.defaultOptions, options);
        
            var $this = self.$el,
                imageSrc = $this.attr('data-rspimg'),
                imageRel = $this.attr('data-rspimg-rel'),
                imageClass = $this.attr('data-rspimg-class'),
                imageWidth = $this.parent().width(),
                step = self.options.step,
                maxSize = self.options.maxSize,
                requestSize = Math.ceil(imageWidth / step) * step;
            
            if (requestSize > maxSize) {
                requestSize = maxSize;
            }

            // create image url
            var imageUrl;
            if(imageSrc.indexOf(self.options.widthSyntax) >= 0){
                imageUrl = imageSrc.replace(self.options.widthSyntax, requestSize);
            }else{
                imageUrl = imageSrc + '&width=' + requestSize;
            }

            //ie8/7 needs this (pre load)
            var imgS = new Image();
            imgS.src = imageUrl;
            
            // create img
            var img = $('<img>');
            if (imageRel) {
                img.attr('rel', imageRel);
            }
            if (imageClass) {
                img.attr('class', imageClass);
            }
            
            img.attr('src', imageUrl);
            $this.before(img);
            $this.remove();
        };
                
        // Run initializer
        self.init();
    };
    
    $.responsiveImages.defaultOptions = {
        widthSyntax: "{width}", // width syntaxt used in Image Processing API
        step: 100, // calculations will round to the nearest 100 pixels by default (back-end caching vs accurancy tradeoff)
        maxSize: 1000 //maximum image size that can be requested
    };
    
    $.fn.responsiveImages = function(options){
        return this.each(function(){
            (new $.responsiveImages(this, options));
        });
    };
    
})(jQuery);