const socket = io.connect();
const productSection = document.getElementById("productos")
const createProductForm = document.getElementById('createProduct_form')
const loginForm = document.getElementById("login_form")
const logoutButton = document.getElementById('logout-button');
const username = document.getElementById("username")

// login
loginForm.addEventListener('submit',(e) =>{
	e.preventDefault()
	const formData = new FormData(loginForm)
	const formValues = Object.fromEntries(formData)
	const name = formValues.name
	window.location.replace(`/goinghome?name=${name}`);
})

//logout
logoutButton.addEventListener('click', function() {
	window.location.replace('/logout');
});


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
let response = await fetch('/views/products.template.hbs')
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

