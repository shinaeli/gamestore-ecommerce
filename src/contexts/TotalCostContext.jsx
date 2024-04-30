import React, { createContext, useState } from "react";

export const TotalCostContext = createContext();


const TotalCostContextProvider = ({ children }) => {
  const [totalCost, setTotalCost] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const handleTotalCostReduction = reduction => setTotalCost(prev => (prev - reduction) <= 0 ? 0 : prev - reduction);
  const handleTotalCostIncrement = increment => setTotalCost(prev => prev + increment);
  const handleTotalCountReduction = reduction => setTotalCount(prev => (prev - reduction) <= 0 ? 0 : prev - reduction);
  const handleTotalCountIncrement = increment => setTotalCount(prev => prev + increment);
  
  return (
    <TotalCostContext.Provider value={{ totalCost, totalCount, handleTotalCostIncrement, handleTotalCostReduction, handleTotalCountReduction, handleTotalCountIncrement }}>
      {children}
    </TotalCostContext.Provider>
  )
}

export default TotalCostContextProvider

