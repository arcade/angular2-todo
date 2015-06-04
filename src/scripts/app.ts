/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'todo-app'
})
@View({
    templateUrl: "views/main.html"
})
class TodoApp {

}

bootstrap(TodoApp);
