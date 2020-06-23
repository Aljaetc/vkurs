let data = {
	title: 'Custom header for modal window',
	closable: true,
	content: `
		<p>Lorem ipsum dolor sit.</p>
		<p>Lorem ipsum dolor sit.</p>
	`,
	width: '500px',
	footerButtons: [
		{
			text: 'Ok',
			type: 'primary',
			handler() {
				console.log('Primery btn clicked')
			}
		},
		{
			text: 'Cancel',
			type: 'danger',
			handler() {
				console.log('Danger btn clicked')
			}
		}
	]
}

const modal = $.modal(data)
// modal.open()

/*
	1. Динамически вывести список карточек из массива
	2. Показывать цену в модалке (с кнопкой ok) при нажатии на кнопку price (это должна быть одна модалка)
	3. Подтверждающая модалка для кнопки удалить с 2мя кнопками.
*/

const fruits = [
	{id: 1, title: 'Apple', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
	{id: 2, title: 'Orange', price: 30, img: 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_500.jpg'},
	{id: 3, title: 'Mango', price: 40, img: 'https://fnd.kiev.ua/uploads/product/000/4/thumbs/70_19-tayskoe-mango_2018-07-26_11-10-47.png'}
]
