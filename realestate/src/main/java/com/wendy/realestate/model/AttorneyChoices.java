
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
    "hasAttorney"
})
@Jacksonized
@Builder
public @Data class AttorneyChoices {

    @JsonProperty("hasAttorney")
    private String hasAttorney;
    @JsonIgnore
    private Map<String, Object> additionalProperties;

}
