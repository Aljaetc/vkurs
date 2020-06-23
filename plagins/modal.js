Element.prototype.appendAfter = function(element) {
	element.parentNode.insertBefore(this, element.nextSibling)
}

function noop(){}

function _createModalFooter(buttons = []) {
	if (buttons.length === 0) {
		return document.createElement('div')
	}
	const wrap = document.createElement('div')
	wrap.classList.add('modal-footer')

	buttons.forEach(btn => {
		const $btn = document.createElement('button')
		$btn.textContent = btn.text
		$btn.classList.add('btn')
		$btn.classList.add(`btn-${btn.type || 'secondary'}`)
		$btn.onclick = btn.handler || noop
		wrap.appendChild($btn)
	})
	return wrap
}

function _createModal(options) {
	const DEFAULT_WIDTH = '600px'
	const modal = document.createElement('div')
	modal.classList.add('vmodal')
	modal.insertAdjacentHTML('afterbegin', `
		<div class="modal-overlay" data-close>
			<div class="modal-window" style="width:${options.width || DEFAULT_WIDTH}">
				<div class="modal-header">
					<span class="modal-title">${options.title || "Modal window"}</span>
					${options.closable ? '<span class="modal-close" data-close>&times;</span>' : ''}
				</div>
				<div class="modal-body" data-content>
					${options.content || ""}
				</div>
			</div>
		</div>
	`)
	const footer = _createModalFooter(options.footerButtons)
	footer.appendAfter(modal.querySelector('[data-content]'))
	document.body.appendChild(modal)
	return modal
}



/*
options = {
+	title: string
+	closable: boolean
+	content: string
+	width: string ('400px') ? How implement style in not inline css and is it necessary?
+	destroy(): void ??????
+	modal window should close
+	setContent(html: string): void | PUBLIC
	-------------
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
	let destroyed = false

	let modal = {
		open() {
			if (destroyed) {
				return console.log('Modal is destroyed')
			}
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
	}

	const handleClick = event => {
		if (options.closable && (event.target.hasAttribute("data-close"))) modal.close()
	}

	$modal.addEventListener('click', handleClick)

	return Object.assign(modal, {
		destroy() {
			$modal.parentNode.removeChild($modal)
			$modal.removeEventListener('click', handleClick)
			destroyed = true
		},
		setContent(html) {
			$modal.querySelector('[data-content]').innerHTML = html
		}
	})
}