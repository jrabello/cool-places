import { constants } from "../constants";

export class FourSquareService {
    static async getPhotos(venueId) {
        try {
            const response = await fetch(`${
                constants.foursquare.url
            }${
                venueId
            }?client_id=${
                constants.foursquare.key.clientId
            }&client_secret=${
                constants.foursquare.key.clientSecret
            }&v=${constants.foursquare.version}`)
            .then(res => res.json())
            .then(data => data.response.venue)

            return response
        } catch (error) {
            console.error(`FourSquareService.getPhotos problem trying to get photos from server!!`);
        }
    }
}