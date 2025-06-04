export type INotification = {
  _id: string;
  userId: string;
  message: string;
  seen: boolean;
  type: 'info' | 'success' | 'error' | 'system';
  createdAt: string;
  updatedAt: string;
};


export type INotificationRequest = {
  userI : string,
  message: string,
  type:string
}