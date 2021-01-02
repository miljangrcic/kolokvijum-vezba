import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

export class Notification {

    constructor(
        public text: string,
        public type: NotificationType,
        public time: Date,
        public isSuccess = () => this.type == NotificationType.Sucess,
        public isInfo = () => this.type == NotificationType.Info,
        public isWarning = () => this.type == NotificationType.Warning
    ) {}
}

export enum NotificationType {
    Sucess,
    Info,
    Warning,
}
