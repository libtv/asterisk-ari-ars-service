import { RESULT, RESPONSE_TIMEOUT_CODE, RESPONSE_TIMEOUT_MESSAGE, RESPONSE_NOTEXSISKEY_CODE, RESPONSE_NOTEXSISKEY_MESSAGE, RESPONSE_KNOWNERROR_CODE, RESPONSE_KNOWNERROR_MESSAGE } from "../const/const.js";

export function getResponse(responseType) {
    var resultObj = Object.assign({}, RESULT);

    if (responseType === RESPONSE_TIMEOUT_CODE) {
        resultObj.result.resultCode = RESPONSE_TIMEOUT_CODE;
        resultObj.result.resultMessage = RESPONSE_TIMEOUT_MESSAGE;
    } else if (responseType === RESPONSE_NOTEXSISKEY_CODE) {
        resultObj.result.resultCode = RESPONSE_NOTEXSISKEY_CODE;
        resultObj.result.resultMessage = RESPONSE_NOTEXSISKEY_MESSAGE;
    } else {
        resultObj.result.resultCode = RESPONSE_KNOWNERROR_CODE;
        resultObj.result.resultMessage = RESPONSE_KNOWNERROR_MESSAGE;
    }

    return resultObj;
}
