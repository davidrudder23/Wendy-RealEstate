
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
    "houseClosingDate",
    "typeOfMortgage",
    "mortgageCommitmentDeadline",
    "areConcessions",
    "concessions",
    "secondDeposit",
    "firstDeposit",
    "purchasePrice"
})
@Jacksonized
@Builder
public @Data
class Mortgage {

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
    private Map<String, Object> additionalProperties;

}
