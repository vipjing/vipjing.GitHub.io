const sigBaseURL = 'https://bots.tidb.io/ti-community-bot/sigs/'

function renderData(sigName, membership) {
  $(
    '<div class="member-header" id="member-' + sigName + '">' + sigName + ' SIG </div>'
  ).appendTo('.developer-group-members')

  Object.keys(membership).forEach((member) =>
    $(
      '<div class="member-list">\
        <div class="member-type">' + member + '</div>\
        <div class="flex-lists members divider" id="member-' + member + '"></div>\
      </div>'
    ).appendTo('.developer-group-members')
  )

  Object.keys(membership).forEach((member) =>
    membership[member].forEach((m) =>
      $(
        '<a class="member flex-lists member-hover" href="https://github.com/' + m.githubName + '" target="_blank">\
            <img class="lazy avatar" src="https://github.com/' + m.githubName + '.png" alt="avatar" />\
            <div class="member-info">\
              <div class="github-icon"><p>' + m.githubName + '</p></div>\
            </div>\
        </a>'
      ).appendTo('#member-' + member)
    )
  )
}

function getSig(sigName) {
  let url = sigBaseURL + sigName

  $.getJSON(url, data => {
    const membership = data.data.membership
    if(data) {
      $('.loader-spinner').css('display', 'none')
      $('.developer-sig').css('background-color', '#F5F6F8')
    }
    renderData(sigName, membership)
  })
}

$(document).ready(() => {
  const sigNameArr = window.location.pathname.split('/')
  const sigName = sigNameArr.pop() || sigNameArr.pop()
  getSig(sigName)
})
