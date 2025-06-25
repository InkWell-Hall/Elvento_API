
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
        role: "Vendor",
        permissions: [
            'createAdvert',
            'getalluserAdverts',
            'getAuserAdverts',
            'deluserAdverts',
            'updateUserAdverts',
            'patchService',
            'getOrderedAdvert',
            'addProduct',
            'removeProduct',
            'updateUserproduct',
            'getAuserProduct',
            'getalluserProduct'
        ]
    },

];