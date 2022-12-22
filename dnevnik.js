// ОБЪЯВЛЕНИЕ / ДЕКЛАРАЦИЯ (от declare - объявить)


let wantToSee = [];
let alreadySeen = [];

function save() {
    localStorage.wantToSee = JSON.stringify(wantToSee);
    localStorage.alreadySeen = JSON.stringify(alreadySeen);
}

function load() {
    if (localStorage.wantToSee == undefined && localStorage.alreadySeen == undefined) {
        return;
    } else if (localStorage.wantToSee == undefined) {
        alreadySeen = JSON.parse(localStorage.alreadySeen)
    } else if (localStorage.alreadySeen == undefined) {
        wantToSee = JSON.parse(localStorage.wantToSee)
    } else {
        wantToSee = JSON.parse(localStorage.wantToSee)
        alreadySeen = JSON.parse(localStorage.alreadySeen)
    }


}

function renderList(parent, animes) {
    let children = parent.querySelectorAll('.new_el')
    for (const el of children) {
        el.remove()
    }

    let elIndex = 0;
    for (const anime of animes) {
        let new_el = document.createElement('div');
        new_el.classList.add('new_el');
        new_el.dataset.index = elIndex;

        elIndex = elIndex + 1;


        parent.append(new_el)

        let new_el_text = document.createElement('div')
        let new_el_button_delete = document.createElement('button')
        let new_el_button_move = document.createElement('button')

        new_el_text.innerText = anime;


        new_el_text.style.width = '100%'

        new_el_button_delete.innerText = 'x';
        new_el_button_delete.className = 'new_el_buttons';
        new_el_button_delete.onclick = delete_item;


        if (parent.classList.contains('list__right')) {
            new_el_button_move.innerText = '<'
        } else {
            new_el_button_move.innerText = '>'
        }

        new_el_button_move.className = 'new_el_buttons';
        new_el_button_move.onclick = move_item;

        new_el.append(new_el_text);
        new_el.append(new_el_button_delete);
        new_el.append(new_el_button_move);
    }
}

function render() {
    // console.log('Want to see:', wantToSee)
    // console.log('Already seen:', alreadySeen)

    renderList(document.querySelector('.list__left'), wantToSee);
    renderList(document.querySelector('.list__right'), alreadySeen);
}

function click(event) {
    let open = this; // В this будет элемент, по которому кликнули

    let list_1 = open.querySelector('.list-1')
    if (open.className == 'open_list') {
        open.className = 'list'
        list_1.style.display = 'none';
    } else {
        open.className = 'open_list'
        list_1.style.display = 'block';
    }
}


function inputEnter(event) {
    if (event.key == 'Enter') {
        add.apply(this.nextElementSibling)
    }
}

function inputOnFocus() {

    if (this.classList.contains('invalid')) {
        this.classList.remove('invalid');

    } else {
        this.setAttribute('class', 'input invalid')
    }
}

function add() {
    let button = this;
    let parent = button.parentNode;
    let cnt_input = parent.querySelector('input')


    if (cnt_input.value.trim() == '') {
        alert('Кажется, чего-то не хватает... ')
        return
    } else if (parent.classList.contains('list__right')) {
        alreadySeen.push(cnt_input.value);
        cnt_input.value = '';
    } else {
        wantToSee.push(cnt_input.value);
        cnt_input.value = '';
    }



    save()
    render();

}


function delete_item(event) {

    let target = event.target;
    let parent = target.parentNode;
    let parent_1 = parent.parentNode;

    if (parent_1.classList.contains('list__right')) {
        alreadySeen.splice(parent.dataset.index, 1);

    } else {
        wantToSee.splice(parent.dataset.index, 1)

    }
    save()
    render()

}


function delete_all(event) {

    let target = event.target;
    let parent = target.parentNode;
    let parent_1 = parent.parentNode;




    if (parent.classList.contains('list__right')) {
        alreadySeen.splice(0, alreadySeen.length);

    } else {
        wantToSee.splice(0, wantToSee.length);

    }
    save()
    render()

}

function move_item(event) {

    let target = event.target;
    let parent = target.parentNode;
    let parent_1 = parent.parentNode;

    if (parent_1.classList.contains('list__right')) {
        let el = alreadySeen.splice(parent.dataset.index, 1);
        wantToSee.push(el[0])

    } else {
        let el = wantToSee.splice(parent.dataset.index, 1)
        alreadySeen.push(el[0])
    }
    save()
    render()


}

function list_1_click(event) {
    event.stopPropagation();
}

// ---------------------------------------------------------

// РЕАЛИЗАЦИЯ / ИМПЛЕМЕНТАЦИЯ (от implement - реализовать)

load();
render();



for (const el of document.querySelectorAll('.list-1')) {
    el.addEventListener('click', list_1_click)
}

for (const el of document.querySelectorAll('.list-1 input')) {
    el.addEventListener('focus', inputOnFocus);
    el.addEventListener('keydown', inputEnter);
}

for (const el of document.querySelectorAll('.list-1 .btn')) {
    el.addEventListener('click', add);
}

let divs_arr = document.querySelectorAll('.list')
for (const el of divs_arr) {
    el.addEventListener('click', click)

}

let btn_delete_all = document.querySelectorAll('.btn_delete_all');
for (const el of btn_delete_all) {
    el.addEventListener('click', delete_all)

}



