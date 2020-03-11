import {
  Alert, Button, List, message
} from 'antd';
import { connect } from 'dva';
import * as React from 'react';
import Wrapper from '../wrapper';

interface PropsType {
  readonly dispatch: any;
}

const Comp: React.FC<PropsType> = ({
  dispatch,
}) => {
  const requestList = [
    {
      label: 'GET',
      contents: [
        {
          label: 'GET',
          type: 'examples/get',
        }, {
          label: 'GET带querystring',
          type: 'examples/get',
          payload: {
            id: 1,
          },
        }, {
          label: 'GET带querystring与路径参数',
          type: 'examples/getWithDynamicSegment',
          payload: {
            keyword: 'keyword',
            id: 1,
          },
        },
      ],
    }, {
      label: 'POST, PUT, DELETE, ...',
      contents: [
        {
          label: 'POST',
          type: 'examples/post',
          payload: {
            name: 'name',
            id: 1,
          },
        }, {
          label: 'POST带requestBody, querystring, 路径参数, 并指定contentType',
          type: 'examples/postWithQuerystring',
          payload: {
            name: 'name',
            id: 1,
            params: {
              host: '10.1.1.1',
            },
          },
        }, {
          label: 'PUT',
          type: 'examples/put',
          payload: {
            id: 1,
          },
        }, {
          label: 'DELETE',
          type: 'examples/delete',
        },
      ],
    },
  ];

  return (
    <Wrapper>
      <Alert
        message="XHR异步请求实例，项目request请求使用axios实现，在src/config/api中对请求URL进行模块化管理，在service与request的js文件中对axios进行二次封装，在axios原有提供的参数上，增加了路径参数(例如: /api/url/:id，其中id为路径参数)与一些其他控制参数(例如noGlobalError)，以下为一些常见的异步请求例子"
        type="info"
        closable
        showIcon
        style={{marginBottom: '20px'}}
      />

      {
        requestList.map(item => (
          <List
            key={item.label}
            header={<div>{item.label}</div>}
            bordered
            style={{marginBottom: '20px'}}
            dataSource={item.contents}
            renderItem={item => (
              <List.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    const options = {
                      type: item.type,
                    } as any;
                    if (item.payload) {
                      options.payload = item.payload;
                    }
                    dispatch(options);
                    message.success(`成功发出dispatch请求${item.type}`);
                  }}
                >
                  {item.label}
                </Button>
              </List.Item>
            )}
          />
        ))
      }
    </Wrapper>
  );
};

export default connect()(Comp);
