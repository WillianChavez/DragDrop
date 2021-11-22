const listLeft = document.getElementById('listLeft')
const listRight = document.getElementById('listRight')

window.addEventListener('load', () => {
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

const addAnimationDrag = (list) => list.classList.add('animation--drag')

const addAnimationDragItem = (element) => {
    if (element) element.classList.add('list__item--dragstart')
}
const removeAnimationDrag = (list) => list.classList.remove('animation--drag')

const removeAnimationDragItem = (element) => {
    if (element) element.classList.remove('list__item--dragstart')
}
const overElement = (element) => {
    if (element.classList.contains('list__item')) {
        element.classList.add('list__item--over')
    }
}

const removeOverElement = (element) => {
    if (element.classList.contains('list__item')) {
        element.classList.remove('list__item--over')
    }
}

const transferElement = (e, finishList) => {
    const element = document.getElementById(e.dataTransfer.getData('text/plain'))
    const dropElement = e.target

    removeAnimationDrag(finishList)
    removeAnimationDragItem(element)

    if (dropElement.id != element.id && dropElement.classList.contains('list__item')) {
        dropElement.insertAdjacentElement('afterend', element)
    } else {
        finishList.appendChild(element)
    }

    localStorage.setItem('listRight', listRight.innerHTML)
    localStorage.setItem('listLeft', listLeft.innerHTML)
}

/*Event Listener for list */

// listener for listLeft
listLeft.addEventListener('dragstart', (e) => dragStart(e))

listLeft.addEventListener('drag', (e) => {
    addAnimationDrag(listRight)
    addAnimationDragItem(e.target)
})
listLeft.addEventListener('dragend', (e) => {
    removeAnimationDrag(listRight)
    removeAnimationDragItem(e.target)
})

listLeft.addEventListener('dragover', (e) => {
    e.preventDefault()
    overElement(e.target)
})

listLeft.addEventListener('dragleave', (e) => removeOverElement(e.target))

listLeft.addEventListener('drop', (e) => {
    e.preventDefault()
    removeOverElement(e.target)
    transferElement(e, listLeft)
})

// Listener for listRight

listRight.addEventListener('dragstart', (e) => dragStart(e))

listRight.addEventListener('drag', (e) => {
    addAnimationDrag(listLeft)
    addAnimationDragItem(e.target)
})

listRight.addEventListener('dragend', (e) => {
    removeAnimationDrag(listLeft, e.target)
    removeAnimationDragItem(e.target)
})

listRight.addEventListener('dragover', (e) => {
    e.preventDefault()
    overElement(e.target)
})

listRight.addEventListener('dragleave', (e) => removeOverElement(e.target))

listRight.addEventListener('drop', (e) => {
    e.preventDefault()
    removeOverElement(e.target)
    transferElement(e, listRight)
})
