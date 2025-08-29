const PUB_ONLY = function(pub){
  pub.devExpressCalendar = function (opts) {
    DevExpress.localization.locale('ko');
    opts = opts || {};
    var fromSel   = opts.fromSel   || '#from-selected-date';
    var toSel     = opts.toSel     || '#to-selected-date';
    var periodSel = opts.periodSel || '.periodSet-btns>button';
    var displayFormat = opts.displayFormat || 'yyyy-MM-dd';
    var startOfDay = function (d) { var x = new Date(d); x.setHours(0,0,0,0); return x; };
    var endOfDay   = function (d) { var x = new Date(d); x.setHours(23,59,59,999); return x; };
    var addDays    = function (d,n){ var x=new Date(d); x.setDate(x.getDate()+n); return x; };
    var addMonths  = function (d,n){
      var x=new Date(d), day=x.getDate();
      x.setMonth(x.getMonth()+n);
      if (x.getDate()<day) x.setDate(0);
      return x;
    };
    var today = new Date();
    var selectedDate1 = $(fromSel).dxDateBox({
      type: 'date',
      value: startOfDay(today),
      displayFormat: displayFormat,                         
      onValueChanged: function (e) {
        var from = new Date(e.value);
        var to = new Date(selectedDate2.option('value'));
        if (from > to) selectedDate2.option('value', endOfDay(from));
      }
    }).dxDateBox('instance');
    var selectedDate2 = $(toSel).dxDateBox({
      type: 'date',
      value: endOfDay(today),
      displayFormat: displayFormat,
      onValueChanged: function (e) {
        var to = new Date(e.value);
        var from = new Date(selectedDate1.option('value'));
        if (to < from) selectedDate1.option('value', startOfDay(to));
      }
    }).dxDateBox('instance');
    $(document).off('click.chart1Period', periodSel).on('click.chart1Period', periodSel, function () {
        var dataVal = $(this).attr('data-search-flag');
        var now = new Date();
        var toDate = new Date(selectedDate2.option('value')) || new Date();
        var fromDate = new Date(toDate);
        var $btns = $(this).closest('.periodSet-btns');
        $btns.find('button').removeClass('active');
        $(this).addClass('active');
        switch (dataVal) {
          case 'D':
            toDate = new Date();
            fromDate = startOfDay(toDate);
            toDate   = endOfDay(toDate);
            break;
          case 'Y':
            var y = addDays(now, -1);
            fromDate = startOfDay(y);
            toDate   = endOfDay(y);
            break;
          case 'W':
            fromDate = startOfDay(addDays(toDate, -6));
            toDate   = endOfDay(toDate);
            break;
          case 'M':
            fromDate = startOfDay(addMonths(toDate, -1));
            toDate   = endOfDay(toDate);
            break;
          default:
            fromDate = startOfDay(fromDate);
            toDate   = endOfDay(toDate);
        }
        selectedDate1.option('value', fromDate);
        selectedDate2.option('value', toDate);
      });
      var $defaultBtn = $(periodSel + '[data-search-flag="D"]').first();
      if ($defaultBtn.length) $defaultBtn.trigger('click');
    return { from: selectedDate1, to: selectedDate2 };
  }
 
  return pub;
}(window.PUB_ONLY || {}, jQuery);