
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
    "Seller",
    "Buyer"
})
public class Client {

    @JsonProperty("Seller")
    private Seller seller;
    @JsonProperty("Buyer")
    private Buyer buyer;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("Seller")
    public Seller getSeller() {
        return seller;
    }

    @JsonProperty("Seller")
    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    @JsonProperty("Buyer")
    public Buyer getBuyer() {
        return buyer;
    }

    @JsonProperty("Buyer")
    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
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
