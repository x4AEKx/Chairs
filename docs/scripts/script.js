const phone = document.querySelector('.top-header__phone')
const modal = document.querySelector('.modal')
const modalSubmit = document.querySelector('.modal-submit')
const modalClose = document.querySelectorAll('.card__close')
const btnDiscount = document.querySelector('.card-discount__button')
const btnMap = document.querySelector('.map__submit')
const arrayForms = document.querySelectorAll('form')

const arrayOpenModal = [phone, btnDiscount, btnMap]

arrayOpenModal.forEach(function(item) {
	item.addEventListener('click', function() {
		modal.classList.add('modal__active')
	
		function functionModalClose() {
			modal.classList.remove('modal__active')
			modalClose.removeEventListener('click', functionModalClose)
			modal.removeEventListener('click', functionHideModal)
		}
	
		function functionHideModal(e) {
			if (e.target === modal) {
				functionModalClose()
			}
		}
	
		modalClose.forEach(function(item) {
			item.addEventListener('click', functionModalClose)
		}) 
	
		modal.addEventListener('click', functionHideModal)
	})
})

arrayForms.forEach(function(item) {
	item.addEventListener('submit', function(e) {
		e.preventDefault()

		if(modal.classList.contains('modal__active')) {
			modal.classList.remove('modal__active')
		}

		modalSubmit.classList.add('modal__active')

		function functionModalClose() {
			modalSubmit.classList.remove('modal__active')
			modalClose.removeEventListener('click', functionModalClose)
			modalSubmit.removeEventListener('click', functionHideModal)
		}

		function functionHideModal(e) {
			if (e.target === modalSubmit) {
				functionModalClose()
			}
		}

		modalClose.forEach(function(item) {
			item.addEventListener('click', functionModalClose)
		}) 

		modalSubmit.addEventListener('click', functionHideModal)
	})
})