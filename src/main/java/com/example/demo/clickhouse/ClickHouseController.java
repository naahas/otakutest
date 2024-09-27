package com.example.demo.clickhouse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClickHouseController {

    private final ClickHouseService clickHouseService;

    @Autowired
    public ClickHouseController(ClickHouseService clickHouseService) {
        this.clickHouseService = clickHouseService;
    }



    // @GetMapping("/gettp")
    // public String getTotalPlayers() {
    //     int tot = clickHouseService.getTotalPlayers();
    //     return "Total Players : " + tot;
    // }
}
