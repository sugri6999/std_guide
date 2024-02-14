$(function () {
	var listNum = $('.guideTbl01.blue tbody').length;
	var sum = 0;
	var sumNum = 0;
	var tName = ""
	var htmlSum = ""
	var totalSum = 0;
	var totalSum2 = 0;
	var ii = 0; // 전체 리스트 갯수

	//항목별 합계 구해

	for (var i = 0; i < listNum; i++) {
		sum = 0;
		listNum2 = $('.guideTbl01.blue tbody').eq(i).children('tr').length;
		for (var j = 0; j < listNum2; j++) {
			tName = $('.guideTbl01.blue tbody').eq(i).children('tr').eq(j).children('td').eq(0).text()

			if ($('.guideTbl01.blue tbody').eq(i).children('tr').eq(j).children('td').eq(7).text() == "Y") {
				sumNum = 1;
			}
			else {
				sumNum = 0;
			}
			sum += sumNum;
			ii++;
			tName += " [ " + sum + " / " + listNum2 + " ]"

		}

		// 작업공정률 동적 생성
		if (i % 3 == 0) htmlSum += '<tr>'
		htmlSum += '<th scope="row"><span class="form-check"><input type="checkbox" name="input_check" checked id="' + "menu" + i + '" /><label for="' + "menu" + i + '"><span>' + tName + '</span></label></label></span></th><td class="alC">' + Math.ceil(sum * (100 / (listNum2))) + '％</td>'

		totalSum += sum;


	}

	totalSum2 = totalSum * 100 / ii;

	// 작업공정률 빈박스 채워넣어주기
	if (listNum % 3 != 0) {
		if (listNum % 3 == 1) {
			htmlSum += '<th scope="row"></th><td class="alC"></td><th scope="row"></th><td class="alC"></td>'
		}
		else if (listNum % 3 == 2) {
			htmlSum += '<th scope="row"></th><td class="alC"></td>'
		}
		// else if (listNum % 3 == 3) {
		// 	htmlSum += '<th scope="row"></th><td class="alC"></td>'
		// }
	}
	$('.totalNum').text("[" + (Math.ceil(totalSum2)) + "%]");
	$('.totalNum').parent().append(' <span class="form-check"><input type="checkbox" id="allCheck" checked /><label for= "allCheck"><span>전체선택</span></label></span> [ ' + totalSum + ' / ' + ii + ' ]')
	$('.rowtbl tbody').html(htmlSum);

	// 인풋 클릭시 전체/완료목록/미완료목록

	$(document).on('click', 'input', function (event) {



		if ($(this).attr('type') == "radio") {
			switch ($(this).attr('id')) {
				case ('muSort1'):
					$('.guideTbl01.blue tbody tr').css('display', '')
					break;
				case ('muSort2'):
					for (i = 0; i < listNum; i++) {

						listNum2 = $('.guideTbl01.blue tbody').eq(i).children('tr').length;
						for (j = 0; j < listNum2; j++) {
							if ($('.guideTbl01.blue tbody').eq(i).children('tr').eq(j).children('td').eq(7).text() == "Y") {
								$('.guideTbl01.blue tbody').eq(i).children('tr').eq(j).css({ 'display': '' })
							}
							else {
								$('.guideTbl01.blue tbody').eq(i).children('tr').eq(j).css({ 'display': 'none' })
							}
						}

					}
					break;
				case ('muSort3'):
					for (i = 0; i < listNum; i++) {

						listNum2 = $('.guideTbl01.blue tbody').eq(i).children('tr').length;
						for (j = 0; j < listNum2; j++) {
							if ($('.guideTbl01.blue tbody').eq(i).children('tr').eq(j).children('td').eq(7).text() == "N") {
								$('.guideTbl01.blue tbody').eq(i).children('tr').eq(j).css({ 'display': '' })
							}
							else {
								$('.guideTbl01.blue tbody').eq(i).children('tr').eq(j).css({ 'display': 'none' })
							}
						}

					}
					break;
			}
		} else if ($(this).attr('type') == "checkbox") {

			if ($(this).attr('id') == "allCheck") {

				if ($(this).prop("checked") == true) {
					$('.guideTbl01.blue tbody').css({ 'display': '' })
					$('input[name="input_check"]').prop('checked', 'check');
				} else {
					$('.guideTbl01.blue tbody').css({ 'display': 'none' })
					$('input[name=input_check]').prop('checked', '');

				}

			} else {
				$('input:checkbox').each(function (index, value) {

					if ($(this).prop("checked") == true) {
						$('.guideTbl01.blue tbody').eq(index - 1).css({ 'display': '' })
					} else {

						$('.guideTbl01.blue tbody').eq(index - 1).css({ 'display': 'none' })
						$('input[id="allCheck"]').prop('checked', '');
					}



				});


			}





		}

	});


});