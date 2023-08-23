'use strict'

//khai báo các trường dữ liệu
const firstNameInput = document.getElementById('input-firstname');
const lastNameInput = document.getElementById('input-lastname');
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const passwordConfirmInput = document.getElementById('input-password-confirm');

// khai báo nút register
const btnRegister = document.getElementById('btn-submit');

// hàm kiểm tra dữ liệu nhập vào của người dùng
const validate = function(data) {
    // kiểm tra việc bỏ trống trường dữ liệu
    if(!data.firstName || !data.lastName || !data.username || !data.password || !data.passwordConfirm) {
        alert(`Vui lòng nhập đầy đủ các thông tin cần thiết!`);
        return false;
    };

    // kiểm tra việc trùng username
    for(let i=0; i<userArr.length; i++) {
        if(data.username === userArr[i].username) {
            alert(`User Name đã tồn tại. Vui lòng chọn user name khác!`);
            return false;
        };
    };

    // kiểm tra việc password và password confirm phải giống nhau
    if(data.password !== data.passwordConfirm) {
        alert(`Mật khẩu xác nhận phải trùng với mật khẩu`);
        return false;
    };

    // trả về việc dữ liệu đã đạt đầy đủ yêu cầu
    return true;
};

// kiểm tra độ dài mật khẩu phải nhiều hơn 8 ký tự
passwordInput.addEventListener('blur', function() {
    if(passwordInput.value.length <= 8) {
        alert(`Mật khẩu phải có nhiều hơn 8 ký tự!`)
    };
});

// xóa dữ liệu trên form sau khi lưu
const clearInput = function() {
    firstNameInput.value = '';
    lastNameInput.value = '';
    usernameInput.value = '';
    passwordInput.value = '';
    passwordConfirmInput.value = '';
}

// Tạo sự kiện diễn ra khi nhấn nút register
btnRegister.addEventListener('click', function() {
    // lấy dữ liệu vừa nhập vào
    const dataInput = new User(
        firstNameInput.value,
        lastNameInput.value,
        usernameInput.value,
        passwordInput.value
    );
    // kiểm tra điều kiện
    if(validate(dataInput)) {
        //thêm dữ liệu người dùng vào trong danh sách người dùng
        userArr.push(dataInput);
        // lưu danh sách người dùng vào localStorage
        saveToStorage('userArr', userArr);
        // xóa dữ liệu người dùng trên form register
        clearInput();
        // chuyển hướng đến trang login
        alert(`Tạo người dùng thành công`)
        window.location.href = '../pages/login.html';
    }
})