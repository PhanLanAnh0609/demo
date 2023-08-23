'use strict'
const inputTask = document.getElementById('input-task');
const btnAdd = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

// hàm hiển thị danh sách công việc
const renderTask = function() {
    //lấy danh sách các task từ localStorage
    if(!currentUser) {
        alert('Bạn chưa đăng nhập. Vui lòng đăng nhập!');
        window.location.href = '../pages/login.html'
    } else {
        const taskArr = todoArr.filter((e) => e.owner === currentUser.username);
        for(let i=0; i<taskArr.length; i++) {
            const html = `<li class="${taskArr[i].isDone === true ? 'checked' : ''}">${taskArr[i].task}<span class="close">×</span></li>`;
            todoList.innerHTML += html;
        };
    };
};

renderTask();

// tạo sự kiện sẽ diễn ra khi nhấn nút add
btnAdd.addEventListener('click', function() {
    if(!inputTask.value.trim()) {
        alert(`Hãy điền tên công việc trước khi thêm!`);
    }else {
        const task = new Task(inputTask.value, currentUser.username);
        todoArr.push(task);
        saveToStorage('todoArr', todoArr);
        inputTask.value = '';
        todoList.innerHTML = '';
        renderTask();
    };
});

todoList.addEventListener('click', function(item) {
    if(item.target.localName === 'li') {
        // thay đổi giao diện task khi nhấp vào task
    item.target.classList.toggle('checked');
    // lấy ra dữ liệu của công việc đang xử lý từ danh sách task trong localStorage
    const taskClicked = todoArr.find(e => e.task === item.target.firstChild.data);
    // thay đổi thuộc tính thể hiện việc hoàn thành công việc
    if(taskClicked.isDone) {
        taskClicked.isDone = false;
    } else {
        taskClicked.isDone = true;
    };
    // lưu lại dữ liệu sau thay đổi
    saveToStorage('todoArr', todoArr);
    } else if(item.target.localName === 'span') {
        if(confirm('Bạn chắc chắn muốn xóa công việc này')) {
            const indexTaskDeleted = todoArr.findIndex(e => e.task === item.target.parentElement.firstChild.data);
            todoArr.splice(indexTaskDeleted,1);
            saveToStorage('todoArr', todoArr);
            todoList.innerHTML = '';
            renderTask();
        };
    };
});
