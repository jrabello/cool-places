import { constants } from "../models/constants";

export class FourSquareService {
  static async getPhotos(venueId) {
    try {
      const response = await fetch(
        `${constants.foursquare.url}${venueId}?client_id=${
          constants.foursquare.key.clientId
        }&client_secret=${constants.foursquare.key.clientSecret}&v=${
          constants.foursquare.version
        }`
      )
        .then(res => res.json())
        .then(data => data.response.venue);

      return response;
    } catch (error) {
      console.error(
        `FourSquareService.getPhotos problem trying to get photos from server!!`
      );
    }
  }

  static async getPhotosMock(venueId) {
    return {
      location: {
        formattedAddress: ["Plaine de Cayrou", "46700 PUY L'EVEQUE", "França"]
      },
      photos: {
        groups: [
          {
            items: [
              {
                prefix: "https://igx.4sqi.net/img/general/",
                suffix:
                  "/8593160_Ez1ix5KHDSr_hgxHQj4IxqaGA07EYwsa0OrOWqWN80Y.jpg"
              }
            ]
          }
        ]
      }
    };
  }
}
