
package com.wendy.realestate.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
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
@Jacksonized @Builder
public @Data
class Buyer {

    @JsonProperty("list")
    private List<List_> list;
    @JsonProperty("agent")
    private Agent_ agent;
    @JsonProperty("broker")
    private Broker_ broker;
    @JsonProperty("recommendedAttorneys")
    private List<RecommendedAttorney> recommendedAttorneys;
    @JsonProperty("attorney")
    private Attorney_ attorney;
    @JsonProperty("attorneyChoices")
    private AttorneyChoices_ attorneyChoices;
    @JsonIgnore
    private Map<String, Object> additionalProperties;

}
