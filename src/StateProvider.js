import React, {useState ,createContext} from "react"

export const StateContext = createContext();

export const StateProvider = (props) => {
    const [user, setUser] = useState({});

    return (
        <StateContext.Provider value={[user, setUser]}>
            {props.children}
        </StateContext.Provider>
    )
}
