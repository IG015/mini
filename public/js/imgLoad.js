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

let click = false
document.addEventListener('DOMContentLoaded', () => {
    const heartButton = async (event) =>{
        try{
           

            const heartIcon = event.currentTarget.querySelector('.heart-icon'); 
            if(click == true)
            {
                console.log("01");
                click = false;
                //change color (syncronous)
                heartIcon.style.stroke = 'red';
            
               
            }else{
                click = true;
                console.log("02");
                //change color (syncronous)
                heartIcon.style.stroke = 'black';                              
        }
        return true;
        } catch (err) {
            console.error({err});
            return err;
        }
        
        
    }

document.getElementById('heartButton').addEventListener('click', (e) => {
    heartButton(e).catch(err => console.error('Error in heartButton:', err));
});
});

let rowLoad = false;
const loadRow = async() =>{
    if(rowLoad) return;
    rowLoad = true;
    try{    
        //const rowID = document.querySelector('dogRow01')
        const rowImage = document.querySelector('#Dog01')
        const dogName = document.querySelector('#dogName01')
        const [image,name] = await Promise.all([
            get_breeend(),get_Name()
        ]);

        dogName.textContent = name;
        rowImage.src = image;

    }catch(error){
        console.error(error);
    }
    finally{
        rowLoad = true;
    }
}
let breed_load = false;

// const load_breend = async () => {
//     if (breed_load) return;
//     breed_load = true;

//     try{
//         const Dog01_id = document.querySelector('#Dog01')
//         const dogname = document.querySelector('#dogName01')
//         const Dog01_image = await get_breeend()
//         console.log(Dog01_image)
        
//         dogname.textContent = await get_Name();

//         Dog01_id.src = `${Dog01_image}`;       
//     }
//     catch (error){
//         console.error(error);
//         return null;
//     }
//     finally{
//         breed_load = true;
//     }
// }
const get_breeend = async() => {
    try {
        const breed = await fetch('https://dog.ceo/api/breed/pitbull/images/random')

        if(breed.ok){
            const content = await breed.json()
            return content.message
        
        }else{
            throw new Error('Falied to load image from API.')
        }
        
    } catch (error) {
        console.error(error);
        return null;
    }
    
}


const get_Name = async() =>{
    try{   
        const id = await fetch('https://randomuser.me/api/')
        const data = await id.json();

        const name = data.results[0].name.first;
        console.log('Dog name ',name);
        return name;

    }catch(error){
        console.error(error);
        return null;
    }
}
