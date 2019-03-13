(function() {
  document.querySelectorAll('.form-submit')[0].addEventListener('click', function() {
    var date = new Date();
    var twitterAccount = document.querySelector('.form-tw-account-input').value;
    var content = document.querySelector('.form-feedback-text').value;

    axios.post(
      'https://hooks.slack.com/services/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',
        JSON.stringify({ attachments: [ { text: makeSlackText(date, twitterAccount, content) } ] })
    ).then(res => {
      clearTextBox();
      displaySuccessMessage();
    }).catch(err => {
      console.log(JSON.stringify(err));
    });
  });

  function makeSlackText(date, twitterAccount, content) {
    var result = '';
    result += 'id: ' + Number(new Date()) + '      ';
    result += 'send_date: ';
    result += date.getFullYear() + '/';
    result += (date.getMonth() + 1) + '/';
    result += date.getDate() + ' ';
    result += date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2) + '\n';
    result += twitterAccount ? '<https://twitter.com/' + twitterAccount + '|' + twitterAccount + '>' : '名無し';
    result += 'さんからのメッセージです。\n';
    result += content;
    result += '\n' + location.href + '\n';
    return result;
  }

  function clearTextBox() {
    document.querySelector('.form-tw-account-input').value = '';
    document.querySelector('.form-feedback-text').value = '';
  }

  function displaySuccessMessage() {
    displayMessage('送信しました 🙌');
  }

  function displayErrorMessage() {
    displayMessage('送信に失敗しました 😭 リロードして再度試してください');
  }

  function displayMessage(message) {
    var formMessage = document.querySelector('.form-message');
    var span = document.createElement('span');
    span.appendChild(document.createTextNode(message))
    formMessage.appendChild(span);

    setTimeout(function() { formMessage.removeChild(span) }, 3000);
  }

  // 動いてない :sob:
  window.addEventListener('scroll', () => {
    var html = window.document.documentElement;
    var body = window.document.body;
    var viewHeight = html.clientHeight || body.clientHeight;
    var sidebar_w = document.querySelector('.container-sidebar-wrapper');

    var sidebar_w_top = sidebar_w.getBoundingClientRect().top;
    var sidebar_w_bottom = sidebar_w.getBoundingClientRect().bottom;
    var sidebar_content = document.querySelector('.container-sidebar-content');
    // FIXME: チカチカ対策
    var sidebar_content_height = sidebar_content.clientHeight < 1000 ? sidebar_content.clientHeight : 664;

    if (sidebar_w_top <= 25) {
      if (sidebar_w_bottom < sidebar_content_height + 25) {
        this.sidebar_w_classes = 'container-sidebar-wrapper relative-bottom';
        this.sidebar_content_class = 'sidebar_content';
      } else {
        this.sidebar_w_classes = 'container-sidebar-wrapper';
        this.sidebar_content_class = 'container-sidebar-content fix-top';
      }
    } else {
      this.sidebar_w_classes = 'container-sidebar-wrapper relative-top';
      this.sidebar_content_class = 'container-sidebar-content';
    }
  });

  document.querySelectorAll('.tw-button')[0].addEventListener('click', function() {  
    var twUrl = 'https://twitter.com/intent/tweet';
    var epTitle = document.querySelector('.ep-detail-title').textContent;
    twUrl += '?hashtags=' + encodeURIComponent('しがないラジオ');
    twUrl += '&related=' + encodeURIComponent('shiganaiRadio');
    twUrl += '&url=' + encodeURIComponent(location.href);
    twUrl += '&text=' + encodeURIComponent(`"${epTitle}"\n`);
    window.open(twUrl, 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1');
  });
})()
