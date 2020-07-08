import {combineReducers} from 'redux';
import React from 'react';
import '../index.css';

const currentLocation = {
    Name: "",
    Address: "",
    PlacesId: "ChIJK7VbnXxxhlQRCbKQyeRwBJ4",
    Area: "",
    Country: "",
}


/*** Handles all changes to current location
 * params =
 *      currentLocation - currentLocation selected in the itinerary list for editting
 *       action - valid actions are addNotes
 *              - (should also be able to have a setCurrentLocation that changes current location when selected) ***/
const currentLocationReducer = (currentLocation = {name: "", address: "", info: {}, notes: ""}, action) => {
    if (action.type === 'ADD_NOTES') {
        // change the notes of current location to the action.text
        console.log(action.text + "hereherehhere");
        currentLocation.notes = action.text;
        console.log(JSON.stringify(currentLocation));
        return currentLocation;
    } return currentLocation;
}



const mapLocationReducer = (state = currentLocation, action) => {
    switch(action.type) {
        case 'GET_LOCATION':
            return {
                ...state,
                Name: action.payload.placeName,
                Address: action.payload.fulladdress,
                PlacesId: action.payload.placeId,
                Area: action.payload.placeArea,
                Country: action.payload.placeCountry
            }

        default:
            return state;
    }
};

