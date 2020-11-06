
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
    "list",
    "agent",
    "broker",
    "recommendedAttorneys",
    "attorney",
    "attorneyChoices"
})
public class Seller {

    @JsonProperty("list")
    private java.util.List<com.domain.List> list = null;
    @JsonProperty("agent")
    private Agent agent;
    @JsonProperty("broker")
    private Broker broker;
    @JsonProperty("recommendedAttorneys")
    private java.util.List<Object> recommendedAttorneys = null;
    @JsonProperty("attorney")
    private Attorney attorney;
    @JsonProperty("attorneyChoices")
    private AttorneyChoices attorneyChoices;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("list")
    public java.util.List<com.domain.List> getList() {
        return list;
    }

    @JsonProperty("list")
    public void setList(java.util.List<com.domain.List> list) {
        this.list = list;
    }

    @JsonProperty("agent")
    public Agent getAgent() {
        return agent;
    }

    @JsonProperty("agent")
    public void setAgent(Agent agent) {
        this.agent = agent;
    }

    @JsonProperty("broker")
    public Broker getBroker() {
        return broker;
    }

    @JsonProperty("broker")
    public void setBroker(Broker broker) {
        this.broker = broker;
    }

    @JsonProperty("recommendedAttorneys")
    public java.util.List<Object> getRecommendedAttorneys() {
        return recommendedAttorneys;
    }

    @JsonProperty("recommendedAttorneys")
    public void setRecommendedAttorneys(java.util.List<Object> recommendedAttorneys) {
        this.recommendedAttorneys = recommendedAttorneys;
    }

    @JsonProperty("attorney")
    public Attorney getAttorney() {
        return attorney;
    }

    @JsonProperty("attorney")
    public void setAttorney(Attorney attorney) {
        this.attorney = attorney;
    }

    @JsonProperty("attorneyChoices")
    public AttorneyChoices getAttorneyChoices() {
        return attorneyChoices;
    }

    @JsonProperty("attorneyChoices")
    public void setAttorneyChoices(AttorneyChoices attorneyChoices) {
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
