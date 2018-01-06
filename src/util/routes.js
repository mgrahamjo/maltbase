import myBrews from 'views/brew/my-brews';

export default {
    brew: {
        name: 'BREW',
        icon: 'ion-beer',
        views: {
            'my-brews': {
                name: 'MY BREWS',
                view: myBrews
            },
            'yeast': {
                name: 'YEAST'
            },
            'mash': {
                name: 'MASH'
            },
            'boil': {
                name: 'BOIL'
            },
            'fermentation': {
                name: 'FERMENTATION'
            },
            'packaging': {
                name: 'PACKAGING'
            }
        }
    },
    recipes: {
        name: 'RECIPES',
        icon: 'ion-ios-flask-outline',
        views: {
            'recipe-search': {
                name: 'RECIPE SEARCH'
            },
            'my-recipes': {
                name: 'MY RECIPES'
            },
            'beerxml': {
                name: 'IMPORT BEERXML'
            },
            'designer': {
                name: 'RECIPE DESIGNER'
            }
        }
    },
    brewhouse: {
        name: 'BREWHOUSE',
        icon: 'ion-ios-cog-outline',
        views: {
            'equipment': {
                name: 'EQUIPMENT'
            },
            'water': {
                name: 'WATER'
            },
            'mash-plans': {
                name: 'MASH PLANS'
            },
            'fermentation-plans': {
                name: 'FERMENTATION PLANS'
            },
            'packaging-plans': {
                name: 'PACKAGING PLANS'
            }
        }
    },
    tools: {
        name: 'TOOLS',
        icon: 'ion-settings',
        views: {
            'water-profile': {
                name: 'WATER PROFILE'
            },
            'infusion': {
                name: 'INFUSION'
            },
            'decoction': {
                name: 'DECOCTION'
            },
            'mash-temperature': {
                name: 'MASH TEMPERATURE'
            },
            'mash-ph': {
                name: 'MASH pH'
            },
            'yeast-starter': {
                name: 'YEAST STARTER'
            },
            'hydrometer': {
                name: 'HYDROMETER'
            },
            'refractometer': {
                name: 'REFRACTOMETER'
            },
            'abv': {
                name: 'ABV'
            },
            'bitterness': {
                name: 'BITTERNESS'
            },
            'hop-age': {
                name: 'HOP AGE'
            },
            'boil-off': {
                name: 'BOIL OFF'
            },
            'dilution': {
                name: 'DILUTION'
            },
            'gravity': {
                name: 'GRAVITY'
            },
            'weight-to-volume': {
                name: 'WEIGHT TO VOLUME'
            },
            'carbonation': {
                name: 'CARBONATION'
            },
            'conversions': {
                name: 'CONVERSIONS'
            }
        }
    }
};
