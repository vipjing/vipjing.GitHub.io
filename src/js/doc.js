// JS Goes here - ES6 supported

// Document Pages

import './vendor/jquery.SimpleTree.js'
import ClipboardJS from './vendor/clipboard.min.js'
import { run as toc_run } from './vendor/toc'

// Open the first folder
function openFolder(li) {
  if (li.hasClass('has-child')) {
    li.addClass('open')
    const $firstUL = li.find('ul')[0]
    const $LI = $($firstUL)
      .attr('style', 'display: block;')
      .find('li:first-child')
    return openFolder($LI)
  }
  li.addClass('active')
  return false
}

// Process Sticky Tree
function processStickyTree() {
  // Sticky tree show
  $('.st_tree').show()
  // Handle click events
  $('.st_tree').SimpleTree({
    click: (e, a) => {
      const href = $(a).attr('href')

      if (href !== '#') {
        $(a)
          .parent()
          .parent()
          .find('.active')
          .removeClass('active')
        $(a)
          .parent()
          .addClass('active')
        if (e.metaKey || e.ctrlKey) {
          window.open(href, '_blank')
        } else {
          window.location.href = href
        }
      }
    },
  })

  var pathname = window.location.pathname

  if ($('#list_page').length == 0) {
    if ($('li.leaf-child.active').length > 0) {
      $('.docs-nav-toc').animate(
        {
          scrollTop:
            $('li.leaf-child.active').offset().top -
            $('.sticky-sidebar').offset().top -
            200,
        },
        1000
      )
    }
  }

  // Open the first item in docs/docs-cn/weekly/recruit list page
  const $firstLI = $('#list_page .st_tree > ul > li:first-child')
  const hash = decodeURIComponent(location.hash)
  if (!hash && $firstLI.length) openFolder($firstLI)
}

// Process tags
function processTags(showMoreList) {
  const hash = decodeURIComponent(location.hash)
  const pageType = $('.nav-tags').data('type')

  if (!hash) $('.tag.all').addClass('sel')

  if (!hash && pageType === 'blog-list') {
    var listIdx = 0
    $('.article-list .article').each(function() {
      const $this = $(this)
      if (showMoreList) {
        $this.show()
        $('#showMore').css('display', 'none')
      } else {
        if (listIdx < 4) {
          $this.show()
          listIdx++
        } else {
          $('#showMore').css('display', 'block')
          $this.hide()
        }
      }
    })
  }

  // Handle article filter if list type is blog-cn list
  if (pageType === 'list' && hash) {
    $('.nav-tags .tag').removeClass('sel')
    $(`.nav-tags .tag[data-tag="${hash.slice(1)}"]`).addClass('sel')
    $('.article-list .article').each(function() {
      const $this = $(this)
      var tagsArr = $this
        .data('tag')
        .slice(0, -1)
        .split(' ')
      if (tagsArr.includes(hash.slice(1))) {
        $this.show()
      } else {
        $this.hide()
      }
    })
  }

  // Handle article filter if list type is blog list
  if (pageType === 'blog-list' && hash) {
    var listIdx = 0
    $('#showMore').css('display', 'none')
    $('.nav-tags .tag').removeClass('sel')
    $(`.nav-tags .tag[data-tag="${hash.slice(1)}"]`).addClass('sel')
    $('.nav-tags .category').removeClass('catesel')
    $(`.nav-tags .category[data-tag="${hash.slice(1)}"]`).addClass('catesel')
    $('.article-list .article').each(function() {
      const $this = $(this)
      if (showMoreList && $this.data('category').includes(hash.slice(1))) {
        $this.show()
      } else if (
        !showMoreList &&
        $this.data('category').includes(hash.slice(1))
      ) {
        if (listIdx < 4) {
          $this.show()
          listIdx++
        } else {
          $('#showMore').css('display', 'block')
          $this.hide()
        }
      } else {
        $this.hide()
      }
    })
  }
}

// function processTextOverflow() {
//   console.log('proccessing text overflow')
//   const briefContainers = document.querySelectorAll('.brief')
//   Array.prototype.forEach.call(briefContainers, container => {
//     // Loop through each container
//     var p = container.querySelector('p')
//     var divh = container.clientHeight
//     console.log('divh is : ', divh)
//     while (p.offsetHeight > divh) {
//       // Check if the paragraph's height is taller than the container's height. If it is:
//       p.textContent = p.textContent.replace(/\W*\s(\S)*$/, '...') // add an ellipsis at the last shown space
//     }
//   })
// }

