import {
  Button, message,
  Typography
} from 'antd';
import * as React from 'react';
import { connect } from 'dva';

const { Title, Paragraph, Text } = Typography;
interface PropsType {
  readonly dispatch: any;
}

const Comp: React.FC<PropsType> = ({
 dispatch,
}) => {
  let config = {
    rootName: '/saveRoot'
  }

  const inputChange = (e) => {
    config.rootName = e.target.value;
  }

  const saveConfig = () => {
    console.log(config);
    const options = {
      type: 'quickstart/saveRootDir',
      payload: {
        ...config
      }
    } as any
    dispatch(options);
    message.success(`成功发出dispatch请求,参数为${options}`);
  }

  return (
    <Typography>
      <Title level={3}>初心和介绍</Title>
      <Paragraph>
        项目使用eggjs搭建，当前初具雏形，希望后面形成一个可以分析的指定网站的爬虫集合
        此项目当前和后端部分部署到一起，为了轻量，没有连接数据库，会直接在指定文件夹下生成数据
      </Paragraph>

      <Title level={3}>全局配置</Title>
      <Paragraph>
        <ul>
          <li>在这里输入保存文件的目录路径，建议是绝对路径,相对路径亦可</li>
          <li><input type="text" placeholder="/saveRoot" onChange={inputChange} /></li>
        </ul>
        <Button type="primary" onClick={saveConfig}>save</Button>
      </Paragraph>

      <Title level={3}>当前支持网站列表，点击跳转到对应分析器</Title>
      <Paragraph>
        <ul>
          <li><a href="/3had.com">www.3had.com 提供连接，下载包含目录地址的整本漫画到本地 ./saveRoot/comicName/</a></li>
        </ul>
      </Paragraph>
    </Typography>
  )
}

export default connect()(Comp);
