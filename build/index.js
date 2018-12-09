"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noop = () => { };
const logError = (e) => console.error(e);
function readLineStream(xhr, onLine, onDone = noop, onError = logError) {
    let seenBytes = 0, buffer = '';
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === XMLHttpRequest.LOADING || xhr.readyState === XMLHttpRequest.DONE) {
            const newData = xhr.responseText.substr(seenBytes);
            let i = newData.indexOf('\n');
            if (i > -1) {
                buffer += newData.substring(0, i);
                onLine(buffer);
                const lines = newData.split('\n');
                lines.shift();
                buffer = lines.pop() || '';
                lines.forEach(l => onLine(l));
            }
            else {
                buffer += newData;
            }
            seenBytes = xhr.responseText.length;
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (buffer.length) {
                    onError(`buffer not empty! length: ${buffer.length}`);
                }
                onDone();
            }
        }
    });
}
exports.readLineStream = readLineStream;
