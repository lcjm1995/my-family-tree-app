export interface UserDetails {
  id: number;
  name: string;
  email: string;
  gender: string;
  password: string;
  yearOfBirth: number;
  member: boolean;
}

export interface AncestorDetails {
  name: string;
  yearOfBirth: number;
  dead: boolean;
  job: string;
  married: boolean;
  children: number;
}

export interface AncestorTest {
  [propname: string]: any;
  name: string;
  yearOfBirth: number;
  deceased: boolean;
  job: string;
  married: boolean;
  children: number;
}
