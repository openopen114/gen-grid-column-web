import React, { useContext } from "react";

import AppContext from "../../config/Context";
import { Form, Input, Button } from "antd"; 

import "./index.scss";

const { TextArea } = Input;

const SettingArea = hocProps => { 

  //App context 
  const { setSettingConfig } = useContext(AppContext);


  //HOC Form Props
  const {
    validateFields,
    getFieldDecorator,
    getFieldsError, 
  } = hocProps.form;


  //Submit Function
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setSettingConfig(values);
      }
    });
  };


  //check has error
  const hasErrors = fieldsError => {
    const hasError = Object.keys(fieldsError).some(field => fieldsError[field]);
    return hasError;
  };

  return (
    <div className="setting-area">
      <Form layout="vertical" onSubmit={handleSubmit}>
        {/* # Table Schema */}
        <Form.Item label="# Table Schema">
          {getFieldDecorator("tableSchema", {
            // initialValue:`
            //   [ID] [varchar](64) NOT NULL,
            //   [NAME] [varchar](64) NULL,
            //   [IS_SON] [decimal](1, 0) NULL,
            //   [PARENTID] [varchar](64) NULL,
            //   [CREATE_TIME] [varchar](64) NULL,
            //   [CREATE_USER] [varchar](64) NULL,
            //   [LAST_MODIFIED] [varchar](64) NULL,
            //   [LAST_MODIFY_USER] [varchar](64) NULL,
            //   [TS] [varchar](64) NULL,
            //   [DR] [decimal](11, 0) NULL,
            //   [BPM_STATE] [decimal](11, 0) NULL,
            //   [TENANT_ID] [varchar](64) NULL,
            //   [CODE] [varchar](255) NULL
            // `,
            rules: [
              { required: true, message: "Please input your Table Schema!" }
            ]
          })(<TextArea rows={10} />)}
        </Form.Item>

        {/* Submit Button  */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(SettingArea);
