
package com.example.demo.clickhouse;

import com.clickhouse.client.ClickHouseClient;
import com.clickhouse.client.ClickHouseNode;
import com.clickhouse.client.ClickHouseProtocol;
import com.clickhouse.client.ClickHouseRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

@Configuration
public class ClickHouseConfig {

    @Value("${clickhouse.url}")
    private String url;

    @Value("${clickhouse.username}")
    private String username;

    @Value("${clickhouse.password}")
    private String password;


    @Bean
    public ClickHouseClient clickHouseClient() {
        return ClickHouseClient.newInstance(ClickHouseProtocol.HTTP);
    }

    
    @Bean
    public ClickHouseRequest<?> clickHouseRequest(ClickHouseClient client) {
        HashMap<String, String> options = new HashMap<>();
        options.put("user", username);
        options.put("password", password);

        ClickHouseNode server = ClickHouseNode.of(url, options);
        return client.read(server);
    }
}
