import '../scss/style.scss';
import DeleteIcon from '../img/deleteIcon.png';

const addTaskField = document.getElementById('add-task-field');
const addTaskButton = document.getElementById('add-task-button');
const openTasksBoard = document.getElementById('open-tasks-body');
const doneTasksBoard = document.getElementById('done-tasks-body');
const clearOpenListButton = document.getElementById('clear-open-list-button');
const clearDoneListButton = document.getElementById('clear-done-list-button');
const sortlListOpenList = document.getElementById('sort-list-open-list');
const sortListDoneList = document.getElementById('sort-list-done-list');
const searchField = document.getElementById('search-field');

let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
let id = localStorage.getItem('id') ? localStorage.getItem('id') : 0;
let sortByOpenList = localStorage.getItem('sortByOpenList') && tasksArray.filter(({done})=> !done).length ? 
    localStorage.getItem('sortByOpenList') : 
    'Date creation (Asc)';

let sortByDoneList = localStorage.getItem('sortByDoneList') && tasksArray.filter(({done}) => done).length ?
    localStorage.getItem('sortByDoneList') : 
    'Due date (Asc)';

sortlListOpenList.value = sortByOpenList;
sortListDoneList.value = sortByDoneList;

const getDate = () => {
    const date = new Date();
    const dateToLocale = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return {
        displayedDate: dateToLocale.length === 7 ? '0' + dateToLocale : dateToLocale,
        date
    };
}

const createCreationDateNode = (date) => {
    const dateNode = document.createElement('p');
    dateNode.setAttribute('id', 'creation-date'); 
    dateNode.innerText  = date;
    return dateNode;
}

const createCompletionDateNode = (date) => {
    const dateNode = document.createElement('p');
    dateNode.setAttribute('id', 'completion-date'); 
    dateNode.innerText  = date;
    return dateNode;
}

const createDivWithClass = (className) => {
    const div = document.createElement('div');
    div.className = className;
    return div;
}

const createDivWithId = (id) => {
    const div = document.createElement('div');
    div.setAttribute('id', id);
    return div;
}

const createCheckboxNode = (id, type, isComplete) => {
    const input = document.createElement('input');
    input.setAttribute('id', id);
    input.setAttribute('type', type);
    if(isComplete) {
        input.setAttribute('checked', 'checked');
    }
    return input;
}

const createLabelNode = (description, id) => {
    const p = document.createElement('p');
    p.setAttribute('id', id);
    p.className = 'ladel';
    p.innerText = description;
    return p;
}

const clearBoards = () => {
    openTasksBoard.innerHTML = '';
    doneTasksBoard.innerHTML = '';
}

const changeTask = (id, newData) => {
    let idx;
    tasksArray = tasksArray.map((item, index) => {
        if (item.id === id) { 
            idx = index;
            return {
                ...item,
                ...newData,
                };
            } else {
                return item;
            }
        }
    );
    return idx;
}

const createTask = (item) => {
    const task = createDivWithId('task');
    const taskWrapper =  createDivWithClass('task-wrapper');
    const checkbox = createCheckboxNode('checkbox', 'checkbox', item.done);
    const label  = createLabelNode(item.description, item.id);
    const detailWrapper = createDivWithClass('detail-wrapper');
    const dateWrapper = createDivWithId('date-wrapper');

    const deleteIcon = new Image();
    deleteIcon.src = DeleteIcon;

    const deleteField  = createDivWithId('delete-field');

    taskWrapper.append(checkbox);
    taskWrapper.append(label);
    deleteField.append(deleteIcon);
    detailWrapper.append(dateWrapper);
    detailWrapper.append(deleteField);
    task.append(taskWrapper);
    task.append(detailWrapper);

    const  creationDate = createCreationDateNode(item.creationDate.displayedDate);
    dateWrapper.append(creationDate);

    if(item.done){
        const completionDate = createCompletionDateNode(item.completionDate.displayedDate);
        dateWrapper.append(completionDate);
    }

    if (item.done) {
        doneTasksBoard.prepend(task);
    } else {
        openTasksBoard.prepend(task);
    }

    task.addEventListener('mouseover', () => {
        deleteField.style.display = 'flex';  
    })

    task.addEventListener('mouseout', () => {
        deleteField.style.display = 'none';  
    })

    label.addEventListener('dblclick', () => {
        const prevText = label.innerHTML;
        label.innerText = '';
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.value = prevText;
        label.append(input);
        input.focus();

        input.addEventListener('keydown', (e) => {
            if(e.keyCode === 13 && input.value.trim() !== '') {
                label.innerText = input.value;
                changeTask(label.id, { description: input.value});
                input.remove();
                localStorage.setItem('tasks', JSON.stringify(tasksArray));
            } else if (e.keyCode === 27) {
                label.innerText = prevText;
                input.remove();
            }
        })
    });
   
    deleteIcon.addEventListener('click', () => {
        tasksArray = tasksArray.filter(item => item.id !== label.id);
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
        task.remove();
    });
}

