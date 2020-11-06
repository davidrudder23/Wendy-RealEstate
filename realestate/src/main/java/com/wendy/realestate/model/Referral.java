
package com.wendy.realestate.model;

import java.util.Map;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "Agent",
    "amount",
    "email",
    "emailVerification"
})
@Jacksonized @Builder
public @Data
class Referral {

    @JsonProperty("Agent")
    private String agent;
    @JsonProperty("amount")
    private String amount;
    @JsonProperty("email")
    private String email;
    @JsonProperty("emailVerification")
    private String emailVerification;
    @JsonIgnore
    private Map<String, Object> additionalProperties;

}
