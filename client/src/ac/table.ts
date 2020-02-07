import {LOAD_RECORDS, RECORD_ADDED, RECORD_ADDED_FAILED} from '../constants'
import {Iac, Igetter} from '../interfaces/Iac'
import TableService from '../services/table'
export function loadRecords(): Igetter {
    return {
        type: LOAD_RECORDS,
        callApi: `/api`,
    };
}
export function addRecord(text: string) {
    return (dispatch: any) => {
        (async ()=>{
            try {
                await TableService.add(text)
                dispatch(recordAdded(text))
            } catch (error) {
                console.log(error)
                dispatch(recordAddedFailed(error))
            }
        })()
    }
}
export function recordAdded(text: string): Iac {
    return {
        type: RECORD_ADDED,
        payload: text,
    }
}
export function recordAddedFailed(error: string) {
    return {
        type: RECORD_ADDED_FAILED,
        payload: error
    }
}
