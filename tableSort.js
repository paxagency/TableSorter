
var page = {
init: function() {
page.set();
},
set: function (){
  $("#list").sortable();
  $(".drag").sortable({
	connectWith: ".drag",
	stop: function( event, ui ) {
	  $('#list').removeClass('show');
	  $(ui.item).removeClass('dragging');
	  page.clean();
	},
	start: function(event, ui) {
	  page.activeSet(ui.item);
	  $('#list').addClass('show');
	  $(ui.item).addClass('dragging');
	},
	placeholder: "placeholder",
	cursorAt: {left: 100,top:30}
  }).disableSelection();
  page.tdSet();
},
tdSet:function(){
  $(".drag").find('td').off().on('click',function(e){
	  page.activeSet(this)
  })
},
clean: function (){
	$('#list > li').each(function(){
		if(!$.trim($(this).find('tr').html()).length) $(this).remove();
	})
	$('#list > li').each(function(){
		$(this).after("<li><table><tr class='drag'></tr></table></li>");
	})
	$('#list').prepend("<li><table><tr class='drag'></tr></table></li>");
	page.set();
 },
 add:function (type) {
	var html = '<label>Label</label>';
	if($('td.active').length){
	  var li = $('td.active').parent().parent().parent().parent();
	  page.activeSet();
	  $(li).after("<li><table><tr class='drag'><td  class='active'>"+html+"</td></tr></table></li>");
	} else {
	  page.activeSet();
	  $('#list').append("<li><table><tr class='drag'><td class='active'>"+html+"</td></tr></table></li>");
	}
	page.set();
  },
  detach: function (){
	  var t = $('td.active');
	  var count = $(t).parent().children('td').length;
	  if(count>1) {
		 var html = $(t).html();
		 var classes = $(t).attr('class');
		 var li = $(t).parent().parent().parent().parent();
			$(li).after("<li><table><tr class='drag'><td class='"+classes+"'>"+html+"</td></tr></table></li>");
			$(t).remove();
		  page.set();
		}
  },
  remove: function(){
	var td = $('td.active');
	var tr = $(td).parent();
	var count = $(td).parent().children('td').length;
	if($(td).length){
		$(td).remove();
		if(count>1) {
		  $(tr).find('td:first-child').addClass('active')
		} else {
		  $('#list').find('td').first().addClass('active')
		}
		page.clean();
	}
  },
  activeSet(t){
	  $('td').removeClass('active');
	  if(t) $(t).addClass('active')
  }
}
$(page.init);

