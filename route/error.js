export default function errorHanlder(req, res) {
    const errorObj = {
        code: "404",
        message: "Error: Not Found",
    };

    return res.json(errorObj);
}
