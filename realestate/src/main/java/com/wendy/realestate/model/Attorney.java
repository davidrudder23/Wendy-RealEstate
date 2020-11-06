
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
    "name",
    "firmName",
    "email",
    "emailVerification",
    "phoneNumber"
})

@Jacksonized @Builder
public @Data
class Attorney {

    @JsonProperty("name")
    private String name;
    @JsonProperty("firmName")
    private String firmName;
    @JsonProperty("email")
    private String email;
    @JsonProperty("emailVerification")
    private String emailVerification;
    @JsonProperty("phoneNumber")
    private String phoneNumber;
    @JsonIgnore
    private Map<String, Object> additionalProperties;

}
