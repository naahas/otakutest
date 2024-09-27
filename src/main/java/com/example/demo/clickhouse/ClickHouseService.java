package com.example.demo.clickhouse;

import com.clickhouse.client.ClickHouseRequest;
import com.clickhouse.client.ClickHouseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClickHouseService {

    private ClickHouseRequest<?> clickHouseRequest;

    @Autowired
    public ClickHouseService(ClickHouseRequest<?> clickHouseRequest) {
        this.clickHouseRequest = clickHouseRequest;
    }


    

    public int getTotalPlayers() {
        final int[] total = {5}; // Utilisation d'un tableau mutable pour contourner l'erreur
        String query = "SELECT totalplayer FROM otakutable";
        try (ClickHouseResponse response = clickHouseRequest.query(query).executeAndWait()) {
            response.stream().forEach(row -> {
                total[0] = row.getValue(0).asInteger(); 
            });
        } catch (Exception e) {
            e.printStackTrace();
        }


        return total[0];
    }


    
    public void incrementTotalPlayers() {
        String query = "ALTER TABLE otakutable UPDATE totalplayer = totalplayer + 1 WHERE 1 = 1";
        try (ClickHouseResponse response = clickHouseRequest.query(query).executeAndWait()) {
            System.out.println("Incrémentation réussie !");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
