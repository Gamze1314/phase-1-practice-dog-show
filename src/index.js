document.addEventListener('DOMContentLoaded', () => {

    // fetch dogs data
    // create table rows and cell data for each dog name, sex, and bread
    // last td should have button tag to 'Edit Dog' 

    fetch('http://localhost:3000/dogs')
    .then((resp) => resp.json())
    .then((dogArray) => {
        
        dogArray.forEach(dogObj => {

        const tr = document.createElement('tr');

        let tdName = document.createElement('td')
        tdName.innerText = dogObj.name

        let tdBreed = document.createElement('td')
        tdBreed.innerText = dogObj.breed

        let tdSex = document.createElement('td')
        tdSex.innerText = dogObj.sex

        const tdButton = document.createElement('td')

        const butt = document.createElement('button')
        butt.innerText = "Edit Dog"
        tdButton.appendChild(butt)

        tr.append(tdName, tdBreed, tdSex,tdButton)


        const tableBody = document.getElementById('table-body')
        tableBody.appendChild(tr)


    butt.addEventListener('click' , () => {
        console.log(dogObj)
   // callback function will populate the dog name,sex,and breed on the input fields 
          const form = document.getElementById('dog-form')
  
          form.children[0].value = dogObj.name
          form.children[1].value = dogObj.breed;
          form.children[2].value = dogObj.sex;


                     // add submit even to form 
    form.addEventListener('submit', (e) => {
            e.preventDefault()
            // update td's innerText to user inputValue

            let nameValue = e.target.name.value
            let breedValue = e.target.breed.value
            let sexValue = e.target.sex.value
 

            tdName.innerText = nameValue
            tdSex.innerText = sexValue
            tdBreed.innerText = breedValue
// PATCH 
           let updatedDog = {
           name: e.target.name.value,
           breed: e.target.breed.value,
           sex: e.target.sex.value
    } // config object
 
       fetch(`http://localhost:3000/dogs/${dogObj.id}`, {
       method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDog),
})
       .then(res => res.json())
       .then(data => console.log(data))
       .catch(error => console.error('Error patching data:', error));  
            // then GET request to display updated ones on the page

        fetch('http://localhost:3000/dogs')
       .then((resp) => resp.json())
       .then((updatedArray) => {
        // get updated dogs' info rendered on the page 
            updatedArray.forEach((updatedData) =>{                tdName = updatedData.name;
            tdBreed = updatedData.sex;
            tdSex = updatedData.breed;}
            )})

        })
    });

    })
    
    });
 });

