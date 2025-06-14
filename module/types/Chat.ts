export interface IMessage {
  senderId: string;
  receiverId: string;
  propertyId: string;
  message: string;
}

export interface IMessages {
  _id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  propertyId: string;
  message: string;
  createdAt: string
  updatedAt: string
}
