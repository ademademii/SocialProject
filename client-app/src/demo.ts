interface Duck{
    name: string;
    numLegs: number;    
    makeSound: (sound: string)=> void;
}
const duck1 :Duck ={
    name:'huey',
    numLegs: 2,
    makeSound: (sound: any) => console.log(sound)
}


const duck2 ={
    name:'dewey',
    numLegs: 2,
    makeQuack: (sound: any) => console.log(sound)
}

duck1.makeSound('quack');