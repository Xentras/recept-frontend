import React, {useState} from "react"

export const SearchContext = React.createContext({
    searchText: "",
    hasSearched: false
})

export const SearchContextProvider = (props) => {
    const setSearch = (searchText, hasSearched) => {
        setState({...state, searchText: searchText, hasSearched: hasSearched})
    }

    const initState = {
        searchText: "",
        hasSearched: false,
        setSearch: setSearch
    }

    const [state, setState] = useState(initState)

    return (
        <SearchContext.Provider value={state} >
            {props.children}
        </SearchContext.Provider>
    )
}