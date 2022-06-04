import './style.css';
import Check from './check.svg';
import Trash from './trash.svg';
import EditList from './editnote2.svg';
import RemoveList from './removeplaylist.svg'
import { list } from 'postcss';


//logic for lists -- adding lists/tasks/appending/tracking complete and incomplete

const listLogic = (() => {
    //initializing counter variables for lists and tasks (for unique id assignment)
    
    let taskCounter = 0
    let listCounter = 0

    //index of lists; initializing default list
    const listIndex = {
        lists: [
            {listName: 'default list',
            listId:'0',
            tasks: []
            }
        ]
    };
    
    //increments the counter and returns a new list id
    const getNewListId= () => {
        parseInt(listCounter++)
        return listCounter
    }
    
    //factory function for new lists
    
    const newList = (listName, listId) => {
        return {
        listName: listName,
        listId: listId,
        tasks: []
        } 
    };

    /*factory function for tasks*/ 

    const newTask = (title, description, dueDate, priority, complete = false) => {
        return {title, description, dueDate, priority, complete, taskId}
    };
    

    //finds the appropriate list with a provided id at the list's task array
    const matchId = ()=> {
        for (let i= 0; i < listIndex.lists.length; i++) {
            
            if (listIndex.lists.at(i).listId == helpers.getSelectedListId()) {
                
                const listMatch = listIndex.lists.at(i).tasks
                return listMatch

            }
        }
    };


    //finds the list at the level of the list
    const matchIdAtList = () => {
        for (let i = 0; i < listIndex.lists.length; i++) {
            
            if (listIndex.lists.at(i).listId == helpers.getSelectedListId()) {
                const match = listIndex.lists.at(i)
                return match
            }
        
        }
    }

    
   

    return {
            
            //makes the list index available
            getListIndex: () => {
                return listIndex
            },
            
            //gets current task count
            getTaskCount: () => {
                return taskCounter
            },

            //gets current list count
            getListId: () => {
                parseInt(listCounter)
                return listCounter
            },

            //gets a new data index number for newly created tasks
            newDataIndex: () => {
                const differentDataIndex = parseInt(taskCounter++)
                return differentDataIndex
            },


            //creates and adds list to index of lists
            createListAndAddToIndex: (listName) => {
                const list = newList(listName, getNewListId())
                addListToIndex(list, listIndex)
            },

            //creates and returns a new task object
            newTask: (title, description, dueDate, priority, dataIndex, listId, complete= false) => {
                return {title, description, dueDate, priority, complete, dataIndex}
            },

            //gets currently selected list id with matchId and pushes to the matched list
            addTask: (task, id) => {
                const listToAddTo = matchId(id)
                console.log(listToAddTo)
                listToAddTo.push(task)
                
            },

            //marks a task complete when the corresponding check button is clicked and unclicked;
            //mapped in addListeners()
            completeTask: (id, dataIndex) => {
                const list = matchId(id);
                console.log(list)
                const targetTask = list.findIndex(task => task.dataIndex == dataIndex)
                console.log(targetTask)
                if (list[targetTask].complete == true) {
                    list[targetTask].complete = false
                }
                else {
                    list[targetTask].complete = true
                }
            },

            //deletes appropriate task from the list index
            removeTask: (id, dataIndex) => {
                const targetList = matchId(id);
                const targetTaskIndex = targetList.findIndex(task => task.dataIndex == dataIndex);
                console.log(targetList[targetTaskIndex])
                targetList.splice(targetTaskIndex, 1)
                console.log(targetList)
            },

            //returns a new list
            createNewList: (name, ListID) => {
                return ({name, ListID}) 
            },

            //deletes a list and all associated tasks from the list index
            deleteList: (id) => {
                const listForDeletion = matchIdAtList(id);
                console.log(listForDeletion)
                
                const indexToChange = listIndex.lists.indexOf(listForDeletion)
                console.log(indexToChange)
                console.log(listIndex.lists[indexToChange])
                console.log(listIndex)
                listIndex.lists.splice(indexToChange, 1)
                
            },
            
        }
})()


//this probably could be rolled into list logic -- originally meant to try a pub/sub;
//serves the purpose of storing and returning the last clicked list tab
const helpers = (() => {
    
    const selectedListId = ['0']
    
    return {
        

        storeSelectedListId: (input) => {
            selectedListId.push(input)
            console.log(input)
            console.log(selectedListId)
        },

        getSelectedListId: () => {
            
            return selectedListId.at(-1)            
        }

    }



})()




/*listeners for the persistent html elements; dynamic elements have listeners added
at the time of their generation*/


