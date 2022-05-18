import './style.css';
import Check from './check.svg'
import Trash from './trash.svg'

const elements = {
    div: {
        create: (classes, text) => {
            
            const div = document.createElement('div');
            classes.forEach(cls => div.classList.add(cls));
            div.textContent = text;
            return div;
        }
    },
    
    button: {
        create: (classes, text) => {
            button = document.createElement('button');
            classes.forEach(cls => button.classList.add(cls));
            div.textContent = text;
        }
    },
    
    h1: {
        create: () => document.createElement('h1'),
    }
}


const buildingBlocks = {

    //helper functions for factories
    addText: (element, string) => {
        element.textContent = string;
    },

    newDiv: () => {
        const div = document.createElement('div');
        return div;
    },

    /*pass in classes and text, get back a div with the classlist created and text added*/
    divFactory: (classes, text = '') => {
        const div = buildingBlocks.newDiv();
        buildingBlocks.assignClasses(classes, div)
        if (text != '') buildingBlocks.addText(div, text);
        return div
    },

    buttonFactory: (classes, text= '') => {
    },

    /*helper function for divFactory*/
    assignClasses: function(classes, div) {
       div.classList.add(...classes); 
       return div
    },

    /*Provide values and a div with the amount of specified rows, columns, gap and flow direction will be returned. */
    makeGridContainer: (cols, rows, flow, gap) => {
        const classes = ["grid", `grid-cols-${cols}`, `grid-rows-${rows}`, `grid-flow-${flow}`, `gap-${gap}`];
        const gridContainer = buildingBlocks.divFactory(classes);
        return gridContainer
    },
};

const toDo = ({title, description, dueDate, priority}) => ({
    title,
    description,
    dueDate,
    priority,
})

const makeTaskCard = (task) => {
    const taskCard = document.createElement('div')
    const buttonDiv = buildingBlocks.divFactory('flex', ' ');
    const button = document.createElement('button');
    button.textContent = 'test'
    taskCard.appendChild(buttonDiv);
    buttonDiv.appendChild(button);
    taskCard.classList = "mx-auto bg-white flex-shrink-0 flex flex-col flex-nowrap gap-2 py-4 px-5 max-w-96 overflow-hidden shadow rounded-lg col-start-2 col-span-1"
    const p = document.createElement('p');
    p.textContent = task.title + ' ' + task.description;
    p.classList = document.getElementById('p-template').classList;
    taskCard.appendChild.p;
    document.getElementById('task-list').appendChild(taskCard);

};




const button = document.getElementById('newtask');
button.addEventListener('click', ()=> {
const dropDown = document.getElementById('dropdown');
    if (dropDown.classList.contains('hidden')) {
        dropDown.classList.add('block')
        dropDown.classList.remove('hidden')
    }
    
    else {
        dropDown.classList.remove('block')
        dropDown.classList.add('hidden')
    }
    
})

const addButton = document.getElementById('add-button')
const cancelAddButton = document.getElementById('cancel-add') 
cancelAddButton.addEventListener('click', () => {
    const dropDown = document.getElementById('dropdown');
    dropDown.classList.add('hidden')
    dropDown.classList.remove('block')
})

const tasks = []


addButton.addEventListener('click', () => {
    const title = document.getElementById('task').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due').value;
    const priority = document.getElementById('prio').value;

    if (title == '' || dueDate == null) {
        alert('Please make sure you have entered a title and date!')
        return false
    };
    
    const task = toDo({title, description, dueDate, priority});
    tasks.push(task)
    console.log(tasks)

    const taskCard = document.createElement('div')
    taskCard.classList += "bg-white flex-shrink-0 flex flex-col flex-nowrap gap-2 py-4 px-5 overflow-hidden shadow rounded-lg col-start-2 col-span-2";
    if (priority == 'High') {
        taskCard.className += ' border-2 border-red-500'
    }
    else if (priority == 'Medium') {
            taskCard.className += ' border-2 border-yellow-500'
        }
    else if (priority == 'Low') {
        taskCard.className += ' border-2 border-green-500'
    }


    taskCard.dataset.indexNumber = tasks.length
    document.getElementById('task-list').appendChild(taskCard);
    
    
    
    
    const pTitle = document.createElement('p');
    const pDescription = document.createElement('p')
    const pDate = document.createElement('p')

    pTitle.textContent = task.title;
    pDescription.textContent = task.description;
    pDate.textContent = `Due by: ${task.dueDate}`;

    console.log(pDate.textContent)

    pTitle.classList = "text-lg text-center font-sans font-semibold";
    pDate.classList = "text-lg text-center font-sans font-semibold"
    pDescription.className = 'text-center font-sans'

    const textDiv = document.createElement('div')
    const classes = ['flex', 'flex-col', 'flex-nowrap']
    textDiv.classList.add(...classes)    
    textDiv.appendChild(pTitle)
    textDiv.appendChild(pDate)
    textDiv.appendChild(pDescription)
    taskCard.appendChild(textDiv)

    const buttonDiv = document.createElement('div')
    buttonDiv.className = 'flex gap-2 justify-center'

    const checkButton = document.createElement('button')
    const check = new Image();
    check.src = Check
    checkButton.classList = 'h-6 w-6 bg-indigo-600 rounded ring-white ring-2 text-white text-center hover:bg-indigo-700 focus:outline-3 outline-white';

    const trashButton = document.createElement('button')
    const trash = new Image();
    trash.src = Trash;
    trashButton.classList = 'h-6 w-6 bg-indigo-600 rounded ring-white ring-2 text-white text-center hover:bg-indigo-700 focus:outline-3 outline-white'
    
    const trashDiv = document.createElement('div');
    const checkDiv = document.createElement('div');
    checkDiv.appendChild(checkButton);
    checkButton.dataset.indexNumber = tasks.length;
    trashDiv.appendChild(trashButton);
    trashButton.appendChild(trash);
    trashButton.dataset.indexNumber = tasks.length;
    checkButton.appendChild(check);
    buttonDiv.appendChild(checkDiv);
    buttonDiv.appendChild(trashDiv)
    taskCard.appendChild(buttonDiv)
    
    checkButton.addEventListener('click', () => {
        if (checkButton.dataset.indexNumber == taskCard.dataset.indexNumber){
            taskCard.remove()
        }
    }) 

    trashButton.addEventListener('click', () => {
        if (trashButton.dataset.indexNumber == taskCard.dataset.indexNumber) {
            taskCard.remove()
        }
    })

    
})

