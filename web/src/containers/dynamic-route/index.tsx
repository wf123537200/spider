import { connect } from 'dva';
import dynamic from 'dva/dynamic';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { AppModelType } from 'src/models/app';
import Wrapper from 'src/components/wrapper';

interface PropsType {
  app: AppModelType;
}

const defaultLoadingComponent = () => null;

function asyncComponent(config) {
  const { resolve } = config;

  class DynamicComponent extends React.Component<PropsType> {
    public mounted: boolean;

    public LoadingComponent: React.FC;

    public state: {
      localeMessages: { [key: string]: string };
      AsyncComponent: React.FC<{ [key: string]: any }> | null;
    };

    constructor(args) {
      super(args);
      this.LoadingComponent = defaultLoadingComponent;
      this.mounted = false;
      this.state = {
        localeMessages: {},
        AsyncComponent: null
      };
      this.load();
    }

    public componentDidMount() {
      this.mounted = true;
    }

    public componentWillUnmount() {
      this.mounted = false;
    }

    public componentWillReceiveProps(nextProps) {
      const { locale: oldLocale } = this.props.app;
      const { locale: newLocale } = nextProps.app;
      if (newLocale !== oldLocale) {
        this.loadLocale(newLocale);
      }
    }

    public load(appLocale = this.props.app.locale) {
      resolve(appLocale).then(([component, localeMessages]) => {
        const AsyncComponent = component.default || component;
        if (this.mounted) {
          this.setState({ AsyncComponent, localeMessages });
        } else {
          this.state.AsyncComponent = AsyncComponent; // eslint-disable-line
          this.state.localeMessages = localeMessages; // eslint-disable-line
        }
      });
    }

    public loadLocale(appLocale = this.props.app.locale) {
      resolve(appLocale).then(([, localeMessages]) => {
        if (this.mounted) {
          this.setState({ localeMessages });
        } else {
          this.state.localeMessages = localeMessages; // eslint-disable-line
        }
      });
    }

    public render() {
      const { AsyncComponent, localeMessages } = this.state;
      const { LoadingComponent } = this;

      if (AsyncComponent) {
        return (
          <IntlProvider messages={localeMessages || {}}>
            <Wrapper>
              <AsyncComponent {...this.props} />
            </Wrapper>
          </IntlProvider>
        );
      }

      return <LoadingComponent {...this.props} />;
    }
  }

  return connect(({ app = {} }) => ({
    app
  }))(DynamicComponent);
}

export default function routeDynamic(config) {
  const { locale: resolveLocale } = config;
  return asyncComponent({
    resolve(appLocale: string) {
      return new Promise(resolve => {
        if (appLocale && resolveLocale) {
          resolveLocale(appLocale).then((locale: { [key: string]: string }) => {
            const messages = locale.default;
            resolve([dynamic(config), messages]);
          });
        } else {
          resolve([dynamic(config)]);
        }
      });
    }
  });
}
