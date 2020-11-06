
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
    "MLSNumber",
    "email",
    "emailVerification",
    "phoneNumber",
    "agencyCompensationPerMLS"
})
@Jacksonized
@Builder
public @Data
class Agent {

    @JsonProperty("name")
    private String name;
    @JsonProperty("MLSNumber")
    private String mLSNumber;
    @JsonProperty("email")
    private String email;
    @JsonProperty("emailVerification")
    private String emailVerification;
    @JsonProperty("phoneNumber")
    private String phoneNumber;
    @JsonProperty("agencyCompensationPerMLS")
    private String agencyCompensationPerMLS;
    @JsonIgnore
    private Map<String, Object> additionalProperties;

}
