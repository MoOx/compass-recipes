(function()
{
    window._gaq = [['_setAccount','UA-1716762-11'],['_trackPageview']];
    //
    var share = document.createElement('div');
     share.innerHTML = '' +
     //'<div id="fb-root"></div>' +
     '<div class="my-auto-share">Share the love ' +
         '<div class="my-auto-share-btn"><a class="twitter-share-button" data-count="none">Tweet</a></div>' +
         '<div class="my-auto-share-btn"><div class="g-plusone" data-size="medium" data-count="false"></div></div>' +
         //'<div class="my-auto-share-btn fb-like" data-send="false" data-width="50" data-show-faces="false"></div>' +
     '</div>';
     document.body.appendChild(share);
}());

(function(doc, script) {
    var js,
        fjs = doc.getElementsByTagName(script)[0],
        add = function(url, id) {
            if (doc.getElementById(id)) {return;}
            js = doc.createElement(script);
            js.src = url;
            id && (js.id = id);
            fjs.parentNode.insertBefore(js, fjs);
        };

    // Google Analytics
    add(('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js', 'ga');
    // Twitter SDK
    add('//platform.twitter.com/widgets.js', 'twitter-wjs');
    // Google+ button
    add('https://apis.google.com/js/plusone.js');
    // Facebook SDK
    //add('//connect.facebook.net/' + navigator.language.replace('-', '_') + '/all.js#xfbml=1&appId=null', 'facebook-jssdk');

}(document, 'script'));