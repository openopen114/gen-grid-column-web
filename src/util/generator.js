import * as _ from "lodash";

const prettier = require("prettier/standalone");
const plugins = [require("prettier/parser-babylon")];

//ignore entity colunm
export const ignoreColumnName = [
  "CREATE_TIME",
  "CREATE_USER",
  "LAST_MODIFIED",
  "LAST_MODIFY_USER",
  "TS",
  "DR"
];

export const genFactoryComp = _state => {
    console.log('gen factory comp')
  const { tableSchema } = _state;

  let result = "";
  let importComp = [];
  let renderComp = [];
 
 console.log('tableSchema map')
  tableSchema.map(item => {
    if (!ignoreColumnName.includes(item.columnName)) {
      const colName = _.camelCase(item.columnName);
      const renderType = _.startsWith(item.render, "FactoryComp-")
        ? _.split(item.render, "FactoryComp-")[1]
        : "none";

      console.log(item.render) 
      console.log(`renderType:${renderType}`)
     let renderCompItem = "";

      switch (renderType) {
        case "none":
          break;
        case "Text":
          importComp.push(`import TextField from 'components/RowField/TextField';`);

          renderCompItem += `
                                case '${colName}': 
                                  return (<div>
                                      {record._edit ?//编辑态
                                          <TextField {...this.props}
                                              status={record['_status']}//是否修改过标记
                                              validate={record['_validate']}//启用验证
                                          /> : <div>{value}</div>}
                                  </div>);
                              `;
          renderComp.push(renderCompItem);
          console.log('renderComp i');
          console.log(renderComp)
          break;

        case "Select":
          importComp.push(`import SelectField from 'components/RowField/SelectField';`);
          renderCompItem += `
                                case '${colName}': 
                                const ${colName}Data = [{
                                    key: "请选择",
                                    value: '',
                                    disabled: true
                                }, {
                                    key: 'KEY-001',
                                    value: 'VALUE-001'
                                }, {
                                    key: 'KEY-002',
                                    value: 'VALUE-002'
                                }];
                                return (<div>
                                    {record._edit ?
                                        <SelectField {...this.props}
                                            status={record['_status']}//是否修改过标记
                                            validate={record['_validate']}//启用验证
                                            data={${colName}Data}
                                        /> : <div>{record.${colName}EnumValue}</div>}
                                </div>);
                              `;
          renderComp.push(renderCompItem);
          console.log('renderComp i');
          console.log(renderComp)
          break;

        case "Number":
          importComp.push(`import NumberField from 'components/RowField/NumberField';`);
          renderCompItem += `
                                 case '${colName}'://工龄
                            return (<div>
                                {record._edit ?
                                    <NumberField {...this.props}
                                        status={record['_status']}//是否修改过标记
                                        validate={record['_validate']}//启用验证
                                        iconStyle="one"
                                        max={999999}
                                        min={0}
                                        step={1}
                                    /> : <div>{value}</div>}
                            </div>);
                              `;
          renderComp.push(renderCompItem);
          console.log('renderComp i');
          console.log(renderComp)
          break;

        case "Month":
          importComp.push(`import SelectField from 'components/RowField/SelectField';`);
          renderCompItem += `
                                 case 'month'://月份
                const monthData = [{
                    key: "请选择",
                    value: "",
                    disabled: true
                }, {
                    key: "一月",
                    value: 1
                }, {
                    key: "二月",
                    value: 2
                }, {
                    key: "三月",
                    value: 3
                }, {
                    key: "四月",
                    value: 4
                }, {
                    key: "五月",
                    value: 5
                }, {
                    key: "六月",
                    value: 6
                }, {
                    key: "七月",
                    value: 7
                }, {
                    key: "八月",
                    value: 8
                }, {
                    key: "九月",
                    value: 9
                }, {
                    key: "十月",
                    value: 10
                }, {
                    key: "十一月",
                    value: 11
                }, {
                    key: "十二月",
                    value: 12
                }];
                return (<div>
                    {record._edit ?
                        <SelectField {...this.props}
                            status={record['_status']}//是否修改过标记
                            validate={record['_validate']}//启用验证
                            data={monthData}//自定义数据传入json
                        /> : <div>{record.monthEnumValue}</div>}
                </div>);
                              `;
          renderComp.push(renderCompItem);
          break;

        case "Year":
          importComp.push(`import YearField from 'components/RowField/YearField';`);
          renderCompItem += `  
           case 'year'://年份
                return (<div>
                    {record._edit ?
                        <YearField {...this.props}
                            status={record['_status']}//是否修改过标记
                            validate={record['_validate']}//启用验证
                        /> : <div>{value}</div>}
                </div>);
                              `;
          renderComp.push(renderCompItem);
          break;

        case "Date":
          importComp.push(`import DateField from 'components/RowField/DateField';`);
          renderCompItem += `    
            case 'date'://日期
                  return (<div>
                      {record._edit ?
                          <DateField {...this.props}
                              status={record['_status']}//是否修改过标记
                              validate={record['_validate']}//启用验证
                          /> : <div>{value}</div>}
                  </div>);
                              `;
          renderComp.push(renderCompItem);
          break;

        case "Ref":
          importComp.push(`import Ref${_.upperFirst(colName)} from 'components/RowField/Ref${_.upperFirst(colName)}';`);
          renderCompItem += `    
           case '${colName}': 
                return (<div>
                    {record._edit ?
                        <Ref${_.upperFirst(colName)} {...this.props}
                            status={record['_status']}//是否修改过标记
                            validate={record['_validate']}//启用验证
                        /> : <div>{record.${colName}Name}</div>}
                </div>);
                              `;
          renderComp.push(renderCompItem);
          break;

        default:
          break;
      }
    }
  });

 console.log('tableSchema map end')

  // Ouptut Result
  result += `import React, { Component } from 'react';`;

  
  
  importComp = _.uniq(importComp);
  importComp.map(item => {
    result += `
        ${item}
     `;
  });

  result += `
     class FactoryComp extends Component {
        constructor(props) {
          super(props);
        }


        renderComp = () => {
        let { type, value, record } = this.props;
        switch (type) {  
              
   `;


   console.log('renderComp o');
          console.log(renderComp)

  renderComp.map(item => {
    result += `
          ${item}
      `;
  });

  result += `
                   default:
                      return (<div>组件类型错误</div>)
              }
          }
          render() {
              return (<div>
                  {this.renderComp()}
              </div>);
          }
      }

      export default FactoryComp;

  `;

  const formattedFactoryComp = prettier.format(result, {
    parser: "babylon",
    plugins
  });

  return formattedFactoryComp;
};




