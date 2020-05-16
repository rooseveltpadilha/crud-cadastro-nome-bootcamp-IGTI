window.addEventListener('load', start)

var globalNames = ['Lara', 'Paulo', 'Caio', 'Roodson', 'Roosevelt'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
  preventFormSubmit();
  inputName = document.querySelector('#inputName');
  activateInput();
  render();
}

function preventFormSubmit() {

  let form = document.querySelector('form')
  form.addEventListener('submit', handleFormSubmit)

  function handleFormSubmit(event) {
    event.preventDefault()
  }

}

function activateInput() {


  function handleTyping(event) {

    function updateName(newName) {
      globalNames[currentIndex] = newName;
    }


    function insertName(newName) {
      let typedName = newName;
      globalNames.push(typedName);

    }

    if (event.key === 'Enter') {
      if (event.target.value.trim() === '') {
        clearInput();
        return;
      }

      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      isEditing = false;
      render();

    }
  }
  inputName.addEventListener('keyup', handleTyping)
}

function render() {

  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }

    var button = document.createElement('button');
    button.classList.add('deleteButton')
    button.textContent = 'x';
    button.addEventListener('click', deleteName);

    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem)

    return span;
  }

  const divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);


    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}