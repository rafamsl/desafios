import { config } from "../../config/index.js";
import { DATE_UTILS } from "../../utils/date-utils.js";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const sendRandom = (cant) => {
    const result = {}
    const startTime = Date.now();
    for (let index = 0; index < cant; index++) {
        const number = getRandomIntInclusive(1,10000) 
        if (number in result){
            result[number] += 1
        } else(
            result[number] = 1
        )
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime > process.env.TIMEOUT){
            return false
        }
    }
    console.log(`ELAPSED TIME ${Date.now() - startTime}`)
    return result

}

console.log("CHILD CREATED on pid ", process.pid)

process.on("message", async (message)=>{
    if (message.key === "number"){
        const result = sendRandom(message.value)
        if (result == false){
            console.log(`result = ${result}`)
            process.exit(0)
        } else {
            process.send({result:[result], server:config.PROCESS.PID , date: DATE_UTILS.getTimestamp()})
        }
    }
    if(message.key === "status"){
        process.exit(10)
    }
})
