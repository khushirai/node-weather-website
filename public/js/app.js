console.log('client side javascript file is loading')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
// javascript representation of that element

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


// messageOne.textContent='from javascript'


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    // to prevent the browser refreshing the page

    const location=search.value
    messageOne.textContent='loading..'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})
    console.log(location)
})