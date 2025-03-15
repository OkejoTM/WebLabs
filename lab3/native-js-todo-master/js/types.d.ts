type Game = {
    id : number;
    title : string;
    description : string;
    genres : string[];
    price : number;
    bought : boolean;
}

interface Window {
    dispatch : (eventName: string, detail?: Record<string,any>) => void
}
