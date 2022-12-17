function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const sendRandom = async (cant) => {
    const result = {}
    for (let index = 0; index < cant; index++) {
        const number = getRandomIntInclusive(1,10000) 
        if (number in result){
            result[number] += 1
        } else(
            result[number] = 1
        )
    }
    process.send(result)

}

console.log("CHILD CREATED on pid ", process.pid)

process.on("message", async (message)=>{
    if (message.key === "number"){
        console.log("got a number")
        setTimeout(process.exit,100)
        sendRandom(message.value)
        
    }
    if (message.key === "status"){
        console.log("got status ok")
        process.exit(10)
    }
    
})
