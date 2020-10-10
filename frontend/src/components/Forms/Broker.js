import React from 'react'
import * as S from "../FormFields/FormStyled";
import InputField from "../FormFields/InputField";
import Address from "../FormFields/Address";
import Slider from "../FormFields/Slider";

const Broker = ({ getValues, errors, register }) => {
    const [isEXP, setIsExp] = React.useState(false);

    const handleIsExp = () => {
        return (
            <S.FieldWrapper>
                <S.FieldTitle>Listing Broker</S.FieldTitle>
                <S.MultiContainer>
                    <InputField
                        required={true}
                        getValues={getValues}
                        name="listingBroker.company"
                        label="Company"
                        errors={errors?.listingBroker?.company}
                        register={register}
                        value="eXp"
                        disabled={true}
                    />
                    <InputField
                        required={true}
                        getValues={getValues}
                        name="listingBroker.address"
                        label="Address"
                        errors={errors?.listingBroker?.address}
                        register={register}
                        value="P.O. Box 10665 Holyoke Ma 01041"
                        disabled={true}
                    />
                </S.MultiContainer>
            </S.FieldWrapper>
        )
    }

    return (
        <React.Fragment>
            <S.FieldWrapper>
                <S.FieldTitle>Is eXp your broker?
                    <Slider
                    isChecked={isEXP}
                    setIsChecked={setIsExp}
                    name="property.buyerHasSubmittedAdditionalOffer"
                    register={register}
                    required={false}
                    />
                </S.FieldTitle>
            </S.FieldWrapper>
            {isEXP ? handleIsExp() : 
            <S.FieldWrapper>
                <S.FieldTitle>Listing Broker</S.FieldTitle>
                <S.MultiContainer>
                    {/* TODO: Sellers Side this should default to eXp and not be displayed */}
                    <InputField
                    required={true}
                    getValues={getValues}
                    name="listingBroker.company"
                    label="Company"
                    errors={errors?.listingBroker?.company}
                    register={register}
                    />
                    <S.AddressWrapper>
                    <Address
                    required={true}
                    getValues={getValues}
                    name="listingBroker.address"
                    label="Address"
                    errors={errors?.listingBroker?.address}
                    register={register}
                    />
                    </S.AddressWrapper>
                </S.MultiContainer>
            </S.FieldWrapper>
            }
        </React.Fragment>
    )
}

export default Broker