// Replace the relative href in markdown-body
// function replaceHref(a) {
//   var href = $(a).attr('href')
//   var absUrlExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
//     mdSuffixExp = /\.md/

//   var absUrlRegex = new RegExp(absUrlExp),
//     mdSuffixRegex = new RegExp(mdSuffixExp)

//   if (!href.match(absUrlRegex) && href.match(mdSuffixRegex)) {
//     var newHref = '../' + href.replace(/\.md/, '')
//     $(a).attr('href', newHref)
//   }
// }

// Process links in markdown content
// function processLinksInMarkdown() {
//   $('.markdown-body')
//     .find('a')
//     .each(function() {
//       var $this = $(this)
//       // click event
//       $this.click(function(e) {
//         replaceHref(this)
//       })
//       // right click event for open in new window or copy link url
//       $this.contextmenu(function(e) {
//         replaceHref(this)
//       })
//     })
// }

function tabCheckedInDocs() {
  const hash = decodeURIComponent(location.hash)
  var contentTabID
  if (hash) {
    switch (hash) {
      case '#google':
        $('input:radio[name=tabs]')
          .filter('[value=GoogleContent]')
          .prop('checked', true)
        break
      case '#aws':
        $('input:radio[name=tabs]')
          .filter('[value=AWSContent]')
          .prop('checked', true)
        break
      case '#local':
        $('input:radio[name=tabs]')
          .filter('[value=LocalContent]')
          .prop('checked', true)
        break
      case '#production':
        $('input:radio[name=tabs]')
          .filter('[value=productionContent]')
          .prop('checked', true)
        break
      case '#development':
        $('input:radio[name=tabs]')
          .filter('[value=developmentContent]')
          .prop('checked', true)
        break
    }
  } else {
    contentTabID = $('input:checked').val()
    switch (contentTabID) {
      case 'GoogleContent':
        window.location.href = `./#google`
        break
      case 'AWSContent':
        window.location.href = `./#aws`
        break
      case 'LocalContent':
        window.location.href = `./#local`
        break
      case 'productionContent':
        window.location.href = `./#production`
        break
      case 'developmentContent':
        window.location.href = `./#development`
        break
    }
  }
  contentTabID = $('input:checked').val()
  $('section').hide()
  $('#' + contentTabID).show()
  $('input').on('click', function() {
    contentTabID = $('input:checked').val()
    switch (contentTabID) {
      case 'GoogleContent':
        window.location.href = `./#google`
        break
      case 'AWSContent':
        window.location.href = `./#aws`
        break
      case 'LocalContent':
        window.location.href = `./#local`
        break
      case 'productionContent':
        window.location.href = `./#production`
        break
      case 'developmentContent':
        window.location.href = `./#development`
        break
    }
    $('section').hide()
    $('#' + contentTabID).show()
  })
}