const addListeners = (() => { 

    const defaultListTab = document.getElementById('default-list-tab')
    defaultListTab.addEventListener('click', () => {
        helpers.storeSelectedListId(0)
    })

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

//main button = + button; main ui dropdown toggle

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

   
    //dropdown toggle for the new list input 
   
   const newListButton = document.getElementById('new-list-main');
   const newListForm = document.getElementById('new-list-form')
   newListButton.addEventListener('click', () => {
    toggleVisible(newListForm)
    })

    
    //new list button -- creates list object and adds it to the index
    
    const makeNewListButton = document.getElementById('new-list-menu-check')

    makeNewListButton.addEventListener('click', () => {
            const listIndex = listLogic.getListIndex()
            console.log(helpers.getSelectedListId())
            const title = document.getElementById('new-list-name-main').value
            const newList = listLogic.createListAndAddToIndex(title)
    
        })
    
    
    //closes new list drop down
    
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

    //closes dropdown for new task
    const cancelAddButton = document.getElementById('cancel-add') 
    cancelAddButton.addEventListener('click', () => {
        
        const dropDown = document.getElementById('new-task-form');
        
        dropDown.classList.add('hidden')
        dropDown.classList.remove('block')
    })

    //dropdown script for new task button
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

    
    //adds the actual task and appends a new task div and adds task to list
    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', () => {
        //get values from form, creates task object and ads task to appropriate list; 
        //also adds the div  
        const dataIndex = listLogic.newDataIndex();
        const title = document.getElementById('task').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due').value;
        const priority = document.getElementById('prio').value;
        const task = listLogic.newTask(title, description, dueDate, priority, dataIndex);
        listLogic.addTask(task)
        addTaskCard.appendTaskCard(dataIndex);
    
    })
    

})()



