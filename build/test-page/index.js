if (window.origin !== 'https://rhoinc.github.io') {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '../raveXplorer.js';
  head.appendChild(script);
}


d3.csv(
  'rx_DataPage.csv',
  function(error, data) {
    if (error)
      console.log(error);

    var settings = {};
    var instance = raveXplorer(
      '#container',
      settings
    );
    instance.init(data);
  }
);
