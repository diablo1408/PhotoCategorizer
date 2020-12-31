document.querySelectorAll('.new').forEach(item => {
    item.addEventListener('click',(e)=>{
    e.stopPropagation();      
    })
})