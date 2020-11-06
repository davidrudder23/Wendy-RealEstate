
package com.wendy.realestate.model;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "loxBoxCode",
    "inspectionDeadline",
    "publicOrTownWater",
    "titleOrTownSewer",
    "dateHouseBuilt",
    "vacentOrOccupied",
    "propertyType",
    "condoManagementCompany",
    "address",
    "mlsNumber",
    "deedReference",
    "mapReferences",
    "isInspectionWaved"
})
@Jacksonized @Builder
public @Data
class Property {

    @JsonProperty("loxBoxCode")
    private Integer loxBoxCode;
    @JsonProperty("inspectionDeadline")
    private String inspectionDeadline;
    @JsonProperty("publicOrTownWater")
    private String publicOrTownWater;
    @JsonProperty("titleOrTownSewer")
    private String titleOrTownSewer;
    @JsonProperty("dateHouseBuilt")
    private String dateHouseBuilt;
    @JsonProperty("vacentOrOccupied")
    private String vacentOrOccupied;
    @JsonProperty("propertyType")
    private String propertyType;
    @JsonProperty("condoManagementCompany")
    private String condoManagementCompany;
    @JsonProperty("address")
    private String address;
    @JsonProperty("mlsNumber")
    private String mlsNumber;
    @JsonProperty("deedReference")
    private String deedReference;
    @JsonProperty("mapReferences")
    private String mapReferences;
    @JsonProperty("isInspectionWaved")
    private Boolean isInspectionWaved;
    @JsonIgnore
    private Map<String, Object> additionalProperties;

}
