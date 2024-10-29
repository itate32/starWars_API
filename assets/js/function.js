const lightsaberSound = new Audio('assets/audio/lightsaber.mp3');
const shownCards = {
    '1-5': 0,
    '6-11': 0,
    '12-17': 0
};

async function showNextCharacter(range) {
    const [start, end] = range.split('-').map(Number);
    const charactersInfo = document.getElementById(`range${range}`);
    const currentIndex = shownCards[range];
    
    if (currentIndex < (end - start + 1)) {
        const characterIndex = start + currentIndex;
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');
        
        characterCard.addEventListener('mouseenter', () => {
            try {
                lightsaberSound.currentTime = 0;
                lightsaberSound.volume = 0.3;
                lightsaberSound.play();
            } catch (error) {
                console.error('Error al reproducir el sonido:', error);
            }
        });
        
        try {
            const response = await fetch(`https://swapi.dev/api/people/${characterIndex}/`);
            if(!response.ok) throw new Error('No se encontró el personaje');
            const data = await response.json();
            const imgUrl = `https://starwars-visualguide.com/assets/img/characters/${characterIndex}.jpg`;
            
            characterCard.innerHTML = `
                <img src="${imgUrl}" alt="${data.name}" onerror="this.src='https://starwars-visualguide.com/assets/img/placeholder.jpg'">
                <h3>${data.name}</h3>
                <p><strong>Altura:</strong> ${data.height} cm</p>
                <p><strong>Peso:</strong> ${data.mass} kg</p>
            `;
        } catch (error) {
            characterCard.innerHTML = `
                <img src="https://starwars-visualguide.com/assets/img/placeholder.jpg" alt="Personaje no encontrado">
                <h3>¡Ups! No pudimos encontrar el personaje 🥺</h3>
            `;
            console.error('Error:', error);
        }

        charactersInfo.appendChild(characterCard);

        try {
            lightsaberSound.currentTime = 0;
            await lightsaberSound.play();
        } catch (error) {
            console.error('Error al reproducir el sonido:', error);
        }

        setTimeout(() => {
            characterCard.classList.add('visible');
        }, 100);

        shownCards[range]++;
    }
}

document.querySelectorAll('.timeline-header').forEach(button => {
    button.addEventListener('click', () => {
        const range = button.getAttribute('data-range');
        showNextCharacter(range);
    });

});

document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        try {
            lightsaberSound.currentTime = 0;
            lightsaberSound.play();
        } catch (error) {
            console.error('Error al reproducir el sonido:', error);
        }
    });
});