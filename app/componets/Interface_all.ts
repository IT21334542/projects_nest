export interface PROJECT{
    id: String;
  name: String;
  status: String;
  description: String;
  OwnerId: String;
  Members: String;
  spaceId: String;
  Ownerid: USER;
  Collabrators:COLLAB[]

}


export interface SPACE{
    name: String;
    id: String;
    description: String;
    createdby: String;
    Project: PROJECT[];
}

export interface COLLAB{
    id:string;
    projectId:string;
    projectRoleId:string;
    userid:string;

}

export interface USER{
    email:string;
    id:string;
    image:string;
    isAdmin:string;
    isMaster:string;
    name:string;
}




 