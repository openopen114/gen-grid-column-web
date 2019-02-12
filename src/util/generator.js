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

export const genGridColumn = _state => {
  const { tableSchema } = _state;

  let result = "";

  result += `const column = [`;

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
      switch (render) {
        case "none":
          break;
        case "span":
          result += `
                render: (text, record, index) => {
                    return <span>{text ? text : ""}</span>
                }
              `;
          break;
        case "moment":
          result += `
                render: (text, record, index) => {
                      return <div>{text ? moment(text).format("YYYY/MM/DD") : ""}</div>
                }
              `;
          break;
        case "toLocaleString":
          result += `
                render: (text, record, index) => {
                      return  <span>{typeof text === "number" ? Number(text.toFixed(2)).toLocaleString() : ""}</span>;
                }
              `;
          break;
        case "Tooltip":
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
