const listLeft = document.getElementById('listLeft')
const listRight = document.getElementById('listRight')

/* Functions drag and drop use for list*/
const dragStart = e =>
    e.dataTransfer.setData('text/plain', e.target.id)
  
const addAnimationDrag = element =>
    element.classList.add('animation--drag')

const removeAnimationDrag = element =>
    element.classList.remove('animation--drag')

const transferElement = (e, initialList, finishList) =>{
     removeAnimationDrag(finishList)

    const element = document.getElementById(e.dataTransfer.getData('text/plain'))
    finishList.append(initialList.removeChild(element))
}

/*Event Listener for list */
listLeft.addEventListener('dragstart', (e) => dragStart(e))

listLeft.addEventListener('drag', () => addAnimationDrag(listRight))
listLeft.addEventListener('dragend', () => removeAnimationDrag(listRight))


listRight.addEventListener('dragover', (e) => {
    e.preventDefault()
})


listRight.addEventListener('drop', (e) => {
    e.preventDefault()
    transferElement(e, listLeft, listRight)
   
})

listRight.addEventListener('dragstart', (e) => dragStart(e))
listRight.addEventListener('drag', () => addAnimationDrag(listLeft))
listRight.addEventListener('dragend', () => removeAnimationDrag(listLeft))


listLeft.addEventListener('dragover', (e) => {
    e.preventDefault()
})


listLeft.addEventListener('drop', (e) => {
    e.preventDefault()
    transferElement(e, listRight, listLeft)
   
})






