export function setCustomErrorMessages(input) {
  input.setCustomValidity('');
  if (input.validity.patternMismatch) {
    input.setCustomValidity('Текст не должен начинаться с пробела и содержать одни пробелы');
  }
}

export const defaultSubmitTitle = {
  save: 'Сохранить',
  add: 'Добавить',
  confirm: 'Да'
}

export const defaultSubmitButtons = {
  'edit-form': false,
  'add-form': true,
  'avatar-form': false,
}

export const defaultValidationMessage = {
  'person': '',
  'about': '',
  'avatar-link': '',
  'name': '',
  'link': ''
}
