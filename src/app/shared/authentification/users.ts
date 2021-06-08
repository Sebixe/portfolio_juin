export class Users {
    public Id: number;
    public name: string;
    public password:string;
    public email:string;

  constructor(Id:number,name: string,password:string,email:string) {
    this.Id = Id;
    this.name = name;
    this.password = password;
    this.email = email;
  }
}