const modifyTasksArray = (idx) => {
    tasksArray.push(tasksArray[idx]);
    tasksArray.splice(idx, 1);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

openTasksBoard.addEventListener('click', (e) => {
    const target = e.target;
    if(target.tagName === 'INPUT') {
        const task = target.closest('#task');
        const label = target.nextElementSibling;
        let idx;
        const date = getDate();
        task.remove();
        doneTasksBoard.prepend(task);
        const completionDate = createCompletionDateNode(date.displayedDate);
        task.querySelector('#date-wrapper').append(completionDate);
        idx = changeTask(label.id, { completionDate: date, done: true });
        modifyTasksArray(idx);
    }
})

doneTasksBoard.addEventListener('click', (e) => {
    const target = e.target;
    if(target.tagName === 'INPUT' && target.type === 'checkbox') {
        const task = target.closest('#task');
        const label = target.nextElementSibling;
        let idx;     
        task.remove();
        openTasksBoard.prepend(task);
        const completionDate = task.querySelector('#completion-date');
        completionDate.remove();
        idx = changeTask(label.id, { completionDate: null, done: false });
        modifyTasksArray(idx);
    }
})

const addDataToTask = (description) => {

    const taskData = {
        description, 
        creationDate: getDate(),
        completionDate: null,
        done: false,
        id: `item-${id}`
    }
    createTask(taskData);
    tasksArray.push(taskData);
    
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    localStorage.setItem('id', id++);
    addTaskField.value = '';
}

addTaskButton.addEventListener('click', () => {
    const description = addTaskField.value;
    if(description.trim() !== '') {
        addDataToTask(description);
    }
})

addTaskField.addEventListener('keydown', (e) => {
    const description = addTaskField.value;
    if(e.keyCode === 13 && description.trim() !== '') {
        addDataToTask(description);
    }
});

clearOpenListButton.addEventListener('click', () => {
    openTasksBoard.innerHTML = '';
    tasksArray = tasksArray.filter(({done}) => done);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
});

clearDoneListButton.addEventListener('click', () => {
    doneTasksBoard.innerHTML = '';
    tasksArray = tasksArray.filter(({done}) => !done);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
});

searchField.addEventListener('keyup', () => {
    let searchValue;

    if (searchField.value.trim() !== '') {
        searchValue = searchField.value.trim();
        clearBoards();
        tasksArray.forEach(task => {
            task.description.toUpperCase().includes(searchField.value.toUpperCase()) && createTask(task);
        });
    } else if (searchValue !== '') {
        clearBoards();
        tasksArray.forEach(task => {
             createTask(task);
        });
    }
});

const saveSorting = (sortBy, openTasks, doneTasks, value) => {
    tasksArray = openTasks.concat(doneTasks);
    localStorage.setItem(`${sortBy}`, value);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    clearBoards();
    displayDataFromLocalStorage();
}

sortlListOpenList.addEventListener('change', (e) => {
    const doneTasks = tasksArray.filter(({done}) => done);
    const openTasks  = tasksArray.filter(({done}) => !done);
    switch(e.target.value) {
        case 'Date creation (Asc)':
            openTasks.sort((a, b) => a.creationDate.date > b.creationDate.date ? 1 : -1);
            break;
        case 'Date creation (Desc)': 
            openTasks.sort((a, b) => a.creationDate.date < b.creationDate.date ? 1 : -1);
            break;
         case 'Text (Asc)': 
            openTasks.sort((a, b) => a.description < b.description ? 1 : -1);
            break;
        case 'Text (Desc)': 
            openTasks.sort((a, b) => a.description > b.description ? 1 : -1);
            break;
    }
    saveSorting('sortByOpenList', openTasks, doneTasks, e.target.value);
});


sortListDoneList.addEventListener('change', (e) => {
    const doneTasks = tasksArray.filter(({done}) => done);
    const openTasks  = tasksArray.filter(({done}) => !done);
      switch(e.target.value) {
        case 'Due date (Asc)':
            doneTasks.sort((a, b) => a.completionDate.date > b.completionDate.date ? 1 : -1);
            break;
        case 'Due date (Desc)': 
            doneTasks.sort((a, b) => a.completionDate.date < b.completionDate.date ? 1 : -1);
            break;
         case 'Text (Asc)': 
            doneTasks.sort((a, b) => a.description < b.description ? 1 : -1);
            break;
        case 'Text (Desc)': 
            doneTasks.sort((a, b) => a.description > b.description ? 1 : -1);
            break;
    }
    saveSorting('sortByDoneList', openTasks, doneTasks, e.target.value);
})

const displayDataFromLocalStorage  = () => {
    tasksArray.forEach(item => {
        createTask(item);
    });
}

 displayDataFromLocalStorage();

