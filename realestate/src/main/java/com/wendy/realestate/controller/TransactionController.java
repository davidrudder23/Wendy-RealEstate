package com.wendy.realestate.controller;

import com.wendy.realestate.model.Details;
import com.wendy.realestate.model.Details_;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @RequestMapping("/Buyers")
    public String buyersTransaction(){
        return "buyersTransaction";
    }

    @RequestMapping(method=RequestMethod.POST, value="/Buyers")
    public void newBuyersTransaction(@RequestBody Details test){
        System.out.println(test.getDetails().getAgentType());
    }

}
