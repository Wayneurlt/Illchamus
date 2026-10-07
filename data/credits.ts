// Freely licensed photos from Wikimedia Commons. Their licences require credit,
// shown on the /credits page and in the gallery viewer. Keep this list in step with
// the files in public/images/baringo/.

export interface PhotoCredit {
  file: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
}

export const photoCredits: PhotoCredit[] = [
  {
    "file": "/images/baringo/beehives.jpg",
    "author": "treesftf",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Beehives_in_Kenya.jpg",
    "title": "Beehives in Kenya"
  },
  {
    "file": "/images/baringo/beekeeping.jpg",
    "author": "Lvceepkenya",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:ESD_PROJECT_ACTIVITIES_IN_TRANSMARA_KENYA.JPG",
    "title": "ESD PROJECT ACTIVITIES IN TRANSMARA KENYA"
  },
  {
    "file": "/images/baringo/crocodile.jpg",
    "author": "Charles J. Sharp",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Kenyan_crocodile_(Crocodylus_niloticus_pauciscutatus).jpg",
    "title": "Kenyan crocodile (Crocodylus niloticus pauciscutatus)"
  },
  {
    "file": "/images/baringo/farmer-training.jpg",
    "author": "Climate Change, Agriculture and Food Security",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Training_women_farmers_on_climate_smart_innovations_in_Nyando,_Kenya_(9417196732).jpg",
    "title": "Training women farmers on climate smart innovations in Nyando, Kenya (9417196732)"
  },
  {
    "file": "/images/baringo/fisherman.jpg",
    "author": "Janna Mark Thumi",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Lake_Baringo_Fisherman.jpg",
    "title": "Lake Baringo Fisherman (cropped)"
  },
  {
    "file": "/images/baringo/hippo.jpg",
    "author": "flightlog",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Hippopotamus_amphibius_of_Kenya_13_(cropped).jpg",
    "title": "Hippopotamus amphibius of Kenya 13 (cropped)"
  },
  {
    "file": "/images/baringo/kitchen-garden.jpg",
    "author": "Yganyana",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Maasai_Kitchen_Garden_within_a_Boma_in_Kiserian.jpg",
    "title": "Maasai Kitchen Garden within a Boma in Kiserian"
  },
  {
    "file": "/images/baringo/lake-dead-tree.jpg",
    "author": "Ferdinand Reus",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Dead_tree_in_Lake_Baringo,_Kenya_-_by_Ferdinand_Reus.jpg",
    "title": "Dead tree in Lake Baringo, Kenya - by Ferdinand Reus"
  },
  {
    "file": "/images/baringo/lake-sunrise.jpg",
    "author": "Ray in Manila",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Early_Morning_at_Lake_Baringo,_Rift_Valley,_Kenya_(34004528696).jpg",
    "title": "Early Morning at Lake Baringo, Rift Valley, Kenya (34004528696)"
  },
  {
    "file": "/images/baringo/lake-sunset-boat.jpg",
    "author": "Ferdinand Reus",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Sunset_over_Lake_Baringo,_Kenya_-_by_Ferdinand_Reus.jpg",
    "title": "Sunset over Lake Baringo, Kenya - by Ferdinand Reus"
  },
  {
    "file": "/images/baringo/tilapia.jpg",
    "author": "VickyOmondi",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Fresh_Fish_from_Lake_Victoria.jpg",
    "title": "Fresh Fish from Lake Victoria"
  }
];

export const creditFor = (file?: string) => photoCredits.find((c) => c.file === file);
