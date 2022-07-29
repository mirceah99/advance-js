// immediate invoked function to protect my vars and avoid collisions
(function (window, $) {
	"use strict";
	// variables are protected to be accessed from outside of the function
	const supportedLanguage = ["en", "ro"];
	const greetings = {
		en: {
			formal: "Greetings",
			informal: "Hello",
		},
		ro: {
			formal: "Buna dimineata",
			informal: "Neata",
		},
	};
	// TBD for future log system
	const logMessages = {
		en: "Logged in ",
		ro: "Romanian ",
	};
	// this object will represent the proto for all future Greeting objects
	const greeterProt = {
		firstName: "Default",
		lastName: "Default",
		language: "ro",
		getSupportedLanguage: function () {
			return supportedLanguage;
		},
		fullName: function () {
			return this.firstName + " " + this.lastName;
		},
		validateLanguage: function (language) {
			if (supportedLanguage.indexOf(language) === -1) {
				throw `This language(${language}) is not supported, please see getSupportedLanguage: ${this.getSupportedLanguage()} `;
			}
		},
		greetingInformal: function () {
			this.validateLanguage(this.language);
			return ` ${greetings[this.language].informal} ${this.firstName}!`;
		},
		greetingFormal: function () {
			this.validateLanguage(this.language);
			return ` ${greetings[this.language].formal} ${this.fullName()}!`;
		},
		greet: function (formal, returnMsg) {
			var msg;
			if (formal === "formal") {
				msg = this.greetingFormal();
			}
			if (formal === "informal") {
				msg = this.greetingInformal();
			}
			console.log("msg", msg);
			if (returnMsg) return msg;
			return this;
		},
		setLanguage: function (language) {
			this.validateLanguage(language);
			this.language = language;
			return this;
		},
		updateHtml: function (selector, formal) {
			if (!$) throw "Please load $";
			const msg = this.greet(formal, true);
			$(selector).html(msg);
			return this;
		},
	};
	// instance a greeter object
	function Greeter(firstName, lastName, language) {
		language !== undefined && greeterProt.validateLanguage(language); // validate language
		const instance = Object.create(greeterProt);
		firstName !== undefined && (instance.firstName = firstName);
		lastName !== undefined && (instance.lastName = lastName);
		language !== undefined && (instance.language = language);
		return instance;
	}

	//add Greeter to window
	if (window.$G === undefined) {
		window.$G = Greeter;
	}
})(window, $); // in addition u can change jQuery library with something similar
