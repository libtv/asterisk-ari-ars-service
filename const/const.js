//* server info *//
export const SERVER_PORT = "3000";
export const EXTENSION = "7777";
export const CONTEXT = "junho-internal";
export const PRIORITY = "1";
export const ASTERISK_KEY = "asterisk:asterisk";

//* response *//
export const RESULT = {
    result: {
        resultCode: "",
        resultMessage: "",
    },
};

export const RESPONSE_TIMEOUT_CODE = "001";
export const RESPONSE_TIMEOUT_MESSAGE = "타임아웃이 발생하였습니다.";

export const RESPONSE_NOTEXSISKEY_CODE = "002";
export const RESPONSE_NOTEXSISKEY_MESSAGE = "키가 존재하지 않습니다.";

export const RESPONSE_KNOWNERROR_CODE = "999";
export const RESPONSE_KNOWNERROR_MESSAGE = "알 수 없는 에러가 발생하였습니다.";
