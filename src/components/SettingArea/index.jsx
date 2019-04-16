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
        console.log('submit value')
        console.log(values);
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
            //    [CREATE_TIME]    [VARCHAR]  
            //    [CREATE_USER]    [VARCHAR]  
            //    [LAST_MODIFIED]    [VARCHAR]  
            //    [LAST_MODIFY_USER]    [VARCHAR] 
            //    [BPM_STATE]    [DECIMAL]  
            //    [TS]    [VARCHAR] 
            //    [DR]    [DECIMAL]  
            //    [TENANT_ID]    [VARCHAR]  
            //    [ID]    [CHAR]  
            //    [CODE]    [VARCHAR]  
            //    [DESCRIPTION]    [NVARCHAR]  
            //    [BUCKET_NO]    [INT]  
            // `,
            rules: [
              { required: true, message: "Please input your Table Schema!" }
            ]
          })(<TextArea rows={10} />)}
        </Form.Item>

        {/* # Project Name */}
        <Form.Item label="# Project Name">
          {getFieldDecorator("projectName", {
            rules: [
              { required: true, message: "Please input your Project Name!" }
            ]
          })(<Input placeholder="project name" />)}
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
