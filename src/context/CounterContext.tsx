import { createContext, useState } from "react";

export let CounterContext = createContext(0)
export default function CounterContextProvider(props){

    let [counter , setCounter] =  useState(0)
    let increaseCounter = ()=>{
        setCounter(counter+1)
    }
    let deccreaseCounter = ()=>{
        setCounter(counter-1)
    }
return(
    <CounterContext.Provider value = {{counter,increaseCounter,deccreaseCounter}}>
        {props.children}
    </CounterContext.Provider>
)
}