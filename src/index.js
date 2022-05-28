import './style.css';
import Check from './check.svg';
import Trash from './trash.svg';
import EditList from './editnote2.svg';
import RemoveList from './removeplaylist.svg'
import { list } from 'postcss';


//logic for lists -- adding lists/tasks/appending/tracking complete and incomplete

const listLogic = (() => {
    /*initializing arrays*/
    
    const listIndex = {
        lists: []
    };
    
    const defaultList = {
        name: 'default list',
        id: '0',
        tasks: []
    };

    //gets ListId based on the 
    const getNewListId = (listIndex) => {

        if (listIndex.lists.length == 0) {
            var listId = 1
            return listId
        }
        else if (listIndex.lists.length > 0) {
            var listId = listIndex.lists.at(-1).listId+1
            return listId
        }
    };
    
    //factory function for new lists
    const listId = getNewListId(listIndex)
    const newList = (listName, listId) => {
        return {
        listName: listName,
        listId: listId,
        tasks: []
        } 
    };

    /*factory function*/ 

    const newTask = (title, description, dueDate, priority, complete = false) => {
        return {title, description, dueDate, priority, complete}
    };

    //add list to index
    const appendList = (list, listIndex) => {
        listIndex.lists.push(list)
    };
    
    //adds a task to task list in array in appropriate list
    /*const addToList = (task, listId, listIndex) => {
        for (list in listIndex.lists) {
            if (list[listId] == listId) {
                list.push(task)
            }
        }
    };

    const matchListId = (id)=> {
        listIndex.lists.forEach(list, () => {
            if (list[id] == id) {
                return true
            }
        })
    };*/

    
    
    const addTaskToList = (randomtask, listIndex) => {
        listIndex.lists.at(-1).tasks.push(randomtask);
    };
    

    return {

            
            getListIndex: () => {
                return listIndex
            },
            
            newListId: () => {
                return getNewListId(listIndex)
            },

            //creates and adds list to index of lists
            createListAndAddToIndex: (listName) => {
                const list = newList(listName, getNewListId(), listIndex)
                addListToIndex(list, listIndex)
            },

            //creates and returns a new task object
            newTask: (title, description, dueDate, priority, complete= false) => {
                return {title, description, dueDate, priority, complete}
            },
            
        
            matchForList: (id) => {
                listIndex.lists.forEach(() => {
                    if (list[id] == id) {
                    return true; 
                    }
                })
            },

            addTask: (task) => {
                listIndex.lists.tasks.push(task)
                tasks.push(task)
            },

            addTasksToList: (task) => {
                taskLists = taskList()
                taskLists.list1.tasks.push(task)
            },

            
            createNewList: ({name, ListID}) => {
                return ({name, ListID}) 
            }
        }
})()

const helpers = (() => {
    return {
        storeSelectedListId: (input) => {
            return input
        }
    }

})()




/*Listener for new task dropdown button - changes display from hidden to block*/


