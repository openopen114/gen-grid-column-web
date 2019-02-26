import React, { useState } from "react";
import AppContext from "../config/Context";

import { genGridColumn, genFactoryComp, formateConfigParam } from "../util/generator";

const AppContextProvider = props => {

  const [tableSchema, setTableSchema] = useState([]); //table schema
  const [formattedGridColumn, setFormattedGridColumn] = useState(""); // formatted result of grid column

  const [formattedFactoryComp, setFormattedFactoryComp] = useState(""); // formatted result of Factory Comp

  // Set Setting Config Form Setting Comp Data
  const setSettingConfig = _data => { 
    const { tableSchema } = formateConfigParam(_data);
    setTableSchema(tableSchema); 
  };

  // Update Column Config For Config Table Comp
  const updateConfig = _tableSchema => { 
    console.log('updateConfig')
    console.log(_tableSchema)
    setTableSchema(_tableSchema);
    const formattedGridColumn = genGridColumn({tableSchema});
    setFormattedGridColumn(formattedGridColumn); 


    const formattedFactoryComp = genFactoryComp({tableSchema});
    setFormattedFactoryComp(formattedFactoryComp)

    
  };

  return (
    <AppContext.Provider
      value={{
        tableSchema,
        formattedGridColumn,
        formattedFactoryComp,
        setSettingConfig,
        updateConfig
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
