
package com.wendy.realestate.model;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "hasAttorney",
    "wantsRecommendationAndIntroduction"
})
public class AttorneyChoices_ {

    @JsonProperty("hasAttorney")
    private String hasAttorney;
    @JsonProperty("wantsRecommendationAndIntroduction")
    private String wantsRecommendationAndIntroduction;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("hasAttorney")
    public String getHasAttorney() {
        return hasAttorney;
    }

    @JsonProperty("hasAttorney")
    public void setHasAttorney(String hasAttorney) {
        this.hasAttorney = hasAttorney;
    }

    @JsonProperty("wantsRecommendationAndIntroduction")
    public String getWantsRecommendationAndIntroduction() {
        return wantsRecommendationAndIntroduction;
    }

    @JsonProperty("wantsRecommendationAndIntroduction")
    public void setWantsRecommendationAndIntroduction(String wantsRecommendationAndIntroduction) {
        this.wantsRecommendationAndIntroduction = wantsRecommendationAndIntroduction;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}
