let movieDataList = [];
let posterBasePath = '';
let posterSize = '';

// 영화 정보 가져오기 (이미지 경로, 제목, 개요, 평점)
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmZkN2YyODViMWNiMjY2NjlmODY5ZDVhMTllNzIxOCIsIm5iZiI6MTcyMTkwNTU0Ny4wMzcyMzQsInN1YiI6IjY2YTIzMDk2YTgzMGJkMDA4ZjA4ODkxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gKJeBPl5DudWXXPTzAryqmQihQfRtRgL4G0xA6yYOyY'
  }
};
// 영화 정보 (디테일 / 파일사이즈, 베이스 경로) 가져오기
const details = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmZkN2YyODViMWNiMjY2NjlmODY5ZDVhMTllNzIxOCIsIm5iZiI6MTcyMTkwNTU0Ny4wMzcyMzQsInN1YiI6IjY2YTIzMDk2YTgzMGJkMDA4ZjA4ODkxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gKJeBPl5DudWXXPTzAryqmQihQfRtRgL4G0xA6yYOyY'
  }
};


// 두 API 호출을 병렬로 수행하고, 두 호출이 모두 완료된 후 처리
async function fetchMovies() {

  // API 호출
  const [movieMain, movieDetails] = await Promise.all([
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options),
    fetch('https://api.themoviedb.org/3/configuration', details)
  ]);
  // JSON으로 변환
  const movieDataMain = await movieMain.json();
  const movieDataDetail = await movieDetails.json();

  // 데이터 처리
  movieDataList = movieDataMain.results;
  posterBasePath = movieDataDetail.images.base_url;
  posterSize = movieDataDetail.images.poster_sizes[3];
  console.log(movieDataDetail);
  appendMovies(movieDataList);
}
// HTML 생성 함수

function appendMovies(movies) {
  let temp_html = '';
  movies.forEach(movie => {
    const posterFilePath = movie.poster_path;
    const movieTitle = movie.title;
    const movieOverview = movie.overview;
    const movieRating = parseFloat(movie.vote_average.toFixed(1));
    const movieId = movie.id;
    const posterAllPath = posterBasePath + posterSize + posterFilePath;

    temp_html += `
        <div class="card-container" id="movie-card" data-movieIdData="${movieId}" style="width: 18rem;">
          <img src="${posterAllPath}" class="movie-img" alt="영화 포스터">
          <h2 class="movie-title">${movieTitle}</h2>
          <p class="movie-overview">${movieOverview}</p>
          <p class="movie-rating"> ⭐ ${movieRating}</p>
        </div>`;
  });

  // HTML 찰싹
  document.getElementById('movie-list').innerHTML = temp_html;
}

document.addEventListener('DOMContentLoaded', function () {
  fetchMovies();

  // 검색
  document.getElementById('search-btn').addEventListener('click', function () {
    searchMovies();
  });
  // 실시간 검색
  document.getElementById('search-input').addEventListener('input', function (event) {
    searchMovies();
  })
  // 평점 상위권
  document.getElementById('serach-goodMovie').addEventListener('click', function () {
    goodMovies();
  });

  // 처음화면으로 돌아감
  document.getElementById('return-btn').addEventListener('click', function () {
    fetchMovies();
  });

  // 아이디 띄우기
  document.getElementById('movie-list').addEventListener('click', function (event) {
    const movieCard = event.target.closest('#movie-card');
    const movieId = movieCard.getAttribute('data-movieIdData');
    alert(`😎영화 ID : ${movieId}`);
  });

  //엔터로 검색
  // document.getElementById('search-input').addEventListener('keydown', function (event) {
  //   if (event.key === 'Enter') {
  //     searchMovies();
  //   }
  // })

});
// 영화 검색
function searchMovies() {
  const searchKeyword = document.getElementById('search-input').value.toLowerCase();
  if (searchKeyword === '') {
    // 검색어가 없으면 전체 영화 리스트 표시
    console.log("검색어를 입력해주세요.");
    appendMovies(movieDataList);
  } else {
    // 검색어로 필터링
    const filterMovies = movieDataList.filter(movie => movie.title.toLowerCase().includes(searchKeyword));
    appendMovies(filterMovies);
  }
}
// 평점 굿 
function goodMovies() {
  const filterGoodMovies = movieDataList.filter(movie => parseFloat(movie.vote_average.toFixed(1)) >= 8.6);
  appendMovies(filterGoodMovies);
}
