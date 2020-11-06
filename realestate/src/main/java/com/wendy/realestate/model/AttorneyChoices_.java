
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
    "hasAttorney",
    "wantsRecommendationAndIntroduction"
})
@Jacksonized @Builder
public @Data
class AttorneyChoices_ {

    @JsonProperty("hasAttorney")
    private String hasAttorney;
    @JsonProperty("wantsRecommendationAndIntroduction")
    private String wantsRecommendationAndIntroduction;
    @JsonIgnore
    private Map<String, Object> additionalProperties;

}