let jsonObj = [{
    "listId": 0,
    "listName": "Visited Countries/Cities",
    "countryList": [{
        "id": 1,
        "name": "Afghanistan",
        "iso3": "AFG",
        "iso2": "AF",
        "phone_code": "93",
        "capital": "Kabul",
        "currency": "AFN",
        "states": [
            {
                "id": 3901,
                "name": "Badakhshan",
                "state_code": "BDS",
                "cities": [
                    {
                        "id": 52,
                        "name": "Ashkāsham",
                        "latitude": "36.68333000",
                        "longitude": "71.53333000"
                    },
                    {
                        "id": 68,
                        "name": "Fayzabad",
                        "latitude": "37.11664000",
                        "longitude": "70.58002000"
                    },
                    {
                        "id": 78,
                        "name": "Jurm",
                        "latitude": "36.86477000",
                        "longitude": "70.83421000"
                    },
                    {
                        "id": 84,
                        "name": "Khandūd",
                        "latitude": "36.95127000",
                        "longitude": "72.31800000"
                    },
                    {
                        "id": 115,
                        "name": "Rāghistān",
                        "latitude": "37.66079000",
                        "longitude": "70.67346000"
                    },
                    {
                        "id": 131,
                        "name": "Wākhān",
                        "latitude": "37.05710000",
                        "longitude": "73.34928000"
                    }
                ]
            },
            {
                "id": 3871,
                "name": "Badghis",
                "state_code": "BDG",
                "cities": [
                    {
                        "id": 72,
                        "name": "Ghormach",
                        "latitude": "35.73062000",
                        "longitude": "63.78264000"
                    },
                    {
                        "id": 108,
                        "name": "Qala i Naw",
                        "latitude": "34.98735000",
                        "longitude": "63.12891000"
                    }
                ]
            },
            {
                "id": 3875,
                "name": "Baghlan",
                "state_code": "BGL",
                "cities": [
                    {
                        "id": 54,
                        "name": "Baghlān",
                        "latitude": "36.13068000",
                        "longitude": "68.70829000"
                    },
                    {
                        "id": 140,
                        "name": "Ḩukūmatī Dahanah-ye Ghōrī",
                        "latitude": "35.90617000",
                        "longitude": "68.48869000"
                    },
                    {
                        "id": 101,
                        "name": "Nahrīn",
                        "latitude": "36.06490000",
                        "longitude": "69.13343000"
                    },
                    {
                        "id": 105,
                        "name": "Pul-e Khumrī",
                        "latitude": "35.94458000",
                        "longitude": "68.71512000"
                    }
                ]
            },
            {
                "id": 3884,
                "name": "Balkh",
                "state_code": "BAL",
                "cities": [
                    {
                        "id": 55,
                        "name": "Balkh",
                        "latitude": "36.75635000",
                        "longitude": "66.89720000"
                    },
                    {
                        "id": 65,
                        "name": "Dowlatābād",
                        "latitude": "36.98821000",
                        "longitude": "66.82069000"
                    },
                    {
                        "id": 85,
                        "name": "Khulm",
                        "latitude": "36.69736000",
                        "longitude": "67.69826000"
                    },
                    {
                        "id": 91,
                        "name": "Lab-Sar",
                        "latitude": "36.02634000",
                        "longitude": "66.83799000"
                    },
                    {
                        "id": 97,
                        "name": "Mazār-e Sharīf",
                        "latitude": "36.70904000",
                        "longitude": "67.11087000"
                    },
                    {
                        "id": 112,
                        "name": "Qarchī Gak",
                        "latitude": "37.03999000",
                        "longitude": "66.78891000"
                    }
                ]
            },
            {
                "id": 3872,
                "name": "Bamyan",
                "state_code": "BAM",
                "cities": [
                    {
                        "id": 57,
                        "name": "Bāmyān",
                        "latitude": "34.82156000",
                        "longitude": "67.82734000"
                    },
                    {
                        "id": 104,
                        "name": "Panjāb",
                        "latitude": "34.38795000",
                        "longitude": "67.02327000"
                    }
                ]
            },
            {
                "id": 3892,
                "name": "Daykundi",
                "state_code": "DAY",
                "cities": [
                    {
                        "id": 102,
                        "name": "Nīlī",
                        "latitude": "33.76329000",
                        "longitude": "66.07617000"
                    }
                ]
            },
            {
                "id": 3899,
                "name": "Farah",
                "state_code": "FRA",
                "cities": [
                    {
                        "id": 66,
                        "name": "Farah",
                        "latitude": "32.37451000",
                        "longitude": "62.11638000"
                    }
                ]
            },
            {
                "id": 3889,
                "name": "Faryab",
                "state_code": "FYB",
                "cities": [
                    {
                        "id": 50,
                        "name": "Andkhoy",
                        "latitude": "36.95293000",
                        "longitude": "65.12376000"
                    },
                    {
                        "id": 96,
                        "name": "Maymana",
                        "latitude": "35.92139000",
                        "longitude": "64.78361000"
                    }
                ]
            },
            {
                "id": 3870,
                "name": "Ghazni",
                "state_code": "GHA",
                "cities": [
                    {
                        "id": 71,
                        "name": "Ghazni",
                        "latitude": "33.55391000",
                        "longitude": "68.42096000"
                    }
                ]
            },
            {
                "id": 3888,
                "name": "Ghōr",
                "state_code": "GHO",
                "cities": [
                    {
                        "id": 67,
                        "name": "Fayrōz Kōh",
                        "latitude": "34.51952000",
                        "longitude": "65.25093000"
                    },
                    {
                        "id": 121,
                        "name": "Shahrak",
                        "latitude": "34.10737000",
                        "longitude": "64.30520000"
                    }
                ]
            },
            {
                "id": 3873,
                "name": "Helmand",
                "state_code": "HEL",
                "cities": [
                    {
                        "id": 141,
                        "name": "‘Alāqahdārī Dīshū",
                        "latitude": "30.43206000",
                        "longitude": "63.29802000"
                    },
                    {
                        "id": 70,
                        "name": "Gereshk",
                        "latitude": "31.82089000",
                        "longitude": "64.57005000"
                    },
                    {
                        "id": 93,
                        "name": "Lashkar Gāh",
                        "latitude": "31.59382000",
                        "longitude": "64.37161000"
                    },
                    {
                        "id": 95,
                        "name": "Markaz-e Ḩukūmat-e Darwēshān",
                        "latitude": "31.13231000",
                        "longitude": "64.19340000"
                    },
                    {
                        "id": 118,
                        "name": "Sangīn",
                        "latitude": "32.07275000",
                        "longitude": "64.83590000"
                    }
                ]
            },
            {
                "id": 3887,
                "name": "Herat",
                "state_code": "HER",
                "cities": [
                    {
                        "id": 60,
                        "name": "Chahār Burj",
                        "latitude": "34.24475000",
                        "longitude": "62.19165000"
                    },
                    {
                        "id": 73,
                        "name": "Ghōriyān",
                        "latitude": "34.34480000",
                        "longitude": "61.49321000"
                    },
                    {
                        "id": 74,
                        "name": "Herāt",
                        "latitude": "34.34817000",
                        "longitude": "62.19967000"
                    },
                    {
                        "id": 80,
                        "name": "Kafir Qala",
                        "latitude": "34.66667000",
                        "longitude": "61.06667000"
                    },
                    {
                        "id": 82,
                        "name": "Karukh",
                        "latitude": "34.48108000",
                        "longitude": "62.58630000"
                    },
                    {
                        "id": 88,
                        "name": "Kuhsān",
                        "latitude": "34.65389000",
                        "longitude": "61.19778000"
                    },
                    {
                        "id": 90,
                        "name": "Kushk",
                        "latitude": "33.29565000",
                        "longitude": "61.95221000"
                    },
                    {
                        "id": 111,
                        "name": "Qarah Bāgh",
                        "latitude": "34.94023000",
                        "longitude": "61.77589000"
                    },
                    {
                        "id": 123,
                        "name": "Shīnḏanḏ",
                        "latitude": "33.30294000",
                        "longitude": "62.14740000"
                    },
                    {
                        "id": 129,
                        "name": "Tīr Pul",
                        "latitude": "34.59431000",
                        "longitude": "61.26895000"
                    },
                    {
                        "id": 135,
                        "name": "Zindah Jān",
                        "latitude": "34.34264000",
                        "longitude": "61.74675000"
                    }
                ]
            },
            {
                "id": 3886,
                "name": "Jowzjan",
                "state_code": "JOW",
                "cities": [
                    {
                        "id": 136,
                        "name": "Āqchah",
                        "latitude": "36.90500000",
                        "longitude": "66.18341000"
                    },
                    {
                        "id": 63,
                        "name": "Darzāb",
                        "latitude": "35.97744000",
                        "longitude": "65.37828000"
                    },
                    {
                        "id": 113,
                        "name": "Qarqīn",
                        "latitude": "37.41853000",
                        "longitude": "66.04358000"
                    },
                    {
                        "id": 122,
                        "name": "Shibirghān",
                        "latitude": "36.66757000",
                        "longitude": "65.75290000"
                    }
                ]
            },
            {
                "id": 3902,
                "name": "Kabul",
                "state_code": "KAB",
                "cities": [
                    {
                        "id": 79,
                        "name": "Kabul",
                        "latitude": "34.52813000",
                        "longitude": "69.17233000"
                    },
                    {
                        "id": 99,
                        "name": "Mīr Bachah Kōṯ",
                        "latitude": "34.74999000",
                        "longitude": "69.11899000"
                    },
                    {
                        "id": 103,
                        "name": "Paghmān",
                        "latitude": "34.58787000",
                        "longitude": "68.95091000"
                    }
                ]
            },
            {
                "id": 3890,
                "name": "Kandahar",
                "state_code": "KAN",
                "cities": [
                    {
                        "id": 81,
                        "name": "Kandahār",
                        "latitude": "31.61332000",
                        "longitude": "65.71013000"
                    }
                ]
            },
            {
                "id": 3879,
                "name": "Kapisa",
                "state_code": "KAP",
                "cities": [
                    {
                        "id": 124,
                        "name": "Sidqābād",
                        "latitude": "35.02298000",
                        "longitude": "69.35112000"
                    }
                ]
            },
            {
                "id": 3878,
                "name": "Khost",
                "state_code": "KHO",
                "cities": [
                    {
                        "id": 87,
                        "name": "Khōst",
                        "latitude": "33.33951000",
                        "longitude": "69.92041000"
                    }
                ]
            },
            {
                "id": 3876,
                "name": "Kunar",
                "state_code": "KNR",
                "cities": [
                    {
                        "id": 51,
                        "name": "Asadabad",
                        "latitude": "34.87311000",
                        "longitude": "71.14697000"
                    },
                    {
                        "id": 138,
                        "name": "Āsmār",
                        "latitude": "35.03333000",
                        "longitude": "71.35809000"
                    }
                ]
            },
            {
                "id": 3900,
                "name": "Kunduz Province",
                "state_code": "KDZ",
                "cities": [
                    {
                        "id": 64,
                        "name": "Dasht-e Archī",
                        "latitude": "37.13333000",
                        "longitude": "69.16667000"
                    },
                    {
                        "id": 75,
                        "name": "Imām Şāḩib",
                        "latitude": "37.18897000",
                        "longitude": "68.93644000"
                    },
                    {
                        "id": 83,
                        "name": "Khanabad",
                        "latitude": "36.68250000",
                        "longitude": "69.11556000"
                    },
                    {
                        "id": 89,
                        "name": "Kunduz",
                        "latitude": "36.72895000",
                        "longitude": "68.85700000"
                    },
                    {
                        "id": 114,
                        "name": "Qarāwul",
                        "latitude": "37.21959000",
                        "longitude": "68.78020000"
                    }
                ]
            },
            {
                "id": 3891,
                "name": "Laghman",
                "state_code": "LAG",
                "cities": [
                    {
                        "id": 98,
                        "name": "Mehtar Lām",
                        "latitude": "34.67139000",
                        "longitude": "70.20944000"
                    }
                ]
            },
            {
                "id": 3897,
                "name": "Logar",
                "state_code": "LOG",
                "cities": [
                    {
                        "id": 56,
                        "name": "Baraki Barak",
                        "latitude": "33.96744000",
                        "longitude": "68.94920000"
                    },
                    {
                        "id": 139,
                        "name": "Ḩukūmatī Azrah",
                        "latitude": "34.17355000",
                        "longitude": "69.64573000"
                    },
                    {
                        "id": 106,
                        "name": "Pul-e ‘Alam",
                        "latitude": "33.99529000",
                        "longitude": "69.02274000"
                    }
                ]
            },
            {
                "id": 3882,
                "name": "Nangarhar",
                "state_code": "NAN",
                "cities": [
                    {
                        "id": 58,
                        "name": "Bāsawul",
                        "latitude": "34.24749000",
                        "longitude": "70.87218000"
                    },
                    {
                        "id": 77,
                        "name": "Jalālābād",
                        "latitude": "34.42647000",
                        "longitude": "70.45153000"
                    },
                    {
                        "id": 94,
                        "name": "Markaz-e Woluswalī-ye Āchīn",
                        "latitude": "34.12583000",
                        "longitude": "70.70778000"
                    }
                ]
            },
            {
                "id": 3896,
                "name": "Nimruz",
                "state_code": "NIM",
                "cities": [
                    {
                        "id": 86,
                        "name": "Khāsh",
                        "latitude": "31.52919000",
                        "longitude": "62.79055000"
                    },
                    {
                        "id": 100,
                        "name": "Mīrābād",
                        "latitude": "30.43624000",
                        "longitude": "61.83830000"
                    },
                    {
                        "id": 116,
                        "name": "Rūdbār",
                        "latitude": "30.15000000",
                        "longitude": "62.60000000"
                    },
                    {
                        "id": 132,
                        "name": "Zaranj",
                        "latitude": "30.95962000",
                        "longitude": "61.86037000"
                    }
                ]
            },
            {
                "id": 3880,
                "name": "Nuristan",
                "state_code": "NUR",
                "cities": [
                    {
                        "id": 107,
                        "name": "Pārūn",
                        "latitude": "35.42064000",
                        "longitude": "70.92261000"
                    }
                ]
            },
            {
                "id": 3894,
                "name": "Paktia",
                "state_code": "PIA",
                "cities": [
                    {
                        "id": 69,
                        "name": "Gardez",
                        "latitude": "33.59744000",
                        "longitude": "69.22592000"
                    }
                ]
            },
            {
                "id": 3877,
                "name": "Paktika",
                "state_code": "PKA",
                "cities": [
                    {
                        "id": 120,
                        "name": "Saṟōbī",
                        "latitude": "32.75221000",
                        "longitude": "69.04587000"
                    },
                    {
                        "id": 134,
                        "name": "Zaṟah Sharan",
                        "latitude": "33.14641000",
                        "longitude": "68.79213000"
                    },
                    {
                        "id": 133,
                        "name": "Zarghūn Shahr",
                        "latitude": "32.84734000",
                        "longitude": "68.44573000"
                    }
                ]
            },
            {
                "id": 3881,
                "name": "Panjshir",
                "state_code": "PAN",
                "cities": [
                    {
                        "id": 59,
                        "name": "Bāzārak",
                        "latitude": "35.31292000",
                        "longitude": "69.51519000"
                    }
                ]
            },
            {
                "id": 3895,
                "name": "Parwan",
                "state_code": "PAR",
                "cities": [
                    {
                        "id": 61,
                        "name": "Charikar",
                        "latitude": "35.01361000",
                        "longitude": "69.17139000"
                    },
                    {
                        "id": 76,
                        "name": "Jabal os Saraj",
                        "latitude": "35.11833000",
                        "longitude": "69.23778000"
                    }
                ]
            },
            {
                "id": 3883,
                "name": "Samangan",
                "state_code": "SAM",
                "cities": [
                    {
                        "id": 53,
                        "name": "Aībak",
                        "latitude": "36.26468000",
                        "longitude": "68.01551000"
                    }
                ]
            },
            {
                "id": 3885,
                "name": "Sar-e Pol",
                "state_code": "SAR",
                "cities": [
                    {
                        "id": 62,
                        "name": "Chīras",
                        "latitude": "35.41674000",
                        "longitude": "65.98234000"
                    },
                    {
                        "id": 92,
                        "name": "Larkird",
                        "latitude": "35.48936000",
                        "longitude": "66.66409000"
                    },
                    {
                        "id": 110,
                        "name": "Qal‘ah-ye Shahr",
                        "latitude": "35.54729000",
                        "longitude": "65.56760000"
                    },
                    {
                        "id": 117,
                        "name": "Sang-e Chārak",
                        "latitude": "35.84972000",
                        "longitude": "66.43694000"
                    },
                    {
                        "id": 119,
                        "name": "Sar-e Pul",
                        "latitude": "36.21544000",
                        "longitude": "65.93249000"
                    },
                    {
                        "id": 125,
                        "name": "Tagāw-Bāy",
                        "latitude": "35.69941000",
                        "longitude": "66.06164000"
                    },
                    {
                        "id": 128,
                        "name": "Tukzār",
                        "latitude": "35.94831000",
                        "longitude": "66.42132000"
                    }
                ]
            },
            {
                "id": 3893,
                "name": "Takhar",
                "state_code": "TAK",
                "cities": [
                    {
                        "id": 137,
                        "name": "Ārt Khwājah",
                        "latitude": "37.08571000",
                        "longitude": "69.47958000"
                    },
                    {
                        "id": 126,
                        "name": "Taloqan",
                        "latitude": "36.73605000",
                        "longitude": "69.53451000"
                    }
                ]
            },
            {
                "id": 3898,
                "name": "Urozgan",
                "state_code": "URU",
                "cities": [
                    {
                        "id": 127,
                        "name": "Tarinkot",
                        "latitude": "32.62998000",
                        "longitude": "65.87806000"
                    },
                    {
                        "id": 130,
                        "name": "Uruzgān",
                        "latitude": "32.92775000",
                        "longitude": "66.63253000"
                    }
                ]
            },
            {
                "id": 3874,
                "name": "Zabul",
                "state_code": "ZAB",
                "cities": [
                    {
                        "id": 109,
                        "name": "Qalāt",
                        "latitude": "32.10575000",
                        "longitude": "66.90833000"
                    }
                ]
            }
        ]
    },
        {
            "id": 199,
            "name": "Singapore",
            "iso3": "SGP",
            "iso2": "SG",
            "phone_code": "65",
            "capital": "Singapur",
            "currency": "SGD",
            "states": [
                {
                    "id": 4651,
                    "name": "Central Singapore Community Development Council",
                    "state_code": "01",
                    "cities": [
                        {
                            "id": 104057,
                            "name": "Singapore",
                            "latitude": "1.28967000",
                            "longitude": "103.85007000"
                        }
                    ]
                },
                {
                    "id": 4649,
                    "name": "North East Community Development Council",
                    "state_code": "02",
                    "cities": []
                },
                {
                    "id": 4653,
                    "name": "North West Community Development Council",
                    "state_code": "03",
                    "cities": [
                        {
                            "id": 104058,
                            "name": "Woodlands",
                            "latitude": "1.43801000",
                            "longitude": "103.78877000"
                        }
                    ]
                },
                {
                    "id": 4650,
                    "name": "South East Community Development Council",
                    "state_code": "04",
                    "cities": []
                },
                {
                    "id": 4652,
                    "name": "South West Community Development Council",
                    "state_code": "05",
                    "cities": []
                }
            ]
        }]
},
    {
        "listId": 1,
        "listName": "Wishlist!",
        "countryList": []
    },

];