export const genGridColumn = _state => {
  const { tableSchema } = _state;

  let result = "";

  result += `column = [`;

  tableSchema.map(item => {
    if (!ignoreColumnName.includes(item.columnName)) {
      const colName = _.camelCase(item.columnName);
      const filterType = item.filterType ? item.filterType : "none";
      const sorter = item.sorter ? item.sorter : "none";
      const render = item.render ? item.render : "none";

      result += `
           {
               title: "${colName}",
               dataIndex: "${colName}",
               key: "${colName}",
               width: 120,

          `;

      // filterType
      switch (filterType) {
        case "none":
          break;
        case "text":
          result += `
                filterType: "text",
                filterDropdownType: "string",
                filterDropdown: "show",
              `;
          break;
        case "number":
          result += `
                filterType: "number", 
                filterDropdownType: "number", 
                className: 'column-number-right ', 
                filterInputNumberOptions: {
                    max: 999999,
                    min: 0,
                    step: 1,
                    precision: 0
                },
              `;
          break;
        case "date":
          result += `
                filterType: "date",
                filterDropdown: "show", 
              `;
          break;
        case "daterange":
          result += `
                filterDropdown: "hide", 
                filterType: "daterange", 
                filterDropdownType: "daterange", 
              `;
          break;
        case "dropdown":
          result += `
                filterType: "dropdown",
                filterDropdown: "hide",  
                filterDropdownAuto: "manual", 
                filterDropdownData: [{key: "KEY_1", value: "VALUE_1"}, {key: "KEY_2", value: "VALUE_2"}],
              `;
          break;

        default:
          break;
      }

      // sorter
      if (sorter !== "none") {
        result += `
                sorter: (a, b) => a.${colName} - b.${colName},
            `;
      }

      // render
      //Facroty Comp
      if (_.startsWith(render, "FactoryComp-")) {
        result += `
          render: (text, record, index) => {
                return <FactoryComp
                    type='${colName}'  //业务组件类型
                    value={text} //初始化值
                    field='${colName}' //修改的字段
                    index={index} //字段的行号
                    required={true} //必输项
                    record={record} //记录集用于多字段处理
                    onChange={this.changeAllData} //回调函数
                    onValidate={this.onValidate} //校验的回调
                />
            }
        `;
      }
      switch (render) {
        case "none":
          break;
        case "Basic-span":
          result += `
                render: (text, record, index) => {
                    return <span>{text ? text : ""}</span>
                }
              `;
          break;
        case "Basic-moment":
          result += `
                render: (text, record, index) => {
                      return <div>{text ? moment(text).format("YYYY/MM/DD") : ""}</div>
                }
              `;
          break;
        case "Basic-toLocaleString":
          result += `
                render: (text, record, index) => {
                      return  <span>{typeof text === "number" ? Number(text.toFixed(2)).toLocaleString() : ""}</span>;
                }
              `;
          break;
        case "Basic-Tooltip":
          result += `
                render: (text, record, index) => {
                    return (
                        <Tooltip inverse overlay={text}>
                            <span>{text}</span>
                        </Tooltip>
                    );
                }
              `;
          break;

        default:
          break;
      }

      result += `},`;
    }
  });

  result += `];`;

  const formattedGridColumn = prettier.format(result, {
    parser: "babylon",
    plugins
  });

  return formattedGridColumn;
};






