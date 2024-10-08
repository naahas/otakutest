package com.example.demo;

import com.example.demo.clickhouse.ClickHouseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;



@RestController
public class TestHandle {


    @Autowired
    private ClickHouseService clickHouseService;

    @Autowired
    private ObjectMapper objectMapper;

    List<List<Object>> datas; 

    @PostConstruct  
    public void init() {
        datas = loadJSON(); 
    }





    @PostMapping("/launchTEST")
    public String getTestAlert(@RequestBody Map<String, String> payload, HttpSession session) {
        session.setAttribute("playerPoints" , 0);

        List<List<Object>> sessionQuestions = new ArrayList<>(datas);
        session.setAttribute("datastmp", sessionQuestions);
      
        List<List<Object>> datastmp = (List<List<Object>>) session.getAttribute("datastmp");

        int rdi = (int) (Math.random() * datastmp.size());
        String the_question = (String) datastmp.get(rdi).get(0);


        session.setAttribute("current_qpoint" , (Integer) datastmp.get(rdi).get(1));

        datastmp.remove(rdi);
        session.setAttribute("datastmp" , datastmp);

       
        return the_question;
    }




    @PostMapping("/submitAnswer")
    public List<Object> submitAnswer(@RequestBody Map<String, String> payload, HttpSession session) {
        String answer = payload.get("message");
      
        
        if ("yes".equals(answer)) {
            Integer playerPoints = (Integer) session.getAttribute("playerPoints");
            Integer currentQPoint = (Integer) session.getAttribute("current_qpoint");

            if (playerPoints == null) {
                playerPoints = 0;
            }
            
            if (currentQPoint == null) {
                currentQPoint = 0;
            }

            session.setAttribute("playerPoints", playerPoints + currentQPoint);
        } 


        if ("non".equals(answer)) {
            Integer playerPoints = (Integer) session.getAttribute("playerPoints");
            Integer currentQPoint = (Integer) session.getAttribute("current_qpoint");

            if (playerPoints == null) {
                playerPoints = 0;
            }
            
            if (currentQPoint == null) {
                currentQPoint = 0;
            }

            session.setAttribute("playerPoints", playerPoints);
        } 



        List<List<Object>> datastmp = (List<List<Object>>) session.getAttribute("datastmp");
        List<Object> response = new ArrayList<>();




        if (datastmp == null || datastmp.isEmpty() || datastmp.size() <= 35) {
            response.add("off");
            response.add(session.getAttribute("playerPoints"));
            clickHouseService.incrementTotalPlayers();
            return response;
        }


      


        int rdi = (int) (Math.random() * datastmp.size()); 
        String the_question = (String) datastmp.get(rdi).get(0);


        session.setAttribute("current_qpoint" , (Integer) datastmp.get(rdi).get(1));

        datastmp.remove(rdi);
        session.setAttribute("datastmp" , datastmp);

        response.add("on");
        response.add(the_question);

        return response;
    }






    public List<List<Object>> loadJSON() {
        try {
            InputStream is = getClass().getResourceAsStream("/json/datatest.json");
            Map<String, List<List<Object>>> data = objectMapper.readValue(is, Map.class);

            return data.get("questions"); 
        } catch (IOException e) {
            e.printStackTrace();
            return null; 
        }
    }
}
