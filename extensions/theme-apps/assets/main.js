jQuery(document).ready(function($){
    $(".cart-drawer-close").on('click',  function(){
        $(".cart-drawer").addClass("hidden");
    });
    $(".wishlist-drawer-close").on('click',  function(){
        $(".wishlist-drawer").addClass("hidden");
    });
    

    // Initialize wishlist from localStorage or set to empty array
    let wishlist = [];
    try {
        wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch (e) {
        wishlist = [];
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Update UI for wishlisted products
    wishlist.forEach(function(product_handle) {
        let wishlistedBtn = $(`.wishlist-btn[data-product-handle='${product_handle}']`);
        wishlistedBtn.find(".text").addClass("hidden");
        wishlistedBtn.find(".wish-listed").removeClass("hidden");
    });

    
    $(".show-wishlist-btn > span").text(wishlist.length);

    // Wishlist button click handler
    /* 
    $(".wishlist-btn").on('click', function(){
        let product_handle = $(this).data('product-handle');
        let wishlist = [];
        try {
            wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        } catch (e) {
            wishlist = [];
        }

        const index = wishlist.indexOf(product_handle);
        if (index > -1) {
            // Remove product_handle if it exists
            $(this).find(".text").removeClass("hidden");
            $(this).find(".wish-listed").addClass("hidden");
            wishlist.splice(index, 1);
        } else {
            // Add product_handle if it doesn't exist
            $(this).find(".text").addClass("hidden");
            $(this).find(".wish-listed").removeClass("hidden");
            wishlist.push(product_handle);
        }

        $(".show-wishlist-btn > span").text(wishlist.length);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    });
    */
   
    
    $(document).on('click', '.popup-close-btn, .popup-close-bg', function(e) {
        $("#product-info-popup").addClass("hidden");
    });
    $(".quick-view-btn").on('click',  function(){
        $(this).find('.text').addClass("hidden");
        $(this).find('.loading-icon').removeClass("hidden");

        let handle = $(this).data('product-handle');
        
        $.ajax({
            type: "GET",
            url: `products/${handle}.js`, 
            dataType: "json",
            headers: {
                "Content-Type":"application/json"
            },
            success: function(response) {
                // console.log("tanvir res =", response);
                let dateObj = new Date(response.created_at);
                let humanTime = dateObj.toLocaleString();

                $("#product-info-popup").removeClass("hidden").empty().append(`
                    <div class="fixed w-full h-full z-10 bg-black top-0 left-0 opacity-50 popup-close-bg"></div>
                    <div class="fixed left-0 top-30 z-20 w-full">
                        <div class="min-w-7xl max-w-7xl bg-white rounded-xl p-8 mx-auto relative cursor-pointer">
                            <button class="right-0 top-0 p-4 absolute popup-close-btn cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </button>
                            <div class="flex items-center gap-4">
                                <div class="flex-1">
                                    <img src="${response.featured_image}" class="w-full" width="400" />
                                </div>
                                <div class="flex-1">
                                
                                    <p>☣ 1mdalamin1 ☯ ${humanTime}</p>

                                    <h2 class="text-4xl font-bold mb-3">𓀝 ${response.title}</h2>
                                    <p class="text-xl mb-8">${response.price/100 } ৳</p>
                                    <div class="mb-6">
                                        ${response.description}
                                    </div>
                                        <div class="flex justify-between mt-6 items-center">
                                        
                                        <div class="flex items-center gap-2">
                                            <button type="button" class="cursor-pointer px-2 py-1" data-quantity-action="decrease">-</button>
                                            <input type="cart" class="text-center border px-2 py-1 " value="1" min="1" name="quantity" data-quantity-target>
                                            <button type="button" class="cursor-pointer px-2 py-1 " data-quantity-action="increase">+</button>
                                        </div>
                                        <script>
                                            $(document).on('click', '[data-quantity-action]', function() {
                                                const input = $(this).siblings('[data-quantity-target]');
                                                const action = $(this).data('quantity-action');
                                                const currentValue = parseInt(input.val());
                                                let newValue = 0;

                                                if (action === 'decrease') {
                                                    newValue = currentValue - 1;
                                                } else if (action === 'increase') {
                                                    newValue = currentValue + 1;
                                                }

                                                if (newValue >= 1) {
                                                    input.val(newValue);
                                                }
                                            });
                                        </script>
                                        <div>
                                            <button type="submit" class="py-2 ml-4 px-30 bg-black text-white rounded-full cursor-pointer">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);
                
                $('.quick-view-btn .text').removeClass("hidden");
                $('.quick-view-btn .loading-icon').addClass("hidden");
            },
        });
    });

    $(".show-wishlist-btn").on('click',  function(){
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        if(wishlist.length > 0){
            $("#wishlist-drawer-items").empty();
            let priceSymbol = $("#wishlist-drawer-items").data('price-symbol') || '৳';
             $(".wishlist-drawer").removeClass("hidden");
            wishlist.forEach(function(product_handle) {
                // Fetch product details using Shopify's AJAX API
                $.ajax({
                    type: "GET",
                    url: `/products/${product_handle}.js`, 
                    dataType: "json",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    success: function(response) {
                        // Append product details to the wishlist drawer
                        $("#wishlist-drawer-items").append(`
                            <div class="flex items-center gap-4 mb-4">
                                
                                <div class="w-20">
                                    <a href="${response.url}">
                                    <img src="${response.featured_image}" class="w-16 h-16 object-cover rounded" alt="${response.title}"></a>
                                </div>
                                <div class="w-2/3">
                                    <h3 class="text-lg font-semibold"><a href="${response.url}">${response.title}</a></h3>
                                    <p class="text-gray-600">${response.price / 100} ${priceSymbol} 
                                        <span onclick="remove_wishlist_item('${response.handle}', this)" class="shadow cursor-pointer float-right">
                                            <svg class="" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                            <path d="M17.25 3.5H13.5V2.75C13.5 2.15326 13.2629 1.58097 12.841 1.15901C12.419 0.737053 11.8467 0.5 11.25 0.5H6.75C6.15326 0.5 5.58097 0.737053 5.15901 1.15901C4.73705 1.58097 4.5 2.15326 4.5 2.75V3.5H0.75C0.551088 3.5 0.360322 3.57902 0.21967 3.71967C0.0790178 3.86032 0 4.05109 0 4.25C0 4.44891 0.0790178 4.63968 0.21967 4.78033C0.360322 4.92098 0.551088 5 0.75 5H1.5V18.5C1.5 18.8978 1.65804 19.2794 1.93934 19.5607C2.22064 19.842 2.60218 20 3 20H15C15.3978 20 15.7794 19.842 16.0607 19.5607C16.342 19.2794 16.5 18.8978 16.5 18.5V5H17.25C17.4489 5 17.6397 4.92098 17.7803 4.78033C17.921 4.63968 18 4.44891 18 4.25C18 4.05109 17.921 3.86032 17.7803 3.71967C17.6397 3.57902 17.4489 3.5 17.25 3.5ZM7.5 14.75C7.5 14.9489 7.42098 15.1397 7.28033 15.2803C7.13968 15.421 6.94891 15.5 6.75 15.5C6.55109 15.5 6.36032 15.421 6.21967 15.2803C6.07902 15.1397 6 14.9489 6 14.75V8.75C6 8.55109 6.07902 8.36032 6.21967 8.21967C6.36032 8.07902 6.55109 8 6.75 8C6.94891 8 7.13968 8.07902 7.28033 8.21967C7.42098 8.36032 7.5 8.55109 7.5 8.75V14.75ZM12 14.75C12 14.9489 11.921 15.1397 11.7803 15.2803C11.6397 15.421 11.4489 15.5 11.25 15.5C11.0511 15.5 10.8603 15.421 10.7197 15.2803C10.579 15.1397 10.5 14.9489 10.5 14.75V8.75C10.5 8.55109 10.579 8.36032 10.7197 8.21967C10.8603 8.07902 11.0511 8 11.25 8C11.4489 8 11.6397 8.07902 11.7803 8.21967C11.921 8.36032 12 8.55109 12 8.75V14.75ZM12 3.5H6V2.75C6 2.55109 6.07902 2.36032 6.21967 2.21967C6.36032 2.07902 6.55109 2 6.75 2H11.25C11.4489 2 11.6397 2.07902 11.7803 2.21967C11.921 2.36032 12 2.55109 12 2.75V3.5Z" fill="#FF3333"></path>
                                            </svg>
                                        </span></p>
                                </div>
                            </div>  
                        `);
                    },
                });
            });
        }
    });


});

// Single product page image gallery change image on thumbnail click
function hide_show_img(idName){
    $(".p_img").removeClass("showImg");
    $("#"+idName).addClass("showImg");
}

// Remove item from wishlist
function remove_wishlist_item(product_handle, element) {
    
    let wishlist = [];
    try {
        wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch (e) {
        wishlist = [];
    }

    const index = wishlist.indexOf(product_handle);
    if (index > -1) {
        // Remove product_handle if it exists
        let wishlistedBtn = $(`.wishlist-btn[data-product-handle='${product_handle}']`);
        wishlistedBtn.find(".text").removeClass("hidden");
        wishlistedBtn.find(".wish-listed").addClass("hidden");

        wishlist.splice(index, 1);
        $(element).closest('div.flex').remove(); // Remove the product entry from the drawer
    } 
    $(".show-wishlist-btn > span").text(wishlist.length);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
