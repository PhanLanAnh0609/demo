'use strict';

const btnSubmit = document.getElementById('submit-btn');
const inputBreed = document.getElementById('input-breed');
const inputType = document.getElementById('input-type');
const tableBodyEl = document.getElementById('tbody');

const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];
renderBreedTable(breedArr);

btnSubmit.addEventListener('click', function () {
    const breedInput = {
        name: inputBreed.value,
        type: inputType.value
    };
    
    const validate = validateInput(breedInput);

    if(validate) {
        breedArr.push(breedInput);
        saveToStorage("breedArr", breedArr);
        renderBreedTable(breedArr);
        clearInput();
    }
})

function validateInput(data) {
    let checkValue = true;
    if(!data.name) {
        alert('Please input name breed');
        checkValue = false;
    };

    if(data.type == 'Select Type') {
        alert('Please select type for breed');
        checkValue = false;
    };

    return checkValue;
};

function renderBreedTable(breedArr) {
    tableBodyEl.innerHTML = '';
    for(let i=0; i<breedArr.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <th scope='row'>${i + 1}</th>
        <td>${breedArr[i].name}</td>
        <td>${breedArr[i].type}</td>
        <td>
            <button type='button' class='btn btn-danger' onclick='deleteBreed("${breedArr[i].name}", "${breedArr[i].type}")'> Delete </button>
        </td>`;
        tableBodyEl.appendChild(row);
    }
};

const clearInput = () => {
    inputBreed.value = '';
    inputType.value = 'Select Type';
};

const deleteBreed = (breedName, breedType) => {
    if(confirm('Are you sure?')) {
        for(let i=0; i<breedArr.length; i++) {
            if(breedArr[i].name === breedName && breedArr[i].type === breedType) {
                breedArr.splice(i,1);
            };
        };
        saveToStorage("breedArr", breedArr);
        renderBreedTable(breedArr);
    }
}