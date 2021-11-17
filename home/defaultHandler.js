import axios from "axios";
import MyARI from "../ari.js";
import { ASTERISK_KEY, CONTEXT, EXTENSION, PRIORITY, RESPONSE_KNOWNERROR_CODE, RESPONSE_NOTEXSISKEY_CODE, RESPONSE_TIMEOUT_CODE, RESULT } from "../const/const.js";
import { getResponse } from "../util/response.js";

const ari = new MyARI();
ari.connect();
let sequence = 0;
const endSession = {};

export default async function defaultHandler(req, res) {
    const body = req.body;
    const phoneNumber = body.phoneNumber;
    const key = body.key;
    const mySesison = sequence++;
    endSession[mySesison] = true;
    let channel;

    const setTimer = setTimeout(() => {
        delete endSession[mySesison];
        return res.end(JSON.stringify(getResponse(RESPONSE_TIMEOUT_CODE)));
    }, 20000);

    if (key !== "123456") {
        delete endSession[mySesison];
        return res.end(JSON.stringify(getResponse(RESPONSE_NOTEXSISKEY_CODE)));
    }

    axios
        .post(`http://localhost:8088/ari/channels?endpoint=SIP%2F${phoneNumber}&extension=${EXTENSION}&context=${CONTEXT}&priority=${PRIORITY}&timeout=30&api_key=${ASTERISK_KEY}`)
        .then((res) => {
            channel = res.data.name;
        })
        .catch((err) => {
            clearTimeout(setTimer);
            delete endSession[mySesison];
            return res.end(JSON.stringify(getResponse(RESPONSE_KNOWNERROR_CODE)));
        });

    ari.on("success", (data) => {
        if (data.channel === channel && endSession[mySesison]) {
            clearTimeout(setTimer);
            const successObj = Object.assign({}, RESULT);
            successObj.result.resultCode = "00";
            successObj.result.resultMessage = data;
            delete endSession[mySesison];
            return res.end(JSON.stringify(successObj));
        }
    });
}
