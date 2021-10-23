//@ts-ignore we want to ignore everything
// else in global except what we need to access.
// Maybe there is a better way to do this.
const simpleJsiModule:{
    helloWorld():string;
    multiplyWithCallback(x:number,y:number,callback:(z:number) => void):void
    multiply(x:number,y:number):number
    getDeviceName():string
    setItem(key:string,value:string):boolean
    getItem(key:string):string
    //@ts-ignore
} = global;

export default simpleJsiModule;