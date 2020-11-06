
package com.domain;

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
    "unit",
    "endLeaseDate"
})
public class Tenant {

    @JsonProperty("unit")
    private String unit;
    @JsonProperty("endLeaseDate")
    private String endLeaseDate;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("unit")
    public String getUnit() {
        return unit;
    }

    @JsonProperty("unit")
    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Tenant withUnit(String unit) {
        this.unit = unit;
        return this;
    }

    @JsonProperty("endLeaseDate")
    public String getEndLeaseDate() {
        return endLeaseDate;
    }

    @JsonProperty("endLeaseDate")
    public void setEndLeaseDate(String endLeaseDate) {
        this.endLeaseDate = endLeaseDate;
    }

    public Tenant withEndLeaseDate(String endLeaseDate) {
        this.endLeaseDate = endLeaseDate;
        return this;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

    public Tenant withAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
        return this;
    }

}
