'use strict';

const formEdit = document.getElementById('container-form');
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
const btnSubmit = document.getElementById('submit-btn');
const tableBodyEl = document.getElementById('tbody');

const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

renderTableData(petArr);


function renderTableData(petArr) {
    const options = { month: "long", day: "numeric", year: "numeric" };
    tableBodyEl.innerHTML = '';
    for(let i=0; i<petArr.length; i++) {
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
        <td>${new Date().toLocaleDateString(options)}</td>
        <td>
            <button type="button" class="btn btn-warning" onclick="startEditPet('${petArr[i].id}')">Edit</button>
		</td>
        `;
        tableBodyEl.appendChild(row);
    };
};

const startEditPet = (petID) => {
    formEdit.classList.remove('hide');
    for(let i=0; i<petArr.length; i++) {
        if(petArr[i].id === petID) {
            inputID.value = petArr[i].id;
            inputName.value = petArr[i].name;
            inputAge.value = petArr[i].age;
            inputType.value = petArr[i].type;
            renderBreed();
            inputWeight.value = petArr[i].weight;
            inputLength.value = petArr[i].lengthPet;
            inputColor.value = petArr[i].color;
            inputBreed.value = petArr[i].breed;
            inputVaccinated.checked = petArr[i].vaccinated;
            inputDewormed.checked = petArr[i].dewormed;
            inputSterilized.checked = petArr[i].sterilized;
        };
    };
};

function renderBreed() {
    inputBreed.innerHTML = `<option> Select Breed</option>`;
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


btnSubmit.addEventListener('click', function() {
    const petIndex = petArr.findIndex((pet) => pet.id === inputID.value);
    // Lấy dữ liệu nhập vào
        petArr[petIndex].id = inputID.value;
        petArr[petIndex].name = inputName.value;
        petArr[petIndex].age = parseInt(inputAge.value);
        petArr[petIndex].type = inputType.value;
        petArr[petIndex].weight = Number(inputWeight.value);
        petArr[petIndex].lengthPet = Number(inputLength.value);
        petArr[petIndex].color = inputColor.value;
        petArr[petIndex].breed = inputBreed.value;
        petArr[petIndex].vaccinated = inputVaccinated.checked;
        petArr[petIndex].dewormed = inputDewormed.checked;
        petArr[petIndex].sterilized = inputSterilized.checked;
        petArr[petIndex].date = new Date();

    const validate = validateInput(petArr[petIndex]);
    // Validate dữ liệu hợp lệ
    if(validate) {
        saveToStorage("petArr", petArr);
        // Hiển thị danh sách thú cưng
        renderTableData(petArr);
        // Xóa dữ liệu nhập trên Form
        formEdit.classList.add('hide');
    };
});

function validateInput(data) {
    let checkValue = true;

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