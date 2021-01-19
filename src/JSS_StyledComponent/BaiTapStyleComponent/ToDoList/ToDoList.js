import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Container } from '../../Components/Container/Container';
import { DarkTheme } from '../../Themes/DarkTheme';
import { LightTheme } from '../../Themes/LightTheme';
import { PrimaryTheme } from '../../Themes/PrimaryTheme';
import { Dropdown } from '../../Components/DropDown/Dropdown';
import { Heading1, Heading2, Heading3, Heading4, Heading5 } from '../../Components/Heading/Heading';
import { Input, Label } from '../../Components/TextField/TextField';
import { Button } from '../../Components/Button/Button';
import { Table, Tr, Td, Th, Thead } from '../../Components/Table/Table';
import { connect } from 'react-redux';
import {addTaskAction, doneTaskAction, deleteTaskAction, changeThemeAction, editTaskAction, updateTask} from '../../../redux/Actions/ToDoListAction'; 
import {arrTheme} from '../../Themes/ThemeManager'; 
class ToDoList extends Component {
    state = {
        task: ''
    }
    renderTaskToDo = () => {
        return this.props.taskList.filter(item => !item.done).map((task, index) => {
            return <Tr key={index}>
                <Th>{task.taskName}</Th>
                <Th className="text-right">
                    <Button onClick={()=>{this.onEdit(task)}}><i className="fa fa-edit"></i></Button>
                    <Button onClick={()=>{this.onCompleted(task.id)}}><i className="fa fa-check"></i></Button>
                    <Button onClick = {() => {this.onDelete(task.id)}}><i className="fa fa-trash"></i></Button>
                </Th>

            </Tr>
        })
    }
    renderTaskCompleted = () => {
        return this.props.taskList.filter(item => item.done).map((task, index) => {
            return <Tr key={index}>
                <Th>{task.taskName}</Th>
                <Th className="text-right">
                 
                 <Button onClick = {() => {this.props.onDelete(task.id)}}><i className="fa fa-trash"></i></Button>
                </Th>

            </Tr>
        })
    }
    handleChange = (e) =>{
        let {value} = e.target;
        this.setState({
            task: value
        });
       
    }
    handleSelect = (e) =>{       
        let {value} = e.target;
        this.props.changeTheme(value); 
    }
    addTask = (task) =>{
       let newTask = {
           id: Date.now(),
           taskName: task, 
           done: false
       }
       this.props.addTask(newTask)
    }
    onDelete = (id) =>{
        this.props.onDelete(id); 
    }
    onEdit = (task) =>{
        this.props.onEdit(task);        

    }
    onUpdate = (taskName) => {
        this.props.onUpdate(taskName); 
    }
    componentDidUpdate(prevProps, prevState){
        let {taskEdit} = this.props
        if(prevProps.taskEdit.id !== taskEdit.id){
            this.setState({
                task : taskEdit.taskName
            })
        }
    }
    onCompleted = (id) =>{
        this.props.onCompleted(id)
    }
    renderTheme = () =>{
      return arrTheme.map((theme, index)=>{
          return  <option value={theme.id} key={index}>{theme.name}</option>
      })
    }

    render() {
        
        return (
            <ThemeProvider theme={this.props.themeToDoList}>
                <Container className="w-50">
                    <Dropdown onChange={this.handleSelect}>
                       {this.renderTheme()}
                    </Dropdown>
                    <Heading3>To Do List</Heading3>
                    <Label>Task name</Label> <br />
                    <Input className="w-50" onChange={this.handleChange} name="task" value={this.state.task}></Input>
                    <Button className="ml-2" onClick={() => {this.addTask(this.state.task)}}>Add Task</Button>
                    <Button className="ml-2" onClick={() => {this.onUpdate(this.state.task)}}>Update Task</Button>

                    <Heading3>Task to do</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskToDo()}
                        </Thead>

                    </Table>
                    <Heading3>Task Completed</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskCompleted()}
                        </Thead>

                    </Table>
                </Container>
            </ThemeProvider>
        )
    }
}
const mapStateToProps = state => {
    return {
        themeToDoList: state.ToDoListReducer.themeToDoList,
        taskList: state.ToDoListReducer.taskList,
        taskEdit: state.ToDoListReducer.taskEdit,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        addTask: (newTask) =>{
            dispatch(addTaskAction(newTask))
        },
        onDelete: (id) =>{
            dispatch(deleteTaskAction(id))
        }, 
        onEdit : (task) =>{
            dispatch(editTaskAction(task))
        },
        onUpdate: (taskName) =>{
            dispatch(updateTask(taskName))
        }, 
        onCompleted: (id) =>{
            dispatch(doneTaskAction(id))
        }, 
        changeTheme: (themeId) =>{
            dispatch(changeThemeAction(themeId))
        }
    }
}
export default (connect)(mapStateToProps, mapDispatchToProps)(ToDoList); 