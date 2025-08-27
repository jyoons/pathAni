const NX_UI = function(nx){
  nx.init = function() {
    nx.nav.init()
  }
  nx.nav = {
    init:function(){
      this._setEvent();
    },
    _setEvent:function(){
      var elem1 = '.navList>li'
      var elem2 ='.navList .nav-dep1, .navList .nav-dep2'
     $(document).on('mouseenter mouseleave', elem1, function(e){
        if(e.type === 'mouseenter') {
          $(this).find('.nav-dep1').addClass('active');
        }else if(e.type === 'mouseleave'){
          $(this).find('.nav-dep1').removeClass('active');
        }
      });
     $(document).on("click", elem2, function(){
        var flag = $(this).parents('li').find('.nav-dep2-list').length;
        if(flag === 0 || $(this).hasClass('nav-dep2')) {
          $(elem1).removeClass('active');
          $(this).closest('.navList').find('li').removeClass('active');
          $(this).parents('li').addClass('active');
        }
      });
    }
  },
  nx.init();
  return nx;
}(window.NX_UI || {}, jQuery);