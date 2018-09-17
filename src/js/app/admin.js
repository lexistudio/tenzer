// Администратор сайта.
//
require.config({
  paths: {
    'admin': '../app/admin',
    'lib':   '../app/lib',
    'ckeditor-core':   '/admin/lib/common/ckeditor/ckeditor',
    'ckeditor-jquery': '/admin/lib/common/ckeditor/adapters/jquery',
  },
  shim: {
    'ckeditor-jquery': {
      deps: ['jquery', 'ckeditor-core']
    },
    'ckeditor-core': {
      deps: ['../app/admin']
    }
  }
});

// ВНИМАНИЕ! 
//
// КОД, РАЗМЕЩАЕМЫЙ ЗДЕСЬ, ВЫПОЛНЯЕТСЯ СИНХРОННО В ГЛОБАЛЬНОМ ПРОСТРАНСТВЕ ИМЕН.
//
// ИСПОЛЬЗОВАНИЕ ЭТОГО ФАЙЛА ДЛЯ РАЗМЕЩЕНИЯ КОДА ДОПУСТИМО ТОЛЬКО ДЛЯ 
// СОВМЕСТИМОСТИ С РАНЕЕ НАПИСАННЫМ КОДОМ. ОБЪЕМ КОДА, РАЗМЕЩЕННОГО ЗДЕСЬ,
// ДОЛЖЕН БЫТЬ МИНИМАЛЬНЫМ.  В КОДЕ НЕДОСТУПНА НИ ОДНА БИБЛИОТЕКА, КРОМЕ JQUERY.
//
// ИСПОЛЬЗОВАНИЕ ЭТОГО ФАЙЛА ДЛЯ РАЗМЕЩЕНИЯ ОБЫЧНОГО КОДА ПРИЛОЖЕНИЯ СТРОГО
// ЗАПРЕЩЕНО.
//


/**
 * Установка порядка сортировки.
 */
function doOrder(ud, sname, field, id, idA, page) {
  $.post(sname + '-order.htm', {
    ud:    ud,
    field: field,
    id:    id,
    idA:   idA,
    page:  page
  })
    .success(function (response) {
      $('#tableList').html(response);
    });
  return false;
}

/**
 * Показ каких-то полей.
 */
function showInput(id, name, style) {
  $('#' + name + id).html(
    '<input name="itemChange[' + id + '][' + name + ']" type="text" value="' + 
      $('#' +name + id).html() + '"' + style + ' />');
}

/**
 * Установка набора чекбоксов.
 */
function fnCheckBox(obj, regname) {
  var r = new RegExp(regname),
      i;

  for (i = 0; i < obj.length; i++) {
    if (obj[i].type == 'checkbox' && obj[i].name.match(r)) {
      obj[i].checked = !obj[i].checked;
    }
  }
}


/**
 * Подтверждение удаления.
 */
function onDelete() {
  return confirm('Вы действительно хотите удалить выделенные строки?');
}


/**
 * Подтверждение изменения.
 */
function onChange() {
  return confirm('Вы действительно хотите изменить информацию?');
}

