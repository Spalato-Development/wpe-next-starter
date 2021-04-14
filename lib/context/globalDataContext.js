import * as React from 'react'

const GlobalDataContext = React.createContext()

function GlobalDataProvider({ globalData, children }) {
    const value = {
        ...globalData
    }
    return <GlobalDataContext.Provider value={value}>{children}</GlobalDataContext.Provider>
}

function useGlobalData() {
    const context = React.useContext(GlobalDataContext)
    if (context === undefined) {
        throw new Error('useGlobalData must be used within a CountProvider')
    }
    return context
}

export { GlobalDataProvider, useGlobalData }