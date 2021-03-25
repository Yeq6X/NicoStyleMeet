var prevThread;

function showComment(message) {
  var screen = document.body; // よくない
  var screenHeight = screen.offsetHeight;
  var screenWidth = screen.offsetWidth;

  // コメントのエレメント作成
  var comment = document.createElement('span');

  // コメントへのメッセージの追加
  comment.textContent = message;
  // コメントのbodyへの追加
  document.getElementsByTagName('body')[0].appendChild(comment);

  var letterSize = screenHeight*0.05;

  comment.setAttribute('class', 'comment');

  // コメントのスタイル作成
  var commentStyle = {
    left: screenWidth + 'px',
    top: Math.floor((screenHeight - letterSize) * Math.random()) + 'px',
    fontSize: letterSize + 'px',
  }
  // スタイル設定
  for(var prop in commentStyle) {
    comment.style[prop] = commentStyle[prop];
  }


  // アニメーション
  $(comment).animate(
    {
      'left': -comment.offsetWidth + 'px'
    },
    {
      'duration': 6000,
      'easing': 'linear',
      'complete': function() {
        document.getElementsByTagName('body')[0].removeChild(comment);
      }
    }
  );
}

function showBarrageClapping(message) {
  var screen = document.body; // よくない
  var screenHeight = screen.offsetHeight;
  var screenWidth = screen.offsetWidth;

  // 5~10個をランダムで複製する
  var min = 5;
  var max = 10;
  var clappingCount = Math.floor( Math.random() * (max + 1 - min) ) + min;

  for (let i = 0; i < clappingCount; i++) {
    // コメントのエレメント作成
    var comment = document.createElement('span');

    // コメントへのメッセージの追加
    comment.textContent = message;
    // コメントのbodyへの追加
    document.getElementsByTagName('body')[0].appendChild(comment);

    var letterSize = screenHeight*0.05;

    comment.setAttribute('class', 'comment');

    // コメントのスタイル作成
    var commentStyle = {
      left: screenWidth + 'px',
      top: Math.floor((screenHeight - letterSize) * Math.random()) + 'px',
      fontSize: letterSize + 'px',
    }
    // スタイル設定
    for(var prop in commentStyle) {
      comment.style[prop] = commentStyle[prop];
    }

    // ランダムな速度で複製する
    var min = 4000;
    var max = 6000;
    var duration = Math.floor( Math.random() * (max + 1 - min) ) + min;

    // ランダムな開始位置で複製する
    var min = 0;
    var max = 100;  
    var randomOffset = Math.floor( Math.random() * (max + 1 - min) ) + min;

    // アニメーション
    $(comment).animate(
      {
        'left': - comment.offsetWidth - randomOffset + 'px'
      },
      {
        'duration': duration,
        'easing': 'linear',
        'complete': function() {
          document.getElementsByTagName('body')[0].removeChild(comment);
        }
      }
    );
  }
}

function isClapping(message) {
  const pattern = /^[8８]+$/g;
  return message.match(pattern);
}

var observer = new MutationObserver(records=>{
try {
  // テキスト欄の取得
  const thread = document.getElementsByClassName('z38b6 CnDs7d hPqowe')[0];
  // テキスト欄以外のDOM変化で発火したら無視
  if (prevThread != undefined && thread.isEqualNode(prevThread)) return;
  // ????
  if (thread.getElementsByClassName('gYckH').length == 1) return;
  // 比較用にグローバルに格納
  prevThread = thread.cloneNode(true);
  // メッセージそれぞれを配列として取得
  const messages = thread.getElementsByClassName('oIy2qc');
  // 最後のメッセージを取得
  const message = messages[messages.length-1].innerText;

  if (isClapping(message)) {
    showBarrageClapping(message)
  } else {
    showComment(message)
  }
}
catch(e) {
  return;
}
});

const config = {
  attributes: true,
  subtree: true,
  childList: true,
  characterData: true
}

document.addEventListener('DOMContentLoaded', () => {
  // オブザーバー
  var elem = document.body; // ほんとはチャットボックスを監視するべきだけどmeetに参加画面と判断するのめんどくさい これのせいで重い
  observer.observe(elem, config);
});
