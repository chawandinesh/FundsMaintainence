import React from 'react';
export const CashFlowContext = React.createContext(null);
export function Context(props) {
  const [state, setState] = React.useState({
    users: {
      isLogin: false,
      registeredUsers: [],
    },
    transactions: [],
  });
  return (
    <CashFlowContext.Provider value={{state, setState}}>
      {props.children}
    </CashFlowContext.Provider>
  );
}
