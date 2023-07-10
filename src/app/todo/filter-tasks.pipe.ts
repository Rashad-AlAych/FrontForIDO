import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.model'; 

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: Task[], searchKeyword: string): Task[] {
    if (!searchKeyword) {
      return tasks;
    }

    searchKeyword = searchKeyword.toLowerCase();
    return tasks.filter(task => task.title.toLowerCase().includes(searchKeyword));
  }
}
