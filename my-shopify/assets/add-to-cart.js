jQuery(document).ready( function($) {
    let addToCartForm = document.querySelector('form[action$="/cart/add"]');

    $(addToCartForm).on("submit", function(e){
        e.preventDefault();
        // change this form,s button type submit text to loading
        $(this).find('button[type=submit]').empty().append(`
            <svg id="svg-spinner" class=" animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                <circle cx="24" cy="4" r="4" fill="#fff"/>
                <circle cx="12.19" cy="7.86" r="3.7" fill="#fffbf2"/>
                <circle cx="5.02" cy="17.68" r="3.4" fill="#fef7e4"/>
                <circle cx="5.02" cy="30.32" r="3.1" fill="#fef3d7"/>
                <circle cx="12.19" cy="40.14" r="2.8" fill="#feefc9"/>
                <circle cx="24" cy="44" r="2.5" fill="#feebbc"/>
                <circle cx="35.81" cy="40.14" r="2.2" fill="#fde7af"/>
                <circle cx="42.98" cy="30.32" r="1.9" fill="#fde3a1"/>
                <circle cx="42.98" cy="17.68" r="1.6" fill="#fddf94"/>
                <circle cx="35.81" cy="7.86" r="1.3" fill="#fcdb86"/>
            </svg>
        `);

        let formData = {
                items: [
                    {
                        id: $("#variant_id").val(),
                        quantity: $("input[name=quantity]").val()
                    }
                ]
            };
            console.log(formData);

        $.ajax({
            type: "post",
            url: "/cart/add.js",
            headers: {
                'Content-Type': 'application/json'
              },
            data: JSON.stringify(formData),
            dataType: "json",
            success: function(response){
                console.log(response)

               $.ajax({
                    type: "get",
                    url: "/cart.js",
                    dataType: "json",
                    success: function(response){
                        $("#cart-drawer-items").empty();
                        $.each(response.items, function(index, item){
                            let variantText = item.variant_title && item.variant_title !== "Default Title" ? item.variant_title : "No variant";
                            $("#cart-drawer-items").append(`
                                <div class="flex gap-4 mb-2">
                                    <div class="w-20">
                                        <img src="${item.image}" alt="">
                                    </div>
                                    <div class="w-2/3">
                                        <h3 class="text-lg text-black mb-2">${item.product_title}</h3>
                                        <p class="text-sm text-gray-500">${variantText} <br> Quantity: ${item.quantity}</p>
                                    </div>
                                </div>
                            `);
                        });
                         // change this form,s button type submit text to added
                        $(addToCartForm).find('button[type=submit]').text('Add to Cart');
                        $(".cart-drawer").removeClass("hidden");

                    }
                });
                
               
            },
            error: function(error){
                console.log(error);

                // change this form,s button type submit text to added
                $(addToCartForm).find('button[type=submit]').text('Add to Cart');
                
            }
        })
    });
});