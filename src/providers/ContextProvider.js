import React, { useState } from "react";
import AppContext from "../config/Context";

import { genGridColumn, formateConfigParam } from "../util/generator";

const AppContextProvider = props => {

  const [tableSchema, setTableSchema] = useState([]); //table schema
  const [formattedGridColumn, setFormattedGridColumn] = useState(""); // formatted result of grid column

  // Set Setting Config Form Setting Comp Data
  const setSettingConfig = _data => { 
    const { tableSchema } = formateConfigParam(_data);
    setTableSchema(tableSchema); 
  };

  // Update Column Config For Config Table Comp
  const updateConfig = _tableSchema => { 
    setTableSchema(_tableSchema);
    const formattedGridColumn = genGridColumn({tableSchema});
    setFormattedGridColumn(formattedGridColumn); 
  };

  return (
    <AppContext.Provider
      value={{
        tableSchema,
        formattedGridColumn,
        setSettingConfig,
        updateConfig
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
