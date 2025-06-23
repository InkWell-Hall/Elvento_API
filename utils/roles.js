
export const roles = [

    {
        role: "Buyer",
        permissions: [
            'newOrder',
            'getOrders',
            'getOneOrder',
            'cartStorage',
            'updateCartItem',
            'deleteCartItem',
            'getUserCart',
            'getAllcarts',
        ]
    },

    {
        role: "vendor",
        permissions: [
            'createAdvert',
            'getalluserAdverts',
            'getAuserAdverts',
            'deluserAdverts',
            'updateUserAdverts',
            'patchService',
        ]
    },

];