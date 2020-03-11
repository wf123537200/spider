import {
  Button, Form, Input, Pagination
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'dva';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { AppModelType } from 'src/models/app';
import styles from './style.less?local';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 6
    }
  }
};

interface PropsType {
  readonly app: AppModelType;
  // readonly dispatch: any;
}

const Login: React.FC<PropsType & InjectedIntlProps & FormComponentProps> = ({
  // dispatch,
  intl,
  form,
  app
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll(() => {
      return null;
    });
  };

  const { formatMessage } = intl;
  const { getFieldDecorator } = form;
  const decoratorOptions = {
    validateTrigger: 'onBlur',
    initialValue: ''
  };

  return (
    <div className={styles.pageLogin}>
      <div className={styles.contain}>
        <div className={styles.title}>
          {app.locale}
          <FormattedMessage id="title" />
        </div>
        <Form layout="horizontal" {...formItemLayout} onSubmit={handleSubmit}>
          <FormItem label={formatMessage({ id: 'userName' })}>
            {getFieldDecorator('userName', {
              ...decoratorOptions,
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入登录名'
                },
                {
                  pattern: /^(?=[a-zA-Z_])\w{1,20}$/,
                  message:
                    '支持字母、数字和下划线，不能以数字开头，最长20个字符'
                }
              ]
            })(<Input autoComplete="off" />)}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              <FormattedMessage id="button" />
            </Button>
          </FormItem>
        </Form>

        <div>antd组件多语言测试：</div>
        <Pagination showSizeChanger defaultCurrent={3} total={20} />
      </div>
    </div>
  );
};

export default Form.create()(
  connect()(injectIntl(Login))
);
