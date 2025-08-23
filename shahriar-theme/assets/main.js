
jQuery(document).ready(function($){
    $(".cart-drawer-close").on('click',  function(){
        $(".cart-drawer").addClass("hidden");
    });
    $(document).on('click', '.popup-close-btn', function(e) {
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
            console.log(response.featured_image)
                $("#product-info-popup").removeClass("hidden").empty().append(`
                    <div class="fixed w-full h-full z-10 bg-black top-0 left-0 opacity-50 "></div>
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
                                    
                                     <

                                        <h2 class="text-4xl font-bold mb-3">${response.title}</h2>
                                        <p class="text-xl mb-8">120$</p>
                                        <div class="mb-6">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates numquam provident asperiores? Unde perspiciatis magnam rem vel porro odio facere, ab repellat id, explicabo repudiandae quasi cum exercitationem eum nesciunt!
                                        </div>
                                         <div class="flex justify-between mt-6 items-center">
                                            
                                            <div class="flex items-center gap-2">
                                                <button type="button" class="px-2 py-1" data-quantity-action="decrease">-</button>
                                                <input type="cart" class="text-center border px-2 py-1 " value="1" min="1" name="quantity" data-quantity-target>
                                                <button type="button" class=" px-2 py-1 " data-quantity-action="increase">+</button>
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
                                                <button type="submit" class="py-2 ml-4 px-36 bg-black text-white rounded-full cursor-pointer">Add to Cart</button>
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
});