// Process dom elements after loaded
$(document).ready(function() {
  var showMore = false
  if ($('.st_tree').length) processStickyTree()

  if ($('.nav-tags').length) processTags(showMore)

  // Create TOC for article in docs module
  if ($('.article-toc').length) toc_run()

  if ($('.tabs').length) tabCheckedInDocs()

  // processShowMoreBlogList()
  $('#showMore').click(function() {
    processTags(!showMore)
  })

  // processLinksInMarkdown()

  // process image: lazy load and add fade in effect
  $('.lazy').lazyload({
    threshold: 200,
    effect: 'fadeIn',
  })

  //  create copy button
  function addCopy(element) {
    var copy = document.createElement('button')
    copy.className = 'copy'
    copy.textContent = 'Copy'
    $(copy).insertBefore(element)
  }

  // Handle tags click: Filter tags on frontend
  $('.nav-tags .tag, .anchor-tag').click(function(e) {
    const $this = $(this)
    const isInlineTag = $this.hasClass('anchor-tag')
    const isAll = $this.hasClass('all')
    const filter = isInlineTag ? $this.text().trim() : $this.data('tag')
    $('.nav-tags .tag').removeClass('sel')
    $(`.nav-tags .tag[data-tag="${filter}"]`).addClass('sel')
    $('.nav-tags .category').removeClass('catesel')
    $(`.nav-tags .category[data-tag="${filter}"]`).addClass('catesel')
    isAll && $('.tag.all').addClass('sel')

    const pageType = $('.nav-tags').data('type')

    if (pageType && pageType === 'single') {
      if (isAll) window.location.href = '../'
      else window.location.href = `../#${encodeURIComponent(filter)}`
    } else {
      // filter articles if the list type is blog list
      if (pageType === 'blog-list') {
        var listIdx = 0
        $('#showMore').css('display', 'none')
        $('.article-list .article').each(function() {
          const $this = $(this)
          if ($this.data('category').includes(filter)) {
            // $this.show()
            if (listIdx < 4) {
              $this.show()
              listIdx++
            } else {
              $this.hide()
              $('#showMore').css('display', 'block')
            }
          } else {
            $this.hide()
          }
        })
      } else {
        // filter articles if the list type is blog-cn list
        $('.article-list .article').each(function() {
          const $this = $(this)

          if (isAll) {
            $this.show()
          } else {
            var tagsArr = $this
              .data('tag')
              .slice(0, -1)
              .split(' ')
            if (tagsArr.includes(filter)) {
              $this.show()
            } else {
              $this.hide()
            }
          }
        })
      }
      if (isAll) window.location.href = `./`
      else window.location.href = `./#${encodeURIComponent(filter)}`
    }

    e.preventDefault()
    return false
  })

  // Copy to Clipboard
  if ($('.doc').length > 0 || $('.blog').length > 0) {
    if ($('.copyable-code-block').length) {
      $('.copyable-code-block').each(function() {
        if ($(this).next('div.highlight')[0]) {
          var preTag = $(this).next('div.highlight')[0].childNodes[0]
          var $preTag = $(preTag)
          $preTag.css('position', 'relative')

          var codeTag = $(this).next('div.highlight')[0].childNodes[0]
            .childNodes[0]
          var $codeTag = $(codeTag)

          if ($(this).hasClass('shell-root')) {
            $codeTag.addClass('shell-root-mark')
            $codeTag.addClass('cmd-mark')
          } else if ($(this).hasClass('shell-regular')) {
            $codeTag.addClass('cmd-mark')
            $codeTag.addClass('shell-regular-mark')
          } else if ($(this).hasClass('sql')) {
            $codeTag.addClass('sql-mark')
            $codeTag.addClass('cmd-mark')
          }

          addCopy($(this).next('div.highlight')[0])
        }
      })
    } else {
      var $code = document.querySelectorAll('.highlight')

      for (let i = 0; i < $code.length; i++) {
        addCopy($code[i])
      }
    }

    var clipboard = new ClipboardJS('.copy', {
      target: function(trigger) {
        $('.copy').text('Copy')
        $('.copy').css('color', '#94a3ea')
        trigger.innerText = 'Copied'
        $(trigger).css('color', 'rgb(231, 234, 148)')
        return trigger.nextElementSibling
      },
    })

    // highlight the blockquote in docs/docs-cn
    $('blockquote').each(function() {
      var $this = $(this)
      if ($(this).find('p strong')[0]) {
        var quoteLabel = $(this).find('p strong')[0].innerText
        switch (quoteLabel) {
          case 'Note:':
          case '注意：':
            $(this).addClass('label-note')
            break
          case 'Warning:':
          case '警告：':
            $(this).addClass('label-warning')
            break
          case 'Tip:':
          case '建议：':
            $(this).addClass('label-tips')
            break
          case 'Error:':
          case '错误：':
            $(this).addClass('label-error')
            break
        }
      }
    })

    // add code block to tree-nav
    if ($('.has-code').length > 0) {
      $('.has-code').each(function() {
        var re = /`.*?`/g
        let innerText = $(this)[0].innerText
        let matchedArr = $(this)[0].innerText.match(re)
        matchedArr.forEach(i => {
          let len = i.length
          let trimedText = i.substr(1, len - 2)
          innerText = innerText.replace(
            i,
            '<span class="sidebar-code">' + trimedText + '</span>'
          )
        })

        $(this)[0].innerText = ''
        $(this).append(innerText)
      })
    }
  }

  // hide dropdown Menu if user clicks other divs when the status of dropdown menu is open
  $('.doc').click(function(e) {
    if (
      e.target.id != 'dropdownMenuButton' &&
      e.target.id != 'dropdown-menu-items' &&
      e.target.classList.value != 'dropdown-item'
    ) {
      if (!$('.dropdown-menu').hasClass('visibility-hide')) {
        $('.dropdown-menu').slideToggle('fast')
        $('.dropdown-menu').addClass('visibility-hide')
      }
    }
  })

  // handles docs version switch
  $('.version-switcher').click(function() {
    if ($('.dropdown-menu').hasClass('visibility-hide')) {
      $('.dropdown-menu').removeClass('visibility-hide')
    } else {
      $('.dropdown-menu').slideToggle('fast')
    }
  })
})
