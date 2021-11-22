const listLeft = document.getElementById('listLeft')
const listRight = document.getElementById('listRight')

window.addEventListener('load', (e) => {
    const left = localStorage.getItem('listLeft')

    const right = localStorage.getItem('listRight')

    if (left) {
        listLeft.innerHTML = ''
        listLeft.innerHTML = left
    }
    if (right) {
        listRight.innerHTML = ''
        listRight.innerHTML = right
    }
})

/* Functions drag and drop use for list*/
const dragStart = (e) => e.dataTransfer.setData('text/plain', e.target.id)

const addAnimationDrag = (element) => element.classList.add('animation--drag')

const removeAnimationDrag = (element) => element.classList.remove('animation--drag')

const transferElement = (e, initialList, finishList) => {
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
    localStorage.setItem('listRight', listRight.innerHTML)
    localStorage.setItem('listLeft', listLeft.innerHTML)
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

    localStorage.setItem('listLeft', listLeft.innerHTML)
    localStorage.setItem('listRight', listRight.innerHTML)
})
