
import moment from 'moment';

const bitchSource = [
  require('../img/zyz.gif'),
  require('../img/gls.gif'),
  require('../img/lyf-1.jpg'),
  require('../img/ll.jpg'),
  require('../img/tf-1.gif')
];

const photoSource = [
  require('../img/ytl-2.jpg'),
  require('../img/ytl-3.jpg'),
  require('../img/ytl-4.jpg'),
  require('../img/ytl-5.jpg'),
  require('../img/ytl-6.jpg'),
  require('../img/ytl-7.jpg'),
  require('../img/ytl-9.jpg'),
  require('../img/ytl-10.jpg'),
  require('../img/hjy-1.jpg'),
  require('../img/hjy-2.jpg'),
  require('../img/hjy-3.jpg'),
  require('../img/hjy-4.jpg'),
  require('../img/cnq-1.jpg'),
  require('../img/cnq-2.jpg'),
  require('../img/cnq-3.jpg')
];

const dialog = [
  {
    date: moment().format("ddd, MMM DD"),
    text: '你好，我叫杨大宝，我和杨葱花是此次大雾山活动的组织者。',
    time: moment().subtract(30, 'minutes').format('LT')
  },
  {
    date: moment().format("ddd, MMM DD"),
    text: '。。。。。。。。',
    time: ''
  },
  {
    date: '',
    text: `如果感兴趣的话，请点击<a target='_blank' href='https://forms.gle/DpCjQWmo5x38MDLk9'>这个</a>链接报名吧！活动详情请戳下方的星星✨`,
    time: moment().subtract(1, 'minutes').format('LT')
  }
]

const bitchCount = 5;
const photoCount = 12;

let isStarClicked = false;


window.onload = function () {
  photoSource.sort(() => Math.random() - 0.5);
  bitchSource.sort(() => Math.random() - 0.5);
  let photoWall = document.querySelector('.whos-nearby .nearby-photo-wall');
  let freshWall = document.querySelector('.fresh-faces .fresh-face-photo-wall');
  let singPhoto = document.querySelector('.whos-nearby .nearby-photo-wall .sample-pic-ytl');


  singPhoto.addEventListener('click', function() {
    let charBtn = document.querySelector('.toolbar-icons .chat');
    charBtn.click();
  });
  // console.log(photoSource);
  for (let i = 0; i < photoCount; i++) {
    let singlePicture = document.createElement('img');
    singlePicture.classList.add('sample-pic-ytl');
    singlePicture.src = photoSource[i].default;
    // singlePicture.style.backgroundImage = `url(${photoSource[0]})`;
    // console.log(singlePicture.style)
    photoWall.appendChild(singlePicture);
  }
  for (let i = 0; i < bitchCount; i++) {
    let singlePicture = document.createElement('img');
    // singlePicture.classList.add('sample-pic-ytl');
    singlePicture.src = bitchSource[i].default;
    // singlePicture.style.backgroundImage = `url(${photoSource[0]})`;
    // console.log(singlePicture.style)
    freshWall.appendChild(singlePicture);
  }
  let compStyles = window.getComputedStyle(singPhoto);

  photoWall.style.gridAutoRows = compStyles.width;

  let toolbarSections = document.querySelector('.toolbar-icons');
  let children = toolbarSections.children;
  let sections = document.querySelectorAll('main section.main');
  toolbarSections.addEventListener('click', function(e) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const section = sections[i];
      child.classList.remove('active');
      section.classList.remove('active');
      // console.log(child.dataset.target);
    }
    e.target.classList.add('active');
    const targetSection = document.querySelector(`section.${e.target.dataset.target}`);
    targetSection.classList.add('active');
    // console.log(e);
  });

  let enrollBtn = document.querySelector('#enroll-btn');
  enrollBtn.onclick = function () {
    window.open('https://forms.gle/DpCjQWmo5x38MDLk9');
  }
  children[1].click();



  // Fake timestamp for chat
  const chat = document.querySelector('section.main.chat');
  dialog.forEach((d) => {
    let container = document.createElement('div');
    container.classList.add('dialog');

    const template = `
      <div class='date'>${d.date}</div>
      <div class='text-bubble'>${d.text}</div>
      <div class='time'>${d.time}</div>
    `
    container.innerHTML = template;
    chat.appendChild(container);
  })


  // get position of star
  const star = document.querySelector('.toolbar-bottom .toolbar-icons .star');
  const anchor = document.querySelector('#anchor');
  // const overlay = anchor.parentNode 
  const rect = star.getBoundingClientRect();
  const desireW = 30
  const desireH = 30
  const offsetY = desireH - rect.height;
  const offsetX = rect.width - desireW;
  anchor.style.width = `${desireW}px`
  anchor.style.height = `${desireH}px`
  anchor.style.left = `${rect.x + offsetX / 2}px`
  anchor.style.top = `${rect.y - offsetY / 2}px`
  anchor.addEventListener('click', function() {
    star.click();
    anchor.parentNode.classList.add('hide')
  });
  const shadowTimeOut = setTimeout(function(){
    anchor.parentNode.classList.remove('hide')
  }, 15000);
  star.addEventListener('click', function(){
    clearTimeout(shadowTimeOut);
  });


  console.log(toolbarSections);
}
