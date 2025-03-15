import { Game } from './gameType'; 

export interface Category {
  id: number;        
  name: string;       
  games: Game[];     
}
