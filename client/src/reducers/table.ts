import {Iac} from '../interfaces/Iac'
import {LOAD_RECORDS, RECORD_ADDED, RECORD_ADDED_FAILED, SUCCESS, FAIL} from '../constants'
import {Record} from 'immutable'

const ReducerState = Record({
    loaded: false,
    error: '',
// eslint-disable-next-line
    entities: new Array()
});
const defaultState = new ReducerState();

export default (state = defaultState, action: Iac) => {
    const {type, payload} = action;
    switch (type) {
        case RECORD_ADDED:
            return state
                .update('error', () => '')
                .update('entities', (entities) => [...entities, payload])
        case LOAD_RECORDS + FAIL:
            return state.update('error', () => 'connection error')
        case LOAD_RECORDS + SUCCESS:
            return state
                .update('error', () => '')
                .update('loaded', () => true)
                .update('entities', () => payload.data);
        case RECORD_ADDED_FAILED:
            return state.update('error', () => payload)
        default:
            return state
    }
}
