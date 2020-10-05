//procurar o botão
document.querySelector("#add-time")
.addEventListener('click',cloneField)
// quando clicar no botão 

// exercutar uma ação 
function cloneField() {
    
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)

    const fields = newFieldContainer.querySelectorAll('input')
    
    fields.forEach(function (field) {
        field.value = ""
    });

    document.querySelector('#schedule-items').appendChild(newFieldContainer)

}
