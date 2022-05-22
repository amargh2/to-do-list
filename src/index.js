import './style.css';
import Check from './check.svg'
import Trash from './trash.svg'


/*basic function that returns the task as an object */

const helpers = (() => {
    return {
    getTaskList: () => {listLogic.publishIncompleteTasks()}
    }
})()

const listLogic = (() => {
    /*initializing arrays*/
    const tasks= [];
    const completedTasks = [];

    /*factory function*/ 
    const newTask = (title, description, dueDate, priority) => {
       return {title, description, dueDate, priority}
    };
    /*add task to tasks*/
    const addTask = (task) => {
        tasks.push(task)
    }

    return {
            newTask: (title, description, dueDate, priority) => {
                return {title, description, dueDate, priority}
            },
            
            addTask: (task) => {
                tasks.push(task)
            },

            publishIncompleteTasks: () => {
                return tasks
            },
            publishCompleteTasks: () => {
                return completedTasks
                }   
            }
})()





/*Listener for new task dropdown button - changes display from hidden to block*/

const addListeners = (() => { 

    const button = document.getElementById('main-button');
    button.addEventListener('click', ()=> {
    const dropDown = document.getElementById('dropdown-menu');
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
        const dropDown = document.getElementById('new-task-form');
        dropDown.classList.add('hidden')
        dropDown.classList.remove('block')
    })

    const newTaskButton = document.getElementById('new-task');
    newTaskButton.addEventListener('click', () => {
        const taskForm = document.getElementById('new-task-form');
        if (taskForm.classList.contains('hidden')) {
            taskForm.classList.add('block');
            taskForm.classList.remove('hidden');
        }
        else {
            taskForm.classList.remove('block')
            taskForm.classList.add('hidden')
        }

    })
    
})()



const addTaskCard = (() => {
    
    const makeTaskCardDiv = () => {
        const taskCardDiv = document.createElement('div')
        taskCardDiv.classList += "col-span-1 task-div bg-white gap-2 py-4 px-5 overflow-hidden shadow rounded-lg";
        //taskCardDiv.dataset.indexNumber = dataIndex;        
        return taskCardDiv
    }
    
    /*returns the title/description/date appended to a text-div*/
    
    const makeTextDiv = (title, description, dueDate) => {
        const pTitle = document.createElement('p');
        const pDescription = document.createElement('p')
        const pDate = document.createElement('p')
        
        pTitle.classList = "text-lg text-center font-sans font-semibold";
        pDate.classList = "text-lg text-center font-sans font-semibold"
        pDescription.className = 'text-center font-sans'
        pTitle.textContent = title;
        pDescription.textContent = description;
        pDate.textContent = `Due by: ${dueDate}`;


        const textDiv = document.createElement('div')
        textDiv.className = 'flex flex-col flex-nowrap'  
        
        textDiv.appendChild(pTitle)
        textDiv.appendChild(pDate)
        textDiv.appendChild(pDescription)
        return textDiv
    }
    
    /*function that returns button div for taskCard with functional svgs*/
    const makeButtons = (dataIndex, taskCard) => { 
        //tasks = helpers()

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
        checkButton.dataset.indexNumber = dataIndex;
        trashDiv.appendChild(trashButton);
        trashButton.appendChild(trash);
        trashButton.dataset.indexNumber = dataIndex;
        checkButton.appendChild(check);
        buttonDiv.appendChild(checkDiv);
        buttonDiv.appendChild(trashDiv)

        checkButton.addEventListener ('click', () => {
            const divs = document.querySelectorAll('.task-div')
            
            divs.forEach( (div) => {
                if (div.getAttribute('data-index') == checkButton.getAttribute('data-index-number')) {
                    div.remove()
                }
            })
        })

        trashButton.addEventListener ('click', () => {
            const divs = document.querySelectorAll('.task-div')
            
            divs.forEach( (div) => {
                if (div.getAttribute('data-index') == trashButton.getAttribute('data-index-number')) {
                    div.remove()
                }
            })
        })
        
        return buttonDiv
    }



    /*checks priority of the task and applies corresponding color border*/
    const checkPrio = (taskCard, priority) => {
        if (priority == 'High') {
            taskCard.className += ' border-2 border-red-500'
        }
        else if (priority == 'Medium') {
                taskCard.className += ' border-2 border-yellow-500'
            }
        else if (priority == 'Low') {
            taskCard.className += ' border-2 border-green-500'
        }
        return taskCard
    }
   
 
    const appendElements = (taskCardDiv, textDiv, buttonDiv, priority) => {
        const taskList = document.getElementById('task-list');
        taskList.appendChild(taskCardDiv);
        taskCardDiv.appendChild(textDiv);
        taskCardDiv.appendChild(buttonDiv);
        checkPrio(taskCardDiv, priority)
        return taskCardDiv
    }

    return { 
        appendTaskCard: (dataIndex) => {
        
        const title = document.getElementById('task').value
        const description = document.getElementById('description').value
        const dueDate = document.getElementById('due').value
        const priority = document.getElementById('prio').value;
        

        if (title == '' || dueDate == '') {
            alert('Please make sure you have entered a title and date!')
            return false
        };
        
        const prioCheckedTaskDiv = checkPrio(makeTaskCardDiv(), priority)
        prioCheckedTaskDiv.setAttribute('data-index', dataIndex)
        appendElements(prioCheckedTaskDiv, makeTextDiv(title, description, dueDate), makeButtons(dataIndex, prioCheckedTaskDiv))}
    }

})()

const addButton = document.getElementById('add-button');
addButton.addEventListener('click', () => {
    
    const title = document.getElementById('task').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due').value;
    const priority = document.getElementById('prio').value;
    task = listLogic.newTask(title, description, dueDate, priority);
    listLogic.addTask(task);
    const dataIndex = listLogic.publishIncompleteTasks().length;
    addTaskCard.appendTaskCard(dataIndex);

    
    })
