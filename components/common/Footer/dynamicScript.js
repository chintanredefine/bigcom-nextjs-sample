import $ from 'jquery'

const dynamicScript = () => {
  console.log('hey there this is me , dynamic script')
  $('.sticky-link a').on('click', function () {
    var aa = $(this).attr('title')

    console.log('$(aa)', aa)

    if ($(window).width() < 767) {
      $('html, body').animate(
        {
          scrollTop: $(aa).offset().top - 100,
        },
        0
      )
    } else {
      console.log('$(aa).offset().top', $(aa).offset().top)

      $('html, body').animate(
        {
          scrollTop: $(aa).offset().top - 200,
        },
        0
      )
    }
  })
}

export default dynamicScript
