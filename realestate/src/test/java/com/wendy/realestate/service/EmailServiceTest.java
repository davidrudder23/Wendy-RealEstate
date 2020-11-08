package com.wendy.realestate.service;

import com.sun.mail.smtp.SMTPMessage;
import com.wendy.realestate.controller.TransactionController;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.Mockito.*;

import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.event.annotation.BeforeTestMethod;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import java.util.Properties;

import static org.junit.jupiter.api.Assertions.*;

//@SpringBootTest(classes=EmailService.class)
class EmailServiceTest {

    @InjectMocks
    private EmailService emailService;

    @Mock
    private JavaMailSender emailSender;

    @BeforeEach
    public void setup() {
        emailService = new EmailService();
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testMailing() throws Exception {
        when(emailSender.createMimeMessage()).thenReturn(new SMTPMessage(Session.getDefaultInstance(new Properties())));

        emailService.sendMessageWithAttachment("drig@noses.org", "mocked email test", "This is a test of the mocked email sender", null);

        verify(emailSender, times(1)).send(any(MimeMessage.class));
    }

}