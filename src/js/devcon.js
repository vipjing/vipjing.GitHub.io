// handles devcon page wethear display website navbar or not
function handleWebsiteNavDisplay() {
  var scrollVal = $(this).scrollTop(),
    h = $('header').height()

  if (scrollVal > 0 && $('.devcon-nav').length != 0) {
    $('header').hide()
    $('.devcon-nav').css('top', '0')
    $('.devCon').css('padding-top', h)
  } else if ($('.devcon-nav').length != 0) {
    $('header').show()
    $('.devcon-nav').css('top', h)
    $('.devCon').css('padding-top', 2 * h)
  }
}

// smoothly scrolls to specific section
function smoothScroll() {
  var btnName = $(this)[0].className
  var sectionName
  switch (btnName) {
    case 'schedule-btn':
      sectionName = '.agenda__section h1'
      break
    case 'instructor-btn':
      sectionName = '.instructors__section h1'
      break
    case 'contact-btn':
      sectionName = '.contact__section h1'
      break
    case 'signup-btn':
      sectionName = '.signup__section'
      break
  }

  // calculates devcon nav bar top padding
  var extraH = 0
  if (
    $('header').length &&
    !$('header').is(':hidden') &&
    $('.devcon-nav').length != 0
  ) {
    extraH = 2 * $('header').height()
  } else {
    extraH = $('header').height()
  }
  $('html, body').animate(
    {
      scrollTop: $(sectionName).offset().top - extraH,
    },
    1000
  )
}

// handles positions of devcon navbar and website navbar when resize window
function handleWindowResize() {
  // calculates devcon nav bar height
  var header_H = $('header').height()
  if (
    $('header').length &&
    !$('header').is(':hidden') &&
    $('.devcon-nav').length != 0
  ) {
    $('.devcon-nav').css('top', header_H)
    $('.devcon-nav').css('height', header_H)
    $('.devCon').css('padding-top', 2 * header_H)
  } else {
    $('.devcon-nav').css('top', 0)
    $('.devcon-nav').css('height', header_H)
  }

  // calculate architecture buttons positions
  var w = $('.architecture img').width()
  if (window.matchMedia('(max-width: 360px)').matches) {
    var h = w * 0.47
    var vertical_line_H_rattio = 0.11
  } else if (window.matchMedia('(max-width: 700px)').matches) {
    var h = w * 0.51
    var vertical_line_H_rattio = 0.11
  } else {
    var h = w / 3.17
    var vertical_line_H_rattio = 0.18
  }

  var paddingR = parseInt($('.architecture').css('padding-right'))
  var paddingL = parseInt($('.architecture').css('padding-left'))
  var paddingT = parseInt($('.architecture').css('padding-top'))
  var paddingB = parseInt($('.architecture').css('padding-bottom'))

  $('.head-node').css(
    'top',
    paddingT -
      $('.head-node').height() -
      2 * parseInt($('.head-node').css('padding-top'))
  )

  $('.head-node').css(
    'margin-left',
    -(
      $('.head-node').width() +
      2 * parseInt($('.head-node').css('padding-left'))
    ) / 2
  )

  $('.developer-group').css('top', h * vertical_line_H_rattio * 2 + paddingT)
  $('.developer-group').css(
    'margin-left',
    -(
      $('.developer-group').width() +
      2 * parseInt($('.developer-group').css('padding-left'))
    ) / 2
  )

  $('.pmc').css('top', h * vertical_line_H_rattio * 2 + paddingT)
  $('.pmc').css(
    'left',
    paddingL -
      ($('.pmc').width() +
        parseInt($('.pmc').css('padding-left')) +
        parseInt($('.pmc').css('padding-right'))) /
        2
  )

  $('.committee').css('top', h * vertical_line_H_rattio * 2 + paddingT)
  $('.committee').css(
    'margin-right',
    paddingR -
      ($('.committee').width() +
        parseInt($('.committee').css('padding-left')) +
        parseInt($('.committee').css('padding-right'))) /
        2
  )

  $('.maintainer').css('top', paddingT + h)

  $('.maintainer').css(
    'margin-left',
    paddingL -
      ($('.maintainer').width() +
        parseInt($('.maintainer').css('padding-left')) +
        parseInt($('.maintainer').css('padding-right'))) /
        2
  )

  $('.committer').css('top', paddingT + h)

  $('.committer').css(
    'margin-left',
    paddingL +
      w / 3 -
      ($('.committer').width() +
        parseInt($('.committer').css('padding-left')) +
        parseInt($('.committer').css('padding-right'))) /
        2
  )

  $('.contributor').css('top', paddingT + h)
  $('.contributor').css(
    'margin-right',
    paddingR +
      w / 3 -
      ($('.contributor').width() +
        parseInt($('.contributor').css('padding-left')) +
        parseInt($('.contributor').css('padding-right'))) /
        2
  )

  $('.member').css('top', paddingT + h)
  $('.member').css(
    'margin-right',
    paddingR -
      ($('.member').width() +
        parseInt($('.member').css('padding-left')) +
        parseInt($('.member').css('padding-right'))) /
        2
  )
}

