
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
    "agentType",
    "property",
    "mortgage",
    "client",
    "additionalInformation",
    "referral"
})

@Jacksonized
@Builder
public
@Data
class Details_ {

    @JsonProperty("agentType")
    private String agentType;
    @JsonProperty("property")
    private Property property;
    @JsonProperty("mortgage")
    private Mortgage mortgage;
    @JsonProperty("client")
    private Client client;
    @JsonProperty("additionalInformation")
    private AdditionalInformation additionalInformation;
    @JsonProperty("referral")
    private Referral referral;

    @JsonIgnore
    private Map<String, Object> additionalProperties;

}
