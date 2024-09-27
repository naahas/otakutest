package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.clickhouse.ClickHouseService;
import org.springframework.ui.Model;



@Controller
public class HelloController {

	@Autowired
    private ClickHouseService clickHouseService;

	@GetMapping("/")
	public String index(Model model) {

		int totalplayer = clickHouseService.getTotalPlayers();
		model.addAttribute("totalplayer" , totalplayer);

        return "index";
	}


	/* TOTAL POINTS  : 3692 */


}
