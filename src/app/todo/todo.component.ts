// todo.component.ts
import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks: Task[] = []; // Array to store the tasks
  newTask: string = ''; // Variable to store the new task input
  loggedInUser: string = '';  // variable to store username

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.fetchTasks(); // Fetch tasks when the component initializes
      // Retrieve the logged-in user from localStorage
      const user = localStorage.getItem('loggedInUser');

      if (user) {
        this.loggedInUser = JSON.parse(user).email;
      }
  }

  logout(): void {
    // Clear user's authentication token or session information
    localStorage.removeItem('token');

    // Navigate to the login screen
    this.router.navigate(['']);
  }

  fetchTasks() {
    // Fetch tasks from the backend using the task service
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks; // Assign the fetched tasks to the component property
      },
      (error) => {
        console.log('An error occurred while fetching tasks:', error);
      }
    );
  }

  addTask() {
    if (this.newTask.trim() === '') {
      return; // If the new task input is empty, return without adding the task
    }
  
    const task: Task = {
      title: this.newTask,
      completed: false,
      status: 'To Do', // Set the default status to 'To Do'
      category:'', // Set the category value here or fetch it from the user input
    };
  
    // Create a new task using the task service
    this.taskService.createTask(task).subscribe(
      (createdTask) => {
        this.tasks.unshift(createdTask); // Add the newly created task to the beginning of the tasks array
        this.newTask = ''; // Reset the new task input
      },
      (error) => {
        console.log('An error occurred while adding a task:', error);
      }
    );
  }
  
  updateTask(task: Task, property: string, event: Event): void {
    if (!event) {
      return; // Guard clause to handle undefined event
    }
  
    const newValue = (event.target as HTMLElement).textContent?.trim() || '';
  
    if (property === 'title') {
      task.title = newValue;
    } else if (property === 'category') {
      task.category = newValue?.replace('Category: ', '');
    } else if (property === 'dueDate') {
      task.dueDate = new Date(newValue);
    } else if (property === 'estimateValue') {
      const parsedValue = parseFloat(newValue);
      task.estimate!.value = isNaN(parsedValue) ? 0 : parsedValue;
    } else if (property === 'importance') {
      task.importance = newValue;
    }
  
    // Update the task using the task service
    this.taskService.updateTask(task).subscribe(
      () => {
        console.log('Task updated successfully');
      },
      (error) => {
        console.log('An error occurred while updating the task:', error);
      }
    );
  }

  deleteTask(id?: number) {
    if (id === undefined) {
      return; // If the id is undefined, return without deleting the task
    }

    if (!confirm('Are you sure you want to delete this task?')) {
      return; // If the user cancels the delete confirmation, return without deleting the task
    }

    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter((task) => task.id !== id); // Remove the deleted task from the tasks array
      },
      (error) => {
        console.log('An error occurred while deleting the task:', error);
      }
    );
  }
}