const addListeners = (() => { 


    const toggleVisible = (element) => {
        if (element.classList.contains('hidden')) {
            element.classList.add('block')
            element.classList.remove('hidden')
        }

        else if (element.classList.contains('block')) {
            element.classList.add('hidden')
            element.classList.remove('block')
        }
    }


    const mainButton = document.getElementById('main-button');
    mainButton.addEventListener('click', ()=> {
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

    
   const newListButton = document.getElementById('new-list-main');
   const newListForm = document.getElementById('new-list-form')
   newListButton.addEventListener('click', () => {
    toggleVisible(newListForm)
    })

    const makeNewListButton = document.getElementById('new-list-menu-check')

    makeNewListButton.addEventListener('click', () => {
        
    })
    
    
    const cancelNewListButton = document.getElementById('cancel-new-list-menu-x');
    cancelNewListButton.addEventListener('click', () => {
        const newListForm  = document.getElementById('new-list-form');
        if (newListForm.classList.contains('hidden')) {
            newListForm.classList.add('block');
            newListForm.classList.remove('hidden');
        }
        else {
            newListForm.classList.remove('block')
            newListForm.classList.add('hidden')
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
    
    const listIndex = listLogic.getListIndex()
    const listId = helpers.storeSelectedListId(listIndex.lists.length)
    const dataIndex = 2
    const makeTaskCardDiv = () => {
        const listId = helpers.storeSelectedListId(listIndex.lists.length)
        const taskCardDiv = document.createElement('div')
        taskCardDiv.className = "col-span-full task-div bg-white gap-2 py-4 px-5 flex overflow-hidden shadow rounded-lg";
        taskCardDiv.setAttribute('data-list-id', listId)
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

    const makeNewListTab = (title) => {
        //container div where new lists will be appended
        const tabContainer = document.getElementById('tab-container');

        const listNumber = listLogic.newListId(listLogic.getListIndex())
        
        //new div container for the list tab/button
        const newListDiv = document.createElement('div');
        newListDiv.className = 'list-button-container';
        tabContainer.appendChild(newListDiv);
        newListDiv.className = 'list-div flex px-4 py-4 pb-0 pt-2 rounded-t-lg border-b-0 gap-2 bg-gray-200 justify-center'
        newListDiv.id = `list-${listNumber}`;
        newListDiv.setAttribute('data-list-id', `${listNumber}`)        

        //div for the main button and text
        const listButton = document.createElement('button');
        listButton.textContent = title
        listButton.setAttribute('data-list-id', `${listNumber}`)

        //append containing div
        newListDiv.appendChild(listButton)

        //edit and delete button div
        const editAndDeleteButtonDiv = document.createElement('div');
        editAndDeleteButtonDiv.className = 'list-tab-buttons-div delete-list flex-col flex bg-gray-200 flex'
        
        //append to containg div
        newListDiv.appendChild(editAndDeleteButtonDiv)
        
        
        //deleteButton div and button -- need to import SVGS
        const deleteButtonDiv = document.createElement('div')
        deleteButtonDiv.className = 'delete-button-div'
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('data-list-id', `${listNumber}`)
        deleteButton.className = 'flex delete-list justify-center';
        deleteButton.addEventListener('click', ()=> {
            console.log(deleteButton.dataset.listId)
            const listDivs = document.querySelectorAll('.list-div')
            console.log(listDivs)
            listDivs.forEach( (div) => {
                console.log(deleteButton.dataset.listId)
                if (deleteButton.dataset.listId == div.dataset.listId) {
                    div.remove()
                    
                }
            })
        })
        //svg
        const deletePlaylist = new Image();
        deletePlaylist.src = RemoveList;

        //append
        deleteButton.appendChild(deletePlaylist);
        deleteButtonDiv.appendChild(deleteButton);
        editAndDeleteButtonDiv.appendChild(deleteButtonDiv);

        //editButton div and button
        const editButtonDiv = document.createElement('div');
        editButtonDiv.className = 'edit-button-div';
        

        //svg
        const editListIcon = new Image();
        editListIcon.src = EditList;
        const editButton = document.createElement('button');
        editButton.className = 'flex edit-name justify-center';
        editButton.setAttribute('data-list-id', `${listNumber}`)

        //append
        editButton.appendChild(editListIcon);
        editButtonDiv.appendChild(editButton);
        editAndDeleteButtonDiv.appendChild(editButton);
        
        
        listButton.addEventListener ('click', () => {
            const listItems = document.querySelectorAll(`[data-list-id-${listNumber}]`)
            
            listItems.forEach((item) => {
                if (item.dataset.listId == listButton.dataset.listId) {
                    addListeners.toggleVisible(item)
                }
            })
        })

    }

    //public functions
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
        appendElements(prioCheckedTaskDiv, makeTextDiv(title, description, dueDate), makeButtons(dataIndex, prioCheckedTaskDiv))},
    
        newListTab: (listIndex) => {
            const title = document.getElementById('new-list-name-main').value;
            makeNewListTab(title);   
        }
    }
})()

/////--------------------------****************************testtttsss
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', () => {
    

    const title = document.getElementById('task').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due').value;
    const priority = document.getElementById('prio').value;
    

    task = listLogic.newTask(title, description, dueDate, priority);
    
    const dataIndex = 2;
    addTaskCard.appendTaskCard(dataIndex);
    

    })

const newListButton = document.getElementById('new-list-menu-check')



newListButton.addEventListener('click', ()=> {
    addTaskCard.newListTab()
})


const newTask = (title, description, dueDate, priority, complete= false) => {
    return {title, description, dueDate, priority, complete}
}


const matchListId = (id)=> {
    listIndex.lists.forEach(list, () => {
        if (list[id] == id) {
            return true
        }
    })
};



const newList = (listName, listId) => {
    return {
    listName: listName,
    listId: listId,
    tasks: []
    } 
};

const addListToIndex = (list, listIndex) => {
    listIndex.lists.push(list)
}
 



const addListButton = document.getElementById('new-list-menu-check');


const randomtask = newTask('finish this', 'finish it by tomorrow or the day after', '6-16-1988', 'High')

const addTaskToList = (randomtask, listIndex) => {
    listIndex.lists.at(-1).tasks.push(randomtask);
}



const matchForList = (Id) => {
    for (let list in listIndex.lists) {
        if (list.listId == Id) {
        return list; 
        }
    }
}

const matchId = (id) => {
    for (let i= 0; i < listIndex.lists.length; i++) {
        if (listIndex.lists.at(i).listId == id) {
            console.log('bingo')
            console.log(listIndex.lists.at(i).listName)
        }
    }
}

const listIndex = listLogic.getListIndex()

const getNewListId = (listIndex) => {

    if (listIndex.lists.length == 0) {
        var listId = 1
        return listId
    }
    else if (listIndex.lists.length > 0) {
        var listId = listIndex.lists.at(-1).listId+1
        return listId
    }
}



 

newListButton.addEventListener('click', () => {
    console.log(newListButton.getAttribute('data-list-id'))
    helpers.storeSelectedListId()
    const title = document.getElementById('new-list-name-main').value
    const list = newList(title, getNewListId(listIndex))
    addListToIndex(list, listIndex)
    addTaskToList(randomtask, listIndex)
    console.log(listIndex.lists)
})

console.log(listLogic.getListIndex())
console.log(listLogic.newListId(listLogic.getListIndex()))

//a div grid will need to be added for each new list, and hidden applied to every other grid; or completely dynamically generated each time clicked.

//the selected list will need to have an id; the selected list will need to have 

/*in terms of the dom, every time a list button is clicked, the DOM should generate 
all the tasks on the list onto the screen; this can be accomplished one of two ways
we can have all of the elements rendered each time the list is clicked by looping
through the stored list or we can use css to hide and reveal the lists each time they
are clicked; i think rendering from the existing data is probably the best way; a lot of
potential issues the other way; so basically.. each list's tasks will be rendered to the dom
i am going to get very good at list and object syntax oof haha*/