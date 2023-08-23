'use strict'

// khai báo phần tử nội dung tin tức
const newsContainer = document.getElementById('news-container');

// khai báo thành phần của phân trang
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');

// khai báo API KEY
const apiKey = '2b32d36ed64f428db8d902abee85a6de';

// kiểm tra người dùng chưa đăng nhập
if(!currentUser) {
    alert(`Vui lòng đăng nhập!`);
    // chuyển hướng đến trang đăng nhập
    window.location.href = '../pages/login.html';
}

// khai báo các yếu tố
let pageSize = currentUser.pageSize,
    currentPage = 1,
    category = currentUser.category,
    totalResults = 0;

// hàm lấy dữ liệu từ API
async function getNewsData(country, category, pageSize, currentPage, apiKey) {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;
    try {
        // lấy ra dữ liệu
        const res = await fetch(apiUrl);
        // đưa dữ liệu về định dạng json
        const data = await res.json();
        // tổng số lượng bài viết trong API phù hợp
        totalResults = data.totalResults;
        console.log(data);
        return data;
    } catch(err) {
        console.log(err);
    }

};

// hàm hiển thị dữ liệu theo giao diện lên màn hình
function renderNews(newsData) {
    // xóa giao diện trước khi hiển thị ra kết quả
    newsContainer.innerHTML ='';
    // kiểm tra dữ liệu bài tin tức
    if(!newsData || newsData.status !== 'ok') {
        // đưa ra thông tin để hiểu rằng dữ liệu không tồn tại 
        newsContainer.innerHTML =`Load dữ liệu tin tức không thành công`;
        return;
    };
    // khai báo danh sách các bài tin tức
    const articles = newsData.articles;

    // hiển thị bài tin tức trong danh sách bài tin tức theo giao diện 
    for(const article of articles) {
        // thiết lập giao diện hiển thị cho từng bài viết
        newsContainer.innerHTML += `
        <div class="card border-light flex-row flex-wrap">
            <div class="card mb-3 w-100" style="">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src=${article.urlToImage !== null ? article.urlToImage : '../img/no-image.jpg'} class="card-img" alt="no-image"/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.description !== null ? article.description : ''}</p>
                            <a href="${article.url}" class="btn btn-primary"> View </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    };

    // hiển thị trang hiện tại
    pageNum.innerText = currentPage;
    // thiết lập kiểu của nút prev trong phân trang
    btnPrev.style.display = currentPage === 1 ? 'none' : 'block';
    // khai báo số trang tối đa
    const maxPage = Math.ceil(totalResults/pageSize);
    // thiết lập kiểu của nút next trong phân trang
    btnNext.style.display = currentPage === maxPage || totalResults === 0 ? 'none' : 'block';
};

// hàm 
async function fetchNewsData() {
    const news = await getNewsData('us', category, pageSize, currentPage, apiKey);
    renderNews(news);
}

window.onload = async function() {
    await fetchNewsData();
}

btnPrev.addEventListener('click', async function() {
    if(currentPage > 1) {
        currentPage--;
        await fetchNewsData();
    };
});

btnNext.addEventListener('click', async function() {
    const maxPage = Math.ceil(totalResults/pageSize);
    if(currentPage < maxPage) {
        currentPage++;
        await fetchNewsData();
    };
});
