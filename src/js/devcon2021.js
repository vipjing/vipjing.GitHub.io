function processNavbar() {
  const hash = decodeURIComponent(location.hash)
  if (!hash) return

  const navItem = $('.navbar__item a').filter(function() {
    return $(this).attr('href') === hash
  })

  if (!navItem) return

  navItem.parent().addClass('active')
}

$(document).ready(function() {
  // auto active nav item with hash
  processNavbar()

  $('.navbar__item').click(function() {
    console.log('2021 click')
    $(this)
      .parent()
      .children('.navbar__item')
      .removeClass('active')

    $(this).addClass('active')
  })

  // handles devcon agenda talk title click, performing like collapse
  var selEle

  $('.detail-block').hide()

  $('.schedule-table .collapsable').click(function() {
    console.log(
      'schedule',
      $(this),
      $(this).next()[0].style,
      $(this).next()[0].style.display
    )
    if (selEle) {
      selEle.removeClass('selected-bg')
      selEle.children()[3].innerText = '+'
    }

    $(this).addClass('selected-bg')
    if ($(this).next()[0].style.display == 'none') {
      $('.detail-block').hide()
      $(this)
        .next()
        .show()
      $(this).children('td')[3].innerText = '-'
    } else {
      $(this)
        .next()
        .hide()
      $(this).removeClass('selected-bg')
      $(this).children('td')[3].innerText = '+'
    }

    selEle = $(this)
  })

  $('.date').click(function() {
    $('.date').removeClass('is-active')
    $(this).addClass('is-active')

    switch ($(this).hasClass('date1')) {
      case true:
        $('.day1').removeClass('hide-schedule')
        $('.day2').addClass('hide-schedule')

        break
      default:
        $('.day1').addClass('hide-schedule')
        $('.day2').removeClass('hide-schedule')
        break
    }
  })

  $('.notice-tab').click(function() {
    $('.tabContent').removeClass('is-active')
    $('.notice-tab').removeClass('is-active')
    $(this).addClass('is-active')
    $($('.content-list')[0].children[$(this).index()]).addClass('is-active')
  })

  $('.j-open-map-modal').click(function() {
    $('.j-map-overlay').fadeIn()
    $('.j-map-overlay, .modal').addClass('active')
  })

  $('.j-open-hotel-modal').click(function() {
    $('.j-hotel-overlay').fadeIn()
    $('.j-hotel-overlay, .modal').addClass('active')
  })

  $('.media img').click(function(event) {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      event.preventDefault()
    }
  })
})
