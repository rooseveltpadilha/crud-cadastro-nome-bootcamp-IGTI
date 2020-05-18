var globalNames = ['Lara', 'Paulo', 'Caio', 'Roodson', 'Roosevelt'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  activateInput();
  render();
});

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault()
  }

  let form = document.querySelector('form')
  form.addEventListener('submit', handleFormSubmit)
}

function activateInput() {
  function insertName(newName) {
    // globalNames.push(newName);
    globalNames = [...globalNames, newName];
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
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
      //globalNames.splice(index, 1);
      globalNames = globalNames.filter((_, i) => {
        // if (i === index) {
        //   return false;
        // }
        // return true;
        return i !== index;
      });
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

// function clearInput() {
//   inputName.value = '';
//   inputName.focus();
// }

const clearInput = () => {
  inputName.value = '';
  inputName.focus();
}