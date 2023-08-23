'use strict';
const queryInput = document.getElementById('input-query');
const btnSearch = document.getElementById('btn-submit');
const newsContainer = document.getElementById('news-container');
const btnPrev = document.getElementById('btn-prev');
const pageNum = document.getElementById('page-num');
const btnNext = document.getElementById('btn-next');
const navPageNum = document.getElementById('nav-page-num');
const apiKey = '2b32d36ed64f428db8d902abee85a6de';

if(!currentUser) {
    alert(`Vui lòng đăng nhập`);
    window.location.href = '../pages/login.html';
}

let q,
    pageSize = currentUser.pageSize,
    currentPage = 1,
    totalResults;

navPageNum.style.display = 'none';

async function getSearchNewsData(q, apiKey) {
    const apiUrl = `https://newsapi.org/v2/everything?q=${q}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        totalResults = data.totalResults;
        return data;
    } catch(err) {
        console.error(err);
    };
}

function renderSearchNews(newsSearchData) {
    newsContainer.innerHTML = '';
    if(!newsSearchData || newsSearchData.status !== 'ok') {
        newsContainer.innerHTML = `Không có kết quả phù hợp`;
        return;
    }

    const articles = newsSearchData.articles;

    for(const article of articles) {
        newsContainer.innerHTML += `
        <div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
            <div class="row no-gutters">
                <div class="col-md-4">
                <img
                    src=${article?.urlToImage}
                    class="card-img"
                    alt="no image"
                />
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">
                    ${article.title}
                    </h5>
                    <p class="card-text">
                    ${article.description}
                    </p>
                    <a
                    href="${article.url}"
                    class="btn btn-primary"
                    >View</a
                    >
                </div>
                </div>
            </div>
            </div>
        </div>
        `;
    };

    pageNum.innerText = currentPage;
    btnPrev.style.display = currentPage === 1 ? 'none' : 'block';
    const maxPage = Math.ceil(totalResults/pageSize);
    btnNext.style.display = currentPage === maxPage || totalResults === 0 ? 'none' : 'block';
};

async function fetchNewsSearchData() {
    const newsSearch = await getSearchNewsData(q, apiKey);
    renderSearchNews(newsSearch);
}

btnSearch.addEventListener('click', async function() {
    q = queryInput.value.trim();
    if(q === ''){
        alert(`Hãy nhập từ khóa để tìm kiếm`);
        throw new Error();
    } else {
        navPageNum.style.display = '';
        await fetchNewsSearchData();
    }
})

btnPrev.addEventListener('click', async function() {
    if(currentPage > 1) {
        currentPage--;
        await fetchNewsSearchData();
    };
});

btnNext.addEventListener('click', async function() {
    const maxPage = Math.ceil(totalResults/pageSize);
    if(currentPage < maxPage) {
        currentPage++;
        await fetchNewsSearchData();
    };
});