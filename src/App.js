import * as React from 'react';
import { Provider } from 'react-redux';
import mainRoutes from './routes';
import { PersistGate } from 'redux-persist/integration/react';
import createHistory from 'history/createBrowserHistory';
import { store, persistor } from './store';
import { ConnectedRouter } from 'react-router-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const history = createHistory();
const onBeforeLift = () => {
    // take some action before the gate lifts
    const rootLoading = window.document.getElementById('root-loading');
    if (rootLoading) {
        rootLoading.style.opacity = '0';
        setTimeout(() => {
            rootLoading.style.display = 'none';
        },         500);
    }
};
const Loading = () => <div>loading</div>;

export default class App extends React.Component {
    render() {
        return(
            <LocaleProvider locale={zhCN}>
                <Provider store={store}>
                    <PersistGate
                        loading={<Loading />}
                        onBeforeLift={onBeforeLift}
                        persistor={persistor}
                    >
                        <ConnectedRouter history={history} >
                            {
                                mainRoutes
                            }
                        </ConnectedRouter>
                    </PersistGate>
                </Provider>
            </LocaleProvider>
        );
    }

}
