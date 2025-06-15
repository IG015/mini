

let isLoading = false
let changeImageTimeout;
let lastClassFormat = 'circle'

const loadImage = async () => {
    if (isLoading) return;
    isLoading = true

    try {
        const el = document.querySelector('#dogEl')
        const img = await getAnImage()

        el.src = img

        if (el.classList.contains('blur')) {
            el.classList.remove('blur')
        }

        updateImageFormat()

    } catch (err) {
        console.error({ err })
    } finally {
        isLoading = false
    }
}

const getAnImage = async () => {
    try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random')


        if (res.ok) {
            const content = await res.json()

            return content.message
        } else {
            throw new Error('Failed to load image from API.')
        }

    } catch (err) {
        console.error({ err })
        return 'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg'
    }
}

const scheduleNextImageChange = () => {
    clearTimeout(changeImageTimeout)

    changeImageTimeout = setTimeout(() => {
        loadImage()
        scheduleNextImageChange()
    }, 3000)
}

const updateImageFormat = () => {
    const el = document.querySelector('#dogEl')
    const arrFormats = ['squircle', 'heart', 'hexagon', 'hexagon-2', 'decagon', 'pentagon', 'diamond', 'circle', 'triangle-2']
    const filteredFormats = arrFormats.filter(item => item !== lastClassFormat)

    // REMOVE apenas as classes que começam com 'mask-' EXCETO 'mask'
    el.classList.forEach(cls => {
        if (cls.startsWith('mask-') && cls !== 'mask') {
            el.classList.remove(cls)
        }
    })

    const randomItem = filteredFormats[Math.floor(Math.random() * filteredFormats.length)];
    lastClassFormat = randomItem

    // Garante que a classe 'mask' esteja presente
    if (!el.classList.contains('mask')) {
        el.classList.add('mask')
    }

    // Atualiza a ordem: sempre 'mask' primeiro, depois 'mask-NOME', depois as outras
    const otherClasses = Array.from(el.classList).filter(cls => cls !== 'mask' && !cls.startsWith('mask-'))
    el.className = ['mask', `mask-${randomItem}`, ...otherClasses].join(' ')
}



window.addEventListener('load', () => {
    loadImage()
    scheduleNextImageChange()
})