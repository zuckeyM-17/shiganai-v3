const tw_account = document.getElementsByClassName('form-tw-account-input');

console.log(tw_account[0].value);
[].forEach.call(document.getElementsByClassName('form-submit'), button => {
  console.log("hgohgoe");
  button.addEventListener('click', () => {
    console.log('hoge');
    axios.post(
      'https://hooks.slack.com/services/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',
        JSON.stringify({ attachments: [ { text: makeSlackText() } ] })
    ).then(res => res.status)
    .catch(err => {
      console.log(JSON.stringify(err));
    });
  });
});


const makeSlackText = () => {
  const date = new Date();
  const tw_account = document.querySelector('.form-tw-account-input').value;
  const content = document.querySelector('.form-feedback-text').value;

  console.log(tw_account);
  console.log(content);

  let result = '';
  result += 'id: ' + Number(new Date()) + '      ';
  result += 'send_date: ';
  result += date.getFullYear() + '/';
  result += (date.getMonth() + 1) + '/';
  result += date.getDate() + ' ';
  result += date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2) + '\n';
  result += tw_account ? '<https://twitter.com/' + tw_account + '|' + tw_account + '>' : '名無し';
  result += 'さんからのメッセージです。\n';
  result += content;
  return result;
};

const clearFeedback = () => {

}