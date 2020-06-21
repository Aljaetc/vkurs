function _createModal(options) {
	const modal = document.createElement('div')
	modal.classList.add('vmodal')
	modal.insertAdjacentHTML('afterbegin', `
		<div class="modal-overlay">
			<div class="modal-window" ${options.width ? `style="width:${options.width}"` : ''}>
				<div class="modal-header">
					<span class="modal-title">${options.title}</span>
					${options.closable ? '<span class="modal-close" onclick="modal.close()">&times;</span>' : ''}
				</div>
				<div class="modal-body">
					<p>${options.content}</p>
				</div>
				<div class="modal-footer">
					<button type="button">Ok</button>
					<button type="button">Cancel</button>
				</div>
			</div>
		</div>
	`)
	document.body.appendChild(modal);
	return modal
}

/*
options = {
		title: string
		closable: boolean
		content: string
		width: string ('400px') ? How implement style in not inline css and is it necessary?
	destroy(): void
	modal window should close
	-------------
	setContent(html: string): void | PUBLIC
	onClose(): void
	onOpen(): void
	beforeClose(): boolean | true - can close | false - can't close
	-------------
	animate.css
}
*/

$.modal = function(options) {
	const ANIMATION_SPEED = 200
	const $modal = _createModal(options)
	let closing = false

	return {
		open() {
			!closing && $modal.classList.add('open')
		},
		close() {
			closing = true
			$modal.classList.remove('open')
			$modal.classList.add('hide')
			setTimeout(() => {
				$modal.classList.remove('hide')
				closing = false
			}, ANIMATION_SPEED)
		},
		destroy() {}
	}
}