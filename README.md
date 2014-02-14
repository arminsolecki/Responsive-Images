#Responsive images
Responsive image technique that can be easily implemented into any back-end image processors like `Umbraco ImageGen`, `ImageMagik` etc. The only requirement is that back-end image processor API that accepts widths as URL setting.

##Demo
[Responsive Images Demo](http://arminsolecki.github.io/Responsive-Images/)

##Sample usage
###HTML
```HTML
<noscript data-rspimg="http://lorempixel.com/{0}/200/city/">
    <img src="http://lorempixel.com/400/200/city/" alt="" />
</noscript>
```

No script will ensure that no images will be downloaded before JS will calculate the required image width. (Many responsive images techniques download low quality image first and then replace it high quality image, but this is an unnecessary waste of bandwidth and HTTP request)

+ `data-rspimg="url to image proccesing API"` - url to Image Processing API where `{width}` is the width settings that will be used i.e. `http://lorempixel.com/{width}/200/city/`

###JavaScript
```
$(document).ready(function(){
    $('[data-rspimg]').responsiveImages();
});
```

## Options
`$('[data-rspimg]').responsiveImages({widthSyntax: "{width}", step: 100, maxSize: 1000});`

+ `widthSyntax`: `string` - width syntax used by Image Processing API
+ `step`: `int` - calculations will round to the nearest 100 pixels by default (back-end caching vs accuracy trade-off)
+ `maxSize`: `int` - maximum image size that can be requested

##Some URL implementations
+ `/ImageGen.ashx?image=/testimage.jpg&width={width}`
+ `http://placehold.it/{width}x200`
+ `http://lorempixel.com/{width}/200`

##Browser Support
Tested using the following browsers/devices:

+ Latest desktop versions of Chrome, Firefox and Safari.
+ Internet Explorer 8 and above.
+ Android 4.4 (Google Chrome)
+ iOS 6.0 7.0 (Mobile Safari and Google Chrome)

##Dependencies
[jQuery](http://jquery.com/)
