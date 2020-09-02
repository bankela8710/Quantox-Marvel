$(document).ready(function () {

    marvelCharacters();

    const btn = document.querySelector('.marvel-btn');
    console.log(btn);
    // btn.addEventListener('click', marvelCharacters);

    const inputElement = document.querySelector('.input-filter-data');

    inputElement.addEventListener('keydown', checkAdult);
    //inputElement.addEventListener('keydown', marvelCharacters);


    let charactersArray = [];

    function marvelCharacters() {

        $public_key = 'e61bcf4c8bbbfae58170aa8d0154baa0';
        $private_key = '31a1937e4bd8c3fb42cf6cbb01d82b5083fa32cc';

        let name = $('#name').val();
        $.ajax({

            url: 'https://gateway.marvel.com:443/v1/public/characters?',

            data: {
                // name:name,
                apikey: $public_key
            }

        })

                .done(function (response) {

                    if (response.code === 200) {
                        //console.log('ulazak');

                        charactersArray = response.data.results;
                        renderHeros(charactersArray);
                    }

                })
                .fail(function (jgXHR, textStatus) {
                    console.log(jgXHR, textStatus);
                })
                .always();


    }


    function renderHeros(charactersArray) {
        //console.log( document.getElementById('character'));
        document.getElementById('character').innerHTML = "";
        // console.log( document.getElementById('character'));
        for (i = 0; i < charactersArray.length; i++) {
            img = charactersArray[i].thumbnail.path + '/portrait_uncanny';

            const imageSource = img + '.' + charactersArray[i].thumbnail.extension;

            var eleImage = document.createElement("div");
            const imageContainer = document.createElement("img");

            imageContainer.setAttribute("src", imageSource);
            eleImage.appendChild(imageContainer);

            let wrapper = document.createElement("div");
            let title = document.createElement("h4");
            title.innerText = charactersArray[i].name;

            wrapper.appendChild(eleImage);
            wrapper.appendChild(title);


            document.getElementById('character').appendChild(wrapper);

        }
    }

    function checkAdult(data) {
        // console.log(data);
        let hero = document.getElementById('name-hero').value.toUpperCase();
        console.log(hero);

        let filteredHeros = charactersArray.filter(
                itemHero => {
                    return itemHero.name.toUpperCase().includes(hero);
                }
        );

        renderHeros(filteredHeros);
        console.log(filteredHeros);




    }

});

