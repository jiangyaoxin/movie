$(document).ready(function() {
  var links = $('.nav>li').find('a');
  var index = 0;
  var url = document.location.href.split('?')[0].split('/').pop();
　if(url) {
    for (var i=links.length; i--;) {
      if(links[i].href.indexOf(url) !== -1){
          index = i;
          break;
      }
    }
　}
  $('.nav>li').eq(index).addClass('active');
})