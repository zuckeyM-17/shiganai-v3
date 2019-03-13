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
})()
