import { DarkTheme } from "../JSS_StyledComponent/Themes/DarkTheme";
import {arrTheme} from '../JSS_StyledComponent/Themes/ThemeManager'; 

const initialState = {
    themeToDoList: DarkTheme,
    taskList: [
        { id: 'task-1', taskName: 'task 1', done: true },
        { id: 'task-2', taskName: 'task 2', done: false },
        { id: 'task-3', taskName: 'task 3', done: true },
        { id: 'task-4', taskName: 'task 4', done: false },

    ],
    taskEdit: { id: '-1', taskName: '', done: false },
}
export const ToDoListReducer = (state = initialState, action) => {
    let index = -1;
    let taskListUpdate;
    switch (action.type) {
        case "add_task":
            let { newTask } = action;
            taskListUpdate = [...state.taskList];
            index = state.taskList.findIndex(task => task.taskName === newTask.taskName);
            if (index !== -1) {
                alert("Task name already exists !! ");
                return { ...state };
            } else {
                taskListUpdate.push(newTask);
            }
            state.taskList = taskListUpdate;
            return { ...state }
        case "delete_task":
            let { taskId } = action;
            taskListUpdate = [...state.taskList];
            index = taskListUpdate.findIndex(task => task.id === taskId);
            if (index !== -1) {
                taskListUpdate.splice(index, 1);
                state.taskList = taskListUpdate;
            }
            return { ...state }
        case "done_task":
            taskListUpdate = [...state.taskList];
            index = taskListUpdate.findIndex(task => task.id === action.taskId);
            if (index !== -1) {
                taskListUpdate[index].done = true;
            }
            state.taskList = taskListUpdate;
            return { ...state }
        case "edit_task":
            return { ...state, taskEdit: action.task }
        case "update_task":

            state.taskEdit = { ...state.taskEdit, taskName: action.taskName };
            console.log(state.taskEdit);
            taskListUpdate = [...state.taskList];
            index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id);
            if (index !== -1) {
                taskListUpdate[index] = state.taskEdit
            }
            state.taskList = taskListUpdate;
            state.taskEdit = { id: '-1', taskName: '', done: false };
            return { ...state }
        case "change_theme":
           let {themeId} = action; 
           index =  arrTheme.findIndex(theme => theme.id == themeId); 
           if(index !== -1){
               state.themeToDoList = arrTheme[index].theme; 
           }
            return { ...state }
        default:
            break;
    }
    return { ...state }
}
export default ToDoListReducer;

