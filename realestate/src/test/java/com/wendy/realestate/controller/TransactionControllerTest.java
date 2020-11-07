package com.wendy.realestate.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(TransactionController.class)
class TransactionControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void getTransaction() throws Exception {
        mvc.perform(get("/transaction")).andExpect(content().string("transaction"));
    }

    @Test
    void postTransaction() throws Exception {
        mvc.perform(post("/transaction")
        .contentType(MediaType.APPLICATION_JSON)
        .content(getJsonForTest())
        ).andExpect(status().is(200));
    }

    private String getJsonForTest(){
        return "{\n" +
                "    \"details\": {\n" +
                "        \"agentType\": \"Seller\",\n" +
                "        \"property\": {\n" +
                "            \"loxBoxCode\": 123,\n" +
                "            \"inspectionDeadline\": \"10/28/2020\",\n" +
                "            \"publicOrTownWater\": \"Town Water\",\n" +
                "            \"titleOrTownSewer\": \"Title V\",\n" +
                "            \"dateHouseBuilt\": \"2021\",\n" +
                "            \"vacentOrOccupied\": \"Vacant\",\n" +
                "            \"propertyType\": \"Single Family\",\n" +
                "            \"address\": \"29 Draper Street, Springfield, MA, USA\",\n" +
                "            \"mlsNumber\": \"0000000\",\n" +
                "            \"deedReference\": \"0000-000000\",\n" +
                "            \"mapReferences\": \"00000000\",\n" +
                "            \"isInspectionWaved\": false\n" +
                "        },\n" +
                "        \"mortgage\": {\n" +
                "            \"houseClosingDate\": \"10/28/2020\",\n" +
                "            \"typeOfMortgage\": \"Cash\",\n" +
                "            \"areConcessions\": \"true\",\n" +
                "            \"concessions\": \"Testing 1, 2\",\n" +
                "            \"secondDeposit\": \"10000\",\n" +
                "            \"firstDeposit\": 20000,\n" +
                "            \"purchasePrice\": 200000\n" +
                "        },\n" +
                "        \"client\": {\n" +
                "            \"Seller\": {\n" +
                "                \"list\": [\n" +
                "                    {\n" +
                "                        \"firstName\": \"George\",\n" +
                "                        \"lastName\": \"Colon\",\n" +
                "                        \"email\": \"gcolon021@gmail.com\",\n" +
                "                        \"emailVerification\": \"gcolon021@gmail.com\",\n" +
                "                        \"phoneNumber\": \"4133560363\",\n" +
                "                        \"address\": \"29 Draper street, Springfield, MA, USA\"\n" +
                "                    }\n" +
                "                ],\n" +
                "                \"agent\": {\n" +
                "                    \"name\": \"George Colon\",\n" +
                "                    \"MLSNumber\": \"cn226414\",\n" +
                "                    \"email\": \"georgecolon2020@gmail.com\",\n" +
                "                    \"emailVerification\": \"georgecolon2020@gmail.com\",\n" +
                "                    \"phoneNumber\": \"413-317-0029\",\n" +
                "                    \"agencyCompensationPerMLS\": \"0\"\n" +
                "                },\n" +
                "                \"broker\": {\n" +
                "                    \"company\": \"George's Broker\",\n" +
                "                    \"address\": \"29 Draper Street, Springfield, MA, USA\"\n" +
                "                },\n" +
                "                \"recommendedAttorneys\": [\n" +
                "                    {\n" +
                "                        \"name\": \"George\",\n" +
                "                        \"firmName\": \"George's Firm\"\n" +
                "                    },\n" +
                "                    {\n" +
                "                        \"name\": \"George\",\n" +
                "                        \"firmName\": \"George's Firm\"\n" +
                "                    },\n" +
                "                    {\n" +
                "                        \"name\": \"George\",\n" +
                "                        \"firmName\": \"George's Firm\"\n" +
                "                    }\n" +
                "                ],\n" +
                "                \"attorney\": {},\n" +
                "                \"attorneyChoices\": {\n" +
                "                    \"hasAttorney\": \"false\",\n" +
                "                    \"wantsRecommendationAndIntroduction\": \"true\"\n" +
                "                }\n" +
                "            },\n" +
                "            \"Buyer\": {\n" +
                "                \"list\": [\n" +
                "                    {\n" +
                "                        \"firstName\": \"George\",\n" +
                "                        \"lastName\": \"Colon\",\n" +
                "                        \"email\": \"gcolon021@gmail.com\",\n" +
                "                        \"emailVerification\": \"gcolon021@gmail.com\",\n" +
                "                        \"phoneNumber\": \"4133560363\",\n" +
                "                        \"address\": \"29 Draper street, Springfield, MA, USA\"\n" +
                "                    }\n" +
                "                ],\n" +
                "                \"agent\": {\n" +
                "                    \"name\": \"George Colon\",\n" +
                "                    \"MLSNumber\": \"cn226414\",\n" +
                "                    \"email\": \"georgecolon2020@gmail.com\",\n" +
                "                    \"emailVerification\": \"georgecolon2020@gmail.com\",\n" +
                "                    \"phoneNumber\": \"413-317-0029\",\n" +
                "                    \"agencyCompensationPerMLS\": \"0\"\n" +
                "                },\n" +
                "                \"broker\": {\n" +
                "                    \"company\": \"George's Broker\",\n" +
                "                    \"address\": \"29 Draper Street, Springfield, MA, USA\"\n" +
                "                },\n" +
                "                \"recommendedAttorneys\": [\n" +
                "                    {\n" +
                "                        \"name\": \"George\",\n" +
                "                        \"firmName\": \"George's Firm\"\n" +
                "                    },\n" +
                "                    {\n" +
                "                        \"name\": \"George\",\n" +
                "                        \"firmName\": \"George's Firm\"\n" +
                "                    },\n" +
                "                    {\n" +
                "                        \"name\": \"George\",\n" +
                "                        \"firmName\": \"George's Firm\"\n" +
                "                    }\n" +
                "                ],\n" +
                "                \"attorney\": {},\n" +
                "                \"attorneyChoices\": {\n" +
                "                    \"hasAttorney\": \"false\",\n" +
                "                    \"wantsRecommendationAndIntroduction\": \"true\"\n" +
                "                }\n" +
                "            }\n" +
                "        },\n" +
                "        \"additionalInformation\": {\n" +
                "            \"withTracyGagne\": \"true\",\n" +
                "            \"hasReferral\": \"true\",\n" +
                "            \"additionalNotes\": \"Notes\",\n" +
                "            \"finalPaymentSplit\": \"\"\n" +
                "        },\n" +
                "        \"referral\": {\n" +
                "            \"Agent\": \"asd\",\n" +
                "            \"amount\": \"1000\",\n" +
                "            \"email\": \"gcolon021@gmail.com\",\n" +
                "            \"emailVerification\": \"gcolon021@gmail.com\"\n" +
                "        }\n" +
                "    }\n" +
                "}";
    }
}