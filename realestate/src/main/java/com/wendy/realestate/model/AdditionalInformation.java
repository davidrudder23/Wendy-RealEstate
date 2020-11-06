
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
    "withTracyGagne",
    "hasReferral",
    "additionalNotes",
    "finalPaymentSplit"
})
public class AdditionalInformation {

    @JsonProperty("withTracyGagne")
    private Boolean withTracyGagne;
    @JsonProperty("hasReferral")
    private Boolean hasReferral;
    @JsonProperty("additionalNotes")
    private String additionalNotes;
    @JsonProperty("finalPaymentSplit")
    private String finalPaymentSplit;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("withTracyGagne")
    public Boolean getWithTracyGagne() {
        return withTracyGagne;
    }

    @JsonProperty("withTracyGagne")
    public void setWithTracyGagne(Boolean withTracyGagne) {
        this.withTracyGagne = withTracyGagne;
    }

    @JsonProperty("hasReferral")
    public Boolean getHasReferral() {
        return hasReferral;
    }

    @JsonProperty("hasReferral")
    public void setHasReferral(Boolean hasReferral) {
        this.hasReferral = hasReferral;
    }

    @JsonProperty("additionalNotes")
    public String getAdditionalNotes() {
        return additionalNotes;
    }

    @JsonProperty("additionalNotes")
    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }

    @JsonProperty("finalPaymentSplit")
    public String getFinalPaymentSplit() {
        return finalPaymentSplit;
    }

    @JsonProperty("finalPaymentSplit")
    public void setFinalPaymentSplit(String finalPaymentSplit) {
        this.finalPaymentSplit = finalPaymentSplit;
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
