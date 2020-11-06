
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
    "withTracyGagne",
    "hasReferral",
    "additionalNotes",
    "finalPaymentSplit"
})

@Jacksonized @Builder
public @Data
class AdditionalInformation {

    @JsonProperty("withTracyGagne")
    private Boolean withTracyGagne;
    @JsonProperty("hasReferral")
    private Boolean hasReferral;
    @JsonProperty("additionalNotes")
    private String additionalNotes;
    @JsonProperty("finalPaymentSplit")
    private String finalPaymentSplit;
    @JsonIgnore
    private Map<String, Object> additionalProperties;

}
