let fruits = [
	{id: 1, title: 'Apple', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
	{id: 2, title: 'Orange', price: 30, img: 'https://vistapointe.net/images/orange-1.jpg'},
	{id: 3, title: 'Mango', price: 40, img: 'https://fnd.kiev.ua/uploads/product/000/4/thumbs/70_19-tayskoe-mango_2018-07-26_11-10-47.png'}
]

const toHtml = fruit => `
	<div class="col">
		<div class="card">
			<img class="card-img-top" style="height: 300px" src="${fruit.img}" alt="${fruit.title}">
			<div class="card-body">
				<h5 class="card-title">${fruit.title}</h5>
				<a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Price</a>
				<a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Remove</a>
			</div>
		</div>
	</div>
`

function render() {
	const html = fruits.map(toHtml).join('')
	document.querySelector('#fruits').innerHTML = html
}

render()

/* modal window */

//data for modal window
// let data = {
// 	title: 'Custom header for modal window',
// 	closable: true,
// 	content: `
// 		<p>Lorem ipsum dolor sit.</p>
// 		<p>Lorem ipsum dolor sit.</p>
// 	`,
// 	width: '500px',
// 	footerButtons: [
// 		{
// 			text: 'Ok',
// 			type: 'primary',
// 			handler() {
// 				console.log('Primery btn clicked')
// 			}
// 		},
// 		{
// 			text: 'Cancel',
// 			type: 'danger',
// 			handler() {
// 				console.log('Danger btn clicked')
// 			}
// 		}
// 	]
// }

const priceModal = $.modal({
	title: 'The price for goods',
	closable: true,
	width: '500px',
	footerButtons: [
		{
			text: 'Close',
			type: 'primary',
			handler() {
				priceModal.close()
			}
		},
	]
})

document.addEventListener('click', event => {
	event.preventDefault()
	const btnType = event.target.dataset.btn
	const id = +event.target.dataset.id
	const fruit = fruits.find(f => f.id === id)
	if ( btnType === 'price' ) {
	
		priceModal.setContent(`
			<p>Price for ${fruit.title}: <strong>${fruit.price}$</strong></p>
		`)
		priceModal.open()
	} else if (btnType === 'remove') {
		$.confirm({
			title: 'Are you sure?',
			content: `<p>You are removing fruit: <strong>${fruit.title}</strong></p>`
		}).then(() => {
			fruits = fruits.filter(f => f.id !== id)
			render()
		}).catch(() => {
		})
	}
})


/* homework */

/*
	1. Динамически вывести список карточек из массива +
	2. Показывать цену в модалке (с кнопкой ok) при нажатии на кнопку price (это должна быть одна модалка) +
	3. Подтверждающая модалка для кнопки удалить с 2мя кнопками. +
*/


