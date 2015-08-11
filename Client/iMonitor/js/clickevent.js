$( document ).on("pagecreate", function() {
            $("button.toggle").on('click',function(){
                var val = $(this).text();
                if ( val === 'Off' ) {
                    $(this).text("On");
                }
                else if (val === 'On' ) {
                    $(this).text("Off");
                }
            });

            $("button.breaker").on('click',function(){
                var val = $(this).text();
                if ( val === 'Off' ) {
                    $(this).text("On");
                }
                else if (val === 'On' ) {
                    $(this).text("Off");
                }
            });


            $("button.main1").on("click", function(){
                var val = $(this).text();
                if ( val === 'Off' ) {
                    $(this).text("On");
                    $("button.line-1").removeClass('ui-disabled');
                    $('#securityStat').text('System: Armed');
                 }
                else if (val === 'On' ) {
                    $(this).text("Off");
                    $("button.line-1").addClass('ui-disabled');
                    $('#securityStat').text('System: Disarmed');
                }
            });
            $("button.main2").on("click", function(){
                var val = $(this).text();
                if ( val === 'Off' ) {
                    $(this).text("On");
                    $("button.line-2").removeClass('ui-disabled');
                }
                else if (val === 'On' ) {
                    $(this).text("Off");
                    $("button.line-2").addClass('ui-disabled');
                }

            });
            $("button.mainB1").on("click", function(){
                var val = $(this).text();
                if ( val === 'Off' ) {
                    $(this).text("On");
                    $("button.breaker-1").removeClass('ui-disabled');
                }
                else if (val === 'On' ) {
                    $(this).text("Off");
                    $("button.breaker-1").addClass('ui-disabled');
                }

            });
            $("button.mainB2").on("click", function(){
                var val = $(this).text();
                if ( val === 'Off' ) {
                    $(this).text("On");
                    $("button.breaker-2").removeClass('ui-disabled');
                }
                else if (val === 'On' ) {
                    $(this).text("Off");
                    $("button.breaker-2").addClass('ui-disabled');
                }

            });

        });