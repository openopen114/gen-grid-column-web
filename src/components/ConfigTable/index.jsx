import React, { useContext } from "react";

import AppContext from '../../config/Context'

import { Table, Select, Checkbox   } from "antd";
import { Button } from 'antd';

import "./index.scss";
 
const {Option, OptGroup} = Select;


const ConfigTable = () => {
  //App context 
  const { tableSchema, updateConfig } = useContext(AppContext);


  //handle change event
  const handleChange = (_type, _index, _value) => {
    console.log(`type:${_type} index:${_index} value:${_value}`);
 

    const config = {}
  
    switch(_type){
      case "sorter":
        config[_type] = _value.target.checked;
        break;
      default:
        config[_type] = _value;
    }

    


    tableSchema[_index] = {
      ...tableSchema[_index],
      ...config
    };

  }



  const updateColumnConfig = () => { 
    updateConfig(tableSchema)
  }



  const columns = [
      {
        title: "Column Name",
        dataIndex: "columnName",
        key: "columnName"
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type"
      },
      {
        title: "FilterType",
        key: "FilterType",
        render: (text, record, index) => (
          <Select defaultValue="none" style={{ width: 120 }} onChange={handleChange.bind(this, 'filterType', index)}>
            <Option  value="none">none</Option>
            <Option value="text">text</Option>
            <Option value="number">number</Option> 
            <Option value="date">date</Option>
            <Option value="daterange">daterange</Option>  
            <Option value="dropdown">dropdown</Option> 
          </Select>
        )
      },
      {
        title: "Sorter",
        key: "Sorter",
        render: (text, record, index) => (
           <Checkbox onChange={handleChange.bind(this, 'sorter', index)}>sorter</Checkbox>
        )
      },
      {
        title: "Render",
        key: "Render",
        render: (text, record, index) => (
          <Select defaultValue="none" style={{ width: 120 }} onChange={handleChange.bind(this, 'render', index)}>
               


            <OptGroup label="Basic">
              <Option value="none">none</Option>
              <Option value="Basic-span">span</Option>
              <Option value="Basic-moment">moment</Option> 
              <Option value="Basic-toLocaleString">toLocaleString</Option>
              <Option value="Basic-Tooltip">Tooltip</Option>
            </OptGroup>
            <OptGroup label="FactoryComp">
              <Option value="FactoryComp-Text">Text</Option>
              <Option value="FactoryComp-Select">Select</Option>
              <Option value="FactoryComp-Number">Number</Option>
              <Option value="FactoryComp-Month">Month</Option>
              <Option value="FactoryComp-Year">Year</Option>
              <Option value="FactoryComp-Date">Date</Option>
              <Option value="FactoryComp-Ref">Ref</Option>
            </OptGroup>
  


          </Select>
        )
      }
    ];

    return (
      <div className="annotation-table">
        <h1 className="text-gradient">@ Annotation</h1>
        <Table columns={columns} dataSource={tableSchema} pagination={false} />
        <Button type="primary" onClick={updateColumnConfig}>Generate Grid Colunm</Button>
      </div>
    );












}

  
export default ConfigTable;
