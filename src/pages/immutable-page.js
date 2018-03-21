
import immutable from 'seamless-immutable';


wx.immutable = immutable;

const emptyObject = immutable({});

export default class ImmutableComponent {
  get state() {
    return this._immutable_state || emptyObject;
  }
  set state(nextState) {
    this._immutable_state = immutable(nextState);
  }

  get props() {
    return this._immutable_props || emptyObject;
  }

  set props(nextProps) {
    this._immutable_props = immutable(nextProps);
  }
}
