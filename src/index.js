import React from "react";
import { render } from "react-dom";
import { observable, action, autorun } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

class Notification extends React.Component {
  render() {
    return (
      <div>
        {this.props.noti.level}:{this.props.noti.content}
      </div>
    );
  }
}

class NotificationStore {
  @observable notifications = [];

  addNoti(noti) {
    this.notifications.push(noti);
  }
}

class AppState {
  @observable timer = 0;

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  @action.bound
  reset() {
    this.timer = 0;
  }
}

@observer
class NotificationContainer extends React.Component {
  render() {
    const store = this.props.store;
    return (
      <div>
        <ul>
          {store.notifications.map((noti, idx) => (
            <Notification noti={noti} key={idx} />
          ))}
        </ul>
        <button onClick={() => store.addNoti({level:"info",content:"Haha"})}>Add Noti</button>
      </div>
    );
  }
}

const TimerView = observer(({ appState }) => (
  <button onClick={appState.reset}>Seconds passed: {appState.timer}</button>
));

const notiStore = new NotificationStore();

render(
  <div>
    <TimerView appState={new AppState()} />
    <NotificationContainer store={notiStore} />
    <DevTools />
  </div>,
  document.getElementById("root")
);