// handle pr-content collapse
function handlePRConCollapse() {
  if ($('.guide-content').css('display') == 'block') {
    $('.subtitle-guide').removeClass('subtitle-selected-bg')
    $('.guide-content').hide()
    $('#guide-collapse')[0].innerText = '+'
  }

  if ($('.pr-content').css('display') == 'block') {
    $('.subtitle-pr').removeClass('subtitle-selected-bg')
    $('.pr-content').hide()
    $('#pr-collapse')[0].innerText = '+'
  } else {
    $('.subtitle-pr').addClass('subtitle-selected-bg')
    $('.pr-content').show()
    $('#pr-collapse')[0].innerText = '-'
  }
}

// handle guide-content collapse
function handleGuideConCollapse() {
  if ($('.pr-content').css('display') == 'block') {
    $('.subtitle-pr').removeClass('subtitle-selected-bg')
    $('.pr-content').hide()
    $('#pr-collapse')[0].innerText = '+'
  }

  if ($('.guide-content').css('display') == 'block') {
    $('.subtitle-guide').removeClass('subtitle-selected-bg')
    $('.guide-content').hide()
    $('#guide-collapse')[0].innerText = '+'
  } else {
    $('.subtitle-guide').addClass('subtitle-selected-bg')
    $('.guide-content').show()
    $('#guide-collapse')[0].innerText = '-'
  }
}

// users cannot register meetup if the time passes 10PM of the day before meetup-date
function processMeetupDate() {
  $('.swiper-slide').each(function() {
    const $this = $(this)
    var meetup_date = $this.find('.meetup-date')[0]
    var endTime =
      new Date(meetup_date.innerText).setHours(0, 0, 0, 0) - 60 * 60 * 1000 * 5
    if (
      endTime < new Date() &&
      $this.find('.meetup-register')[0].innerText !== '活动回顾'
    ) {
      $this.find('a')[0].removeAttribute('href')
      $this.find('.meetup-register').text('报名结束')
      $this.find('.meetup-register').addClass('unclickable-btn')
    }
  })
}

