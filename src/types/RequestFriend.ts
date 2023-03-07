import { AuthCommonInfo } from "./Auth";

export interface RequestFriend {
    _id: string
    requester: AuthCommonInfo;
    recipient: AuthCommonInfo;
    status: "pending" | "accepted" | "rejected";
    request_text?: string
    createdAt: Date;
    updatedAt: Date;
}