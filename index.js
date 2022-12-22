


let titles;
const anime_list = async () => {
    const response_1 = await fetch('https://shikimori.one/api/animes?limit=50&order=popularity&page=1')
    const titles_1 = await response_1.json()
    const response_2 = await fetch('https://shikimori.one/api/animes?limit=50&order=popularity&page=2')
    const titles_2 = await response_2.json()
    const response_3 = await fetch('https://shikimori.one/api/animes?limit=50&order=popularity&page=3')
    const titles_3 = await response_3.json()

    const titles = titles_1.concat(titles_2, titles_3);
    return titles;
}



anime_list().then((result) => {
    titles = result;
    console.log(titles);
});


//import { add, save, render } from './dnevnik.js'; ЧТО ТО НЕ ТО

const onButtonClick = function () {
    let text = document.querySelector('#left_section');

    if (titles.length == 0) {
        text.innerText = 'Эй, сначала эти посмотри! Уходи отсюда.'
        return;
    }

    const rand = Math.floor(Math.random() * titles.length);

    let anime = titles[rand]

    text.innerHTML = `
        <div id='new_anime'>
            <img src="https://shikimori.one${anime.image.original}">
           <div id='new_anime_p'>
            <p><b>${anime.name} / ${anime.russian}</b></p>
            <p>Рейтинг: ${anime.score}</p>
            <p>Эпизоды: ${anime.episodes}</p>
            <p>Дата выхода: ${anime.aired_on}</p>
            <p><a target="_blank" href="https://shikimori.one${anime.url}">Подробнее</a></p>
            </div>
        </div>
    `;

    //text.innerText = anime.name;
    text.style.fontSize = '20px';

    console.log(titles[rand]);

    let div_for_btn = document.createElement('div');
    text.append(div_for_btn)

    let btn = document.createElement('button');
    div_for_btn.append(btn);
    btn.className = 'sliding-button';
    btn.style.float = 'left';
    btn.style.marginTop = '25px';
    btn.innerText = 'Again!';
    btn.onclick = onButtonClick;

    let btn_2 = document.createElement('button');
    div_for_btn.append(btn_2);
    btn_2.className = 'sliding-button';
    btn_2.style.marginTop = '25px';
    btn_2.innerText = 'Add to wishlist';
    btn_2.onclick = add;

    titles.splice(rand, 1)
}

document.querySelector('.sliding-button').onclick = onButtonClick;


