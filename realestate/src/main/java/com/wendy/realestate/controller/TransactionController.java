package com.wendy.realestate.controller;

import com.wendy.realestate.model.Details;
import com.wendy.realestate.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private EmailService emailService;

    @GetMapping
    public String getTransaction(){
        return "transaction";
    }

    @PostMapping
    public int postTransaction(@RequestBody Details details) {

        try {
            emailService.sendMessageWithAttachment(
                    "gcolon021@gmail.com",
                    "wendy realestate email test",
                    "hello world!",
                    ""
            );
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return 200;
    }

}
