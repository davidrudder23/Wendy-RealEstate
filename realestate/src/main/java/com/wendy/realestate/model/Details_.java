
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
    "agentType",
    "property",
    "mortgage",
    "client",
    "additionalInformation",
    "referral"
})
public class Details_ {

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
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("agentType")
    public String getAgentType() {
        return agentType;
    }

    @JsonProperty("agentType")
    public void setAgentType(String agentType) {
        this.agentType = agentType;
    }

    @JsonProperty("property")
    public Property getProperty() {
        return property;
    }

    @JsonProperty("property")
    public void setProperty(Property property) {
        this.property = property;
    }

    @JsonProperty("mortgage")
    public Mortgage getMortgage() {
        return mortgage;
    }

    @JsonProperty("mortgage")
    public void setMortgage(Mortgage mortgage) {
        this.mortgage = mortgage;
    }

    @JsonProperty("client")
    public Client getClient() {
        return client;
    }

    @JsonProperty("client")
    public void setClient(Client client) {
        this.client = client;
    }

    @JsonProperty("additionalInformation")
    public AdditionalInformation getAdditionalInformation() {
        return additionalInformation;
    }

    @JsonProperty("additionalInformation")
    public void setAdditionalInformation(AdditionalInformation additionalInformation) {
        this.additionalInformation = additionalInformation;
    }

    @JsonProperty("referral")
    public Referral getReferral() {
        return referral;
    }

    @JsonProperty("referral")
    public void setReferral(Referral referral) {
        this.referral = referral;
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
