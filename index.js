const path = require('path');
//node.js의 path 모듈로 운영체제별로 경로 구분자가 달라 생기는 문제를 해결한다
//폴더와 파일의 경로를 쉽게 조작할 수 있다
const methodOverride = require('method-override');
//RESTful API의 7가지 패턴 중 put(업데이트),delete(삭제)는 html이 지원하지 않는다
//app.post를 대신 사용할 수 있으나 RESTful 패턴에 부합하기 위해 method-override 패키지 사용
const { v4: uuid } = require('uuid');
//universally unique identifier 고유한 아이디 생성하는 라이브러리
//v4는 랜덤값을 기반으로 생성하는 것
const express = require('express');
//require로 모듈을 불러온다
const app = express();
//express()를 호출하여 미들웨어 셋팅을 한다

app.use(express.urlencoded({ extended: true }));
//미들웨어 없이 req.body에 접근할 경우 디폴트값이 undefined로 설정돼있다
//request body에서 post request한 데이터를 파싱하기 위한 것
app.use(express.json());
//req.body에서 post한 json데이터를 파싱하기 위한 것
app.use(methodOverride('_method'));
//html이 지원하지 않는 put,patch,delete request를 사용하기 위한 것
app.set('views', path.join(__dirname, 'views'));
//views는 사용하는 템플릿 엔진이 있는 디렉토리이다.
//뷰 페이지의 폴더 기본 경로로 directoryname+views로 하겠다는 것, 절대적 위치 설정
//join all arguments together and normalize the resulting path
app.set('view engine', 'ejs');
//템플릿 엔진 설정을 ejs로 한다,
//ejs는 정적인 html을 템플릿을 활용해 동적으로 만든다, html의 태그처럼 js 삽입 가능

let tweets = [
  {
    id: uuid(),
    username: 'Todd',
    tweet: 'lol that is so funny!',
  },
  {
    id: uuid(),
    username: 'Skyler',
    tweet: 'I like to go birdwatching with my dog',
  },
  {
    id: uuid(),
    username: 'Sk8erBoi',
    tweet: 'Plz delete your account, Todd',
  },
  {
    id: uuid(),
    username: 'onlysayswoof',
    tweet: 'woof woof woof',
  },
];
//index - renders multiple tweets
app.get('/tweets', (req, res) => {
  res.render('tweets/index', { tweets });
});
//new - render a form
app.get('/tweets/new', (req, res) => {
  res.render('tweets/new');
});
//create - creats a new tweet
//const username = req.body.username;
app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;
  comments.push({ username, tweet, id: uuid() });
  res.redirect('/tweets');
});
//show - details about one particular tweet
app.get('/tweets/:id', (req, res) => {
  const { id } = req.params;
  const tweet = tweets.find((t) => t.id === id);
  res.render('twwets/show', { tweet });
});
//eidt - renders a form to edit a tweet
app.get('/tweets/:id/edit', (req, res) => {
  const { id } = req.params;
  const tweet = tweets.find((t) => t.id === id);
  res.render('tweets/edit', { tweet });
});
//update - updates particular tweet
app.patch('/tweets/:id', (req, res) => {
  const { id } = req.params;
  const foundTweet = tweets.find((t) => t.id === id);
  const newTweetText = req.body.tweet;
  foundTweet.tweet = newTweetText;
  res.redirect('/tweets');
});
//delete/destroy - removes a single tweet
app.delete('/tweets/:id', (req, res) => {
  const { id } = req.params;
  tweets = tweets.filter((t) => t.id !== id);
  res.redirect('/tweets');
});
app.listen(3333, () => {
  console.log('on port 3333');
});
//listen()로 오픈할 포트를 정의한다.
//서버의 상태가 listen이기에 다른 접속으로부터 대기 상태가 된다
