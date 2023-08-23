'use strict';

const inputID = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputType = document.getElementById('input-type');
const inputBreed = document.getElementById('input-breed');
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');
const btnFind = document.getElementById('find-btn');
const tableBodyEl = document.getElementById('tbody');

const petArr = JSON.parse(getFromStorage("petArr"));
const breedArr = JSON.parse(getFromStorage("breedArr"));

renderTableData(petArr);
renderBreed();

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
        };
    } else {
        for(let i=0; i<breedArr.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = `${breedArr[i].name}`;
            inputBreed.appendChild(option);
        };
    };
};

inputType.addEventListener('change', function() {
    renderBreed();
});

btnFind.addEventListener('click', function() {
    let findPetArr = petArr;
    findPetArr = inputID.value
    ? findPetArr.filter((pet) => pet.id.includes(inputID.value))
    : findPetArr;
  findPetArr = inputName.value
    ? findPetArr.filter((pet) => pet.name.includes(inputName.value))
    : findPetArr;
  findPetArr =
    inputType.value !== "Select Type"
      ? findPetArr.filter((pet) => pet.type === inputType.value)
      : findPetArr;
  findPetArr =
    inputBreed.value !== "Select Breed"
      ? findPetArr.filter((pet) => pet.breed === inputBreed.value)
      : findPetArr;
  findPetArr = inputVaccinated.checked
    ? findPetArr.filter((pet) => pet.vaccinated === true)
    : findPetArr;
  findPetArr = inputDewormed.checked
    ? findPetArr.filter((pet) => pet.dewormed === true)
    : findPetArr;
  findPetArr = inputSterilized.checked
    ? findPetArr.filter((pet) => pet.sterilized === true)
    : findPetArr;
  renderTableData(findPetArr);
})
