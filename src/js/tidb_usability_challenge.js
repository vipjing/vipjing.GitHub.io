const rankURL = 'https://internal.pingcap.net/pcp/api/rank/all'
const rankSeasonURL = 'https://internal.pingcap.net/pcp/api/rank'
const taskGroupURL = 'https://internal.pingcap.net/pcp/api/taskgroup'

const season = $('#ranking-switch .first')
const history = $('#ranking-switch .second')
const slider = $('#ranking-switch .slider')

let sliderTextSeason, sliderTextHistory

if (slider.data('lang') === 'cn') {
  sliderTextSeason = '赛季积分'
  sliderTextHistory = '历史积分'
} else {
  sliderTextSeason = 'Current'
  sliderTextHistory = 'Accumulative'
}

function renderData(data) {
  data
    .sort((a, b) => b.score - a.score)
    .forEach((d, i) =>
      $(
        '<div>' +
          (i < 3
            ? '<div class="medal medal' + (i + 1) + '"></div>'
            : '<div class="index">' + (i + 1) + '</div>') +
          '<div class="github"></div>\
          <div class="main">\
            <div class="info">\
              <div class="name">' +
          d.name +
          (!d.community ? ' <span class="ti"></span>' : '') +
          (d.type === 'team' ? ' <span class="team">Team</span>' : '') +
          '</div>\
              <div class="score">' +
          d.score +
          '</div>\
            </div>\
            <div class="progress-wrapper">\
              <progress class="progress" value="' +
          d.score +
          '" max="10000" />\
            </div>\
          </div>\
        </div>'
      ).appendTo('#ranking-list')
    )
}

function renderTaskGroups(groups) {
  groups
    .sort((a, b) => a.vote > b.vote)
    .forEach((g, i) =>
      $(
        `<div class="column has-text-left is-4` +
          ((i + 1) % 2 === 0 ? ' is-offset-2' : '') +
          `"><div class="task">` +
          '<div class="meta">' +
          '<div class="user">' +
          (g['doing-users']
            ? g['doing-users'].reduce(
                (sum, user) =>
                  (sum += `
                  <a target="_blank" href="${user.github}">
                    <img class="avatar" src="${user.avatar}" />
                  </a>`),
                ''
              )
            : '<img class="avatar" src="https://download.pingcap.com/images/tidb-performance-challenge/github-purple.png" />') +
          '</div>' +
          (g.bonus > 0 ? `<div class="bonus">${g.bonus}</div>` : '') +
          '</div>' +
          `<h3 class="text"><a target="_blank" href="` +
          g.issue +
          `">` +
          `${i + 1}. ` +
          g.title +
          (g.progress === 100 ? '<span class="finish"></span>' : '') +
          `</a></h3><progress class="progress" value="` +
          g.progress +
          `" max="100" /></div></div>`
      ).appendTo('.tuc-demands .columns')
    )

  if (groups.length % 2 === 1) {
    $('<div class="column is-4 is-offset-2"></div>').appendTo(
      '.tuc-demands .columns'
    )
  }
}

function getRankData(isSeason) {
  let url

  if (isSeason) {
    url = rankSeasonURL
    slider.text(sliderTextSeason)
    if (window.matchMedia('(max-width: 768px)').matches) {
      slider.css('left', '1rem')
    } else {
      slider.css('left', 'calc(30% + 1rem)')
    }
  } else {
    url = rankURL
    slider.text(sliderTextHistory)
    slider.css('left', 'calc(50% - 1rem)')
  }

  $.getJSON(url, data => {
    $('#ranking-list').empty()

    renderData(data)
  })
}

function getTaskGroups() {
  $.getJSON(taskGroupURL, renderTaskGroups)
}

season.on('click', () => getRankData(true))

history.on('click', () => getRankData())

$(document).ready(() => {
  getTaskGroups()
  getRankData(true)

  const slidesPerView = !window.matchMedia('(max-width: 768px)').matches ? 3 : 1
  new Swiper('.swiper-container', {
    autoplay: {
      delay: 6000,
    },
    loop: true,
    slidesPerView,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
})
