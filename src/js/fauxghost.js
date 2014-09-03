(function ($) {
    "use strict";
    FastClick.attach(document.body);
    $(document).ready(function(){
        $(".at_block").fitVids();
    $(".at_search_input").ghostHunter({results: ".at_search_results", onKeyUp: true, info_template: "<span class='at_search_clear_toggle'>&#215;</span> <span class='at_search_results_amount'>Number of posts found: {{amount}}</span><span class='clearfix'></span>", result_template : "<span><a href='{{link}}'><span class='at_search_results_title'>{{title}}</span></a></span>"});
    $("#at_search").on('click', '.at_search_clear_toggle', function(e) {e.preventDefault();$(".at_search_input").val('');$(".at_search_results").removeClass("at_search_active");});

      });
}(jQuery));
