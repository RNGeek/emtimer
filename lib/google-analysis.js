window.ga =
  window.ga ||
  function () {
    (ga.q = ga.q || []).push(arguments);
  };
ga.l = +new Date();
ga('create', 'UA-44022285-5', 'auto');

ga('require', 'cleanUrlTracker', {
  stripQuery: false,
  indexFilename: 'index.html',
  trailingSlash: 'remove',
});
ga('require', 'eventTracker');
ga('require', 'outboundLinkTracker');
ga('require', 'pageVisibilityTracker');
ga('require', 'socialWidgetTracker');
ga('require', 'urlChangeTracker');
ga('send', 'pageview');
