
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
    "houseClosingDate",
    "typeOfMortgage",
    "mortgageCommitmentDeadline",
    "areConcessions",
    "concessions",
    "secondDeposit",
    "firstDeposit",
    "purchasePrice"
})
public class Mortgage {

    @JsonProperty("houseClosingDate")
    private String houseClosingDate;
    @JsonProperty("typeOfMortgage")
    private String typeOfMortgage;
    @JsonProperty("mortgageCommitmentDeadline")
    private String mortgageCommitmentDeadline;
    @JsonProperty("areConcessions")
    private String areConcessions;
    @JsonProperty("concessions")
    private String concessions;
    @JsonProperty("secondDeposit")
    private String secondDeposit;
    @JsonProperty("firstDeposit")
    private Integer firstDeposit;
    @JsonProperty("purchasePrice")
    private Integer purchasePrice;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("houseClosingDate")
    public String getHouseClosingDate() {
        return houseClosingDate;
    }

    @JsonProperty("houseClosingDate")
    public void setHouseClosingDate(String houseClosingDate) {
        this.houseClosingDate = houseClosingDate;
    }

    @JsonProperty("typeOfMortgage")
    public String getTypeOfMortgage() {
        return typeOfMortgage;
    }

    @JsonProperty("typeOfMortgage")
    public void setTypeOfMortgage(String typeOfMortgage) {
        this.typeOfMortgage = typeOfMortgage;
    }

    @JsonProperty("mortgageCommitmentDeadline")
    public String getMortgageCommitmentDeadline() {
        return mortgageCommitmentDeadline;
    }

    @JsonProperty("mortgageCommitmentDeadline")
    public void setMortgageCommitmentDeadline(String mortgageCommitmentDeadline) {
        this.mortgageCommitmentDeadline = mortgageCommitmentDeadline;
    }

    @JsonProperty("areConcessions")
    public String getAreConcessions() {
        return areConcessions;
    }

    @JsonProperty("areConcessions")
    public void setAreConcessions(String areConcessions) {
        this.areConcessions = areConcessions;
    }

    @JsonProperty("concessions")
    public String getConcessions() {
        return concessions;
    }

    @JsonProperty("concessions")
    public void setConcessions(String concessions) {
        this.concessions = concessions;
    }

    @JsonProperty("secondDeposit")
    public String getSecondDeposit() {
        return secondDeposit;
    }

    @JsonProperty("secondDeposit")
    public void setSecondDeposit(String secondDeposit) {
        this.secondDeposit = secondDeposit;
    }

    @JsonProperty("firstDeposit")
    public Integer getFirstDeposit() {
        return firstDeposit;
    }

    @JsonProperty("firstDeposit")
    public void setFirstDeposit(Integer firstDeposit) {
        this.firstDeposit = firstDeposit;
    }

    @JsonProperty("purchasePrice")
    public Integer getPurchasePrice() {
        return purchasePrice;
    }

    @JsonProperty("purchasePrice")
    public void setPurchasePrice(Integer purchasePrice) {
        this.purchasePrice = purchasePrice;
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
