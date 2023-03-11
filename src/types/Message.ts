import { AuthCommonInfo } from "./Auth";

export interface MessageType {
    _id: string;
    conversation: string;
    sender: AuthCommonInfo;
    content: string;
    contentType: "image" | "text" | "file",
    fileUrl?: string
    createdAt: Date;
    updatedAt: Date;
}