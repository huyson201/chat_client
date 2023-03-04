import { AuthCommonInfo } from "./Auth";

export interface MessageType {
    _id: string;
    conversation: string;
    sender: AuthCommonInfo;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}