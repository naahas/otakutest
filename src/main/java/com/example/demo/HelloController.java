package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;


@Controller
public class HelloController {

    String main_msg;

	@GetMapping("/")
	public String index(Model model) {
        return "index";
	}


	/* TOTAL POINTS  : 3692 */


}
