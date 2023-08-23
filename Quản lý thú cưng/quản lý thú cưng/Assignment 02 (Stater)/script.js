'use strict';

const btnSubmit = document.getElementById('submit-btn');
const btnHealthyPet = document.getElementById('healthy-btn');
const btnCalculateBMI = document.getElementById('bmi-btn');
const inputID = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const inputType = document.getElementById('input-type');
const inputWeight = document.getElementById('input-weight');
const inputLength = document.getElementById('input-length');
const inputColor = document.getElementById('input-color-1');
const inputBreed = document.getElementById('input-breed');
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');
const tableBodyEl = document.getElementById('tbody');

const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
const healthyPetArr = petArr.filter((pet) => {
    if(pet.vaccinated == true && pet.dewormed == true && pet.sterilized == true) {
        return pet;
    }
});
const breedArr = JSON.parse(getFromStorage("breedArr"));
let healthyCheck = false;

renderTableData(petArr);

// Bắt sự kiện nút Submit
btnSubmit.addEventListener('click', function() {
    // Lấy dữ liệu nhập vào
    const inputData = {
        id: inputID.value,
        name: inputName.value,
        age: parseInt(inputAge.value),
        type: inputType.value,
        weight: Number(inputWeight.value),
        lengthPet: Number(inputLength.value),
        color: inputColor.value,
        breed: inputBreed.value,
        vaccinated: inputVaccinated.checked,
        dewormed: inputDewormed.checked,
        sterilized: inputSterilized.checked,
        dateAdd: new Date(),
    };

    const validate = validateInput(inputData);
    // Validate dữ liệu hợp lệ
    if(validate && duplicateId == true) {
        petArr.push(inputData);
        saveToStorage("petArr", petArr);
        // Hiển thị danh sách thú cưng
        renderTableData(petArr);
        // Xóa dữ liệu nhập trên Form
        clearInput();
    };
    if(inputData.vaccinated === true && inputData.dewormed === true && inputData.sterilized === true) {
        healthyPetArr.push(inputData);
    };
});

// Bắt sự kiện nút Show Healthy Pet
btnHealthyPet.addEventListener('click', function() {
    if(healthyCheck === false) {
        btnHealthyPet.textContent = 'Show All Pet';
        renderTableData(healthyPetArr);
        return healthyCheck = true;
    } else {
        btnHealthyPet.textContent = 'Show Healthy Pet';
        renderTableData(petArr);
        return healthyCheck = false;
    }
})

// Hàm kiểm tra dữ liệu nhập hợp lệ
function validateInput(data) {
    let checkValue = true;
    if(!data.id) {
        alert(`Please input pet's ID!`);
        checkValue = false;
    };

    // for(let i=0; i<petArr.length; i++) {
    //     if(data.id === petArr[i].id) {
    //         alert(`ID must be unique!`);
    //         checkValue = false;
    //     };
    // };

    if(!data.name) {
        alert(`Please input pet's name!`);
        checkValue = false;
    }
    
    if(!data.age) {
        alert(`Please input pet's age!`);
        checkValue = false;
    } else if(data.age <1 || data.age >15 ) {
        alert(`Age must be between 1 and 15!`);
        checkValue = false;
    };

    if(!data.weight) {
        alert(`Please input pet's weight!`);
        checkValue = false;
    } else if(data.weight <1 || data.weight >15) {
        alert(`Weight must be between 1 and 15!`);
        checkValue = false;
    };

    if(!data.lengthPet) {
        alert(`Please input pet's length!`);
        checkValue = false;
    } else if(data.lengthPet <1 || data.lengthPet >100) {
        alert(`Length must be between 1 and 100!`);
        checkValue = false;
    };

    if(!data.color) {
        alert(`Please select Color!`);
        checkValue = false;
    }

    if(data.type === 'Select Type') {
        alert(`Please select Type!`);
        checkValue = false;
    };

    if(data.breed === 'Select Breed') {
        alert(`Please select Breed!`);
        checkValue = false;
    };

    return checkValue;
};

// Xóa dữ liệu nhập trên Form
const clearInput = () => {
    inputID.value = '';
    inputName.value = '';
    inputAge.value = '';
    inputType.value = 'Select Type';
    inputWeight.value = '';
    inputLength.value = '';
    inputColor.value = '#000000';
    inputBreed.value = 'Select Breed';
    inputVaccinated.checked = false;
    inputDewormed.checked = false;
    inputSterilized.checked = false;
};

// Hiển thị dữ liệu thành dạng bảng
function renderTableData(petArr) {
    //const options = { day: "numeric", month: "numeric", year: "numeric" };
    tableBodyEl.innerHTML = '';
    for(let i=0; i<petArr.length; i++) {
        let date = new Date(petArr[i].dateAdd);
        let dateShow = `${
        date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
        }/
        ${
        date.getMonth() < 10
            ? `0${date.getMonth() + 1}`
            : `${date.getMonth() + 1}`
        }/${date.getFullYear()}`;
        const row = document.createElement('tr');
        row.innerHTML = `
        <th scope="row">${petArr[i].id}</th>
        <td>${petArr[i].name}</td>
        <td>${petArr[i].age}</td>
        <td>${petArr[i].type}</td>
        <td>${petArr[i].weight} kg</td>
        <td>${petArr[i].lengthPet} cm</td>
        <td>${petArr[i].breed}</td>
        <td>
            <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
        </td>
        <td>
            <i class="bi ${petArr[i].vaccinated? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i>
        </td>
        <td><i class="bi ${petArr[i].dewormed? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
        <td><i class="bi ${petArr[i].sterilized? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
        <td>${dateShow}</td>
        <td>
            <button type="button" class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">Delete</button>
		</td>
        `;
        tableBodyEl.appendChild(row);
    };
};

// Xóa một thú cưng
const deletePet = (petID) => {
    if(confirm('Are you sure?')) {
        for(let i=0; i<petArr.length; i++) {
            if(petArr[i].id === petID) {
                petArr.splice(i,1);
            };
        };
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
    };
};

function renderBreed() {
    inputBreed.innerHTML = '<option> Select Breed</option>';
    if(inputType.value === 'Dog') {
        const breedDog = breedArr.filter((item) => item.type === 'Dog');
        for(let i=0; i<breedDog.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = `${breedDog[i].name}`;
            inputBreed.appendChild(option);
        };
    } else if (inputType.value === 'Cat') {
        const breedCat = breedArr.filter((item) => item.type === 'Cat');
        for(let i=0; i<breedCat.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = `${breedCat[i].name}`;
            inputBreed.appendChild(option);
        }
    }
}

inputType.addEventListener('change', function() {
    renderBreed();
});


