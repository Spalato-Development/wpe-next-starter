import { gql } from '@apollo/client';

export const placeToStayFragment = gql`
  fragment placeToStayFragment on PlaceToStay {
    title
    uri
    slug
    id
    commonDataAttributes {
      about
      standfirst
      country {
        name
        slug
      }
      imageGallery {
        sourceUrl
      }
    }
    ptsDataAttr {
      destinations {
        ... on Destination {
          title
          id
          slug
        }
      }
      writer {
        ... on Writer {
          title
          id
          slug
        }
      }

      address
      airportTransfers
      allInclusive
      beach
      brand
      city

      fdFeatures
      latitudeOfLocation1
      longitudeOfLocation1
      nearestAirport1
      nearestAirport2
      otherHotelFacilities
      parking
      pool
      priceCheckingLinks {
        url
      }
      pricePerNight
      region
      roomFeatures
      roomForFamilies
      roomType
      selfCatering
      setting
      ski
      standard
      starRating
      website
      timeToAirport
      wifi
    }
  }
`;
