import React from 'react'
import ReactToPdf from 'react-to-pdf';
import * as R from "../FormFields/FormStyled";
import * as S from "./FinalPDFStyled";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { AGENT_TYPES, handleDeploymentPath } from "../../shared";
import FormHeader from "../FormFields/FormHeader";

const FinalPDF = () => {
    const { state, push } = useCustomFormHook();
    const ref = React.createRef();
    const date = new Date();
    
    const handleSubmit = () => {
        push(handleDeploymentPath("/result"));
    }

    return (
            <R.Container>
                <form>
                    <FormHeader pageHeader={"Final Review"} />
                    <S.Main >
                        <div style={{padding: "1rem"}} ref={ref}>
                            <S.Primary>
                                <div style={{textAlign: "center", fontSize: "30px", fontWeight: 500}}><u>Transaction Information</u></div>
                                <div style={{textAlign: "center"}}><b>{state?.details?.property?.address}</b></div>
                                <S.Column>
                                    {/* Start Property Information Section */}
                                    <S.Title>Property Information</S.Title>
                                    <S.Row>
                                        <S.Box>
                                           <b>Date: </b>{((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}
                                        </S.Box>
                                        <S.Box>
                                            <b>MLS/ID: </b>{state?.details?.property?.mlsNumber}
                                        </S.Box>
                                        <S.Box>
                                            <b>Price: </b>{state?.details?.mortgage?.purchasePrice}
                                        </S.Box>
                                    </S.Row>
                                    <S.Row>
                                        <S.Box notTop>
                                            <b>Deed Reference - Page: </b>{state?.details?.property?.deedReference}<br/>
                                            <b>Map Reference: Block: Lot: </b>{state?.details?.property?.mapReferences}<br/>
                                            <b>Vacant Or Occupied: </b>{state?.details?.property?.vacentOrOccupied}<br/>
                                            <b>Lox Box: </b>{state?.details?.property?.loxBoxCode}
                                        </S.Box>
                                        <S.Box notTop>
                                            <b>Year Built:</b>{state?.details?.property?.dateHouseBuilt}<br />
                                            <b>B.A.C.:</b>{`<<Buyers Agency Compensation per MLS>>`}<br/>
                                            <b>Property Management Company:</b>{state?.details?.property?.condoManagementCompany}
                                        </S.Box>
                                        <S.Box notTop>
                                            <b>Public/Private Water: </b>{state?.details?.property?.publicOrTownWater}<br />
                                            <b>Property Type: </b>{state?.details?.property?.propertyType}<br />
                                            <b>Septic Or Sewer: </b>{state?.details?.property?.titleOrTownSewer}<br />
                                        </S.Box>
                                    </S.Row>
                                </S.Column>
                                {/* End Property Information */}
                                {/* Start Mortgage Section */}
                                <S.Column>
                                    <S.Title>Mortgage Information</S.Title>
                                    <S.Row>
                                        <S.LargeBox>
                                            <b>Closing Date: </b>{state?.details?.mortgage?.houseClosingDate}<br />
                                            <b>End Inspection Date:</b>{state?.details?.property?.inspectionDeadline}<br/>
                                            <b>Mtg. Commit Date:</b>{state?.details?.mortgage?.mortgageCommitmentDeadline}
                                        </S.LargeBox>
                                        <S.LargeBox>
                                            <b>Concession if any: </b>{state?.details?.mortgage?.areConcessions ? state?.details?.mortgage?.concessions : "None"}<br/>
                                            <b>MTG Type: </b>{state?.details?.mortgage?.typeOfMortgage}
                                        </S.LargeBox>
                                    </S.Row>
                                    <S.Title>Broker Information</S.Title>
                                    <S.Row style={{marginTop: ".25rem"}}>
                                        <S.LargeBox style={{borderLeft: ".5px solid #000"}}>
                                            <b>Listing Agency: </b>{state?.details?.listingBroker?.broker?.company}<br/>
                                            <b>Address: </b>{state?.details?.listingBroker?.broker?.address}
                                        </S.LargeBox>
                                        <S.LargeBox>
                                            <b>Selling Agency:</b>{state?.details?.agent?.[AGENT_TYPES.BUYERS]?.broker?.company}<br/>
                                            <b>Address:</b>{state?.details?.agent?.[AGENT_TYPES.BUYERS]?.broker?.address}
                                        </S.LargeBox>
                                    </S.Row>
                                    <S.Row>
                                        <S.Column style={{flexGrow: 2}}>
                                            <S.Title>Listing Agent</S.Title>
                                            <S.LargeBox style={{borderLeft: ".5px solid #000"}}>
                                                <b>Listing Agent: </b>{state?.details?.listingBroker?.agent?.name}<br/>
                                                <b>MLS ID: </b>{state?.details?.listingBroker?.agent?.MLSNumber}<br/>
                                                <b>License #: </b><br/>
                                                <b>Email: </b>{state?.details?.listingBroker?.agent?.email}<br/>
                                                <b>Cell Phone: </b>{state?.details?.listingBroker?.agent?.phoneNumber}
                                            </S.LargeBox>
                                        </S.Column>
                                        <S.Column style={{flexGrow: 2}}>
                                            <S.Title>Buyer's Agent</S.Title>
                                            <S.LargeBox>
                                                <b>Buyer's Agent: </b>{state?.details?.agent?.[AGENT_TYPES.BUYERS]?.agent?.name}<br/>
                                                <b>Email: </b>{state?.details?.agent?.[AGENT_TYPES.BUYERS]?.agent?.email}<br/>
                                                <b>Cell Phone: </b>{state?.details?.agent?.[AGENT_TYPES.BUYERS]?.agent?.phoneNumber}<br/>
                                                <b>License #: </b><br/>
                                                <b>MLS ID: </b>{state?.details?.agent?.[AGENT_TYPES.BUYERS]?.agent?.MLSNumber}
                                            </S.LargeBox>
                                        </S.Column>
                                    </S.Row>
                                </S.Column>
                                {/* End section */}
                                {/* Start Section Sellers and Buyers Information */}
                                <S.Column style={{marginTop: ".25rem"}}>
                                    <S.Row>
                                        {/* Sellers Information */}
                                        <S.Column style={{flexGrow: 2}}>
                                            <S.Title style={{color: "red"}}>Seller's Information</S.Title>
                                            {state?.details?.client?.[AGENT_TYPES.SELLERS] ? 
                                            state?.details?.client?.[AGENT_TYPES.SELLERS]?.map((seller, index) => {
                                                return (
                                                <S.LargeBox style={{borderLeft: ".5px solid #000"}} key={`${AGENT_TYPES.SELLERS}[${index}]`}>
                                                    <b>Name: </b>{seller.name}<br/>
                                                    <b>Address: </b>{seller.address}<br/>
                                                    <b>Phone #: </b>{seller.phoneNumber}<br/>
                                                    <b>Email: </b>{seller.email}
                                                </S.LargeBox>)
                                            })
                                            : 
                                            (
                                                <S.LargeBox style={{borderLeft: ".5px solid #000"}}>
                                                    <b>Name:</b><br/>
                                                    <b>Address:</b><br/>
                                                    <b>Phone #:</b><br/>
                                                    <b>Email:</b>
                                                </S.LargeBox>
                                            )
                                            }
                                        </S.Column>
                                        {/* Buyers Information */}
                                        <S.Column style={{flexGrow: 2}}>
                                            <S.Title style={{color: "blue"}}>Buyer's Information</S.Title>
                                            {state?.details?.client?.[AGENT_TYPES.BUYERS] ? 
                                            state?.details?.client?.[AGENT_TYPES.BUYERS]?.map((buyer, index) => {
                                                return (
                                                <S.LargeBox key={`${AGENT_TYPES.BUYERS}[${index}]`} >
                                                    <b>Name: </b>{buyer.firstName + " " + buyer.lastName}<br/>
                                                    <b>Address: </b>{buyer.address}<br/>
                                                    <b>Phone #: </b>{buyer.phoneNumber}<br/>
                                                    <b>Email: </b>{buyer.email}
                                                </S.LargeBox>)
                                            })
                                            : 
                                            (
                                                <S.LargeBox>
                                                    <b>Name:</b><br/>
                                                    <b>Address:</b><br/>
                                                    <b>Phone #:</b><br/>
                                                    <b>Email:</b>
                                                </S.LargeBox>
                                            )
                                            }
                                        </S.Column>
                                    </S.Row>
                                </S.Column>
                                {/* End Section Sellers and Buyers Information */}
                                {/* Start Section Attorney Sellers and Buyers */}
                                <S.Column style={{marginTop: ".25rem"}}>
                                    <S.Row>
                                        <S.Column style={{flexGrow: 2}}>
                                            <S.Title style={{color: "red"}}>Seller's Attorney</S.Title>
                                            <S.LargeBox style={{borderLeft: ".5px solid #000"}}>
                                            <b>Attorney Name:</b>{state?.details?.attorney?.[AGENT_TYPES.SELLERS]?.name}<br/>
                                                <b>Phone Number:</b>{state?.details?.attorney?.[AGENT_TYPES.SELLERS]?.phoneNumber}<br/>
                                                <b>Firm Name:</b>{state?.details?.attorney?.[AGENT_TYPES.SELLERS]?.firmName}<br/>
                                                <b>Email:</b>{state?.details?.attorney?.[AGENT_TYPES.SELLERS]?.email}<br/>
                                                <b>Contact:</b>
                                            </S.LargeBox>
                                        </S.Column>
                                        <S.Column style={{flexGrow: 2}}>
                                            <S.Title style={{color: "blue"}}>Buyer's Attorney</S.Title>
                                            <S.LargeBox>
                                                <b>Attorney Name:</b>{state?.details?.attorney?.[AGENT_TYPES.BUYERS]?.name}<br/>
                                                <b>Phone Number:</b>{state?.details?.attorney?.[AGENT_TYPES.BUYERS]?.phoneNumber}<br/>
                                                <b>Firm Name:</b>{state?.details?.attorney?.[AGENT_TYPES.BUYERS]?.firmName}<br/>
                                                <b>Email:</b>{state?.details?.attorney?.[AGENT_TYPES.BUYERS]?.email}<br/>
                                                <b>Contact:</b>
                                            </S.LargeBox>
                                        </S.Column>
                                    </S.Row>
                                </S.Column>
                                {/* End Section Attorney Sellers and Buyers */}
                                {/* Start Section Lender Information */}
                                <S.Row style={{marginTop: ".25rem"}}>
                                    <S.Column style={{flexGrow: 2}}>
                                        <S.Title>Lender Information</S.Title>
                                        <S.LargeBox style={{borderLeft: ".5px solid #000"}}>
                                            <b>Lender Company:</b>{state?.details?.lender?.organization}<br/>
                                            <b>Officer:</b>{state?.details?.lender?.name}<br/>
                                            <b>Phone Number:</b>{state?.details?.lender?.phoneNumber}<br/>
                                            <b>Email:</b>{state?.details?.lender?.email}<br/>
                                        </S.LargeBox>
                                    </S.Column>
                                    <S.Column style={{flexGrow: 2}}>
                                        <S.Title>Referral Information</S.Title>
                                        <S.LargeBox>
                                            <b>Is there a Referral:</b>{state?.details?.referral ? "Yes" : "No"}<br/>
                                            <b>Referral Amount:</b>{state?.details?.referral?.amount}<br/>
                                            <b>Officer:</b>{state?.details?.referral?.Agent}<br/>
                                            <b>Email:</b>{state?.details?.referral?.email}<br/>
                                            <b>Phone Number:</b>
                                        </S.LargeBox>
                                    </S.Column>
                                </S.Row>
                                <S.Row style={{marginTop: ".25rem"}}>
                                    <S.Box><b>Oil Adjustment:</b></S.Box>
                                    <S.Box><b>Propane:</b></S.Box>
                                    <S.Box><b>Natural Gas:</b></S.Box>
                                    <S.Box><b>Rent Adjustment:</b></S.Box>
                                </S.Row>
                            </S.Primary>
                        </div>
                    </S.Main>
                    <ReactToPdf filename="example-test.pdf" targetRef={ref} x={10} y={-5} scale={1.1}>
                        {({toPdf}) => (
                            <R.Button type="submit" onClick={() => {
                                // window.scrollTo is here because html2canvas has a bug where the window must be at the top for it to navigate the entire page
                                window.scrollTo(0,0);
                                toPdf();
                            }}>Download Pdf</R.Button>
                            )}
                    </ReactToPdf>
                    <R.Button 
                    style={{float: "right"}} 
                    type="submit"
                    onClick={handleSubmit}
                    >Submit</R.Button>
                </form>
            </R.Container>
    )
}

export default FinalPDF
