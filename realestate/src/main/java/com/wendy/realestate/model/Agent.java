
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
    "name",
    "MLSNumber",
    "email",
    "emailVerification",
    "phoneNumber",
    "agencyCompensationPerMLS"
})
public class Agent {

    @JsonProperty("name")
    private String name;
    @JsonProperty("MLSNumber")
    private String mLSNumber;
    @JsonProperty("email")
    private String email;
    @JsonProperty("emailVerification")
    private String emailVerification;
    @JsonProperty("phoneNumber")
    private String phoneNumber;
    @JsonProperty("agencyCompensationPerMLS")
    private String agencyCompensationPerMLS;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("MLSNumber")
    public String getMLSNumber() {
        return mLSNumber;
    }

    @JsonProperty("MLSNumber")
    public void setMLSNumber(String mLSNumber) {
        this.mLSNumber = mLSNumber;
    }

    @JsonProperty("email")
    public String getEmail() {
        return email;
    }

    @JsonProperty("email")
    public void setEmail(String email) {
        this.email = email;
    }

    @JsonProperty("emailVerification")
    public String getEmailVerification() {
        return emailVerification;
    }

    @JsonProperty("emailVerification")
    public void setEmailVerification(String emailVerification) {
        this.emailVerification = emailVerification;
    }

    @JsonProperty("phoneNumber")
    public String getPhoneNumber() {
        return phoneNumber;
    }

    @JsonProperty("phoneNumber")
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @JsonProperty("agencyCompensationPerMLS")
    public String getAgencyCompensationPerMLS() {
        return agencyCompensationPerMLS;
    }

    @JsonProperty("agencyCompensationPerMLS")
    public void setAgencyCompensationPerMLS(String agencyCompensationPerMLS) {
        this.agencyCompensationPerMLS = agencyCompensationPerMLS;
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