$(document).ready(function() {
  // scrolls to specific section smoothly
  const hash = decodeURIComponent(location.hash)
  var extraH_contributor
  var extraH_arch
  if (window.matchMedia('(max-width: 500px)').matches) {
    extraH_contributor = 60
    extraH_arch = 60
  } else {
    extraH_contributor = 250
    extraH_arch = 60
  }
  if (hash) {
    if (hash == '#contributor') {
      $('html, body').animate(
        {
          scrollTop:
            $('.contributor__detail').offset().top - extraH_contributor,
        },
        1000
      )
    } else if (hash == '#committer') {
      $('html, body').animate(
        {
          scrollTop: $('.committer__detail').offset().top - extraH_contributor,
        },
        1000
      )
    } else if (hash == '#architecture') {
      $('html, body').animate(
        {
          scrollTop:
            $('.organization__section .section-title').offset().top -
            extraH_arch,
        },
        1000
      )
    }
  }

  if ($('.meetup-landing-page-banner').length) processMeetupDate()

  // sets devcon navbar and devcon container position
  if ($('header').length && $('.devcon-nav').length != 0) {
    var header_H = $('header').height()
    $('.devcon-nav').css('top', header_H)
    $('.devcon-nav').css('height', header_H)
    $('.devCon').css('padding-top', 2 * header_H)
  }

  $('.detail-block').hide()

  handleWindowResize()

  // handles window scroll
  $(window).scroll(handleWebsiteNavDisplay)

  // handles window resize
  $(window).resize(handleWindowResize)

  // scrolls to specific section smoothly
  $('.schedule-btn').click(smoothScroll)

  $('.instructor-btn').click(smoothScroll)

  $('.contact-btn').click(smoothScroll)

  $('.signup-btn').click(smoothScroll)

  $('.instructor').click(function() {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      $('.intro').css('opacity', '0')
      var el = $(this)
        .find('.intro')
        .css('opacity', '1')
    }
  })

  $('.team').click(function() {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      $('.middle-overlay').css('opacity', '0')
      $('.middle-cover').css('opacity', '1')
      $('.award-info').css('opacity', '1')
      var el = $(this)
        .find('.middle-overlay')
        .css('opacity', '1')

      var el2 = $(this)
        .find('.middle-cover, .award-info')
        .css('opacity', 0)
    }
  })

  $('.project').click(function() {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      $('.project-desc').css('opacity', '0')
      var el = $(this)
        .find('.project-desc')
        .css('opacity', '1')
    }
  })

  $('.section-burger').click(function() {
    if ($('.dropdown-btns').css('display') == 'block') {
      $('.dropdown-btns').css('display', 'none')
    } else {
      $('.dropdown-btns').css('display', 'block')
    }
  })

  // handles devcon agenda talk title click, performing like collapse
  var selEle

  $('.agenda__table .collapsable').click(function() {
    if (window.matchMedia('(min-width: 550px)').matches) {
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
    }
  })

  $('.schedule-table .collapsable').click(function() {
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
        $('.switch-date-btn').addClass('date2')
        $('.switch-date-btn').removeClass('date1')

        if ($('.devCon-cn').length > 0) {
          $('.switch-date-btn')[0].innerText = 'DAY2 日程'
        } else {
          $('.switch-date-btn')[0].innerText = 'DAY2 Schedule'
        }

        break
      default:
        $('.day1').addClass('hide-schedule')
        $('.day2').removeClass('hide-schedule')
        $('.switch-date-btn').addClass('date1')
        $('.switch-date-btn').removeClass('date2')

        if ($('.devCon-cn').length > 0) {

          $('.switch-date-btn')[0].innerText = 'DAY1 日程'
        } else {
          $('.switch-date-btn')[0].innerText = 'DAY1 Schedule'
        }
        break
    }
  })

  $('.switch-date-btn').click(function() {
    $('.date').removeClass('is-active')
    $('html, body').animate(
      {
        scrollTop: $('#dc20-agenda-table').offset().top,
      },
      1000
    )
    switch ($(this).hasClass('date1')) {
      case true:
        $('.date1').addClass('is-active')
        $('.day1').removeClass('hide-schedule')
        $('.day2').addClass('hide-schedule')
        $(this).removeClass('date1')
        $(this).addClass('date2')
        if ($('.devCon-cn').length > 0) {
          $(this)[0].innerText = 'DAY2 日程'
        } else {
          $('.switch-date-btn')[0].innerText = 'DAY2 Schedule'
        }
        break
      default:
        $('.date2').addClass('is-active')
        $('.day1').addClass('hide-schedule')
        $('.day2').removeClass('hide-schedule')
        $(this).removeClass('date2')
        $(this).addClass('date1')
        if ($('.devCon-cn').length > 0) {
          $(this)[0].innerText = 'DAY1 日程'
        } else {
          $('.switch-date-btn')[0].innerText = 'DAY1 Schedule'
        }
        break
    }
  })

  $('.subtitle-pr').click(handlePRConCollapse)

  $('.subtitle-guide').click(handleGuideConCollapse)

  $('.committer').click(function() {
    $('html, body').animate(
      {
        scrollTop: $('.committer__detail').offset().top - 80,
      },
      1000
    )
  })

  $('.contributor').click(function() {
    $('html, body').animate(
      {
        scrollTop: $('.contributor__detail').offset().top - 70,
      },
      1000
    )
  })
})
