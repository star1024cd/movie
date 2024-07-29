// 영화 검색
import { movieDataList, appendMovies } from '/movie/movie.js';

export function searchMovies() {
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
export function goodMovies() {
    const filterGoodMovies = movieDataList.filter(movie => parseFloat(movie.vote_average.toFixed(1)) >= 8.6);
    appendMovies(filterGoodMovies);
}
// // 나라별 검색
// function movieCountry(languageCode) {
//   const filteredMovies = movieDataList.filter(movie => movie.original_language === languageCode);
//   appendMovies(filteredMovies);
// }
