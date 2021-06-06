$(function () {

	/*********************************************
	 * スムーススクロール
	 *********************************************/
	$('a[href^="#"]').click(function () {
		let header = $('.header').innerHeight();
		let speed = 500;
		let id = $(this).attr("href"); // 遷移先ID（href属性）
		let target = $("#" == id ? "html" : id); // #のみだhtmlタグ（トップ）に戻る
		let position = $(target).offset().top - header; // 固定ヘッダー分引く
		// ヘッダーがfixedでない場合
		if ($(".header").css("position") !== "fixed") {
			position = $(target).offset().top;
		}
		if (position < 0) {
			position = 0;
		}
		$("html, body").animate({
				scrollTop: position
			},
			speed
		);
		return false;
	});

	/*********************************************
	 * ドロワー
	 * jQuery
	 *********************************************/
	let drawerBtn = $("#js-drawer");
	drawerBtn.on("click", function (e) {
		e.preventDefault();
		let targetClass = $(this).attr("data-target");
		$("." + targetClass).toggleClass("is-checked"); // for-drawerクラスがついてる要素をトグルでis-checked
		return false;
	});
	// リンク選択時にドロワーを閉じる
	$('.js-drawer-item').on('click', function (e) {
		let targetClass = drawerBtn.attr("data-target");
		$("." + targetClass).removeClass('is-checked');
	});
	$(window).resize(function () {
		if ($(window).width() > 559) { // is-checkedが残っているタブレット以上のサイズになった場合もバグる可能性あり
			let targetClass = drawerBtn.attr("data-target");
			$("." + targetClass).removeClass('is-checked');
			// $(".header").removeClass('is-white');
		} else { // スマホの時はヘッダーを白く
			// $(".header").addClass('is-white');
		}
	});

	/*********************************************
	 * フォームバリデーション
	 *********************************************/
	let formName = $('#name'),
		formKana = $('#name_kana'),
		formPhone = $('#phone'),
		formEmail = $('#email'),
		formCreateRequest = $('#create-request'),
		formRepairRequest = $('#repair-request'),
		formOtherRequest = $('#other-request'),
		formSubmit = $('#submit');
	// チェックフラグ
	let flgName = false,
		flgKana = false,
		flgPhone = false,
		flgEmail = false,
		flgRequest = false;
	// 正規表現
	let regKana = /^([ァ-ン]|ー)+$/;
	let regEmail = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
	let regPhone = /^0[789]0[0-9]{4}[0-9]{4}$/;
	let regPhoneHyphen = /^0[789]0-[0-9]{4}-[0-9]{4}$/;
	// チェック方針：アウトな場合trueを返す
	let checkEmpty = str => (str == '' || str == null); // 空チェック
	let checkName = name => checkEmpty(name); // 氏名チェック
	let checkKana = kana => (checkEmpty(kana) || kana.match(regKana) == null); // カタカナのみチェック
	let checkPhone = phone => (checkEmpty(phone) ||
		(phone.match(regPhone) == null && phone.match(regPhoneHyphen) == null)); // 電話番号チェック（ハイフンなし/あり両方とも許容）
	let checkEmail = email => (checkEmpty(email) || email.match(regEmail) == null); // メールアドレスチェック
	let checkDisable = () => (flgName && flgKana && flgPhone && flgEmail && flgRequest); // 必須項目総チェック
	// 送信ボタンのdisableチェック、トグルによる変更
	function submitBtnCheckAndToggle() {
		if (checkDisable()) {
			formSubmit.prop("disabled", false);
		} else {
			formSubmit.prop("disabled", true);
		}
	};
	// [入力時] お名前チェック
	formName.change(function () {
		if (checkName(formName.val())) {
			alert('氏名を入力してください。');
			flgName = false;
		} else {
			flgName = true;
		}
		submitBtnCheckAndToggle();
	});
	// [入力時] フリガナチェック
	formKana.change(function () {
		if (checkKana(formKana.val())) {
			alert('カタカナで入力してください。');
			flgKana = false;
		} else {
			flgKana = true;
		}
		submitBtnCheckAndToggle();
	});
	// [入力時] メールアドレスチェック
	formEmail.change(function () {
		if (checkEmail(formEmail.val())) {
			alert('メールアドレス形式で入力してください。');
			flgEmail = false;
		} else {
			flgEmail = true;
		}
		submitBtnCheckAndToggle();
	});
	// [入力時] 電話番号チェック
	formPhone.change(function () {
		if (checkPhone(formPhone.val())) {
			alert('電話形式で入力してください。');
			flgPhone = false;
		} else {
			flgPhone = true;
		}
		submitBtnCheckAndToggle();
	});
	// [入力時] ご依頼内容チェック
	formCreateRequest.change(function () {
		flgRequest = true;
		submitBtnCheckAndToggle();
	});
	formRepairRequest.change(function () {
		flgRequest = true;
		submitBtnCheckAndToggle();
	});
	formOtherRequest.change(function () {
		flgRequest = true;
		submitBtnCheckAndToggle();
	});

})