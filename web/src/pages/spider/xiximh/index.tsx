import {
  Button, message,
  Typography
} from 'antd';
import * as React from 'react';
import { connect } from 'dva';
import { SpiderType } from 'src/models/spider';

const { Title, Paragraph, Text } = Typography;
interface PropsType {
  readonly dispatch: any;
  spider: SpiderType;
}

const Comp: React.FC<PropsType> = ({
 dispatch, spider
}) => {

  const inputChange = (e) => {
    dispatch({
      type: 'spider/updateState',
      payload: {
        targetUrl: e.target.value
      }
    })
  }

  const runSpider = () => {
    // 试试批量方案
    const range = [42826, 42849]; // 42849];
    for (let i = range[0], cnt = 0; i <= range[1]; i++, cnt++) {
      setTimeout(() => {
        console.log(i + ' has been send');
        const options = {
          type: 'spider/runWithHandless',
          payload: {
            ...spider,
            targetUrl: `https://www.xiximh.com/chapter/${i}`,
            type: 'xiximh'
          }
        } as any
        dispatch(options);
      }, 5000 * cnt);
    }
  }

  return (
    <Typography>
      <Title level={3}>介绍</Title>
      <Paragraph>
        这是专门放邪恶漫画的网站，每次看因为各种套路老是被骗点击，一气之下，就直接写两个爬虫
        这种网站也有一个好处，比较蠢，不太会管爬虫
        要找目标漫画要手机或者调试模式进入 https://www.xiximh.com/chapter/32736
      </Paragraph>

      <Title level={3}>输入下载漫画的地址</Title>
      <Paragraph>
        <input style={{marginRight: '20px', width: '700px'}} type="text" placeholder="https://www.xiximh.com/chapter/32736" onChange={inputChange} value={spider.targetUrl || 'https://www.xiximh.com/chapter/32736'} />
        <Button type="primary" onClick={runSpider}>run</Button>
      </Paragraph>
      {
        spider.res && spider.res.total && spider.res.addr
        && <div>成功请求<b>{spider.res.total}</b>张图片，查看地址： <div>{spider.res.addr}</div> </div>
      }


    </Typography>
  )
}

export default connect(({spider}) => ({spider}))(Comp);
