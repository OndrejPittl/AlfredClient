import {IUser} from "./IUser";
import {IComment} from "./IComment";

export interface IPost {
  id:           number;
  title:        string;
  body:         string;
  image:        string;
  tags:         string[];
  rating:       number[];
  author:       string;
  date:         Date;
  lastModified: Date;
  userRated:    boolean;

  user:         IUser;
  comments:     IComment[];
}
