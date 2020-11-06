
package com.wendy.realestate.model;

import java.util.Map;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "list",
    "agent",
    "broker",
    "recommendedAttorneys",
    "attorney",
    "attorneyChoices"
})

@Jacksonized
@Builder
public @Data class Seller {

    @JsonProperty("list")
    private List<com.wendy.realestate.model.List> list;
    @JsonProperty("agent")
    private Agent agent;
    @JsonProperty("broker")
    private Broker broker;
    @JsonProperty("recommendedAttorneys")
    private java.util.List<Object> recommendedAttorneys;
    @JsonProperty("attorney")
    private Attorney attorney;
    @JsonProperty("attorneyChoices")
    private AttorneyChoices attorneyChoices;
    @JsonIgnore
    private Map<String, Object> additionalProperties;

}
