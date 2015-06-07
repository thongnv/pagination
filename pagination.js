/**
 * Created by ThongNV1 on 2/5/2015.
 */
(function($){
    $.fn.extend({
        MyPagination: function(options) {
            var defaults = {
                recordPerPage: 10,
                //height: 2200,
                fadeSpeed: 0
            };

            //height: 2200;

            var options = $.extend(defaults, options);

            //Creating a reference to the object
            var objContent = $(this);

            // other inner variables
            var fullPages = new Array();
            var subPages = new Array();
            //var height = 0;
            var lastPage = 1;
            var paginatePages;
            var count= 0;

            // initialization function
            init = function() {
                //var optionsHeight = options.recordPerPage * this.clientHeight;

                objContent.children().each(function(i){
                    //if (height + this.clientHeight > optionsHeight) {
                    //    fullPages.push(subPages);
                    //    subPages = new Array();
                    //    height = 0;
                    //}
                    if (count == options.recordPerPage) {
                        fullPages.push(subPages);
                        subPages = new Array();
                        count= 0;
                    }

                    count += 1;
                    //height += this.clientHeight;
                    subPages.push(this);
                });

                if (count > 0) {
                    fullPages.push(subPages);
                }

                // wrapping each full page
                $(fullPages).wrap("<div class='page'></div>");

                // hiding all wrapped pages
                objContent.children().hide();

                // making collection of pages for pagination
                paginatePages = objContent.children();

                // draw controls
                showPagination($(paginatePages).length);

                // show first page
                showPage(lastPage);

                $.fn.extend({showPage: function(page) { showPage(page); }});
            };

            // update counter function
            updateCounter = function(i) {
                $('#page_number').html(i);
            };

            // show page function
            showPage = function(page) {
                var item = $('ul.pagination-grid li');
                item.removeClass('active');
                $(item[page]).addClass('active');
                // disable Prev & Next button
                if (page == $(paginatePages).length) {
                    item[item.length-1].className += ' disabled';
                } else {
                    item[item.length-1].className -= ' disabled';
                }
                if (page == 1) {
                    item[0].className += ' disabled';
                } else {
                    item[0].className -= ' disabled';
                }

                i = page - 1;
                if (paginatePages[i]) {

                    // hiding old page, display new one
                    $(paginatePages[lastPage]).fadeOut(options.fadeSpeed);
                    lastPage = i;
                    $(paginatePages[lastPage]).fadeIn(options.fadeSpeed);

                    // and updating counter
                    updateCounter(page);
                }

            };

            // show pagination function (draw switching numbers)
            showPagination = function(numPages) {
                var pagins = '';
                for (var i = 1; i <= numPages; i++) {
                    pagins += '<li class="paginate_button"><a href="javascript:void(0)" onclick="showPage(' + i + '); return false;">' + i + '</a></li>';
                }
                $('.pagination-grid li:first-child').after(pagins);
            };

            // perform initialization
            init();

            // and binding 2 events - on clicking to Prev
            $('.pagination-grid #prev').click(function() {
                var disabled = $.inArray('disabled', $(this)[0].parentNode.classList);
                if(disabled == -1) {
                    showPage(lastPage);
                }
            });
            // and Next
            $('.pagination-grid #next').click(function() {
                var disabled = $.inArray('disabled', $(this)[0].parentNode.classList);
                if(disabled == -1) {
                    showPage(lastPage+2);
                }
            });

            $('.pagination-grid a').click(function(e) {
                e.preventDefault();
            });
        }
    });
})(jQuery);
