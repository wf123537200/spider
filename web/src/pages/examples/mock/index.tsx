import {
  Alert, Collapse
} from 'antd';
import * as React from 'react';

const Comp: React.FC = () => {
  const list = [
    {
      label: '基础用法',
      content: (
        <>
          <div style={{marginBottom: '20px'}}>
            在项目根目录下的mock文件夹里进行response定义，除index文件外，其他每个文件为一个单独的接口响应，具体文件中的数据可参考如下定义方式，其中url并不包括前缀(例如/api)，前缀统一在index中管理。
          </div>
          <pre>
            {'module.exports = {\n'}
            {'  url: "/user",\n'}
            {'  data: {\n'}
            {'    name: "danielzli",\n'}
            {'    id: "1",\n'}
            {'    role: "admin",\n'}
            {'  },\n'}
            {'};'}
          </pre>
        </>
      ),
    }, {
      label: '更多配置',
      content: (
        '开发中...'
      ),
    },
  ];

  return (
    <>
      <Alert
        message="项目提供Mock功能，助于开发环境下的接口调试。目前仅支持GET请求，后续再完善其他方法。"
        type="info"
        closable
        showIcon
        style={{marginBottom: '20px'}}
      />

      <Collapse defaultActiveKey={list.map((item, index) => index)}>
        {
          list.map((item, index) => (
            <Collapse.Panel
              key={index}
              header={<div>{item.label}</div>}
            >
              {item.content}
            </Collapse.Panel>
          ))
        }
      </Collapse>
    </>
  );
};

export default Comp;
