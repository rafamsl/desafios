const socket = io.connect();

let users = []
let messages = []
let products = []
const productSection = document.getElementById("productos")
const createProductForm = document.getElementById('createProduct_form')
const aliasForm = document.getElementById('alias_form')
const textMsgForm = document.getElementById('textMsg_form')
const chatDisplay = document.getElementById('chat_display')


// chat

const getNameBySocketId = (socketId) => {
	const foundData = users.find(element => element.socketId === socketId)
	if (foundData === undefined){
		return 'Desconectado'
	}
	if (!foundData.name){
		return foundData.socketId
	} else {
		return foundData.name
	}
}

const cleanChat = () => {
	chatDisplay.innerHTML = ''
}

const renderMsg = ({msg, socketId, createdAt}) => {
	const classMsg = (socketId === socket.id) ? "chat_msg-own" : "chat_msg"
	const chatOwnerContent = (socketId === socket.id) ? "Yo" : getNameBySocketId(socketId)
	const chatMsg = document.createElement("div")
	const chatOwner = document.createElement("p")
	const chatDate = document.createElement("p")
	chatMsg.classList.add(classMsg)
	chatOwner.classList.add("chat_owner")
	chatDate.classList.add("chat_date")
	chatOwner.innerHTML = chatOwnerContent
	chatDate.innerHTML = createdAt
	chatMsg.appendChild(chatOwner)
	chatMsg.innerHTML = chatMsg.innerHTML + msg
	chatMsg.appendChild(chatDate)
	chatDisplay.appendChild(chatMsg)
}

aliasForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(aliasForm)
	const formValues = Object.fromEntries(formData)
	socket.emit('change alias',String(formValues.alias))
})

textMsgForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(textMsgForm)
	const formValues = Object.fromEntries(formData)
	socket.emit('new msg', formValues.textMsg)
	cleanChat()
})

socket.on('all messages', allMsg => {
	messages = allMsg
	cleanChat()
	 for (msgData of allMsg){
		renderMsg(msgData)
	 }
	 chatDisplay.scrollTo(0, chatDisplay.scrollHeight)
	})
	
socket.on('all users', allUser => {
	users = allUser
	cleanChat()
	for (msgData of messages){
		renderMsg(msgData)
	}
	chatDisplay.scrollTo(0, chatDisplay.scrollHeight)
})
	

// productos
const cleanProducts = () => {
	productSection.innerHTML = ""
}
createProductForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const formData = new FormData(createProductForm)
	const formValues = Object.fromEntries(formData)
	createProductForm.reset()
	socket.emit('new product', formValues)
})

const renderProducts = async (products) => {
let response = await fetch('/assets/templates/products.template.handlebars')
const template = await response.text()
const templateCompiled = Handlebars.compile(template)
const html = templateCompiled({ products })
productSection.innerHTML = html
}

socket.on('all products', allProduct => {
		products = allProduct
		cleanProducts()
		renderProducts(allProduct)
	})

