import * as React from 'react';
import { Button, Icon } from 'antd';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import './index.less';

const Index: React.FC<InjectedIntlProps> = ({ intl }) => {
  return (
    <div title={intl.formatMessage({ id: 'title' })}>
      <div className="page">
        <div className="container">
          <div className="main">
            <FormattedMessage id="title" />
            <div>
              <Button type="primary" href="/#/quickstart" style={{marginRight: '20px'}}>
                <FormattedMessage id="quickstart" />
              </Button>
              <Button type="primary" target="_blank" href="https://git.code.oa.com/DC_DP/react-seed3-ts">
                <Icon type="github" /> Star
              </Button>
            </div>
          </div>
          <div className="meta">
            <img src="/public/react.svg" alt="logo" />
          </div>
          <div className="ball" />
        </div>
      </div>
    </div>
  );
};

export default injectIntl(Index);
