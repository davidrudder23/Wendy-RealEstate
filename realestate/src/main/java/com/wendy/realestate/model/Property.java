
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
public class Property {

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
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("loxBoxCode")
    public Integer getLoxBoxCode() {
        return loxBoxCode;
    }

    @JsonProperty("loxBoxCode")
    public void setLoxBoxCode(Integer loxBoxCode) {
        this.loxBoxCode = loxBoxCode;
    }

    @JsonProperty("inspectionDeadline")
    public String getInspectionDeadline() {
        return inspectionDeadline;
    }

    @JsonProperty("inspectionDeadline")
    public void setInspectionDeadline(String inspectionDeadline) {
        this.inspectionDeadline = inspectionDeadline;
    }

    @JsonProperty("publicOrTownWater")
    public String getPublicOrTownWater() {
        return publicOrTownWater;
    }

    @JsonProperty("publicOrTownWater")
    public void setPublicOrTownWater(String publicOrTownWater) {
        this.publicOrTownWater = publicOrTownWater;
    }

    @JsonProperty("titleOrTownSewer")
    public String getTitleOrTownSewer() {
        return titleOrTownSewer;
    }

    @JsonProperty("titleOrTownSewer")
    public void setTitleOrTownSewer(String titleOrTownSewer) {
        this.titleOrTownSewer = titleOrTownSewer;
    }

    @JsonProperty("dateHouseBuilt")
    public String getDateHouseBuilt() {
        return dateHouseBuilt;
    }

    @JsonProperty("dateHouseBuilt")
    public void setDateHouseBuilt(String dateHouseBuilt) {
        this.dateHouseBuilt = dateHouseBuilt;
    }

    @JsonProperty("vacentOrOccupied")
    public String getVacentOrOccupied() {
        return vacentOrOccupied;
    }

    @JsonProperty("vacentOrOccupied")
    public void setVacentOrOccupied(String vacentOrOccupied) {
        this.vacentOrOccupied = vacentOrOccupied;
    }

    @JsonProperty("propertyType")
    public String getPropertyType() {
        return propertyType;
    }

    @JsonProperty("propertyType")
    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    @JsonProperty("condoManagementCompany")
    public String getCondoManagementCompany() {
        return condoManagementCompany;
    }

    @JsonProperty("condoManagementCompany")
    public void setCondoManagementCompany(String condoManagementCompany) {
        this.condoManagementCompany = condoManagementCompany;
    }

    @JsonProperty("address")
    public String getAddress() {
        return address;
    }

    @JsonProperty("address")
    public void setAddress(String address) {
        this.address = address;
    }

    @JsonProperty("mlsNumber")
    public String getMlsNumber() {
        return mlsNumber;
    }

    @JsonProperty("mlsNumber")
    public void setMlsNumber(String mlsNumber) {
        this.mlsNumber = mlsNumber;
    }

    @JsonProperty("deedReference")
    public String getDeedReference() {
        return deedReference;
    }

    @JsonProperty("deedReference")
    public void setDeedReference(String deedReference) {
        this.deedReference = deedReference;
    }

    @JsonProperty("mapReferences")
    public String getMapReferences() {
        return mapReferences;
    }

    @JsonProperty("mapReferences")
    public void setMapReferences(String mapReferences) {
        this.mapReferences = mapReferences;
    }

    @JsonProperty("isInspectionWaved")
    public Boolean getIsInspectionWaved() {
        return isInspectionWaved;
    }

    @JsonProperty("isInspectionWaved")
    public void setIsInspectionWaved(Boolean isInspectionWaved) {
        this.isInspectionWaved = isInspectionWaved;
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
