/* Disqus Comment */
var atPost = atPost || {};
atPost.loadDisqus = function(post_id) {
    var disqus_identifier=post_id;
    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = '//' + fauxGhostConfig.disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
};
