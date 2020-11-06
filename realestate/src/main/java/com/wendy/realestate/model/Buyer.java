
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
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "list",
    "agent",
    "broker",
    "recommendedAttorneys",
    "attorney",
    "attorneyChoices"
})
public @Data
class Buyer {

    @JsonProperty("list")
    private List<List_> list = null;
    @JsonProperty("agent")
    private Agent_ agent;
    @JsonProperty("broker")
    private Broker_ broker;
    @JsonProperty("recommendedAttorneys")
    private List<RecommendedAttorney> recommendedAttorneys = null;
    @JsonProperty("attorney")
    private Attorney_ attorney;
    @JsonProperty("attorneyChoices")
    private AttorneyChoices_ attorneyChoices;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("list")
    public List<List_> getList() {
        return list;
    }

    @JsonProperty("list")
    public void setList(List<List_> list) {
        this.list = list;
    }

    @JsonProperty("agent")
    public Agent_ getAgent() {
        return agent;
    }

    @JsonProperty("agent")
    public void setAgent(Agent_ agent) {
        this.agent = agent;
    }

    @JsonProperty("broker")
    public Broker_ getBroker() {
        return broker;
    }

    @JsonProperty("broker")
    public void setBroker(Broker_ broker) {
        this.broker = broker;
    }

    @JsonProperty("recommendedAttorneys")
    public List<RecommendedAttorney> getRecommendedAttorneys() {
        return recommendedAttorneys;
    }

    @JsonProperty("recommendedAttorneys")
    public void setRecommendedAttorneys(List<RecommendedAttorney> recommendedAttorneys) {
        this.recommendedAttorneys = recommendedAttorneys;
    }

    @JsonProperty("attorney")
    public Attorney_ getAttorney() {
        return attorney;
    }

    @JsonProperty("attorney")
    public void setAttorney(Attorney_ attorney) {
        this.attorney = attorney;
    }

    @JsonProperty("attorneyChoices")
    public AttorneyChoices_ getAttorneyChoices() {
        return attorneyChoices;
    }

    @JsonProperty("attorneyChoices")
    public void setAttorneyChoices(AttorneyChoices_ attorneyChoices) {
        this.attorneyChoices = attorneyChoices;
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
