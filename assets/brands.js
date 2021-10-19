

$(document).ready(function(e) {
		$('.brand_list li a').each(function() {
			var getLetter = $(this).text();
				getLetter = $.trim(getLetter).charAt(0).toUpperCase();
			$(this).parent().attr({'data-sort':getLetter});
			var getName = $(this).text();
				getName = getName.toLowerCase();
			$(this).parent().attr({'data-name':getName});
		});

		$('.brand_list li').sort(asc_sort).appendTo('.brand_list');
		// accending sort
		function asc_sort(a, b){
			return ($(b).attr('data-name')) < ($(a).attr('data-name')) ? 1 : -1;
		}
		// decending sort
		function dec_sort(a, b){
			return ($(b).attr('data-name')) > ($(a).attr('data-name')) ? 1 : -1;
		}
		var classes = [];
		$('.brand_list li a').each(function() {
			var getLetter = $(this).text();
				getLetter = $.trim(getLetter).charAt(0).toUpperCase();
			//var letrUnq = $.unique(getLetter)

			classes.push(getLetter);
			if(!$('li[data-letter="'+getLetter+'"]').length){
			var lisAdd = $('<li class="pagination-item" data-letter="'+getLetter+'"><a class="pagination-link" href="#brand-'+getLetter+'" data-filter="'+getLetter+'">'+getLetter+'</a></li>');
			}
			$('.filter_list ul').append(lisAdd);

			if(!$('li[id="brand-'+getLetter+'"]').length){
				$('<li class="brand-anchor" id="brand-'+getLetter+'"><span>'+getLetter+'</span></li>').insertBefore('li[data-sort="'+getLetter+'"]:eq(0)');
				$('li[data-sort="'+getLetter+'"]').wrapAll('<ul class="brandUL brand-'+getLetter+'" />')
			}
		});

		$('.brand-anchor').each(function() {
			var getUL = $(this).next('ul.brandUL');
			//$(this).append($(getUL));
		});
		//$(document).on('click','.filter_list a',function(e){
		$('.filter_list a').click(function(e){

		});
	});
	$(document).ready(function(){
	  $('a.pagination-link[href*="#"]').on('click', function(event) {
		if (this.hash !== "") {
		  event.preventDefault();
		  var hash = this.hash;
		  if ($(window).width() <= 801) {
		  $('html, body').animate({
			scrollTop: $(hash).offset().top - 70
		  }, 800, function(){
			//window.location.hash = hash;
		  });
		  }
		  else{$('html, body').animate({
			scrollTop: $(hash).offset().top - 80
		  }, 800, function(){
			//window.location.hash = hash;
		  });}
		}
	  });
	  $(document).ready(function(e) {
		$('.pagination-item.SearchIcon .pagination-link').click(function(e) {
			$('.pagination-item.SearchIcon .pagination-link').toggleClass("Cancel");
			$('.SearchBrandWrap').slideToggle();
		});
		$('.pagination-item.SearchIcon .pagination-link').click(function() {
			 $('#BrandSearchInput').focus();
		});
	});

	  var input = document.getElementById("BrandSearchInput");

var awesomplete = new Awesomplete(input, {
  minChars: 2,
  maxItems: 100,
  autoFirst: false
});

var listAry = [];
var index = 1;
$('li.SearchBrandItem').each(function() {
   var $getAtag = $(this).find('a');
   var getProCode = $getAtag.attr('href');
   var getProName = $getAtag.text();

   item = {}
   item['name'] = getProName;
   item['url'] = getProCode;
   listAry.push(item);

   index++;
});

$("input").on("keyup", function(){
   var data = listAry;
    var list = [];
    $.each(data, function(key, value) {
      var getVal = value.name;
      var   key = value.url;
      //var newLi = '<a href="'+getImg+'">'+getVal+'</a>';
      var newLi = getVal;
        list.push({ label: key, value: getVal });
      //list[key] = getVal;
    });
   //console.log(list)
    awesomplete.list = list;
});
	});

	if ($(window).width() > 800) {
		$(window).scroll(function(){
		  var sticky = $('.sticky'),
			  scroll = $(window).scrollTop();

		  if (scroll >= 500) sticky.addClass('fixed');
		  else sticky.removeClass('fixed');
		  $('.filter_list.sticky.fixed').slide('slow');
		});
	}


	

$(document).on('click','#awesomplete_list_1 li',function(e){
   e.preventDefault();
   var getUrl = $(this).attr('data-url');
   window.location.href = getUrl;
});