const listReducer = (lists = jsonObj, action) => {
    if (action.type === 'ADD_MSG') {
        return [...lists, action.addMsg];
    }
    if (action.type === 'DELETE_MSG') {
        return lists.filter((item, index) => index !== action.deleteMsg);
    }
    return lists;
};

const selector = (msgId = 0, action) => {
    if (action.type === 'SELECT_MSG') {
        return action.selectMsg;
    }
    return msgId;
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


const defaultLocations = [{id:0, location: "Rogers Arena", address: "800 Griffiths Way, Vancouver, BC V6B 6G1", cityID: 0},
    {id:1, location: "Playland", address: "2901 E Hastings St, Vancouver, BC V5K 5J1", cityID: 0},
    {id:2, location: "Science World", address: "1455 Quebec St, Vancouver, BC V6A 3Z7", cityID: 0},
    {id:3, location: "Stanley Park", address: " Vancouver, BC V6G 1Z4", cityID: 0},
    {id:4, location: "Capilano Suspension Bridge", address: "3735 Capilano Rd, North Vancouver, BC V7R 4J1", cityID: 0},
    {id:5, location: "SHOULD NOT RENDER THIS LOCATION", address: "3735 Capilano Rd, North Vancouver, BC V7R 4J1", cityID: 100},
    {id:6, location: "Craigdarroch Castle", address: "1050 Joan Crescent, Victoria, BC V8S 3L5", cityID: 2},
    {id:7, location: "Alcatraz Island", address: "San Francisco, CA 94133, United States", cityID: 1},];

const locationsReducer = (locations = defaultLocations, action) => {
    if (action.type === "DEL_LOCATION"){
        let newArray = locations.slice();
        let indexToRemove = newArray.findIndex((item) => {
           return action.location_id == item.id;
        });
        newArray.splice(indexToRemove, 1);
        return newArray;
    }
    return locations;
};

const defaultCities = [{name: "Vancouver", id: 0, countryID: 0, dateRanges : ["2020/08/20 - 2020/08/22"]},
    {name: "San Francisco", id: 1, countryID: 1, dateRanges : ["2021/11/11 - 2021/12/12"]},
    {name: "Victoria", id: 2, countryID: 0, dateRanges : ["2020/08/23 - 2020/08/25"]}];
const cityReducer = (cities = defaultCities, action) =>{

    return cities;
};


const defaultCountries = [{name: "Canada", id: 0, dateRanges : ["2020/08/20 - 2020/08/25"]},
    {name: "United States", id: 1, dateRanges : ["2020/08/20 - 2020/08/22"]}];
const countryReducer = (countries = defaultCountries, action) =>{

    return countries;
};

const defaultView = {
    byID:{
        country: 0,
        city: 0,
        locations: [0,1,2,3,4],
    }
};
const currentViewReducer = (currentView = defaultView, action) => {
    if (action.type === "DEL_LOCATION"){
        let newArray = currentView.byID.locations.slice();
        let indexToRemove = newArray.findIndex((id) => {
            return action.location_id == id;
        });
        newArray.splice(indexToRemove, 1);
        return {
            ...currentView,
            byID: {
                ...currentView.byID,
                locations: newArray,
            }
        };
    }
    else if(action.type === "CHANGE_VIEW"){
        return action.newView;
    }
    return currentView;
};

const itineraryReducer = (itinerary = {name: "Test itinerary", dateRanges : ["2020/08/20 - 2020/08/22"]}, action) =>{
    if (action.type === "NAME_CHANGE"){
        return{
            ...itinerary,
            name: action.name
        };
    }
    else if (action.type === "ADD_LOCATION") {
        itinerary.push(action.add);
        return itinerary;
    }
    return itinerary;
};
export default combineReducers({
    locations: locationsReducer,
    itinerary: itineraryReducer,
    currentView: currentViewReducer,
    cities: cityReducer,
    countries: countryReducer,
    mapLocation: mapLocationReducer,
    currentLocation: currentLocationReducer,
    lists: listReducer,
    msgId: selector,
});
