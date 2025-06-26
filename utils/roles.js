
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
            'getUserCart',
            'addToCart',
            'updateCart'
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