export const genColumnInitTmp = _state => {
  const { tableSchema } = _state;

  let result = "";

  result += `
            let tmp = {
              key: uuid(),
              _edit: true,
              _isNew: true,
              _checked: false,
              _disabled: false,
              _flag: false,
            `;


    let map = new Map();

    map.set("String", `''`);
    map.set("Double", 0.0);
    map.set("Integer", 0);           

  tableSchema.map(item => {
    if (!ignoreColumnName.includes(item.columnName)) {
      const colName = _.camelCase(item.columnName);
      const type = item.type;
      const initVal = map.get(type);

  
      if(colName == 'year'){
          result += `year: moment().format('YYYY'),`;
      }else{
          result += ` ${colName}:${initVal}, `;

      }
    }
  })

 

  result += `}`;

  const formattedColunmInitTmp = prettier.format(result, {
    parser: "babylon",
    plugins
  });

  return formattedColunmInitTmp;
};








export const formatTableSchemaToArray = _tableSchema => {
  let preprocessData = _.split(_tableSchema, "[");
  const patt = new RegExp("]");
  preprocessData = _.filter(preprocessData, item => patt.test(item));
  preprocessData = _.map(preprocessData, item => _.split(item, "]")[0]);

  preprocessData = _.filter(preprocessData, o => {
    return o !== "" && o !== "\n";
  });

  return preprocessData;
};

// Set Seeting Config For Setting Comp Data
export const formateConfigParam = _data => {
  const packageName = _.toLower(_data.packageName);
  const projectName = _.upperFirst(_.camelCase(_data.projectName));
  const tableName = _data.tableName;
  let tableSchema = _data.tableSchema;

  let map = new Map();

  map.set("VAR", "String");
  map.set("DEC", "Double");
  map.set("INT", "Integer");

  const tableSchemaArray = formatTableSchemaToArray(tableSchema);

  tableSchema = [];

  for (let i = 0; i < tableSchemaArray.length; i += 2) {
    let obj = {};
    obj.columnName = tableSchemaArray[i];
    obj.type = map.get(_.toUpper(tableSchemaArray[i + 1]).substring(0, 3));
    obj.key = tableSchemaArray[i];

    tableSchema.push(obj);
  }

  return { packageName, projectName, tableName, tableSchema };
};
