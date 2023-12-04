import { createContext, useContext, useState } from "react";

export const TriggerContext = createContext()

export const useTrigger = () => {
    const context = useContext(TriggerContext)
    if(!context){
        throw new Error("useTrigger debe estar dentro del alcance del contexto")
    }
    return context
}

export const TriggerContextProvider = ({children}) => {

    const [trigger, setTrigger] = useState(false)

    return(
        <TriggerContext.Provider value={{trigger, setTrigger}}>
            {children}
        </TriggerContext.Provider>
    )
}