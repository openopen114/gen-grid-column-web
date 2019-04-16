import React, { useState } from "react";
import AppContext from "../config/Context";

import { genGridColumn, genFactoryComp, formateConfigParam, genColumnInitTmp } from "../util/generator";

const AppContextProvider = props => {

  const [tableSchema, setTableSchema] = useState([]); //table schema
  const [projectName, setProjectName] = useState([]); //project name
  const [formattedGridColumn, setFormattedGridColumn] = useState(""); // formatted result of grid column
  const [formattedFactoryComp, setFormattedFactoryComp] = useState(""); // formatted result of Factory Comp
  const [formattedColunmInitTmp, setFormattedColunmInitTmp] = useState(""); //formatted handle new column init tmp
  // Set Setting Config Form Setting Comp Data
  const setSettingConfig = _data => { 
    const { tableSchema, projectName } = formateConfigParam(_data);
    setTableSchema(tableSchema); 
    setProjectName(projectName);
  };

  // Update Column Config For Config Table Comp
  const updateConfig = _tableSchema => { 
    console.log('updateConfig')
    console.log(_tableSchema)
    console.log(projectName)
    setTableSchema(_tableSchema);
    const formattedGridColumn = genGridColumn({tableSchema});
    setFormattedGridColumn(formattedGridColumn); 

    const formattedColunmInitTmp = genColumnInitTmp({tableSchema});
    setFormattedColunmInitTmp(formattedColunmInitTmp);


    const formattedFactoryComp = genFactoryComp({tableSchema, projectName});
    setFormattedFactoryComp(formattedFactoryComp)

    
  };

  return (
    <AppContext.Provider
      value={{
        tableSchema,
        formattedGridColumn,
        formattedFactoryComp,
        formattedColunmInitTmp,
        setSettingConfig,
        updateConfig
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
