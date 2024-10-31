export interface Doc {
  _id:string,
  title:string,
  content:string,
  extension:string,
  author:string,
  type:string,
  url:string,
  image:string,
  paths : string[],
  active: boolean
}
