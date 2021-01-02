import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification, NotificationType } from '../models/notification'


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification: Subject<Notification>

  constructor() {
    this.notification = new Subject<Notification>();
  }

  // Da ne bi komponente imale direktan pristup Subject-u
  // Tj. da ne bi mogle da emituju dogadjaje ni na koji nacin osim preko metoda emitSuccess,emitWarning i emitInfo
   get Observable() {
     return this.notification.asObservable();
   }

   emitSuccesNotification(notification: string) {
     let n = new Notification(notification, NotificationType.Sucess, new Date());
     this.notification.next(n);
   }

   emitWarningNotification(notification: string) {
    let n = new Notification(notification, NotificationType.Warning, new Date());
    this.notification.next(n);
   }

   emitInfoNotification(notification: string) {
    let n = new Notification(notification, NotificationType.Info, new Date());
    this.notification.next(n);
   }
}
