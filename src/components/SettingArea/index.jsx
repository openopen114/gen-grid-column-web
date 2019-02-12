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
