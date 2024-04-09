!function(t,i){"function"==typeof define&&define.amd?define(["jquery"],i):"object"==typeof exports?module.exports=i(require("jquery")):t.lightbox=i(t.jQuery)}(this,function(l){function t(t){this.album=[],this.currentImageIndex=void 0,this.init(),this.options=l.extend({},this.constructor.defaults),this.option(t)}return t.defaults={albumLabel:"Image %1 of %2",alwaysShowNavOnTouchDevices:!1,fadeDuration:600,fitImagesInViewport:!0,imageFadeDuration:600,positionFromTop:50,resizeDuration:700,showImageNumberLabel:!0,wrapAround:!1,disableScrolling:!1,sanitizeTitle:!1},t.prototype.option=function(t){l.extend(this.options,t)},t.prototype.imageCountLabel=function(t,i){return this.options.albumLabel.replace(/%1/g,t).replace(/%2/g,i)},t.prototype.init=function(){var t=this;l(document).ready(function(){t.enable(),t.build()})},t.prototype.enable=function(){var i=this;l("body").on("click","a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",function(t){return i.start(l(t.currentTarget)),!1})},t.prototype.build=function(){var i;0<l("#lightbox").length||(i=this,l('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(l("body")),this.$lightbox=l("#lightbox"),this.$overlay=l("#lightboxOverlay"),this.$outerContainer=this.$lightbox.find(".lb-outerContainer"),this.$container=this.$lightbox.find(".lb-container"),this.$image=this.$lightbox.find(".lb-image"),this.$nav=this.$lightbox.find(".lb-nav"),this.containerPadding={top:parseInt(this.$container.css("padding-top"),10),right:parseInt(this.$container.css("padding-right"),10),bottom:parseInt(this.$container.css("padding-bottom"),10),left:parseInt(this.$container.css("padding-left"),10)},this.imageBorderWidth={top:parseInt(this.$image.css("border-top-width"),10),right:parseInt(this.$image.css("border-right-width"),10),bottom:parseInt(this.$image.css("border-bottom-width"),10),left:parseInt(this.$image.css("border-left-width"),10)},this.$overlay.hide().on("click",function(){return i.end(),!1}),this.$lightbox.hide().on("click",function(t){return"lightbox"===l(t.target).attr("id")&&i.end(),!1}),this.$outerContainer.on("click",function(t){return"lightbox"===l(t.target).attr("id")&&i.end(),!1}),this.$lightbox.find(".lb-prev").on("click",function(){return 0===i.currentImageIndex?i.changeImage(i.album.length-1):i.changeImage(i.currentImageIndex-1),!1}),this.$lightbox.find(".lb-next").on("click",function(){return i.currentImageIndex===i.album.length-1?i.changeImage(0):i.changeImage(i.currentImageIndex+1),!1}),this.$nav.on("mousedown",function(t){3===t.which&&(i.$nav.css("pointer-events","none"),i.$lightbox.one("contextmenu",function(){setTimeout(function(){this.$nav.css("pointer-events","auto")}.bind(i),0)}))}),this.$lightbox.find(".lb-loader, .lb-close").on("click",function(){return i.end(),!1}))},t.prototype.start=function(t){var i=this,e=l(window);e.on("resize",l.proxy(this.sizeOverlay,this)),l("select, object, embed").css({visibility:"hidden"}),this.sizeOverlay(),this.album=[];var n=0;function a(t){i.album.push({alt:t.attr("data-alt"),link:t.attr("href"),title:t.attr("data-title")||t.attr("title")})}var o,s=t.attr("data-lightbox");if(s){o=l(t.prop("tagName")+'[data-lightbox="'+s+'"]');for(var r=0;r<o.length;r=++r)a(l(o[r])),o[r]===t[0]&&(n=r)}else if("lightbox"===t.attr("rel"))a(t);else{o=l(t.prop("tagName")+'[rel="'+t.attr("rel")+'"]');for(var h=0;h<o.length;h=++h)a(l(o[h])),o[h]===t[0]&&(n=h)}s=e.scrollTop()+this.options.positionFromTop,e=e.scrollLeft();this.$lightbox.css({top:s+"px",left:e+"px"}).fadeIn(this.options.fadeDuration),this.options.disableScrolling&&l("html").addClass("lb-disable-scrolling"),this.changeImage(n)},t.prototype.changeImage=function(a){var o=this;this.disableKeyboardNav();var s=this.$lightbox.find(".lb-image");this.$overlay.fadeIn(this.options.fadeDuration),l(".lb-loader").fadeIn("slow"),this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(),this.$outerContainer.addClass("animating");var r=new Image;r.onload=function(){var t,i,e,n;s.attr({alt:o.album[a].alt,src:o.album[a].link}),l(r),s.width(r.width),s.height(r.height),o.options.fitImagesInViewport&&(n=l(window).width(),e=l(window).height(),n=n-o.containerPadding.left-o.containerPadding.right-o.imageBorderWidth.left-o.imageBorderWidth.right-20,e=e-o.containerPadding.top-o.containerPadding.bottom-o.imageBorderWidth.top-o.imageBorderWidth.bottom-120,o.options.maxWidth&&o.options.maxWidth<n&&(n=o.options.maxWidth),o.options.maxHeight&&o.options.maxHeight<n&&(e=o.options.maxHeight),(r.width>n||r.height>e)&&(r.width/n>r.height/e?(i=n,t=parseInt(r.height/(r.width/i),10)):(t=e,i=parseInt(r.width/(r.height/t),10)),s.width(i),s.height(t))),o.sizeContainer(s.width(),s.height())},r.src=this.album[a].link,this.currentImageIndex=a},t.prototype.sizeOverlay=function(){this.$overlay.width(l(document).width()).height(l(document).height())},t.prototype.sizeContainer=function(t,i){var e=this,n=this.$outerContainer.outerWidth(),a=this.$outerContainer.outerHeight(),o=t+this.containerPadding.left+this.containerPadding.right+this.imageBorderWidth.left+this.imageBorderWidth.right,s=i+this.containerPadding.top+this.containerPadding.bottom+this.imageBorderWidth.top+this.imageBorderWidth.bottom;function r(){e.$lightbox.find(".lb-dataContainer").width(o),e.$lightbox.find(".lb-prevLink").height(s),e.$lightbox.find(".lb-nextLink").height(s),e.showImage()}n!==o||a!==s?this.$outerContainer.animate({width:o,height:s},this.options.resizeDuration,"swing",function(){r()}):r()},t.prototype.showImage=function(){this.$lightbox.find(".lb-loader").stop(!0).hide(),this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration),this.updateNav(),this.updateDetails(),this.preloadNeighboringImages(),this.enableKeyboardNav()},t.prototype.updateNav=function(){var t=!1;try{document.createEvent("TouchEvent"),t=!!this.options.alwaysShowNavOnTouchDevices}catch(t){}this.$lightbox.find(".lb-nav").show(),1<this.album.length&&(this.options.wrapAround?(t&&this.$lightbox.find(".lb-prev, .lb-next").css("opacity","1"),this.$lightbox.find(".lb-prev, .lb-next").show()):(0<this.currentImageIndex&&(this.$lightbox.find(".lb-prev").show(),t&&this.$lightbox.find(".lb-prev").css("opacity","1")),this.currentImageIndex<this.album.length-1&&(this.$lightbox.find(".lb-next").show(),t&&this.$lightbox.find(".lb-next").css("opacity","1"))))},t.prototype.updateDetails=function(){var t,i=this;void 0!==this.album[this.currentImageIndex].title&&""!==this.album[this.currentImageIndex].title&&(t=this.$lightbox.find(".lb-caption"),this.options.sanitizeTitle?t.text(this.album[this.currentImageIndex].title):t.html(this.album[this.currentImageIndex].title),t.fadeIn("fast").find("a").on("click",function(t){void 0!==l(this).attr("target")?window.open(l(this).attr("href"),l(this).attr("target")):location.href=l(this).attr("href")})),1<this.album.length&&this.options.showImageNumberLabel?(t=this.imageCountLabel(this.currentImageIndex+1,this.album.length),this.$lightbox.find(".lb-number").text(t).fadeIn("fast")):this.$lightbox.find(".lb-number").hide(),this.$outerContainer.removeClass("animating"),this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration,function(){return i.sizeOverlay()})},t.prototype.preloadNeighboringImages=function(){this.album.length>this.currentImageIndex+1&&((new Image).src=this.album[this.currentImageIndex+1].link),0<this.currentImageIndex&&((new Image).src=this.album[this.currentImageIndex-1].link)},t.prototype.enableKeyboardNav=function(){l(document).on("keyup.keyboard",l.proxy(this.keyboardAction,this))},t.prototype.disableKeyboardNav=function(){l(document).off(".keyboard")},t.prototype.keyboardAction=function(t){var i=t.keyCode,t=String.fromCharCode(i).toLowerCase();27===i||t.match(/x|o|c/)?this.end():"p"===t||37===i?0!==this.currentImageIndex?this.changeImage(this.currentImageIndex-1):this.options.wrapAround&&1<this.album.length&&this.changeImage(this.album.length-1):"n"!==t&&39!==i||(this.currentImageIndex!==this.album.length-1?this.changeImage(this.currentImageIndex+1):this.options.wrapAround&&1<this.album.length&&this.changeImage(0))},t.prototype.end=function(){this.disableKeyboardNav(),l(window).off("resize",this.sizeOverlay),this.$lightbox.fadeOut(this.options.fadeDuration),this.$overlay.fadeOut(this.options.fadeDuration),l("select, object, embed").css({visibility:"visible"}),this.options.disableScrolling&&l("html").removeClass("lb-disable-scrolling")},new t});