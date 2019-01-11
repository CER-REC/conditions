import Events from '@storybook/core-events';
import shallowEqual from 'shallowequal';
import debounce from 'debounce';
import clone from 'clone';

class Store {
  constructor() {
    this.reset();
  }

  setChannel(channel) {
    if (this.channel) {
      this.channel.removeListener('addon:interaction:reset', this.reset);
    }
    this.channel = channel;
    channel.on('addon:interaction:reset', this.reset);
  }

  reset = () => {
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
    const newDataMerged = Object.assign({}, this.data, newData);
    if (shallowEqual(this.data, newDataMerged)) { return; }
    this.data = newDataMerged;
    this.updateComponent();
    this.updatePanel();
  }

  updateComponent = debounce(() => {
    this.channel.emit(Events.FORCE_RE_RENDER);
  }, 50);

  updatePanel = debounce(() => {
    this.channel.emit('addon:interaction:update', {
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
