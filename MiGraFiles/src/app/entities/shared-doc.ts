import {Doc} from './doc';

export interface SharedDoc extends Doc{
  shareholder:string,
  dateShared: string
}
