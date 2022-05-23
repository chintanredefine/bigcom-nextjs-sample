import $ from 'jquery'

const dynamicScript = () => {
  $(function() {
    function onScroll(event) {
      var scrollPos = $(document).scrollTop()
      $('.sticky-link a').each(function () {
        //alert("test");
        var currLink = $(this)
        var refElement = $(currLink.attr('href'))
        if (
          refElement.position().top <= scrollPos &&
          refElement.position().top + refElement.height() > scrollPos
        ) {
          $('.sticky-link ul li a').removeClass('active')
          currLink.addClass('active')
        } else {
          currLink.removeClass('active')
        }
      })
    }

    $(document).on('scroll', onScroll)

    //smoothscroll
    $('.sticky-link a[href^="#"]').on('click', function (e) {
      //  e.preventDefault();
      $(document).off('scroll')

      $('.sticky-link a').each(function () {
        $(this).removeClass('active')
      })
      $(this).addClass('active')

      var target = this.hash,
        menu = target
      $target = $(target)
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top - 50,
          },
          500,
          'swing',
          function () {
            window.location.hash = target
            $(document).on('scroll', onScroll)
          }
        )
    })
  })

  
}

export default dynamicScript
