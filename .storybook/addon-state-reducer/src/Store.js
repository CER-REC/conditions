import Events from '@storybook/core-events';
import shallowEqual from 'shallowequal';
import debounce from 'debounce';
import clone from 'clone';

class Store {
  constructor() {
    this.reset();
  }

  setChannel(channel) {
    this.channel = channel;
  }

  reset() {
    this.data = {};
    this.actions = {};
    this.logs = [];
    this.updateComponent();
    this.updatePanel();
  }

  addLog(name, argsRaw, result) {
    const args = argsRaw.map((v) => {
      if (v && v.stopPropagation && v.preventDefault) {
        // This is an event. Don't save it
        return `${v.persist ? 'Synthetic' : ''}Event<${v.type}>`;
      }
      return v;
    });
    this.logs.push({
      name,
      args: clone(args),
      result: clone(result),
    });
    this.updatePanel();
  }

  updateData(newData) {
    if (shallowEqual(this.data, newData)) { return; }
    this.data = newData;
    this.updateComponent();
    this.updatePanel();
  }

  updateComponent = debounce(() => {
    this.channel.emit(Events.FORCE_RE_RENDER);
  }, 50);

  updatePanel = debounce(() => {
    this.channel.emit('addon:state-reducer:update', {
      data: this.data,
      actions: Object.keys(this.actions),
      logs: this.logs,
    });
  }, 50);

  setActions(newActions) {
    this.actions = newActions;
    this.updatePanel();
  }
}

export default new Store();
