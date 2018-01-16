import {IUser} from "./IUser";

export interface IComment {
  id:           number;
  body:         string;
  date:         Date;
  lastModified: Date;
  user:         IUser;
}
