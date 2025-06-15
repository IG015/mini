let isLoading = false;

const loadImage = async () => {
    if (isLoading) return;
    isLoading = true;

    try {

        const el = document.querySelector('#dogEl')

        const img = await getAnImage()
        console.log(await img)
        el.src = `${img}`

        if (el.classList.contains('blur'))
            el.classList.remove('blur')

    } catch (err) {
        console.error({ err })
    }finally{
        isLoading = true;
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