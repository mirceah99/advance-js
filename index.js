const hello = $G("MIRCEA", "H");
const loginButton = $("#login");
const languageDropdown = $("#lang");

loginButton.click(function () {
	// first set proper language and after update the html
	hello.setLanguage(languageDropdown.val()).updateHtml("#greeting", "formal");
});
