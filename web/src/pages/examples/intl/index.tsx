import {
  Alert, Button, Calendar, Collapse, Pagination, Transfer, Typography
} from 'antd';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const { Text } = Typography;

interface ExternalProps {
  history: any;
}

const Comp: React.FC<ExternalProps> = ({
  history,
}) => {
  const toggleLocale = () => {
    const { location } = history;
    const localesMap = {
      ['zh_CN']: 'en_US',
      ['en_US']: 'zh_CN',
    };
    history.push({
      pathname: location.pathname,
      search: location.search.replace(/locale=(\w+)/, ($0, $1) => {
        return `locale=${localesMap[$1]}`;
      }),
    });
  };

  const list = [
    {
      label: <FormattedMessage id="intl-basic-uses" />,
      content: (
        <pre>
          {'import { FormattedMessage } from \'react-intl\';\n\n'}
          {'const Comp: React.FC = () => {\n'}
          {'  return (\n'}
          {'    <div>\n'}
          {'      <FormattedMessage id="title" />\n'}
          {'    </div>\n'}
          {'  );\n'}
          {'};\n\n'}
          {'export default Comp;'}
        </pre>
      ),
    }, {
      label: <FormattedMessage id="intl-api-uses" />,
      content: (
        <pre>
          {'import { FormattedMessage, InjectedIntlProps, injectIntl } from \'react-intl\';\n\n'}
          {'const Comp: React.FC<InjectedIntlProps> = ({ intl }) => {\n'}
          {'  return (\n'}
          {'    <div title={intl.formatMessage({ id: \'title\' })}>\n'}
          {'      <FormattedMessage id="title" />\n'}
          {'    </div>\n'}
          {'  );\n'}
          {'};\n\n'}
          {'export default injectIntl(Comp);'}
        </pre>
      ),
    }, {
      label: <FormattedMessage id="intl-antd-uses" />,
      content: (
        <>
          <Pagination showSizeChanger defaultCurrent={3} total={20} style={{marginBottom: '20px'}} />
          <Transfer dataSource={[]} showSearch targetKeys={[]} render={item => item.title} />
          <Calendar fullscreen={false} />
        </>
      ),
    },
  ];

  return (
    <>
      <Alert
        message={(
          <>
            国际化实现实例，项目使用react-intl辅助提供多语言解决方案。在进行路由配置时，通过指定<Text code>{'locale?: (locale: string) => Promise<{ [key: string]: string }>;'}</Text>进行“字典翻译”，可见src/pages/index页面下的locales文件夹。
          </>
        )}
        type="info"
        closable
        showIcon
        style={{marginBottom: '20px'}}
      />

      <div style={{textAlign: 'right'}}>
        <Button type="link" onClick={toggleLocale}>一键切换中英文</Button>
      </div>

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
