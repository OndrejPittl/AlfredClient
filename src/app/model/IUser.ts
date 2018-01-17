export interface IUser {
  id:           number;
  firstName:    string;
  lastName:     string;
  email:        string;
  photo:        string;
  slug:         string;
  token:        string;
  sex:          string;
  password:     string;
  birth:        Date;
  captcha:      string;
  confirmPassword: string;

  friends:      IUser[];
  inFReqs:      IUser[];
  outFReqs:     IUser[];

  pwd:         string;
  pwdConf:     string;
  pwdHash:     string;
}

