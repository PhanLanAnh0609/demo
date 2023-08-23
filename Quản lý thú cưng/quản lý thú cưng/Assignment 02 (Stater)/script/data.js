'use strict';

const fileInput = document.getElementById('input-file');
const btnImport = document.getElementById('import-btn');
const btnExport = document.getElementById('export-btn');

const petArr = JSON.parse(getFromStorage("petArr"));
const breedArr = JSON.parse(getFromStorage("breedArr"));
const dataToSave = getFromStorage("petArr");

btnExport.addEventListener('click', function() {
    if(confirm('Are you export data to file?')) {
        saveStaticDataToFile()
    }
});

btnImport.addEventListener('click', function() {
    if(fileInput.value.length == 0) {
        alert(`Please select file import!`);
        return;
    }
    importFile();
})

function saveStaticDataToFile() {
    const blob = new Blob([dataToSave], { type: 'application/json' });
    saveAs(blob, "Data Pet Array.json");
};

function importFile() {
    let reader = new FileReader();
    reader.readAsText(fileInput.files[0]);
    reader.onload = function (evt) {
        let content = evt.target.result;
        if(content.trim().length === 0) return;
        let obj = JSON.parse(content);
        obj.forEach((el) => {
            if(validateData(el)) {
                let index = petArr.findIndex(pet => pet.id === el.id);
                if (index < 0) petArr.push(el);
                else petArr[index] = el;
                let breedName = breedArr.filter(breed => breed.type === el.type).findIndex(breed => breed.name === el.breed);
                if (breedName < 0) {
                    breedArr.push({
                        name: el.breed,
                        type: el.type,
                    });
                }
            }
        })
        saveToStorage("petArr", petArr);
        saveToStorage("breedArr", breedArr);
        alert(`Import successfully`);
    }
    fileInput.value = '';
}

function validateData(data) {
    let checkValue = true;
    if(!data.id) {
        alert(`Please input pet's ID!`);
        checkValue = false;
    };

    for(let i=0; i<petArr.length; i++) {
        if(data.id === petArr[i].id) {
            alert(`ID must be unique!`);
            checkValue = false;
        };
    };

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