package com.wendy.realestate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service("EmailService")
public class EmailService {

    private static final String TEST_EMAIL="gcolon021@gmail.com";

    @Autowired
    private JavaMailSender emailSender;

    public void sendMessageWithAttachment(String to, String subject, String text, String pathToAttachment) throws MessagingException {

        MimeMessage message = emailSender.createMimeMessage();
        // pass 'true' to the constructor to create a multipart message
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(TEST_EMAIL);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);

//        FileSystemResource file = new FileSystemResource(new File(pathToAttachment));
//        helper.addAttachment("Invoice", file);

        emailSender.send(message);

    }

}
