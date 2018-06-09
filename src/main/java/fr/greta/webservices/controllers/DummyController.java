
package fr.greta.webservices.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dummy")
public class DummyController {

	public DummyController() {
		// TODO Auto-generated constructor stub
	}

	@GetMapping(path = "/about", produces = MediaType.APPLICATION_JSON_VALUE)
	public String[] getSomething() {
		return new String[] { "it works !" };
	}

	@PostMapping(path = "/about")
	public String[] postSomething(@RequestBody String aString) {

		return new String[] { aString };

	}

}