const addTaskCard = (() => {
    
    const listIndex = listLogic.getListIndex()
    
    //return the containing task card
    const makeTaskCardDiv = () => {
        const listId = helpers.getSelectedListId() 
        const taskCardDiv = document.createElement('div')
        taskCardDiv.className = "task-div col-span-full task-div bg-white gap-2 py-4 px-5 flex overflow-hidden shadow rounded-lg";
        taskCardDiv.setAttribute('data-list-id', listId)        
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
    
    /*returns button div for taskCard with svgs as buttons and listeners appended*/
    const makeButtons = (dataIndex, taskCard) => { 

        //containing button div
        const buttonDiv = document.createElement('div')
        buttonDiv.className = 'flex gap-2 justify-center'
        
        //check button and svg creation
        const checkButton = document.createElement('button')
        const check = new Image();
        check.src = Check
        checkButton.classList = 'h-6 w-6 bg-indigo-600 rounded ring-white ring-2 text-white text-center hover:bg-indigo-700 focus:outline-3 outline-white';

        //trash button and svg creation
        const trashButton = document.createElement('button')
        const trash = new Image();
        trash.src = Trash;
        trashButton.classList = 'h-6 w-6 bg-indigo-600 rounded ring-white ring-2 text-white text-center hover:bg-indigo-700 focus:outline-3 outline-white'
        
        //creates divs for each button
        const trashDiv = document.createElement('div');
        const checkDiv = document.createElement('div');
        checkDiv.appendChild(checkButton);
        checkButton.dataset.indexNumber = dataIndex; //data-index is unique to each task
        
        trashDiv.appendChild(trashButton);
        trashButton.appendChild(trash);
        trashButton.dataset.indexNumber = dataIndex; //data-index is unique to each task
        
        checkButton.appendChild(check);
        buttonDiv.appendChild(checkDiv);
        buttonDiv.appendChild(trashDiv)


        //check button -- when clicked, turns task card green and ticks the list complete/incomplete
        checkButton.addEventListener ('click', () => {
            const divs = document.querySelectorAll('.task-div')
            
            divs.forEach( (div) => {
                const divDataIndex = div.getAttribute('data-index')
                const checkButtonDataIndex = checkButton.getAttribute('data-index-number')
                if (divDataIndex == checkButtonDataIndex) {
                    listLogic.completeTask(helpers.getSelectedListId(), divDataIndex)
                    if (div.classList.contains('bg-green-200')) {
                        div.classList.remove('bg-green-200')
                    }
                    else {
                        div.classList.add('bg-green-200')
                    }
                    if (div.classList.contains('border-white')) {
                        div.classList.remove('border-white')
                    }
                    else {
                        div.classList.add('border-white')
                    }
                }
            })
        })

        
        //trash button deletes div and removes the task from the corresponding list
        trashButton.addEventListener ('click', () => {
            const divs = document.querySelectorAll('.task-div')
            
            divs.forEach( (div) => {
                const divDataIndex = div.getAttribute('data-index')
                console.log(divDataIndex)
                const trashButtonDataIndex = trashButton.getAttribute('data-index-number')
                console.log(trashButtonDataIndex)
                if (divDataIndex == trashButtonDataIndex) {
                    listLogic.removeTask(helpers.getSelectedListId(), divDataIndex)
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
   
    //appends all created elements to the containing div
    const appendElements = (taskCardDiv, textDiv, buttonDiv, priority) => {
        const taskList = document.getElementById('task-list');
        taskList.appendChild(taskCardDiv);
        taskCardDiv.appendChild(textDiv);
        taskCardDiv.appendChild(buttonDiv);
        checkPrio(taskCardDiv, priority)
        return taskCardDiv
    }

    //tab for list browsing
    const makeNewListTab = (title) => {
        //container div where new list tab buttons will be appended
        const tabContainer = document.getElementById('tab-container');
        
        //list number is unique and increments the list counter variable
        const listNumber = listLogic.getListId()
        
        //new div container for the list tab/button
        const newListDiv = document.createElement('div');
        newListDiv.className = 'list-button-container';
        tabContainer.appendChild(newListDiv);
        newListDiv.className = 'list-div flex px-4 py-4 pb-0 pt-2 rounded-t-lg border-b-0 gap-2 bg-gray-200 justify-center'
        newListDiv.id = `list-${listNumber}`;
        newListDiv.setAttribute('data-list-id', `${listNumber}`)        

        //div for the main button and text
        const listButton = document.createElement('button');
        listButton.textContent = title;
        listButton.className += 'list-tab-button'
        listButton.setAttribute('data-list-id', `${listNumber}`)
        listButton.addEventListener('click', () => {
            helpers.storeSelectedListId(listButton.getAttribute('data-list-id'))
        })

        //add listeners to button
        listButton.addEventListener ('click', () => {
            
            //checks data id and adds border to selected tab
            const allButtons = document.querySelectorAll('.list-tab-button')
            allButtons.forEach((button) => {
                const dataId = button.dataset.listId
                
                if (dataId == helpers.getSelectedListId()) {
                    button.parentElement.classList.add('border-4', 'border-amber-200', 'justify-self-center')
                }
                else {
                    button.parentElement.classList.remove('border-4', 'border-amber-200')
                }
                
            })

            

            //hides and reveals tasks for selected list tab
            const listItems = document.querySelectorAll(`.task-div`)
            listItems.forEach((item) => {
                const currentListId = helpers.getSelectedListId()
                const itemId = item.dataset.listId
                if (currentListId == itemId) {
                    item.classList.remove('hidden')
                }
                else if (currentListId != itemId) {
                    item.classList.add('hidden')
                }
            })
            
            
        })
        
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
        
        //listener for delete-list button
        deleteButton.addEventListener('click', ()=> {
            console.log(deleteButton.dataset.listId)
            const listDivs = document.querySelectorAll('.list-div')
            console.log(listDivs)
            listDivs.forEach( (div) => {
                console.log(deleteButton.dataset.listId)
                if (deleteButton.dataset.listId == div.dataset.listId) {
                    div.remove()
                    const divs = document.querySelectorAll(`[data-list-id="${deleteButton.dataset.listId}"]`)
                    divs.forEach((card) => {
                        card.remove()
                    })
                }
            })
            listLogic.deleteList(helpers.getSelectedListId())
            console.log(listLogic.getListIndex)
        })
        
        //svg
        const deleteListIcon = new Image();
        deleteListIcon.src = RemoveList;

        //append
        deleteButton.appendChild(deleteListIcon);
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
        
        
        

    }

    //public functions
    return { 
        //takes the dataindex (taskid), title, description and other input and creates
        //the task card on the page
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
    

        //new list
        newListTab: (listIndex) => {
            const title = document.getElementById('new-list-name-main').value;
            makeNewListTab(title);   
        }
    }
})()

/////--------------------------****************************testtttsss


const newListButton = document.getElementById('new-list-menu-check')



newListButton.addEventListener('click', ()=> {
    addTaskCard.newListTab()
})




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
        console.log(listIndex.lists.at(i))
        if (listIndex.lists.at(i).listId == id) {
            console.log('bingo')
            console.log(listIndex.lists.at(i).listName)
        }
    }
}

const listIndex = listLogic.getListIndex()





 





//a div grid will need to be added for each new list, and hidden applied to every other grid; or completely dynamically generated each time clicked.

//the selected list will need to have an id; the selected list will need to have 

/*in terms of the dom, every time a list button is clicked, the DOM should generate 
all the tasks on the list onto the screen; this can be accomplished one of two ways
we can have all of the elements rendered each time the list is clicked by looping
through the stored list or we can use css to hide and reveal the lists each time they
are clicked; i think rendering from the existing data is probably the best way; a lot of
potential issues the other way; so basically.. each list's tasks will be rendered to the dom
i am going to get very good at list and object syntax oof haha*/