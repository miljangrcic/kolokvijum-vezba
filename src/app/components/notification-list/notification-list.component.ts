import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from '..//../models/notification'

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notifications : Notification[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.Observable.subscribe( notification => {

      this.notifications.push(notification)

      if(!notification.isWarning()) 
        this.autoRemoval(notification);
    
    })
  }

  autoRemoval(notification: Notification) {
    setTimeout(() => this.removeNotification(notification), 2000);
  }

  removeNotification(notification: Notification) {
    let index = this.notifications.findIndex( val => val == notification);
    this.notifications.splice(index, 1);
  }

}
